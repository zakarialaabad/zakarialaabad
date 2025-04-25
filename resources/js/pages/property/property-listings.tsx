import { useState, useEffect, useMemo, useCallback } from "react";
import { PropertyCard } from "@/components/property-card";
import { FavoritesProvider } from "@/contexts/favorites-context";
import { AuthProvider } from "@/contexts/auth-context";
import { useMediaQuery } from "@/utils/responsive-utils";
import { Pagination } from "@/components/ui/pagination"; // Ensure this path is correct
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Grid3X3, Grid2X2, Filter, Search, Home, Building, Building2, Warehouse, MapPin, Bed } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterSidebar } from "@/components/filter-sidebar";
import type { SearchFilters } from "@/components/search-filters";
import { generateText, openai } from "@/lib/openai";
import { HorizontalFilterBar } from "@/components/horizontal-filter-bar";
import { allProperties } from "@/data/properties"; // Importation depuis le fichier séparé

export default function PropertyListings() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [currentPage, setCurrentPage] = useState(1);
  const [gridView, setGridView] = useState<"grid3" | "grid2">("grid3");
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState<string>("location");
  const [filters, setFilters] = useState<SearchFilters>({
    city: "",
    district: "",
    propertyType: "tout",
    tenantType: "tous",
    bedrooms: 0,
    minPrice: 500,
    maxPrice: 3000,
    minArea: 20,
    maxArea: 150,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCriteria, setSearchCriteria] = useState<any>(null);
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [searchAnimation, setSearchAnimation] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  // Définition des filtres pour la barre horizontale - Mémorisé pour éviter des re-rendus inutiles
  const filterItems = useMemo(
    () => [
      { id: "all", label: "Tous", icon: <Home className="h-5 w-5" strokeWidth={1} /> },
      { id: "apartment", label: "Appartement", icon: <Building className="h-5 w-5" strokeWidth={1} /> },
      { id: "house", label: "Maison", icon: <Home className="h-5 w-5" strokeWidth={1} /> },
      { id: "garconniere", label: "Garçonnière", icon: <Building2 className="h-5 w-5" strokeWidth={1} /> },
      { id: "studio", label: "Studio", icon: <Building2 className="h-5 w-5" strokeWidth={1} /> },
      { id: "villa", label: "Villa", icon: <Home className="h-5 w-5" strokeWidth={1} /> },
      { id: "bureau", label: "Bureau", icon: <Building className="h-5 w-5" strokeWidth={1} /> },
      { id: "garage", label: "Garage", icon: <Warehouse className="h-5 w-5" strokeWidth={1} /> },
      { id: "depot", label: "Dépôt", icon: <Warehouse className="h-5 w-5" strokeWidth={1} /> },
      { id: "duplex", label: "Duplex", icon: <Building className="h-5 w-5" strokeWidth={1} /> },
      { id: "loft", label: "Loft", icon: <Building2 className="h-5 w-5" strokeWidth={1} /> },
    ],
    []
  );

  // Gérer le changement de filtre - Optimisé avec useCallback
  const handleFilterChange = useCallback(
    (filterId: string) => {
      setActiveFilter(filterId);
      setIsLoading(true);
      // Filtrer les propriétés en fonction du filtre sélectionné
      setTimeout(() => {
        let filtered = [...allProperties];
        if (filterId !== "all") {
          // Filtrer par type de propriété
          const propertyTypeMap: Record<string, string> = {
            apartment: "Appartement",
            house: "Maison",
            garconniere: "Garçonnière",
            studio: "Studio",
            villa: "Villa",
            bureau: "Bureau",
            garage: "Garage",
            depot: "Dépôt",
            duplex: "Duplex",
            loft: "Loft",
          };

          if (propertyTypeMap[filterId]) {
            filtered = allProperties.filter(
              (p) => p.propertyType.toLowerCase() === propertyTypeMap[filterId]?.toLowerCase()
            );
          }
        }

        // Appliquer les filtres de ville et de quartier
        if (filters.city) {
          filtered = filtered.filter((p) => p.city === filters.city.toLowerCase());

          // Si un quartier spécifique est sélectionné, filtrer davantage
          if (filters.district) {
            filtered = filtered.filter((p) => p.district === filters.district);
          }
          // Sinon, tous les logements de la ville sont déjà filtrés
        }

        if (filters.bedrooms > 0) {
          filtered = filtered.filter((p) => p.bedrooms >= filters.bedrooms);
        }

        if (filters.minPrice > 500) {
          filtered = filtered.filter((p) => p.price >= filters.minPrice);
        }

        if (filters.maxPrice < 3000) {
          filtered = filtered.filter((p) => p.price <= filters.maxPrice);
        }

        // Appliquer les filtres de surface
        if (filters.minArea && filters.minArea > 20) {
          filtered = filtered.filter((p) => p.area >= filters.minArea!);
        }

        if (filters.maxArea && filters.maxArea < 150) {
          filtered = filtered.filter((p) => p.area <= filters.maxArea!);
        }

        // Appliquer le filtre de type de locataire
        if (filters.tenantType && filters.tenantType !== "tous") {
          filtered = filtered.filter((p) => p.tenantType === filters.tenantType);
        }

        setFilteredProperties(filtered);
        setIsLoading(false);
        setCurrentPage(1); // Réinitialiser la pagination
      }, 300); // Réduit de 500ms à 300ms pour une meilleure réactivité
    },
    [filters]
  );

  // Effet pour filtrer les propriétés en fonction des critères de recherche
  useEffect(() => {
    if (!searchCriteria) {
      // Appliquer uniquement les filtres standards
      let filtered = [...allProperties];

      if (filters.city) {
        filtered = filtered.filter((p) => p.city === filters.city.toLowerCase());

        // Si un quartier spécifique est sélectionné, filtrer davantage
        if (filters.district) {
          filtered = filtered.filter((p) => p.district === filters.district);
        }
        // Sinon, tous les logements de la ville sont déjà filtrés
      }

      if (filters.propertyType && filters.propertyType !== "tout") {
        filtered = filtered.filter((p) => p.propertyType.toLowerCase() === filters.propertyType.toLowerCase());
      }

      if (filters.tenantType && filters.tenantType !== "tous") {
        filtered = filtered.filter((p) => p.tenantType === filters.tenantType);
      }

      if (filters.bedrooms > 0) {
        // Si l'utilisateur sélectionne 5+, montrer toutes les propriétés avec 5 chambres ou plus
        if (filters.bedrooms === 5) {
          filtered = filtered.filter((p) => p.bedrooms >= 5);
        } else {
          // Pour les autres valeurs, montrer exactement ce nombre de chambres
          filtered = filtered.filter((p) => p.bedrooms === filters.bedrooms);
        }
      }

      if (filters.minPrice > 500) {
        filtered = filtered.filter((p) => p.price >= filters.minPrice);
      }

      if (filters.maxPrice < 3000) {
        filtered = filtered.filter((p) => p.price <= filters.maxPrice);
      }

      // Appliquer les filtres de surface
      if (filters.minArea && filters.minArea > 20) {
        filtered = filtered.filter((p) => p.area >= filters.minArea!);
      }

      if (filters.maxArea && filters.maxArea < 150) {
        filtered = filtered.filter((p) => p.area <= filters.maxArea!);
      }

      setFilteredProperties(filtered);
      return;
    }

    setIsLoading(true);
    setSearchAnimation(true);

    // Filtrer les propriétés en fonction des critères de recherche
    const filtered = allProperties.filter((property) => {
      let matches = true;

      // Filtrer par type de propriété
      if (searchCriteria.type && searchCriteria.type !== "tout") {
        const propertyTypeMatch = property.propertyType.toLowerCase().includes(searchCriteria.type.toLowerCase());
        matches = matches && propertyTypeMatch;
      }

      // Filtrer par emplacement
      if (searchCriteria.location) {
        const locationMatch = property.location.toLowerCase().includes(searchCriteria.location.toLowerCase());
        matches = matches && locationMatch;
      }

      // Filtrer par prix
      if (searchCriteria.minPrice) {
        matches = matches && property.price >= searchCriteria.minPrice;
      }
      if (searchCriteria.maxPrice) {
        matches = matches && property.price <= searchCriteria.maxPrice;
      }

      // Filtrer par nombre de chambres
      if (searchCriteria.bedrooms) {
        matches = matches && property.bedrooms >= searchCriteria.bedrooms;
      }

      // Filtrer par caractéristiques
      if (searchCriteria.features && searchCriteria.features.length > 0) {
        const hasFeature = searchCriteria.features.some(
          (feature: string) =>
            property.title.toLowerCase().includes(feature.toLowerCase()) ||
            property.location.toLowerCase().includes(feature.toLowerCase())
        );
        matches = matches && hasFeature;
      }

      // Filtrer par mots-clés
      if (searchCriteria.keywords && searchCriteria.keywords.length > 0) {
        const hasKeyword = searchCriteria.keywords.some(
          (keyword: string) =>
            property.title.toLowerCase().includes(keyword.toLowerCase()) ||
            property.location.toLowerCase().includes(keyword.toLowerCase()) ||
            property.propertyType.toLowerCase().includes(keyword.toLowerCase())
        );
        matches = matches && hasKeyword;
      }

      // Appliquer les filtres standards en plus des critères de recherche
      if (filters.city) {
        matches = matches && property.city === filters.city.toLowerCase();
      }

      if (filters.district) {
        matches = matches && property.district === filters.district;
      }

      if (filters.propertyType && filters.propertyType !== "tout") {
        matches = matches && property.propertyType.toLowerCase() === filters.propertyType.toLowerCase();
      }

      if (filters.tenantType && filters.tenantType !== "tous") {
        matches = matches && property.tenantType === filters.tenantType;
      }

      if (filters.bedrooms > 0) {
        matches = matches && property.bedrooms >= filters.bedrooms;
      }

      if (filters.minPrice > 500) {
        matches = matches && property.price >= filters.minPrice;
      }

      if (filters.maxPrice < 3000) {
        matches = matches && property.price <= filters.maxPrice;
      }

      // Appliquer les filtres de surface
      if (filters.minArea && filters.minArea > 20) {
        matches = matches && property.area >= filters.minArea!;
      }

      if (filters.maxArea && filters.maxArea < 150) {
        matches = matches && property.area <= filters.maxArea!;
      }

      return matches;
    });

    setTimeout(() => {
      setFilteredProperties(filtered);
      setIsLoading(false);
      setSearchAnimation(false);
      // Réinitialiser la page courante
      setCurrentPage(1);
    }, 500); // Réduit de 800ms à 500ms
  }, [searchCriteria, filters]);

  // Calculer le nombre de propriétés par page en fonction de la vue
  const propertiesPerPage = gridView === "grid3" ? 9 : 8;

  // Calculer le nombre total de pages - Mémorisé pour éviter des calculs inutiles
  const totalPages = useMemo(
    () => Math.ceil(filteredProperties.length / propertiesPerPage),
    [filteredProperties.length, propertiesPerPage]
  );

  // Obtenir les propriétés pour la page actuelle - Mémorisé pour éviter des calculs inutiles
  const currentProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * propertiesPerPage;
    const endIndex = startIndex + propertiesPerPage;
    return filteredProperties.slice(startIndex, endIndex);
  }, [filteredProperties, currentPage, propertiesPerPage]);

  // Gérer le changement de page - Optimisé avec useCallback
  const handlePageChange = useCallback(
    (page: number) => {
      // S'assurer que la page est dans les limites
      if (page < 1) page = 1;
      if (page > totalPages) page = totalPages;

      setCurrentPage(page);

      // Faire défiler vers le haut de la liste
      window.scrollTo({
        top: document.getElementById("property-listings")?.offsetTop || 0,
        behavior: "smooth",
      });
    },
    [totalPages]
  );

  // Changer la vue de la grille - Optimisé avec useCallback
  const toggleGridView = useCallback(() => {
    setGridView((prev) => (prev === "grid3" ? "grid2" : "grid3"));
  }, []);

  // Gérer l'ouverture des filtres - Optimisé avec useCallback
  const handleOpenFilters = useCallback((tab?: string) => {
    if (tab) {
      setActiveFilterTab(tab);
    }
    setIsFilterSidebarOpen(true);
  }, []);

  // Gérer la fermeture des filtres - Optimisé avec useCallback
  const handleCloseFilters = useCallback(() => {
    setIsFilterSidebarOpen(false);
  }, []);

  // Gérer l'application des filtres - Optimisé avec useCallback
  const handleApplyFilters = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
    setIsLoading(true);

    // Appliquer les filtres
    setTimeout(() => {
      let filtered = [...allProperties];

      if (newFilters.city) {
        filtered = filtered.filter((p) => p.city === newFilters.city.toLowerCase());

        // Si un quartier spécifique est sélectionné, filtrer davantage
        if (newFilters.district) {
          filtered = filtered.filter((p) => p.district === newFilters.district);
        }
        // Sinon, tous les logements de la ville sont déjà filtrés
      }

      if (newFilters.propertyType && newFilters.propertyType !== "tout") {
        filtered = filtered.filter((p) => p.propertyType.toLowerCase() === newFilters.propertyType.toLowerCase());
      }

      if (newFilters.tenantType && newFilters.tenantType !== "tous") {
        filtered = filtered.filter((p) => p.tenantType === newFilters.tenantType);
      }

      // Filtre de chambres - Vérifier si c'est exactement le nombre de chambres ou au moins ce nombre
      if (newFilters.bedrooms > 0) {
        // Si l'utilisateur sélectionne 5+, montrer toutes les propriétés avec 5 chambres ou plus
        if (newFilters.bedrooms === 5) {
          filtered = filtered.filter((p) => p.bedrooms >= 5);
        } else {
          // Pour les autres valeurs, montrer exactement ce nombre de chambres
          filtered = filtered.filter((p) => p.bedrooms === newFilters.bedrooms);
        }
      }

      // Filtre de prix - S'assurer que les valeurs min et max sont appliquées correctement
      if (newFilters.minPrice > 500) {
        filtered = filtered.filter((p) => p.price >= newFilters.minPrice);
      }

      if (newFilters.maxPrice < 3000) {
        filtered = filtered.filter((p) => p.price <= newFilters.maxPrice);
      }

      // Filtre de surface - S'assurer que les valeurs min et max sont appliquées correctement
      if (newFilters.minArea && newFilters.minArea > 20) {
        filtered = filtered.filter((p) => p.area >= newFilters.minArea!);
      }

      if (newFilters.maxArea && newFilters.maxArea < 150) {
        filtered = filtered.filter((p) => p.area <= newFilters.maxArea!);
      }

      // Mettre à jour les propriétés filtrées et réinitialiser la pagination
      setFilteredProperties(filtered);
      setIsLoading(false);
      setCurrentPage(1);

      // Ajouter un log pour déboguer
      console.log(`Filtres appliqués: ${JSON.stringify(newFilters)}`);
      console.log(`Nombre de propriétés après filtrage: ${filtered.length}`);
    }, 300);
  }, []);

  // Gérer la recherche par IA - Optimisé avec useCallback
  const handleAISearch = useCallback(async (query: string, aiResults: any) => {
    setSearchQuery(query);
    setIsLoading(true);
    setSearchAnimation(true);

    try {
      // Si aiResults est déjà fourni, l'utiliser directement
      if (aiResults) {
        setSearchCriteria(aiResults);
      } else {
        // Sinon, analyser la requête manuellement
        const { text } = await generateText({
          model: openai("gpt-4o"),
          prompt: `Analyse cette requête de recherche de logement: "${query}".
          Extrais les critères de recherche pertinents sous forme d'un objet JSON avec les propriétés suivantes:
          {
            "type": type de logement (appartement, maison, villa, studio, etc.),
            "location": emplacement ou quartier mentionné,
            "minPrice": prix minimum si mentionné (nombre),
            "maxPrice": prix maximum si mentionné (nombre),
            "bedrooms": nombre de chambres si mentionné (nombre),
            "features": tableau de caractéristiques mentionnées (jardin, terrasse, piscine, etc.),
            "keywords": mots-clés importants pour la recherche
          }
          Renvoie uniquement l'objet JSON, sans autre texte.`,
          maxTokens: 300,
        });

        try {
          const parsedCriteria = JSON.parse(text);
          setSearchCriteria(parsedCriteria);
        } catch (e) {
          console.error("Erreur lors de l'analyse de la réponse JSON:", e);
          // Fallback simple en cas d'erreur de parsing
          setSearchCriteria({ keywords: [query] });
        }
      }
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
      setSearchCriteria({ keywords: [query] });
    }
  }, []);

  // Réinitialiser la recherche - Optimisé avec useCallback
  const resetSearch = useCallback(() => {
    setSearchQuery("");
    setSearchCriteria(null);
  }, []);

  // Compter les filtres actifs - Mémorisé pour éviter des calculs inutiles
  const activeFiltersCount = useMemo(() => {
    return Object.entries(filters).reduce((count, [key, value]) => {
      if (key === "city" && value) count++;
      if (key === "district" && value) count++;
      if (key === "propertyType" && value !== "tout") count++;
      if (key === "tenantType" && value !== "tous") count++;
      if (key === "bedrooms" && value > 0) count++;
      if ((key === "minPrice" && value > 500) || (key === "maxPrice" && value < 3000)) count++;
      if ((key === "minArea" && value > 20) || (key === "maxArea" && value < 150)) count++;
      return count;
    }, 0);
  }, [filters]);

  return (
    <section id="property-listings" className="w-full">
      {/* Header sticky qui contient tous les éléments de filtrage */}
      <div className="sticky top-16 bg-white z-40 border-b">
        <div className="container px-4 md:px-6">
          {/* Espacement supérieur réduit */}
          <div className="h-2"></div>
          {/* Barre de filtrage intégrée */}
          <div className="w-full pb-3">
            <div className="rounded-full overflow-hidden border border-gray-200 text-base md:text-lg bg-white shadow-sm">
              <div className="flex items-center">
                <div
                  className="flex items-center py-3 md:py-3 px-5 md:px-6 flex-1 cursor-pointer hover:bg-black/5 transition-colors border-r"
                  onClick={() => handleOpenFilters("location")}
                >
                  <div className="w-8 md:w-8 h-8 md:h-8 flex-shrink-0 mr-3">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Groupe%2048152-5TxjoGwis5ikzofzLbjKzRpbnMeeNI.png"
                      alt="Localisation"
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-xs md:text-sm text-gray-500 font-medium">Où?</p>
                    <p className="text-sm md:text-base font-medium text-gray-900 truncate">
                      {filters.city
                        ? filters.city.charAt(0).toUpperCase() + filters.city.slice(1)
                        : "Toutes les villes"}
                      {filters.district ? `, ${filters.district}` : ""}
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center py-3 md:py-3 px-5 md:px-6 flex-1 cursor-pointer hover:bg-black/5 transition-colors border-r"
                  onClick={() => handleOpenFilters("rooms")}
                >
                  <div className="w-8 md:w-8 h-8 md:h-8 flex-shrink-0 mr-3">
                    <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-full">
                      <Bed className="h-5 w-5 text-primary" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-xs md:text-sm text-gray-500 font-medium">Chambres</p>
                    <p className="text-sm md:text-base font-medium text-gray-900 truncate">
                      {filters.bedrooms > 0
                        ? filters.bedrooms === 5
                          ? "5+ chambres"
                          : `${filters.bedrooms} chambre${filters.bedrooms > 1 ? "s" : ""}`
                        : "Toutes"}
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center py-3 md:py-3 px-5 md:px-6 flex-1 cursor-pointer hover:bg-black/5 transition-colors"
                  onClick={() => handleOpenFilters("tenant")}
                >
                  <div className="w-8 md:w-8 h-8 md:h-8 flex-shrink-0 mr-3">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Groupe%2048153-fUprBKHxUkLvkeBMAVXSCvqR5urfdq.png"
                      alt="Type de locataire"
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-xs md:text-sm text-gray-500 font-medium">Type locataire</p>
                    <p className="text-sm md:text-base font-medium text-gray-900 truncate">
                      {filters.tenantType !== "tous"
                        ? filters.tenantType.charAt(0).toUpperCase() + filters.tenantType.slice(1)
                        : "Tous types"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center pr-3">
                  <Button
                    className="h-12 md:h-12 w-12 md:w-12 rounded-full bg-primary hover:bg-primary/90 text-white m-1"
                    onClick={() => handleOpenFilters("location")}
                  >
                    <Search className="h-5 md:h-5 w-5 md:w-5" />
                    <span className="sr-only">Rechercher</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Contrôles de vue et filtres - avec un espacement vertical uniforme */}
          <div
            className={`flex flex-col md:flex-row justify-between items-center gap-2 py-2 border-t controls-container ${
              filteredProperties.length === 0 ? "hidden" : ""
            }`}
          >
            {/* Localisation et nombre de logements - À GAUCHE */}
            <div className="flex items-center text-sm whitespace-nowrap flex-shrink-0 md:w-auto">
              <div className="flex items-center gap-2">
                <div className="flex items-center text-gray-700">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="font-medium">
                    {filters.city ? filters.city.charAt(0).toUpperCase() + filters.city.slice(1) : "Toutes les villes"}
                  </span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-gray-700 font-medium">{filteredProperties.length} logements</span>
              </div>
            </div>

            {/* Barre de filtres horizontale - AU MILIEU */}
            <div className="flex-1 mx-0 md:mx-2 overflow-hidden integrated-filter-bar">
              <HorizontalFilterBar
                filters={filterItems}
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
                className="w-full"
              />
            </div>

            {/* Contrôles de vue et bouton de filtres - À DROITE */}
            <div className="flex items-center space-x-3 flex-shrink-0 md:w-auto">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "rounded-none border-r h-8 px-2 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-300",
                    gridView === "grid3" ? "bg-gray-100" : "bg-white"
                  )}
                  onClick={toggleGridView}
                  aria-label="Vue grille 3x3"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "rounded-none h-8 px-2 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-300",
                    gridView === "grid2" ? "bg-gray-100" : "bg-white"
                  )}
                  onClick={toggleGridView}
                  aria-label="Vue grille 2x2"
                >
                  <Grid2X2 className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="h-8 hover:bg-gray-100 hover:text-gray-700 hover:border-gray-300 transition-colors duration-300 flex items-center gap-2"
                onClick={() => handleOpenFilters()}
              >
                <Filter className="h-4 w-4" />
                Filtres
                {activeFiltersCount > 0 && (
                  <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
        {/* Espacement inférieur réduit */}
        <div className="h-2"></div>
      </div>

      {/* Contenu principal avec un padding pour compenser le header sticky */}
      <div className="container px-4 md:px-6 pt-6">
        {/* Grille de propriétés */}
        <div className="relative min-h-[500px]">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="relative h-16 w-16">
                  <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
                </div>
                <p className="text-gray-600 text-sm mt-4 font-medium">Chargement...</p>
              </div>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun résultat trouvé</h3>
              <p className="text-gray-500 mb-4">
                Essayez de modifier vos critères de recherche pour voir plus de propriétés.
              </p>
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => {
                  setFilters({
                    city: "",
                    district: "",
                    propertyType: "tout",
                    tenantType: "tous",
                    bedrooms: 0,
                    minPrice: 500,
                    maxPrice: 3000,
                    minArea: 20,
                    maxArea: 150,
                  });
                  handleFilterChange("all");
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`grid-${gridView}-page-${currentPage}-filter-${activeFilter}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "grid gap-6",
                  gridView === "grid3" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2"
                )}
              >
                {currentProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: index * 0.05 },
                    }}
                  >
                        <AuthProvider>
                      <FavoritesProvider>
                                            <PropertyCard {...property} />

                      </FavoritesProvider>
                    </AuthProvider>

                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="py-4"
            />
          </div>
        )}
      </div>

      {/* Sidebar de filtrage */}
      <FilterSidebar
        isOpen={isFilterSidebarOpen}
        onClose={handleCloseFilters}
        onApply={handleApplyFilters}
        initialFilters={filters}
        initialTab={activeFilterTab}
      />
    </section>
  );
}
