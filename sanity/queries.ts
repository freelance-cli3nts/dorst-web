import { getSanity } from './client'
import { beers as staticBeers, venues as staticVenues } from '@/lib/data'
import type { Beer, Venue } from '@/lib/data'

// ── GROQ queries ─────────────────────────────────────────────────────────────

export const BEERS_QUERY = `
  *[_type == "beer" && active == true] | order(name asc) {
    "id":          id.current,
    "slug":        id.current,
    name, nameBg,
    style, styleBg,
    abv, ibu, plato,
    ml, serveTemp, glass, hops, color,
    accentHex, contrastHex, displayFont,
    taglineEn, taglineBg,
    storyEn,   storyBg,
    pairingEn, pairingBg,
    format, kegSizes,
    seasonal, active, hasLabel,
    tags, priceB2C,
    "labelImage": labelImage.asset->url
  }
`

export const BEER_BY_SLUG_QUERY = `
  *[_type == "beer" && id.current == $slug][0] {
    "id":          id.current,
    "slug":        id.current,
    name, nameBg,
    style, styleBg,
    abv, ibu, plato,
    ml, serveTemp, glass, hops, color,
    accentHex, contrastHex, displayFont,
    taglineEn, taglineBg,
    storyEn,   storyBg,
    pairingEn, pairingBg,
    format, kegSizes,
    seasonal, active, hasLabel,
    tags, priceB2C,
    "labelImage": labelImage.asset->url
  }
`

export const VENUES_QUERY = `
  *[_type == "venue" && active == true] | order(name asc) {
    "id":  id.current,
    name, type, city,
    descriptionEn, descriptionBg,
    address, googleMapsUrl, instagramUrl,
    active,
    "photo": photo.asset->url
  }
`

export const TEAM_QUERY = `
  *[_type == "teamMember"] | order(order asc) {
    name, role, roleBg,
    bioEn, bioBg,
    "photo": photo.asset->url
  }
`

export const ABOUT_QUERY = `
  *[_type == "aboutPage"][0] {
    headlineEn, headlineBg,
    subheadEn,  subheadBg,
    bodyEn, bodyBg,
    milestones,
    "heroImage":      heroImage.asset->url,
    "breweryImages":  breweryImages[].asset->url
  }
`

// ── Data-fetching functions with static fallback ──────────────────────────────

export async function fetchBeers(): Promise<Beer[]> {
  const sanity = getSanity()
  if (!sanity) return staticBeers
  try {
    return await sanity.fetch<Beer[]>(BEERS_QUERY)
  } catch {
    return staticBeers
  }
}

export async function fetchBeerBySlug(slug: string): Promise<Beer | undefined> {
  const sanity = getSanity()
  if (!sanity) return staticBeers.find(b => b.slug === slug)
  try {
    const result = await sanity.fetch<Beer | null>(BEER_BY_SLUG_QUERY, { slug })
    return result ?? undefined
  } catch {
    return staticBeers.find(b => b.slug === slug)
  }
}

export async function fetchVenues(): Promise<Venue[]> {
  const sanity = getSanity()
  if (!sanity) return staticVenues
  try {
    return await sanity.fetch<Venue[]>(VENUES_QUERY)
  } catch {
    return staticVenues
  }
}
