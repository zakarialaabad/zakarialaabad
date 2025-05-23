
import type React from "react"
import { useState, useCallback, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, Grid2X2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface PropertyGalleryProps {
  images: string[]
  title: string
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
useEffect(() => {
  console.log("list of images:", images);
})
  const handlePrevious = useCallback(() => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const handleNext = useCallback(() => {
    setCurrentPhotoIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious()
      if (e.key === "ArrowRight") handleNext()
      if (e.key === "Escape") setShowAllPhotos(false)
    },
    [handleNext, handlePrevious],
  )

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8 overflow-hidden"
      >
        <div className="container px-4 md:px-6">
          <div
            className="relative grid h-[400px] grid-cols-1 gap-2 overflow-hidden rounded-xl md:grid-cols-4 md:grid-rows-2 lg:h-[500px]"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Image principale avec effet de zoom au survol */}
            <div className="relative col-span-1 row-span-2 md:col-span-2 overflow-hidden group">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }} className="h-full w-full">
              <img
    src={`${images[0]}`}
    alt={`${title} - Image principale`}
    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
    style={{
      objectFit: 'cover',
    }}
  />
              </motion.div>

              {/* Overlay subtil au survol */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovering ? 0.1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black pointer-events-none"
              />
            </div>

            {/* Images secondaires avec effet de zoom au survol */}
            {images.slice(1, 5).map((image, index) => (
              console.log("image", image),
              <div key={index} className="relative hidden md:block overflow-hidden group">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }} className="h-full w-full">
                  <img
                  src={`/${image}`}
                    alt={`${title} - Image ${index + 2}`}
                    className="absolute inset-0 bg-black pointer-events-none object-cover transition-transform duration-700"
                    sizes="25vw"
                    loading="lazy" 
                  />
                  
                </motion.div>

                {/* Overlay subtil au survol */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovering ? 0.1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black pointer-events-none"
                />
              </div>
            ))}

            {/* Bouton pour voir toutes les photos - redesigné et mieux positionné */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isHovering ? 1 : 0.9,
                y: 0,
                scale: isHovering ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-6 right-6 z-10"
            >
              <Button
                onClick={() => setShowAllPhotos(true)}
                className="group flex items-center gap-2 rounded-lg bg-white/90 px-4 py-2.5 text-sm font-medium text-gray-900 shadow-lg hover:bg-white backdrop-blur-sm border border-gray-200/50 transition-all duration-300"
              >
                <Grid2X2 className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                <span>Voir toutes les photos</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Modal pour afficher toutes les photos - amélioré avec animations */}
      <Dialog open={showAllPhotos} onOpenChange={setShowAllPhotos}>
        <DialogContent
          className="max-w-5xl p-0 sm:rounded-2xl overflow-hidden bg-black/95 border-none"
          onKeyDown={handleKeyDown}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative h-[85vh]"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 z-10 h-10 w-10 rounded-full bg-black/40 text-white hover:bg-black/60 transition-all duration-300"
              onClick={() => setShowAllPhotos(false)}
            >
              <X className="h-5 w-5" />
            </Button>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhotoIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="relative h-full w-full flex items-center justify-center"
              >
                <img
                  src={`/${images[currentPhotoIndex]}` || "/placeholder.svg"}
                  alt={`${title} - Photo ${currentPhotoIndex + 1}`}
                  className="absolute inset-0 bg-black pointer-events-none object-contain"

                  sizes="100vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* Boutons de navigation améliorés */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2"
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm transition-all duration-300"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2"
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm transition-all duration-300"
                onClick={handleNext}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </motion.div>

            {/* Indicateur de position amélioré */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 backdrop-blur-sm"
              >
                <span className="text-sm font-medium text-white">
                  {currentPhotoIndex + 1} / {images.length}
                </span>
                <div className="flex gap-1">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPhotoIndex(idx)}
                      className={cn(
                        "h-1.5 rounded-full transition-all",
                        idx === currentPhotoIndex ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80",
                      )}
                      aria-label={`Voir l'image ${idx + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  )
}
