import Link from "next/link"
import { Instagram, Facebook } from "lucide-react"

const navigation = {
  main: [
    { name: "Beers", href: "/beers" },
    { name: "Shop", href: "/shop" },
    { name: "Locations", href: "/locations" },
    { name: "About", href: "/about" },
  ],
  social: [
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "Facebook", href: "#", icon: Facebook },
  ],
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
          <div className="flex flex-col items-center lg:items-start gap-4">
            <Link href="/" className="font-serif text-2xl font-bold tracking-tight">
              DORST
            </Link>
            <p className="text-sm text-primary-foreground/70 max-w-xs text-center lg:text-left">
              Craft beer brewed with passion in Bulgaria. Every sip tells a story.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {navigation.main.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm leading-6 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex gap-6">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/10 pt-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-xs leading-5 text-primary-foreground/50">
              &copy; {new Date().getFullYear()} Dorst Brewery. All rights reserved.
            </p>
            <p className="text-xs leading-5 text-primary-foreground/50">
              Drink responsibly. Must be 18+ to purchase.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
