// File: components/DataTable/types.ts
import { ReactNode } from "react";

// Define all supported column types
export type ColumnType =
  | "String"
  | "Number"
  | "Currency"
  | "Date"
  | "Tag"
  | "Boolean"
  | "Status"
  | "Rating"  // Add any custom types you've registered
  | "Image"
  | "Link"
  | "Custom";

// Column definition interface
export interface DataTableColumn<TData> {
  headingName: string;
  type: ColumnType;
  accessorKey: keyof TData | string;
  id?: string;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enableHiding?: boolean;
  className?: string;
  cell?: (info: any) => ReactNode;

  // New properties for enhanced functionality
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;

  // Formatting options
  format?: {
    dateFormat?: string;
    numberFormat?: {
      style?: string;  // Changed from a more restrictive type to string
      currency?: string;
      minimumFractionDigits?: number;
      maximumFractionDigits?: number;
      [key: string]: any;  // Allow any other standard Intl.NumberFormatOptions properties
    };
    formatter?: (value: any, row: TData) => string;
  };

  // Custom renderer
  renderer?: (value: any, row: TData) => ReactNode;
}

// Column group interface
export interface ColumnGroup<TData> {
  title: string;
  columns: DataTableColumn<TData>[];
}

// Filter option interface
export interface FilterOption {
  label: string;
  value: string | boolean | number;
  icon?: ReactNode;
}

// Faceted filter interface
export interface DataTableFacet<TData> {
  column: keyof TData | string;
  title: string;
  options: FilterOption[];
}

// Advanced filter interface
export interface AdvancedFilter<TData> {
  column: keyof TData | string;
  operator: "equals" | "contains" | "greaterThan" | "lessThan" | "between" | "in";
  value: any;
  secondValue?: any; // For "between" operator
}

// Row action interface
export interface RowAction {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  color?: string;
  disabled?: boolean;
}

// Export options
export interface ExportOptions {
  enabled?: boolean;
  formats?: ("csv" | "excel" | "pdf")[];
  filename?: string;
  customExporter?: (data: any[], columns: DataTableColumn<any>[]) => void;
}

// Virtualization options
export interface VirtualizationOptions {
  enabled?: boolean;
  rowHeight?: number;
  overscan?: number;
}

// Expandable row options
export interface ExpandableRowOptions<TData> {
  render: (row: TData) => ReactNode;
  expandOnClick?: boolean;
  singleExpand?: boolean;
}

// Main DataTable props
export interface DataTableProps<TData> {
  columns: DataTableColumn<TData>[] | ColumnGroup<TData>[];
  data: TData[];

  // Basic features
  enableFiltering?: boolean;
  enableSorting?: boolean;
  enablePagination?: boolean;
  enableRowSelection?: boolean;
  enableColumnVisibility?: boolean;
  enableColumnResizing?: boolean;
  enableColumnReordering?: boolean;

  // Display options
  showRowCount?: boolean;
  filterColumn?: keyof TData | string;
  filterPlaceholder?: string;
  className?: string;

  // Actions
  rowActions?: (row: TData) => RowAction[];

  // Advanced filtering
  facets?: DataTableFacet<TData>[];
  advancedFilters?: AdvancedFilter<TData>[];

  // Server pagination
  serverPagination?: boolean;
  currentPage?: number;
  pageSize?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  isPaginationLoading?: boolean;

  // New features
  export?: ExportOptions;
  virtualization?: VirtualizationOptions;
  expandableRows?: ExpandableRowOptions<TData>;

  // Events
  onRowClick?: (row: TData) => void;
  onSelectionChange?: (selectedRows: TData[]) => void;
  onColumnReorder?: (newOrder: string[]) => void;
}

// Pagination info
export interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
}