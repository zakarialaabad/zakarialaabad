"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, AlertCircle, ArrowRight, X, Eye, EyeOff, Mail, Lock, Calendar, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { format, isValid, differenceInYears, subYears } from "date-fns"
import { useAuth } from "@/contexts/auth-context"
import { motion, AnimatePresence } from "framer-motion"
import React from "react"

// Créer un DialogContent personnalisé sans bouton de fermeture
const CustomDialogContent = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "sm:max-w-[900px] p-0 overflow-hidden rounded-xl border-0 shadow-xl transition-all duration-300 animate-in fade-in-0 zoom-in-95 fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] bg-white",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)
CustomDialogContent.displayName = "CustomDialogContent"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  // États pour les formulaires
  const [activeView, setActiveView] = useState<"login" | "register">("login")
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [date, setDate] = useState<Date>()
  const [dateError, setDateError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { login } = useAuth()

  // Date minimale (18 ans à partir d'aujourd'hui)
  const maxDate = subYears(new Date(), 18)
  // Date maximale (100 ans à partir d'aujourd'hui)
  const minDate = subYears(new Date(), 100)

  // Réinitialiser les états lors de l'ouverture/fermeture de la modale
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setEmail("")
        setFullName("")
        setPassword("")
        setConfirmPassword("")
        setDate(undefined)
        setDateError("")
        setPasswordError("")
        setPasswordStrength(0)
        setShowPassword(false)
        setShowConfirmPassword(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Vérifier la force du mot de passe
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0)
      return
    }

    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    setPasswordStrength(strength)

    if (confirmPassword && password !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas")
    } else {
      setPasswordError("")
    }
  }, [password, confirmPassword])

  // Vérifier la validité de la date de naissance
  const validateBirthdate = (selectedDate?: Date): boolean => {
    if (!selectedDate || !isValid(selectedDate)) {
      setDateError("Veuillez sélectionner une date de naissance valide")
      return false
    }

    const age = differenceInYears(new Date(), selectedDate)

    if (age < 18) {
      setDateError("Vous devez avoir au moins 18 ans pour vous inscrire")
      return false
    }

    if (age > 100) {
      setDateError("Veuillez vérifier votre date de naissance")
      return false
    }

    setDateError("")
    return true
  }

  const handleDateChange = (selectedDate?: Date) => {
    setDate(selectedDate)
    if (selectedDate) {
      validateBirthdate(selectedDate)
    } else {
      setDateError("")
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simuler un délai de chargement
      await new Promise((resolve) => setTimeout(resolve, 800))
      login()
      onClose()
    } catch (error) {
      console.error("Erreur de connexion:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation du mot de passe
    if (password !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas")
      return
    }

    // Validation de la date de naissance
    if (!validateBirthdate(date)) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simuler un délai de chargement
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Dans un cas réel, on enverrait toutes les données, y compris la date de naissance
      console.log("Date de naissance:", date ? format(date, "yyyy-MM-dd") : "Non définie")

      login() // Dans un cas réel, on appellerait une fonction register
      onClose()
    } catch (error) {
      console.error("Erreur d'inscription:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSocialLogin = async (provider: string) => {
    setIsSubmitting(true)

    try {
      console.log(`Login with ${provider}`)
      // Simuler un délai de chargement
      await new Promise((resolve) => setTimeout(resolve, 800))
      login()
      onClose()
    } catch (error) {
      console.error(`Erreur de connexion avec ${provider}:`, error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Variantes d'animation pour les transitions
  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  }

  if (!isOpen) return null

  // Utiliser une implémentation personnalisée du Dialog pour éviter le bouton de fermeture automatique
  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 bg-black/80" onClick={onClose} />

      {/* Contenu du modal */}
      <CustomDialogContent>
        <div className="flex flex-col md:flex-row h-full">
          {/* Panneau latéral avec image et logo */}
          <div className="relative w-full md:w-[40%] flex flex-col items-center justify-between text-center overflow-hidden">
            {/* Image de fond */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Groupe%2041487-D00PfGvpoxs0QR8JpISSTUxDZvMWKJ.png"
                alt="Background"
                className="object-cover"
              />
            </div>

            {/* Contenu centré avec espacement vertical */}
            <div className="relative z-10 flex flex-col items-center justify-between h-full w-full px-6 py-12">
              {/* Logo et titre avec centrage vertical */}
              <div className="flex-1"></div> {/* Spacer supérieur pour centrage */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex flex-col items-center justify-center"
              >
                <div className="relative w-[170px] h-[170px] mb-6 transition-all duration-500 hover:scale-105">
                  <img
                    src="/ejar-logo.png"
                    alt="E-JAR Logo"
                    className="object-contain drop-shadow-sm"
                  />
                </div>
                <h2 className="text-xl font-bold text-primary mb-3">Bienvenue sur E-JAR</h2>
                <p className="text-gray-600 text-sm max-w-xs text-center">
                  Votre plateforme de location immobilière au Maroc sans intermédiaire
                </p>
              </motion.div>
              <div className="flex-1"></div> {/* Spacer central pour équilibrer */}
              {/* Texte légal */}
              <p className="text-xs text-center text-gray-500 max-w-xs">
                En continuant, vous acceptez nos{" "}
                <a href="#" className="underline underline-offset-2 hover:text-primary transition-colors">
                  Conditions d'utilisation
                </a>{" "}
                et notre{" "}
                <a href="#" className="underline underline-offset-2 hover:text-primary transition-colors">
                  Politique de confidentialité
                </a>
                .
              </p>
            </div>
          </div>

          {/* Contenu du formulaire */}
          <div className="flex-1 p-8 bg-white relative">
            {/* Bouton de fermeture avec seulement l'icône X */}
            <button
              onClick={onClose}
              className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors z-10 p-1 rounded-full hover:bg-gray-100"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>

            {/* Onglets de navigation */}
            <div className="flex justify-center mb-10 mt-4">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-full shadow-sm">
                <button
                  onClick={() => setActiveView("login")}
                  className={cn(
                    "px-6 py-2 text-sm font-medium rounded-full transition-all duration-300",
                    activeView === "login"
                      ? "bg-white text-primary shadow-sm"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50",
                  )}
                >
                  Connexion
                </button>
                <button
                  onClick={() => setActiveView("register")}
                  className={cn(
                    "px-6 py-2 text-sm font-medium rounded-full transition-all duration-300",
                    activeView === "register"
                      ? "bg-white text-primary shadow-sm"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50",
                  )}
                >
                  Inscription
                </button>
              </div>
            </div>

            {/* Formulaires avec animation */}
            <AnimatePresence mode="wait">
              {/* Formulaire de connexion */}
              {activeView === "login" && (
                <motion.div
                  key="login"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email ou numéro de téléphone
                      </Label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <Mail size={18} />
                        </div>
                        <Input
                          id="email"
                          type="text"
                          placeholder="exemple@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="h-11 pl-10 focus-visible:ring-primary"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="password" className="text-sm font-medium">
                          Mot de passe
                        </Label>
                        <a href="#" className="text-xs text-primary hover:underline transition-colors">
                          Mot de passe oublié ?
                        </a>
                      </div>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <Lock size={18} />
                        </div>
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="h-11 pl-10 pr-10 focus-visible:ring-primary"
                          disabled={isSubmitting}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => handleSocialLogin("google")}
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-3 h-11 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none group"
                      >
                        <div className="flex-shrink-0 w-5 h-5 relative">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full">
                            <path
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              fill="#4285F4"
                            />
                            <path
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              fill="#34A853"
                            />
                            <path
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              fill="#FBBC05"
                            />
                            <path
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              fill="#EA4335"
                            />
                          </svg>
                        </div>
                        <span className="font-medium text-gray-700 text-sm group-hover:text-gray-900 transition-colors">
                          Google
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSocialLogin("facebook")}
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-3 h-11 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none group"
                      >
                        <div className="flex-shrink-0 w-5 h-5 relative text-[#1877F2]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-full h-full"
                          >
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        </div>
                        <span className="font-medium text-gray-700 text-sm group-hover:text-gray-900 transition-colors">
                          Facebook
                        </span>
                      </button>
                    </div>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-muted-foreground">ou</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "w-full relative overflow-hidden group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary",
                        "h-11 px-6 rounded-lg text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg",
                        "disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none",
                      )}
                    >
                      {/* Effet de brillance au survol */}
                      <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

                      {/* Contenu du bouton */}
                      <span className="relative flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Connexion en cours...
                          </>
                        ) : (
                          <>
                            Se connecter
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </span>
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Formulaire d'inscription */}
              {activeView === "register" && (
                <motion.div
                  key="register"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <form onSubmit={handleRegister} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="full-name" className="text-sm font-medium">
                        Nom complet
                      </Label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <User size={18} />
                        </div>
                        <Input
                          id="full-name"
                          type="text"
                          placeholder="Prénom et nom"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          className="h-11 pl-10 focus-visible:ring-primary"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="text-sm font-medium">
                        Email
                      </Label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <Mail size={18} />
                        </div>
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="exemple@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="h-11 pl-10 focus-visible:ring-primary"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-password" className="text-sm font-medium">
                          Mot de passe
                        </Label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Lock size={18} />
                          </div>
                          <Input
                            id="register-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={cn(
                              "h-11 pl-10 pr-10 focus-visible:ring-primary",
                              passwordStrength > 0 && "border-green-400",
                              passwordStrength === 0 && password && "border-red-400",
                            )}
                            disabled={isSubmitting}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>

                        {password && (
                          <div className="flex gap-1 mt-1">
                            {[...Array(4)].map((_, i) => (
                              <div
                                key={i}
                                className={cn(
                                  "h-1 flex-1 rounded-full transition-colors",
                                  i < passwordStrength ? "bg-green-500" : "bg-gray-200",
                                )}
                              />
                            ))}
                          </div>
                        )}

                        {password && passwordStrength < 3 && (
                          <p className="text-xs text-amber-600 mt-1">
                            Pour un mot de passe fort, utilisez au moins 8 caractères avec des majuscules, chiffres et
                            symboles.
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password" className="text-sm font-medium">
                          Confirmer le mot de passe
                        </Label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Lock size={18} />
                          </div>
                          <Input
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className={cn(
                              "h-11 pl-10 pr-10 focus-visible:ring-primary",
                              confirmPassword && !passwordError && "border-green-400",
                              passwordError && "border-red-400",
                            )}
                            disabled={isSubmitting}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>

                        {passwordError && (
                          <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                            <AlertCircle className="h-3 w-3" />
                            {passwordError}
                          </p>
                        )}

                        {confirmPassword && !passwordError && (
                          <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Les mots de passe correspondent
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="birthdate" className="text-sm font-medium flex justify-between">
                        <span>Date de naissance</span>
                        <span className="text-xs text-gray-500">(Vous devez avoir au moins 18 ans)</span>
                      </Label>

                      <div className="grid grid-cols-3 gap-2">
                        {/* Sélecteur de jour */}
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                            <Calendar size={18} />
                          </div>
                          <select
                            id="birth-day"
                            className={cn(
                              "w-full h-11 rounded-md border bg-background pl-10 pr-3 py-2 text-sm appearance-none",
                              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                              dateError && "border-red-400",
                              date && !dateError && "border-green-400",
                            )}
                            value={date ? date.getDate() : ""}
                            onChange={(e) => {
                              const day = Number.parseInt(e.target.value)
                              if (date) {
                                const newDate = new Date(date)
                                newDate.setDate(day)
                                handleDateChange(newDate)
                              } else {
                                // Si aucune date n'est sélectionnée, créer une nouvelle date
                                const newDate = new Date()
                                newDate.setDate(day)
                                // Réinitialiser le mois et l'année pour éviter une date valide par défaut
                                newDate.setFullYear(2000)
                                newDate.setMonth(0)
                                handleDateChange(newDate)
                              }
                            }}
                            disabled={isSubmitting}
                          >
                            <option value="" disabled>
                              Jour
                            </option>
                            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                              <option key={day} value={day}>
                                {day}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Sélecteur de mois */}
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                            <Calendar size={18} />
                          </div>
                          <select
                            id="birth-month"
                            className={cn(
                              "w-full h-11 rounded-md border bg-background pl-10 pr-3 py-2 text-sm appearance-none",
                              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                              dateError && "border-red-400",
                              date && !dateError && "border-green-400",
                            )}
                            value={date ? date.getMonth() : ""}
                            onChange={(e) => {
                              const month = Number.parseInt(e.target.value)
                              if (date) {
                                const newDate = new Date(date)
                                newDate.setMonth(month)
                                handleDateChange(newDate)
                              } else {
                                // Si aucune date n'est sélectionnée, créer une nouvelle date
                                const newDate = new Date()
                                newDate.setMonth(month)
                                // Réinitialiser le jour et l'année
                                newDate.setDate(1)
                                newDate.setFullYear(2000)
                                handleDateChange(newDate)
                              }
                            }}
                            disabled={isSubmitting}
                          >
                            <option value="" disabled>
                              Mois
                            </option>
                            {[
                              "Janvier",
                              "Février",
                              "Mars",
                              "Avril",
                              "Mai",
                              "Juin",
                              "Juillet",
                              "Août",
                              "Septembre",
                              "Octobre",
                              "Novembre",
                              "Décembre",
                            ].map((month, index) => (
                              <option key={month} value={index}>
                                {month}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Sélecteur d'année */}
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                            <Calendar size={18} />
                          </div>
                          <select
                            id="birth-year"
                            className={cn(
                              "w-full h-11 rounded-md border bg-background pl-10 pr-3 py-2 text-sm appearance-none",
                              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                              dateError && "border-red-400",
                              date && !dateError && "border-green-400",
                            )}
                            value={date ? date.getFullYear() : ""}
                            onChange={(e) => {
                              const year = Number.parseInt(e.target.value)
                              if (date) {
                                const newDate = new Date(date)
                                newDate.setFullYear(year)
                                handleDateChange(newDate)
                              } else {
                                // Si aucune date n'est sélectionnée, créer une nouvelle date
                                const newDate = new Date()
                                newDate.setFullYear(year)
                                // Réinitialiser le jour et le mois
                                newDate.setDate(1)
                                newDate.setMonth(0)
                                handleDateChange(newDate)
                              }
                            }}
                            disabled={isSubmitting}
                          >
                            <option value="" disabled>
                              Année
                            </option>
                            {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - 18 - i).map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {dateError && (
                        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                          <AlertCircle className="h-3 w-3" />
                          {dateError}
                        </p>
                      )}
                      {date && !dateError && (
                        <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Date de naissance valide
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => handleSocialLogin("google")}
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-3 h-11 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none group"
                      >
                        <div className="flex-shrink-0 w-5 h-5 relative">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full">
                            <path
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              fill="#4285F4"
                            />
                            <path
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              fill="#34A853"
                            />
                            <path
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              fill="#FBBC05"
                            />
                            <path
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              fill="#EA4335"
                            />
                          </svg>
                        </div>
                        <span className="font-medium text-gray-700 text-sm group-hover:text-gray-900 transition-colors">
                          Google
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSocialLogin("facebook")}
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-3 h-11 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none group"
                      >
                        <div className="flex-shrink-0 w-5 h-5 relative text-[#1877F2]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-full h-full"
                          >
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        </div>
                        <span className="font-medium text-gray-700 text-sm group-hover:text-gray-900 transition-colors">
                          Facebook
                        </span>
                      </button>
                    </div>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-muted-foreground">ou</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !!passwordError || !!dateError}
                      className={cn(
                        "w-full relative overflow-hidden group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary",
                        "h-11 px-6 rounded-lg text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg",
                        "disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none",
                      )}
                    >
                      {/* Effet de brillance au survol */}
                      <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

                      {/* Contenu du bouton */}
                      <span className="relative flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Inscription en cours...
                          </>
                        ) : (
                          <>
                            S'inscrire
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </span>
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </CustomDialogContent>
    </>
  )
}
