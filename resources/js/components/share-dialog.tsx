
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Copy,
  Mail,
  MessageSquare,
  Phone,
  Facebook,
  Twitter,
  Code,
  MoreHorizontal,
  X,
  Smartphone,
  Linkedin,
} from "lucide-react"
import { useState } from "react"

interface ShareDialogProps {
  isOpen: boolean
  onClose: () => void
  property: {
    id: string
    title: string
    location: string
    bedrooms: number
    bathrooms: number
    beds?: number
    rating?: number
    images: string[]
  }
}

export function ShareDialog({ isOpen, onClose, property }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)
  const [showMoreOptions, setShowMoreOptions] = useState(false)

  const url = typeof window !== "undefined" ? window.location.href : ""

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Erreur lors de la copie:", error)
    }
  }

  const shareOptions = [
    {
      icon: <Copy className="h-5 w-5" />,
      label: "Copier le lien",
      onClick: handleCopyLink,
      feedback: copied ? "Lien copié!" : null,
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      onClick: () =>
        window.open(
          `mailto:?subject=Découvrez ce logement sur E-JAR&body=${property.title} à ${property.location}%0A%0A${url}`,
        ),
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: "Messages",
      onClick: () => window.open(`sms:?body=Découvrez ce logement sur E-JAR: ${url}`),
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "WhatsApp",
      onClick: () =>
        window.open(
          `https://wa.me/?text=Découvrez ce logement sur E-JAR: ${property.title} à ${property.location} ${url}`,
        ),
    },
    {
      icon: <Facebook className="h-5 w-5" />,
      label: "Facebook",
      onClick: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`),
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      label: "Twitter",
      onClick: () =>
        window.open(
          `https://twitter.com/intent/tweet?text=Découvrez ce logement sur E-JAR: ${property.title} à ${property.location}&url=${encodeURIComponent(url)}`,
        ),
    },
    {
      icon: <Code className="h-5 w-5" />,
      label: "Intégrer",
      onClick: () => handleCopyLink(),
    },
    {
      icon: <MoreHorizontal className="h-5 w-5" />,
      label: "Plus d'options",
      onClick: () => setShowMoreOptions(true),
    },
  ]

  const extendedShareOptions = [
    {
      icon: (
        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
          <Smartphone className="h-5 w-5 text-blue-600" />
        </div>
      ),
      label: "Nearby Sharing",
      onClick: () => {
        if (navigator.share) {
          navigator
            .share({
              title: `E-JAR: ${property.title}`,
              text: `Découvrez ce logement sur E-JAR: ${property.title} à ${property.location}`,
              url: url,
            })
            .catch((err) => console.error("Erreur de partage:", err))
        }
      },
    },
    {
      icon: (
        <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full">
          <Facebook className="h-5 w-5 text-white" />
        </div>
      ),
      label: "Facebook",
      onClick: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`),
    },
    {
      icon: (
        <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
          <Mail className="h-5 w-5 text-red-600" />
        </div>
      ),
      label: "Gmail",
      onClick: () =>
        window.open(
          `mailto:?subject=Découvrez ce logement sur E-JAR&body=${property.title} à ${property.location}%0A%0A${url}`,
        ),
    },
    {
      icon: (
        <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
          <Phone className="h-5 w-5 text-green-600" />
        </div>
      ),
      label: "WhatsApp",
      onClick: () =>
        window.open(
          `https://wa.me/?text=Découvrez ce logement sur E-JAR: ${property.title} à ${property.location} ${url}`,
        ),
    },
    {
      icon: (
        <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
          <Code className="h-5 w-5 text-purple-600" />
        </div>
      ),
      label: "OneNote",
      onClick: () => handleCopyLink(),
    },
    {
      icon: (
        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
          <Smartphone className="h-5 w-5 text-blue-600" />
        </div>
      ),
      label: "Phone Link",
      onClick: () => window.open(`sms:?body=Découvrez ce logement sur E-JAR: ${url}`),
    },
    {
      icon: (
        <div className="flex items-center justify-center w-10 h-10 bg-black rounded-full">
          <Twitter className="h-5 w-5 text-white" />
        </div>
      ),
      label: "Twitter",
      onClick: () =>
        window.open(
          `https://twitter.com/intent/tweet?text=Découvrez ce logement sur E-JAR: ${property.title} à ${property.location}&url=${encodeURIComponent(url)}`,
        ),
    },
    {
      icon: (
        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
          <Linkedin className="h-5 w-5 text-blue-600" />
        </div>
      ),
      label: "LinkedIn",
      onClick: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`),
    },
  ]

  if (showMoreOptions) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-md">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Copy className="h-5 w-5" />
              <span className="font-semibold">Partager le lien</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setShowMoreOptions(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Retour</span>
              </Button>
            </div>
          </div>

          <div className="p-4 border rounded-md mx-4 flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <Copy className="h-5 w-5 flex-shrink-0" />
              <div className="overflow-hidden">
                <p className="font-medium text-sm">ejar.com</p>
                <p className="text-xs text-gray-500 truncate">{url}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopyLink}>
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copier</span>
            </Button>
          </div>

          <p className="text-sm text-gray-500 mx-4 mt-4">Aucun contact pour l'instant</p>

          <div className="px-4 mt-4">
            <h3 className="text-sm font-medium mb-4">Partager via</h3>
            <div className="grid grid-cols-4 gap-4">
              {extendedShareOptions.map((option, index) => (
                <div key={index} className="flex flex-col items-center gap-2" onClick={option.onClick}>
                  <button className="cursor-pointer">{option.icon}</button>
                  <span className="text-xs text-center">{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Partager ce logement</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-4 py-3 border-b border-gray-200">
          <div className="relative h-16 w-16 overflow-hidden rounded-md">
            <img src={property.images[0] || "/placeholder.svg"} alt={property.title}  className="object-cover w-full h-full" />
          </div>
          <div>
            <p className="text-sm font-medium">
              {property.title} • {property.location}
            </p>
            <p className="text-sm text-gray-600">
              {property.rating && `★${property.rating} • `}
              {property.bedrooms} chambre{property.bedrooms > 1 ? "s" : ""} •
              {property.beds && ` ${property.beds} lit${property.beds > 1 ? "s" : ""} • `}
              {property.bathrooms} salle{property.bathrooms > 1 ? "s" : ""} de bain
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 py-4">
          {shareOptions.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start h-12 px-4 py-3 border-gray-200 hover:bg-gray-50"
              onClick={option.onClick}
            >
              <div className="flex items-center gap-3">
                {option.icon}
                <span>{option.label}</span>
                {option.feedback && (
                  <span className="ml-auto text-xs text-green-600 font-medium">{option.feedback}</span>
                )}
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
