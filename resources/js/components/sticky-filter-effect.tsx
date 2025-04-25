"use client"

import { useEffect } from "react"

export function StickyFilterEffect(): null {
  useEffect(() => {
    const handleScroll = (): void => {
      const filterBar = document.querySelector(".filter-bar-sticky")
      if (!filterBar) return

      if (window.scrollY > 100) {
        filterBar.classList.add("scrolled")
      } else {
        filterBar.classList.remove("scrolled")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return null
}
