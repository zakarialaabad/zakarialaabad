import { useEffect, useState } from "react"
import { MobileNavigation } from "@/components/mobile-navigation"
import { StickyHeaderEffect } from "@/components/sticky-header-effect"
import { useFavorites } from "@/contexts/favorites-context"
import { useAuth } from "@/contexts/auth-context"
import { PropertyCard } from "@/components/property-card"
import type { Property } from "@/data/properties"
import { allProperties } from "@/data/properties"
import { Heart,ChevronLeft    } from "lucide-react"
import { AuthModal } from "@/components/auth/auth-modal"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
export default function FavoritesPage() {
  const { favorites } = useFavorites()
  const { isAuthenticated } = useAuth()
  const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([])
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  useEffect(() => {
    // Filtrer les propriétés qui sont dans les favoris
    const favProps = allProperties.filter((property) => favorites.includes(property.id))
    setFavoriteProperties(favProps)
  }, [favorites])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <main className="min-h-screen bg-white flex flex-col px-4 ">
          <div className="container py-4 ">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <Button
                variant="ghost"
                size="sm"
                className="mb-4 flex items-center text-?gray-600  hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                onClick={() => window.history.back()}
>
                <ChevronLeft className="mr-1 h-4 w-4" />
                Retour aux résultats
              </Button>
            </motion.div>
          </div>
      <StickyHeaderEffect />

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex items-center mb-8">
          <Heart className="h-6 w-6 text-primary mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Mes Favoris</h1>
        </div>

        {isAuthenticated ? (
          favoriteProperties.length > 0 ? (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {favoriteProperties.map((property) => (
                <motion.div key={property.id} variants={item}>
                  <PropertyCard {...property} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Heart className="h-8 w-8 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Aucun favori pour le moment</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Explorez nos logements et ajoutez-les à vos favoris pour les retrouver facilement ici.
              </p>
              <Button
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => (window.location.href = "/")}
              >
                Explorer les logements
              </Button>
            </div>
          )
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Heart className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Connectez-vous pour voir vos favoris</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Connectez-vous pour ajouter des logements à vos favoris et les retrouver facilement.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-white" onClick={() => setIsAuthModalOpen(true)}>
              Se connecter
            </Button>
          </div>
        )}
      </div>

      <MobileNavigation />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </main>
  )
}
