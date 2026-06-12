import type { Metadata } from 'next'
import { UnderageClient } from './UnderageClient'

export const metadata: Metadata = {
  title: 'Come Back Later — Dorst',
  robots: { index: false, follow: false },
}

export default function UnderagePage() {
  return <UnderageClient />
}
