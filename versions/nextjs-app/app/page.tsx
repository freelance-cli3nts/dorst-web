import { Hero } from "@/components/hero"
import { BeerCarousel } from "@/components/beer-carousel"
import { StatsBar } from "@/components/stats-bar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MapPin, ShoppingBag } from "lucide-react"

export default function Home() {
  return (
    <>
      <Hero />
      <BeerCarousel />
      <StatsBar />
      
      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Find Us Card */}
            <div className="relative overflow-hidden rounded-2xl bg-primary p-8 lg:p-12">
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-foreground/10 mb-6">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-primary-foreground">
                  Find Dorst Near You
                </h3>
                <p className="mt-4 text-primary-foreground/70 max-w-md">
                  Our beers are available at bars, restaurants, and shops across Bulgaria. Discover your nearest location.
                </p>
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="mt-6"
                >
                  <Link href="/locations">View Locations</Link>
                </Button>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10">
                <MapPin className="w-48 h-48" />
              </div>
            </div>

            {/* Shop Card */}
            <div className="relative overflow-hidden rounded-2xl bg-accent/10 p-8 lg:p-12">
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 mb-6">
                  <ShoppingBag className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-serif text-3xl font-bold">
                  Order Online
                </h3>
                <p className="mt-4 text-muted-foreground max-w-md">
                  Get fresh Dorst beer delivered straight to your door. Perfect for parties, gifts, or stocking your fridge.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="mt-6"
                >
                  <Link href="/shop">Shop Now</Link>
                </Button>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10">
                <ShoppingBag className="w-48 h-48" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
              Stay in the Loop
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Be the first to know about new releases, events, and exclusive offers.
            </p>
            <form className="mt-8 flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button type="submit" size="lg">
                Subscribe
              </Button>
            </form>
            <p className="mt-4 text-xs text-muted-foreground">
              By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
