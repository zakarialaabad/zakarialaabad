"use client"

import { useState } from "react"
import { Building2, Home, Building, Briefcase, Store, Warehouse, Car, ShoppingBag } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const propertyTypes = [
  { value: "apartment", label: "Appartement", icon: Building2 },
  { value: "villa", label: "Villa", icon: Home },
  { value: "house", label: "Maison", icon: Home },
  { value: "studio", label: "Studio", icon: Building },
  { value: "office", label: "Bureau", icon: Briefcase },
  { value: "store", label: "Magasin", icon: Store },
  { value: "warehouse", label: "Dépôt", icon: Warehouse },
  { value: "garage", label: "Garage", icon: Car },
  { value: "shop", label: "Boutique", icon: ShoppingBag },
]

interface PropertyTypeSelectProps {
  value?: string
  onValueChange: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
}

export function PropertyTypeSelect({ value, onValueChange, onFocus, onBlur }: PropertyTypeSelectProps) {
  const [selectedType, setSelectedType] = useState(value || "")

  const handleValueChange = (newValue: string) => {
    setSelectedType(newValue)
    onValueChange(newValue)
  }

  // Find the selected property type object
  const selectedProperty = propertyTypes.find((type) => type.value === selectedType)

  return (
    <Select value={selectedType} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full" onFocus={onFocus} onBlur={onBlur}>
        <SelectValue placeholder="Sélectionner un type">
          {selectedProperty && (
            <div className="flex items-center gap-2">
              {selectedProperty.icon && <selectedProperty.icon className="h-4 w-4" />}
              <span>{selectedProperty.label}</span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {propertyTypes.map((type) => (
          <SelectItem key={type.value} value={type.value} className="flex items-center gap-2">
            <div className="flex items-center gap-2 w-full">
              {type.icon && <type.icon className="h-4 w-4 flex-shrink-0" />}
              <span>{type.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
