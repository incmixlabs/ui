"use client";

import React from "react";
import { flexRender } from "@tanstack/react-table";
import { Table } from "@shadcn";
import { DataTableColumn } from "../types";

interface TableHeaderProps<TData> {
  table: any;
  flatColumns: DataTableColumn<TData>[];
}

/**
 * Table header component rendering column headers
 */
export function TableHeader<TData>({ table, flatColumns }: TableHeaderProps<TData>) {
  return (
    <Table.Header>
      {table.getHeaderGroups().map((headerGroup:any) => (
        <Table.Row key={headerGroup.id} className="hover:bg-muted/50 dark:hover:bg-muted/20 border-gray-200 dark:border-gray-800">
          {headerGroup.headers.map((header:any) => {
            // Get column type from our original columns definition
            const columnDef = flatColumns.find(col =>
              col.accessorKey?.toString() === header.id ||
              col.id === header.id
            );

            return (
              <Table.HeaderCell
                key={header.id}
                className="dark:text-gray-400 h-10 px-4 text-left"
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
