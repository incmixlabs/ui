import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, MoreHorizontal } from "lucide-react";
import { DataTableColumn, ColumnGroup, RowAction, ColumnType } from "../types";
import { getCellRenderer } from "../cell-renderers";
import React from "react";
import { Button, Checkbox, DropdownMenuWrapper } from "../../../components/base";

// Type guard for column group
export function isColumnGroup<TData>(obj: any): obj is ColumnGroup<TData> {
  return obj && typeof obj === 'object' && 'title' in obj && 'columns' in obj;
}

// Flatten column groups into a flat array of columns
export function flattenColumns<TData>(
  columns: (DataTableColumn<TData> | ColumnGroup<TData>)[]
): DataTableColumn<TData>[] {
  return columns.flatMap(col => {
    if (isColumnGroup<TData>(col)) {
      return col.columns;
    }
    return col;
  });
}

// Utility function to create column definitions
export function createColumnDefinitions<TData>(
  columns: DataTableColumn<TData>[],
  enableRowSelection: boolean,
  enableSorting: boolean,
  rowActions?: (row: TData) => RowAction[]
): ColumnDef<TData>[] {
  const defs: ColumnDef<TData>[] = [];

  // Add selection column if enabled
  if (enableRowSelection) {
    defs.push({
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    });
  }

  // Add data columns
  columns.forEach((column) => {
    const def: ColumnDef<TData> = {
      accessorKey: column.accessorKey as string,
      id: column.id || column.accessorKey.toString(),
      header: ({ column: col }) => {
        if (column.enableSorting) {
          return (
            <div className="flex justify-start w-full">
              <Button
                variant="ghost"
                onClick={() => col.toggleSorting(col.getIsSorted() === "asc")}
                className="p-0 font-medium text-sm hover:bg-transparent hover:text-primary text-left"
              >
                {column.headingName}
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          );
        }

        return (
          <div className="w-full text-left">
            {column.headingName}
          </div>
        );
      },
      enableSorting: column.enableSorting ?? enableSorting,
      enableHiding: column.enableHiding ?? true,
      cell: column.cell
        ? column.cell
        : column.renderer
          ? ({ row }) => column.renderer!(row.getValue(column.accessorKey as string), row.original)
          : ({ row }) => {
            const value = row.getValue(column.accessorKey as string);
            const formatOptions = column.format;

            // Handle different formatting options based on column type
            if (column.type === "Date" && formatOptions?.dateFormat) {
              return getCellRenderer(column.type, value, formatOptions.dateFormat);
            } else if (["Number", "Currency"].includes(column.type) && formatOptions?.numberFormat) {
              // Pass the entire numberFormat object as options
              return getCellRenderer(column.type, value, formatOptions.numberFormat);
            } else if (formatOptions?.formatter) {
              return formatOptions.formatter(value, row.original);
            } else {
              return getCellRenderer(column.type as ColumnType, value);
            }
          },
    };

    // Apply size constraints if provided
    if (column.width) {
      def.size = typeof column.width === 'number' ? column.width : parseInt(column.width);
    }
    if (column.minWidth) {
      def.minSize = typeof column.minWidth === 'number' ? column.minWidth : parseInt(column.minWidth);
    }
    if (column.maxWidth) {
      def.maxSize = typeof column.maxWidth === 'number' ? column.maxWidth : parseInt(column.maxWidth);
    }

    defs.push(def);
  });

  // Add actions column if needed
  if (rowActions) {
    defs.push({
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const rowData = row.original;
        const actions = rowActions(rowData);

        const actionItems = actions.map((action) => ({
          label: action.label,
          onClick: action.onClick,
          icon: action.icon,
          disabled: action.disabled
        }));

        return (
          <DropdownMenuWrapper
            trigger={
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            }
            items={[
              {
                label: "Actions",
                separator: true,
                disabled: true
              },
              ...actionItems
            ]}
          />
        );
      },
    });
  }

  return defs;
}
