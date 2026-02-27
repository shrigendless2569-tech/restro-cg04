'use client'

import { MapPin, Phone, Clock, Mail } from 'lucide-react'

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
  return (
    <section id="contact" className="contact section" style={{ background: 'var(--color-cream)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Find Us</span>
          <h2 className="section-title">Visit Us</h2>
          <p className="section-subtitle">
            Nestled near the lakefront in the heart of Naya Raipur, we are easy to find and even easier to love.
          </p>
        </div>

        <div className="contact-layout">
          {/* Info Cards */}
          <div className="contact-info">
            {contactInfo.map((item) => (
              <div key={item.title} className="contact-card">
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

          {/* Map Embed */}
          <div className="contact-map">
            <div className="map-placeholder">
              <div className="map-pin">📍</div>
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

      <style jsx>{`
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
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
        }

        .contact-card:hover {
          transform: translateX(4px);
          box-shadow: var(--shadow-md);
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
        }

        .contact-card-title {
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-text-light);
          margin-bottom: 0.3rem;
          font-family: var(--font-body);
        }

        .contact-card-line {
          font-size: 0.92rem;
          color: var(--color-text-primary);
          line-height: 1.6;
        }

        .contact-map {
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          min-height: 400px;
          background: linear-gradient(135deg, var(--color-forest) 0%, var(--color-forest-light) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .map-placeholder {
          text-align: center;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .map-pin {
          font-size: 4rem;
          filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4));
        }

        .map-title {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          color: var(--color-gold-light);
        }

        .map-address {
          color: rgba(255,255,255,0.7);
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
