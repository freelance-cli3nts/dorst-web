import { teamMembers, stats } from "@/lib/data"
import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About | Dorst Brewery",
  description: "Learn about Dorst Brewery - our story, our team, and our passion for crafting exceptional beer in Bulgaria.",
}

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <span className="text-sm font-medium tracking-widest uppercase text-accent mb-4">
              Our Story
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              About Dorst
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl text-pretty">
              Born from a love of great beer and a dream to create something truly Bulgarian.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
                Where It All Began
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  Dorst started in 2016 as a small homebrewing operation in Sofia. What began as a hobby between friends quickly grew into something more - a shared vision to create world-class craft beer right here in Bulgaria.
                </p>
                <p>
                  The name &quot;Dorst&quot; comes from the Dutch word for thirst, reflecting our international influences and our commitment to quenching the thirst for quality beer in our homeland.
                </p>
                <p>
                  Today, we&apos;re proud to have our beers served in over 50 locations across the country, with a team of dedicated brewers who pour their hearts into every batch.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50">
                <span className="text-lg">Brewery Story Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Whale Section */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1 relative aspect-square rounded-2xl overflow-hidden bg-primary-foreground/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  viewBox="0 0 400 200"
                  className="w-3/4 opacity-20"
                  fill="currentColor"
                >
                  <ellipse cx="150" cy="100" rx="120" ry="60" />
                  <ellipse cx="280" cy="90" rx="40" ry="25" />
                  <path d="M320 90 Q380 60 360 120 Q340 100 320 90" />
                  <ellipse cx="50" cy="70" rx="30" ry="20" transform="rotate(-20 50 70)" />
                  <ellipse cx="50" cy="130" rx="30" ry="20" transform="rotate(20 50 130)" />
                </svg>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
                The Whale
              </h2>
              <div className="mt-6 space-y-4 text-primary-foreground/80">
                <p>
                  Every Dorst bottle features our signature whale - a symbol of depth, wisdom, and the journey we take with every brew.
                </p>
                <p>
                  Like the whale that dives deep to find sustenance, we go deep into our craft, exploring the depths of flavor and technique to bring you something extraordinary.
                </p>
                <p>
                  The whale also represents our commitment to sustainability. We&apos;re dedicated to minimizing our environmental impact and protecting the natural resources that make our brewing possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <dt className="text-sm text-muted-foreground order-2 mt-2">
                  {stat.label}
                </dt>
                <dd className="font-serif text-4xl md:text-5xl font-bold tracking-tight order-1">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
              Meet the Team
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind every Dorst brew.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {teamMembers.map((member) => (
              <article
                key={member.id}
                className="group flex flex-col items-center text-center"
              >
                {/* Team Member Image Placeholder */}
                <div className="relative w-48 h-48 rounded-full overflow-hidden bg-muted mb-6">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50">
                    <span className="text-sm">Photo</span>
                  </div>
                </div>
                <h3 className="font-serif text-xl font-bold">{member.name}</h3>
                <p className="text-sm text-accent font-medium mt-1">{member.role}</p>
                <p className="text-sm text-muted-foreground mt-3 max-w-xs">
                  {member.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
              Our Values
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <span className="font-serif text-2xl font-bold text-accent">Q</span>
              </div>
              <h3 className="font-serif text-xl font-bold">Quality First</h3>
              <p className="text-sm text-muted-foreground mt-2">
                We never compromise on ingredients or process. Every batch is crafted to the highest standards.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <span className="font-serif text-2xl font-bold text-accent">C</span>
              </div>
              <h3 className="font-serif text-xl font-bold">Community</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Beer brings people together. We&apos;re proud to be part of Bulgaria&apos;s growing craft beer community.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <span className="font-serif text-2xl font-bold text-accent">S</span>
              </div>
              <h3 className="font-serif text-xl font-bold">Sustainability</h3>
              <p className="text-sm text-muted-foreground mt-2">
                From water conservation to recyclable packaging, we&apos;re committed to brewing responsibly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl font-bold tracking-tight">
            Join the Journey
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Experience the taste of true craft. Try Dorst today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/shop">Shop Our Beers</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/locations">Find a Location</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
