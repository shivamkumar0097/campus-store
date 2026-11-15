import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_PREFIX = 'campus-store-wishlist'
const WishlistContext = createContext(null)

function storageKey(uid) {
  return `${STORAGE_PREFIX}:${uid}`
}

function readStoredWishlist(uid) {
  if (!uid) return []
  try {
    const raw = window.localStorage.getItem(storageKey(uid))
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function WishlistProvider({ children, uid = null }) {
  const [ids, setIds] = useState(() => readStoredWishlist(uid))

  useEffect(() => {
    if (!uid) return
    window.localStorage.setItem(storageKey(uid), JSON.stringify(ids))
  }, [ids, uid])

  const toggleWishlist = (id) => {
    setIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  }

  const isWishlisted = (id) => ids.includes(id)

  return (
    <WishlistContext.Provider
      value={{ ids, count: ids.length, toggleWishlist, isWishlisted }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used inside a WishlistProvider')
  }
  return context
}
