'use client'

const galleryItems = [
    { id: 1, emoji: '🌅', label: 'Lakeside Sunset View', size: 'tall' },
    { id: 2, emoji: '🍛', label: 'Signature Dal Makhani', size: 'normal' },
    { id: 3, emoji: '🥘', label: 'Rogan Josh Special', size: 'normal' },
    { id: 4, emoji: '🌿', label: 'Garden Seating Area', size: 'wide' },
    { id: 5, emoji: '🍢', label: 'Paneer Tikka Platter', size: 'normal' },
    { id: 6, emoji: '🎆', label: 'Evening Ambience', size: 'tall' },
    { id: 7, emoji: '🍮', label: 'Dessert Collection', size: 'normal' },
    { id: 8, emoji: '☕', label: 'Masala Chai Experience', size: 'normal' },
]

const gradients = [
    'linear-gradient(135deg, #1a2e1a, #2a4a2a)',
    'linear-gradient(135deg, #2a1a0e, #4a2e1a)',
    'linear-gradient(135deg, #1a1a2e, #2a2a4a)',
    'linear-gradient(135deg, #2e1a1a, #4a2c2c)',
    'linear-gradient(135deg, #0e2a1a, #1a4a2e)',
    'linear-gradient(135deg, #2e2a1a, #4a421a)',
    'linear-gradient(135deg, #1a2a2e, #1a3a4a)',
    'linear-gradient(135deg, #2a1a2e, #3a1a4a)',
]

export default function Gallery() {
    return (
        <section id="gallery" className="gallery section" style={{ background: 'var(--color-cream)' }}>
            <div className="container">
                <div className="section-header">
                    <span className="section-label">Gallery</span>
                    <h2 className="section-title">A Glimpse of Our World</h2>
                    <p className="section-subtitle">
                        From lakeside sunsets to culinary masterpieces — experience the magic of Restro CG04.
                    </p>
                </div>

                <div className="gallery-grid">
                    {galleryItems.map((item, i) => (
                        <div
                            key={item.id}
                            className={`gallery-item gallery-item-${item.size}`}
                            style={{ background: gradients[i % gradients.length] }}
                        >
                            <div className="gallery-inner">
                                <div className="gallery-emoji">{item.emoji}</div>
                                <div className="gallery-overlay">
                                    <p className="gallery-label">{item.label}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: auto;
          gap: 1rem;
          grid-auto-rows: 200px;
        }

        .gallery-item {
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: pointer;
          position: relative;
        }

        .gallery-item-tall {
          grid-row: span 2;
        }

        .gallery-item-wide {
          grid-column: span 2;
        }

        .gallery-inner {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          min-height: 200px;
          transition: transform var(--transition-base);
        }

        .gallery-item:hover .gallery-inner {
          transform: scale(1.02);
        }

        .gallery-emoji {
          font-size: 4rem;
          filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4));
          transition: transform var(--transition-base);
          z-index: 1;
        }

        .gallery-item:hover .gallery-emoji {
          transform: scale(1.15);
        }

        .gallery-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.6));
          padding: 1.5rem 1rem 0.8rem;
          transform: translateY(100%);
          transition: transform var(--transition-base);
        }

        .gallery-item:hover .gallery-overlay {
          transform: translateY(0);
        }

        .gallery-label {
          color: var(--color-white);
          font-size: 0.88rem;
          font-weight: 600;
          font-family: var(--font-heading);
        }

        @media (max-width: 900px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .gallery-grid {
            grid-template-columns: 1fr 1fr;
            grid-auto-rows: 160px;
          }

          .gallery-item-tall {
            grid-row: span 1;
          }

          .gallery-item-wide {
            grid-column: span 2;
          }
        }
      `}</style>
        </section>
    )
}
