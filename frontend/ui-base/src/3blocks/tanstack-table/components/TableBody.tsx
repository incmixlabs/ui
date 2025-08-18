"use client"

import { Box, Button } from "@/src/1base"
import { Table } from "@/src/1base/shadcn/table"
import { flexRender } from "@tanstack/react-table"
import type {
  Row,
  RowSelectionState,
  Table as TanStackTable,
} from "@tanstack/react-table"
import React, { useMemo, memo, useCallback } from "react"
import { useTableGrouping } from "../hooks/useTableGrouping"
import type { DataTableColumn, RowGroupingOptions } from "../types"
import { GroupHeaderRow } from "./GroupHeaderRow"
import { EmptyRow, LoadingRow } from "./TableUtilityRows"

import { EditableBooleanCell } from "./EditableBooleanCell"
// Import editable cell components
import { EditableCell } from "./EditableCell"
import { EditableDateCell } from "./EditableDateCell"
import { EditablePeopleCell } from "./EditablePeopleCell"
import { EditableTagCell } from "./EditableTagCell"

/**
 * Expanded row component for rendering expanded content
 */
interface ExpandedRowProps<TData> {
  row: TData
  colSpan: number
  renderContent: (row: TData) => React.ReactNode
}

function ExpandedRow<TData>({
  row,
  colSpan,
  renderContent,
}: ExpandedRowProps<TData>) {
  return (
    <Table.Row>
      <Table.Cell colSpan={colSpan}>
        <Box p="2">{renderContent(row)}</Box>
      </Table.Cell>
    </Table.Row>
  )
}

/**
 * Props for the TableBody component
 */
interface TableBodyProps<TData extends object> {
  table: TanStackTable<TData>
  flatColumns: DataTableColumn<TData>[]
  isPaginationLoading?: boolean
  expandableRows?: {
    render: (row: TData) => React.ReactNode
    expandOnClick?: boolean
    singleExpand?: boolean
  }
  expandedRows: Record<string, boolean>
  toggleRowExpanded: (rowId: string) => void
  onRowClick?: (row: TData) => void
  // Row grouping props
  enableRowGrouping?: boolean
  rowGrouping?: RowGroupingOptions<TData>
  // Inline editing props
  enableInlineCellEdit?: boolean
  inlineEditableColumns?: (keyof TData | string)[]
  isEditing?: (rowId: string, columnId: string) => boolean
  isSelected?: (rowId: string, columnId: string) => boolean
  selectCell?: (rowId: string, columnId: string) => void
  startEditing?: (rowId: string, columnId: string) => void
  cancelEditing?: () => void
  saveEdit?: (rowData: TData, columnId: string, newValue: any) => void
}

/**
 * Props for the MemoizedRow component
 */
interface RowProps<TData extends object> {
  row: Row<TData>
  flatColumns: DataTableColumn<TData>[]
  expandableRows?: TableBodyProps<TData>["expandableRows"]
  expandedRows: Record<string, boolean>
  toggleRowExpanded: (rowId: string) => void
  onRowClick?: (row: TData) => void
  // Inline editing props
  enableInlineCellEdit?: boolean
  inlineEditableColumns?: (keyof TData | string)[]
  isEditing?: (rowId: string, columnId: string) => boolean
  isSelected?: (rowId: string, columnId: string) => boolean
  selectCell?: (rowId: string, columnId: string) => void
  startEditing?: (rowId: string, columnId: string) => void
  cancelEditing?: () => void
  saveEdit?: (rowData: TData, columnId: string, newValue: any) => void
  // Accessibility props
  rowIndex?: number // Index of the row for ARIA attributes
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
    rowIndex,
  } = props

  // Determine if this row is expanded
  const isExpanded = expandableRows && expandedRows[row.id]

  // Memoize visible cells to avoid unnecessary re-computation
  const visibleCells = useMemo(() => row.getVisibleCells(), [row])

  // Handle row click (memoized inside the component for better performance)
  const handleRowClick = () => {
    if (onRowClick) {
      onRowClick(row.original)
    } else if (expandableRows?.expandOnClick) {
      toggleRowExpanded(row.id)
    }
  }

  return (
    <React.Fragment>
      <Table.Row
        data-state={row.getIsSelected() && "selected"}
        className={`border-gray-2 border-b ${
          onRowClick || expandableRows?.expandOnClick
            ? "cursor-pointer"
            : "cursor-default"
        }`}
        onClick={handleRowClick}
        role={enableInlineCellEdit ? "row" : undefined}
        aria-rowindex={rowIndex !== undefined ? rowIndex + 1 : undefined}
        aria-selected={row.getIsSelected() || isExpanded ? "true" : undefined}
      >
        {visibleCells.map((cell) => {
          // Skip rendering cells for hidden columns
          if (!cell.column.getIsVisible()) return null

          // Get column definition for styling and type information
          const columnDef = flatColumns.find(
            (col) =>
              col.accessorKey?.toString() === cell.column.id ||
              col.id === cell.column.id
          )

          // Determine if this cell is editable
          const isEditableCell =
            enableInlineCellEdit &&
            columnDef &&
            (inlineEditableColumns.includes(cell.column.id as any) ||
              columnDef.enableInlineEdit) &&
            isEditing &&
            isSelected &&
            selectCell &&
            startEditing &&
            cancelEditing &&
            saveEdit

          // Check cell types for appropriate inline editor
          const isEditableDateCell =
            isEditableCell && columnDef?.type === "Date"
          const isEditableBooleanCell =
            isEditableCell && columnDef?.type === "Boolean"
          const isEditableTagCell = isEditableCell && columnDef?.type === "Tag"
          const isEditablePeopleCell =
            isEditableCell && columnDef?.type === "People"
          const isEditableStringCell =
            isEditableCell && columnDef?.type === "String"
          const isEditableDropdownCell =
            isEditableCell && columnDef?.type === "Dropdown"

          // Get the cell value
          const cellValue = cell.getValue()

          // Special styling for the checkbox column
          if (cell.column.id === "select") {
            return (
              <Table.Cell
                key={cell.id}
                className="overflow-hidden py-1.5 pr-0 pl-3"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Cell>
            )
          }

          return (
            <Table.Cell
              key={cell.id}
              className={`relative overflow-hidden px-2 py-1.5 ${
                isEditableCell && isSelected?.(row.id, cell.column.id)
                  ? "bg-blue-50/30"
                  : ""
              }`}
              style={{
                width: columnDef?.width,
                minWidth: columnDef?.minWidth,
                maxWidth: columnDef?.maxWidth,
              }}
              role={enableInlineCellEdit ? "gridcell" : undefined}
              aria-colindex={
                columnDef ? flatColumns.indexOf(columnDef) + 1 : undefined
              } // ARIA indices are 1-based
              aria-selected={
                isEditableCell && isSelected?.(row.id, cell.column.id)
                  ? "true"
                  : undefined
              }
              aria-readonly={isEditableCell ? "false" : "true"}
              tabIndex={
                isEditableCell && isSelected?.(row.id, cell.column.id) ? 0 : -1
              } // Make selected cell focusable
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
                  dateFormat={
                    typeof columnDef?.format?.dateFormat === "string"
                      ? columnDef.format.dateFormat
                      : undefined
                  }
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
              ) : isEditablePeopleCell ? (
                <EditablePeopleCell
                  value={cellValue as any[]}
                  rowData={row.original}
                  columnId={cell.column.id}
                  onSave={saveEdit}
                  isEditing={isEditing?.(row.id, cell.column.id) || false}
                  isSelected={isSelected?.(row.id, cell.column.id) || false}
                  onSelect={() => selectCell?.(row.id, cell.column.id)}
                  onStartEdit={() => startEditing?.(row.id, cell.column.id)}
                  onCancelEdit={cancelEditing}
                  className=""
                  availableUsers={columnDef?.meta?.availableUsers || []}
                  maxVisible={columnDef?.meta?.maxVisible || 3}
                  maxSelections={columnDef?.meta?.maxSelections || 10}
                />
              ) : isEditableDropdownCell ? (
                // Custom handling for dropdown cells
                <Button
                  variant="ghost"
                  className={`static h-full w-full text-left ${
                    isSelected?.(row.id, cell.column.id)
                      ? "-outline-offset-2 outline-2 outline-blue-500"
                      : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    selectCell?.(row.id, cell.column.id)
                  }}
                  onDoubleClick={(e) => {
                    e.stopPropagation()
                    startEditing?.(row.id, cell.column.id)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      e.stopPropagation()
                      selectCell?.(row.id, cell.column.id)
                    }
                  }}
                  aria-label={`Edit ${columnDef?.headingName || ""} value`}
                >
                  <Box className="relative">
                    {/* Always render the original cell value */}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}

                    {/* Render the dropdown editor on top if editing */}
                    {isEditing?.(row.id, cell.column.id) && (
                      <Box className="absolute top-0 left-0 z-[999]">
                        {columnDef?.inlineCellEditor ? (
                          columnDef.inlineCellEditor({
                            value: cellValue as string,
                            onSave: (newValue: string) =>
                              saveEdit(row.original, cell.column.id, newValue),
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
                          />
                        )}
                      </Box>
                    )}
                  </Box>
                </Button>
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
                flexRender(cell.column.columnDef.cell, cell.getContext())
              )}
            </Table.Cell>
          )
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
  )
}

// Create a memoized version of the row component
const MemoizedRow = memo(TableRowComponent) as <T extends object>(
  props: RowProps<T>
) => React.ReactElement

// Set display name for debugging
;(MemoizedRow as any).displayName = "MemoizedTableRow"

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
  const rows = useMemo(
    () => table.getRowModel().rows,
    [table.getRowModel().rows]
  )

  // Calculate the number of visible columns for proper colSpan calculation
  const visibleColumnCount = useMemo(() => {
    return table.getVisibleFlatColumns().length
  }, [table.getVisibleFlatColumns().length])

  // Group selection helper functions
  const isGroupFullySelected = useCallback((groupRows: Row<TData>[]) => {
    // Check if all rows in this group are selected
    return groupRows.length > 0 && groupRows.every((row) => row.getIsSelected())
  }, [])

  const isGroupPartiallySelected = useCallback((groupRows: Row<TData>[]) => {
    // Check if some (but not all) rows in this group are selected
    const selectedCount = groupRows.filter((row) => row.getIsSelected()).length
    return selectedCount > 0 && selectedCount < groupRows.length
  }, [])

  const toggleGroupSelection = useCallback(
    (groupRows: Row<TData>[], value: boolean) => {
      // Create a new selection state object that only modifies rows in this group
      const newSelectionState: RowSelectionState = {}

      // Set selection state for only this group's rows
      groupRows.forEach((row) => {
        newSelectionState[row.id] = value
      })

      // Update the selection state while preserving the selection of other rows
      table.setRowSelection((prev) => ({
        ...prev,
        ...newSelectionState,
      }))
    },
    [table]
  )

  // Initialize row grouping if enabled
  const grouping = useTableGrouping(
    rows,
    rowGrouping || { groupByColumn: "" }, // Default to empty string if no grouping is provided
    enableRowGrouping && !!rowGrouping
  )

  // Destructure grouping values
  const { groupedRows, toggleGroupCollapsed, groupKeys, getGroupRowCount } =
    grouping

  // Early return for loading and empty states
  if (isPaginationLoading) {
    return (
      <Table.Body>
        <LoadingRow colSpan={flatColumns.length} />
      </Table.Body>
    )
  }

  if (rows.length === 0) {
    return (
      <Table.Body>
        <EmptyRow colSpan={flatColumns.length} />
      </Table.Body>
    )
  }

  return (
    <Table.Body role={enableInlineCellEdit ? "rowgroup" : undefined}>
      {enableRowGrouping && rowGrouping ? (
        // Render grouped rows with headers
        <>
          {groupKeys.map((groupKey) => {
            const group = groupedRows[groupKey]
            const rowCount = getGroupRowCount(groupKey)

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
                    toggleAllRowsSelected: (value) =>
                      toggleGroupSelection(group.rows, value),
                  }}
                />

                {/* Only render the content if the group is not collapsed */}
                {!group.isCollapsed && (
                  <>
                    {/* Column headers for this group */}
                    <Table.Row>
                      {table.getHeaderGroups()[0].headers.map((header) => {
                        // Skip the status column if it's hidden
                        if (
                          header.id === "status" &&
                          !header.column.getIsVisible()
                        ) {
                          return null
                        }

                        // Add an empty placeholder cell for the selection column instead of skipping it
                        // This maintains alignment with the data rows below
                        if (header.id === "select") {
                          return (
                            <Table.Cell key={header.id} className="w-10 p-2" />
                          )
                        }

                        return (
                          <Table.Cell key={header.id} className="p-2">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </Table.Cell>
                        )
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
            )
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
  )
}

// Create a type-safe memoized component
const TableBodyMemoized = memo(TableBodyComponent) as unknown as {
  <TData extends object>(props: TableBodyProps<TData>): React.ReactElement
  displayName?: string
}

// Set display name for debugging
TableBodyMemoized.displayName = "TableBody"

// Export named export for new code
export const TableBody = TableBodyMemoized

// Export default for backward compatibility
export default TableBody
