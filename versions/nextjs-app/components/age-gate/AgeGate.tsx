'use client'

import { useRouter } from 'next/navigation'
import { WhaleSVG } from '@/components/whale/WhaleSVG'

export function AgeGate() {
  const router = useRouter()

  function handleYes() {
    document.cookie = 'dorst-age-verified=1; max-age=31536000; path=/'
    router.refresh()
  }

  function handleNo() {
    router.push('/age-gate/underage')
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--aubergine-deep)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        textAlign: 'center',
      }}
    >
      {/* Wordmark */}
      <div
        style={{
          fontSize: 28,
          fontWeight: 900,
          color: 'white',
          letterSpacing: '-0.5px',
          marginBottom: 40,
          opacity: 0,
          animation: 'fadeUp 0.8s 0.1s forwards',
        }}
      >
        DORST
      </div>

      {/* Whale */}
      <div
        style={{
          animation: 'whaleFloat 6s ease-in-out infinite',
          marginBottom: 48,
          opacity: 0,
          animationDelay: '0.3s',
          animationFillMode: 'forwards',
        }}
      >
        <WhaleSVG size="gate" fill="rgba(255,255,255,0.9)" />
      </div>

      {/* Headline */}
      <p
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.45)',
          marginBottom: 16,
          opacity: 0,
          animation: 'fadeUp 0.8s 0.5s forwards',
        }}
      >
        Craft Brewery · Bankya, Bulgaria
      </p>
      <h1
        style={{
          fontSize: 'clamp(28px, 5vw, 48px)',
          fontWeight: 700,
          color: 'white',
          lineHeight: 1.2,
          marginBottom: 8,
          opacity: 0,
          animation: 'fadeUp 0.8s 0.6s forwards',
        }}
      >
        How old are you?
      </h1>
      <p
        style={{
          fontSize: 'clamp(18px, 3vw, 24px)',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.5)',
          marginBottom: 48,
          opacity: 0,
          animation: 'fadeUp 0.8s 0.7s forwards',
        }}
      >
        На колко години си?
      </p>

      {/* Buttons */}
      <div
        style={{
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
          justifyContent: 'center',
          opacity: 0,
          animation: 'fadeUp 0.8s 0.9s forwards',
        }}
      >
        <button
          onClick={handleYes}
          style={{
            padding: '14px 36px',
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: '0.05em',
            background: 'var(--sun)',
            color: 'var(--ink)',
            border: '2px solid var(--sun)',
            borderRadius: 'var(--radius-pill)',
            cursor: 'pointer',
            transition: 'background 0.2s, color 0.2s, border-color 0.2s',
            fontFamily: 'var(--font-sans)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = 'var(--sun)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'var(--sun)'
            e.currentTarget.style.color = 'var(--ink)'
          }}
        >
          YES, I&apos;M 18+ · ДА, НАД 18 СЪМ
        </button>

        <button
          onClick={handleNo}
          style={{
            padding: '14px 36px',
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: '0.05em',
            background: 'transparent',
            color: 'rgba(255,255,255,0.7)',
            border: '2px solid rgba(255,255,255,0.3)',
            borderRadius: 'var(--radius-pill)',
            cursor: 'pointer',
            transition: 'border-color 0.2s, color 0.2s',
            fontFamily: 'var(--font-sans)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'
            e.currentTarget.style.color = 'white'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
            e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
          }}
        >
          NOT YET · ОЩЕ НЕ
        </button>
      </div>
    </div>
  )
}
