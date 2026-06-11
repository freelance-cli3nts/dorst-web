import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AgeGate } from '@/components/age-gate/AgeGate'

export default async function AgeGatePage() {
  const cookieStore = await cookies()
  const verified = cookieStore.get('dorst-age-verified')

  if (verified?.value === '1') {
    redirect('/')
  }

  return <AgeGate />
}
