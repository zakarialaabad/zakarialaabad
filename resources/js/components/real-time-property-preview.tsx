"use client"
import { ReactNode } from "react"

import { useFormContext, useWatch } from "react-hook-form"
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
  Castle,
  Hotel,
  Briefcase,
  Store,
  Warehouse,
  Car,
  ShoppingBag,
  Users,
  GraduationCap,
  User,
} from "lucide-react"
import { useState, useEffect } from "react"
import { router } from "@inertiajs/react"
// Fonctions utilitaires
const truncateText = (text:string, maxLength:number) => {
  if (!text) return ""
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
}

// ✅ نوع صورة واحدة
type ImageType = {
  preview?: string
}

// ✅ نوع بيانات العقار
type PropertyPreview = {
  title: string
  description: string
  propertyType: string
  tenantType: string
  city: string
  district: string
  bedrooms: number
  bathrooms: number
  area: number
  maxGuests: number
  price: number
  availableFrom: Date
  minimumStay: number
  images: ImageType[]
  address: string

}
// Mappages des types avec leurs icônes
// ✅ أيقونات نوع العقار
const propertyTypeIcons: { [key: string]: ReactNode } = {
  apartment: <Building className="h-4 w-4 mr-1" />,
  villa: <Castle className="h-4 w-4 mr-1" />,
  house: <Home className="h-4 w-4 mr-1" />,
  studio: <Hotel className="h-4 w-4 mr-1" />,
  office: <Briefcase className="h-4 w-4 mr-1" />,
  store: <Store className="h-4 w-4 mr-1" />,
  warehouse: <Warehouse className="h-4 w-4 mr-1" />,
  garage: <Car className="h-4 w-4 mr-1" />,
  shop: <ShoppingBag className="h-4 w-4 mr-1" />,
}

const tenantTypeIcons : { [key: string]: ReactNode }  = {
  all: <Users className="h-4 w-4 mr-1" />,
  family: <Users className="h-4 w-4 mr-1" />,
  married: <Users className="h-4 w-4 mr-1" />,
  student: <GraduationCap className="h-4 w-4 mr-1" />,
  single: <User className="h-4 w-4 mr-1" />,
  government: <Briefcase className="h-4 w-4 mr-1" />,
}

// ✅ أسماء نوع العقار
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

const getTenantTypeLabel = (type: string) => {
  const typeMap: { [key: string]: string } = {
    all: "Tout",
    family: "Famille",
    married: "Marié",
    student: "Étudiant",
    single: "Célibataire",
    government: "Fonctionnaire",
  }
  return typeMap[type] || type
}

export function RealTimePropertyPreview() {
  const [highlightedField, setHighlightedField] = useState<string | null>(null)
  const [previousValues, setPreviousValues] = useState<Partial<PropertyPreview>>({})

  // Utiliser useFormContext pour accéder au contexte du formulaire
  const formContext = useFormContext()

  if (!formContext) {
    return <div>Chargement de la prévisualisation...</div>
  }

  // Utiliser useWatch pour observer tous les champs du formulaire en temps réel
  const formValues = useWatch<Partial<PropertyPreview>>({ control: formContext.control })

  // Valeurs par défaut pour la prévisualisation
  const defaultValues = {
    title: "Titre de votre annonce",
    description: "Description de votre bien immobilier...",
    propertyType: "apartment",
    tenantType: "all",
    city: "",
    district: "maarif",
    bedrooms: 1,
    bathrooms: 1,
    area: 50,
    maxGuests: 2,
    price: 1500,
    availableFrom: new Date(),
    minimumStay: 1,
    images: [],
    address: "" // ✅ أضف هذه السطر

  }

  // Fusionner les valeurs par défaut avec les valeurs du formulaire
  const previewData: PropertyPreview = {
    ...defaultValues,
    ...formValues,
  }
  // Détecter les changements pour les animations
  useEffect(() => {
    if (!formValues) return

    // Trouver le champ qui a changé
    const changedField = (Object.keys(formValues) as (keyof PropertyPreview)[]).find(
      (key) => JSON.stringify(formValues[key]) !== JSON.stringify(previousValues[key]),
    )
    

    if (changedField) {
      setHighlightedField(changedField)

      // Réinitialiser après un délai
      const timer = setTimeout(() => {
        setHighlightedField(null)
      }, 1500)

      // Mettre à jour les valeurs précédentes
      setPreviousValues({ ...formValues })

      return () => clearTimeout(timer)
    }
  }, [formValues, previousValues])

  // Fonction pour naviguer vers la page de détails de prévisualisation
  const navigateToPreviewDetails = () => {
    // Sauvegarder les données de prévisualisation dans le localStorage
    localStorage.setItem("propertyPreviewData", JSON.stringify(previewData))
    // Naviguer vers la page de détails de prévisualisation
    router.visit("/property/preview")
  }

  // Fonction pour déterminer si un champ doit être mis en évidence
  const shouldHighlight = (fieldName:string) => {
    return highlightedField === fieldName
  }

  // Classe CSS pour les éléments mis en évidence
  const getHighlightClass = (fieldName:string) => {
    return shouldHighlight(fieldName) ? "text-blue-600 transition-colors duration-500" : ""
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white">
        <h3 className="font-bold text-xl">Prévisualisation de l'annonce</h3>
        <p className="text-blue-100 text-sm">Voici comment votre annonce apparaîtra aux locataires</p>
      </div>

      <div className="p-0">
        {/* Image principale */}
        <div className="relative w-full h-64 overflow-hidden cursor-pointer" onClick={navigateToPreviewDetails}>
  {previewData.images && previewData.images.length > 0 && previewData.images[0]?.preview ? (
    <div className={`w-full h-full ${shouldHighlight("images") ? "ring-4 ring-blue-400 ring-opacity-50" : ""}`}>
      <img
        src={previewData.images[0].preview || "/placeholder.svg"}
        alt="Photo principale"
        className="object-cover w-full h-full"
      />
    </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 cursor-pointer">
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
              </div>
            </div>
          )}

          {/* Badge du type de bien */}
          <div className="absolute bottom-3 left-3 z-20 flex flex-wrap gap-1.5">
            <div className={shouldHighlight("propertyType") ? "ring-2 ring-blue-400 rounded-md" : ""}>
              <Badge className="bg-white/90 backdrop-blur-sm font-medium px-2.5 py-1 flex items-center">
                {propertyTypeIcons[previewData.propertyType] || <Home className="h-4 w-4 mr-1" />}
                {getPropertyTypeLabel(previewData.propertyType)}
              </Badge>
            </div>

            {previewData.tenantType && previewData.tenantType !== "all" && (
              <div className={shouldHighlight("tenantType") ? "ring-2 ring-blue-400 rounded-md" : ""}>
                <Badge className="bg-blue-100/90 text-blue-700 backdrop-blur-sm font-medium px-2.5 py-1 flex items-center">
                  {tenantTypeIcons[previewData.tenantType] || <Users className="h-4 w-4 mr-1" />}
                  Pour {getTenantTypeLabel(previewData.tenantType)}
                </Badge>
              </div>
            )}
          </div>

          {/* Bouton favori (simulé) */}
          <div className="absolute right-3 top-3 z-20">
            <div className="h-9 w-9 rounded-full backdrop-blur-sm shadow-sm bg-white/90 flex items-center justify-center">
              <Heart className="h-5 w-5 text-gray-500" />
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
              Chaque information saisie dans le formulaire s'affiche immédiatement dans cette prévisualisation,
              <strong> sans attendre de cliquer sur "Suivant"</strong>.
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            {/* Titre et évaluation */}
            <div className="flex justify-between items-start">
              <h3 className={`font-medium text-gray-900 line-clamp-1 ${getHighlightClass("title")}`}>
                {truncateText(previewData.title || defaultValues.title, 40)}
              </h3>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                <span className="text-sm font-medium text-gray-600">4.8</span>
              </div>
            </div>

            {/* Localisation */}
            <p
              className={`text-sm text-gray-500 flex items-center ${getHighlightClass("city")} ${getHighlightClass("district")}`}
            >
              <MapPin className="mr-1 h-4 w-4 inline text-gray-400 flex-shrink-0" />
              <span className="truncate">
                {previewData.district && previewData.district !== "no-district"
                  ? `${previewData.district.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}, ${previewData.city || defaultValues.city}`
                  : previewData.city || defaultValues.city}
              </span>
            </p>

            {/* Adresse */}
            {previewData.address && (
              <p className={`text-xs text-gray-500 flex items-center ${getHighlightClass("address")}`}>
                <span className="truncate">{previewData.address}</span>
              </p>
            )}

            {/* Caractéristiques principales */}
            <div className="flex items-center gap-3 text-sm text-gray-600 pt-1">
              <div className={`flex items-center ${getHighlightClass("bedrooms")}`}>
                <Bed className="h-4 w-4 mr-1 text-gray-400" />
                <span>
                  {previewData.bedrooms} {previewData.bedrooms > 1 ? "chambres" : "chambre"}
                </span>
              </div>

              <div className={`flex items-center ${getHighlightClass("bathrooms")}`}>
                <Bath className="h-4 w-4 mr-1 text-gray-400" />
                <span>
                  {previewData.bathrooms} {previewData.bathrooms > 1 ? "SdB" : "SdB"}
                </span>
              </div>

              <div className={`flex items-center ${getHighlightClass("area")}`}>
                <Square className="h-4 w-4 mr-1 text-gray-400" />
                <span>{previewData.area} m²</span>
              </div>
            </div>

            {/* Propriétaire et prix */}
            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 w-8 h-8 relative rounded-full overflow-hidden border border-gray-200 bg-gray-100">
                  <img src="/diverse-group.png" alt="Propriétaire"         className="object-cover w-full h-full" sizes="32px" />
                </div>
                <span className="text-xs text-gray-500 truncate max-w-[100px]">Vous</span>
              </div>
              <div className={`text-gray-900 font-bold text-lg ${getHighlightClass("price")}`}>
                {previewData.price || defaultValues.price}{" "}
                <span className="text-sm font-medium text-gray-500">MAD/mois</span>
              </div>
            </div>
          </div>
        </div>

        {/* Note de prévisualisation */}
        <div className="mx-4 mb-4 bg-blue-50 rounded-lg p-3 text-sm text-blue-600">
          <p className="font-medium">Note:</p>
          <p>Cliquez sur l'image pour voir la prévisualisation complète de votre annonce.</p>
        </div>
      </div>
    </div>
  )
}
