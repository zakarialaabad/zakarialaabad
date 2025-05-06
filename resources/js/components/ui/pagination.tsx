
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}
export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  // Générer les numéros de page à afficher
  const generatePages = () => {
    const pages = []
    // Toujours afficher la première page
    pages.push(1)
    // Calculer la plage de pages à afficher autour de la page actuelle
    const rangeStart = Math.max(2, currentPage - 1)
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1)

    // Ajouter des ellipses si nécessaire avant la plage
    if (rangeStart > 2) {
      pages.push("ellipsis-start")
    }

    // Ajouter les pages dans la plage
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i)
    }

    // Ajouter des ellipses si nécessaire après la plage
    if (rangeEnd < totalPages - 1) {
      pages.push("ellipsis-end")
    }

    // Toujours afficher la dernière page si elle existe
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  const pages = generatePages()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex items-center justify-center space-x-2", className)}
    >
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-full border-gray-200 hover:bg-gray-100 hover:text-gray-700 hover:border-gray-300 transition-colors duration-300"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Page précédente</span>
      </Button>

      {pages.map((page, index) => {
        if (page === "ellipsis-start" || page === "ellipsis-end") {
          return (
            <div key={`ellipsis-${index}`} className="flex items-center justify-center h-9 w-9">
              <MoreHorizontal className="h-4 w-4 text-gray-400" />
            </div>
          )
        }

        return (
          <Button
            key={`page-${page}`}
            variant={currentPage === page ? "default" : "outline"}
            className={cn(
              "h-9 w-9 rounded-full",
              currentPage === page
                ? "bg-[#485aa8] text-white hover:bg-[#485aa8]/90"
                : "text-gray-600 border-gray-200 hover:bg-gray-100 hover:text-gray-700 hover:border-gray-300 transition-colors duration-300",
            )}
            onClick={() => onPageChange(Number(page))}
          >
            {page}
          </Button>
        )
      })}

      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-full border-gray-200 hover:bg-gray-100 hover:text-gray-700 hover:border-gray-300 transition-colors duration-300"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Page suivante</span>
      </Button>
    </motion.div>
  )
}

export const PaginationContent = () => null
export const PaginationItem = () => null
export const PaginationLink = () => null
export const PaginationEllipsis = () => null
export const PaginationPrevious = () => null
export const PaginationNext = () => null
