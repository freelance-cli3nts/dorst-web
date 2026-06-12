import Image from 'next/image'
import type { Beer } from '@/lib/data'
import { assetPath } from '@/lib/asset-path'

interface BeerLabelProps {
  beer: Pick<Beer, 'name' | 'accentHex' | 'contrastHex' | 'labelSrc' | 'labelType' | 'hasLabel'>
  size?: 'sm' | 'md' | 'lg' | 'hero'
  variant?: 'overlay' | 'card'
  nameOverride?: string
  style?: React.CSSProperties
}

const SIZES = {
  sm: { width: 60, height: 108, fontSize: 8 },
  md: { width: 72, height: 128, fontSize: 9 },
  lg: { width: 120, height: 220, fontSize: 11 },
  hero: { width: 160, height: 280, fontSize: 12 },
} as const

export function BeerLabel({ beer, size = 'md', variant = 'overlay', nameOverride, style }: BeerLabelProps) {
  const dims = SIZES[size]
  const displayName = nameOverride ?? beer.name
  const isCard = variant === 'card'

  if (beer.labelSrc && beer.labelType === 'image') {
    return (
      <div
        style={{
          width: dims.width,
          height: dims.height,
          position: 'relative',
          flexShrink: 0,
          background: isCard ? beer.accentHex : undefined,
          borderRadius: isCard ? 4 : undefined,
          ...style,
        }}
      >
        <Image
          src={assetPath(beer.labelSrc)}
          alt={`${displayName} label`}
          fill
          style={{ objectFit: 'contain' }}
          sizes={`${dims.width}px`}
        />
      </div>
    )
  }

  return (
    <div
      style={{
        width: dims.width,
        height: dims.height,
        borderRadius: size === 'hero' ? 12 : size === 'lg' ? 12 : 8,
        background: isCard ? beer.accentHex : 'rgba(255,255,255,0.15)',
        border: isCard ? '4px solid var(--ink)' : '1px solid rgba(255,255,255,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: size === 'hero' ? '0 24px 48px rgba(0,0,0,0.15)' : undefined,
        ...style,
      }}
    >
      <span
        style={{
          fontSize: dims.fontSize,
          fontWeight: 700,
          color: isCard ? 'rgba(255,255,255,0.9)' : (beer.contrastHex ?? 'white'),
          textAlign: 'center',
          padding: 4,
          letterSpacing: '0.05em',
          opacity: 0.85,
          fontStyle: size === 'lg' || size === 'hero' ? 'italic' : undefined,
        }}
      >
        {displayName.toUpperCase()}
      </span>
    </div>
  )
}
