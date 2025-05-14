"use client"

import React, { useCallback, useRef, useEffect } from "react";
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
import { useTableInlineEdit } from "../hooks/useTableInlineEdit";

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

  // Create table ref for keyboard navigation
  const tableRef = useRef<HTMLDivElement>(null);
  
  // Inline cell editing functionality
  const {
    isEditing,
    isSelected,
    selectCell,
    startEditing,
    cancelEditing,
    saveEdit,
    updateCellMatrix,
  } = useTableInlineEdit({
    onCellEdit,
    tableRef: null // We'll handle keyboard events directly in this component
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


  
  // Set up keyboard event handlers on the table reference
  useEffect(() => {
    if (tableRef.current && table && enableInlineCellEdit) {
      // Re-attach event handlers when the table reference is available
      const tableElement = tableRef.current;
      
      // We need to handle keyboard navigation at the table level
      tableElement.setAttribute('tabindex', '0');
      
      // Helper function to determine if a column is editable
      const isColumnEditable = (columnId: string): boolean => {
        return (
          inlineEditableColumns.includes(columnId as any) ||
          !!flatColumns.find(col => 
            (col.accessorKey?.toString() === columnId || col.id === columnId) && 
            col.enableInlineEdit
          )
        );
      };
      
      // Find the next editable column index from the current position
      const findNextEditableColumnIndex = (currentIndex: number, direction: 'next' | 'prev', visibleColumns: any[]): number => {
        let index = currentIndex;
        const increment = direction === 'next' ? 1 : -1;
        const limit = direction === 'next' ? visibleColumns.length : -1;
        
        // Skip the selection column if it exists (usually the first column)
        const selectionColIndex = visibleColumns.findIndex(col => col.id === 'select');
        
        while (true) {
          index += increment;
          
          // If we've reached the limit, return the limit
          if (index === limit) {
            return index;
          }
          
          // Skip the selection column
          if (index === selectionColIndex) {
            continue;
          }
          
          // Return if we find an editable column
          if (isColumnEditable(visibleColumns[index].id)) {
            return index;
          }
        }
      };
      
      const handleKeyDown = (e: KeyboardEvent) => {
        // Don't handle key events when in an input field
        if (
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }
        
        // Get current position
        const visibleRows = table.getRowModel().rows;
        const visibleColumns = table.getVisibleLeafColumns();
        
        // Find currently selected cell
        let selectedRowIndex = -1;
        let selectedColIndex = -1;
        
        for (let i = 0; i < visibleRows.length; i++) {
          const rowId = visibleRows[i].id;
          for (let j = 0; j < visibleColumns.length; j++) {
            const colId = visibleColumns[j].id;
            if (isSelected(rowId, colId)) {
              selectedRowIndex = i;
              selectedColIndex = j;
              break;
            }
          }
          if (selectedRowIndex !== -1) break;
        }
        
        // If no cell is selected and Tab is pressed, select the first editable cell
        if (selectedRowIndex === -1 && e.key === 'Tab' && !e.shiftKey) {
          e.preventDefault();
          if (visibleRows.length > 0 && visibleColumns.length > 0) {
            // Find the first editable column
            const firstEditableColIndex = visibleColumns.findIndex(col => isColumnEditable(col.id));
            
            const colIndex = firstEditableColIndex !== -1 ? firstEditableColIndex : 0;
            selectCell(visibleRows[0].id, visibleColumns[colIndex].id);
            
            // Focus the table container to ensure keyboard events are captured
            tableElement.focus();
          }
          return;
        }
        
        // If nothing is selected, exit early
        if (selectedRowIndex === -1) return;
        
        let newRowIndex = selectedRowIndex;
        let newColIndex = selectedColIndex;
        let handled = false;
        
        switch (e.key) {
          case 'ArrowUp':
            newRowIndex = Math.max(0, selectedRowIndex - 1);
            handled = true;
            break;
            
          case 'ArrowDown':
            newRowIndex = Math.min(visibleRows.length - 1, selectedRowIndex + 1);
            handled = true;
            break;
            
          case 'ArrowLeft':
            // Find the previous editable column
            newColIndex = findNextEditableColumnIndex(selectedColIndex, 'prev', visibleColumns);
            // If we went too far, stay at the current position
            if (newColIndex < 0) newColIndex = selectedColIndex;
            handled = true;
            break;
            
          case 'ArrowRight':
            // Find the next editable column
            newColIndex = findNextEditableColumnIndex(selectedColIndex, 'next', visibleColumns);
            // If we went too far, stay at the current position
            if (newColIndex >= visibleColumns.length) newColIndex = selectedColIndex;
            handled = true;
            break;
            
          case 'Tab':
            e.preventDefault();
            if (e.shiftKey) {
              // Go to previous editable column or previous row
              const prevColIndex = findNextEditableColumnIndex(selectedColIndex, 'prev', visibleColumns);
              
              if (prevColIndex >= 0) {
                // Move to previous column in same row
                newColIndex = prevColIndex;
              } else if (selectedRowIndex > 0) {
                // Move to previous row, last editable column
                newRowIndex = selectedRowIndex - 1;
                
                // Find the last editable column in that row
                let lastEditableIndex = -1;
                for (let i = visibleColumns.length - 1; i >= 0; i--) {
                  if (isColumnEditable(visibleColumns[i].id)) {
                    lastEditableIndex = i;
                    break;
                  }
                }
                
                newColIndex = lastEditableIndex !== -1 ? lastEditableIndex : visibleColumns.length - 1;
              }
            } else {
              // Go to next editable column or next row
              const nextColIndex = findNextEditableColumnIndex(selectedColIndex, 'next', visibleColumns);
              
              if (nextColIndex < visibleColumns.length) {
                // Move to next column in same row
                newColIndex = nextColIndex;
              } else if (selectedRowIndex < visibleRows.length - 1) {
                // Move to next row, first editable column
                newRowIndex = selectedRowIndex + 1;
                
                // Find the first editable column
                const firstEditableIndex = visibleColumns.findIndex(col => isColumnEditable(col.id));
                newColIndex = firstEditableIndex !== -1 ? firstEditableIndex : 0;
              }
            }
            handled = true;
            break;
            
          case 'Enter':
            // Start editing if not already editing
            e.preventDefault();
            // Only try to edit if the column is editable
            if (isColumnEditable(visibleColumns[selectedColIndex].id)) {
              startEditing(visibleRows[selectedRowIndex].id, visibleColumns[selectedColIndex].id);
            }
            handled = true;
            break;
            
          case 'Escape':
            // Cancel selection
            e.preventDefault();
            cancelEditing();
            handled = true;
            break;
        }
        
        if (handled && (newRowIndex !== selectedRowIndex || newColIndex !== selectedColIndex)) {
          e.preventDefault();
          // Update the selection to the new cell
          selectCell(visibleRows[newRowIndex].id, visibleColumns[newColIndex].id);
          
          // Make sure the table stays focused
          tableElement.focus();
        }
      };
      
      // Add click handler to ensure the table keeps focus after clicking a cell
      const handleClick = () => {
        // Small delay to ensure focus happens after other handlers
        setTimeout(() => {
          // Only focus if we have a selection
          const hasSelection = table.getRowModel().rows.some(row => 
            table.getVisibleLeafColumns().some(col => isSelected(row.id, col.id))
          );
          
          if (hasSelection) {
            tableElement.focus();
          }
        }, 10);
      };
      
      tableElement.addEventListener('keydown', handleKeyDown);
      tableElement.addEventListener('click', handleClick);
      
      return () => {
        tableElement.removeEventListener('keydown', handleKeyDown);
        tableElement.removeEventListener('click', handleClick);
      };
    }
  }, [tableRef, table, enableInlineCellEdit, isSelected, selectCell, startEditing, cancelEditing, inlineEditableColumns, flatColumns]);

  // Now that we have the table instance, we can create our cell edit handler
  const handleCellEdit = useCallback(
    (rowData: TData, columnId: string, newValue: any) => {
      // Use the saveEdit function from the hook
      saveEdit(rowData, columnId, newValue);
      
      // After saving, immediately re-select the cell to maintain navigation state
      if (table) {
        const row = table.getRowModel().rows.find(r => r.original === rowData);
        if (row) {
          selectCell(row.id, columnId);
          
          // Move table container back into focus
          if (tableRef.current) {
            tableRef.current.focus();
          }
        }
      }
    },
    [saveEdit, table, selectCell]
  );
  
  // Update cell matrix for keyboard navigation
  useEffect(() => {
    if (enableInlineCellEdit && table) {
      const visibleRows = table.getRowModel().rows;
      const visibleColumns = table.getVisibleLeafColumns();
      
      // Extract row IDs and column IDs for the navigation matrix
      const rowIds = visibleRows.map(row => row.id);
      const colIds = visibleColumns.map(col => col.id);
      
      updateCellMatrix(rowIds, colIds);
    }
  }, [enableInlineCellEdit, table, updateCellMatrix]);

  // Table features
  const { visibilityItems, handleExport } = useTableFeatures({
    table,
    flatColumns,
    data,
    exportOptions,
    serverPagination,
  });

  return (
    <div className={className || "w-full"} ref={tableRef} tabIndex={enableInlineCellEdit ? 0 : undefined}>
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
