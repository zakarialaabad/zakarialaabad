
import { useState,ReactNode } from "react"
import {
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  Filter,
  MessageSquare,
  RefreshCw,
  Search,
  Star,
  X,
  CreditCard,
  AlertTriangle,
  FileText,
  Settings,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react"
import AdminLayout from "@/layouts/layoutAdmin"
import { motion } from "framer-motion"
import { format, formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { Link } from "@inertiajs/react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

// Types for notifications
type NotificationType =
  | "booking_request"
  | "booking_confirmed"
  | "booking_canceled"
  | "payment_received"
  | "payment_due"
  | "message"
  | "review"
  | "maintenance"
  | "document"
  | "system"

type UserRole = "owner" | "tenant" | "admin"

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  date: Date
  read: boolean
  priority: "high" | "medium" | "low"
  propertyId?: string
  propertyName?: string
  propertyImage?: string
  userId?: string
  userName?: string
  userImage?: string
  bookingId?: string
  bookingDates?: {
    start: Date
    end: Date
  }
  amount?: number
  currency?: string
  actions?: {
    primary?: {
      label: string
      href: string
    }
    secondary?: {
      label: string
      href: string
    }
  }
  relevantFor: UserRole[]
}

// Sample notifications data
const sampleNotifications: Notification[] = [
  {
    id: "1",
    type: "booking_request",
    title: "Nouvelle demande de réservation",
    message: "Ahmed Benjelloun souhaite réserver votre propriété 'Riad Marrakech Médina' du 15 au 20 juin.",
    date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    priority: "high",
    propertyId: "prop123",
    propertyName: "Riad Marrakech Médina",
    propertyImage: "/riad-courtyard-oasis.png",
    userId: "user456",
    userName: "Ahmed Benjelloun",
    userImage: "/thoughtful-moroccan-man.png",
    bookingId: "book789",
    bookingDates: {
      start: new Date(2023, 5, 15),
      end: new Date(2023, 5, 20),
    },
    actions: {
      primary: {
        label: "Accepter",
        href: "/admin/bookings/book789/accept",
      },
      secondary: {
        label: "Refuser",
        href: "/admin/bookings/book789/decline",
      },
    },
    relevantFor: ["owner", "admin"],
  },
  {
    id: "2",
    type: "booking_confirmed",
    title: "Réservation confirmée",
    message: "Votre réservation pour 'Appartement Vue Mer Agadir' a été confirmée par le propriétaire.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true,
    priority: "medium",
    propertyId: "prop789",
    propertyName: "Appartement Vue Mer Agadir",
    propertyImage: "/moroccan-ocean-balcony.png",
    bookingId: "book123",
    bookingDates: {
      start: new Date(2023, 6, 10),
      end: new Date(2023, 6, 17),
    },
    actions: {
      primary: {
        label: "Voir détails",
        href: "/admin/bookings/book123",
      },
    },
    relevantFor: ["tenant", "admin"],
  },
  {
    id: "3",
    type: "payment_received",
    title: "Paiement reçu",
    message: "Vous avez reçu un paiement de 5 400 MAD pour la réservation 'Villa Essaouira'.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: false,
    priority: "medium",
    propertyId: "prop456",
    propertyName: "Villa Essaouira",
    propertyImage: "/moroccan-villa-oasis.png",
    bookingId: "book456",
    amount: 5400,
    currency: "MAD",
    actions: {
      primary: {
        label: "Voir transaction",
        href: "/admin/payments/pay123",
      },
    },
    relevantFor: ["owner", "admin"],
  },
  {
    id: "4",
    type: "message",
    title: "Nouveau message",
    message: "Fatima Zahra vous a envoyé un message concernant sa réservation.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    priority: "medium",
    userId: "user789",
    userName: "Fatima Zahra",
    userImage: "/veiled-beauty.png",
    bookingId: "book789",
    actions: {
      primary: {
        label: "Répondre",
        href: "/admin/messages/msg456",
      },
    },
    relevantFor: ["owner", "tenant", "admin"],
  },
  {
    id: "5",
    type: "review",
    title: "Nouvel avis",
    message: "Karim Alami a laissé un avis 5 étoiles sur votre propriété 'Duplex Casablanca'.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    read: false,
    priority: "low",
    propertyId: "prop789",
    propertyName: "Duplex Casablanca",
    propertyImage: "/ornate-moroccan-duplex-staircase.png",
    userId: "user101",
    userName: "Karim Alami",
    userImage: "/confident-moroccan-executive.png",
    actions: {
      primary: {
        label: "Voir l'avis",
        href: "/admin/properties/prop789/reviews",
      },
    },
    relevantFor: ["owner", "admin"],
  },
  {
    id: "6",
    type: "maintenance",
    title: "Demande d'intervention",
    message: "Un problème de plomberie a été signalé pour 'Appartement Rabat Centre'.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    read: true,
    priority: "high",
    propertyId: "prop555",
    propertyName: "Appartement Rabat Centre",
    propertyImage: "/modern-moroccan-living.png",
    actions: {
      primary: {
        label: "Traiter",
        href: "/admin/maintenance/maint123",
      },
    },
    relevantFor: ["owner", "admin"],
  },
  {
    id: "7",
    type: "payment_due",
    title: "Paiement à effectuer",
    message: "Un paiement de 3 200 MAD est dû pour votre réservation 'Chalet Ifrane'.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4 days ago
    read: false,
    priority: "high",
    propertyId: "prop999",
    propertyName: "Chalet Ifrane",
    propertyImage: "/ifrane-chalet-snow.png",
    bookingId: "book999",
    amount: 3200,
    currency: "MAD",
    actions: {
      primary: {
        label: "Payer maintenant",
        href: "/admin/payments/pay456/checkout",
      },
    },
    relevantFor: ["tenant", "admin"],
  },
  {
    id: "8",
    type: "document",
    title: "Document à signer",
    message: "Le contrat de location pour 'Studio Tanger' est prêt à être signé.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 120), // 5 days ago
    read: true,
    priority: "medium",
    propertyId: "prop777",
    propertyName: "Studio Tanger",
    propertyImage: "/riad-inspired-studio.png",
    actions: {
      primary: {
        label: "Signer",
        href: "/admin/documents/doc123/sign",
      },
    },
    relevantFor: ["tenant", "owner", "admin"],
  },
  {
    id: "9",
    type: "booking_canceled",
    title: "Réservation annulée",
    message: "La réservation pour 'Riad Fès Médina' a été annulée par le locataire.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 144), // 6 days ago
    read: true,
    priority: "medium",
    propertyId: "prop888",
    propertyName: "Riad Fès Médina",
    propertyImage: "/ornate-riad-courtyard.png",
    bookingId: "book888",
    userId: "user222",
    userName: "Youssef Mansouri",
    userImage: "/confident-moroccan-leader.png",
    actions: {
      primary: {
        label: "Voir détails",
        href: "/admin/bookings/book888",
      },
    },
    relevantFor: ["owner", "admin"],
  },
  {
    id: "10",
    type: "system",
    title: "Mise à jour du système",
    message: "E-JAR a été mis à jour avec de nouvelles fonctionnalités. Découvrez les changements.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 168), // 7 days ago
    read: true,
    priority: "low",
    actions: {
      primary: {
        label: "En savoir plus",
        href: "/admin/updates",
      },
    },
    relevantFor: ["owner", "tenant", "admin"],
  },
]

// Helper function to get icon for notification type
function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case "booking_request":
    case "booking_confirmed":
    case "booking_canceled":
      return <Calendar className="h-5 w-5" />
    case "payment_received":
    case "payment_due":
      return <CreditCard className="h-5 w-5" />
    case "message":
      return <MessageSquare className="h-5 w-5" />
    case "review":
      return <Star className="h-5 w-5" />
    case "maintenance":
      return <AlertTriangle className="h-5 w-5" />
    case "document":
      return <FileText className="h-5 w-5" />
    case "system":
      return <Settings className="h-5 w-5" />
    default:
      return <Bell className="h-5 w-5" />
  }
}

// Helper function to get color for notification priority
function getPriorityColor(priority: "high" | "medium" | "low") {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200"
    case "medium":
      return "bg-amber-100 text-amber-800 border-amber-200"
    case "low":
      return "bg-blue-100 text-blue-800 border-blue-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

// Helper function to get color for notification type
function getTypeColor(type: NotificationType) {
  switch (type) {
    case "booking_request":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "booking_confirmed":
      return "bg-green-100 text-green-800 border-green-200"
    case "booking_canceled":
      return "bg-red-100 text-red-800 border-red-200"
    case "payment_received":
      return "bg-emerald-100 text-emerald-800 border-emerald-200"
    case "payment_due":
      return "bg-amber-100 text-amber-800 border-amber-200"
    case "message":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "review":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "maintenance":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "document":
      return "bg-indigo-100 text-indigo-800 border-indigo-200"
    case "system":
      return "bg-gray-100 text-gray-800 border-gray-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

// Helper function to format notification type for display
function formatNotificationType(type: NotificationType) {
  switch (type) {
    case "booking_request":
      return "Demande de réservation"
    case "booking_confirmed":
      return "Réservation confirmée"
    case "booking_canceled":
      return "Réservation annulée"
    case "payment_received":
      return "Paiement reçu"
    case "payment_due":
      return "Paiement à effectuer"
    case "message":
      return "Message"
    case "review":
      return "Avis"
    case "maintenance":
      return "Maintenance"
    case "document":
      return "Document"
    case "system":
      return "Système"
    default:
      return type
  }
}

// Notification Item Component
function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
}: {
  notification: Notification
  onMarkAsRead: (id: string) => void
  onDelete: (id: string) => void
}) {
  const [showActions, setShowActions] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const handleMarkAsRead = () => {
    onMarkAsRead(notification.id)
  }

  const handleDelete = () => {
    setConfirmDelete(false)
    onDelete(notification.id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`relative rounded-lg border ${notification.read ? "bg-white" : "bg-blue-50"} mb-4 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <Card className="border-0 shadow-none">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-full ${getTypeColor(notification.type)}`}>
                {getNotificationIcon(notification.type)}
              </div>
              <div>
                <CardTitle className="text-base font-semibold">{notification.title}</CardTitle>
                <CardDescription className="text-xs">
                  {formatDistanceToNow(notification.date, { addSuffix: true, locale: fr })}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant="outline" className={`text-xs ${getTypeColor(notification.type)}`}>
                {formatNotificationType(notification.type)}
              </Badge>
              {notification.priority === "high" && (
                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 text-xs">
                  Urgent
                </Badge>
              )}
              {!notification.read && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm text-gray-700">{notification.message}</p>

          {notification.propertyId && (
            <div className="mt-3 flex items-center gap-2">
              <div className="h-10 w-10 rounded-md overflow-hidden">
                <img
                  src={notification.propertyImage || "/placeholder.svg"}
                  alt={notification.propertyName || "Propriété"}
                  width={40}
                  height={40}
                  className="object-cover h-full w-full"
                />
              </div>
              <div>
                <p className="text-xs text-gray-500">Propriété</p>
                <p className="text-sm font-medium">{notification.propertyName}</p>
              </div>
            </div>
          )}

          {notification.userId && (
            <div className="mt-3 flex items-center gap-2">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img
                  src={notification.userImage || "/placeholder.svg"}
                  alt={notification.userName || "Utilisateur"}
                  width={40}
                  height={40}
                  className="object-cover h-full w-full"
                />
              </div>
              <div>
                <p className="text-xs text-gray-500">Utilisateur</p>
                <p className="text-sm font-medium">{notification.userName}</p>
              </div>
            </div>
          )}

          {notification.bookingDates && (
            <div className="mt-3 flex items-center gap-2">
              <div className="p-2 rounded-md bg-gray-100">
                <Calendar className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Dates</p>
                <p className="text-sm font-medium">
                  {format(notification.bookingDates.start, "d MMM", { locale: fr })} -{" "}
                  {format(notification.bookingDates.end, "d MMM yyyy", { locale: fr })}
                </p>
              </div>
            </div>
          )}

          {notification.amount && (
            <div className="mt-3 flex items-center gap-2">
              <div className="p-2 rounded-md bg-gray-100">
                <CreditCard className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Montant</p>
                <p className="text-sm font-medium">
                  {notification.amount.toLocaleString("fr-MA")} {notification.currency}
                </p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
          <div className="flex gap-2">
            {notification.actions?.primary && (
              <Button size="sm" asChild>
                <Link href={notification.actions.primary.href}>{notification.actions.primary.label}</Link>
              </Button>
            )}
            {notification.actions?.secondary && (
              <Button size="sm" variant="outline" asChild>
                <Link href={notification.actions.secondary.href}>{notification.actions.secondary.label}</Link>
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            {!notification.read && (
              <Button size="sm" variant="ghost" onClick={handleMarkAsRead}>
                <CheckCircle className="h-4 w-4 mr-1" />
                <span className="sr-only md:not-sr-only md:inline-block">Marquer comme lu</span>
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {!notification.read ? (
                  <DropdownMenuItem onClick={handleMarkAsRead}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Marquer comme lu
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={() => onMarkAsRead(notification.id)}>
                    <Clock className="h-4 w-4 mr-2" />
                    Marquer comme non lu
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => setConfirmDelete(true)}>
                  <X className="h-4 w-4 mr-2" />
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cette notification ? Cette action ne peut pas être annulée.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

// Empty State Component
function EmptyState({ type }: { type: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-gray-100 p-4 rounded-full mb-4">
        <Bell className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">Aucune notification</h3>
      <p className="text-sm text-gray-500 max-w-md mb-4">
        {type === "all"
          ? "Vous n'avez pas encore reçu de notifications. Elles apparaîtront ici lorsque vous en recevrez."
          : type === "unread"
            ? "Vous n'avez pas de notifications non lues."
            : `Vous n'avez pas de notifications de type "${type}".`}
      </p>
      <Button variant="outline" size="sm">
        <RefreshCw className="h-4 w-4 mr-2" />
        Actualiser
      </Button>
    </div>
  )
}

// Filter Dialog Component
function FilterDialog({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
}: {
  isOpen: boolean
  onClose: () => void
  filters: any
  onApplyFilters: (filters: any) => void
}) {
  const [localFilters, setLocalFilters] = useState(filters)

  const handleApply = () => {
    onApplyFilters(localFilters)
    onClose()
  }

  const handleReset = () => {
    setLocalFilters({
      types: [],
      priority: [],
      dateRange: null,
      userRole: "all",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Filtrer les notifications</DialogTitle>
          <DialogDescription>Sélectionnez les critères pour filtrer vos notifications.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <h4 className="text-sm font-medium mb-2">Type de notification</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "booking_request", label: "Demandes de réservation" },
                { id: "booking_confirmed", label: "Réservations confirmées" },
                { id: "booking_canceled", label: "Réservations annulées" },
                { id: "payment_received", label: "Paiements reçus" },
                { id: "payment_due", label: "Paiements à effectuer" },
                { id: "message", label: "Messages" },
                { id: "review", label: "Avis" },
                { id: "maintenance", label: "Maintenance" },
                { id: "document", label: "Documents" },
                { id: "system", label: "Système" },
              ].map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type.id}`}
                    checked={localFilters.types.includes(type.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setLocalFilters({
                          ...localFilters,
                          types: [...localFilters.types, type.id],
                        })
                      } else {
                        setLocalFilters({
                          ...localFilters,
                          types: localFilters.types.filter((t: string) => t !== type.id),
                        })
                      }
                    }}
                  />
                  <label htmlFor={`type-${type.id}`} className="text-sm">
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium mb-2">Priorité</h4>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "high", label: "Haute", color: "bg-red-100 text-red-800 border-red-200" },
                { id: "medium", label: "Moyenne", color: "bg-amber-100 text-amber-800 border-amber-200" },
                { id: "low", label: "Basse", color: "bg-blue-100 text-blue-800 border-blue-200" },
              ].map((priority) => (
                <div key={priority.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`priority-${priority.id}`}
                    checked={localFilters.priority.includes(priority.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setLocalFilters({
                          ...localFilters,
                          priority: [...localFilters.priority, priority.id],
                        })
                      } else {
                        setLocalFilters({
                          ...localFilters,
                          priority: localFilters.priority.filter((p: string) => p !== priority.id),
                        })
                      }
                    }}
                  />
                  <label htmlFor={`priority-${priority.id}`} className="text-sm">
                    <Badge variant="outline" className={`${priority.color}`}>
                      {priority.label}
                    </Badge>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium mb-2">Rôle utilisateur</h4>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "all", label: "Tous" },
                { id: "owner", label: "Propriétaire" },
                { id: "tenant", label: "Locataire" },
              ].map((role) => (
                <div key={role.id} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`role-${role.id}`}
                    name="userRole"
                    checked={localFilters.userRole === role.id}
                    onChange={() => {
                      setLocalFilters({
                        ...localFilters,
                        userRole: role.id,
                      })
                    }}
                    className="h-4 w-4 text-[#465baa] border-gray-300 focus:ring-[#465baa]"
                  />
                  <label htmlFor={`role-${role.id}`} className="text-sm">
                    {role.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={handleReset}>
            Réinitialiser
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button onClick={handleApply}>Appliquer</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Settings Dialog Component
function SettingsDialog({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
}: {
  isOpen: boolean
  onClose: () => void
  settings: any
  onSaveSettings: (settings: any) => void
}) {
  const [localSettings, setLocalSettings] = useState(settings)

  const handleSave = () => {
    onSaveSettings(localSettings)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Paramètres de notifications</DialogTitle>
          <DialogDescription>Personnalisez vos préférences de notifications.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <h4 className="text-sm font-medium mb-2">Notifications par email</h4>
            <div className="space-y-2">
              {[
                { id: "email_bookings", label: "Réservations" },
                { id: "email_payments", label: "Paiements" },
                { id: "email_messages", label: "Messages" },
                { id: "email_reviews", label: "Avis" },
                { id: "email_maintenance", label: "Maintenance" },
                { id: "email_documents", label: "Documents" },
                { id: "email_system", label: "Système" },
              ].map((pref) => (
                <div key={pref.id} className="flex items-center justify-between">
                  <label htmlFor={pref.id} className="text-sm">
                    {pref.label}
                  </label>
                  <Checkbox
                    id={pref.id}
                    checked={localSettings.emailNotifications[pref.id]}
                    onCheckedChange={(checked) => {
                      setLocalSettings({
                        ...localSettings,
                        emailNotifications: {
                          ...localSettings.emailNotifications,
                          [pref.id]: !!checked,
                        },
                      })
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium mb-2">Notifications push</h4>
            <div className="space-y-2">
              {[
                { id: "push_bookings", label: "Réservations" },
                { id: "push_payments", label: "Paiements" },
                { id: "push_messages", label: "Messages" },
                { id: "push_reviews", label: "Avis" },
                { id: "push_maintenance", label: "Maintenance" },
                { id: "push_documents", label: "Documents" },
                { id: "push_system", label: "Système" },
              ].map((pref) => (
                <div key={pref.id} className="flex items-center justify-between">
                  <label htmlFor={pref.id} className="text-sm">
                    {pref.label}
                  </label>
                  <Checkbox
                    id={pref.id}
                    checked={localSettings.pushNotifications[pref.id]}
                    onCheckedChange={(checked) => {
                      setLocalSettings({
                        ...localSettings,
                        pushNotifications: {
                          ...localSettings.pushNotifications,
                          [pref.id]: !!checked,
                        },
                      })
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium mb-2">Autres préférences</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="auto_mark_read" className="text-sm">
                  Marquer automatiquement comme lu après avoir cliqué
                </label>
                <Checkbox
                  id="auto_mark_read"
                  checked={localSettings.autoMarkAsRead}
                  onCheckedChange={(checked) => {
                    setLocalSettings({
                      ...localSettings,
                      autoMarkAsRead: !!checked,
                    })
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="show_priority" className="text-sm">
                  Afficher les indicateurs de priorité
                </label>
                <Checkbox
                  id="show_priority"
                  checked={localSettings.showPriorityIndicators}
                  onCheckedChange={(checked) => {
                    setLocalSettings({
                      ...localSettings,
                      showPriorityIndicators: !!checked,
                    })
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave}>Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Main Notifications Page Component
function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false)
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "priority">("newest")

  // Filter and settings state
  const [filters, setFilters] = useState({
    types: [],
    priority: [],
    dateRange: null,
    userRole: "all",
  })

  const [settings, setSettings] = useState({
    emailNotifications: {
      email_bookings: true,
      email_payments: true,
      email_messages: true,
      email_reviews: false,
      email_maintenance: true,
      email_documents: true,
      email_system: false,
    },
    pushNotifications: {
      push_bookings: true,
      push_payments: true,
      push_messages: true,
      push_reviews: true,
      push_maintenance: true,
      push_documents: true,
      push_system: true,
    },
    autoMarkAsRead: true,
    showPriorityIndicators: true,
  })

  // Filter notifications based on active tab, search query, and filters
  const filteredNotifications = notifications.filter((notification) => {
    // Filter by tab
    if (activeTab === "unread" && notification.read) return false
    if (activeTab === "booking" && !notification.type.includes("booking")) return false
    if (activeTab === "payment" && !notification.type.includes("payment")) return false
    if (activeTab === "message" && notification.type !== "message") return false
    if (
      activeTab === "other" &&
      [
        "booking_request",
        "booking_confirmed",
        "booking_canceled",
        "payment_received",
        "payment_due",
        "message",
      ].includes(notification.type)
    )
      return false

    // Filter by search query
    if (
      searchQuery &&
      !notification.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !notification.message.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !(notification.propertyName && notification.propertyName.toLowerCase().includes(searchQuery.toLowerCase())) &&
      !(notification.userName && notification.userName.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false
    }

    // Filter by notification types
    if (filters.types.length > 0 && !filters.types.includes(notification.type)) {
      return false
    }

    // Filter by priority
    if (filters.priority.length > 0 && !filters.priority.includes(notification.priority)) {
      return false
    }

    // Filter by user role
    if (filters.userRole !== "all" && !notification.relevantFor.includes(filters.userRole as UserRole)) {
      return false
    }

    return true
  })

  // Sort notifications
  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    if (sortOrder === "newest") {
      return b.date.getTime() - a.date.getTime()
    } else if (sortOrder === "oldest") {
      return a.date.getTime() - b.date.getTime()
    } else if (sortOrder === "priority") {
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }
    return 0
  })

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length

  // Count notifications by type
  const bookingCount = notifications.filter((n) => n.type.includes("booking")).length
  const paymentCount = notifications.filter((n) => n.type.includes("payment")).length
  const messageCount = notifications.filter((n) => n.type === "message").length
  const otherCount = notifications.filter(
    (n) =>
      ![
        "booking_request",
        "booking_confirmed",
        "booking_canceled",
        "payment_received",
        "payment_due",
        "message",
      ].includes(n.type),
  ).length

  // Handle mark as read
  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: !notification.read } : notification,
      ),
    )
  }

  // Handle delete notification
  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
    setSelectedNotifications((prev) => prev.filter((notificationId) => notificationId !== id))
  }

  // Handle mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  // Handle mark selected as read
  const handleMarkSelectedAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) =>
        selectedNotifications.includes(notification.id) ? { ...notification, read: true } : notification,
      ),
    )
    setSelectedNotifications([])
    setSelectAll(false)
  }

  // Handle delete selected
  const handleDeleteSelected = () => {
    setNotifications((prev) => prev.filter((notification) => !selectedNotifications.includes(notification.id)))
    setSelectedNotifications([])
    setSelectAll(false)
  }

  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedNotifications([])
    } else {
      setSelectedNotifications(sortedNotifications.map((n) => n.id))
    }
    setSelectAll(!selectAll)
  }

  // Handle select notification
  const handleSelectNotification = (id: string) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications((prev) => prev.filter((notificationId) => notificationId !== id))
      setSelectAll(false)
    } else {
      setSelectedNotifications((prev) => [...prev, id])
      if (selectedNotifications.length + 1 === sortedNotifications.length) {
        setSelectAll(true)
      }
    }
  }

  // Handle apply filters
  const handleApplyFilters = (newFilters: any) => {
    setFilters(newFilters)
  }

  // Handle save settings
  const handleSaveSettings = (newSettings: any) => {
    setSettings(newSettings)
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header section with Airbnb-like styling */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Centre de notifications</h1>
              <p className="text-gray-500">Gérez toutes vos notifications E-JAR en un seul endroit</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFilterDialogOpen(true)}
                className="border-gray-300 hover:bg-gray-50"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtrer
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSettingsDialogOpen(true)}
                className="border-gray-300 hover:bg-gray-50"
              >
                <Settings className="h-4 w-4 mr-2" />
                Paramètres
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50">
                    Trier par <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortOrder("newest")}>Plus récentes d'abord</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOrder("oldest")}>Plus anciennes d'abord</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOrder("priority")}>Priorité</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" className="bg-ejar-gradient hover:opacity-90 text-white">
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualiser
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content with Airbnb-inspired layout */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Filtres</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full">
                    <TabsTrigger value="all" className="flex-1">
                      Toutes
                    </TabsTrigger>
                    <TabsTrigger value="unread" className="flex-1">
                      Non lues {unreadCount > 0 && `(${unreadCount})`}
                    </TabsTrigger>
                  </TabsList>

                  <div className="mt-4 space-y-2">
                    <Button
                      variant={activeTab === "booking" ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setActiveTab("booking")}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Réservations
                      {bookingCount > 0 && (
                        <Badge variant="secondary" className="ml-auto">
                          {bookingCount}
                        </Badge>
                      )}
                    </Button>

                    <Button
                      variant={activeTab === "payment" ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setActiveTab("payment")}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Paiements
                      {paymentCount > 0 && (
                        <Badge variant="secondary" className="ml-auto">
                          {paymentCount}
                        </Badge>
                      )}
                    </Button>

                    <Button
                      variant={activeTab === "message" ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setActiveTab("message")}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Messages
                      {messageCount > 0 && (
                        <Badge variant="secondary" className="ml-auto">
                          {messageCount}
                        </Badge>
                      )}
                    </Button>

                    <Button
                      variant={activeTab === "other" ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setActiveTab("other")}
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      Autres
                      {otherCount > 0 && (
                        <Badge variant="secondary" className="ml-auto">
                          {otherCount}
                        </Badge>
                      )}
                    </Button>
                  </div>
                </Tabs>

                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium mb-2">Actions rapides</h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={handleMarkAllAsRead}
                      disabled={unreadCount === 0}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Tout marquer comme lu
                    </Button>

                    {selectedNotifications.length > 0 && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                          onClick={handleMarkSelectedAsRead}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Marquer sélection comme lu
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={handleDeleteSelected}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Supprimer sélection
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-3">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">
                    {activeTab === "all" && "Toutes les notifications"}
                    {activeTab === "unread" && "Notifications non lues"}
                    {activeTab === "booking" && "Notifications de réservation"}
                    {activeTab === "payment" && "Notifications de paiement"}
                    {activeTab === "message" && "Messages"}
                    {activeTab === "other" && "Autres notifications"}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {sortedNotifications.length > 0 && (
                      <div className="flex items-center">
                        <Checkbox id="select-all" checked={selectAll} onCheckedChange={handleSelectAll} />
                        <label htmlFor="select-all" className="ml-2 text-sm text-gray-500">
                          Tout sélectionner
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                <CardDescription>
                  {sortedNotifications.length === 0
                    ? "Aucune notification trouvée"
                    : `${sortedNotifications.length} notification${sortedNotifications.length > 1 ? "s" : ""}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-300px)]">
                  {sortedNotifications.length > 0 ? (
                    <div className="space-y-2">
                      {sortedNotifications.map((notification) => (
                        <div key={notification.id} className="flex items-start gap-2">
                          <div className="pt-2">
                            <Checkbox
                              checked={selectedNotifications.includes(notification.id)}
                              onCheckedChange={() => handleSelectNotification(notification.id)}
                            />
                          </div>
                          <div className="flex-1">
                            <NotificationItem
                              notification={notification}
                              onMarkAsRead={handleMarkAsRead}
                              onDelete={handleDeleteNotification}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <EmptyState type={activeTab} />
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>

        <FilterDialog
          isOpen={isFilterDialogOpen}
          onClose={() => setIsFilterDialogOpen(false)}
          filters={filters}
          onApplyFilters={handleApplyFilters}
        />

        <SettingsDialog
          isOpen={isSettingsDialogOpen}
          onClose={() => setIsSettingsDialogOpen(false)}
          settings={settings}
          onSaveSettings={handleSaveSettings}
        />
      </div>
    </div>
  )
}
NotificationsPage.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
export default NotificationsPage;