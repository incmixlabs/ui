"use client"

import React, { useMemo, useState, useCallback } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  RowSelectionState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Check,
  X,
  Download,

  SlidersHorizontal
} from "lucide-react";
import { TableSidebar } from "./sidebar-filter";

import { Button, Checkbox, DropdownMenuWrapper, Input } from "@base";
import { Table } from "@shadcn";
import { getCellRenderer } from "./cell-renderers";
import {
  DataTableProps,
  DataTableColumn,
  ColumnGroup,
  ColumnType,
  PaginationInfo,
  DataTableFacet,
  RowAction
} from "./types";

// Constants
const PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50];

// Type guard for column group
function isColumnGroup<TData>(obj: any): obj is ColumnGroup<TData> {
  return obj && typeof obj === 'object' && 'title' in obj && 'columns' in obj;
}

// Flatten column groups into a flat array of columns
function flattenColumns<TData>(
  columns: (DataTableColumn<TData> | ColumnGroup<TData>)[]
): DataTableColumn<TData>[] {
  return columns.flatMap(col => {
    if (isColumnGroup<TData>(col)) {
      return col.columns;
    }
    return col;
  });
}

// Improved faceted filter function
const facetedFilterFn = (row: any, columnId: string, filterValue: any[]) => {
  if (!filterValue || filterValue.length === 0) return true;

  const value = row.getValue(columnId);

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
};

// Date range filter function
const dateRangeFilterFn = (row: any, columnId: string, filterValue: { start?: string; end?: string }) => {
  if (!filterValue || (!filterValue.start && !filterValue.end)) return true;

  const value = row.getValue(columnId);
  if (!value) return false;

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return false;

  if (filterValue.start && filterValue.end) {
    const startDate = new Date(filterValue.start);
    const endDate = new Date(filterValue.end);

    // Check for invalid dates
    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) return false;

    // Set end date to end of day
    endDate.setHours(23, 59, 59, 999);
    return date >= startDate && date <= endDate;
  } else if (filterValue.start) {
    const startDate = new Date(filterValue.start);

    // Check for invalid date
    if (Number.isNaN(startDate.getTime())) return false;

    return date >= startDate;
  } else if (filterValue.end) {
    const endDate = new Date(filterValue.end);

    // Check for invalid date
    if (Number.isNaN(endDate.getTime())) return false;

    // Set end date to end of day
    endDate.setHours(23, 59, 59, 999);
    return date <= endDate;
  }

  return true;
};

// Text filter function
const textFilterFn = (row: any, columnId: string, filterValue: string) => {
  if (!filterValue) return true;
  const value = row.getValue(columnId);
  if (value === null || value === undefined) return false;

  return String(value).toLowerCase().includes(filterValue.toLowerCase());
};

// Utility function to create column definitions
function createColumnDefinitions<TData>(
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

// Calculate pagination info
function calculatePaginationInfo(
  serverPagination: boolean,
  table: any,
  currentPage: number,
  pageSize: number,
  totalItems: number
): PaginationInfo {
  if (serverPagination) {
    const totalPages = Math.ceil(totalItems / pageSize);
    return {
      currentPage,
      pageSize,
      totalItems,
      totalPages,
      canPreviousPage: currentPage > 0,
      canNextPage: currentPage < totalPages - 1
    };
  } else {
    return {
      currentPage: table.getState().pagination?.pageIndex || 0,
      pageSize: table.getState().pagination?.pageSize || 10,
      totalItems: table.getFilteredRowModel().rows.length,
      totalPages: table.getPageCount(),
      canPreviousPage: table.getCanPreviousPage(),
      canNextPage: table.getCanNextPage()
    };
  }
}

// Sub-components
interface TableFiltersProps<TData> {
  table: any;
  filterColumn?: keyof TData | string;
  filterPlaceholder: string;
  visibilityItems: { label: string; onClick: () => void; checked?: boolean; checkedIcon?: React.ReactNode }[];
  facets?: DataTableFacet<TData>[];
  exportOptions?: {
    enabled?: boolean;
    formats?: ("csv" | "excel" | "pdf")[];
    onExport: (format: string) => void;
  };
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
  enableSidebarFilters?: boolean;
}

const FacetedFilter = <TData extends object>({
  table,
  facet
}: {
  table: any;
  facet: DataTableFacet<TData>;
}) => {
  const column = table.getColumn(facet.column);
  if (!column) {
    console.warn(`Column ${String(facet.column)} not found for filter ${facet.title}`);
    return null;
  }

  const filterValue = column.getFilterValue() as any[];
  const selectedCount = filterValue?.length || 0;

  // Create dropdown items
  const items = [
    {
      label: facet.title,
      disabled: true,
      separator: true
    },
    ...facet.options.map(option => {
      const isSelected = filterValue?.includes(option.value) || false;

      return {
        label: option.label,
        onClick: () => {
          if (isSelected) {
            // Remove from filter
            column.setFilterValue(
              filterValue?.filter(val => val !== option.value) || []
            );
          } else {
            // Add to filter
            column.setFilterValue(
              filterValue ? [...filterValue, option.value] : [option.value]
            );
          }
        },
        checked: isSelected,
        checkedIcon: <Check className="h-4 w-4" />,
        icon: option.icon
      };
    })
  ];

  // Add clear button if filters are applied
  if (selectedCount > 0) {
    items.push({
      label: "Clear",
      onClick: () => column.setFilterValue(undefined),
      separator: true,
      disabled: false
    });
  }

  const buttonLabel = selectedCount > 0
    ? `${facet.title} (${selectedCount})`
    : facet.title;

  return (
    <DropdownMenuWrapper
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
  );
};

const TableFilters = <TData extends object>({
  table,
  filterColumn,
  filterPlaceholder,
  visibilityItems,
  facets,
  exportOptions,
  onToggleSidebar,
  sidebarOpen,
  enableSidebarFilters
}: TableFiltersProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0;

  // Create export dropdown items
  const exportItems = exportOptions?.formats?.map(format => ({
    label: `Export as ${format.toUpperCase()}`,
    onClick: () => exportOptions.onExport(format),
    icon: <Download className="h-4 w-4 mr-2" />
  })) || [];

  return (
    <div className="flex items-center py-4 gap-2 flex-wrap">
      {/* Sidebar toggle button - now styled to match the screenshot */}
      {enableSidebarFilters && onToggleSidebar && (
        <Button

          onClick={onToggleSidebar}
          className="flex items-center h-9"
        >
          {sidebarOpen ? (
            <>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Hide Filters
            </>
          ) : (
            <>
              <SlidersHorizontal className="h-4 w-4 mr-1" />
              Show Filters
            </>
          )}
        </Button>
      )}

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

      <div className="ml-auto flex gap-2">
        {exportOptions?.enabled && exportItems.length > 0 && (
          <DropdownMenuWrapper
            button={{
              label: "Export",
              variant: "outline",
              icon: <Download className="ml-2 h-4 w-4" />,
              className: "h-9 border-gray-200 dark:border-gray-800"
            }}
            items={exportItems}
            content={{
              color: "gray"
            }}
          />
        )}

        {visibilityItems.length > 0 && (
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
        )}
      </div>
    </div>
  );
};

interface TablePaginationProps {
  paginationInfo: PaginationInfo;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (size: number) => void;
  showRowCount: boolean;
  selectedRowCount: number;
  filteredRowCount: number;
  isPaginationLoading: boolean;
  serverPagination: boolean;
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
  );
};

interface LoadingRowProps {
  colSpan: number;
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
);

interface EmptyRowProps {
  colSpan: number;
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
);

// Expanded row component
interface ExpandedRowProps<TData> {
  row: TData;
  colSpan: number;
  renderContent: (row: TData) => React.ReactNode;
}

const ExpandedRow = <TData extends object>({
  row,
  colSpan,
  renderContent
}: ExpandedRowProps<TData>) => (
  <Table.Row className="dark:border-gray-800 bg-muted/20">
    <Table.Cell colSpan={colSpan} className="p-4">
      {renderContent(row)}
    </Table.Cell>
  </Table.Row>
);

// Export utilities
const exportTableData = <TData extends object>(
  data: TData[],
  columns: DataTableColumn<TData>[],
  format: string,
  filename: string = "table-export"
) => {
  switch (format) {
    case "csv":
      exportCSV(data, columns, filename);
      break;
    case "excel":
      alert("Excel export not implemented in this demo - would use a library like xlsx");
      break;
    case "pdf":
      alert("PDF export not implemented in this demo - would use a library like jsPDF");
      break;
    default:
      console.warn(`Unsupported export format: ${format}`);
  }
};

const exportCSV = <TData extends object>(
  data: TData[],
  columns: DataTableColumn<TData>[],
  filename: string
) => {
  // Get column headers
  const headers = columns.map(col => col.headingName);

  // Get data rows
  const rows = data.map(item =>
    columns.map(col => {
      const key = col.accessorKey;
      const value = item[key as keyof TData];

      // Handle different data types
      if (Array.isArray(value)) {
        return value.join(', ');
      } else if (value instanceof Date) {
        return value.toISOString();
      } else {
        return String(value);
      }
    })
  );

  // Combine headers and rows
  // TBD - move to utils/string
    const escape = (v: string) =>
      `"${v.replace(/"/g, '""').replace(/\n/g, '\\n')}"`;
    const csvContent = [
      headers.map(escape).join(','),
         ...rows.map(r => r.map(v => escape(String(v))).join(','))
        ].join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Main component
export function DataTable<TData extends object>({
  columns,
  data,
  enableFiltering = true,
  enableSorting = true,
  enablePagination = true,
  enableRowSelection = true,
  enableColumnVisibility = true,
  enableColumnResizing = false,
  enableColumnReordering = false,
  showRowCount = true,
  filterColumn,
  filterPlaceholder = "Filter...",
  className,
  rowActions,
  facets,
  serverPagination = false,
  currentPage = 0,
  pageSize = 10,
  totalItems = 0,
  onPageChange,
  onPageSizeChange,
  isPaginationLoading = false,
  // New features
  export: exportOptions,
  expandableRows,
  onRowClick,
  onSelectionChange,
  onColumnReorder,
  enableSidebarFilters = false,
  sidebarFilters = [],
  initialSidebarOpen = true,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [sidebarOpen, setSidebarOpen] = useState(initialSidebarOpen);

  // Toggle sidebar function
  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  // Handle row expansion
  const toggleRowExpanded = useCallback((rowId: string) => {
    if (expandableRows?.singleExpand) {
      // If single expand mode, close all other rows
      setExpandedRows(prev => ({
        [rowId]: !prev[rowId]
      }));
    } else {
      // Toggle just this row
      setExpandedRows(prev => ({
        ...prev,
        [rowId]: !prev[rowId]
      }));
    }
  }, [expandableRows]);

  // Flatten column groups if necessary
  const flatColumns = useMemo(() => {
    return isColumnGroup(columns[0])
      ? flattenColumns(columns as (DataTableColumn<TData> | ColumnGroup<TData>)[])
      : columns as DataTableColumn<TData>[];
  }, [columns]);

  // Create column definitions
  const columnDefs = useMemo(() => {
    // Create column definitions first
    const defs = createColumnDefinitions(flatColumns, enableRowSelection, enableSorting, rowActions);

    // If expandable rows are enabled, add expand/collapse functionality to row clicking
    if (expandableRows && expandableRows.expandOnClick) {
      defs.forEach(col => {
        const originalCellFn = col.cell;
        col.cell = (info) => {
          return (
            <div
              onClick={() => toggleRowExpanded(info.row.id)}
              className="cursor-pointer"
            >
              {typeof originalCellFn === 'function'
                ? originalCellFn(info)
                : info.getValue()}
            </div>
          );
        };
      });
    }

    // For client-side filtering, apply the filter function to each column that has a facet
    if (facets && facets.length > 0) {
      facets.forEach(facet => {
        const columnKey = facet.column.toString();
        const colDef = defs.find(col => col.id === columnKey);

        if (colDef) {
          colDef.filterFn = facetedFilterFn;
        } else {
          console.warn(`Column with ID ${columnKey} not found for facet ${facet.title}`);
        }
      });
    }

    // Apply filter functions to sidebar filter columns
    if (sidebarFilters && sidebarFilters.length > 0) {
      sidebarFilters.forEach(filter => {
        const columnKey = filter.column.toString();
        const colDef = defs.find(col => col.id === columnKey);

        if (colDef) {
          // Apply appropriate filter function based on filter type
          switch (filter.type) {
            case "dateRange":
              colDef.filterFn = dateRangeFilterFn;
              break;
            case "text":
              colDef.filterFn = textFilterFn;
              break;
            case "multiSelect":
              colDef.filterFn = facetedFilterFn;
              break;
            // Add other filter types as needed
          }
        } else {
          console.warn(`Column with ID ${columnKey} not found for sidebar filter ${filter.title}`);
        }
      });
    }

    return defs;
  }, [flatColumns, enableRowSelection, enableSorting, rowActions, facets, sidebarFilters, expandableRows, toggleRowExpanded]);

  // For server-side pagination, we need to control the pagination state
  const pagination = useMemo(
    () => ({
      pageIndex: serverPagination ? currentPage : 0,
      pageSize: serverPagination ? pageSize : 10,
    }),
    [serverPagination, currentPage, pageSize]
  );

  // Create table instance
  const table = useReactTable({
    data,
    columns: columnDefs,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    // Only use client pagination if server pagination is disabled
    ...(enablePagination && !serverPagination
      ? { getPaginationRowModel: getPaginationRowModel() }
      : {}),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: (updatedSelection) => {
      setRowSelection(updatedSelection as RowSelectionState);
      // Call the selection change handler if provided
      if (onSelectionChange) {
        const selectedRowIds = Object.keys(updatedSelection).filter(id =>
          (updatedSelection as Record<string, boolean>)[id]);

        const selectedRowData = selectedRowIds.map(id => {
          const row = table.getRow(id);
          return row.original;
        });

        onSelectionChange(selectedRowData);
      }
    },
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
  });

  // Handle page change for server-side pagination
  const handlePageChange = useCallback(
    (newPage: number) => {
      if (serverPagination && onPageChange) {
        onPageChange(newPage);
      } else {
        table.setPageIndex(newPage);
      }
    },
    [serverPagination, onPageChange, table]
  );

  // Handle page size change for server-side pagination
  const handlePageSizeChange = useCallback(
    (newPageSize: number) => {
      if (serverPagination && onPageSizeChange) {
        onPageSizeChange(newPageSize);
      } else {
        table.setPageSize(newPageSize);
      }
    },
    [serverPagination, onPageSizeChange, table]
  );

  // Handle export
  const handleExport = useCallback(
    (format: string) => {
      // Use either visible data or all data based on serverPagination
      const dataToExport = serverPagination ? data : table.getFilteredRowModel().rows.map(row => row.original);
      exportTableData(
        dataToExport,
        flatColumns,
        format,
        exportOptions?.filename || "table-export"
      );
    },
    [data, flatColumns, exportOptions, table, serverPagination]
  );

  // Memoize visibility items
  const visibilityItems = useMemo(() => {
    return table
      .getAllColumns()
      .filter((column) => column.getCanHide())
      .map((column) => {
        // Find the matching column definition to get the headingName
        const columnDef = flatColumns.find(col =>
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
          checked: isVisible,
          checkedIcon: <Check className="h-4 w-4" />,
        };
      });
  }, [table, flatColumns, columnVisibility]);

  // Calculate pagination info for server-side pagination
  const paginationInfo = useMemo(
    () => calculatePaginationInfo(
      serverPagination,
      table,
      currentPage,
      pageSize,
      totalItems
    ),
    [serverPagination, table, currentPage, pageSize, totalItems]
  );

  return (
    <div className={className || "w-full"}>
      {/* Main layout with proper alignment */}
      <div className="flex">
        {/* Sidebar (always in DOM, but width is 0 when closed) */}
        {enableSidebarFilters && (
          <div className={`transition-all duration-300 ease-in-out ${
            sidebarOpen ? "w-64 opacity-100 mr-6" : "w-0 opacity-0 mr-0 overflow-hidden"
          }`}>
            {sidebarOpen && (
              <TableSidebar
                filters={sidebarFilters}
                table={table}
                isOpen={sidebarOpen}
                onToggle={toggleSidebar}
              />
            )}
          </div>
        )}

        {/* Main content area */}
        <div className="flex-1">
          {/* Top filters row */}
          <TableFilters
            table={table}
            filterColumn={enableFiltering ? filterColumn : undefined}
            filterPlaceholder={filterPlaceholder}
            visibilityItems={enableColumnVisibility ? visibilityItems : []}
            facets={enableFiltering ? facets : undefined}
            exportOptions={exportOptions?.enabled ? {
              enabled: true,
              formats: exportOptions.formats,
              onExport: handleExport
            } : undefined}
            onToggleSidebar={enableSidebarFilters ? toggleSidebar : undefined}
            sidebarOpen={sidebarOpen}
            enableSidebarFilters={enableSidebarFilters}
          />

          {/* Table component */}
          <div className="rounded-md border border-gray-200 dark:border-gray-800">
            <Table.Root>
              <Table.Header>
                {table.getHeaderGroups().map((headerGroup) => (
                  <Table.Row key={headerGroup.id} className="hover:bg-muted/50 dark:hover:bg-muted/20 border-gray-200 dark:border-gray-800">
                    {headerGroup.headers.map((header) => {
                      // Get column type from our original columns definition
                      const columnDef = flatColumns.find(col =>
                        col.accessorKey.toString() === header.id ||
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
              <Table.Body>
                {isPaginationLoading ? (
                  <LoadingRow colSpan={columnDefs.length} />
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => {
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
                          {row.getVisibleCells().map((cell) => {
                            // Get column type from our original columns definition
                            const columnDef = flatColumns.find(col =>
                              col.accessorKey.toString() === cell.column.id ||
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
                  <EmptyRow colSpan={columnDefs.length} />
                )}
              </Table.Body>
            </Table.Root>
          </div>

          {/* Pagination */}
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
      </div>
    </div>
  );
}
