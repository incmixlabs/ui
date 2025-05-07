"use client";

import React from "react";
import { flexRender } from "@tanstack/react-table";
import { Table } from "@shadcn";
import { LoadingRow, EmptyRow, ExpandedRow } from "./TableUtilityRows";
import { DataTableColumn } from "../types";
import { Row, Cell } from "@tanstack/react-table";
import { EditableCell } from "./EditableCell";
import { EditableDateCell } from "./EditableDateCell";
import { EditableBooleanCell } from "./EditableBooleanCell";
import { EditableTagCell } from "./EditableTagCell";

interface TableBodyProps<TData> {
  table: any;
  flatColumns: DataTableColumn<TData>[];
  isPaginationLoading?: boolean;
  expandableRows?: any;
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
 * Table body component rendering rows with support for expandable rows
 */
export function TableBody<TData extends object>({
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
  return (
    <Table.Body>
      {isPaginationLoading ? (
        <LoadingRow colSpan={table.getAllColumns().length} />
      ) : table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row: Row<TData>) => {
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
                  } else if (expandableRows && expandableRows.expandOnClick) {
                    toggleRowExpanded(row.id);
                  }
                }}
              >
                {row.getVisibleCells().map((cell: Cell<TData, unknown>) => {
                  // Get column type from our original columns definition
                  const columnDef = flatColumns.find(col =>
                    col.accessorKey?.toString() === cell.column.id ||
                    col.id === cell.column.id
                  );

                  // Check if this cell supports inline editing
                  const isEditableCell = enableInlineCellEdit &&
                    (inlineEditableColumns.includes(cell.column.id as any) || columnDef?.enableInlineEdit) &&
                    isEditing && isSelected && selectCell && startEditing && cancelEditing && saveEdit;
                  
                  // Check if this is a date column that supports inline editing
                  const isEditableDateCell = isEditableCell && columnDef?.type === "Date";
                  
                  // Check if this is a string column that supports inline editing
                  const isEditableStringCell = isEditableCell && columnDef?.type === "String";
                  
                  // Check if this is a boolean column that supports inline editing
                  const isEditableBooleanCell = isEditableCell && columnDef?.type === "Boolean";
                  
                  // Check if this is a tag column that supports inline editing
                  const isEditableTagCell = isEditableCell && columnDef?.type === "Tag";

                  // Get the cell value
                  const cellValue = cell.getValue();

                  return (
                    <Table.Cell
                      key={cell.id}
                      className="px-4 text-left h-12 align-middle"
                      style={{
                        width: columnDef?.width,
                        minWidth: columnDef?.minWidth,
                        maxWidth: columnDef?.maxWidth
                      }}
                    >
                      {isEditableDateCell ? (
                        <EditableDateCell
                          value={cellValue as string}
                          rowData={row.original}
                          columnId={cell.column.id}
                          onSave={saveEdit}
                          isEditing={isEditing(row.id, cell.column.id)}
                          isSelected={isSelected(row.id, cell.column.id)}
                          onSelect={() => selectCell(row.id, cell.column.id)}
                          onStartEdit={() => startEditing(row.id, cell.column.id)}
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
                          isEditing={isEditing(row.id, cell.column.id)}
                          isSelected={isSelected(row.id, cell.column.id)}
                          onSelect={() => selectCell(row.id, cell.column.id)}
                          onStartEdit={() => startEditing(row.id, cell.column.id)}
                          onCancelEdit={cancelEditing}
                          className=""
                        />
                      ) : isEditableTagCell ? (
                        <EditableTagCell
                          value={cellValue as string[]}
                          rowData={row.original}
                          columnId={cell.column.id}
                          onSave={saveEdit}
                          isEditing={isEditing(row.id, cell.column.id)}
                          isSelected={isSelected(row.id, cell.column.id)}
                          onSelect={() => selectCell(row.id, cell.column.id)}
                          onStartEdit={() => startEditing(row.id, cell.column.id)}
                          onCancelEdit={cancelEditing}
                          className=""
                        />
                      ) : isEditableStringCell ? (
                        <EditableCell
                          value={cellValue as string}
                          rowData={row.original}
                          columnId={cell.column.id}
                          onSave={saveEdit}
                          isEditing={isEditing(row.id, cell.column.id)}
                          isSelected={isSelected(row.id, cell.column.id)}
                          onSelect={() => selectCell(row.id, cell.column.id)}
                          onStartEdit={() => startEditing(row.id, cell.column.id)}
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
        })
      ) : (
        <EmptyRow colSpan={table.getAllColumns().length} />
      )}
    </Table.Body>
  );
}
