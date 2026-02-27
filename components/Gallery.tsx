'use client'

import Image from 'next/image'
import { useState } from 'react'
import { X } from 'lucide-react'

const galleryItems = [
  { id: 1, src: '/images/hero-lakeside.jpg', label: 'Lakeside Sunset View', size: 'tall' },
  { id: 2, src: '/images/paneer-tikka.jpg', label: 'Signature Paneer Tikka', size: 'normal' },
  { id: 3, src: '/images/biryani.jpg', label: 'Dum Chicken Biryani', size: 'normal' },
  { id: 4, src: '/images/outdoor-seating.jpg', label: 'Garden Seating Area', size: 'wide' },
  { id: 5, src: '/images/dal-makhani.jpg', label: 'Dal Makhani Special', size: 'normal' },
  { id: 6, src: '/images/lake-view.jpg', label: 'Evening Lake View', size: 'tall' },
  { id: 7, src: '/images/desserts.jpg', label: 'Dessert Collection', size: 'normal' },
  { id: 8, src: '/images/interior.jpg', label: 'Fine Dining Interior', size: 'normal' },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null)

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
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`gallery-item gallery-item-${item.size}`}
              onClick={() => setLightbox({ src: item.src, label: item.label })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setLightbox({ src: item.src, label: item.label })}
            >
              <div className="gallery-inner">
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  style={{ objectFit: 'cover' }}
                  className="gallery-img"
                />
                <div className="gallery-overlay">
                  <p className="gallery-label">{item.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>
            <X size={24} />
          </button>
          <div className="lightbox-img-wrap" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightbox.src}
              alt={lightbox.label}
              fill
              style={{ objectFit: 'contain' }}
              sizes="90vw"
            />
          </div>
          <p className="lightbox-label">{lightbox.label}</p>
        </div>
      )}

      <style jsx>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          grid-auto-rows: 220px;
        }

        .gallery-item {
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: pointer;
          position: relative;
        }

        .gallery-item-tall { grid-row: span 2; }
        .gallery-item-wide { grid-column: span 2; }

        .gallery-inner {
          width: 100%;
          height: 100%;
          position: relative;
          min-height: 220px;
        }

        :global(.gallery-img) {
          transition: transform 0.4s ease !important;
        }

        .gallery-item:hover :global(.gallery-img) {
          transform: scale(1.06) !important;
        }

        .gallery-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.65));
          padding: 2rem 1rem 0.8rem;
          transform: translateY(100%);
          transition: transform 0.3s ease;
          z-index: 2;
        }

        .gallery-item:hover .gallery-overlay {
          transform: translateY(0);
        }

        .gallery-label {
          color: var(--color-white);
          font-size: 0.9rem;
          font-weight: 600;
          font-family: var(--font-heading);
        }

        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.92);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 1rem;
          padding: 2rem;
        }

        .lightbox-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }

        .lightbox-close:hover { background: rgba(255,255,255,0.2); }

        .lightbox-img-wrap {
          position: relative;
          width: 90vw;
          height: 80vh;
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .lightbox-label {
          color: rgba(255,255,255,0.75);
          font-size: 1rem;
          font-family: var(--font-heading);
        }

        @media (max-width: 900px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 480px) {
          .gallery-grid { grid-template-columns: 1fr 1fr; grid-auto-rows: 160px; }
          .gallery-item-tall { grid-row: span 1; }
          .gallery-item-wide { grid-column: span 2; }
        }
      `}</style>
    </section>
  )
}
