'use client'

import { useState, useEffect, useCallback } from 'react'
import { Menu, X, Utensils } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1))
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.35 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const handleNavClick = useCallback((href: string) => {
    setIsMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar-solid' : ''}`}>
        <div className="navbar-inner container">
          {/* Logo */}
          <a href="#home" className="navbar-logo" onClick={() => handleNavClick('#home')}>
            <Utensils size={22} />
            <span>Restro CG04</span>
          </a>

          {/* Desktop Links */}
          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`navbar-link ${activeSection === link.href.slice(1) ? 'navbar-link-active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                >
                  {link.label}
                  <span className="navbar-link-dot" />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <a
            href="#reservation"
            className="btn btn-primary navbar-cta"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#reservation')
            }}
          >
            Reserve Table
          </a>

          {/* Mobile Hamburger */}
          <button
            className="navbar-hamburger"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
            id="navbar-hamburger"
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMobileOpen ? 'mobile-menu-open' : ''}`}>
        <ul className="mobile-links">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              className="mobile-link-item"
              style={{ transitionDelay: isMobileOpen ? `${i * 55 + 80}ms` : '0ms' }}
            >
              <a
                href={link.href}
                className={`mobile-link ${activeSection === link.href.slice(1) ? 'mobile-link-active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mobile-link-item" style={{ transitionDelay: isMobileOpen ? `${navLinks.length * 55 + 80}ms` : '0ms' }}>
            <a
              href="#reservation"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '1rem' }}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('#reservation')
              }}
            >
              Reserve Table
            </a>
          </li>
        </ul>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1.2rem 0;
          transition: all 0.4s ease;
        }

        .navbar-solid {
          background: rgba(10, 18, 10, 0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 0.75rem 0;
          box-shadow: 0 2px 24px rgba(0,0,0,0.4);
          border-bottom: 1px solid rgba(201,168,76,0.08);
        }

        .navbar-inner {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--color-gold);
          text-decoration: none;
          white-space: nowrap;
          letter-spacing: 0.02em;
          transition: opacity var(--transition-fast);
        }
        .navbar-logo:hover { opacity: 0.85; }

        .navbar-links {
          display: flex;
          list-style: none;
          gap: 0.3rem;
          margin-left: auto;
        }

        .navbar-link {
          display: block;
          position: relative;
          padding: 0.5rem 0.9rem;
          color: rgba(255,255,255,0.82);
          text-decoration: none;
          font-size: 0.92rem;
          font-weight: 500;
          letter-spacing: 0.03em;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }

        .navbar-link:hover {
          color: var(--color-gold-light);
          background: rgba(201,168,76,0.08);
        }

        .navbar-link-active {
          color: var(--color-gold-light) !important;
        }

        .navbar-link-dot {
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%) scale(0);
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--color-gold);
          transition: transform 0.25s ease;
        }

        .navbar-link-active .navbar-link-dot,
        .navbar-link:hover .navbar-link-dot {
          transform: translateX(-50%) scale(1);
        }

        .navbar-cta {
          padding: 0.6rem 1.3rem;
          font-size: 0.88rem;
          white-space: nowrap;
        }

        .navbar-hamburger {
          display: none;
          background: none;
          border: none;
          color: var(--color-white);
          cursor: pointer;
          padding: 0.3rem;
          margin-left: auto;
          transition: color var(--transition-fast);
        }
        .navbar-hamburger:hover { color: var(--color-gold); }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(ellipse at 30% 20%, rgba(42,74,42,0.4) 0%, var(--color-forest-dark) 70%);
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateX(100%);
          transition: transform 0.38s cubic-bezier(0.77,0,0.175,1);
        }

        .mobile-menu-open {
          transform: translateX(0);
        }

        .mobile-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          width: 80%;
          max-width: 320px;
        }

        .mobile-link-item {
          width: 100%;
          opacity: 0;
          transform: translateX(30px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .mobile-menu-open .mobile-link-item {
          opacity: 1;
          transform: translateX(0);
        }

        .mobile-link {
          display: block;
          padding: 1rem 2rem;
          color: var(--color-cream);
          text-decoration: none;
          font-size: 1.3rem;
          font-family: var(--font-heading);
          font-weight: 600;
          border-bottom: 1px solid rgba(201,168,76,0.12);
          width: 100%;
          text-align: center;
          transition: color var(--transition-fast);
          letter-spacing: 0.02em;
        }

        .mobile-link:hover,
        .mobile-link-active {
          color: var(--color-gold-light);
        }

        @media (max-width: 900px) {
          .navbar-links, .navbar-cta {
            display: none;
          }
          .navbar-hamburger {
            display: flex;
          }
        }
      `}</style>
    </>
  )
}
