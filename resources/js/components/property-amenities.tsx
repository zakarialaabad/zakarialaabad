import { AlertCircle } from "lucide-react"
import * as LucideIcons from "lucide-react"
interface Amenity {
  name: string
  icon: string
  category?: string
}

interface PropertyPreviewAmenitiesProps {
  amenities?: Amenity[]
  previewData?: any
}
export function PropertyAmenities({ amenities = [], previewData }: PropertyPreviewAmenitiesProps) {
  // Vérifier s'il y a des équipements à afficher (vérification stricte)
  const hasAmenities = Array.isArray(amenities) && amenities.filter((a) => a && a.name).length > 0

  // Fonction pour obtenir l'icône Lucide correspondante
  const getIcon = (iconName: string) => {
    // Récupérer l'icône depuis Lucide
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons]

    // Si l'icône existe, la retourner, sinon utiliser une icône par défaut
    if (Icon) {
      return <Icon className="h-4 w-4 mr-2 text-primary" />
    }

    // Icônes par défaut selon la catégorie
    switch (iconName) {
      case "Home":
        return <LucideIcons.Home className="h-4 w-4 mr-2 text-primary" />
      case "Building":
        return <LucideIcons.Building className="h-4 w-4 mr-2 text-primary" />
      case "MapPin":
        return <LucideIcons.MapPin className="h-4 w-4 mr-2 text-primary" />
      case "Wind":
        return <LucideIcons.Wind className="h-4 w-4 mr-2 text-primary" />
      case "Bath":
        return <LucideIcons.Bath className="h-4 w-4 mr-2 text-primary" />
      case "Droplets":
        return <LucideIcons.Droplets className="h-4 w-4 mr-2 text-primary" />
      case "Armchair":
        return <LucideIcons.Armchair className="h-4 w-4 mr-2 text-primary" />
      case "Flame":
        return <LucideIcons.Flame className="h-4 w-4 mr-2 text-primary" />
      case "Car":
        return <LucideIcons.Car className="h-4 w-4 mr-2 text-primary" />
      case "Lock":
        return <LucideIcons.Lock className="h-4 w-4 mr-2 text-primary" />
      case "Flower2":
        return <LucideIcons.Flower2 className="h-4 w-4 mr-2 text-primary" />
      case "Sun":
        return <LucideIcons.Sun className="h-4 w-4 mr-2 text-primary" />
      case "Mosque":
        return <LucideIcons.Landmark className="h-4 w-4 mr-2 text-primary" />
      case "School":
        return <LucideIcons.GraduationCap className="h-4 w-4 mr-2 text-primary" />
      case "BookOpen":
        return <LucideIcons.BookOpen className="h-4 w-4 mr-2 text-primary" />
      case "ShoppingCart":
        return <LucideIcons.ShoppingCart className="h-4 w-4 mr-2 text-primary" />
      case "Pill":
        return <LucideIcons.Pill className="h-4 w-4 mr-2 text-primary" />
      case "Bus":
        return <LucideIcons.Bus className="h-4 w-4 mr-2 text-primary" />
      case "ShoppingBag":
        return <LucideIcons.ShoppingBag className="h-4 w-4 mr-2 text-primary" />
      default:
        return <LucideIcons.CircleDot className="h-4 w-4 mr-2 text-primary" />
    }
  }

  // Regrouper les caractéristiques par catégorie
  const amenitiesByCategory: Record<string, Amenity[]> = {}

  if (Array.isArray(amenities)) {
    amenities.forEach((amenity) => {
      if (amenity && amenity.name) {
        const category = amenity.category || "Général"
        if (!amenitiesByCategory[category]) {
          amenitiesByCategory[category] = []
        }
        amenitiesByCategory[category].push(amenity)
      }
    })
  }

  // Console log pour débogage
  console.log("Amenities:", amenities)
  console.log("Has amenities:", hasAmenities)
  console.log("Amenities by category:", amenitiesByCategory)

  return (
    <div className="space-y-8" role="region" aria-labelledby="amenities-heading">
      <h3 id="amenities-heading" className="text-xl font-medium text-gray-900 mb-6">
        Caractéristiques
      </h3>

      {!hasAmenities ? (
        // Message indiquant qu'aucun équipement n'est sélectionné
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
          <AlertCircle className="h-10 w-10 text-amber-500 mx-auto mb-3" />
          <p className="text-gray-700 font-medium">Aucune caractéristique sélectionnée</p>
          <p className="text-sm text-gray-500 mt-2">
            Les caractéristiques que vous sélectionnerez dans l'étape "Équipements" apparaîtront ici.
          </p>
        </div>
      ) : (
        // Afficher uniquement les équipements sélectionnés, regroupés par catégorie
        <div className="space-y-6">
          {Object.entries(amenitiesByCategory).map(([category, categoryAmenities]) => (
            <div key={category} className="space-y-3">
              <h4 className="font-medium text-gray-800">{category}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {categoryAmenities.map((amenity, index) => (
                  <div
                    key={`${category}-${index}`}
                    className="flex items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200"
                  >
                    {getIcon(amenity.icon)}
                    <span className="text-sm text-gray-700">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
