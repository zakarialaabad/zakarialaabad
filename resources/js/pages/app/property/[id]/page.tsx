
import { useState, useEffect } from "react"
import { MapPin, Star, Heart, Share2, ChevronLeft, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PropertyAmenities } from "@/components/property-amenities"
import { PropertyMap } from "@/components/property-map"
import { PropertyReservationForm } from "@/components/property-reservation-form"
import { PropertyGallery } from "@/components/property-gallery"
import { PropertyOwner } from "@/components/property-owner"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
export default function PropertyDetails() {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Simuler un chargement pour montrer l'animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Données simulées pour la démonstration
  const property = {
    id: "1",
    title: "Appartement moderne avec vue sur la ville",
    location: "Hay Al Matar, Laayoune, 70000",
    price: 1300,
    priceUnit: "MAD/mois",
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    area: 65,
    propertyType: "Appartement",
    rating: 4.8,
    reviewCount: 32,
    description:
      "Magnifique appartement moderne situé dans un quartier calme et sécurisé. Profitez d'une vue imprenable sur la ville depuis le balcon spacieux. L'appartement est entièrement meublé et équipé pour vous offrir un confort optimal. Idéal pour les familles ou les professionnels en quête d'un logement de qualité pour une location longue durée.",
    owner: {
      id: "owner1",
      name: "Mohammed Alami",
      image: "/thoughtful-moroccan-professional.png",
      phone: "+212 6 12 34 56 78",
      responseRate: 98,
      responseTime: "Moins d'une heure",
      joinedDate: "Janvier 2020",
    },
    images: [
      "/riad-rooftop-vista.png",
      "/minimalist-moroccan-bedroom.png",
      "/moroccan-sleek-kitchen.png",
      "/riad-retreat.png",
      "/modern-moroccan-bath.png",
    ],
    amenities: [
      { name: "Appartement de 65m²", icon: "Home", category: "Général" },
      { name: "2 chambres", icon: "Building", category: "Général" },
      { name: "Quartier résidentiel", icon: "MapPin", category: "Général" },
      { name: "Balcon spacieux", icon: "Wind", category: "Intérieur" },
      { name: "Toilette moderne", icon: "Bath", category: "Intérieur" },
      { name: "Alimentation en eau", icon: "Droplets", category: "Intérieur" },
      { name: "Entièrement meublé", icon: "Armchair", category: "Intérieur" },
      { name: "Chauffage central", icon: "Flame", category: "Intérieur" },
      { name: "Parking gratuit", icon: "Car", category: "Extérieur" },
      { name: "Sécurité 24/7", icon: "Lock", category: "Extérieur" },
      { name: "Jardin commun", icon: "Flower2", category: "Extérieur" },
      { name: "Terrasse", icon: "Sun", category: "Extérieur" },
      { name: "Mosquée à 5 min", icon: "Mosque", category: "À proximité" },
      { name: "École primaire à 10 min", icon: "School", category: "À proximité" },
      { name: "Collège à 15 min", icon: "BookOpen", category: "À proximité" },
      { name: "Supermarché à 5 min", icon: "ShoppingCart", category: "À proximité" },
      { name: "Pharmacie à proximité", icon: "Pill", category: "À proximité" },
      { name: "Transport public", icon: "Bus", category: "À proximité" },
      { name: "Souk traditionnel", icon: "ShoppingBag", category: "À proximité" },
    ],
    rules: [
      "Pas de fêtes ni de soirées",
      "Non-fumeur",
      "Pas d'animaux",
      "Dépôt de garantie requis",
      "Contrat de location obligatoire",
    ],
    availability: {
      minStay: 12,
      maxStay: 60,
      availableFrom: "2023-06-01",
    },
  }

  // Variantes d'animation pour les différentes sections
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <AnimatePresence>
    <Header/>
      {isLoaded && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-white"
        >
          {/* Bouton retour avec animation */}
          <div className="container px-4 py-4 md:px-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <Button
                variant="ghost"
                size="sm"
                className="mb-4 flex items-center text-?gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
                onClick={() => window.history.back()}
>
                <ChevronLeft className="mr-1 h-4 w-4" />
                Retour aux résultats
              </Button>
            </motion.div>
          </div>

          {/* Galerie de photos - déjà animée dans le composant */}
          <PropertyGallery images={property.images} title={property.title} />

          {/* Contenu principal avec animations séquentielles */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="container grid grid-cols-1 gap-8 px-4 py-8 md:grid-cols-3 md:px-6 lg:grid-cols-3"
          >
            {/* Colonne principale */}
            <motion.div variants={itemVariants} className="md:col-span-2">
              <motion.div variants={itemVariants} className="mb-6 flex flex-col space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <motion.h1 variants={itemVariants} className="text-2xl font-bold text-gray-900 md:text-3xl">
                      {property.title}
                    </motion.h1>
                    <motion.div variants={itemVariants} className="mt-2 flex items-center text-sm text-gray-600">
                      <MapPin className="mr-1 h-4 w-4 text-gray-400" />
                      <span>{property.location}</span>
                    </motion.div>
                  </div>
                  <motion.div variants={itemVariants} className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-full transition-all duration-300"
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart
                        className={`h-5 w-5 transition-colors duration-300 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                      />
                      <span className="sr-only">Ajouter aux favoris</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-full transition-all duration-300"
                    >
                      <Share2 className="h-5 w-5 text-gray-600" />
                      <span className="sr-only">Partager</span>
                    </Button>
                  </motion.div>
                </div>

                <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center">
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 rounded-full border-primary/30 bg-primary/5 px-3 py-1 text-primary"
                    >
                      <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                      <span className="font-medium">{property.rating}</span>
                      <span className="text-gray-600">({property.reviewCount} avis)</span>
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">{property.bedrooms}</span>
                    <span className="mx-1">chambre{property.bedrooms > 1 ? "s" : ""}</span>
                    <span className="mx-2">•</span>
                    <span className="font-medium">{property.bathrooms}</span>
                    <span className="mx-1">salle{property.bathrooms > 1 ? "s" : ""} de bain</span>
                    <span className="mx-2">•</span>
                    <span className="font-medium">{property.area}</span>
                    <span className="mx-1">m²</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Onglets d'information avec animation */}
              <motion.div variants={itemVariants}>
                <Tabs defaultValue="description" className="mb-8">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="amenities">Caractéristiques</TabsTrigger>
                    <TabsTrigger value="rules">Règles</TabsTrigger>
                    <TabsTrigger value="location">Emplacement</TabsTrigger>
                  </TabsList>
                  <AnimatePresence mode="wait">
                    <TabsContent value="description" className="mt-6">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <p className="text-gray-700">{property.description}</p>
                        <div className="rounded-lg bg-blue-50 p-4">
                          <div className="flex items-start">
                            <Info className="mr-3 h-5 w-5 text-blue-500" />
                            <div>
                              <h4 className="font-medium text-blue-800">Informations importantes</h4>
                              <p className="mt-1 text-sm text-blue-700">
                                Ce logement est disponible pour une durée de {property.availability.minStay} à{" "}
                                {property.availability.maxStay} mois. Contrat de location et dépôt de garantie requis.
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </TabsContent>
                    <TabsContent value="amenities" className="mt-6">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <PropertyAmenities amenities={property.amenities} />
                      </motion.div>
                    </TabsContent>
                    <TabsContent value="rules" className="mt-6">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <h3 className="text-lg font-medium text-gray-900">Règles du logement</h3>
                        <ul className="space-y-2">
                          {property.rules.map((rule, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center text-gray-700"
                            >
                              <div className="mr-3 h-1.5 w-1.5 rounded-full bg-primary"></div>
                              {rule}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </TabsContent>
                    <TabsContent value="location" className="mt-6">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <PropertyMap location={property.location} />
                      </motion.div>
                    </TabsContent>
                  </AnimatePresence>
                </Tabs>
              </motion.div>

              {/* Informations sur le propriétaire avec animation */}
              <motion.div variants={itemVariants}>
                <PropertyOwner owner={property.owner} />
              </motion.div>
            </motion.div>

            {/* Colonne latérale avec formulaire de réservation */}
            <motion.div variants={itemVariants} className="md:col-span-1">
              <div className="sticky top-24">
                <PropertyReservationForm
                  price={property.price}
                  priceUnit={property.priceUnit}
                  maxGuests={property.guests}
                  owner={property.owner}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.main>
      )}
      <Footer/>
    </AnimatePresence>
  )
}
