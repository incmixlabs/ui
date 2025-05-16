"use client";

import React, { memo } from "react";
import { Table as TanStackTable } from "@tanstack/react-table";
import { Table } from "@shadcn";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { DataTableColumn } from "../types";

interface TableContentProps<TData extends object> {
  table: TanStackTable<TData>;
  flatColumns: DataTableColumn<TData>[];
  isPaginationLoading?: boolean;
  expandableRows?: {
    render: (row: TData) => React.ReactNode;
    expandOnClick?: boolean;
    singleExpand?: boolean;
  };
  expandedRows: Record<string, boolean>;
  toggleRowExpanded: (rowId: string) => void;
  onRowClick?: (row: TData) => void;
  // Inline editing props
  enableInlineCellEdit?: boolean;
  inlineEditableColumns?: (keyof TData | string)[];
  isEditing?: (rowId: string, columnId: string) => boolean;
  isSelected?: (rowId: string, columnId: string) => boolean;
  selectCell?: (rowId: string, columnId: string) => void;
  startEditing?: (rowId: string, columnId: string) => void;
  cancelEditing?: () => void;
  saveEdit?: (rowData: TData, columnId: string, newValue: any) => void;
}

/**
 * TableContent component that combines header and body
 * Memoized to prevent unnecessary re-renders
 */
function TableContentComponent<TData extends object>({
  table,
  flatColumns,
  isPaginationLoading,
  expandableRows,
  expandedRows,
  toggleRowExpanded,
  onRowClick,
  // Inline editing props
  enableInlineCellEdit,
  inlineEditableColumns,
  isEditing,
  isSelected,
  selectCell,
  startEditing,
  cancelEditing,
  saveEdit,
}: TableContentProps<TData>) {
  return (
    <div 
      className="rounded-md border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      tabIndex={enableInlineCellEdit ? 0 : undefined}
      role={enableInlineCellEdit ? "grid" : undefined}
      aria-label={enableInlineCellEdit ? "Data table with keyboard navigation" : undefined}
      aria-readonly="false"
      aria-multiselectable="false"
      data-keyboard-navigable={enableInlineCellEdit ? "true" : undefined}
      // Add keyboard instructions for screen readers
      aria-description={enableInlineCellEdit ? 
        "Use Tab to enter the table, arrow keys to navigate between cells, Enter to edit a cell, and Escape to cancel." : 
        undefined}
    >
      <Table.Root>
        <TableHeader 
          table={table} 
          flatColumns={flatColumns} 
        />
        <TableBody
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
          saveEdit={saveEdit}
        />
      </Table.Root>
    </div>
  );
}

// Export memoized version for better performance
export const TableContent = memo(TableContentComponent) as typeof TableContentComponent;
