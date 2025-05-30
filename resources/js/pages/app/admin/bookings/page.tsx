
import { useState,ReactNode } from "react"
import {
  Search,
  Filter,
  Eye,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  Download,
  RefreshCw,
  Home,
  User,
  CreditCard,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import AdminLayout from "@/layouts/layoutAdmin"
// Booking type for admin
interface AdminBooking {
  id: string
  propertyId: string
  propertyTitle: string
  propertyImage: string
  propertyLocation: string
  tenantId: string
  tenantName: string
  tenantImage: string
  ownerId: string
  ownerName: string
  startDate: string
  endDate: string
  totalPrice: number
  status: "confirmed" | "pending" | "cancelled" | "completed" | "rejected"
  paymentStatus: "paid" | "partial" | "unpaid" | "refunded"
  createdAt: string
}

// Sample bookings data
const bookings: AdminBooking[] = [
  {
    id: "B-1001",
    propertyId: "P-101",
    propertyTitle: "Riad traditionnel",
    propertyImage: "/riad-courtyard-oasis.png",
    propertyLocation: "Marrakech, Maroc",
    tenantId: "T-201",
    tenantName: "Fatima Zahra",
    tenantImage: "/veiled-beauty.png",
    ownerId: "O-301",
    ownerName: "Ahmed Benjelloun",
    startDate: "2023-06-15T00:00:00Z",
    endDate: "2023-06-22T00:00:00Z",
    totalPrice: 5600,
    status: "confirmed",
    paymentStatus: "paid",
    createdAt: "2023-05-10T14:30:00Z",
  },
  {
    id: "B-1002",
    propertyId: "P-102",
    propertyTitle: "Appartement vue sur mer",
    propertyImage: "/moroccan-ocean-balcony.png",
    propertyLocation: "Tanger, Maroc",
    tenantId: "T-202",
    tenantName: "Youssef Benjelloun",
    tenantImage: "/thoughtful-moroccan-professional.png",
    ownerId: "O-302",
    ownerName: "Karim Alami",
    startDate: "2023-07-01T00:00:00Z",
    endDate: "2023-07-15T00:00:00Z",
    totalPrice: 8400,
    status: "pending",
    paymentStatus: "partial",
    createdAt: "2023-05-15T09:45:00Z",
  },
  {
    id: "B-1003",
    propertyId: "P-103",
    propertyTitle: "Villa avec piscine",
    propertyImage: "/lush-moroccan-oasis.png",
    propertyLocation: "Agadir, Maroc",
    tenantId: "T-203",
    tenantName: "Leila Benali",
    tenantImage: "/confident-moroccan-professional.png",
    ownerId: "O-303",
    ownerName: "Nadia Tazi",
    startDate: "2023-06-10T00:00:00Z",
    endDate: "2023-06-17T00:00:00Z",
    totalPrice: 12600,
    status: "cancelled",
    paymentStatus: "refunded",
    createdAt: "2023-05-05T11:20:00Z",
  },
  {
    id: "B-1004",
    propertyId: "P-104",
    propertyTitle: "Studio moderne",
    propertyImage: "/warm-moroccan-retreat.png",
    propertyLocation: "Casablanca, Maroc",
    tenantId: "T-204",
    tenantName: "Mohammed Tazi",
    tenantImage: "/moroccan-businessman.png",
    ownerId: "O-304",
    ownerName: "Samira Bennani",
    startDate: "2023-05-20T00:00:00Z",
    endDate: "2023-05-27T00:00:00Z",
    totalPrice: 4200,
    status: "completed",
    paymentStatus: "paid",
    createdAt: "2023-04-25T16:15:00Z",
  },
  {
    id: "B-1005",
    propertyId: "P-105",
    propertyTitle: "Riad avec terrasse",
    propertyImage: "/marrakech-rooftop-vista.png",
    propertyLocation: "Marrakech, Maroc",
    tenantId: "T-205",
    tenantName: "Karim Alami",
    tenantImage: "/confident-moroccan-executive.png",
    ownerId: "O-305",
    ownerName: "Ahmed Benjelloun",
    startDate: "2023-07-10T00:00:00Z",
    endDate: "2023-07-17T00:00:00Z",
    totalPrice: 6300,
    status: "pending",
    paymentStatus: "unpaid",
    createdAt: "2023-05-18T10:30:00Z",
  },
  {
    id: "B-1006",
    propertyId: "P-106",
    propertyTitle: "Appartement centre-ville",
    propertyImage: "/modern-moroccan-living.png",
    propertyLocation: "Rabat, Maroc",
    tenantId: "T-206",
    tenantName: "Fatima Zahra",
    tenantImage: "/veiled-beauty.png",
    ownerId: "O-306",
    ownerName: "Youssef Benjelloun",
    startDate: "2023-06-05T00:00:00Z",
    endDate: "2023-06-12T00:00:00Z",
    totalPrice: 5250,
    status: "confirmed",
    paymentStatus: "paid",
    createdAt: "2023-05-01T13:45:00Z",
  },
  {
    id: "B-1007",
    propertyId: "P-107",
    propertyTitle: "Maison traditionnelle",
    propertyImage: "/vibrant-moroccan-living-room.png",
    propertyLocation: "Fès, Maroc",
    tenantId: "T-207",
    tenantName: "Leila Benali",
    tenantImage: "/confident-moroccan-professional.png",
    ownerId: "O-307",
    ownerName: "Nadia Tazi",
    startDate: "2023-07-20T00:00:00Z",
    endDate: "2023-07-27T00:00:00Z",
    totalPrice: 4900,
    status: "rejected",
    paymentStatus: "refunded",
    createdAt: "2023-05-12T15:20:00Z",
  },
]
 function AdminBookings() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string>("all")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [viewingBooking, setViewingBooking] = useState<AdminBooking | null>(null)

  // Filter bookings based on search query and filters
  const filteredBookings = bookings.filter((booking) => {
    // Filter by search query
    if (
      searchQuery &&
      !booking.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !booking.propertyLocation.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !booking.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !booking.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !booking.id.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by status
    if (selectedStatus !== "all" && booking.status !== selectedStatus) {
      return false
    }

    // Filter by payment status
    if (selectedPaymentStatus !== "all" && booking.paymentStatus !== selectedPaymentStatus) {
      return false
    }

    return true
  })

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectedItems.length === filteredBookings.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredBookings.map((b) => b.id))
    }
  }

  // Handle individual checkbox
  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date)
  }

  // Get status badge
  const getStatusBadge = (status: AdminBooking["status"]) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Confirmée
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="h-3 w-3 mr-1" />
            En attente
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="h-3 w-3 mr-1" />
            Annulée
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Terminée
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            <XCircle className="h-3 w-3 mr-1" />
            Rejetée
          </Badge>
        )
    }
  }

  // Get payment status badge
  const getPaymentStatusBadge = (status: AdminBooking["paymentStatus"]) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CreditCard className="h-3 w-3 mr-1" />
            Payée
          </Badge>
        )
      case "partial":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Partiel
          </Badge>
        )
      case "unpaid":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="h-3 w-3 mr-1" />
            Non payée
          </Badge>
        )
      case "refunded":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            <CreditCard className="h-3 w-3 mr-1" />
            Remboursée
          </Badge>
        )
    }
  }

  // Get paginated bookings
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentBookings = filteredBookings.slice(indexOfFirstItem, indexOfLastItem)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // Export bookings to CSV
  const exportBookings = () => {
    const headers = [
      "ID",
      "Propriété",
      "Emplacement",
      "Locataire",
      "Date début",
      "Date fin",
      "Prix",
      "Statut",
      "Paiement",
    ]
    const csvData = filteredBookings.map((booking) => [
      booking.id,
      booking.propertyTitle,
      booking.propertyLocation,
      booking.tenantName,
      formatDate(booking.startDate),
      formatDate(booking.endDate),
      `${booking.totalPrice} MAD`,
      booking.status,
      booking.paymentStatus,
    ])

    const csvContent = [headers.join(","), ...csvData.map((row) => row.join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `reservations-ejar-${new Date().toISOString().split("T")[0]}.csv`)
    link.click()
  }

  // Refresh bookings
  const refreshBookings = () => {
    setSearchQuery("")
    setSelectedStatus("all")
    setSelectedPaymentStatus("all")
    setSelectedItems([])
    setCurrentPage(1)
    // In a real app, you would fetch fresh data here
    alert("Données actualisées")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des réservations</h1>
          <p className="text-muted-foreground">Gérez toutes les réservations de la plateforme E-JAR</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex" onClick={exportBookings}>
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher par ID, propriété, locataire ou propriétaire..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="confirmed">Confirmée</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="cancelled">Annulée</SelectItem>
                <SelectItem value="completed">Terminée</SelectItem>
                <SelectItem value="rejected">Rejetée</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPaymentStatus} onValueChange={setSelectedPaymentStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Paiement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les paiements</SelectItem>
                <SelectItem value="paid">Payée</SelectItem>
                <SelectItem value="partial">Partiel</SelectItem>
                <SelectItem value="unpaid">Non payée</SelectItem>
                <SelectItem value="refunded">Remboursée</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedItems.length === currentBookings.length && currentBookings.length > 0}
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all"
                      />
                      <span>Réservation</span>
                    </div>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Propriété</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Locataire</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Dates</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Statut</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Paiement</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {currentBookings.length > 0 ? (
                  currentBookings.map((booking) => (
                    <motion.tr
                      key={booking.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={selectedItems.includes(booking.id)}
                            onCheckedChange={() => handleSelectItem(booking.id)}
                            aria-label={`Select ${booking.id}`}
                          />
                          <div>
                            <div className="font-medium">{booking.id}</div>
                            <div className="text-xs text-gray-500">{formatDate(booking.createdAt)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 relative rounded-md overflow-hidden">
                            <img
                              src={booking.propertyImage || "/placeholder.svg"}
                              alt={booking.propertyTitle}
                              
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{booking.propertyTitle}</div>
                            <div className="text-xs text-gray-500">{booking.propertyLocation}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 relative rounded-full overflow-hidden">
                            <img
                              src={booking.tenantImage || "/placeholder.svg"}
                              alt={booking.tenantName}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="text-sm">{booking.tenantName}</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="space-y-1">
                          <div className="flex items-center text-xs">
                            <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                            <span>Du: {formatDate(booking.startDate)}</span>
                          </div>
                          <div className="flex items-center text-xs">
                            <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                            <span>Au: {formatDate(booking.endDate)}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">{getStatusBadge(booking.status)}</td>
                      <td className="p-4 align-middle">
                        <div className="space-y-1">
                          {getPaymentStatusBadge(booking.paymentStatus)}
                          <div className="text-xs font-medium">{booking.totalPrice} MAD</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setViewingBooking(booking)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => alert(`Réservation ${booking.id} confirmée`)}>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Confirmer
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => alert(`Réservation ${booking.id} annulée`)}>
                                <XCircle className="h-4 w-4 mr-2" />
                                Annuler
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => alert(`Affichage du locataire: ${booking.tenantName}`)}>
                                <User className="h-4 w-4 mr-2" />
                                Voir le locataire
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => alert(`Affichage de la propriété: ${booking.propertyTitle}`)}
                              >
                                <Home className="h-4 w-4 mr-2" />
                                Voir la propriété
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => alert(`Gestion du paiement: ${booking.totalPrice} MAD`)}>
                                <CreditCard className="h-4 w-4 mr-2" />
                                Gérer le paiement
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="rounded-full bg-gray-100 p-3 mb-3">
                          <Search className="h-6 w-6 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium">Aucune réservation trouvée</h3>
                        <p className="text-sm text-gray-500 mt-1">Essayez d'ajuster vos filtres ou votre recherche</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Affichage de {Math.min(indexOfFirstItem + 1, filteredBookings.length)} à{" "}
            {Math.min(indexOfLastItem, filteredBookings.length)} sur {filteredBookings.length} réservations
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              Précédent
            </Button>
            {Array.from({ length: Math.ceil(filteredBookings.length / itemsPerPage) })
              .map((_, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className={currentPage === index + 1 ? "bg-[#465baa]/10" : ""}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Button>
              ))
              .slice(0, 3)}
            <Button
              variant="outline"
              size="sm"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredBookings.length / itemsPerPage)}
            >
              Suivant
            </Button>
          </div>
        </div>
      </Card>

      {viewingBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Détails de la réservation {viewingBooking.id}</h2>
              <Button variant="ghost" size="sm" onClick={() => setViewingBooking(null)}>
                <XCircle className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Propriété</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-16 w-16 relative rounded-md overflow-hidden">
                    <img
                      src={viewingBooking.propertyImage || "/placeholder.svg"}
                      alt={viewingBooking.propertyTitle}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{viewingBooking.propertyTitle}</div>
                    <div className="text-sm text-gray-500">{viewingBooking.propertyLocation}</div>
                  </div>
                </div>

                <h3 className="font-medium mb-2">Dates</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <span>Arrivée: {formatDate(viewingBooking.startDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <span>Départ: {formatDate(viewingBooking.endDate)}</span>
                  </div>
                </div>

                <h3 className="font-medium mb-2">Statut</h3>
                <div className="mb-4">{getStatusBadge(viewingBooking.status)}</div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Locataire</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 relative rounded-full overflow-hidden">
                    <img
                      src={viewingBooking.tenantImage || "/placeholder.svg"}
                      alt={viewingBooking.tenantName}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{viewingBooking.tenantName}</div>
                    <div className="text-sm text-gray-500">ID: {viewingBooking.tenantId}</div>
                  </div>
                </div>

                <h3 className="font-medium mb-2">Propriétaire</h3>
                <div className="mb-4">
                  <div className="font-medium">{viewingBooking.ownerName}</div>
                  <div className="text-sm text-gray-500">ID: {viewingBooking.ownerId}</div>
                </div>

                <h3 className="font-medium mb-2">Paiement</h3>
                <div className="space-y-2 mb-4">
                  {getPaymentStatusBadge(viewingBooking.paymentStatus)}
                  <div className="font-medium text-lg">{viewingBooking.totalPrice} MAD</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setViewingBooking(null)}>
                Fermer
              </Button>
              <Button
                onClick={() => {
                  alert(`Action sur la réservation ${viewingBooking.id}`)
                  setViewingBooking(null)
                }}
              >
                {viewingBooking.status === "pending" ? "Confirmer" : "Gérer"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
AdminBookings.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
export default AdminBookings;