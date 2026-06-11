import type { Metadata } from 'next'
import { beers } from '@/lib/data'
import { ShopClient } from './ShopClient'

export const metadata: Metadata = {
  title: 'Shop — Dorst Brewery',
  description: 'Order Dorst craft beer online. Cans delivered to Sofia. Minimum 12 cans per order.',
}

export default function ShopPage() {
  const shopBeers = beers.filter(b => b.active && (b.format === 'can' || b.format === 'both') && b.priceB2C)

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Header */}
      <section style={{ padding: '60px 48px 40px', borderBottom: '1px solid var(--line)' }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 16 }}>
          Online Store
        </p>
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 16 }}>
          Shop Cans
        </h1>
        <p style={{ fontSize: 16, fontWeight: 300, color: 'var(--ink-soft)', lineHeight: 1.6, maxWidth: 480, marginBottom: 24 }}>
          Sofia delivery only. Fresh from the brewery. Minimum 12 cans per order.
        </p>
        <div style={{ display: 'flex', gap: 24, fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
          <span>UNFILTERED · UNPASTEURISED · VEGAN (most styles)</span>
        </div>
      </section>

      <ShopClient beers={shopBeers} />

      <style>{`
        @media (max-width: 768px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </div>
  )
}
