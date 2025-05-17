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
  | "Rating"
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
      style?: string;
      currency?: string;
      minimumFractionDigits?: number;
      maximumFractionDigits?: number;
      [key: string]: any;
    };
    formatter?: (value: any, row: TData) => string;
  };

  // Custom renderer - fixed type to be more flexible with value types
  renderer?: (value: any, row: TData) => ReactNode;

  // New property for inline editing
  enableInlineEdit?: boolean;
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
  customExporter?: <T>(data: T[], columns: DataTableColumn<T>[]) => void;
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

// Sidebar filter type
export type SidebarFilterType =
  | "select"
  | "multiSelect"
  | "date"
  | "dateRange"
  | "boolean"
  | "text";

// Sidebar filter configuration
export interface SidebarFilterConfig<TData> {
  type: SidebarFilterType;
  column: keyof TData | string;
  title: string;
  options?: FilterOption[]; // For select/multiSelect types
  icon?: ReactNode;         // Optional icon to display next to title
  initialCollapsed?: boolean; // Whether this filter group starts collapsed
}

// Row grouping configuration
export interface RowGroupingOptions<TData extends object> {
  // Column to group by - can be a key of the data or a function that derives a grouping value
  groupByColumn: keyof TData | string | ((row: TData) => string);
  // Custom render function for group header (optional)
  renderGroupHeader?: (groupValue: string, count: number) => ReactNode;
  // Whether all groups should start collapsed
  initiallyCollapsed?: boolean;
  // Whether clicking the group header should toggle the group
  toggleOnClick?: boolean;
}

// Main DataTable props
export interface DataTableProps<TData extends object> {
  // Column definitions
  columns: DataTableColumn<TData>[] | ColumnGroup<TData>[];
  // Data array
  data: TData[];

  // Basic features
  enableFiltering?: boolean;
  enableSorting?: boolean;
  enablePagination?: boolean;
  enableRowSelection?: boolean;
  enableColumnVisibility?: boolean;
  initialColumnVisibility?: Record<string, boolean>;
  enableColumnResizing?: boolean;
  enableColumnReordering?: boolean;

  // Display options
  showRowCount?: boolean;
  showPagination?: boolean; // Optional flag to explicitly control pagination visibility
  filterColumn?: keyof TData | string;
  filterPlaceholder?: string;
  className?: string;

  // Actions
  rowActions?: (row: TData) => RowAction[];

  // Advanced filtering
  facets?: DataTableFacet<TData>[];
  advancedFilters?: AdvancedFilter<TData>[];

  // NEW: Sidebar filtering
  enableSidebarFilters?: boolean;
  sidebarFilters?: SidebarFilterConfig<TData>[];
  initialSidebarOpen?: boolean;

  // Server pagination
  serverPagination?: boolean;
  currentPage?: number;
  pageSize?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  isPaginationLoading?: boolean;

  // Export functionality
  export?: ExportOptions;

  // Virtualization options
  virtualization?: VirtualizationOptions;

  // Expandable rows
  expandableRows?: ExpandableRowOptions<TData>;

  // Row grouping
  enableRowGrouping?: boolean;
  rowGrouping?: RowGroupingOptions<TData>;

  // Callbacks
  onRowClick?: (row: TData) => void;
  onSelectionChange?: (selectedRows: TData[]) => void;
  onColumnReorder?: (newOrder: string[]) => void;

  // Edit functionality
  enableRowEdit?: boolean;
  editFormSchema?: any;
  editFieldConfig?: any;
  onRowEdit?: (oldData: TData, newData: TData) => void;
  editDialogTitle?: string;

  // Inline cell editing functionality
  enableInlineCellEdit?: boolean;
  inlineEditableColumns?: (keyof TData | string)[];
  onCellEdit?: (rowData: TData, columnId: string, newValue: any) => void;
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
