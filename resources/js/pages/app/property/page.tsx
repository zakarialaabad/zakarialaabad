import { usePage } from "@inertiajs/react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { PropertyListings } from "@/components/property-listings";
import { MobileNavigation } from "@/components/mobile-navigation";
import { StickyHeaderEffect } from "@/components/sticky-header-effect";
import { Footer } from "@/components/footer";
type Propriete = {
  id: number;
  loueur_id: number;
  titre: string;
  localisation: string;
  prixParMois: number;
  imgs: string[];
  description: Text;
  disponibilite: boolean;
  type: string;
  nbrchambre: number;
  surface: number;
  adresse: string;
  admin_id: number;
  loueur: {
    id: number;
    user: {
      name: string;
      email: string;
      prenom: string;
      genre: string;
      telephone: string;
      profile: string;
    };
  };
};
type InertiaPageProps = {
  proprietes: Propriete[];
};
export default function Home() {
  const { proprietes } = usePage<InertiaPageProps>().props;

  return (
    <main className="min-h-screen bg-white flex flex-col items-center">
      <Header />
      <StickyHeaderEffect />
      <Hero />
      <PropertyListings proprietes={proprietes} />
      <MobileNavigation />
      <Footer />
    </main>
  );
}
