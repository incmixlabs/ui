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
  Check,
  X
} from "lucide-react"

import { Button, Checkbox, DropdownMenuWrapper, Input } from "@base"
import {
  Table,
} from "@shadcn"

// Constants
const PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50]

// Types
export type ColumnType = "String" | "Number" | "Currency" | "Date" | "Tag" | "Boolean" | "Status"

export interface DataTableColumn<TData> {
  headingName: string
  type: ColumnType
  accessorKey: keyof TData | string
  id?: string // Add optional id property
  enableSorting?: boolean
  enableFiltering?: boolean
  enableHiding?: boolean
  className?: string
  cell?: (info: any) => React.ReactNode
}

// New interface for faceted filter options
export interface FilterOption {
  label: string
  value: string | boolean | number
  icon?: React.ReactNode
}

// New interface for faceted filter configuration
export interface DataTableFacet<TData> {
  column: keyof TData | string
  title: string
  options: FilterOption[]
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
  // New faceted filter prop
  facets?: DataTableFacet<TData>[]
  // Server pagination props
  serverPagination?: boolean
  currentPage?: number
  pageSize?: number
  totalItems?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  isPaginationLoading?: boolean
}

interface PaginationInfo {
  currentPage: number
  pageSize: number
  totalItems: number
  totalPages: number
  canPreviousPage: boolean
  canNextPage: boolean
}

// Cell Renderer Components
const TagCell: React.FC<{ value: string[] }> = ({ value }) => {
  if (!Array.isArray(value)) return <>{String(value)}</>

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

const StatusCell: React.FC<{ value: string }> = ({ value }) => {
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
}

const BooleanCell: React.FC<{ value: boolean }> = ({ value }) => (
  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
    value
      ? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-950/50 dark:text-green-400 dark:ring-green-500/30'
      : 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-950/50 dark:text-red-400 dark:ring-red-500/30'
  }`}>
    {value ? 'Yes' : 'No'}
  </span>
)

const CurrencyCell: React.FC<{ value: number }> = ({ value }) => (
  <span className="block text-left font-medium">
    {new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)}
  </span>
)

const NumberCell: React.FC<{ value: number }> = ({ value }) => (
  <span className="block text-left">
    {value.toLocaleString()}
  </span>
)

const DateCell: React.FC<{ value: string | Date }> = ({ value }) => {
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
  return <>{String(value)}</>
}

const StringCell: React.FC<{ value: any }> = ({ value }) => (
  <div className="truncate max-w-[300px] text-left">
    {value !== null && value !== undefined ? String(value) : ''}
  </div>
)

// New component for faceted filters
interface FacetedFilterProps<TData> {
  table: any
  facet: DataTableFacet<TData>
}

const FacetedFilter = <TData extends object>({
  table,
  facet
}: FacetedFilterProps<TData>) => {
  const column = table.getColumn(facet.column)
  if (!column) {
    console.warn(`Column ${String(facet.column)} not found for filter ${facet.title}`);
    return null;
  }

  const filterValue = column.getFilterValue() as any[]
  const selectedCount = filterValue?.length || 0

  // Create dropdown items
  const items = [
    {
      label: facet.title,
      disabled: true,
      separator: true
    },
    ...facet.options.map(option => {
      const isSelected = filterValue?.includes(option.value) || false

      return {
        label: option.label,
        onClick: () => {
          if (isSelected) {
            // Remove from filter
            column.setFilterValue(
              filterValue?.filter(val => val !== option.value) || []
            )
          } else {
            // Add to filter
            column.setFilterValue(
              filterValue ? [...filterValue, option.value] : [option.value]
            )
          }
        },
        checked: isSelected,
        checkedIcon: <Check className="h-4 w-4" />
      }
    })
  ]

  // Add clear button if filters are applied
  if (selectedCount > 0) {
    items.push({
      label: "Clear",
      onClick: () => column.setFilterValue(undefined),
      separator: true,
      disabled: false
    })
  }

  // Use a string for label
  const buttonLabel = selectedCount > 0
    ? `${facet.title} (${selectedCount})`
    : facet.title;

  return (
    <DropdownMenu
      button={{
        label: buttonLabel,
        variant: "outline",
        icon: <ChevronDown className="ml-2 h-4 w-4" />,
        className: "h-9 border-gray-200 dark:border-gray-800"
      }}
      items={items}
      content={{
        color: "gray"
      }}
    />
  )
}

// Utility functions
function getCellRenderer(type: ColumnType, value: any): React.ReactNode {
  switch (type) {
    case "Date":
      return <DateCell value={value} />
    case "Tag":
      return <TagCell value={value} />
    case "Status":
      return <StatusCell value={value} />
    case "Boolean":
      return <BooleanCell value={value} />
    case "Currency":
      return <CurrencyCell value={value} />
    case "Number":
      return <NumberCell value={value} />
    case "String":
    default:
      return <StringCell value={value} />
  }
}

function createColumnDefinitions<TData>(
  columns: DataTableColumn<TData>[],
  enableRowSelection: boolean,
  enableSorting: boolean,
  rowActions?: (row: TData) => { label: string; onClick: () => void }[]
): ColumnDef<TData>[] {
  const defs: ColumnDef<TData>[] = []

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
    })
  }

  // Add data columns
  columns.forEach((column) => {
    const def: ColumnDef<TData> = {
      accessorKey: column.accessorKey as string,
      // Use explicit id if provided, otherwise use accessorKey
      id: column.id || column.accessorKey.toString(),
      header: ({ column: col }) => {
        // Remove conditional alignment based on numeric column type
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
        : ({ row }) => {
            const value = row.getValue(column.accessorKey as string)
            return getCellRenderer(column.type, value)
          },
    }

    defs.push(def)
  })

  // Add actions column if needed
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
}

// Improved custom filter function for faceted filters
const facetedFilterFn = (row: any, columnId: string, filterValue: any[]) => {
  if (!filterValue || filterValue.length === 0) return true;

  const value = row.getValue(columnId);

  // Debug logging
  console.log(`Filtering column ${columnId}:`, {
    type: typeof value,
    isArray: Array.isArray(value),
    value: value,
    filterValue: filterValue
  });

  // Handle array values (like tags)
  if (Array.isArray(value)) {
    // Check if any value in the filter matches any tag in the array
    return filterValue.some(fv => value.includes(fv));
  }
  // Handle boolean values explicitly
  else if (typeof value === 'boolean') {
    // Convert both to same type for comparison
    return filterValue.some(fv => {
      if (typeof fv === 'boolean') return value === fv;
      if (typeof fv === 'string') return String(value) === fv.toLowerCase();
      return false;
    });
  }
  // Handle other value types (strings, numbers, etc.)
  else {
    return filterValue.includes(value);
  }
}

function calculatePaginationInfo(
  serverPagination: boolean,
  table: any,
  currentPage: number,
  pageSize: number,
  totalItems: number
): PaginationInfo {
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
}

// Sub-components
interface TableFiltersProps<TData> {
  table: any
  filterColumn?: keyof TData | string
  filterPlaceholder: string
  visibilityItems: { label: string; onClick: () => void; checked?: boolean; checkedIcon?: React.ReactNode }[]
  facets?: DataTableFacet<TData>[]
}

const TableFilters = <TData extends object>({
  table,
  filterColumn,
  filterPlaceholder,
  visibilityItems,
  facets
}: TableFiltersProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0

  // Debug logging for which columns are available
  React.useEffect(() => {
    if (facets && facets.length > 0) {
      console.log("Available columns in table:", table.getAllColumns().map((col:any) => col.id));
      facets.forEach(facet => {
        const column = table.getColumn(String(facet.column));
        console.log(`Column '${String(facet.column)}' exists for filter '${facet.title}':`, !!column);
      });
    }
  }, [table, facets]);

  return (
    <div className="flex items-center py-4 gap-2 flex-wrap">
      {filterColumn && (
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

      {facets && facets.length > 0 && (
        <div className="flex items-center space-x-2">
          {facets.map((facet, index) => (
            <FacetedFilter key={index} table={table} facet={facet} />
          ))}
        </div>
      )}

      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => table.resetColumnFilters()}
          className="h-9 px-2"
        >
          Reset
          <X className="ml-2 h-4 w-4" />
        </Button>
      )}

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
    </div>
  )
}

interface TablePaginationProps {
  paginationInfo: PaginationInfo
  handlePageChange: (page: number) => void
  handlePageSizeChange: (size: number) => void
  showRowCount: boolean
  selectedRowCount: number
  filteredRowCount: number
  isPaginationLoading: boolean
  serverPagination: boolean
}

const TablePagination: React.FC<TablePaginationProps> = ({
  paginationInfo,
  handlePageChange,
  handlePageSizeChange,
  showRowCount,
  selectedRowCount,
  filteredRowCount,
  isPaginationLoading,
  serverPagination
}) => {
  return (
    <div className="flex items-center justify-between space-x-2 py-4">
      {showRowCount && (
        <div className="text-sm text-muted-foreground dark:text-gray-400">
          {selectedRowCount} of{" "}
          {serverPagination ? paginationInfo.totalItems : filteredRowCount} row(s) selected.
        </div>
      )}

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
            {PAGE_SIZE_OPTIONS.map(pageSize => (
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
    </div>
  )
}

interface LoadingRowProps {
  colSpan: number
}

const LoadingRow: React.FC<LoadingRowProps> = ({ colSpan }) => (
  <Table.Row className="dark:border-gray-800">
    <Table.Cell
      colSpan={colSpan}
      className="h-24 text-center dark:text-gray-400"
    >
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        <span className="ml-2">Loading data...</span>
      </div>
    </Table.Cell>
  </Table.Row>
)

interface EmptyRowProps {
  colSpan: number
}

const EmptyRow: React.FC<EmptyRowProps> = ({ colSpan }) => (
  <Table.Row className="dark:border-gray-800">
    <Table.Cell
      colSpan={colSpan}
      className="h-24 px-4 text-left dark:text-gray-400"
    >
      No results.
    </Table.Cell>
  </Table.Row>
)

// Main component
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
  facets, // New prop for faceted filters
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

const columnDefs = React.useMemo(() => {
  // Create column definitions first
  const defs = createColumnDefinitions(columns, enableRowSelection, enableSorting, rowActions)

  // For client-side filtering, apply the filter function to each column that has a facet
  // REMOVE the !serverPagination condition to allow filters with server pagination
  if (facets && facets.length > 0) {
    facets.forEach(facet => {
      const columnKey = facet.column.toString()

      // Find the column by ID
      const colDef = defs.find(col => col.id === columnKey)

      if (colDef) {
        // Apply the faceted filter function
        colDef.filterFn = facetedFilterFn
      } else {
        console.warn(`Column with ID ${columnKey} not found for facet ${facet.title}`)
      }
    })
  }

  return defs
}, [columns, enableRowSelection, enableSorting, rowActions, facets])

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
    manualFiltering: false,
    // If using server pagination, provide the total row count
    pageCount: serverPagination ? Math.ceil(totalItems / pageSize) : undefined,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      ...(serverPagination ? { pagination } : {}),
    },
    // Important! Set this debugging flag to true to detect issues
    debugAll: process.env.NODE_ENV !== 'production',
  })

  // Debug effect to log the column filters state
  React.useEffect(() => {
    if (columnFilters.length > 0) {
      console.log("Current column filters:", columnFilters);
    }
  }, [columnFilters]);

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

  // Memoize visibility items
  const visibilityItems = React.useMemo(() => {
    return table
      .getAllColumns()
      .filter((column) => column.getCanHide())
      .map((column) => {
        // Find the matching column definition to get the headingName
        const columnDef = columns.find(col =>
          col.accessorKey.toString() === column.id ||
          col.id === column.id
        );
        const isVisible = column.getIsVisible();

        return {
          label: columnDef?.headingName ||
            (typeof column.id === 'string'
              ? column.id.charAt(0).toUpperCase() + column.id.slice(1)
              : String(column.id)),
          onClick: () => column.toggleVisibility(!isVisible),
          checked: isVisible, // This will now update correctly when visibility changes
          checkedIcon: <Check className="h-4 w-4" />,
        };
      });
  }, [table, columns, columnVisibility]);

  // Calculate pagination info for server-side pagination
  const paginationInfo = React.useMemo(
    () => calculatePaginationInfo(
      serverPagination,
      table,
      currentPage,
      pageSize,
      totalItems
    ),
    [serverPagination, table, currentPage, pageSize, totalItems]
  )

  return (
    <div className={className || "w-full"}>
      {(enableFiltering || enableColumnVisibility) && (
        <TableFilters
          table={table}
          filterColumn={enableFiltering ? filterColumn : undefined}
          filterPlaceholder={filterPlaceholder}
          visibilityItems={enableColumnVisibility ? visibilityItems : []}
          facets={enableFiltering ? facets : undefined}
        />
      )}

      <div className="rounded-md border border-gray-200 dark:border-gray-800">
        <Table.Root>
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id} className="hover:bg-muted/50 dark:hover:bg-muted/20 border-gray-200 dark:border-gray-800">
                {headerGroup.headers.map((header) => {
                  // Get column type from our original columns definition
                  const columnDef = columns.find(col =>
                    col.accessorKey.toString() === header.id ||
                    col.id === header.id
                  );
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
              <LoadingRow colSpan={columnDefs.length} />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Table.Row
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-gray-200 dark:border-gray-800 dark:data-[state=selected]:bg-muted/20"
                >
                  {row.getVisibleCells().map((cell) => {
                    // Get column type from our original columns definition
                    const columnDef = columns.find(col =>
                      col.accessorKey.toString() === cell.column.id ||
                      col.id === cell.column.id
                    );
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
              <EmptyRow colSpan={columnDefs.length} />
            )}
          </Table.Body>
        </Table.Root>
      </div>

      {(enablePagination || showRowCount) && (
        <TablePagination
          paginationInfo={paginationInfo}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
          showRowCount={showRowCount && enableRowSelection}
          selectedRowCount={table.getFilteredSelectedRowModel().rows.length}
          filteredRowCount={table.getFilteredRowModel().rows.length}
          isPaginationLoading={isPaginationLoading}
          serverPagination={serverPagination}
        />
      )}
    </div>
  )
}
