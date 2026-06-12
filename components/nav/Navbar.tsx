'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { DorstLogo } from '@/components/brand/DorstLogo'
import { useCart } from '@/contexts/CartContext'
import { useLocale } from '@/components/LocaleProvider'

function ShopCta({ label, className }: { label: string; className?: string }) {
  const { totalItems } = useCart()

  return (
    <Link href="/shop" className={className ?? 'nav-shop-cta'}>
      {label}
      {totalItems > 0 && (
        <span className="nav-cart-badge">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Link>
  )
}

function LangToggle({ onSelect }: { onSelect?: () => void }) {
  const { locale, setLocale } = useLocale()

  return (
    <div className="nav-lang">
      {(['bg', 'en'] as const).map(l => (
        <button
          key={l}
          type="button"
          onClick={() => { setLocale(l); onSelect?.() }}
          className={locale === l ? 'nav-lang-btn nav-lang-btn--active' : 'nav-lang-btn'}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const t = useTranslations('Nav')
  const { locale, setLocale } = useLocale()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = [
    { href: '/beers', label: t('beers') },
    { href: '/locations', label: t('locations') },
    { href: '/about', label: t('about') },
  ]

  return (
    <nav className={`site-nav${scrolled ? ' site-nav--scrolled' : ''}`}>
      {/* Desktop */}
      <div className="nav-desktop">
        <Link href="/" className="nav-logo-link">
          <DorstLogo height={50} />
        </Link>

        <ul className="nav-links">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="nav-link">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <LangToggle />
          <ShopCta label={t('shop')} />
        </div>
      </div>

      {/* Mobile: logo · shop CTA · hamburger */}
      <div className="nav-mobile">
        <Link href="/" className="nav-logo-link">
          <DorstLogo height={50} />
        </Link>

        <ShopCta label={t('shopShort')} className="nav-shop-cta nav-shop-cta--mobile" />

        <button
          type="button"
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <>
          <button
            type="button"
            className="nav-overlay"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <div className="nav-drawer">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="nav-drawer-link"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}

            <div className="nav-drawer-lang">
              {(['bg', 'en'] as const).map(l => (
                <button
                  key={l}
                  type="button"
                  onClick={() => { setLocale(l); setMenuOpen(false) }}
                  className={locale === l ? 'nav-drawer-lang-btn nav-drawer-lang-btn--active' : 'nav-drawer-lang-btn'}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  )
}
