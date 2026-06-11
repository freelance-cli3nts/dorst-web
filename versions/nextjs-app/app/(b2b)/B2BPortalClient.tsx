'use client'

import { useState, useReducer } from 'react'
import Link from 'next/link'
import { WhaleSVG } from '@/components/whale/WhaleSVG'

// ── Data ─────────────────────────────────────────────────────────
const PRODUCTS = [
  { id: 'c-lion',   name: 'Lion Heart',     style: 'NEIPA',          size: '330ml can', price: 3.20, stock: 240, accentHex: '#00ACF0', group: 'Canned Beer' },
  { id: 'c-alexis', name: 'Alexis',         style: 'Pale Ale',       size: '330ml can', price: 2.90, stock: 288, accentHex: '#EA236D', group: 'Canned Beer' },
  { id: 'c-hippy',  name: 'Hippy Shake',    style: 'NEIPA',          size: '330ml can', price: 3.40, stock: 144, accentHex: '#F5832A', group: 'Canned Beer' },
  { id: 'c-stout',  name: 'Full Breakfast', style: 'Imperial Stout', size: '330ml can', price: 3.60, stock: 96,  accentHex: '#5B3A8C', group: 'Canned Beer' },
  { id: 'k20-lion', name: 'Lion Heart',     style: 'NEIPA',          size: '20L keg',   price: 72.00, stock: 8,  accentHex: '#00ACF0', group: 'Kegs — 20L' },
  { id: 'k20-ale',  name: 'Alexis',         style: 'Pale Ale',       size: '20L keg',   price: 66.00, stock: 12, accentHex: '#EA236D', group: 'Kegs — 20L' },
  { id: 'k20-hip',  name: 'Hippy Shake',    style: 'NEIPA',          size: '20L keg',   price: 78.00, stock: 6,  accentHex: '#F5832A', group: 'Kegs — 20L' },
  { id: 'k20-sto',  name: 'Full Breakfast', style: 'Imperial Stout', size: '20L keg',   price: 82.00, stock: 4,  accentHex: '#5B3A8C', group: 'Kegs — 20L' },
  { id: 'k30-lion', name: 'Lion Heart',     style: 'NEIPA',          size: '30L keg',   price: 102.00, stock: 6, accentHex: '#00ACF0', group: 'Kegs — 30L' },
  { id: 'k30-ale',  name: 'Alexis',         style: 'Pale Ale',       size: '30L keg',   price: 94.00,  stock: 8, accentHex: '#EA236D', group: 'Kegs — 30L' },
  { id: 'k30-hip',  name: 'Hippy Shake',    style: 'NEIPA',          size: '30L keg',   price: 110.00, stock: 4, accentHex: '#F5832A', group: 'Kegs — 30L' },
]

type QtyState = Record<string, number>
type QtyAction = { type: 'SET'; id: string; qty: number } | { type: 'CLEAR' }

function qtyReducer(state: QtyState, action: QtyAction): QtyState {
  if (action.type === 'CLEAR') return {}
  return { ...state, [action.id]: Math.max(0, action.qty) }
}

// ── Step definitions ─────────────────────────────────────────────
type Screen = 1 | 2 | 3 | 4 | 5

interface Company {
  name: string
  eik: string
  city: string
  isNew: boolean
}

// ── Main component ───────────────────────────────────────────────
export function B2BPortalClient() {
  const [screen, setScreen] = useState<Screen>(1)
  const [accessCode, setAccessCode] = useState('')
  const [accessError, setAccessError] = useState(false)
  const [vatInput, setVatInput] = useState('')
  const [vatError, setVatError] = useState(false)
  const [vatLoading, setVatLoading] = useState(false)
  const [company, setCompany] = useState<Company | null>(null)
  const [newName, setNewName] = useState('')
  const [newCity, setNewCity] = useState('')
  const [newContact, setNewContact] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [qty, dispatchQty] = useReducer(qtyReducer, {})
  const [stockWarning, setStockWarning] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [confirmOrder, setConfirmOrder] = useState('')
  const [confirmInvoice, setConfirmInvoice] = useState('')

  const subtotal = PRODUCTS.reduce((s, p) => s + (qty[p.id] ?? 0) * p.price, 0)
  const vat = subtotal * 0.20
  const total = subtotal + vat

  function verifyAccess() {
    const val = accessCode.trim().toUpperCase()
    if (val.startsWith('DORST-') && val.length >= 8) {
      setAccessError(false)
      setScreen(2)
    } else {
      setAccessError(true)
    }
  }

  function lookupVAT() {
    const val = vatInput.trim()
    if (!val || val.length < 9) { setVatError(true); return }
    setVatError(false)
    setVatLoading(true)
    setCompany(null)
    setTimeout(() => {
      setVatLoading(false)
      if (val === '123456789') {
        setCompany({ name: 'De Bierkoning EOOD', eik: val, city: 'Sofia', isNew: false })
      } else {
        setCompany({ name: 'Example Company OOD', eik: val, city: 'Sofia', isNew: true })
        setNewName('Example Company OOD')
        setNewCity('Sofia')
      }
    }, 1400)
  }

  function proceedToOrder() {
    if (!company) return
    setScreen(3)
  }

  function registerAndProceed() {
    if (!newName || !newContact || !newEmail) { alert('Please fill all required fields.'); return }
    if (company) setCompany({ ...company, name: newName })
    setScreen(3)
  }

  function checkInventory() {
    if (!PRODUCTS.some(p => (qty[p.id] ?? 0) > 0)) { alert('Add at least one product.'); return }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      const overStock = PRODUCTS.some(p => (qty[p.id] ?? 0) > p.stock)
      if (overStock) {
        setStockWarning(true)
      } else {
        setStockWarning(false)
        setScreen(4)
      }
    }, 1200)
  }

  function submitOrder() {
    if (!paymentMethod) return
    setSubmitting(true)
    setTimeout(() => {
      const num = `DORST-${Math.floor(1000 + Math.random() * 9000)}`
      const inv = `INV-2026-${Math.floor(100 + Math.random() * 900)}`
      setConfirmOrder(num)
      setConfirmInvoice(inv)
      setSubmitting(false)
      setScreen(5)
    }, 1800)
  }

  function resetPortal() {
    dispatchQty({ type: 'CLEAR' })
    setPaymentMethod(null)
    setScreen(3)
  }

  // ── Shared styles ─────────────────────────────────────────────
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '13px 16px',
    border: '1.5px solid var(--line)',
    borderRadius: 5,
    fontFamily: 'var(--font-sans)',
    fontSize: 15,
    color: 'var(--ink)',
    background: 'white',
    outline: 'none',
  }
  const btnPrimary: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '14px 28px',
    fontFamily: 'var(--font-sans)',
    fontSize: 15,
    fontWeight: 600,
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    background: 'var(--ink)',
    color: 'white',
    width: '100%',
  }

  const groups = [...new Set(PRODUCTS.map(p => p.group))]

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF5', fontFamily: 'var(--font-sans)' }}>
      {/* Top bar */}
      <header style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px', borderBottom: '1px solid var(--line)', background: '#FAFAF5', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'var(--ink)' }}>
          <WhaleSVG size="nav" />
          <span style={{ fontSize: 20, fontWeight: 900, letterSpacing: '-0.5px' }}>DORST</span>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#706E66', background: '#E8E5DC', padding: '3px 8px', borderRadius: 100 }}>
            Partner Portal
          </span>
        </Link>
        <Link href="/" style={{ fontSize: 13, color: '#706E66', textDecoration: 'none' }}>← Main site</Link>
      </header>

      {/* Step indicator */}
      <div style={{ padding: '28px 48px 0', display: 'flex', alignItems: 'center', maxWidth: 700, margin: '0 auto' }}>
        {[1, 2, 3, 4, 5].map((step, i) => (
          <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flex: 1, position: 'relative' }}>
            {i < 4 && (
              <div style={{ position: 'absolute', top: 16, left: 'calc(50% + 20px)', right: 'calc(-50% + 20px)', height: 1, background: screen > step ? 'var(--ink)' : 'var(--line)', transition: 'background 0.4s' }} />
            )}
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              border: `1.5px solid ${screen >= step ? 'var(--ink)' : 'var(--line)'}`,
              background: screen >= step ? 'var(--ink)' : 'white',
              color: screen >= step ? 'white' : '#706E66',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: screen > step ? 0 : 13, fontWeight: 600,
              position: 'relative', zIndex: 1,
              transition: 'all 0.3s',
            }}>
              {screen > step ? <span style={{ fontSize: 14 }}>✓</span> : step}
            </div>
            <span style={{ fontSize: 11, fontWeight: screen === step ? 600 : 500, color: screen === step ? 'var(--ink)' : '#706E66', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
              {['Access', 'Verify', 'Order', 'Payment', 'Confirm'][i]}
            </span>
          </div>
        ))}
      </div>

      {/* Screens */}
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '48px 48px 80px' }}>

        {/* Screen 1: Access code */}
        {screen === 1 && (
          <div>
            <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 10 }}>Partner access</h1>
            <p style={{ fontSize: 15, color: '#706E66', fontWeight: 300, marginBottom: 40 }}>Enter the access code provided by Dorst when your account was set up.</p>
            <div style={{ background: 'white', border: '1.5px solid var(--line)', borderRadius: 10, padding: 44 }}>
              <WhaleSVG size="nav" style={{ marginBottom: 28 } as React.CSSProperties} />
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Access Code</label>
                <input
                  type="text"
                  value={accessCode}
                  onChange={e => { setAccessCode(e.target.value.toUpperCase()); setAccessError(false) }}
                  onKeyDown={e => e.key === 'Enter' && verifyAccess()}
                  placeholder="DORST-XXXX"
                  style={{ ...inputStyle, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 18, borderColor: accessError ? '#B91C1C' : 'var(--line)' }}
                />
                {accessError && <p style={{ fontSize: 12, color: '#B91C1C', marginTop: 4 }}>Incorrect access code. Contact Dorst to get yours.</p>}
                <p style={{ fontSize: 12, color: '#706E66', marginTop: 4 }}>Received by email when your account was created. Try: DORST-2026</p>
              </div>
              <button onClick={verifyAccess} style={btnPrimary}>Continue →</button>
              <div style={{ background: '#FFF9E6', border: '1px solid #E8D48A', borderRadius: 5, padding: '14px 18px', fontSize: 13, color: '#7A6010', marginTop: 24 }}>
                This portal is for verified Dorst trade partners only. Not a partner yet?{' '}
                <a href="mailto:sales@dorst.bg" style={{ color: 'inherit', fontWeight: 600 }}>Contact us</a> to get set up.
              </div>
            </div>
          </div>
        )}

        {/* Screen 2: VAT verification */}
        {screen === 2 && (
          <div>
            <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 10 }}>Verify your company</h1>
            <p style={{ fontSize: 15, color: '#706E66', fontWeight: 300, marginBottom: 40 }}>Enter your Bulgarian company registration number (ЕИК / Bulstat).</p>
            <div style={{ background: 'white', border: '1.5px solid var(--line)', borderRadius: 10, padding: 44 }}>
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Company Registration Number (ЕИК)</label>
                <input
                  type="text"
                  value={vatInput}
                  onChange={e => { setVatInput(e.target.value); setVatError(false) }}
                  onKeyDown={e => e.key === 'Enter' && lookupVAT()}
                  placeholder="e.g. 123456789"
                  maxLength={13}
                  style={{ ...inputStyle, borderColor: vatError ? '#B91C1C' : 'var(--line)' }}
                />
                {vatError && <p style={{ fontSize: 12, color: '#B91C1C', marginTop: 4 }}>Please enter a valid ЕИК (minimum 9 digits).</p>}
                <p style={{ fontSize: 12, color: '#706E66', marginTop: 4 }}>Try 123456789 for existing partner, or any 9-digit number for new.</p>
              </div>
              <button onClick={lookupVAT} disabled={vatLoading} style={{ ...btnPrimary, width: 'auto', opacity: vatLoading ? 0.6 : 1 }}>
                {vatLoading ? 'Looking up…' : 'Look up company →'}
              </button>

              {/* Existing partner found */}
              {company && !company.isNew && (
                <div style={{ background: '#F0FBF4', border: '1.5px solid #86EFAC', borderRadius: 10, padding: '24px 28px', marginTop: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, fontWeight: 600 }}>
                    Company found
                    <span style={{ background: '#22C55E', color: 'white', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 100 }}>✓ Verified partner</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px', marginBottom: 24 }}>
                    {[['Company', company.name], ['ЕИК', company.eik], ['City', company.city], ['Status', 'Active partner']].map(([k, v]) => (
                      <div key={k}>
                        <dt style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#706E66', marginBottom: 3 }}>{k}</dt>
                        <dd style={{ fontSize: 15, fontWeight: 500, color: k === 'Status' ? '#1A6B3A' : 'var(--ink)', fontWeight: k === 'Status' ? 700 : 500 }}>{v}</dd>
                      </div>
                    ))}
                  </div>
                  <button onClick={proceedToOrder} style={btnPrimary}>Proceed to order →</button>
                </div>
              )}

              {/* New partner */}
              {company && company.isNew && (
                <div style={{ background: '#FFFBEB', border: '1.5px solid #FCD34D', borderRadius: 10, padding: '24px 28px', marginTop: 24 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>New company — please verify your details</h3>
                  <p style={{ fontSize: 13, color: '#706E66', marginBottom: 24 }}>Found in the Trade Register but not yet in our system. Confirm your details and we&apos;ll create your account.</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Company Name</label>
                      <input type="text" value={newName} onChange={e => setNewName(e.target.value)} style={inputStyle} />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>City</label>
                      <input type="text" value={newCity} onChange={e => setNewCity(e.target.value)} style={inputStyle} />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Contact Person</label>
                      <input type="text" value={newContact} onChange={e => setNewContact(e.target.value)} placeholder="First name" style={inputStyle} />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Email</label>
                      <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="email@company.com" style={inputStyle} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Phone</label>
                    <input type="tel" value={newPhone} onChange={e => setNewPhone(e.target.value)} placeholder="+359 ..." style={inputStyle} />
                  </div>
                  <button onClick={registerAndProceed} style={btnPrimary}>Confirm & proceed to order →</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Screen 3: Order */}
        {screen === 3 && company && (
          <div>
            <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 10 }}>Place your order</h1>
            <p style={{ fontSize: 15, color: '#706E66', fontWeight: 300, marginBottom: 28 }}>Select quantities below. Stock is verified live before confirmation.</p>

            <div style={{ background: '#E8E5DC', borderRadius: 10, padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
              <WhaleSVG size="nav" fill="#706E66" />
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{company.name}</div>
                <div style={{ fontSize: 13, color: '#706E66' }}>ЕИК: {company.eik}</div>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 8 }}>
              <thead>
                <tr>
                  {['Product', 'Size', 'Unit price', 'Qty', 'Total'].map((h, i) => (
                    <th key={h} style={{ textAlign: i === 4 ? 'right' : 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#706E66', padding: '0 12px 14px', borderBottom: '1px solid var(--line)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {groups.map(group => (
                  <>
                    <tr key={`g-${group}`}>
                      <td colSpan={5} style={{ padding: '18px 12px 8px', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#706E66', background: '#FAFAF5' }}>{group}</td>
                    </tr>
                    {PRODUCTS.filter(p => p.group === group).map(p => {
                      const q = qty[p.id] ?? 0
                      const overStock = q > p.stock
                      return (
                        <tr key={p.id} style={{ borderBottom: '1px solid #E8E5DC', background: overStock ? '#FEF2F2' : 'transparent' }}>
                          <td style={{ padding: '16px 12px', verticalAlign: 'middle' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: p.accentHex, marginRight: 10, flexShrink: 0 }} />
                              <div>
                                <div style={{ fontWeight: 500, fontSize: 15 }}>{p.name}</div>
                                <div style={{ fontSize: 12, color: '#706E66' }}>{p.style}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '16px 12px', fontSize: 13, color: '#706E66' }}>{p.size}</td>
                          <td style={{ padding: '16px 12px', fontSize: 14, fontWeight: 500 }}>€{p.price.toFixed(2)}</td>
                          <td style={{ padding: '16px 12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <button onClick={() => dispatchQty({ type: 'SET', id: p.id, qty: q - 1 })} style={{ width: 30, height: 30, borderRadius: '50%', border: '1.5px solid var(--line)', background: 'white', fontSize: 18, fontWeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>−</button>
                              <span style={{ fontSize: 16, fontWeight: 600, minWidth: 28, textAlign: 'center' }}>{q}</span>
                              <button onClick={() => dispatchQty({ type: 'SET', id: p.id, qty: q + 1 })} style={{ width: 30, height: 30, borderRadius: '50%', border: '1.5px solid var(--line)', background: 'white', fontSize: 18, fontWeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>+</button>
                            </div>
                          </td>
                          <td style={{ padding: '16px 12px', textAlign: 'right', fontWeight: 600, fontSize: 15 }}>
                            {q > 0 ? `€${(q * p.price).toFixed(2)}` : '—'}
                          </td>
                        </tr>
                      )
                    })}
                  </>
                ))}
              </tbody>
            </table>

            <div style={{ background: 'white', border: '1.5px solid var(--line)', borderRadius: 10, padding: '24px 28px', marginTop: 24 }}>
              {[['Subtotal (excl. VAT)', subtotal], ['VAT (20%)', vat]].map(([label, amount]) => (
                <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', fontSize: 14, color: '#706E66' }}>
                  <span>{label}</span>
                  <span>€ {(amount as number).toFixed(2)}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--line)', marginTop: 8, paddingTop: 16, fontSize: 18, fontWeight: 700 }}>
                <span>Total incl. VAT</span>
                <span>€ {total.toFixed(2)}</span>
              </div>
            </div>

            {stockWarning && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 5, padding: '14px 18px', fontSize: 13, color: '#991B1B', marginTop: 16 }}>
                Some items exceed available stock. Rows highlighted in red need adjusting.
              </div>
            )}

            <div style={{ display: 'flex', gap: 14, marginTop: 24 }}>
              <button onClick={() => setScreen(2)} style={{ ...btnPrimary, width: 'auto', background: '#E8E5DC', color: 'var(--ink)', flexShrink: 0 }}>← Back</button>
              <button onClick={checkInventory} disabled={submitting} style={{ ...btnPrimary, flex: 1, opacity: submitting ? 0.6 : 1 }}>
                {submitting ? 'Checking…' : 'Check availability & confirm →'}
              </button>
            </div>
          </div>
        )}

        {/* Screen 4: Payment */}
        {screen === 4 && (
          <div>
            <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 10 }}>Payment method</h1>
            <p style={{ fontSize: 15, color: '#706E66', fontWeight: 300, marginBottom: 28 }}>Choose how you&apos;d like to pay for this order.</p>

            {/* Recap */}
            <div style={{ background: '#E8E5DC', borderRadius: 10, padding: '20px 24px', marginBottom: 28 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#706E66', marginBottom: 14 }}>Order Summary</div>
              {PRODUCTS.filter(p => (qty[p.id] ?? 0) > 0).map(p => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '4px 0', color: '#706E66' }}>
                  <span>{p.name} × {qty[p.id]}</span>
                  <span>€{((qty[p.id] ?? 0) * p.price).toFixed(2)}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 700, color: 'var(--ink)', borderTop: '1px solid var(--line)', marginTop: 10, paddingTop: 14 }}>
                <span>Total incl. VAT</span>
                <span>€ {total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment options — cash/bank only for B2B */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
              {[
                { id: 'cash', label: 'Cash invoice — pay at delivery', desc: 'Invoice generated now. Pay in cash when the order arrives.', icon: '💵' },
                { id: 'bank', label: 'Bank transfer invoice', desc: 'Invoice with IBAN details generated immediately.', icon: '🏦' },
              ].map(opt => (
                <div
                  key={opt.id}
                  onClick={() => setPaymentMethod(opt.id)}
                  style={{
                    border: `1.5px solid ${paymentMethod === opt.id ? 'var(--ink)' : 'var(--line)'}`,
                    borderRadius: 10,
                    padding: '20px 24px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 16,
                    background: paymentMethod === opt.id ? 'rgba(14,14,16,0.03)' : 'white',
                  }}
                >
                  <div style={{ width: 20, height: 20, borderRadius: '50%', border: `1.5px solid ${paymentMethod === opt.id ? 'var(--ink)' : 'var(--line)'}`, flexShrink: 0, marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', background: paymentMethod === opt.id ? 'var(--ink)' : 'transparent' }}>
                    {paymentMethod === opt.id && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{opt.label}</div>
                    <div style={{ fontSize: 13, color: '#706E66' }}>{opt.desc}</div>
                  </div>
                  <div style={{ fontSize: 22, marginLeft: 'auto', flexShrink: 0 }}>{opt.icon}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 14 }}>
              <button onClick={() => setScreen(3)} style={{ ...btnPrimary, width: 'auto', background: '#E8E5DC', color: 'var(--ink)', flexShrink: 0 }}>← Back</button>
              <button onClick={submitOrder} disabled={!paymentMethod || submitting} style={{ ...btnPrimary, flex: 1, opacity: (!paymentMethod || submitting) ? 0.5 : 1, cursor: (!paymentMethod || submitting) ? 'not-allowed' : 'pointer' }}>
                {submitting ? 'Confirming…' : 'Confirm order →'}
              </button>
            </div>
          </div>
        )}

        {/* Screen 5: Confirmation */}
        {screen === 5 && (
          <div style={{ background: 'white', border: '1.5px solid var(--line)', borderRadius: 10, padding: '52px 44px', textAlign: 'center', marginTop: 20 }}>
            <div style={{ width: 64, height: 64, background: '#F0FBF4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 28, animation: 'popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>✓</div>
            <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>Order confirmed</h1>
            <p style={{ fontSize: 15, color: '#706E66', fontWeight: 300, lineHeight: 1.65, maxWidth: 380, margin: '0 auto 28px' }}>
              Your order is now in our delivery queue. We&apos;ll be in touch to arrange a delivery window.
            </p>
            <span style={{ display: 'inline-block', background: '#E8E5DC', borderRadius: 5, padding: '6px 14px', fontSize: 14, fontWeight: 600, letterSpacing: '0.08em', color: '#706E66', marginBottom: 32 }}>
              Order #{confirmOrder}
            </span>

            <div style={{ background: '#E8E5DC', borderRadius: 10, padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left', marginBottom: 24, gap: 20 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#706E66', marginBottom: 6 }}>Invoice</div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>{confirmInvoice}</div>
                <div style={{ fontSize: 13, color: '#706E66', marginTop: 2 }}>Issued · PDF ready</div>
              </div>
              <button
                onClick={() => alert('In production: downloads from Supabase Storage via signed URL from CRM API.')}
                style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--ink)', color: 'white', border: 'none', padding: '12px 22px', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, borderRadius: 5, cursor: 'pointer', flexShrink: 0 }}
              >
                ↓ Download PDF
              </button>
            </div>

            <div style={{ borderTop: '1px solid var(--line)', marginTop: 24, paddingTop: 28 }}>
              <p style={{ fontSize: 14, color: '#706E66', marginBottom: 16 }}>Questions? Email <a href="mailto:orders@dorst.bg" style={{ color: 'var(--ink)', fontWeight: 600 }}>orders@dorst.bg</a></p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={resetPortal} style={{ ...btnPrimary, width: 'auto', background: '#E8E5DC', color: 'var(--ink)' }}>Place another order</button>
                <Link href="/partners/tracking" style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 28px', fontSize: 15, fontWeight: 600, color: 'var(--ink)', textDecoration: 'none', border: '1.5px solid var(--line)', borderRadius: 5 }}>Track this order →</Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes popIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @media (max-width: 700px) {
          header { padding: 0 20px !important; }
          div[style*="padding: '48px 48px 80px'"] { padding: 32px 20px 60px !important; }
        }
      `}</style>
    </div>
  )
}
