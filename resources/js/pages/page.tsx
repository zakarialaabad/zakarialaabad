import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { PropertyListings } from "@/components/property-listings"
import { Footer } from "@/components/footer"
import { MobileNavigation } from "@/components/mobile-navigation"
import { StickyHeaderEffect } from "@/components/sticky-header-effect"

export default function Home(){
  return (
    <main className="min-h-screen min-w-screen bg-white flex flex-col">
      <Header />
      <StickyHeaderEffect />
      <Hero />
      <PropertyListings />
      <Footer />
      <MobileNavigation />
    </main>
  )
}
