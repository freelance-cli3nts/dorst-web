import type { Metadata } from 'next'
import { AboutPageClient } from './AboutPageClient'

export const metadata: Metadata = {
  title: 'About — Dorst Brewery',
  description: 'The story of Dorst. Founded in 2017 by Dean (Bulgarian) and Erwin (Dutch) in Bankya, Bulgaria.',
}

export default function AboutPage() {
  return <AboutPageClient />
}
