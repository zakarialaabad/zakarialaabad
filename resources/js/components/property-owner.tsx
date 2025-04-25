import { Button } from "@/components/ui/button"
import { Phone, MessageSquare, Clock, CheckCircle } from "lucide-react"

interface Owner {
  id: string
  name: string
  image: string
  phone: string
  responseRate: number
  responseTime: string
  joinedDate: string
}

interface PropertyOwnerProps {
  owner: Owner
}

export function PropertyOwner({ owner }: PropertyOwnerProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-900">À propos du propriétaire</h3>
      <div className="flex items-start gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-full">
        <img
  src={owner.image || "/placeholder.svg"}
  alt={owner.name}
  className="object-cover w-16 h-16"
  style={{ objectFit: 'cover' }}
/>
        </div>
        <div className="flex-1">
          <h4 className="text-base font-medium text-gray-900">{owner.name}</h4>
          <p className="text-sm text-gray-600">Membre depuis {owner.joinedDate}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <div className="flex items-center text-sm text-gray-600">
              <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
              <span>Identité vérifiée</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="mr-1 h-4 w-4 text-primary" />
              <span>Répond en {owner.responseTime}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Button className="flex-1 gap-2 bg-primary hover:bg-primary/90">
          <MessageSquare className="h-4 w-4" />
          Contacter
        </Button>
        <Button variant="outline" className="flex-1 gap-2 border-primary text-primary hover:bg-primary/10">
          <Phone className="h-4 w-4" />
          Appeler
        </Button>
      </div>
    </div>
  )
}
