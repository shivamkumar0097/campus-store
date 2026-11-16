import { formatPrice, featuredProducts } from '../data/products'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'
import {
  ArrowIcon,
  MinusIcon,
  PlusIcon,
  ShieldIcon,
  TrashIcon,
  TruckIcon,
} from '../components/Icons'

export default function Cart() {
  const {
    items,
    count,
    subtotal,
    shipping,
    total,
    updateQuantity,
    removeItem,
  } = useCart()
  const { user, openAuthModal } = useAuth()

  if (!user) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty-state cart-empty">
            <span className="empty-emoji" aria-hidden="true">
              🔒
            </span>
            <h1>Sign in to view your cart</h1>
            <p>
              Your cart and wishlist are saved to your Campus Store account.
              Sign in to add items and checkout.
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

  if (items.length === 0) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty-state cart-empty">
            <span className="empty-emoji" aria-hidden="true">
              🛒
            </span>
            <h1>Your cart is empty</h1>
            <p>
              Nothing here yet. Grab your semester essentials and they'll show
              up right here.
            </p>
            <a className="btn btn-primary btn-lg" href="#/products">
              Start shopping
              <ArrowIcon width="17" height="17" />
            </a>
          </div>

          <section className="section section-tight">
            <div className="section-head">
              <div>
                <span className="section-eyebrow">Popular right now</span>
                <h2>Students are buying</h2>
              </div>
            </div>
            <div className="product-grid">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
      </div>
    )
  }

  const freeDeliveryLeft = Math.max(0, 499 - subtotal)

  return (
    <div className="page">
      <div className="container">
        <header className="page-head cart-head">
          <div>
            <span className="section-eyebrow">Almost yours</span>
            <h1>Your cart</h1>
            <p className="page-sub">
              {count} {count === 1 ? 'item' : 'items'} ready for checkout.
            </p>
          </div>
          <a className="text-link" href="#/products">
            Continue shopping
            <ArrowIcon width="16" height="16" />
          </a>
        </header>

        <div className="cart-layout">
          <div className="cart-list">
            {freeDeliveryLeft > 0 && (
              <div className="delivery-nudge">
                <TruckIcon width="18" height="18" />
                <div>
                  <p>
                    Add <strong>{formatPrice(freeDeliveryLeft)}</strong> more
                    for free campus delivery.
                  </p>
                  <span className="nudge-bar">
                    <span
                      style={{
                        width: `${Math.min(100, (subtotal / 499) * 100)}%`,
                      }}
                    />
                  </span>
                </div>
              </div>
            )}

            {items.map((item) => (
              <article key={item.id} className="cart-item">
                <a
                  className="cart-thumb"
                  href={`#/product/${item.id}`}
                  style={{
                    backgroundImage: `radial-gradient(120% 100% at 80% 0%, ${item.tone}55, transparent 65%)`,
                  }}
                  aria-label={`View ${item.name}`}
                >
                  <span aria-hidden="true">{item.emoji}</span>
                  {item.image && (
                    <img
                      className="cart-photo"
                      src={item.image}
                      alt=""
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = 'none'
                      }}
                    />
                  )}
                </a>

                <div className="cart-item-info">
                  <span className="product-category">{item.category}</span>
                  <a className="cart-item-name" href={`#/product/${item.id}`}>
                    {item.name}
                  </a>
                  <span className="cart-item-unit">
                    {formatPrice(item.price)} each
                  </span>
                </div>

                <div className="cart-item-actions">
                  <div className="qty-control qty-small" aria-label="Quantity">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      aria-label={`Decrease ${item.name} quantity`}
                      disabled={item.quantity <= 1}
                    >
                      <MinusIcon width="14" height="14" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      <PlusIcon width="14" height="14" />
                    </button>
                  </div>

                  <strong className="cart-line-total">
                    {formatPrice(item.price * item.quantity)}
                  </strong>

                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <TrashIcon width="16" height="16" />
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="summary">
            <h2>Order summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <strong className={shipping === 0 ? 'free' : ''}>
                {shipping === 0 ? 'Free' : formatPrice(shipping)}
              </strong>
            </div>
            <div className="summary-row summary-total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <p className="summary-note">
              Taxes included. Student code can be applied at checkout.
            </p>
            <a className="btn btn-primary btn-lg summary-cta" href="#/checkout">
              Proceed to checkout
              <ArrowIcon width="17" height="17" />
            </a>
            <div className="summary-perks">
              <span>
                <ShieldIcon width="16" height="16" /> Secure checkout
              </span>
              <span>
                <TruckIcon width="16" height="16" /> 24–48h campus delivery
              </span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
