import { NextRequest, NextResponse } from 'next/server'
import { sendReservationNotification } from '@/lib/email'

// Check if Supabase is actually configured (not placeholder values)
const supabaseConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder') &&
    process.env.SUPABASE_SERVICE_ROLE_KEY &&
    !process.env.SUPABASE_SERVICE_ROLE_KEY.includes('placeholder')

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, email, phone, date, time, guests, special_requests } = body

        // Validation
        if (!name || !email || !phone || !date || !time || !guests) {
            return NextResponse.json(
                { error: 'All required fields must be filled' },
                { status: 400 }
            )
        }

        if (guests < 1 || guests > 20) {
            return NextResponse.json(
                { error: 'Guests must be between 1 and 20' },
                { status: 400 }
            )
        }

        // Validate date is not in the past
        const reservationDate = new Date(date)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (reservationDate < today) {
            return NextResponse.json(
                { error: 'Reservation date cannot be in the past' },
                { status: 400 }
            )
        }

        // --- Supabase DB insert (only if credentials are configured) ---
        let savedData: Record<string, unknown> = { name, email, phone, date, time, guests, special_requests, status: 'pending' }

        if (supabaseConfigured) {
            try {
                const { supabaseAdmin } = await import('@/lib/supabase')
                const { data, error } = await supabaseAdmin
                    .from('reservations')
                    .insert([{
                        name, email, phone, date, time, guests,
                        special_requests: special_requests || null,
                        status: 'pending',
                    }])
                    .select()
                    .single()

                if (error) {
                    console.error('Supabase insert error:', error)
                } else {
                    savedData = data
                }
            } catch (dbErr) {
                console.error('Supabase connection error:', dbErr)
                // Continue — email notification will still be sent
            }
        } else {
            console.log('Supabase not configured — reservation logged to email only')
        }

        // --- Send email notification to owner (always attempted) ---
        if (process.env.NOTIFY_EMAIL_FROM &&
            !process.env.NOTIFY_EMAIL_FROM.includes('your.gmail') &&
            process.env.NOTIFY_EMAIL_TO) {
            sendReservationNotification({
                id: savedData.id as string | undefined,
                name, email, phone, date, time, guests, special_requests
            })
                .catch((err) => console.error('Email notification failed:', err))
        }

        return NextResponse.json(savedData, { status: 201 })

    } catch (err) {
        console.error('Reservation API error:', err)
        return NextResponse.json(
            { error: 'Failed to create reservation. Please try again.' },
            { status: 500 }
        )
    }
}
