import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { usePage } from "@inertiajs/react"

interface FavoritesContextType {
  favorites: number[]
  addFavorite: (propertyId: number) => void
  removeFavorite: (propertyId: number) => void
  isFavorite: (propertyId: number) => boolean
  toggleFavorite: (propertyId: number) => void
}

type User = {
  id: number;
  name: string;
  email: string;
};

type PageProps = {
  auth: {
    user: User | null;
  };
  favoriteIds?: number[];
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { auth, favoriteIds = [] } = usePage<PageProps>().props;
  const [favorites, setFavorites] = useState<number[]>(favoriteIds)

  // Initialize favorites from server data only once
  useEffect(() => {
    if (auth.user && favoriteIds.length > 0) {
      setFavorites(favoriteIds)
    }
  }, []) // Empty dependency array means this runs once on mount

  const addFavorite = useCallback((propertyId: number) => {
    setFavorites(prev => {
      if (!prev.includes(propertyId)) {
        return [...prev, propertyId]
      }
      return prev
    })
  }, [])

  const removeFavorite = useCallback((propertyId: number) => {
    setFavorites(prev => prev.filter(id => id !== propertyId))
  }, [])

  const isFavorite = useCallback((propertyId: number) => {
    return favorites.includes(propertyId)
  }, [favorites])

  const toggleFavorite = useCallback((propertyId: number) => {
    setFavorites(prev => {
      if (prev.includes(propertyId)) {
        return prev.filter(id => id !== propertyId)
      }
      return [...prev, propertyId]
    })
  }, [])

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite
  }

  return (
    <FavoritesContext.Provider value={value}>
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
