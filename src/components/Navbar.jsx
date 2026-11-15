import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import {
  CartIcon,
  CloseIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  SignOutIcon,
  SparkIcon,
  UserIcon,
} from './Icons'

const links = [
  { label: 'Home', href: '#/' },
  { label: 'Shop', href: '#/products' },
  { label: 'Stationery', href: '#/products?category=Stationery' },
  { label: 'Tech', href: '#/products?category=Tech%20Accessories' },
  { label: 'Books', href: '#/products?category=Books' },
  { label: 'Merch', href: '#/products?category=College%20Merch' },
]

export default function Navbar({ path }) {
  const { count } = useCart()
  const { count: wishCount } = useWishlist()
  const { user, logout, openAuthModal } = useAuth()
  const { showToast } = useToast()
  const [open, setOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)

  const displayName =
    user?.displayName || user?.email?.split('@')[0] || 'Student'
  const initial = displayName.charAt(0).toUpperCase()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!userMenuOpen) return undefined
    const handleClick = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [userMenuOpen])

  const handleLogout = async () => {
    setUserMenuOpen(false)
    await logout()
    showToast('Signed out. See you soon!', '👋')
  }

  const openAuth = () => {
    setOpen(false)
    openAuthModal()
  }

  const renderAvatar = () => (
    <span className="user-avatar">
      {user?.photoURL ? (
        <img
          src={user.photoURL}
          alt=""
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      ) : (
        initial
      )}
    </span>
  )

  return (
    <>
      <div className="announce">
        <div className="container announce-inner">
          <span>
            <SparkIcon width="14" height="14" />
            Free campus delivery on orders above ₹499
          </span>
          <span className="announce-code">
            Student code: <strong>STUDENT15</strong>
          </span>
        </div>
      </div>

      <header className="navbar">
        <div className="container nav-inner">
          <a className="brand" href="#/" aria-label="Campus Store home">
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

          <nav className="nav-links" aria-label="Main navigation">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={path === link.href.replace('#', '') ? 'active' : ''}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <a
              className="icon-btn search-btn"
              href="#/products"
              aria-label="Search products"
            >
              <SearchIcon />
            </a>

            {user ? (
              <div className="user-menu" ref={userMenuRef}>
                <button
                  type="button"
                  className="user-btn"
                  onClick={() => setUserMenuOpen((value) => !value)}
                  aria-expanded={userMenuOpen}
                  aria-haspopup="menu"
                >
                  {renderAvatar()}
                  <span className="user-name">{displayName.split(' ')[0]}</span>
                </button>

                {userMenuOpen && (
                  <div className="user-dropdown" role="menu">
                    <div className="user-dropdown-head">
                      <strong>{user.displayName || 'Campus student'}</strong>
                      <span>{user.email}</span>
                    </div>
                    <a
                      href="#/wishlist"
                      role="menuitem"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      My wishlist{wishCount > 0 ? ` (${wishCount})` : ''}
                    </a>
                    <a
                      href="#/cart"
                      role="menuitem"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      My cart{count > 0 ? ` (${count})` : ''}
                    </a>
                    <button type="button" role="menuitem" onClick={handleLogout}>
                      <SignOutIcon width="16" height="16" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button type="button" className="signin-btn" onClick={openAuth}>
                <UserIcon width="16" height="16" />
                <span>Sign in</span>
              </button>
            )}

            <a
              className="icon-btn wishlist-link"
              href="#/wishlist"
              aria-label={`Wishlist (${wishCount} items)`}
            >
              <HeartIcon />
              {wishCount > 0 && (
                <span className="wish-count">{wishCount}</span>
              )}
            </a>
            <a className="cart-btn" href="#/cart" aria-label="Open cart">
              <CartIcon />
              <span>Cart</span>
              {count > 0 && <span className="cart-count">{count}</span>}
            </a>
            <button
              type="button"
              className="icon-btn menu-btn"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mobile-backdrop ${open ? 'show' : ''}`}
        onClick={() => setOpen(false)}
      />

      <aside className={`mobile-menu ${open ? 'open' : ''}`}>
        <div className="mobile-menu-head">
          <span className="brand-name">
            Campus<span>Store</span>
          </span>
          <button
            type="button"
            className="icon-btn"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>
        <nav className="mobile-links" aria-label="Mobile navigation">
          {links.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
              <span aria-hidden="true">→</span>
            </a>
          ))}
          <a href="#/wishlist" onClick={() => setOpen(false)}>
            Wishlist {wishCount > 0 ? `(${wishCount})` : ''}
            <span aria-hidden="true">→</span>
          </a>
        </nav>

        <a
          className="btn btn-primary mobile-cart-link"
          href="#/cart"
          onClick={() => setOpen(false)}
        >
          <CartIcon width="18" height="18" />
          View cart ({count})
        </a>

        <div className="mobile-account">
          {user ? (
            <>
              {renderAvatar()}
              <div className="mobile-account-info">
                <strong>{displayName}</strong>
                <span>{user.email}</span>
              </div>
              <button
                type="button"
                className="icon-btn"
                onClick={handleLogout}
                aria-label="Sign out"
              >
                <SignOutIcon width="17" height="17" />
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn btn-primary mobile-auth-btn"
              onClick={openAuth}
            >
              <UserIcon width="17" height="17" />
              Sign in / Create account
            </button>
          )}
        </div>

        <p className="mobile-note">
          Use code <strong>STUDENT15</strong> for 15% off your first order.
        </p>
      </aside>
    </>
  )
}
