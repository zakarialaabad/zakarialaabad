import { useState, useEffect, useMemo, useCallback } from "react"
import { PropertyCard } from "@/components/property-card"
import { useMediaQuery } from "@/utils/responsive-utils"
import { Pagination } from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Grid3X3, Grid2X2, Filter, Search, Home, Building, Building2, Warehouse, MapPin, Bed } from "lucide-react"
import { cn } from "@/lib/utils"
import { FilterSidebar } from "@/components/filter-sidebar"
import type { SearchFilters } from "./search-filters"
import { generateText, openai } from "@/lib/openai"
import { HorizontalFilterBar } from "@/components/horizontal-filter-bar"
type Propriete = {
  id: number;
  loueur_id: number;
  ville:string;
  titre: string;
  typesLocaires:string;
  localisation: string;
  prixParMois: number;
  imgs: string[];
  description: Text;
  disponibilite: boolean;
  type: string;
  nbrchambre: number;
  surface: number;
  adresse: string;
  admin_id: number;
  loueur: {
    id: number;
    user: {
      name: string;
      email: string;
      prenom: string;
      genre: string;
      telephone: string;
      profile: string;
    };
  };
};
type InertiaPageProps = {
  proprietes: Propriete[];
};
export function PropertyListings({proprietes}:InertiaPageProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [currentPage, setCurrentPage] = useState(1)
  const [gridView, setGridView] = useState<"grid3" | "grid2">("grid3")
  const [isLoading, setIsLoading] = useState(false)
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false)
  const [activeFilterTab, setActiveFilterTab] = useState<string>("localisation")
  const [filters, setFilters] = useState<SearchFilters>({
    ville: "",
    prixParMois: 0,
    localisation:"",
    adresse:"",
    type: "tout",
    typesLocaires: "tous",
    nbrchambre: 0,
    minPrice: 500,
    maxPrice: 3000,
    minArea: 20,
    maxArea: 150,
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [searchCriteria, setSearchCriteria] = useState<any>(null)
  const [filteredProperties, setFilteredProperties] = useState(proprietes)
  const [searchAnimation, setSearchAnimation] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")

  // Définition des filtres pour la barre horizontale - Mémorisé pour éviter des re-rendus inutiles
  const filterItems = useMemo(
    () => [
      { id: "all", label: "Tous", icon: <Home className="h-5 w-5" strokeWidth={1} /> },
      { id: "apartment", label: "Appartement", icon: <Building className="h-5 w-5" strokeWidth={1} /> },
      { id: "house", label: "Maison", icon: <Home className="h-5 w-5" strokeWidth={1} /> },
      { id: "garconniere", label: "Boutique", icon: <Building2 className="h-5 w-5" strokeWidth={1} /> },
      { id: "studio", label: "Studio", icon: <Building2 className="h-5 w-5" strokeWidth={1} /> },
      { id: "villa", label: "Villa", icon: <Home className="h-5 w-5" strokeWidth={1} /> },
      { id: "bureau", label: "Bureau", icon: <Building className="h-5 w-5" strokeWidth={1} /> },
      { id: "garage", label: "Garage", icon: <Warehouse className="h-5 w-5" strokeWidth={1} /> },
      { id: "depot", label: "Dépôt", icon: <Warehouse className="h-5 w-5" strokeWidth={1} /> },
      { id: "magasin", label: "Magasin", icon: <Building className="h-5 w-5" strokeWidth={1} /> },
    ],
    [],
  )
  // Gérer le changement de filtre - Optimisé avec useCallback
  const handleFilterChange = useCallback(
    (filterId: string) => {
      setActiveFilter(filterId)
      setIsLoading(true)
      // Filtrer les propriétés en fonction du filtre sélectionné
      setTimeout(() => {
        let filtered = [...proprietes]
        if (filterId !== "all") {
          // Filtrer par type de propriété
          const typeMap: Record<string, string> = {
            apartment: "Appartement",
            house: "Maison",
            boutique: "Boutique",
            studio: "Studio",
            villa: "Villa",
            bureau: "Bureau",
            garage: "Garage",
            depot: "Dépôt",
            magasin: "Magasin",
          }
          if (typeMap[filterId]) {
            filtered = proprietes.filter(
              (p) => p.type.toLowerCase() === typeMap[filterId]?.toLowerCase(),
            )
          }
        }
        // Appliquer les filtres de ville et de quartier
        if (filters.localisation) {
          filtered = filtered.filter((p) => p.localisation === filters.localisation.toLowerCase())

          // Si un quartier spécifique est sélectionné, filtrer davantage
          if (filters.adresse) {
            filtered = filtered.filter((p) => p.adresse === filters.adresse)
          }
          // Sinon, tous les logements de la ville sont déjà filtrés
        }
        if (filters.nbrchambre > 0) {
          filtered = filtered.filter((p) => p.nbrchambre >= filters.nbrchambre)
        }

        if (filters.minPrice > 500) {
          filtered = filtered.filter((p) => p.prixParMois >= filters.minPrice)
        }

        if (filters.maxPrice < 3000) {
          filtered = filtered.filter((p) => p.prixParMois <= filters.maxPrice)
        }

        // Appliquer les filtres de surface
        if (filters.minArea && filters.minArea > 20) {
          filtered = filtered.filter((p) => p.surface >= filters.minArea!)
        }

        if (filters.maxArea && filters.maxArea < 150) {
          filtered = filtered.filter((p) => p.surface <= filters.maxArea!)
        }

        // Appliquer le filtre de type de locataire
        if (filters.typesLocaires && filters.typesLocaires !== "tous") {
          filtered = filtered.filter((p) => p.typesLocaires === filters.typesLocaires)
        }

        setFilteredProperties(filtered)
        setIsLoading(false)
        setCurrentPage(1) // Réinitialiser la pagination
      }, 300) // Réduit de 500ms à 300ms pour une meilleure réactivité
    },
    [filters],
  )

  // Effet pour filtrer les propriétés en fonction des critères de recherche
  useEffect(() => {
    if (!searchCriteria) {
      // Appliquer uniquement les filtres standards
      let filtered = [...proprietes]

      if (filters.ville) {
        filtered = filtered.filter((p) => p.ville === filters.ville.toLowerCase())

        // Si un quartier spécifique est sélectionné, filtrer davantage
        if (filters.adresse) {
          filtered = filtered.filter((p) => p.ville === filters.ville)
        }
        // Sinon, tous les logements de la ville sont déjà filtrés
      }
      if (filters.type && filters.type !== "tout") {
        filtered = filtered.filter((p) => p.type.toLowerCase() === filters.type.toLowerCase())
      }
      if (filters.typesLocaires && filters.typesLocaires !== "tous") {
        filtered = filtered.filter((p) => p.typesLocaires === filters.typesLocaires)
      }

      if (filters.nbrchambre > 0) {
        // Si l'utilisateur sélectionne 5+, montrer toutes les propriétés avec 5 chambres ou plus
        if (filters.nbrchambre === 5) {
          filtered = filtered.filter((p) => p.nbrchambre >= 5)
        } else {
          // Pour les autres valeurs, montrer exactement ce nombre de chambres
          filtered = filtered.filter((p) => p.nbrchambre === filters.nbrchambre)
        }
      }

      if (filters.minPrice > 500) {
        filtered = filtered.filter((p) => p.prixParMois >= filters.minPrice)
      }

      if (filters.maxPrice < 3000) {
        filtered = filtered.filter((p) => p.prixParMois <= filters.maxPrice)
      }

      // Appliquer les filtres de surface
      if (filters.minArea && filters.minArea > 20) {
        filtered = filtered.filter((p) => p.surface >= filters.minArea!)
      }

      if (filters.maxArea && filters.maxArea < 150) {
        filtered = filtered.filter((p) => p.surface <= filters.maxArea!)
      }

      setFilteredProperties(filtered)   // ... تطبيق الفلاتر واحدًا تلو الآخر ...

      return // ⬅️ يخرج من useEffect بعد التحديث
    }
    setIsLoading(true)
    setSearchAnimation(true)
    // Filtrer les propriétés en fonction des critères de recherche
    const filtered = proprietes.filter((property) => {
      let matches = true
      // Filtrer par type de propriété
      if (searchCriteria.type && searchCriteria.type !== "tout") {
        const typeMatch = property.type.toLowerCase().includes(searchCriteria.type.toLowerCase())
        matches = matches && typeMatch
      }
      // Filtrer par emplacement
      if (searchCriteria.localisation) {
        const locationMatch = property.localisation.toLowerCase().includes(searchCriteria.location.toLowerCase())
        matches = matches && locationMatch
      }
      // Filtrer par prix
      if (searchCriteria.minPrice) {
        matches = matches && property.prixParMois >= searchCriteria.minPrice
      }
      if (searchCriteria.maxPrice) {
        matches = matches && property.prixParMois <= searchCriteria.maxPrice
      }

      // Filtrer par nombre de chambres
      if (searchCriteria.nbrchambre) {
        matches = matches && property.nbrchambre >= searchCriteria.nbrchambre
      }

      // Filtrer par caractéristiques
      if (searchCriteria.features && searchCriteria.features.length > 0) {
        const hasFeature = searchCriteria.features.some(
          (feature: string) =>
            property.titre.toLowerCase().includes(feature.toLowerCase()) ||
            property.localisation.toLowerCase().includes(feature.toLowerCase()),
        )
        matches = matches && hasFeature
      }

      // Filtrer par mots-clés
      if (searchCriteria.keywords && searchCriteria.keywords.length > 0) {
        const hasKeyword = searchCriteria.keywords.some(
          (keyword: string) =>
            property.titre.toLowerCase().includes(keyword.toLowerCase()) ||
            property.localisation.toLowerCase().includes(keyword.toLowerCase()) ||
            property.type.toLowerCase().includes(keyword.toLowerCase()),
        )
        matches = matches && hasKeyword
      }

      // Appliquer les filtres standards en plus des critères de recherche
      if (filters.ville) {
        matches = matches && property.ville === filters.ville.toLowerCase()
      }

      if (filters.adresse) {
        matches = matches && property.adresse === filters.adresse
      }
      if (filters.type && filters.type !== "tout") {
        matches = matches && property.type.toLowerCase() === filters.type.toLowerCase()
      }
      if (filters.typesLocaires && filters.typesLocaires !== "tous") {
        matches = matches && property.typesLocaires === filters.typesLocaires
      }
      if (filters.nbrchambre > 0) {
        matches = matches && property.nbrchambre >= filters.nbrchambre
      }

      if (filters.minPrice > 500) {
        matches = matches && property.prixParMois >= filters.minPrice
      }

      if (filters.maxPrice < 3000) {
        matches = matches && property.prixParMois <= filters.maxPrice
      }

      // Appliquer les filtres de surface
      if (filters.minArea && filters.minArea > 20) {
        matches = matches && property.surface >= filters.minArea!
      }

      if (filters.maxArea && filters.maxArea < 150) {
        matches = matches && property.surface <= filters.maxArea!
      }

      return matches
    })

    setTimeout(() => {
      setFilteredProperties(filtered)
      setIsLoading(false)
      setSearchAnimation(false)
      // Réinitialiser la page courante
      setCurrentPage(1)
    }, 500) // Réduit de 800ms à 500ms
  }, [searchCriteria, filters])

  // Calculer le nombre de propriétés par page en fonction de la vue
  const propertiesPerPage = gridView === "grid3" ? 9 : 8

  // Calculer le nombre total de pages - Mémorisé pour éviter des calculs inutiles
  const totalPages = useMemo(
    () => Math.ceil(filteredProperties.length / propertiesPerPage),
    [filteredProperties.length, propertiesPerPage],
  )


  // Gérer le changement de page - Optimisé avec useCallback
  const handlePageChange = useCallback(
    (page: number) => {
      // S'assurer que la page est dans les limites
      if (page < 1) page = 1
      if (page > totalPages) page = totalPages
      setCurrentPage(page)
      // Faire défiler vers le haut de la liste
      window.scrollTo({
        top: document.getElementById("property-listings")?.offsetTop || 0,
        behavior: "smooth",
      })
    },
    [totalPages],
  )

  // Changer la vue de la grille - Optimisé avec useCallback
  const toggleGridView = useCallback(() => {
    setGridView((prev) => (prev === "grid3" ? "grid2" : "grid3"))
  }, [])

  // Gérer l'ouverture des filtres - Optimisé avec useCallback
  const handleOpenFilters = useCallback((tab?: string) => {
    if (tab) {
      setActiveFilterTab(tab)
    }
    setIsFilterSidebarOpen(true)
  }, [])

  // Gérer la fermeture des filtres - Optimisé avec useCallback
  const handleCloseFilters = useCallback(() => {
    setIsFilterSidebarOpen(false)
  }, [])

  // Gérer l'application des filtres - Optimisé avec useCallback
  const handleApplyFilters = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters)
    setIsLoading(true)
  
    setTimeout(() => {
      let filtered = [...proprietes]
  
      if (newFilters.ville) {
        filtered = filtered.filter((p) => p.ville === newFilters.ville.toLowerCase())
  
        if (newFilters.adresse) {
          filtered = filtered.filter((p) => p.adresse === newFilters.adresse)
        }
      }
  
      if (newFilters.type && newFilters.type !== "tout") {
        filtered = filtered.filter((p) => p.type.toLowerCase() === newFilters.type.toLowerCase())
      }
  
      if (newFilters.typesLocaires && newFilters.typesLocaires !== "tous") {
        filtered = filtered.filter((p) => p.typesLocaires === newFilters.typesLocaires)
      }
  
      if (newFilters.localisation && newFilters.localisation !== "tous") {
        filtered = filtered.filter((p) => p.localisation === newFilters.localisation)
      }
  
      if (newFilters.nbrchambre > 0) {
        if (newFilters.nbrchambre === 5) {
          filtered = filtered.filter((p) => p.nbrchambre >= 5)
        } else {
          filtered = filtered.filter((p) => p.nbrchambre === newFilters.nbrchambre)
        }
      }
  
      if (newFilters.minPrice > 500) {
        filtered = filtered.filter((p) => p.prixParMois >= newFilters.minPrice)
      }
  
      if (newFilters.maxPrice < 3000) {
        filtered = filtered.filter((p) => p.prixParMois <= newFilters.maxPrice)
      }
  
      if (newFilters.minArea && newFilters.minArea > 20) {
        filtered = filtered.filter((p) => p.surface >= (newFilters.minArea ?? 0))
      }
  
      if (newFilters.maxArea && newFilters.maxArea < 150) {
        filtered = filtered.filter((p) => p.surface >= (newFilters.maxArea ?? 0))
      }
  
      setFilteredProperties(filtered)
      setIsLoading(false)
      setCurrentPage(1)
  
      console.log(`Filtres appliqués: ${JSON.stringify(newFilters)}`)
      console.log(`Nombre de propriétés après filtrage: ${filtered.length}`)
    }, 300)
  }, [proprietes])
  
  // Gérer la recherche par IA - Optimisé avec useCallback
  const handleAISearch = useCallback(async (query: string, aiResults: any) => {
    setSearchQuery(query)
    setIsLoading(true)
    setSearchAnimation(true)

    try {
      // Si aiResults est déjà fourni, l'utiliser directement
      if (aiResults) {
        setSearchCriteria(aiResults)
      } else {
        // Sinon, analyser la requête manuellement
        const { text } = await generateText({
          model: openai("gpt-4o"),
          prompt: `Analyse cette requête de recherche de logement: "${query}".
          Extrais les critères de recherche pertinents sous forme d'un objet JSON avec les propriétés suivantes:
          {
            "type": type de logement (appartement, maison, villa, studio, etc.),
            "location": emplacement ou quartier mentionné,
            "minPrice": prix minimum si mentionné (nombre),
            "maxPrice": prix maximum si mentionné (nombre),
            "nbrchambre": nombre de chambres si mentionné (nombre),
            "features": tableau de caractéristiques mentionnées (jardin, terrasse, piscine, etc.),
            "keywords": mots-clés importants pour la recherche
          }
          Renvoie uniquement l'objet JSON, sans autre texte.`,
          maxTokens: 300,
        })

        try {
          const parsedCriteria = JSON.parse(text)
          setSearchCriteria(parsedCriteria)
        } catch (e) {
          console.error("Erreur lors de l'analyse de la réponse JSON:", e)
          // Fallback simple en cas d'erreur de parsing
          setSearchCriteria({ keywords: [query] })
        }
      }
    } catch (error) {
      console.error("Erreur lors de la recherche:", error)
      setSearchCriteria({ keywords: [query] })
    }
  }, [])

  // Réinitialiser la recherche - Optimisé avec useCallback
  const resetSearch = useCallback(() => {
    setSearchQuery("")
    setSearchCriteria(null)
  }, [])

  // Compter les filtres actifs - Mémorisé pour éviter des calculs inutiles
  const activeFiltersCount = useMemo(() => {
    return Object.entries(filters).reduce((count, [key, value]) => {
      if (key === "ville" && value) count++
      if (key === "adresse" && value) count++
      if (key === "type" && value !== "tout") count++
      if (key === "typesLocaires" && value !== "tous") count++
      if (key === "nbrchambre" && value > 0) count++
      if ((key === "minPrice" && value > 500) || (key === "maxPrice" && value < 3000)) count++
      if ((key === "minArea" && value > 20) || (key === "maxArea" && value < 150)) count++
      return count
    }, 0)
  }, [filters])

  const startIndex = (currentPage - 1) * propertiesPerPage;
  const endIndex = startIndex + propertiesPerPage;
  const propertiesToShow = filteredProperties.slice(startIndex, endIndex);
  return (
    <section id="property-listings" className="w-full">
      {/* Header sticky qui contient tous les éléments de filtrage */}
      <div className="sticky top-16 bg-white z-40 border-b">
        <div className="container px-4 md:px-6">
          {/* Espacement supérieur réduit */}
          <div className="h-2"></div>
          {/* Barre de filtrage intégrée */}
          <div className="w-full pb-3">
            <div className="rounded-full overflow-hidden border border-gray-200 text-base md:text-lg bg-white shadow-sm">
              <div className="flex items-center">
                <div
                  className="flex items-center py-3 md:py-3 px-5 md:px-6 flex-1 cursor-pointer hover:bg-black/5 transition-colors border-r"
                  onClick={() => handleOpenFilters("localisation")}
                >
                  <div className="w-8 md:w-8 h-8 md:h-8 flex-shrink-0 mr-3">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Groupe%2048152-5TxjoGwis5ikzofzLbjKzRpbnMeeNI.png"
                      alt="Localisation"
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                    />

        
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-xs md:text-sm text-gray-500 font-medium">Où?</p>
                    <p className="text-sm md:text-base font-medium text-gray-900 truncate">
                      {filters.ville
                        ? filters.ville.charAt(0).toUpperCase() + filters.ville.slice(1)
                        : "Toutes les villes"}
                      {filters.adresse ? `, ${filters.adresse}` : ""}
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center py-3 md:py-3 px-5 md:px-6 flex-1 cursor-pointer hover:bg-black/5 transition-colors border-r"
                  onClick={() => handleOpenFilters("rooms")}
                >
                  <div className="w-8 md:w-8 h-8 md:h-8 flex-shrink-0 mr-3">
                    <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-full">
                      <Bed className="h-5 w-5 text-primary" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-xs md:text-sm text-gray-500 font-medium">Chambres</p>
                    <p className="text-sm md:text-base font-medium text-gray-900 truncate">
                      {filters.nbrchambre > 0
                        ? filters.nbrchambre === 5
                          ? "5+ chambres"
                          : `${filters.nbrchambre} chambre${filters.nbrchambre > 1 ? "s" : ""}`
                        : "Toutes"}
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center py-3 md:py-3 px-5 md:px-6 flex-1 cursor-pointer hover:bg-black/5 transition-colors"
                  onClick={() => handleOpenFilters("tenant")}
                >
                  <div className="w-8 md:w-8 h-8 md:h-8 flex-shrink-0 mr-3">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Groupe%2048153-fUprBKHxUkLvkeBMAVXSCvqR5urfdq.png"
                      alt="Type de locataire"
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-xs md:text-sm text-gray-500 font-medium">Type locataire</p>
                    <p className="text-sm md:text-base font-medium text-gray-900 truncate">
                      {filters.typesLocaires !== "tous"
                        ? filters.typesLocaires.charAt(0).toUpperCase() + filters.typesLocaires.slice(1)
                        : "Tous types"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center pr-3">
                  <Button
                    className="h-12 md:h-12 w-12 md:w-12 rounded-full bg-primary hover:bg-primary/90 text-white m-1"
                    onClick={() => handleOpenFilters("location")}
                  >
                    <Search className="h-5 md:h-5 w-5 md:w-5" />
                    <span className="sr-only">Rechercher</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Contrôles de vue et filtres - avec un espacement vertical uniforme */}
          <div
            className={`flex flex-col md:flex-row justify-between items-center gap-2 py-2 border-t controls-container ${
              filteredProperties.length === 0 ? "hidden" : ""
            }`}
          >
            {/* Localisation et nombre de logements - À GAUCHE */}
            <div className="flex items-center text-sm whitespace-nowrap flex-shrink-0 md:w-auto">
              <div className="flex items-center gap-2">
                <div className="flex items-center text-gray-700">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="font-medium">
                    {filters.ville ? filters.ville.charAt(0).toUpperCase() + filters.ville.slice(1) : "Toutes les villes"}
                  </span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-gray-700 font-medium">{filteredProperties.length} logements</span>
              </div>
            </div>

            {/* Barre de filtres horizontale - AU MILIEU */}
            <div className="flex-1 mx-0 md:mx-2 overflow-hidden integrated-filter-bar">
              <HorizontalFilterBar
                filters={filterItems}
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
                className="w-full"
              />
            </div>

            {/* Contrôles de vue et bouton de filtres - À DROITE */}
            <div className="flex items-center space-x-3 flex-shrink-0 md:w-auto">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "rounded-none border-r h-8 px-2 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-300",
                    gridView === "grid3" ? "bg-gray-100" : "bg-white",
                  )}
                  onClick={toggleGridView}
                  aria-label="Vue grille 3x3"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "rounded-none h-8 px-2 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-300",
                    gridView === "grid2" ? "bg-gray-100" : "bg-white",
                  )}
                  onClick={toggleGridView}
                  aria-label="Vue grille 2x2"
                >
                  <Grid2X2 className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="h-8 hover:bg-gray-100 hover:text-gray-700 hover:border-gray-300 transition-colors duration-300 flex items-center gap-2"
                onClick={() => handleOpenFilters()}
              >
                <Filter className="h-4 w-4" />
                Filtres
                {activeFiltersCount > 0 && (
                  <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
        {/* Espacement inférieur réduit */}
        <div className="h-2"></div>
      </div>

      {/* Contenu principal avec un padding pour compenser le header sticky */}
      <div className="container px-4 md:px-6 pt-6">
        {/* Grille de propriétés */}
        <div className="relative min-h-[500px]">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="relative h-16 w-16">
                  <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
                </div>
                <p className="text-gray-600 text-sm mt-4 font-medium">Chargement...</p>
              </div>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun résultat trouvé</h3>
              <p className="text-gray-500 mb-4">
                Essayez de modifier vos critères de recherche pour voir plus de propriétés.
              </p>
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => {
                  setFilters({
                    ville: "",
                    prixParMois: 0,
                    localisation:"",
                    adresse:"",
                    type: "tout",
                    typesLocaires: "tous",
                    nbrchambre: 0,
                    minPrice: 500,
                    maxPrice: 3000,
                    minArea: 20,
                    maxArea: 150,
                  })
                  handleFilterChange("all")
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`grid-${gridView}-page-${currentPage}-filter-${activeFilter}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "grid gap-6",
                  gridView === "grid3" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2",
                )}
              >
                {propertiesToShow.map((property, index) => {
                  console.log(property);
                  return (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: index * 0.05 },
                      }}
                    >
                      <PropertyCard propriete={property} />
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="py-4"
            />
          </div>
        )}
      </div>
      {/* Sidebar de filtrage */}
      <FilterSidebar
        isOpen={isFilterSidebarOpen}
        onClose={handleCloseFilters}
        onApply={handleApplyFilters}
        initialFilters={filters}
        proprietes={proprietes}
        initialTab={activeFilterTab}
      />
    </section>
  )
}