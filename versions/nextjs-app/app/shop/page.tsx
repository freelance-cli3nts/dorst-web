import { beers } from "@/lib/data"
import { Metadata } from "next"
import { ShopProductGrid } from "@/components/shop-product-grid"
import { Truck, Shield, Package } from "lucide-react"

export const metadata: Metadata = {
  title: "Shop | Dorst Brewery",
  description: "Order fresh Dorst craft beer online. Delivered straight to your door across Bulgaria.",
}

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Free shipping on orders over 50 BGN",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "Safe & encrypted checkout",
  },
  {
    icon: Package,
    title: "Fresh Guarantee",
    description: "Always fresh, or your money back",
  },
]

export default function ShopPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <span className="text-sm font-medium tracking-widest uppercase text-accent mb-4">
              Online Store
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Shop Dorst
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl text-pretty">
              Get your favorite craft beers delivered fresh to your door. Mix and match to create your perfect pack.
            </p>
          </div>

          {/* Features */}
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-4 rounded-xl bg-card p-4 border border-border">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ShopProductGrid beers={beers} />
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">
              Questions About Your Order?
            </h2>
            <p className="mt-4 text-primary-foreground/70 max-w-xl">
              Our team is here to help. Reach out via email at shop@dorstbrewery.com or call us at +359 123 456 789.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
