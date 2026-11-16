import { useEffect, useRef, useState } from 'react'
import { formatPrice, getProductById, products } from '../data/products'
import { getProductReviews } from '../data/reviews'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import { useRecentlyViewed } from '../hooks/useRecentlyViewed'
import ProductCard from '../components/ProductCard'
import {
  ArrowIcon,
  CheckIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  RefreshIcon,
  StarIcon,
  TruckIcon,
} from '../components/Icons'

export default function ProductDetail({ id }) {
  const product = getProductById(id)
  const { user, openAuthModal } = useAuth()
  const { addItem } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { showToast } = useToast()
  const { recordView } = useRecentlyViewed()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  useEffect(() => {
    if (product) recordView(product.id)
  }, [product, recordView])

  if (!product) {
    return (
      <div className="container page">
        <div className="empty-state">
          <span className="empty-emoji" aria-hidden="true">
            🧐
          </span>
          <h2>Product not found</h2>
          <p>This item may have moved. Browse the full catalogue instead.</p>
          <a className="btn btn-primary" href="#/products">
            Back to shop
          </a>
        </div>
      </div>
    )
  }

  const related = products
    .filter(
      (item) => item.category === product.category && item.id !== product.id,
    )
    .slice(0, 4)
  const reviews = getProductReviews(product)
  const saved = isWishlisted(product.id)

  const handleAdd = () => {
    if (!user) {
      showToast('Please sign in to add items to your cart', '🔒')
      openAuthModal()
      return
    }
    addItem(product, quantity)
    setAdded(true)
    showToast(`${product.name} added to cart`, product.emoji)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setAdded(false), 1600)
  }

  const handleWishlist = () => {
    if (!user) {
      showToast('Please sign in to save items to your wishlist', '🔒')
      openAuthModal()
      return
    }
    toggleWishlist(product.id)
    showToast(
      saved
        ? `${product.name} removed from wishlist`
        : `${product.name} saved to wishlist`,
      saved ? '💔' : '💖',
    )
  }

  const handleBuyNow = () => {
    if (!user) {
      showToast('Please sign in to checkout', '🔒')
      openAuthModal()
      return
    }
    addItem(product, quantity)
    window.location.assign('#/cart')
  }

  return (
    <div className="page">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="#/">Home</a>
          <span>/</span>
          <a href="#/products">Shop</a>
          <span>/</span>
          <a
            href={`#/products?category=${encodeURIComponent(product.category)}`}
          >
            {product.category}
          </a>
          <span>/</span>
          <strong>{product.name}</strong>
        </nav>

        <div className="detail-layout">
          <div
            className="detail-media"
            style={{
              backgroundImage: `radial-gradient(110% 100% at 80% 0%, ${product.tone}66, transparent 62%)`,
            }}
          >
            {product.badge && (
              <span
                className={`product-badge ${
                  product.badge === 'New' ? 'is-new' : ''
                }`}
              >
                {product.badge}
              </span>
            )}
            <span className="detail-emoji" aria-hidden="true">
              {product.emoji}
            </span>
            <img
              className="detail-photo"
              src={product.image}
              alt={product.name}
              onError={(event) => {
                event.currentTarget.style.display = 'none'
              }}
            />
            <div className="detail-media-note">
              <span>🚚</span> Free campus delivery above ₹499
            </div>
          </div>

          <div className="detail-info">
            <div className="detail-topline">
              <span className="product-category">{product.category}</span>
              <button
                type="button"
                className={`wish-btn ${saved ? 'active' : ''}`}
                onClick={handleWishlist}
                aria-pressed={saved}
              >
                <HeartIcon width="16" height="16" />
                {saved ? 'Saved' : 'Save'}
              </button>
            </div>
            <h1>{product.name}</h1>

            <div className="detail-rating">
              <span className="proof-stars">
                {[0, 1, 2, 3, 4].map((star) => (
                  <StarIcon key={star} width="15" height="15" />
                ))}
              </span>
              <strong>{product.rating}</strong>
              <span className="detail-reviews">
                {product.reviews} verified student reviews
              </span>
            </div>

            <div className="detail-price">
              <strong>{formatPrice(product.price)}</strong>
              {product.oldPrice && (
                <>
                  <s>{formatPrice(product.oldPrice)}</s>
                  <span className="save-pill">
                    Save {formatPrice(product.oldPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            <p className="detail-description">{product.description}</p>

            <ul className="feature-list">
              {product.features.map((feature) => (
                <li key={feature}>
                  <CheckIcon width="15" height="15" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="detail-buy">
              <div className="qty-control" aria-label="Quantity">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                >
                  <MinusIcon width="16" height="16" />
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  aria-label="Increase quantity"
                >
                  <PlusIcon width="16" height="16" />
                </button>
              </div>

              <button
                type="button"
                className={`btn btn-primary btn-lg add-main ${added ? 'is-added' : ''}`}
                onClick={handleAdd}
              >
                {added ? (
                  <>
                    <CheckIcon width="18" height="18" /> Added to cart
                  </>
                ) : (
                  <>
                    Add to cart · {formatPrice(product.price * quantity)}
                  </>
                )}
              </button>
              <button
                type="button"
                className="btn btn-outline btn-lg"
                onClick={handleBuyNow}
              >
                Buy now
                <ArrowIcon width="17" height="17" />
              </button>
            </div>

            <div className="detail-perks">
              <span>
                <TruckIcon width="17" height="17" /> Campus delivery in 24–48 hours
              </span>
              <span>
                <RefreshIcon width="17" height="17" /> 7-day returns
              </span>
            </div>
          </div>
        </div>

        <section className="reviews-section">
          <div className="section-head">
            <div>
              <span className="section-eyebrow">Student reviews</span>
              <h2>What students are saying</h2>
            </div>
            <span className="reviews-count">
              {product.reviews} verified reviews
            </span>
          </div>

          <div className="reviews-layout">
            <aside className="rating-summary">
              <strong>{product.rating}</strong>
              <span className="proof-stars">
                {[0, 1, 2, 3, 4].map((star) => (
                  <StarIcon key={star} width="15" height="15" />
                ))}
              </span>
              <span className="rating-summary-note">
                Based on {product.reviews} verified campus purchases
              </span>
              <span className="rating-summary-chip">
                👍 {Math.round(product.rating * 20)}% would recommend
              </span>
            </aside>

            <div className="review-list">
              {reviews.map((review) => (
                <article key={review.name} className="review-card">
                  <header>
                    <span className="review-avatar" aria-hidden="true">
                      {review.name.charAt(0)}
                    </span>
                    <div className="review-author">
                      <strong>{review.name}</strong>
                      <span>Verified student</span>
                    </div>
                    <div className="review-meta">
                      <span className="review-stars">
                        {Array.from({ length: review.rating }, (_, index) => (
                          <StarIcon key={index} width="12" height="12" />
                        ))}
                      </span>
                      <span className="review-date">{review.date}</span>
                    </div>
                  </header>
                  <p>{review.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="section section-tight related">
            <div className="section-head">
              <div>
                <span className="section-eyebrow">You may also like</span>
                <h2>More in {product.category}</h2>
              </div>
              <a
                className="text-link"
                href={`#/products?category=${encodeURIComponent(product.category)}`}
              >
                View category
                <ArrowIcon width="16" height="16" />
              </a>
            </div>
            <div className="product-grid">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
