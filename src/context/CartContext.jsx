import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_PREFIX = 'campus-store-cart'
const CartContext = createContext(null)

function storageKey(uid) {
  return `${STORAGE_PREFIX}:${uid}`
}

function readStoredCart(uid) {
  if (!uid) return []
  try {
    const raw = window.localStorage.getItem(storageKey(uid))
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function CartProvider({ children, uid = null }) {
  const [items, setItems] = useState(() => readStoredCart(uid))

  useEffect(() => {
    if (!uid) return
    window.localStorage.setItem(storageKey(uid), JSON.stringify(items))
  }, [items, uid])

  const addItem = (product, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }
      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          emoji: product.emoji,
          image: product.image,
          tone: product.tone,
          category: product.category,
          quantity,
        },
      ]
    })
  }

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, quantity } : item)),
    )
  }

  const removeItem = (id) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  const clearCart = () => setItems([])

  const value = useMemo(() => {
    const count = items.reduce((total, item) => total + item.quantity, 0)
    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    )
    const shipping = items.length === 0 || subtotal >= 499 ? 0 : 49
    return {
      items,
      count,
      subtotal,
      shipping,
      total: subtotal + shipping,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used inside a CartProvider')
  }
  return context
}
