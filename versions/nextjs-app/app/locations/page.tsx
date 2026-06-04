import { locations, beers } from "@/lib/data"
import { Metadata } from "next"
import { MapPin, Beer, Store } from "lucide-react"

export const metadata: Metadata = {
  title: "Locations | Dorst Brewery",
  description: "Find Dorst craft beer near you. Discover bars, restaurants, and shops serving our beers across Bulgaria.",
}

const typeIcons = {
  bar: Beer,
  restaurant: Store,
  shop: MapPin,
}

const typeLabels = {
  bar: "Bar",
  restaurant: "Restaurant",
  shop: "Shop",
}

export default function LocationsPage() {
  const cities = [...new Set(locations.map((l) => l.city))]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <span className="text-sm font-medium tracking-widest uppercase text-accent mb-4">
              Find Us
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Locations
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl text-pretty">
              From cozy bars to fine restaurants, discover where you can enjoy Dorst beers across Bulgaria.
            </p>
          </div>

          {/* City Filter */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <button className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium">
              All Cities
            </button>
            {cities.map((city) => (
              <button
                key={city}
                className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium hover:border-accent/50 transition-colors"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="relative h-[400px] bg-secondary">
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Interactive Map</p>
            <p className="text-sm">Map integration coming soon</p>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => {
              const Icon = typeIcons[location.type]
              const availableBeers = beers.filter((b) =>
                location.beersAvailable.includes(b.id)
              )

              return (
                <article
                  key={location.id}
                  className="group flex flex-col rounded-2xl overflow-hidden bg-card border border-border hover:border-accent/50 transition-colors"
                >
                  {/* Location Image Placeholder */}
                  <div className="relative aspect-[16/10] bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50">
                      <span className="text-sm">Location Image</span>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-card/90 backdrop-blur-sm">
                        <Icon className="w-3 h-3" />
                        {typeLabels[location.type]}
                      </span>
                    </div>
                  </div>

                  {/* Location Info */}
                  <div className="flex flex-col flex-1 p-5">
                    <h3 className="font-serif text-xl font-bold">{location.name}</h3>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{location.address}, {location.city}</span>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                        Available Beers
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {availableBeers.map((beer) => (
                          <span
                            key={beer.id}
                            className="inline-block px-2 py-1 text-xs rounded-md"
                            style={{
                              backgroundColor: beer.accentColor + "15",
                              color: beer.accentColor,
                            }}
                          >
                            {beer.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <a
                      href="#"
                      className="mt-4 text-sm font-medium text-accent hover:underline"
                    >
                      Get Directions
                    </a>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">
              Want to Serve Dorst?
            </h2>
            <p className="mt-4 text-primary-foreground/70 max-w-xl">
              We&apos;re always looking for new partners who share our passion for quality craft beer. Get in touch to become a Dorst location.
            </p>
            <a
              href="mailto:partners@dorstbrewery.com"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary-foreground text-primary px-6 py-3 text-sm font-medium hover:bg-primary-foreground/90 transition-colors"
            >
              Become a Partner
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
