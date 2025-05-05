"use client";

import React from "react";
import { useMemo, useCallback } from "react";
import { Check } from "lucide-react";
import { exportTableData } from "../utils/export-utils";
import { DataTableColumn } from "../types";

/**
 * Hook for additional table features like column visibility and exporting
 */
export function useTableFeatures<TData>({
  table,
  flatColumns,
  data,
  exportOptions,
  serverPagination,
}: {
  table: any;
  flatColumns: DataTableColumn<TData>[];
  data: TData[];
  exportOptions?: any;
  serverPagination?: boolean;
}) {
  // Memoize visibility items
  const visibilityItems = useMemo(() => {
    return table
      .getAllColumns()
      .filter((column: any) => column.getCanHide())
      .map((column: any) => {
        // Find the matching column definition to get the headingName
        const columnDef = flatColumns.find(col =>
          col.accessorKey?.toString() === column.id ||
          col.id === column.id
        );
        const isVisible = column.getIsVisible();

        return {
          label: columnDef?.headingName ||
            (typeof column.id === 'string'
              ? column.id.charAt(0).toUpperCase() + column.id.slice(1)
              : String(column.id)),
          onClick: () => column.toggleVisibility(!isVisible),
          checked: isVisible,
          checkedIcon: React.createElement(Check, { className: "h-4 w-4" }),
        };
      });
  }, [table, flatColumns]);

  // Handle export
  const handleExport = useCallback(
    (format: string) => {
      // Use either visible data or all data based on serverPagination
      const dataToExport = serverPagination 
        ? data 
        : table.getFilteredRowModel().rows.map((row: any) => row.original);
        
      // Use type assertion to handle the generic type issue
      exportTableData(
        dataToExport as any,
        flatColumns as any,
        format,
        exportOptions?.filename || "table-export"
      );
    },
    [data, flatColumns, exportOptions, table, serverPagination]
  );

  return {
    visibilityItems,
    handleExport,
  };
}
