'use client'

import { useState, useEffect } from 'react'

type MenuItem = {
    id: string
    name: string
    description: string
    price: number
    category: string
    is_veg: boolean
    is_available: boolean
}

const categories = [
    { key: 'all', label: 'All Items' },
    { key: 'starters', label: 'Starters' },
    { key: 'mains', label: 'Main Course' },
    { key: 'breads', label: 'Breads' },
    { key: 'rice', label: 'Rice & Biryani' },
    { key: 'desserts', label: 'Desserts' },
    { key: 'beverages', label: 'Beverages' },
]

const FALLBACK_MENU: MenuItem[] = [
    { id: '1', name: 'Paneer Tikka', description: 'Marinated cottage cheese cubes grilled in tandoor', price: 260, category: 'starters', is_veg: true, is_available: true },
    { id: '2', name: 'Chicken Seekh Kebab', description: 'Minced chicken kebabs with aromatic spices', price: 320, category: 'starters', is_veg: false, is_available: true },
    { id: '3', name: 'Veg Spring Rolls', description: 'Crispy rolls stuffed with seasoned vegetables', price: 180, category: 'starters', is_veg: true, is_available: true },
    { id: '4', name: 'Mushroom 65', description: 'South-Indian style spicy mushroom fritters', price: 220, category: 'starters', is_veg: true, is_available: true },
    { id: '5', name: 'Dal Makhani', description: 'Slow-cooked black lentils in rich tomato cream sauce', price: 280, category: 'mains', is_veg: true, is_available: true },
    { id: '6', name: 'Butter Chicken', description: 'Tender chicken in velvety tomato-butter gravy', price: 380, category: 'mains', is_veg: false, is_available: true },
    { id: '7', name: 'Shahi Paneer', description: 'Cottage cheese in rich cashew and cream sauce', price: 300, category: 'mains', is_veg: true, is_available: true },
    { id: '8', name: 'Mutton Rogan Josh', description: 'Slow-braised mutton in Kashmiri spices', price: 480, category: 'mains', is_veg: false, is_available: true },
    { id: '9', name: 'Butter Naan', description: 'Soft leavened bread baked in tandoor', price: 60, category: 'breads', is_veg: true, is_available: true },
    { id: '10', name: 'Garlic Naan', description: 'Naan topped with fresh garlic and butter', price: 80, category: 'breads', is_veg: true, is_available: true },
    { id: '11', name: 'Chicken Biryani', description: 'Layered basmati rice with tender chicken in dum style', price: 380, category: 'rice', is_veg: false, is_available: true },
    { id: '12', name: 'Biryani Veg', description: 'Aromatic basmati rice with seasonal vegetables and saffron', price: 280, category: 'rice', is_veg: true, is_available: true },
    { id: '13', name: 'Gulab Jamun', description: 'Soft milk-solid dumplings in rose sugar syrup', price: 120, category: 'desserts', is_veg: true, is_available: true },
    { id: '14', name: 'Kulfi Falooda', description: 'Traditional Indian ice cream with falooda noodles', price: 160, category: 'desserts', is_veg: true, is_available: true },
    { id: '15', name: 'Mango Lassi', description: 'Chilled yogurt drink with Alphonso mango', price: 120, category: 'beverages', is_veg: true, is_available: true },
    { id: '16', name: 'Masala Chai', description: 'Spiced Indian tea with milk', price: 60, category: 'beverages', is_veg: true, is_available: true },
]

export default function Menu() {
    const [items, setItems] = useState<MenuItem[]>(FALLBACK_MENU)
    const [activeCategory, setActiveCategory] = useState('all')
    const [vegOnly, setVegOnly] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/menu')
            .then((r) => r.json())
            .then((data) => {
                if (data && data.length > 0) setItems(data)
            })
            .catch(() => {/* use fallback */ })
            .finally(() => setLoading(false))
    }, [])

    const filtered = items.filter((item) => {
        const catMatch = activeCategory === 'all' || item.category === activeCategory
        const vegMatch = !vegOnly || item.is_veg
        return catMatch && vegMatch
    })

    return (
        <section id="menu" className="menu section" style={{ background: '#f8f4ef' }}>
            <div className="container">
                <div className="section-header">
                    <span className="section-label">Our Menu</span>
                    <h2 className="section-title">A Taste of India</h2>
                    <p className="section-subtitle">
                        Every dish crafted with passion, using authentic spices and the finest ingredients.
                    </p>
                </div>

                {/* Filters */}
                <div className="menu-filters">
                    <div className="category-tabs">
                        {categories.map((cat) => (
                            <button
                                key={cat.key}
                                id={`menu-cat-${cat.key}`}
                                className={`cat-tab ${activeCategory === cat.key ? 'cat-tab-active' : ''}`}
                                onClick={() => setActiveCategory(cat.key)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                    <button
                        id="menu-veg-toggle"
                        className={`veg-toggle ${vegOnly ? 'veg-toggle-active' : ''}`}
                        onClick={() => setVegOnly(!vegOnly)}
                    >
                        <span className="veg-dot" />
                        Veg Only
                    </button>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="menu-loading">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="skeleton-card" />
                        ))}
                    </div>
                ) : (
                    <div className="menu-grid">
                        {filtered.map((item) => (
                            <div key={item.id} className="menu-card card">
                                <div className="menu-card-header">
                                    <div className={`veg-indicator ${item.is_veg ? 'veg' : 'nonveg'}`}>
                                        <div className="veg-dot-inner" />
                                    </div>
                                    <span className="menu-category">{item.category}</span>
                                </div>
                                <div className="menu-icon">{getCategoryEmoji(item.category)}</div>
                                <h3 className="menu-item-name">{item.name}</h3>
                                <p className="menu-item-desc">{item.description}</p>
                                <div className="menu-item-footer">
                                    <span className="menu-price">₹{item.price}</span>
                                    <span className={`badge ${item.is_veg ? 'badge-veg' : 'badge-nonveg'}`}>
                                        {item.is_veg ? '● Veg' : '● Non-Veg'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {filtered.length === 0 && !loading && (
                    <div className="menu-empty">
                        <p>No items match your selection. Try a different filter.</p>
                    </div>
                )}
            </div>

            <style jsx>{`
        .menu-filters {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }

        .category-tabs {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .cat-tab {
          padding: 0.5rem 1.1rem;
          border: 1.5px solid #e5e7eb;
          background: var(--color-white);
          color: var(--color-text-muted);
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-fast);
          font-family: var(--font-body);
        }

        .cat-tab:hover {
          border-color: var(--color-gold);
          color: var(--color-gold-dark);
        }

        .cat-tab-active {
          background: var(--color-forest);
          color: var(--color-gold-light);
          border-color: var(--color-forest);
        }

        .veg-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.1rem;
          border: 1.5px solid #22c55e;
          background: transparent;
          color: #16a34a;
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
          font-family: var(--font-body);
        }

        .veg-toggle-active {
          background: rgba(34,197,94,0.1);
        }

        .veg-dot {
          width: 10px;
          height: 10px;
          background: #22c55e;
          border-radius: 50%;
        }

        .menu-loading {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.5rem;
        }

        .skeleton-card {
          height: 220px;
          border-radius: var(--radius-md);
          background: linear-gradient(90deg, #f0ebe4 25%, #e8e2da 50%, #f0ebe4 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.5rem;
        }

        .menu-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          border: 1px solid rgba(0,0,0,0.05);
        }

        .menu-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .veg-indicator {
          width: 18px;
          height: 18px;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .veg { border: 2px solid #22c55e; }
        .nonveg { border: 2px solid #ef4444; }

        .veg-dot-inner {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .veg .veg-dot-inner { background: #22c55e; }
        .nonveg .veg-dot-inner { background: #ef4444; }

        .menu-category {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-text-light);
        }

        .menu-icon {
          font-size: 2.2rem;
          line-height: 1;
        }

        .menu-item-name {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          color: var(--color-forest-dark);
          font-weight: 600;
        }

        .menu-item-desc {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          line-height: 1.5;
          flex: 1;
        }

        .menu-item-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.5rem;
          padding-top: 0.75rem;
          border-top: 1px solid #f0ebe4;
        }

        .menu-price {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--color-forest);
        }

        .menu-empty {
          text-align: center;
          padding: 3rem;
          color: var(--color-text-muted);
        }
      `}</style>
        </section>
    )
}

function getCategoryEmoji(category: string) {
    const map: Record<string, string> = {
        starters: '🍢', mains: '🍛', breads: '🫓', rice: '🍚', desserts: '🍮', beverages: '🥤',
    }
    return map[category] || '🍽️'
}
