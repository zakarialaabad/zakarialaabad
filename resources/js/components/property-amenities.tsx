import {
  Car,
  UtensilsCrossed,
  Bath,
  Wind,
  Lock,
  Home,
  Building,
  MapPin,
  Ruler,
  Droplets,
  ChurchIcon as Mosque,
  School,
  BookOpen,
  GraduationCap,
  ShoppingBag,
  Pill,
  Flower2,
  Waves,
  Armchair,
  Zap,
  Coffee,
  Bus,
  Store,
  ShoppingCart,
  Dumbbell,
  ShowerHeadIcon as SwimmingPool,
  Trees,
  Sun,
  Flame,
  type LucideIcon,
} from "lucide-react"

interface Amenity {
  name: string
  icon: string
  category?: string
}

interface PropertyAmenitiesProps {
  amenities: Amenity[]
}

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  // Mapping des noms d'icônes aux composants Lucide
  const iconMap: Record<string, LucideIcon> = {
    Car: Car,
    UtensilsCrossed: UtensilsCrossed,
    Bath: Bath,
    Wind: Wind,
    Lock: Lock,
    Home: Home,
    Building: Building,
    MapPin: MapPin,
    Ruler: Ruler,
    Droplets: Droplets,
    Mosque: Mosque,
    School: School,
    BookOpen: BookOpen,
    GraduationCap: GraduationCap,
    ShoppingBag: ShoppingBag,
    Pill: Pill,
    Flower2: Flower2,
    Waves: Waves,
    Armchair: Armchair,
    Zap: Zap,
    Coffee: Coffee,
    Bus: Bus,
    Store: Store,
    ShoppingCart: ShoppingCart,
    Dumbbell: Dumbbell,
    SwimmingPool: SwimmingPool,
    Trees: Trees,
    Sun: Sun,
    Flame: Flame,
  }

  // Regrouper les caractéristiques par catégorie
  const categorizedAmenities = amenities.reduce(
    (acc, amenity) => {
      const category = amenity.category || "Général"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(amenity)
      return acc
    },
    {} as Record<string, Amenity[]>,
  )

  // Ordre des catégories
  const categoryOrder = ["Général", "Intérieur", "Extérieur", "À proximité"]

  // Trier les catégories selon l'ordre défini
  const sortedCategories = Object.keys(categorizedAmenities).sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b),
  )

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Caractéristiques</h3>

      {sortedCategories.map((category) => (
        <div key={category} className="space-y-3">
          <h4 className="font-medium text-gray-800">{category}</h4>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {categorizedAmenities[category].map((amenity, index) => {
              const IconComponent = iconMap[amenity.icon] || Home
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-gray-700">{amenity.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      <div className="mt-6 rounded-lg bg-gray-50 p-4">
        <p className="text-sm text-gray-600">
          Toutes les caractéristiques listées ont été vérifiées par notre équipe. Si vous avez des questions spécifiques
          concernant certaines caractéristiques, n'hésitez pas à contacter le propriétaire.
        </p>
      </div>
    </div>
  )
}
