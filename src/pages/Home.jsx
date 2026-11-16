import { categories, featuredProducts, getProductById, products } from '../data/products'
import { useRecentlyViewed } from '../hooks/useRecentlyViewed'
import ProductCard from '../components/ProductCard'
import {
  ArrowIcon,
  BagIcon,
  RefreshIcon,
  ShieldIcon,
  SparkIcon,
  StarIcon,
  TruckIcon,
} from '../components/Icons'

const benefits = [
  {
    icon: TruckIcon,
    title: 'Campus delivery',
    text: 'Free above ₹499, right to your hostel block.',
  },
  {
    icon: SparkIcon,
    title: 'Student pricing',
    text: 'Everyday low prices plus semester deals.',
  },
  {
    icon: RefreshIcon,
    title: '7-day returns',
    text: 'Changed your mind? Send it back, no stress.',
  },
  {
    icon: ShieldIcon,
    title: 'Secure checkout',
    text: 'Encrypted payments and order tracking.',
  },
]

const marqueeItems = [
  'Free delivery above ₹499',
  'Student code STUDENT15',
  '7-day easy returns',
  'Campus-first picks',
  'Secure checkout',
  'Fresh drops weekly',
]

export default function Home() {
  const { ids } = useRecentlyViewed()
  const recent = ids.map(getProductById).filter(Boolean).slice(0, 6)

  return (
    <>
      <section className="hero">
        <div className="hero-grid-overlay" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="pulse-dot" />
              Now delivering on campus
            </span>
            <h1>
              Everything campus.
              <br />
              <span className="accent-text">One store.</span>
            </h1>
            <p className="hero-lead">
              Notebooks, tech, textbooks and merch — hand-picked for college
              life. Student prices, fast campus delivery, zero last-minute
              panic.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary btn-lg" href="#/products">
                Shop all products
                <ArrowIcon width="18" height="18" />
              </a>
              <a
                className="btn btn-outline btn-lg"
                href="#/products?category=College%20Merch"
              >
                Explore merch
              </a>
            </div>
            <div className="hero-proof">
              <div className="proof-avatars" aria-hidden="true">
                <span>🎓</span>
                <span>📚</span>
                <span>💻</span>
                <span>🎒</span>
              </div>
              <div>
                <span className="proof-stars">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <StarIcon key={star} width="14" height="14" />
                  ))}
                  <strong>4.8/5</strong>
                </span>
                <p>Loved by 2,000+ students across campus</p>
              </div>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-glow" />
            <div className="hero-stage">
              <div className="stage-ring ring-one" />
              <div className="stage-ring ring-two" />
              <div className="stage-card">
                <span className="stage-tag">Bestseller</span>
                <span className="stage-emoji">🎧</span>
                <div className="stage-info">
                  <span>Wireless Earbuds Pro</span>
                  <strong>₹1,499</strong>
                </div>
              </div>
              <div className="float-card float-one">
                <span className="float-emoji">📓</span>
                <div>
                  <span>Spiral Notebook</span>
                  <strong>₹149</strong>
                </div>
              </div>
              <div className="float-card float-two">
                <span className="float-emoji">📚</span>
                <div>
                  <span>Atomic Habits</span>
                  <strong>₹349</strong>
                </div>
              </div>
              <div className="float-card float-three">
                <span className="float-emoji">🎒</span>
                <div>
                  <span>Campus Backpack</span>
                  <strong>₹1,299</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={`${item}-${index}`} className="marquee-item">
              <SparkIcon width="13" height="13" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-eyebrow">Shop by category</span>
              <h2>Find your campus essentials</h2>
            </div>
            <a className="text-link" href="#/products">
              View all
              <ArrowIcon width="16" height="16" />
            </a>
          </div>

          <div className="category-grid">
            {categories.map((category) => {
              const count = products.filter(
                (product) => product.category === category.name,
              ).length
              return (
                <a
                  key={category.name}
                  className="category-card"
                  href={`#/products?category=${encodeURIComponent(category.name)}`}
                  style={{
                    backgroundImage: `radial-gradient(120% 120% at 90% 0%, ${category.tone}40, transparent 60%)`,
                  }}
                >
                  <span className="category-emoji" aria-hidden="true">
                    {category.emoji}
                  </span>
                  <span className="category-count">{count} items</span>
                  <h3>{category.name}</h3>
                  <p>{category.blurb}</p>
                  <span className="category-arrow">
                    <ArrowIcon width="18" height="18" />
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-eyebrow">Student favourites</span>
              <h2>Featured this week</h2>
            </div>
            <a className="text-link" href="#/products">
              Shop all
              <ArrowIcon width="16" height="16" />
            </a>
          </div>

          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {recent.length > 0 && (
        <section className="section section-tight">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="section-eyebrow">Pick up where you left</span>
                <h2>Recently viewed</h2>
              </div>
              <a className="text-link" href="#/products">
                Shop all
                <ArrowIcon width="16" height="16" />
              </a>
            </div>

            <div className="product-grid recent-grid">
              {recent.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="promo-section">
        <div className="container">
          <div className="promo-banner">
            <div className="promo-copy">
              <span className="eyebrow">
                <BagIcon width="15" height="15" />
                Semester starter deal
              </span>
              <h2>
                Save 15% on your
                <br />
                first campus order.
              </h2>
              <p>
                Use code <strong>STUDENT15</strong> at checkout. Applies to
                stationery, tech, books and merch — because student budgets are
                real.
              </p>
              <a className="btn btn-primary" href="#/products">
                Start shopping
                <ArrowIcon width="17" height="17" />
              </a>
            </div>
            <div className="promo-art" aria-hidden="true">
              <div className="promo-ticket">
                <span>STUDENT</span>
                <strong>15%</strong>
                <span>OFF</span>
              </div>
              <span className="promo-emoji pe-one">🎓</span>
              <span className="promo-emoji pe-two">✏️</span>
              <span className="promo-emoji pe-three">💻</span>
            </div>
          </div>
        </div>
      </section>

      <section className="benefits">
        <div className="container benefits-grid">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div key={benefit.title} className="benefit">
                <span className="benefit-icon">
                  <Icon width="21" height="21" />
                </span>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
