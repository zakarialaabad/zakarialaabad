
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"
import { Link } from "@inertiajs/react"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { router } from '@inertiajs/react';

export default function SuccessPage() {
  const { isAuthenticated } = useAuth()

  // Redirect if not authenticated
  if (!isAuthenticated) {
    router.visit('/devenir-hote');
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <main className="flex-1 py-12 flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <motion.div
            className="bg-white rounded-xl shadow-sm p-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold mb-4">Vérification soumise avec succès !</h1>
              <p className="text-gray-600 mb-8">
                Merci d'avoir soumis vos documents de vérification. Notre équipe les examinera dans les 24 à 48 heures.
                Vous recevrez une notification par email dès que votre compte sera vérifié.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h2 className="text-lg font-semibold mb-2">Prochaines étapes</h2>
                <ul className="text-left text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span> Vérification de vos documents par notre équipe
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">2.</span> Création de votre annonce de logement
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">3.</span> Publication et réception de vos premières
                    réservations
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" asChild>
                  <Link href="/">Retour à l'accueil</Link>
                </Button>
                <Button asChild>
                  <Link href="/dashboard">
                    Accéder à mon tableau de bord <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
