"use client"

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import type {
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table"
import { useCallback, useMemo } from "react"
import { shouldPaginationBeVisible } from "../utils/filter-utils"
import { calculatePaginationInfo } from "../utils/pagination-utils"

interface TableStateProps {
  sorting: SortingState
  setSorting: OnChangeFn<SortingState>
  columnFilters: ColumnFiltersState
  setColumnFilters: OnChangeFn<ColumnFiltersState>
  columnVisibility: VisibilityState
  setColumnVisibility: OnChangeFn<VisibilityState>
  rowSelection: RowSelectionState
  setRowSelection: OnChangeFn<RowSelectionState>
}

interface TableInstanceProps<TData> {
  data: TData[]
  columnDefs: ColumnDef<TData, any>[]
  enableSorting: boolean
  enableFiltering: boolean
  enablePagination: boolean
  serverPagination?: boolean
  currentPage?: number
  pageSize?: number
  totalItems?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  onSelectionChange?: (selectedRows: TData[]) => void
  showPagination?: boolean | undefined
  tableState: TableStateProps
}

/**
 * Hook to create and manage table instance
 */
export function useTableInstance<TData>({
  data,
  columnDefs,
  enableSorting,
  enableFiltering,
  enablePagination,
  serverPagination = false,
  currentPage = 0,
  pageSize = 10,
  totalItems = 0,
  onPageChange,
  onPageSizeChange,
  onSelectionChange,
  showPagination,
  tableState,
}: TableInstanceProps<TData>) {
  const {
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    columnVisibility,
    setColumnVisibility,
    rowSelection,
    setRowSelection,
  } = tableState

  // For server-side pagination, we need to control the pagination state
  const pagination = useMemo<PaginationState>(
    () => ({
      pageIndex: serverPagination ? currentPage : 0,
      pageSize: serverPagination ? pageSize : 10,
    }),
    [serverPagination, currentPage, pageSize]
  )

  const table = useReactTable({
    data,
    columns: columnDefs,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    // Only use client pagination if server pagination is disabled
    ...(enablePagination && !serverPagination
      ? { getPaginationRowModel: getPaginationRowModel() }
      : {}),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: (updatedSelection) => {
      setRowSelection(updatedSelection)
      // Call the selection change handler if provided
      if (onSelectionChange) {
        const selectedRowIds = Object.keys(updatedSelection).filter(
          (id) => (updatedSelection as Record<string, boolean>)[id]
        )

        const selectedRowData = selectedRowIds
          .map((id) => table.getRow(id))
          .filter((row): row is typeof row & { original: TData } => !!row)
          .map((row) => row.original)

        onSelectionChange(selectedRowData)
      }
    },
    // Use manual pagination for server-side pagination
    manualPagination: serverPagination,
    manualFiltering: false,
    // If using server pagination, provide the total row count
    pageCount: serverPagination ? Math.ceil(totalItems / pageSize) : undefined,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      ...(serverPagination ? { pagination } : {}),
    },
    // Important! Set this debugging flag to true to detect issues
    debugAll: process.env.NODE_ENV !== "production",
  })

  // Handle page change for server-side pagination
  const handlePageChange = useCallback(
    (newPage: number) => {
      if (serverPagination && onPageChange) {
        onPageChange(newPage)
      } else {
        table.setPageIndex(newPage)
      }
    },
    [serverPagination, onPageChange, table]
  )

  // Handle page size change for server-side pagination
  const handlePageSizeChange = useCallback(
    (newPageSize: number) => {
      if (serverPagination && onPageSizeChange) {
        onPageSizeChange(newPageSize)
      } else {
        table.setPageSize(newPageSize)
      }
    },
    [serverPagination, onPageSizeChange, table]
  )

  // Calculate pagination info for server-side pagination
  const paginationInfo = useMemo(
    () =>
      calculatePaginationInfo(
        serverPagination,
        table,
        currentPage,
        pageSize,
        totalItems
      ),
    [serverPagination, table, currentPage, pageSize, totalItems]
  )

  // Extract table state once to avoid repeated access in dependency arrays
  const reactTableState = table.getState()

  // Memoize just the filtered rows length as its own value
  const filteredRowCount = useMemo(() => {
    return serverPagination
      ? totalItems
      : table.getFilteredRowModel().rows.length
  }, [
    serverPagination,
    totalItems,
    // Only depend on the specific state that affects filtering
    reactTableState.columnFilters,
    // TanStack v8 might not have globalFilter directly in the state
    // If we need to track global filter changes, we can add this dependency
    // reactTableState.globalFilter,
    data.length, // More efficient than the entire data array
  ])

  // Now compute pagination visibility with fewer dependencies
  const isPaginationVisible = useMemo(() => {
    return shouldPaginationBeVisible(
      showPagination,
      enablePagination,
      filteredRowCount,
      paginationInfo.pageSize
    )
  }, [
    showPagination,
    enablePagination,
    filteredRowCount,
    paginationInfo.pageSize,
  ])

  return {
    table,
    paginationInfo,
    isPaginationVisible,
    handlePageChange,
    handlePageSizeChange,
    rowModel: table.getRowModel(), // Expose row model for keyboard navigation
  }
}
