import type { Metadata } from 'next'
import Link from 'next/link'
import { beers } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Our Beers — Dorst Brewery',
  description: 'Explore the full Dorst beer lineup. 10 styles from NEIPA to Imperial Stout, brewed in Bankya, Bulgaria.',
}

export default function BeersPage() {
  const activeCans = beers.filter(b => b.active && (b.format === 'can' || b.format === 'both'))

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Hero */}
      <section style={{ padding: '60px 48px 0' }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 16 }}>
          Our Collection
        </p>
        <h1
          style={{
            fontSize: 'clamp(48px, 7vw, 80px)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            marginBottom: 24,
          }}
        >
          The Beers
        </h1>
        <p style={{ fontSize: 18, fontWeight: 300, color: 'var(--ink-soft)', lineHeight: 1.6, maxWidth: 560, marginBottom: 48 }}>
          10 beers in rotation, each with its own character. No generic craft language — just honest ingredients and deliberate recipes.
        </p>
      </section>

      {/* Grid */}
      <section style={{ padding: '0 48px 80px' }}>
        <div
          style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--ink-soft)', marginBottom: 32,
            display: 'flex', alignItems: 'center', gap: 16,
          }}
        >
          Canned Beer
          <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {activeCans.map(beer => (
            <Link
              key={beer.id}
              href={`/beers/${beer.slug}`}
              style={{
                display: 'flex', flexDirection: 'column',
                background: 'var(--paper)',
                border: '4px solid var(--ink)',
                borderRadius: 2,
                overflow: 'hidden',
                textDecoration: 'none',
                color: 'var(--ink)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              }}
              className="beer-card"
            >
              {/* Color swatch */}
              <div style={{ background: beer.accentHex, aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                {beer.seasonal && (
                  <span style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.2)', color: 'rgba(255,255,255,0.9)', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 100 }}>
                    Seasonal
                  </span>
                )}
                <div style={{ width: 60, height: 108, borderRadius: 6, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.8)', textAlign: 'center', padding: 4, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    {beer.name}
                  </span>
                </div>
              </div>
              {/* Info */}
              <div style={{ padding: '20px 20px 24px' }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 6 }}>
                  {beer.style}
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, lineHeight: 1.1 }}>
                  {beer.name}
                </h3>
                <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 16, lineHeight: 1.5 }}>
                  {beer.taglineEn}
                </p>
                {/* Spec strip */}
                <div style={{ fontSize: 12, letterSpacing: '0.05em', color: 'var(--ink-soft)', paddingTop: 12, borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'baseline', gap: 0 }}>
                  <span style={{ fontWeight: 900, fontSize: 15 }}>{beer.abv}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>%</span>
                  <span style={{ margin: '0 6px', opacity: 0.4 }}>{' · '}</span>
                  <span style={{ fontWeight: 900, fontSize: 15 }}>{beer.plato}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>°</span>
                  {beer.ibu && (
                    <>
                      <span style={{ margin: '0 6px', opacity: 0.4 }}>{' · '}</span>
                      <span style={{ fontFamily: 'var(--font-mono)' }}>IBU {beer.ibu}</span>
                    </>
                  )}
                </div>
                {beer.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
                    {beer.tags.map(tag => (
                      <span key={tag} style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', border: '1px solid var(--line)', borderRadius: 'var(--radius-pill)', color: 'var(--ink-soft)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Legal strip */}
      <div style={{ padding: '24px 48px 80px', borderTop: '1px solid var(--line)', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-soft)', display: 'flex', gap: 16 }}>
        <span>UNFILTERED</span><span style={{ opacity: 0.4 }}>·</span>
        <span>UNPASTEURISED</span><span style={{ opacity: 0.4 }}>·</span>
        <span>VEGAN (most styles)</span>
      </div>

      <style>{`
        .beer-card { transition: transform 0.2s, box-shadow 0.2s; }
        .beer-card:hover { transform: translateY(-4px) !important; box-shadow: 0 16px 40px rgba(0,0,0,0.14) !important; }
        @media (max-width: 768px) {
          section, div[style*="padding: '0 48px"] { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </div>
  )
}
