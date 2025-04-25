"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Shield, Wallet, Star, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { AuthModal } from "@/components/auth/auth-modal"
// Ajouter l'import pour l'icône ArrowLeft en haut du fichier

import { ArrowLeft } from "lucide-react"

export default function DevenirHotePage() {
  const { isAuthenticated } = useAuth()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const handleOpenAuthModal = () => {
    setIsAuthModalOpen(true)
  }

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false)
  }

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden">
          <Image
            src="/riad-courtyard-oasis.png"
            alt="Magnifique riad marocain"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center">
            <div className="container mx-auto px-4 md:px-6 relative pt-3">
              <div className="absolute top-4 left-4 z-10 mb-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Retour</span>
                </Link>
              </div>
              <motion.div
                className="max-w-2xl text-white mt-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Partagez votre espace, augmentez vos revenus</h1>
                <p className="text-xl md:text-2xl mb-8">
                  Rejoignez des milliers de propriétaires qui font confiance à E-JAR pour louer leur logement en toute
                  sécurité.
                </p>
                {isAuthenticated ? (
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-gray-100 rounded-full text-lg px-8 py-6 h-auto"
                    asChild
                  >
                    <Link href="/devenir-hote/verification">
                      Commencer maintenant <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-gray-100 rounded-full text-lg px-8 py-6 h-auto"
                    onClick={handleOpenAuthModal}
                  >
                    Commencer maintenant <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Pourquoi devenir hôte sur E-JAR ?
            </motion.h2>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="bg-white p-8 rounded-xl shadow-sm" variants={itemVariants}>
                <Wallet className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Revenus supplémentaires</h3>
                <p className="text-gray-600">
                  Gagnez de l'argent en louant votre logement lorsque vous ne l'utilisez pas. Fixez vos propres tarifs
                  et disponibilités.
                </p>
              </motion.div>

              <motion.div className="bg-white p-8 rounded-xl shadow-sm" variants={itemVariants}>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Sécurité et confiance</h3>
                <p className="text-gray-600">
                  Notre processus de vérification et notre système d'évaluation garantissent des transactions sécurisées
                  et des locataires fiables.
                </p>
              </motion.div>

              <motion.div className="bg-white p-8 rounded-xl shadow-sm" variants={itemVariants}>
                <Star className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Support dédié</h3>
                <p className="text-gray-600">
                  Notre équipe est disponible 24/7 pour vous aider à chaque étape, de la création de votre annonce à la
                  gestion de vos réservations.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Comment ça marche ?
            </motion.h2>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="text-center" variants={itemVariants}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Vérifiez votre identité</h3>
                <p className="text-gray-600">
                  Complétez notre processus de vérification sécurisé pour confirmer votre identité et votre propriété.
                </p>
              </motion.div>

              <motion.div className="text-center" variants={itemVariants}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Créez votre annonce</h3>
                <p className="text-gray-600">
                  Ajoutez des photos, une description et définissez vos tarifs et disponibilités pour votre logement.
                </p>
              </motion.div>

              <motion.div className="text-center" variants={itemVariants}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Accueillez vos locataires</h3>
                <p className="text-gray-600">
                  Recevez des demandes de réservation, communiquez avec vos locataires et gérez votre calendrier.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {isAuthenticated ? (
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white rounded-full text-lg px-8 py-6 h-auto"
                  asChild
                >
                  <Link href="/devenir-hote/verification">
                    Commencer la vérification <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white rounded-full text-lg px-8 py-6 h-auto"
                  onClick={handleOpenAuthModal}
                >
                  Commencer la vérification <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Ce que disent nos hôtes
            </motion.h2>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="bg-white p-6 rounded-xl shadow-sm" variants={itemVariants}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src="/moroccan-businessman.png"
                      alt="Karim"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Karim B.</h4>
                    <p className="text-sm text-gray-500">Casablanca</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Grâce à E-JAR, j'ai pu rentabiliser mon appartement secondaire à Casablanca. Le processus de
                  vérification était simple et la plateforme est très intuitive."
                </p>
              </motion.div>

              <motion.div className="bg-white p-6 rounded-xl shadow-sm" variants={itemVariants}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src="/moroccan-woman-professional.png"
                      alt="Leila"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Leila M.</h4>
                    <p className="text-sm text-gray-500">Marrakech</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Je loue mon riad à Marrakech depuis 6 mois sur E-JAR et je suis impressionnée par la qualité des
                  locataires. Le support client est également très réactif."
                </p>
              </motion.div>

              <motion.div className="bg-white p-6 rounded-xl shadow-sm" variants={itemVariants}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src="/moroccan-architect.png"
                      alt="Youssef"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Youssef A.</h4>
                    <p className="text-sm text-gray-500">Rabat</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "E-JAR m'a permis de générer un revenu supplémentaire avec mon studio à Rabat. La plateforme est
                  sécurisée et les paiements sont toujours ponctuels."
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Prêt à devenir hôte ?
            </motion.h2>
            <motion.p
              className="text-xl mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Rejoignez notre communauté de propriétaires et commencez à gagner de l'argent avec votre logement dès
              aujourd'hui.
            </motion.p>
            {isAuthenticated ? (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100 rounded-full text-lg px-8 py-6 h-auto"
                  asChild
                >
                  <Link href="/devenir-hote/verification">
                    Commencer maintenant <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100 rounded-full text-lg px-8 py-6 h-auto"
                  onClick={handleOpenAuthModal}
                >
                  Commencer maintenant <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <AuthModal isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} />
    </div>
  )
}
