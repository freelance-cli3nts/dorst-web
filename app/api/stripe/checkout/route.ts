import { NextResponse } from 'next/server'

interface LineItem {
  id: string
  qty: number
}

// Stripe Checkout session stub — v1 architecture only, no live keys.
// In production: create session via stripe.checkout.sessions.create()
// and return the session URL for client-side redirect.
export async function POST(request: Request) {
  const body = await request.json() as { items: LineItem[]; returnUrl?: string }

  if (!body.items?.length) {
    return NextResponse.json({ error: 'No items in order' }, { status: 400 })
  }

  // Stub response — replace with real Stripe call when keys are available
  const stubSessionId = `cs_stub_${Date.now()}`
  const stubUrl = `/shop/success?session_id=${stubSessionId}`

  return NextResponse.json({
    sessionId: stubSessionId,
    url: stubUrl,
    stub: true,
  })
}
