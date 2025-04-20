"use client"

import React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react"

import { Button, Checkbox, DropdownMenuWrapper, Input } from "@base"
import {
  Table,
} from "@shadcn"

export type ColumnType = "String" | "Number" | "Currency" | "Date" | "Tag" | "Boolean" | "Status"

export interface DataTableColumn<TData> {
  headingName: string
  type: ColumnType
  accessorKey: keyof TData | string
  enableSorting?: boolean
  enableFiltering?: boolean
  enableHiding?: boolean
  className?: string
  cell?: (info: any) => React.ReactNode
}

interface DataTableProps<TData> {
  columns: DataTableColumn<TData>[]
  data: TData[]
  enableFiltering?: boolean
  enableSorting?: boolean
  enablePagination?: boolean
  enableRowSelection?: boolean
  enableColumnVisibility?: boolean
  showRowCount?: boolean
  filterColumn?: keyof TData | string
  filterPlaceholder?: string
  className?: string
  rowActions?: (row: TData) => {
    label: string;
    onClick: () => void;
  }[]
  // Server pagination props
  serverPagination?: boolean
  currentPage?: number
  pageSize?: number
  totalItems?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  isPaginationLoading?: boolean
}

export function DataTable<TData extends object>({
  columns,
  data,
  enableFiltering = true,
  enableSorting = true,
  enablePagination = true,
  enableRowSelection = true,
  enableColumnVisibility = true,
  showRowCount = true,
  filterColumn,
  filterPlaceholder = "Filter...",
  className,
  rowActions,
  // Server pagination props
  serverPagination = false,
  currentPage = 0,
  pageSize = 10,
  totalItems = 0,
  onPageChange,
  onPageSizeChange,
  isPaginationLoading = false,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columnDefs = React.useMemo<ColumnDef<TData>[]>(() => {
    const defs: ColumnDef<TData>[] = []

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
      })
    }

    columns.forEach((column) => {
      const def: ColumnDef<TData> = {
        accessorKey: column.accessorKey as string,
        header: ({ column: col }) => {
          const isNumeric = column.type === "Number" || column.type === "Currency";

          if (column.enableSorting) {
            return (
              <Button
                variant="ghost"
                onClick={() => col.toggleSorting(col.getIsSorted() === "asc")}
                className="p-0 font-medium text-sm hover:bg-transparent hover:text-primary text-left"
              >
                {column.headingName}
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
          }

          return (
            <div className="text-left">
              {column.headingName}
            </div>
          );
        },
        enableSorting: column.enableSorting ?? enableSorting,
        enableHiding: column.enableHiding ?? true,
        cell: column.cell
          ? column.cell
          : ({ row }) => {
              const value = row.getValue(column.accessorKey as string)

              switch (column.type) {
                case "Date":
                  if (value instanceof Date || (typeof value === 'string' && !isNaN(Date.parse(value as string)))) {
                    const date = value instanceof Date ? value : new Date(value as string);

                    // Format: Apr 18, 2025 17:05 (with time if available)
                    const options: Intl.DateTimeFormatOptions = {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    };

                    // Check if the time is not midnight (00:00:00) to determine if time was provided
                    if (date.getHours() !== 0 || date.getMinutes() !== 0 || date.getSeconds() !== 0) {
                      options.hour = '2-digit';
                      options.minute = '2-digit';
                    }

                    return (
                      <span className="font-mono text-sm text-gray-600 dark:text-gray-300">
                        {date.toLocaleString(undefined, options)}
                      </span>
                    );
                  }
                  return String(value)

                case "Tag":
                  if (Array.isArray(value)) {
                    return (
                      <div className="flex flex-wrap gap-1.5">
                        {value.map((tag, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center rounded-full bg-primary-50 dark:bg-primary-950/50 px-2 py-1 text-xs font-medium text-primary-700 dark:text-primary-300 ring-1 ring-inset ring-primary-700/10 dark:ring-primary-300/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )
                  }
                  return String(value)

                case "Status":
                  const statusMap: Record<string, { color: string }> = {
                    success: {
                      color: "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-950/50 dark:text-green-400 dark:ring-green-500/30"
                    },
                    failed: {
                      color: "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-950/50 dark:text-red-400 dark:ring-red-500/30"
                    },
                    processing: {
                      color: "bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-950/50 dark:text-yellow-400 dark:ring-yellow-500/30"
                    },
                    pending: {
                      color: "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-950/50 dark:text-blue-400 dark:ring-blue-500/30"
                    },
                    canceled: {
                      color: "bg-gray-50 text-gray-700 ring-gray-600/20 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-500/30"
                    },
                  }

                  const status = String(value).toLowerCase()
                  const statusStyle = statusMap[status] || {
                    color: "bg-gray-50 text-gray-700 ring-gray-600/20 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-500/30"
                  }

                  return (
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset capitalize ${statusStyle.color}`}>
                      {String(value)}
                    </span>
                  )

                case "Boolean":
                  return (
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      value
                        ? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-950/50 dark:text-green-400 dark:ring-green-500/30'
                        : 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-950/50 dark:text-red-400 dark:ring-red-500/30'
                    }`}>
                      {value ? 'Yes' : 'No'}
                    </span>
                  )

                case "Currency":
                  return typeof value === "number" ? (
                    <div className="text-left">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      }).format(value)}
                    </div>
                  ) : value

                case "Number":
                  return typeof value === "number"
                    ? <div className="text-left">
                        {value.toLocaleString()}
                      </div>
                    : value

                case "String":
                default:
                  return (
                    <div className="truncate max-w-[300px] text-left">
                      {value !== null && value !== undefined ? String(value) : ''}
                    </div>
                  )
              }
            },
      }

      defs.push(def)
    })

    if (rowActions) {
      defs.push({
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const rowData = row.original
          const actions = rowActions(rowData)

          const actionItems = actions.map((action) => ({
            label: action.label,
            onClick: action.onClick
          }))

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
          )
        },
      })
    }

    return defs
  }, [columns, enableRowSelection, enableSorting, rowActions])

  // For server-side pagination, we need to control the pagination state
  const pagination = React.useMemo(
    () => ({
      pageIndex: serverPagination ? currentPage : 0,
      pageSize: serverPagination ? pageSize : 10,
    }),
    [serverPagination, currentPage, pageSize]
  )

  const table = useReactTable({
    data,
    columns: columnDefs,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    // Only use client pagination if server pagination is disabled
    ...(enablePagination && !serverPagination
      ? { getPaginationRowModel: getCoreRowModel() }
      : {}),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    // Use manual pagination for server-side pagination
    manualPagination: serverPagination,
    // If using server pagination, provide the total row count
    pageCount: serverPagination ? Math.ceil(totalItems / pageSize) : undefined,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      ...(serverPagination ? { pagination } : {}),
    },
  })

  // Handle page change for server-side pagination
  const handlePageChange = React.useCallback(
    (newPage: number) => {
      if (serverPagination && onPageChange) {
        onPageChange(newPage)
      } else {
        table.setPageIndex(newPage)
      }
    },
    [serverPagination, onPageChange, table]
  )

  // Handle page size change for server-side pagination
  const handlePageSizeChange = React.useCallback(
    (newPageSize: number) => {
      if (serverPagination && onPageSizeChange) {
        onPageSizeChange(newPageSize)
      } else {
        table.setPageSize(newPageSize)
      }
    },
    [serverPagination, onPageSizeChange, table]
  )

  const visibilityItems = React.useMemo(() => {
    return table
      .getAllColumns()
      .filter((column) => column.getCanHide())
      .map((column) => {
        // Find the matching column definition to get the headingName
        const columnDef = columns.find(col => col.accessorKey.toString() === column.id);
        return {
          label: columnDef?.headingName ||
            (typeof column.id === 'string'
              ? column.id.charAt(0).toUpperCase() + column.id.slice(1)
              : String(column.id)),
          onClick: () => column.toggleVisibility(!column.getIsVisible()),
        };
      })
  }, [table, columns])

  // Calculate pagination info for server-side pagination
  const paginationInfo = React.useMemo(() => {
    if (serverPagination) {
      const totalPages = Math.ceil(totalItems / pageSize)
      return {
        currentPage,
        pageSize,
        totalItems,
        totalPages,
        canPreviousPage: currentPage > 0,
        canNextPage: currentPage < totalPages - 1
      }
    } else {
      return {
        currentPage: table.getState().pagination?.pageIndex || 0,
        pageSize: table.getState().pagination?.pageSize || 10,
        totalItems: table.getFilteredRowModel().rows.length,
        totalPages: table.getPageCount(),
        canPreviousPage: table.getCanPreviousPage(),
        canNextPage: table.getCanNextPage()
      }
    }
  }, [serverPagination, table, currentPage, pageSize, totalItems])

  return (
    <div className={className || "w-full"}>
      {(enableFiltering || enableColumnVisibility) && (
        <div className="flex items-center py-4 gap-2">
          {enableFiltering && filterColumn && (
            <div className="flex-1 max-w-sm">
              <Input
                placeholder={filterPlaceholder}
                value={(table.getColumn(filterColumn as string)?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn(filterColumn as string)?.setFilterValue(event.target.value)
                }
                className="h-9 border-gray-200 dark:border-gray-800"
              />
            </div>
          )}

          {enableColumnVisibility && (
            <div className="ml-auto">
              <DropdownMenuWrapper
                button={{
                  label: "Columns",
                  variant: "outline",
                  icon: <ChevronDown className="ml-2 h-4 w-4" />,
                  className: "h-9 border-gray-200 dark:border-gray-800"
                }}
                items={visibilityItems}
                content={{
                  color: "gray"
                }}
              />
            </div>
          )}
        </div>
      )}

      <div className="rounded-md border border-gray-200 dark:border-gray-800">
        <Table.Root>
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id} className="hover:bg-muted/50 dark:hover:bg-muted/20 border-gray-200 dark:border-gray-800">
                {headerGroup.headers.map((header) => {
                  // Get column type from our original columns definition
                  const columnDef = columns.find(col => col.accessorKey.toString() === header.id);
                  const isNumeric = columnDef?.type === "Number" || columnDef?.type === "Currency";

                  return (
                    <Table.HeaderCell
                      key={header.id}
                      className="dark:text-gray-400 h-10 px-4 text-left"
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
          <Table.Body>
            {isPaginationLoading ? (
              <Table.Row className="dark:border-gray-800">
                <Table.Cell
                  colSpan={columnDefs.length}
                  className="h-24 text-center dark:text-gray-400"
                >
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    <span className="ml-2">Loading data...</span>
                  </div>
                </Table.Cell>
              </Table.Row>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Table.Row
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-gray-200 dark:border-gray-800 dark:data-[state=selected]:bg-muted/20"
                >
                  {row.getVisibleCells().map((cell) => {
                    // Get column type from our original columns definition
                    const columnDef = columns.find(col => col.accessorKey.toString() === cell.column.id);
                    const isNumeric = columnDef?.type === "Number" || columnDef?.type === "Currency";

                    return (
                      <Table.Cell
                        key={cell.id}
                        className="px-4 text-left"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Table.Cell>
                    );
                  })}
                </Table.Row>
              ))
            ) : (
              <Table.Row className="dark:border-gray-800">
                <Table.Cell
                  colSpan={columnDefs.length}
                  className="h-24 px-4 text-left dark:text-gray-400"
                >
                  No results.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </div>

      {(enablePagination || showRowCount) && (
        <div className="flex items-center justify-between space-x-2 py-4">
          {showRowCount && enableRowSelection && (
            <div className="text-sm text-muted-foreground dark:text-gray-400">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {serverPagination ? totalItems : table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
          )}

          {enablePagination && (
            <div className="flex items-center space-x-2 ml-auto">
              <div className="flex text-sm text-muted-foreground dark:text-gray-400 items-center gap-1">
                <div>
                  Rows per page
                </div>
                <select
                  value={paginationInfo.pageSize}
                  onChange={e => handlePageSizeChange(Number(e.target.value))}
                  className="h-8 bg-transparent border-0 text-muted-foreground dark:text-gray-400"
                >
                  {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex text-sm text-muted-foreground dark:text-gray-400 items-center gap-1">
                Page {paginationInfo.currentPage + 1} of{' '}
                {paginationInfo.totalPages || 1}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => handlePageChange(0)}
                  disabled={!paginationInfo.canPreviousPage || isPaginationLoading}
                >
                  <span className="sr-only">Go to first page</span>
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => handlePageChange(paginationInfo.currentPage - 1)}
                  disabled={!paginationInfo.canPreviousPage || isPaginationLoading}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => handlePageChange(paginationInfo.currentPage + 1)}
                  disabled={!paginationInfo.canNextPage || isPaginationLoading}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => handlePageChange(paginationInfo.totalPages - 1)}
                  disabled={!paginationInfo.canNextPage || isPaginationLoading}
                >
                  <span className="sr-only">Go to last page</span>
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
