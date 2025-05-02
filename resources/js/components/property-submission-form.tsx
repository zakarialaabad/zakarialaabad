
import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { useNotifications } from "@/contexts/notifications-context"
import {
  MapPin,
  Wifi,
  Tv,
  Car,
  Utensils,
  Wind,
  Snowflake,
  Save,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Loader2,
  Home,
  Building,
  Castle,
  Warehouse,
  Hotel,
  DoorClosed,
  Users,
  User,
  GraduationCap,
  Briefcase,
  Star,
  WashingMachine,
  PocketIcon as Pool,
  Trees,
  Mountain,
  Waves,
  Sun,
  Eye,
  Clock,
  Calendar,
  CalendarRange,
  Info,
} from "lucide-react"

// Schéma de validation pour le formulaire
const propertySchema = z.object({
  // Étape 1: Informations de base
  title: z.string().min(5, "Le titre doit contenir au moins 5 caractères"),
  description: z.string().min(20, "La description doit contenir au moins 20 caractères"),
  propertyType: z.enum([
    "Appartement",
    "Maison",
    "Riad",
    "Villa",
    "Studio",
    "Chambre",
    "Duplex",
    "Penthouse",
    "Loft",
    "Ferme",
    "Chalet",
    "Lodge",
    "Bureau",
    "Cabane",
  ]),
  tenantType: z.enum(["tous", "famille", "couple", "etudiants", "celibataire", "fonctionnaire"]),
  rentalPeriod: z.enum(["long", "court", "flexible"]), // Ajout de la durée de location (long terme, court terme, flexible)

  // Étape 2: Localisation
  address: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  city: z.string().min(2, "Veuillez sélectionner une ville"),
  district: z.string().min(2, "Veuillez sélectionner un quartier"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),

  // Étape 3: Caractéristiques
  bedrooms: z.number().min(0),
  bathrooms: z.number().min(0),
  area: z.number().min(1, "La superficie doit être d'au moins 1 m²"),
  maxGuests: z.number().min(1, "Le nombre d'invités doit être d'au moins 1"),

  // Étape 4: Équipements
  amenities: z.array(z.string()),

  // Étape 5: Photos
  images: z.array(z.any()).min(1, "Veuillez ajouter au moins une photo"),

  // Étape 6: Prix et disponibilité
  price: z.number().min(1, "Le prix doit être d'au moins 1 DH"),
  availableFrom: z.date(),
  availableTo: z.date().optional(),
  minStay: z.number().min(1, "La durée minimale doit être d'au moins 1 mois"),

  // Étape 7: Règles et préférences
  rules: z.array(z.string()),
  customRules: z.string().optional(),

  // Informations supplémentaires
  rating: z.number().optional(),
})

type PropertyFormValues = z.infer<typeof propertySchema>

// Liste des villes marocaines
const moroccanCities = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Fès",
  "Tanger",
  "Agadir",
  "Meknès",
  "Oujda",
  "Kénitra",
  "Tétouan",
  "Safi",
  "El Jadida",
  "Mohammedia",
  "Béni Mellal",
  "Nador",
  "Taza",
  "Settat",
  "Laayoune",
  "Ifrane",
  "Merzouga",
  "Imlil",
]

// Quartiers par ville
const districtsByCity: Record<string, string[]> = {
  Laayoune: ["al-matar", "al-wifaq", "al-qods", "el-aouda", "hay-salam", "hay-el-massira", "madinat-al-wahda"],
  Casablanca: ["maarif", "anfa", "bourgogne", "gauthier", "racine", "californie", "ain-diab"],
  Rabat: ["agdal", "hay-riad", "souissi", "hassan", "les-orangers", "centre-ville"],
  Marrakech: ["medina", "gueliz", "hivernage", "palmeraie", "majorelle", "agdal"],
  Fès: ["medina-fes", "ville-nouvelle", "route-immouzer", "route-ain-chkef"],
  Agadir: ["marina", "sonaba", "founty", "charaf", "talborjt"],
  Ifrane: ["ifrane-center", "hay-atlas", "hay-riad"],
  Merzouga: ["desert"],
  Imlil: ["atlas"],
}

// Liste des équipements
const amenitiesList = [
  { id: "wifi", label: "Wi-Fi", icon: <Wifi className="h-4 w-4" /> },
  { id: "tv", label: "Télévision", icon: <Tv className="h-4 w-4" /> },
  { id: "parking", label: "Parking", icon: <Car className="h-4 w-4" /> },
  { id: "kitchen", label: "Cuisine équipée", icon: <Utensils className="h-4 w-4" /> },
  { id: "ac", label: "Climatisation", icon: <Snowflake className="h-4 w-4" /> },
  { id: "heating", label: "Chauffage", icon: <Wind className="h-4 w-4" /> },
  { id: "washer", label: "Machine à laver", icon: <WashingMachine className="h-4 w-4" /> },
  { id: "pool", label: "Piscine", icon: <Pool className="h-4 w-4" /> },
  { id: "terrace", label: "Terrasse", icon: <Sun className="h-4 w-4" /> },
  { id: "garden", label: "Jardin", icon: <Trees className="h-4 w-4" /> },
  { id: "view", label: "Vue panoramique", icon: <Eye className="h-4 w-4" /> },
  { id: "beach", label: "Accès plage", icon: <Waves className="h-4 w-4" /> },
  { id: "mountain", label: "Vue montagne", icon: <Mountain className="h-4 w-4" /> },
]

// Liste des règles
const rulesList = [
  { id: "no_smoking", label: "Non-fumeur" },
  { id: "no_pets", label: "Animaux non admis" },
  { id: "no_parties", label: "Pas de fêtes" },
  { id: "no_children", label: "Enfants non admis" },
  { id: "quiet_hours", label: "Heures calmes après 22h" },
]

interface PropertySubmissionFormProps {
  onSubmit: (data: PropertyFormValues) => void
}

export function PropertySubmissionForm({ onSubmit }: PropertySubmissionFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [savedDraft, setSavedDraft] = useState(false)
  const [savingDraft, setSavingDraft] = useState(false)
  const [showTooltip, setShowTooltip] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState("Casablanca")
  const [districts, setDistricts] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addNotification } = useNotifications()
  const [isInitialized, setIsInitialized] = useState(false)

  // Nombre total d'étapes
  const totalSteps = 7

  // Initialiser le formulaire avec des valeurs par défaut
  const methods = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      propertyType: "Appartement",
      tenantType: "tous",
      rentalPeriod: "long",
      address: "",
      city: "Casablanca",
      district: "maarif",
      bedrooms: 1,
      bathrooms: 1,
      area: 50,
      maxGuests: 2,
      amenities: [],
      images: [],
      price: 1500,
      availableFrom: new Date(),
      minStay: 1,
      rules: [],
      customRules: "",
      rating: 4.0,
    },
    mode: "onChange",
  })

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors, isValid, isDirty },
  } = methods

  // Observer les valeurs du formulaire pour la prévisualisation
  const formValues = watch()

  // Mettre à jour les quartiers disponibles lorsque la ville change
  useEffect(() => {
    const city = formValues.city
    if (city && districtsByCity[city]) {
      setDistricts(districtsByCity[city])
      setSelectedCity(city)

      // Si le quartier actuel n'est pas dans la liste des quartiers de la nouvelle ville,
      // sélectionner le premier quartier disponible
      if (!districtsByCity[city].includes(formValues.district)) {
        setValue("district", districtsByCity[city][0])
      }
    } else {
      setDistricts([])
    }
  }, [formValues.city, setValue])

  // Effet pour s'assurer que le formulaire est initialisé correctement
  useEffect(() => {
    // Marquer le formulaire comme initialisé après le premier rendu
    setIsInitialized(true)

    // Toujours commencer à l'étape 1 lors de l'ouverture dans un nouvel onglet
    setCurrentStep(1)
  }, [])

  // Effet pour sauvegarder automatiquement le brouillon
  useEffect(() => {
    if (isDirty && isInitialized) {
      const timer = setTimeout(() => {
        localStorage.setItem("propertyDraft", JSON.stringify(formValues))
        if (!savedDraft) {
          setSavedDraft(true)
          addNotification({
            title: "Brouillon sauvegardé",
            message:
              "Votre annonce a été sauvegardée automatiquement. Vous pouvez la retrouver dans votre tableau de bord.",
            type: "info",
          })
        }
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [formValues, isDirty, addNotification, savedDraft, isInitialized])

  // Charger un brouillon sauvegardé
  useEffect(() => {
    const savedDraft = localStorage.getItem("propertyDraft")
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft)
        // Convertir les dates
        if (parsedDraft.availableFrom) {
          parsedDraft.availableFrom = new Date(parsedDraft.availableFrom)
        }
        if (parsedDraft.availableTo) {
          parsedDraft.availableTo = new Date(parsedDraft.availableTo)
        }

        // Mettre à jour le formulaire avec les valeurs sauvegardées
        Object.entries(parsedDraft).forEach(([key, value]) => {
          // @ts-ignore
          setValue(key, value)
        })

        addNotification({
          title: "Brouillon chargé",
          message: "Votre brouillon a été chargé avec succès. Vous pouvez continuer à remplir votre annonce.",
          type: "success",
        })
      } catch (error) {
        console.error("Erreur lors du chargement du brouillon:", error)
      }
    }
  }, [setValue, addNotification])

  // Gérer le changement d'étape
  const goToNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Empêcher le comportement par défaut qui pourrait causer un défilement
    e.preventDefault()

    if (currentStep < totalSteps) {
      // Sauvegarder la position de défilement actuelle
      const currentScrollPosition = window.scrollY

      // Mettre à jour l'étape
      setCurrentStep(currentStep + 1)

      // Utiliser un setTimeout pour s'assurer que le changement d'étape est appliqué avant de restaurer la position
      setTimeout(() => {
        // Restaurer la position de défilement
        window.scrollTo({
          top: currentScrollPosition,
          behavior: "auto", // Utiliser "auto" au lieu de "smooth" pour éviter une animation visible
        })
      }, 0)
    }
  }

  // Modifions également la fonction goToPreviousStep pour la cohérence
  const goToPreviousStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Empêcher le comportement par défaut
    e.preventDefault()

    if (currentStep > 1) {
      // Sauvegarder la position de défilement actuelle
      const currentScrollPosition = window.scrollY

      // Mettre à jour l'étape
      setCurrentStep(currentStep - 1)

      // Restaurer la position de défilement
      setTimeout(() => {
        window.scrollTo({
          top: currentScrollPosition,
          behavior: "auto",
        })
      }, 0)
    }
  }

  // Gérer l'upload d'images
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newPhotos = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
      }))

      setValue("images", [...formValues.images, ...newPhotos], { shouldValidate: true })
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newPhotos = Array.from(e.dataTransfer.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
      }))

      setValue("images", [...formValues.images, ...newPhotos], { shouldValidate: true })
    }
  }

  const removePhoto = (index: number) => {
    const updatedPhotos = [...formValues.images]
    updatedPhotos.splice(index, 1)
    setValue("images", updatedPhotos, { shouldValidate: true })
  }

  // Gérer la sauvegarde manuelle du brouillon
  const saveDraft = () => {
    setSavingDraft(true)
    setTimeout(() => {
      localStorage.setItem("propertyDraft", JSON.stringify(formValues))
      setSavedDraft(true)
      setSavingDraft(false)
      addNotification({
        title: "Brouillon sauvegardé",
        message: "Votre annonce a été sauvegardée. Vous pouvez la retrouver dans votre tableau de bord.",
        type: "success",
      })
    }, 1000)
  }

  // Gérer la soumission finale
  const submitForm = (data: PropertyFormValues) => {
    // Envoyer les données au parent
    onSubmit(data)

    // Supprimer le brouillon
    localStorage.removeItem("propertyDraft")

    // Réinitialiser le formulaire
    methods.reset()
  }

  // Animation pour les transitions entre étapes
  const variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  }

  // Fonction pour afficher un tooltip d'aide
  const renderTooltip = (id: string, content: string) => (
    <div className="relative inline-block ml-1">
      <HelpCircle
        className="h-4 w-4 text-gray-400 cursor-help"
        onMouseEnter={() => setShowTooltip(id)}
        onMouseLeave={() => setShowTooltip(null)}
      />
      {showTooltip === id && (
        <div className="absolute z-50 w-64 p-3 bg-white rounded-lg shadow-lg border border-gray-200 text-sm text-gray-700 -right-2 top-6">
          {content}
          <div className="absolute -top-2 right-2 w-3 h-3 bg-white border-t border-l border-gray-200 transform rotate-45"></div>
        </div>
      )}
    </div>
  )

  // Fonction pour obtenir l'icône du type de propriété
  const getPropertyTypeIcon = (type: string) => {
    switch (type) {
      case "Appartement":
        return <Building className="mr-2 h-4 w-4 text-blue-500" />
      case "Maison":
        return <Home className="mr-2 h-4 w-4 text-green-500" />
      case "Riad":
        return <Castle className="mr-2 h-4 w-4 text-amber-500" />
      case "Villa":
        return <Home className="mr-2 h-4 w-4 text-purple-500" />
      case "Studio":
        return <Building className="mr-2 h-4 w-4 text-rose-500" />
      case "Chambre":
        return <DoorClosed className="mr-2 h-4 w-4 text-indigo-500" />
      case "Duplex":
        return <Building className="mr-2 h-4 w-4 text-cyan-500" />
      case "Penthouse":
        return <Building className="mr-2 h-4 w-4 text-emerald-500" />
      case "Loft":
        return <Warehouse className="mr-2 h-4 w-4 text-orange-500" />
      case "Ferme":
        return <Home className="mr-2 h-4 w-4 text-lime-500" />
      case "Chalet":
        return <Home className="mr-2 h-4 w-4 text-sky-500" />
      case "Lodge":
        return <Hotel className="mr-2 h-4 w-4 text-amber-600" />
      case "Cabane":
        return <Home className="mr-2 h-4 w-4 text-brown-500" />
      case "Bureau":
        return <Briefcase className="mr-2 h-4 w-4 text-gray-700" />
      default:
        return <Home className="mr-2 h-4 w-4 text-gray-500" />
    }
  }

  // Fonction pour obtenir l'icône du type de locataire
  const getTenantTypeIcon = (type: string) => {
    switch (type) {
      case "tous":
        return <Users className="mr-2 h-4 w-4 text-blue-500" />
      case "famille":
        return <Users className="mr-2 h-4 w-4 text-green-500" />
      case "couple":
        return <Users className="mr-2 h-4 w-4 text-pink-500" />
      case "etudiants":
        return <GraduationCap className="mr-2 h-4 w-4 text-amber-500" />
      case "celibataire":
        return <User className="mr-2 h-4 w-4 text-purple-500" />
      case "fonctionnaire":
        return <Briefcase className="mr-2 h-4 w-4 text-indigo-500" />
      default:
        return <Users className="mr-2 h-4 w-4 text-gray-500" />
    }
  }

  // Fonction pour gérer la sélection des équipements
  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    const currentAmenities = getValues("amenities") || []

    if (checked) {
      setValue("amenities", [...currentAmenities, amenityId], { shouldValidate: true })
    } else {
      setValue(
        "amenities",
        currentAmenities.filter((id) => id !== amenityId),
        { shouldValidate: true },
      )
    }
  }

  // Fonction pour gérer la sélection des règles
  const handleRuleChange = (ruleId: string, checked: boolean) => {
    const currentRules = getValues("rules") || []

    if (checked) {
      setValue("rules", [...currentRules, ruleId], { shouldValidate: true })
    } else {
      setValue(
        "rules",
        currentRules.filter((id) => id !== ruleId),
        { shouldValidate: true },
      )
    }
  }

  return (
    <FormProvider {...methods}>
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Barre de progression */}
        <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
            <div>
              <h3 className="font-bold text-xl text-gray-800">
                Étape {currentStep} sur {totalSteps}
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                {currentStep === 1 && "Informations de base"}
                {currentStep === 2 && "Localisation"}
                {currentStep === 3 && "Caractéristiques"}
                {currentStep === 4 && "Équipements"}
                {currentStep === 5 && "Photos"}
                {currentStep === 6 && "Prix et disponibilité"}
                {currentStep === 7 && "Règles et préférences"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {savedDraft && (
                <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Sauvegardé
                </div>
              )}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-gray-600 flex items-center gap-1 hover:bg-gray-200"
                onClick={saveDraft}
                disabled={savingDraft}
              >
                {savingDraft ? (
                  <>
                    <Loader2 className="h-3 w-3 animate-spin mr-1" />
                    Sauvegarde...
                  </>
                ) : (
                  <>
                    <Save className="h-3 w-3 mr-1" />
                    Sauvegarder
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-primary to-blue-500 h-3 rounded-full"
                initial={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              ></motion.div>
            </div>

            <div className="flex justify-between mt-2">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <motion.div
                  key={index}
                  className={`flex flex-col items-center ${index < currentStep ? "text-primary" : "text-gray-400"}`}
                  style={{ width: `${100 / totalSteps}%` }}
                  initial={{ opacity: 0.7, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: index + 1 === currentStep ? 1.1 : 1,
                    transition: {
                      delay: index * 0.05,
                      duration: 0.3,
                    },
                  }}
                >
                  <motion.div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      index + 1 === currentStep
                        ? "bg-primary text-white"
                        : index < currentStep
                          ? "bg-primary/20 text-primary"
                          : "bg-gray-200 text-gray-500"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {index + 1 < currentStep ? <CheckCircle2 className="h-3 w-3" /> : index + 1}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(submitForm)} className="p-8">
          <AnimatePresence mode="wait">
            {/* Étape 1: Informations de base */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">Informations de base</h2>
                  <p className="text-gray-600">
                    Commençons par les informations essentielles de votre bien immobilier.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <Label htmlFor="title" className="text-gray-700 font-medium">
                        Titre de l'annonce <span className="text-red-500">*</span>
                      </Label>
                      {renderTooltip(
                        "title-help",
                        "Choisissez un titre accrocheur qui met en valeur les points forts de votre bien.",
                      )}
                    </div>
                    <Input
                      id="title"
                      placeholder="Ex: Bel appartement lumineux au centre-ville"
                      {...register("title")}
                      className={cn(
                        "bg-gray-50 border-gray-200 focus:bg-white transition-colors",
                        errors.title && "border-red-300 focus:border-red-500 bg-red-50",
                      )}
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <Label htmlFor="description" className="text-gray-700 font-medium">
                        Description <span className="text-red-500">*</span>
                      </Label>
                      {renderTooltip(
                        "description-help",
                        "Décrivez votre bien en détail. Mentionnez l'ambiance, la vue, la proximité des commodités, etc.",
                      )}
                    </div>
                    <Textarea
                      id="description"
                      placeholder="Décrivez votre bien en détail (caractéristiques, environnement, points forts...)"
                      rows={5}
                      {...register("description")}
                      className={cn(
                        "bg-gray-50 border-gray-200 focus:bg-white transition-colors resize-none",
                        errors.description && "border-red-300 focus:border-red-500 bg-red-50",
                      )}
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="propertyType" className="text-gray-700 font-medium mb-2 block">
                        Type de bien <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        defaultValue={formValues.propertyType}
                        onValueChange={(value) => setValue("propertyType", value as any)}
                      >
                        <SelectTrigger
                          className={cn(
                            "bg-gray-50 border-gray-200 focus:bg-white transition-colors hover:bg-gray-100",
                            errors.propertyType && "border-red-300 focus:border-red-500 bg-red-50",
                          )}
                        >
                          <SelectValue placeholder="Sélectionnez un type de bien" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Appartement">
                            <div className="flex items-center">
                              {getPropertyTypeIcon("Appartement")}
                              <span>Appartement</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="Maison">
                            <div className="flex items-center">
                              {getPropertyTypeIcon("Maison")}
                              <span>Maison</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="Riad">
                            <div className="flex items-center">
                              {getPropertyTypeIcon("Riad")}
                              <span>Riad</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="Villa">
                            <div className="flex items-center">
                              {getPropertyTypeIcon("Villa")}
                              <span>Villa</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="Studio">
                            <div className="flex items-center">
                              {getPropertyTypeIcon("Studio")}
                              <span>Studio</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="Chambre">
                            <div className="flex items-center">
                              {getPropertyTypeIcon("Chambre")}
                              <span>Chambre</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="Duplex">
                            <div className="flex items-center">
                              {getPropertyTypeIcon("Duplex")}
                              <span>Duplex</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="Bureau">
                            <div className="flex items-center">
                              {getPropertyTypeIcon("Bureau")}
                              <span>Bureau</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="Penthouse">
                            <div className="flex items-center">
                              {getPropertyTypeIcon("Penthouse")}
                              <span>Penthouse</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="Loft">
                            <div className="flex items-center">
                              {getPropertyTypeIcon("Loft")}
                              <span>Loft</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.propertyType && (
                        <p className="text-red-500 text-sm mt-1">{errors.propertyType.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="tenantType" className="text-gray-700 font-medium mb-2 block">
                        Type de locataire préféré
                      </Label>
                      <Select
                        defaultValue={formValues.tenantType}
                        onValueChange={(value) => setValue("tenantType", value as any)}
                      >
                        <SelectTrigger className="bg-gray-50 border-gray-200 focus:bg-white transition-colors hover:bg-gray-100">
                          <SelectValue placeholder="Sélectionnez un type de locataire" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tous">
                            <div className="flex items-center">
                              {getTenantTypeIcon("tous")}
                              <span>Tous types</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="famille">
                            <div className="flex items-center">
                              {getTenantTypeIcon("famille")}
                              <span>Famille</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="couple">
                            <div className="flex items-center">
                              {getTenantTypeIcon("couple")}
                              <span>Couple</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="etudiants">
                            <div className="flex items-center">
                              {getTenantTypeIcon("etudiants")}
                              <span>Étudiants</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="celibataire">
                            <div className="flex items-center">
                              {getTenantTypeIcon("celibataire")}
                              <span>Célibataire</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="fonctionnaire">
                            <div className="flex items-center">
                              {getTenantTypeIcon("fonctionnaire")}
                              <span>Fonctionnaire</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="rentalPeriod" className="text-gray-700 font-medium mb-2 block">
                      Type de location <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      defaultValue={formValues.rentalPeriod}
                      onValueChange={(value) => setValue("rentalPeriod", value as any)}
                    >
                      <SelectTrigger
                        className={cn(
                          "bg-gray-50 border-gray-200 focus:bg-white transition-colors hover:bg-gray-100",
                          errors.rentalPeriod && "border-red-300 focus:border-red-500 bg-red-50",
                        )}
                      >
                        <SelectValue placeholder="Sélectionnez la durée de location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="long">
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-blue-500" />
                            <span>Long terme (plus de 3 mois)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="court">
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-purple-500" />
                            <span>Court terme (moins de 3 mois)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="flexible">
                          <div className="flex items-center">
                            <CalendarRange className="mr-2 h-4 w-4 text-green-500" />
                            <span>Flexible (durée variable)</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.rentalPeriod && <p className="text-red-500 text-sm mt-1">{errors.rentalPeriod.message}</p>}
                  </div>

                  <div className="mt-2 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-blue-700 font-medium">Conseil pour une meilleure annonce</p>
                        <p className="text-blue-600 text-sm mt-1">
                          Les annonces avec un titre descriptif, des photos de qualité et une description détaillée
                          reçoivent jusqu'à 60% plus de visites. Prenez le temps de bien décrire votre logement pour
                          attirer les meilleurs locataires.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Étape 2: Localisation */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">Localisation</h2>
                  <p className="text-gray-600">
                    Indiquez l'emplacement précis de votre bien pour aider les locataires à le trouver.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <Label htmlFor="address" className="text-gray-700 font-medium">
                        Adresse <span className="text-red-500">*</span>
                      </Label>
                      {renderTooltip(
                        "address-help",
                        "Entrez l'adresse complète de votre bien. Cette information sera visible uniquement après réservation.",
                      )}
                    </div>
                    <Input
                      id="address"
                      placeholder="Ex: 123 Rue Mohammed V"
                      {...register("address")}
                      className={cn(
                        "bg-gray-50 border-gray-200 focus:bg-white transition-colors",
                        errors.address && "border-red-300 focus:border-red-500 bg-red-50",
                      )}
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="city" className="text-gray-700 font-medium mb-2 block">
                        Ville <span className="text-red-500">*</span>
                      </Label>
                      <Select defaultValue={formValues.city} onValueChange={(value) => setValue("city", value)}>
                        <SelectTrigger
                          className={cn(
                            "bg-gray-50 border-gray-200 focus:bg-white transition-colors",
                            errors.city && "border-red-300 focus:border-red-500 bg-red-50",
                          )}
                        >
                          <SelectValue placeholder="Sélectionnez une ville" />
                        </SelectTrigger>
                        <SelectContent>
                          {moroccanCities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="district" className="text-gray-700 font-medium mb-2 block">
                        Quartier <span className="text-red-500">*</span>
                      </Label>
                      <Select defaultValue={formValues.district} onValueChange={(value) => setValue("district", value)}>
                        <SelectTrigger
                          className={cn(
                            "bg-gray-50 border-gray-200 focus:bg-white transition-colors",
                            errors.district && "border-red-300 focus:border-red-500 bg-red-50",
                          )}
                        >
                          <SelectValue placeholder="Sélectionnez un quartier" />
                        </SelectTrigger>
                        <SelectContent>
                          {districts.length > 0 ? (
                            districts.map((district) => (
                              <SelectItem key={district} value={district}>
                                {district.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="" disabled>
                              Sélectionnez d'abord une ville
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district.message}</p>}
                    </div>
                  </div>

                  <div className="mt-6">
                    <Label className="text-gray-700 font-medium mb-2 block">Emplacement sur la carte</Label>
                    <div className="mt-2 h-64 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden relative">
                      <div className="absolute inset-0 bg-[url('/placeholder.svg?key=jixys')] bg-cover bg-center opacity-50"></div>
                      <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm z-10">
                        <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="text-gray-700 font-medium">Carte interactive à intégrer ici</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Cliquez sur la carte pour définir l'emplacement précis
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Étape 3: Caractéristiques */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">Caractéristiques</h2>
                  <p className="text-gray-600">Précisez les caractéristiques principales de votre bien immobilier.</p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="bedrooms" className="text-gray-700 font-medium mb-2 block">
                        Nombre de chambres <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="bedrooms"
                        type="number"
                        min="0"
                        {...register("bedrooms", { valueAsNumber: true })}
                        className={cn(
                          "bg-gray-50 border-gray-200 focus:bg-white transition-colors",
                          errors.bedrooms && "border-red-300 focus:border-red-500 bg-red-50",
                        )}
                      />
                      {errors.bedrooms && <p className="text-red-500 text-sm mt-1">{errors.bedrooms.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="bathrooms" className="text-gray-700 font-medium mb-2 block">
                        Nombre de salles de bain <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="bathrooms"
                        type="number"
                        min="0"
                        {...register("bathrooms", { valueAsNumber: true })}
                        className={cn(
                          "bg-gray-50 border-gray-200 focus:bg-white transition-colors",
                          errors.bathrooms && "border-red-300 focus:border-red-500 bg-red-50",
                        )}
                      />
                      {errors.bathrooms && <p className="text-red-500 text-sm mt-1">{errors.bathrooms.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="area" className="text-gray-700 font-medium mb-2 block">
                        Superficie (m²) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="area"
                        type="number"
                        min="1"
                        {...register("area", { valueAsNumber: true })}
                        className={cn(
                          "bg-gray-50 border-gray-200 focus:bg-white transition-colors",
                          errors.area && "border-red-300 focus:border-red-500 bg-red-50",
                        )}
                      />
                      {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="maxGuests" className="text-gray-700 font-medium mb-2 block">
                        Nombre maximum d'occupants <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="maxGuests"
                        type="number"
                        min="1"
                        {...register("maxGuests", { valueAsNumber: true })}
                        className={cn(
                          "bg-gray-50 border-gray-200 focus:bg-white transition-colors",
                          errors.maxGuests && "border-red-300 focus:border-red-500 bg-red-50",
                        )}
                      />
                      {errors.maxGuests && <p className="text-red-500 text-sm mt-1">{errors.maxGuests.message}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="rating" className="text-gray-700 font-medium mb-2 block">
                      Qualité du bien (1-5)
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="rating"
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        {...register("rating", { valueAsNumber: true })}
                        className="bg-gray-50 border-gray-200 focus:bg-white transition-colors w-24"
                      />
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${
                              (formValues.rating || 0) >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">(Aide à définir les attentes des locataires)</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Étape 4: Équipements */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">Équipements</h2>
                  <p className="text-gray-600">Sélectionnez les équipements disponibles dans votre bien immobilier.</p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {amenitiesList.map((amenity) => {
                      const isChecked = formValues.amenities?.includes(amenity.id)
                      return (
                        <div key={amenity.id} className="flex items-start space-x-2">
                          <Checkbox
                            id={`amenity-${amenity.id}`}
                            checked={isChecked}
                            onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
                            className="mt-1"
                          />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor={`amenity-${amenity.id}`}
                              className={`text-sm font-medium flex items-center ${
                                isChecked ? "text-primary" : "text-gray-700"
                              }`}
                            >
                              <span className={`mr-2 ${isChecked ? "text-primary" : "text-gray-500"}`}>
                                {amenity.icon}
                              </span>
                              {amenity.label}
                            </Label>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-700 text-sm">
                    <strong>Conseil :</strong> Les biens avec plus d'équipements sont généralement plus attractifs pour
                    les locataires et peuvent justifier un loyer plus élevé.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Étape 5: Photos */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">Photos</h2>
                  <p className="text-gray-600">
                    Ajoutez des photos de qualité pour mettre en valeur votre bien immobilier.
                  </p>
                </div>

                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center ${
                    errors.images ? "border-red-300 bg-red-50" : "border-gray-300 bg-gray-50"
                  }`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="images"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <motion.svg
                        className="h-16 w-16 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 1.5 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </motion.svg>
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">Glissez et déposez vos photos ici</p>
                      <p className="text-gray-500 text-sm mt-1">ou</p>
                    </div>
                    <div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-white hover:bg-gray-100"
                      >
                        Parcourir vos fichiers
                      </Button>
                    </div>
                    <p className="text-gray-500 text-xs">
                      Formats acceptés: JPG, PNG, WEBP. Taille maximale: 5 MB par image.
                    </p>
                  </div>
                </div>

                {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}

                {formValues.images && formValues.images.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-medium text-gray-700 mb-3">Photos téléchargées ({formValues.images.length})</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {formValues.images.map((photo, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                            <img
                              src={photo.preview || "/placeholder.svg"}
                              alt={`Photo ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-red-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                          {index === 0 && (
                            <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                              Photo principale
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Étape 6: Prix et disponibilité */}
            {currentStep === 6 && (
              <motion.div
                key="step6"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">Prix et disponibilité</h2>
                  <p className="text-gray-600">Définissez le prix et la disponibilité de votre bien immobilier.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="price" className="text-gray-700 font-medium mb-2 block">
                      Prix mensuel (DH) <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="price"
                        type="number"
                        min="1"
                        {...register("price", { valueAsNumber: true })}
                        className={cn(
                          "bg-gray-50 border-gray-200 focus:bg-white transition-colors pl-12",
                          errors.price && "border-red-300 focus:border-red-500 bg-red-50",
                        )}
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none border-r border-gray-200">
                        <span className="text-gray-500">DH</span>
                      </div>
                    </div>
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="availableFrom" className="text-gray-700 font-medium mb-2 block">
                        Disponible à partir du <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="availableFrom"
                        type="date"
                        {...register("availableFrom", {
                          setValueAs: (v) => (v ? new Date(v) : new Date()),
                        })}
                        className={cn(
                          "bg-gray-50 border-gray-200 focus:bg-white transition-colors",
                          errors.availableFrom && "border-red-300 focus:border-red-500 bg-red-50",
                        )}
                      />
                      {errors.availableFrom && (
                        <p className="text-red-500 text-sm mt-1">{errors.availableFrom.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="minStay" className="text-gray-700 font-medium mb-2 block">
                        Durée minimale de séjour (mois) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="minStay"
                        type="number"
                        min="1"
                        {...register("minStay", { valueAsNumber: true })}
                        className={cn(
                          "bg-gray-50 border-gray-200 focus:bg-white transition-colors",
                          errors.minStay && "border-red-300 focus:border-red-500 bg-red-50",
                        )}
                      />
                      {errors.minStay && <p className="text-red-500 text-sm mt-1">{errors.minStay.message}</p>}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Étape 7: Règles et préférences */}
            {currentStep === 7 && (
              <motion.div
                key="step7"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">Règles et préférences</h2>
                  <p className="text-gray-600">Définissez les règles et préférences pour votre bien immobilier.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label className="text-gray-700 font-medium mb-4 block">Règles de la maison</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {rulesList.map((rule) => {
                        const isChecked = formValues.rules?.includes(rule.id)
                        return (
                          <div key={rule.id} className="flex items-start space-x-2">
                            <Checkbox
                              id={`rule-${rule.id}`}
                              checked={isChecked}
                              onCheckedChange={(checked) => handleRuleChange(rule.id, checked as boolean)}
                              className="mt-1"
                            />
                            <div className="grid gap-1.5 leading-none">
                              <Label
                                htmlFor={`rule-${rule.id}`}
                                className={`text-sm font-medium ${isChecked ? "text-primary" : "text-gray-700"}`}
                              >
                                {rule.label}
                              </Label>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <Label htmlFor="customRules" className="text-gray-700 font-medium">
                        Règles supplémentaires
                      </Label>
                      {renderTooltip(
                        "customRules-help",
                        "Ajoutez des règles spécifiques qui ne sont pas dans la liste ci-dessus.",
                      )}
                    </div>
                    <Textarea
                      id="customRules"
                      placeholder="Ex: Pas de bruit après 22h, pas de chaussures à l'intérieur..."
                      rows={3}
                      {...register("customRules")}
                      className="bg-gray-50 border-gray-200 focus:bg-white transition-colors resize-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Boutons de navigation */}
          <div className="mt-10 flex justify-between">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={goToPreviousStep}
                className="px-6 py-2.5 border-gray-300 hover:bg-gray-50 relative overflow-hidden group"
              >
                <span className="relative flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Précédent
                </span>
              </Button>
            ) : (
              <div></div>
            )}

            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={goToNextStep}
                className="bg-primary hover:bg-primary/90 px-6 py-2.5 relative overflow-hidden group"
              >
                <span className="relative flex items-center">
                  Suivant
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600 px-8 py-2.5 shadow-md relative overflow-hidden group"
              >
                <span className="relative flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Soumettre pour validation
                </span>
              </Button>
            )}
          </div>

          {/* Bouton de sauvegarde */}
          <div className="mt-4 text-center">
            <motion.div initial={{ opacity: 0.8 }} whileHover={{ opacity: 1 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="button"
                variant="ghost"
                className="text-gray-700 hover:bg-gray-100 transition-all duration-300"
                onClick={saveDraft}
                disabled={savingDraft}
              >
                {savingDraft ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:bg-gray-400 after:h-[1px] after:w-0 hover:after:w-full after:transition-all after:duration-300">
                      Sauvegarde en cours...
                    </span>
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:bg-gray-400 after:h-[1px] after:w-0 hover:after:w-full after:transition-all after:duration-300">
                      Sauvegarder comme brouillon
                    </span>
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </form>
      </div>
    </FormProvider>
  )
}
