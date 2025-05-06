// src/components/tanstack-table/index.ts
export { default as UsersTableDemo } from "./users-demo";
export { default as TasksTableDemo } from "./tasks-demo";
export { default as SidebarFilterDemo } from "./sidebarfilter-demo";
export { default as EditableUsersTableDemo } from "./users-edit-demo";

// Export the main DataTable component
export { DataTable } from "./components/DataTable";

// Re-export utility functions
export {
  facetedFilterFn,
  dateRangeFilterFn,
  textFilterFn,
  shouldPaginationBeVisible
} from './utils/filter-utils';

// Re-export column utilities (non-JSX)
export {
  isColumnGroup,
  flattenColumns,
  applyColumnSizeConstraints
} from './utils/column-utils';

// Re-export column renderers (React/JSX)
export {
  createColumnDefinitions,
  createSortableHeader,
  createStandardHeader,
  createSelectHeaderCell,
  createSelectRowCell,
  createActionsCell,
  createDataCellRenderer
} from './components/ColumnRenderers';

export {
  exportTableData,
  exportCSV
} from './utils/export-utils';

export {
  calculatePaginationInfo,
  PAGE_SIZE_OPTIONS
} from './utils/pagination-utils';

// Re-export component parts
export { TableFilters, FacetedFilter } from './components/TableFilters';
export { TablePagination } from './components/TablePagination';
export { LoadingRow, EmptyRow, ExpandedRow } from './components/TableUtilityRows';
export { TableSidebar } from './sidebar-filter';

// // For backward compatibility, also export from tanstack-table.tsx
// export * from "./tanstack-table";
