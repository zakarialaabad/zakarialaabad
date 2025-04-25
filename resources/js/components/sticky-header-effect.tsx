"use client"

import { useEffect, useState } from "react"

export function useStickyHeaderEffect(): boolean {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollPosition = window.scrollY
      if (scrollPosition > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    // Ajouter l'écouteur d'événement
    window.addEventListener("scroll", handleScroll)

    // Vérifier la position initiale
    handleScroll()

    // Nettoyer l'écouteur d'événement
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return isScrolled
}

export function StickyHeaderEffect(): null {
  const isScrolled = useStickyHeaderEffect()

  useEffect(() => {
    const stickyElements = document.querySelectorAll(".sticky")

    stickyElements.forEach((element) => {
      // Vérifier si l'élément est la navbar (header)
      if (element.tagName.toLowerCase() === "header") {
        // Ne pas ajouter la classe scrolled à la navbar
        element.classList.remove("scrolled")
      } else {
        // Pour les autres éléments sticky, conserver le comportement normal
        if (isScrolled) {
          element.classList.add("scrolled")
        } else {
          element.classList.remove("scrolled")
        }
      }
    })
  }, [isScrolled])

  return null
}
