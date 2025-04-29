
import type React from "react"

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react"

interface User {
  id: string
  name: string
  email: string
  image: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }){
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  // Simuler la vérification de l'authentification au chargement
  useEffect(() => {
    // Ici, vous pourriez vérifier un token dans localStorage ou faire une requête API
    const checkAuth = (): void => {
      const savedAuth = localStorage.getItem("isAuthenticated")
      if (savedAuth === "true") {
        setIsAuthenticated(true)
        setUser({
          id: "1",
          name: "Ayoub",
          email: "ayoub@example.com",
          image: "/thoughtful-moroccan-man.png",
        })
      }
    }

    checkAuth()
  }, [])

  // Optimisation avec useCallback
  const login = useCallback((): void => {
    // Simuler une connexion réussie
    setIsAuthenticated(true)
    setUser({
      id: "1",
      name: "Ayoub",
      email: "ayoub@example.com",
      image: "/thoughtful-moroccan-man.png",
    })
    localStorage.setItem("isAuthenticated", "true")
  }, [])

  // Optimisation avec useCallback
  const logout = useCallback((): void => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem("isAuthenticated")
  }, [])

  // Mémorisation du contexte pour éviter des re-rendus inutiles
  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      logout,
    }),
    [user, isAuthenticated, login, logout],
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}