import React, { ReactNode } from "react";
import { Link } from "@inertiajs/react";
import img from "./img/E-JAR.jpg";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileNavigation } from "@/components/mobile-navigation";
import { AuthProvider } from "@/contexts/auth-context";
import { FavoritesProvider } from "@/contexts/favorites-context";
type LayoutProps = {
    children: ReactNode;
  };
 export default function Layout({ children }: LayoutProps){
   return (
    <main className="min-h-screen bg-white flex flex-col">

    <AuthProvider>
      <FavoritesProvider>
        <Header />
        {/* باقي المكونات */}
      </FavoritesProvider>
    </AuthProvider>

        {children}
        <Footer />
        <MobileNavigation />
</main>      
  );
 }