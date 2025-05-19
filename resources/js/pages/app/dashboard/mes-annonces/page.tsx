import React from "react";
import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";
import { AuthAlert } from "@/components/auth/auth-alert";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  BarChart2,
  MessageSquare,
  Filter,
  Calendar,
  AlertCircle,
  Settings,
  Users,
  CreditCard,
  HelpCircle,
  ChevronRight,
  Star,
  Building,
  Wallet,
  CalendarRange,
  Heart,
} from "lucide-react";
import { Link } from "@inertiajs/react";

// Types pour les propriétés
interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  price: number;
  status: "draft" | "pending" | "approved" | "rejected" | "expired";
  createdAt: Date;
  updatedAt: Date;
  thumbnail: string;
  views: number;
  favorites: number;
  inquiries: number;
  rentalType: "long" | "short" | "flexible";
  propertyType: string;
  rating?: number;
  bookedDates?: number;
  availableDates?: number;
}

// Données de démonstration adaptées au contexte marocain
const demoProperties: Property[] = [
  {
    id: "1",
    title: "Appartement moderne au centre-ville",
    address: "123 Rue Mohammed V",
    city: "Casablanca",
    price: 6500,
    status: "approved",
    createdAt: new Date(2023, 5, 15),
    updatedAt: new Date(2023, 5, 18),
    thumbnail: "/sun-drenched-moroccan-living.png",
    views: 245,
    favorites: 18,
    inquiries: 5,
    rentalType: "long",
    propertyType: "Appartement",
    rating: 4.8,
    bookedDates: 45,
    availableDates: 320,
  },
  {
    id: "2",
    title: "Riad traditionnel dans la médina",
    address: "45 Derb Jdid",
    city: "Marrakech",
    price: 12000,
    status: "pending",
    createdAt: new Date(2023, 6, 2),
    updatedAt: new Date(2023, 6, 2),
    thumbnail: "/riad-courtyard-oasis.png",
    views: 0,
    favorites: 0,
    inquiries: 0,
    rentalType: "short",
    propertyType: "Riad",
    bookedDates: 0,
    availableDates: 365,
  },
  {
    id: "3",
    title: "Studio cosy proche de la plage",
    address: "78 Boulevard Mohammed VI",
    city: "Agadir",
    price: 4500,
    status: "draft",
    createdAt: new Date(2023, 6, 10),
    updatedAt: new Date(2023, 6, 10),
    thumbnail: "/warm-moroccan-retreat.png",
    views: 0,
    favorites: 0,
    inquiries: 0,
    rentalType: "flexible",
    propertyType: "Studio",
    bookedDates: 0,
    availableDates: 365,
  },
  {
    id: "4",
    title: "Villa avec piscine à Ain Diab",
    address: "15 Rue des Orangers",
    city: "Casablanca",
    price: 25000,
    status: "rejected",
    createdAt: new Date(2023, 4, 20),
    updatedAt: new Date(2023, 4, 25),
    thumbnail: "/moroccan-villa-oasis.png",
    views: 120,
    favorites: 8,
    inquiries: 2,
    rentalType: "long",
    propertyType: "Villa",
    bookedDates: 0,
    availableDates: 0,
  },
  {
    id: "5",
    title: "Bureau moderne au quartier d'affaires",
    address: "56 Boulevard Zerktouni",
    city: "Casablanca",
    price: 8000,
    status: "expired",
    createdAt: new Date(2023, 3, 5),
    updatedAt: new Date(2023, 3, 10),
    thumbnail: "/moroccan-office-welcome.png",
    views: 89,
    favorites: 3,
    inquiries: 1,
    rentalType: "long",
    propertyType: "Bureau",
    rating: 4.2,
    bookedDates: 180,
    availableDates: 0,
  },
];

export default function MesAnnonces() {
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);
  const [activeNavItem, setActiveNavItem] = useState("annonces");

  // Charger les propriétés
  useEffect(() => {
    // Simuler un chargement depuis une API
    setProperties(demoProperties);
  }, []);

  // Filtrer les propriétés selon l'onglet actif et la recherche
  const filteredProperties = properties.filter((property) => {
    // Filtrer par statut
    if (activeTab !== "all" && property.status !== activeTab) {
      return false;
    }

    // Filtrer par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        property.title.toLowerCase().includes(query) ||
        property.address.toLowerCase().includes(query) ||
        property.city.toLowerCase().includes(query) ||
        property.propertyType.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Obtenir les statistiques
  const stats = {
    total: properties.length,
    approved: properties.filter((p) => p.status === "approved").length,
    pending: properties.filter((p) => p.status === "pending").length,
    draft: properties.filter((p) => p.status === "draft").length,
    rejected: properties.filter((p) => p.status === "rejected").length,
    expired: properties.filter((p) => p.status === "expired").length,
    totalViews: properties.reduce((sum, p) => sum + p.views, 0),
    totalInquiries: properties.reduce((sum, p) => sum + p.inquiries, 0),
    totalRevenue: 45600, // Simulé pour la démonstration
  };

  // Formater la date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  // Formater le prix
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-MA", {
      style: "currency",
      currency: "MAD",
      maximumFractionDigits: 0,
    })
      .format(price)
      .replace(/MAD/g, "DH");
  };

  // Obtenir le badge de statut
  const getStatusBadge = (status: Property["status"]) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Validée
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="h-3 w-3 mr-1" />
            En attente
          </Badge>
        );
      case "draft":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            <FileText className="h-3 w-3 mr-1" />
            Brouillon
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="h-3 w-3 mr-1" />
            Refusée
          </Badge>
        );
      case "expired":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            <Calendar className="h-3 w-3 mr-1" />
            Expirée
          </Badge>
        );
    }
  };

  // Obtenir l'icône du type de location
  const getRentalTypeIcon = (type: Property["rentalType"]) => {
    switch (type) {
      case "long":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "short":
        return <Calendar className="h-4 w-4 text-amber-500" />;
      case "flexible":
        return <CalendarRange className="h-4 w-4 text-green-500" />;
    }
  };

  // Obtenir le texte du type de location
  const getRentalTypeText = (type: Property["rentalType"]) => {
    switch (type) {
      case "long":
        return "Long terme";
      case "short":
        return "Court terme";
      case "flexible":
        return "Flexible";
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="flex-1 container mx-auto px-4 py-16">
          <AuthAlert
            title="Connexion requise"
            description="Vous devez être connecté pour accéder à votre tableau de bord."
            buttonText="Se connecter"
            onButtonClick={() => router.visit("/")}
          />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Barre de navigation du tableau de bord */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center py-4">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <img
                  src={user?.image || "/thoughtful-moroccan-man.png"}
                  alt="Photo de profil"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Bonjour, {user?.name || "Propriétaire"}</h2>
                <p className="text-sm text-gray-500">Gérez vos annonces et suivez vos performances</p>
              </div>
            </div>
            <div className="ml-auto flex items-center space-x-2">
              <Button variant="outline" size="sm" className="hidden md:flex">
                <HelpCircle className="h-4 w-4 mr-2" />
                Aide
              </Button>
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Settings className="h-4 w-4 mr-2" />
                Paramètres
              </Button>
              <Button className="bg-primary hover:bg-primary/90" size="sm" onClick={() => router.visit("/devenir-hote")}>
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle annonce
              </Button>
            </div>
          </div>

          <nav className="flex overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <Link
              href="/dashboard"
              className={`flex items-center px-4 py-2 mr-4 border-b-2 ${
                activeNavItem === "dashboard"
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveNavItem("dashboard")}
            >
              <BarChart2 className="h-4 w-4 mr-2" />
              <span>Tableau de bord</span>
            </Link>
            <Link
              href="/dashboard/mes-annonces"
              className={`flex items-center px-4 py-2 mr-4 border-b-2 ${
                activeNavItem === "annonces"
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveNavItem("annonces")}
            >
              <Building className="h-4 w-4 mr-2" />
              <span>Mes annonces</span>
            </Link>
            <Link
              href="/dashboard/reservations"
              className={`flex items-center px-4 py-2 mr-4 border-b-2 ${
                activeNavItem === "reservations"
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveNavItem("reservations")}
            >
              <Calendar className="h-4 w-4 mr-2" />
              <span>Réservations</span>
            </Link>
            <Link
              href="/dashboard/messages"
              className={`flex items-center px-4 py-2 mr-4 border-b-2 ${
                activeNavItem === "messages"
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveNavItem("messages")}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              <span>Messages</span>
            </Link>
            <Link
              href="/dashboard/paiements"
              className={`flex items-center px-4 py-2 mr-4 border-b-2 ${
                activeNavItem === "paiements"
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveNavItem("paiements")}
            >
              <Wallet className="h-4 w-4 mr-2" />
              <span>Paiements</span>
            </Link>
            <Link
              href="/dashboard/locataires"
              className={`flex items-center px-4 py-2 mr-4 border-b-2 ${
                activeNavItem === "locataires"
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveNavItem("locataires")}
            >
              <Users className="h-4 w-4 mr-2" />
              <span>Locataires</span>
            </Link>
          </nav>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Mes annonces</h1>
            <p className="text-gray-600">Gérez vos biens immobiliers et suivez leurs performances</p>
          </div>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Revenus totaux"
            value={formatPrice(stats.totalRevenue)}
            icon={<CreditCard className="h-5 w-5 text-emerald-500" />}
            trend="+12% ce mois-ci"
            trendUp={true}
          />
          <StatCard
            label="Vues totales"
            value={stats.totalViews.toString()}
            icon={<Eye className="h-5 w-5 text-blue-500" />}
            trend="+24% ce mois-ci"
            trendUp={true}
          />
          <StatCard
            label="Demandes reçues"
            value={stats.totalInquiries.toString()}
            icon={<MessageSquare className="h-5 w-5 text-violet-500" />}
            trend="+8% ce mois-ci"
            trendUp={true}
          />
          <StatCard
            label="Taux d'occupation"
            value="68%"
            icon={<Calendar className="h-5 w-5 text-amber-500" />}
            trend="+5% ce mois-ci"
            trendUp={true}
          />
        </div>

        {/* Statistiques des annonces */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard label="Total" value={stats.total.toString()} icon={<Home className="h-5 w-5 text-gray-400" />} />
          <StatCard
            label="Validées"
            value={stats.approved.toString()}
            icon={<CheckCircle className="h-5 w-5 text-green-500" />}
          />
          <StatCard
            label="En attente"
            value={stats.pending.toString()}
            icon={<Clock className="h-5 w-5 text-yellow-500" />}
          />
          <StatCard
            label="Brouillons"
            value={stats.draft.toString()}
            icon={<FileText className="h-5 w-5 text-gray-500" />}
          />
          <StatCard
            label="Refusées"
            value={stats.rejected.toString()}
            icon={<XCircle className="h-5 w-5 text-red-500" />}
          />
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher une annonce par titre, adresse, ville..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-shrink-0">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres
                </Button>
                <Button variant="outline" className="flex-shrink-0">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date
                </Button>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="all"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Toutes ({stats.total})
              </TabsTrigger>
              <TabsTrigger
                value="approved"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Validées ({stats.approved})
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                En attente ({stats.pending})
              </TabsTrigger>
              <TabsTrigger
                value="draft"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Brouillons ({stats.draft})
              </TabsTrigger>
              <TabsTrigger
                value="rejected"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Refusées ({stats.rejected})
              </TabsTrigger>
              <TabsTrigger
                value="expired"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Expirées ({stats.expired})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Liste des propriétés */}
        <div className="space-y-4">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                formatPrice={formatPrice}
                formatDate={formatDate}
                getStatusBadge={getStatusBadge}
                getRentalTypeIcon={getRentalTypeIcon}
                getRentalTypeText={getRentalTypeText}
                onView={() => router.visit(`/property/${property.id}`)}
                onEdit={() => console.log("Edit property", property.id)}
                onDelete={() => console.log("Delete property", property.id)}
              />
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Aucune annonce trouvée</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery
                  ? "Aucune annonce ne correspond à votre recherche. Essayez avec d'autres termes."
                  : "Vous n'avez pas encore d'annonce dans cette catégorie."}
              </p>

              <Button className="bg-primary hover:bg-primary/90" onClick={() => router.visit("/devenir-hote")}>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter une annonce
              </Button>
            </div>
          )}
        </div>

        {/* Notification pour les annonces en attente */}
        {stats.pending > 0 && (
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex">
            <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800 mb-1">Annonces en cours de validation</h4>
              <p className="text-sm text-yellow-700">
                Vous avez {stats.pending} annonce{stats.pending > 1 ? "s" : ""} en attente de validation. Notre équipe
                les examinera dans les 24 à 72 heures ouvrables.
              </p>
            </div>
          </div>
        )}

        {/* Conseils pour améliorer les annonces */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2 flex items-center">
            <HelpCircle className="h-5 w-5 mr-2" />
            Conseils pour optimiser vos annonces
          </h4>
          <ul className="text-sm text-blue-700 space-y-2">
            <li className="flex items-start">
              <ChevronRight className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
              <span>Ajoutez au moins 5 photos de haute qualité pour augmenter vos chances de location de 40%</span>
            </li>
            <li className="flex items-start">
              <ChevronRight className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
              <span>Répondez rapidement aux demandes pour améliorer votre taux de conversion de 60%</span>
            </li>
            <li className="flex items-start">
              <ChevronRight className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
              <span>Mettez à jour régulièrement vos disponibilités pour éviter les annulations</span>
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// Composant pour les statistiques
interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

function StatCard({ label, value, icon, trend, trendUp }: StatCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
          {trend && <p className={`text-xs mt-1 ${trendUp ? "text-green-600" : "text-red-600"}`}>{trend}</p>}
        </div>
        <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
      </div>
    </div>
  );
}

// Composant pour les cartes de propriété
interface PropertyCardProps {
  property: Property;
  formatPrice: (price: number) => string;
  formatDate: (date: Date) => string;
  getStatusBadge: (status: Property["status"]) => React.ReactNode;
  getRentalTypeIcon: (type: Property["rentalType"]) => React.ReactNode;
  getRentalTypeText: (type: Property["rentalType"]) => string;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function PropertyCard({
  property,
  formatPrice,
  formatDate,
  getStatusBadge,
  getRentalTypeIcon,
  getRentalTypeText,
  onView,
  onEdit,
  onDelete,
}: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative w-full md:w-48 h-48 md:h-auto">
          <img src={property.thumbnail || "/placeholder.svg"} alt={property.title} className="object-cover w-full h-full" />
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-white/90 text-gray-800 backdrop-blur-sm">{property.propertyType}</Badge>
          </div>
        </div>

        {/* Contenu */}
        <div className="flex-1 p-4 flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center mb-1">
                <h3 className="font-semibold text-lg">{property.title}</h3>
                {property.rating && (
                  <div className="flex items-center ml-2">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-medium text-gray-600 ml-1">{property.rating}</span>
                  </div>
                )}
              </div>
              <p className="text-gray-500 text-sm mb-2">
                {property.address}, {property.city}
              </p>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center text-sm text-gray-600">
                  {getRentalTypeIcon(property.rentalType)}
                  <span className="ml-1">{getRentalTypeText(property.rentalType)}</span>
                </div>
                <p className="font-medium text-primary">{formatPrice(property.price)} / mois</p>
              </div>
            </div>
            <div>{getStatusBadge(property.status)}</div>
          </div>

          <div className="mt-auto pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="flex space-x-4 mb-3 sm:mb-0">
              <div className="flex items-center text-sm text-gray-500">
                <Eye className="h-4 w-4 mr-1" />
                <span>{property.views} vues</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Heart className="h-4 w-4 mr-1" />
                <span>{property.favorites} favoris</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>{property.inquiries} demandes</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={onView}>
                <Eye className="h-4 w-4 mr-1" />
                Voir
              </Button>
              <Button size="sm" variant="outline" onClick={onEdit}>
                <Edit className="h-4 w-4 mr-1" />
                Modifier
              </Button>
              <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700" onClick={onDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Informations supplémentaires */}
          {property.status === "approved" && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex flex-wrap gap-3 text-xs">
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-3.5 w-3.5 mr-1 text-green-500" />
                  <span>{property.availableDates} jours disponibles</span>
                </div>
                {property.bookedDates && property.bookedDates > 0 && (
                  <div className="flex items-center text-gray-500">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-blue-500" />
                    <span>{property.bookedDates} jours réservés</span>
                  </div>
                )}
                <div className="flex items-center text-gray-500">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>Publié le {formatDate(property.createdAt)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
