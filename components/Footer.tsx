'use client'

import { Utensils, Instagram, Facebook, Twitter } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const footerLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Reservations', href: '#reservation' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
]

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }
  useScrollReveal()

  return (
    <footer className="footer">
      {/* Gold top accent */}
      <div className="footer-top-accent" aria-hidden="true" />

      <div className="container">
        <div className="footer-main">
          {/* Brand */}
          <div className="footer-brand" data-reveal="slide-up" data-reveal-delay="0">
            <div className="footer-logo">
              <Utensils size={20} />
              <span>Restro CG04</span>
            </div>
            <p className="footer-tagline">
              Fine lakeside dining in the heart of Naya Raipur, Chhattisgarh.
              Crafting memories one plate at a time since 2019.
            </p>
            <div className="social-links">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="social-link"
                  id={`footer-${s.label.toLowerCase()}`}
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col" data-reveal="slide-up" data-reveal-delay="80">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="footer-link"
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                  >
                    <span className="footer-link-arrow">›</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div className="footer-col" data-reveal="slide-up" data-reveal-delay="160">
            <h4 className="footer-col-title">Opening Hours</h4>
            <div className="hours-list">
              <div className="hours-row">
                <span>Mon – Fri</span>
                <span>12:00 PM – 11:00 PM</span>
              </div>
              <div className="hours-row">
                <span>Sat – Sun</span>
                <span>11:00 AM – 11:30 PM</span>
              </div>
              <div className="hours-row">
                <span>Last Order</span>
                <span>10:30 PM</span>
              </div>
              <div className="hours-row">
                <span>Public Holidays</span>
                <span>12:00 PM – 10:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Restro CG04. All rights reserved.</p>
          <p style={{ color: 'rgba(255,255,255,0.35)' }}>
            Sector 27, Naya Raipur, Chhattisgarh · ₹400–600 per person
          </p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--color-forest-dark);
          padding: 5rem 0 2rem;
          position: relative;
        }

        .footer-top-accent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg,
            transparent 0%,
            var(--color-gold-dark) 20%,
            var(--color-gold-light) 50%,
            var(--color-gold-dark) 80%,
            transparent 100%
          );
        }

        .footer-main {
          display: grid;
          grid-template-columns: 2fr 1fr 1.5fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--color-gold);
          margin-bottom: 1rem;
        }

        .footer-tagline {
          color: rgba(255,255,255,0.5);
          font-size: 0.88rem;
          line-height: 1.75;
          margin-bottom: 1.5rem;
          max-width: 280px;
        }

        .social-links {
          display: flex;
          gap: 0.7rem;
        }

        .social-link {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-sm);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          transition: all var(--transition-base);
        }

        .social-link:hover {
          background: rgba(201,168,76,0.15);
          border-color: rgba(201,168,76,0.4);
          color: var(--color-gold);
          transform: translateY(-3px);
        }

        .footer-col-title {
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--color-gold-light);
          margin-bottom: 1.2rem;
          font-family: var(--font-body);
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }

        .footer-link {
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          font-size: 0.88rem;
          transition: color var(--transition-fast), transform var(--transition-fast);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .footer-link-arrow {
          color: var(--color-gold-dark);
          font-size: 1rem;
          line-height: 1;
          transition: transform var(--transition-fast);
        }

        .footer-link:hover {
          color: var(--color-gold-light);
        }

        .footer-link:hover .footer-link-arrow {
          transform: translateX(3px);
        }

        .hours-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .hours-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          gap: 0.5rem;
        }

        .hours-row span:first-child {
          color: rgba(255,255,255,0.5);
        }

        .hours-row span:last-child {
          color: rgba(255,255,255,0.85);
          font-weight: 500;
        }

        .footer-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin-bottom: 1.5rem;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.4);
        }

        @media (max-width: 900px) {
          .footer-main {
            grid-template-columns: 1fr 1fr;
          }
          .footer-brand {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 480px) {
          .footer-main {
            grid-template-columns: 1fr;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  )
}
