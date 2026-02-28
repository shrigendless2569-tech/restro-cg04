'use client'

import { useState } from 'react'
import { Calendar, Clock, Users, CheckCircle } from 'lucide-react'

const timeSlots = [
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM',
]

type Form = {
    name: string
    email: string
    phone: string
    date: string
    time: string
    guests: string
    special_requests: string
}

const EMPTY: Form = { name: '', email: '', phone: '', date: '', time: '', guests: '2', special_requests: '' }

export default function Reservation() {
    const [form, setForm] = useState<Form>(EMPTY)
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        setError('')
        try {
            const res = await fetch('/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, guests: parseInt(form.guests) }),
            })
            if (res.ok) {
                setSuccess(true)
                setForm(EMPTY)
            } else {
                const d = await res.json()
                setError(d.error || 'Something went wrong. Please try again.')
            }
        } catch {
            setError('Network error. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    // Minimum date = today
    const today = new Date().toISOString().split('T')[0]

    return (
        <section id="reservation" className="reservation">
            <div className="reservation-bg" />
            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <div className="reservation-layout">
                    {/* Left Info */}
                    <div className="reservation-info">
                        <span className="section-label" style={{ color: 'var(--color-gold-light)' }}>
                            Book a Table
                        </span>
                        <h2 className="section-title" style={{ color: 'var(--color-white)', textAlign: 'left' }}>
                            Reserve Your<br />Perfect Evening
                        </h2>
                        <div className="gold-divider" style={{ margin: '1rem 0' }} />
                        <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '2rem' }}>
                            Let us craft an unforgettable dining experience for you. Whether it's
                            a romantic dinner, family celebration, or corporate gathering — we've
                            got the perfect table waiting.
                        </p>

                        <div className="info-items">
                            <div className="info-item">
                                <Calendar size={20} />
                                <div>
                                    <strong>Mon – Sun</strong>
                                    <span>Reservations available</span>
                                </div>
                            </div>
                            <div className="info-item">
                                <Clock size={20} />
                                <div>
                                    <strong>12 PM – 11 PM</strong>
                                    <span>Lunch & Dinner service</span>
                                </div>
                            </div>
                            <div className="info-item">
                                <Users size={20} />
                                <div>
                                    <strong>Up to 20 Guests</strong>
                                    <span>Private parties welcome</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="reservation-form-wrap">
                        {success ? (
                            <div className="success-state">
                                <CheckCircle size={56} color="#22c55e" />
                                <h3>Reservation Confirmed!</h3>
                                <p>
                                    Thank you! We&apos;ll send a confirmation shortly. We look forward
                                    to welcoming you at Restro CG04.
                                </p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setSuccess(false)}
                                >
                                    Make Another Reservation
                                </button>
                            </div>
                        ) : (
                            <form className="res-form" onSubmit={handleSubmit} id="reservation-form">
                                <h3 className="form-heading">Your Details</h3>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Full Name *</label>
                                        <input
                                            id="res-name"
                                            name="name"
                                            className="form-input"
                                            type="text"
                                            required
                                            placeholder="Your name"
                                            value={form.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Phone *</label>
                                        <input
                                            id="res-phone"
                                            name="phone"
                                            className="form-input"
                                            type="tel"
                                            required
                                            placeholder="+91 98765 43210"
                                            value={form.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Email *</label>
                                    <input
                                        id="res-email"
                                        name="email"
                                        className="form-input"
                                        type="email"
                                        required
                                        placeholder="your@email.com"
                                        value={form.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Date *</label>
                                        <input
                                            id="res-date"
                                            name="date"
                                            className="form-input"
                                            type="date"
                                            required
                                            min={today}
                                            value={form.date}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Time *</label>
                                        <select
                                            id="res-time"
                                            name="time"
                                            className="form-select"
                                            required
                                            value={form.time}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select time</option>
                                            {timeSlots.map((t) => (
                                                <option key={t} value={t}>{t}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Number of Guests *</label>
                                    <select
                                        id="res-guests"
                                        name="guests"
                                        className="form-select"
                                        required
                                        value={form.guests}
                                        onChange={handleChange}
                                    >
                                        {[...Array(20)].map((_, i) => (
                                            <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Guest' : 'Guests'}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Special Requests</label>
                                    <textarea
                                        id="res-requests"
                                        name="special_requests"
                                        className="form-textarea"
                                        placeholder="Dietary requirements, occasion, seating preferences..."
                                        value={form.special_requests}
                                        onChange={handleChange}
                                    />
                                </div>

                                {error && (
                                    <div className="error-msg">{error}</div>
                                )}

                                <button
                                    type="submit"
                                    id="res-submit-btn"
                                    className="btn btn-primary"
                                    disabled={submitting}
                                    style={{ width: '100%' }}
                                >
                                    {submitting ? 'Confirming...' : 'Confirm Reservation'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
        .reservation {
          position: relative;
          padding: var(--section-padding);
          overflow: hidden;
        }

        .reservation-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--color-forest-dark) 0%, var(--color-forest) 50%, #0d2010 100%);
        }

        .reservation-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 0% 100%, rgba(201,168,76,0.1) 0%, transparent 60%);
        }

        .reservation-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        .reservation-info {
          padding-top: 1rem;
        }

        .info-items {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: rgba(255,255,255,0.85);
        }

        .info-item svg {
          color: var(--color-gold);
          flex-shrink: 0;
        }

        .info-item strong {
          display: block;
          font-weight: 700;
          font-size: 0.95rem;
        }

        .info-item span {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.55);
        }

        .reservation-form-wrap {
          background: var(--color-white);
          border-radius: var(--radius-xl);
          padding: 2.5rem;
          box-shadow: var(--shadow-lg);
        }

        .form-heading {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          color: var(--color-forest-dark);
          margin-bottom: 1.5rem;
        }

        .res-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .error-msg {
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.25);
          color: #dc2626;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
        }

        .success-state {
          text-align: center;
          padding: 2rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .success-state h3 {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          color: var(--color-forest-dark);
        }

        .success-state p {
          color: var(--color-text-muted);
          line-height: 1.7;
          max-width: 340px;
        }

        @media (max-width: 900px) {
          .reservation-layout {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        @media (max-width: 480px) {
          .form-row {
            grid-template-columns: 1fr;
          }

          .reservation-form-wrap {
            padding: 1.5rem;
          }
        }
      `}</style>
        </section>
    )
}
