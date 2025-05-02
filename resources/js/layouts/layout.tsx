import React, { ReactNode } from "react";
import { Link } from "@inertiajs/react";
import img from "./img/E-JAR.jpg";
import { Header } from "@/components/header";
import { BrowserRouter as Router } from 'react-router-dom';

import { Footer } from "@/components/footer";
import { MobileNavigation } from "@/components/mobile-navigation";
import { AuthProvider } from "@/contexts/auth-context";
import { NotificationsProvider } from "@/contexts/notifications-context";

import { FavoritesProvider } from "@/contexts/favorites-context";
type LayoutProps = {
    children: ReactNode;
    
  };
  export default function Layout({ children}: LayoutProps) {
    console.log('Layout children:', children);
    return (
      <main className="min-h-screen bg-white flex flex-col">
        <AuthProvider>
          <FavoritesProvider>
            
            <Header />
            <NotificationsProvider>
          {children}     
            </NotificationsProvider>
           
            <Footer />
            <MobileNavigation />
          </FavoritesProvider>
        </AuthProvider>
      </main>
    );
  }
  