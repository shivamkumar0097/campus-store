import { useState } from 'react'
import { formatPrice } from '../data/products'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import {
  ArrowIcon,
  CheckIcon,
  LocationIcon,
  MailIcon,
  PhoneIcon,
  ShieldIcon,
  SparkIcon,
  TruckIcon,
} from '../components/Icons'

const paymentOptions = [
  { id: 'upi', label: 'UPI', hint: 'GPay, PhonePe, Paytm', emoji: '📲' },
  { id: 'card', label: 'Card', hint: 'Credit or debit card', emoji: '💳' },
  { id: 'cod', label: 'Cash on delivery', hint: 'Pay at your hostel', emoji: '💵' },
]

const STUDENT_COUPON = 'STUDENT15'
const DISCOUNT_RATE = 0.15

export default function Checkout() {
  const { items, subtotal, shipping, clearCart } = useCart()
  const { user, openAuthModal } = useAuth()
  const [form, setForm] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    payment: 'upi',
  })
  const [placed, setPlaced] = useState(null)
  const [couponInput, setCouponInput] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponError, setCouponError] = useState('')

  const discount = couponApplied ? Math.round(subtotal * DISCOUNT_RATE) : 0
  const payable = subtotal - discount + shipping
  const userInitial = (user?.displayName || user?.email || 'S')
    .charAt(0)
    .toUpperCase()

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleCoupon = () => {
    if (couponInput.trim().toUpperCase() === STUDENT_COUPON) {
      setCouponApplied(true)
      setCouponError('')
      setCouponInput(STUDENT_COUPON)
      return
    }
    setCouponApplied(false)
    setCouponError('That code is not valid. Try STUDENT15.')
  }

  const removeCoupon = () => {
    setCouponApplied(false)
    setCouponInput('')
    setCouponError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (items.length === 0) return
    const order = {
      id: `CS-${Math.floor(100000 + Math.random() * 900000)}`,
      total: payable,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
    }
    clearCart()
    setPlaced(order)
  }

  if (placed) {
    return (
      <div className="page">
        <div className="container">
          <div className="checkout-success">
            <span className="success-icon">
              <CheckIcon width="34" height="34" />
            </span>
            <span className="section-eyebrow">Order confirmed</span>
            <h1>You are all set! 🎉</h1>
            <p>
              Order <strong>{placed.id}</strong> is confirmed with {placed.count}{' '}
              {placed.count === 1 ? 'item' : 'items'} for{' '}
              <strong>{formatPrice(placed.total)}</strong>. A receipt is on its
              way to your inbox.
            </p>
            <div className="success-meta">
              <span>
                <TruckIcon width="17" height="17" /> Delivery in 24–48 hours
              </span>
              <span>
                <LocationIcon width="17" height="17" /> Campus hostel desk
              </span>
            </div>
            <div className="success-actions">
              <a className="btn btn-primary" href="#/products">
                Continue shopping
              </a>
              <a className="btn btn-outline" href="#/">
                Back to home
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty-state">
            <span className="empty-emoji" aria-hidden="true">
              🔒
            </span>
            <h1>Sign in to checkout</h1>
            <p>
              Checkout is available to signed-in students so your orders stay
              linked to your account.
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
          <div className="empty-state">
            <span className="empty-emoji" aria-hidden="true">
              🧾
            </span>
            <h1>Nothing to check out</h1>
            <p>Add a few essentials to your cart before heading to checkout.</p>
            <a className="btn btn-primary" href="#/products">
              Browse products
            </a>
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
            <span className="section-eyebrow">
              <ShieldIcon width="14" height="14" />
              Secure checkout
            </span>
            <h1>Checkout</h1>
            <p className="page-sub">
              Two minutes and your campus essentials are on the way.
            </p>
          </div>
          <a className="text-link" href="#/cart">
            Back to cart
            <ArrowIcon width="16" height="16" />
          </a>
        </header>

        <form className="checkout-layout" onSubmit={handleSubmit}>
          <div className="checkout-form">
            {user && (
              <div className="checkout-user">
                <span className="user-avatar">{userInitial}</span>
                <div>
                  <strong>
                    Signed in as {user.displayName || user.email}
                  </strong>
                  <span>Delivery details pre-filled from your account.</span>
                </div>
              </div>
            )}

            <section className="form-card">
              <div className="form-card-head">
                <span className="step-dot">1</span>
                <div>
                  <h2>Delivery details</h2>
                  <p>Where should we drop your order?</p>
                </div>
              </div>

              <div className="form-grid">
                <label className="field">
                  <span>Full name</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </label>
                <label className="field">
                  <span>Email</span>
                  <span className="input-wrap">
                    <MailIcon width="17" height="17" />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      required
                    />
                  </span>
                </label>
                <label className="field">
                  <span>Phone</span>
                  <span className="input-wrap">
                    <PhoneIcon width="17" height="17" />
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      pattern="[0-9+ -]{8,15}"
                      required
                    />
                  </span>
                </label>
                <label className="field">
                  <span>Pincode</span>
                  <input
                    type="text"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="Your pincode"
                    pattern="[0-9]{5,6}"
                    required
                  />
                </label>
                <label className="field field-full">
                  <span>Hostel / address</span>
                  <span className="input-wrap">
                    <LocationIcon width="17" height="17" />
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Your hostel / room address"
                      required
                    />
                  </span>
                </label>
                <label className="field field-full">
                  <span>City</span>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Your city"
                    required
                  />
                </label>
              </div>
            </section>

            <section className="form-card">
              <div className="form-card-head">
                <span className="step-dot">2</span>
                <div>
                  <h2>Payment method</h2>
                  <p>All transactions are encrypted and safe.</p>
                </div>
              </div>

              <div className="payment-grid">
                {paymentOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`payment-option ${
                      form.payment === option.id ? 'selected' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={option.id}
                      checked={form.payment === option.id}
                      onChange={handleChange}
                    />
                    <span className="payment-emoji" aria-hidden="true">
                      {option.emoji}
                    </span>
                    <span>
                      <strong>{option.label}</strong>
                      <em>{option.hint}</em>
                    </span>
                    <span className="payment-check">
                      <CheckIcon width="13" height="13" />
                    </span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          <aside className="summary checkout-summary">
            <h2>Order summary</h2>
            <div className="summary-items">
              {items.map((item) => (
                <div key={item.id} className="summary-item">
                  <span
                    className="summary-thumb"
                    style={{
                      backgroundImage: `radial-gradient(120% 100% at 80% 0%, ${item.tone}55, transparent 65%)`,
                    }}
                    aria-hidden="true"
                  >
                    {item.emoji}
                    {item.image && (
                      <img
                        className="summary-photo"
                        src={item.image}
                        alt=""
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.style.display = 'none'
                        }}
                      />
                    )}
                  </span>
                  <div>
                    <strong>{item.name}</strong>
                    <span>Qty {item.quantity}</span>
                  </div>
                  <strong>{formatPrice(item.price * item.quantity)}</strong>
                </div>
              ))}
            </div>
            <div className="coupon-box">
              <span className="coupon-label">Student code</span>
              {couponApplied ? (
                <div className="coupon-applied">
                  <span>
                    <CheckIcon width="14" height="14" />
                    STUDENT15 applied · 15% off
                  </span>
                  <button type="button" onClick={removeCoupon}>
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <div className="coupon-field">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(event) => {
                        setCouponInput(event.target.value)
                        setCouponError('')
                      }}
                      placeholder="Enter STUDENT15"
                      aria-label="Coupon code"
                    />
                    <button type="button" onClick={handleCoupon}>
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="coupon-error">{couponError}</p>
                  )}
                </>
              )}
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            {discount > 0 && (
              <div className="summary-row summary-discount">
                <span>Student discount (15%)</span>
                <strong>-{formatPrice(discount)}</strong>
              </div>
            )}
            <div className="summary-row">
              <span>Delivery</span>
              <strong className={shipping === 0 ? 'free' : ''}>
                {shipping === 0 ? 'Free' : formatPrice(shipping)}
              </strong>
            </div>
            <div className="summary-row summary-total">
              <span>Total</span>
              <strong>{formatPrice(payable)}</strong>
            </div>
            <button type="submit" className="btn btn-primary btn-lg summary-cta">
              Place order · {formatPrice(payable)}
            </button>
            <p className="summary-note">
              <SparkIcon width="14" height="14" /> Student discount is applied
              before placing the order. No hidden charges.
            </p>
          </aside>
        </form>
      </div>
    </div>
  )
}
