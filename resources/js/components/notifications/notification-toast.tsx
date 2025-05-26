import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, AlertTriangle, Info, X, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Notification } from "@/contexts/notifications-context"
import { NotificationsProvider } from "@/contexts/notifications-context"

interface NotificationToastProps {
  notification: Notification
  onClose: () => void
  autoClose?: boolean
  autoCloseDelay?: number
}

export function NotificationToast({
  notification,
  onClose,
  autoClose = true,
  autoCloseDelay = 5000,
}: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(100)
  const hasClosedRef = useRef(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Effet pour gérer la fermeture automatique
  useEffect(() => {
    if (!autoClose || hasClosedRef.current) return

    // Gestion de la barre de progression
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
          }
          return 0
        }
        return prev - 100 / (autoCloseDelay / 100)
      })
    }, 100)

    // Fermeture automatique après le délai
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false)
    }, autoCloseDelay)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [autoClose, autoCloseDelay])

  // Effet pour gérer l'animation de sortie et appeler onClose
  useEffect(() => {
    if (!isVisible && !hasClosedRef.current) {
      hasClosedRef.current = true
      const closeTimeout = setTimeout(() => {
        onClose()
      }, 300) // Attendre la fin de l'animation

      return () => clearTimeout(closeTimeout)
    }
  }, [isVisible, onClose])

  const handleClose = () => {
    if (hasClosedRef.current) return

    // Nettoyer les timers existants
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    setIsVisible(false)
  }

  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "info":
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getBorderColor = () => {
    switch (notification.type) {
      case "success":
        return "border-l-green-500"
      case "warning":
        return "border-l-amber-500"
      case "error":
        return "border-l-red-500"
      case "info":
      default:
        return "border-l-blue-500"
    }
  }

  return (
    <NotificationsProvider>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={cn(
              "relative overflow-hidden rounded-md border bg-white shadow-lg",
              "border-l-4",
              getBorderColor(),
            )}
          >
            <div className="flex p-4">
              <div className="flex-shrink-0 mr-3">{getIcon()}</div>
              <div className="flex-1 min-w-0 mr-4">
                <h4 className="text-sm font-medium">{notification.title}</h4>
                <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
              </div>
              <button onClick={handleClose} className="flex-shrink-0 text-gray-400 hover:text-gray-500">
                <X className="h-5 w-5" />
              </button>
            </div>
            {autoClose && (
              <div
                className="absolute bottom-0 left-0 h-1 bg-[#465baa]"
                style={{ width: `${progress}%`, transition: "width 100ms linear" }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </NotificationsProvider>
  )
}
