import type { Metadata } from 'next'
import { LocationsPageClient } from './LocationsPageClient'

export const metadata: Metadata = {
  title: 'Locations — Dorst Brewery',
  description: 'Find Dorst at venues across Sofia — bars and bottle shops that care about what they pour.',
}

export default function LocationsPage() {
  return <LocationsPageClient />
}
