import Image from 'next/image'
import { assetPath } from '@/lib/asset-path'

interface DorstLogoProps {
  height?: number
  variant?: 'default' | 'inverted'
  style?: React.CSSProperties
}

export function DorstLogo({ height = 36, variant = 'default', style }: DorstLogoProps) {
  return (
    <Image
      src={assetPath('/brand/dorst-logo.png')}
      alt="Dorst"
      width={Math.round(height * 2.8)}
      height={height}
      style={{
        height,
        width: 'auto',
        objectFit: 'contain',
        filter: variant === 'inverted' ? 'brightness(0) invert(1)' : undefined,
        ...style,
      }}
      priority
    />
  )
}
