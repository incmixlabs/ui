"use client";

import React from "react";
import { flexRender, Table as TanStackTable } from "@tanstack/react-table";
import { Table } from "@shadcn";
import { DataTableColumn } from "../types";

interface TableHeaderProps<TData> {
  table: TanStackTable<TData>;
  flatColumns: DataTableColumn<TData>[];
}

/**
 * Table header component rendering column headers
 * Memoized to prevent unnecessary re-renders
 */
function TableHeaderComponent<TData>({ table, flatColumns }: TableHeaderProps<TData>) {
  return (
    <Table.Header className="bg-gray-50 dark:bg-gray-900">
      {table.getHeaderGroups().map((headerGroup) => (
        <Table.Row key={headerGroup.id} className="hover:bg-muted/50 dark:hover:bg-muted/20 border-gray-100 dark:border-gray-800">
          {headerGroup.headers.map((header) => {
            // Get column type from our original columns definition
            const columnDef = flatColumns.find(col =>
              col.accessorKey?.toString() === header.id ||
              col.id === header.id
            );

            return (
              <Table.HeaderCell
                key={header.id}
                className="text-sm font-medium text-gray-500 dark:text-gray-400 h-10 px-2 text-left bg-gray-50 dark:bg-gray-900"
                style={{
                  width: columnDef?.width,
                  minWidth: columnDef?.minWidth,
                  maxWidth: columnDef?.maxWidth
                }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </Table.HeaderCell>
            );
          })}
        </Table.Row>
      ))}
    </Table.Header>
  );
}

// Export memoized version to prevent unnecessary re-renders
export const TableHeader = React.memo(TableHeaderComponent) as typeof TableHeaderComponent;
