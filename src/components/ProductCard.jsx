import { useEffect, useRef, useState } from 'react'
import { formatPrice } from '../data/products'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import { CheckIcon, HeartIcon, PlusIcon, StarIcon } from './Icons'

export default function ProductCard({ product }) {
  const { user, openAuthModal } = useAuth()
  const { addItem } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { showToast } = useToast()
  const [added, setAdded] = useState(false)
  const timer = useRef(null)
  const saved = isWishlisted(product.id)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const handleAdd = () => {
    if (!user) {
      showToast('Please sign in to add items to your cart', '🔒')
      openAuthModal()
      return
    }
    addItem(product)
    setAdded(true)
    showToast(`${product.name} added to cart`, product.emoji)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setAdded(false), 1400)
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

  return (
    <article className="product-card">
      <a
        className="product-media"
        href={`#/product/${product.id}`}
        aria-label={`View ${product.name}`}
        style={{
          backgroundImage: `radial-gradient(120% 100% at 85% 0%, ${product.tone}59, transparent 62%)`,
        }}
      >
        {product.badge && (
          <span
            className={`product-badge ${
              product.badge === 'New'
                ? 'is-new'
                : product.badge === 'Sale'
                  ? 'is-sale'
                  : ''
            }`}
          >
            {product.badge}
          </span>
        )}
        <span className="product-emoji" role="img" aria-hidden="true">
          {product.emoji}
        </span>
        <img
          className="product-photo"
          src={product.image}
          alt=""
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
        {product.oldPrice && (
          <span className="product-save">
            {Math.round((1 - product.price / product.oldPrice) * 100)}% off
          </span>
        )}
      </a>

      <button
        type="button"
        className={`wish-toggle ${saved ? 'active' : ''}`}
        onClick={handleWishlist}
        aria-label={
          saved
            ? `Remove ${product.name} from wishlist`
            : `Save ${product.name} to wishlist`
        }
        aria-pressed={saved}
      >
        <HeartIcon width="17" height="17" />
      </button>

      <div className="product-body">
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <span className="product-rating">
            <StarIcon width="13" height="13" />
            {product.rating}
          </span>
        </div>

        <a className="product-name" href={`#/product/${product.id}`}>
          {product.name}
        </a>

        <div className="product-footer">
          <div className="product-price">
            <strong>{formatPrice(product.price)}</strong>
            {product.oldPrice && <s>{formatPrice(product.oldPrice)}</s>}
          </div>
          <button
            type="button"
            className={`add-btn ${added ? 'is-added' : ''}`}
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
            aria-live="polite"
          >
            {added ? (
              <>
                <CheckIcon width="16" height="16" />
                Added
              </>
            ) : (
              <>
                <PlusIcon width="16" height="16" />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}
