
import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import { Check, X, ChevronLeft, ChevronRight, ArrowRight, Star, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { router } from '@inertiajs/react';
import "./style.css"

type PackFeature = {
  name: string
  included: boolean
}

type Pack = {
  id: string
  name: string
  description: string
  price: string
  priceLabel: string
  features: PackFeature[]
  popular?: boolean
  color: string
  textColor: string
  icon: React.ReactNode
}

export function PricingPacks() {
  const [selectedPack, setSelectedPack] = useState<string>("standard")
  const [activeIndex, setActiveIndex] = useState(1) // Default to standard (middle option)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Références et animations pour le titre
  const titleRef = useRef(null)
  const isInView = useInView(titleRef, { once: true, amount: 0.5 })
  const controls = useAnimation()

  // État pour l'animation du sous-titre
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0)
  const subtitles = [
    "Vous êtes sur le point de vous abonner, choisissez le forfait qui vous convient le mieux !",
    "Des options flexibles pour tous les besoins — trouvez votre formule idéale.",
    "Sélectionnez le pack parfait pour votre expérience E-JAR.",
  ]

  // Effet pour animer le sous-titre
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubtitleIndex((prev) => (prev + 1) % subtitles.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [subtitles.length])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const packs: Pack[] = [
    {
      id: "basic",
      name: "Basic",
      description: "Accès à vie",
      price: "Gratuit",
      priceLabel: "",
      color: "#4b5aa2", // Bleu foncé
      textColor: "text-[#4b5aa2]",
      icon: <Star className="h-6 w-6 text-[#4152A3]" fill="#4152A3" />,
      features: [
        { name: "Publier votre logement sur E-JAR", included: true },
        { name: "Interaction avec les utilisateurs d'E-JAR", included: true },
        { name: "Sponsorisez vos annonces et notifiez les locataires potentiels", included: false },
        { name: "Visualisez votre annonce en 360°", included: false },
        { name: "Notre agence gère votre logement", included: false },
        { name: "Assurance E-JAR", included: false },
      ],
    },
    {
      id: "standard",
      name: "Standard",
      description: "1 mois de sponsorisation",
      price: "50",
      priceLabel: "dhs",
      color: "#4d86c4", // Bleu moyen
      textColor: "text-[#4d86c4]",
      icon: <Shield className="h-6 w-6 text-[#4d86c4]" fill="#4d86c4"/>,
      features: [
        { name: "Publier votre logement sur E-JAR", included: true },
        { name: "Interaction avec les utilisateurs d'E-JAR", included: true },
        { name: "Sponsorisez vos annonces et notifiez les locataires potentiels", included: true },
        { name: "Visualisez votre annonce en 360°", included: false },
        { name: "Notre agence gère votre logement", included: false },
        { name: "Assurance E-JAR", included: false },
      ],
      popular: true,
    },
  ]

  useEffect(() => {
    // Update selected pack when active index changes
    setSelectedPack(packs[activeIndex].id)
  }, [activeIndex, packs])

  const handleNext = () => {
    setActiveIndex((prev) => (prev === packs.length - 1 ? 0 : prev + 1))
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? packs.length - 1 : prev - 1))
  }

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
        delay: 0.8,
      },
    },
  }

  // Diviser le titre en mots pour l'animation
  const titleLine1 = "Choisissez votre".split(" ")
  const titleLine2 = ["pack"]

  // Fonction pour créer un dégradé avec la couleur du pack
  const getGradientFrom = (color: string) => {
    // Créer une version plus claire de la couleur pour le dégradé
    return `linear-gradient(to bottom right, ${color}, ${color}80)`
  }

  const getGradientTo = (color: string) => {
    // Créer une version plus claire de la couleur pour le dégradé
    return `linear-gradient(to top left, ${color}, ${color}80)`
  }

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Titre avec animation 3D et éléments décoratifs intégrés */}
        <div ref={titleRef} className="perspective-1000 mb-10 text-center relative">
          <motion.div
            className="relative inline-block"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            {/* Éléments décoratifs intégrés au titre */}
            <motion.div
              className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-blue-100 opacity-70"
              variants={decorationVariants}
            />
            <motion.div
              className="absolute -top-1 left-1/4 w-3 h-3 rounded-full bg-indigo-200 opacity-60"
              variants={decorationVariants}
            />
            <motion.div
              className="absolute top-1/2 -left-4 w-2 h-2 rounded-full bg-purple-100 opacity-50"
              variants={decorationVariants}
            />
            <motion.div
              className="absolute -bottom-2 left-1/3 w-4 h-4 rounded-full bg-blue-50 opacity-70"
              variants={decorationVariants}
            />

            {/* Petits points décoratifs */}
            <motion.div
              className="absolute top-0 right-0 w-2 h-2 rounded-full bg-indigo-300 opacity-60"
              variants={decorationVariants}
            />
            <motion.div
              className="absolute top-1/4 right-1/4 w-1.5 h-1.5 rounded-full bg-blue-400 opacity-50"
              variants={decorationVariants}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/3 w-2.5 h-2.5 rounded-full bg-purple-200 opacity-60"
              variants={decorationVariants}
            />
            <motion.div
              className="absolute -bottom-3 right-0 w-3 h-3 rounded-full bg-indigo-100 opacity-70"
              variants={decorationVariants}
            />

            {/* Lignes décoratives */}
            <motion.div
              className="absolute top-1/4 -left-6 w-5 h-0.5 bg-gradient-to-r from-blue-300 to-transparent opacity-70 transform rotate-45"
              variants={decorationVariants}
            />
            <motion.div
              className="absolute bottom-1/4 -right-6 w-5 h-0.5 bg-gradient-to-l from-indigo-300 to-transparent opacity-70 transform -rotate-45"
              variants={decorationVariants}
            />

            {/* Première ligne du titre: "Choisissez votre" */}
            <motion.div className="mb-1 relative" variants={lineVariants}>
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

              {/* Éléments décoratifs intégrés dans le texte */}
              <motion.div
                className="absolute top-1/2 transform -translate-y-1/2 -right-4 w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 opacity-80"
                variants={decorationVariants}
              />
            </motion.div>

            {/* Deuxième ligne du titre: "pack" */}
            <motion.div className="relative" variants={lineVariants}>
              {titleLine2.map((word, i) => (
                <motion.span
                  key={`line2-${i}`}
                  className="inline-block text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 transform-gpu"
                  variants={wordVariants}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {word}
                </motion.span>
              ))}

              {/* Éléments décoratifs intégrés dans le texte */}
              <motion.div
                className="absolute top-1/2 transform -translate-y-1/2 -left-4 w-3 h-3 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 opacity-80"
                variants={decorationVariants}
              />
              <motion.div
                className="absolute top-1/2 transform -translate-y-1/2 -right-4 w-3 h-3 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 opacity-80"
                variants={decorationVariants}
              />
            </motion.div>

            {/* Ligne décorative sous le titre */}
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mt-4"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            />
          </motion.div>
        </div>

        {/* Sous-titre avec le style de "Louez à votre rythme, selon vos règles..." */}
        <div className="mb-16 relative overflow-hidden h-16">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentSubtitleIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`playfair-font italic text-lg md:text-xl text-gray-700 text-center max-w-2xl mx-auto`}
            >
              {subtitles[currentSubtitleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {packs.map((pack, index) => {
              const isSelected = selectedPack === pack.id
              const isPopular = pack.popular

              return (
                <motion.div
                  key={pack.id}
                  className={cn(
                    `rounded-2xl overflow-hidden transition-all duration-300 bg-white text-gray-900 relative`,
                    isSelected
                      ? `ring-4 ring-opacity-50 shadow-xl ring-[#4d86c4]/35`
                      : "ring-1 ring-gray-200 shadow-sm"
                  )}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedPack(pack.id)}
                >
                  {/* Éléments décoratifs */}
                  <div
                    className="absolute top-0 left-0 w-24 h-24 opacity-10 rounded-br-full"
                    style={{ background: getGradientFrom(pack.color) }}
                  />

                  <div
                    className="absolute bottom-0 right-0 w-32 h-32 opacity-10 rounded-tl-full"
                    style={{ background: getGradientTo(pack.color) }}
                  />

                  <div
                    className="absolute top-1/4 right-6 w-2 h-2 rounded-full opacity-30"
                    style={{ backgroundColor: pack.color }}
                  />
                  <div
                    className="absolute bottom-1/3 left-8 w-3 h-3 rounded-full opacity-20"
                    style={{ backgroundColor: pack.color }}
                  />

                  {/* Motif décoratif - Logo E-JAR */}
                  <div className="absolute top-1/2 right-4 w-24 h-24 opacity-5">
                    <img
                      src="/ejar-logo-decoration.png"
                      alt=""
                      width={100}
                      height={100}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Popular Badge */}
                  {isPopular && (
                    <div className="absolute top-6 right-6 z-10">
                      <span
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: `${pack.color}20`,
                          color: pack.color,
                          border: `1px solid ${pack.color}40`,
                        }}
                      >
                        Populaire
                      </span>
                    </div>
                  )}

                  <div className="p-8 relative z-10">
                    {/* Header with icon */}
                    <div className="flex items-center mb-4">
                      <div
                        className="p-2 rounded-full bg-opacity-10 mr-3"
                        style={{ backgroundColor: "#c0d1e2" }}
                      >
                        {pack.icon}
                      </div>
                      <h3 className={`text-2xl font-bold ${pack.textColor}`}>{pack.name}</h3>
                    </div>

                    <p className="text-gray-500 mb-6">{pack.description}</p>

                    {/* Price */}
                    <div className="flex items-baseline mb-8">
                      <span className={`text-5xl font-extrabold ${pack.textColor}`}>{pack.price}</span>
                      {pack.priceLabel && (
                        <span className="ml-2 text-xl font-medium text-gray-500">{pack.priceLabel}</span>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-8">
                      {pack.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          {feature.included ? (
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                              <Check className="h-3 w-3 text-green-600" />
                            </div>
                          ) : (
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center">
                              <X className="h-3 w-3 text-red-600" />
                            </div>
                          )}
                          <span className={cn("text-sm", !feature.included && "text-gray-400")}>{feature.name}</span>
                        </div>
                      ))}
                    </div>

                    {/* Button */}
                    <motion.button
                      className="w-full py-3 px-1 rounded-full font-medium transition-colors duration-300 flex items-center justify-center text-white"
                      style={{ backgroundColor: pack.color }}
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                      }}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                      onClick={() => router.visit("/deposer-annonce")}
                    >
                      <span>Sélectionner</span>
                      <motion.div
                        className="ml-2 flex items-center"
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                          duration: 1.5,
                          ease: "easeInOut",
                        }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </motion.button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile View - Carousel */}
        <div className="md:hidden relative">
          <div className="relative overflow-hidden px-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl overflow-hidden shadow-xl bg-white text-gray-900 mx-auto max-w-sm relative"
              >
                {/* Éléments décoratifs */}
                <div
                  className="absolute top-0 left-0 w-24 h-24 opacity-10 rounded-br-full"
                  style={{ background: getGradientFrom(packs[activeIndex].color) }}
                />

                <div
                  className="absolute bottom-0 right-0 w-32 h-32 opacity-10 rounded-tl-full"
                  style={{ background: getGradientTo(packs[activeIndex].color) }}
                />

                <div
                  className="absolute top-1/4 right-6 w-2 h-2 rounded-full opacity-30"
                  style={{ backgroundColor: packs[activeIndex].color }}
                />
                <div
                  className="absolute bottom-1/3 left-8 w-3 h-3 rounded-full opacity-20"
                  style={{ backgroundColor: packs[activeIndex].color }}
                />

                {/* Motif décoratif - Logo E-JAR */}
                <div className="absolute top-1/2 right-4 w-24 h-24 opacity-5">
                  <img
                    src="/ejar-logo-decoration.png"
                    alt=""
                    width={100}
                    height={100}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Popular Badge */}
                {packs[activeIndex].popular && (
                  <div className="absolute top-6 right-6 z-10">
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${packs[activeIndex].color}20`,
                        color: packs[activeIndex].color,
                        border: `1px solid ${packs[activeIndex].color}40`,
                      }}
                    >
                      Populaire
                    </span>
                  </div>
                )}

                <div className="p-8 relative z-10">
                  {/* Header with icon */}
                  <div className="flex items-center mb-4">
                    <div
                      className="p-2 rounded-full bg-opacity-10 mr-3"
                      style={{ backgroundColor: `${packs[activeIndex].color}20` }}
                    >
                      {packs[activeIndex].icon}
                    </div>
                    <h3 className={`text-2xl font-bold ${packs[activeIndex].textColor}`}>{packs[activeIndex].name}</h3>
                  </div>

                  <p className="text-gray-500 mb-6">{packs[activeIndex].description}</p>

                  {/* Price */}
                  <div className="flex items-baseline mb-8">
                    <span className={`text-5xl font-extrabold ${packs[activeIndex].textColor}`}>
                      {packs[activeIndex].price}
                    </span>
                    {packs[activeIndex].priceLabel && (
                      <span className="ml-2 text-xl font-medium text-gray-500">{packs[activeIndex].priceLabel}</span>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {packs[activeIndex].features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        {feature.included ? (
                          <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                        ) : (
                          <div className="flex-shrink-0 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center">
                            <X className="h-3 w-3 text-red-600" />
                          </div>
                        )}
                        <span className={cn("text-sm", !feature.included && "text-gray-400")}>{feature.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Button */}
                  <motion.button
                    className="w-full py-3 px-1 rounded-xl font-medium transition-colors duration-300 flex items-center justify-center text-white"
                    style={{ backgroundColor: packs[activeIndex].color }}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                    onClick={() => router.visit("/deposer-annonce")}
                  >
                    <span>Sélectionner</span>
                    <motion.div
                      className="ml-2 flex items-center"
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        duration: 1.5,
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button onClick={handlePrev} className="bg-white p-2 rounded-full shadow-md border border-gray-200 -ml-2">
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button onClick={handleNext} className="bg-white p-2 rounded-full shadow-md border border-gray-200 -mr-2">
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {packs.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all ${activeIndex === index ? "w-8" : "w-2.5 bg-gray-300"}`}
                style={{
                  backgroundColor: activeIndex === index ? packs[index].color : undefined,
                }}
                aria-label={`Voir pack ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
