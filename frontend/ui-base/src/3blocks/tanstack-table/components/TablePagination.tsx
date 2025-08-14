import { Button } from "@/src/1base"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import React, { useMemo } from "react"
import type { PaginationInfo } from "../types"
import { PAGE_SIZE_OPTIONS } from "../utils/pagination-utils"

interface TablePaginationProps {
  paginationInfo: PaginationInfo
  handlePageChange: (page: number) => void
  handlePageSizeChange: (size: number) => void
  showRowCount: boolean
  selectedRowCount: number
  filteredRowCount: number
  isPaginationLoading: boolean
  serverPagination: boolean
}

// Internal component that will be memoized
const TablePaginationComponent: React.FC<TablePaginationProps> = ({
  paginationInfo,
  handlePageChange,
  handlePageSizeChange,
  showRowCount,
  selectedRowCount,
  filteredRowCount,
  isPaginationLoading,
  serverPagination,
}) => {
  // Hoist the memoized text above the JSX to comply with Rules of Hooks
  const selectedRowText = useMemo(() => {
    const totalCount = serverPagination
      ? paginationInfo.totalItems
      : filteredRowCount
    return `${selectedRowCount} of ${totalCount} row(s) selected.`
  }, [
    selectedRowCount,
    serverPagination,
    paginationInfo.totalItems,
    filteredRowCount,
  ])

  return (
    <div className="flex items-center justify-between space-x-2 py-4">
      {showRowCount && (
        <div className="text-muted-foreground text-sm dark:text-gray-400">
          {selectedRowText}
        </div>
      )}

      <div className="ml-auto flex items-center space-x-2">
        <div className="flex items-center gap-1 text-muted-foreground text-sm dark:text-gray-400">
          <div>Rows per page</div>
          <select
            value={paginationInfo.pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="h-8 border-0 bg-transparent text-muted-foreground dark:text-gray-400"
          >
            {PAGE_SIZE_OPTIONS.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground text-sm dark:text-gray-400">
          {useMemo(() => {
            return `Page ${paginationInfo.currentPage + 1} of ${paginationInfo.totalPages || 1}`
          }, [paginationInfo.currentPage, paginationInfo.totalPages])}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="1"
            onClick={() => handlePageChange(0)}
            disabled={!paginationInfo.canPreviousPage || isPaginationLoading}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="1"
            onClick={() => handlePageChange(paginationInfo.currentPage - 1)}
            disabled={!paginationInfo.canPreviousPage || isPaginationLoading}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="1"
            onClick={() => handlePageChange(paginationInfo.currentPage + 1)}
            disabled={!paginationInfo.canNextPage || isPaginationLoading}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="1"
            onClick={() => handlePageChange(paginationInfo.totalPages - 1)}
            disabled={!paginationInfo.canNextPage || isPaginationLoading}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// Export memoized version to prevent unnecessary re-renders
export const TablePagination = React.memo(TablePaginationComponent)
