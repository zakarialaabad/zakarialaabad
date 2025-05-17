
import { Button } from "@/components/ui/button"
import { useNotifications } from "@/contexts/notifications-context"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"
import { AuthAlert } from "@/components/auth/auth-alert"
import { AuthModal } from "@/components/auth/auth-modal"

export function DemoNotificationButton() {
  const { addNotification } = useNotifications()
  const { isAuthenticated } = useAuth()
  const [showAuthAlert, setShowAuthAlert] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const handleAddNotification = () => {
    if (!isAuthenticated) {
      setShowAuthAlert(true)
      return
    }

    const types = ["info", "success", "warning", "error"] as const
    const randomType = types[Math.floor(Math.random() * types.length)]

    const titles = {
      info: "Nouvelle information",
      success: "Opération réussie",
      warning: "Attention requise",
      error: "Erreur détectée",
    }

    const messages = {
      info: "Une nouvelle propriété correspondant à vos critères est disponible.",
      success: "Votre demande de réservation a été envoyée avec succès.",
      warning: "Votre abonnement expire dans 3 jours.",
      error: "Un problème est survenu lors du traitement de votre demande.",
    }

    addNotification({
      title: titles[randomType],
      message: messages[randomType],
      type: randomType,
      link: randomType === "info" ? "/property/12" : undefined,
    })
  }

  return (
    <>
      <Button onClick={handleAddNotification} className="bg-primary hover:bg-primary/90 text-white">
        Tester une notification
      </Button>

      <AuthAlert
        isOpen={showAuthAlert}
        onClose={() => setShowAuthAlert(false)}
        message="Vous devez être connecté pour recevoir des notifications."
        onAutoClose={() => setIsAuthModalOpen(true)}
        autoCloseDelay={3000}
      />

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}
