import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

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

        const { data, error } = await supabaseAdmin
            .from('reservations')
            .insert([{
                name,
                email,
                phone,
                date,
                time,
                guests,
                special_requests: special_requests || null,
                status: 'pending',
            }])
            .select()
            .single()

        if (error) throw error
        return NextResponse.json(data, { status: 201 })
    } catch {
        return NextResponse.json(
            { error: 'Failed to create reservation. Please try again.' },
            { status: 500 }
        )
    }
}
