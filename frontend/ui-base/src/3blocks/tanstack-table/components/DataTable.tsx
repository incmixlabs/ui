"use client"

import { memo, useCallback, useEffect, useMemo } from "react"

import { TableSidebar } from "../sidebar-filter"
// Import EditTableForm and wrap it with memo for better performance
import EditTableFormComponent from "./EditTableForm"
import { TableContent } from "./TableContent"
// Import UI components
import { TableFilters } from "./TableFilters"
import { TablePagination } from "./TablePagination"
const EditTableForm = memo(EditTableFormComponent)

import { Box, Flex } from "@/src/1base"
import { useTableColumns } from "../hooks/useTableColumns"
import { useTableEdit } from "../hooks/useTableEdit"
import { useTableFeatures } from "../hooks/useTableFeatures"
import { useTableInlineEdit } from "../hooks/useTableInlineEdit"
import { useTableInstance } from "../hooks/useTableInstance"
// Import hooks
import { useTableState } from "../hooks/useTableState"

// Import types
import type { DataTableProps } from "../types"

/**
 * DataTable component - main entry point for the data table
 * Using extracted hooks and components for better organization
 * Optimized for React 19 with proper memoization and performance best practices
 */
function DataTableComponent<TData extends object>({
  columns,
  data,
  enableFiltering = true,
  enableSorting = true,
  enablePagination = true,
  enableRowSelection = true,
  enableColumnVisibility = true,
  initialColumnVisibility,
  // New props for external column visibility control
  columnVisibility,
  onColumnVisibilityChange,
  showRowCount = true,
  filterColumn,
  filterPlaceholder = "Filter...",
  className,
  rowActions,
  facets,
  serverPagination = false,
  currentPage = 0,
  pageSize = 10,
  totalItems = 0,
  onPageChange,
  onPageSizeChange,
  isPaginationLoading = false,
  showPagination,
  // New features
  export: exportOptions,
  expandableRows,
  onRowClick,
  onSelectionChange,
  enableSidebarFilters = false,
  sidebarFilters = [],
  initialSidebarOpen = true,
  // Row grouping
  enableRowGrouping = false,
  rowGrouping,
  hideMainHeader = false,
  // Edit functionality
  enableRowEdit = false,
  editFormSchema,
  editFieldConfig,
  onRowEdit,
  editDialogTitle = "Edit Item",
  // Inline cell editing functionality
  enableInlineCellEdit = false,
  inlineEditableColumns = [],
  onCellEdit,
}: DataTableProps<TData>) {
  // Use our extracted hooks to organize the component
  const tableState = useTableState(
    initialSidebarOpen,
    initialColumnVisibility,
    columnVisibility,
    onColumnVisibilityChange
  )

  const {
    sidebarOpen,
    setSidebarOpen,
    expandedRows,
    setExpandedRows,
    isEditDialogOpen,
    setIsEditDialogOpen,
    currentRowData,
    setCurrentRowData,
  } = tableState

  // Toggle sidebar function
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev)
  }, [setSidebarOpen])

  // Handle row expansion - memoized for performance
  const toggleRowExpanded = useCallback(
    (rowId: string) => {
      if (expandableRows?.singleExpand) {
        // If single expand mode, close all other rows
        setExpandedRows((prev) => ({
          [rowId]: !prev[rowId],
        }))
      } else {
        // Toggle just this row
        setExpandedRows((prev) => ({
          ...prev,
          [rowId]: !prev[rowId],
        }))
      }
    },
    [expandableRows, setExpandedRows]
  )

  // Edit functionality
  const { handleCloseEditDialog, handleEditSubmit, enhancedRowActions } =
    useTableEdit({
      enableRowEdit,
      editFormSchema,
      rowActions,
      onRowEdit,
      setIsEditDialogOpen,
      setCurrentRowData,
    })

  // Inline cell editing functionality with keyboard navigation
  const {
    isEditing,
    isSelected,
    selectCell,
    startEditing,
    cancelEditing,
    saveEdit,
    initializeEditableCells,
  } = useTableInlineEdit({
    onCellEdit,
  })

  // Create a wrapper for the saveEdit function to prevent unnecessary table reloads
  const handleCellEdit = useCallback(
    (rowData: TData, columnId: string, newValue: any) => {
      // Use the saveEdit function from the hook
      saveEdit(rowData, columnId, newValue)
    },
    [saveEdit]
  )

  // Column definitions with memoization to prevent unnecessary recalculations
  const { flatColumns, columnDefs } = useTableColumns({
    columns,
    enableRowSelection,
    enableSorting,
    rowActions,
    facets,
    sidebarFilters,
    expandableRows,
    toggleRowExpanded,
    enableRowEdit,
    editFormSchema,
    enhancedRowActions,
  })

  // Table instance with memoized data
  const {
    table,
    paginationInfo,
    isPaginationVisible,
    handlePageChange,
    handlePageSizeChange,
    rowModel, // Added to access row model for cell navigation
  } = useTableInstance({
    data,
    columnDefs,
    enableSorting,
    enableFiltering,
    enablePagination,
    serverPagination,
    currentPage,
    pageSize,
    totalItems,
    onPageChange,
    onPageSizeChange,
    onSelectionChange,
    showPagination,
    tableState,
  })

  // Table features with memoized dependencies
  const { visibilityItems, handleExport } = useTableFeatures({
    table,
    flatColumns,
    data,
    exportOptions,
    serverPagination,
  })

  // Memoize row and column data to prevent unnecessary recalculations
  const memoizedRowData = useMemo(() => {
    if (!enableInlineCellEdit || inlineEditableColumns.length === 0) return null

    return rowModel.rows.map((row, index) => ({
      id: row.id,
      index,
    }))
  }, [enableInlineCellEdit, inlineEditableColumns.length, rowModel.rows])

  const memoizedColumnData = useMemo(() => {
    if (!enableInlineCellEdit || inlineEditableColumns.length === 0) return null

    return table
      .getAllLeafColumns()
      .filter((col) => col.getIsVisible())
      .map((col, index) => ({
        id: col.id,
        index,
      }))
  }, [
    enableInlineCellEdit,
    inlineEditableColumns.length,
    table.getAllLeafColumns(),
    table.getState().columnVisibility,
  ])

  // Initialize the editable cells map for keyboard navigation using the memoized data
  useEffect(() => {
    if (
      !memoizedRowData ||
      !memoizedColumnData ||
      inlineEditableColumns.length === 0
    )
      return

    // Initialize the map of editable cells - only when row/column structure actually changes
    if (memoizedRowData.length > 0 && memoizedColumnData.length > 0) {
      initializeEditableCells(
        memoizedRowData,
        memoizedColumnData,
        inlineEditableColumns as string[]
      )

      // This adds the ability to hit Tab to start keyboard navigation
      // Delay to ensure DOM is ready when selecting first cell
      const timeoutId = setTimeout(() => {
        // Optional: Auto-select the first cell for immediate keyboard navigation
        // selectFirstCell();
      }, 100)
      return () => clearTimeout(timeoutId)
    }
  }, [
    memoizedRowData,
    memoizedColumnData,
    inlineEditableColumns,
    initializeEditableCells,
  ])

  // Memoize expensive calculations for table state - optimized dependency array
  const rowSelectionCount = useMemo(() => {
    return Object.keys(table.getState().rowSelection || {}).length
  }, [table.getState().rowSelection])

  const filteredRowCount = useMemo(() => {
    return table.getFilteredRowModel().rows.length
  }, [table.getFilteredRowModel().rows.length])

  // Memoize additional table state values to prevent unnecessary recalculations
  // Generate a stable ID for the table instance based on data characteristics
  const _tableId = useMemo(() => {
    // Create a stable ID that only changes when the data or visible columns change
    return table.options.data?.length
      ? `table-${table.options.data.length}-${Object.keys(table.getState().columnVisibility || {}).length}`
      : "empty-table"
  }, [table.options.data, table.getState().columnVisibility])

  const _tableRowsById = useMemo(
    () => table.getRowModel().rowsById,
    [table.getRowModel()]
  )

  // Memoize the entire component structure for better rendering performance
  const tableComponent = useMemo(
    () => (
      <Box className={className || "w-full"}>
        {/* Main layout with proper alignment */}
        <Flex>
          {/* Sidebar (always in DOM, but width is 0 when closed) */}
          {enableSidebarFilters && (
            <Box
              className={`transition-all duration-300 ease-in-out ${
                sidebarOpen
                  ? "mr-6 w-64 opacity-100"
                  : "mr-0 w-0 overflow-hidden opacity-0"
              }`}
            >
              {sidebarOpen && (
                <TableSidebar
                  filters={sidebarFilters}
                  table={table}
                  isOpen={sidebarOpen}
                  onToggle={toggleSidebar}
                />
              )}
            </Box>
          )}

          {/* Main content area */}
          <Box className="flex-1">
            {/* Header section for filters */}
            <TableFilters
              table={table}
              filterColumn={enableFiltering ? filterColumn : undefined}
              filterPlaceholder={filterPlaceholder}
              visibilityItems={enableColumnVisibility ? visibilityItems : []}
              facets={enableFiltering ? facets : undefined}
              exportOptions={
                exportOptions?.enabled
                  ? {
                      enabled: true,
                      formats: exportOptions.formats,
                      onExport: handleExport,
                    }
                  : undefined
              }
              onToggleSidebar={enableSidebarFilters ? toggleSidebar : undefined}
              sidebarOpen={sidebarOpen}
              enableSidebarFilters={enableSidebarFilters}
              enableInlineCellEdit={enableInlineCellEdit}
            />

            {/* Table component */}
            <TableContent
              table={table}
              flatColumns={flatColumns}
              isPaginationLoading={isPaginationLoading}
              expandableRows={expandableRows}
              expandedRows={expandedRows}
              toggleRowExpanded={toggleRowExpanded}
              onRowClick={onRowClick}
              enableRowGrouping={enableRowGrouping}
              rowGrouping={rowGrouping}
              hideMainHeader={hideMainHeader}
              enableInlineCellEdit={enableInlineCellEdit}
              inlineEditableColumns={inlineEditableColumns}
              isEditing={isEditing}
              isSelected={isSelected}
              selectCell={selectCell}
              startEditing={startEditing}
              cancelEditing={cancelEditing}
              saveEdit={handleCellEdit}
            />

            {/* Pagination */}
            {isPaginationVisible && (
              <TablePagination
                paginationInfo={paginationInfo}
                handlePageChange={handlePageChange}
                handlePageSizeChange={handlePageSizeChange}
                showRowCount={showRowCount && enableRowSelection}
                selectedRowCount={rowSelectionCount}
                filteredRowCount={filteredRowCount}
                isPaginationLoading={isPaginationLoading}
                serverPagination={serverPagination}
              />
            )}
          </Box>
        </Flex>

        {/* Edit Dialog */}
        {enableRowEdit && editFormSchema && (
          <EditTableForm
            isOpen={isEditDialogOpen}
            onClose={handleCloseEditDialog}
            onEditRow={(oldData: unknown, newData: unknown) => {
              // Create a type-safe wrapper that handles the unknown -> TData conversion
              handleEditSubmit(oldData as TData, newData as TData)
            }}
            rowData={currentRowData}
            formSchema={editFormSchema}
            fieldConfig={editFieldConfig}
            title={editDialogTitle || "Edit Item"}
          />
        )}
      </Box>
    ),
    [
      // UI structure and styling
      className,

      // Edit dialog props
      isEditDialogOpen,
      currentRowData,
      editFormSchema,
      editFieldConfig,
      handleCloseEditDialog,
      handleEditSubmit,
      editDialogTitle,

      // Sidebar filter props
      enableSidebarFilters,
      sidebarOpen,
      sidebarFilters,
      toggleSidebar,

      // Table core props
      table,
      enableFiltering,
      filterColumn,
      filterPlaceholder,
      enableColumnVisibility,
      visibilityItems,
      facets,

      // Export functionality
      exportOptions,
      handleExport,

      // Pagination props
      isPaginationVisible,
      paginationInfo,
      handlePageChange,
      handlePageSizeChange,
      isPaginationLoading,

      // Row selection
      enableRowSelection,
      rowSelectionCount,
      filteredRowCount,

      // Row expansion props - previously missing
      expandableRows,
      expandedRows,
      toggleRowExpanded,
      onRowClick,

      // Row grouping props - previously missing
      enableRowGrouping,
      rowGrouping,
      hideMainHeader,

      // Inline editing props - previously missing
      enableInlineCellEdit,
      inlineEditableColumns,
      isEditing,
      isSelected,
      selectCell,
      startEditing,
      cancelEditing,
      handleCellEdit,
    ]
  )

  return tableComponent
}

// Export memoized version for better performance
export const TanstackDataTable = memo(
  DataTableComponent
) as typeof DataTableComponent
// For backwards compatibility
export const DataTable = TanstackDataTable
