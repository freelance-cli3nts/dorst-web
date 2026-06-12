import type { Beer, Venue } from '@/lib/data'
import type { Locale } from '@/components/LocaleProvider'

export function pickBeerText(beer: Beer, locale: Locale) {
  const bg = locale === 'bg'
  return {
    name: bg ? beer.nameBg : beer.name,
    style: bg ? beer.styleBg : beer.style,
    tagline: bg ? beer.taglineBg : beer.taglineEn,
    story: bg ? beer.storyBg : beer.storyEn,
    pairing: bg ? beer.pairingBg : beer.pairingEn,
  }
}

export function pickVenueText(venue: Venue, locale: Locale) {
  return locale === 'bg' ? venue.descriptionBg : venue.descriptionEn
}
