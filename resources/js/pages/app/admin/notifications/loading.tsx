import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <Loader2 className="h-12 w-12 text-[#465baa] animate-spin mb-4" />
      <p className="text-lg text-gray-500">Chargement des notifications...</p>
    </div>
  )
}
