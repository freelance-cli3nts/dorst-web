import { NextResponse } from 'next/server'

// Stripe webhook stub — v1 architecture only.
// In production: verify signature with stripe.webhooks.constructEvent(),
// then PATCH CRM order via /api/orders/:id on checkout.session.completed.
export async function POST(request: Request) {
  const payload = await request.text()

  // Log for debugging — remove in production
  console.log('[stripe-webhook] received payload length:', payload.length)

  return NextResponse.json({ received: true, stub: true })
}
