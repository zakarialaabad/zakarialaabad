import { Link } from "@inertiajs/react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { BarChart2, Building, Calendar, MessageSquare, Wallet, Users, HelpCircle, Settings, Plus } from "lucide-react"
import { router } from "@inertiajs/react"
type NavItem = "dashboard" | "annonces" | "reservations" | "messages" | "paiements" | "locataires"

interface DashboardNavProps {
  activeItem: NavItem
}

export function DashboardNav({ activeItem }: DashboardNavProps) {
  const { user } = useAuth()

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center py-4">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <img
                src={user?.image || "/thoughtful-moroccan-man.png"}
                alt="Photo de profil"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Bonjour, {user?.name || "Propriétaire"}</h2>
              <p className="text-sm text-gray-500">Gérez vos annonces et suivez vos performances</p>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <HelpCircle className="h-4 w-4 mr-2" />
              Aide
            </Button>
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Settings className="h-4 w-4 mr-2" />
              Paramètres
            </Button>
            <Button className="bg-primary hover:bg-primary/90" size="sm" onClick={() => router.visit("/devenir-hote")}>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle annonce
            </Button>
          </div>
        </div>

        <nav className="flex overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <Link
            href="/dashboard"
            className={`flex items-center px-4 py-2 mr-4 border-b-2 ${
              activeItem === "dashboard"
                ? "border-primary text-primary font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <BarChart2 className="h-4 w-4 mr-2" />
            <span>Tableau de bord</span>
          </Link>
          <Link
            href="/dashboard/mes-annonces"
            className={`flex items-center px-4 py-2 mr-4 border-b-2 ${
              activeItem === "annonces"
                ? "border-primary text-primary font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Building className="h-4 w-4 mr-2" />
            <span>Mes annonces</span>
          </Link>
          <Link
            href="/dashboard/reservations"
            className={`flex items-center px-4 py-2 mr-4 border-b-2 ${
              activeItem === "reservations"
                ? "border-primary text-primary font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Calendar className="h-4 w-4 mr-2" />
            <span>Réservations</span>
          </Link>
          <Link
            href="/dashboard/messages"
            className={`flex items-center px-4 py-2 mr-4 border-b-2 ${
              activeItem === "messages"
                ? "border-primary text-primary font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            <span>Messages</span>
          </Link>
          <Link
            href="/dashboard/paiements"
            className={`flex items-center px-4 py-2 mr-4 border-b-2 ${
              activeItem === "paiements"
                ? "border-primary text-primary font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Wallet className="h-4 w-4 mr-2" />
            <span>Paiements</span>
          </Link>
          <Link
            href="/dashboard/locataires"
            className={`flex items-center px-4 py-2 mr-4 border-b-2 ${
              activeItem === "locataires"
                ? "border-primary text-primary font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Users className="h-4 w-4 mr-2" />
            <span>Locataires</span>
          </Link>
        </nav>
      </div>
    </div>
  )
}
