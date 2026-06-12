'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import type { Beer } from '@/lib/data'
import { useLocale } from '@/components/LocaleProvider'
import { pickBeerText } from '@/lib/locale-content'
import { BeerLabel } from '@/components/beer/BeerLabel'
import { assetPath } from '@/lib/asset-path'

interface Props {
  beer: Beer
  relatedBeers: Beer[]
}

export function BeerDetailClient({ beer, relatedBeers }: Props) {
  const t = useTranslations('Beers')
  const { locale } = useLocale()
  const text = pickBeerText(beer, locale)

  return (
    <div style={{ paddingTop: 72 }}>
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
        <div style={{ position: 'absolute', right: -80, bottom: -80, width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: `${beer.contrastHex}99`, marginBottom: 16 }}>{text.style}</p>
          <h1 style={{ fontSize: 'clamp(48px, 7vw, 80px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.03em', color: beer.contrastHex, marginBottom: 20 }}>{text.name}</h1>
          <p style={{ fontSize: 18, fontWeight: 300, color: `${beer.contrastHex}CC`, lineHeight: 1.55, maxWidth: 440, marginBottom: 32 }}>{text.tagline}</p>
          <div className="beer-stats-bar" style={{ display: 'inline-flex', alignItems: 'baseline', gap: 4, background: 'rgba(0,0,0,0.15)', borderRadius: 4, padding: '12px 20px', backdropFilter: 'blur(4px)' }}>
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
        <div className="desktop-only">
          <BeerLabel beer={beer} size="hero" nameOverride={text.name} />
        </div>
      </section>

      {beer.labelType === 'pdf' && beer.labelSrc && (
        <section className="page-pad" style={{ padding: '40px 48px', borderBottom: '1px solid var(--line)', background: 'var(--paper)' }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 16 }}>
            {t('viewLabelPdf')}
          </h2>
          <iframe
            src={assetPath(beer.labelSrc)}
            title={`${text.name} label`}
            style={{ width: '100%', height: 480, border: '1px solid var(--line)', borderRadius: 4, background: 'white' }}
          />
          <a
            href={assetPath(beer.labelSrc)}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-block', marginTop: 16, fontSize: 14, fontWeight: 600, color: 'var(--ink)', textDecoration: 'underline' }}
          >
            {t('downloadLabel')}
          </a>
        </section>
      )}

      {beer.tags.length > 0 && (
        <div className="page-pad" style={{ padding: '20px 48px', borderBottom: '1px solid var(--line)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {beer.tags.map(tag => (
            <span key={tag} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '5px 12px', border: '1.5px solid var(--ink)', borderRadius: 'var(--radius-pill)', color: 'var(--ink)' }}>
              {t(`tags.${tag}`)}
            </span>
          ))}
        </div>
      )}

      <section className="content-grid page-pad" style={{ padding: '60px 48px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 60, alignItems: 'start' }}>
        <div>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20, letterSpacing: '-0.01em' }}>{t('story')}</h2>
          <p style={{ fontSize: 17, fontWeight: 300, lineHeight: 1.75, color: 'var(--ink-soft)', marginBottom: 40 }}>{text.story}</p>
          <div style={{ marginBottom: 40 }}>
            <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 16 }}>{t('hops')}</h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {beer.hops.map(hop => (
                <span key={hop} style={{ fontSize: 13, fontWeight: 600, padding: '6px 14px', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 'var(--radius-pill)' }}>{hop}</span>
              ))}
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 12 }}>{t('pairing')}</h3>
            <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.6 }}>{text.pairing}</p>
          </div>
        </div>

        <div>
          <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 2, padding: '28px', marginBottom: 16 }}>
            <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 20 }}>{t('specSheet')}</h3>
            <dl style={{ display: 'grid', gap: 14 }}>
              {[
                { label: t('style'), value: text.style },
                { label: t('abv'), value: `${beer.abv}%` },
                { label: t('plato'), value: `${beer.plato}°` },
                ...(beer.ibu ? [{ label: t('ibu'), value: beer.ibu.toString() }] : []),
                { label: t('serve'), value: beer.serveTemp },
                { label: t('glass'), value: beer.glass },
                { label: t('size'), value: beer.ml.map(m => `${m}ml`).join(' / ') },
                { label: t('color'), value: beer.color },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--line)', paddingBottom: 12 }}>
                  <dt style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>{label}</dt>
                  <dd style={{ fontSize: 14, fontWeight: 600 }}>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {(beer.format === 'can' || beer.format === 'both') && beer.priceB2C && (
            <Link href={`/shop?beer=${beer.slug}`} style={{ display: 'block', width: '100%', background: 'var(--ink)', color: 'var(--foam)', border: '2px solid var(--ink)', padding: '14px 24px', fontSize: 15, fontWeight: 700, borderRadius: 'var(--radius-pill)', textDecoration: 'none', textAlign: 'center', letterSpacing: '0.02em' }}>
              {t('addToCart', { price: beer.priceB2C.toFixed(2) })}
            </Link>
          )}

          <Link href="/beers" style={{ display: 'block', width: '100%', textAlign: 'center', marginTop: 12, fontSize: 13, color: 'var(--ink-soft)', textDecoration: 'none', letterSpacing: '0.02em' }}>
            {t('backToAll')}
          </Link>
        </div>
      </section>

      {relatedBeers.length > 0 && (
        <section className="page-pad" style={{ padding: '40px 48px 80px', borderTop: '1px solid var(--line)' }}>
          <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 24 }}>{t('moreBeers')}</h3>
          <div className="related-beers-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {relatedBeers.map(b => {
              const rel = pickBeerText(b, locale)
              return (
                <Link key={b.id} href={`/beers/${b.slug}`} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 2, textDecoration: 'none', color: 'var(--ink)' }} className="related-beer-link">
                  <BeerLabel beer={b} size="sm" variant="card" nameOverride={rel.name} style={{ width: 36, height: 64, borderRadius: 4 }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{rel.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-soft)', letterSpacing: '0.08em' }}>{b.abv}% · {rel.style}</div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      <style>{`
        .related-beer-link:hover { border-color: var(--ink) !important; }
      `}</style>
    </div>
  )
}
