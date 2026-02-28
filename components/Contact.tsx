'use client'

import { MapPin, Phone, Clock, Mail } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Address',
    lines: ['Sector 27, Naya Raipur', 'Chhattisgarh – 492002, India'],
  },
  {
    icon: Phone,
    title: 'Phone',
    lines: ['+91 98765 43210', '+91 91234 56789'],
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['restrocg04.info@example.com'],
  },
  {
    icon: Clock,
    title: 'Hours',
    lines: ['Mon–Sun: 12 PM – 11 PM', 'Last Order: 10:30 PM'],
  },
]

export default function Contact() {
  useScrollReveal()

  return (
    <section id="contact" className="contact section" style={{ background: 'var(--color-cream)' }}>
      <div className="container">
        <div className="section-header" data-reveal="slide-up">
          <span className="section-label">Find Us</span>
          <h2 className="section-title">Visit Us</h2>
          <p className="section-subtitle">
            Nestled near the lakefront in the heart of Naya Raipur, we are easy to find and even easier to love.
          </p>
        </div>

        <div className="contact-layout">
          {/* Info Cards */}
          <div className="contact-info">
            {contactInfo.map((item, i) => (
              <div
                key={item.title}
                className="contact-card"
                data-reveal="slide-left"
                data-reveal-delay={String(i * 80)}
              >
                <div className="contact-icon">
                  <item.icon size={22} />
                </div>
                <div>
                  <h4 className="contact-card-title">{item.title}</h4>
                  {item.lines.map((line) => (
                    <p key={line} className="contact-card-line">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Map / CTA block */}
          <div className="contact-map" data-reveal="slide-right" data-reveal-delay="100">
            <div className="map-placeholder">
              <div className="map-pin-wrap">
                <div className="map-pin-pulse" />
                <div className="map-pin">📍</div>
              </div>
              <h3 className="map-title">Restro CG04</h3>
              <p className="map-address">Sector 27, Naya Raipur<br />Chhattisgarh, India</p>
              <a
                href="https://maps.google.com/?q=Naya+Raipur+Chhattisgarh"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                id="open-maps-btn"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 3rem;
          align-items: stretch;
        }

        .contact-info {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.2rem;
        }

        .contact-card {
          display: flex;
          gap: 1rem;
          padding: 1.2rem 1.5rem;
          background: var(--color-white);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          transition: transform var(--transition-base), box-shadow var(--transition-base), border-left-color var(--transition-base);
          border-left: 3px solid transparent;
        }

        .contact-card:hover {
          transform: translateX(6px);
          box-shadow: var(--shadow-md);
          border-left-color: var(--color-gold);
        }

        .contact-icon {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, var(--color-forest), var(--color-forest-light));
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-gold);
          transition: transform var(--transition-fast);
        }

        .contact-card:hover .contact-icon {
          transform: scale(1.08);
        }

        .contact-card-title {
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--color-text-light);
          margin-bottom: 0.3rem;
          font-family: var(--font-body);
        }

        .contact-card-line {
          font-size: 0.92rem;
          color: var(--color-text-primary);
          line-height: 1.6;
        }

        /* Map section */
        .contact-map {
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          min-height: 400px;
          background: linear-gradient(135deg, var(--color-forest) 0%, var(--color-forest-light) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .contact-map::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 30% 40%, rgba(201,168,76,0.12), transparent 70%);
          pointer-events: none;
        }

        .map-placeholder {
          text-align: center;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.2rem;
          position: relative;
          z-index: 1;
        }

        .map-pin-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
        }

        .map-pin {
          font-size: 3.5rem;
          filter: drop-shadow(0 4px 16px rgba(0,0,0,0.4));
          position: relative;
          z-index: 1;
          animation: pulseDot 2.4s ease-in-out infinite;
        }

        .map-pin-pulse {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: rgba(201,168,76,0.2);
          animation: pulseDot 2.4s ease-in-out infinite;
        }

        .map-title {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          color: var(--color-gold-light);
        }

        .map-address {
          color: rgba(255,255,255,0.65);
          line-height: 1.7;
          font-size: 0.95rem;
        }

        @media (max-width: 900px) {
          .contact-layout {
            grid-template-columns: 1fr;
          }
          .contact-map {
            min-height: 320px;
          }
        }
      `}</style>
    </section>
  )
}
