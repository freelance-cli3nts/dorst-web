import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — Dorst Brewery',
  description: 'The story of Dorst. Founded in 2017 by Dean (Bulgarian) and Erwin (Dutch) in Bankya, Bulgaria.',
}

export default function AboutPage() {
  return (
    <div style={{ paddingTop: 72 }}>
      {/* Origin story */}
      <section
        style={{
          padding: '80px 48px',
          display: 'grid',
          gridTemplateColumns: '5fr 4fr',
          gap: 80,
          alignItems: 'center',
        }}
        className="about-grid"
      >
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 24 }}>
            Our Story
          </p>
          <h1
            style={{
              fontSize: 'clamp(40px, 5vw, 64px)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              marginBottom: 32,
            }}
          >
            Two countries.<br />One thirst.
          </h1>
          <p style={{ fontSize: 17, fontWeight: 300, color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: 24 }}>
            Dorst — meaning &ldquo;thirst&rdquo; in Dutch — was founded in 2017 by Dean (Bulgarian) and Erwin (Dutch). They met studying in Oxford, discovered a shared obsession with craft beer, and decided to build a brewery together.
          </p>
          <p style={{ fontSize: 17, fontWeight: 300, color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: 24 }}>
            The brewery is in Bankya, near Sofia. 4,000+ litres a month. 10 beers in rotation, 20+ styles brewed. Unfiltered, unpasteurised, mostly vegan.
          </p>
          <p style={{ fontSize: 17, fontWeight: 300, color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: 40 }}>
            No shortcuts. No filler adjuncts. No marketing-speak. Just honest ingredients, deliberate recipes, and a whale to watch over it all.
          </p>

          <div style={{ paddingTop: 32, borderTop: '1px solid var(--line)' }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 20 }}>
              The founders
            </p>
            <div style={{ display: 'flex', gap: 40 }}>
              {[
                { name: 'Dean', role: 'Co-Founder', flag: '🇧🇬', note: 'Bulgarian' },
                { name: 'Erwin', role: 'Co-Founder', flag: '🇳🇱', note: 'Dutch' },
              ].map(person => (
                <div key={person.name} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div
                    style={{
                      width: 56, height: 56,
                      borderRadius: '50%',
                      background: 'var(--paper)',
                      border: '1px solid var(--line)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 24,
                    }}
                  >
                    {person.flag}
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>{person.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{person.note} · {person.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Photo placeholder */}
        <div
          style={{
            borderRadius: 8,
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
            <span style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Founder photo</span>
          </div>
        </div>
      </section>

      {/* Brewery section */}
      <section
        style={{
          padding: '80px 48px',
          background: 'var(--aubergine-deep)',
          color: 'white',
          display: 'grid',
          gridTemplateColumns: '4fr 5fr',
          gap: 80,
          alignItems: 'center',
        }}
        className="brewery-grid"
      >
        {/* Photo placeholder */}
        <div
          style={{
            borderRadius: 8,
            aspectRatio: '4/3',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, opacity: 0.2 }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="4" y="8" width="40" height="32" rx="4" stroke="white" strokeWidth="2" />
              <circle cx="17" cy="21" r="5" stroke="white" strokeWidth="2" />
              <path d="M 4 36 L 16 26 L 24 33 L 32 24 L 44 36" stroke="white" strokeWidth="2" fill="none" />
            </svg>
            <span style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'white' }}>Brewery photo</span>
          </div>
        </div>

        <div>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}>
            The Brewery
          </p>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 24, color: 'white' }}>
            Bankya, Bulgaria
          </h2>
          <p style={{ fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: 20 }}>
            We brew in Bankya, a spa town 18km from Sofia. The water is good. The space is ours. The process is open — we don&apos;t hide behind smoke machines or mystique.
          </p>
          <p style={{ fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: 32 }}>
            Every batch is logged, tasted, and adjusted. When a recipe is right, we don&apos;t change it. Hippy Shake hasn&apos;t changed since 2017. There&apos;s been no reason to.
          </p>
          <div style={{ display: 'flex', gap: 32 }}>
            {[
              { num: '4,000', unit: 'L/month', label: 'Capacity' },
              { num: '20+', unit: 'styles', label: 'Ever brewed' },
              { num: '10', unit: 'beers', label: 'In rotation' },
            ].map(({ num, unit, label }) => (
              <div key={label}>
                <div style={{ fontSize: 32, fontWeight: 900, color: 'white', lineHeight: 1, letterSpacing: '-0.02em' }}>
                  {num}<span style={{ fontSize: 14, fontWeight: 300, opacity: 0.5, marginLeft: 4 }}>{unit}</span>
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The whale */}
      <section style={{ padding: '80px 48px' }}>
        <div style={{ maxWidth: 680 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 24 }}>
            The Mascot
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24 }}>
            The whale
          </h2>
          <p style={{ fontSize: 17, fontWeight: 300, color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: 20 }}>
            The whale isn&apos;t a logo. It&apos;s a character. Hand-drawn, it appears on every label in a different scene — breaching, winged, swimming through stars. Same whale, different adventure.
          </p>
          <p style={{ fontSize: 17, fontWeight: 300, color: 'var(--ink-soft)', lineHeight: 1.75 }}>
            &ldquo;Drink well, drink whale!&rdquo; The tagline is ridiculous on purpose. The whale is the brewery&apos;s personality: playful, a little anarchic, entirely itself.
          </p>
        </div>
      </section>

      {/* B2B CTA */}
      <div
        style={{
          margin: '0 48px 80px',
          background: 'rgba(14,14,16,0.06)',
          border: '1px solid var(--line)',
          borderRadius: 2,
          padding: '40px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
        }}
        className="b2b-strip"
      >
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 8 }}>
            For trade
          </div>
          <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 8 }}>Stock Dorst in your venue</h3>
          <p style={{ fontSize: 14, color: 'var(--ink-soft)', fontWeight: 300 }}>Kegs and cans. Self-serve ordering portal at partners.dorst.bg</p>
        </div>
        <Link
          href="https://partners.dorst.bg"
          style={{
            flexShrink: 0,
            display: 'inline-block',
            background: 'var(--ink)',
            color: 'var(--foam)',
            border: '2px solid var(--ink)',
            padding: '12px 24px',
            fontSize: 14,
            fontWeight: 700,
            borderRadius: 'var(--radius-pill)',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Partner Portal →
        </Link>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid, .brewery-grid { grid-template-columns: 1fr !important; padding: 60px 24px !important; gap: 40px !important; }
          .b2b-strip { flex-direction: column !important; margin: 0 24px 60px !important; padding: 32px !important; }
        }
      `}</style>
    </div>
  )
}
