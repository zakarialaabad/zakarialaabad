import { useState, ReactNode } from "react"
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
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
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
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import { usePage } from "@inertiajs/react"

type AdminUser = {
  id: number
  name: string
  email: string
  prenom: string
  genre: string
  telephone: string | null
  profile: string | null
}

function AdminUsers() {
  // Destructure with default empty array fallback
  const { users = [] } = usePage<{ users?: AdminUser[] }>().props

  // State declarations
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [userToDelete, setUserToDelete] = useState<number | null>(null)

  // Delete user function with proper typing
  async function deleteUser(userId: number): Promise<{ success: boolean; message: string }> {
    try {
      // Check if user has related data
      const hasRelatedData = users.some(user => user.id === userId)
      
      if (hasRelatedData) {
        return {
          success: false,
          message: "Cannot delete user with related data",
        }
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return { 
        success: true, 
        message: "User deleted successfully" 
      }
    } catch (error) {
      console.error("Delete error:", error)
      return {
        success: false,
        message: "An error occurred while deleting the user",
      }
    }
  }

  // Filter users with null checks
  const filteredUsers = users.filter(user => {
    if (!user) return false
    
    const query = searchQuery.toLowerCase()
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      (user.telephone && user.telephone.toLowerCase().includes(query))
    )
  })

  // Handle delete confirmation
  const handleDeleteUser = async () => {
    if (!userToDelete) return

    setIsDeleting(true)
    setDeleteError(null)

    const result = await deleteUser(userToDelete)

    if (result.success) {
      setShowDeleteDialog(false)
      setUserToDelete(null)
      // In a real app, you would refresh the data here
    } else {
      setDeleteError(result.message)
    }

    setIsDeleting(false)
  }

  // Handle selection
  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    )
  }

  return (
    console.log(users),
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage all E-JAR platform users</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
      
          <Button size="sm" className="bg-[#465baa] hover:bg-[#465baa]/90">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 border rounded-lg">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, email or phone..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
         
        </div>

        {/* Users Table */}
        <div className="rounded-md border">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedItems.length === filteredUsers.length && filteredUsers.length > 0}
                        onCheckedChange={() => {
                          if (selectedItems.length === filteredUsers.length) {
                            setSelectedItems([])
                          } else {
                            setSelectedItems(filteredUsers.map(user => user.id.toString()))
                          }
                        }}
                      />
                      <span>User</span>
                    </div>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Email</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Phone</th>
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
                            checked={selectedItems.includes(user.id.toString())}
                            onCheckedChange={() => handleSelectItem(user.id.toString())}
                          />
                          <div className="h-10 w-10 relative rounded-full overflow-hidden">
                            <img
                              src={user.profile || "/placeholder.svg"}
                              alt={user.name}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-gray-500">ID: {user.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center text-sm">
                          <Mail className="h-3.5 w-3.5 mr-2 text-gray-400" />
                          {user.email}
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center text-sm">
                          <Phone className="h-3.5 w-3.5 mr-2 text-gray-400" />
                          {user.telephone || "N/A"}
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
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Activate Account
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <XCircle className="h-4 w-4 mr-2" />
                                Block Account
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
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="rounded-full bg-gray-100 p-3 mb-3">
                          <Search className="h-6 w-6 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium">No users found</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Try adjusting your search or filters
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Showing {filteredUsers.length} of {users.length} users
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-[#465baa]/10">
              1
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>

            {deleteError && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {deleteError}
              </div>
            )}

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
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteUser}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

AdminUsers.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>

export default AdminUsers