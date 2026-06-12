import { stats } from "@/lib/data"

export function StatsBar() {
  return (
    <section className="py-16 border-y border-border">
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
  )
}
