import { products } from '../data/products'
import { useAuth } from '../context/AuthContext'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/ProductCard'
import { ArrowIcon } from '../components/Icons'

export default function Wishlist() {
  const { ids } = useWishlist()
  const { user, openAuthModal } = useAuth()
  const saved = products.filter((product) => ids.includes(product.id))

  if (!user) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty-state">
            <span className="empty-emoji" aria-hidden="true">
              🔒
            </span>
            <h1>Sign in to view your wishlist</h1>
            <p>
              Save your favourite campus essentials to your account and find
              them here anytime.
            </p>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={openAuthModal}
            >
              Sign in / Create account
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="container">
        <header className="page-head">
          <div>
            <span className="section-eyebrow">Saved for later</span>
            <h1>Your wishlist</h1>
            <p className="page-sub">
              {saved.length === 0
                ? '              Hit the heart on any product to save it here.'
                : `${saved.length} ${saved.length === 1 ? 'item' : 'items'} saved for later.`}
            </p>
          </div>
          <a className="text-link" href="#/products">
            Browse more
            <ArrowIcon width="16" height="16" />
          </a>
        </header>

        {saved.length > 0 ? (
          <div className="product-grid">
            {saved.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-emoji" aria-hidden="true">
              💖
            </span>
            <h2>Nothing saved yet</h2>
            <p>
              Found something you like? Hit the heart icon and it will wait for
              you right here.
            </p>
            <a className="btn btn-primary" href="#/products">
              Explore products
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
