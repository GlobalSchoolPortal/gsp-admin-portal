import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationWithNumbersProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showPagination?: boolean
}

export function PaginationWithNumbers({
  currentPage,
  totalPages,
  onPageChange,
  showPagination = true,
}: PaginationWithNumbersProps) {
  if (!showPagination || totalPages <= 1) return null

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page)
    }
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    const pageWindow = 2 // Show 2 pages on each side of current page

    let startPage = Math.max(1, currentPage - pageWindow)
    let endPage = Math.min(totalPages, currentPage + pageWindow)

    // Adjust window to show more numbers if possible
    if (currentPage <= pageWindow) {
      endPage = Math.min(totalPages, 1 + pageWindow * 2)
    } else if (currentPage >= totalPages - pageWindow) {
      startPage = Math.max(1, totalPages - pageWindow * 2)
    }

    // First page
    if (startPage > 1) {
      pageNumbers.push(
        <PaginationItem key={1}>
          <PaginationLink onClick={() => handlePageChange(1)} isActive={currentPage === 1}>
            1
          </PaginationLink>
        </PaginationItem>
      )
      if (startPage > 2) {
        pageNumbers.push(
          <PaginationItem key="start-ellipsis">
            <span className="px-2 text-muted-foreground">...</span>
          </PaginationItem>
        )
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PaginationItem key={i}>
          <PaginationLink onClick={() => handlePageChange(i)} isActive={currentPage === i}>
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <PaginationItem key="end-ellipsis">
            <span className="px-2 text-muted-foreground">...</span>
          </PaginationItem>
        )
      }
      pageNumbers.push(
        <PaginationItem key={totalPages}>
          <PaginationLink onClick={() => handlePageChange(totalPages)} isActive={currentPage === totalPages}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return pageNumbers
  }

  return (
    <Pagination className="mt-4 flex justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            onClick={() => handlePageChange(1)}
            className={`gap-1 px-2 ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
          >
            <ChevronsLeft className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            className={`gap-1 px-2 ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
          >
            <ChevronsRight className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
} 