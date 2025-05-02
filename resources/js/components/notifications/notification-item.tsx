"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, AlertTriangle, Info, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import type { Notification } from "@/contexts/notifications-context"

interface NotificationItemProps {
  notification: Notification
  onMarkAsRead: (id: string) => void
}

export function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  const [isNew, setIsNew] = useState(!notification.read)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (isNew) {
      timeout = setTimeout(() => {
        setIsNew(false)
      }, 3000)
    }
    return () => clearTimeout(timeout)
  }, [isNew])

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return "À l'instant"
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return `Il y a ${minutes} minute${minutes > 1 ? "s" : ""}`
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return `Il y a ${hours} heure${hours > 1 ? "s" : ""}`
    } else {
      const days = Math.floor(diffInSeconds / 86400)
      return `Il y a ${days} jour${days > 1 ? "s" : ""}`
    }
  }

  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "info":
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getBackgroundColor = () => {
    if (!notification.read) {
      return "bg-gray-50"
    }
    return "bg-white"
  }

  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead(notification.id)
    }
  }

  const Content = () => (
    <div
      className={cn(
        "relative flex items-start p-4 border-b transition-colors duration-200",
        getBackgroundColor(),
        !notification.read && "hover:bg-gray-100",
      )}
      onClick={handleClick}
    >
      <div className="flex-shrink-0 mr-3">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h4 className={cn("text-sm font-medium", !notification.read && "font-semibold")}>{notification.title}</h4>
          <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">{formatDate(notification.date)}</span>
        </div>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{notification.message}</p>
      </div>
      {!notification.read && <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-primary"></div>}
    </div>
  )

  return (
    <motion.div
      initial={isNew ? { opacity: 0, y: -10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {notification.link ? (
        <Link href={notification.link}>
          <Content />
        </Link>
      ) : (
        <Content />
      )}
    </motion.div>
  )
}
