'use client'

import Link from 'next/link'
import { WhaleSVG } from '@/components/whale/WhaleSVG'

export function Footer() {
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <WhaleSVG size="nav" fill="white" />
            <span style={{ fontSize: 20, fontWeight: 900, color: 'white' }}>DORST</span>
          </div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, fontWeight: 300, maxWidth: 240 }}>
            Drink well, drink whale.<br />
            Brewed with thirst in Bankya, Bulgaria.
          </p>
        </div>

        {/* Beers */}
        <div>
          <h4 style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>
            Beers
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['Lion Heart', 'Hippy Shake', 'Alexis', 'Alma', 'Pulpa Fiction', 'Full Breakfast Stout'].map(name => (
              <li key={name}>
                <Link
                  href={`/beers/${name.toLowerCase().replace(/ /g, '-')}`}
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
            Company
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { href: '/about', label: 'About' },
              { href: '/locations', label: 'Locations' },
              { href: 'https://partners.dorst.bg', label: 'Partner Portal' },
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
            Legal
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['Privacy Policy', 'Terms of Sale', 'Cookie Policy'].map(label => (
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
        <span>© 2026 Dorst Brewery. All rights reserved.</span>
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
