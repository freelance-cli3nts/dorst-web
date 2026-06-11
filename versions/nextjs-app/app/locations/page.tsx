import type { Metadata } from 'next'
import { venues } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Locations — Dorst Brewery',
  description: 'Find Dorst at 7 venues across Sofia — bars and bottle shops that care about what they pour.',
}

export default function LocationsPage() {
  const activeVenues = venues.filter(v => v.active)
  const bars = activeVenues.filter(v => v.type === 'bar')
  const shops = activeVenues.filter(v => v.type === 'bottle_shop')

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Header */}
      <section style={{ padding: '60px 48px 40px', borderBottom: '1px solid var(--line)' }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 16 }}>
          Find Dorst
        </p>
        <h1
          style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            marginBottom: 20,
          }}
        >
          {activeVenues.length} venues<br />across Sofia
        </h1>
        <p style={{ fontSize: 17, fontWeight: 300, color: 'var(--ink-soft)', lineHeight: 1.6, maxWidth: 480 }}>
          Each venue is handpicked — they care about what they pour. Find us on tap and on the shelf.
        </p>
      </section>

      {/* Bars */}
      <section style={{ padding: '60px 48px 0' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
          Bars
          <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {bars.map(venue => (
            <VenueRow key={venue.id} venue={venue} />
          ))}
        </div>
      </section>

      {/* Bottle shops */}
      {shops.length > 0 && (
        <section style={{ padding: '48px 48px 0' }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
            Bottle Shops
            <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {shops.map(venue => (
              <VenueRow key={venue.id} venue={venue} />
            ))}
          </div>
        </section>
      )}

      {/* Note */}
      <div style={{ padding: '60px 48px 80px' }}>
        <div
          style={{
            background: 'var(--paper)',
            border: '1px solid var(--line)',
            borderRadius: 2,
            padding: '24px 28px',
            maxWidth: 560,
            fontSize: 14,
            color: 'var(--ink-soft)',
            lineHeight: 1.65,
          }}
        >
          <strong style={{ color: 'var(--ink)', fontWeight: 700 }}>Want to stock Dorst?</strong>{' '}
          If you run a bar, restaurant, or bottle shop and want to add us to your lineup,{' '}
          <a href="mailto:sales@dorst.bg" style={{ color: 'var(--ink)', fontWeight: 600, textDecoration: 'underline' }}>
            email sales@dorst.bg
          </a>{' '}
          or visit our{' '}
          <a href="https://partners.dorst.bg" style={{ color: 'var(--ink)', fontWeight: 600, textDecoration: 'underline' }}>
            partner portal
          </a>.
        </div>
      </div>

      <style>{`
        .venue-row { transition: padding-left 0.2s; }
        .venue-row:hover { padding-left: 8px !important; }
        @media (max-width: 768px) {
          section, div[style*="padding: '60px 48px"] { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </div>
  )
}

function VenueRow({ venue }: { venue: (typeof venues)[0] }) {
  const typeLabel = venue.type === 'bottle_shop' ? 'Bottle Shop' : venue.type === 'bar' ? 'Bar' : 'Restaurant'

  return (
    <a
      href={venue.googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 0',
        borderBottom: '1px solid var(--line)',
        textDecoration: 'none',
        color: 'var(--ink)',
        transition: 'padding-left 0.2s',
        gap: 16,
      }}
      className="venue-row"
    >
      <div>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{venue.name}</div>
        <div style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{venue.descriptionEn}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ink-soft)',
            background: 'rgba(14,14,16,0.06)',
            padding: '4px 10px',
            borderRadius: 100,
          }}
        >
          {typeLabel}
        </span>
        <span style={{ opacity: 0.3, fontSize: 16 }}>→</span>
      </div>
    </a>
  )
}
