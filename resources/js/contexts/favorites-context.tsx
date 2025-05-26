import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
interface FavoritesContextType {
  favorites: number[] // Change string[] to number[]
  addFavorite: (propertyId: number) => void // Change Number to number
  removeFavorite: (propertyId: number) => void // Change Number to number
  isFavorite: (propertyId: number) => boolean // Change Number to number
  toggleFavorite: (propertyId: number) => void // Change Number to number
}
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)
export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const [favorites, setFavorites] = useState<number[]>([]) // Change string[] to number[]

  // Charger les favoris depuis le localStorage au démarrage
  useEffect(() => {
    if (isAuthenticated) {
      const stored = localStorage.getItem("favorites")
      if (stored) {
        setFavorites(JSON.parse(stored))
      }
    }
  }, [isAuthenticated])

  // Sauvegarder les favoris dans le localStorage à chaque changement
  useEffect(() => {
    if (isAuthenticated && favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites))
    }
  }, [favorites, isAuthenticated])

  const addFavorite = (propertyId: number) => { // Change Number to number
    if (!favorites.includes(propertyId)) {
      setFavorites((prev) => [...prev, propertyId])
    }
  }

  const removeFavorite = (propertyId: number) => { // Change Number to number
    setFavorites((prev) => prev.filter((id) => id !== propertyId))
  }

  const isFavorite = (propertyId: number) => { // Change Number to number
    return favorites.includes(propertyId)
  }

  const toggleFavorite = (propertyId: number) => { // Change Number to number
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
