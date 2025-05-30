
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
  CreditCard,
  DollarSign,
  FileText,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import AdminLayout from "@/layouts/layoutAdmin"
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

// Payment type for admin
interface AdminPayment {
  id: string
  bookingId: string
  propertyId: string
  propertyTitle: string
  propertyImage: string
  tenantId: string
  tenantName: string
  tenantImage: string
  ownerId: string
  ownerName: string
  amount: number
  fee: number
  total: number
  type: "booking" | "deposit" | "refund" | "commission" | "withdrawal"
  method: "card" | "bank" | "cash" | "mobile"
  status: "completed" | "pending" | "failed" | "refunded"
  date: string
  reference: string
}

// Sample payments data
const payments: AdminPayment[] = [
  {
    id: "PAY-1001",
    bookingId: "B-1001",
    propertyId: "P-101",
    propertyTitle: "Riad traditionnel",
    propertyImage: "/riad-courtyard-oasis.png",
    tenantId: "T-201",
    tenantName: "Fatima Zahra",
    tenantImage: "/veiled-beauty.png",
    ownerId: "O-301",
    ownerName: "Ahmed Benjelloun",
    amount: 5600,
    fee: 280,
    total: 5880,
    type: "booking",
    method: "card",
    status: "completed",
    date: "2023-05-10T14:30:00Z",
    reference: "REF-5678901",
  },
  {
    id: "PAY-1002",
    bookingId: "B-1002",
    propertyId: "P-102",
    propertyTitle: "Appartement vue sur mer",
    propertyImage: "/moroccan-ocean-balcony.png",
    tenantId: "T-202",
    tenantName: "Youssef Benjelloun",
    tenantImage: "/thoughtful-moroccan-professional.png",
    ownerId: "O-302",
    ownerName: "Karim Alami",
    amount: 4200,
    fee: 210,
    total: 4410,
    type: "deposit",
    method: "bank",
    status: "completed",
    date: "2023-05-15T09:45:00Z",
    reference: "REF-6789012",
  },
  {
    id: "PAY-1003",
    bookingId: "B-1003",
    propertyId: "P-103",
    propertyTitle: "Villa avec piscine",
    propertyImage: "/lush-moroccan-oasis.png",
    tenantId: "T-203",
    tenantName: "Leila Benali",
    tenantImage: "/confident-moroccan-professional.png",
    ownerId: "O-303",
    ownerName: "Nadia Tazi",
    amount: 12600,
    fee: 630,
    total: 13230,
    type: "refund",
    method: "card",
    status: "completed",
    date: "2023-05-05T11:20:00Z",
    reference: "REF-7890123",
  },
  {
    id: "PAY-1004",
    bookingId: "B-1004",
    propertyId: "P-104",
    propertyTitle: "Studio moderne",
    propertyImage: "/warm-moroccan-retreat.png",
    tenantId: "T-204",
    tenantName: "Mohammed Tazi",
    tenantImage: "/moroccan-businessman.png",
    ownerId: "O-304",
    ownerName: "Samira Bennani",
    amount: 4200,
    fee: 210,
    total: 4410,
    type: "booking",
    method: "mobile",
    status: "completed",
    date: "2023-04-25T16:15:00Z",
    reference: "REF-8901234",
  },
  {
    id: "PAY-1005",
    bookingId: "B-1005",
    propertyId: "P-105",
    propertyTitle: "Riad avec terrasse",
    propertyImage: "/marrakech-rooftop-vista.png",
    tenantId: "T-205",
    tenantName: "Karim Alami",
    tenantImage: "/confident-moroccan-executive.png",
    ownerId: "O-305",
    ownerName: "Ahmed Benjelloun",
    amount: 6300,
    fee: 315,
    total: 6615,
    type: "booking",
    method: "card",
    status: "pending",
    date: "2023-05-18T10:30:00Z",
    reference: "REF-9012345",
  },
  {
    id: "PAY-1006",
    bookingId: "",
    propertyId: "",
    propertyTitle: "",
    propertyImage: "",
    tenantId: "",
    tenantName: "",
    tenantImage: "",
    ownerId: "O-306",
    ownerName: "Youssef Benjelloun",
    amount: 9800,
    fee: 0,
    total: 9800,
    type: "withdrawal",
    method: "bank",
    status: "completed",
    date: "2023-05-01T13:45:00Z",
    reference: "REF-0123456",
  },
  {
    id: "PAY-1007",
    bookingId: "B-1007",
    propertyId: "P-107",
    propertyTitle: "Maison traditionnelle",
    propertyImage: "/vibrant-moroccan-living-room.png",
    tenantId: "T-207",
    tenantName: "Leila Benali",
    tenantImage: "/confident-moroccan-professional.png",
    ownerId: "O-307",
    ownerName: "Nadia Tazi",
    amount: 4900,
    fee: 245,
    total: 5145,
    type: "booking",
    method: "card",
    status: "failed",
    date: "2023-05-12T15:20:00Z",
    reference: "REF-1234567",
  },
]
function AdminPayments() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  // Filter payments based on search query and filters
  const filteredPayments = payments.filter((payment) => {
    // Filter by search query
    if (
      searchQuery &&
      !payment.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !payment.reference.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !payment.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !payment.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !payment.ownerName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by status
    if (selectedStatus !== "all" && payment.status !== selectedStatus) {
      return false
    }

    // Filter by type
    if (selectedType !== "all" && payment.type !== selectedType) {
      return false
    }

    return true
  })

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectedItems.length === filteredPayments.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredPayments.map((p) => p.id))
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
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-MA", {
      style: "currency",
      currency: "MAD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  // Handle export functionality
  const handleExport = () => {
    // Convert the payments data to CSV format
    const headers = ["ID", "Référence", "Type", "Méthode", "Montant", "Frais", "Total", "Statut", "Date"]
    const csvData = filteredPayments.map((payment) => [
      payment.id,
      payment.reference,
      payment.type,
      payment.method,
      payment.amount,
      payment.fee,
      payment.total,
      payment.status,
      formatDate(payment.date),
    ])

    // Create CSV content
    const csvContent = [headers.join(","), ...csvData.map((row) => row.join(","))].join("\n")

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `paiements-ejar-${new Date().toISOString().split("T")[0]}.csv`)
    link.click()
  }

  // Handle refresh functionality
  const handleRefresh = () => {
    // In a real app, this would fetch fresh data from the API
    // For now, we'll just show a toast or alert
    alert("Données actualisées avec succès!")
    // Reset filters
    setSearchQuery("")
    setSelectedStatus("all")
    setSelectedType("all")
    setSelectedItems([])
  }

  // Handle pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage)
  const paginatedPayments = filteredPayments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Handle view details
  const handleViewDetails = (paymentId: string) => {
    alert(`Affichage des détails pour le paiement ${paymentId}`)
    // In a real app, this would navigate to a details page or open a modal
  }

  // Get status badge
  const getStatusBadge = (status: AdminPayment["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Complété
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="h-3 w-3 mr-1" />
            En attente
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="h-3 w-3 mr-1" />
            Échoué
          </Badge>
        )
      case "refunded":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            <ArrowDownRight className="h-3 w-3 mr-1" />
            Remboursé
          </Badge>
        )
    }
  }

  // Get type badge
  const getTypeBadge = (type: AdminPayment["type"]) => {
    switch (type) {
      case "booking":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Calendar className="h-3 w-3 mr-1" />
            Réservation
          </Badge>
        )
      case "deposit":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            Acompte
          </Badge>
        )
      case "refund":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            <ArrowDownRight className="h-3 w-3 mr-1" />
            Remboursement
          </Badge>
        )
      case "commission":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            <DollarSign className="h-3 w-3 mr-1" />
            Commission
          </Badge>
        )
      case "withdrawal":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <ArrowDownRight className="h-3 w-3 mr-1" />
            Retrait
          </Badge>
        )
    }
  }

  // Get method badge
  const getMethodBadge = (method: AdminPayment["method"]) => {
    switch (method) {
      case "card":
        return (
          <div className="flex items-center text-xs text-gray-500">
            <CreditCard className="h-3 w-3 mr-1" />
            Carte bancaire
          </div>
        )
      case "bank":
        return (
          <div className="flex items-center text-xs text-gray-500">
            <FileText className="h-3 w-3 mr-1" />
            Virement bancaire
          </div>
        )
      case "cash":
        return (
          <div className="flex items-center text-xs text-gray-500">
            <DollarSign className="h-3 w-3 mr-1" />
            Espèces
          </div>
        )
      case "mobile":
        return (
          <div className="flex items-center text-xs text-gray-500">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Paiement mobile
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des paiements</h1>
          <p className="text-muted-foreground">Gérez tous les paiements de la plateforme E-JAR</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex" onClick={handleExport}>
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
              placeholder="Rechercher par ID, référence, propriété, locataire ou propriétaire..."
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
                <SelectItem value="completed">Complété</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="failed">Échoué</SelectItem>
                <SelectItem value="refunded">Remboursé</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="booking">Réservation</SelectItem>
                <SelectItem value="deposit">Acompte</SelectItem>
                <SelectItem value="refund">Remboursement</SelectItem>
                <SelectItem value="commission">Commission</SelectItem>
                <SelectItem value="withdrawal">Retrait</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex-shrink-0">
              <Filter className="h-4 w-4 mr-2" />
              Plus de filtres
            </Button>
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
                        checked={selectedItems.length === filteredPayments.length && filteredPayments.length > 0}
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all"
                      />
                      <span>Paiement</span>
                    </div>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Type</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Détails</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Montant</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Statut</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Date</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {paginatedPayments.length > 0 ? (
                  paginatedPayments.map((payment) => (
                    <motion.tr
                      key={payment.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={selectedItems.includes(payment.id)}
                            onCheckedChange={() => handleSelectItem(payment.id)}
                            aria-label={`Select ${payment.id}`}
                          />
                          <div>
                            <div className="font-medium">{payment.id}</div>
                            <div className="text-xs text-gray-500">Réf: {payment.reference}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="space-y-1">
                          {getTypeBadge(payment.type)}
                          {getMethodBadge(payment.method)}
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        {payment.type !== "withdrawal" ? (
                          <div className="flex items-center gap-3">
                            {payment.propertyImage && (
                              <div className="h-10 w-10 relative rounded-md overflow-hidden">
                                <img
                                  src={payment.propertyImage || "/placeholder.svg"}
                                  alt={payment.propertyTitle}
                                  
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            )}
                            <div>
                              {payment.propertyTitle && <div className="font-medium">{payment.propertyTitle}</div>}
                              {payment.tenantName && (
                                <div className="text-xs text-gray-500">Locataire: {payment.tenantName}</div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="text-sm">Propriétaire: {payment.ownerName}</div>
                          </div>
                        )}
                      </td>
                      <td className="p-4 align-middle">
                        <div className="space-y-1">
                          <div className="font-medium">{formatCurrency(payment.total)}</div>
                          {payment.fee > 0 && (
                            <div className="text-xs text-gray-500">
                              Frais: {formatCurrency(payment.fee)} ({Math.round((payment.fee / payment.amount) * 100)}%)
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4 align-middle">{getStatusBadge(payment.status)}</td>
                      <td className="p-4 align-middle text-sm text-gray-500">{formatDate(payment.date)}</td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleViewDetails(payment.id)}
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
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2" />
                                Voir les détails
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Marquer comme complété
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <XCircle className="h-4 w-4 mr-2" />
                                Marquer comme échoué
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ArrowDownRight className="h-4 w-4 mr-2" />
                                Rembourser
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Télécharger la facture
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
                        <h3 className="text-lg font-medium">Aucun paiement trouvé</h3>
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
            Affichage de {paginatedPayments.length} sur {filteredPayments.length} paiements
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={goToPreviousPage}>
              Précédent
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant="outline"
                size="sm"
                className={currentPage === page ? "bg-[#465baa]/10" : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={goToNextPage}>
              Suivant
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
AdminPayments.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default  AdminPayments