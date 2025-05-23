import { useState, useEffect } from "react";
import { MapPin, Star, Heart, Share2, ChevronLeft, Info, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyPreviewAmenities } from "@/components/property-preview-amenities";
import { PropertyMap } from "@/components/property-map";
import { PropertyReservationForm } from "@/components/property-reservation-form";
import { PropertyGallery } from "@/components/property-gallery";
import { PropertyOwner } from "@/components/property-owner";
import { motion, AnimatePresence } from "framer-motion";
import { router } from "@inertiajs/react";

// Étendre لاجهة Window لتضمين خاصية مخصصة
declare global {
  interface Window {
    propertyPreviewImages?: any[];
  }
}

// Mapping مفاتيح القواعد إلى التسميات القابلة للعرض
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

interface Amenity {
  name: string;
  category: string;
  icon: string;
}

interface Owner {
  id: string;
  name: string;
  image: string;
  phone: string;
  responseRate: number;
  responseTime: string;
  joinedDate: string;
}

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  priceUnit: string;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  area: number;
  propertyType: string;
  tenantType: string;
  rating: number;
  reviewCount: number;
  description: string;
  owner: Owner;
  images: any[];
  amenities: Amenity[];
  rules: string[];
  availability: {
    minStay: number;
    maxStay: number;
    availableFrom: Date;
  };
}

export default function PropertyPreviewDetails() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [previewData, setPreviewData] = useState<any>(null);
  const [propertyImages, setPropertyImages] = useState<any[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>([]);
  const [selectedRules, setSelectedRules] = useState<string[]>([]);
  const [consequences, setConsequences] = useState<string[]>([]);

  // Charger les données de prévisualisation depuis le localStorage
  useEffect(() => {
    try {
      // Récupérer les données de base
      const previewDataString = localStorage.getItem("propertyPreviewData");
      if (previewDataString) {
        const previewData = JSON.parse(previewDataString);
        setPreviewData(previewData);

        // Récupérer le nombre d'images
        const imageCount = localStorage.getItem("propertyPreviewImageCount");

        // Récupérer les images depuis la variable window
        if (typeof window !== "undefined" && window.propertyPreviewImages && imageCount) {
          // @ts-ignore - Accessing custom property from window
          const imagesFromWindow = window.propertyPreviewImages;
          setPropertyImages(imagesFromWindow);
        } else {
          // Fallback pour la compatibilité avec l'ancien code
          try {
            const firstImageString = sessionStorage.getItem("propertyPreviewFirstImage");
            if (firstImageString) {
              const firstImage = JSON.parse(firstImageString);
              setPropertyImages([firstImage]);
            }
          } catch (imgError) {
            console.error("Error loading image data:", imgError);
          }
        }

        // Récupérer les caractéristiques sélectionnées depuis le localStorage
        try {
          // Récupérer les données du formulaire
          const formData = localStorage.getItem("propertyDraft");
          if (formData) {
            const parsedFormData = JSON.parse(formData);

            // Extraire les équipements sélectionnés
            const interior = parsedFormData.amenities?.interior || [];
            const exterior = parsedFormData.amenities?.exterior || [];
            const proximity = parsedFormData.amenities?.proximity || [];

            // Créer un tableau d'équipements formatés
            const formattedAmenities: Amenity[] = [
              ...interior.map((item: string) => ({
                name: item,
                category: "Intérieur",
                icon: getIconNameForAmenity(item, "Intérieur"),
              })),
              ...exterior.map((item: string) => ({
                name: item,
                category: "Extérieur",
                icon: getIconNameForAmenity(item, "Extérieur"),
              })),
              ...proximity.map((item: string) => ({
                name: item,
                category: "À proximité",
                icon: getIconNameForAmenity(item, "À proximité"),
              })),
            ];

            console.log("Équipements formatés:", formattedAmenities);
            setSelectedAmenities(formattedAmenities);
          }
        } catch (amenitiesError) {
          console.error("Erreur lors du chargement des équipements:", amenitiesError);
        }

        // Récupérer les règles sélectionnées depuis le localStorage
        try {
          const formData = localStorage.getItem("propertyDraft");
          if (formData) {
            const parsedFormData = JSON.parse(formData);
            console.log("Données du formulaire pour les règles:", parsedFormData.rules);

            // Vérifier si l'objet rules existe
            if (parsedFormData.rules) {
              // Créer un tableau de règles
              const rules: string[] = [];
              // Créer un tableau pour les conséquences
              const consequences: string[] = [];

              // Parcourir toutes les propriétés de l'objet rules
              Object.entries(parsedFormData.rules).forEach(([key, value]: [string, any]) => {
                // Traiter les règles booléennes principales (petsAllowed, smokingAllowed, eventsAllowed)
                if (key === "petsAllowed" || key === "smokingAllowed" || key === "eventsAllowed") {
                  const label = getRuleLabel(key, value);
                  if (label) {
                    rules.push(label);
                  }
                }
                // Traiter les règles additionnelles (texte libre)
                else if (key === "additionalRules" && typeof value === "string" && value.trim() !== "") {
                  // Diviser le texte en lignes et ajouter chaque ligne comme une règle supplémentaire
                  const additionalRulesLines = value.trim().split("\n");
                  additionalRulesLines.forEach((line: string) => {
                    if (line.trim() !== "") {
                      rules.push(`Règle supplémentaire: ${line.trim()}`);
                    }
                  });
                }
                // Traiter les conséquences
                else if (key === "depositWithheld" && value === "on") {
                  consequences.push("Retenue sur caution possible");
                } else if (key === "earlyTermination" && value === "on") {
                  consequences.push("Résiliation anticipée possible");
                } else if (key === "additionalFees" && value === "on") {
                  consequences.push("Frais supplémentaires applicables");
                } else if (key === "penaltyDetails" && typeof value === "string" && value.trim() !== "") {
                  // Diviser le texte en lignes et ajouter chaque ligne comme une conséquence
                  const penaltyLines = value.trim().split("\n");
                  penaltyLines.forEach((line: string) => {
                    if (line.trim() !== "") {
                      consequences.push(`Détail: ${line.trim()}`);
                    }
                  });
                }
                // Traiter toutes les autres règles cochées (valeur "on")
                else if (value === "on" && typeof ruleLabels[key] === 'string') {
                  rules.push(ruleLabels[key]);
                }
              });

              console.log("Règles récupérées:", rules);
              console.log("Conséquences récupérées:", consequences);
              setSelectedRules(rules);
              // Ajouter un état pour les conséquences
              setConsequences(consequences);
            } else {
              console.log("Aucune règle trouvée dans les données du formulaire");
              setSelectedRules([]);
              setConsequences([]);
            }
          }
        } catch (rulesError) {
          console.error("Erreur lors du chargement des règles:", rulesError);
          setSelectedRules([]);
          setConsequences([]);
        }
      }
    } catch (error) {
      console.error("Error loading preview data:", error);
    }
    setIsLoaded(true);
  }, []);

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
      "Système d’alarme": "Bell",
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
      "Système d’arrosage automatique": "Droplets",
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
      "Centre d’affaires": "Briefcase",
      "Poste de police": "Shield",
      "Bureau de poste": "Mail",
      "Zone industrielle proche": "Factory",
    };
  
    return iconMapping[name] || (category === "Intérieur" ? "Home" : category === "Extérieur" ? "Tree" : "MapPin");
  };
  // Si les données ne sont pas encore chargées, afficher un indicateur de chargement
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#465baa]"></div>
      </div>
    );
  }

  // Si aucune donnée n'est disponible, afficher un message d'erreur
  if (!previewData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Données non disponibles</h2>
          <p className="text-gray-600 mb-6">
            Les données de prévisualisation ne sont pas disponibles. Veuillez retourner au formulaire de soumission.
          </p>
          <Button onClick={() => router.visit("/deposer-annonce")}>Retour au formulaire</Button>
        </div>
      </div>
    );
  }

  // Données pour la prévisualisation
  const property: Property = {
    id: "preview",
    title: previewData.title || "Titre de votre annonce",
    location: previewData.district
      ? `${previewData.district.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}, ${previewData.city}`
      : previewData.city,
    price: previewData.price || 1500,
    priceUnit: "MAD/mois",
    bedrooms: previewData.bedrooms || 1,
    bathrooms: previewData.bathrooms || 1,
    guests: previewData.maxGuests || 2,
    area: previewData.area || 50,
    propertyType: previewData.propertyType || "Appartement",
    tenantType: previewData.tenantType || "tous",
    rating: 4.8,
    reviewCount: 32,
    description:
      previewData.description ||
      "Magnifique appartement moderne situé dans un quartier calme et sécurisé. Profitez d'une vue imprenable sur la ville depuis le balcon spacieux. L'appartement est entièrement meublé et équipé pour vous offrir un confort optimal. Idéal pour les familles ou les professionnels en quête d'un logement de qualité pour une location longue durée.",
    owner: {
      id: "owner1",
      name: "Vous (Propriétaire)",
      image: "/diverse-group.png",
      phone: "+212 6 12 34 56 78",
      responseRate: 98,
      responseTime: "Moins d'une heure",
      joinedDate: "Janvier 2023",
    },
    images: propertyImages,
    amenities: selectedAmenities, // Utiliser les caractéristiques sélectionnées
    rules: selectedRules,
    availability: {
      minStay: previewData.minStay || 1,
      maxStay: previewData.maxStay || 12,
      availableFrom: previewData.availableFrom || new Date(),
    },
  };

  // Fonction pour obtenir le libellé du type de locataire
  const getTenantTypeLabel = (type: string): string => {
    switch (type) {
      case "tous":
        return "Tous types de locataires";
      case "famille":
        return "Idéal pour familles";
      case "couple":
        return "Idéal pour couples";
      case "etudiants":
        return "Idéal pour étudiants";
      case "celibataire":
        return "Idéal pour célibataires";
      case "fonctionnaire":
        return "Idéal pour fonctionnaires";
      default:
        return "Tous types de locataires";
    }
  };
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
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <AnimatePresence>
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
                className="mb-4 flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
                onClick={() => router.visit("/deposer-annonce")}
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Retour au formulaire
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
                      className="h-10 w-10 rounded-full transition-all duration-300 hover:bg-gray-100 hover:text-gray-700"
                    >
                      <Heart className="h-5 w-5 text-gray-600" />
                      <span className="sr-only">Ajouter aux favoris</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-full transition-all duration-300 hover:bg-gray-100 hover:text-gray-700"
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

                  {/* Badge pour le type de locataire souhaité */}
                  <div className="flex items-center">
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 rounded-full border-purple-300 bg-purple-50 px-3 py-1 text-purple-700"
                    >
                      <Users className="h-3.5 w-3.5 text-purple-500" />
                      <span className="font-medium">{getTenantTypeLabel(property.tenantType)}</span>
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
                        {/* Passer les équipements sélectionnés au composant PropertyPreviewAmenities */}
                        <PropertyPreviewAmenities amenities={selectedAmenities} previewData={previewData} />
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
                        {selectedRules.length > 0 ? (
                          <div className="space-y-4">
                            {/* Règles standard */}
                            <ul className="space-y-2">
                              {selectedRules
                                .filter((rule) => !rule.startsWith("Règle supplémentaire:"))
                                .map((rule, index) => (
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

                            {/* Règles supplémentaires */}
                            {selectedRules.some((rule) => rule.startsWith("Règle supplémentaire:")) && (
                              <div className="mt-4 pt-4 border-t border-gray-200">
                                <h4 className="text-md font-medium text-gray-800 mb-2">Règles supplémentaires</h4>
                                <ul className="space-y-2">
                                  {selectedRules
                                    .filter((rule) => rule.startsWith("Règle supplémentaire:"))
                                    .map((rule, index) => (
                                      <motion.li
                                        key={`additional-${index}`}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center text-gray-700"
                                      >
                                        <div className="mr-3 h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                                        {rule.replace("Règle supplémentaire:", "").trim()}
                                      </motion.li>
                                    ))}
                                </ul>
                              </div>
                            )}

                            {/* Conséquences en cas de non-respect */}
                            {consequences.length > 0 && (
                              <div className="mt-4 pt-4 border-t border-gray-200">
                                <h4 className="text-md font-medium text-gray-800 mb-2 flex items-center">
                                  <span className="bg-red-100 text-red-800 p-1 rounded-md mr-2">
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
                                      className="lucide lucide-alert-triangle"
                                    >
                                      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                                      <path d="M12 9v4" />
                                      <path d="M12 17h.01" />
                                    </svg>
                                  </span>
                                  Conséquences en cas de non-respect
                                </h4>
                                <ul className="space-y-2">
                                  {consequences.map((consequence, index) => (
                                    <motion.li
                                      key={`consequence-${index}`}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                      className="flex items-center text-gray-700"
                                    >
                                      <div className="mr-3 h-1.5 w-1.5 rounded-full bg-red-500"></div>
                                      {consequence.startsWith("Détail:")
                                        ? consequence.replace("Détail:", "").trim()
                                        : consequence}
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="mt-4 rounded-lg bg-amber-50 p-4 border border-amber-200">
                            <div className="flex items-start">
                              <Info className="mr-3 h-5 w-5 text-amber-500" />
                              <div>
                                <p className="text-sm text-amber-700">
                                  Aucune règle n'a été définie pour ce logement. Vous pouvez ajouter des règles dans
                                  l'étape "Règles" du formulaire.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
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

          {/* Bannière de prévisualisation */}
          <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white py-3 px-6 shadow-lg z-50">
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center">
                <Info className="h-5 w-5 mr-2" />
                <span className="font-medium">Mode prévisualisation</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => {
                  // Retrieve the current step from previewData if available
                  const savedData = localStorage.getItem("propertyPreviewData");
                  if (savedData) {
                    const parsedData = JSON.parse(savedData);
                    // Store just the current step in a separate item
                    if (parsedData.currentStep) {
                      localStorage.setItem("lastFormStep", parsedData.currentStep.toString());
                    }
                  }
                  router.visit("/deposer-annonce");
                }}
              >
                Retour au formulaire
              </Button>
            </div>
          </div>
        </motion.main>
      )}
    </AnimatePresence>
  );
}
