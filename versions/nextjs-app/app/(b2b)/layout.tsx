import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dorst Partner Portal',
  description: 'B2B ordering portal for verified Dorst trade partners.',
  robots: { index: false, follow: false },
}

// B2B portal has its own layout — no main site nav/footer
export default function B2BLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
