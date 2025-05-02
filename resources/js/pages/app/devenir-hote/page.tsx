
import { useState, useRef, useEffect, useCallback } from "react"
import { router } from "@inertiajs/react"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { AuthModal } from "@/components/auth/auth-modal"
import { AuthAlert } from "@/components/auth/auth-alert"
import { PropertySubmissionForm } from "@/components/property-submission-form"
import { PropertyPreview } from "@/components/property-preview"
import { SubmissionSuccessModal } from "@/components/submission-success-modal"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle, CheckCircle, Home, FileText, Users, ArrowLeft } from "lucide-react"
import "./style.css"

export default function DevenirHote() {
  const { isAuthenticated } = useAuth()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [showContactInfo, setShowContactInfo] = useState(false)
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0)
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef(null)
  const processRef = useRef(null)
  const isInView = useInView(titleRef, { once: true, amount: 0.5 })
  const isProcessInView = useInView(processRef, { once: true, amount: 0.3 })
  const controls = useAnimation()
  const processControls = useAnimation()

  // Près du début du composant, après les autres déclarations useState
  const handleBack = useCallback(() => {
    router.visit("/");
  }, [router])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
    if (isProcessInView) {
      processControls.start("visible")
    }
  }, [isInView, isProcessInView, controls, processControls])

  const handleFormSubmit = (data: Record<string, any>) => {
    setFormData(data)
    setShowSuccessModal(true)
  }
  

  // Fonction pour démarrer le processus
  const handleStartProcess = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true)
      return
    }

    // Défiler vers le formulaire de manière sécurisée
    if (formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  // Fonction pour afficher les informations de contact
  const handleContactUs = () => {
    setShowContactInfo(!showContactInfo)
  }

  // Liste des avantages avec des animations
  const advantages = [
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5Z"
            fill="#E6F2FF"
          />
          <path d="M17 25L12 20L14 18L17 21L26 12L28 14L17 25Z" fill="#0070F3" />
          <path
            d="M20 8C13.3726 8 8 13.3726 8 20C8 26.6274 13.3726 32 20 32C26.6274 32 32 26.6274 32 20C32 13.3726 26.6274 8 20 8ZM20 30C14.4772 30 10 25.5228 10 20C10 14.4772 14.4772 10 20 10C25.5228 10 30 14.4772 30 20C30 25.5228 25.5228 30 20 30Z"
            fill="#0070F3"
          />
          <path d="M28 14L17 25L12 20L14 18L17 21L26 12L28 14Z" fill="#0070F3" />
        </svg>
      ),
      title: "Zéro Commission",
      description: "Gardez 100% de vos revenus locatifs, sans frais cachés",
      color: "bg-gradient-to-r from-blue-50 to-indigo-50",
      borderColor: "border-blue-100",
      highlightColor: "from-blue-400 to-indigo-500",
      iconBgColor: "bg-blue-100",
      processColor: "from-blue-600 to-indigo-600",
      number: "01",
      extraContent: (
        <motion.div
          className="mt-2 flex items-center text-blue-600 text-sm font-medium"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <span className="inline-block mr-1">Économisez jusqu'à 8% sur chaque location</span>
          <motion.span
            animate={{ x: [0, 3, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatDelay: 2 }}
          >
            →
          </motion.span>
        </motion.div>
      ),
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5Z"
            fill="#FFF4E6"
          />
          <path
            d="M28 14H12C10.9 14 10 14.9 10 16V24C10 25.1 10.9 26 12 26H28C29.1 26 30 25.1 30 24V16C30 14.9 29.1 14 28 14Z"
            fill="#FF9500"
            fillOpacity="0.2"
          />
          <path
            d="M28 14H12C10.9 14 10 14.9 10 16V24C10 25.1 10.9 26 12 26H28C29.1 26 30 25.1 30 24V16C30 14.9 29.1 14 28 14ZM28 18L20 21L12 18V16L20 19L28 16V18Z"
            fill="#FF9500"
          />
          <path
            d="M20 8C13.3726 8 8 13.3726 8 20C8 26.6274 13.3726 32 20 32C26.6274 32 32 26.6274 32 20C32 13.3726 26.6274 8 20 8ZM20 30C14.4772 30 10 25.5228 10 20C10 14.4772 14.4772 10 20 10C25.5228 10 30 14.4772 30 20C30 25.5228 25.5228 30 20 30Z"
            fill="#FF9500"
          />
        </svg>
      ),
      title: "Contrôle Complet",
      description: "Fixez vos propres règles et gérez vos locations à votre façon",
      color: "bg-gradient-to-r from-orange-50 to-amber-50",
      borderColor: "border-orange-100",
      highlightColor: "from-orange-400 to-amber-500",
      iconBgColor: "bg-orange-100",
      processColor: "from-orange-500 to-amber-600",
      number: "02",
      extraContent: (
        <motion.div
          className="mt-2 flex flex-wrap gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          {["Durée", "Prix", "Conditions"].map((tag, i) => (
            <motion.span
              key={i}
              className="inline-block px-2 py-1 bg-white bg-opacity-60 rounded-md text-xs text-orange-600"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, delay: 0.8 + i * 0.1 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      ),
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5Z"
            fill="#E6FFF4"
          />
          <path
            d="M20 10C14.4772 10 10 14.4772 10 20C10 25.5228 14.4772 30 20 30C25.5228 30 30 25.5228 30 20C30 14.4772 25.5228 10 20 10ZM20 28C15.5817 28 12 24.4183 12 20C12 15.5817 15.5817 12 20 12C24.4183 12 28 15.5817 28 20C28 24.4183 24.4183 28 20 28Z"
            fill="#10B981"
          />
          <path
            d="M20 14C19.4477 14 19 14.4477 19 15V20C19 20.5523 19.4477 21 20 21H24C24.5523 21 25 20.5523 25 20C25 19.4477 24.5523 19 24 19H21V15C21 14.4477 20.5523 14 20 14Z"
            fill="#10B981"
          />
          <path
            d="M20 8C13.3726 8 8 13.3726 8 20C8 26.6274 13.3726 32 20 32C26.6274 32 32 26.6274 32 20C32 13.3726 26.6274 8 20 8ZM20 30C14.4772 30 10 25.5228 10 20C10 14.4772 14.4772 10 20 10C25.5228 10 30 14.4772 30 20C30 25.5228 25.5228 30 20 30Z"
            fill="#10B981"
          />
        </svg>
      ),
      title: "Publication Express",
      description: "Votre annonce en ligne en 72h maximum, sans tracas",
      color: "bg-gradient-to-r from-green-50 to-emerald-50",
      borderColor: "border-green-100",
      highlightColor: "from-green-400 to-emerald-500",
      iconBgColor: "bg-green-100",
      processColor: "from-green-600 to-emerald-600",
      number: "03",
      extraContent: (
        <motion.div
          className="mt-2 flex items-center text-emerald-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <motion.div className="w-16 h-1 bg-gray-200 rounded-full mr-2 overflow-hidden">
            <motion.div
              className="h-full bg-emerald-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.9, ease: "easeOut" }}
            />
          </motion.div>
          <span>Processus accéléré</span>
        </motion.div>
      ),
    },
  ]

  // Étapes du processus (maintenant remplacées par les avantages)
  const steps = [
    {
      number: "01",
      title: "Créez votre annonce",
      description: "Décrivez votre bien et ajoutez des photos de qualité",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 5.33334C10.1091 5.33334 5.33337 10.1091 5.33337 16C5.33337 21.891 10.1091 26.6667 16 26.6667C21.891 26.6667 26.6667 21.891 26.6667 16C26.6667 10.1091 21.891 5.33334 16 5.33334ZM16 24C11.5817 24 8.00004 20.4183 8.00004 16C8.00004 11.5817 11.5817 8.00001 16 8.00001C20.4184 8.00001 24 11.5817 24 16C24 20.4183 20.4184 24 16 24Z"
            fill="white"
          />
          <path
            d="M16 10.6667C15.2636 10.6667 14.6667 11.2637 14.6667 12.0001V16.0001C14.6667 16.7365 15.2636 17.3334 16 17.3334H20C20.7364 17.3334 21.3334 16.7365 21.3334 16.0001C21.3334 15.2637 20.7364 14.6667 20 14.6667H17.3334V12.0001C17.3334 11.2637 16.7364 10.6667 16 10.6667Z"
            fill="white"
          />
          <path
            d="M16 5.33334C10.1091 5.33334 5.33337 10.1091 5.33337 16C5.33337 21.891 10.1091 26.6667 16 26.6667C21.891 26.6667 26.6667 21.891 26.6667 16C26.6667 10.1091 21.891 5.33334 16 5.33334ZM16 24C11.5817 24 8.00004 20.4183 8.00004 16C8.00004 11.5817 11.5817 8.00001 16 8.00001C20.4184 8.00001 24 11.5817 24 16C24 20.4183 20.4184 24 16 24Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Validation qualité",
      description: "Notre équipe vérifie et valide votre annonce",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.3334 18.6667L9.33337 14.6667L7.33337 16.6667L13.3334 22.6667L24 12L22 10L13.3334 18.6667Z"
            fill="white"
          />
          <path
            d="M16 5.33334C10.1091 5.33334 5.33337 10.1091 5.33337 16C5.33337 21.891 10.1091 26.6667 16 26.6667C21.891 26.6667 26.6667 21.891 26.6667 16C26.6667 10.1091 21.891 5.33334 16 5.33334ZM16 24C11.5817 24 8.00004 20.4183 8.00004 16C8.00004 11.5817 11.5817 8.00001 16 8.00001C20.4184 8.00001 24 11.5817 24 16C24 20.4183 20.4184 24 16 24Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Recevez des demandes",
      description: "Échangez directement avec des locataires intéressés",
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M24 8H8C6.9 8 6 8.9 6 10V22C6 23.1 6.9 24 8 24H24C25.1 24 26 23.1 26 22V10C26 8.9 25.1 8 24 8Z"
            fill="white"
            fillOpacity="0.5"
          />
          <path
            d="M24 8H8C6.9 8 6 8.9 6 10V22C6 23.1 6.9 24 8 24H24C25.1 24 26 23.1 26 22V10C26 8.9 25.1 8 24 8Z"
            fill="white"
          />
          <path
            d="M24 8H8C6.9 8 6 8.9 6 10V22C6 23.1 6.9 24 8 24H24C25.1 24 26 23.1 26 22V10C26 8.9 25.1 8 24 8Z"
            fill="white"
          />
        </svg>
      ),
    },
  ]

  // Données pour le carrousel de propriétés
  const propertyCards = [
    {
      id: 1,
      type: "Riad traditionnel",
      features: ["3 chambres", "2 salles de bain"],
      location: "Médina, Marrakech • Disponible maintenant",
      price: "4500 DH",
      period: "/ mois",
      contract: "Contrat minimum: 3 mois",
      status: "Validé",
      icon: <Home className="h-5 w-5 text-blue-600" />,
      bgColor: "bg-blue-50",
      image: "/riad-retreat.png",
    },
    {
      id: 2,
      type: "Appartement moderne",
      features: ["2 chambres", "1 salle de bain"],
      location: "Guéliz, Marrakech • Disponible dès maintenant",
      price: "3800 DH",
      period: "/ mois",
      contract: "Contrat minimum: 6 mois",
      status: "Populaire",
      icon: <Home className="h-5 w-5 text-purple-600" />,
      bgColor: "bg-purple-50",
      image: "/modern-moroccan-living.png",
    },
    {
      id: 3,
      type: "Villa avec piscine",
      features: ["4 chambres", "3 salles de bain"],
      location: "Palmeraie, Marrakech • Disponible le 15/06",
      price: "8500 DH",
      period: "/ mois",
      contract: "Contrat minimum: 12 mois",
      status: "Premium",
      icon: <Home className="h-5 w-5 text-emerald-600" />,
      bgColor: "bg-emerald-50",
      image: "/moroccan-villa-oasis.png",
    },
  ]

  // Effet pour changer la propriété affichée toutes les 4 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPropertyIndex((prevIndex) => (prevIndex + 1) % propertyCards.length)
    }, 5000) // Augmenté à 5 secondes pour mieux apprécier chaque image

    return () => clearInterval(interval)
  }, [propertyCards.length])

  // Animation variants pour le titre avec effet 3D
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const lineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: 90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  const decorationVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 1.2,
      },
    },
  }

  // Diviser le titre en mots pour l'animation
  const titleLine1 = "Confiez-nous".split(" ")
  const titleLine2 = "votre logement,".split(" ")
  const titleLine3 = "gardez le contrôle".split(" ")

  // Fonction pour changer manuellement la propriété affichée
  const changeProperty = (index:number) => {
    setCurrentPropertyIndex(index)
  }

  // Ajoutez cette fonction pour initialiser correctement la page
  useEffect(() => {
    // Vérifier si nous sommes dans un nouvel onglet
    const isNewTab = window.opener !== null

    if (isNewTab) {
      // Forcer l'affichage du formulaire et de la prévisualisation
      const formSection = document.getElementById("property-submission-form")
      if (formSection) {
        formSection.style.display = "block"
      }

      const previewSection = document.getElementById("property-preview-section")
      if (previewSection) {
        previewSection.style.display = "block"
      }
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Section redesignée */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        {/* Bouton de retour */}
        <div className="absolute top-4 left-4 z-20">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 rounded-full px-3 py-2 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Retour</span>
          </Button>
        </div>

        {/* Éléments décoratifs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-1/2 -left-24 w-72 h-72 bg-emerald-100 rounded-full opacity-20 blur-3xl"></div>

          {/* Éléments décoratifs animés */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-16 h-16 bg-blue-400 rounded-full opacity-10"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 5,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-purple-400 rounded-full opacity-10"
            animate={{
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 7,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full text-blue-600 font-medium text-sm mb-6">
                <span className={" italic font-medium"} style={{ fontFamily: 'var(--font-playfair)' }}>
                  Propriétaires, maximisez votre investissement
                </span>
              </div>

              {/* Titre avec nouvelle animation 3D */}
              <div ref={titleRef} className="perspective-1000 mb-8">
                <motion.div className="relative" initial="hidden" animate={controls} variants={containerVariants}>
                  {/* Éléments décoratifs autour du titre */}
                  <motion.div
                    className="absolute -top-6 -left-6 w-12 h-12 rounded-full border-2 border-dashed border-blue-300 opacity-70"
                    variants={decorationVariants}
                  />

                  <motion.div
                    className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full border-2 border-dashed border-purple-300 opacity-70"
                    variants={decorationVariants}
                  />

                  <motion.div
                    className="absolute top-1/2 right-1/4 w-4 h-4 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-70"
                    variants={decorationVariants}
                  />

                  {/* Première ligne */}
                  <motion.div className="mb-2" variants={lineVariants}>
                    {titleLine1.map((word, i) => (
                      <motion.span
                        key={`line1-${i}`}
                        className="inline-block mr-3 text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 transform-gpu"
                        variants={wordVariants}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Deuxième ligne */}
                  <motion.div className="mb-2" variants={lineVariants}>
                    {titleLine2.map((word, i) => (
                      <motion.span
                        key={`line2-${i}`}
                        className="inline-block mr-3 text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 transform-gpu"
                        variants={wordVariants}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Troisième ligne */}
                  <motion.div variants={lineVariants}>
                    {titleLine3.map((word, i) => (
                      <motion.span
                        key={`line3-${i}`}
                        className="inline-block mr-3 text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 transform-gpu"
                        variants={wordVariants}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                className="mb-8 relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-5 border border-blue-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.5 }}
              >
                <motion.div
                  className="absolute -top-10 -right-10 w-20 h-20 bg-blue-200 rounded-full opacity-20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                />

                <motion.div
                  className="absolute -bottom-8 -left-8 w-16 h-16 bg-indigo-300 rounded-full opacity-20"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 5,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />

                <div className="relative z-10">
                  {[
                    "Nous simplifions votre location",
                    "pour que vous vous concentriez sur l'essentiel :",
                    "rentabiliser votre bien en toute liberté.",
                  ].map((line, i) => (
                    <motion.p
                      key={i}
                      className={`text-lg font-medium text-gray-700 mb-1 ${i === 0 ? "playfair-font italic" : ""}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.7 + i * 0.2 }}
                    >
                      {line}
                    </motion.p>
                  ))}

                  <div className="mt-3 space-y-2">
                    {[
                      { icon: "check-circle", text: "Pas d'agence, pas de frais cachés." },
                      { icon: "file-text", text: "Déposez votre annonce, fixez vos propres règles." },
                      {
                        icon: "users",
                        text: "Entrez en contact avec des candidats sérieux prêts à s'engager sur le long terme.",
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 2.3 + i * 0.2 }}
                      >
                        {item.icon === "check-circle" && (
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        )}
                        {item.icon === "file-text" && (
                          <FileText className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        )}
                        {item.icon === "users" && <Users className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />}
                        <p className="text-gray-600">{item.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 2.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
                  <Button
                    size="lg"
                    className="relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-6 text-lg rounded-xl shadow-md hover:shadow-xl transition-all duration-300 w-full overflow-hidden"
                    onClick={handleStartProcess}
                  >
                    <div className="absolute inset-0 w-full h-full">
                      <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] bg-white/20 blur-xl" />
                    </div>
                    <span className="relative flex items-center justify-center">
                      Publier mon bien
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatDelay: 1 }}
                      >
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </motion.span>
                    </span>
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-xl blur-lg opacity-50 group-hover:opacity-80 transition duration-500 group-hover:duration-200"></div>
                  <Button
                    size="lg"
                    variant="outline"
                    className="relative border-blue-200 text-blue-600 hover:bg-blue-50 px-6 py-6 text-lg rounded-xl w-full backdrop-blur-sm"
                    onClick={handleContactUs}
                  >
                    <span className="relative flex items-center justify-center">
                      Besoin d'aide ?
                      <motion.span
                        animate={{
                          rotate: [0, 15, -15, 0],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, repeatDelay: 3 }}
                        className="ml-2"
                      >
                        <MessageCircle className="h-5 w-5" />
                      </motion.span>
                    </span>
                  </Button>
                </motion.div>
              </div>

              {/* Informations de contact - apparaît lorsqu'on clique sur "Besoin d'aide ?" */}
              {showContactInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-blue-50 rounded-xl border border-blue-100"
                >
                  <h3 className="font-semibold mb-2 flex items-center text-blue-700">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Notre équipe est là pour vous accompagner
                  </h3>
                  <p className="text-sm text-blue-600 mb-3">
                    Des experts immobiliers à votre service pour optimiser votre annonce et maximiser vos chances de
                    location.
                  </p>
                  <div className="flex flex-col space-y-2 text-sm">
                    <a href="tel:+212522000000" className="text-blue-600 hover:underline flex items-center">
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M22 16.92V19.92C22 20.4704 21.7893 20.9996 21.4142 21.3747C21.0391 21.7498 20.5099 21.9605 19.96 21.96C18.2 22.09 16.48 21.81 14.89 21.14C13.4 20.52 12.04 19.58 10.89 18.43C9.74 17.28 8.8 15.92 8.18 14.43C7.5 12.83 7.22 11.1 7.35 9.35C7.35 8.8 7.56 8.27 7.94 7.9C8.31 7.52 8.84 7.31 9.39 7.31H12.39C13.3778 7.3 14.2158 7.98 14.35 8.95C14.44 9.63 14.6 10.29 14.83 10.93C15.0806 11.6742 14.9178 12.4957 14.41 13.07L13.21 14.27C14.1654 15.6812 15.4097 16.8722 16.85 17.73L18.05 16.53C18.6243 16.0222 19.4458 15.8594 20.19 16.11C20.83 16.34 21.49 16.5 22.17 16.59C23.16 16.72 23.85 17.59 22.85 18.59"
                          stroke="#3B82F6"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      +212 522 00 00 00
                    </a>
                    <a href="mailto:contact@ejar.ma" className="text-blue-600 hover:underline flex items-center">
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                          stroke="#3B82F6"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22 6L12 13L2 6"
                          stroke="#3B82F6"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      contact@ejar.ma
                    </a>
                    <p className="text-blue-500 flex items-center">
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                          fill="#3B82F6"
                        />
                        <path d="M12.5 7H11V13L16.2 16.2L17 14.9L12.5 12.2V7Z" fill="#3B82F6" />
                      </svg>
                      Lun-Ven, 9h-18h
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="relative">
              <div className="absolute -top-6 -left-6 bg-white rounded-full shadow-lg p-3 z-20 border border-gray-100">
                <div className="bg-gradient-to-r from-green-50 to-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1.5" />
                  Location longue durée
                </div>
              </div>

              {/* Carrousel d'images - mise à jour ici */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl h-[400px] md:h-[500px] border-8 border-white">
                {/* Conteneur principal avec effet de parallaxe */}
                <div className="absolute inset-0 w-full h-full">
                  {propertyCards.map((property, idx) => (
                    <motion.div
                      key={`image-${idx}`}
                      className="absolute inset-0 w-full h-full"
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{
                        opacity: currentPropertyIndex === idx ? 1 : 0,
                        scale: currentPropertyIndex === idx ? 1 : 1.08,
                        filter: currentPropertyIndex === idx ? "blur(0px)" : "blur(8px)",
                      }}
                      transition={{
                        opacity: { duration: 0.8, ease: "easeInOut" },
                        scale: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
                        filter: { duration: 0.8, ease: "easeInOut" },
                      }}
                    >
                      <img
                          src={property.image || "/placeholder.svg"}
                          alt={`${property.type} - E-JAR`}
                          className="object-cover transition-transform duration-[2000ms] ease-out"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transform: currentPropertyIndex === idx ? "scale(1.05)" : "scale(1)",
                            position: "absolute", // في حال كنت تستخدمها بنفس طريقة `fill`
                            top: 0,
                            left: 0,
                          }}
                        />

                    </motion.div>
                  ))}
                </div>

                {/* Overlay avec gradient dynamique */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6"
                  animate={{
                    background:
                      currentPropertyIndex === 0
                        ? "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1) 70%, transparent)"
                        : currentPropertyIndex === 1
                          ? "linear-gradient(to top, rgba(88,28,135,0.7), rgba(88,28,135,0.1) 70%, transparent)"
                          : "linear-gradient(to top, rgba(6,78,59,0.7), rgba(6,78,59,0.1) 70%, transparent)",
                  }}
                  transition={{ duration: 1 }}
                >
                  {/* Carte d'information avec animation */}
                  <motion.div
                    layout
                    className="relative w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentPropertyIndex}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{
                          duration: 0.5,
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                        }}
                        className="bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-lg transform hover:scale-[1.02] transition-transform"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <motion.div
                            className={`${propertyCards[currentPropertyIndex].bgColor} p-2 rounded-full`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                          >
                            {propertyCards[currentPropertyIndex].icon}
                          </motion.div>
                          <h3 className="font-semibold text-gray-800">{propertyCards[currentPropertyIndex].type}</h3>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          {propertyCards[currentPropertyIndex].features.map((feature, idx) => (
                            <motion.span
                              key={idx}
                              className="bg-gray-100 px-2 py-1 rounded-md mr-2"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + idx * 0.1 }}
                            >
                              {feature}
                            </motion.span>
                          ))}
                        </div>
                        <motion.p
                          className="text-sm text-gray-600 mb-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          {propertyCards[currentPropertyIndex].location}
                        </motion.p>
                        <div className="flex justify-between items-center">
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                          >
                            <p className="font-bold text-2xl text-blue-600">
                              {propertyCards[currentPropertyIndex].price}
                              <span className="text-gray-500 text-sm font-normal">
                                {propertyCards[currentPropertyIndex].period}
                              </span>
                            </p>
                            <p className="text-xs text-gray-500">{propertyCards[currentPropertyIndex].contract}</p>
                          </motion.div>
                          <motion.div
                            className={`${
                              propertyCards[currentPropertyIndex].status === "Validé"
                                ? "bg-green-100 text-green-700"
                                : propertyCards[currentPropertyIndex].status === "Populaire"
                                  ? "bg-purple-100 text-purple-700"
                                  : "bg-blue-100 text-blue-700"
                            } px-3 py-1 rounded-full text-sm font-medium`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7, type: "spring" }}
                          >
                            {propertyCards[currentPropertyIndex].status}
                          </motion.div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>

                  {/* Indicateurs de pagination améliorés */}
                  <div className="flex justify-center mt-4 gap-2">
                    {propertyCards.map((_, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => changeProperty(idx)}
                        className="relative h-2 rounded-full bg-white/30 overflow-hidden"
                        initial={false}
                        animate={{
                          width: idx === currentPropertyIndex ? 24 : 8,
                          opacity: idx === currentPropertyIndex ? 1 : 0.6,
                        }}
                        whileHover={{
                          opacity: 1,
                          scale: 1.1,
                          transition: { duration: 0.2 },
                        }}
                        transition={{ duration: 0.4 }}
                        aria-label={`Voir ${propertyCards[idx].type}`}
                      >
                        {idx === currentPropertyIndex && (
                          <motion.div
                            className="absolute inset-0 bg-white"
                            layoutId="activeIndicator"
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Badge flottant */}
              <div className="absolute -bottom-5 -right-5 bg-white rounded-full shadow-lg p-3 z-20 border border-gray-100">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-100 text-blue-600 px-3 py-1.5 rounded-full text-sm font-medium">
                  Idéal pour expatriés
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section des avantages */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              <span className={"playfair-font"}>Pourquoi choisir</span> <span className="text-blue-600">E-JAR</span>{" "}
              ?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nous vous offrons une expérience de location simplifiée, transparente et entièrement sous votre contrôle.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                className={`rounded-xl overflow-hidden shadow-lg border ${advantage.borderColor} ${advantage.color} p-6 relative`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { duration: 0.2 },
                }}
              >
                <motion.div
                  className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-30 blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.4, 0.3],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 5 + index,
                    ease: "easeInOut",
                  }}
                />

                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold text-gray-500">
                  {advantage.number}
                </div>

                <div className={`${advantage.iconBgColor} p-3 rounded-full inline-block mb-4 relative`}>
                  {advantage.icon}
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${advantage.highlightColor} opacity-0`}
                    animate={{
                      opacity: [0, 0.5, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 3,
                      delay: index * 1.5,
                      repeatDelay: 5,
                    }}
                  />
                </div>

                <h3 className="text-xl font-bold mb-2 relative z-10">{advantage.title}</h3>
                <p className="text-gray-600 mb-4 relative z-10">{advantage.description}</p>

                {advantage.extraContent}

                <motion.div
                  className={`h-1 w-16 bg-gradient-to-r ${advantage.processColor} rounded-full mt-4`}
                  initial={{ width: 0 }}
                  whileInView={{ width: "4rem" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire de dépôt d'annonce */}
      <section ref={formRef} id="property-form" className="py-20 bg-white relative">
        <motion.div
          className="container mx-auto px-4 md:px-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.div
              className="flex items-center justify-center mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent w-16"></div>
              <div className="px-4">
                <motion.div
                  className="bg-blue-50 rounded-full p-2"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <FileText className="h-5 w-5 text-blue-500" />
                </motion.div>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent w-16"></div>
            </motion.div>

            <motion.h2
              className="text-3xl font-bold text-center mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.span
                className="text-blue-600"
                initial={{ backgroundSize: "0% 3px" }}
                whileInView={{ backgroundSize: "100% 3px" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.6 }}
                style={{
                  backgroundImage: "linear-gradient(to right, #4153a4, #5195cd)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "0 bottom",
                }}
              >
                Déposez votre annonce
              </motion.span>{" "}
              en quelques clics
            </motion.h2>

            <motion.p
              className="text-gray-600 text-center mb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Complétez le formulaire ci-dessous avec les informations de votre bien immobilier pour le mettre en
              location longue durée
            </motion.p>
          </motion.div>

          {isAuthenticated ? (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <section id="property-submission-form">
                    <PropertySubmissionForm onSubmit={handleFormSubmit} />
                  </section>
                </motion.div>
              </div>
              <div className="lg:col-span-2">
                <div className="sticky top-24">
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                  >
                    <section id="property-preview-section">
                      <PropertyPreview />
                    </section>
                  </motion.div>
                </div>
              </div>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <AuthAlert
                title="Connexion requise"
                description="Vous devez être connecté pour déposer une annonce."
                buttonText="Se connecter"
                onButtonClick={() => setIsAuthModalOpen(true)}
              />
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Modals */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <SubmissionSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onDashboardClick={() => router.visit("/dashboard/mes-annonces")}
      />

    </div>
  )
}
