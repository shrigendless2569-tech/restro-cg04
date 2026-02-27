'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 60)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleNavClick = (href: string) => {
        setIsMobileOpen(false)
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

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
                                    className="navbar-link"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleNavClick(link.href)
                                    }}
                                >
                                    {link.label}
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
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className="mobile-link"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleNavClick(link.href)
                                }}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                    <li>
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
          background: rgba(15, 26, 15, 0.97);
          backdrop-filter: blur(12px);
          padding: 0.8rem 0;
          box-shadow: 0 2px 20px rgba(0,0,0,0.3);
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
        }

        .navbar-links {
          display: flex;
          list-style: none;
          gap: 0.3rem;
          margin-left: auto;
        }

        .navbar-link {
          display: block;
          padding: 0.5rem 0.9rem;
          color: rgba(255,255,255,0.85);
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
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--color-forest-dark);
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateX(100%);
          transition: transform 0.35s ease;
        }

        .mobile-menu-open {
          transform: translateX(0);
        }

        .mobile-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          width: 80%;
          max-width: 320px;
        }

        .mobile-link {
          display: block;
          padding: 1rem 2rem;
          color: var(--color-cream);
          text-decoration: none;
          font-size: 1.3rem;
          font-family: var(--font-heading);
          font-weight: 600;
          border-bottom: 1px solid rgba(201,168,76,0.15);
          width: 100%;
          text-align: center;
          transition: color var(--transition-fast);
        }

        .mobile-link:hover {
          color: var(--color-gold);
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
