"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"

interface FavoritesContextType {
  favorites: string[]
  addFavorite: (propertyId: string) => void
  removeFavorite: (propertyId: string) => void
  isFavorite: (propertyId: string) => boolean
  toggleFavorite: (propertyId: string) => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const [favorites, setFavorites] = useState<string[]>([])

  // Charger les favoris depuis le localStorage au démarrage
  useEffect(() => {
    if (isAuthenticated) {
      const savedFavorites = localStorage.getItem("favorites")
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites))
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

  const addFavorite = (propertyId: string) => {
    if (!favorites.includes(propertyId)) {
      setFavorites((prev) => [...prev, propertyId])
    }
  }

  const removeFavorite = (propertyId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== propertyId))
  }

  const isFavorite = (propertyId: string) => {
    return favorites.includes(propertyId)
  }

  const toggleFavorite = (propertyId: string) => {
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
