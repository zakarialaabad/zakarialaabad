
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence } from "framer-motion"
import { NotificationToast } from "@/components/notifications/notification-toast"
import { useNotifications } from "@/contexts/notifications-context"

export function NotificationToastsManager() {
  const { notifications, markAsRead } = useNotifications()
  const [activeToasts, setActiveToasts] = useState<string[]>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Surveiller les nouvelles notifications non lues
  useEffect(() => {
    const unreadNotifications = notifications.filter(
      (notification) => !notification.read && !activeToasts.includes(notification.id),
    )

    if (unreadNotifications.length > 0) {
      // Ajouter seulement la notification la plus récente aux toasts actifs
      const latestNotification = unreadNotifications[0]
      setActiveToasts((prev) => [...prev, latestNotification.id])
    }
  }, [notifications, activeToasts])

  const handleCloseToast = (id: string) => {
    setActiveToasts((prev) => prev.filter((toastId) => toastId !== id))
    markAsRead(id)
  }

  if (!isMounted) return null

  return createPortal(
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 w-80">
      <AnimatePresence>
        {activeToasts.map((id) => {
          const notification = notifications.find((n) => n.id === id)
          if (!notification) return null

          return (
            <NotificationToast
              key={id}
              notification={notification}
              onClose={() => handleCloseToast(id)}
              autoClose={true}
              autoCloseDelay={6000}
            />
          )
        })}
      </AnimatePresence>
    </div>,
    document.body,
  )
}
