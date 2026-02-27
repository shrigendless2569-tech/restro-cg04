'use client'

import Image from 'next/image'
import { useState } from 'react'
import { X, ZoomIn } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

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
  const [lightboxVisible, setLightboxVisible] = useState(false)
  useScrollReveal()

  const openLightbox = (item: { src: string; label: string }) => {
    setLightbox(item)
    // small timeout so CSS transition fires
    requestAnimationFrame(() => requestAnimationFrame(() => setLightboxVisible(true)))
  }

  const closeLightbox = () => {
    setLightboxVisible(false)
    setTimeout(() => setLightbox(null), 300)
  }

  return (
    <section id="gallery" className="gallery section" style={{ background: 'var(--color-cream)' }}>
      <div className="container">
        <div className="section-header" data-reveal="slide-up">
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
              data-reveal="scale"
              data-reveal-delay={String(i * 55)}
              onClick={() => openLightbox({ src: item.src, label: item.label })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox({ src: item.src, label: item.label })}
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
                  <ZoomIn size={20} className="gallery-zoom-icon" />
                  <p className="gallery-label">{item.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className={`lightbox ${lightboxVisible ? 'lightbox-visible' : ''}`}
          onClick={closeLightbox}
        >
          <button className="lightbox-close" onClick={closeLightbox}>
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
          transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94) !important;
        }

        .gallery-item:hover :global(.gallery-img) {
          transform: scale(1.08) !important;
        }

        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(transparent 40%, rgba(0,0,0,0.72));
          padding: 2rem 1rem 1rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 0.4rem;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 2;
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        :global(.gallery-zoom-icon) {
          color: var(--color-gold-light);
          align-self: flex-end;
          margin-bottom: auto;
          margin-top: 0;
          opacity: 0;
          transform: scale(0.7);
          transition: opacity 0.25s ease 0.05s, transform 0.25s ease 0.05s;
        }

        .gallery-item:hover :global(.gallery-zoom-icon) {
          opacity: 1;
          transform: scale(1);
        }

        .gallery-label {
          color: var(--color-white);
          font-size: 0.88rem;
          font-weight: 600;
          font-family: var(--font-heading);
          transform: translateY(6px);
          transition: transform 0.25s ease;
        }

        .gallery-item:hover .gallery-label {
          transform: translateY(0);
        }

        /* Lightbox */
        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 1rem;
          padding: 2rem;
          transition: background 0.3s ease;
          backdrop-filter: blur(0px);
          -webkit-backdrop-filter: blur(0px);
        }

        .lightbox-visible {
          background: rgba(0,0,0,0.92);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .lightbox-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background var(--transition-fast), transform var(--transition-fast);
        }

        .lightbox-close:hover {
          background: rgba(255,255,255,0.2);
          transform: rotate(90deg);
        }

        .lightbox-img-wrap {
          position: relative;
          width: 90vw;
          height: 80vh;
          border-radius: var(--radius-md);
          overflow: hidden;
          opacity: 0;
          transform: scale(0.92);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .lightbox-visible .lightbox-img-wrap {
          opacity: 1;
          transform: scale(1);
        }

        .lightbox-label {
          color: rgba(255,255,255,0.75);
          font-size: 1rem;
          font-family: var(--font-heading);
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.3s ease 0.15s, transform 0.3s ease 0.15s;
        }

        .lightbox-visible .lightbox-label {
          opacity: 1;
          transform: translateY(0);
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
