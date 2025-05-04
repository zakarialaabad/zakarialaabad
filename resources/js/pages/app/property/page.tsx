import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { PropertyListings } from "@/components/property-listings"
import { MobileNavigation } from "@/components/mobile-navigation"
import { StickyHeaderEffect } from "@/components/sticky-header-effect"
import { Footer } from "@/components/footer"

export default function Home(){
  return (
    <main className="min-h-screen bg-white flex flex-col  item-center">
      <Header/>
      <StickyHeaderEffect />
      <Hero />
      <PropertyListings />
      <MobileNavigation />
      <Footer/>
    </main>
  )
}
