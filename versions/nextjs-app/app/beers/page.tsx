import { beers } from "@/lib/data"
import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Our Beers | Dorst Brewery",
  description: "Explore our full lineup of craft beers. From refreshing lagers to bold IPAs, each beer is crafted with passion.",
}

export default function BeersPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <span className="text-sm font-medium tracking-widest uppercase text-accent mb-4">
              Our Collection
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              The Beers
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl text-pretty">
              Six unique beers, each with its own character. Crafted in Bulgaria with the finest ingredients and a whole lot of love.
            </p>
          </div>
        </div>
      </section>

      {/* Beer Grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {beers.map((beer) => (
              <article
                key={beer.id}
                id={beer.id}
                className="group relative flex flex-col rounded-2xl overflow-hidden bg-card border border-border hover:border-accent/50 transition-colors scroll-mt-24"
              >
                {/* Beer Image Placeholder */}
                <div
                  className="relative aspect-[4/5] overflow-hidden"
                  style={{ backgroundColor: beer.accentColor + "15" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                      className="w-36 h-52 rounded-lg flex items-center justify-center text-card font-bold text-sm"
                      style={{ backgroundColor: beer.accentColor }}
                    >
                      {beer.name}
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span
                      className="inline-block px-3 py-1 text-xs font-medium rounded-full"
                      style={{ 
                        backgroundColor: beer.accentColor + "20",
                        color: beer.accentColor 
                      }}
                    >
                      {beer.style}
                    </span>
                  </div>
                </div>

                {/* Beer Info */}
                <div className="flex flex-col flex-1 p-6">
                  <h2 className="font-serif text-2xl font-bold">{beer.name}</h2>
                  <p className="text-sm text-accent font-medium mt-1">{beer.tagline}</p>
                  <p className="mt-4 text-muted-foreground text-sm flex-1">
                    {beer.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>{beer.abv}% ABV</span>
                      <span>{beer.ibu} IBU</span>
                    </div>
                    <span className="font-bold">${beer.price.toFixed(2)}</span>
                  </div>

                  <Button asChild className="mt-4 w-full">
                    <Link href={`/shop?beer=${beer.id}`}>Add to Cart</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Brewing Process Section */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-sm font-medium tracking-widest uppercase text-primary-foreground/70 mb-4 block">
                Our Process
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
                Crafted with Care
              </h2>
              <p className="mt-6 text-lg text-primary-foreground/80">
                Every Dorst beer follows a meticulous brewing process honed over years of experimentation. We source the finest ingredients, control every variable, and never rush perfection.
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center text-sm font-bold">1</span>
                  <div>
                    <h3 className="font-medium">Select Ingredients</h3>
                    <p className="text-sm text-primary-foreground/70">Premium malts, fresh hops, and pure Bulgarian spring water.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center text-sm font-bold">2</span>
                  <div>
                    <h3 className="font-medium">Slow Fermentation</h3>
                    <p className="text-sm text-primary-foreground/70">We let time do its work, never rushing the fermentation process.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center text-sm font-bold">3</span>
                  <div>
                    <h3 className="font-medium">Quality Control</h3>
                    <p className="text-sm text-primary-foreground/70">Every batch is tested and tasted before it leaves our brewery.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-primary-foreground/10">
              <div className="absolute inset-0 flex items-center justify-center text-primary-foreground/20">
                <span className="text-lg font-medium">Brewing Process Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl font-bold tracking-tight">
            Ready to Try Dorst?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Order online for delivery or find us at a location near you.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/shop">Shop Online</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/locations">Find Locations</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
