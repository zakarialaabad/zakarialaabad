import { useState } from "react"
import type React from "react"

import { Heart, Bell, MessageCircle, User, Settings, LogOut, Menu, LogIn, Globe, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Logo } from "@/components/logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/contexts/auth-context"
import { AuthModal } from "@/components/auth/auth-modal"
import { useFavorites } from "@/contexts/favorites-context"
import { AuthAlert } from "@/components/auth/auth-alert"
import { Link } from "@inertiajs/react"

export function Header() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [unreadMessages, setUnreadMessages] = useState(3)
  const [unreadNotifications, setUnreadNotifications] = useState(2)
  const totalUnread = unreadMessages + unreadNotifications
  const { user, isAuthenticated, login, logout } = useAuth()
  const { favorites } = useFavorites()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [showAuthAlert, setShowAuthAlert] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState("Français")

  const handleOpenAuthModal = () => {
    setIsAuthModalOpen(true)
  }

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false)
  }

  const handleFavoritesClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault()
      setShowAuthAlert(true)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Logo />
          </div>

          {!isMobile && <div className="flex-1"></div>}

          <div className="flex items-center space-x-2 md:space-x-4">
            {!isMobile && (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Globe className="h-5 w-5 text-gray-700" />
                      <span className="sr-only">Changer de langue</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setCurrentLanguage("Français")}>
                      <span className={currentLanguage === "Français" ? "font-bold" : ""}>Français</span>
                      {currentLanguage === "Français" && <span className="ml-2">✓</span>}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCurrentLanguage("English")}>
                      <span className={currentLanguage === "English" ? "font-bold" : ""}>English</span>
                      {currentLanguage === "English" && <span className="ml-2">✓</span>}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCurrentLanguage("العربية")}>
                      <span className={currentLanguage === "العربية" ? "font-bold" : ""}>العربية</span>
                      {currentLanguage === "العربية" && <span className="ml-2">✓</span>}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {isAuthenticated && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-gray-800 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-300 rounded-full h-10 w-10 border-gray-300"
                          asChild
                        >
                          <Link href="/devenir-hote">
                            <Home className="h-5 w-5" />
                            <span className="sr-only">Devenir hôte</span>
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Devenir Louer</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}

                <Link href={isAuthenticated ? "/messages" : "#"} onClick={handleFavoritesClick} className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-primary hover:bg-gray-100 hover:text-gray-700 transition-colors duration-300 rounded-full h-10 w-10"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span className="sr-only">Messages</span>
                  </Button>
                  {isAuthenticated && unreadMessages > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                      {unreadMessages}
                    </span>
                  )}
                </Link>
              </>
            )}

            {isAuthenticated ? (
              // Menu pour utilisateurs connectés
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center bg-white border border-gray-300 rounded-full h-10 pl-3 pr-1 py-1 cursor-pointer hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-center">
                      <Menu className="h-5 w-5 text-gray-700" strokeWidth={2.5} />
                    </div>
                    <div className="h-8 w-8 ml-3 relative">
                      <div className="h-8 w-8 rounded-full bg-black overflow-hidden">
                        <img
                          src={user?.image || "/thoughtful-moroccan-man.png"}
                          alt="Photo de profil"
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      {totalUnread > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                          {totalUnread}
                        </span>
                      )}
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Mon profil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/favoris">
                        <Heart className="mr-2 h-4 w-4" />
                        <span>Favoris</span>
                        {favorites.length > 0 && (
                          <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {favorites.length}
                          </span>
                        )}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/messages">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        <span>Messages</span>
                        {unreadMessages > 0 && (
                          <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {unreadMessages}
                          </span>
                        )}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/notifications">
                        <Bell className="mr-2 h-4 w-4" />
                        <span>Notifications</span>
                        {unreadNotifications > 0 && (
                          <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {unreadNotifications}
                          </span>
                        )}
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Paramètres</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Déconnexion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // Bouton de connexion pour utilisateurs non connectés
              <Button
                onClick={handleOpenAuthModal}
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-4 py-2 h-auto"
              >
                <LogIn className="h-5 w-5 mr-2" />
                <span>Connexion</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} />
      <AuthAlert
        isOpen={showAuthAlert}
        onClose={() => setShowAuthAlert(false)}
        message="Vous devez être connecté pour accéder à vos favoris."
      />
    </>
  )
}
