import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2, Copy,Code,Phone, Mail, MessageSquare, Facebook, Twitter, Linkedin, MoreHorizontal } from "lucide-react";

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  property: {
    id: string;
    title: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    beds?: number;
    rating?: number;
    images: string[];
  };
}

export function ShareDialog({ isOpen, onClose, property }: ShareDialogProps) {
  const [copied, setCopied] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const url = typeof window !== "undefined" ? window.location.href : "";
  const title = `Check out this property: ${property.title}`;
  const text = `Take a look at this amazing property: ${property.title} located in ${property.location}.`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

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
      onClick: () =>handleNativeShare()
    },
  ];

  const extendedShareOptions =
  [
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
      onClick: () =>handleNativeShare()
,
    },
  ]
;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        {!showMoreOptions ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Share this property</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4 py-4">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-md">
                  <img
                    src={property.images[0] || "/placeholder.svg"}
                    alt={property.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {property.title} • {property.location}
                  </p>
                  <p className="text-sm text-gray-600">
                    {property.rating && `★${property.rating} • `}
                    {property.bedrooms} bedroom{property.bedrooms !== 1 ? "s" : ""} •
                    {property.bathrooms} bathroom{property.bathrooms !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
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
                        <span className="ml-auto text-xs text-green-600 font-medium">
                          {option.feedback}
                        </span>
                      )}
                    </div>
                  </Button>
                ))}
              </div>

             
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                <span className="font-semibold">Share with apps</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setShowMoreOptions(false)}
                >
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4">
              {extendedShareOptions.map((option, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <Button
                    variant="outline"
                    className="h-16 w-16 rounded-full"
                    onClick={option.onClick}
                  >
                    {option.icon}
                  </Button>
                  <span className="text-xs text-center">{option.label}</span>
                </div>
              ))}
            </div>

         
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
