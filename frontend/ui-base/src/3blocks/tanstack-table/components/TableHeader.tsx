"use client"

import { Table } from "@/src/1base/shadcn/table"
import { flexRender } from "@tanstack/react-table"
import type { Table as TanStackTable } from "@tanstack/react-table"
import React from "react"
import type { DataTableColumn } from "../types"

interface TableHeaderProps<TData> {
  table: TanStackTable<TData>
  flatColumns: DataTableColumn<TData>[]
}

/**
 * Table header component rendering column headers
 * Memoized to prevent unnecessary re-renders
 */
function TableHeaderComponent<TData>({
  table,
  flatColumns,
}: TableHeaderProps<TData>) {
  return (
    <Table.Header className="rounded-t-lg bg-gray-2">
      {table.getHeaderGroups().map((headerGroup) => (
        <Table.Row key={headerGroup.id} className=" border-gray-6 border-b">
          {headerGroup.headers.map((header) => {
            // Get column type from our original columns definition
            const columnDef = flatColumns.find(
              (col) =>
                col.accessorKey?.toString() === header.id ||
                col.id === header.id
            )

            return (
              <Table.HeaderCell
                key={header.id}
                className="h-10 rounded-t-lg px-4 text-left font-medium text-sm"
                style={{
                  width: columnDef?.width,
                  minWidth: columnDef?.minWidth,
                  maxWidth: columnDef?.maxWidth,
                }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </Table.HeaderCell>
            )
          })}
        </Table.Row>
      ))}
    </Table.Header>
  )
}

// Export memoized version to prevent unnecessary re-renders
export const TableHeader = React.memo(
  TableHeaderComponent
) as typeof TableHeaderComponent
