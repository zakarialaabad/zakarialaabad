
import { useState } from "react"
import { MapPin, Plus, Minus, Maximize } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PropertyMapProps {
  location: string
}

export function PropertyMap({ location }: PropertyMapProps) {
  const [zoom, setZoom] = useState(14)

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 1, 18))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 1, 10))
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Emplacement</h3>
      <div className="relative h-[400px] w-full overflow-hidden rounded-xl border">
        <div className="absolute inset-0 bg-gray-100">
        <img
    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4.PNG-ahKgVxR43RMPMBAjXwewbHbxacMHzr.png"
    alt={`Carte de ${location}`}
    className="w-full h-full object-cover transition-transform duration-500"

    style={{
      transform: `scale(${zoom / 14})`,
      transformOrigin: "center",
    }}
  />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg">
            <MapPin className="h-6 w-6" />
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-2 text-sm font-medium shadow-md">
          Adresse vérifiée
        </div>

        {/* Contrôles de zoom */}
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-white shadow-md"
            onClick={handleZoomIn}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Zoom in</span>
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-white shadow-md"
            onClick={handleZoomOut}
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Zoom out</span>
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-white shadow-md"
            onClick={() => setZoom(14)}
          >
            <Maximize className="h-4 w-4" />
            <span className="sr-only">Reset zoom</span>
          </Button>
        </div>
      </div>
      <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-4 text-blue-800">
        <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
        <div>
          <p className="font-medium">Quartier {location.split(",")[0]}</p>
          <p className="mt-1 text-sm text-blue-700">
            L'emplacement exact sera communiqué après la réservation pour des raisons de sécurité. Le logement est situé
            dans un quartier calme et sécurisé, à proximité des commerces et des transports.
          </p>
        </div>
      </div>
    </div>
  )
}
