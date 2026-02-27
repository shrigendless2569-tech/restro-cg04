import { NextResponse } from 'next/server'
import { sendReservationNotification } from '@/lib/email'

export async function GET() {
    try {
        await sendReservationNotification({
            name: 'Test Guest',
            email: 'test@example.com',
            phone: '+91 92445 53316',
            date: new Date().toISOString().split('T')[0],
            time: '8:00 PM',
            guests: 2,
            special_requests: 'This is a test reservation notification.',
        })
        return NextResponse.json({ success: true, message: 'Test email sent! Check your inbox.' })
    } catch (err) {
        const error = err as Error
        console.error('Test email error:', error)
        return NextResponse.json({
            success: false,
            error: error.message,
            stack: error.stack,
        }, { status: 500 })
    }
}
