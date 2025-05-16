"use client"

import React, { useCallback, useMemo, memo } from "react";
import { Table as TanStackTable } from "@tanstack/react-table";
import { Table } from "@shadcn";

// Import UI components
import { TableFilters } from "./TableFilters";
import { TablePagination } from "./TablePagination";
import { TableSidebar } from "../sidebar-filter";
import { TableContent } from "./TableContent";
// Import EditTableForm and wrap it with memo for better performance
import EditTableFormComponent from "./EditTableForm";
const EditTableForm = memo(EditTableFormComponent);

// Import hooks
import { useTableState } from "../hooks/useTableState";
import { useTableEdit } from "../hooks/useTableEdit";
import { useTableColumns } from "../hooks/useTableColumns";
import { useTableInstance } from "../hooks/useTableInstance";
import { useTableFeatures } from "../hooks/useTableFeatures";
import { useTableInlineEdit } from "../hooks/useTableInlineEdit";

// Import types
import { DataTableProps } from "../types";

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
  enableColumnResizing = false,
  enableColumnReordering = false,
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
  onColumnReorder,
  enableSidebarFilters = false,
  sidebarFilters = [],
  initialSidebarOpen = true,
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
  const tableState = useTableState(initialSidebarOpen);

  const {
    sidebarOpen,
    setSidebarOpen,
    expandedRows,
    setExpandedRows,
    isEditDialogOpen,
    setIsEditDialogOpen,
    currentRowData,
    setCurrentRowData,
  } = tableState;

  // Toggle sidebar function
  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, [setSidebarOpen]);

  // Handle row expansion - memoized for performance
  const toggleRowExpanded = useCallback((rowId: string) => {
    if (expandableRows?.singleExpand) {
      // If single expand mode, close all other rows
      setExpandedRows(prev => ({
        [rowId]: !prev[rowId]
      }));
    } else {
      // Toggle just this row
      setExpandedRows(prev => ({
        ...prev,
        [rowId]: !prev[rowId]
      }));
    }
  }, [expandableRows, setExpandedRows]);

  // Edit functionality
  const {
    handleEditClick,
    handleCloseEditDialog,
    handleEditSubmit,
    enhancedRowActions
  } = useTableEdit({
    enableRowEdit,
    editFormSchema,
    rowActions,
    onRowEdit,
    setIsEditDialogOpen,
    setCurrentRowData,
  });

  // Inline cell editing functionality
  const {
    isEditing,
    isSelected,
    selectCell,
    startEditing,
    cancelEditing,
    saveEdit,
  } = useTableInlineEdit({
    onCellEdit,
  });

  // Create a wrapper for the saveEdit function to prevent unnecessary table reloads
  const handleCellEdit = useCallback(
    (rowData: TData, columnId: string, newValue: any) => {
      // Use the saveEdit function from the hook
      saveEdit(rowData, columnId, newValue);
    },
    [saveEdit]
  );

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
  });

  // Table instance with memoized data
  const {
    table,
    paginationInfo,
    isPaginationVisible,
    handlePageChange,
    handlePageSizeChange
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
  });

  // Table features with memoized dependencies
  const { visibilityItems, handleExport } = useTableFeatures({
    table,
    flatColumns,
    data,
    exportOptions,
    serverPagination,
  });

  // Memoize expensive calculations for table state - optimized dependency array
  const rowSelectionCount = useMemo(() => {
    return Object.keys(table.getState().rowSelection || {}).length;
  }, [table.getState().rowSelection]);

  const filteredRowCount = useMemo(() => {
    return table.getFilteredRowModel().rows.length;
  }, [table.getFilteredRowModel().rows.length]);

  // Memoize additional table state values to prevent unnecessary recalculations
  // Generate a stable ID for the table instance
  const tableId = useMemo(() => table.options.data?.length ? `table-${Date.now()}` : 'empty-table', [table.options.data]);
  const tableRowsById = useMemo(() => table.getRowModel().rowsById, [table.getRowModel()]);

  // Memoize the entire component structure for better rendering performance
  const tableComponent = useMemo(() => (
    <div className={className || "w-full"}>
      {/* Main layout with proper alignment */}
      <div className="flex">
        {/* Sidebar (always in DOM, but width is 0 when closed) */}
        {enableSidebarFilters && (
          <div className={`transition-all duration-300 ease-in-out ${
            sidebarOpen ? "w-64 opacity-100 mr-6" : "w-0 opacity-0 mr-0 overflow-hidden"
          }`}>
            {sidebarOpen && (
              <TableSidebar
                filters={sidebarFilters}
                table={table}
                isOpen={sidebarOpen}
                onToggle={toggleSidebar}
              />
            )}
          </div>
        )}

        {/* Main content area */}
        <div className="flex-1">
          {/* Header section for filters */}
          <TableFilters
            table={table}
            filterColumn={enableFiltering ? filterColumn : undefined}
            filterPlaceholder={filterPlaceholder}
            visibilityItems={enableColumnVisibility ? visibilityItems : []}
            facets={enableFiltering ? facets : undefined}
            exportOptions={exportOptions?.enabled ? {
              enabled: true,
              formats: exportOptions.formats,
              onExport: handleExport
            } : undefined}
            onToggleSidebar={enableSidebarFilters ? toggleSidebar : undefined}
            sidebarOpen={sidebarOpen}
            enableSidebarFilters={enableSidebarFilters}
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
        </div>
      </div>

      {/* Edit Dialog */}
      {enableRowEdit && editFormSchema && (
        <EditTableForm
          isOpen={isEditDialogOpen}
          onClose={handleCloseEditDialog}
          onEditRow={(oldData: unknown, newData: unknown) => {
            // Create a type-safe wrapper that handles the unknown -> TData conversion
            handleEditSubmit(oldData as TData, newData as TData);
          }}
          rowData={currentRowData}
          formSchema={editFormSchema}
          fieldConfig={editFieldConfig}
          title={editDialogTitle || "Edit Item"}
        />
      )}
    </div>
  ), [className, isEditDialogOpen, currentRowData, editFormSchema, editFieldConfig, handleCloseEditDialog,
      handleEditSubmit, editDialogTitle, enableSidebarFilters, sidebarOpen, sidebarFilters,
      toggleSidebar, table, enableFiltering, filterColumn, filterPlaceholder, enableColumnVisibility,
      visibilityItems, facets, exportOptions, handleExport, isPaginationVisible, paginationInfo,
      handlePageChange, handlePageSizeChange, isPaginationLoading, enableRowSelection, rowSelectionCount,
      filteredRowCount]);

  return tableComponent;
}

// Export memoized version for better performance
export const DataTable = memo(DataTableComponent) as typeof DataTableComponent;
