import { useState, useEffect } from "react"
import React, { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form"
import { router } from "@inertiajs/react"
import PropertySubmissionForm from "@/components/property-submission-form"
import { DirectPropertyPreview } from "@/components/direct-property-preview"
import {
  ChevronDown,
  ChevronUp,
  Check,
  Bath,
  Flame,
  Fan,
  UtensilsCrossed,
  LayoutGrid,
  Square,
  ShirtIcon as ShirtFolded,
  WashingMachineIcon as Washing,
  Wifi,
  Bell,
  Shield,
  Blinds,
  ArrowUpDown,
  Briefcase,
  Lightbulb,
  Flower2,
  Waves,
  TreePalmIcon as PalmTree,
  Trees,
  Mountain,
  Car,
  Droplets,
  Sprout,
  ParkingSquare,
  MapPin,
  Bus,
  GraduationCap,
  Store,
  Coffee,
  Stethoscope,
  Dumbbell,
  ShoppingBag,
  Landmark,
  Church,
  Pill,
  Building,
  CircleDot,
  Home,
  FileText,
  Upload,
  CreditCard,
  Receipt,
  FileCheck,
  FileX,
} from "lucide-react"
import * as LucideIcons from "lucide-react"

type Amenity = {
  name: string;
  category: string;
  icon: string;
};
type Amenities = {
  interior: string[]
  exterior: string[]
  proximity: string[]
}
type Rules = {
  petsAllowed: boolean
  smokingAllowed: boolean
  eventsAllowed: boolean
  additionalRules: string
}

type OwnerInfo = {
  contactPreference: "both" | "email" | "phone"
  availabilityForVisits: string
  additionalInfo: string
}

type PropertyDetails = {
  amenities: Amenity[]
}

type Documents = {
  invoices: any[]   // عدل حسب نوع الملفات المرفوعة
  idCard: any | null
}

export interface FormValues {
  title: string
  description: string
  propertyType: string
  tenantType: string
  city: string
  district: string
  address: string
  area: number
  rooms: number
  bedrooms: number
  bathrooms: number
  floor: number
  totalFloors: number
  images?: any[]    // عدل حسب نوع الصور
  price: number
  availableFrom: Date | string
  minimumStay: number
  furnished: boolean
  amenities: Amenities
  rules: Rules
  ownerInfo: OwnerInfo
  propertyDetails: PropertyDetails
  documents: Documents
}
export  function DirectFormWithPreview(){
  // Prévisualisation toujours active
  const [showPreview] = useState(true)
  type PreviewFields = "title" | "description" | "propertyType" | "tenantType" | "city" | "district" | "address" | "area" | "bedrooms" | "bathrooms" | "images" | "price";
  const [activeField, setActiveField] = useState<PreviewFields | null>(null);
    const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 8 // Réduit de 9 à 8 pour supprimer l'étape "Information"
const [expandedCategory, setExpandedCategory] = useState<string | null>("interior")
  const [uploadedFiles, setUploadedFiles] = useState<{invoices: any[]; idCard: any | null}>({
    invoices: [],
    idCard: null,
  })

  // Ajouter après les autres états
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null)
const previewFields: PreviewFields[] = ["title", "description", "propertyType", "tenantType", "city", "district", "address", "area", "bedrooms", "bathrooms", "images", "price"];

function isValidPreviewField(field: string | null): field is PreviewFields {
  return field !== null && previewFields.includes(field as PreviewFields);
}

  // Initialiser React Hook Form sans validation pour la prévisualisation
  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      propertyType: "apartment",
      tenantType: "all",
      city: "",
      district: "no-district",
      address: "",
      area: 0,
      rooms: 1,
      bedrooms: 1,
      bathrooms: 1,
      floor: 0,
      totalFloors: 1,
      images: [],
      price: 0,
      availableFrom: new Date(),
      minimumStay: 1,
      furnished: false,
      amenities: {
        interior: [],
        exterior: [],
        proximity: [],
      },
      rules: {
        petsAllowed: false,
        smokingAllowed: false,
        eventsAllowed: false,
        additionalRules: "",
      },
      ownerInfo: {
        contactPreference: "both",
        availabilityForVisits: "",
        additionalInfo: "",
      },
      propertyDetails: {
        amenities: [],
      },
      documents: {
        invoices: [],
        idCard: null,
      },
    },
  })
  // Fonction de soumission du formulaire
  const onSubmit = (data: FormValues) => {
    console.log("Formulaire soumis:", data)
    setSubmittedData(data)
    setShowConfirmation(true)
    // API call can be made here
  }


  // Charger le brouillon et la dernière étape au montage
  useEffect(() => {
    const loadDraft = () => {
      try {
        const savedDraft = localStorage.getItem("propertyDraft")
        if (savedDraft) {
          const parsedDraft: Partial<FormValues> = JSON.parse(savedDraft)

          if (parsedDraft.availableFrom) {
            parsedDraft.availableFrom = new Date(parsedDraft.availableFrom)
          }

          // تأكد من نوع كل مفتاح قبل التعيين
          (Object.entries(parsedDraft) as [keyof FormValues, any][]).forEach(([key, value]) => {
            methods.setValue(key, value)
          })
        }
      } catch (error) {
        console.error("Erreur lors du chargement du brouillon:", error)
      }
    }

    loadDraft()

    // Récupérer la dernière étape si disponible
    try {
      const lastStep = localStorage.getItem("lastFormStep")
      if (lastStep) {
        const stepNumber = Number.parseInt(lastStep, 10)
        if (!isNaN(stepNumber) && stepNumber >= 1 && stepNumber <= totalSteps) {
          setCurrentStep(stepNumber)
          console.log("Dernière étape récupérée:", stepNumber)
        }
        // Effacer après utilisation
        localStorage.removeItem("lastFormStep")
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de la dernière étape:", error)
    }
  }, [methods, totalSteps])

  // Fonction pour suivre le champ actif
  const handleFieldFocus = (fieldName: PreviewFields) => {
    setActiveField(fieldName);
    if (window.innerWidth < 1024) {
      const previewElement = document.getElementById("property-preview");
      if (previewElement) {
        previewElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };
  

  // Fonction pour effacer le champ actif
  const handleFieldBlur = () => {
    // Petit délai pour permettre de voir l'effet de highlight
    setTimeout(() => setActiveField(null), 500)
  }

  // Fonction pour passer à l'étape suivante
  const goToNextStep = () => {
    try {
      // Sauvegarder l'état actuel du formulaire
      const currentFormData = methods.getValues()
  
      // Créer une copie sécurisée pour la sérialisation
      const safeFormData = { ...currentFormData }
  
      // Traiter les images pour éviter les erreurs de sérialisation
      if (safeFormData.images && Array.isArray(safeFormData.images)) {
        // Stocker uniquement les URLs des images, pas les objets File
        safeFormData.images = safeFormData.images.map((img) => ({
          preview: typeof img.preview === "string" ? img.preview : null,
          // Ne pas inclure l'objet File qui n'est pas sérialisable
        }))
      }
  
      // Convertir les dates en chaînes de caractères
      if (safeFormData.availableFrom instanceof Date) {
        safeFormData.availableFrom = safeFormData.availableFrom.toISOString()
      }
  
      // Sauvegarder les données sécurisées
      try {
        localStorage.setItem("propertyDraft", JSON.stringify(safeFormData))
        localStorage.setItem("lastFormStep", currentStep.toString())
      } catch (storageError) {
        console.warn("Impossible de sauvegarder le brouillon complet:", storageError)
  
        // Essayer de sauvegarder une version minimale sans les images
        try {
          // Utilisation de destructuring pour enlever images
          const { images, ...minimalData } = safeFormData
          localStorage.setItem("propertyDraft", JSON.stringify(minimalData))
          localStorage.setItem("lastFormStep", currentStep.toString())
        } catch (minimalStorageError) {
          console.error("Impossible de sauvegarder même les données minimales:", minimalStorageError)
          // Continuer sans sauvegarder
        }
      }
  
      // Mettre à jour l'étape
      if (currentStep < totalSteps) {
        setCurrentStep((prev) => prev + 1)
  
        // Forcer la mise à jour de la prévisualisation
        const previewElement = document.getElementById("property-preview")
        if (previewElement) {
          previewElement.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      }
    } catch (error) {
      console.error("Erreur lors du passage à l'étape suivante:", error)
      // Continuer à l'étape suivante même en cas d'erreur
      if (currentStep < totalSteps) {
        setCurrentStep((prev) => prev + 1)
      }
    }
  }
  

  // Fonction pour revenir à l'étape précédente
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

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
        return "Documents"
      default:
        return "Étape"
    }
  }

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category)
  }
  type AmenityCategory = "interior" | "exterior" | "proximity"

const toggleAllInCategory = (category: AmenityCategory, items: string[]) => {
  const currentItems = methods.watch(`amenities.${category}`) || []
  const mutableCurrentItems = [...currentItems]  // copie mutable

  if (mutableCurrentItems.length === items.length) {
    methods.setValue(`amenities.${category}`, [])
  } else {
    methods.setValue(`amenities.${category}`, items)
  }
}

  

  // Gérer le téléchargement des factures
  const handleInvoiceUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files ? Array.from(e.target.files) : []
  
    if (files.length > 0) {
      // Limiter à 3 factures maximum
      const newInvoices = [...uploadedFiles.invoices]
      files.forEach((file) => {
        if (newInvoices.length < 3) {
          newInvoices.push(file)
        }
      })
      setUploadedFiles({ ...uploadedFiles, invoices: newInvoices })
      methods.setValue("documents.invoices", newInvoices)
    }
  }
  

  // Gérer le téléchargement de la carte nationale
 // Gérer le téléchargement de la carte nationale
const handleIdCardUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
  const files = e.target.files ? Array.from(e.target.files) : []

  if (files.length > 0) {
    setUploadedFiles({ ...uploadedFiles, idCard: files[0] })
    methods.setValue("documents.idCard", files[0])
  }
}


  // Supprimer une facture
  const removeInvoice = (index:number) => {
    const newInvoices = [...uploadedFiles.invoices]
    newInvoices.splice(index, 1)
    setUploadedFiles({ ...uploadedFiles, invoices: newInvoices })
    methods.setValue("documents.invoices", newInvoices)
  }

  // Supprimer la carte nationale
  const removeIdCard = () => {
    setUploadedFiles({ ...uploadedFiles, idCard: null })
    methods.setValue("documents.idCard", null)
  }

  // Ajouter les gestionnaires d'événements au contexte du formulaire
  const formContextWithTracking = {
    ...methods,
    handleFieldFocus,
    handleFieldBlur,
    activeField,
  }

  // Fonction utilitaire pour associer les icônes appropriées
  const getIconForAmenity = (name:string, category:string) => {const iconMapping: { [key: string]: string } = {
    // Intérieur
    "Balcon spacieux": "Flower2",
    "Toilette moderne": "Bath",
    "Chauffage central": "Flame",
    Climatisation: "Wind",
    "Cuisine équipée": "UtensilsCrossed",
    "Placards intégrés": "LayoutGrid",
    "Fenêtres double vitrage": "Square",
    Dressing: "Armchair",
    Buanderie: "Droplets",
    "Internet fibre optique": "Zap",
    "Système d'alarme": "Bell",
    "Porte blindée": "Lock",
    "Rideaux électriques": "Blinds",
    Cheminée: "Flame",
    Ascenseur: "ArrowUpDown",
    "Espace bureau à domicile": "Briefcase",
    "Éclairage encastré": "Lightbulb",
  
    // Extérieur
    "Jardin privé": "Flower2",
    "Piscine privée": "SwimmingPool",
    "Terrasse ou patio": "Sun",
    "Cour intérieure": "Trees",
    "Espace barbecue": "Flame",
    "Toit exploitable": "Home",
    "Grandes fenêtres extérieures": "Square",
    "Façade sur mer / montagne": "Mountain",
    "Garage privé ou fermé": "Car",
    "Aire de jeux pour enfants": "CircleDot",
    "Clôture extérieure": "CircleDot",
    "Système d'arrosage automatique": "Droplets",
    "Espace vert partagé": "Sprout",
    Parking: "ParkingSquare",
  
    // À proximité
    "Transports en commun": "Bus",
    "Écoles et universités": "GraduationCap",
    "Commerces et supermarchés": "Store",
    "Restaurants et cafés": "Coffee",
    "Parcs et espaces verts": "Trees",
    "Centres médicaux": "Stethoscope",
    "Centres sportifs": "Dumbbell",
    "Centres commerciaux": "ShoppingBag",
    Plages: "Waves",
    "Lieux culturels": "Landmark",
    "Lieux de culte": "Church",
    Pharmacies: "Pill",
    Banques: "Building",
    "Marchés locaux": "Store",
  }
  
  const getIconForAmenity = (name: string, category: string): string => {
    return iconMapping[name] || 
           (category === "Intérieur" ? "DoorOpen" : 
            category === "Extérieur" ? "TreePine" : "MapPin")
           }  

  // Navigate to dashboard
  const navigateToDashboard = () => {
    router.visit("/dashboard")
  }

  return (
    
    <FormProvider {...formContextWithTracking}>
      <div className="container mx-auto px-4 py-8">
        {/* Step Progress Indicator */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-medium">
              Étape {currentStep} sur {totalSteps}: {getStepName(currentStep)}
            </h2>
            <span className="text-sm font-medium text-gray-500">
              {Math.round((currentStep / totalSteps) * 100)}% complété
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-lg p-3 mt-4">
            <div className="relative flex justify-between mb-1">
              {Array.from({ length: totalSteps }).map((_, index) => {
                const stepNumber = index + 1
                const isCompleted = currentStep > stepNumber
                const isCurrent = currentStep === stepNumber

                return (
                  <div key={stepNumber} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-full z-10 
                        ${
                          isCompleted
                            ? "bg-primary text-white"
                            : isCurrent
                              ? "bg-primary text-white"
                              : "bg-gray-200 text-gray-500"
                        }`}
                    >
                      {stepNumber}
                    </div>
                    <span className={`text-xs mt-1 font-medium ${isCurrent ? "text-primary" : "text-gray-500"}`}>
                      {getStepName(stepNumber).split(" ")[0]}
                    </span>
                  </div>
                )
              })}

              {/* Progress line connecting the steps */}
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
              <div
                className="absolute top-4 left-0 h-0.5 bg-primary -z-10 transition-all duration-300 ease-in-out"
                style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Déposer votre annonce</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire (occupe 2/3 de l'écran sur grand écran) */}
          <div className={showPreview ? "lg:col-span-2" : "lg:col-span-3"}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              {currentStep === 7 && (
                <div className="mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-2 rounded-full">
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
                        className="lucide lucide-shield-alert"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        <path d="M12 8v4"></path>
                        <path d="M12 16h.01"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Règles de la propriété</h3>
                  </div>

                  <p className="text-gray-600 mb-4">
                    Définissez les règles qui s'appliquent à votre propriété pour informer clairement les locataires
                    potentiels.
                  </p>

                  {/* Alerte informative si aucune règle n'est sélectionnée */}
                  {!methods.watch("rules.petsAllowed") &&
                    !methods.watch("rules.smokingAllowed") &&
                    !methods.watch("rules.eventsAllowed") &&
                    !methods.watch("rules.additionalRules") && (
                      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-4">
                        <div className="flex">
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
                              className="text-amber-600"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="12" y1="8" x2="12" y2="12"></line>
                              <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-amber-800">Aucune règle définie</h3>
                            <div className="mt-2 text-sm text-amber-700">
                              <p>
                                Vous n'avez pas encore défini de règles pour votre propriété. Veuillez sélectionner les
                                règles applicables ou ajouter des règles supplémentaires dans le champ ci-dessous.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  {/* Affichage des règles sélectionnées */}
                  {(methods.watch("rules.petsAllowed") ||
                    methods.watch("rules.smokingAllowed") ||
                    methods.watch("rules.eventsAllowed") ||
                    methods.watch("rules.additionalRules")) && (
                    <div className="bg-white border border-gray-200 rounded-md p-4 mb-4">
                      <h4 className="font-medium text-gray-800 mb-2">Règles sélectionnées:</h4>
                      <ul className="space-y-2">
                        {methods.watch("rules.petsAllowed") && (
                          <li className="flex items-center text-gray-700">
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
                              className="mr-2 text-green-600"
                            >
                              <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5"></path>
                              <path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"></path>
                              <path d="M8 14v.5"></path>
                              <path d="M16 14v.5"></path>
                              <path d="M11.25 16.25h1.5L12 17l-.75-.75Z"></path>
                              <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306"></path>
                            </svg>
                            Animaux autorisés
                          </li>
                        )}
                        {methods.watch("rules.smokingAllowed") && (
                          <li className="flex items-center text-gray-700">
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
                              className="mr-2 text-green-600"
                            >
                              <path d="M18 12H2v4h16"></path>
                              <path d="M22 12v4"></path>
                              <path d="M7 12v4"></path>
                              <path d="M18 8c0-2.5-2-2.5-2-5"></path>
                              <path d="M22 8c0-2.5-2-2.5-2-5"></path>
                            </svg>
                            Fumeurs autorisés
                          </li>
                        )}
                        {methods.watch("rules.eventsAllowed") && (
                          <li className="flex items-center text-gray-700">
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
                              className="mr-2 text-green-600"
                            >
                              <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"></path>
                              <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                              <path d="M12 17.5v-11"></path>
                            </svg>
                            Événements autorisés
                          </li>
                        )}
                        {methods.watch("rules.additionalRules") && (
                          <li className="flex items-start text-gray-700">
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
                              className="mr-2 mt-1 text-blue-600"
                            >
                              <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                              <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z"></path>
                              <path d="M9 9h1"></path>
                              <path d="M9 13h6"></path>
                              <path d="M9 17h6"></path>
                            </svg>
                            <div>
                              <span className="font-medium">Règles supplémentaires:</span>
                              <p className="text-sm mt-1 whitespace-pre-wrap">
                                {methods.watch("rules.additionalRules")}
                              </p>
                            </div>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 8 && (
                <div className="mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-full">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Documents requis</h3>
                  </div>

                  <p className="text-gray-600 mb-6">
                    Pour valider votre annonce, veuillez télécharger les documents suivants :
                  </p>

                  {/* Section des factures */}
                  <div className="mb-8">
                    <h4 className="text-md font-medium text-gray-700 mb-2 flex items-center">
                      <Receipt className="h-4 w-4 mr-2 text-blue-500" />
                      Factures des 3 derniers mois
                    </h4>
                    <p className="text-sm text-gray-500 mb-4">
                      Téléchargez vos factures d'électricité, d'eau ou de téléphone des 3 derniers mois pour confirmer
                      votre adresse.
                    </p>

                    {/* Zone de téléchargement des factures */}
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => {
                        const input = document.getElementById("id-card-upload");
                        if (input) input.click();
                      }}
                                          >
                      <input
                        type="file"
                        id="invoice-upload"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={handleInvoiceUpload}
                        disabled={uploadedFiles.invoices.length >= 3}
                      />
                      <div className="flex flex-col items-center justify-center">
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm font-medium text-gray-700">
                          {uploadedFiles.invoices.length >= 3
                            ? "Nombre maximum de factures atteint (3)"
                            : "Cliquez pour ajouter vos factures"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {uploadedFiles.invoices.length >= 3
                            ? "Supprimez une facture pour en ajouter une nouvelle"
                            : "PDF, JPG ou PNG • Max 3 factures"}
                        </p>
                      </div>
                    </div>

                    {/* Liste des factures téléchargées */}
                    {uploadedFiles.invoices.length > 0 && (
                      <div className="space-y-2 mt-4">
                        <h5 className="text-sm font-medium text-gray-700">
                          Factures téléchargées ({uploadedFiles.invoices.length}/3)
                        </h5>
                        <div className="space-y-2">
                          {uploadedFiles.invoices.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-200"
                            >
                              <div className="flex items-center">
                                <FileCheck className="h-5 w-5 text-green-500 mr-2" />
                                <div>
                                  <p className="text-sm font-medium text-gray-700 truncate max-w-xs">{file.name}</p>
                                  <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeInvoice(index)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                                aria-label="Supprimer la facture"
                              >
                                <FileX className="h-5 w-5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Section de la carte nationale */}
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-2 flex items-center">
                      <CreditCard className="h-4 w-4 mr-2 text-blue-500" />
                      Carte Nationale d'Identité
                    </h4>
                    <p className="text-sm text-gray-500 mb-4">
                      Téléchargez une copie de votre carte nationale d'identité pour vérifier votre identité.
                    </p>

                    {/* Zone de téléchargement de la carte nationale */}
                    {!uploadedFiles.idCard ? (
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => {
                          const input = document.getElementById("id-card-upload");
                          if (input) input.click();
                        }}
                                              >
                        <input
                          type="file"
                          id="id-card-upload"
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          onChange={handleIdCardUpload}
                        />
                        <div className="flex flex-col items-center justify-center">
                          <Upload className="h-10 w-10 text-gray-400 mb-2" />
                          <p className="text-sm font-medium text-gray-700">
                            Cliquez pour ajouter votre carte nationale
                          </p>
                          <p className="text-xs text-gray-500 mt-1">PDF, JPG ou PNG</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-200">
                        <div className="flex items-center">
                          <FileCheck className="h-5 w-5 text-green-500 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                              {uploadedFiles.idCard.name}
                            </p>
                            <p className="text-xs text-gray-500">{(uploadedFiles.idCard.size / 1024).toFixed(1)} KB</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeIdCard}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          aria-label="Supprimer la carte nationale"
                        >
                          <FileX className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Note sur la confidentialité */}
                  <div className="mt-6 bg-blue-50 p-4 rounded-md border border-blue-100">
                    <div className="flex items-start">
                      <Shield className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <h5 className="text-sm font-medium text-blue-700">Confidentialité et sécurité</h5>
                        <p className="text-xs text-blue-600 mt-1">
                          Vos documents sont traités de manière confidentielle et sécurisée. Ils ne seront utilisés que
                          pour vérifier votre identité et votre adresse, et ne seront jamais partagés avec des tiers
                          sans votre consentement.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 6 && (
                <div className="mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-full">
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
                        className="lucide lucide-home"
                      >
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Équipements de votre bien</h3>
                  </div>

                  <p className="text-gray-600 mb-4">
                    Sélectionnez les équipements disponibles dans votre propriété pour aider les locataires à mieux
                    comprendre ce qui est inclus.
                  </p>

                  <div className="space-y-4">
                    {/* Équipements intérieurs - Accordéon */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div
                        className={`flex items-center justify-between p-4 cursor-pointer ${
                          expandedCategory === "interior" ? "bg-blue-50" : "bg-white"
                        }`}
                        onClick={() => toggleCategory("interior")}
                      >
                        <div className="flex items-center space-x-3">
                          <span
                            className={`p-2 rounded-lg ${expandedCategory === "interior" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}
                          >
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
                              className="lucide lucide-sofa"
                            >
                              <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"></path>
                              <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z"></path>
                              <path d="M4 18v2"></path>
                              <path d="M20 18v2"></path>
                              <path d="M12 4v9"></path>
                            </svg>
                          </span>
                          <div>
                            <h4 className="font-medium text-gray-900">Équipements intérieurs</h4>
                            <p className="text-sm text-gray-500">
                              {(methods.watch("amenities.interior") || []).length} sélectionnés
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-3 text-blue-600">
                            {expandedCategory === "interior" ? "Réduire" : "Développer"}
                          </span>
                          {expandedCategory === "interior" ? (
                            <ChevronUp className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                      </div>

                      {expandedCategory === "interior" && (
                        <div className="p-4 bg-white border-t border-gray-200">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-medium text-gray-700">
                              {(methods.watch("amenities.interior") || []).length} équipements sélectionnés
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                toggleAllInCategory("interior", [
                                  "Balcon spacieux",
                                  "Toilette moderne",
                                  "Chauffage central",
                                  "Climatisation",
                                  "Cuisine équipée",
                                  "Placards intégrés",
                                  "Fenêtres double vitrage",
                                  "Dressing",
                                  "Buanderie",
                                  "Internet fibre optique",
                                  "Système d'alarme",
                                  "Porte blindée",
                                  "Rideaux électriques",
                                  "Cheminée",
                                  "Ascenseur",
                                  "Espace bureau à domicile",
                                  "Éclairage encastré",
                                ])
                              }
                              className="text-sm font-medium text-blue-600 hover:text-blue-800"
                            >
                              {(methods.watch("amenities.interior") || []).length === 17
                                ? "Tout désélectionner"
                                : "Tout sélectionner"}
                            </button>
                          </div>

                          <div className="bg-blue-50 p-3 rounded-md mb-4 text-sm text-blue-700 flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2 mt-0.5 flex-shrink-0"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="12" y1="16" x2="12" y2="12"></line>
                              <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                            <p>
                              Chaque équipement sélectionné sera affiché avec son texte et son icône dans la section
                              'Caractéristiques' de la page de prévisualisation, regroupé par catégorie.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {[
                              { name: "Balcon spacieux", icon: <Flower2 size={16} /> },
                              { name: "Toilette moderne", icon: <Bath size={16} /> },
                              { name: "Chauffage central", icon: <Flame size={16} /> },
                              { name: "Climatisation", icon: <Fan size={16} /> },
                              { name: "Cuisine équipée", icon: <UtensilsCrossed size={16} /> },
                              { name: "Placards intégrés", icon: <LayoutGrid size={16} /> },
                              { name: "Fenêtres double vitrage", icon: <Square size={16} /> },
                              { name: "Dressing", icon: <ShirtFolded size={16} /> },
                              { name: "Buanderie", icon: <Washing size={16} /> },
                              { name: "Internet fibre optique", icon: <Wifi size={16} /> },
                              { name: "Système d'alarme", icon: <Bell size={16} /> },
                              { name: "Porte blindée", icon: <Shield size={16} /> },
                              { name: "Rideaux électriques", icon: <Blinds size={16} /> },
                              { name: "Cheminée", icon: <Flame size={16} /> },
                              { name: "Ascenseur", icon: <ArrowUpDown size={16} /> },
                              { name: "Espace bureau à domicile", icon: <Briefcase size={16} /> },
                              { name: "Éclairage encastré", icon: <Lightbulb size={16} /> },
                            ].map((item, index) => {
                              const isChecked = (methods.watch("amenities.interior") || []).includes(item.name)
                              return (
                                <div
                                  key={`interior-${index}`}
                                  className={`flex items-center p-2 rounded-md ${
                                    isChecked ? "bg-blue-50" : "hover:bg-gray-50"
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    id={`interior-${index}`}
                                    className="sr-only"
                                    onChange={(e) => {
                                      const currentInterior = methods.watch("amenities.interior") || []
                                      if (e.target.checked) {
                                        methods.setValue("amenities.interior", [...currentInterior, item.name])

                                        // Mettre à jour les amenities pour la prévisualisation
                                        const currentAmenities = methods.watch("propertyDetails.amenities") || []
                                        const iconName =
                                          Object.keys(LucideIcons).find(
                                            (key) => LucideIcons[key as keyof typeof LucideIcons] === item.icon.type,
                                          ) || "CircleDot"

                                        methods.setValue("propertyDetails.amenities", [
                                          ...currentAmenities,
                                          {
                                            name: item.name,
                                            category: "Intérieur",
                                            icon: iconName,
                                          },
                                        ])
                                      } else {
                                        methods.setValue(
                                          "amenities.interior",
                                          currentInterior.filter((i) => i !== item.name),
                                        )

                                        // Retirer l'amenity de la prévisualisation
                                        const currentAmenities = methods.watch("propertyDetails.amenities") || []
                                        methods.setValue(
                                          "propertyDetails.amenities",
                                          currentAmenities.filter((a) => a.name !== item.name),
                                        )
                                      }
                                    }}
                                    checked={isChecked}
                                  />
                                  <label
                                    htmlFor={`interior-${index}`}
                                    className="flex items-center cursor-pointer w-full"
                                  >
                                    <span
                                      className={`flex-shrink-0 w-5 h-5 mr-2 flex items-center justify-center rounded border ${
                                        isChecked ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300"
                                      }`}
                                    >
                                      {isChecked && <Check className="h-3 w-3" />}
                                    </span>
                                    <div className="flex items-center">
                                      <span className="bg-blue-50 text-blue-600 p-1 rounded-md mr-2">
                                        {item.icon || <CircleDot size={16} />}
                                      </span>
                                      <span className="text-sm">{item.name}</span>
                                    </div>
                                  </label>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Équipements extérieurs - Accordéon */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div
                        className={`flex items-center justify-between p-4 cursor-pointer ${
                          expandedCategory === "exterior" ? "bg-green-50" : "bg-white"
                        }`}
                        onClick={() => toggleCategory("exterior")}
                      >
                        <div className="flex items-center space-x-3">
                          <span
                            className={`p-2 rounded-lg ${expandedCategory === "exterior" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
                          >
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
                              className="lucide lucide-tree"
                            >
                              <path d="M17 14h.01"></path>
                              <path d="M17 18h.01"></path>
                              <path d="M12 14h.01"></path>
                              <path d="M12 18h.01"></path>
                              <path d="M7 14h.01"></path>
                              <path d="M7 18h.01"></path>
                              <path d="M17 10h-2a5 5 0 0 0-10 0H3l2 8h14l2-8Z"></path>
                              <path d="M12 10v4"></path>
                            </svg>
                          </span>
                          <div>
                            <h4 className="font-medium text-gray-900">Équipements extérieurs</h4>
                            <p className="text-sm text-gray-500">
                              {(methods.watch("amenities.exterior") || []).length} sélectionnés
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-3 text-green-600">
                            {expandedCategory === "exterior" ? "Réduire" : "Développer"}
                          </span>
                          {expandedCategory === "exterior" ? (
                            <ChevronUp className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                      </div>

                      {expandedCategory === "exterior" && (
                        <div className="p-4 bg-white border-t border-gray-200">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-medium text-gray-700">
                              {(methods.watch("amenities.exterior") || []).length} équipements sélectionnés
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                toggleAllInCategory("exterior", [
                                  "Jardin privé",
                                  "Piscine privée",
                                  "Terrasse ou patio",
                                  "Cour intérieure",
                                  "Espace barbecue",
                                  "Toit exploitable",
                                  "Grandes fenêtres extérieures",
                                  "Façade sur mer / montagne",
                                  "Garage privé ou fermé",
                                  "Aire de jeux pour enfants",
                                  "Clôture extérieure",
                                  "Système d'arrosage automatique",
                                  "Espace vert partagé",
                                  "Parking",
                                ])
                              }
                              className="text-sm font-medium text-green-600 hover:text-green-800"
                            >
                              {(methods.watch("amenities.exterior") || []).length === 14
                                ? "Tout désélectionner"
                                : "Tout sélectionner"}
                            </button>
                          </div>

                          <div className="bg-green-50 p-3 rounded-md mb-4 text-sm text-green-700 flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2 mt-0.5 flex-shrink-0"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="12" y1="16" x2="12" y2="12"></line>
                              <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                            <p>
                              Chaque équipement sélectionné sera affiché avec son texte et son icône dans la section
                              'Caractéristiques' de la page de prévisualisation, regroupé par catégorie.
                            </p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {[
                              { name: "Jardin privé", icon: <Flower2 size={16} /> },
                              { name: "Piscine privée", icon: <Waves size={16} /> },
                              { name: "Terrasse ou patio", icon: <PalmTree size={16} /> },
                              { name: "Cour intérieure", icon: <Trees size={16} /> },
                              { name: "Espace barbecue", icon: <Flame size={16} /> },
                              { name: "Toit exploitable", icon: <Home size={16} /> },
                              { name: "Grandes fenêtres extérieures", icon: <LayoutGrid size={16} /> },
                              { name: "Façade sur mer / montagne", icon: <Mountain size={16} /> },
                              { name: "Garage privé ou fermé", icon: <Car size={16} /> },
                              { name: "Aire de jeux pour enfants", icon: <CircleDot size={16} /> },
                              { name: "Clôture extérieure", icon: <CircleDot size={16} /> },
                              { name: "Système d'arrosage automatique", icon: <Droplets size={16} /> },
                              { name: "Espace vert partagé", icon: <Sprout size={16} /> },
                              { name: "Parking", icon: <ParkingSquare size={16} /> },
                            ].map((item, index) => {
                              const isChecked = (methods.watch("amenities.exterior") || []).includes(item.name)
                              return (
                                <div
                                  key={`exterior-${index}`}
                                  className={`flex items-center p-2 rounded-md ${
                                    isChecked ? "bg-green-50" : "hover:bg-gray-50"
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    id={`exterior-${index}`}
                                    className="sr-only"
                                    onChange={(e) => {
                                      const currentExterior = methods.watch("amenities.exterior") || []
                                      if (e.target.checked) {
                                        methods.setValue("amenities.exterior", [...currentExterior, item.name])

                                        // Mettre à jour les amenities pour la prévisualisation
                                        const currentAmenities = methods.watch("propertyDetails.amenities") || []
                                        const iconName =
                                          Object.keys(LucideIcons).find(
                                            (key) => LucideIcons[key as keyof typeof LucideIcons] === item.icon.type,
                                          ) || "CircleDot"

                                        methods.setValue("propertyDetails.amenities", [
                                          ...currentAmenities,
                                          {
                                            name: item.name,
                                            category: "Extérieur",
                                            icon: iconName,
                                          },
                                        ])
                                      } else {
                                        methods.setValue(
                                          "amenities.exterior",
                                          currentExterior.filter((i) => i !== item.name),
                                        )

                                        // Retirer l'amenity de la prévisualisation
                                        const currentAmenities = methods.watch("propertyDetails.amenities") || []
                                        methods.setValue(
                                          "propertyDetails.amenities",
                                          currentAmenities.filter((a) => a.name !== item.name),
                                        )
                                      }
                                    }}
                                    checked={isChecked}
                                  />
                                  <label
                                    htmlFor={`exterior-${index}`}
                                    className="flex items-center cursor-pointer w-full"
                                  >
                                    <span
                                      className={`flex-shrink-0 w-5 h-5 mr-2 flex items-center justify-center rounded border ${
                                        isChecked ? "bg-green-600 border-green-600 text-white" : "border-gray-300"
                                      }`}
                                    >
                                      {isChecked && <Check className="h-3 w-3" />}
                                    </span>
                                    <div className="flex items-center">
                                      <span className="bg-green-50 text-green-600 p-1 rounded-md mr-2">
                                        {item.icon || <CircleDot size={16} />}
                                      </span>
                                      <span className="text-sm">{item.name}</span>
                                    </div>
                                  </label>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Équipements à proximité - Accordéon */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div
                        className={`flex items-center justify-between p-4 cursor-pointer ${
                          expandedCategory === "proximity" ? "bg-amber-50" : "bg-white"
                        }`}
                        onClick={() => toggleCategory("proximity")}
                      >
                        <div className="flex items-center space-x-3">
                          <span
                            className={`p-2 rounded-lg ${expandedCategory === "proximity" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-700"}`}
                          >
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
                              className="lucide lucide-map-pin"
                            >
                              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                          </span>
                          <div>
                            <h4 className="font-medium text-gray-900">Équipements à proximité</h4>
                            <p className="text-sm text-gray-500">
                              {(methods.watch("amenities.proximity") || []).length} sélectionnés
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-3 text-amber-600">
                            {expandedCategory === "proximity" ? "Réduire" : "Développer"}
                          </span>
                          {expandedCategory === "proximity" ? (
                            <ChevronUp className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                      </div>

                      {expandedCategory === "proximity" && (
                        <div className="p-4 bg-white border-t border-gray-200">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-medium text-gray-700">
                              {(methods.watch("amenities.proximity") || []).length} équipements à proximité sélectionnés
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                toggleAllInCategory("proximity", [
                                  "Transports en commun",
                                  "Écoles et universités",
                                  "Commerces et supermarchés",
                                  "Restaurants et cafés",
                                  "Parcs et espaces verts",
                                  "Centres médicaux",
                                  "Centres sportifs",
                                  "Centres commerciaux",
                                  "Plages",
                                  "Lieux culturels",
                                  "Lieux de culte",
                                  "Pharmacies",
                                  "Banques",
                                  "Marchés locaux",
                                ])
                              }
                              className="text-sm font-medium text-amber-600 hover:text-amber-800"
                            >
                              {(methods.watch("amenities.proximity") || []).length === 14
                                ? "Tout désélectionner"
                                : "Tout sélectionner"}
                            </button>
                          </div>

                          <div className="bg-amber-50 p-3 rounded-md mb-4 text-sm text-amber-700 flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2 mt-0.5 flex-shrink-0"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="12" y1="16" x2="12" y2="12"></line>
                              <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                            <p>
                              Chaque équipement sélectionné sera affiché avec son texte et son icône dans la section
                              'Caractéristiques' de la page de prévisualisation, regroupé par catégorie.
                            </p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {[
                              { name: "Transports en commun", icon: <Bus size={16} /> },
                              { name: "Écoles et universités", icon: <GraduationCap size={16} /> },
                              { name: "Commerces et supermarchés", icon: <Store size={16} /> },
                              { name: "Restaurants et cafés", icon: <Coffee size={16} /> },
                              { name: "Parcs et espaces verts", icon: <Trees size={16} /> },
                              { name: "Centres médicaux", icon: <Stethoscope size={16} /> },
                              { name: "Centres sportifs", icon: <Dumbbell size={16} /> },
                              { name: "Centres commerciaux", icon: <ShoppingBag size={16} /> },
                              { name: "Plages", icon: <Waves size={16} /> },
                              { name: "Lieux culturels", icon: <Landmark size={16} /> },
                              { name: "Lieux de culte", icon: <Church size={16} /> },
                              { name: "Pharmacies", icon: <Pill size={16} /> },
                              { name: "Banques", icon: <Building size={16} /> },
                              { name: "Marchés locaux", icon: <Store size={16} /> },
                            ].map((item, index) => {
                              const isChecked = (methods.watch("amenities.proximity") || []).includes(item.name)
                              return (
                                <div
                                  key={`proximity-${index}`}
                                  className={`flex items-center p-2 rounded-md ${
                                    isChecked ? "bg-amber-50" : "hover:bg-gray-50"
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    id={`proximity-${index}`}
                                    className="sr-only"
                                    onChange={(e) => {
                                      const currentProximity = methods.watch("amenities.proximity") || []
                                      if (e.target.checked) {
                                        methods.setValue("amenities.proximity", [...currentProximity, item.name])

                                        // Mettre à jour les amenities pour la prévisualisation
                                        const currentAmenities = methods.watch("propertyDetails.amenities") || []
                                        const iconName =
                                          Object.keys(LucideIcons).find(
                                            (key) => LucideIcons[key as keyof typeof LucideIcons] === item.icon.type,
                                          ) || "CircleDot"

                                        methods.setValue("propertyDetails.amenities", [
                                          ...currentAmenities,
                                          {
                                            name: item.name,
                                            category: "À proximité",
                                            icon: iconName,
                                          },
                                        ])
                                      } else {
                                        methods.setValue(
                                          "amenities.proximity",
                                          currentProximity.filter((i) => i !== item.name),
                                        )

                                        // Retirer l'amenity de la prévisualisation
                                        const currentAmenities = methods.watch("propertyDetails.amenities") || []
                                        methods.setValue(
                                          "propertyDetails.amenities",
                                          currentAmenities.filter((a) => a.name !== item.name),
                                        )
                                      }
                                    }}
                                    checked={isChecked}
                                  />
                                  <label
                                    htmlFor={`proximity-${index}`}
                                    className="flex items-center cursor-pointer w-full"
                                  >
                                    <span
                                      className={`flex-shrink-0 w-5 h-5 mr-2 flex items-center justify-center rounded border ${
                                        isChecked ? "bg-amber-600 border-amber-600 text-white" : "border-gray-300"
                                      }`}
                                    >
                                      {isChecked && <Check className="h-3 w-3" />}
                                    </span>
                                    <div className="flex items-center">
                                      <span className="bg-amber-50 text-amber-600 p-1 rounded-md mr-2">
                                        {item.icon || <MapPin size={16} />}
                                      </span>
                                      <span className="text-sm">{item.name}</span>
                                    </div>
                                  </label>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <PropertySubmissionForm
                onSubmit={methods.handleSubmit(onSubmit)}
                onFieldFocus={handleFieldFocus}
                onFieldBlur={handleFieldBlur}
                currentStep={currentStep}
                goToNextStep={goToNextStep}
                goToPreviousStep={goToPreviousStep}
                totalSteps={totalSteps}
              />

              {/* Indicateur de progression */}
              <div className="mt-8">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>
                    Étape {currentStep} sur {totalSteps}
                  </span>
                  <span>{Math.round((currentStep / totalSteps) * 100)}% complété</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Prévisualisation (occupe 1/3 de l'écran sur grand écran) */}
          {showPreview && (
            <div className="lg:col-span-1">
              <div className="sticky top-24" id="property-preview">
                <h2 className="text-xl font-semibold mb-4">Prévisualisation en temps réel</h2>
                {/* Log pour déboguer les équipements */}

                 {/* الكود JSX الخاص بك */}
      <DirectPropertyPreview
        activeField={isValidPreviewField(activeField) ? activeField : null}
        currentStep={currentStep}
        formAmenities={{
          interior: methods.watch("amenities.interior") || [],
          exterior: methods.watch("amenities.exterior") || [],
          proximity: methods.watch("amenities.proximity") || [],
        }}
        useFormData={true}
      />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Alerte de confirmation après soumission */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <div className="text-center mb-4">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Annonce soumise avec succès!</h2>
              <p className="text-gray-600 mt-2">
                Votre annonce a été soumise et est en cours de validation. Vous recevrez une notification dès qu'elle
                sera publiée.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => {
                  setShowConfirmation(false)
                  // Réinitialiser le formulaire ou rediriger
                }}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
              >
                Fermer
              </button>
              <button
                onClick={navigateToDashboard}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Voir mon tableau de bord
              </button>
            </div>
          </div>
        </div>
      )}
    </FormProvider>
  )
}
}