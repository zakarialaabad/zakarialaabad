import { useMemo } from "react"
import { useFormContext } from "react-hook-form"
import { PropertyTypeIcon } from "@/components/illustrations/property-type-icon"
import { TenantTypeIcon } from "@/components/illustrations/tenant-type-icon"
import { Badge } from "@/components/ui/badge"
import { Bed, Bath, Users, MapPin, Calendar, Clock, Ban, Wifi } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
// Importons les composants nécessaires de Framer Motion
import { motion } from "framer-motion"
export function PropertyPreview() {
  // Vérifier si le contexte du formulaire est disponible
  const formContext = useFormContext()
  // Valeurs par défaut pour la prévisualisation
  const defaultValues = {
    title: "Titre de votre annonce",
    description: "Description de votre bien immobilier...",
    propertyType: "Appartement",
    tenantType: "tous",
    city: "Casablanca",
    district: "maarif",
    bedrooms: 1,
    bathrooms: 1,
    area: 50,
    maxGuests: 2,
    price: 1500,
    availableFrom: new Date(),
    minStay: 1,
    images: [],
    amenities: [],
    rules: [],
  }
  // Observer les valeurs du formulaire si le contexte est disponible
  // Utiliser useMemo pour éviter les recalculs inutiles
  const previewData = useMemo(() => {
    return formContext ? { ...defaultValues, ...formContext.watch() } : defaultValues
  }, [formContext])
  // Fonction pour tronquer le texte
  const truncateText = (text:string, maxLength:number) => {
    if (!text) return ""
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
  }
  // Fonction pour obtenir le libellé du type de propriété
  const getPropertyTypeLabel = (type:string) => {
    switch (type) {
      case "Appartement":
        return "Appartement"
      case "Maison":
        return "Maison"
      case "Riad":
        return "Riad"
      case "Villa":
        return "Villa"
      case "Studio":
        return "Studio"
      case "Chambre":
        return "Chambre"
      case "Duplex":
        return "Duplex"
      case "Penthouse":
        return "Penthouse"
      case "Loft":
        return "Loft"
      default:
        return type
    }
  }
  // Fonction pour obtenir le libellé du type de locataire
  const getTenantTypeLabel = (type:string) => {
    switch (type) {
      case "tous":
        return "Tous types de locataires"
      case "famille":
        return "Familles"
      case "couple":
        return "Couples"
      case "etudiants":
        return "Étudiants"
      case "celibataire":
        return "Célibataires"
      case "fonctionnaire":
        return "Fonctionnaires"
      default:
        return "Tous types de locataires"
    }
  }

  // Fonction pour obtenir la couleur du type de propriété
  const getPropertyTypeColor = (type:string) => {
    switch (type) {
      case "Appartement":
        return "text-blue-500"
      case "Maison":
        return "text-green-500"
      case "Riad":
        return "text-amber-500"
      case "Villa":
        return "text-purple-500"
      case "Studio":
        return "text-rose-500"
      case "Chambre":
        return "text-indigo-500"
      case "Duplex":
        return "text-cyan-500"
      case "Penthouse":
        return "text-emerald-500"
      case "Loft":
        return "text-orange-500"
      default:
        return "text-gray-500"
    }
  }

  // Remplaçons le conteneur principal par une version animée
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.h3
          className="font-bold text-xl"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
        >
          Prévisualisation de l'annonce
        </motion.h3>
        <motion.p
          className="text-blue-100 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Voici comment votre annonce apparaîtra aux locataires
        </motion.p>
      </motion.div>

      <div className="p-6">
        {/* Image principale avec animation */}
        <motion.div
          className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-gray-100"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          {previewData.images && previewData.images.length > 0 ? (
           <img
           src={previewData.images[0].preview || "/placeholder.svg"}
           alt="Photo principale"
           style={{ objectFit: "cover", width: "100%", height: "100%" }}
         />
         
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <motion.svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </motion.svg>
                <motion.p
                  className="mt-2 text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  Ajoutez des photos pour visualiser votre annonce
                </motion.p>
              </motion.div>
            </div>
          )}

          {/* Badge du type de bien avec animation */}
          <motion.div
            className="absolute top-3 left-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <Badge
              className="bg-white text-gray-800 hover:bg-white/90 shadow-md px-3 py-1.5 text-xs font-medium flex items-center gap-1.5"
              variant="outline"
            >
              <PropertyTypeIcon
                type={previewData.propertyType.toLowerCase()}
                className={getPropertyTypeColor(previewData.propertyType)}
              />
              {getPropertyTypeLabel(previewData.propertyType)}
            </Badge>
          </motion.div>

          {/* Badge du prix avec animation */}
          <motion.div
            className="absolute bottom-3 right-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            <Badge className="bg-primary hover:bg-primary/90 shadow-md px-3 py-1.5">
              <span className="font-bold">{previewData.price} DH</span>
              <span className="text-xs font-normal ml-1">/ mois</span>
            </Badge>
          </motion.div>
        </motion.div>

        {/* Titre et description avec animation */}
        <motion.h2
          className="text-xl font-bold text-gray-800 mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {truncateText(previewData.title, 60)}
        </motion.h2>
        <motion.p
          className="text-gray-600 text-sm mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {truncateText(previewData.description, 120)}
        </motion.p>

        {/* Caractéristiques avec animation */}
        <motion.div
          className="flex flex-wrap gap-3 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.div
            className="flex items-center text-gray-600 text-sm"
            whileHover={{ scale: 1.05, color: "#4153a4" }}
            transition={{ duration: 0.2 }}
          >
            <Bed className="h-4 w-4 mr-1 text-gray-400" />
            <span>
              {previewData.bedrooms} chambre{previewData.bedrooms > 1 ? "s" : ""}
            </span>
          </motion.div>
          <motion.div
            className="flex items-center text-gray-600 text-sm"
            whileHover={{ scale: 1.05, color: "#4153a4" }}
            transition={{ duration: 0.2 }}
          >
            <Bath className="h-4 w-4 mr-1 text-gray-400" />
            <span>
              {previewData.bathrooms} salle{previewData.bathrooms > 1 ? "s" : ""} de bain
            </span>
          </motion.div>
          <motion.div
            className="flex items-center text-gray-600 text-sm"
            whileHover={{ scale: 1.05, color: "#4153a4" }}
            transition={{ duration: 0.2 }}
          >
            <Users className="h-4 w-4 mr-1 text-gray-400" />
            <span>
              Max {previewData.maxGuests} personne{previewData.maxGuests > 1 ? "s" : ""}
            </span>
          </motion.div>
        </motion.div>

        {/* Localisation */}
        <div className="flex items-start mb-4">
          <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <div className="ml-2">
            <p className="text-gray-700 text-sm font-medium">
              {previewData.district
                ? `${previewData.district.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}, ${previewData.city}`
                : previewData.city}
            </p>
            <p className="text-gray-500 text-xs">Adresse complète visible après réservation</p>
          </div>
        </div>

        {/* Disponibilité */}
        <div className="flex items-start mb-4">
          <Calendar className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <div className="ml-2">
            <p className="text-gray-700 text-sm font-medium">
              Disponible à partir du{" "}
              {previewData.availableFrom
                ? format(new Date(previewData.availableFrom), "d MMMM yyyy", { locale: fr })
                : "..."}
            </p>
          </div>
        </div>

        {/* Durée minimale */}
        <div className="flex items-start mb-4">
          <Clock className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <div className="ml-2">
            <p className="text-gray-700 text-sm font-medium">
              Durée minimale: {previewData.minStay} {previewData.minStay > 1 ? "mois" : "mois"}
            </p>
          </div>
        </div>

        {/* Type de locataire préféré */}
        <div className="flex items-start mb-4">
          <div className="flex-shrink-0 mt-0.5">
            <TenantTypeIcon type={previewData.tenantType} className="h-4 w-4 text-gray-400" />
          </div>
          <div className="ml-2">
            <p className="text-gray-700 text-sm font-medium">
              Idéal pour: {getTenantTypeLabel(previewData.tenantType)}
            </p>
          </div>
        </div>

        {/* Équipements */}
        {previewData.amenities && previewData.amenities.length > 0 && (
          <div className="flex items-start mb-4">
            <div className="flex-shrink-0 mt-0.5">
              <Wifi className="h-4 w-4 text-gray-400" />
            </div>
            <div className="ml-2">
              <p className="text-gray-700 text-sm font-medium">Équipements:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {previewData.amenities.slice(0, 3).map((amenity, index) => (
                  <Badge key={index} variant="outline" className="text-xs font-normal">
                    {amenity === "wifi"
                      ? "Wi-Fi"
                      : amenity === "tv"
                        ? "Télévision"
                        : amenity === "parking"
                          ? "Parking"
                          : amenity === "kitchen"
                            ? "Cuisine équipée"
                            : amenity === "ac"
                              ? "Climatisation"
                              : amenity === "heating"
                                ? "Chauffage"
                                : amenity === "washer"
                                  ? "Machine à laver"
                                  : amenity === "pool"
                                    ? "Piscine"
                                    : amenity === "terrace"
                                      ? "Terrasse"
                                      : amenity === "garden"
                                        ? "Jardin"
                                        : amenity === "view"
                                          ? "Vue panoramique"
                                          : amenity === "beach"
                                            ? "Accès plage"
                                            : "Montagne"}
                  </Badge>
                ))}
                {previewData.amenities.length > 3 && (
                  <Badge variant="outline" className="text-xs font-normal">
                    +{previewData.amenities.length - 3} autres
                  </Badge>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Règles principales */}
        {previewData.rules && previewData.rules.length > 0 && (
          <div className="flex items-start mb-4">
            <Ban className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="ml-2">
              <p className="text-gray-700 text-sm font-medium">Règles principales:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {previewData.rules.slice(0, 3).map((rule, index) => (
                  <Badge key={index} variant="outline" className="text-xs font-normal">
                    {rule === "no_smoking"
                      ? "Non-fumeur"
                      : rule === "no_pets"
                        ? "Animaux non admis"
                        : rule === "no_parties"
                          ? "Pas de fêtes"
                          : rule === "no_children"
                            ? "Enfants non admis"
                            : "Heures calmes après 22h"}
                  </Badge>
                ))}
                {previewData.rules.length > 3 && (
                  <Badge variant="outline" className="text-xs font-normal">
                    +{previewData.rules.length - 3} autres
                  </Badge>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Note de prévisualisation avec animation */}
        <motion.div
          className="mt-6 bg-blue-50 rounded-lg p-3 text-sm text-blue-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          whileHover={{ scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
        >
          <motion.p
            className="font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            Note:
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.5 }}>
            Cette prévisualisation se met à jour au fur et à mesure que vous complétez le formulaire.
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  )
}
