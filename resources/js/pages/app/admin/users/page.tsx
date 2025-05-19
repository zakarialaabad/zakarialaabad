
import { useState,ReactNode } from "react"
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
  Shield,
  Home,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
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

// User type for admin
interface AdminUser {
  id: string
  name: string
  email: string
  phone: string
  role: "owner" | "tenant" | "admin"
  status: "active" | "inactive" | "pending" | "blocked"
  joinDate: string
  lastActive: string
  image: string
  properties?: number
  bookings?: number
  verified: boolean
}

// Sample users data
const users: AdminUser[] = [
  {
    id: "1",
    name: "Ahmed Benjelloun",
    email: "ahmed.benjelloun@example.com",
    phone: "+212 6 12 34 56 78",
    role: "owner",
    status: "active",
    joinDate: "2023-01-15T10:30:00Z",
    lastActive: "2023-05-20T14:45:00Z",
    image: "/thoughtful-moroccan-man.png",
    properties: 5,
    verified: true,
  },
  {
    id: "2",
    name: "Fatima Zahra",
    email: "fatima.zahra@example.com",
    phone: "+212 6 23 45 67 89",
    role: "tenant",
    status: "active",
    joinDate: "2023-02-10T09:15:00Z",
    lastActive: "2023-05-19T11:30:00Z",
    image: "/veiled-beauty.png",
    bookings: 3,
    verified: true,
  },
  {
    id: "3",
    name: "Karim Alami",
    email: "karim.alami@example.com",
    phone: "+212 6 34 56 78 90",
    role: "owner",
    status: "pending",
    joinDate: "2023-03-05T14:20:00Z",
    lastActive: "2023-05-18T16:10:00Z",
    image: "/confident-moroccan-executive.png",
    properties: 2,
    verified: false,
  },
  {
    id: "4",
    name: "Leila Benali",
    email: "leila.benali@example.com",
    phone: "+212 6 45 67 89 01",
    role: "tenant",
    status: "inactive",
    joinDate: "2023-01-20T11:45:00Z",
    lastActive: "2023-04-10T09:30:00Z",
    image: "/confident-moroccan-professional.png",
    bookings: 1,
    verified: true,
  },
  {
    id: "5",
    name: "Mohammed Tazi",
    email: "mohammed.tazi@example.com",
    phone: "+212 6 56 78 90 12",
    role: "admin",
    status: "active",
    joinDate: "2022-12-01T08:00:00Z",
    lastActive: "2023-05-20T17:30:00Z",
    image: "/moroccan-businessman.png",
    verified: true,
  },
  {
    id: "6",
    name: "Samira Bennani",
    email: "samira.bennani@example.com",
    phone: "+212 6 67 89 01 23",
    role: "owner",
    status: "blocked",
    joinDate: "2023-02-25T13:10:00Z",
    lastActive: "2023-04-15T10:20:00Z",
    image: "/moroccan-woman-professional.png",
    properties: 1,
    verified: true,
  },
  {
    id: "7",
    name: "Youssef Benjelloun",
    email: "youssef.benjelloun@example.com",
    phone: "+212 6 78 90 12 34",
    role: "tenant",
    status: "active",
    joinDate: "2023-03-15T15:30:00Z",
    lastActive: "2023-05-19T18:45:00Z",
    image: "/thoughtful-moroccan-professional.png",
    bookings: 2,
    verified: true,
  },
  {
    id: "8",
    name: "Nadia Tazi",
    email: "nadia.tazi@example.com",
    phone: "+212 6 89 01 23 45",
    role: "owner",
    status: "active",
    joinDate: "2023-04-05T10:00:00Z",
    lastActive: "2023-05-20T12:15:00Z",
    image: "/inspiring-moroccan-educator.png",
    properties: 3,
    verified: true,
  },
]

// Add this function before the AdminUsers component
async function deleteUser(userId: string): Promise<{ success: boolean; message: string }> {
  try {
    // 1. Check if user has related data
    const hasProperties = users.some((user) => user.id === userId && user.properties && user.properties > 0)
    const hasBookings = users.some((user) => user.id === userId && user.bookings && user.bookings > 0)

    if (hasProperties || hasBookings) {
      return {
        success: false,
        message: "Impossible de supprimer cet utilisateur car il possède des propriétés ou des réservations actives.",
      }
    }

    // 2. In a real app, this would be an API call
    // await fetch(`/api/users/${userId}`, { method: 'DELETE' });

    // 3. For demo purposes, simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 4. Return success
    return { success: true, message: "Utilisateur supprimé avec succès." }
  } catch (error) {
    console.error("Error deleting user:", error)
    return {
      success: false,
      message: "Une erreur est survenue lors de la suppression de l'utilisateur. Veuillez réessayer.",
    }
  }
}

 function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  // Add these states inside the AdminUsers component
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)

  // Add this function inside the AdminUsers component
  const handleDeleteUser = async () => {
    if (!userToDelete) return

    setIsDeleting(true)
    setDeleteError(null)

    const result = await deleteUser(userToDelete)

    if (result.success) {
      // In a real app, you would refresh the user list from the API
      // For demo, filter out the deleted user
      const updatedUsers = users.filter((user) => user.id !== userToDelete)
      // This would update the state in a real application
      // setUsers(updatedUsers);

      setShowDeleteDialog(false)
      setUserToDelete(null)

      // Show success notification (you can use your notification system)
      alert(result.message)
    } else {
      setDeleteError(result.message)
    }

    setIsDeleting(false)
  }

  // Filter users based on search query and filters
  const filteredUsers = users.filter((user) => {
    // Filter by search query
    if (
      searchQuery &&
      !user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !user.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !user.phone.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by role
    if (selectedRole !== "all" && user.role !== selectedRole) {
      return false
    }

    // Filter by status
    if (selectedStatus !== "all" && user.status !== selectedStatus) {
      return false
    }

    return true
  })

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectedItems.length === filteredUsers.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredUsers.map((u) => u.id))
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
  const getStatusBadge = (status: AdminUser["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Actif
          </Badge>
        )
      case "inactive":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            <Calendar className="h-3 w-3 mr-1" />
            Inactif
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <AlertTriangle className="h-3 w-3 mr-1" />
            En attente
          </Badge>
        )
      case "blocked":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="h-3 w-3 mr-1" />
            Bloqué
          </Badge>
        )
    }
  }

  // Get role badge
  const getRoleBadge = (role: AdminUser["role"]) => {
    switch (role) {
      case "admin":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            <Shield className="h-3 w-3 mr-1" />
            Admin
          </Badge>
        )
      case "owner":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Home className="h-3 w-3 mr-1" />
            Propriétaire
          </Badge>
        )
      case "tenant":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            <Calendar className="h-3 w-3 mr-1" />
            Locataire
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des utilisateurs</h1>
          <p className="text-muted-foreground">Gérez tous les utilisateurs de la plateforme E-JAR</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button variant="outline" size="sm" className="hidden md:flex">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
          <Button size="sm" className="bg-[#465baa] hover:bg-[#465baa]/90">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un utilisateur
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher par nom, email ou téléphone..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les rôles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="owner">Propriétaire</SelectItem>
                <SelectItem value="tenant">Locataire</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="inactive">Inactif</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="blocked">Bloqué</SelectItem>
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
                        checked={selectedItems.length === filteredUsers.length && filteredUsers.length > 0}
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all"
                      />
                      <span>Utilisateur</span>
                    </div>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Contact</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Rôle</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Statut</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Activité</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={selectedItems.includes(user.id)}
                            onCheckedChange={() => handleSelectItem(user.id)}
                            aria-label={`Select ${user.name}`}
                          />
                          <div className="h-10 w-10 relative rounded-full overflow-hidden">
                            <img
                              src={user.image || "/placeholder.svg"}
                              alt={user.name}
                              className="object-cover w-full h-full"
                            />
                            {user.verified && (
                              <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-0.5">
                                <CheckCircle className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-gray-500">ID: {user.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3.5 w-3.5 mr-2 text-gray-400" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-3.5 w-3.5 mr-2 text-gray-400" />
                            <span>{user.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="space-y-1">
                          {getRoleBadge(user.role)}
                          {user.role === "owner" && user.properties && (
                            <div className="text-xs text-gray-500">
                              {user.properties} propriété{user.properties > 1 ? "s" : ""}
                            </div>
                          )}
                          {user.role === "tenant" && user.bookings && (
                            <div className="text-xs text-gray-500">
                              {user.bookings} réservation{user.bookings > 1 ? "s" : ""}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4 align-middle">{getStatusBadge(user.status)}</td>
                      <td className="p-4 align-middle">
                        <div className="space-y-1">
                          <div className="text-xs text-gray-500">
                            <span className="font-medium">Inscrit:</span> {formatDate(user.joinDate)}
                          </div>
                          <div className="text-xs text-gray-500">
                            <span className="font-medium">Dernière activité:</span> {formatDate(user.lastActive)}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
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
                                <Mail className="h-4 w-4 mr-2" />
                                Envoyer un email
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Activer le compte
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <XCircle className="h-4 w-4 mr-2" />
                                Bloquer le compte
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => {
                                  setUserToDelete(user.id)
                                  setShowDeleteDialog(true)
                                }}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="rounded-full bg-gray-100 p-3 mb-3">
                          <Search className="h-6 w-6 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium">Aucun utilisateur trouvé</h3>
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
            Affichage de {filteredUsers.length} sur {users.length} utilisateurs
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Précédent
            </Button>
            <Button variant="outline" size="sm" className="bg-[#465baa]/10">
              1
            </Button>
            <Button variant="outline" size="sm">
              Suivant
            </Button>
          </div>
        </div>
      </Card>
      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Confirmer la suppression</h3>
            <p className="text-gray-600 mb-4">
              Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.
            </p>

            {deleteError && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">{deleteError}</div>}

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteDialog(false)
                  setUserToDelete(null)
                  setDeleteError(null)
                }}
                disabled={isDeleting}
              >
                Annuler
              </Button>
              <Button variant="destructive" onClick={handleDeleteUser} disabled={isDeleting}>
                {isDeleting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                    Suppression...
                  </>
                ) : (
                  "Supprimer"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
AdminUsers.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
export default AdminUsers