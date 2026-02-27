import nodemailer from 'nodemailer'

type ReservationDetails = {
  id?: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: number
  special_requests?: string | null
}

export async function sendReservationNotification(details: ReservationDetails) {
  const { id, name, email, phone, date, time, guests, special_requests } = details

  const formattedDate = new Date(date).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Build the confirm link — works on both local and production
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const secret = process.env.CONFIRM_SECRET || 'restrocg04secret'
  const confirmParams = new URLSearchParams({
    id: id || 'unknown',
    name,
    email,
    date,
    time,
    guests: String(guests),
    secret,
  })
  const confirmUrl = `${baseUrl}/api/reservations/confirm?${confirmParams.toString()}`

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1a2e1a, #2a4a2a); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: #c9a84c; margin: 0; font-size: 24px;">🍽️ New Reservation!</h1>
        <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0;">Restro CG04 – Naya Raipur</p>
      </div>
      
      <div style="background: #ffffff; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe4; color: #6b7280; font-size: 14px; width: 40%;">👤 Guest Name</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe4; font-weight: 700; color: #1a1a1a;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe4; color: #6b7280; font-size: 14px;">📞 Phone</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe4; font-weight: 700; color: #1a1a1a;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe4; color: #6b7280; font-size: 14px;">📧 Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe4; color: #1a1a1a;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe4; color: #6b7280; font-size: 14px;">📅 Date</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe4; font-weight: 700; color: #c9a84c; font-size: 16px;">${formattedDate}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe4; color: #6b7280; font-size: 14px;">🕐 Time</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe4; font-weight: 700; color: #c9a84c; font-size: 16px;">${time}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: ${special_requests ? '1px solid #f0ebe4' : 'none'}; color: #6b7280; font-size: 14px;">👥 Guests</td>
            <td style="padding: 10px 0; border-bottom: ${special_requests ? '1px solid #f0ebe4' : 'none'}; font-weight: 700; color: #1a1a1a;">${guests} ${guests === 1 ? 'Guest' : 'Guests'}</td>
          </tr>
          ${special_requests ? `
          <tr>
            <td style="padding: 10px 0; color: #6b7280; font-size: 14px; vertical-align: top;">📝 Special Requests</td>
            <td style="padding: 10px 0; color: #1a1a1a; font-style: italic;">${special_requests}</td>
          </tr>
          ` : ''}
        </table>

        <!-- Confirm Button -->
        <div style="margin-top: 28px; text-align: center;">
          <a href="${confirmUrl}"
             style="display: inline-block; background: linear-gradient(135deg, #c9a84c, #b8942f); color: #1a2e1a; text-decoration: none; padding: 14px 36px; border-radius: 8px; font-weight: 700; font-size: 16px; letter-spacing: 0.03em;">
            ✅ Confirm Reservation
          </a>
          <p style="margin: 12px 0 0; font-size: 12px; color: #9ca3af;">
            Clicking this will send a confirmation email to the guest automatically.
          </p>
        </div>

        <div style="margin-top: 24px; padding: 14px; background: #fef9f0; border-radius: 8px; border-left: 4px solid #c9a84c;">
          <p style="margin: 0; color: #6b7280; font-size: 13px;">
            ⚡ Status is currently <strong>pending</strong> until you confirm above.
          </p>
        </div>

        <p style="margin: 24px 0 0; font-size: 12px; color: #9ca3af; text-align: center;">
          Restro CG04 • Sector 19, Nava Raipur, Chhattisgarh
        </p>
      </div>
    </div>
  `

  // Create transporter lazily so env vars are always fresh, strip spaces from app password
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NOTIFY_EMAIL_FROM,
      pass: (process.env.NOTIFY_EMAIL_PASSWORD || '').replace(/\s+/g, ''),
    },
  })

  await transporter.sendMail({
    from: `"Restro CG04 Reservations" <${process.env.NOTIFY_EMAIL_FROM}>`,
    to: process.env.NOTIFY_EMAIL_TO,
    subject: `🍽️ New Reservation – ${name} | ${formattedDate} at ${time} (${guests} guests)`,
    html,
  })
}
