import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { beers } from '@/lib/data'
import { BeerDetailClient } from './BeerDetailClient'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return beers.map(b => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const beer = beers.find(b => b.slug === slug)
  if (!beer) return {}
  return {
    title: `${beer.name} — Dorst Brewery`,
    description: beer.taglineEn,
  }
}

export default async function BeerPage({ params }: Props) {
  const { slug } = await params
  const beer = beers.find(b => b.slug === slug)
  if (!beer) notFound()

  const relatedBeers = beers
    .filter(b => b.id !== beer.id && b.active && b.format !== 'keg')
    .slice(0, 3)

  return <BeerDetailClient beer={beer} relatedBeers={relatedBeers} />
}
