"use client"

import { useState, useEffect, useMemo } from "react"

// Hook optimisé pour obtenir les dimensions de la fenêtre
export function useWindowSize() {
  // Initialize with default values for SSR
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    // Handler to call on window resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Add event listener with debounce for better performance
    let timeoutId: NodeJS.Timeout
    const debouncedHandleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleResize, 100)
    }

    window.addEventListener("resize", debouncedHandleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("resize", debouncedHandleResize)
      clearTimeout(timeoutId)
    }
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return windowSize
}

// Helper functions to determine viewport size
export function isMobileView(width: number): boolean {
  return width < 768
}

export function isTabletView(width: number): boolean {
  return width >= 768 && width < 1024
}

export function isDesktopView(width: number): boolean {
  return width >= 1024
}

// Hook optimisé pour la réactivité
export function useResponsive() {
  const { width } = useWindowSize()

  // Mémorisation des valeurs pour éviter des calculs inutiles
  return useMemo(
    () => ({
      isMobile: isMobileView(width),
      isTablet: isTabletView(width),
      isDesktop: isDesktopView(width),
      width,
    }),
    [width],
  )
}

// Hook optimisé pour les media queries
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    const media = window.matchMedia(query)

    // Update the state with the current value
    setMatches(media.matches)

    // Create a handler to update the state when the media query changes
    const listener = () => setMatches(media.matches)

    // Add the listener to the media query
    media.addEventListener("change", listener)

    // Remove the listener when the component is unmounted
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches
}
