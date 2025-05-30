import { useState, useEffect, useCallback, ReactNode, useMemo } from "react";
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  FileText,
  Download,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { router, usePage } from "@inertiajs/react";
import { useNotifications } from "@/contexts/notifications-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
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
  created_at: string;
  admin_id: number;
  updated_at: string;
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
  status: "approved" | "pending" | "rejected" | "expired";
  commodites: {
    id: number;
    commodite: string;
    categorie: string;
  }[];
};
export function Adminproprietes() {

// Extended property type for admin features
  const { proprietes } = usePage<{ proprietes: Propriete[] }>().props || { proprietes: [] };
  console.log('proprietes data:', proprietes);


// Convert the existing proprietes to admin proprietes
  const adminproprietes: Propriete[] = (proprietes || []).map((property, index) => {
  // Generate random status based on index
  const statuses: Propriete["status"][] = ["approved", "pending", "rejected", "expired"];
  const status = statuses[index % 5];
  // Generate dates
  const createdAt = new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString();
  const updatedAt = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString();

  return {
    id: property.id,
    loueur_id: property.loueur_id,
    titre: property.titre,
    localisation: property.localisation,
    prixParMois: property.prixParMois,
    imgs: property.imgs,
    description: property.description,
    disponibilite: property.disponibilite,
    type: property.type,
    nbrchambre: property.nbrchambre,
    surface: property.surface,
    adresse: property.adresse,
    created_at: createdAt,
    admin_id: property.admin_id,
    updated_at: updatedAt,
    loueur: property.loueur,
    status: status,
    commodites: property.commodites,
  };
});

  const [searchQuery, setSearchQuery] = useState("")
  const [proprietesUpadte, setproprietes] = useState<Propriete[]>(proprietes);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    priceRange: { min: 0, max: 20000 },
    bedrooms: { min: 0, max: 10 },
    area: { min: 0, max: 500 },
    featured: false,
  });

  const { addNotification } = useNotifications();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<Propriete | null>(null);
  const [deleteState, setDeleteState] = useState({ id: 0, loading: false });

  // Reset function to clean up state
  const resetDeleteState = useCallback(() => {
    setIsDeleteDialogOpen(false);
    setPropertyToDelete(null);
    setDeleteState({ id: 0, loading: false });
    document.body.style.cursor = "default";
  }, []);

  // Filter proprietes based on search query and filters
  const filteredproprietes = useMemo(() => {
      if (!proprietes || !Array.isArray(proprietes)) return [];

    return proprietes.filter((property) => {
      // Filter by search query
      if (
        searchQuery &&
        !property.titre.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !property.localisation.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !property.type.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !property.loueur.user.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Filter by status
      if (selectedStatus !== "all" && property.status !== selectedStatus) {
        return false;
      }

      // Filter by property type
      if (selectedType !== "all" && property.type !== selectedType) {
        return false;
      }

      // Advanced filters
      // Price range
      if (property.prixParMois < advancedFilters.priceRange.min || property.prixParMois > advancedFilters.priceRange.max) {
        return false;
      }

      // Bedrooms
      if (property.nbrchambre < advancedFilters.bedrooms.min || property.nbrchambre > advancedFilters.bedrooms.max) {
        return false;
      }

      // Area
      if (property.surface < advancedFilters.area.min || property.surface > advancedFilters.area.max) {
        return false;
      }

      // Featured
      if (advancedFilters.featured && !property.commodites) {
        return false;
      }

      return true;
    });
  }, [proprietes, searchQuery, selectedStatus, selectedType, advancedFilters]);
  if (!proprietes || !Array.isArray(proprietes)) return [];

  // Get unique property types
  const propertyTypes = useMemo(() => Array.from(new Set(proprietes.map((p) => p.type))), [proprietes]);

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectedItems.length === filteredproprietes.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredproprietes.map((p) => p.id));
    }
  };
  // Handle individual checkbox
  const handleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  // Get status badge
  const getStatusBadge = (status: Propriete["status"]) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Validée
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="h-3 w-3 mr-1" />
            En attente
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="h-3 w-3 mr-1" />
            Refusée
          </Badge>
        );
      
      case "expired":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            <Calendar className="h-3 w-3 mr-1" />
            Expirée
          </Badge>
        );
    }
  };

  // View property details
  const handleViewProperty = (id: number) => {
    router.visit(`/property/${id}`);
    addNotification({
      title: "Affichage de la propriété",
      message: "Redirection vers la page de détails de la propriété",
      type: "info",
    });
  };

  // Edit property
  const handleEditProperty = (id: number) => {
    router.visit(`/admin/proprietes/edit/${id}`);
    addNotification({
      title: "Modification de la propriété",
      message: "Redirection vers le formulaire d'édition",
      type: "info",
    });
  };

  // Open delete confirmation dialog
  const openDeleteDialog = (property: Propriete) => {
    if (deleteState.loading) return;
    setPropertyToDelete(property);
    setIsDeleteDialogOpen(true);
  };

  // Delete property - Simplified and more robust implementation
  const handleDeleteProperty = async () => {
    if (!propertyToDelete || deleteState.loading) return;

    setDeleteState({ id: propertyToDelete.id, loading: true });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create a new array without the deleted property
      const updatedproprietes = proprietes.filter((p) => p.id !== propertyToDelete.id);

      // Update the state with the new array
      setproprietes(updatedproprietes);

      // Clear selected items that might reference the deleted property
      const updatedSelectedItems = selectedItems.filter((id) => id !== propertyToDelete.id);
      setSelectedItems(updatedSelectedItems);

      // Show success notification
      addNotification({
        title: "Propriété supprimée",
        message: "La propriété a été supprimée avec succès",
        type: "success",
      });
    } catch (error) {
      console.error("Error deleting property:", error);

      // Show error notification
      addNotification({
        title: "Erreur",
        message: "Une erreur est survenue lors de la suppression de la propriété",
        type: "error",
      });
    } finally {
      // Always reset state regardless of success or failure
      resetDeleteState();
    }
  };

  // Approve property
  const handleApproveProperty = (id: number) => {
    setDeleteState({ id, loading: true });

    // Simulate API call
    setTimeout(() => {
      setproprietes(proprietes.map((p) => (p.id === id ? { ...p, status: "approved" } : p)));
      setDeleteState({ id: 0, loading: false });

      addNotification({
        title: "Propriété approuvée",
        message: "La propriété a été approuvée avec succès",
        type: "success",
      });
    }, 1000);
  };

  // Reject property
  const handleRejectProperty = (id:number ) => {
    setDeleteState({ id, loading: true });

    // Simulate API call
    setTimeout(() => {
      setproprietes(proprietes.map((p) => (p.id === id ? { ...p, status: "rejected" } : p)));
      setDeleteState({ id: 0, loading: false });

      addNotification({
        title: "Propriété rejetée",
        message: "La propriété a été rejetée",
        type: "warning",
      });
    }, 1000);
  };

  // Export proprietes
  const handleExport = () => {
    setDeleteState({ id: 0, loading: true });

    // Simulate export process
    setTimeout(() => {
      setDeleteState({ id: 0, loading: false });
      addNotification({
        title: "Export réussi",
        message: "Les données ont été exportées au format CSV",
        type: "success",
      });
    }, 1500);
  };

  // Refresh proprietes
  const handleRefresh = () => {
    setDeleteState({ id: 0, loading: true });

    // Simulate refresh
    setTimeout(() => {
      setDeleteState({ id: 0, loading: false });
      addNotification({
        title: "Données actualisées",
        message: "La liste des propriétés a été mise à jour",
        type: "success",
      });
    }, 1000);
  };

  // Add new property
  const handleAddProperty = () => {
    router.visit("/deposer-annonce");
  };

  const handleApplyAdvancedFilters = (filters: typeof advancedFilters) => {
    setAdvancedFilters(filters);
    setIsAdvancedFiltersOpen(false);

    // Apply the filters
    addNotification({
      title: "Filtres appliqués",
      message: "Les filtres avancés ont été appliqués avec succès",
      type: "success",
    });
  };

  // Ensure cleanup on component unmount
  useEffect(() => {
    return () => {
      // Reset any loading states and cursor when component unmounts
      setDeleteState({ id: 0, loading: false });
      document.body.style.cursor = "default";
    };
  }, []);

  // Add error handling for unhandled exceptions
  useEffect(() => {
    
    const handleError = () => {
      // Reset states on error
      setDeleteState({ id: 0, loading: false });
      setIsDeleteDialogOpen(false);
      document.body.style.cursor = "default";
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleError);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleError);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des propriétés</h1>
          <p className="text-muted-foreground">Gérez toutes les propriétés de la plateforme E-JAR</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex" onClick={handleExport} disabled={deleteState.loading}>
            {deleteState.loading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
            Exporter
          </Button>
          <Button size="sm" className="bg-[#465baa] hover:bg-[#465baa]/90" onClick={handleAddProperty}>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une propriété
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher par titre, lieu, type ou propriétaire..."
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
                <SelectItem value="approved">Validées</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="rejected">Refusées</SelectItem>
                <SelectItem value="draft">Brouillons</SelectItem>
                <SelectItem value="expired">Expirées</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type de propriété" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                {propertyTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
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
                        checked={selectedItems.length === filteredproprietes.length && filteredproprietes.length > 0}
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all"
                      />
                      <span>Propriété</span>
                    </div>
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Type</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Prix</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Propriétaire</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Statut</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Date</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredproprietes.length > 0 ? (
                  filteredproprietes.map((property) => (
                    <motion.tr
                      key={property.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={selectedItems.includes(property.id)}
                            onCheckedChange={() => handleSelectItem(property.id)}
                            aria-label={`Select ${property.titre}`}
                          />
                          <div className="h-12 w-12 relative rounded-md overflow-hidden">
                            <img
                              src={property.imgs[2] || "/placeholder.svg"}
                              alt={property.titre}
                              className="object-cover w-full h-full"
                            />
                         
                          </div>
                          <div>
                            <div className="font-medium">{property.titre}</div>
                            <div className="text-xs text-gray-500">{property.localisation}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <Badge variant="outline">{property.type}</Badge>
                      </td>
                      <td className="p-4 align-middle font-medium">{property.prixParMois} MAD/mois</td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 relative rounded-full overflow-hidden">
                            <img
                              src={property.loueur.user.profile || "/placeholder.svg"}
                              alt={property.loueur.user.name}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="text-sm">{property.loueur.user.name}</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">{getStatusBadge(property.status)}</td>
                      <td className="p-4 align-middle text-sm text-gray-500">{formatDate(property.created_at)}</td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleViewProperty(property.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleEditProperty(property.id)}
                          >
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
                              <DropdownMenuItem onClick={() => handleApproveProperty(property.id)}>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approuver
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleRejectProperty(property.id)}>
                                <XCircle className="h-4 w-4 mr-2" />
                                Rejeter
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleViewProperty(property.id)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Voir les détails
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600" onClick={() => openDeleteDialog(property)}>
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
                    <td colSpan={7} className="p-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="rounded-full bg-gray-100 p-3 mb-3">
                          <Search className="h-6 w-6 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium">Aucune propriété trouvée</h3>
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
            Affichage de {filteredproprietes.length} sur {proprietes.length} propriétés
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Précédent
            </Button>
            <Button variant="outline" size="sm" className="bg-[#465baa]/10">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Suivant
            </Button>
          </div>
        </div>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            resetDeleteState();
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer la propriété "{propertyToDelete?.titre}" ? Cette action est
              irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={resetDeleteState} disabled={deleteState.loading}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteProperty} disabled={deleteState.loading}>
              {deleteState.loading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Suppression...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Advanced Filters Dialog */}
      <Dialog open={isAdvancedFiltersOpen} onOpenChange={setIsAdvancedFiltersOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Filtres avancés</DialogTitle>
            <DialogDescription>Affinez votre recherche avec des filtres supplémentaires.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Fourchette de prix (MAD/mois)</h3>
              <div className="flex items-center gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price-min">Min</Label>
                  <Input
                    id="price-min"
                    type="number"
                    placeholder="0"
                    defaultValue={advancedFilters.priceRange.min}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value);
                      setAdvancedFilters({
                        ...advancedFilters,
                        priceRange: { ...advancedFilters.priceRange, min: isNaN(value) ? 0 : value },
                      });
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price-max">Max</Label>
                  <Input
                    id="price-max"
                    type="number"
                    placeholder="20000"
                    defaultValue={advancedFilters.priceRange.max}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value);
                      setAdvancedFilters({
                        ...advancedFilters,
                        priceRange: { ...advancedFilters.priceRange, max: isNaN(value) ? 20000 : value },
                      });
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Chambres</h3>
              <div className="flex items-center gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="bedrooms-min">Min</Label>
                  <Input
                    id="bedrooms-min"
                    type="number"
                    placeholder="0"
                    defaultValue={advancedFilters.bedrooms.min}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value);
                      setAdvancedFilters({
                        ...advancedFilters,
                        bedrooms: { ...advancedFilters.bedrooms, min: isNaN(value) ? 0 : value },
                      });
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bedrooms-max">Max</Label>
                  <Input
                    id="bedrooms-max"
                    type="number"
                    placeholder="10"
                    defaultValue={advancedFilters.bedrooms.max}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value);
                      setAdvancedFilters({
                        ...advancedFilters,
                        bedrooms: { ...advancedFilters.bedrooms, max: isNaN(value) ? 10 : value },
                      });
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Surface (m²)</h3>
              <div className="flex items-center gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="area-min">Min</Label>
                  <Input
                    id="area-min"
                    type="number"
                    placeholder="0"
                    defaultValue={advancedFilters.area.min}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value);
                      setAdvancedFilters({
                        ...advancedFilters,
                        area: { ...advancedFilters.area, min: isNaN(value) ? 0 : value },
                      });
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="area-max">Max</Label>
                  <Input
                    id="area-max"
                    type="number"
                    placeholder="500"
                    defaultValue={advancedFilters.area.max}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value);
                      setAdvancedFilters({
                        ...advancedFilters,
                        area: { ...advancedFilters.area, max: isNaN(value) ? 500 : value },
                      });
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={advancedFilters.featured}
                onCheckedChange={(checked) => {
                  setAdvancedFilters({
                    ...advancedFilters,
                    featured: checked === true,
                  });
                }}
              />
              <Label htmlFor="featured">Afficher uniquement les propriétés en vedette</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAdvancedFiltersOpen(false)}>
              Annuler
            </Button>
            <Button onClick={() => handleApplyAdvancedFilters(advancedFilters)}>Appliquer les filtres</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


export default Adminproprietes;
