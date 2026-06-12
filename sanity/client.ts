import { createClient, type SanityClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const apiVersion = '2024-01-01'

// Returns null when SANITY_PROJECT_ID is not configured — callers fall back to static data.
export function getSanityClient(): SanityClient | null {
  if (!projectId) return null
  try {
    return createClient({ projectId, dataset, apiVersion, useCdn: true })
  } catch {
    return null
  }
}

let _sanity: SanityClient | null | undefined

// Lazy singleton — avoids @sanity/client initialisation during static builds.
export function getSanity(): SanityClient | null {
  if (_sanity === undefined) _sanity = getSanityClient()
  return _sanity
}

/** @deprecated Use getSanity() instead */
export const sanity = getSanity()
