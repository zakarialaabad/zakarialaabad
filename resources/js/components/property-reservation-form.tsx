
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Users, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PropertyReservationFormProps {
  price: number
  priceUnit: string
  maxGuests: number
  owner: {
    name: string
    phone: string
  }
}

export function PropertyReservationForm({ price, priceUnit, maxGuests, owner }: PropertyReservationFormProps) {
  const [guests, setGuests] = useState(1)
  const [duration, setDuration] = useState(1) // Par défaut 1 mois

  // Options de durée de location
  const durationOptions = [
    { value: 1, label: "1 mois" },
    { value: 2, label: "2 mois" },
    { value: 3, label: "3 mois" },
    { value: 6, label: "6 mois" },
    { value: 12, label: "1 an (12 mois)" },
    { value: 24, label: "2 ans (24 mois)" },
    { value: 36, label: "3 ans (36 mois)" },
  ]

  // Options pour le nombre de personnes
  const guestOptions = [
    { value: 1, label: "1 personne" },
    { value: 2, label: "2 personnes" },
    { value: 3, label: "3 personnes" },
    { value: 4, label: "4 personnes" },
    { value: 5, label: "5+ personnes" },
  ]

  return (
    <div className="rounded-xl border bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-baseline justify-between">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-gray-900">{price}</span>
          <span className="text-gray-600">{priceUnit}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="mr-1 h-4 w-4" />
          <span>Disponible maintenant</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Nombre de personnes */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Nombre de personnes</label>
          <Select value={guests.toString()} onValueChange={(value) => setGuests(Number.parseInt(value))}>
            <SelectTrigger className="w-full border-gray-300 bg-white">
              <SelectValue placeholder="Sélectionner">
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-gray-400" />
                  <span>{guests === 5 ? "5+ personnes" : `${guests} personne${guests > 1 ? "s" : ""}`}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {guestOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Durée de location */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Durée de location</label>
          <Select value={duration.toString()} onValueChange={(value) => setDuration(Number.parseInt(value))}>
            <SelectTrigger className="w-full border-gray-300 bg-white">
              <SelectValue placeholder="Sélectionner">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                  <span>
                    {durationOptions.find((option) => option.value === duration)?.label || `${duration} mois`}
                  </span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {durationOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg bg-gray-50 p-4 space-y-3">
          <div className="flex items-start gap-2">
            <div className="mt-0.5 text-primary">
              <Calendar className="h-4 w-4" />
            </div>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Prix affiché directement</span> — Pour toute réservation ou information
              complémentaire, veuillez contacter le propriétaire.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-primary/10 p-2 rounded-md">
            <div className="text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"></path>
              </svg>
            </div>
            <p className="text-sm font-medium text-primary">
              E-JAR ne prend aucune commission — notre plateforme est entièrement gratuite.
            </p>
          </div>
        </div>

        {/* Boutons d'action */}
        <Button className="w-full bg-[#485aa8] py-6 text-base font-medium text-white hover:bg-primary/90">
          Réserver un rendez-vous
        </Button>
      </div>
    </div>
  )
}
