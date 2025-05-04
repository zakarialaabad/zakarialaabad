
import  React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"

interface FavoritesContextType {
  favorites: number[]
  addFavorite: (propertyId: number) => void
  removeFavorite: (propertyId: number) => void
  isFavorite: (propertyId: number) => boolean
  toggleFavorite: (propertyId: number) => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const [favorites, setFavorites] = useState<number[]>([])

  // Charger les favoris depuis le localStorage au démarrage
  useEffect(() => {
    if (isAuthenticated) {
      const storedFavorites = localStorage.getItem("favorites")
      if (storedFavorites) {
        try {
          const parsed = JSON.parse(storedFavorites)
          if (Array.isArray(parsed)) {
            setFavorites(parsed.map((id: any) => Number(id)))
          }
        } catch (error) {
          console.error("Error parsing favorites from localStorage:", error)
        }
      }
    } else {
      // Réinitialiser les favoris si l'utilisateur n'est pas connecté
      setFavorites([])
    }
  }, [isAuthenticated])

  // Sauvegarder les favoris dans le localStorage à chaque changement
  useEffect(() => {
    if (isAuthenticated && favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites))
    }
  }, [favorites, isAuthenticated])

  const addFavorite = (propertyId: number) => {
    if (!favorites.includes(propertyId)) {
      setFavorites((prev) => [...prev, propertyId])
    }
  }

  const removeFavorite = (propertyId: number) => {
    setFavorites((prev) => prev.filter((id) => id !== propertyId))
  }

  const isFavorite = (propertyId: number) => {
    return favorites.includes(propertyId)
  }

  const toggleFavorite = (propertyId: number) => {
    if (isFavorite(propertyId)) {
      removeFavorite(propertyId)
    } else {
      addFavorite(propertyId)
    }
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}