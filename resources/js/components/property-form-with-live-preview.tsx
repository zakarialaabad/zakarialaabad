
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { PropertySubmissionForm } from "@/components/property-submission-form"
import { RealTimePropertyPreview } from "@/components/real-time-property-preview" 

// Schéma de validation Zod pour le formulaire (version simplifiée pour la prévisualisation)
const propertySchema = z.object({
  title: z.string(),
  description: z.string(),
  propertyType: z.enum([
    "Appartement", "Maison", "Riad", "Villa", "Studio", "Chambre",
    "Duplex", "Penthouse", "Loft", "Ferme", "Chalet", "Lodge", "Bureau", "Cabane"
  ]),
  city: z.string(),
  district: z.string(),
  bedrooms: z.number(),
  bathrooms: z.number(),
  area: z.number(),
  maxGuests: z.number(),
  price: z.number(),
  availableFrom: z.date(),
  minimumStay: z.number(),
  images: z.array(z.object({ preview: z.string() })),
  rating: z.number().optional(),
})
type PropertyFormData = z.infer<typeof propertySchema>

export default function PropertyFormWithLivePreview() {
  const [showPreview, setShowPreview] = useState(true)

  // Initialiser React Hook Form avec validation minimale pour la prévisualisation
  const methods = useForm({
    resolver: zodResolver(propertySchema),
    mode: "onChange", // Important pour les mises à jour en temps réel
  })

  // Fonction de soumission du formulaire
  const onSubmit = (data:PropertyFormData) => {
    console.log("Formulaire soumis:", data)
    // Ici, vous pourriez envoyer les données à votre API
  }

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Déposer une annonce</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire (occupe 2/3 de l'écran sur grand écran) */}
          <div className="lg:col-span-2">
            <PropertySubmissionForm onSubmit={onSubmit} />
          </div>

          {/* Prévisualisation (occupe 1/3 de l'écran sur grand écran) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Prévisualisation en temps réel</h2>
              <RealTimePropertyPreview />
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  )
}
