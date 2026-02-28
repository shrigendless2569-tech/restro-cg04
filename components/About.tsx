'use client'

import { Leaf, Star, Clock, MapPin } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const highlights = [
  { icon: Leaf, title: 'Farm to Table', description: 'Fresh seasonal ingredients sourced from local farms and markets daily.' },
  { icon: Star, title: 'Award-Winning Recipes', description: 'Crafted by our executive chef with 15+ years of culinary mastery.' },
  { icon: Clock, title: 'Open Every Day', description: 'Serving lunch and dinner 7 days a week, 12 PM – 11 PM.' },
  { icon: MapPin, title: 'Lakeside Location', description: 'Scenic lakeside views in the heart of Naya Raipur, CG.' },
]

export default function About() {
  useScrollReveal()

  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about-grid">
          {/* Left: Visual */}
          <div className="about-visual" data-reveal="slide-left">
            <div className="about-image-wrapper">
              <div className="about-image-main">
                <div className="about-shimmer-bg" aria-hidden="true" />
                <div className="about-image-placeholder">
                  <div className="about-image-icon">🍽️</div>
                  <p>Fine Dining Experience</p>
                </div>
              </div>
              <div className="about-card-badge">
                <div className="badge-icon">⭐</div>
                <div>
                  <div className="badge-rating">3.9 / 5.0</div>
                  <div className="badge-text">Guest Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="about-content" data-reveal="slide-right" data-reveal-delay="120">
            <span className="section-label">Our Story</span>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.2rem' }}>
              Where Tradition Meets<br />
              <em>Modern Elegance</em>
            </h2>
            <div className="gold-divider" style={{ margin: '0 0 1.5rem' }} />

            <p className="about-text">
              Nestled along the shimmering lakeside of Naya Raipur, Restro CG04 is more
              than a restaurant — it's a culinary journey through the heart of India.
              Founded with a passion for authentic flavors and warm hospitality, we bring
              time-honored recipes to life with a contemporary touch.
            </p>
            <p className="about-text">
              Every dish on our menu tells a story — from the slow-braised Rogan Josh
              passed down through generations to our signature Paneer Tikka that has become
              legendary among locals. We believe that great food is made with great love.
            </p>

            {/* Highlights grid */}
            <div className="about-highlights">
              {highlights.map((h, i) => (
                <div
                  key={h.title}
                  className="highlight-card"
                  data-reveal="scale"
                  data-reveal-delay={String(200 + i * 70)}
                >
                  <div className="highlight-icon">
                    <h.icon size={20} />
                  </div>
                  <div>
                    <h4 className="highlight-title">{h.title}</h4>
                    <p className="highlight-desc">{h.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#menu"
              className="btn btn-dark"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Explore Our Menu →
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .about {
          background: var(--color-cream);
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .about-visual {
          position: relative;
        }

        .about-image-wrapper {
          position: relative;
        }

        .about-image-main {
          border-radius: var(--radius-lg);
          overflow: hidden;
          aspect-ratio: 4/5;
          background: linear-gradient(135deg, var(--color-forest) 0%, var(--color-forest-light) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-lg);
          position: relative;
        }

        .about-shimmer-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(201,168,76,0.07) 50%,
            transparent 60%
          );
          background-size: 200% 100%;
          animation: shimmer 4s linear infinite;
        }

        .about-image-placeholder {
          text-align: center;
          color: rgba(255,255,255,0.6);
          position: relative;
          z-index: 1;
        }

        .about-image-icon {
          font-size: 5rem;
          margin-bottom: 1rem;
          filter: drop-shadow(0 4px 16px rgba(0,0,0,0.4));
        }

        .about-image-placeholder p {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          color: var(--color-gold-light);
        }

        .about-card-badge {
          position: absolute;
          bottom: -1.5rem;
          right: -1.5rem;
          background: var(--color-white);
          border-radius: var(--radius-md);
          padding: 1rem 1.5rem;
          box-shadow: var(--shadow-md);
          display: flex;
          align-items: center;
          gap: 0.8rem;
          border-left: 4px solid var(--color-gold);
        }

        .badge-icon {
          font-size: 2rem;
        }

        .badge-rating {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--color-forest);
        }

        .badge-text {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          font-weight: 500;
        }

        .about-content {
          padding: 1rem 0;
        }

        .about-text {
          color: var(--color-text-muted);
          line-height: 1.8;
          margin-bottom: 1rem;
          font-size: 1rem;
        }

        .about-highlights {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin: 2rem 0;
        }

        .highlight-card {
          display: flex;
          gap: 0.8rem;
          padding: 1rem;
          background: var(--color-white);
          border-radius: var(--radius-sm);
          box-shadow: var(--shadow-sm);
          transition: transform var(--transition-base), box-shadow var(--transition-base);
          border-bottom: 2px solid transparent;
        }

        .highlight-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
          border-bottom-color: var(--color-gold);
        }

        .highlight-icon {
          flex-shrink: 0;
          width: 38px;
          height: 38px;
          background: rgba(201,168,76,0.12);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-gold-dark);
          transition: background var(--transition-fast);
        }

        .highlight-card:hover .highlight-icon {
          background: rgba(201,168,76,0.22);
        }

        .highlight-title {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--color-forest);
          margin-bottom: 0.2rem;
          font-family: var(--font-body);
        }

        .highlight-desc {
          font-size: 0.78rem;
          color: var(--color-text-muted);
          line-height: 1.5;
        }

        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .about-card-badge {
            bottom: -1rem;
            right: 1rem;
          }
        }

        @media (max-width: 480px) {
          .about-highlights {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
