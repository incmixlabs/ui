import { Button, Checkbox } from "@/src/1base"
import { DropdownMenuWrapper } from "@/src/1base/radix-ui/dropdown-menu"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { getCellRenderer } from "../cell-renderers"
import type { ColumnType, DataTableColumn, RowAction } from "../types"
import { applyColumnSizeConstraints } from "../utils/column-utils"

// Create header cell with sort functionality
export function createSortableHeader<TData>(
  column: DataTableColumn<TData>,
  col: any
): React.ReactNode {
  return (
    <div className="flex w-full justify-start">
      <Button
        variant="ghost"
        onClick={() => col.toggleSorting(col.getIsSorted() === "asc")}
        className="p-0 text-left font-medium text-gray-800 text-sm hover:bg-transparent hover:text-primary"
      >
        {column.headingName}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}

// Create header cell without sort functionality
export function createStandardHeader<TData>(
  column: DataTableColumn<TData>
): React.ReactNode {
  return <div className="w-full text-left">{column.headingName}</div>
}

// Create selection cell
export function createSelectHeaderCell(table: any): React.ReactNode {
  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
      className="translate-y-[2px]"
    />
  )
}

export function createSelectRowCell(row: any): React.ReactNode {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
      className="translate-y-[2px]"
    />
  )
}

// Create actions dropdown
export function createActionsCell<TData>(
  rowData: TData,
  rowActions: (row: TData) => RowAction[]
): React.ReactNode {
  const actions = rowActions(rowData)

  const actionItems = actions.map((action) => ({
    label: action.label,
    onClick: action.onClick,
    icon: action.icon,
    disabled: action.disabled,
  }))

  return (
    <DropdownMenuWrapper
      trigger={
        <Button variant="ghost" size="1">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      }
      items={[
        {
          label: "Actions",
          separator: true,
          disabled: true,
        },
        ...actionItems,
      ]}
    />
  )
}

// Cell renderer factory
export function createDataCellRenderer<TData>(
  column: DataTableColumn<TData>,
  accessorKey: string
) {
  if (column.cell) {
    return column.cell
  }

  if (column.renderer) {
    return ({ row }: { row: any }) =>
      column.renderer?.(row.getValue(accessorKey), row.original)
  }

  return ({ row }: { row: any }) => {
    const value = row.getValue(accessorKey)
    const formatOptions = column.format

    if (column.type === "Date" && formatOptions?.dateFormat) {
      return getCellRenderer(column.type, value, formatOptions.dateFormat)
    }

    if (
      ["Number", "Currency"].includes(column.type) &&
      formatOptions?.numberFormat
    ) {
      return getCellRenderer(column.type, value, formatOptions.numberFormat)
    }

    if (formatOptions?.formatter) {
      return formatOptions.formatter(value, row.original)
    }

    // Pass the meta object for dropdown and other types that need it
    return getCellRenderer(column.type as ColumnType, value, column.meta)
  }
}

// Create full column definitions including React components
export function createColumnDefinitions<TData>(
  columns: DataTableColumn<TData>[],
  enableRowSelection: boolean,
  enableSorting: boolean,
  rowActions?: (row: TData) => RowAction[]
): ColumnDef<TData>[] {
  const defs: ColumnDef<TData>[] = []

  // Add selection column if enabled
  if (enableRowSelection) {
    defs.push({
      id: "select",
      header: ({ table }) => createSelectHeaderCell(table),
      cell: ({ row }) => createSelectRowCell(row),
      enableSorting: false,
      enableHiding: false,
    })
  }

  // Add data columns
  columns.forEach((column) => {
    const accessorKey = column.accessorKey as string
    const def: ColumnDef<TData> = {
      accessorKey,
      id: column.id || accessorKey.toString(),
      header: ({ column: col }) => {
        if (column.enableSorting) {
          return createSortableHeader(column, col)
        }
        return createStandardHeader(column)
      },
      enableSorting: column.enableSorting ?? enableSorting,
      enableHiding: column.enableHiding ?? true,
      cell: createDataCellRenderer(column, accessorKey),
    }

    // Apply size constraints if provided
    applyColumnSizeConstraints(def, {
      width: column.width,
      minWidth: column.minWidth,
      maxWidth: column.maxWidth,
    })

    defs.push(def)
  })

  // Add actions column if needed
  if (rowActions) {
    defs.push({
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => createActionsCell(row.original, rowActions),
    })
  }

  return defs
}
