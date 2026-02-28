'use client'

import { useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Subtle parallax on background
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const handleScroll = () => {
      const scrollY = window.scrollY
      hero.style.setProperty('--parallax-y', `${scrollY * 0.35}px`)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="home" className="hero" ref={heroRef}>
      {/* Animated floating orbs */}
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="hero-orb hero-orb-3" aria-hidden="true" />

      {/* Content */}
      <div className="hero-content">
        <div className="hero-badge animate-fade-in">
          ✦ Fine Dining Experience · Naya Raipur
        </div>

        <h1 className="hero-title animate-fade-in-up">
          Lakeside Dining
          <br />
          <span className="hero-title-accent">Reimagined</span>
        </h1>

        <p className="hero-subtitle animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Savor the finest Indian cuisine against the backdrop of a serene lakeside
          at Restro CG04 — where every meal becomes a cherished memory.
        </p>

        <div className="hero-ctas animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
          <button
            id="hero-reserve-btn"
            className="btn btn-primary hero-btn"
            onClick={() => scrollToSection('#reservation')}
          >
            Reserve Your Table
          </button>
          <button
            id="hero-menu-btn"
            className="btn btn-outline hero-btn"
            onClick={() => scrollToSection('#menu')}
          >
            Explore Menu
          </button>
        </div>

        {/* Stats */}
        <div className="hero-stats animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="hero-stat">
            <span className="hero-stat-value">4.0★</span>
            <span className="hero-stat-label">Guest Rating</span>
          </div>
          <div className="hero-divider" />
          <div className="hero-stat">
            <span className="hero-stat-value">₹400–600</span>
            <span className="hero-stat-label">Per Person</span>
          </div>
          <div className="hero-divider" />
          <div className="hero-stat">
            <span className="hero-stat-value">1900+</span>
            <span className="hero-stat-label">Reviews</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        className="hero-scroll"
        onClick={() => scrollToSection('#about')}
        aria-label="Scroll down"
      >
        <ChevronDown size={24} />
      </button>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background-image: url('/images/hero-lakeside.jpg');
          background-size: cover;
          background-position: center calc(50% + var(--parallax-y, 0px));
        }

        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            160deg,
            rgba(6, 14, 6, 0.88) 0%,
            rgba(18, 36, 18, 0.64) 50%,
            rgba(4, 12, 8, 0.92) 100%
          );
          z-index: 1;
        }

        /* Floating orbs */
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          z-index: 1;
          pointer-events: none;
          animation: floatOrb linear infinite;
        }

        .hero-orb-1 {
          width: 420px;
          height: 420px;
          background: rgba(201,168,76,0.14);
          top: -80px;
          right: 10%;
          animation-duration: 9s;
          animation-delay: 0s;
        }

        .hero-orb-2 {
          width: 300px;
          height: 300px;
          background: rgba(42,74,42,0.22);
          bottom: 5%;
          left: 5%;
          animation-duration: 12s;
          animation-delay: -3s;
        }

        .hero-orb-3 {
          width: 200px;
          height: 200px;
          background: rgba(201,168,76,0.09);
          top: 40%;
          left: 15%;
          animation-duration: 7s;
          animation-delay: -5s;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 2rem 1.5rem;
          max-width: 800px;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(201,168,76,0.12);
          border: 1px solid rgba(201,168,76,0.3);
          color: var(--color-gold-light);
          padding: 0.45rem 1.4rem;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          backdrop-filter: blur(8px);
        }

        .hero-title {
          font-size: clamp(3rem, 8vw, 6.5rem);
          font-weight: 800;
          color: var(--color-white);
          line-height: 1.03;
          margin-bottom: 1.5rem;
          text-shadow: 0 2px 40px rgba(0,0,0,0.5);
          letter-spacing: -0.02em;
        }

        .hero-title-accent {
          background: linear-gradient(135deg, var(--color-gold-light), var(--color-gold), var(--color-gold-dark));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          color: rgba(255,255,255,0.8);
          max-width: 560px;
          margin: 0 auto 2.5rem;
          line-height: 1.75;
          text-shadow: 0 1px 8px rgba(0,0,0,0.4);
        }

        .hero-ctas {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 3.5rem;
        }

        .hero-btn {
          min-width: 160px;
        }

        .hero-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-lg);
          padding: 1.2rem 2.5rem;
          backdrop-filter: blur(12px);
        }

        .hero-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
        }

        .hero-stat-value {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-gold-light);
        }

        .hero-stat-label {
          font-size: 0.74rem;
          color: rgba(255,255,255,0.55);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 500;
        }

        .hero-divider {
          width: 1px;
          height: 36px;
          background: rgba(201,168,76,0.25);
        }

        .hero-scroll {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(201,168,76,0.12);
          border: 1px solid rgba(201,168,76,0.28);
          color: var(--color-gold);
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          animation: bounce 2.2s ease-in-out infinite;
          z-index: 3;
          transition: background var(--transition-fast), border-color var(--transition-fast);
        }

        .hero-scroll:hover {
          background: rgba(201,168,76,0.22);
          border-color: rgba(201,168,76,0.5);
        }

        @media (max-width: 480px) {
          .hero-stats {
            gap: 1.2rem;
            padding: 1rem 1.5rem;
          }
          .hero-divider { height: 24px; }
          .hero-orb-1 { width: 240px; height: 240px; }
          .hero-orb-2 { width: 180px; height: 180px; }
        }
      `}</style>
    </section>
  )
}
