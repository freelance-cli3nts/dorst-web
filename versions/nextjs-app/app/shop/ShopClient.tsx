'use client'

import { useReducer } from 'react'
import Link from 'next/link'
import type { Beer } from '@/lib/data'

type CartState = Record<string, number>

type CartAction =
  | { type: 'INCREMENT'; id: string }
  | { type: 'DECREMENT'; id: string }
  | { type: 'CLEAR' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, [action.id]: (state[action.id] ?? 0) + 1 }
    case 'DECREMENT':
      return { ...state, [action.id]: Math.max(0, (state[action.id] ?? 0) - 1) }
    case 'CLEAR':
      return {}
    default:
      return state
  }
}

const MINIMUM_CANS = 12
const VAT_RATE = 0.20

interface Props {
  beers: Beer[]
}

export function ShopClient({ beers }: Props) {
  const [cart, dispatch] = useReducer(cartReducer, {})

  const totalCans = Object.values(cart).reduce((a, b) => a + b, 0)
  const subtotal = beers.reduce((sum, b) => sum + (cart[b.id] ?? 0) * (b.priceB2C ?? 0), 0)
  const vat = subtotal * VAT_RATE
  const total = subtotal + vat

  async function handleCheckout() {
    if (totalCans < MINIMUM_CANS) {
      alert(`Minimum order is ${MINIMUM_CANS} cans. You have ${totalCans}.`)
      return
    }
    const items = beers
      .filter(b => (cart[b.id] ?? 0) > 0)
      .map(b => ({ id: b.id, qty: cart[b.id] ?? 0 }))

    // Stub: in production, POST to /api/stripe/checkout
    alert(`Order submitted (stub):\n${JSON.stringify(items, null, 2)}\nTotal: €${total.toFixed(2)}`)
    dispatch({ type: 'CLEAR' })
  }

  return (
    <div style={{ padding: '40px 48px 80px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 40, alignItems: 'start' }} className="shop-layout">
      {/* Product list */}
      <div>
        {beers.map(beer => (
          <div
            key={beer.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr auto auto',
              gap: 16,
              alignItems: 'center',
              padding: '20px 0',
              borderBottom: '1px solid var(--line)',
            }}
          >
            {/* Color swatch */}
            <div
              style={{
                width: 80, height: 80,
                borderRadius: 2,
                background: beer.accentHex,
                border: '4px solid var(--ink)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 7, fontWeight: 700, color: 'rgba(255,255,255,0.8)', textAlign: 'center', letterSpacing: '0.06em', textTransform: 'uppercase', padding: 4 }}>
                {beer.name}
              </span>
            </div>

            {/* Info */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 4 }}>
                {beer.style}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{beer.name}</h3>
              <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--ink-soft)' }}>
                {beer.abv}% · {beer.plato}° · {beer.ml.map(m => `${m}ml`).join(' / ')}
              </div>
            </div>

            {/* Price */}
            <div style={{ textAlign: 'right', minWidth: 64 }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>€{beer.priceB2C?.toFixed(2)}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-soft)' }}>per can</div>
            </div>

            {/* Qty control */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                onClick={() => dispatch({ type: 'DECREMENT', id: beer.id })}
                style={{
                  width: 32, height: 32,
                  borderRadius: '50%',
                  border: '1.5px solid var(--line)',
                  background: 'white',
                  fontSize: 18, fontWeight: 300,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  lineHeight: 1,
                  transition: 'border-color 0.2s, background 0.2s, color 0.2s',
                  color: 'var(--ink)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ink)'; e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'white' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--ink)' }}
              >
                −
              </button>
              <span style={{ fontSize: 16, fontWeight: 700, minWidth: 28, textAlign: 'center' }}>
                {cart[beer.id] ?? 0}
              </span>
              <button
                onClick={() => dispatch({ type: 'INCREMENT', id: beer.id })}
                style={{
                  width: 32, height: 32,
                  borderRadius: '50%',
                  border: '1.5px solid var(--line)',
                  background: 'white',
                  fontSize: 18, fontWeight: 300,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  lineHeight: 1,
                  transition: 'border-color 0.2s, background 0.2s, color 0.2s',
                  color: 'var(--ink)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ink)'; e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'white' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--ink)' }}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order summary */}
      <div style={{ position: 'sticky', top: 88 }}>
        <div
          style={{
            background: 'var(--paper)',
            border: '1px solid var(--line)',
            borderRadius: 2,
            padding: '28px',
          }}
        >
          <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 20 }}>
            Your Order
          </h2>

          {totalCans === 0 ? (
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 20 }}>
              Add at least {MINIMUM_CANS} cans to continue.
            </p>
          ) : (
            <>
              {beers.filter(b => (cart[b.id] ?? 0) > 0).map(b => (
                <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '6px 0', color: 'var(--ink-soft)' }}>
                  <span>{b.name} × {cart[b.id]}</span>
                  <span>€{((cart[b.id] ?? 0) * (b.priceB2C ?? 0)).toFixed(2)}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--line)', marginTop: 12, paddingTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--ink-soft)', marginBottom: 6 }}>
                  <span>Subtotal (excl. VAT)</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--ink-soft)', marginBottom: 12 }}>
                  <span>VAT (20%)</span>
                  <span>€{vat.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 700 }}>
                  <span>Total</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}

          {totalCans < MINIMUM_CANS && totalCans > 0 && (
            <div
              style={{
                background: '#FFF9E6',
                border: '1px solid #E8D48A',
                borderRadius: 2,
                padding: '10px 14px',
                fontSize: 12,
                color: '#7A6010',
                marginTop: 12,
              }}
            >
              {MINIMUM_CANS - totalCans} more cans needed for minimum order.
            </div>
          )}

          <button
            onClick={handleCheckout}
            disabled={totalCans < MINIMUM_CANS}
            style={{
              display: 'block',
              width: '100%',
              marginTop: 20,
              background: totalCans >= MINIMUM_CANS ? 'var(--ink)' : 'rgba(14,14,16,0.15)',
              color: totalCans >= MINIMUM_CANS ? 'var(--foam)' : 'var(--ink-soft)',
              border: `2px solid ${totalCans >= MINIMUM_CANS ? 'var(--ink)' : 'transparent'}`,
              padding: '14px 24px',
              fontSize: 15,
              fontWeight: 700,
              borderRadius: 'var(--radius-pill)',
              cursor: totalCans >= MINIMUM_CANS ? 'pointer' : 'not-allowed',
              transition: 'background 0.2s, color 0.2s',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '0.02em',
            }}
          >
            {totalCans >= MINIMUM_CANS ? 'Proceed to Checkout →' : `Add ${MINIMUM_CANS} cans minimum`}
          </button>

          <p style={{ marginTop: 16, fontSize: 12, color: 'var(--ink-soft)', textAlign: 'center', lineHeight: 1.5 }}>
            Sofia delivery only. Guest checkout — no account required.
          </p>
        </div>
      </div>

      <style>{`
        .shop-layout {
          @media (max-width: 900px) {
            grid-template-columns: 1fr !important;
            padding: 24px !important;
          }
        }
      `}</style>
    </div>
  )
}
