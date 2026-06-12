import { WhaleSVG } from './WhaleSVG'

interface WhaleHeroProps {
  fill?: string
  className?: string
}

// TODO: whale-jump-animation — defer to dedicated animation session.
// v1 uses a simple floating bob animation defined in globals.css.
export function WhaleHero({ fill = '#0E0E10', className }: WhaleHeroProps) {
  return (
    <div
      className={className}
      style={{
        animation: 'whaleFloat 6s ease-in-out infinite',
        filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.10))',
      }}
    >
      <WhaleSVG size="hero" fill={fill} />
    </div>
  )
}
