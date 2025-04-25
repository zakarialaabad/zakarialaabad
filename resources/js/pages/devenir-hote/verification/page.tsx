"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Upload,
  Check,
  FileText,
  CreditCard,
  Home,
  Building,
  Hotel,
  Castle,
  Warehouse,
  BriefcaseIcon,
  Bed,
  Wind,
  Bath,
  Droplets,
  Armchair,
  Zap,
  Flower2,
  Car,
  Trees,
  ShowerHeadIcon as SwimmingPool,
  Lock,
  Trash2,
  ChurchIcon as Mosque,
  Footprints,
  School,
  BookOpen,
  GraduationCap,
  Pill,
  ShoppingBag,
  Waves,
  Utensils,
  Coffee,
  ShoppingCart,
  Bus,
  Dumbbell,
  Store,
  Settings,
  Users,
  Heart,
  User,
  Briefcase,
  SquareIcon,
  Banknote,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation" // Importation de useRouter au lieu de redirect

export default function VerificationPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter() // Utilisation de useRouter pour les redirections côté client
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedFiles, setUploadedFiles] = useState({
    identity: false,
    electricity: false,
    property: false,
  })
  const [propertyType, setPropertyType] = useState<string | null>(null)
  const [roomCount, setRoomCount] = useState<number | null>(null)
  const [tenantType, setTenantType] = useState<string | null>(null)
  const [propertyImages, setPropertyImages] = useState<File[]>([])
  const [requiredImagesCount, setRequiredImagesCount] = useState(5)
  const [amenities, setAmenities] = useState<string[]>([])
  const [surfaceRange, setSurfaceRange] = useState<string | null>(null)
  const [pricePerMonth, setPricePerMonth] = useState<number | null>(null)
  const [minSurface, setMinSurface] = useState<number | null>(null)
  const [maxSurface, setMaxSurface] = useState<number | null>(null)

  // Redirection si non authentifié
  if (!isAuthenticated) {
    // Utiliser router.push au lieu de redirect
    router.push("/devenir-hote")
    return null // Retourner null pour éviter de rendre le composant pendant la redirection
  }

  const handleNextStep = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      // Utiliser router.push au lieu de redirect pour la redirection finale
      router.push("/devenir-hote/success")
    }
  }

  const handleFileUpload = (type: "identity" | "electricity" | "property") => {
    setUploadedFiles((prev) => ({
      ...prev,
      [type]: true,
    }))
  }

  const toggleAmenity = (amenity: string) => {
    setAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files)
      setPropertyImages((prev) => [...prev, ...newImages])

      // Décrémenter le compteur d'images requises
      const remaining = Math.max(0, requiredImagesCount - newImages.length)
      setRequiredImagesCount(remaining)
    }
  }

  const isStepComplete = () => {
    if (currentStep === 1) return propertyType !== null
    if (currentStep === 2) {
      // Si le type de logement est bureau, ferme ou studio, l'étape des chambres est optionnelle
      if (propertyType === "bureau" || propertyType === "ferme" || propertyType === "studio") {
        return true
      }
      return roomCount !== null // Sinon, vérifier que le nombre de chambres est sélectionné
    }
    if (currentStep === 3) return tenantType !== null
    if (currentStep === 4) return propertyImages.length >= 5 // Au moins 5 images requises
    if (currentStep === 5) return (surfaceRange !== null || (minSurface && maxSurface)) && pricePerMonth !== null
    if (currentStep === 6) return uploadedFiles.identity
    if (currentStep === 7) return uploadedFiles.electricity
    if (currentStep === 8) return uploadedFiles.property
    return false
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="mb-6">
              <Link href="/devenir-hote" className="inline-flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Link>
            </div>

            <motion.h1
              className="text-3xl font-bold mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Vérification de votre propriété
            </motion.h1>
            <motion.p
              className="text-gray-600 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Pour garantir la sécurité de notre plateforme, nous avons besoin de vérifier votre identité et votre
              propriété.
            </motion.p>

            {/* Indicateur d'étapes */}
            <div className="flex justify-between mb-12">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  1
                </div>
                <span className="text-xs mt-1">Type</span>
              </div>
              <div className="flex-1 flex items-center">
                <div className={`h-1 w-full ${currentStep >= 2 ? "bg-primary" : "bg-gray-200"}`}></div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= 2 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  2
                </div>
                <span className="text-xs mt-1">Chambres</span>
              </div>
              <div className="flex-1 flex items-center">
                <div className={`h-1 w-full ${currentStep >= 3 ? "bg-primary" : "bg-gray-200"}`}></div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= 3 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  3
                </div>
                <span className="text-xs mt-1">Locataire</span>
              </div>
              <div className="flex-1 flex items-center">
                <div className={`h-1 w-full ${currentStep >= 4 ? "bg-primary" : "bg-gray-200"}`}></div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= 4 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  4
                </div>
                <span className="text-xs mt-1">Photos</span>
              </div>
              <div className="flex-1 flex items-center">
                <div className={`h-1 w-full ${currentStep >= 5 ? "bg-primary" : "bg-gray-200"}`}></div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= 5 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  5
                </div>
                <span className="text-xs mt-1">Surface</span>
              </div>
              <div className="flex-1 flex items-center">
                <div className={`h-1 w-full ${currentStep >= 6 ? "bg-primary" : "bg-gray-200"}`}></div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= 6 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  6
                </div>
                <span className="text-xs mt-1">Identité</span>
              </div>
              <div className="flex-1 flex items-center">
                <div className={`h-1 w-full ${currentStep >= 7 ? "bg-primary" : "bg-gray-200"}`}></div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= 7 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  7
                </div>
                <span className="text-xs mt-1">Factures</span>
              </div>
              <div className="flex-1 flex items-center">
                <div className={`h-1 w-full ${currentStep >= 8 ? "bg-primary" : "bg-gray-200"}`}></div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= 8 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  8
                </div>
                <span className="text-xs mt-1">Titre</span>
              </div>
            </div>

            {/* Contenu des étapes */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Type de logement</h2>
                  <p className="text-gray-600">
                    Veuillez sélectionner le type de logement que vous souhaitez mettre en location.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                      className={`border rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer ${propertyType === "appartement" ? "border-primary bg-primary/5" : "border-gray-200"}`}
                      onClick={() => setPropertyType("appartement")}
                    >
                      <Building className="h-10 w-10 mb-3 text-primary" />
                      <h3 className="text-lg font-medium mb-2">Appartement</h3>
                      <p className="text-sm text-gray-500">
                        Logement situé dans un immeuble collectif, avec ou sans balcon/terrasse.
                      </p>
                    </div>

                    <div
                      className={`border rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer ${propertyType === "garconniere" ? "border-primary bg-primary/5" : "border-gray-200"}`}
                      onClick={() => setPropertyType("garconniere")}
                    >
                      <Building className="h-10 w-10 mb-3 text-primary" />
                      <h3 className="text-lg font-medium mb-2">Garçonnière</h3>
                      <p className="text-sm text-gray-500">
                        Petit appartement destiné à une personne seule, généralement composé d'une pièce principale.
                      </p>
                    </div>

                    <div
                      className={`border rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer ${propertyType === "maison" ? "border-primary bg-primary/5" : "border-gray-200"}`}
                      onClick={() => setPropertyType("maison")}
                    >
                      <Home className="h-10 w-10 mb-3 text-primary" />
                      <h3 className="text-lg font-medium mb-2">Maison</h3>
                      <p className="text-sm text-gray-500">
                        Logement individuel avec un ou plusieurs étages, généralement avec jardin.
                      </p>
                    </div>

                    <div
                      className={`border rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer ${propertyType === "villa" ? "border-primary bg-primary/5" : "border-gray-200"}`}
                      onClick={() => setPropertyType("villa")}
                    >
                      <Castle className="h-10 w-10 mb-3 text-primary" />
                      <h3 className="text-lg font-medium mb-2">Villa</h3>
                      <p className="text-sm text-gray-500">
                        Maison de luxe avec jardin, souvent avec piscine ou autres équipements premium.
                      </p>
                    </div>

                    <div
                      className={`border rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer ${propertyType === "riad" ? "border-primary bg-primary/5" : "border-gray-200"}`}
                      onClick={() => setPropertyType("riad")}
                    >
                      <Hotel className="h-10 w-10 mb-3 text-primary" />
                      <h3 className="text-lg font-medium mb-2">Riad</h3>
                      <p className="text-sm text-gray-500">
                        Maison traditionnelle marocaine avec patio intérieur, généralement dans la médina.
                      </p>
                    </div>

                    <div
                      className={`border rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer ${propertyType === "studio" ? "border-primary bg-primary/5" : "border-gray-200"}`}
                      onClick={() => setPropertyType("studio")}
                    >
                      <Warehouse className="h-10 w-10 mb-3 text-primary" />
                      <h3 className="text-lg font-medium mb-2">Studio</h3>
                      <p className="text-sm text-gray-500">
                        Petit logement d'une seule pièce principale avec coin cuisine et salle de bain.
                      </p>
                    </div>

                    <div
                      className={`border rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer ${propertyType === "bureau" ? "border-primary bg-primary/5" : "border-gray-200"}`}
                      onClick={() => setPropertyType("bureau")}
                    >
                      <BriefcaseIcon className="h-10 w-10 mb-3 text-primary" />
                      <h3 className="text-lg font-medium mb-2">Bureau</h3>
                      <p className="text-sm text-gray-500">
                        Espace professionnel destiné à des activités commerciales ou administratives.
                      </p>
                    </div>

                    <div
                      className={`border rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer ${propertyType === "chalet" ? "border-primary bg-primary/5" : "border-gray-200"}`}
                      onClick={() => setPropertyType("chalet")}
                    >
                      <Home className="h-10 w-10 mb-3 text-primary" />
                      <h3 className="text-lg font-medium mb-2">Chalet</h3>
                      <p className="text-sm text-gray-500">
                        Maison en bois typique des régions montagneuses, idéale pour les séjours en montagne.
                      </p>
                    </div>

                    <div
                      className={`border rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer ${propertyType === "ferme" ? "border-primary bg-primary/5" : "border-gray-200"}`}
                      onClick={() => setPropertyType("ferme")}
                    >
                      <Warehouse className="h-10 w-10 mb-3 text-primary" />
                      <h3 className="text-lg font-medium mb-2">Ferme</h3>
                      <p className="text-sm text-gray-500">
                        Propriété rurale avec terrain agricole, idéale pour les séjours à la campagne.
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
                    <p>
                      <strong>Pourquoi avons-nous besoin de cela ?</strong> Le type de logement nous permet de mieux
                      catégoriser votre propriété et d'aider les locataires potentiels à trouver ce qu'ils recherchent.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Bed className="h-6 w-6 text-primary" />
                    <h2 className="text-xl font-semibold text-primary">Chambres</h2>
                    {(propertyType === "bureau" || propertyType === "ferme" || propertyType === "studio") && (
                      <span className="text-sm text-gray-500 ml-2">(Optionnel pour ce type de logement)</span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    <div
                      className={`relative border rounded-lg p-4 cursor-pointer transition-all ${roomCount === 1 ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                      onClick={() => setRoomCount(roomCount === 1 ? null : 1)}
                    >
                      {roomCount === 1 && (
                        <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-blue-600"></div>
                      )}
                      <div className="text-center">
                        <div className="text-lg font-medium mb-1">1</div>
                        <div className="text-xs text-gray-500">1 chambre</div>
                      </div>
                    </div>

                    <div
                      className={`relative border rounded-lg p-4 cursor-pointer transition-all ${roomCount === 2 ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                      onClick={() => setRoomCount(roomCount === 2 ? null : 2)}
                    >
                      {roomCount === 2 && (
                        <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-blue-600"></div>
                      )}
                      <div className="text-center">
                        <div className="text-lg font-medium mb-1">2</div>
                        <div className="text-xs text-gray-500">2 chambres</div>
                      </div>
                    </div>

                    <div
                      className={`relative border rounded-lg p-4 cursor-pointer transition-all ${roomCount === 3 ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                      onClick={() => setRoomCount(roomCount === 3 ? null : 3)}
                    >
                      {roomCount === 3 && (
                        <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-blue-600"></div>
                      )}
                      <div className="text-center">
                        <div className="text-lg font-medium mb-1">3</div>
                        <div className="text-xs text-gray-500">3 chambres</div>
                      </div>
                    </div>

                    <div
                      className={`relative border rounded-lg p-4 cursor-pointer transition-all ${roomCount === 4 ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                      onClick={() => setRoomCount(roomCount === 4 ? null : 4)}
                    >
                      {roomCount === 4 && (
                        <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-blue-600"></div>
                      )}
                      <div className="text-center">
                        <div className="text-lg font-medium mb-1">4</div>
                        <div className="text-xs text-gray-500">4 chambres</div>
                      </div>
                    </div>

                    <div
                      className={`relative border rounded-lg p-4 cursor-pointer transition-all ${roomCount === 5 ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                      onClick={() => setRoomCount(roomCount === 5 ? null : 5)}
                    >
                      {roomCount === 5 && (
                        <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-blue-600"></div>
                      )}
                      <div className="text-center">
                        <div className="text-lg font-medium mb-1">5+</div>
                        <div className="text-xs text-gray-500">5 chambres ou plus</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Settings className="h-6 w-6 text-primary" />
                      <h2 className="text-xl font-semibold text-primary">Caractéristiques</h2>
                      <span className="text-sm text-gray-500 ml-2">(Optionnel)</span>
                    </div>

                    {/* Intérieur */}
                    <div className="mb-4">
                      <h3 className="text-md font-medium mb-2 text-gray-700">Intérieur</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div
                          className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${amenities.includes("balcony") ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                          onClick={() => toggleAmenity("balcony")}
                        >
                          <Wind className="h-5 w-5 text-primary" />
                          <span>Balcon</span>
                          {amenities.includes("balcony") && (
                            <div className="ml-auto w-3 h-3 rounded-full bg-blue-600"></div>
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${amenities.includes("modern_toilet") ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                          onClick={() => toggleAmenity("modern_toilet")}
                        >
                          <Bath className="h-5 w-5 text-primary" />
                          <span>Toilette moderne</span>
                          {amenities.includes("modern_toilet") && (
                            <div className="ml-auto w-3 h-3 rounded-full bg-blue-600"></div>
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${amenities.includes("traditional_toilet") ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                          onClick={() => toggleAmenity("traditional_toilet")}
                        >
                          <Bath className="h-5 w-5 text-primary" />
                          <span>Toilette traditionnelle</span>
                          {amenities.includes("traditional_toilet") && (
                            <div className="ml-auto w-3 h-3 rounded-full bg-blue-600"></div>
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${amenities.includes("water_supply") ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                          onClick={() => toggleAmenity("water_supply")}
                        >
                          <Droplets className="h-5 w-5 text-primary" />
                          <span>Alimentation en eau</span>
                          {amenities.includes("water_supply") && (
                            <div className="ml-auto w-3 h-3 rounded-full bg-blue-600"></div>
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${amenities.includes("furnished") ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                          onClick={() => toggleAmenity("furnished")}
                        >
                          <Armchair className="h-5 w-5 text-primary" />
                          <span>Meublé</span>
                          {amenities.includes("furnished") && (
                            <div className="ml-auto w-3 h-3 rounded-full bg-blue-600"></div>
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${amenities.includes("heating") ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                          onClick={() => toggleAmenity("heating")}
                        >
                          <Zap className="h-5 w-5 text-primary" />
                          <span>Chauffage</span>
                          {amenities.includes("heating") && (
                            <div className="ml-auto w-3 h-3 rounded-full bg-blue-600"></div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Extérieur */}
                    <div className="mb-4">
                      <h3 className="text-md font-medium mb-2 text-gray-700">Extérieur</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div
                          className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${amenities.includes("garden") ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                          onClick={() => toggleAmenity("garden")}
                        >
                          <Flower2 className="h-5 w-5 text-primary" />
                          <span>Jardin</span>
                          {amenities.includes("garden") && (
                            <div className="ml-auto w-3 h-3 rounded-full bg-blue-600"></div>
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${amenities.includes("parking") ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                          onClick={() => toggleAmenity("parking")}
                        >
                          <Car className="h-5 w-5 text-primary" />
                          <span>Parking</span>
                          {amenities.includes("parking") && (
                            <div className="ml-auto w-3 h-3 rounded-full bg-blue-600"></div>
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${amenities.includes("terrace") ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                          onClick={() => toggleAmenity("terrace")}
                        >
                          <Trees className="h-5 w-5 text-primary" />
                          <span>Terrasse</span>
                          {amenities.includes("terrace") && (
                            <div className="ml-auto w-3 h-3 rounded-full bg-blue-600"></div>
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${amenities.includes("pool") ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                          onClick={() => toggleAmenity("pool")}
                        >
                          <SwimmingPool className="h-5 w-5 text-primary" />
                          <span>Piscine</span>
                          {amenities.includes("pool") && (
                            <div className="ml-auto w-3 h-3 rounded-full bg-blue-600"></div>
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${amenities.includes("security") ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                          onClick={() => toggleAmenity("security")}
                        >
                          <Lock className="h-5 w-5 text-primary" />
                          <span>Sécurité</span>
                          {amenities.includes("security") && (
                            <div className="ml-auto w-3 h-3 rounded-full bg-blue-600"></div>
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${amenities.includes("trash_disposal") ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                          onClick={() => toggleAmenity("trash_disposal")}
                        >
                          <Trash2 className="h-5 w-5 text-primary" />
                          <span>Vide-ordures</span>
                          {amenities.includes("trash_disposal") && (
                            <div className="ml-auto w-3 h-3 rounded-full bg-blue-600"></div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* À proximité */}
                    <div>
                      <h3 className="text-md font-medium mb-2 text-gray-700">À proximité</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div
                          className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${amenities.includes("mosque") ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                          onClick={() => toggleAmenity("mosque")}
                        >
                          <Mosque className="h-5 w-5 text-primary" />
                          <span>Mosquée</span>
                          {amenities.includes("mosque") && (
                            <div className="ml-auto w-3 h-3 rounded-full bg-blue-600"></div>
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${amenities.includes("kindergarten") ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                          onClick={() => toggleAmenity("kindergarten")}
                        >
                          <Footprints className="h-5 w-5 text-primary" />
                          <span>Maternelle</span>
                          {amenities.includes("kindergarten") && (
                            <div className="ml-auto w-3 h-3 rounded-full bg-blue-600"></div>
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${amenities.includes("primary_school") ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                          onClick={() => toggleAmenity("primary_school")}
                        >
                          <School className="h-5 w-5 text-primary" />
                          <span>École primaire</span>
                          {amenities.includes("primary_school") && (
                            <div className="ml-auto w-3 h-3 rounded-full bg-blue-600"></div>
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${amenities.includes("middle_school") ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                          onClick={() => toggleAmenity("middle_school")}
                        >
                          <BookOpen className="h-5 w-5 text-primary" />
                          <span>Collège</span>
                          {amenities.includes("middle_school") && (
                            <div className="ml-auto w-3 h-3 rounded-full bg-blue-600"></div>
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${amenities.includes("high_school") ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                          onClick={() => toggleAmenity("high_school")}
                        >
                          <BookOpen className="h-5 w-5 text-primary" />
                          <span>Lycée</span>
                          {amenities.includes("high_school") && (
                            <div className="ml-auto w-3 h-3 rounded-full bg-blue-600"></div>
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${amenities.includes("university") ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                          onClick={() => toggleAmenity("university")}
                        >
                          <GraduationCap className="h-5 w-5 text-primary" />
                          <span>Université</span>
                          {amenities.includes("university") && (
                            <div className="ml-auto w-3 h-3 rounded-full bg-blue-600"></div>
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${amenities.includes("pharmacy") ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                          onClick={() => toggleAmenity("pharmacy")}
                        >
                          <Pill className="h-5 w-5 text-primary" />
                          <span>Pharmacie</span>
                          {amenities.includes("pharmacy") && (
                            <div className="ml-auto w-3 h-3 rounded-full bg-blue-600"></div>
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${amenities.includes("souk") ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                          onClick={() => toggleAmenity("souk")}
                        >
                          <ShoppingBag className="h-5 w-5 text-primary" />
                          <span>Souk</span>
                          {amenities.includes("souk") && (
                            <div className="ml-auto w-3 h-3 rounded-full bg-blue-600"></div>
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${amenities.includes("hammam") ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                          onClick={() => toggleAmenity("hammam")}
                        >
                          <Waves className="h-5 w-5 text-primary" />
                          <span>Hammam</span>
                          {amenities.includes("hammam") && (
                            <div className="ml-auto w-3 h-3 rounded-full bg-blue-600"></div>
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${amenities.includes("restaurant") ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                          onClick={() => toggleAmenity("restaurant")}
                        >
                          <Utensils className="h-5 w-5 text-primary" />
                          <span>Restaurant</span>
                          {amenities.includes("restaurant") && (
                            <div className="ml-auto w-3 h-3 rounded-full bg-blue-600"></div>
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${amenities.includes("cafe") ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                          onClick={() => toggleAmenity("cafe")}
                        >
                          <Coffee className="h-5 w-5 text-primary" />
                          <span>Café</span>
                          {amenities.includes("cafe") && (
                            <div className="ml-auto w-3 h-3 rounded-full bg-blue-600"></div>
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${amenities.includes("supermarket") ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                          onClick={() => toggleAmenity("supermarket")}
                        >
                          <ShoppingCart className="h-5 w-5 text-primary" />
                          <span>Supermarché</span>
                          {amenities.includes("supermarket") && (
                            <div className="ml-auto w-3 h-3 rounded-full bg-blue-600"></div>
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${amenities.includes("public_transport") ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                          onClick={() => toggleAmenity("public_transport")}
                        >
                          <Bus className="h-5 w-5 text-primary" />
                          <span>Transport public</span>
                          {amenities.includes("public_transport") && (
                            <div className="ml-auto w-3 h-3 rounded-full bg-blue-600"></div>
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${amenities.includes("gym") ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                          onClick={() => toggleAmenity("gym")}
                        >
                          <Dumbbell className="h-5 w-5 text-primary" />
                          <span>Salle de sport</span>
                          {amenities.includes("gym") && (
                            <div className="ml-auto w-3 h-3 rounded-full bg-blue-600"></div>
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-all ${amenities.includes("shopping") ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"}`}
                          onClick={() => toggleAmenity("shopping")}
                        >
                          <Store className="h-5 w-5 text-primary" />
                          <span>Centre commercial</span>
                          {amenities.includes("shopping") && (
                            <div className="ml-auto w-3 h-3 rounded-full bg-blue-600"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg mt-6">
                    <p>
                      <strong>Pourquoi avons-nous besoin de cela ?</strong> Ces informations permettent aux locataires
                      potentiels de trouver des logements qui correspondent à leurs besoins spécifiques.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="h-6 w-6 text-primary" />
                    <h2 className="text-xl font-semibold text-primary">Type de locataire</h2>
                  </div>

                  <p className="text-gray-600 mb-4">
                    Veuillez sélectionner le type de locataire que vous préférez pour votre propriété.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                      className={`border rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer ${tenantType === "famille" ? "border-primary bg-primary/5" : "border-gray-200"}`}
                      onClick={() => setTenantType("famille")}
                    >
                      <Users className="h-10 w-10 mb-3 text-primary" />
                      <h3 className="text-lg font-medium mb-2">Famille</h3>
                      <p className="text-sm text-gray-500">
                        Idéal pour les familles avec enfants cherchant un logement stable.
                      </p>
                    </div>

                    <div
                      className={`border rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer ${tenantType === "couple" ? "border-primary bg-primary/5" : "border-gray-200"}`}
                      onClick={() => setTenantType("couple")}
                    >
                      <Heart className="h-10 w-10 mb-3 text-primary" />
                      <h3 className="text-lg font-medium mb-2">Couple</h3>
                      <p className="text-sm text-gray-500">
                        Parfait pour les couples à la recherche d'un espace confortable.
                      </p>
                    </div>

                    <div
                      className={`border rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer ${tenantType === "celibataire" ? "border-primary bg-primary/5" : "border-gray-200"}`}
                      onClick={() => setTenantType("celibataire")}
                    >
                      <User className="h-10 w-10 mb-3 text-primary" />
                      <h3 className="text-lg font-medium mb-2">Célibataire</h3>
                      <p className="text-sm text-gray-500">Adapté pour une personne seule cherchant un logement.</p>
                    </div>

                    <div
                      className={`border rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer ${tenantType === "etudiant" ? "border-primary bg-primary/5" : "border-gray-200"}`}
                      onClick={() => setTenantType("etudiant")}
                    >
                      <GraduationCap className="h-10 w-10 mb-3 text-primary" />
                      <h3 className="text-lg font-medium mb-2">Étudiant</h3>
                      <p className="text-sm text-gray-500">
                        Pour les étudiants cherchant un logement près de leur établissement.
                      </p>
                    </div>

                    <div
                      className={`border rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer ${tenantType === "professionnel" ? "border-primary bg-primary/5" : "border-gray-200"}`}
                      onClick={() => setTenantType("professionnel")}
                    >
                      <Briefcase className="h-10 w-10 mb-3 text-primary" />
                      <h3 className="text-lg font-medium mb-2">Professionnel</h3>
                      <p className="text-sm text-gray-500">
                        Pour les professionnels en déplacement ou en mission temporaire.
                      </p>
                    </div>

                    <div
                      className={`border rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer ${tenantType === "tous" ? "border-primary bg-primary/5" : "border-gray-200"}`}
                      onClick={() => setTenantType("tous")}
                    >
                      <Check className="h-10 w-10 mb-3 text-primary" />
                      <h3 className="text-lg font-medium mb-2">Tous types</h3>
                      <p className="text-sm text-gray-500">
                        Ouvert à tous les types de locataires sans préférence particulière.
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
                    <p>
                      <strong>Pourquoi avons-nous besoin de cela ?</strong> Cette information nous aide à mieux cibler
                      les locataires potentiels et à leur proposer des logements adaptés à leur situation.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Photos de votre propriété</h2>
                  <p className="text-gray-600">
                    Veuillez télécharger au moins 5 photos de votre propriété pour donner aux locataires potentiels une
                    bonne idée de votre logement.
                  </p>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                    <input
                      type="file"
                      id="property-images-upload"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      accept=".jpg,.jpeg,.png"
                      multiple
                      onChange={handleImageUpload}
                    />
                    {propertyImages.length === 0 ? (
                      <>
                        <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium mb-2">Télécharger vos 5 photos</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          Glissez-déposez vos fichiers ici ou cliquez pour parcourir
                        </p>
                        <p className="text-xs text-gray-400">Formats acceptés: JPG, PNG (max 10MB par image)</p>
                      </>
                    ) : requiredImagesCount > 0 ? (
                      <>
                        <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium mb-2">
                          Encore {requiredImagesCount} photo{requiredImagesCount > 1 ? "s" : ""} requise
                          {requiredImagesCount > 1 ? "s" : ""}
                        </h3>
                        <p className="text-sm text-gray-500">Cliquez pour ajouter plus de photos</p>
                      </>
                    ) : (
                      <>
                        <Check className="h-12 w-12 mx-auto text-green-500 mb-4" />
                        <h3 className="text-lg font-medium text-green-600 mb-2">
                          {propertyImages.length} photo{propertyImages.length > 1 ? "s" : ""} téléchargée
                          {propertyImages.length > 1 ? "s" : ""}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Vous pouvez ajouter d'autres photos si vous le souhaitez
                        </p>
                      </>
                    )}
                  </div>

                  {propertyImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-4">
                      {Array.from(propertyImages).map((file, index) => (
                        <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                          <img
                            src={URL.createObjectURL(file) || "/placeholder.svg"}
                            alt={`Propriété ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                            onClick={(e) => {
                              e.stopPropagation()
                              const newImages = propertyImages.filter((_, i) => i !== index)
                              setPropertyImages(newImages)
                              // Recalculer le nombre d'images requises
                              setRequiredImagesCount(Math.max(0, 5 - newImages.length))
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
                    <p>
                      <strong>Pourquoi avons-nous besoin de cela ?</strong> Les photos permettent aux locataires
                      potentiels de se faire une idée précise de votre logement et augmentent vos chances de location.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <SquareIcon className="h-6 w-6 text-primary" />
                    <h2 className="text-xl font-semibold text-primary">Surface et Prix</h2>
                  </div>

                  <p className="text-gray-600 mb-4">
                    Veuillez indiquer la surface de votre propriété et le prix mensuel de location.
                  </p>

                  {/* Surface */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                      <SquareIcon className="h-5 w-5 text-primary" />
                      <h3 className="text-md font-medium text-gray-700">Surface (m²)</h3>
                    </div>

                    <div className="space-y-3">
                      <div className="text-sm text-gray-500 mb-2">Surface sélectionnée</div>
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-lg">
                          {surfaceRange === "petit"
                            ? "20 - 50"
                            : surfaceRange === "moyen"
                              ? "50 - 90"
                              : surfaceRange === "grand"
                                ? "90 - 150"
                                : surfaceRange === "tres-grand"
                                  ? "150 - 200"
                                  : minSurface && maxSurface
                                    ? `${minSurface} - ${maxSurface}`
                                    : "Non définie"}{" "}
                          m²
                        </div>
                        <button
                          onClick={() => {
                            setSurfaceRange(null)
                            setMinSurface(null)
                            setMaxSurface(null)
                          }}
                          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                          </svg>
                        </button>
                      </div>

                      <div
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          surfaceRange === "petit"
                            ? "bg-green-50 border-green-200"
                            : "bg-white border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => {
                          setSurfaceRange(surfaceRange === "petit" ? null : "petit")
                          setMinSurface(null)
                          setMaxSurface(null)
                        }}
                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-green-500"
                            >
                              <path d="M7 20V4h10v16l-5-5-5 5z"></path>
                            </svg>
                          </div>
                          <div className="ml-3">
                            <div className="font-medium">Petit</div>
                            <div className="text-sm text-gray-500">20 - 50 m² • Studio, T1</div>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          surfaceRange === "moyen"
                            ? "bg-blue-50 border-blue-200"
                            : "bg-white border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => {
                          setSurfaceRange(surfaceRange === "moyen" ? null : "moyen")
                          setMinSurface(null)
                          setMaxSurface(null)
                        }}
                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-blue-500"
                            >
                              <path d="M21 12H3"></path>
                              <path d="M8 5v14"></path>
                              <path d="M16 5v14"></path>
                            </svg>
                          </div>
                          <div className="ml-3">
                            <div className="font-medium">Moyen</div>
                            <div className="text-sm text-gray-500">50 - 90 m² • T2, T3</div>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          surfaceRange === "grand"
                            ? "bg-purple-50 border-purple-200"
                            : "bg-white border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => {
                          setSurfaceRange(surfaceRange === "grand" ? null : "grand")
                          setMinSurface(null)
                          setMaxSurface(null)
                        }}
                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-purple-500"
                            >
                              <path d="M21 3v18"></path>
                              <path d="M3 3v18"></path>
                              <path d="M3 12h18"></path>
                            </svg>
                          </div>
                          <div className="ml-3">
                            <div className="font-medium">Grand</div>
                            <div className="text-sm text-gray-500">90 - 150 m² • T4, T5</div>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          surfaceRange === "tres-grand"
                            ? "bg-yellow-50 border-yellow-200"
                            : "bg-white border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => {
                          setSurfaceRange(surfaceRange === "tres-grand" ? null : "tres-grand")
                          setMinSurface(null)
                          setMaxSurface(null)
                        }}
                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-yellow-500"
                            >
                              <path d="M3 3v18h18"></path>
                              <path d="M3 3h18"></path>
                            </svg>
                          </div>
                          <div className="ml-3">
                            <div className="font-medium">Très grand</div>
                            <div className="text-sm text-gray-500">150 - 200 m² • T5+, Duplex</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-sm font-medium mb-3">Surface personnalisée</h4>
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <input
                            type="number"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="Min"
                            value={minSurface || ""}
                            onChange={(e) => {
                              const value = e.target.value ? Number.parseInt(e.target.value) : null
                              setMinSurface(value)
                              if (value !== null) {
                                setSurfaceRange(null)
                              }
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center bg-gray-100 px-2 py-1 rounded-md">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-gray-500 mr-1"
                            >
                              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                              <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                            <span className="text-xs text-gray-500">²</span>
                          </div>
                        </div>
                        <span className="text-gray-500 font-medium">à</span>
                        <div className="relative flex-1">
                          <input
                            type="number"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="Max"
                            value={maxSurface || ""}
                            onChange={(e) => {
                              const value = e.target.value ? Number.parseInt(e.target.value) : null
                              setMaxSurface(value)
                              if (value !== null) {
                                setSurfaceRange(null)
                              }
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center bg-gray-100 px-2 py-1 rounded-md">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-gray-500 mr-1"
                            >
                              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                              <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                            <span className="text-xs text-gray-500">²</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Prix par mois */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Banknote className="h-5 w-5 text-primary" />
                      <h3 className="text-md font-medium text-gray-700">Prix par mois (MAD)</h3>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center">
                        <input
                          type="number"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={pricePerMonth || ""}
                          onChange={(e) => setPricePerMonth(e.target.value ? Number.parseInt(e.target.value) : null)}
                          placeholder="Entrez le prix mensuel"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <span className="ml-2 text-gray-600">MAD/mois</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {[2000, 3000, 4000, 5000, 7000, 10000].map((price) => (
                          <button
                            key={price}
                            type="button"
                            onClick={() => setPricePerMonth(price)}
                            className={`px-3 py-1 text-sm rounded-full border ${
                              pricePerMonth === price
                                ? "bg-primary text-white border-primary"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            } transition-colors`}
                          >
                            {price.toLocaleString()} MAD
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg mt-6">
                    <p>
                      <strong>Pourquoi avons-nous besoin de cela ?</strong> La surface et le prix sont des informations
                      essentielles pour les locataires potentiels lors de leur recherche de logement.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 6 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Vérification d'identité</h2>
                  <p className="text-gray-600">
                    Veuillez télécharger une copie de votre carte nationale d'identité (recto-verso).
                  </p>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                    <input
                      type="file"
                      id="identity-upload"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          handleFileUpload("identity")
                        }
                      }}
                    />
                    {!uploadedFiles.identity ? (
                      <>
                        <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium mb-2">Télécharger votre carte d'identité</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          Glissez-déposez votre fichier ici ou cliquez pour parcourir
                        </p>
                        <p className="text-xs text-gray-400">Formats acceptés: JPG, PNG, PDF (max 5MB)</p>
                      </>
                    ) : (
                      <>
                        <Check className="h-12 w-12 mx-auto text-green-500 mb-4" />
                        <h3 className="text-lg font-medium text-green-600 mb-2">
                          Carte d'identité téléchargée avec succès
                        </h3>
                        <p className="text-sm text-gray-500">Cliquez pour modifier si nécessaire</p>
                      </>
                    )}
                  </div>

                  <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
                    <p>
                      <strong>Pourquoi avons-nous besoin de cela ?</strong> La vérification d'identité nous permet de
                      confirmer que vous êtes bien la personne que vous prétendez être, assurant ainsi la sécurité de
                      notre plateforme.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 7 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Factures d'électricité</h2>
                  <p className="text-gray-600">
                    Veuillez télécharger vos factures d'électricité des 3 derniers mois pour confirmer votre adresse.
                  </p>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                    <input
                      type="file"
                      id="electricity-upload"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      accept=".jpg,.jpeg,.png,.pdf"
                      multiple
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          handleFileUpload("electricity")
                        }
                      }}
                    />
                    {!uploadedFiles.electricity ? (
                      <>
                        <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium mb-2">Télécharger vos factures d'électricité</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          Glissez-déposez vos fichiers ici ou cliquez pour parcourir
                        </p>
                        <p className="text-xs text-gray-400">Formats acceptés: JPG, PNG, PDF (max 5MB)</p>
                      </>
                    ) : (
                      <>
                        <Check className="h-12 w-12 mx-auto text-green-500 mb-4" />
                        <h3 className="text-lg font-medium text-green-600 mb-2">Factures téléchargées avec succès</h3>
                        <p className="text-sm text-gray-500">Cliquez pour modifier si nécessaire</p>
                      </>
                    )}
                  </div>

                  <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
                    <p>
                      <strong>Pourquoi avons-nous besoin de cela ?</strong> Les factures récentes nous permettent de
                      vérifier votre adresse et de confirmer que vous résidez bien à l'adresse indiquée.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 8 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Titre de propriété</h2>
                  <p className="text-gray-600">
                    Veuillez télécharger votre acte de propriété ou tout document prouvant que vous êtes le propriétaire
                    légal.
                  </p>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                    <input
                      type="file"
                      id="property-upload"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          handleFileUpload("property")
                        }
                      }}
                    />
                    {!uploadedFiles.property ? (
                      <>
                        <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium mb-2">Télécharger votre titre de propriété</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          Glissez-déposez votre fichier ici ou cliquez pour parcourir
                        </p>
                        <p className="text-xs text-gray-400">Formats acceptés: JPG, PNG, PDF (max 10MB)</p>
                      </>
                    ) : (
                      <>
                        <Check className="h-12 w-12 mx-auto text-green-500 mb-4" />
                        <h3 className="text-lg font-medium text-green-600 mb-2">
                          Titre de propriété téléchargé avec succès
                        </h3>
                        <p className="text-sm text-gray-500">Cliquez pour modifier si nécessaire</p>
                      </>
                    )}
                  </div>

                  <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
                    <p>
                      <strong>Pourquoi avons-nous besoin de cela ?</strong> Le titre de propriété nous permet de
                      vérifier que vous êtes bien le propriétaire légal du logement que vous souhaitez mettre en
                      location.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>

            <div className="flex justify-between mt-12 pt-6 border-t">
              {currentStep > 1 ? (
                <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                  Étape précédente
                </Button>
              ) : (
                <Button variant="outline" asChild>
                  <Link href="/devenir-hote">Annuler</Link>
                </Button>
              )}
              <Button
                onClick={handleNextStep}
                disabled={!isStepComplete()}
                className={!isStepComplete() ? "opacity-50 cursor-not-allowed" : ""}
              >
                {currentStep < 8 ? "Étape suivante" : "Terminer la vérification"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
