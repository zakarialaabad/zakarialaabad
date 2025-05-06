
import React, { useState, useRef, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useWindowSize, isMobileView } from "@/utils/responsive-utils"

interface FilterItem {
  id: string
  label: string
  icon: React.ReactNode
}

interface HorizontalFilterBarProps {
  filters: FilterItem[]
  activeFilter: string
  onFilterChange: (filterId: string) => void
  className?: string
}

export function HorizontalFilterBar({
  filters,
  activeFilter,
  onFilterChange,
  className,
}: HorizontalFilterBarProps){
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()
  const isMobile = isMobileView(width)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // Vérifier si les flèches de navigation doivent être affichées
  const checkScrollPosition = useCallback((): void => {
    if (!scrollContainerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setShowLeftArrow(scrollLeft > 10) // Montrer la flèche gauche si on a défilé d'au moins 10px
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10) // 10px de marge pour éviter des problèmes de précision
  }, [])

  // Initialiser l'état des flèches au chargement et lors du redimensionnement
  useEffect(() => {
    checkScrollPosition()
    window.addEventListener("resize", checkScrollPosition)
    return () => window.removeEventListener("resize", checkScrollPosition)
  }, [checkScrollPosition])

  // Animation fluide du défilement
  const animateScroll = useCallback((start: number, target: number): void => {
    if (!scrollContainerRef.current) return

    const duration = 300 // ms
    const startTime = performance.now()

    const animateStep = (timestamp: number): void => {
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Fonction d'easing pour un défilement plus naturel
      const easeInOutCubic =
        progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2

      const currentPosition = start + (target - start) * easeInOutCubic

      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = currentPosition
      }

      if (progress < 1) {
        requestAnimationFrame(animateStep)
      }
    }

    requestAnimationFrame(animateStep)
  }, [])

  // Faire défiler vers la gauche
  const scrollLeftHandler = useCallback((): void => {
    if (!scrollContainerRef.current) return
    const scrollAmount = scrollContainerRef.current.clientWidth * (isMobile ? 0.5 : 0.8)

    // Animation fluide avec requestAnimationFrame
    const startPosition = scrollContainerRef.current.scrollLeft
    const targetPosition = Math.max(0, startPosition - scrollAmount)
    animateScroll(startPosition, targetPosition)
  }, [isMobile, animateScroll])

  // Faire défiler vers la droite
  const scrollRightHandler = useCallback((): void => {
    if (!scrollContainerRef.current) return
    const scrollAmount = scrollContainerRef.current.clientWidth * (isMobile ? 0.5 : 0.8)

    // Animation fluide avec requestAnimationFrame
    const startPosition = scrollContainerRef.current.scrollLeft
    const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
    const targetPosition = Math.min(maxScroll, startPosition + scrollAmount)
    animateScroll(startPosition, targetPosition)
  }, [isMobile, animateScroll])

  // Gestion du défilement tactile
  const handleMouseDown = useCallback((e: React.MouseEvent): void => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent): void => {
    if (!scrollContainerRef.current || e.touches.length !== 1) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent): void => {
      if (!isDragging || !scrollContainerRef.current) return
      e.preventDefault()
      const x = e.pageX - scrollContainerRef.current.offsetLeft
      const walk = (x - startX) * 2 // Multiplicateur pour accélérer le défilement
      scrollContainerRef.current.scrollLeft = scrollLeft - walk
    },
    [isDragging, startX, scrollLeft],
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent): void => {
      if (!isDragging || !scrollContainerRef.current || e.touches.length !== 1) return
      const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft
      const walk = (x - startX) * 2
      scrollContainerRef.current.scrollLeft = scrollLeft - walk
    },
    [isDragging, startX, scrollLeft],
  )

  const handleMouseUp = useCallback((): void => {
    setIsDragging(false)
  }, [])

  const handleMouseLeave = useCallback((): void => {
    setIsDragging(false)
  }, [])

  // Effet pour faire défiler automatiquement vers l'élément actif
  useEffect(() => {
    if (!scrollContainerRef.current) return

    // Trouver l'index de l'élément actif
    const activeIndex = filters.findIndex((filter) => filter.id === activeFilter)
    if (activeIndex === -1) return

    // Trouver l'élément DOM correspondant
    const filterElements = scrollContainerRef.current.querySelectorAll(".filter-item")
    if (!filterElements || filterElements.length <= activeIndex) return

    const activeElement = filterElements[activeIndex] as HTMLElement
    if (!activeElement) return

    // Calculer la position de défilement pour centrer l'élément actif
    const containerWidth = scrollContainerRef.current.offsetWidth
    const elementLeft = activeElement.offsetLeft
    const elementWidth = activeElement.offsetWidth

    const targetScroll = elementLeft - containerWidth / 2 + elementWidth / 2

    // Animer le défilement vers l'élément actif
    animateScroll(scrollContainerRef.current.scrollLeft, targetScroll)
  }, [activeFilter, filters, animateScroll])

  return (
    <div className={cn("relative w-full", className)}>
      {/* Flèche de navigation gauche */}
      <AnimatePresence>
        {showLeftArrow && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={scrollLeftHandler}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 flex items-center justify-center"
            aria-label="Défiler vers la gauche"
          >
            <div className="absolute inset-0 bg-white rounded-full shadow-md border border-gray-200 z-0"></div>
            <div className="absolute -inset-2 bg-gradient-radial from-white/80 via-white/40 to-transparent rounded-full z-[-1]"></div>
            <ChevronLeft className="h-3 w-3 text-gray-700 relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Conteneur scrollable des filtres */}
      <div className="overflow-hidden px-6">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide py-1 snap-x scroll-smooth"
          onScroll={checkScrollPosition}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={cn(
                "flex flex-col items-center justify-center min-w-[70px] px-1 py-0 mx-1 snap-center transition-all filter-item",
                "hover:opacity-90 focus:outline-none",
              )}
            >
                      {React.isValidElement(filter.icon) ? (
          React.cloneElement(filter.icon as React.ReactElement<any>, {
            className: cn("h-5 w-5", activeFilter === filter.id ? "text-black" : "text-gray-500"),
            strokeWidth: 1,
          })
        ) : (
          <span className="text-gray-500">Icon</span>
        )}

              <span
                className={cn(
                  "text-xs font-medium whitespace-nowrap transition-colors duration-300",
                  activeFilter === filter.id ? "text-black font-medium" : "text-gray-500",
                )}
              >
                {filter.label}
              </span>
              {activeFilter === filter.id && <div className="h-[2px] w-full bg-black mt-0.5 rounded-none" />}
            </button>
          ))}
        </div>
      </div>

      {/* Flèche de navigation droite */}
      <AnimatePresence>
        {showRightArrow && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={scrollRightHandler}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 flex items-center justify-center"
            aria-label="Défiler vers la droite"
          >
            <div className="absolute inset-0 bg-white rounded-full shadow-md border border-gray-200 z-0"></div>
            <div className="absolute -inset-2 bg-gradient-radial from-white/80 via-white/40 to-transparent rounded-full z-[-1]"></div>
            <ChevronRight className="h-3 w-3 text-gray-700 relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
