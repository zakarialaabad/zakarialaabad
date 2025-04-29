
import { useState } from "react"
import { ArrowLeft, Bell, Calendar, MessageCircle, Info, Tag, CreditCard } from "lucide-react"
import { Header } from "@/components/header"
import { StickyHeaderEffect } from "@/components/sticky-header-effect"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Link } from "@inertiajs/react"
import { motion } from "framer-motion"

export default function NotificationsPage() {
  const { isAuthenticated } = useAuth()

  // Fausses notifications pour la démo
  const fakeNotifications = [
    {
      id: 1,
      type: "reservation",
      title: "Nouvelle réservation confirmée",
      message: "Votre réservation à Marrakech a été confirmée pour le 15 juin 2023.",
      date: "Il y a 2 heures",
      isRead: false,
    },
    {
      id: 2,
      type: "message",
      title: "Nouveau message de Ahmed",
      message: "Bonjour, je souhaiterais avoir plus d'informations sur votre logement...",
      date: "Il y a 1 jour",
      isRead: false,
    },
    {
      id: 3,
      type: "system",
      title: "Bienvenue sur E-JAR",
      message: "Merci de vous être inscrit sur notre plateforme. Découvrez nos logements disponibles.",
      date: "Il y a 3 jours",
      isRead: true,
    },
    {
      id: 4,
      type: "promotion",
      title: "Offre spéciale été",
      message: "Profitez de -15% sur les locations à Agadir pour tout le mois d'août !",
      date: "Il y a 5 jours",
      isRead: true,
    },
    {
      id: 5,
      type: "payment",
      title: "Paiement reçu",
      message: "Nous avons bien reçu votre paiement de 1200 MAD pour votre réservation à Casablanca.",
      date: "Il y a 1 semaine",
      isRead: true,
    },
  ]

  // État pour afficher ou non les notifications (pour la démo)
  const [showEmptyState, setShowEmptyState] = useState(false)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <StickyHeaderEffect />

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex items-center mb-8">
          <button
            onClick={() => window.history.back()}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Retour"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <Bell className="h-6 w-6 text-primary mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        </div>

        {isAuthenticated ? (
          <motion.div
            className="flex flex-col w-full max-w-3xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {showEmptyState ? (
              // État vide - aucune notification (exactement comme la capture d'écran)
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-8">
                  <Bell className="h-12 w-12 text-gray-400" strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
                  Aucune notification pour le moment
                </h2>
                <p className="text-gray-500 text-center max-w-md mb-10 text-lg">
                  Nous vous informerons ici des mises à jour importantes concernant vos réservations, messages et autres
                  activités.
                </p>
                <Link href="/">
                  <Button className="rounded-full px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700">
                    Explorer des logements
                  </Button>
                </Link>
              </div>
            ) : (
              // Liste des notifications
              <div className="w-full">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Toutes les notifications</h2>
                  <Button variant="outline" className="text-sm" onClick={() => setShowEmptyState(true)}>
                    Simuler aucune notification
                  </Button>
                </div>

                {fakeNotifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    variants={itemVariants}
                    className={`p-4 mb-3 border-b hover:bg-gray-50 transition-colors cursor-pointer ${
                      !notification.isRead ? "border-l-4 border-l-primary" : ""
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="mr-4 mt-1">
                        {notification.type === "reservation" && (
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-blue-600" />
                          </div>
                        )}
                        {notification.type === "message" && (
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <MessageCircle className="h-5 w-5 text-green-600" />
                          </div>
                        )}
                        {notification.type === "system" && (
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <Info className="h-5 w-5 text-purple-600" />
                          </div>
                        )}
                        {notification.type === "promotion" && (
                          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                            <Tag className="h-5 w-5 text-yellow-600" />
                          </div>
                        )}
                        {notification.type === "payment" && (
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-green-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className={`font-medium ${!notification.isRead ? "font-semibold" : ""}`}>
                            {notification.title}
                          </h3>
                          <span className="text-xs text-gray-500">{notification.date}</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <div className="mt-6 text-center">
                  <Button variant="outline" className="text-sm">
                    Marquer toutes comme lues
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <Bell className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">
              Connectez-vous pour voir vos notifications
            </h2>
            <p className="text-gray-500 text-center max-w-md mb-8">
              Vous devez être connecté pour accéder à vos notifications et rester informé des mises à jour importantes.
            </p>
            <Button onClick={() => window.history.back()} className="rounded-full px-6">
              Se connecter
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
