export interface Beer {
  id: string
  name: string
  tagline: string
  description: string
  style: string
  abv: number
  ibu: number
  accentColor: string
  image: string
  price: number
}

export const beers: Beer[] = [
  {
    id: "whale-ale",
    name: "Whale Ale",
    tagline: "Smooth & Balanced",
    description: "Our flagship ale with a smooth, balanced profile. Notes of caramel and light citrus make this an approachable everyday beer.",
    style: "American Pale Ale",
    abv: 5.2,
    ibu: 35,
    accentColor: "#1E3A5F",
    image: "/images/beers/whale-ale.jpg",
    price: 4.50,
  },
  {
    id: "deep-dive-ipa",
    name: "Deep Dive IPA",
    tagline: "Bold & Hoppy",
    description: "A bold West Coast IPA with tropical hop aromas and a clean, bitter finish. For those who like to go deep.",
    style: "West Coast IPA",
    abv: 6.8,
    ibu: 65,
    accentColor: "#2D5A3D",
    image: "/images/beers/deep-dive-ipa.jpg",
    price: 5.00,
  },
  {
    id: "golden-tide",
    name: "Golden Tide",
    tagline: "Crisp & Refreshing",
    description: "A crisp, refreshing lager perfect for warm days. Light body with subtle malt sweetness.",
    style: "Premium Lager",
    abv: 4.5,
    ibu: 18,
    accentColor: "#C4A35A",
    image: "/images/beers/golden-tide.jpg",
    price: 4.00,
  },
  {
    id: "midnight-stout",
    name: "Midnight Stout",
    tagline: "Rich & Roasted",
    description: "A rich, roasted stout with notes of dark chocolate and espresso. Creamy mouthfeel with a dry finish.",
    style: "Dry Irish Stout",
    abv: 5.5,
    ibu: 40,
    accentColor: "#2C1810",
    image: "/images/beers/midnight-stout.jpg",
    price: 5.50,
  },
  {
    id: "summer-wheat",
    name: "Summer Wheat",
    tagline: "Light & Hazy",
    description: "A light, hazy wheat beer with hints of banana and clove. Perfect for sunny afternoons.",
    style: "Hefeweizen",
    abv: 4.8,
    ibu: 12,
    accentColor: "#E8A838",
    image: "/images/beers/summer-wheat.jpg",
    price: 4.50,
  },
  {
    id: "amber-anchor",
    name: "Amber Anchor",
    tagline: "Malty & Smooth",
    description: "A malty amber ale with caramel sweetness and a hint of toasted bread. A classic done right.",
    style: "American Amber Ale",
    abv: 5.4,
    ibu: 28,
    accentColor: "#8B4513",
    image: "/images/beers/amber-anchor.jpg",
    price: 4.50,
  },
]

export interface Location {
  id: string
  name: string
  type: "bar" | "restaurant" | "shop"
  address: string
  city: string
  image: string
  beersAvailable: string[]
}

export const locations: Location[] = [
  {
    id: "craft-corner",
    name: "Craft Corner",
    type: "bar",
    address: "123 Main Street",
    city: "Sofia",
    image: "/images/locations/craft-corner.jpg",
    beersAvailable: ["whale-ale", "deep-dive-ipa", "golden-tide"],
  },
  {
    id: "the-hop-house",
    name: "The Hop House",
    type: "bar",
    address: "456 Oak Avenue",
    city: "Plovdiv",
    image: "/images/locations/hop-house.jpg",
    beersAvailable: ["whale-ale", "midnight-stout", "amber-anchor"],
  },
  {
    id: "bistro-marina",
    name: "Bistro Marina",
    type: "restaurant",
    address: "789 Harbor Road",
    city: "Varna",
    image: "/images/locations/bistro-marina.jpg",
    beersAvailable: ["whale-ale", "golden-tide", "summer-wheat"],
  },
  {
    id: "beer-bazaar",
    name: "Beer Bazaar",
    type: "shop",
    address: "321 Market Square",
    city: "Burgas",
    image: "/images/locations/beer-bazaar.jpg",
    beersAvailable: ["whale-ale", "deep-dive-ipa", "golden-tide", "midnight-stout", "summer-wheat", "amber-anchor"],
  },
  {
    id: "urban-tap",
    name: "Urban Tap",
    type: "bar",
    address: "654 City Center",
    city: "Sofia",
    image: "/images/locations/urban-tap.jpg",
    beersAvailable: ["deep-dive-ipa", "midnight-stout"],
  },
  {
    id: "the-golden-pint",
    name: "The Golden Pint",
    type: "bar",
    address: "987 Old Town",
    city: "Plovdiv",
    image: "/images/locations/golden-pint.jpg",
    beersAvailable: ["whale-ale", "golden-tide", "amber-anchor"],
  },
]

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
}

export const teamMembers: TeamMember[] = [
  {
    id: "founder",
    name: "Ivan Petrov",
    role: "Founder & Head Brewer",
    bio: "With over 15 years of brewing experience, Ivan founded Dorst with a vision to bring world-class craft beer to Bulgaria.",
    image: "/images/team/ivan.jpg",
  },
  {
    id: "brewer",
    name: "Maria Georgieva",
    role: "Assistant Brewer",
    bio: "Maria brings creativity and precision to every batch, specializing in experimental hop combinations and seasonal recipes.",
    image: "/images/team/maria.jpg",
  },
  {
    id: "operations",
    name: "Stefan Dimitrov",
    role: "Operations Manager",
    bio: "Stefan ensures our beer reaches you fresh and on time, managing our growing network of partners across the country.",
    image: "/images/team/stefan.jpg",
  },
]

export const stats = [
  { label: "Years Brewing", value: "8+" },
  { label: "Beers Crafted", value: "24" },
  { label: "Locations", value: "50+" },
  { label: "Happy Customers", value: "100K+" },
]
