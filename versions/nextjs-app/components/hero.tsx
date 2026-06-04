import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />
      
      {/* Decorative whale silhouette */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5">
        <svg
          viewBox="0 0 400 200"
          className="w-[600px] h-[300px] lg:w-[800px] lg:h-[400px]"
          fill="currentColor"
        >
          <ellipse cx="150" cy="100" rx="120" ry="60" />
          <ellipse cx="280" cy="90" rx="40" ry="25" />
          <path d="M320 90 Q380 60 360 120 Q340 100 320 90" />
          <ellipse cx="50" cy="70" rx="30" ry="20" transform="rotate(-20 50 70)" />
          <ellipse cx="50" cy="130" rx="30" ry="20" transform="rotate(20 50 130)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-32 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="text-sm font-medium tracking-widest uppercase text-accent mb-6">
            Craft Brewery
          </span>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight max-w-4xl text-balance">
            Brewed with Passion, Served with Pride
          </h1>
          
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty">
            From the heart of Bulgaria, we craft exceptional beers that honor tradition while embracing innovation. Every sip tells our story.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="px-8">
              <Link href="/shop">Shop Our Beers</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8">
              <Link href="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-border" />
        </div>
      </div>
    </section>
  )
}
