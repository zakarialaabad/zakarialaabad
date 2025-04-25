"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AuthModal } from "@/components/auth/auth-modal"

interface AuthAlertProps {
  isOpen: boolean
  onClose: () => void
  message?: string
}

export function AuthAlert({
  isOpen,
  onClose,
  message = "Vous devez être connecté pour accéder à cette fonctionnalité.",
}: AuthAlertProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  // Fermer automatiquement l'alerte après un certain temps
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  const handleOpenAuthModal = () => {
    onClose()
    setIsAuthModalOpen(true)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 mx-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">{message}</p>
                  <div className="mt-3 flex space-x-3">
                    <Button
                      onClick={handleOpenAuthModal}
                      className="bg-primary hover:bg-primary/90 text-white rounded-md px-4 py-2 text-sm font-medium"
                    >
                      Se connecter
                    </Button>
                    <Button onClick={onClose} variant="outline" className="rounded-md px-4 py-2 text-sm font-medium">
                      Ignorer
                    </Button>
                  </div>
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

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}
