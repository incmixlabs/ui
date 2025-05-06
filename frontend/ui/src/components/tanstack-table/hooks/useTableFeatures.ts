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
  // Compute visibility items on each render to ensure fresh state
  const visibilityItems = (() => {
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
  })();

  // Handle export
  const SUPPORTED_FORMATS = ["csv", "excel"] as const;
  type ExportFormat = typeof SUPPORTED_FORMATS[number];

  const handleExport = useCallback(
    (format: string) => {
      // Validate format is supported
      if (!SUPPORTED_FORMATS.includes(format as ExportFormat)) {
        console.warn(`Unsupported export format: ${format}`);
        return;
      }
      
      // Use either visible data or all data based on serverPagination
      const dataToExport = serverPagination 
        ? data 
        : table.getFilteredRowModel().rows.map((row: any) => row.original);
        
      // Type assertion is necessary due to the generic constraints of exportTableData
      // This is safe as we only use this component with proper object data
      exportTableData(
        dataToExport as any,
        flatColumns as any,
        format as ExportFormat,
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
