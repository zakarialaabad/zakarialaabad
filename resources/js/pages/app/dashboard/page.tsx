
import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  LayoutDashboard,
  Home,
  Calendar,
  Settings,
  X,
  Check,
  XIcon,
  AlertCircle,
  Filter,
  Search,
  Info,
  Upload,
  Plus,
  Trash,
  Save,
  ArrowLeft,
} from "lucide-react"
import { router } from "@inertiajs/react"
export default function Dashboard() {

  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [confirmAction, setConfirmAction] = useState<{ type: "accept" | "reject"; reservation: any } | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [activeFilter, setActiveFilter] = useState("all")
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success")
  const [searchTerm, setSearchTerm] = useState("")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [periodFilter, setPeriodFilter] = useState("")
  const [minAmount, setMinAmount] = useState("")
  const [maxAmount, setMaxAmount] = useState("")
  const [personsFilter, setPersonsFilter] = useState("")
  const [appliedFilters, setAppliedFilters] = useState({
    period: "",
    minAmount: "",
    maxAmount: "",
    persons: "",
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  // État pour l'édition de propriété
  const [editingProperty, setEditingProperty] = useState<number | null>(null)
  const [propertyForm, setPropertyForm] = useState({
    title: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    amenities: [] as string[],
    status: "active",
    propertyType: "apartment",
  })
  const [propertyImages, setPropertyImages] = useState<string[]>([])
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const [reservations, setReservations] = useState([
    {
      id: 1,
      property: "Appartement moderne au centre ville",
      location: "Casablanca, Maarif",
      tenant: "M. Ahmed Tazi",
      tenantAvatar: "/thoughtful-moroccan-man.png",
      dates: "3 juillet - 10 juillet 2023",
      persons: 2,
      amount: "5 500 DH",
      status: "pending",
      statusColor: "blue",
      needsAction: true,
    },
    {
      id: 2,
      property: "Riad traditionnel dans la médina",
      location: "Marrakech, Médina",
      tenant: "Famille Benani",
      tenantAvatar: "/confident-moroccan-professional.png",
      dates: "15 juin - 22 juin 2023",
      persons: 4,
      amount: "8 200 DH",
      status: "accepted",
      statusColor: "green",
      needsAction: false,
    },
    {
      id: 3,
      property: "Appartement moderne au centre ville",
      location: "Casablanca, Maarif",
      tenant: "Mme. Laila Kadiri",
      tenantAvatar: "/moroccan-woman-professional.png",
      dates: "10 mai - 17 mai 2023",
      persons: 3,
      amount: "5 500 DH",
      status: "rejected",
      statusColor: "red",
      needsAction: false,
    },
    {
      id: 4,
      property: "Riad traditionnel dans la médina",
      location: "Marrakech, Médina",
      tenant: "M. Karim Alaoui",
      tenantAvatar: "/moroccan-businessman.png",
      dates: "20 juillet - 27 juillet 2023",
      persons: 5,
      amount: "8 200 DH",
      status: "pending",
      statusColor: "blue",
      needsAction: true,
    },
    {
      id: 5,
      property: "Appartement moderne au centre ville",
      location: "Casablanca, Maarif",
      tenant: "Famille Chraibi",
      tenantAvatar: "/diverse-group-city.png",
      dates: "5 août - 12 août 2023",
      persons: 4,
      amount: "5 500 DH",
      status: "pending",
      statusColor: "blue",
      needsAction: true,
    },
    {
      id: 6,
      property: "Riad traditionnel dans la médina",
      location: "Marrakech, Médina",
      tenant: "M. Youssef Benjelloun",
      tenantAvatar: "/moroccan-architect.png",
      dates: "1 juin - 8 juin 2023",
      persons: 2,
      amount: "8 200 DH",
      status: "accepted",
      statusColor: "green",
      needsAction: false,
    },
    {
      id: 7,
      property: "Appartement moderne au centre ville",
      location: "Casablanca, Maarif",
      tenant: "Mme. Nadia Fassi",
      tenantAvatar: "/moroccan-teacher.png",
      dates: "25 avril - 2 mai 2023",
      persons: 1,
      amount: "5 500 DH",
      status: "rejected",
      statusColor: "red",
      needsAction: false,
    },
    {
      id: 8,
      property: "Riad traditionnel dans la médina",
      location: "Marrakech, Médina",
      tenant: "Famille El Amrani",
      tenantAvatar: "/diverse-group-city.png",
      dates: "15 mars - 22 mars 2023",
      persons: 6,
      amount: "8 200 DH",
      status: "rejected",
      statusColor: "red",
      needsAction: false,
    },
  ])

  // Données des propriétés
  const properties = [
    {
      id: 1,
      title: "Appartement moderne au centre ville",
      location: "Casablanca, Maarif",
      price: "5500",
      bedrooms: 3,
      bathrooms: 2,
      description:
        "Magnifique appartement moderne situé au cœur du quartier Maarif à Casablanca. Entièrement rénové avec des finitions de haute qualité, cet appartement lumineux offre un espace de vie confortable et élégant. Proche de toutes commodités, restaurants et centres commerciaux.",
      amenities: ["Wifi", "Climatisation", "Cuisine équipée", "Ascenseur", "Parking", "Sécurité 24/7"],
      status: "active",
      propertyType: "apartment",
      images: ["/modern-moroccan-living.png", "/vibrant-moroccan-kitchen-dining.png", "/modern-moroccan-bath.png"],
      views: 245,
      favorites: 18,
      inquiries: 7,
    },
    {
      id: 2,
      title: "Riad traditionnel dans la médina",
      location: "Marrakech, Médina",
      price: "8200",
      bedrooms: 4,
      bathrooms: 3,
      description:
        "Authentique riad traditionnel situé au cœur de la médina de Marrakech. Cette propriété d'exception allie le charme de l'architecture marocaine traditionnelle avec des équipements modernes. Profitez de la terrasse sur le toit avec vue panoramique sur la médina et les montagnes de l'Atlas.",
      amenities: ["Wifi", "Piscine", "Terrasse", "Climatisation", "Service de ménage", "Petit-déjeuner inclus"],
      status: "active",
      propertyType: "riad",
      images: ["/riad-retreat.png", "/ornate-moroccan-living-room.png", "/riad-courtyard-oasis.png"],
      views: 312,
      favorites: 27,
      inquiries: 9,
    },
  ]

  // Effet pour masquer le toast après 3 secondes
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  // Effet pour charger les données de la propriété en cours d'édition
  useEffect(() => {
    if (editingProperty !== null) {
      const property = properties.find((p) => p.id === editingProperty)
      if (property) {
        setPropertyForm({
          title: property.title,
          location: property.location,
          price: property.price,
          bedrooms: property.bedrooms.toString(),
          bathrooms: property.bathrooms.toString(),
          description: property.description,
          amenities: [...property.amenities],
          status: property.status,
          propertyType: property.propertyType,
        })
        setPropertyImages(property.images)
      }
    }
  }, [editingProperty])

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded)
  }

  const handleActionClick = (type: "accept" | "reject", reservation: any) => {
    setConfirmAction({ type, reservation })
    setShowConfirmModal(true)
  }

  const confirmActionHandler = () => {
    if (confirmAction) {
      // Mettre à jour le statut de la réservation au lieu de la supprimer
      setReservations((prevReservations) =>
        prevReservations.map((reservation) => {
          if (reservation.id === confirmAction.reservation.id) {
            return {
              ...reservation,
              status: confirmAction.type === "accept" ? "accepted" : "rejected",
              statusColor: confirmAction.type === "accept" ? "green" : "red",
              needsAction: false,
            }
          }
          return reservation
        }),
      )

      // Afficher un toast de confirmation
      setToastMessage(`Réservation ${confirmAction.type === "accept" ? "acceptée" : "refusée"} avec succès !`)
      setToastType(confirmAction.type === "accept" ? "success" : "info")
      setShowToast(true)

      // Fermer la modal
      setShowConfirmModal(false)
      setConfirmAction(null)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const getPaginatedData = (data: any[], page: number, itemsPerPage: number) => {
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data.slice(startIndex, endIndex)
  }

  const getTotalPages = (totalItems: number, itemsPerPage: number) => {
    return Math.ceil(totalItems / itemsPerPage)
  }

  const handleViewProperty = (propertyId: number) => {
    // Simuler la navigation vers la page de détail de la propriété
    router.visit(`/property/${propertyId}`)

    // Afficher un toast de confirmation
    setToastMessage(`Consultation de la propriété #${propertyId}`)
    setToastType("info")
    setShowToast(true)
  }

  const handleEditProperty = (propertyId: number) => {
    setEditingProperty(propertyId)

    // Afficher un toast de confirmation
    setToastMessage(`Modification de la propriété #${propertyId} en cours...`)
    setToastType("info")
    setShowToast(true)
  }

  const handleCancelEdit = () => {
    // Vérifier s'il y a des modifications non enregistrées
    if (hasUnsavedChanges) {
      if (confirm("Vous avez des modifications non enregistrées. Êtes-vous sûr de vouloir annuler ?")) {
        setEditingProperty(null)
        setHasUnsavedChanges(false)
      }
    } else {
      setEditingProperty(null)
    }
  }

  const handleSaveProperty = () => {
    // Simuler la sauvegarde
    setToastMessage(`Propriété #${editingProperty} mise à jour avec succès !`)
    setToastType("success")
    setShowToast(true)

    // Réinitialiser l'état d'édition
    setEditingProperty(null)
    setHasUnsavedChanges(false)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setPropertyForm({
      ...propertyForm,
      [e.target.name]: e.target.value,
    })
    setHasUnsavedChanges(true)
  }

  const handleAmenityToggle = (amenity: string) => {
    if (propertyForm.amenities.includes(amenity)) {
      setPropertyForm({
        ...propertyForm,
        amenities: propertyForm.amenities.filter((a) => a !== amenity),
      })
    } else {
      setPropertyForm({
        ...propertyForm,
        amenities: [...propertyForm.amenities, amenity],
      })
    }
    setHasUnsavedChanges(true)
  }

  const handleAddImage = () => {
    // Déclencher le clic sur l'input de fichier caché
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      // Créer une URL pour le fichier sélectionné
      const imageUrl = URL.createObjectURL(files[0])
      setPropertyImages([...propertyImages, imageUrl])
      setHasUnsavedChanges(true)

      // Réinitialiser l'input pour permettre de sélectionner le même fichier à nouveau
      e.target.value = ""
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...propertyImages]
    newImages.splice(index, 1)
    setPropertyImages(newImages)
    setHasUnsavedChanges(true)
  }

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [propertyToDelete, setPropertyToDelete] = useState<number | null>(null)

  const handleDeleteClick = (propertyId: number) => {
    setPropertyToDelete(propertyId)
    setShowDeleteModal(true)
  }

  const confirmDeleteProperty = () => {
    if (propertyToDelete !== null) {
      // Dans un cas réel, on enverrait une requête API pour supprimer la propriété
      // Pour cette démo, on affiche juste un toast
      setToastMessage(`Propriété #${propertyToDelete} supprimée avec succès`)
      setToastType("success")
      setShowToast(true)

      // Fermer la modal
      setShowDeleteModal(false)
      setPropertyToDelete(null)
    }
  }

  const applyAdvancedFilters = () => {
    setAppliedFilters({
      period: periodFilter,
      minAmount: minAmount,
      maxAmount: maxAmount,
      persons: personsFilter,
    })

    // Réinitialiser la pagination
    setCurrentPage(1)

    // Afficher un toast de confirmation
    setToastMessage(`Filtres appliqués avec succès`)
    setToastType("info")
    setShowToast(true)
  }

  const resetFilters = () => {
    setPeriodFilter("")
    setMinAmount("")
    setMaxAmount("")
    setPersonsFilter("")
    setAppliedFilters({
      period: "",
      minAmount: "",
      maxAmount: "",
      persons: "",
    })

    // Réinitialiser la pagination
    setCurrentPage(1)

    // Afficher un toast de confirmation
    setToastMessage(`Filtres réinitialisés`)
    setToastType("info")
    setShowToast(true)
  }

  // Fonction utilitaire pour extraire la date d'une chaîne comme "3 juillet - 10 juillet 2023"
  const extractDateFromString = (dateString: string) => {
    try {
      const months = {
        janvier: 0,
        février: 1,
        mars: 2,
        avril: 3,
        mai: 4,
        juin: 5,
        juillet: 6,
        août: 7,
        septembre: 8,
        octobre: 9,
        novembre: 10,
        décembre: 11,
      }

      const parts = dateString.split(" - ")[0].split(" ")
      const day = Number.parseInt(parts[0])
      const monthName = parts[1].toLowerCase()
      const year = Number.parseInt(parts[parts.length - 1])

      return new Date(year, months[monthName as keyof typeof months], day)
    } catch (e) {
      return new Date() // Retourne la date actuelle en cas d'erreur
    }
  }

  const filteredReservations = reservations.filter((reservation) => {
    // Filtrer par statut
    const statusMatch = activeFilter === "all" || reservation.status === activeFilter

    // Filtrer par terme de recherche (insensible à la casse)
    const searchLower = searchTerm.toLowerCase()
    const searchMatch =
      searchTerm === "" ||
      reservation.property.toLowerCase().includes(searchLower) ||
      reservation.tenant.toLowerCase().includes(searchLower) ||
      reservation.location.toLowerCase().includes(searchLower) ||
      reservation.dates.toLowerCase().includes(searchLower) ||
      reservation.amount.toLowerCase().includes(searchLower)

    // Filtres avancés
    let advancedFiltersMatch = true

    // Filtre par période
    if (appliedFilters.period) {
      const today = new Date()
      const reservationStartDate = extractDateFromString(reservation.dates)

      switch (appliedFilters.period) {
        case "this-week":
          const endOfWeek = new Date(today)
          endOfWeek.setDate(today.getDate() + (7 - today.getDay()))
          advancedFiltersMatch =
            advancedFiltersMatch && reservationStartDate >= today && reservationStartDate <= endOfWeek
          break
        case "this-month":
          const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
          advancedFiltersMatch =
            advancedFiltersMatch && reservationStartDate >= today && reservationStartDate <= endOfMonth
          break
        case "last-month":
          const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
          const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
          advancedFiltersMatch =
            advancedFiltersMatch && reservationStartDate >= startOfLastMonth && reservationStartDate <= endOfLastMonth
          break
        case "next-month":
          const startOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
          const endOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0)
          advancedFiltersMatch =
            advancedFiltersMatch && reservationStartDate >= startOfNextMonth && reservationStartDate <= endOfNextMonth
          break
      }
    }

    // Filtre par montant
    if (appliedFilters.minAmount) {
      const amount = Number.parseFloat(reservation.amount.replace(/[^\d.]/g, ""))
      advancedFiltersMatch = advancedFiltersMatch && amount >= Number.parseFloat(appliedFilters.minAmount)
    }

    if (appliedFilters.maxAmount) {
      const amount = Number.parseFloat(reservation.amount.replace(/[^\d.]/g, ""))
      advancedFiltersMatch = advancedFiltersMatch && amount <= Number.parseFloat(appliedFilters.maxAmount)
    }

    // Filtre par nombre de personnes
    if (appliedFilters.persons) {
      if (appliedFilters.persons === "1") {
        advancedFiltersMatch = advancedFiltersMatch && reservation.persons === 1
      } else if (appliedFilters.persons === "2") {
        advancedFiltersMatch = advancedFiltersMatch && reservation.persons === 2
      } else if (appliedFilters.persons === "3-4") {
        advancedFiltersMatch = advancedFiltersMatch && (reservation.persons === 3 || reservation.persons === 4)
      } else if (appliedFilters.persons === "5+") {
        advancedFiltersMatch = advancedFiltersMatch && reservation.persons >= 5
      }
    }

    return statusMatch && searchMatch && advancedFiltersMatch
  })

  // Fonction pour filtrer les propriétés en fonction du terme de recherche
  const filteredProperties = properties.filter((property) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      searchTerm === "" ||
      property.title.toLowerCase().includes(searchLower) ||
      property.location.toLowerCase().includes(searchLower) ||
      property.description.toLowerCase().includes(searchLower) ||
      property.price.toLowerCase().includes(searchLower) ||
      property.propertyType.toLowerCase().includes(searchLower)
    )
  })

  const pendingCount = reservations.filter((r) => r.status === "pending").length
  const acceptedCount = reservations.filter((r) => r.status === "accepted").length
  const rejectedCount = reservations.filter((r) => r.status === "rejected").length

  // Liste des commodités disponibles
  const availableAmenities = [
    "Wifi",
    "Climatisation",
    "Cuisine équipée",
    "Ascenseur",
    "Parking",
    "Sécurité 24/7",
    "Piscine",
    "Terrasse",
    "Service de ménage",
    "Petit-déjeuner inclus",
    "Vue sur mer",
    "Jardin",
    "Barbecue",
    "Salle de sport",
    "Jacuzzi",
    "Sauna",
    "TV",
    "Machine à laver",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-3">
          <div
            className={`px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 ${
              toastType === "success"
                ? "bg-green-100 text-green-800 border-l-4 border-green-500"
                : toastType === "error"
                  ? "bg-red-100 text-red-800 border-l-4 border-red-500"
                  : "bg-blue-100 text-blue-800 border-l-4 border-blue-500"
            }`}
          >
            {toastType === "success" ? (
              <Check className="h-5 w-5" />
            ) : toastType === "error" ? (
              <AlertCircle className="h-5 w-5" />
            ) : (
              <Info className="h-5 w-5" />
            )}
            <p className="font-medium">{toastMessage}</p>
            <button onClick={() => setShowToast(false)} className="ml-auto text-gray-500 hover:text-gray-700">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && confirmAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              {confirmAction.type === "accept" ? (
                <Check className="h-6 w-6 text-green-500 mr-2" />
              ) : (
                <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
              )}
              <h3 className="text-lg font-semibold">
                {confirmAction.type === "accept" ? "Confirmer l'acceptation" : "Confirmer le refus"}
              </h3>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                {confirmAction.type === "accept"
                  ? "Êtes-vous sûr de vouloir accepter cette réservation ?"
                  : "Êtes-vous sûr de vouloir refuser cette réservation ?"}
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-md overflow-hidden mr-3">
                    <img
                      src={confirmAction.reservation.id % 2 === 0 ? "/riad-retreat.png" : "/modern-moroccan-living.png"}
                      alt={confirmAction.reservation.property}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{confirmAction.reservation.property}</p>
                    <p className="text-sm text-gray-500">{confirmAction.reservation.location}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Locataire:</p>
                    <p>{confirmAction.reservation.tenant}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Dates:</p>
                    <p>{confirmAction.reservation.dates}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Personnes:</p>
                    <p>{confirmAction.reservation.persons}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Montant:</p>
                    <p className="font-medium text-[#465baa]">{confirmAction.reservation.amount}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={confirmActionHandler}
                className={`px-4 py-2 text-white rounded-md ${
                  confirmAction.type === "accept" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmation de suppression */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
              <h3 className="text-lg font-semibold">Confirmer la suppression</h3>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                Êtes-vous sûr de vouloir supprimer cette propriété ? Cette action est irréversible.
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={confirmDeleteProperty}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex h-screen bg-gray-50">
        {/* Sidebar fixe */}
        <div className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center">
              <img src="/logo-ejar.png" alt="E-JAR Logo" className="h-8 w-auto" />
              <span className="ml-2 text-xl font-semibold text-[#465baa]">E-JAR</span>
            </div>
          </div>

          <div className="flex flex-col flex-grow p-4">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#465baa]/10 flex items-center justify-center mr-3">
                  <img
                    src="/thoughtful-moroccan-man.png"
                    alt="Photo de profil"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">Mohammed Alami</p>
                  <p className="text-xs text-gray-500">Propriétaire</p>
                </div>
              </div>
            </div>

            <nav className="space-y-1 flex-grow">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setActiveSection("dashboard")
                }}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                  activeSection === "dashboard" ? "bg-[#465baa] text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <LayoutDashboard className="h-5 w-5 mr-3" />
                Tableau de bord
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setActiveSection("annonces")
                }}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                  activeSection === "annonces" ? "bg-[#465baa] text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Home className="h-5 w-5 mr-3" />
                Mes annonces
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setActiveSection("reservations")
                }}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                  activeSection === "reservations" ? "bg-[#465baa] text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Calendar className="h-5 w-5 mr-3" />
                Réservations
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setActiveSection("parametres")
                }}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                  activeSection === "parametres" ? "bg-[#465baa] text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Settings className="h-5 w-5 mr-3" />
                Paramètres
              </a>
            </nav>

            <div className="pt-6 mt-6 border-t border-gray-200">
              <button
                onClick={() => router.visit("/")}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg w-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Déconnexion
              </button>
            </div>
          </div>
        </div>

        {/* Barre de navigation mobile */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
          <div className="grid grid-cols-4 h-16">
            <button
              onClick={() => setActiveSection("dashboard")}
              className={`flex flex-col items-center justify-center ${
                activeSection === "dashboard" ? "text-[#465baa]" : "text-gray-500"
              }`}
            >
              <LayoutDashboard className="h-6 w-6" />
              <span className="text-xs mt-1">Tableau</span>
            </button>
            <button
              onClick={() => setActiveSection("annonces")}
              className={`flex flex-col items-center justify-center ${
                activeSection === "annonces" ? "text-[#465baa]" : "text-gray-500"
              }`}
            >
              <Home className="h-6 w-6" />
              <span className="text-xs mt-1">Annonces</span>
            </button>
            <button
              onClick={() => setActiveSection("reservations")}
              className={`flex flex-col items-center justify-center ${
                activeSection === "reservations" ? "text-[#465baa]" : "text-gray-500"
              }`}
            >
              <Calendar className="h-6 w-6" />
              <span className="text-xs mt-1">Réservations</span>
            </button>
            <button
              onClick={() => setActiveSection("parametres")}
              className={`flex flex-col items-center justify-center ${
                activeSection === "parametres" ? "text-[#465baa]" : "text-gray-500"
              }`}
            >
              <Settings className="h-6 w-6" />
              <span className="text-xs mt-1">Paramètres</span>
            </button>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
              <div className="flex items-center md:hidden">
                <img src="/logo-ejar.png" alt="E-JAR Logo" className="h-8 w-auto" />
                <span className="ml-2 text-xl font-semibold text-[#465baa]">E-JAR</span>
              </div>

              <div className="flex-1 flex justify-center md:justify-end">
                <div className="max-w-lg w-full lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Rechercher
                  </label>
                  <div className="relative text-gray-400 focus-within:text-gray-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                      <Search className="h-5 w-5" />
                    </div>
                    <input
                      id="search"
                      className="block w-full bg-white py-2 pl-10 pr-3 border border-gray-300 rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#465baa] focus:border-transparent sm:text-sm"
                      placeholder="Rechercher..."
                      type="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="ml-4 flex items-center md:ml-6">
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#465baa]">
                  <span className="sr-only">Voir les notifications</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>

                <div className="ml-3 relative">
                  <div className="md:hidden">
                    <button className="flex items-center max-w-xs rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-[#465baa]">
                      <span className="sr-only">Ouvrir le menu utilisateur</span>
                      <img className="h-8 w-8 rounded-full" src="/thoughtful-moroccan-man.png" alt="Photo de profil" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Contenu principal */}
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
            {/* Contenu dynamique basé sur la section active */}
            <div className="max-w-7xl mx-auto">
              {activeSection === "dashboard" && (
                <>
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
                    <p className="mt-1 text-sm text-gray-500">
                      Bienvenue sur votre tableau de bord, consultez vos statistiques et gérez vos propriétés.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                            <svg
                              className="h-6 w-6 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                              />
                            </svg>
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">Propriétés actives</dt>
                              <dd>
                                <div className="text-lg font-medium text-gray-900">5</div>
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                          <a href="#" className="font-medium text-[#465baa] hover:text-[#465baa]-dark">
                            Voir toutes les propriétés
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                            <svg
                              className="h-6 w-6 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">Revenus du mois</dt>
                              <dd>
                                <div className="text-lg font-medium text-gray-900">12 500 DH</div>
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                          <a href="#" className="font-medium text-[#465baa] hover:text-[#465baa]-dark">
                            Voir les détails
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                            <svg
                              className="h-6 w-6 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">Réservations en attente</dt>
                              <dd>
                                <div className="text-lg font-medium text-gray-900">{pendingCount}</div>
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                          <a href="#" className="font-medium text-[#465baa] hover:text-[#465baa]-dark">
                            Voir les réservations
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
                    <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Vos annonces récentes</h3>
                    </div>
                    <ul className="divide-y divide-gray-200">
                      {filteredProperties.slice(0, 2).map((property, index) => (
                        <li key={property.id}>
                          <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
                                <img
                                  src={property.images[0] || "/placeholder.svg"}
                                  alt={property.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="ml-4 flex-1">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium text-[#465baa] truncate">{property.title}</p>
                                  <div className="ml-2 flex-shrink-0 flex">
                                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                      Actif
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-2 flex justify-between">
                                  <div>
                                    <p className="flex items-center text-sm text-gray-500">
                                      <svg
                                        className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      {property.location}
                                    </p>
                                    <p className="mt-1 flex items-center text-sm text-gray-500">
                                      <svg
                                        className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path
                                          fillRule="evenodd"
                                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      {property.views} vues
                                    </p>
                                  </div>
                                  <p className="text-sm font-medium text-[#465baa]">{property.price} DH/mois</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-gray-50 px-4 py-4 sm:px-6 border-t border-gray-200">
                      <div className="text-sm">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            setActiveSection("annonces")
                          }}
                          className="font-medium text-[#465baa] hover:text-[#465baa]-dark"
                        >
                          Voir toutes vos annonces
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Contenu pour les autres sections */}
              {activeSection === "annonces" && !editingProperty && (
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  {/* Contenu existant pour "Mes annonces" */}
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Mes annonces</h3>
                    <button className="bg-[#465baa] text-white px-4 py-2 rounded-md hover:bg-[#465baa]/90">
                      + Nouvelle annonce
                    </button>
                  </div>

                  <div className="px-4 py-3 sm:px-6 border-b border-gray-200 bg-gray-50">
                    <div className="flex flex-wrap gap-2">
                      <button className="bg-[#465baa]/10 text-[#465baa] px-3 py-1 rounded-full text-sm font-medium">
                        Toutes (5)
                      </button>
                      <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200">
                        Actives (3)
                      </button>
                      <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200">
                        En attente (1)
                      </button>
                      <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200">
                        Brouillons (1)
                      </button>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {getPaginatedData([1, 2, 3, 4, 5], currentPage, itemsPerPage).map((item) => (
                      <div key={item} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="w-full sm:w-32 h-24 bg-gray-200 rounded-md overflow-hidden">
                            <img
                              src={item % 2 === 0 ? "/riad-retreat.png" : "/modern-moroccan-living.png"}
                              alt="Propriété"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium">
                                {item % 2 === 0
                                  ? "Riad traditionnel dans la médina"
                                  : "Appartement moderne au centre ville"}
                              </h3>
                              <span
                                className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                                  item % 3 === 0 ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                                }`}
                              >
                                {item % 3 === 0 ? "En attente" : "Actif"}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              {item % 2 === 0 ? "Marrakech, Médina" : "Casablanca, Maarif"}
                            </p>
                            <div className="flex justify-between items-end mt-2">
                              <div className="flex items-center text-sm text-gray-600">
                                <span className="mr-3">{item % 2 === 0 ? "4" : "3"} chambres</span>
                                <span>{item % 2 === 0 ? "3" : "2"} salles de bain</span>
                              </div>
                              <p className="font-semibold text-[#465baa]">{item % 2 === 0 ? "8 200" : "5 500"} DH/mois</p>
                            </div>

                            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                              <div className="flex space-x-3 text-xs text-gray-500">
                                <span>Vues: {item * 45}</span>
                                <span>Favoris: {item * 3}</span>
                                <span>Demandes: {item}</span>
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleViewProperty(item)}
                                  className="text-gray-600 hover:text-gray-800 px-2 py-1 text-sm hover:bg-gray-100 rounded transition-colors"
                                >
                                  Voir
                                </button>
                                <button
                                  onClick={() => handleEditProperty(item)}
                                  className="text-[#465baa] hover:text-[#465baa]/80 px-2 py-1 text-sm hover:bg-[#465baa]/10 rounded transition-colors"
                                >
                                  Modifier
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(item)}
                                  className="text-red-500 hover:text-red-700 px-2 py-1 text-sm hover:bg-red-50 rounded transition-colors"
                                >
                                  Supprimer
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-4 py-4 sm:px-6 border-t border-gray-200 bg-gray-50">
                    <nav className="flex justify-center" aria-label="Pagination">
                      <button
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        <span className="sr-only">Précédent</span>
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>

                      {[...Array(getTotalPages(5, itemsPerPage))].map((_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => handlePageChange(index + 1)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === index + 1
                              ? "z-10 bg-[#465baa] border-[#465baa] text-white"
                              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}

                      <button
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                        disabled={currentPage === getTotalPages(5, itemsPerPage)}
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        <span className="sr-only">Suivant</span>
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              )}

              {/* Garder le contenu existant pour l'édition de propriété */}
              {activeSection === "annonces" && editingProperty && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  {/* Contenu existant pour l'édition de propriété */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                      <button
                        onClick={handleCancelEdit}
                        className="mr-3 p-2 rounded-full hover:bg-gray-100"
                        aria-label="Retour"
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </button>
                      <h2 className="text-xl font-semibold">Modifier la propriété #{editingProperty}</h2>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={handleSaveProperty}
                        className="px-4 py-2 bg-[#465baa] text-white rounded-md hover:bg-[#465baa]/90 flex items-center"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Enregistrer
                      </button>
                    </div>
                  </div>

                  {/* Garder le reste du contenu d'édition de propriété */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Colonne de gauche - Informations principales */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Titre de l'annonce
                          </label>
                          <input
                            type="text"
                            id="title"
                            name="title"
                            value={propertyForm.title}
                            onChange={handleFormChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#465baa] focus:border-transparent"
                            placeholder="Titre attractif pour votre propriété"
                          />
                        </div>

                        <div>
                          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                            Emplacement
                          </label>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            value={propertyForm.location}
                            onChange={handleFormChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#465baa] focus:border-transparent"
                            placeholder="Ville, Quartier"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                              Prix (DH/mois)
                            </label>
                            <input
                              type="text"
                              id="price"
                              name="price"
                              value={propertyForm.price}
                              onChange={handleFormChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#465baa] focus:border-transparent"
                              placeholder="Prix"
                            />
                          </div>

                          <div>
                            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
                              Chambres
                            </label>
                            <input
                              type="number"
                              id="bedrooms"
                              name="bedrooms"
                              value={propertyForm.bedrooms}
                              onChange={handleFormChange}
                              min="0"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#465baa] focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">
                              Salles de bain
                            </label>
                            <input
                              type="number"
                              id="bathrooms"
                              name="bathrooms"
                              value={propertyForm.bathrooms}
                              onChange={handleFormChange}
                              min="0"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#465baa] focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            value={propertyForm.description}
                            onChange={handleFormChange}
                            rows={5}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#465baa] focus:border-transparent"
                            placeholder="Description détaillée de votre propriété"
                          ></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
                              Type de propriété
                            </label>
                            <select
                              id="propertyType"
                              name="propertyType"
                              value={propertyForm.propertyType}
                              onChange={handleFormChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#465baa] focus:border-transparent"
                            >
                              <option value="apartment">Appartement</option>
                              <option value="house">Maison</option>
                              <option value="riad">Riad</option>
                              <option value="villa">Villa</option>
                              <option value="studio">Studio</option>
                              <option value="duplex">Duplex</option>
                            </select>
                          </div>

                          <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                              Statut
                            </label>
                            <select
                              id="status"
                              name="status"
                              value={propertyForm.status}
                              onChange={handleFormChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#465baa] focus:border-transparent"
                            >
                              <option value="active">Actif</option>
                              <option value="pending">En attente</option>
                              <option value="draft">Brouillon</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Section des commodités */}
                      <div>
                        <h3 className="text-lg font-medium mb-3">Commodités</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {availableAmenities.map((amenity) => (
                            <div key={amenity} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`amenity-${amenity}`}
                                checked={propertyForm.amenities.includes(amenity)}
                                onChange={() => handleAmenityToggle(amenity)}
                                className="h-4 w-4 text-[#465baa] border-gray-300 rounded focus:ring-[#465baa]"
                              />
                              <label htmlFor={`amenity-${amenity}`} className="ml-2 text-sm text-gray-700">
                                {amenity}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Section des images */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-lg font-medium">Images</h3>
                          <button
                            onClick={handleAddImage}
                            className="flex items-center text-sm text-[#465baa] hover:text-[#465baa]/80"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Ajouter une image
                          </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {propertyImages.map((image, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                                <img
                                  src={image || "/placeholder.svg"}
                                  alt={`Image ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <button
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label="Supprimer l'image"
                              >
                                <Trash className="h-4 w-4 text-red-500" />
                              </button>
                            </div>
                          ))}

                          <>
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleFileChange}
                              accept="image/*"
                              className="hidden"
                              aria-label="Télécharger une image"
                            />
                            <div
                              onClick={handleAddImage}
                              className="aspect-video bg-gray-100 rounded-md border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                            >
                              <Upload className="h-6 w-6 text-gray-400 mb-2" />
                              <span className="text-sm text-gray-500">Ajouter</span>
                            </div>
                          </>
                        </div>
                      </div>
                    </div>

                    {/* Colonne de droite - Prévisualisation */}
                    <div className="lg:col-span-1">
                      <div className="sticky top-6">
                        <h3 className="text-lg font-medium mb-3">Prévisualisation</h3>
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <div className="aspect-video bg-gray-100 relative">
                            {propertyImages.length > 0 ? (
                              <img
                                src={propertyImages[0] || "/placeholder.svg"}
                                alt="Image principale"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                Aucune image
                              </div>
                            )}
                            <div className="absolute bottom-3 right-3 bg-white/80 px-2 py-1 rounded text-xs">
                              {propertyImages.length} photo{propertyImages.length !== 1 ? "s" : ""}
                            </div>
                          </div>

                          <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-gray-900">
                                {propertyForm.title || "Titre de la propriété"}
                              </h4>
                              <span
                                className={`text-xs font-medium px-2 py-1 rounded-full ${
                                  propertyForm.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : propertyForm.status === "pending"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {propertyForm.status === "active"
                                  ? "Actif"
                                  : propertyForm.status === "pending"
                                    ? "En attente"
                                    : "Brouillon"}
                              </span>
                            </div>

                            <p className="text-sm text-gray-500 mb-3">{propertyForm.location || "Emplacement"}</p>

                            <div className="flex items-center text-sm text-gray-600 mb-3">
                              <span className="mr-3">{propertyForm.bedrooms || "0"} chambres</span>
                              <span>{propertyForm.bathrooms || "0"} salles de bain</span>
                            </div>

                            <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                              {propertyForm.description || "Description de la propriété..."}
                            </p>

                            <div className="flex flex-wrap gap-1 mb-3">
                              {propertyForm.amenities.slice(0, 3).map((amenity) => (
                                <span key={amenity} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                                  {amenity}
                                </span>
                              ))}
                              {propertyForm.amenities.length > 3 && (
                                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                                  +{propertyForm.amenities.length - 3}
                                </span>
                              )}
                            </div>

                            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                              <p className="font-semibold text-[#465baa]">
                                {propertyForm.price ? `${propertyForm.price} DH/mois` : "Prix"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-medium text-blue-800 mb-2">Conseils pour une annonce efficace</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Utilisez un titre accrocheur et descriptif</li>
                            <li>• Ajoutez des photos de qualité (min. 5 photos)</li>
                            <li>• Détaillez toutes les commodités importantes</li>
                            <li>• Soyez précis sur l'emplacement et les environs</li>
                            <li>• Mentionnez les règles spécifiques si nécessaire</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "reservations" && (
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Réservations</h3>
                    <div className="flex space-x-2">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Rechercher..."
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#465baa] focus:border-transparent text-sm"
                        />
                      </div>
                      <button
                        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                        className={`p-2 rounded-md transition-colors ${
                          showAdvancedFilters ? "bg-[#465baa]/10 text-[#465baa]" : "hover:bg-gray-100 text-gray-500"
                        }`}
                        aria-label="Filtres avancés"
                        title="Filtres avancés"
                      >
                        <Filter className={`h-5 w-5 ${showAdvancedFilters ? "text-[#465baa]" : "text-gray-500"}`} />
                      </button>
                    </div>
                  </div>

                  <div className="px-4 py-3 sm:px-6 border-b border-gray-200 bg-gray-50">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setActiveFilter("all")}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center ${
                          activeFilter === "all"
                            ? "bg-[#465baa] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <span className="mr-1.5 flex h-2 w-2 rounded-full bg-white"></span>
                        Toutes ({reservations.length})
                      </button>
                      <button
                        onClick={() => setActiveFilter("pending")}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center ${
                          activeFilter === "pending"
                            ? "bg-blue-600 text-white"
                            : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                        }`}
                      >
                        <span className="mr-1.5 flex h-2 w-2 rounded-full bg-blue-200"></span>
                        En attente ({pendingCount})
                      </button>
                      <button
                        onClick={() => setActiveFilter("accepted")}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center ${
                          activeFilter === "accepted"
                            ? "bg-green-600 text-white"
                            : "bg-green-50 text-green-700 hover:bg-green-100"
                        }`}
                      >
                        <span className="mr-1.5 flex h-2 w-2 rounded-full bg-green-200"></span>
                        Acceptées ({acceptedCount})
                      </button>
                      <button
                        onClick={() => setActiveFilter("rejected")}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center ${
                          activeFilter === "rejected"
                            ? "bg-red-600 text-white"
                            : "bg-red-50 text-red-700 hover:bg-red-100"
                        }`}
                      >
                        <span className="mr-1.5 flex h-2 w-2 rounded-full bg-red-200"></span>
                        Refusées ({rejectedCount})
                      </button>
                    </div>
                  </div>

                  {/* Panneau de filtres avancés */}
                  {showAdvancedFilters && (
                    <div className="px-4 py-4 sm:px-6 border-b border-gray-200 bg-gray-50 animate-in fade-in-50 duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Période</label>
                          <select
                            className="w-full border border-gray-300 rounded-md p-2 text-sm"
                            value={periodFilter}
                            onChange={(e) => setPeriodFilter(e.target.value)}
                          >
                            <option value="">Toutes les périodes</option>
                            <option value="this-week">Cette semaine</option>
                            <option value="this-month">Ce mois</option>
                            <option value="last-month">Mois dernier</option>
                            <option value="next-month">Mois prochain</option>
                            <option value="custom">Période personnalisée</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Montant</label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              placeholder="Min"
                              className="w-full border border-gray-300 rounded-md p-2 text-sm"
                              value={minAmount}
                              onChange={(e) => setMinAmount(e.target.value)}
                            />
                            <span className="text-gray-500">-</span>
                            <input
                              type="number"
                              placeholder="Max"
                              className="w-full border border-gray-300 rounded-md p-2 text-sm"
                              value={maxAmount}
                              onChange={(e) => setMaxAmount(e.target.value)}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de personnes</label>
                          <select
                            className="w-full border border-gray-300 rounded-md p-2 text-sm"
                            value={personsFilter}
                            onChange={(e) => setPersonsFilter(e.target.value)}
                          >
                            <option value="">Tous</option>
                            <option value="1">1 personne</option>
                            <option value="2">2 personnes</option>
                            <option value="3-4">3-4 personnes</option>
                            <option value="5+">5+ personnes</option>
                          </select>
                        </div>

                        <div className="md:col-span-3 flex justify-end space-x-2 mt-2">
                          <button
                            onClick={resetFilters}
                            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                          >
                            Réinitialiser
                          </button>
                          <button
                            onClick={applyAdvancedFilters}
                            className="px-3 py-1.5 bg-[#465baa] text-white rounded-md text-sm hover:bg-[#465baa]/90"
                          >
                            Appliquer les filtres
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tableau des réservations */}
                  <div className="overflow-x-auto overflow-y-visible">
                    <table className="min-w-full divide-y divide-gray-200 table-fixed">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4"
                          >
                            Propriété
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Locataire
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Dates
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Personnes
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Montant
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Statut
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {getPaginatedData(filteredReservations, currentPage, itemsPerPage).map((reservation) => (
                          <tr
                            key={reservation.id}
                            className={`hover:bg-gray-50 ${
                              reservation.needsAction && reservation.status === "pending"
                                ? "border-l-4 border-blue-400"
                                : ""
                            }`}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-md object-cover"
                                    src={reservation.id % 2 === 0 ? "/riad-retreat.png" : "/modern-moroccan-living.png"}
                                    alt={reservation.property}
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{reservation.property}</div>
                                  <div className="text-sm text-gray-500">{reservation.location}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-8 w-8">
                                  <img
                                    className="h-8 w-8 rounded-full object-cover"
                                    src={reservation.tenantAvatar || "/placeholder.svg"}
                                    alt={reservation.tenant}
                                  />
                                </div>
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-gray-900">{reservation.tenant}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{reservation.dates}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                {reservation.persons} {reservation.persons > 1 ? "personnes" : "personne"}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-[#465baa]">{reservation.amount}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  reservation.status === "pending"
                                    ? "bg-blue-100 text-blue-800"
                                    : reservation.status === "accepted"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                }`}
                              >
                                {reservation.status === "pending"
                                  ? "En attente"
                                  : reservation.status === "accepted"
                                    ? "Acceptée"
                                    : "Refusée"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium relative">
                              <div className="flex space-x-2 z-10">
                                {reservation.status === "pending" && (
                                  <>
                                    <button
                                      onClick={() => handleActionClick("accept", reservation)}
                                      className="bg-green-100 text-green-700 hover:bg-green-200 px-2 py-1 rounded flex items-center whitespace-nowrap"
                                      title="Accepter cette réservation"
                                    >
                                      <Check className="h-3 w-3 mr-1" />
                                      Accepter
                                    </button>
                                    <button
                                      onClick={() => handleActionClick("reject", reservation)}
                                      className="bg-red-100 text-red-700 hover:bg-red-200 px-2 py-1 rounded flex items-center whitespace-nowrap"
                                      title="Refuser cette réservation"
                                    >
                                      <XIcon className="h-3 w-3 mr-1" />
                                      Refuser
                                    </button>
                                  </>
                                )}
                                {reservation.status !== "pending" && (
                                  <span className="text-gray-500 italic">Traité</span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {filteredReservations.length === 0 && (
                    <div className="py-8 text-center">
                      <p className="text-gray-500">Aucune réservation trouvée</p>
                    </div>
                  )}

                  {/* Pagination */}
                  {filteredReservations.length > 0 && (
                    <div className="px-4 py-4 sm:px-6 border-t border-gray-200 bg-gray-50">
                      <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div className="text-sm text-gray-700 mb-4 sm:mb-0">
                          Affichage de{" "}
                          <span className="font-medium">
                            {Math.min((currentPage - 1) * itemsPerPage + 1, filteredReservations.length)}
                          </span>{" "}
                          à{" "}
                          <span className="font-medium">
                            {Math.min(currentPage * itemsPerPage, filteredReservations.length)}
                          </span>{" "}
                          sur <span className="font-medium">{filteredReservations.length}</span> réservations
                        </div>

                        <nav className="flex items-center space-x-2" aria-label="Pagination">
                          <button
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                          >
                            <span className="sr-only">Précédent</span>
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>

                          {[...Array(getTotalPages(filteredReservations.length, itemsPerPage))].map((_, index) => (
                            <button
                              key={index + 1}
                              onClick={() => handlePageChange(index + 1)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                currentPage === index + 1
                                  ? "z-10 bg-[#465baa] border-[#465baa] text-white"
                                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              {index + 1}
                            </button>
                          ))}

                          <button
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                            disabled={currentPage === getTotalPages(filteredReservations.length, itemsPerPage)}
                            onClick={() => handlePageChange(currentPage + 1)}
                          >
                            <span className="sr-only">Suivant</span>
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </nav>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeSection === "parametres" && (
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Paramètres</h3>
                  </div>

                  <div className="px-4 py-5 sm:p-6 space-y-6">
                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg font-medium mb-4">Profil</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#465baa] focus:border-transparent"
                            defaultValue="Mohammed Alami"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#465baa] focus:border-transparent"
                            defaultValue="m.alami@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                          <input
                            type="tel"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#465baa] focus:border-transparent"
                            defaultValue="+212 6 12 34 56 78"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#465baa] focus:border-transparent"
                            defaultValue="Casablanca"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg font-medium mb-4">Sécurité</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe actuel</label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#465baa] focus:border-transparent"
                            placeholder="••••••••"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#465baa] focus:border-transparent"
                            placeholder="••••••••"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirmer le mot de passe
                          </label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#465baa] focus:border-transparent"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg font-medium mb-4">Préférences de notification</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Nouvelles réservations</p>
                            <p className="text-sm text-gray-500">
                              Recevez une notification lorsqu'une nouvelle réservation est effectuée
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#465baa]"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Messages</p>
                            <p className="text-sm text-gray-500">
                              Recevez une notification lorsqu'un nouveau message arrive
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#465baa]"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">Annuler</button>
                      <button className="px-4 py-2 bg-[#465baa] text-white rounded-md hover:bg-[#465baa]/90">
                        Enregistrer les modifications
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
