import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth, googleProvider, isFirebaseConfigured } from '../lib/firebase'

const AuthContext = createContext(null)
const SETUP_MESSAGE =
  'Firebase is not configured yet. Add your VITE_FIREBASE_* keys to .env.local and restart the dev server.'

function requireAuth() {
  if (!auth) throw new Error(SETUP_MESSAGE)
}

function friendlyError(error) {
  switch (error?.code) {
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return ''
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Incorrect email or password. Please try again.'
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Try logging in instead.'
    case 'auth/weak-password':
      return 'Password must be at least 6 characters long.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a moment and try again.'
    case 'auth/popup-blocked':
      return 'Your browser blocked the sign-in popup. Allow popups and try again.'
    case 'auth/operation-not-allowed':
      return 'This sign-in method is not enabled in your Firebase project.'
    case 'auth/unauthorized-domain':
      return 'This domain is not authorized in Firebase Authentication settings.'
    default:
      return (
        error?.message?.replace('Firebase: ', '') ||
        'Something went wrong. Please try again.'
      )
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(isFirebaseConfigured)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  const openAuthModal = useCallback(() => setAuthModalOpen(true), [])
  const closeAuthModal = useCallback(() => setAuthModalOpen(false), [])

  useEffect(() => {
    if (!auth) return undefined
    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser)
      setLoading(false)
    })
  }, [])

  const signInWithGoogle = useCallback(async () => {
    requireAuth()
    try {
      const credential = await signInWithPopup(auth, googleProvider)
      return credential.user
    } catch (error) {
      const message = friendlyError(error)
      if (!message) return null
      throw new Error(message, { cause: error })
    }
  }, [])

  const signIn = useCallback(async (email, password) => {
    requireAuth()
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      )
      return credential.user
    } catch (error) {
      throw new Error(friendlyError(error) || 'Unable to sign in.', {
        cause: error,
      })
    }
  }, [])

  const signUp = useCallback(async (name, email, password) => {
    requireAuth()
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      await updateProfile(credential.user, { displayName: name })
      setUser(auth.currentUser)
      return credential.user
    } catch (error) {
      throw new Error(friendlyError(error) || 'Unable to create account.', {
        cause: error,
      })
    }
  }, [])

  const logout = useCallback(async () => {
    if (!auth) return
    await signOut(auth)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        configured: isFirebaseConfigured,
        signIn,
        signUp,
        signInWithGoogle,
        logout,
        authModalOpen,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider')
  }
  return context
}
