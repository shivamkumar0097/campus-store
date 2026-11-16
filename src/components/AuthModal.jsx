import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import {
  CheckIcon,
  CloseIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  ShieldIcon,
  UserIcon,
} from './Icons'

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2a7 7 0 0 1-6.6-4.8h-4v3.1A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.4 14.5a7.2 7.2 0 0 1 0-4.6V6.8h-4a12 12 0 0 0 0 10.8l4-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.5-3.5A12 12 0 0 0 1.4 6.8l4 3.1A7 7 0 0 1 12 4.8Z"
      />
    </svg>
  )
}

const perks = [
  'Cart saved to your account',
  'Faster checkout every time',
  'Wishlist saved across visits',
]

export default function AuthModal({ open, onClose }) {
  const { configured, signIn, signUp, signInWithGoogle } = useAuth()
  const { showToast } = useToast()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return undefined
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const switchMode = (nextMode) => {
    if (nextMode === mode) return
    setMode(nextMode)
    setError('')
    setShowPassword(false)
    setForm((current) => ({ ...current, password: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      const user =
        mode === 'signup'
          ? await signUp(form.name.trim(), form.email.trim(), form.password)
          : await signIn(form.email.trim(), form.password)
      showToast(
        mode === 'signup'
          ? `Account created. Welcome, ${user.displayName || 'student'}!`
          : `Welcome back, ${user.displayName || user.email}!`,
        '👋',
      )
      setForm({ name: '', email: '', password: '' })
      onClose()
    } catch (authError) {
      setError(authError.message)
    } finally {
      setBusy(false)
    }
  }

  const handleGoogle = async () => {
    setBusy(true)
    setError('')
    try {
      const user = await signInWithGoogle()
      if (user) {
        showToast(`Welcome, ${user.displayName || 'student'}!`, '👋')
        onClose()
      }
    } catch (authError) {
      setError(authError.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      className="auth-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Sign in to Campus Store"
      onClick={onClose}
    >
      <div className="auth-modal" onClick={(event) => event.stopPropagation()}>
        <div className="auth-visual" aria-hidden="true">
          <span className="auth-orb orb-a" />
          <span className="auth-orb orb-b" />

          <div className="auth-visual-inner">
            <div className="auth-brand">
              <span className="brand-mark">
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none">
                  <path
                    d="M13.6 2.5 5 13.4h5.2L9.6 21.5 19 10.2h-5.4l.8-7.7Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className="brand-name">
                Campus<span>Store</span>
              </span>
            </div>

            <span className="auth-visual-tag">Student account</span>
            <h3>
              Your campus,
              <br />
              <span>one login away.</span>
            </h3>
            <p>
              Sign in once to keep your cart, wishlist and orders in sync.
            </p>

            <ul className="auth-perks">
              {perks.map((perk) => (
                <li key={perk}>
                  <CheckIcon width="15" height="15" />
                  {perk}
                </li>
              ))}
            </ul>

            <div className="auth-float">
              <span className="auth-chip">
                <span aria-hidden="true">🎧</span> Earbuds · ₹1,499
              </span>
              <span className="auth-chip">
                <span aria-hidden="true">📚</span> DSA Book · ₹549
              </span>
            </div>
          </div>
        </div>

        <div className="auth-panel">
          <button
            type="button"
            className="auth-close"
            onClick={onClose}
            aria-label="Close sign in"
          >
            <CloseIcon width="18" height="18" />
          </button>

          <div className="auth-tabs" role="tablist" aria-label="Authentication">
            <span
              className={`auth-tab-indicator ${
                mode === 'signup' ? 'signup' : ''
              }`}
              aria-hidden="true"
            />
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'login'}
              onClick={() => switchMode('login')}
            >
              Log in
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'signup'}
              onClick={() => switchMode('signup')}
            >
              Sign up
            </button>
          </div>

          <div className="auth-form-head">
            <h2>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
            <p>
              {mode === 'login'
                ? 'Log in to sync your cart, wishlist and campus orders.'
                : 'Join Campus Store and unlock student-only drops and deals.'}
            </p>
          </div>

          {!configured && (
            <div className="auth-setup">
              <ShieldIcon width="18" height="18" />
              <div>
                <strong>Firebase setup needed</strong>
                <p>
                  Add your <code>VITE_FIREBASE_*</code> keys to{' '}
                  <code>.env.local</code> and restart the dev server. See{' '}
                  <code>.env.example</code>.
                </p>
              </div>
            </div>
          )}

          <button
            type="button"
            className="google-btn"
            onClick={handleGoogle}
            disabled={busy || !configured}
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="auth-divider">
            <span>or continue with email</span>
          </div>

          <form
            key={mode}
            onSubmit={handleSubmit}
            className={`auth-form ${error ? 'has-error' : ''}`}
          >
            {mode === 'signup' && (
              <label className="field">
                <span>Full name</span>
                <span className="input-wrap">
                  <UserIcon width="16" height="16" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    autoComplete="name"
                    required
                  />
                </span>
              </label>
            )}

            <label className="field">
              <span>Email address</span>
              <span className="input-wrap">
                <MailIcon width="16" height="16" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  autoComplete="email"
                  required
                />
              </span>
            </label>

            <label className="field">
              <span>Password</span>
              <span className="input-wrap password-wrap">
                <LockIcon width="16" height="16" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder={
                    mode === 'signup' ? 'Create a password' : 'Your password'
                  }
                  autoComplete={
                    mode === 'signup' ? 'new-password' : 'current-password'
                  }
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOffIcon width="17" height="17" />
                  ) : (
                    <EyeIcon width="17" height="17" />
                  )}
                </button>
              </span>
            </label>

            {error && <p className="auth-error">{error}</p>}

            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={busy || !configured}
            >
              {busy
                ? 'Please wait...'
                : mode === 'login'
                  ? 'Log in'
                  : 'Create account'}
            </button>
          </form>

          <p className="auth-terms">
            By continuing you agree to our Terms and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}
