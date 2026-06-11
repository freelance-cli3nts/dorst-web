'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { WhaleSVG } from '@/components/whale/WhaleSVG'
import { useCart } from '@/contexts/CartContext'
import { useLocale } from '@/components/LocaleProvider'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const t = useTranslations('Nav')
  const { totalItems } = useCart()
  const { locale, setLocale } = useLocale()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '/beers', label: t('beers') },
    { href: '/locations', label: t('locations') },
    { href: '/about', label: t('about') },
  ]

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 48px',
        zIndex: 100,
        transition: 'background 0.3s, box-shadow 0.3s',
        background: scrolled ? 'rgba(244,239,229,0.96)' : 'transparent',
        boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.08)' : 'none',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          textDecoration: 'none',
          color: 'var(--ink)',
        }}
      >
        <WhaleSVG size="nav" />
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: '-0.5px',
          }}
        >
          DORST
        </span>
      </Link>

      {/* Desktop nav links */}
      <ul
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 36,
          listStyle: 'none',
        }}
        className="hidden md:flex"
      >
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              style={{
                textDecoration: 'none',
                color: 'var(--ink)',
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: '0.02em',
                opacity: 0.75,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.75')}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right: lang toggle + CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }} className="hidden md:flex">
        {/* Language toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 12, fontWeight: 600, letterSpacing: '0.1em' }}>
          {(['bg', 'en'] as const).map(l => (
            <button
              key={l}
              onClick={() => setLocale(l)}
              style={{
                padding: '4px 8px',
                cursor: 'pointer',
                borderRadius: 4,
                border: 'none',
                background: locale === l ? 'var(--ink)' : 'transparent',
                color: locale === l ? 'var(--foam)' : 'var(--ink)',
                opacity: locale === l ? 1 : 0.4,
                transition: 'opacity 0.2s, background 0.2s',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: '0.1em',
              }}
              onMouseEnter={e => { if (locale !== l) e.currentTarget.style.opacity = '1' }}
              onMouseLeave={e => { if (locale !== l) e.currentTarget.style.opacity = '0.4' }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Shop CTA with cart badge */}
        <Link
          href="/shop"
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'var(--ink)',
            color: 'var(--foam)',
            border: '2px solid var(--ink)',
            padding: '9px 20px',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.05em',
            borderRadius: 'var(--radius-pill)',
            textDecoration: 'none',
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--foam)'
            e.currentTarget.style.color = 'var(--ink)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'var(--ink)'
            e.currentTarget.style.color = 'var(--foam)'
          }}
        >
          {t('shop')}
          {totalItems > 0 && (
            <span
              style={{
                position: 'absolute',
                top: -6,
                right: -6,
                background: 'var(--sun)',
                color: 'var(--ink)',
                fontSize: 10,
                fontWeight: 800,
                borderRadius: '50%',
                width: 18,
                height: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1,
              }}
            >
              {totalItems > 99 ? '99+' : totalItems}
            </span>
          )}
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 8,
          color: 'var(--ink)',
        }}
        aria-label="Toggle menu"
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

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 72,
            left: 0,
            right: 0,
            background: 'var(--foam)',
            borderBottom: '1px solid var(--line)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            zIndex: 99,
          }}
          className="md:hidden"
        >
          {[...navLinks, { href: '/shop', label: `${t('shop')}${totalItems > 0 ? ` (${totalItems})` : ''}` }].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                textDecoration: 'none',
                color: 'var(--ink)',
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              {label}
            </Link>
          ))}

          {/* Mobile lang toggle */}
          <div style={{ display: 'flex', gap: 8, paddingTop: 8, borderTop: '1px solid var(--line)' }}>
            {(['bg', 'en'] as const).map(l => (
              <button
                key={l}
                onClick={() => { setLocale(l); setMenuOpen(false) }}
                style={{
                  padding: '6px 14px',
                  borderRadius: 4,
                  border: '1.5px solid var(--line)',
                  background: locale === l ? 'var(--ink)' : 'transparent',
                  color: locale === l ? 'var(--foam)' : 'var(--ink)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
