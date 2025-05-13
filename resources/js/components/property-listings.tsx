import { useState, useEffect, useMemo, useCallback } from "react";
import { PropertyCard } from "@/components/property-card";
import { useMediaQuery } from "@/utils/responsive-utils";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Grid3X3, Grid2X2, Filter, Search, Home, Building, Building2, Warehouse, MapPin, Bed } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterSidebar } from "@/components/filter-sidebar";
import type { SearchFilters } from "./search-filters";
import { generateText, openai } from "@/lib/openai";
import { HorizontalFilterBar } from "@/components/horizontal-filter-bar";

// Constants
const FILTER_DEBOUNCE_TIME = 300;
const DEFAULT_MIN_PRICE = 500;
const DEFAULT_MAX_PRICE = 3000;

type Propriete = {
  id: number;
  loueur_id: number;
  ville: string;
  titre: string;
  typesLocaires: string;
  localisation: string;
  prixParMois: number;
  imgs: string[];
  description: Text;
  disponibilite: boolean;
  type: string;
  nbrchambre: number;
  surface: number;
  adresse: string;
  admin_id: number;
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
};

type InertiaPageProps = {
  proprietes: Propriete[];
};

export function PropertyListings({ proprietes }: InertiaPageProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [currentPage, setCurrentPage] = useState(1);
  const [gridView, setGridView] = useState<"grid3" | "grid2">("grid3");
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState<string>("localisation");
  const [filters, setFilters] = useState<SearchFilters>({
    ville: "",
    prixParMois: 0,
    localisation: "",
    adresse: "",
    type: "tout",
    typesLocaires: "tous",
    nbrchambre: 0,
    minPrice: DEFAULT_MIN_PRICE,
    maxPrice: DEFAULT_MAX_PRICE,
    minArea: 20,
    maxArea: 150,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCriteria, setSearchCriteria] = useState<any>(null);
  const [filteredProperties, setFilteredProperties] = useState(proprietes);
  const [searchAnimation, setSearchAnimation] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter items for the horizontal filter bar
  const filterItems = useMemo(
    () => [
      { id: "all", label: "Tous", icon: <Home className="h-5 w-5" strokeWidth={1} /> },
      { id: "appartement", label: "Appartement", icon: <Building className="h-5 w-5" strokeWidth={1} /> },
      { id: "house", label: "Maison", icon: <Home className="h-5 w-5" strokeWidth={1} /> },
      { id: "garconniere", label: "Boutique", icon: <Building2 className="h-5 w-5" strokeWidth={1} /> },
      { id: "studio", label: "Studio", icon: <Building2 className="h-5 w-5" strokeWidth={1} /> },
      { id: "villa", label: "Villa", icon: <Home className="h-5 w-5" strokeWidth={1} /> },
      { id: "bureau", label: "Bureau", icon: <Building className="h-5 w-5" strokeWidth={1} /> },
      { id: "garage", label: "Garage", icon: <Warehouse className="h-5 w-5" strokeWidth={1} /> },
      { id: "depot", label: "Dépôt", icon: <Warehouse className="h-5 w-5" strokeWidth={1} /> },
      { id: "magasin", label: "Magasin", icon: <Building className="h-5 w-5" strokeWidth={1} /> },
    ],
    []
  );

  // Apply filters to properties
  const applyFilters = (properties: Propriete[], filters: SearchFilters): Propriete[] => {
    return properties.filter((property: Propriete)  => {
      return (
        (filters.ville ? property.ville.toLowerCase() === filters.ville.toLowerCase() : true) &&
        (filters.adresse ? property.adresse === filters.adresse : true) &&
        (filters.type && filters.type !== "tout" ? property.type.toLowerCase() === filters.type.toLowerCase() : true) &&
        (filters.typesLocaires && filters.typesLocaires !== "tous" ? property.typesLocaires === filters.typesLocaires : true) &&
        (filters.nbrchambre > 0 ? filters.nbrchambre === 5 ? property.nbrchambre >= 5 : property.nbrchambre === filters.nbrchambre : true) &&
        (filters.minPrice > DEFAULT_MIN_PRICE ? property.prixParMois >= filters.minPrice : true) &&
        (filters.maxPrice < DEFAULT_MAX_PRICE ? property.prixParMois <= filters.maxPrice : true) &&
        (filters.minArea && filters.minArea > 20 ? property.surface >= filters.minArea : true) &&
        (filters.maxArea && filters.maxArea < 150 ? property.surface <= filters.maxArea : true)
      );
    });
  };

  // Handle filter change
  const handleFilterChange = useCallback(
    (filterId: string) => {
      setActiveFilter(filterId);
      setIsLoading(true);

      setTimeout(() => {
        let filtered = [...proprietes];
        if (filterId !== "all") {
          const typeMap: Record<string, string> = {
            appartement: "Appartement",
            house: "Maison",
            boutique: "Boutique",
            studio: "Studio",
            villa: "Villa",
            bureau: "Bureau",
            garage: "Garage",
            depot: "Dépôt",
            magasin: "Magasin",
          };
          if (typeMap[filterId]) {
            filtered = proprietes.filter((p) => p.type.toLowerCase() === typeMap[filterId]?.toLowerCase());
          }
        }

        filtered = applyFilters(filtered, filters);
        setFilteredProperties(filtered);
        setIsLoading(false);
        setCurrentPage(1);
      }, FILTER_DEBOUNCE_TIME);
    },
    [filters, proprietes]
  );

  // Effect for filtering properties based on search criteria
  useEffect(() => {
    if (!searchCriteria) {
      const filtered = applyFilters(proprietes, filters);
      setFilteredProperties(filtered);
      return;
    }

    setIsLoading(true);
    setSearchAnimation(true);

    const filtered = proprietes.filter((property) => {
      let matches = true;

      if (searchCriteria.type && searchCriteria.type !== "tout") {
        const typeMatch = property.type.toLowerCase().includes(searchCriteria.type.toLowerCase());
        matches = matches && typeMatch;
      }

      if (searchCriteria.localisation) {
        const locationMatch = property.localisation.toLowerCase().includes(searchCriteria.location.toLowerCase());
        matches = matches && locationMatch;
      }

      if (searchCriteria.minPrice) {
        matches = matches && property.prixParMois >= searchCriteria.minPrice;
      }

      if (searchCriteria.maxPrice) {
        matches = matches && property.prixParMois <= searchCriteria.maxPrice;
      }

      if (searchCriteria.nbrchambre) {
        matches = matches && property.nbrchambre >= searchCriteria.nbrchambre;
      }

      if (searchCriteria.features && searchCriteria.features.length > 0) {
        const hasFeature = searchCriteria.features.some((feature: string) =>
          property.titre.toLowerCase().includes(feature.toLowerCase()) ||
          property.localisation.toLowerCase().includes(feature.toLowerCase())
        );
        matches = matches && hasFeature;
      }

      if (searchCriteria.keywords && searchCriteria.keywords.length > 0) {
        const hasKeyword = searchCriteria.keywords.some((keyword: string) =>
          property.titre.toLowerCase().includes(keyword.toLowerCase()) ||
          property.localisation.toLowerCase().includes(keyword.toLowerCase()) ||
          property.type.toLowerCase().includes(keyword.toLowerCase())
        );
        matches = matches && hasKeyword;
      }

      return matches && applyFilters([property], filters).length > 0;
    });

    setTimeout(() => {
      setFilteredProperties(filtered);
      setIsLoading(false);
      setSearchAnimation(false);
      setCurrentPage(1);
    }, FILTER_DEBOUNCE_TIME);
  }, [searchCriteria, filters, proprietes]);

  // Calculate the number of properties per page based on the view
  const propertiesPerPage = gridView === "grid3" ? 9 : 8;

  // Calculate the total number of pages
  const totalPages = useMemo(
    () => Math.ceil(filteredProperties.length / propertiesPerPage),
    [filteredProperties.length, propertiesPerPage]
  );

  // Get the properties for the current page
  const currentProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * propertiesPerPage;
    const endIndex = startIndex + propertiesPerPage;
    return filteredProperties.slice(startIndex, endIndex);
  }, [filteredProperties, currentPage, propertiesPerPage]);

  // Handle page change
  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1) page = 1;
      if (page > totalPages) page = totalPages;
      setCurrentPage(page);
      window.scrollTo({
        top: document.getElementById("property-listings")?.offsetTop || 0,
        behavior: "smooth",
      });
    },
    [totalPages]
  );

  // Toggle grid view
  const toggleGridView = useCallback(() => {
    setGridView((prev) => (prev === "grid3" ? "grid2" : "grid3"));
  }, []);

  // Handle opening filters
  const handleOpenFilters = useCallback((tab?: string) => {
    if (tab) {
      setActiveFilterTab(tab);
    }
    setIsFilterSidebarOpen(true);
  }, []);

  // Handle closing filters
  const handleCloseFilters = useCallback(() => {
    setIsFilterSidebarOpen(false);
  }, []);

  // Handle applying filters
  const handleApplyFilters = useCallback(
    (newFilters: SearchFilters) => {
      setFilters(newFilters);
      setIsLoading(true);

      setTimeout(() => {
        const filtered = applyFilters(proprietes, newFilters);
        setFilteredProperties(filtered);
        setIsLoading(false);
        setCurrentPage(1);
      }, FILTER_DEBOUNCE_TIME);
    },
    [proprietes]
  );

  // Handle AI search
  const handleAISearch = useCallback(async (query: string, aiResults: any) => {
    setSearchQuery(query);
    setIsLoading(true);
    setSearchAnimation(true);

    try {
      if (aiResults) {
        setSearchCriteria(aiResults);
      } else {
        const { text } = await generateText({
          model: openai("gpt-4o"),
          prompt: `Analyse cette requête de recherche de logement: "${query}".
          Extrais les critères de recherche pertinents sous forme d'un objet JSON avec les propriétés suivantes:
          {
            "type": type de logement (appartement, maison, villa, studio, etc.),
            "location": emplacement ou quartier mentionné,
            "minPrice": prix minimum si mentionné (nombre),
            "maxPrice": prix maximum si mentionné (nombre),
            "nbrchambre": nombre de chambres si mentionné (nombre),
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
          setSearchCriteria({ keywords: [query] });
        }
      }
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
      setSearchCriteria({ keywords: [query] });
    }
  }, []);

  // Reset search
  const resetSearch = useCallback(() => {
    setSearchQuery("");
    setSearchCriteria(null);
  }, []);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    return Object.entries(filters).reduce((count, [key, value]) => {
      if (key === "ville" && value) count++;
      if (key === "adresse" && value) count++;
      if (key === "type" && value !== "tout") count++;
      if (key === "typesLocaires" && value !== "tous") count++;
      if (key === "nbrchambre" && value > 0) count++;
      if ((key === "minPrice" && value > DEFAULT_MIN_PRICE) || (key === "maxPrice" && value < DEFAULT_MAX_PRICE)) count++;
      if ((key === "minArea" && value > 20) || (key === "maxArea" && value < 150)) count++;
      return count;
    }, 0);
  }, [filters]);

  const startIndex = (currentPage - 1) * propertiesPerPage;
  const endIndex = startIndex + propertiesPerPage;
  const propertiesToShow = filteredProperties.slice(startIndex, endIndex);

  return (
    <section id="property-listings" className="w-full">
      {/* Sticky header containing all filtering elements */}
      <div className="sticky top-16 bg-white z-40 border-b">
        <div className="container px-4 md:px-6">
          <div className="h-2"></div>
          {/* Integrated filter bar */}
          <div className="w-full pb-3">
            <div className="rounded-full overflow-hidden border border-gray-200 text-base md:text-lg bg-white shadow-sm">
              <div className="flex items-center">
                <div
                  className="flex items-center py-3 md:py-3 px-5 md:px-6 flex-1 cursor-pointer hover:bg-black/5 transition-colors border-r"
                  onClick={() => handleOpenFilters("ville")}
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
                      {filters.ville ? filters.ville.charAt(0).toUpperCase() + filters.ville.slice(1) : "Toutes les villes"}
                      {filters.adresse ? `, ${filters.adresse}` : ""}
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center py-3 md:py-3 px-5 md:px-6 flex-1 cursor-pointer hover:bg-black/5 transition-colors border-r"
                  onClick={() => handleOpenFilters("rooms")}
                >
                  <div className="w-8 md:w-8 h-8 md:h-8 flex-shrink-0 mr-3">
                    <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-full">
                      <Bed className="h-5 w-5 text-[#485aa8]" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-xs md:text-sm text-gray-500 font-medium">Chambres</p>
                    <p className="text-sm md:text-base font-medium text-gray-900 truncate">
                      {filters.nbrchambre > 0 ? filters.nbrchambre === 5 ? "5+ chambres" : `${filters.nbrchambre} chambre${filters.nbrchambre > 1 ? "s" : ""}` : "Toutes"}
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
                      {filters.typesLocaires !== "tous" ? filters.typesLocaires.charAt(0).toUpperCase() + filters.typesLocaires.slice(1) : "Tous types"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center pr-3">
                  <Button
                    className="h-12 md:h-12 w-12 md:w-12 rounded-full bg-[#485aa8] hover:bg-[#485aa8]/90 text-white m-1"
                    onClick={() => handleOpenFilters("location")}
                  >
                    <Search className="h-5 md:h-5 w-5 md:w-5" />
                    <span className="sr-only">Rechercher</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* View controls and filters */}
          <div
            className={`flex flex-col md:flex-row justify-between items-center gap-2 py-2 border-t controls-container ${
              filteredProperties.length === 0 ? "hidden" : ""
            }`}
          >
            <div className="flex items-center text-sm whitespace-nowrap flex-shrink-0 md:w-auto">
              <div className="flex items-center gap-2">
                <div className="flex items-center text-gray-700">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="font-medium">
                    {filters.ville ? filters.ville.charAt(0).toUpperCase() + filters.ville.slice(1) : "Toutes les villes"}
                  </span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-gray-700 font-medium">{filteredProperties.length} logements</span>
              </div>
            </div>

            <div className="flex-1 mx-0 md:mx-2 overflow-hidden integrated-filter-bar">
              <HorizontalFilterBar
                filters={filterItems}
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
                className="w-full"
              />
            </div>

            <div className="flex items-center space-x-3 flex-shrink-0 md:w-auto">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "rounded-none border-r h-8 px-2 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-300",
                    gridView === "grid3" ? "bg-gray-100" : "bg-white",
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
                    gridView === "grid2" ? "bg-gray-100" : "bg-white",
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
        <div className="h-2"></div>
      </div>

      {/* Main content with padding to compensate for the sticky header */}
      <div className="container px-4 md:px-6 pt-6">
        {/* Property grid */}
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
                    ville: "",
                    prixParMois: 0,
                    localisation: "",
                    adresse: "",
                    type: "tout",
                    typesLocaires: "tous",
                    nbrchambre: 0,
                    minPrice: DEFAULT_MIN_PRICE,
                    maxPrice: DEFAULT_MAX_PRICE,
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
                  gridView === "grid3" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2",
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
                    <PropertyCard propriete={property} />
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

      {/* Filter sidebar */}
      <FilterSidebar
        isOpen={isFilterSidebarOpen}
        onClose={handleCloseFilters}
        onApply={handleApplyFilters}
        initialFilters={filters}
        proprietes={proprietes}
        initialTab={activeFilterTab}
      />
    </section>
  );
}
