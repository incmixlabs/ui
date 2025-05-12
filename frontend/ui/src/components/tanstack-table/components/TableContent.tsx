"use client";

import React from "react";
import { Table } from "@shadcn";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { DataTableColumn } from "../types";

interface TableContentProps<TData extends object> {
  table: any;
  flatColumns: DataTableColumn<TData>[];
  isPaginationLoading?: boolean;
  expandableRows?: any;
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
 */
export function TableContent<TData extends object>({
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
    <div className="rounded-md border border-gray-200 dark:border-gray-800">
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
