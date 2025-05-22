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
  initialColumnVisibility?: Record<string, boolean>
) {
  // Core table state
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialColumnVisibility || {}
  );
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
