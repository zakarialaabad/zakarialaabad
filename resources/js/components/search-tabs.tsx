"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Home,
  Users,
  BriefcaseIcon,
  HeartIcon,
  GraduationCapIcon,
  UserIcon,
  X,
  Building,
  Building2,
  Landmark,
  Square,
  BedDouble,
  DollarSign,
} from "lucide-react"
import { Slider } from "@/components/ui/slider"
import type { SearchFilters as SearchFiltersType } from "./search-filters"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface SearchTabsProps {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: SearchFiltersType) => void
  initialFilters: SearchFiltersType
  initialTab?: string
}

export function SearchTabs({ isOpen, onClose, onApply, initialFilters, initialTab = "location" }: SearchTabsProps) {
  const [filters, setFilters] = useState<SearchFiltersType>({
    city: initialFilters.city,
    district: initialFilters.district,
    propertyType: initialFilters.propertyType,
    tenantType: initialFilters.tenantType,
    bedrooms: initialFilters.bedrooms,
    minPrice: initialFilters.minPrice,
    maxPrice: initialFilters.maxPrice,
    minArea: initialFilters.minArea || 20,
    maxArea: initialFilters.maxArea || 150,
  })
  const [activeTab, setActiveTab] = useState(initialTab)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [showApplyButton, setShowApplyButton] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab)
    }
  }, [isOpen, initialTab])

  useEffect(() => {
    // Update selected filters for visual feedback
    const active = []
    if (filters.city) active.push(`Ville: ${filters.city}`)
    if (filters.district) active.push(`Quartier: ${filters.district}`)
    if (filters.propertyType && filters.propertyType !== "tout") active.push(`Type: ${filters.propertyType}`)
    if (filters.tenantType && filters.tenantType !== "tous") active.push(`Locataire: ${filters.tenantType}`)
    if (filters.bedrooms > 0) active.push(`${filters.bedrooms} chambres`)
    if (filters.minPrice > 500 || filters.maxPrice < 3000)
      active.push(`Prix: ${filters.minPrice}-${filters.maxPrice} MAD`)
    if (filters.minArea > 20 || filters.maxArea < 150) active.push(`Surface: ${filters.minArea}-${filters.maxArea} m²`)

    setSelectedFilters(active)
  }, [filters])

  // Scroll to top when changing tabs
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [activeTab])

  // Show apply button when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        setShowApplyButton(contentRef.current.scrollTop > 50)
      }
    }

    const currentRef = contentRef.current
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  const handleBedroomsChange = (value: number) => {
    setFilters((prev) => ({
      ...prev,
      bedrooms: value,
    }))
  }

  const handlePriceChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: value[0],
      maxPrice: value[1],
    }))
  }

  const handleAreaChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      minArea: value[0],
      maxArea: value[1],
    }))
  }

  const handleApply = () => {
    onApply(filters)
    onClose()
  }

  const handleReset = () => {
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
    })
  }

  const propertyTypes = [
    { value: "tout", label: "Tout", icon: <Home className="h-5 w-5" /> },
    { value: "appartement", label: "Appartement", icon: <Building className="h-5 w-5" /> },
    { value: "garconniere", label: "Garçonnière", icon: <Building2 className="h-5 w-5" /> },
    { value: "maison", label: "Maison", icon: <Home className="h-5 w-5" /> },
    { value: "villa", label: "Villa", icon: <Landmark className="h-5 w-5" /> },
    { value: "bureau", label: "Bureau", icon: <BriefcaseIcon className="h-5 w-5" /> },
  ]

  const tenantTypes = [
    { value: "tous", label: "Tous", icon: <Users className="h-5 w-5" /> },
    { value: "famille", label: "Famille", icon: <Users className="h-5 w-5" /> },
    { value: "etudiants", label: "Étudiants", icon: <GraduationCapIcon className="h-5 w-5" /> },
    { value: "celibataire", label: "Célibataire", icon: <UserIcon className="h-5 w-5" /> },
    { value: "marie", label: "Marié", icon: <HeartIcon className="h-5 w-5" /> },
    { value: "fonctionnaire", label: "Fonctionnaire", icon: <BriefcaseIcon className="h-5 w-5" /> },
  ]

  const cities = [
    { value: "laayoune", label: "Laayoune", districts: ["al-wifaq", "al-matar", "al-qods"] },
    { value: "casablanca", label: "Casablanca", districts: ["maarif", "ain-diab", "anfa"] },
    { value: "rabat", label: "Rabat", districts: ["agdal", "hay-riad", "souissi"] },
    { value: "marrakech", label: "Marrakech", districts: ["gueliz", "hivernage", "palmeraie"] },
  ]

  const getDistrictLabel = (city: string, district: string) => {
    if (city === "laayoune") {
      return district === "al-wifaq" ? "Quartier Al Wifaq" : district === "al-matar" ? "Hay Al Matar" : "Hay Al Qods"
    }
    if (city === "casablanca") {
      return district === "maarif" ? "Maarif" : district === "ain-diab" ? "Ain Diab" : "Anfa"
    }
    if (city === "rabat") {
      return district === "agdal" ? "Agdal" : district === "hay-riad" ? "Hay Riad" : "Souissi"
    }
    if (city === "marrakech") {
      return district === "gueliz" ? "Guéliz" : district === "hivernage" ? "Hivernage" : "Palmeraie"
    }
    return district
  }

  const tabs = [
    { id: "location", label: "Où", icon: <MapPin className="h-4 w-4" /> },
    { id: "property", label: "Type de logement", icon: <Home className="h-4 w-4" /> },
    { id: "price", label: "Prix", icon: <DollarSign className="h-4 w-4" /> },
    { id: "rooms", label: "Chambres", icon: <BedDouble className="h-4 w-4" /> },
    { id: "area", label: "Surface", icon: <Square className="h-4 w-4" /> },
    { id: "tenant", label: "Type de locataire", icon: <Users className="h-4 w-4" /> },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden rounded-2xl border-0 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-gray-100">
            <X className="h-5 w-5" />
            <span className="sr-only">Fermer</span>
          </Button>

          <div className="flex overflow-x-auto scrollbar-hide gap-1 px-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-full text-sm whitespace-nowrap transition-all",
                  activeTab === tab.id
                    ? "bg-black text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200",
                )}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {selectedFilters.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
              onClick={handleReset}
            >
              Réinitialiser
            </Button>
          )}
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        >
          <AnimatePresence mode="wait">
            {activeTab === "location" && (
              <motion.div
                key="location"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="p-6 space-y-8"
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Ville</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {cities.map((city) => (
                      <motion.div
                        key={city.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "p-4 rounded-xl border cursor-pointer transition-all",
                          filters.city === city.value
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-gray-200 hover:border-gray-300",
                        )}
                        onClick={() => {
                          setFilters((prev) => ({
                            ...prev,
                            city: city.value,
                            district: "", // Reset district
                          }))
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center",
                              filters.city === city.value ? "bg-primary/10" : "bg-gray-100",
                            )}
                          >
                            <MapPin
                              className={cn("h-5 w-5", filters.city === city.value ? "text-primary" : "text-gray-500")}
                            />
                          </div>
                          <span className="font-medium">{city.label}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {filters.city && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <h3 className="text-lg font-medium">Quartier</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {cities
                        .find((c) => c.value === filters.city)
                        ?.districts.map((district) => (
                          <motion.div
                            key={district}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={cn(
                              "p-4 rounded-xl border cursor-pointer transition-all",
                              filters.district === district
                                ? "border-primary bg-primary/5 shadow-sm"
                                : "border-gray-200 hover:border-gray-300",
                            )}
                            onClick={() => setFilters((prev) => ({ ...prev, district }))}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={cn(
                                  "w-10 h-10 rounded-full flex items-center justify-center",
                                  filters.district === district ? "bg-primary/10" : "bg-gray-100",
                                )}
                              >
                                <MapPin
                                  className={cn(
                                    "h-5 w-5",
                                    filters.district === district ? "text-primary" : "text-gray-500",
                                  )}
                                />
                              </div>
                              <span className="font-medium">{getDistrictLabel(filters.city, district)}</span>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === "property" && (
              <motion.div
                key="property"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="p-6 space-y-8"
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Type de logement</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {propertyTypes.map((type) => (
                      <motion.div
                        key={type.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "p-4 rounded-xl border cursor-pointer transition-all",
                          filters.propertyType === type.value
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-gray-200 hover:border-gray-300",
                        )}
                        onClick={() => setFilters((prev) => ({ ...prev, propertyType: type.value }))}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center",
                              filters.propertyType === type.value ? "bg-primary/10" : "bg-gray-100",
                            )}
                          >
                            {React.cloneElement(type.icon, {
                              className: cn(
                                "h-5 w-5",
                                filters.propertyType === type.value ? "text-primary" : "text-gray-500",
                              ),
                            })}
                          </div>
                          <span className="font-medium">{type.label}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "rooms" && (
              <motion.div
                key="rooms"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="p-6 space-y-8"
              >
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Chambres</h3>

                  <div className="flex flex-wrap gap-3 justify-center">
                    {[
                      { value: 0, label: "Tout" },
                      { value: 1, label: "1" },
                      { value: 2, label: "2" },
                      { value: 3, label: "3" },
                      { value: 4, label: "4" },
                      { value: 5, label: "5+" },
                    ].map((option) => (
                      <motion.button
                        key={option.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleBedroomsChange(option.value)}
                        className={cn(
                          "w-16 h-16 rounded-full flex flex-col items-center justify-center transition-all",
                          filters.bedrooms === option.value
                            ? "bg-primary text-white shadow-md"
                            : "bg-white border border-gray-200 text-gray-700 hover:border-gray-300",
                        )}
                      >
                        <span className="text-lg font-medium">{option.label}</span>
                        {option.value > 0 && (
                          <span className="text-xs mt-0.5">{option.value === 1 ? "chambre" : "chambres"}</span>
                        )}
                      </motion.button>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <BedDouble className="h-6 w-6 text-primary" />
                      <span className="text-lg font-medium">Pourquoi choisir le nombre de chambres?</span>
                    </div>
                    <p className="text-gray-600">
                      Le nombre de chambres est un critère important pour trouver un logement adapté à vos besoins. Que
                      vous soyez seul, en couple ou en famille, sélectionnez le nombre de chambres idéal pour votre
                      situation.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "price" && (
              <motion.div
                key="price"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="p-6 space-y-8"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Fourchette de prix</h3>
                    <div className="bg-gray-100 px-3 py-1.5 rounded-full text-sm font-medium">
                      {filters.minPrice} - {filters.maxPrice} MAD
                    </div>
                  </div>

                  <div className="px-2 py-8">
                    <Slider
                      defaultValue={[filters.minPrice, filters.maxPrice]}
                      value={[filters.minPrice, filters.maxPrice]}
                      max={5000}
                      step={100}
                      onValueChange={handlePriceChange}
                      className="mt-2"
                    />

                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>500 MAD</span>
                      <span>5000 MAD</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl border border-gray-200 bg-white">
                      <label className="text-sm text-gray-500 block mb-1">Prix minimum</label>
                      <div className="flex items-center">
                        <input
                          type="number"
                          value={filters.minPrice}
                          onChange={(e) => {
                            const value = Number.parseInt(e.target.value)
                            if (!isNaN(value) && value >= 0) {
                              setFilters((prev) => ({ ...prev, minPrice: value }))
                            }
                          }}
                          className="w-full text-lg font-medium focus:outline-none"
                        />
                        <span className="text-gray-500">MAD</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-white">
                      <label className="text-sm text-gray-500 block mb-1">Prix maximum</label>
                      <div className="flex items-center">
                        <input
                          type="number"
                          value={filters.maxPrice}
                          onChange={(e) => {
                            const value = Number.parseInt(e.target.value)
                            if (!isNaN(value) && value >= 0) {
                              setFilters((prev) => ({ ...prev, maxPrice: value }))
                            }
                          }}
                          className="w-full text-lg font-medium focus:outline-none"
                        />
                        <span className="text-gray-500">MAD</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[500, 1000, 1500, 2000, 3000, 4000].map((price) => (
                      <motion.button
                        key={price}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "px-4 py-2 rounded-full border transition-all text-sm",
                          price >= filters.minPrice && price <= filters.maxPrice
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-gray-200 text-gray-700 hover:border-gray-300",
                        )}
                        onClick={() => {
                          if (price < 4000) {
                            setFilters((prev) => ({ ...prev, minPrice: price, maxPrice: price + 1000 }))
                          } else {
                            setFilters((prev) => ({ ...prev, minPrice: price, maxPrice: 5000 }))
                          }
                        }}
                      >
                        {price}+ MAD
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "area" && (
              <motion.div
                key="area"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="p-6 space-y-8"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Surface</h3>
                    <div className="bg-gray-100 px-3 py-1.5 rounded-full text-sm font-medium">
                      {filters.minArea} - {filters.maxArea} m²
                    </div>
                  </div>

                  <div className="px-2 py-8">
                    <Slider
                      defaultValue={[filters.minArea, filters.maxArea]}
                      value={[filters.minArea, filters.maxArea]}
                      max={200}
                      step={5}
                      onValueChange={handleAreaChange}
                      className="mt-2"
                    />

                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>20 m²</span>
                      <span>200 m²</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl border border-gray-200 bg-white">
                      <label className="text-sm text-gray-500 block mb-1">Surface minimum</label>
                      <div className="flex items-center">
                        <input
                          type="number"
                          value={filters.minArea}
                          onChange={(e) => {
                            const value = Number.parseInt(e.target.value)
                            if (!isNaN(value) && value >= 0) {
                              setFilters((prev) => ({ ...prev, minArea: value }))
                            }
                          }}
                          className="w-full text-lg font-medium focus:outline-none"
                        />
                        <span className="text-gray-500">m²</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-white">
                      <label className="text-sm text-gray-500 block mb-1">Surface maximum</label>
                      <div className="flex items-center">
                        <input
                          type="number"
                          value={filters.maxArea}
                          onChange={(e) => {
                            const value = Number.parseInt(e.target.value)
                            if (!isNaN(value) && value >= 0) {
                              setFilters((prev) => ({ ...prev, maxArea: value }))
                            }
                          }}
                          className="w-full text-lg font-medium focus:outline-none"
                        />
                        <span className="text-gray-500">m²</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[20, 50, 80, 100, 150, 200].map((area) => (
                      <motion.button
                        key={area}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "px-4 py-2 rounded-full border transition-all text-sm",
                          area >= filters.minArea && area <= filters.maxArea
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-gray-200 text-gray-700 hover:border-gray-300",
                        )}
                        onClick={() => {
                          if (area < 150) {
                            setFilters((prev) => ({ ...prev, minArea: area, maxArea: area + 50 }))
                          } else {
                            setFilters((prev) => ({ ...prev, minArea: area, maxArea: 200 }))
                          }
                        }}
                      >
                        {area}+ m²
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "tenant" && (
              <motion.div
                key="tenant"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="p-6 space-y-8"
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Type de locataire</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {tenantTypes.map((type) => (
                      <motion.div
                        key={type.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "p-4 rounded-xl border cursor-pointer transition-all",
                          filters.tenantType === type.value
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-gray-200 hover:border-gray-300",
                        )}
                        onClick={() => setFilters((prev) => ({ ...prev, tenantType: type.value }))}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center",
                              filters.tenantType === type.value ? "bg-primary/10" : "bg-gray-100",
                            )}
                          >
                            {React.cloneElement(type.icon, {
                              className: cn(
                                "h-5 w-5",
                                filters.tenantType === type.value ? "text-primary" : "text-gray-500",
                              ),
                            })}
                          </div>
                          <span className="font-medium">{type.label}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="h-6 w-6 text-primary" />
                    <span className="text-lg font-medium">À propos des types de locataires</span>
                  </div>
                  <p className="text-gray-600">
                    Certains propriétaires préfèrent louer à des profils spécifiques. Sélectionnez le type de locataire
                    qui correspond à votre situation pour trouver les logements qui vous conviennent le mieux.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <motion.div
          className="p-4 border-t flex justify-between items-center sticky bottom-0 bg-white z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
            onClick={onClose}
          >
            Annuler
          </Button>

          <Button className="bg-primary hover:bg-primary/90 px-8 py-6 rounded-full text-base" onClick={handleApply}>
            Afficher les résultats
          </Button>
        </motion.div>

        {/* Floating apply button when scrolling */}
        <AnimatePresence>
          {showApplyButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-20"
            >
              <Button
                className="bg-primary hover:bg-primary/90 px-8 py-6 rounded-full text-base shadow-lg"
                onClick={handleApply}
              >
                Afficher les résultats
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
