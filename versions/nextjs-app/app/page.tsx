'use client'

import Link from 'next/link'
import { beers, venues, stats } from '@/lib/data'
import { WhaleHero } from '@/components/whale/WhaleHero'
import { ScrollReveal } from '@/components/ScrollReveal'

// Core beers shown in the homepage grid (4 cans)
const HOMEPAGE_BEERS = ['lion-heart', 'hippy-shake', 'alexis', 'pulpa-fiction']

export default function HomePage() {
  const homeBeers = beers.filter(b => HOMEPAGE_BEERS.includes(b.id))
  const seasonal = beers.find(b => b.seasonal && b.active) ?? beers[1]
  const activeVenues = venues.filter(v => v.active)

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: '100vh',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          padding: '0 48px',
          position: 'relative',
          overflow: 'hidden',
        }}
        className="hero-section"
      >
        {/* Radial glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(210,200,180,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Left: text */}
        <div style={{ paddingTop: 72, zIndex: 2 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--ink-soft)',
              marginBottom: 24,
              opacity: 0,
              animation: 'fadeUp 0.8s 0.2s forwards',
            }}
          >
            Craft brewery · Bankya, Bulgaria · Est. 2017
          </p>

          <h1
            style={{
              fontSize: 'clamp(56px, 7vw, 96px)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              marginBottom: 28,
              opacity: 0,
              animation: 'fadeUp 0.8s 0.4s forwards',
            }}
          >
            Beer worth<br />
            <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--ink-soft)' }}>thirsting</em><br />
            for
          </h1>

          <p
            style={{
              fontSize: 17,
              fontWeight: 300,
              color: 'var(--ink-soft)',
              lineHeight: 1.6,
              maxWidth: 400,
              marginBottom: 44,
              opacity: 0,
              animation: 'fadeUp 0.8s 0.6s forwards',
            }}
          >
            Dorst /dɔrst/ — thirst in Dutch. We brew the kind of beer we&apos;d genuinely want to drink: bold styles, honest ingredients, no compromise.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 14,
              alignItems: 'center',
              opacity: 0,
              animation: 'fadeUp 0.8s 0.8s forwards',
            }}
          >
            <Link
              href="/shop"
              style={{
                display: 'inline-block',
                background: 'var(--ink)',
                color: 'var(--foam)',
                border: '2px solid var(--ink)',
                padding: '14px 32px',
                fontSize: 15,
                fontWeight: 700,
                borderRadius: 'var(--radius-pill)',
                textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={undefined}
            >
              Shop Cans
            </Link>
            <Link
              href="https://partners.dorst.bg"
              style={{
                display: 'inline-block',
                background: 'transparent',
                color: 'var(--ink)',
                border: '2px solid rgba(14,14,16,0.25)',
                padding: '14px 32px',
                fontSize: 15,
                fontWeight: 700,
                borderRadius: 'var(--radius-pill)',
                textDecoration: 'none',
                transition: 'border-color 0.2s',
              }}
            >
              I&apos;m a Partner →
            </Link>
          </div>
        </div>

        {/* Right: whale */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 72,
            position: 'relative',
            zIndex: 1,
          }}
          className="hidden md:flex"
        >
          <WhaleHero />
        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: 'absolute',
            bottom: 36,
            left: 48,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--ink-soft)',
            opacity: 0,
            animation: 'fadeUp 1s 1.2s forwards',
          }}
        >
          <div className="scroll-line" />
          Scroll to explore
        </div>
      </section>

      {/* ── BEER LINEUP ──────────────────────────────────────── */}
      <section style={{ padding: '100px 48px' }} id="beers">
        <ScrollReveal>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--ink-soft)',
              marginBottom: 48,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            Our Beers
            <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
          </div>
        </ScrollReveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
          }}
          className="beer-grid"
        >
          {homeBeers.map((beer, i) => (
            <ScrollReveal key={beer.id} delay={i + 1}>
              <Link
                href={`/beers/${beer.slug}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  borderRadius: 8,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  aspectRatio: '3/4',
                  textDecoration: 'none',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  border: '4px solid var(--ink)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  background: beer.accentHex,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.boxShadow = '0 24px 48px rgba(0,0,0,0.18)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'
                }}
              >
                {/* Gradient overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(transparent 40%, rgba(0,0,0,0.6))',
                    zIndex: 1,
                  }}
                />

                {/* Can placeholder */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -60%)',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 72,
                      height: 128,
                      borderRadius: 8,
                      background: 'rgba(255,255,255,0.15)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ fontSize: 9, fontWeight: 700, color: 'white', textAlign: 'center', padding: 4, letterSpacing: '0.05em' }}>
                      {beer.name.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    padding: '28px 24px',
                  }}
                >
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>
                    {beer.style}
                  </div>
                  <div style={{ fontSize: 26, fontWeight: 700, color: 'white', lineHeight: 1.1, marginBottom: 4 }}>
                    {beer.name}
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                    {beer.abv}% ABV
                  </div>
                  <span
                    style={{
                      display: 'inline-block',
                      marginTop: 16,
                      background: 'white',
                      color: 'var(--ink)',
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      padding: '8px 16px',
                      borderRadius: 2,
                    }}
                  >
                    View beer →
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <Link
            href="/beers"
            style={{
              display: 'inline-block',
              border: '2px solid var(--ink)',
              color: 'var(--ink)',
              padding: '13px 28px',
              fontSize: 14,
              fontWeight: 700,
              borderRadius: 'var(--radius-pill)',
              textDecoration: 'none',
              transition: 'background 0.2s, color 0.2s',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={undefined}
          >
            All 10 beers →
          </Link>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--aubergine-deep)',
          padding: '80px 48px',
          display: 'grid',
          gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
          position: 'relative',
          overflow: 'hidden',
        }}
        className="stats-grid"
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              textAlign: 'center',
              padding: '20px 40px',
              position: 'relative',
              borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(52px, 6vw, 80px)',
                fontWeight: 900,
                color: 'white',
                lineHeight: 1,
                letterSpacing: '-0.03em',
              }}
            >
              {stat.value}
              {stat.unit && (
                <sup style={{ fontSize: '0.4em', fontWeight: 300, verticalAlign: 'super', opacity: 0.6 }}>
                  {stat.unit}
                </sup>
              )}
            </div>
            <div style={{ fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em', marginTop: 10, textTransform: 'uppercase' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* ── ORIGIN STORY ─────────────────────────────────────── */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '5fr 4fr',
          gap: 80,
          padding: '120px 48px',
          alignItems: 'center',
        }}
        id="about"
        className="story-section"
      >
        <ScrollReveal>
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--ink-soft)',
                marginBottom: 48,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              Our Story
              <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(36px, 4vw, 52px)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: 28,
              }}
            >
              Born from two<br />countries,<br />one thirst
            </h2>

            <p style={{ fontSize: 17, fontWeight: 300, color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: 28 }}>
              Dorst — meaning &ldquo;thirst&rdquo; in Dutch — was founded in 2017 as a collaboration between Dean and Erwin: a Bulgarian and a Dutchman who shared an obsession with craft beer done right. We brew in Bankya with one simple mission: to make the beers we&apos;d genuinely want to drink ourselves.
            </p>
            <p style={{ fontSize: 17, fontWeight: 300, color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: 40 }}>
              No shortcuts. No filler adjuncts. Just honest ingredients, bold recipes, and a whale to watch over it all.
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                paddingTop: 32,
                borderTop: '1px solid var(--line)',
              }}
            >
              <span style={{ fontSize: 28, lineHeight: 1 }}>🇧🇬 🇳🇱</span>
              <div>
                <strong style={{ fontSize: 14, fontWeight: 600 }}>Dean &amp; Erwin</strong><br />
                <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>Co-founders · Bankya Brewery</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <div
            style={{
              borderRadius: 8,
              overflow: 'hidden',
              aspectRatio: '4/5',
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, opacity: 0.3 }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect x="4" y="8" width="40" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
                <circle cx="17" cy="21" r="5" stroke="currentColor" strokeWidth="2" />
                <path d="M 4 36 L 16 26 L 24 33 L 32 24 L 44 36" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              <span style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Brewery photo</span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── SEASONAL SPOTLIGHT ───────────────────────────────── */}
      <ScrollReveal>
        <div
          style={{
            margin: '0 48px',
            borderRadius: 12,
            background: seasonal.accentHex,
            padding: '80px 64px',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
            gap: 60,
            position: 'relative',
            overflow: 'hidden',
          }}
          className="seasonal-card"
        >
          {/* Circle decoration */}
          <div
            style={{
              position: 'absolute',
              right: -60, top: -60,
              width: 300, height: 300,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(0,0,0,0.15)',
                color: 'rgba(0,0,0,0.7)',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '6px 14px',
                borderRadius: 100,
                marginBottom: 20,
              }}
            >
              Summer 2025
            </span>

            <h2
              style={{
                fontSize: 'clamp(36px, 4vw, 54px)',
                fontWeight: 900,
                color: 'var(--ink)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                marginBottom: 16,
              }}
            >
              {seasonal.name} paints<br />in Vienna
            </h2>

            <p
              style={{
                fontSize: 17,
                fontWeight: 300,
                color: 'rgba(0,0,0,0.6)',
                lineHeight: 1.6,
                marginBottom: 36,
                maxWidth: 440,
              }}
            >
              {seasonal.taglineEn} Limited batch — while stocks last.
            </p>

            <Link
              href={`/beers/${seasonal.slug}`}
              style={{
                display: 'inline-block',
                background: 'var(--ink)',
                color: 'white',
                padding: '14px 28px',
                fontSize: 14,
                fontWeight: 700,
                borderRadius: 'var(--radius-pill)',
                textDecoration: 'none',
                transition: 'transform 0.2s',
              }}
            >
              Discover {seasonal.name} →
            </Link>
          </div>

          {/* Can placeholder */}
          <div
            style={{
              width: 120,
              height: 220,
              borderRadius: 12,
              background: 'rgba(255,255,255,0.25)',
              border: '1px solid rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            className="hidden md:flex"
          >
            <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(0,0,0,0.5)', letterSpacing: '0.1em', fontStyle: 'italic' }}>
              {seasonal.name}
            </span>
          </div>
        </div>
      </ScrollReveal>

      {/* ── LOCATIONS TEASER ─────────────────────────────────── */}
      <section
        style={{
          padding: '100px 48px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'center',
        }}
        id="locations"
        className="locations-section"
      >
        <ScrollReveal>
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--ink-soft)',
                marginBottom: 24,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              Find Dorst
              <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
            </div>

            <h2
              style={{
                fontSize: 'clamp(36px, 4vw, 52px)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: 20,
              }}
            >
              Available at<br />{activeVenues.length} venues<br />across Sofia
            </h2>

            <p style={{ fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.65, marginBottom: 36 }}>
              Find us on tap and on the shelf at some of Sofia&apos;s best bars and bottle shops. Each venue is handpicked — they care about what they pour.
            </p>

            <Link
              href="/locations"
              style={{
                display: 'inline-block',
                border: '2px solid var(--ink)',
                color: 'var(--ink)',
                padding: '13px 28px',
                fontSize: 14,
                fontWeight: 700,
                borderRadius: 'var(--radius-pill)',
                textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              See all locations →
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {activeVenues.map(venue => (
              <a
                key={venue.id}
                href={venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '18px 0',
                  borderBottom: '1px solid var(--line)',
                  textDecoration: 'none',
                  color: 'var(--ink)',
                  transition: 'padding-left 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.paddingLeft = '8px')}
                onMouseLeave={e => (e.currentTarget.style.paddingLeft = '0')}
              >
                <span style={{ fontSize: 16, fontWeight: 500 }}>{venue.name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-soft)',
                      background: 'rgba(14,14,16,0.06)',
                      padding: '4px 10px',
                      borderRadius: 100,
                    }}
                  >
                    {venue.type === 'bottle_shop' ? 'Bottle Shop' : venue.type === 'bar' ? 'Bar' : 'Restaurant'}
                  </span>
                  <span style={{ opacity: 0.3, fontSize: 16 }}>→</span>
                </div>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ── B2B STRIP ─────────────────────────────────────────── */}
      <ScrollReveal>
        <div
          style={{
            margin: '0 48px 100px',
            background: 'rgba(14,14,16,0.06)',
            borderRadius: 8,
            padding: '56px 64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 40,
            border: '1px solid var(--line)',
          }}
          className="b2b-strip"
        >
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 10 }}>
              For venues &amp; bottle shops
            </div>
            <h3 style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 12 }}>
              Stock Dorst<br />in your venue
            </h3>
            <p style={{ fontSize: 15, color: 'var(--ink-soft)', fontWeight: 300, maxWidth: 440, lineHeight: 1.6 }}>
              Access our full range of kegs and cans. Self-serve ordering, real-time inventory, and invoicing built in — no back-and-forth required.
            </p>
          </div>

          <Link
            href="https://partners.dorst.bg"
            style={{
              display: 'inline-block',
              flexShrink: 0,
              background: 'var(--ink)',
              color: 'var(--foam)',
              border: '2px solid var(--ink)',
              padding: '14px 28px',
              fontSize: 15,
              fontWeight: 700,
              borderRadius: 'var(--radius-pill)',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            Partner Portal →
          </Link>
        </div>
      </ScrollReveal>

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .hero-section { grid-template-columns: 1fr !important; padding: 0 24px !important; }
          .beer-grid { grid-template-columns: 1fr 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; gap: 0 !important; }
          .story-section { grid-template-columns: 1fr !important; padding: 60px 24px !important; gap: 40px !important; }
          .seasonal-card { margin: 0 24px !important; padding: 48px 32px !important; grid-template-columns: 1fr !important; }
          .locations-section { grid-template-columns: 1fr !important; padding: 60px 24px !important; }
          .b2b-strip { margin: 0 24px 60px !important; flex-direction: column !important; padding: 40px 32px !important; }
        }
        @media (max-width: 600px) {
          .beer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
