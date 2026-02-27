'use client'

import { useState, useEffect } from 'react'
import { Star, User } from 'lucide-react'

type Review = {
    id: string
    author_name: string
    rating: number
    comment: string
    created_at: string
}

const FALLBACK_REVIEWS: Review[] = [
    { id: '1', author_name: 'Priya Sharma', rating: 5, comment: 'Absolutely stunning lakeside view! The Paneer Tikka was melt-in-your-mouth perfect and the ambience was magical during sunset. Will definitely visit again.', created_at: '2024-11-15' },
    { id: '2', author_name: 'Rahul Mehta', rating: 4, comment: 'Great place for a family dinner. The Chicken Biryani was fragrant and perfectly cooked. Service was warm and attentive. Highly recommended!', created_at: '2024-12-02' },
    { id: '3', author_name: 'Ananya Patel', rating: 5, comment: 'Came here for our anniversary dinner and the staff made it extra special. The Mutton Rogan Josh was phenomenal — rich, aromatic, and tender.', created_at: '2024-12-20' },
    { id: '4', author_name: 'Vikram Singh', rating: 4, comment: 'The lakeside setting is a real treat. Food quality is consistently good. Dal Makhani and Garlic Naan combo is a must-try!', created_at: '2025-01-08' },
    { id: '5', author_name: 'Deepika Nair', rating: 3, comment: 'Good food and lovely ambience but the service was a bit slow on busy weekends. The Kulfi Falooda made up for it though!', created_at: '2025-01-22' },
    { id: '6', author_name: 'Arjun Gupta', rating: 5, comment: 'Best fine dining experience in Naya Raipur! Every dish was an explosion of flavors. The lakeside location with gentle breeze was just perfect.', created_at: '2025-02-10' },
]

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="stars">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star
                    key={s}
                    size={16}
                    fill={s <= rating ? '#c9a84c' : 'none'}
                    color={s <= rating ? '#c9a84c' : '#d1d5db'}
                />
            ))}
        </div>
    )
}

export default function Reviews() {
    const [reviews, setReviews] = useState<Review[]>(FALLBACK_REVIEWS)
    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState({ author_name: '', rating: 5, comment: '' })
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        fetch('/api/reviews')
            .then((r) => r.json())
            .then((data) => { if (data && data.length > 0) setReviews(data) })
            .catch(() => { })
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            if (res.ok) {
                const newReview = await res.json()
                setReviews((prev) => [newReview, ...prev])
                setSubmitted(true)
                setShowForm(false)
                setForm({ author_name: '', rating: 5, comment: '' })
            }
        } catch {
            // silently fail
        } finally {
            setSubmitting(false)
        }
    }

    const avgRating = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length

    return (
        <section id="reviews" className="reviews section" style={{ background: '#f8f4ef' }}>
            <div className="container">
                <div className="section-header">
                    <span className="section-label">Reviews</span>
                    <h2 className="section-title">What Our Guests Say</h2>
                    <div className="reviews-summary">
                        <div className="avg-rating">
                            <span className="avg-number">{avgRating.toFixed(1)}</span>
                            <div>
                                <StarRating rating={Math.round(avgRating)} />
                                <span className="reviews-count">{reviews.length} Reviews</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Review Cards */}
                <div className="reviews-grid">
                    {reviews.map((review) => (
                        <div key={review.id} className="review-card card">
                            <div className="review-header">
                                <div className="reviewer-avatar">
                                    <User size={20} />
                                </div>
                                <div>
                                    <div className="reviewer-name">{review.author_name}</div>
                                    <div className="review-date">
                                        {new Date(review.created_at).toLocaleDateString('en-IN', {
                                            month: 'short', year: 'numeric',
                                        })}
                                    </div>
                                </div>
                                <div style={{ marginLeft: 'auto' }}>
                                    <StarRating rating={review.rating} />
                                </div>
                            </div>
                            <p className="review-text">&quot;{review.comment}&quot;</p>
                        </div>
                    ))}
                </div>

                {/* Write Review */}
                <div className="write-review-wrap">
                    {submitted && (
                        <div className="success-msg">
                            ✅ Thank you for your review! It has been submitted.
                        </div>
                    )}
                    {!showForm ? (
                        <button
                            id="write-review-btn"
                            className="btn btn-dark"
                            onClick={() => setShowForm(true)}
                        >
                            Write a Review
                        </button>
                    ) : (
                        <form className="review-form" onSubmit={handleSubmit}>
                            <h3 className="review-form-title">Share Your Experience</h3>

                            <div className="form-group">
                                <label className="form-label">Your Name</label>
                                <input
                                    id="review-name"
                                    className="form-input"
                                    type="text"
                                    required
                                    placeholder="e.g. Rahul Sharma"
                                    value={form.author_name}
                                    onChange={(e) => setForm({ ...form, author_name: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Rating</label>
                                <div className="rating-input">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            id={`rating-star-${s}`}
                                            onClick={() => setForm({ ...form, rating: s })}
                                        >
                                            <Star
                                                size={28}
                                                fill={s <= form.rating ? '#c9a84c' : 'none'}
                                                color={s <= form.rating ? '#c9a84c' : '#d1d5db'}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Your Review</label>
                                <textarea
                                    id="review-comment"
                                    className="form-textarea"
                                    required
                                    placeholder="Tell us about your dining experience..."
                                    value={form.comment}
                                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    type="submit"
                                    id="review-submit-btn"
                                    className="btn btn-primary"
                                    disabled={submitting}
                                >
                                    {submitting ? 'Submitting...' : 'Submit Review'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-dark"
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            <style jsx>{`
        .reviews-summary {
          margin-top: 1rem;
        }

        .avg-rating {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          background: var(--color-white);
          padding: 1rem 1.5rem;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
        }

        .avg-number {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--color-forest);
          line-height: 1;
        }

        .reviews-count {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          display: block;
          margin-top: 0.25rem;
        }

        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .review-card {
          padding: 1.5rem;
        }

        .review-header {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1rem;
        }

        .reviewer-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-forest), var(--color-forest-light));
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-gold);
          flex-shrink: 0;
        }

        .reviewer-name {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--color-forest-dark);
        }

        .review-date {
          font-size: 0.78rem;
          color: var(--color-text-light);
        }

        .review-text {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          line-height: 1.7;
          font-style: italic;
        }

        .write-review-wrap {
          text-align: center;
        }

        .success-msg {
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.3);
          color: #15803d;
          padding: 0.9rem 1.5rem;
          border-radius: var(--radius-sm);
          margin-bottom: 1rem;
          font-weight: 500;
        }

        .review-form {
          max-width: 560px;
          margin: 0 auto;
          background: var(--color-white);
          padding: 2rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .review-form-title {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          color: var(--color-forest-dark);
          margin-bottom: 0.3rem;
        }

        .rating-input {
          display: flex;
          gap: 0.3rem;
        }

        .rating-input button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.2rem;
          transition: transform var(--transition-fast);
        }

        .rating-input button:hover {
          transform: scale(1.2);
        }
      `}</style>
        </section>
    )
}
