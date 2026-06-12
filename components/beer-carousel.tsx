"use client"

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { beers } from "@/lib/data"
import Link from "next/link"

export function BeerCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  )
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section className="py-20 lg:py-28 bg-muted">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-balance">
            Our Beers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Each beer in our lineup tells a story. From crisp lagers to bold IPAs, there&apos;s something for every palate.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {beers.map((beer, index) => (
                <div
                  key={beer.id}
                  className="flex-[0_0_100%] min-w-0 pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <Link href={`/beers#${beer.id}`} className="block group">
                    <div
                      className="relative aspect-[3/4] rounded-lg overflow-hidden bg-card"
                      style={{ backgroundColor: beer.accentColor + "15" }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div 
                          className="w-32 h-48 rounded-lg flex items-center justify-center text-card font-bold text-sm"
                          style={{ backgroundColor: beer.accentColor }}
                        >
                          {beer.name}
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p
                          className="text-xs font-medium uppercase tracking-wider mb-2"
                          style={{ color: beer.accentColor }}
                        >
                          {beer.style}
                        </p>
                        <h3 className="text-xl font-serif font-bold text-white">
                          {beer.name}
                        </h3>
                        <p className="text-sm text-white/80 mt-1">{beer.tagline}</p>
                        <div className="flex gap-4 mt-3 text-xs text-white/70">
                          <span>{beer.abv}% ABV</span>
                          <span>{beer.ibu} IBU</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous beer</span>
            </Button>

            <div className="flex gap-2">
              {beers.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === selectedIndex ? "bg-primary" : "bg-border"
                  }`}
                  onClick={() => emblaApi?.scrollTo(index)}
                >
                  <span className="sr-only">Go to slide {index + 1}</span>
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next beer</span>
            </Button>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <Button asChild size="lg">
            <Link href="/beers">Explore All Beers</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
