"use client"

import React, { useMemo, useState, useCallback } from "react";
import {
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
import { Check } from "lucide-react";
import { Table } from "@shadcn";

// Import components
import { TableFilters } from "./TableFilters";
import { TablePagination } from "./TablePagination";
import { LoadingRow, EmptyRow, ExpandedRow } from "./TableUtilityRows";
import { TableSidebar } from "../sidebar-filter";

// Import utilities
import { 
  isColumnGroup,
  flattenColumns 
} from "../utils/column-utils";
import { createColumnDefinitions } from "./ColumnRenderers";
import { exportTableData } from "../utils/export-utils";
import { 
  facetedFilterFn, 
  dateRangeFilterFn, 
  textFilterFn,
  shouldPaginationBeVisible 
} from "../utils/filter-utils";
import { calculatePaginationInfo } from "../utils/pagination-utils";

// Import types
import {
  DataTableProps,
  DataTableColumn,
  ColumnGroup,
} from "../types";

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
  showPagination,
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
    let finalDefs = defs;
    if (expandableRows && expandableRows.expandOnClick) {
      finalDefs = defs.map(col => {
        const originalCellFn = col.cell;
        return {
          ...col,
          cell: (info) => {
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
          }
        };
      });
    }

    // For client-side filtering, apply the filter function to each column that has a facet
    if (facets && facets.length > 0) {
      facets.forEach(facet => {
        const columnKey = facet.column.toString();
        const colDef = finalDefs.find(col => col.id === columnKey);

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
        const colDef = finalDefs.find(col => col.id === columnKey);

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

    return finalDefs;
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

  // Add memoized value to compute if pagination should be visible
  const isPaginationVisible = useMemo(() => {
    const totalItemCount = serverPagination 
      ? totalItems 
      : table.getFilteredRowModel().rows.length;
    
    return shouldPaginationBeVisible(
      showPagination,
      enablePagination,
      totalItemCount,
      paginationInfo.pageSize
    );
  }, [
    showPagination,
    enablePagination,
    serverPagination,
    totalItems,
    table,
    paginationInfo.pageSize
  ]);

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
          {(isPaginationVisible || (showRowCount && enableRowSelection)) && (
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
