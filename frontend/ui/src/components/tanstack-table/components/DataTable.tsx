"use client"

import React, { useCallback } from "react";
import { Table } from "@shadcn";

// Import UI components
import { TableFilters } from "./TableFilters";
import { TablePagination } from "./TablePagination";
import { TableSidebar } from "../sidebar-filter";
import { TableContent } from "./TableContent";
import EditTableForm from "./EditTableForm";

// Import hooks
import { useTableState } from "../hooks/useTableState";
import { useTableEdit } from "../hooks/useTableEdit";
import { useTableColumns } from "../hooks/useTableColumns";
import { useTableInstance } from "../hooks/useTableInstance";
import { useTableFeatures } from "../hooks/useTableFeatures";

// Import types
import { DataTableProps } from "../types";

/**
 * DataTable component - main entry point for the data table
 * Using extracted hooks and components for better organization
 */
export function DataTable<TData extends object>({
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

  // Handle row expansion
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

  // Column definitions
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

  // Table instance
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

  // Table features
  const { visibilityItems, handleExport } = useTableFeatures({
    table,
    flatColumns,
    data,
    exportOptions,
    serverPagination,
  });

  return (
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
          {/* Top filters row */}
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
          />

          {/* Pagination */}
          {(isPaginationVisible || (showRowCount && enableRowSelection)) && (
            <TablePagination
              paginationInfo={paginationInfo}
              handlePageChange={handlePageChange}
              handlePageSizeChange={handlePageSizeChange}
              showRowCount={showRowCount && enableRowSelection}
              selectedRowCount={table.getFilteredSelectedRowModel().rows.length}
              filteredRowCount={table.getFilteredRowModel().rows.length}
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
          onEditRow={handleEditSubmit}
          rowData={currentRowData}
          formSchema={editFormSchema}
          fieldConfig={editFieldConfig}
          title={editDialogTitle || "Edit Item"}
        />
      )}
    </div>
  );
}
