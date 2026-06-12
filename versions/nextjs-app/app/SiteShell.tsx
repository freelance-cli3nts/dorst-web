'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isB2B = pathname.startsWith('/partners')

  if (isB2B) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
