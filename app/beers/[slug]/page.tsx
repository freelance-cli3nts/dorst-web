import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { beers } from '@/lib/data'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return beers.map(b => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const beer = beers.find(b => b.slug === slug)
  if (!beer) return {}
  return {
    title: `${beer.name} — Dorst Brewery`,
    description: beer.taglineEn,
  }
}

export default async function BeerPage({ params }: Props) {
  const { slug } = await params
  const beer = beers.find(b => b.slug === slug)
  if (!beer) notFound()

  const relatedBeers = beers
    .filter(b => b.id !== beer.id && b.active && b.format !== 'keg')
    .slice(0, 3)

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Hero — full-bleed with accent color */}
      <section
        style={{
          background: beer.accentHex,
          padding: '80px 48px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          alignItems: 'center',
          minHeight: '50vh',
          position: 'relative',
          overflow: 'hidden',
        }}
        className="beer-hero"
      >
        {/* Subtle circle decoration */}
        <div
          style={{
            position: 'absolute',
            right: -80, bottom: -80,
            width: 400, height: 400,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: `${beer.contrastHex}99`, marginBottom: 16 }}>
            {beer.style}
          </p>
          <h1
            style={{
              fontSize: 'clamp(48px, 7vw, 80px)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: beer.contrastHex,
              marginBottom: 20,
            }}
          >
            {beer.name}
          </h1>
          <p style={{ fontSize: 18, fontWeight: 300, color: `${beer.contrastHex}CC`, lineHeight: 1.55, maxWidth: 440, marginBottom: 32 }}>
            {beer.taglineEn}
          </p>

          {/* Spec strip */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'baseline',
              gap: 4,
              background: 'rgba(0,0,0,0.15)',
              borderRadius: 4,
              padding: '12px 20px',
              backdropFilter: 'blur(4px)',
            }}
          >
            <span style={{ fontWeight: 900, fontSize: 20, color: beer.contrastHex }}>{beer.abv}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: `${beer.contrastHex}99` }}>%</span>
            <span style={{ margin: '0 8px', color: `${beer.contrastHex}66` }}>·</span>
            <span style={{ fontWeight: 900, fontSize: 20, color: beer.contrastHex }}>{beer.plato}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: `${beer.contrastHex}99` }}>°</span>
            {beer.ibu && (
              <>
                <span style={{ margin: '0 8px', color: `${beer.contrastHex}66` }}>·</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: `${beer.contrastHex}99` }}>IBU {beer.ibu}</span>
              </>
            )}
            <span style={{ margin: '0 8px', color: `${beer.contrastHex}66` }}>·</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: `${beer.contrastHex}99` }}>{beer.ml.join('/')}ml</span>
          </div>
        </div>

        {/* Can placeholder */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="hidden md:flex"
        >
          <div
            style={{
              width: 120,
              height: 220,
              borderRadius: 12,
              background: 'rgba(255,255,255,0.2)',
              border: `2px solid rgba(255,255,255,0.4)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 24px 48px rgba(0,0,0,0.15)',
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 700, color: beer.contrastHex, opacity: 0.7, textAlign: 'center', fontStyle: 'italic', letterSpacing: '0.05em' }}>
              {beer.name}
            </span>
          </div>
        </div>
      </section>

      {/* Tags */}
      {beer.tags.length > 0 && (
        <div style={{ padding: '20px 48px', borderBottom: '1px solid var(--line)', display: 'flex', gap: 8 }}>
          {beer.tags.map(tag => (
            <span
              key={tag}
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '5px 12px',
                border: '1.5px solid var(--ink)',
                borderRadius: 'var(--radius-pill)',
                color: 'var(--ink)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Content grid */}
      <section style={{ padding: '60px 48px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 60, alignItems: 'start' }} className="content-grid">
        {/* Left: story + details */}
        <div>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20, letterSpacing: '-0.01em' }}>The Story</h2>
          <p style={{ fontSize: 17, fontWeight: 300, lineHeight: 1.75, color: 'var(--ink-soft)', marginBottom: 40 }}>
            {beer.storyEn}
          </p>

          {/* Hops */}
          <div style={{ marginBottom: 40 }}>
            <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 16 }}>
              Hops
            </h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {beer.hops.map(hop => (
                <span
                  key={hop}
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    padding: '6px 14px',
                    background: 'var(--paper)',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--radius-pill)',
                  }}
                >
                  {hop}
                </span>
              ))}
            </div>
          </div>

          {/* Pairing */}
          <div>
            <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 12 }}>
              Pairs With
            </h3>
            <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              {beer.pairingEn}
            </p>
          </div>
        </div>

        {/* Right: quick specs + CTA */}
        <div>
          <div
            style={{
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              borderRadius: 2,
              padding: '28px',
              marginBottom: 16,
            }}
          >
            <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 20 }}>
              Spec Sheet
            </h3>
            <dl style={{ display: 'grid', gap: 14 }}>
              {[
                { label: 'Style', value: beer.style },
                { label: 'ABV', value: `${beer.abv}%` },
                { label: 'Plato', value: `${beer.plato}°` },
                ...(beer.ibu ? [{ label: 'IBU', value: beer.ibu.toString() }] : []),
                { label: 'Serve', value: beer.serveTemp },
                { label: 'Glass', value: beer.glass },
                { label: 'Size', value: beer.ml.map(m => `${m}ml`).join(' / ') },
                { label: 'Color', value: beer.color },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--line)', paddingBottom: 12 }}>
                  <dt style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>{label}</dt>
                  <dd style={{ fontSize: 14, fontWeight: 600, fontFamily: label === 'ABV' || label === 'Plato' || label === 'IBU' ? 'var(--font-mono)' : 'inherit' }}>
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* CTA */}
          {(beer.format === 'can' || beer.format === 'both') && beer.priceB2C && (
            <Link
              href={`/shop?beer=${beer.slug}`}
              style={{
                display: 'block',
                width: '100%',
                background: 'var(--ink)',
                color: 'var(--foam)',
                border: '2px solid var(--ink)',
                padding: '14px 24px',
                fontSize: 15,
                fontWeight: 700,
                borderRadius: 'var(--radius-pill)',
                textDecoration: 'none',
                textAlign: 'center',
                transition: 'background 0.2s, color 0.2s',
                letterSpacing: '0.02em',
              }}
            >
              Add to Cart — €{beer.priceB2C?.toFixed(2)}
            </Link>
          )}

          <Link
            href="/beers"
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'center',
              marginTop: 12,
              fontSize: 13,
              color: 'var(--ink-soft)',
              textDecoration: 'none',
              letterSpacing: '0.02em',
            }}
          >
            ← Back to all beers
          </Link>
        </div>
      </section>

      {/* Related beers */}
      {relatedBeers.length > 0 && (
        <section style={{ padding: '40px 48px 80px', borderTop: '1px solid var(--line)' }}>
          <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 24 }}>
            More Beers
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {relatedBeers.map(b => (
              <Link
                key={b.id}
                href={`/beers/${b.slug}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '16px',
                  background: 'var(--paper)',
                  border: '1px solid var(--line)',
                  borderRadius: 2,
                  textDecoration: 'none',
                  color: 'var(--ink)',
                  transition: 'border-color 0.2s',
                }}
                className="related-beer-link"
              >
                <div style={{ width: 36, height: 36, borderRadius: 4, background: b.accentHex, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{b.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-soft)', letterSpacing: '0.08em' }}>{b.abv}% · {b.style}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <style>{`
        .related-beer-link:hover { border-color: var(--ink) !important; }
        @media (max-width: 900px) {
          .beer-hero { grid-template-columns: 1fr !important; padding: 60px 24px !important; }
          .content-grid { grid-template-columns: 1fr !important; padding: 40px 24px !important; }
          .content-grid > div:last-child { order: -1; }
        }
      `}</style>
    </div>
  )
}
