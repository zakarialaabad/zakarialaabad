
import { memo, useState } from "react"
import { Heart, MapPin, Star, Bed, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "@inertiajs/react"
import { ImageCarousel } from "@/components/image-carousel"
import { motion } from "framer-motion"
import type { Property } from "@/data/properties"
import { useAuth } from "@/contexts/auth-context"
import { useFavorites } from "@/contexts/favorites-context"
import { AuthAlert } from "@/components/auth/auth-alert"
import type React from "react"

// Utilisation de memo pour éviter les re-rendus inutiles
export const PropertyCard = memo(function PropertyCard({
  id,
  images,
  title,
  location,
  price,
  bedrooms,
  propertyType,
  area,
  owner,
  rating,
}: Property) {
  // Assurons-nous d'avoir au moins une image
  const propertyImages = images.length > 0 ? images : ["/placeholder.svg"]
  const { isAuthenticated } = useAuth()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [showAuthAlert, setShowAuthAlert] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isHeartAnimating, setIsHeartAnimating] = useState(false)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isAuthenticated) {
      setIsHeartAnimating(true)
      toggleFavorite(id)
      // Réinitialiser l'animation après un court délai
      setTimeout(() => setIsHeartAnimating(false), 1000)
    } else {
      setShowAuthAlert(true)
    }
  }

  const isFav = isFavorite(id)

  const heartVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.3, 1],
      transition: { duration: 0.5 },
    },
  }

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="group overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-md transition-all duration-300"
      >
        <Link href={`/property/${id}`} className="block">
          <div className="relative w-full">
            <div className="w-full h-64 md:h-72 overflow-hidden">
              <ImageCarousel
                images={propertyImages}
                alt={title}
                aspectRatio="tall"
                className="w-full h-full"
                priority={id === "1"}
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavoriteClick}
              className={`absolute right-3 top-3 z-20 h-9 w-9 rounded-full backdrop-blur-sm shadow-sm transition-all duration-300 ${
                isFav
                  ? "bg-white/90 text-rose-500 hover:bg-white hover:text-rose-600 hover:scale-110"
                  : "bg-white/90 text-gray-500 hover:text-gray-700 hover:bg-gray-100 hover:scale-110"
              }`}
              aria-label={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
              <motion.div variants={heartVariants} animate={isHeartAnimating ? "animate" : "initial"}>
                <Heart className={`h-5 w-5 ${isFav ? "fill-current" : ""}`} />
              </motion.div>
            </Button>

            <div className="absolute bottom-3 left-3 z-20 flex flex-wrap gap-1.5">
              <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm font-medium px-2.5 py-1">
                {propertyType}
              </Badge>
            </div>
          </div>
        </Link>

        <div className="p-4">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-gray-900 line-clamp-1">{title}</h3>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                <span className="text-sm font-medium text-gray-600">{rating}</span>
              </div>
            </div>

            <p className="text-sm text-gray-500 flex items-center">
              <MapPin className="mr-1 h-4 w-4 inline text-gray-400 flex-shrink-0" />
              <span className="truncate">{location}</span>
            </p>

            <div className="flex items-center gap-3 text-sm text-gray-600 pt-1">
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1 text-gray-400" />
                <span>
                  {bedrooms} {bedrooms > 1 ? "chambres" : "chambre"}
                </span>
              </div>
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1 text-gray-400" />
                <span>{area} m²</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 w-8 h-8 relative rounded-full overflow-hidden border border-gray-200">
                  <img
                    src={owner.image || "/placeholder.svg?height=40&width=40&query=person"}
                    alt={owner.name}
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
                <span className="text-xs text-gray-500 truncate max-w-[100px]">{owner.name}</span>
              </div>
              <div className="text-gray-900 font-bold text-lg">
                {price} <span className="text-sm font-medium text-gray-500">MAD/mois</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <AuthAlert
        isOpen={showAuthAlert}
        onClose={() => setShowAuthAlert(false)}
        message="Vous devez être connecté pour ajouter ce logement à vos favoris."
        onAutoClose={() => setIsAuthModalOpen(true)}
        autoCloseDelay={3000}
      />
    </>
  )
})
