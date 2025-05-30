
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {DirectFormWithPreview} from "@/components/direct-form-with-preview"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { router } from "@inertiajs/react"
export default function DeposerAnnonce() {

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 pt-6">
          <Button
            variant="ghost"
            className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
            onClick={() => window.history.back()}  
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
        </div>
                  <DirectFormWithPreview />

      </main>
      <Footer />
    </div>
  )
}
