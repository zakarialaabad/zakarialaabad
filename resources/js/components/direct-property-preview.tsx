
import { useFormContext } from "react-hook-form"
import { Badge } from "@/components/ui/badge"
import {
  Bed,
  Bath,
  MapPin,
  Heart,
  Star,
  Square,
  RefreshCw,
  Home,
  Building,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { router } from "@inertiajs/react"
import { useState, useEffect } from "react"
type PreviewFields =
| "title"
| "description"
| "propertyType"
| "tenantType"
| "city"
| "district"
| "address"
| "area"
| "bedrooms"
| "bathrooms"
| "images"
| "price";
interface DirectPropertyPreviewProps {
  activeField?: PreviewFields | null;
  currentStep?: number;
  formAmenities?: {
    interior: string[];
    exterior: string[];
    proximity: string[];
  };
  useFormData?: boolean;
}
// Mappages des types avec leurs icônes simplifiés
const propertyTypeIcons = {
  apartment: <Building className="h-4 w-4 mr-1" />,
  villa: <Building className="h-4 w-4 mr-1" />,
  house: <Home className="h-4 w-4 mr-1" />,
  studio: <Building className="h-4 w-4 mr-1" />,
  bureau: <Building className="h-4 w-4 mr-1" />,
  magasin: <Building className="h-4 w-4 mr-1" />,
  depot: <Building className="h-4 w-4 mr-1" />,
  garage: <Building className="h-4 w-4 mr-1" />,
  boutique: <Building className="h-4 w-4 mr-1" />,
}

// Mappages des types
const getPropertyTypeLabel = (type: string) => {
  const typeMap: { [key: string]: string } = {
    apartment: "Appartement",
    villa: "Villa",
    house: "Maison",
    studio: "Studio",
    office: "Bureau",
    store: "Magasin",
    warehouse: "Dépôt",
    garage: "Garage",
    shop: "Boutique",
  }
  return typeMap[type] || type
}
const getTenantTypeLabel = (type:string) => {
  const typeMap: { [key: string]: string } = {
    all: "Tout",
    family: "Famille",
    marei: "Marié",
    student: "Étudiant",
    single: "Célibataire",
    government: "Fonctionnaire",
  }
  return typeMap[type] || type
}

// Mapping des champs du formulaire aux sections de la prévisualisation
const fieldToPreviewSection = {
  title: "title",
  description: "description",
  propertyType: "propertyType",
  tenantType: "tenantType",
  city: "location",
  district: "location",
  address: "location",
  bedrooms: "features",
  bathrooms: "features",
  area: "features",
  price: "price",
  images: "images",
}

export function DirectPropertyPreview({ activeField, currentStep = 1 }:DirectPropertyPreviewProps) {
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Utiliser useFormContext pour accéder au contexte du formulaire
  const { watch } = useFormContext()

  // Observer tous les champs du formulaire
  const title = watch("title")
  const description = watch("description")
  const tenantType = watch("tenantType")
  const city = watch("city")
  const district = watch("district")
  const address = watch("address")
  const bedrooms = watch("bedrooms")
  const bathrooms = watch("bathrooms")
  const area = watch("area")
  const price = watch("price")
  const images = watch("images") || []

  // Mettre à jour la section en surbrillance en fonction du champ actif
  useEffect(() => {
    if (activeField && fieldToPreviewSection[activeField]) {
      setHighlightedSection(fieldToPreviewSection[activeField])
    } else {
      setHighlightedSection(null)
    }
  }, [activeField])

  // Effet pour mettre à jour la prévisualisation lorsque l'étape change
  useEffect(() => {
    // Forcer une mise à jour de la prévisualisation
    console.log("Étape actuelle:", currentStep)

    // Mettre en évidence brièvement la prévisualisation pour indiquer la mise à jour
    setHighlightedSection("all")
    setTimeout(() => {
      setHighlightedSection(null)
    }, 1000)
  }, [currentStep])

  // Reset current image index when images change
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [images.length])

  // Valeurs par défaut pour la prévisualisation
  const defaultTitle = "Titre de votre annonce"
  const defaultCity = "Casablanca"
  const defaultBedrooms = 1
  const defaultBathrooms = 1
  const defaultArea = 50
  const defaultPrice = 1500

  // Function to get step name based on current step
  const getStepName = (step:number):string => {
    switch (step) {
      case 1:
        return "Informations de base"
      case 2:
        return "Localisation"
      case 3:
        return "Caractéristiques"
      case 4:
        return "Photos"
      case 5:
        return "Prix et disponibilité"
      case 6:
        return "Équipements"
      case 7:
        return "Règles"
      case 8:
        return "Informations propriétaire"
      default:
        return "Étape"
    }
  }

  // Navigation functions for image carousel
  const goToNextImage = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }
  }

  const goToPrevImage = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation() // Prevent triggering the parent onClick
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }
  }

  // Helper function to create a smaller version of the image URL
  const getReducedImageUrl = (imageUrl: string): string | null => {
    if (!imageUrl) return null

    // For data URLs, we'll create a reduced version
    if (imageUrl.startsWith("data:image")) {
      // Use a placeholder URL instead of the full data URL
      return "/placeholder.svg?text=Image+Preview"
    }

    return imageUrl
  }

  // Fonction pour naviguer vers la page de détails de prévisualisation
  const navigateToPreviewDetails = () => {
    try {
      // Create a minimal data object without images
      const baseData = {
        title: title || defaultTitle,
        description: description
          ? description.length > 500
            ? description.substring(0, 500) + "..."
            : description
          : "",
        propertyType,
        tenantType,
        city: city || defaultCity,
        district,
        address,
        bedrooms: bedrooms || defaultBedrooms,
        bathrooms: bathrooms || defaultBathrooms,
        area: area || defaultArea,
        price: price || defaultPrice,
        currentStep: currentStep,
        hasImages: images && images.length > 0,
      }

      // Store the basic data
      localStorage.setItem("propertyPreviewData", JSON.stringify(baseData))

      // Store only image metadata and indices, not the actual image data
      if (images && images.length > 0) {
        // Store the number of images
        localStorage.setItem("propertyPreviewImageCount", String(images.length))

        // Store image indices in a global window variable that will be accessible
        // from the preview page (this avoids localStorage quota issues)
        if (typeof window !== "undefined") {
          // @ts-ignore - Adding a custom property to window
          window.propertyPreviewImages = images
        }
      }

      // Navigate to preview page
      router.visit("/property/preview")
    } catch (error) {
      console.error("Error navigating to preview:", error)

      // Fallback with minimal data
      try {
        const minimalData = {
          title: title || defaultTitle,
          city: city || defaultCity,
          price: price || defaultPrice,
          currentStep: currentStep,
        }
        localStorage.setItem("propertyPreviewData", JSON.stringify(minimalData))
        router.visit("/property/preview")
      } catch (fallbackError) {
        console.error("Fallback navigation failed:", fallbackError)
        alert(
          "Impossible d'accéder à la prévisualisation. Veuillez réessayer avec moins d'images ou des images plus petites.",
        )
      }
    }
  }

  // Fonction pour générer la classe CSS en fonction de la section en surbrillance
  const getHighlightClass = (section:string) => {
    if (highlightedSection === "all") {
      return "bg-blue-50 border-blue-300 shadow-md transition-all duration-300"
    }
    if (highlightedSection === section) {
      return "bg-blue-50 border-blue-300 shadow-md transition-all duration-300"
    }
    return ""
  }
  type PropertyTypeKey = keyof typeof propertyTypeIcons; // هذا النوع = المفاتيح الموجودة في propertyTypeIcons

  const propertyType = watch("propertyType") as PropertyTypeKey | undefined;
  return (
    <div className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white">
        <h3 className="font-bold text-xl">Prévisualisation de l'annonce</h3>
        {/* Ajouter ceci après le titre de la prévisualisation */}
        <div className="flex items-center justify-center mt-1">
          <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Étape {currentStep} sur {5} {/* Remplacez 5 par totalSteps si vous le passez en prop */}
          </div>
        </div>
        <p className="text-blue-100 text-sm">Voici comment votre annonce apparaîtra aux locataires</p>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-md transition-all duration-300">
        {/* Image principale avec carousel */}
        <div
          className={`relative w-full h-64 overflow-hidden cursor-pointer ${getHighlightClass("images")}`}
          onClick={navigateToPreviewDetails}
        >
          {images && images.length > 0 && images[currentImageIndex]?.preview ? (
            <div className="w-full h-full group">
              {/* Current image */}
              <img
                      src={images[currentImageIndex]?.preview || "/placeholder.svg?text=Image+Preview"}
                      alt={`Photo ${currentImageIndex + 1}`}
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />


              {/* Indicateur de prévisualisation */}
              {images[currentImageIndex]?.preview?.includes("blob:") && (
                <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-md z-10">
                  Image sélectionnée
                </div>
              )}

              {/* Overlay subtil au survol */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>

              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={goToPrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5 transition-all"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={goToNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5 transition-all"
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute top-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded-md">
                {currentImageIndex + 1}/{images.length}
              </div>

              {/* Navigation dots */}
              {images.length > 1 && (
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                  {images.map((_:string, index:number) => (
                    <button
                      key={index}
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation()
                        setCurrentImageIndex(index)
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? "bg-white scale-125" : "bg-white/60 hover:bg-white/80"
                      }`}
                      aria-label={`Image ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Highlight overlay */}
              {highlightedSection === "images" && (
                <div className="absolute inset-0 bg-blue-500 bg-opacity-10 flex items-center justify-center">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Images sélectionnées
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center p-4">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="mt-2 text-sm text-gray-500">Ajoutez des photos pour visualiser votre annonce</p>
                <p className="mt-1 text-xs text-blue-500">
                  Étape actuelle: {currentStep} - {getStepName(currentStep)}
                </p>
              </div>
            </div>
          )}

          {/* Badge du type de bien */}
          <div className={`absolute bottom-3 left-3 z-20 flex flex-wrap gap-1.5 ${getHighlightClass("propertyType")}`}>
            <Badge className="bg-white/90 backdrop-blur-sm font-medium px-2.5 py-1 flex items-center">
              {propertyType && propertyTypeIcons[propertyType] ? (
                propertyTypeIcons[propertyType]
              ) : (
                <Home className="h-4 w-4 mr-1" />
              )}
              {propertyType ? getPropertyTypeLabel(propertyType) : "Propriété"}
            </Badge>

            <Badge className="bg-blue-100/90 text-blue-700 backdrop-blur-sm font-medium px-2.5 py-1 flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {tenantType && tenantType !== "all" ? `Pour ${getTenantTypeLabel(tenantType)}` : "Pour tous"}
            </Badge>
          </div>

          {/* Bouton favori (simulé) */}
          <div className="absolute right-3 top-3 z-20">
            <div className="h-9 w-9 rounded-full backdrop-blur-sm shadow-sm bg-white/90 flex items-center justify-center">
              <Heart className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Message d'information sur la mise à jour automatique */}
        <div className="mb-3 bg-blue-50 p-2 rounded-md border border-blue-100">
          <div className="flex items-center text-xs text-blue-700 font-medium mb-1">
            <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
            <span>Mise à jour instantanée</span>
          </div>
          <p className="text-xs text-blue-600">
            {activeField ? (
              <span>
                Vous modifiez actuellement: <strong>{activeField}</strong>
              </span>
            ) : (
              <span>
                Chaque information saisie dans le formulaire s'affiche immédiatement dans cette prévisualisation.
              </span>
            )}
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          {/* Titre et évaluation */}
          <div className={`flex justify-between items-start ${getHighlightClass("title")}`}>
            <h3 className="font-medium text-gray-900 line-clamp-1">
              {title || (highlightedSection === "title" ? "Saisissez le titre ici..." : defaultTitle)}
            </h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
              <span className="text-sm font-medium text-gray-600">4.8</span>
            </div>
          </div>

          {/* Localisation */}
          <p className={`text-sm text-gray-500 flex items-center ${getHighlightClass("location")}`}>
            <MapPin className="mr-1 h-4 w-4 inline text-gray-400 flex-shrink-0" />
            <span className="truncate">
              {district && district !== "no-district"
                ? `${district.replace(/-/g, " ").replace(/\b\w/g, (l:string) => l.toUpperCase())}, ${city || defaultCity}`
                : city || (highlightedSection === "location" ? "Saisissez la ville ici..." : defaultCity)}
            </span>
          </p>

          {/* Adresse */}
          {(address || highlightedSection === "location") && (
            <p className={`text-xs text-gray-500 flex items-center ${getHighlightClass("location")}`}>
              <span className="truncate">
                {address || (highlightedSection === "location" ? "Saisissez l'adresse ici..." : "")}
              </span>
            </p>
          )}

          {/* Caractéristiques principales */}
          <div className={`flex items-center gap-3 text-sm text-gray-600 pt-1 ${getHighlightClass("features")}`}>
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1 text-gray-400" />
              <span>
                {bedrooms || (highlightedSection === "features" ? "?" : defaultBedrooms)}{" "}
                {(bedrooms || defaultBedrooms) > 1 ? "chambres" : "chambre"}
              </span>
            </div>

            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1 text-gray-400" />
              <span>
                {bathrooms || (highlightedSection === "features" ? "?" : defaultBathrooms)}{" "}
                {(bathrooms || defaultBathrooms) > 1 ? "SdB" : "SdB"}
              </span>
            </div>

            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1 text-gray-400" />
              <span>{area || (highlightedSection === "features" ? "?" : defaultArea)} m²</span>
            </div>
          </div>

          {/* Propriétaire et prix */}
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0 w-8 h-8 relative rounded-full overflow-hidden border border-gray-200 bg-gray-100">
                <img src="/diverse-group.png" alt="Propriétaire"  className="object-cover w-full h-full" sizes="32px" />
              </div>
              <span className="text-xs text-gray-500 truncate max-w-[100px]">Vous</span>
            </div>
            <div className={`text-gray-900 font-bold text-lg ${getHighlightClass("price")}`}>
              {price || (highlightedSection === "price" ? "?" : defaultPrice)}{" "}
              <span className="text-sm font-medium text-gray-500">MAD/mois</span>
            </div>
          </div>
        </div>
      </div>

      {/* Note de prévisualisation */}
      <div className="mx-4 mb-4 bg-blue-50 rounded-lg p-3 text-sm text-blue-600">
        <p className="font-medium">Astuce:</p>
        <p>
          Cliquez sur un champ du formulaire pour voir la section correspondante mise en évidence dans la
          prévisualisation.
        </p>
      </div>
    </div>
  )
}
