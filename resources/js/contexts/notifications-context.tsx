"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  date: Date
  link?: string
}

interface NotificationsContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "date" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearNotifications: () => void
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState<number>(0)

  // Charger les notifications depuis le localStorage au démarrage
  useEffect(() => {
    if (isAuthenticated) {
      const savedNotifications = localStorage.getItem("notifications")
      if (savedNotifications) {
        const parsedNotifications = JSON.parse(savedNotifications).map((notification: any) => ({
          ...notification,
          date: new Date(notification.date),
        }))
        setNotifications(parsedNotifications)
        setUnreadCount(parsedNotifications.filter((notification: Notification) => !notification.read).length)
      } else {
        // Ajouter des notifications de démonstration
        const demoNotifications: Notification[] = [
          {
            id: "1",
            title: "Bienvenue sur E-JAR",
            message: "Merci de vous être inscrit sur notre plateforme de location immobilière.",
            type: "success",
            read: false,
            date: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
          },
          {
            id: "2",
            title: "Nouvelle propriété disponible",
            message: "Une nouvelle propriété correspondant à vos critères est disponible à Marrakech.",
            type: "info",
            read: false,
            date: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
            link: "/property/12",
          },
          {
            id: "3",
            title: "Rappel de visite",
            message: "Vous avez une visite programmée demain à 14h00.",
            type: "warning",
            read: true,
            date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          },
        ]
        setNotifications(demoNotifications)
        setUnreadCount(demoNotifications.filter((notification) => !notification.read).length)
        localStorage.setItem("notifications", JSON.stringify(demoNotifications))
      }
    } else {
      // Réinitialiser les notifications si l'utilisateur n'est pas connecté
      setNotifications([])
      setUnreadCount(0)
    }
  }, [isAuthenticated])

  // Sauvegarder les notifications dans le localStorage à chaque changement
  useEffect(() => {
    if (isAuthenticated && notifications.length > 0) {
      localStorage.setItem("notifications", JSON.stringify(notifications))
    }
  }, [notifications, isAuthenticated])

  // Mettre à jour le compteur de notifications non lues
  useEffect(() => {
    setUnreadCount(notifications.filter((notification) => !notification.read).length)
  }, [notifications])

  const addNotification = (notification: Omit<Notification, "id" | "date" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      date: new Date(),
      read: false,
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider")
  }
  return context
}
