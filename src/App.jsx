import { AuthProvider, useAuth } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { ToastProvider } from './context/ToastContext'
import AuthModal from './components/AuthModal'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Wishlist from './pages/Wishlist'
import { useHashRoute } from './hooks/useHashRoute'
import './App.css'

function ShopProviders({ children }) {
  const { user } = useAuth()
  const accountKey = user?.uid || 'guest'

  return (
    <CartProvider key={`cart-${accountKey}`} uid={user?.uid || null}>
      <WishlistProvider key={`wishlist-${accountKey}`} uid={user?.uid || null}>
        {children}
      </WishlistProvider>
    </CartProvider>
  )
}

function AuthModalHost() {
  const { authModalOpen, closeAuthModal } = useAuth()
  return <AuthModal open={authModalOpen} onClose={closeAuthModal} />
}

function NotFound() {
  return (
    <div className="page">
      <div className="container">
        <div className="empty-state">
          <span className="empty-emoji" aria-hidden="true">
            🧭
          </span>
          <h1>Page not found</h1>
          <p>The page you are looking for does not exist or has moved.</p>
          <a className="btn btn-primary" href="#/">
            Back to home
          </a>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const { path, params } = useHashRoute()

  let page
  if (path === '/') {
    page = <Home />
  } else if (path === '/products') {
    page = <Products params={params} />
  } else if (path.startsWith('/product/')) {
    page = <ProductDetail key={path} id={path.slice('/product/'.length)} />
  } else if (path === '/cart') {
    page = <Cart />
  } else if (path === '/checkout') {
    page = <Checkout />
  } else if (path === '/wishlist') {
    page = <Wishlist />
  } else {
    page = <NotFound />
  }

  return (
    <ToastProvider>
      <AuthProvider>
        <ShopProviders>
          <div className="app-shell">
            <Navbar path={path} />
            <main>{page}</main>
            <Footer />
          </div>
        </ShopProviders>
        <AuthModalHost />
      </AuthProvider>
    </ToastProvider>
  )
}
