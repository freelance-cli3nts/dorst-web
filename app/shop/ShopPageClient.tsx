'use client'

import { useTranslations } from 'next-intl'
import type { Beer } from '@/lib/data'
import { ShopClient } from './ShopClient'

interface Props {
  beers: Beer[]
}

export function ShopPageClient({ beers }: Props) {
  const t = useTranslations('Shop')

  return (
    <div style={{ paddingTop: 72 }}>
      <section className="page-pad" style={{ padding: '60px 48px 40px', borderBottom: '1px solid var(--line)' }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 16 }}>{t('eyebrow')}</p>
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 16 }}>{t('heading')}</h1>
        <p style={{ fontSize: 16, fontWeight: 300, color: 'var(--ink-soft)', lineHeight: 1.6, maxWidth: 480, marginBottom: 24 }}>{t('sub')}</p>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
          <span>{t('legalStrip')}</span>
        </div>
      </section>

      <ShopClient beers={beers} />

    </div>
  )
}
