
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

interface SubmissionSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  onDashboardClick: () => void
}

export function SubmissionSuccessModal({ isOpen, onClose, onDashboardClick }: SubmissionSuccessModalProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden"
          >
            <motion.div
              className="bg-gradient-to-r from-primary to-blue-500 p-6 text-white text-center"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, 0] }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                className="mx-auto bg-white/20 w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm mb-4"
              >
                <CheckCircle className="h-8 w-8 text-white" />
              </motion.div>
              <motion.h2
                className="text-2xl font-bold mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Félicitations !
              </motion.h2>
              <motion.p
                className="text-blue-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Votre annonce a été soumise avec succès
              </motion.p>
            </motion.div>

            <motion.div
              className="p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.p
                className="text-gray-700 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                Votre annonce est maintenant en cours de validation par notre équipe. Vous recevrez une notification dès
                qu'elle sera publiée sur notre plateforme.
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.div
                  className="flex-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 hover:bg-gray-50 transition-all duration-300"
                    onClick={onClose}
                  >
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:bg-gray-400 after:h-[1px] after:w-0 hover:after:w-full after:transition-all after:duration-300">
                      Fermer
                    </span>
                  </Button>
                </motion.div>
                <motion.div
                  className="flex-1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 relative overflow-hidden group"
                    onClick={onDashboardClick}
                  >
                    <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full"></span>
                    <span className="relative">Voir mes annonces</span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
