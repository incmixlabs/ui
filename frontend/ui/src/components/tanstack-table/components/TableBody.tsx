"use client";

import React from "react";
import { flexRender } from "@tanstack/react-table";
import { Table } from "@shadcn";
import { LoadingRow, EmptyRow, ExpandedRow } from "./TableUtilityRows";
import { DataTableColumn } from "../types";
import { Row, Cell } from "@tanstack/react-table";

interface TableBodyProps<TData> {
  table: any;
  flatColumns: DataTableColumn<TData>[];
  isPaginationLoading?: boolean;
  expandableRows?: any;
  expandedRows: Record<string, boolean>;
  toggleRowExpanded: (rowId: string) => void;
  onRowClick?: (row: TData) => void;
}

/**
 * Table body component rendering rows with support for expandable rows
 */
export function TableBody<TData extends object>({
  table,
  flatColumns,
  isPaginationLoading,
  expandableRows,
  expandedRows,
  toggleRowExpanded,
  onRowClick,
}: TableBodyProps<TData>) {
  return (
    <Table.Body>
      {isPaginationLoading ? (
        <LoadingRow colSpan={table.getAllColumns().length} />
      ) : table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row: Row<TData>) => {
          // Determine if this row is expanded
          const isExpanded = expandableRows && expandedRows[row.id];

          return (
            <React.Fragment key={row.id}>
              <Table.Row
                data-state={row.getIsSelected() && "selected"}
                className={`border-gray-200 dark:border-gray-800 dark:data-[state=selected]:bg-muted/20 ${
                  onRowClick || (expandableRows?.expandOnClick) ? "cursor-pointer" : ""
                } ${isExpanded ? "bg-muted/10" : ""}`}
                onClick={() => {
                  if (onRowClick) {
                    onRowClick(row.original);
                  } else if (expandableRows && !expandableRows.expandOnClick) {
                    toggleRowExpanded(row.id);
                  }
                }}
              >
                {row.getVisibleCells().map((cell: Cell<TData, unknown>) => {
                  // Get column type from our original columns definition
                  const columnDef = flatColumns.find(col =>
                    col.accessorKey?.toString() === cell.column.id ||
                    col.id === cell.column.id
                  );

                  return (
                    <Table.Cell
                      key={cell.id}
                      className="px-4 text-left"
                      style={{
                        width: columnDef?.width,
                        minWidth: columnDef?.minWidth,
                        maxWidth: columnDef?.maxWidth
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Table.Cell>
                  );
                })}
              </Table.Row>

              {/* Render expanded content if this row is expanded */}
              {isExpanded && expandableRows?.render && (
                <ExpandedRow
                  row={row.original}
                  colSpan={row.getVisibleCells().length}
                  renderContent={expandableRows.render}
                />
              )}
            </React.Fragment>
          );
        })
      ) : (
        <EmptyRow colSpan={table.getAllColumns().length} />
      )}
    </Table.Body>
  );
}
