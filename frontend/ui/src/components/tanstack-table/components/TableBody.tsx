"use client";

import React, { useMemo, memo } from "react";
import { flexRender, Table as TanStackTable, Row, Cell } from "@tanstack/react-table";
import { Table } from "@shadcn";
import { LoadingRow, EmptyRow } from "./TableUtilityRows";
import { DataTableColumn } from "../types";

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
    saveEdit
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
        className={`border-gray-200 dark:border-gray-800 dark:data-[state=selected]:bg-muted/20 ${
          onRowClick || (expandableRows?.expandOnClick) ? "cursor-pointer" : ""
        } ${isExpanded ? "bg-muted/10" : ""}`}
        onClick={handleRowClick}
      >
        {visibleCells.map(cell => {
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

          // Get the cell value
          const cellValue = cell.getValue();

          return (
            <Table.Cell
              key={cell.id}
              className={`p-2 ${columnDef?.className || ""} overflow-hidden`}
              style={{
                width: columnDef?.width,
                minWidth: columnDef?.minWidth,
                maxWidth: columnDef?.maxWidth,
                position: 'relative' // For absolute positioning of editable content
              }}
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
  const columnCount = useMemo(() => table.getAllColumns().length, [table.getAllColumns().length]);

  return (
    <Table.Body>
      {isPaginationLoading ? (
        <LoadingRow colSpan={columnCount} />
      ) : rows?.length ? (
        // Map through rows and render each with our memoized row component
        rows.map((row) => (
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
          />
        ))
      ) : (
        <EmptyRow colSpan={columnCount} />
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
