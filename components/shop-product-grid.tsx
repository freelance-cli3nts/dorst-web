"use client"

import { useState } from "react"
import { Beer } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Minus, Plus, ShoppingCart } from "lucide-react"

interface ShopProductGridProps {
  beers: Beer[]
}

interface CartItem {
  beerId: string
  quantity: number
}

export function ShopProductGrid({ beers }: ShopProductGridProps) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(beers.map((b) => [b.id, 1]))
  )

  const updateQuantity = (beerId: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [beerId]: Math.max(1, Math.min(24, prev[beerId] + delta)),
    }))
  }

  const addToCart = (beer: Beer) => {
    const quantity = quantities[beer.id]
    setCart((prev) => {
      const existing = prev.find((item) => item.beerId === beer.id)
      if (existing) {
        return prev.map((item) =>
          item.beerId === beer.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { beerId: beer.id, quantity }]
    })
    // Reset quantity to 1 after adding
    setQuantities((prev) => ({ ...prev, [beer.id]: 1 }))
  }

  const cartTotal = cart.reduce((total, item) => {
    const beer = beers.find((b) => b.id === item.beerId)
    return total + (beer?.price || 0) * item.quantity
  }, 0)

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <div>
      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="sticky top-20 z-40 mb-8 rounded-xl bg-card border border-border p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-medium">{cartItemCount} items in cart</p>
                <p className="text-sm text-muted-foreground">
                  Total: <span className="font-bold text-foreground">${cartTotal.toFixed(2)}</span>
                </p>
              </div>
            </div>
            <Button>Checkout</Button>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {beers.map((beer) => (
          <article
            key={beer.id}
            className="group flex flex-col rounded-2xl overflow-hidden bg-card border border-border hover:border-accent/50 transition-colors"
          >
            {/* Product Image */}
            <div
              className="relative aspect-square overflow-hidden"
              style={{ backgroundColor: beer.accentColor + "15" }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="w-28 h-40 rounded-lg flex items-center justify-center text-card font-bold text-xs"
                  style={{ backgroundColor: beer.accentColor }}
                >
                  {beer.name}
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-card/90 backdrop-blur-sm">
                  {beer.abv}% ABV
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col flex-1 p-5">
              <div className="flex-1">
                <p className="text-xs font-medium uppercase tracking-wider text-accent">
                  {beer.style}
                </p>
                <h3 className="font-serif text-xl font-bold mt-1">{beer.name}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {beer.description}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold">${beer.price.toFixed(2)}</span>
                  <span className="text-sm text-muted-foreground">per bottle</span>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm text-muted-foreground">Qty:</span>
                  <div className="flex items-center gap-2 rounded-lg border border-border">
                    <button
                      onClick={() => updateQuantity(beer.id, -1)}
                      className="p-2 hover:bg-muted transition-colors rounded-l-lg"
                      disabled={quantities[beer.id] <= 1}
                    >
                      <Minus className="w-4 h-4" />
                      <span className="sr-only">Decrease quantity</span>
                    </button>
                    <span className="w-8 text-center font-medium">
                      {quantities[beer.id]}
                    </span>
                    <button
                      onClick={() => updateQuantity(beer.id, 1)}
                      className="p-2 hover:bg-muted transition-colors rounded-r-lg"
                      disabled={quantities[beer.id] >= 24}
                    >
                      <Plus className="w-4 h-4" />
                      <span className="sr-only">Increase quantity</span>
                    </button>
                  </div>
                </div>

                <Button
                  onClick={() => addToCart(beer)}
                  className="w-full"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Packs Section */}
      <div className="mt-16">
        <h2 className="font-serif text-3xl font-bold mb-6">Value Packs</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Variety Pack */}
          <div className="rounded-2xl overflow-hidden bg-accent/10 p-6 lg:p-8">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-accent/20 text-accent mb-4">
              Best Value
            </span>
            <h3 className="font-serif text-2xl font-bold">The Variety Pack</h3>
            <p className="text-muted-foreground mt-2">
              One of each beer - the perfect way to discover your favorite Dorst brew.
            </p>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold">$26.00</span>
              <span className="text-sm text-muted-foreground line-through">$28.00</span>
            </div>
            <Button className="mt-4 w-full">Add Variety Pack</Button>
          </div>

          {/* Party Pack */}
          <div className="rounded-2xl overflow-hidden bg-muted p-6 lg:p-8">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-4">
              Party Ready
            </span>
            <h3 className="font-serif text-2xl font-bold">The Party Pack</h3>
            <p className="text-muted-foreground mt-2">
              24 bottles of your choice - perfect for gatherings and events.
            </p>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold">$96.00</span>
              <span className="text-sm text-muted-foreground line-through">$108.00</span>
            </div>
            <Button variant="outline" className="mt-4 w-full">Build Your Pack</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
