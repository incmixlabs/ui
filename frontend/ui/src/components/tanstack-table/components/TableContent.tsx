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
        />
      </Table.Root>
    </div>
  );
}
