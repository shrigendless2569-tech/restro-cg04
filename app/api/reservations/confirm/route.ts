import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const name = searchParams.get('name') || ''
    const email = searchParams.get('email') || ''
    const date = searchParams.get('date') || ''
    const time = searchParams.get('time') || ''
    const guests = searchParams.get('guests') || '2'
    const secret = searchParams.get('secret')

    if (!id || !email) {
        return new NextResponse('<h2 style="font-family:sans-serif;color:red">❌ Invalid confirmation link.</h2>', {
            status: 400, headers: { 'Content-Type': 'text/html' }
        })
    }

    // Simple secret to prevent random people from confirming reservations
    if (secret !== process.env.CONFIRM_SECRET) {
        return new NextResponse('<h2 style="font-family:sans-serif;color:red">❌ Unauthorized.</h2>', {
            status: 401, headers: { 'Content-Type': 'text/html' }
        })
    }

    // Update status in Supabase if configured
    const supabaseConfigured =
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder') &&
        process.env.SUPABASE_SERVICE_ROLE_KEY &&
        !process.env.SUPABASE_SERVICE_ROLE_KEY.includes('placeholder')

    if (supabaseConfigured) {
        try {
            const { supabaseAdmin } = await import('@/lib/supabase')
            await supabaseAdmin
                .from('reservations')
                .update({ status: 'confirmed' })
                .eq('id', id)
        } catch (err) {
            console.error('Supabase update error:', err)
        }
    }

    // Send confirmation email to customer
    try {
        const formattedDate = new Date(date).toLocaleDateString('en-IN', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        })

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NOTIFY_EMAIL_FROM,
                pass: (process.env.NOTIFY_EMAIL_PASSWORD || '').replace(/\s+/g, ''),
            },
        })

        const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1a2e1a, #2a4a2a); padding: 40px 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 12px;">🎉</div>
            <h1 style="color: #c9a84c; margin: 0; font-size: 26px;">Reservation Confirmed!</h1>
            <p style="color: rgba(255,255,255,0.75); margin: 10px 0 0; font-size: 15px;">
              We can't wait to see you, ${name.split(' ')[0]}!
            </p>
          </div>

          <div style="background: #ffffff; padding: 32px; border: 1px solid #e5e7eb; border-top: none;">
            <p style="color: #374151; font-size: 15px; line-height: 1.7; margin-top: 0;">
              Your table at <strong>Restro CG04</strong> has been confirmed. Here are your booking details:
            </p>

            <div style="background: #f9fafb; border-radius: 10px; padding: 24px; margin: 20px 0;">
              <table style="width:100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 40%;">📅 Date</td>
                  <td style="padding: 8px 0; font-weight: 700; color: #1a1a1a; font-size: 15px;">${formattedDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">🕐 Time</td>
                  <td style="padding: 8px 0; font-weight: 700; color: #1a1a1a; font-size: 15px;">${time}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">👥 Guests</td>
                  <td style="padding: 8px 0; font-weight: 700; color: #1a1a1a; font-size: 15px;">${guests} ${parseInt(guests) === 1 ? 'Guest' : 'Guests'}</td>
                </tr>
              </table>
            </div>

            <div style="background: #fef9f0; border-left: 4px solid #c9a84c; border-radius: 6px; padding: 16px; margin: 20px 0;">
              <p style="margin: 0; color: #92400e; font-size: 13px; line-height: 1.6;">
                📍 <strong>Restro CG04</strong> — Sector 19, Kotara Bhantha, Atal Nagar, Nava Raipur, CG<br/>
                📞 <strong>+91 92445 53316</strong> | <strong>+91 72239 33189</strong><br/>
                🕐 If you need to cancel or reschedule, please call us at least 2 hours before your booking.
              </p>
            </div>

            <p style="color: #374151; font-size: 15px; line-height: 1.7;">
              We look forward to serving you an unforgettable lakeside dining experience! 🌅
            </p>

            <p style="font-size: 12px; color: #9ca3af; text-align: center; margin-top: 32px;">
              Restro CG04 • Sector 19, Nava Raipur • shrikantgendle61@gmail.com
            </p>
          </div>
        </div>`

        await transporter.sendMail({
            from: `"Restro CG04" <${process.env.NOTIFY_EMAIL_FROM}>`,
            to: email,
            subject: `✅ Reservation Confirmed – ${formattedDate} at ${time} | Restro CG04`,
            html,
        })
    } catch (err) {
        console.error('Customer confirmation email error:', err)
    }

    // Return beautiful success page
    return new NextResponse(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Reservation Confirmed – Restro CG04</title>
      <style>
        body { margin:0; font-family: Arial, sans-serif; background: #0f1a0f; display:flex; align-items:center; justify-content:center; min-height:100vh; }
        .card { background: white; border-radius: 16px; padding: 48px 40px; max-width: 460px; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
        .icon { font-size: 64px; margin-bottom: 16px; }
        h1 { color: #1a2e1a; margin: 0 0 12px; font-size: 26px; }
        p { color: #6b7280; line-height: 1.7; margin: 0 0 24px; }
        .badge { display:inline-block; background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; padding: 8px 20px; border-radius: 100px; font-size: 14px; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="icon">🎉</div>
        <h1>Reservation Confirmed!</h1>
        <p>A confirmation email has been sent to <strong>${email}</strong>. The guest will be notified of their booking.</p>
        <span class="badge">✅ Done — You can close this tab</span>
      </div>
    </body>
    </html>`, {
        status: 200,
        headers: { 'Content-Type': 'text/html' }
    })
}
