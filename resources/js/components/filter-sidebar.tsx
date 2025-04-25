import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import {
  MapPin,
  Home,
  DollarSign,
  Bed,
  ChevronLeft,
  X,
  Building,
  Landmark,
  Briefcase,
  BedDouble,
  Warehouse,
  GraduationCap,
  Users,
  User,
  Heart,
  Ruler,
  Maximize2,
  Minimize2,
  Check,
  Settings,
  Wind,
  Droplets,
  Bath,
  School,
  BookOpen,
  GraduationCapIcon,
  ChurchIcon as Mosque,
  ShoppingBag,
  Pill,
  Flower2,
  Waves,
  UtensilsCrossed,
  Car,
  Zap,
  Lock,
  Trash2,
  Armchair,
  Trees,
  Building2,
  Footprints,
  Bus,
  Store,
  Coffee,
  ShoppingCart,
  Dumbbell,
  ShowerHeadIcon as SwimmingPool,
} from "lucide-react"
import type { SearchFilters as SearchFiltersType } from "./search-filters"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useWindowSize, isMobileView } from "../utils/responsive-utils"
import { Square } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { TenantTypeIcon } from "@/components/tenant-type-icon"
import React from "react"
// Ajouter l'import des données de propriétés en haut du fichier
import { allProperties } from "@/data/properties"

// Define the SearchFilters type
interface SearchFilters {
  city: string
  district: string
  propertyType: string
  tenantType: string
  bedrooms: number
  minPrice: number
  maxPrice: number
  minArea?: number
  maxArea?: number
  features?: string[]
}

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: SearchFilters) => void;
  initialFilters: SearchFilters;
  initialTab: string;
}

// First, define the defaultFilters constant at the top of the file (outside the component)
const defaultFilters: SearchFiltersType = {
  city: "",
  district: "",
  propertyType: "tout",
  tenantType: "tous",
  bedrooms: 0,
  minPrice: 500,
  maxPrice: 3000,
  minArea: 20,
  maxArea: 150,
  features: [],
}

// Définir les catégories de caractéristiques
const featureCategories = [
  {
    id: "interior",
    label: "Intérieur",
    features: [
      { id: "balcony", label: "Balcon", icon: Wind },
      { id: "modern_toilet", label: "Toilette moderne", icon: Bath },
      { id: "traditional_toilet", label: "Toilette traditionnelle", icon: Bath },
      { id: "water_supply", label: "Alimentation en eau", icon: Droplets },
      { id: "furnished", label: "Meublé", icon: Armchair },
      { id: "heating", label: "Chauffage", icon: Zap },
    ],
  },
  {
    id: "exterior",
    label: "Extérieur",
    features: [
      { id: "garden", label: "Jardin", icon: Flower2 },
      { id: "parking", label: "Parking", icon: Car },
      { id: "terrace", label: "Terrasse", icon: Trees },
      { id: "pool", label: "Piscine", icon: SwimmingPool },
      { id: "security", label: "Sécurité", icon: Lock },
      { id: "trash_disposal", label: "Vide-ordures", icon: Trash2 },
    ],
  },
  {
    id: "proximity",
    label: "À proximité",
    features: [
      { id: "mosque", label: "Mosquée", icon: Mosque },
      { id: "kindergarten", label: "Maternelle", icon: Footprints },
      { id: "primary_school", label: "École primaire", icon: School },
      { id: "middle_school", label: "Collège", icon: BookOpen },
      { id: "high_school", label: "Lycée", icon: BookOpen },
      { id: "university", label: "Université", icon: GraduationCapIcon },
      { id: "pharmacy", label: "Pharmacie", icon: Pill },
      { id: "souk", label: "Souk", icon: ShoppingBag },
      { id: "hammam", label: "Hammam", icon: Waves },
      { id: "restaurant", label: "Restaurant", icon: UtensilsCrossed },
      { id: "cafe", label: "Café", icon: Coffee },
      { id: "supermarket", label: "Supermarché", icon: ShoppingCart },
      { id: "public_transport", label: "Transport public", icon: Bus },
      { id: "gym", label: "Salle de sport", icon: Dumbbell },
      { id: "shopping", label: "Centre commercial", icon: Store },
    ],
  },
]

// Then update the component function to handle undefined initialFilters
export function FilterSidebar({
  isOpen,
  onClose,
  onApply,
  initialFilters,
  initialTab = "location",
}: FilterSidebarProps){
  const [filters, setFilters] = useState<SearchFilters>({
    city: initialFilters.city || "",
    district: initialFilters.district || "",
    propertyType: initialFilters.propertyType || "tout",
    tenantType: initialFilters.tenantType || "tous",
    bedrooms: initialFilters.bedrooms || 0,
    minPrice: initialFilters.minPrice || 500,
    maxPrice: initialFilters.maxPrice || 3000,
    minArea: initialFilters.minArea || 20,
    maxArea: initialFilters.maxArea || 150,
    features: initialFilters.features || [],
  })
  const [activeTab, setActiveTab] = useState(initialTab)
  const [activeFilters, setActiveFilters] = useState<{ key: string; value: string; label: string }[]>([])
  const contentRef = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()
  const isMobile = isMobileView(width)
  const [hasChanges, setHasChanges] = useState(false)
  const [activeFeatureCategory, setActiveFeatureCategory] = useState("interior")

  // Mémorisation des villes pour éviter des re-rendus inutiles
  const cities = useMemo(
    () => [
      {
        value: "laayoune",
        label: "Laâyoune",
        image: "/images/cities/laayoune.png",
        districts: [
          { id: "al-wifaq", name: "Quartier Al Wifaq" },
          { id: "al-matar", name: "Hay Al Matar" },
          { id: "al-qods", name: "Hay Al Qods" },
          { id: "el-aouda", name: "Hay El Aouda" },
          { id: "el-qods", name: "Hay El Qods" },
          { id: "hay-salam", name: "Hay Salam" },
          { id: "madinat-al-wahda", name: "Madinat Al Wahda" },
          { id: "hay-el-massira", name: "Hay El Massira" },
        ],
      },
      {
        value: "casablanca",
        label: "Casablanca",
        image: "/images/cities/casablanca.png",
        districts: [
          { id: "maarif", name: "Maarif" },
          { id: "ain-diab", name: "Ain Diab" },
          { id: "anfa", name: "Anfa" },
          { id: "bourgogne", name: "Bourgogne" },
          { id: "gauthier", name: "Gauthier" },
          { id: "racine", name: "Racine" },
        ],
      },
      {
        value: "rabat",
        label: "Rabat",
        image: "/images/cities/rabat.png",
        districts: [
          { id: "agdal", name: "Agdal" },
          { id: "hay-riad", name: "Hay Riad" },
          { id: "souissi", name: "Souissi" },
          { id: "hassan", name: "Hassan" },
          { id: "les-orangers", name: "Les Orangers" },
          { id: "centre-ville", name: "Centre Ville" },
        ],
      },
      {
        value: "marrakech",
        label: "Marrakech",
        image: "/images/cities/marrakech.png",
        districts: [
          { id: "gueliz", name: "Guéliz" },
          { id: "hivernage", name: "Hivernage" },
          { id: "palmeraie", name: "Palmeraie" },
          { id: "medina", name: "Médina" },
          { id: "amelkis", name: "Amelkis" },
          { id: "targa", name: "Targa" },
        ],
      },
      {
        value: "agadir",
        label: "Agadir",
        image: "/images/cities/agadir.png",
        districts: [{ id: "marina", name: "Marina" }],
      },
      {
        value: "fes",
        label: "Fès",
        image: "/images/cities/fes.png",
        districts: [{ id: "medina-fes", name: "Médina de Fès" }],
      },
    ],
    [],
  )

  // Mémorisation des types de propriétés pour éviter des re-rendus inutiles
  const propertyTypes = useMemo(
    () => [
      { value: "tout", label: "Tout", icon: <Home className="h-5 w-5" /> },
      { value: "appartement", label: "Appartement", icon: <Building className="h-5 w-5" /> },
      { value: "garconniere", label: "Garçonnière", icon: <Building className="h-5 w-5" /> },
      { value: "maison", label: "Maison", icon: <Home className="h-5 w-5" /> },
      { value: "villa", label: "Villa", icon: <Landmark className="h-5 w-5" /> },
      { value: "studio", label: "Studio", icon: <Building2 className="h-5 w-5" /> },
      { value: "duplex", label: "Duplex", icon: <Building className="h-5 w-5" /> },
      { value: "penthouse", label: "Penthouse", icon: <Building className="h-5 w-5" /> },
      { value: "riad", label: "Riad", icon: <Home className="h-5 w-5" /> },
      { value: "bureau", label: "Bureau", icon: <Briefcase className="h-5 w-5" /> },
      { value: "loft", label: "Loft", icon: <Building2 className="h-5 w-5" /> },
      { value: "chambre", label: "Chambre", icon: <BedDouble className="h-5 w-5" /> },
      { value: "lodge", label: "Lodge", icon: <Home className="h-5 w-5" /> },
      { value: "cabane", label: "Cabane", icon: <Home className="h-5 w-5" /> },
      { value: "chalet", label: "Chalet", icon: <Home className="h-5 w-5" /> },
      { value: "ferme", label: "Ferme", icon: <Warehouse className="h-5 w-5" /> },
    ],
    [],
  )

  // Mémorisation des types de locataires pour éviter des re-rendus inutiles
  const tenantTypes = useMemo(
    () => [
      { value: "tous", label: "Tous types", icon: <Users className="h-5 w-5" /> },
      { value: "etudiants", label: "Étudiants", icon: <GraduationCap className="h-5 w-5" /> },
      { value: "famille", label: "Famille", icon: <Users className="h-5 w-5" /> },
      { value: "celibataire", label: "Célibataire", icon: <User className="h-5 w-5" /> },
      { value: "marie", label: "Couple", icon: <Heart className="h-5 w-5" /> },
      { value: "fonctionnaire", label: "Fonctionnaire", icon: <Briefcase className="h-5 w-5" /> },
    ],
    [],
  )

  // Mémorisation des options de chambres avec le nombre de propriétés pour chaque option
  const bedroomOptions = useMemo(() => {
    const options = [
      { value: 0, label: "Tout", description: "Toutes les options" },
      { value: 1, label: "1", description: "1 chambre" },
      { value: 2, label: "2", description: "2 chambres" },
      { value: 3, label: "3", description: "3 chambres" },
      { value: 4, label: "4", description: "4 chambres" },
      { value: 5, label: "5+", description: "5 chambres ou plus" },
    ]

    // Calculer le nombre de propriétés pour chaque option
    return options.map((option) => {
      let count = 0
      if (option.value === 0) {
        count = allProperties.length
      } else if (option.value === 5) {
        count = allProperties.filter((p) => p.bedrooms >= 5).length
      } else {
        count = allProperties.filter((p) => p.bedrooms === option.value).length
      }
      return { ...option, count }
    })
  }, [])

  // Mémorisation des catégories de surface
  const surfaceCategories = useMemo(
    () => [
      {
        id: "petit",
        name: "Petit",
        icon: <Minimize2 className="h-5 w-5" />,
        minArea: 20,
        maxArea: 50,
        description: "Studio, T1",
        color: "bg-emerald-100 border-emerald-300 text-emerald-700",
        activeColor: "bg-emerald-500 text-white border-emerald-600",
        iconColor: "text-emerald-600",
      },
      {
        id: "moyen",
        name: "Moyen",
        icon: <Square className="h-5 w-5" />,
        minArea: 50,
        maxArea: 90,
        description: "T2, T3",
        color: "bg-blue-100 border-blue-300 text-blue-700",
        activeColor: "bg-blue-500 text-white border-blue-600",
        iconColor: "text-blue-600",
      },
      {
        id: "grand",
        name: "Grand",
        icon: <Maximize2 className="h-5 w-5" />,
        minArea: 90,
        maxArea: 150,
        description: "T4, T5",
        color: "bg-purple-100 border-purple-300 text-purple-700",
        activeColor: "bg-purple-500 text-white border-purple-600",
        iconColor: "text-purple-600",
      },
      {
        id: "tres-grand",
        name: "Très grand",
        icon: <Maximize2 className="h-5 w-5" />,
        minArea: 150,
        maxArea: 200,
        description: "T5+, Duplex",
        color: "bg-amber-100 border-amber-300 text-amber-700",
        activeColor: "bg-amber-500 text-white border-amber-600",
        iconColor: "text-amber-600",
      },
    ],
    [],
  )

  // Mémorisation des plages de surface prédéfinies
  const surfaceRanges = useMemo(
    () => [
      { label: "< 50 m²", min: 20, max: 50 },
      { label: "50-80 m²", min: 50, max: 80 },
      { label: "80-120 m²", min: 80, max: 120 },
      { label: "> 120 m²", min: 120, max: 200 },
    ],
    [],
  )

  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab)
    }
  }, [isOpen, initialTab])

  // Mise à jour des filtres actifs
  useEffect(() => {
    const active = []

    if (filters.city) {
      const cityObj = cities.find((c) => c.value === filters.city)
      active.push({
        key: "city",
        value: filters.city,
        label: cityObj ? cityObj.label : filters.city,
      })
    }

    if (filters.district) {
      const cityObj = cities.find((c) => c.value === filters.city)
      const districtObj = cityObj?.districts.find((d) => d.id === filters.district)
      active.push({
        key: "district",
        value: filters.district,
        label: districtObj ? districtObj.name : filters.district,
      })
    }

    if (filters.propertyType && filters.propertyType !== "tout") {
      const typeObj = propertyTypes.find((t) => t.value === filters.propertyType)
      active.push({
        key: "propertyType",
        value: filters.propertyType,
        label: typeObj ? typeObj.label : filters.propertyType,
      })
    }

    if (filters.tenantType && filters.tenantType !== "tous") {
      const tenantTypeObj = tenantTypes.find((t) => t.value === filters.tenantType)
      active.push({
        key: "tenantType",
        value: filters.tenantType,
        label: tenantTypeObj ? tenantTypeObj.label : filters.tenantType,
      })
    }

    if (filters.bedrooms > 0) {
      active.push({
        key: "bedrooms",
        value: filters.bedrooms.toString(),
        label: `${filters.bedrooms} ${filters.bedrooms > 1 ? "chambres" : "chambre"}`,
      })
    }

    if (filters.minPrice > 500 || filters.maxPrice < 3000) {
      active.push({
        key: "price",
        value: `${filters.minPrice}-${filters.maxPrice}`,
        label: `${filters.minPrice} - ${filters.maxPrice} MAD`,
      })
    }

    if ((filters.minArea && filters.minArea > 20) || (filters.maxArea && filters.maxArea < 150)) {
      // Trouver la catégorie correspondante ou créer une étiquette personnalisée
      const matchingCategory = surfaceCategories.find(
        (cat) => filters.minArea === cat.minArea && filters.maxArea === cat.maxArea,
      )

      if (matchingCategory) {
        active.push({
          key: "area",
          value: `${filters.minArea}-${filters.maxArea}`,
          label: matchingCategory.name,
        })
      } else {
        active.push({
          key: "area",
          value: `${filters.minArea}-${filters.maxArea}`,
          label: `${filters.minArea} - ${filters.maxArea} m²`,
        })
      }
    }

    if (filters.features && filters.features.length > 0) {
      filters.features.forEach((featureId) => {
        // Trouver la caractéristique dans toutes les catégories
        let featureObj = null
        for (const category of featureCategories) {
          const found = category.features.find((f) => f.id === featureId)
          if (found) {
            featureObj = found
            break
          }
        }

        if (featureObj) {
          active.push({
            key: `feature-${featureId}`,
            value: featureId,
            label: featureObj.label,
          })
        }
      })
    }

    setActiveFilters(active)

    // Check if filters have changed from initial values
    const initialFilterValues = JSON.stringify(initialFilters)
    const currentFilterValues = JSON.stringify(filters)
    setHasChanges(initialFilterValues !== currentFilterValues)
  }, [filters, initialFilters, cities, propertyTypes, tenantTypes, surfaceCategories])

  // Scroll to top when changing tabs
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [activeTab])

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Optimisation avec useCallback
  const handleBedroomsChange = useCallback(
    (value: number) => {
      setFilters((prev) => {
        // Mettre à jour le filtre de chambres
        const newFilters = {
          ...prev,
          bedrooms: value,
        }

        // Vérifier si les filtres ont changé
        const hasChanged = JSON.stringify(newFilters) !== JSON.stringify(initialFilters)
        setHasChanges(hasChanged)

        return newFilters
      })

      // Ajouter un log pour déboguer
      console.log(`Nombre de chambres sélectionné: ${value}`)
    },
    [initialFilters],
  )

  // Optimisation avec useCallback
  const handlePriceChange = useCallback(
    (value: number[]) => {
      setFilters((prev) => {
        // Mettre à jour les filtres de prix
        const newFilters = {
          ...prev,
          minPrice: value[0],
          maxPrice: value[1],
        }

        // Vérifier si les filtres ont changé
        const hasChanged = JSON.stringify(newFilters) !== JSON.stringify(initialFilters)
        setHasChanges(hasChanged)

        return newFilters
      })

      // Ajouter un log pour déboguer
      console.log(`Plage de prix sélectionnée: ${value[0]} - ${value[1]} MAD`)
    },
    [initialFilters],
  )

  // Gestion du changement de surface par catégorie
  const handleSurfaceCategoryChange = useCallback(
    (category: { minArea: number; maxArea: number }) => {
      setFilters((prev) => {
        // Mettre à jour les filtres de surface
        const newFilters = {
          ...prev,
          minArea: category.minArea,
          maxArea: category.maxArea,
        }

        // Vérifier si les filtres ont changé
        const hasChanged = JSON.stringify(newFilters) !== JSON.stringify(initialFilters)
        setHasChanges(hasChanged)

        return newFilters
      })

      // Ajouter un log pour déboguer
      console.log(`Catégorie de surface sélectionnée: ${category.minArea} - ${category.maxArea} m²`)
    },
    [initialFilters],
  )

  // Gestion du changement de surface personnalisée
  const handleCustomAreaChange = useCallback(
    (min: number, max: number) => {
      setFilters((prev) => {
        // Mettre à jour les filtres de surface
        const newFilters = {
          ...prev,
          minArea: min,
          maxArea: max,
        }

        // Vérifier si les filtres ont changé
        const hasChanged = JSON.stringify(newFilters) !== JSON.stringify(initialFilters)
        setHasChanges(hasChanged)

        return newFilters
      })

      // Ajouter un log pour déboguer
      console.log(`Surface personnalisée: ${min} - ${max} m²`)
    },
    [initialFilters],
  )

  // Gestion du changement de type de locataire
  const handleTenantTypeChange = useCallback(
    (value: string) => {
      setFilters((prev) => {
        // Mettre à jour le filtre de type de locataire
        const newFilters = {
          ...prev,
          tenantType: value,
        }

        // Vérifier si les filtres ont changé
        const hasChanged = JSON.stringify(newFilters) !== JSON.stringify(initialFilters)
        setHasChanges(hasChanged)

        return newFilters
      })

      // Ajouter un log pour déboguer
      console.log(`Type de locataire sélectionné: ${value}`)
    },
    [initialFilters],
  )

  // Gestion du changement de caractéristique
  const handleFeatureChange = useCallback(
    (featureId: string) => {
      setFilters((prev) => {
        const currentFeatures = prev.features || []
        const isSelected = currentFeatures.includes(featureId)

        // Ajouter ou supprimer la caractéristique
        const newFeatures = isSelected
          ? currentFeatures.filter((f) => f !== featureId)
          : [...currentFeatures, featureId]

        // Mettre à jour les filtres
        const newFilters = {
          ...prev,
          features: newFeatures,
        }

        // Vérifier si les filtres ont changé
        const hasChanged = JSON.stringify(newFilters) !== JSON.stringify(initialFilters)
        setHasChanges(hasChanged)

        return newFilters
      })
    },
    [initialFilters],
  )

  // Optimisation avec useCallback
  const handleApply = useCallback(() => {
    onApply(filters)
    onClose()
  }, [filters, onApply, onClose])

  // Optimisation avec useCallback
  const handleReset = useCallback(() => {
    setFilters({
      city: "",
      district: "",
      propertyType: "tout",
      tenantType: "tous",
      bedrooms: 0,
      minPrice: 500,
      maxPrice: 3000,
      minArea: 20,
      maxArea: 150,
      features: [],
    })
  }, [])

  // Supprimer un filtre spécifique
  const removeFilter = useCallback((key: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev }

      if (key === "city") {
        newFilters.city = ""
        newFilters.district = "" // Réinitialiser aussi le district si on supprime la ville
      } else if (key === "district") {
        newFilters.district = ""
      } else if (key === "propertyType") {
        newFilters.propertyType = "tout"
      } else if (key === "tenantType") {
        newFilters.tenantType = "tous"
      } else if (key === "bedrooms") {
        newFilters.bedrooms = 0
      } else if (key === "price") {
        newFilters.minPrice = 500
        newFilters.maxPrice = 3000
      } else if (key === "area") {
        newFilters.minArea = 20
        newFilters.maxArea = 150
      } else if (key.startsWith("feature-")) {
        const featureId = key.replace("feature-", "")
        newFilters.features = (prev.features || []).filter((f) => f !== featureId)
      }

      return newFilters
    })
  }, [])

  // Mémorisation des onglets pour éviter des re-rendus inutiles
  const tabs = useMemo(
    () => [
      { id: "location", label: "Localisation", icon: <MapPin className="h-5 w-5" /> },
      { id: "property", label: "Type de logement", icon: <Home className="h-5 w-5" /> },
      { id: "price", label: "Prix", icon: <DollarSign className="h-5 w-5" /> },
      { id: "rooms", label: "Chambres", icon: <Bed className="h-5 w-5" /> },
      { id: "surface", label: "Surface", icon: <Square className="h-5 w-5" /> },
      { id: "tenant", label: "Type de locataire", icon: <Users className="h-5 w-5" /> },
      { id: "features", label: "Caractéristiques", icon: <Settings className="h-5 w-5" /> },
    ],
    [],
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className={cn("absolute top-0 right-0 h-full w-full bg-white shadow-xl", isMobile ? "max-w-full" : "max-w-md")}
      >
        <div className="flex flex-col h-full">
          {/* Header avec titre et bouton de réinitialisation */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <button onClick={onClose} className="mr-4 text-gray-700 hover:text-gray-900">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h2 className="text-xl font-bold text-gray-900">Filtres</h2>
            </div>
            <button className="text-sm text-[#4153a4]" onClick={handleReset}>
              Réinitialiser
            </button>
          </div>

          {/* Section des filtres actifs */}
          <div className="bg-gray-50 p-4 border-b">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Filtres actifs</span>
              <span className="text-xs text-[#4153a4]">
                {activeFilters.length} sélectionné{activeFilters.length > 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <div
                  key={filter.key}
                  className="flex items-center bg-[#f5f7ff] border border-[#e0e5ff] rounded-full px-2.5 py-1 text-xs"
                >
                  {filter.key === "city" && <MapPin className="h-4 w-4 mr-1 text-[#4153a4]" />}
                  {filter.key === "area" && <Ruler className="h-4 w-4 mr-1 text-[#4153a4]" />}
                  {filter.key === "tenantType" && (
                    <TenantTypeIcon type={filter.value as any} className="h-4 w-4 mr-1 text-[#4153a4]" />
                  )}
                  <span className="text-gray-700">{filter.label}</span>
                  <button onClick={() => removeFilter(filter.key)} className="ml-1 text-[#4153a4] hover:text-[#2d3a7c]">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs de navigation */}
          <div className="border-b overflow-x-auto scrollbar-hide">
            <div className="flex min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 py-3 px-4 transition-colors whitespace-nowrap",
                    activeTab === tab.id ? "bg-[#4153a4] text-white" : "bg-white text-gray-700 hover:bg-gray-50",
                  )}
                >
                  {React.cloneElement(tab.icon, {
                    className: cn("h-5 w-5", activeTab === tab.id ? "text-white" : "text-gray-500"),
                  })}
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contenu des onglets */}
          <div ref={contentRef} className="flex-1 overflow-y-auto">
            {activeTab === "location" && (
              <div className="p-4 space-y-6">
                <h3 className="text-base font-medium text-gray-900 mb-3">Ville</h3>
                <div className="grid grid-cols-2 gap-3">
                  {cities.map((city) => (
                    <div
                      key={city.value}
                      className={cn(
                        "relative overflow-hidden rounded-lg cursor-pointer transition-all h-32",
                        filters.city === city.value ? "ring-2 ring-[#4153a4]" : "",
                      )}
                      onClick={() => setFilters((prev) => ({ ...prev, city: city.value, district: "" }))}
                    >
                      <div className="absolute inset-0 bg-gray-200">
                        <img
                          src={city.image || "/placeholder.svg"}
                          alt={city.label}
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 33vw"
                          onError={(e) => {
                            // Fallback to placeholder if image fails to load
                            const target = e.target as HTMLImageElement
                            target.src = "/vibrant-cityscape.png"
                          }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
                        <h4 className="text-lg font-bold">{city.label}</h4>
                        <p className="text-xs mt-1">
                          {city.districts.length} quartier{city.districts.length > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Section des quartiers - s'affiche uniquement quand une ville est sélectionnée */}
                {filters.city && (
                  <div className="mt-6">
                    <h3 className="text-base font-medium text-gray-900 mb-3">Quartier</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {cities
                        .find((c) => c.value === filters.city)
                        ?.districts.map((district) => {
                          // Calculer le nombre de propriétés pour ce quartier
                          const propertyCount = allProperties.filter(
                            (p) => p.city === filters.city && p.district === district.id,
                          ).length

                          return (
                            <button
                              key={district.id}
                              className={cn(
                                "flex items-center justify-between p-3 rounded-lg border transition-all",
                                filters.district === district.id
                                  ? "border-[#4153a4] bg-[#f5f7ff]"
                                  : "border-gray-200 hover:border-gray-300",
                              )}
                              onClick={() => setFilters((prev) => ({ ...prev, district: district.id }))}
                            >
                              <div className="flex items-center">
                                <div
                                  className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center mr-3",
                                    filters.district === district.id ? "bg-[#e0e5ff]" : "bg-gray-100",
                                  )}
                                >
                                  <MapPin
                                    className={cn(
                                      "h-4 w-4",
                                      filters.district === district.id ? "text-[#4153a4]" : "text-gray-500",
                                    )}
                                  />
                                </div>
                                <div className="flex flex-col items-start">
                                  <span className="text-sm">{district.name}</span>
                                  <span className="text-xs text-gray-500">
                                    {propertyCount} logement{propertyCount > 1 ? "s" : ""}
                                  </span>
                                </div>
                              </div>
                              {filters.district === district.id && (
                                <div className="h-2 w-2 rounded-full bg-[#4153a4]"></div>
                              )}
                            </button>
                          )
                        })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "property" && (
              <div className="p-4 space-y-6">
                <h3 className="text-base font-medium text-gray-900">Type de logement</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {propertyTypes.map((type) => (
                    <button
                      key={type.value}
                      className={cn(
                        "p-3 rounded-xl border transition-all",
                        filters.propertyType === type.value ? "border-indigo-600 bg-indigo-50" : "border-gray-200",
                      )}
                      onClick={() => setFilters((prev) => ({ ...prev, propertyType: type.value }))}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center",
                            filters.propertyType === type.value ? "bg-indigo-100" : "bg-gray-100",
                          )}
                        >
                          {React.cloneElement(type.icon, {
                            className: cn(
                              "h-4 w-4",
                              filters.propertyType === type.value ? "text-indigo-600" : "text-gray-500",
                            ),
                          })}
                        </div>
                        <span className="text-xs font-medium">{type.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "price" && (
              <div className="p-4 space-y-6">
                <h3 className="text-base font-medium text-gray-900">Fourchette de prix</h3>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Prix minimum</span>
                      <span className="text-lg font-semibold text-[#4153a4]">{filters.minPrice} MAD</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-500">Prix maximum</span>
                      <span className="text-lg font-semibold text-[#4153a4]">{filters.maxPrice} MAD</span>
                    </div>
                  </div>

                  {/* Histogramme simulé */}
                  <div className="mt-6 mb-2 h-16 flex items-end gap-[2px]">
                    {Array.from({ length: 50 }).map((_, i) => {
                      // Créer un histogramme avec une distribution normale centrée
                      const position = i / 50
                      const middle = 0.5
                      const distance = Math.abs(position - middle)
                      const height = Math.max(0.1, 1 - distance * 2.5 + Math.random() * 0.2)

                      // Déterminer si la barre est dans la plage sélectionnée
                      const barPosition = 500 + (i * (5000 - 500)) / 50
                      const isInRange = barPosition >= filters.minPrice && barPosition <= filters.maxPrice

                      return (
                        <div
                          key={i}
                          className={`w-full rounded-t-sm transition-all duration-300 ${
                            isInRange ? "bg-[#4153a4]" : "bg-gray-200"
                          }`}
                          style={{ height: `${height * 100}%` }}
                        />
                      )
                    })}
                  </div>

                  {/* Slider */}
                  <div className="mt-8 mb-6 px-1">
                    <Slider
                      value={[filters.minPrice, filters.maxPrice]}
                      min={500}
                      max={5000}
                      step={100}
                      onValueChange={handlePriceChange}
                      className="[&>.bg-primary]:bg-[#4153a4]"
                    />
                  </div>

                  {/* Inputs pour saisie directe */}
                  <div className="flex justify-between items-center mt-8">
                    <div className="relative w-24">
                      <input
                        type="number"
                        value={filters.minPrice}
                        onChange={(e) => {
                          const value = Math.max(500, Math.min(filters.maxPrice - 100, Number(e.target.value)))
                          handlePriceChange([value, filters.maxPrice])
                        }}
                        className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#4153a4] focus:border-[#4153a4] outline-none"
                        min={500}
                        max={filters.maxPrice - 100}
                      />
                      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                        MAD
                      </span>
                    </div>

                    <div className="flex items-center">
                      <div className="w-8 h-[2px] bg-gray-300"></div>
                    </div>

                    <div className="relative w-24">
                      <input
                        type="number"
                        value={filters.maxPrice}
                        onChange={(e) => {
                          const value = Math.min(5000, Math.max(filters.minPrice + 100, Number(e.target.value)))
                          handlePriceChange([filters.minPrice, value])
                        }}
                        className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#4153a4] focus:border-[#4153a4] outline-none"
                        min={filters.minPrice + 100}
                        max={5000}
                      />
                      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                        MAD
                      </span>
                    </div>
                  </div>

                  {/* Boutons de prix prédéfinis */}
                  <div className="mt-6">
                    <p className="text-xs text-gray-500 mb-2">Prix populaires</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { label: "< 1000 MAD", min: 500, max: 1000 },
                        { label: "1000-2000 MAD", min: 1000, max: 2000 },
                        { label: "2000-3000 MAD", min: 2000, max: 3000 },
                        { label: "> 3000 MAD", min: 3000, max: 5000 },
                      ].map((range) => (
                        <button
                          key={range.label}
                          onClick={() => handlePriceChange([range.min, range.max])}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                            filters.minPrice === range.min && filters.maxPrice === range.max
                              ? "bg-[#4153a4] text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                          )}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "rooms" && (
              <div className="p-4 space-y-6">
                <h3 className="text-base font-medium text-gray-900">Chambres</h3>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  {/* Sélection actuelle */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Sélection actuelle</span>
                      <span className="text-lg font-semibold text-[#4153a4]">
                        {filters.bedrooms === 0
                          ? "Toutes les chambres"
                          : `${filters.bedrooms} ${filters.bedrooms > 1 ? "chambres" : "chambre"}`}
                      </span>
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#f5f7ff] border border-[#e0e5ff]">
                      <BedDouble className="h-6 w-6 text-[#4153a4]" />
                    </div>
                  </div>

                  {/* Options de chambres */}
                  <div className="grid grid-cols-3 gap-3">
                    {bedroomOptions.map((option) => {
                      const isSelected = filters.bedrooms === option.value
                      return (
                        <motion.button
                          key={option.value}
                          onClick={() => handleBedroomsChange(option.value)}
                          className={cn(
                            "relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200",
                            isSelected
                              ? "border-[#4153a4] bg-[#f5f7ff] shadow-sm"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
                          )}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className={cn("text-xl font-bold", isSelected ? "text-[#4153a4]" : "text-gray-700")}>
                            {option.label}
                          </span>
                          <span className="text-xs text-gray-500 mt-1">{option.description}</span>
                          {isSelected && (
                            <motion.div
                              className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#4153a4]"
                              layoutId="bedroomIndicator"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </motion.button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "surface" && (
              <div className="p-4 space-y-6">
                <h3 className="text-base font-medium text-gray-900">Surface</h3>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  {/* Sélection actuelle */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Surface sélectionnée</span>
                      <span className="text-lg font-semibold text-gray-800">
                        {filters.minArea} - {filters.maxArea} m²
                      </span>
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                      <Ruler className="h-6 w-6 text-gray-600" />
                    </div>
                  </div>

                  {/* Catégories de surface avec visualisation */}
                  <div className="space-y-4">
                    {surfaceCategories.map((category) => {
                      const isSelected = filters.minArea === category.minArea && filters.maxArea === category.maxArea

                      return (
                        <motion.button
                          key={category.id}
                          onClick={() => handleSurfaceCategoryChange(category)}
                          className={cn(
                            "relative w-full flex items-center p-4 rounded-xl border transition-all duration-200",
                            isSelected ? `${category.activeColor} shadow-sm` : `${category.color} hover:bg-opacity-80`,
                          )}
                          whileTap={{ scale: 0.99 }}
                        >
                          <div className="flex-1 flex items-center">
                            <div
                              className={cn(
                                "flex items-center justify-center w-10 h-10 rounded-full mr-3",
                                isSelected ? "bg-white bg-opacity-30" : "bg-white bg-opacity-60",
                              )}
                            >
                              {React.cloneElement(category.icon, {
                                className: cn("h-5 w-5", isSelected ? "text-white" : category.iconColor),
                              })}
                            </div>
                            <div className="flex flex-col items-start">
                              <span className={cn("font-medium", isSelected ? "text-white" : "text-gray-800")}>
                                {category.name}
                              </span>
                              <span
                                className={cn("text-xs", isSelected ? "text-white text-opacity-80" : "text-gray-600")}
                              >
                                {category.minArea} - {category.maxArea} m² • {category.description}
                              </span>
                            </div>
                          </div>

                          {isSelected && (
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                              <Check className="h-4 w-4 text-green-600" />
                            </div>
                          )}

                          {/* Visualisation de la taille relative */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white bg-opacity-20">
                            <div
                              className="h-full bg-white bg-opacity-40"
                              style={{
                                width: `${Math.min(100, (category.maxArea / 200) * 100)}%`,
                              }}
                            />
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>

                  {/* Section pour surface personnalisée */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Surface personnalisée</h4>

                    <div className="flex justify-between items-center gap-4">
                      <div className="relative flex-1">
                        <input
                          type="number"
                          value={filters.minArea}
                          onChange={(e) => {
                            const value = Math.max(20, Math.min((filters.maxArea || 150) - 10, Number(e.target.value)))
                            handleCustomAreaChange(value, filters.maxArea || 150)
                          }}
                          className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none"
                          min={20}
                          max={(filters.maxArea || 150) - 10}
                        />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                          m²
                        </span>
                      </div>

                      <div className="flex-shrink-0 text-gray-400">à</div>

                      <div className="relative flex-1">
                        <input
                          type="number"
                          value={filters.maxArea}
                          onChange={(e) => {
                            const value = Math.min(200, Math.max((filters.minArea || 20) + 10, Number(e.target.value)))
                            handleCustomAreaChange(filters.minArea || 20, value)
                          }}
                          className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500 outline-none"
                          min={(filters.minArea || 20) + 10}
                          max={200}
                        />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                          m²
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "tenant" && (
              <div className="p-4 space-y-6">
                <h3 className="text-base font-medium text-gray-900">Type de locataire</h3>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  {/* Sélection actuelle */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Sélection actuelle</span>
                      <span className="text-lg font-semibold text-[#4153a4]">
                        {tenantTypes.find((t) => t.value === filters.tenantType)?.label || "Tous types"}
                      </span>
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#f5f7ff] border border-[#e0e5ff]">
                      <TenantTypeIcon type={filters.tenantType as any} className="h-6 w-6 text-[#4153a4]" size={24} />
                    </div>
                  </div>

                  {/* Options de types de locataires */}
                  <div className="grid grid-cols-2 gap-3">
                    {tenantTypes.map((option) => {
                      const isSelected = filters.tenantType === option.value
                      return (
                        <motion.button
                          key={option.value}
                          onClick={() => handleTenantTypeChange(option.value)}
                          className={cn(
                            "relative flex items-center p-4 rounded-xl border transition-all duration-200",
                            isSelected
                              ? "border-[#4153a4] bg-[#f5f7ff] shadow-sm"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
                          )}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div
                            className={cn(
                              "flex items-center justify-center w-10 h-10 rounded-full mr-3",
                              isSelected ? "bg-[#e0e5ff]" : "bg-gray-100",
                            )}
                          >
                            {React.cloneElement(option.icon, {
                              className: cn("h-5 w-5", isSelected ? "text-[#4153a4]" : "text-gray-500"),
                            })}
                          </div>
                          <div className="flex flex-col items-start">
                            <span className={cn("font-medium", isSelected ? "text-[#4153a4]" : "text-gray-700")}>
                              {option.label}
                            </span>
                          </div>
                          {isSelected && (
                            <motion.div
                              className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#4153a4]"
                              layoutId="tenantTypeIndicator"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </motion.button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "features" && (
              <div className="p-4 space-y-6">
                <h3 className="text-base font-medium text-gray-900">Caractéristiques</h3>

                {/* Onglets de catégories */}
                <div className="flex overflow-x-auto pb-2 mb-4 scrollbar-hide">
                  {featureCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveFeatureCategory(category.id)}
                      className={cn(
                        "px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full mr-2 transition-colors text-left",
                        activeFeatureCategory === category.id
                          ? "bg-[#4153a4] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                      )}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <div className="grid grid-cols-2 gap-3">
                    {featureCategories
                      .find((cat) => cat.id === activeFeatureCategory)
                      ?.features.map((feature) => {
                        const isSelected = filters.features?.includes(feature.id) || false
                        return (
                          <button
                            key={feature.id}
                            onClick={() => handleFeatureChange(feature.id)}
                            className={cn(
                              "flex items-center justify-start p-3 rounded-xl border transition-all",
                              isSelected
                                ? "border-[#4153a4] bg-[#f5f7ff]"
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
                            )}
                          >
                            <div
                              className={cn(
                                "flex items-center justify-center w-8 h-8 rounded-full mr-2 flex-shrink-0",
                                isSelected ? "bg-[#e0e5ff]" : "bg-gray-100",
                              )}
                            >
                              <feature.icon
                                className={cn("h-4 w-4", isSelected ? "text-[#4153a4]" : "text-gray-500")}
                              />
                            </div>
                            <span
                              className={cn(
                                "text-sm text-left",
                                isSelected ? "font-medium text-[#4153a4]" : "text-gray-700",
                              )}
                            >
                              {feature.label}
                            </span>
                            {isSelected && (
                              <div className="ml-auto flex-shrink-0">
                                <Check className="h-4 w-4 text-[#4153a4]" />
                              </div>
                            )}
                          </button>
                        )
                      })}
                  </div>
                </div>

                {/* Explication des caractéristiques */}
                <div className="mt-4 bg-gradient-to-r from-[#f5f7ff] to-[#eef1ff] p-5 rounded-lg border border-[#e0e5ff] shadow-sm">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3 mt-1">
                      <Settings className="h-5 w-5 text-[#4153a4]" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-medium text-[#2d3a7c] mb-1">Affinez votre recherche</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Les caractéristiques sélectionnées vous permettent de personnaliser votre recherche selon vos
                        critères essentiels. Chaque filtre appliqué vous rapproche du logement idéal correspondant à
                        votre style de vie.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Boutons d'annulation et d'application */}
          <div className="p-4 border-t flex justify-between">
            <button onClick={onClose} className="px-5 py-2 border border-gray-300 rounded-full text-gray-700 text-sm">
              Annuler
            </button>
            <button
              onClick={handleApply}
              disabled={!hasChanges}
              className={cn(
                "px-5 py-2 rounded-full transition-all text-sm font-medium",
                hasChanges
                  ? "bg-[#4153a4] hover:bg-[#2d3a7c] text-white"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed",
              )}
            >
              Appliquer les filtres
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
