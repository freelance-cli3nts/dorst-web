'use client'

import { useTranslations } from 'next-intl'

export function UnderageClient() {
  const t = useTranslations('Underage')

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--aubergine-deep)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 80, marginBottom: 32, animation: 'whaleFloat 3s ease-in-out infinite', lineHeight: 1 }}>
        🐟 🐠 🐡
      </div>

      <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, color: 'white', marginBottom: 16, lineHeight: 1.2 }}>
        {t('heading')}
      </h1>

      <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', fontWeight: 300, maxWidth: 360, lineHeight: 1.6, marginBottom: 48 }}>
        {t('body')}
      </p>

      <div style={{ fontSize: 48, letterSpacing: 16, animation: 'whaleFloat 4s ease-in-out infinite', animationDelay: '0.5s' }}>
        🐟🐠🐡🦈🐙🦑🐚
      </div>

      <p style={{ marginTop: 64, fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
        {t('footer')}
      </p>
    </div>
  )
}
