// Header.js
import { useState, useEffect } from "react";
import type React from "react";
import { router } from '@inertiajs/react';
import { Heart, Bell, MessageCircle, User, Settings, LogOut, Menu, LogIn, Globe, Home, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Logo } from "@/components/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotifications } from "@/contexts/notifications-context";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/auth-context";
import { AuthModal } from "@/components/auth/auth-modal";
import { useFavorites } from "@/contexts/favorites-context";
import { AuthAlert } from "@/components/auth/auth-alert";
import { Link } from "@inertiajs/react";
import { NotificationsPanel } from "@/components/notifications/notifications-panel";
import { usePage } from "@inertiajs/react";

type User = {
  id: number;
  name: string;
  email: string;
};

type PageProps = {
  auth: {
    user: User | null;
  };
};

export function Header() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [unreadMessages, setUnreadMessages] = useState(3);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const { addNotification } = useNotifications();
  const [unreadNotifications, setUnreadNotifications] = useState(2);
  const totalUnread = unreadMessages + unreadNotifications;
  const { user, isAuthenticated, login, logout } = useAuth();
  const { favorites } = useFavorites();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("Français");
  const { auth } = usePage<PageProps>().props;
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);

  const handleOpenAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    router.post('/logout');
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const toggleNotificationsPanel = () => {
    setIsNotificationsPanelOpen(!isNotificationsPanelOpen);
  };

  const handleFavoritesClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setShowAuthAlert(true);
    }
  };

  const navigateToDashboard = () => {
    router.visit("/dashboard");
  };

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
                {auth.user && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href="/devenir-hote">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-gray-800 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-300 rounded-full px-4 py-2 h-auto border-gray-300"
                          >
                            <span>Devenir hôte</span>
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Devenir Louer</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </>
            )}

            {auth.user ? (
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
                    <DropdownMenuItem
                      className="hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white"
                      onClick={navigateToDashboard}
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Tableau de bord</span>
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

                    <DropdownMenuItem
                      className="hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white"
                      onClick={toggleNotificationsPanel}
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      <span>Notifications</span>
                      {unreadNotifications > 0 && (
                        <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {unreadNotifications}
                        </span>
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Déconnexion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => router.get(route('login'))}
                className="bg-[#485aa8] hover:bg-[#485aa8]/90 cursor-pointer text-white rounded-full px-4 py-2 h-auto"
              >
                <LogIn className="h-5 w-5 mr-2" />
                <span>Connexion</span>
              </Button>
            )}
          </div>
        </div>
      </header>
      <NotificationsPanel isOpen={isNotificationsPanelOpen} onClose={() => setIsNotificationsPanelOpen(false)} />
      {!auth.user && (
        <AuthModal isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} />
      )}
      <AuthAlert
        isOpen={showAuthAlert}
        onClose={() => setShowAuthAlert(false)}
        message="Vous devez être connecté pour accéder à vos favoris."
      />
    </>
  );
}
