import { useState, useEffect } from "react";
import { MapPin, Star, Heart, Share2, ChevronLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyPreviewAmenities } from "@/components/property-preview-amenities";
import { PropertyMap } from "@/components/property-map";
import { PropertyReservationForm } from "@/components/property-reservation-form";
import { PropertyGallery } from "@/components/property-gallery";
import { NotificationsProvider } from "@/contexts/notifications-context";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ShareDialog } from "@/components/share-dialog"
import { NotificationToastsManager } from "@/components/notifications/notification-toasts-manager";

interface Amenity {
  name: string;
  category: string;
  icon: string;
}
type Propriete = {
  id: number;
  loueur_id: number;
  ville: string;
  titre: string;
  typesLocaires: string;
  localisation: string;
  prixParMois: number;
  imgs: string[];
  regles: string[];
  description: string;
  disponibilite: boolean;
  type: string;
  nbrchambre: number;
  surface: number;
  adresse: string;
  admin_id: number;
  loueur: {
    id: number;
    user: {
      name: string;
      email: string;
      prenom: string;
      genre: string;
      telephone: string;
      profile: string;
    };
  };
  commodites: {
    id: number;
    commodite: string;
    categorie: string;
  }[];
};

type InertiaPageProps = {
  propriete: Propriete;
};

const ruleLabels: Record<string, string | { true: string; false: string }> = {
  petsAllowed: { true: "Animaux autorisés", false: "Animaux non autorisés" },
  smokingAllowed: { true: "Fumeur autorisé", false: "Non-fumeur" },
  eventsAllowed: { true: "Événements autorisés", false: "Pas de fêtes ni de soirées" },
  smallPetsOnly: "Petits animaux uniquement",
  petFee: "Frais supplémentaires pour animaux",
  petDeposit: "Caution supplémentaire pour animaux",
  smokingOutdoorOnly: "Fumer autorisé uniquement à l'extérieur",
  ecigaretteAllowed: "Cigarettes électroniques autorisées",
  noDrugs: "Drogues interdites",
  partiesAllowed: "Fêtes autorisées avec autorisation préalable",
  additionalGuestsAllowed: "Invités supplémentaires autorisés",
  guestRegistration: "Enregistrement des invités requis",
  quietHours: "Heures de tranquillité à respecter",
  noLoudMusic: "Musique forte interdite",
  respectNeighbors: "Respect des voisins exigé",
  noPartiesWeekdays: "Pas de fêtes en semaine",
  childFriendly: "Adapté aux enfants",
  babyFriendly: "Adapté aux bébés",
  familyFriendly: "Adapté aux familles",
  childSafetyFeatures: "Équipements de sécurité pour enfants",
  noCandles: "Bougies interdites",
  noModifications: "Pas de modifications du logement",
  cleaningRequired: "Nettoyage requis avant le départ",
  trashDisposalRules: "Règles de gestion des déchets",
  depositWithheld: "Caution retenue en cas de dommages",
  earlyTermination: "Conditions de résiliation anticipée",
  additionalFees: "Frais supplémentaires possibles",
  penaltyDetails: "Détails des pénalités",
};

// Fonction pour obtenir التسمية من الكائن ruleLabels
const getRuleLabel = (key: string, value: any): string => {
  const label = ruleLabels[key];
  if (typeof label === 'object' && label !== null) {
    if (value === true && 'true' in label) {
      return label.true;
    } else if (value === false && 'false' in label) {
      return label.false;
    }
  }
  return typeof label === 'string' ? label : '';
};

// Function to get icon name for amenity
const getIconNameForAmenity = (name: string, category: string): string => {
  const iconMapping: { [key: string]: string } = {
    // Intérieur
    "Balcon spacieux": "Flower2",
    "Toilette moderne": "Bath",
    "Chauffage central": "Flame",
    "Climatisation": "Wind",
    "Cuisine équipée": "UtensilsCrossed",
    "Placards intégrés": "LayoutGrid",
    "Fenêtres double vitrage": "Square",
    "Dressing": "Armchair",
    "Buanderie": "Droplets",
    "Internet fibre optique": "Wifi",
    "Système d'alarme": "Bell",
    "Porte blindée": "Lock",
    "Rideaux électriques": "Blinds",
    "Cheminée": "Flame",
    "Ascenseur": "ArrowUpDown",
    "Espace bureau à domicile": "Briefcase",
    "Éclairage encastré": "Lightbulb",

    // Extérieur
    "Jardin privé": "Flower2",
    "Piscine privée": "Waves",
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
    "Parking": "ParkingSquare",

    // À proximité
    "École": "GraduationCap",
    "Supermarché": "Store",
    "Transports en commun": "Bus",
    "Hôpital proche": "Stethoscope",
    "Parc public": "Trees",
    "Salle de sport": "Dumbbell",
    "Centre commercial": "ShoppingBag",
    "Pharmacie": "Pill",
    "Plage": "Waves",
    "Mosquée ou Église": "Church",
    "Marché local": "Store",
    "Café ou restaurant": "Coffee",
    "Station-service": "Fuel",
    "Banque ou distributeur": "Building",
    "Université ou institut": "GraduationCap",
    "Cinéma proche": "Film",
    "Bibliothèque municipale": "BookOpen",
    "Boulangerie ou pâtisserie": "Cake",
    "Arrêt de tramway": "Tram",
    "Zone piétonne": "Walk",
    "Centre culturel": "Landmark",
    "Piscine municipale": "Waves",
    "École maternelle": "GraduationCap",
    "Collège ou lycée": "GraduationCap",
    "Clinique vétérinaire": "Stethoscope",
    "Parc pour enfants": "CircleDot",
    "Centre d'affaires": "Briefcase",
    "Poste de police": "Shield",
    "Bureau de poste": "Mail",
    "Zone industrielle proche": "Factory",
  };

  return iconMapping[name] || (category === "Intérieur" ? "Home" : category === "Extérieur" ? "Tree" : "MapPin");
};

export default function PropertyDetails({ propriete }: InertiaPageProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)

  // Parse images if they are of type string
  let parsedImages: string[] = [];
  try {
    if (typeof propriete.imgs === "string") {
      const temp = JSON.parse(propriete.imgs);
      if (Array.isArray(temp)) {
        parsedImages = temp.filter((img) => typeof img === "string" && img.trim() !== "");
      }
    } else if (Array.isArray(propriete.imgs)) {
      parsedImages = propriete.imgs.filter((img) => typeof img === "string" && img.trim() !== "");
    }
  } catch (error) {
    console.warn("Invalid image data:", error);
  }

  const safeImages = parsedImages.length > 0 ? parsedImages : ["/placeholder.svg"];

  // Map commodites to amenities
  const amenities: Amenity[] = propriete.commodites.map((commodite) => ({
    name: commodite.commodite,
    category: commodite.categorie,
    icon: getIconNameForAmenity(commodite.commodite, commodite.categorie),
  }));

  // Simulate loading to show animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      console.log("Current imgs:", propriete.imgs); // Debugging line
    }, 100);
    return () => clearTimeout(timer);
  }, [propriete.imgs]); // Add propriete.imgs as a dependency

  // Simulated data for demonstration
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
    amenities: amenities, // Use the mapped amenities
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
  };

  // Animation variants for different sections
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  let regles: string[] = [];
  try {
    if (typeof propriete.regles === "string") {
      const temp = JSON.parse(propriete.regles);
      if (Array.isArray(temp)) {
        regles = temp;
      }
    } else if (Array.isArray(propriete.regles)) {
      regles = propriete.regles;
    } else {
      regles = [];
    }
  } catch (e) {
    regles = [];
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#465baa]"></div>
      </div>
    );
  }

  return (
    <NotificationsProvider>
      <NotificationToastsManager />
      <AnimatePresence>
        <Header />
        {isLoaded && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-white"
          >
            {/* Back button with animation */}
            <div className="container px-4 py-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="mb-4 flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
                  onClick={() => window.history.back()}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Retour aux résultats
                </Button>
              </motion.div>
            </div>

            {/* Photo gallery - already animated in the component */}
            <PropertyGallery images={safeImages} title={propriete.titre} />

            {/* Main content with sequential animations */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="container grid grid-cols-1 gap-8 px-4 py-8 md:grid-cols-3 md:px-6 lg:grid-cols-3"
            >
              {/* Main column */}
              <motion.div variants={itemVariants} className="md:col-span-2">
                <motion.div variants={itemVariants} className="mb-6 flex flex-col space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <motion.h1 variants={itemVariants} className="text-2xl font-bold text-gray-900 md:text-3xl">
                        {propriete.titre}
                      </motion.h1>
                      <motion.div variants={itemVariants} className="mt-2 flex items-center text-sm text-gray-600">
                        <MapPin className="mr-1 h-4 w-4 text-gray-400" />
                        <span>{propriete.localisation}</span>
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
                          className={`h-5 w-5 transition-colors duration-300 ${
                            isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                          }`}
                        />
                        <span className="sr-only">Ajouter aux favoris</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-full transition-all duration-300"
                        onClick={() => setIsShareDialogOpen(true)}
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
                      <span className="font-medium">{propriete.nbrchambre}</span>
                      <span className="mx-1">chambre{propriete.nbrchambre > 1 ? "s" : ""}</span>
                      <span className="mx-2">•</span>
                      <span className="font-medium">{propriete.nbrchambre}</span>
                      <span className="mx-1">salle{propriete.nbrchambre > 1 ? "s" : ""} de bain</span>
                      <span className="mx-2">•</span>
                      <span className="font-medium">{propriete.surface}</span>
                      <span className="mx-1">m²</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Information tabs with animation */}
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
                          <p className="text-gray-700">{propriete.description}</p>
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
                          <PropertyPreviewAmenities amenities={amenities} />
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
                            {regles.map((rule, index) => (
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
              </motion.div>

              {/* Sidebar with reservation form */}
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
        <ShareDialog isOpen={isShareDialogOpen} onClose={() => setIsShareDialogOpen(false)} property={property} />
        <Footer />
      </AnimatePresence>
    </NotificationsProvider>
  );
}
