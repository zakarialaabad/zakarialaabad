import logo from "../layouts/img/logo.jpg";
import { useState } from "react"
import type React from "react"
import { Heart, Bell, MessageSquare, User } from "lucide-react"
import { cn } from "@/lib/utils"
import Ejar from "../layouts/img/E-JAR.png"
interface NavItem {
  icon: React.ReactNode
  label: string
  href: string
  notifications?: number
  isActive?: boolean
}

interface MobileNavBarProps {
  items?: NavItem[]
  defaultActive?: string
}
export function MobileNavBar({ items, defaultActive = "E-JAR" }: MobileNavBarProps) {
  const [activeItem, setActiveItem] = useState(defaultActive)

  const defaultItems: NavItem[] = [
    {
      icon: <Heart className="h-6 w-6" />,
      label: "Favoris",
      href: "/favoris",
    },
    {
      icon: <Bell className="h-6 w-6" />,
      label: "Notification",
      href: "/notifications",
      notifications: 2,
    },
    {
      icon: (
        <img src={Ejar} className="h-12 w-12 text-blue-700 fill-current" alt="" />
    ),
      label: "",
      href: "/e-jar",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      label: "Discussions",
      href: "/discussions",
      notifications: 4,
    },
    {
      icon: <User className="h-6 w-6" />,
      label: "Mon profil",
      href: "/profil",
    },
  ]

  const navItems = items || defaultItems

  return (
    <div className="fixed bottom-0 pb-1 left-0 z-50 w-full h-16 bg-white border-t border-gray-200">
      <div className="grid h-full grid-cols-5 mx-auto relative">
        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex flex-col items-center justify-center relative"
            onClick={(e) => {
              e.preventDefault()
              setActiveItem(item.label)
            }}
          >
            <div className="relative mb-1">
              {item.notifications && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {item.notifications}
                </span>
              )}
              {item.icon}
            </div>
            <span
              className={cn(
                "text-sm",
                activeItem === item.label ? "text-blue-700 font-medium" : "text-gray-500"
              )}
            >
               
          </span>

            {activeItem === item.label && (
              <div className="absolute bottom-0 left[40px] w-30 h-1 bg-blue-800  rounded-t-sm" />
            )}
          </a>
        ))}
      </div>
    </div>
  )
}
