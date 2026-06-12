'use client'

import { createContext, useContext, useReducer, useMemo } from 'react'

export type CartState = Record<string, number>

type CartAction =
  | { type: 'ADD'; id: string }
  | { type: 'REMOVE'; id: string }
  | { type: 'CLEAR' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD':
      return { ...state, [action.id]: (state[action.id] ?? 0) + 1 }
    case 'REMOVE':
      return { ...state, [action.id]: Math.max(0, (state[action.id] ?? 0) - 1) }
    case 'CLEAR':
      return {}
    default:
      return state
  }
}

interface CartCtx {
  cart: CartState
  addToCart: (id: string) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  totalItems: number
}

const CartContext = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, {})

  const totalItems = useMemo(
    () => Object.values(cart).reduce((a, b) => a + b, 0),
    [cart],
  )

  const value = useMemo<CartCtx>(
    () => ({
      cart,
      addToCart: (id) => dispatch({ type: 'ADD', id }),
      removeFromCart: (id) => dispatch({ type: 'REMOVE', id }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
      totalItems,
    }),
    [cart, totalItems],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartCtx {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
