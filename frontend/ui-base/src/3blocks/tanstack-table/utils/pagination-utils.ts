import type { Table } from "@tanstack/react-table"
import type { PaginationInfo } from "../types"

// Constants
export const PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50]

// Calculate pagination info
export function calculatePaginationInfo(
  serverPagination: boolean,
  table: Table<any>,
  currentPage: number,
  pageSize: number,
  totalItems: number
): PaginationInfo {
  if (serverPagination) {
    const totalPages = Math.ceil(totalItems / pageSize)
    return {
      currentPage,
      pageSize,
      totalItems,
      totalPages,
      canPreviousPage: currentPage > 0,
      canNextPage: currentPage < totalPages - 1,
    }
  }
  return {
    currentPage: table.getState().pagination?.pageIndex || 0,
    pageSize: table.getState().pagination?.pageSize || 10,
    totalItems: table.getFilteredRowModel().rows.length,
    totalPages: table.getPageCount(),
    canPreviousPage: table.getCanPreviousPage(),
    canNextPage: table.getCanNextPage(),
  }
}
