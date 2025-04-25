"use client"

import { useState } from "react"
import { ChevronLeft, Minus, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface SearchFilters {
  city: string
  district: string
  propertyType: string
  tenantType: string
  bedrooms: number
  minPrice: number
  maxPrice: number
  minArea: number
  maxArea: number
}

interface SearchFiltersProps {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: SearchFilters) => void
  initialFilters: SearchFilters
}

export function SearchFilters({ isOpen, onClose, onApply, initialFilters }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters)

  const handleBedroomsChange = (action: "increment" | "decrement") => {
    setFilters((prev) => ({
      ...prev,
      bedrooms: action === "increment" ? prev.bedrooms + 1 : Math.max(0, prev.bedrooms - 1),
    }))
  }

  const handlePriceChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: value[0],
      maxPrice: value[1],
    }))
  }

  const handleApply = () => {
    onApply(filters)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center border-b pb-4">
          <Button variant="ghost" size="icon" onClick={onClose} className="mr-2">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Retour</span>
          </Button>
          <DialogTitle className="text-lg font-medium">Filtrer ta recherche</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="font-medium text-sm">Ville</label>
            <Select value={filters.city} onValueChange={(value) => setFilters((prev) => ({ ...prev, city: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une ville" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="laayoune">Laayoune</SelectItem>
                <SelectItem value="casablanca">Casablanca</SelectItem>
                <SelectItem value="rabat">Rabat</SelectItem>
                <SelectItem value="marrakech">Marrakech</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="font-medium text-sm">Quartier</label>
            <Select
              value={filters.district}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, district: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un quartier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="al-wifaq">Quartier Al Wifaq</SelectItem>
                <SelectItem value="al-matar">Hay Al Matar</SelectItem>
                <SelectItem value="al-qods">Hay Al Qods</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="font-medium text-sm">Type de propriété</label>
            <div className="flex gap-2">
              {["tout", "appartement", "garconniere"].map((type) => (
                <Button
                  key={type}
                  variant={filters.propertyType === type ? "default" : "outline"}
                  className={`flex-1 ${filters.propertyType === type ? "bg-primary text-white" : "bg-gray-50"}`}
                  onClick={() => setFilters((prev) => ({ ...prev, propertyType: type }))}
                >
                  {type === "tout" ? "Tout" : type === "appartement" ? "Appartement" : "Garçonnière"}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-medium text-sm">Type locataire</label>
            <div className="flex gap-2">
              {["tous", "famille", "etudiants"].map((type) => (
                <Button
                  key={type}
                  variant={filters.tenantType === type ? "default" : "outline"}
                  className={`flex-1 ${filters.tenantType === type ? "bg-primary text-white" : "bg-gray-50"}`}
                  onClick={() => setFilters((prev) => ({ ...prev, tenantType: type }))}
                >
                  {type === "tous" ? "Tous" : type === "famille" ? "Famille" : "Étudiants"}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-medium text-sm">Chambres</label>
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-8 w-8 bg-gray-100"
                onClick={() => handleBedroomsChange("decrement")}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Moins</span>
              </Button>
              <span className="mx-4">{filters.bedrooms === 0 ? "Tout" : filters.bedrooms}</span>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-8 w-8 bg-gray-100"
                onClick={() => handleBedroomsChange("increment")}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Plus</span>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="font-medium text-sm">Fourchette de prix</label>
              <p className="text-xs text-gray-500">Prix par mois</p>
            </div>

            <div className="h-[100px] bg-white relative mt-2">
              <div className="absolute inset-x-6 top-1/2 transform -translate-y-1/2">
                {/* Histogramme simulé */}
                <div className="flex items-end h-16 gap-[2px]">
                  {Array.from({ length: 40 }).map((_, i) => {
                    const height = Math.random() * 100
                    return <div key={i} className="bg-primary w-1 rounded-t-sm" style={{ height: `${height}%` }}></div>
                  })}
                </div>
              </div>
              <Slider
                defaultValue={[filters.minPrice, filters.maxPrice]}
                max={5000}
                step={100}
                onValueChange={handlePriceChange}
                className="absolute bottom-4 inset-x-6"
              />
            </div>

            <div className="flex justify-between">
              <div>
                <label className="text-xs font-medium">Minimum</label>
                <p className="font-medium">{filters.minPrice} MAD</p>
              </div>
              <div className="text-right">
                <label className="text-xs font-medium">Maximum</label>
                <p className="font-medium">{filters.maxPrice} MAD</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="font-medium text-sm">Surface (m²)</label>
              <p className="text-xs text-gray-500">Surface du logement</p>
            </div>

            <div className="h-[100px] bg-white relative mt-2">
              <Slider
                defaultValue={[filters.minArea, filters.maxArea]}
                max={200}
                step={5}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    minArea: value[0],
                    maxArea: value[1],
                  }))
                }
                className="absolute bottom-4 inset-x-6"
              />
            </div>

            <div className="flex justify-between">
              <div>
                <label className="text-xs font-medium">Minimum</label>
                <p className="font-medium">{filters.minArea} m²</p>
              </div>
              <div className="text-right">
                <label className="text-xs font-medium">Maximum</label>
                <p className="font-medium">{filters.maxArea} m²</p>
              </div>
            </div>
          </div>
        </div>

        <Button className="w-full bg-primary" onClick={handleApply}>
          Appliquer
        </Button>
      </DialogContent>
    </Dialog>
  )
}
