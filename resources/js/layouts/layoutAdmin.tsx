
import type React from "react"

import { useEffect, useState, Suspense } from "react"
import { usePage } from '@inertiajs/react';
import { router } from "@inertiajs/react"
import { Logo } from "@/components/logo"
import {
  BarChart3,
  Building,
  Users,
  Calendar,
  LogOut,
  Menu,
  X,
  Home,
  CreditCard,
  Bell,
  Search,
  HelpCircle,
  ChevronRight,
  AlertCircle,
  Loader2,
  Plus,
  XCircle,
} from "lucide-react"
import { Link } from "@inertiajs/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Breadcrumb navigation component
function AdminBreadcrumbs() {
  const pathname = usePage().url;
  const [breadcrumbs, setBreadcrumbs] = useState<{ label: string; path: string }[]>([])

  useEffect(() => {
    if (!pathname) return

    const pathSegments = pathname.split("/").filter(Boolean)
    const breadcrumbItems = pathSegments.map((segment:string, index:number) => {
      const path = `/${pathSegments.slice(0, index + 1).join("/")}`
      return {
        label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
        path,
      }
    })

    setBreadcrumbs(breadcrumbItems)
  }, [pathname])

  return (
    <nav className="flex items-center text-sm text-gray-500">
      <Link href="/admin/dashboard" className="flex items-center hover:text-primary transition-colors">
        <Home className="h-4 w-4 mr-1" />
        <span>Admin</span>
      </Link>

      {breadcrumbs.map((crumb, i) => (
        <div key={i} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          <Link href={crumb.path} className="hover:text-primary transition-colors">
            {crumb.label}
          </Link>
        </div>
      ))}
    </nav>
  )
}

// System notifications component
function AdminNotifications() {
  const [notifications, setNotifications] = useState<
    { id: string; message: string; type: "info" | "success" | "warning" | "error" }[]
  >([])

  useEffect(() => {
    // Check for URL params that might trigger notifications
    const params = new URLSearchParams(window.location.search)
    const success = params.get("success")
    const error = params.get("error")

    if (success) {
      setNotifications((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          message: decodeURIComponent(success),
          type: "success",
        },
      ])
    }

    if (error) {
      setNotifications((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          message: decodeURIComponent(error),
          type: "error",
        },
      ])
    }

    // Clear notifications after 5 seconds
    const timer = setTimeout(() => {
      setNotifications([])
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  if (notifications.length === 0) return null

  return (
    <div className="space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-3 rounded-md flex items-start ${
            notification.type === "error"
              ? "bg-red-50 text-red-700 border border-red-200"
              : notification.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : notification.type === "warning"
                  ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                  : "bg-blue-50 text-blue-700 border border-blue-200"
          }`}
        >
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <div>{notification.message}</div>
        </div>
      ))}
    </div>
  )
}

// Error boundary component
function ErrorBoundary({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handleError = () => setHasError(true)
    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  if (hasError) return <>{fallback}</>
  return <>{children}</>
}

// Admin error display component
function AdminErrorDisplay() {
  return (
    <div className="bg-white rounded-lg shadow p-6 text-center">
      <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Une erreur est survenue</h3>
      <p className="text-gray-500 mb-4">
        Nous avons rencontré un problème lors du chargement de cette page. Veuillez réessayer ou contacter l'assistance.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
      >
        Rafraîchir la page
      </button>
    </div>
  )
}

// Admin loading state component
function AdminLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
      <p className="text-gray-500">Chargement en cours...</p>
    </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePage().url;

  useEffect(() => {
    // Check if user is authenticated as admin
    const checkAuth = () => {
      const adminAuth = localStorage.getItem("adminAuthenticated")
      if (adminAuth !== "true" && pathname !== "/admin/login") {
        router.visit("/admin/login")
      } else {
        setIsAuthenticated(true)
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated")
    router.visit("/admin/login")
  }

  // If loading or not on login page and not authenticated, show nothing
  if (isLoading || (!isAuthenticated && pathname !== "/admin/login")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // If on login page, just render children
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="lg:hidden mr-4 text-gray-500 hover:text-gray-600"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="hidden lg:flex items-center">
              <Logo className="h-8 w-auto" />
            </div>
          </div>

       

        
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for desktop */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-20 flex w-64 flex-col bg-white border-r border-gray-200 pt-16 transition-transform duration-300 lg:static lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <nav className="flex-1 space-y-1 px-2">
              <NavItem
                href="/admin/dashboard"
                icon={<BarChart3 size={20} />}
                label="Tableau de bord"
                active={pathname === "/admin/dashboard"}
              />
              <NavItem
                href="/admin/properties"
                icon={<Building size={20} />}
                label="Propriétés"
                active={pathname.startsWith("/admin/properties")}
              />
              <NavItem
                href="/admin/users"
                icon={<Users size={20} />}
                label="Utilisateurs"
                active={pathname.startsWith("/admin/users")}
              />
              <NavItem
                href="/admin/bookings"
                icon={<Calendar size={20} />}
                label="Réservations"
                active={pathname.startsWith("/admin/bookings")}
              />
              
              <NavItem
                href="/admin/payments"
                icon={<CreditCard size={20} />}
                label="Paiements"
                active={pathname.startsWith("/admin/payments")}
              />
            </nav>
          </div>
          <div className="border-t border-gray-200 p-4">
            <Link href="/" className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
              <Home size={18} className="mr-2" />
              Retour au site
            </Link>
            <Button
              variant="outline"
              className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut size={18} className="mr-2" />
              Déconnexion
            </Button>
          </div>
        </aside>

        {/* Backdrop for mobile sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-10 bg-gray-900/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {/* Admin breadcrumbs */}
          <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-2">
            <AdminBreadcrumbs />
          </div>

          {/* Page container with animations */}
          <div className="p-4 sm:p-6 lg:p-8 animate-fadeIn">
            {/* System notifications */}
            <div className="mb-4">
              <AdminNotifications />
            </div>

          
            {/* Content with error boundary and loading states */}
            <ErrorBoundary fallback={<AdminErrorDisplay />}>
              <Suspense fallback={<AdminLoadingState />}>{children}</Suspense>
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </div>
  )
}

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  active?: boolean
}
function NavItem({ href, icon, label, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
        active ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100",
      )}
    >
      <div className={cn("mr-3", active ? "text-primary" : "text-gray-500 group-hover:text-gray-700")}>{icon}</div>
      {label}
    </Link>
  )
}
