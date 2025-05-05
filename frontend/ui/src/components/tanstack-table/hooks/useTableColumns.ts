"use client";

import React from "react";
import { useMemo } from "react";
import { isColumnGroup, flattenColumns } from "../utils/column-utils";
import { createColumnDefinitions } from "../components/ColumnRenderers";
import { facetedFilterFn, dateRangeFilterFn, textFilterFn } from "../utils/filter-utils";
import { DataTableColumn, ColumnGroup, RowAction, DataTableFacet, SidebarFilterConfig } from "../types";

/**
 * Hook to handle column definitions and transformations
 */
export function useTableColumns<TData>({
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
}: {
  columns: DataTableColumn<TData>[] | ColumnGroup<TData>[];
  enableRowSelection: boolean;
  enableSorting: boolean;
  rowActions?: (row: TData) => RowAction[];
  facets?: DataTableFacet<TData>[];
  sidebarFilters?: SidebarFilterConfig<TData>[];
  expandableRows?: any;
  toggleRowExpanded: (rowId: string) => void;
  enableRowEdit: boolean;
  editFormSchema?: any;
  enhancedRowActions: (row: TData) => RowAction[];
}) {
  // Flatten column groups if necessary
  const flatColumns = useMemo(() => {
    if (columns.length === 0) return [];
    return isColumnGroup(columns[0])
      ? flattenColumns(columns as (DataTableColumn<TData> | ColumnGroup<TData>)[])
      : columns as DataTableColumn<TData>[];
  }, [columns]);

  // Create column definitions
  const columnDefs = useMemo(() => {
    // Create column definitions first
    const defs = createColumnDefinitions(
      flatColumns, 
      enableRowSelection, 
      enableSorting, 
      enableRowEdit && editFormSchema ? enhancedRowActions : rowActions
    );

    // If expandable rows are enabled, add expand/collapse functionality to row clicking
    let finalDefs = defs;
    if (expandableRows && expandableRows.expandOnClick) {
      finalDefs = defs.map(col => {
        const originalCellFn = col.cell;
        return {
          ...col,
          cell: (info: any) => {
            // Instead of JSX, use React.createElement approach for non-.tsx files
            const cellValue = typeof originalCellFn === 'function'
              ? originalCellFn(info)
              : info.getValue();
              
            return React.createElement('div', {
              onClick: (e: React.MouseEvent) => {
                // Preserve child handlers for interactive elements
                if ((e.target as HTMLElement).closest("a,button")) return;
                toggleRowExpanded(info.row.id);
              },
              className: "cursor-pointer"
            }, cellValue);
          }
        };
      });
    }

    // For client-side filtering, apply the filter function to each column that has a facet
    if (facets && facets.length > 0) {
      facets.forEach((facet: DataTableFacet<TData>) => {
        const columnKey = facet.column.toString();
        const colDef = finalDefs.find(col => col.id === columnKey);

        if (colDef) {
          colDef.filterFn = facetedFilterFn;
        } else {
          console.warn(`Column with ID ${columnKey} not found for facet ${facet.title}`);
        }
      });
    }

    // Apply filter functions to sidebar filter columns
    if (sidebarFilters && sidebarFilters.length > 0) {
      sidebarFilters.forEach((filter: SidebarFilterConfig<TData>) => {
        const columnKey = filter.column.toString();
        const colDef = finalDefs.find(col => col.id === columnKey);

        if (colDef) {
          // Apply appropriate filter function based on filter type
          switch (filter.type) {
            case "dateRange":
              colDef.filterFn = dateRangeFilterFn;
              break;
            case "text":
              colDef.filterFn = textFilterFn;
              break;
            case "multiSelect":
              colDef.filterFn = facetedFilterFn;
              break;
            // Add other filter types as needed
          }
        } else {
          console.warn(`Column with ID ${columnKey} not found for sidebar filter ${filter.title}`);
        }
      });
    }

    return finalDefs;
  }, [
    flatColumns, 
    enableRowSelection, 
    enableSorting, 
    rowActions, 
    facets, 
    sidebarFilters, 
    expandableRows, 
    toggleRowExpanded, 
    enableRowEdit, 
    editFormSchema, 
    enhancedRowActions
  ]);

  return {
    flatColumns,
    columnDefs
  };
}
