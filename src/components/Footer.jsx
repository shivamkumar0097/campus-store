import { useState } from 'react'
import { ArrowIcon, MailIcon } from './Icons'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email.trim()) return
    setJoined(true)
    setEmail('')
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a className="brand" href="#/">
              <span className="brand-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                  <path
                    d="M13.6 2.5 5 13.4h5.2L9.6 21.5 19 10.2h-5.4l.8-7.7Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className="brand-name">
                Campus<span>Store</span>
              </span>
            </a>
            <p>
              Student-first essentials for lectures, labs and late-night study
              sessions. Curated on campus, delivered to your hostel door.
            </p>
            <div className="footer-socials">
              <a href="#/" aria-label="Instagram">IG</a>
              <a href="#/" aria-label="X">X</a>
              <a href="#/" aria-label="YouTube">YT</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Shop</h4>
            <a href="#/products?category=Stationery">Stationery</a>
            <a href="#/products?category=Tech%20Accessories">
              Tech Accessories
            </a>
            <a href="#/products?category=Books">Books</a>
            <a href="#/products?category=College%20Merch">College Merch</a>
          </div>

          <div className="footer-col">
            <h4>Help</h4>
            <a href="#/">Track your order</a>
            <a href="#/">Shipping & delivery</a>
            <a href="#/">Returns & refunds</a>
            <a href="#/">Contact support</a>
          </div>

          <div className="footer-news">
            <h4>Stay in the loop</h4>
            <p>New drops, exam-week deals and campus-only discounts.</p>
            <form className="news-form" onSubmit={handleSubmit}>
              <span className="news-icon" aria-hidden="true">
                <MailIcon width="18" height="18" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your email address"
                aria-label="Email address"
                required
              />
              <button type="submit" aria-label="Subscribe">
                <ArrowIcon width="18" height="18" />
              </button>
            </form>
            {joined && (
              <p className="news-success">
                You are in. Watch your inbox for campus drops.
              </p>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Campus Store. Built for students.</p>
          <div className="footer-legal">
            <a href="#/">Privacy</a>
            <a href="#/">Terms</a>
            <span>Made with React</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
