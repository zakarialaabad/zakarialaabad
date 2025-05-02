
import { useEffect } from "react"
import { X, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface AuthAlertProps {
  isOpen: boolean
  onClose: () => void
  message?: string
  onAutoClose?: () => void
  autoCloseDelay?: number
}

export  function AuthAlert({
  isOpen,
  onClose,
  message = "Vous devez être connecté pour accéder à cette fonctionnalité.",
  onAutoClose,
  autoCloseDelay = 3000,
}: AuthAlertProps) {
  // Fermer automatiquement l'alerte après un certain temps
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose()
        // Déclencher l'action après la fermeture automatique
        if (onAutoClose) {
          onAutoClose()
        }
      }, autoCloseDelay)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose, onAutoClose, autoCloseDelay])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
        >
          <div className="bg-white rounded-lg shadow-lg border border-red-200 p-4 mx-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">{message}</p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button className="inline-flex text-gray-400 hover:text-gray-500" onClick={onClose}>
                  <span className="sr-only">Fermer</span>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
