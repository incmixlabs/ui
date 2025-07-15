"use client";

import { useState, useMemo } from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  RowSelectionState,
} from "@tanstack/react-table";

/**
 * Custom hook for managing table state
 */
export function useTableState(
  initialSidebarOpen = true,
  initialColumnVisibility?: Record<string, boolean>,
  // Add parameters for external column visibility control
  controlledColumnVisibility?: Record<string, boolean>,
  onColumnVisibilityChange?: (visibility: Record<string, boolean>) => void
) {
  // Core table state
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  
  // Use controlled visibility state if provided, otherwise use internal state
  const [internalColumnVisibility, setInternalColumnVisibility] = useState<VisibilityState>(
    initialColumnVisibility || {}
  );
  
  // Determine if column visibility is controlled externally
  const isColumnVisibilityControlled = controlledColumnVisibility !== undefined;
  
  // Use either controlled or internal visibility state
  const columnVisibility = isColumnVisibilityControlled ? controlledColumnVisibility : internalColumnVisibility;
  
  // Create a setter that either calls the external handler or updates internal state
  const setColumnVisibility = (visibility: VisibilityState | ((prev: VisibilityState) => VisibilityState)) => {
    if (isColumnVisibilityControlled) {
      // If visibility is a function, we need to call it with the current state to get the new state
      const newVisibility = typeof visibility === 'function' ? visibility(columnVisibility) : visibility;
      onColumnVisibilityChange?.(newVisibility);
    } else {
      setInternalColumnVisibility(visibility);
    }
  };
  
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  
  // UI state
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [sidebarOpen, setSidebarOpen] = useState(initialSidebarOpen);
  
  // Edit functionality state
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentRowData, setCurrentRowData] = useState<any | null>(null);

  return {
    // Core table state
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    columnVisibility,
    setColumnVisibility,
    rowSelection,
    setRowSelection,
    
    // UI state
    expandedRows,
    setExpandedRows,
    sidebarOpen,
    setSidebarOpen,
    
    // Edit state
    isEditDialogOpen,
    setIsEditDialogOpen,
    currentRowData,
    setCurrentRowData,
  };
}
