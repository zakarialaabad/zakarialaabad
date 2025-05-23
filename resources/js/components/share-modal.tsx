
import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Share2 } from "lucide-react"
import { motion } from "framer-motion"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  property: {
    id: string
    title: string
    location: string
    type: string
    bedrooms: number
    bathrooms: number
    beds: number
    rating: number
    reviewCount: number
    images: string[]
  }
}

export function ShareModal({ isOpen, onClose, property }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const mainModalRef = useRef<HTMLDivElement>(null)

  const url = typeof window !== "undefined" ? window.location.href : ""

  // Focus trap for accessibility
  useEffect(() => {
    if (isOpen && mainModalRef.current) {
      setTimeout(() => {
        const firstButton = mainModalRef.current?.querySelector("button")
        firstButton?.focus()
      }, 100)
    }
  }, [isOpen])

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
      icon: (
        <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 5L12 2M12 2L9 5M12 2V14M8 10H5C3.89543 10 3 10.8954 3 12V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V12C21 10.8954 20.1046 10 19 10H16"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ),
      label: "Nearby Sharing",
      onClick: () => console.log("Nearby Sharing clicked"),
    },
    {
      icon: (
        <div className="w-10 h-10 flex items-center justify-center bg-[#1877F2] rounded-full">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
              fill="white"
            />
          </svg>
        </div>
      ),
      label: "Facebook",
      onClick: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`),
    },
    {
      icon: (
        <div className="w-10 h-10 flex items-center justify-center bg-[#D44638] rounded-full">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
        <div className="w-10 h-10 flex items-center justify-center bg-[#25D366] rounded-full">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20.4054 3.4875C18.1607 1.2375 15.1714 0 11.9946 0C5.4375 0 0.101786 5.33571 0.101786 11.8929C0.101786 13.9875 0.648214 16.0339 1.6875 17.8339L0 24L6.30357 22.3446C8.03036 23.2875 9.99107 23.7857 11.9893 23.7857H11.9946C18.5464 23.7857 24 18.45 24 11.8929C24 8.71607 22.65 5.7375 20.4054 3.4875ZM11.9946 21.7875C10.2214 21.7875 8.48571 21.3054 6.98036 20.4V20.4L3.01607 21.4071L4.04464 17.5446L3.4875 16.0125C2.50714 14.4482 2.00357 12.6857 2.00357 10.8857C2.00357 6.44464 6.55357 2.89286 12 2.89286C14.6143 2.89286 17.0732 3.91607 18.9321 5.78036C20.7911 7.64464 21.9321 10.1036 21.9268 12.7179C21.9268 17.1643 17.4375 21.7875 11.9946 21.7875ZM17.4161 14.3839C17.1214 14.2339 15.6589 13.5161 15.3857 13.4143C15.1125 13.3179 14.9143 13.2696 14.7161 13.5643C14.5179 13.8589 13.95 14.5286 13.7732 14.7268C13.6018 14.925 13.425 14.9518 13.1304 14.8018C11.3839 13.9286 10.2375 13.2429 9.08571 11.2607C8.78036 10.7357 9.39107 10.7786 9.95893 9.64286C10.0607 9.44464 10.0125 9.27321 9.94107 9.12321C9.86964 8.97321 9.27321 7.51071 9.02679 6.91607C8.78571 6.33214 8.53929 6.41786 8.35714 6.40714C8.18571 6.39643 7.9875 6.39643 7.78929 6.39643C7.59107 6.39643 7.26964 6.46786 6.99643 6.7625C6.72321 7.05714 5.95714 7.775 5.95714 9.2375C5.95714 10.7 7.0125 12.1143 7.16964 12.3125C7.33214 12.5107 9.26786 15.4643 12.2036 16.7625C14.1429 17.6411 14.9143 17.7214 15.9 17.5768C16.4893 17.4857 17.6625 16.85 17.9089 16.1589C18.1554 15.4679 18.1554 14.8732 18.0839 14.7321C18.0179 14.5804 17.8196 14.4857 17.5196 14.3357L17.4161 14.3839Z"
              fill="white"
            />
          </svg>
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
        <div className="w-10 h-10 flex items-center justify-center bg-[#7719AA] rounded-full">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21 6H3C2.44772 6 2 6.44772 2 7V17C2 17.5523 2.44772 18 3 18H21C21.5523 18 22 17.5523 22 17V7C22 6.44772 21.5523 6 21 6Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M16 10H8V14H16V10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      ),
      label: "OneNote for Windows 10",
      onClick: () => console.log("OneNote clicked"),
    },
    {
      icon: (
        <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 10V7C20 5.93913 19.5786 4.92172 18.8284 4.17157C18.0783 3.42143 17.0609 3 16 3H7C5.93913 3 4.92172 3.42143 4.17157 4.17157C3.42143 4.92172 3 5.93913 3 7V17C3 18.0609 3.42143 19.0783 4.17157 19.8284C4.92172 20.5786 5.93913 21 7 21H16C17.0609 21 18.0783 20.5786 18.8284 19.8284C19.5786 19.0783 20 18.0609 20 17V14"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 12C16.6569 12 18 10.6569 18 9C18 7.34315 16.6569 6 15 6C13.3431 6 12 7.34315 12 9C12 10.6569 13.3431 12 15 12Z"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 10H7V13H10V10Z"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M7 16H13" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 16H16" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      ),
      label: "Phone Link",
      onClick: () => console.log("Phone Link clicked"),
    },
    {
      icon: (
        <div className="w-10 h-10 flex items-center justify-center bg-[#1DA1F2] rounded-full">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M23 3.00005C22.0424 3.67552 20.9821 4.19216 19.86 4.53005C19.2577 3.83756 18.4573 3.34674 17.567 3.12397C16.6767 2.90121 15.7395 2.95724 14.8821 3.2845C14.0247 3.61176 13.2884 4.19445 12.773 4.95376C12.2575 5.71308 11.9877 6.61238 12 7.53005V8.53005C10.2426 8.57561 8.50127 8.18586 6.93101 7.39549C5.36074 6.60513 4.01032 5.43868 3 4.00005C3 4.00005 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.50005C20.9991 7.2215 20.9723 6.94364 20.92 6.67005C21.9406 5.66354 22.6608 4.39276 23 3.00005Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
        <div className="w-10 h-10 flex items-center justify-center bg-[#0077B5] rounded-full">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M6 9H2V21H6V9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ),
      label: "LinkedIn",
      onClick: () => console.log("LinkedIn clicked"),
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="w-[95vw] max-w-md p-0 gap-0 overflow-hidden max-h-[90vh] bg-[#F5F5F5] text-[#000000]"
        aria-labelledby="share-dialog-title"
        aria-describedby="share-dialog-description"
      >
        <motion.div
          ref={mainModalRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col h-full overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center p-4 border-b border-gray-200">
            <div className="flex-1 flex items-center">
              <span className="font-medium">Share link</span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-200"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Link section */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between p-2 border rounded-md bg-white">
              <div className="flex flex-col flex-1 min-w-0 mr-2">
                <span className="font-medium text-sm">ejar.com</span>
                <span className="text-xs text-gray-500 truncate">{url}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  className="p-1.5 hover:bg-gray-100 rounded-md"
                  aria-label="QR Code"
                  onClick={() => console.log("QR Code clicked")}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 11H11V3H3V11ZM5 5H9V9H5V5Z" fill="currentColor" />
                    <path d="M3 21H11V13H3V21ZM5 15H9V19H5V15Z" fill="currentColor" />
                    <path d="M13 3V11H21V3H13ZM19 9H15V5H19V9Z" fill="currentColor" />
                    <path d="M21 19H19V21H21V19Z" fill="currentColor" />
                    <path d="M15 13H13V15H15V13Z" fill="currentColor" />
                    <path d="M17 15H15V17H17V15Z" fill="currentColor" />
                    <path d="M15 17H13V19H15V17Z" fill="currentColor" />
                    <path d="M17 19H15V21H17V19Z" fill="currentColor" />
                    <path d="M19 17H17V19H19V17Z" fill="currentColor" />
                    <path d="M19 13H17V15H19V13Z" fill="currentColor" />
                    <path d="M21 15H19V17H21V15Z" fill="currentColor" />
                  </svg>
                </button>
                <button
                  className="p-1.5 hover:bg-gray-100 rounded-md"
                  aria-label="Copier le lien"
                  onClick={handleCopyLink}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* No contacts section */}
          <div className="p-4 border-b border-gray-200">
            <p className="text-gray-500">No contacts yet</p>
          </div>

          {/* Share using section */}
          <div className="p-4 overflow-y-auto">
            <h3 className="font-medium mb-4">Share using</h3>
            <div className="grid grid-cols-4 gap-4">
              {shareOptions.map((option, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center gap-2"
                  onClick={option.onClick}
                  aria-label={`Partager via ${option.label}`}
                >
                  {option.icon}
                  <span className="text-xs text-center line-clamp-1">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

// Composant bouton de partage qui ouvre le modal
export function ShareButton({ property }: { property: ShareModalProps["property"] }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => setIsOpen(true)}
        aria-label="Partager ce logement"
      >
        <Share2 className="h-4 w-4" />
        <span>Partager</span>
      </Button>

      <ShareModal isOpen={isOpen} onClose={() => setIsOpen(false)} property={property} />
    </>
  )
}
