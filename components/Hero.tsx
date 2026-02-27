'use client'

import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="hero">
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

        <div className="hero-ctas animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <button
            id="hero-reserve-btn"
            className="btn btn-primary"
            onClick={() => scrollToSection('#reservation')}
          >
            Reserve Your Table
          </button>
          <button
            id="hero-menu-btn"
            className="btn btn-outline"
            onClick={() => scrollToSection('#menu')}
          >
            Explore Menu
          </button>
        </div>

        {/* Stats */}
        <div className="hero-stats animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
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

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: url('/images/hero-lakeside.jpg') center center / cover no-repeat;
        }

        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            160deg,
            rgba(10, 20, 10, 0.82) 0%,
            rgba(20, 40, 20, 0.68) 50%,
            rgba(5, 15, 10, 0.88) 100%
          );
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 2rem 1.5rem;
          max-width: 780px;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(201,168,76,0.15);
          border: 1px solid rgba(201,168,76,0.35);
          color: var(--color-gold-light);
          padding: 0.45rem 1.4rem;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }

        .hero-title {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 800;
          color: var(--color-white);
          line-height: 1.05;
          margin-bottom: 1.5rem;
          text-shadow: 0 2px 40px rgba(0,0,0,0.5);
        }

        .hero-title-accent {
          background: linear-gradient(135deg, var(--color-gold-light), var(--color-gold));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          color: rgba(255,255,255,0.82);
          max-width: 560px;
          margin: 0 auto 2.5rem;
          line-height: 1.7;
          text-shadow: 0 1px 8px rgba(0,0,0,0.4);
        }

        .hero-ctas {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 3.5rem;
        }

        .hero-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
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
          font-size: 0.78rem;
          color: rgba(255,255,255,0.6);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 500;
        }

        .hero-divider {
          width: 1px;
          height: 36px;
          background: rgba(201,168,76,0.3);
        }

        .hero-scroll {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(201,168,76,0.15);
          border: 1px solid rgba(201,168,76,0.3);
          color: var(--color-gold);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          animation: bounce 2s infinite;
          z-index: 3;
        }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }

        @media (max-width: 480px) {
          .hero-stats { gap: 1.2rem; }
          .hero-divider { height: 24px; }
        }
      `}</style>
    </section>
  )
}
