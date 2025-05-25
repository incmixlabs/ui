"use client";

import React, { useState } from "react";
import { flexRender, Table as TanStackTable } from "@tanstack/react-table";
import { Table } from "@base";
import { DataTableColumn } from "../types";
import ColumnConfigDialog, { ColumnConfiguration } from "./ColumnConfigDialog";

interface TableHeaderProps<TData> {
  table: TanStackTable<TData>;
  flatColumns: DataTableColumn<TData>[];
  enableColumnConfiguration?: boolean;
  onColumnConfigChange?: (columnId: string, config: ColumnConfiguration) => void;
}

/**
 * Table header component rendering column headers
 * Memoized to prevent unnecessary re-renders
 */
function TableHeaderComponent<TData>({
  table,
  flatColumns,
  enableColumnConfiguration = false,
  onColumnConfigChange
}: TableHeaderProps<TData>) {
  // State for column configuration dialog
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<DataTableColumn<TData> | null>(null);

  // Handle double-click on a column header
  const handleColumnDoubleClick = (column: DataTableColumn<TData>) => {
    if (enableColumnConfiguration) {
      setSelectedColumn(column);
      setConfigDialogOpen(true);
    }
  };

  // Handle saving column configuration
  const handleSaveColumnConfig = (columnId: string, config: ColumnConfiguration) => {
    if (onColumnConfigChange) {
      onColumnConfigChange(columnId, config);
    }
    setConfigDialogOpen(false);
    setSelectedColumn(null);
  };
  return (
    <>
      <Table.Header className="bg-gray-50 dark:bg-gray-900">
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Row key={headerGroup.id} className="hover:bg-muted/50 dark:hover:bg-muted/20 border-gray-100 dark:border-gray-800">
            {headerGroup.headers.map((header) => {
              // Get column type from our original columns definition
              const columnDef = flatColumns.find(col =>
                col.accessorKey?.toString() === header.id ||
                col.id === header.id
              );
              
              // Extract the header text directly from the column definition
              const headerText = columnDef?.header || columnDef?.headingName || header.id;
              
              return (
                <Table.HeaderCell
                  key={header.id}
                  className={`text-sm font-bold text-gray-800 dark:text-white h-10 px-2 text-left border-b-2 border-gray-200 dark:border-gray-700 ${enableColumnConfiguration ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800' : ''}`}
                  style={{
                    width: columnDef?.width,
                    minWidth: columnDef?.minWidth,
                    maxWidth: columnDef?.maxWidth
                  }}
                  onDoubleClick={() => columnDef && handleColumnDoubleClick(columnDef)}
                  title={enableColumnConfiguration ? "Double-click to configure column" : undefined}
                >
                  {/* Force displaying header text directly */}
                  {!header.isPlaceholder && (
                    <div className="flex items-center space-x-1">
                      <span>{headerText}</span>
                    </div>
                  )}
                </Table.HeaderCell>
              );
            })}
          </Table.Row>
        ))}
      </Table.Header>

      {/* Column configuration dialog */}
      {enableColumnConfiguration && (
        <ColumnConfigDialog
          isOpen={configDialogOpen}
          onClose={() => setConfigDialogOpen(false)}
          column={selectedColumn}
          onSave={handleSaveColumnConfig}
        />
      )}
    </>
  );
}

// Export memoized version to prevent unnecessary re-renders
export const TableHeader = React.memo(TableHeaderComponent) as typeof TableHeaderComponent;
