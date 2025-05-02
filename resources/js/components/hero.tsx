
import { useState, useEffect, useRef } from "react"
import { useWindowSize, isMobileView } from "@/utils/responsive-utils"
import type { SearchFilters as SearchFiltersType } from "./search-filters"
import { FilterSidebar } from "./filter-sidebar"
import { motion, AnimatePresence } from "framer-motion"
import { AnimatedCounter } from "./animated-counter"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"

export function Hero(){
  const { width } = useWindowSize()
  const isMobile = isMobileView(width)
  const [searchQuery, setSearchQuery] = useState("")
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [activeFilterTab, setActiveFilterTab] = useState<string>("location")
  const [filters, setFilters] = useState<SearchFiltersType>({
    city: "laayoune",
    district: "al-wifaq",
    propertyType: "appartement",
    tenantType: "famille",
    bedrooms: 0,
    minPrice: 500,
    maxPrice: 3000,
    minArea: 20,
    maxArea: 150,
  })
  const { user, isAuthenticated } = useAuth()

  // États pour gérer la visibilité des éléments
  const [showHeading, setShowHeading] = useState(true)
  const [showStats, setShowStats] = useState(false) // Initialement caché

  // Ajouter un nouvel état pour suivre si toutes les animations sont terminées
  const [animationsComplete, setAnimationsComplete] = useState(false)

  // Références pour détecter le défilement
  const sectionRef = useRef<HTMLElement>(null)

  // Effet pour faire disparaître le titre et le sous-titre après 3 secondes
  // et faire apparaître les statistiques ensuite
  // Modifier l'effet qui gère les animations pour définir animationsComplete à true
  // après que toutes les animations soient terminées
  useEffect(() => {
    const welcomeTimer = setTimeout(() => {
      setShowHeading(false)

      // Afficher les statistiques immédiatement après la disparition du titre
      // (seulement pour les utilisateurs non authentifiés)
      if (!isAuthenticated) {
        setShowStats(true)

        // Masquer les statistiques après 3 secondes
        setTimeout(() => {
          setShowStats(false)

          // Marquer toutes les animations comme terminées
          setTimeout(() => {
            setAnimationsComplete(true)
          }, 300) // Attendre que l'animation de sortie des statistiques soit terminée
        }, 3000)
      } else {
        // Pour les utilisateurs authentifiés, marquer comme terminé après la disparition du titre
        setTimeout(() => {
          setAnimationsComplete(true)
        }, 300) // Attendre que l'animation de sortie du titre soit terminée
      }
    }, 3000)

    return () => clearTimeout(welcomeTimer)
  }, [isAuthenticated])

  const handleOpenFilters = (tab?: string) => {
    if (tab) {
      setActiveFilterTab(tab)
    }
    setIsFiltersOpen(true)
  }

  const handleCloseFilters = () => {
    setIsFiltersOpen(false)
  }

  const handleApplyFilters = (newFilters: SearchFiltersType) => {
    setFilters(newFilters)
    // Ici, vous pourriez déclencher une requête pour filtrer les résultats
  }

  // Données statistiques
  const stats = [
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.33334 14.6667H14.6667M2.66668 14.6667V3.33333C2.66668 2.96667 2.80001 2.66667 3.06668 2.4C3.33334 2.13333 3.63334 2 4.00001 2H12C12.3667 2 12.6667 2.13333 12.9333 2.4C13.2 2.66667 13.3333 2.96667 13.3333 3.33333V14.6667M5.33334 14.6667V10.6667H10.6667V14.6667M8.00001 6.66667H10M8.00001 8.66667H10M6.00001 6.66667H6.00668M6.00001 8.66667H6.00668"
            stroke="#4153a4"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      value: 1500,
      suffix: "+",
      label: "Logements",
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.00001 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00001C14.6667 4.31811 11.6819 1.33334 8.00001 1.33334C4.31811 1.33334 1.33334 4.31811 1.33334 8.00001C1.33334 11.6819 4.31811 14.6667 8.00001 14.6667Z"
            stroke="#4153a4"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 10.6667C9.47276 10.6667 10.6667 9.47276 10.6667 8C10.6667 6.52724 9.47276 5.33334 8 5.33334C6.52724 5.33334 5.33334 6.52724 5.33334 8C5.33334 9.47276 6.52724 10.6667 8 10.6667Z"
            stroke="#4153a4"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      value: 25000,
      suffix: "+",
      label: "Visiteurs",
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.00001 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00001C14.6667 4.31811 11.6819 1.33334 8.00001 1.33334C4.31811 1.33334 1.33334 4.31811 1.33334 8.00001C1.33334 11.6819 4.31811 14.6667 8.00001 14.6667Z"
            stroke="#4153a4"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.33334 8.00001L7.33334 10L11.33334 6.00001"
            stroke="#4153a4"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      value: 850,
      suffix: "+",
      label: "Locations validées",
    },
  ]

  // Vérifier que l'image de fond est valide
  const backgroundImage = "/hero-background.png"

  // Textes animés pour le sous-titre
  const subtitles = [
    "Le logement sur-mesure, en un clic !",
    "Trouvez votre chez-vous idéal",
    "Location sans intermédiaire au Maroc",
  ]
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0)

  // Effet pour animer le sous-titre
  useEffect(() => {
    if (!showHeading) return // Ne pas animer si le titre est masqué

    const interval = setInterval(() => {
      setCurrentSubtitleIndex((prev) => (prev + 1) % subtitles.length)
    }, 1000)

    return () => clearInterval(interval)
  }, [showHeading, subtitles.length])

  // Animation partagée pour les deux éléments
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  }

  return (
    <section ref={sectionRef} className="w-full py-2 md:py-4 relative overflow-hidden bg-white">
      {/* Suppression de l'élément d'image de fond qui interfère avec les interactions */}

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center gap-3 md:gap-4 mx-auto">
          {/* Zone pour le titre ou les statistiques - même hauteur et style */}
          <div
            className={cn(
              "flex items-center justify-center w-full max-w-3xl transition-opacity duration-500",
              animationsComplete ? "opacity-0 absolute pointer-events-none" : "opacity-100 relative",
            )}
            style={{ height: animationsComplete ? "0" : "140px", marginBottom: animationsComplete ? "0" : "1rem" }}
          >
            <AnimatePresence mode="wait">
              {showHeading && (
                <motion.div
                  key="welcome"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full py-3 px-6 rounded-full"
                >
                  <motion.h1
                    className="text-3xl font-bold tracking-tighter text-[#485aa8] sm:text-4xl md:text-5xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {isAuthenticated ? `Bonjour ${user?.name}` : "Welcome to E-JAR"}
                  </motion.h1>

                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentSubtitleIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-lg md:text-xl text-gray-700 mt-2"
                    >
                      {subtitles[currentSubtitleIndex]}
                    </motion.p>
                  </AnimatePresence>
                </motion.div>
              )}

              {!isAuthenticated && showStats && (
                <motion.div
                  key="stats"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full py-3 px-6 rounded-full"
                >
                  <div className="flex justify-center items-center gap-8 md:gap-16">
                    {stats.map((stat, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="flex items-center gap-1.5 mb-1">
                          {stat.icon}
                          <span className="text-lg md:text-xl font-bold text-[#485aa8]">
                            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Placeholder pour maintenir l'espace lorsque la barre de filtrage est fixe */}
          {/* <div ref={filterBarPlaceholderRef} className="w-full transition-all duration-300"></div> */}
        </div>
      </div>

      {/* Sidebar de filtrage */}
      <FilterSidebar
        isOpen={isFiltersOpen}
        onClose={handleCloseFilters}
        onApply={handleApplyFilters}
        initialFilters={filters}
        initialTab={activeFilterTab}
      />
    </section>
  )
}
