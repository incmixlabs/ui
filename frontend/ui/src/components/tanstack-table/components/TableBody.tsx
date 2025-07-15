"use client";

import React, { useMemo, memo, useCallback } from "react";
import { flexRender, Table as TanStackTable, Row, Cell, RowSelectionState } from "@tanstack/react-table";
import { Table } from "@shadcn";
import { LoadingRow, EmptyRow } from "./TableUtilityRows";
import { DataTableColumn, RowGroupingOptions } from "../types";
import { GroupHeaderRow } from "./GroupHeaderRow";
import { useTableGrouping } from "../hooks/useTableGrouping";

// Import editable cell components
import { EditableCell } from "./EditableCell";
import { EditableDateCell } from "./EditableDateCell";
import { EditableBooleanCell } from "./EditableBooleanCell";
import { EditableTagCell } from "./EditableTagCell";

/**
 * Expanded row component for rendering expanded content
 */
interface ExpandedRowProps<TData> {
  row: TData;
  colSpan: number;
  renderContent: (row: TData) => React.ReactNode;
}

function ExpandedRow<TData>({ row, colSpan, renderContent }: ExpandedRowProps<TData>) {
  return (
    <tr className="bg-muted/5">
      <td colSpan={colSpan} className="p-2">
        <div className="p-2">
          {renderContent(row)}
        </div>
      </td>
    </tr>
  );
}

/**
 * Props for the TableBody component
 */
interface TableBodyProps<TData extends object> {
  table: TanStackTable<TData>;
  flatColumns: DataTableColumn<TData>[];
  isPaginationLoading?: boolean;
  expandableRows?: {
    render: (row: TData) => React.ReactNode;
    expandOnClick?: boolean;
    singleExpand?: boolean;
  };
  expandedRows: Record<string, boolean>;
  toggleRowExpanded: (rowId: string) => void;
  onRowClick?: (row: TData) => void;
  // Row grouping props
  enableRowGrouping?: boolean;
  rowGrouping?: RowGroupingOptions<TData>;
  // Inline editing props
  enableInlineCellEdit?: boolean;
  inlineEditableColumns?: (keyof TData | string)[];
  isEditing?: (rowId: string, columnId: string) => boolean;
  isSelected?: (rowId: string, columnId: string) => boolean;
  selectCell?: (rowId: string, columnId: string) => void;
  startEditing?: (rowId: string, columnId: string) => void;
  cancelEditing?: () => void;
  saveEdit?: (rowData: TData, columnId: string, newValue: any) => void;
}

/**
 * Props for the MemoizedRow component
 */
interface RowProps<TData extends object> {
  row: Row<TData>;
  flatColumns: DataTableColumn<TData>[];
  expandableRows?: TableBodyProps<TData>["expandableRows"];
  expandedRows: Record<string, boolean>;
  toggleRowExpanded: (rowId: string) => void;
  onRowClick?: (row: TData) => void;
  // Inline editing props
  enableInlineCellEdit?: boolean;
  inlineEditableColumns?: (keyof TData | string)[];
  isEditing?: (rowId: string, columnId: string) => boolean;
  isSelected?: (rowId: string, columnId: string) => boolean;
  selectCell?: (rowId: string, columnId: string) => void;
  startEditing?: (rowId: string, columnId: string) => void;
  cancelEditing?: () => void;
  saveEdit?: (rowData: TData, columnId: string, newValue: any) => void;
  // Accessibility props
  rowIndex?: number; // Index of the row for ARIA attributes
}

/**
 * Memoized row component to prevent unnecessary re-renders
 */
function TableRowComponent<TData extends object>(props: RowProps<TData>) {
  const {
    row,
    flatColumns,
    expandableRows,
    expandedRows,
    toggleRowExpanded,
    onRowClick,
    // Inline editing props
    enableInlineCellEdit = false,
    inlineEditableColumns = [],
    isEditing,
    isSelected,
    selectCell,
    startEditing,
    cancelEditing,
    saveEdit,
    // Accessibility props
    rowIndex
  } = props;

  // Determine if this row is expanded
  const isExpanded = expandableRows && expandedRows[row.id];

  // Memoize visible cells to avoid unnecessary re-computation
  const visibleCells = useMemo(() => row.getVisibleCells(), [row]);

  // Handle row click (memoized inside the component for better performance)
  const handleRowClick = () => {
    if (onRowClick) {
      onRowClick(row.original);
    } else if (expandableRows && expandableRows.expandOnClick) {
      toggleRowExpanded(row.id);
    }
  };

  return (
    <React.Fragment>
      <Table.Row
        data-state={row.getIsSelected() && "selected"}
        className={`border-gray-100 dark:border-gray-800 dark:data-[state=selected]:bg-muted/20 ${
          onRowClick || (expandableRows?.expandOnClick) ? "cursor-pointer" : ""
        } ${isExpanded ? "bg-muted/10" : ""}`}
        onClick={handleRowClick}
        role={enableInlineCellEdit ? "row" : undefined}
        aria-rowindex={rowIndex !== undefined ? rowIndex + 1 : undefined} // ARIA indices are 1-based
        aria-selected={row.getIsSelected() || isExpanded ? "true" : undefined}
      >
        {visibleCells.map(cell => {
          // Skip rendering cells for hidden columns
          if (!cell.column.getIsVisible()) return null;
          
          // Get column definition for styling and type information
          const columnDef = flatColumns.find(col =>
            col.accessorKey?.toString() === cell.column.id ||
            col.id === cell.column.id
          );

          // Determine if this cell is editable
          const isEditableCell = enableInlineCellEdit &&
            columnDef &&
            (inlineEditableColumns.includes(cell.column.id as any) || columnDef.enableInlineEdit) &&
            isEditing && isSelected && selectCell && startEditing && cancelEditing && saveEdit;

          // Check cell types for appropriate inline editor
          const isEditableDateCell = isEditableCell && columnDef?.type === "Date";
          const isEditableBooleanCell = isEditableCell && columnDef?.type === "Boolean";
          const isEditableTagCell = isEditableCell && columnDef?.type === "Tag";
          const isEditableStringCell = isEditableCell && columnDef?.type === "String";
          const isEditableDropdownCell = isEditableCell && columnDef?.type === "Dropdown";

          // Get the cell value
          const cellValue = cell.getValue();

          // Special styling for the checkbox column
          if (cell.column.id === 'select') {
            return (
              <Table.Cell
                key={cell.id}
                className={`pl-3 pr-0 py-1.5 ${columnDef?.className || ""} overflow-hidden`}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Cell>
            );
          }
          
          return (
            <Table.Cell
              key={cell.id}
              className={`px-2 py-1.5 ${columnDef?.className || ""} overflow-hidden`}
              style={{
                width: columnDef?.width,
                minWidth: columnDef?.minWidth,
                maxWidth: columnDef?.maxWidth,
                position: 'relative' // For absolute positioning of editable content
              }}
              role={enableInlineCellEdit ? "gridcell" : undefined}
              aria-colindex={columnDef ? flatColumns.indexOf(columnDef) + 1 : undefined} // ARIA indices are 1-based
              aria-selected={isEditableCell && isSelected?.(row.id, cell.column.id) ? "true" : undefined}
              aria-readonly={isEditableCell ? "false" : "true"}
              tabIndex={isEditableCell && isSelected?.(row.id, cell.column.id) ? 0 : -1} // Make selected cell focusable
            >
              {isEditableDateCell ? (
                <EditableDateCell
                  value={cellValue as string}
                  rowData={row.original}
                  columnId={cell.column.id}
                  onSave={saveEdit}
                  isEditing={isEditing?.(row.id, cell.column.id) || false}
                  isSelected={isSelected?.(row.id, cell.column.id) || false}
                  onSelect={() => selectCell?.(row.id, cell.column.id)}
                  onStartEdit={() => startEditing?.(row.id, cell.column.id)}
                  onCancelEdit={cancelEditing}
                  className=""
                  dateFormat={columnDef?.format?.dateFormat}
                />
              ) : isEditableBooleanCell ? (
                <EditableBooleanCell
                  value={cellValue as boolean}
                  rowData={row.original}
                  columnId={cell.column.id}
                  onSave={saveEdit}
                  isEditing={isEditing?.(row.id, cell.column.id) || false}
                  isSelected={isSelected?.(row.id, cell.column.id) || false}
                  onSelect={() => selectCell?.(row.id, cell.column.id)}
                  onStartEdit={() => startEditing?.(row.id, cell.column.id)}
                  onCancelEdit={cancelEditing}
                  className=""
                />
              ) : isEditableTagCell ? (
                <EditableTagCell
                  value={cellValue as string[]}
                  rowData={row.original}
                  columnId={cell.column.id}
                  onSave={saveEdit}
                  isEditing={isEditing?.(row.id, cell.column.id) || false}
                  isSelected={isSelected?.(row.id, cell.column.id) || false}
                  onSelect={() => selectCell?.(row.id, cell.column.id)}
                  onStartEdit={() => startEditing?.(row.id, cell.column.id)}
                  onCancelEdit={cancelEditing}
                  className=""
                />
              ) : isEditableDropdownCell ? (
                // Custom handling for dropdown cells
                <div
                  className={`relative w-full h-full ${isSelected?.(row.id, cell.column.id) ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => selectCell?.(row.id, cell.column.id)}
                  onDoubleClick={() => startEditing?.(row.id, cell.column.id)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Edit ${columnDef?.headingName || ''} value`}
                  style={{ position: 'static' }} // Make sure position is static to avoid conflicts
                >
                  <div className="dropdown-container" style={{ position: 'relative' }}>
                    {/* Always render the original cell value */}
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                    
                    {/* Render the dropdown editor on top if editing */}
                    {isEditing?.(row.id, cell.column.id) && (
                      <div className="absolute top-0 left-0" style={{ zIndex: 999 }}>
                        {columnDef?.inlineCellEditor ? (
                          columnDef.inlineCellEditor({
                            value: cellValue as string,
                            onSave: (newValue: string) => saveEdit(row.original, cell.column.id, newValue),
                            onCancel: cancelEditing,
                            columnDef: columnDef,
                          })
                        ) : (
                          // Fallback if no custom editor is provided
                          <EditableCell
                            value={cellValue as string}
                            rowData={row.original}
                            columnId={cell.column.id}
                            onSave={saveEdit}
                            isEditing={true}
                            isSelected={true}
                            onSelect={() => {}}
                            onStartEdit={() => {}}
                            onCancelEdit={cancelEditing}
                            className=""
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : isEditableStringCell ? (
                <EditableCell
                  value={cellValue as string}
                  rowData={row.original}
                  columnId={cell.column.id}
                  onSave={saveEdit}
                  isEditing={isEditing?.(row.id, cell.column.id) || false}
                  isSelected={isSelected?.(row.id, cell.column.id) || false}
                  onSelect={() => selectCell?.(row.id, cell.column.id)}
                  onStartEdit={() => startEditing?.(row.id, cell.column.id)}
                  onCancelEdit={cancelEditing}
                  className=""
                />
              ) : (
                flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )
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
}

// Create a memoized version of the row component
const MemoizedRow = memo(TableRowComponent) as <T extends object>(props: RowProps<T>) => React.ReactElement;

// Set display name for debugging
(MemoizedRow as any).displayName = "MemoizedTableRow";

/**
 * TableBody component with optimizations to prevent unnecessary re-renders
 * Uses memoization for rows and key table data
 */
function TableBodyComponent<TData extends object>({
  table,
  flatColumns,
  isPaginationLoading,
  expandableRows,
  expandedRows,
  toggleRowExpanded,
  onRowClick,
  // Row grouping props
  enableRowGrouping = false,
  rowGrouping,
  // Inline editing props
  enableInlineCellEdit = false,
  inlineEditableColumns = [],
  isEditing,
  isSelected,
  selectCell,
  startEditing,
  cancelEditing,
  saveEdit,
}: TableBodyProps<TData>) {
  // Memoize the row model to prevent unnecessary recalculations
  const rows = useMemo(() => table.getRowModel().rows, [table.getRowModel().rows]);
  
  // Calculate the number of visible columns for proper colSpan calculation
  const visibleColumnCount = useMemo(() => {
    return table.getVisibleFlatColumns().length;
  }, [table.getVisibleFlatColumns().length]);
  
  const columnCount = useMemo(() => table.getAllColumns().length, [table.getAllColumns().length]);

  // Group selection helper functions
  const isGroupFullySelected = useCallback((groupRows: Row<TData>[]) => {
    // Check if all rows in this group are selected
    return groupRows.length > 0 && groupRows.every(row => row.getIsSelected());
  }, []);

  const isGroupPartiallySelected = useCallback((groupRows: Row<TData>[]) => {
    // Check if some (but not all) rows in this group are selected
    const selectedCount = groupRows.filter(row => row.getIsSelected()).length;
    return selectedCount > 0 && selectedCount < groupRows.length;
  }, []);

  const toggleGroupSelection = useCallback((groupRows: Row<TData>[], value: boolean) => {
    // Create a new selection state object that only modifies rows in this group
    const newSelectionState: RowSelectionState = {};
    
    // Set selection state for only this group's rows
    groupRows.forEach(row => {
      newSelectionState[row.id] = value;
    });
    
    // Update the selection state while preserving the selection of other rows
    table.setRowSelection(prev => ({
      ...prev,
      ...newSelectionState
    }));
  }, [table]);

  // Initialize row grouping if enabled
  const grouping = useTableGrouping(
    rows,
    rowGrouping || { groupByColumn: '' },  // Default to empty string if no grouping is provided
    enableRowGrouping && !!rowGrouping
  );

  // Destructure grouping values
  const {
    groupedRows,
    toggleGroupCollapsed,
    isRowVisible,
    groupKeys,
    getGroupRowCount,
    getRowGroupValue
  } = grouping;

  // Early return for loading and empty states
  if (isPaginationLoading) {
    return (
      <Table.Body className="divide-y divide-gray-100 dark:divide-gray-800">
        <LoadingRow colSpan={flatColumns.length} />
      </Table.Body>
    );
  }

  if (rows.length === 0) {
    return (
      <Table.Body className="divide-y divide-gray-100 dark:divide-gray-800">
        <EmptyRow colSpan={flatColumns.length} />
      </Table.Body>
    );
  }

  return (
    <Table.Body
      className="divide-y divide-gray-100 dark:divide-gray-800"
      role={enableInlineCellEdit ? "rowgroup" : undefined}
    >
      {enableRowGrouping && rowGrouping ? (
        // Render grouped rows with headers
        <>
          {groupKeys.map(groupKey => {
            const group = groupedRows[groupKey];
            const rowCount = getGroupRowCount(groupKey);

            return (
              <React.Fragment key={`group-${groupKey}`}>
                {/* Render group header with group-specific selection */}
                <GroupHeaderRow
                  groupKey={groupKey}
                  rowCount={rowCount}
                  isCollapsed={group.isCollapsed}
                  toggleCollapsed={toggleGroupCollapsed}
                  colSpan={visibleColumnCount} // Use visible columns count instead of all columns
                  renderGroupHeader={rowGrouping.renderGroupHeader}
                  categoryMapping={rowGrouping.categoryMapping} // Pass the dynamic color mapping
                  groupSelectProps={{
                    isAllRowsSelected: isGroupFullySelected(group.rows),
                    isSomeRowsSelected: isGroupPartiallySelected(group.rows),
                    toggleAllRowsSelected: (value) => toggleGroupSelection(group.rows, value)
                  }}
                />

                {/* Only render the content if the group is not collapsed */}
                {!group.isCollapsed && (
                  <>
                    {/* Column headers for this group */}
                    <Table.Row className="border-t border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                      {table.getHeaderGroups()[0].headers.map(header => {
                        // Skip the status column if it's hidden
                        if (header.id === 'status' && !header.column.getIsVisible()) {
                          return null;
                        }
                        
                        // Add an empty placeholder cell for the selection column instead of skipping it
                        // This maintains alignment with the data rows below
                        if (header.id === 'select') {
                          return (
                            <Table.Cell
                              key={header.id}
                              className="px-2 py-2 w-[40px]"
                            />
                          );
                        }

                        return (
                          <Table.Cell
                            key={header.id}
                            className="px-2 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </Table.Cell>
                        );
                      })}
                    </Table.Row>

                    {/* Render rows in this group */}
                    {group.rows.map((row, rowIndex) => (
                      <MemoizedRow
                        key={row.id}
                        row={row}
                        flatColumns={flatColumns}
                        expandableRows={expandableRows}
                        expandedRows={expandedRows}
                        toggleRowExpanded={toggleRowExpanded}
                        onRowClick={onRowClick}
                        enableInlineCellEdit={enableInlineCellEdit}
                        inlineEditableColumns={inlineEditableColumns}
                        isEditing={isEditing}
                        isSelected={isSelected}
                        selectCell={selectCell}
                        startEditing={startEditing}
                        cancelEditing={cancelEditing}
                        saveEdit={saveEdit}
                        rowIndex={rowIndex} // Pass row index for ARIA attributes
                      />
                    ))}
                  </>
                )}
              </React.Fragment>
            );
          })}
        </>
      ) : (
        // Regular non-grouped rows
        rows.map((row, rowIndex) => (
          <MemoizedRow
            key={row.id}
            row={row}
            flatColumns={flatColumns}
            expandableRows={expandableRows}
            expandedRows={expandedRows}
            toggleRowExpanded={toggleRowExpanded}
            onRowClick={onRowClick}
            enableInlineCellEdit={enableInlineCellEdit}
            inlineEditableColumns={inlineEditableColumns}
            isEditing={isEditing}
            isSelected={isSelected}
            selectCell={selectCell}
            startEditing={startEditing}
            cancelEditing={cancelEditing}
            saveEdit={saveEdit}
            rowIndex={rowIndex} // Pass row index for ARIA attributes
          />
        ))
      )}
    </Table.Body>
  );
}

// Create a type-safe memoized component
const TableBodyMemoized = memo(TableBodyComponent) as unknown as {
  <TData extends object>(props: TableBodyProps<TData>): React.ReactElement;
  displayName?: string;
};

// Set display name for debugging
TableBodyMemoized.displayName = "TableBody";

// Export named export for new code
export const TableBody = TableBodyMemoized;

// Export default for backward compatibility
export default TableBody;
