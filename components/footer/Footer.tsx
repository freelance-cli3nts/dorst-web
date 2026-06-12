'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { DorstLogo } from '@/components/brand/DorstLogo'

const BEER_SLUGS = [
  { slug: 'lion-heart', name: 'Lion Heart' },
  { slug: 'hippy-shake', name: 'Hippy Shake' },
  { slug: 'alexis', name: 'Alexis' },
  { slug: 'alma', name: 'Alma' },
  { slug: 'pulpa-fiction', name: 'Pulpa Fiction' },
  { slug: 'full-breakfast-stout', name: 'Full Breakfast Stout' },
]

export function Footer() {
  const t = useTranslations('Footer')

  return (
    <footer style={{ background: 'var(--ink)', color: 'white', padding: '80px 48px 40px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 60,
          marginBottom: 60,
          paddingBottom: 60,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
        className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      >
        {/* Brand */}
        <div>
          <div style={{ marginBottom: 20 }}>
            <DorstLogo height={32} variant="inverted" />
          </div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, fontWeight: 300, maxWidth: 240 }}>
            {t('tagline')}<br />
            {t('sub')}
          </p>
        </div>

        {/* Beers */}
        <div>
          <h4 style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>
            {t('sectionBeers')}
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {BEER_SLUGS.map(({ slug, name }) => (
              <li key={slug}>
                <Link
                  href={`/beers/${slug}`}
                  style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>
            {t('sectionCompany')}
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { href: '/about', label: t('about') },
              { href: '/locations', label: t('locations') },
              { href: '/partners', label: t('partners') },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>
            {t('sectionLegal')}
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[t('privacy'), t('terms'), t('cookies')].map(label => (
              <li key={label}>
                <Link
                  href="#"
                  style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
        <span>{t('copyright')}</span>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Instagram', 'Facebook', 'Untappd'].map(name => (
            <a
              key={name}
              href="#"
              style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none', fontSize: 13, fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
