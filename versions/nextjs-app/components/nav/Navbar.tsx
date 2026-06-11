'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { WhaleSVG } from '@/components/whale/WhaleSVG'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
        {[
          { href: '/beers', label: 'Beers' },
          { href: '/locations', label: 'Locations' },
          { href: '/about', label: 'About' },
        ].map(({ href, label }) => (
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 12, fontWeight: 600, letterSpacing: '0.1em' }}>
          <span
            style={{
              padding: '4px 8px',
              cursor: 'pointer',
              borderRadius: 4,
              background: 'var(--ink)',
              color: 'var(--foam)',
            }}
          >
            EN
          </span>
          <span
            style={{
              padding: '4px 8px',
              cursor: 'pointer',
              opacity: 0.4,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.4')}
          >
            BG
          </span>
        </div>

        <Link
          href="/shop"
          style={{
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
          Shop Cans ↗
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
          {[
            { href: '/beers', label: 'Beers' },
            { href: '/locations', label: 'Locations' },
            { href: '/about', label: 'About' },
            { href: '/shop', label: 'Shop Cans ↗' },
          ].map(({ href, label }) => (
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
        </div>
      )}
    </nav>
  )
}
