"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, X, Loader2, Sparkles, ArrowRight, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { motion, AnimatePresence } from "framer-motion"

interface AISearchBarProps {
  onSearch: (query: string, aiResults: any) => void
  className?: string
  placeholder?: string
}

export function AISearchBar({
  onSearch,
  className,
  placeholder = "Décrivez votre logement idéal...",
}: AISearchBarProps) {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [exampleQueries, setExampleQueries] = useState<string[]>([
    "Appartement avec 2 chambres et vue sur mer",
    "Studio pour étudiant près de l'université",
    "Maison familiale avec jardin à Laayoune",
    "Logement avec terrasse moins de 1500 MAD",
  ])
  const [showExamples, setShowExamples] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [showClearButton, setShowClearButton] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null)
  const [isTyping, setIsTyping] = useState(false)

  // Effet pour gérer l'affichage du bouton de suppression
  useEffect(() => {
    setShowClearButton(query.length > 0)
  }, [query])

  // Effet pour afficher les exemples quand le champ est vide et focalisé
  useEffect(() => {
    if (isFocused && query.length === 0) {
      setShowExamples(true)
    } else {
      setShowExamples(false)
    }
  }, [isFocused, query])

  // Fonction pour générer des suggestions basées sur l'entrée de l'utilisateur
  const generateSuggestions = async (input: string) => {
    if (input.length < 3) {
      setSuggestions([])
      return
    }


  // Fonction pour effectuer la recherche
  const handleSearch = async () => {
    if (!query.trim()) return

    setIsSearching(true)
    try {
      // Utiliser l'IA pour interpréter la requête et extraire les critères de recherche
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `Analyse cette requête de recherche de logement: "${query}".
      Extrais les critères de recherche pertinents sous forme d'un objet JSON avec les propriétés suivantes:
      {
        "type": type de logement (appartement, maison, villa, studio, etc.),
        "location": emplacement ou quartier mentionné,
        "minPrice": prix minimum si mentionné (nombre),
        "maxPrice": prix maximum si mentionné (nombre),
        "bedrooms": nombre de chambres si mentionné (nombre),
        "features": tableau de caractéristiques mentionnées (jardin, terrasse, piscine, etc.),
        "keywords": mots-clés importants pour la recherche
      }
      Renvoie uniquement l'objet JSON, sans autre texte.`,
      })

      // Analyser la réponse JSON
      let searchCriteria
      try {
        searchCriteria = JSON.parse(text)
      } catch (e) {
        console.error("Erreur lors de l'analyse de la réponse JSON:", e)
        // Créer un critère de recherche de secours basé sur le texte de la requête
        searchCriteria = {
          keywords: query.split(/\s+/).filter((word) => word.length > 3),
        }
      }

      // Appeler la fonction de recherche avec les critères extraits
      onSearch(query, searchCriteria)
    } catch (error) {
      console.error("Erreur lors de la recherche:", error)
      // En cas d'erreur, utiliser une recherche simplifiée
      onSearch(query, { keywords: [query] })
    } finally {
      setIsSearching(false)
    }
  }

  // Gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch()
  }

  // Gérer le clic sur une suggestion
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setSuggestions([])
    // Déclencher la recherche avec la suggestion sélectionnée
    setTimeout(() => {
      handleSearch()
    }, 100)
  }

  // Gérer le changement de l'entrée
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setIsTyping(true)

    // Annuler le timeout précédent
    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }

    // Définir un nouveau timeout
    const newTimeout = setTimeout(() => {
      setIsTyping(false)
      // Générer des suggestions après un court délai
      if (value.length >= 3) {
        generateSuggestions(value)
      } else {
        setSuggestions([])
      }
    }, 500)

    setTypingTimeout(newTimeout)
  }

  // Effacer la recherche
  const handleClear = () => {
    setQuery("")
    setSuggestions([])
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Gérer le clic sur un exemple
  const handleExampleClick = (example: string) => {
    setQuery(example)
    setTimeout(() => {
      handleSearch()
    }, 100)
  }

  return (
    <div className={cn("relative w-full", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={cn(
            "flex items-center border rounded-full overflow-hidden transition-all duration-300 shadow-sm",
            isFocused
              ? "ring-2 ring-primary/30 border-primary/50 shadow-md"
              : "border-gray-300 hover:border-gray-400 hover:shadow",
            "bg-white",
          )}
        >
          <motion.div
            className="flex items-center pl-4 text-primary"
            initial={{ scale: 1 }}
            animate={{
              scale: isTyping ? [1, 1.1, 1] : 1,
              rotate: isTyping ? [0, -5, 5, 0] : 0,
            }}
            transition={{ duration: 0.5, repeat: isTyping ? Number.POSITIVE_INFINITY : 0, repeatType: "loop" }}
          >
            <AnimatePresence mode="wait">
              {isSearching ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="h-5 w-5"
                >
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                </motion.div>
              ) : (
                <motion.div
                  key="sparkles"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="h-5 w-5"
                >
                  <Sparkles className={cn("h-5 w-5 transition-all", isFocused ? "text-primary" : "text-primary/70")} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder={placeholder}
            className="flex-1 py-3 px-3 outline-none text-sm md:text-base placeholder:text-gray-400 transition-all"
            aria-label="Rechercher un logement"
          />

          <AnimatePresence>
            {showClearButton && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Effacer la recherche"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            type="submit"
            size="sm"
            className={cn(
              "m-1.5 rounded-full aspect-square p-2 transition-all duration-300",
              query.trim()
                ? "bg-primary hover:bg-primary/90 text-white"
                : "bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100",
            )}
            disabled={isSearching || !query.trim()}
            aria-label="Lancer la recherche"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </form>

      {/* Suggestions avec animation */}
      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-50 border border-gray-200 py-2 overflow-hidden"
          >
            <div className="px-3 py-1.5 text-xs text-gray-500 font-medium border-b border-gray-100">
              Suggestions basées sur votre recherche
            </div>
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-sm flex items-center group"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <Search className="h-3.5 w-3.5 text-primary/70 mr-2 flex-shrink-0" />
                <span className="line-clamp-1 group-hover:text-primary transition-colors">{suggestion}</span>
                <ArrowRight className="h-3.5 w-3.5 ml-auto text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Exemples de recherche */}
        {showExamples && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-50 border border-gray-200 py-2 overflow-hidden"
          >
            <div className="px-3 py-1.5 text-xs text-gray-500 font-medium border-b border-gray-100 flex items-center">
              <Lightbulb className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
              Exemples de recherche
            </div>
            {exampleQueries.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-sm flex items-center group"
                onClick={() => handleExampleClick(example)}
              >
                <span className="line-clamp-1 group-hover:text-primary transition-colors">{example}</span>
                <ArrowRight className="h-3.5 w-3.5 ml-auto text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
