import type { Metadata } from 'next'
import { BeersPageClient } from './BeersPageClient'

export const metadata: Metadata = {
  title: 'Our Beers — Dorst Brewery',
  description: 'Explore the full Dorst beer lineup. 10 styles from NEIPA to Imperial Stout, brewed in Bankya, Bulgaria.',
}

export default function BeersPage() {
  return <BeersPageClient />
}
