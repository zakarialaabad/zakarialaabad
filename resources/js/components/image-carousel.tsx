import { useState, useCallback, memo, MouseEvent } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
interface ImageCarouselProps {
  images: string[] | string
  alt: string
  aspectRatio?: "square" | "video" | "wide" | "tall" | "auto"
  width?: number
  height?: number
  className?: string
  showControls?: boolean
  priority?: boolean
}
export const ImageCarousel = memo(function ImageCarousel({
  images,
  alt,
  aspectRatio = "auto",
  width,
  height,
  className,
  showControls = true,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  // ✅ تحويل الصور من string إلى array إن لزم
  let parsedImages: string[] = []
  try {
    if (typeof images === "string") {
      const temp = JSON.parse(images)
      if (Array.isArray(temp)) {
        parsedImages = temp.filter((img) => typeof img === "string" && img.trim() !== "")
      }
    } else if (Array.isArray(images)) {
      parsedImages = images.filter((img) => typeof img === "string" && img.trim() !== "")
    }
  } catch (error) {
    console.warn("Invalid image data:", error)
  }
  const safeImages = parsedImages.length > 0 ? parsedImages : ["/placeholder.svg"]
  const goToNext = useCallback(
    (e: MouseEvent): void => {
      e.preventDefault()
      e.stopPropagation()
      setCurrentIndex((prevIndex) => (prevIndex + 1) % safeImages.length)
    },
    [safeImages.length],
  )

  const goToPrevious = useCallback(
    (e: MouseEvent): void => {
      e.preventDefault()
      e.stopPropagation()
      setCurrentIndex((prevIndex) => (prevIndex - 1 + safeImages.length) % safeImages.length)
    },
    [safeImages.length],
  )

  const goToIndex = useCallback((index: number, e: MouseEvent): void => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIndex(index)
  }, [])

  const getAspectRatio = (): string => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square"
      case "video":
        return "aspect-video"
      case "wide":
        return "aspect-[16/9]"
      case "tall":
        return "aspect-[3/4]"
      case "auto":
      default:
        return ""
    }
  }

  const currentImage = safeImages[currentIndex] || "/placeholder.svg"

  return (
    <div
      className={cn(
        "relative group overflow-hidden rounded-lg w-full h-full",
        aspectRatio !== "auto" && getAspectRatio(),
        className,
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={currentImage}
            alt={`${alt} - Image ${currentIndex + 1}`}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            loading={currentIndex === 0 ? "eager" : "lazy"}
          />
        </motion.div>
      </AnimatePresence>

      {showControls && safeImages.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 z-20 h-8 w-8 -translate-y-1/2 rounded-full bg-white/80 text-gray-700 opacity-0 shadow-sm backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-gray-100 hover:text-gray-900"
            onClick={goToPrevious}
            aria-label="Previous Image"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 z-20 h-8 w-8 -translate-y-1/2 rounded-full bg-white/80 text-gray-700 opacity-0 shadow-sm backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-gray-100 hover:text-gray-900"
            onClick={goToNext}
            aria-label="Next Image"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <div className="absolute bottom-2 left-0 right-0 z-20 flex justify-center space-x-1">
            {safeImages.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  index === currentIndex ? "w-6 bg-gray-700" : "w-1.5 bg-gray-400/60",
                )}
                onClick={(e) => goToIndex(index, e)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
})
