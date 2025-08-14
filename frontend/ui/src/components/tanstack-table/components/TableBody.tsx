import React, { useMemo, memo, useCallback, useState } from "react";
import { flexRender, Table as TanStackTable, Row, Cell, RowSelectionState } from "@tanstack/react-table";
import { Table } from "@shadcn";
import { LoadingRow, EmptyRow } from "./TableUtilityRows";
import { DataTableColumn, RowGroupingOptions } from "../types";
import { GroupHeaderRow } from "./GroupHeaderRow";
import { useTableGrouping } from "../hooks/useTableGrouping";
import { ChevronDown, ChevronRight } from 'lucide-react';
import {Box, Flex, IconButton} from "@incmix/ui"
// Import editable cell components
import { EditableCell } from "./EditableCell";
import { EditableDateCell } from "./EditableDateCell";
import { EditableBooleanCell } from "./EditableBooleanCell";
import { EditableTagCell } from "./EditableTagCell";
import { EditablePeopleCell } from "./EditablePeopleCell";

// Type definitions
interface GroupedData<TData> {
  manageRow: Row<TData> | null;
  otherRows: Row<TData>[];
  subject: string;
}

interface AccordionState {
  [subject: string]: boolean;
}

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
  isRoles?:boolean
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
  isRoles?:boolean;
  isSubRow?: boolean;
}

/**
 * Enhanced Manage Row Component with Accordion Toggle
 */
interface AccordionManageRowProps<TData extends object> extends Omit<RowProps<TData>, 'row'> {
  row: Row<TData>;
  isExpanded: boolean;
  hasSubRows: boolean;
  onToggle: () => void;
  subject: string;
  groupSelectProps?: {
    isAllRowsSelected: boolean;
    isSomeRowsSelected: boolean;
    toggleAllRowsSelected: (value: boolean) => void;
  };
}

function AccordionManageRow<TData extends object>({
  row,
  flatColumns,
  isExpanded,
  hasSubRows,
  onToggle,
  subject,
  expandableRows,
  toggleRowExpanded,
  onRowClick,
  enableInlineCellEdit = false,
}: AccordionManageRowProps<TData>) {
  const visibleCells = useMemo(() => row.getVisibleCells(), [row]);

  const handleRowClick = () => {
    if (onRowClick) {
      onRowClick(row.original);
    } else if (expandableRows && expandableRows.expandOnClick) {
      toggleRowExpanded(row.id);
    }
  };

  const handleAccordionToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle();
  };

  return (
    <Table.Row
      data-state={row.getIsSelected() && "selected"}
      className={` border-gray-5 data-[state=selected]:bg-gray-4 font-medium ${
        onRowClick || (expandableRows?.expandOnClick) ? "cursor-pointer" : ""
      }`}
      onClick={handleRowClick}
      role={enableInlineCellEdit ? "row" : undefined}
      aria-expanded={isExpanded}
      aria-label={`${subject} permissions group`}
    >
      {visibleCells.map((cell, cellIndex) => {
        if (!cell.column.getIsVisible()) return null;
        
        const columnDef = flatColumns.find(col =>
          col.accessorKey?.toString() === cell.column.id ||
          col.id === cell.column.id
        );

        const isFirstDataColumn = cellIndex === 0; 
        
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
            className={`${isFirstDataColumn ? "border-0":"border-l border-gray-6" } px-2 py-2 ${columnDef?.className || ""} overflow-hidden`}
            style={{
              width: columnDef?.width,
              minWidth: columnDef?.minWidth,
              maxWidth: columnDef?.maxWidth,
            }}
          >
            <Flex align={"center"} gap={"2"}>
              {isFirstDataColumn && hasSubRows && (
                <IconButton
                  onClick={handleAccordionToggle}
                  className="p-1 bg-gray-3 hover:bg-gray-5 rounded transition-colors"
                  aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${subject} permissions`}
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-gray-12" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-12" />
                  )}
                </IconButton>
              )}
              
              <Box className="flex-1">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Box>
              
              {/* {isFirstDataColumn && (
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md font-medium">
                  {subject}
                </span>
              )} */}
            </Flex>
          </Table.Cell>
        );
      })}
    </Table.Row>
  );
}


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
    isSubRow = false
  } = props;

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
        className={`border-gray-5 dark:border-gray-5 dark:data-[state=selected]:bg-muted/20 ${
          onRowClick || (expandableRows?.expandOnClick) ? "cursor-pointer" : ""
        } ${isExpanded ? "bg-gray-5" : ""} ${isSubRow ? "" : ""}`}
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
          const isEditablePeopleCell = isEditableCell && columnDef?.type === "People";
          const isEditableStringCell = isEditableCell && columnDef?.type === "String";
          const isEditableDropdownCell = isEditableCell && columnDef?.type === "Dropdown";

          const cellValue = cell.getValue();

          if (cell.column.id === 'select') {
            return (
              <Table.Cell
                key={cell.id}
                className={`pl-3 pr-0 py-1.5 ${columnDef?.className || ""} overflow-hidden ${isSubRow ? "pl-8" : ""}`}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Cell>
            );
          }
          
          return (
            <Table.Cell
              key={cell.id}
              className={`px-2 border-l border-gray-6 py-1.5 ${columnDef?.className || ""} overflow-hidden ${isEditableCell && isSelected?.(row.id, cell.column.id) ? 'keyboard-selected-cell' : ''} ${isSubRow ? "pl-8" : ""}`}
              style={{
                width: columnDef?.width,
                minWidth: columnDef?.minWidth,
                maxWidth: columnDef?.maxWidth,
                position: 'relative',
                ...(isEditableCell && isSelected?.(row.id, cell.column.id) && {
                  backgroundColor: 'rgba(93, 135, 255, 0.03)'
                })
              }}
              role={enableInlineCellEdit ? "gridcell" : undefined}
              aria-colindex={columnDef ? flatColumns.indexOf(columnDef) + 1 : undefined}
              aria-selected={isEditableCell && isSelected?.(row.id, cell.column.id) ? "true" : undefined}
              aria-readonly={isEditableCell ? "false" : "true"}
              tabIndex={isEditableCell && isSelected?.(row.id, cell.column.id) ? 0 : -1}
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
                  maxDisplay={columnDef?.meta?.maxDisplay || 3}
                  maxSelections={columnDef?.meta?.maxSelections || 10}
                />
              ) : isEditableDropdownCell ? (
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
                            rowData: row.original,
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
  isRoles,
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
  // State for accordion expanded/collapsed
  const [accordionState, setAccordionState] = useState<AccordionState>({});

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

  const groupedAccordionData = useMemo(() => {
    if (!isRoles) return [];
    
    const grouped: { [subject: string]: GroupedData<TData> } = {};
    
    rows.forEach((row) => {
      const { subject, action } = row.original as any;
      
      if (!grouped[subject]) {
        grouped[subject] = {
          manageRow: null,
          otherRows: [],
          subject
        };
      }
      
      if (action === 'manage') {
        grouped[subject].manageRow = row;
      } else {
        grouped[subject].otherRows.push(row);
      }
    });
    
    return Object.values(grouped);
  }, [rows, isRoles]);

  // Toggle accordion for a specific subject
  const toggleAccordion = useCallback((subject: string) => {
    setAccordionState(prev => ({
      ...prev,
      [subject]: !prev[subject]
    }));
  }, []);

  // Check if accordion is expanded
  const isAccordionExpanded = useCallback((subject: string) => {
    return accordionState[subject] || false;
  }, [accordionState]);

  // Early return for loading and empty states
  if (isPaginationLoading) {
    return (
      <Table.Body className="divide-y divide-gray-12">
        <LoadingRow colSpan={flatColumns.length} />
      </Table.Body>
    );
  }

  if (rows.length === 0) {
    return (
      <Table.Body className="divide-y divide-gray-12">
        <EmptyRow colSpan={flatColumns.length} />
      </Table.Body>
    );
  }

  // Render accordion-style grouped rows
  const renderAccordionGroup = (group: GroupedData<TData>) => {
    const isExpanded = isAccordionExpanded(group.subject);
    const allGroupRows = [group.manageRow, ...group.otherRows].filter(Boolean) as Row<TData>[];
    
    return (
      <React.Fragment key={`accordion-${group.subject}`}>
        {/* Always show the manage row with accordion toggle */}
        {group.manageRow && (
          <AccordionManageRow
            row={group.manageRow}
            flatColumns={flatColumns}
            isExpanded={isExpanded}
            hasSubRows={group.otherRows.length > 0}
            onToggle={() => toggleAccordion(group.subject)}
            subject={group.subject}
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
            // Group selection props
            groupSelectProps={{
              isAllRowsSelected: isGroupFullySelected(allGroupRows),
              isSomeRowsSelected: isGroupPartiallySelected(allGroupRows),
              toggleAllRowsSelected: (value) => toggleGroupSelection(allGroupRows, value)
            }}
          />
        )}
        
        {isExpanded && group.otherRows.map((row, index) => (
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
            rowIndex={index}
            isSubRow={true}
          />
        ))}
      </React.Fragment>
    );
  };

  console.log("allrows",rows);

  return (
    <Table.Body
      className="divide-y divide-gray-12"
      role={enableInlineCellEdit ? "rowgroup" : undefined}
    >
      {isRoles ? (
        // Render accordion-style grouped rows only when isRoles is true
        groupedAccordionData.map(renderAccordionGroup)
      ) : enableRowGrouping && rowGrouping ? (
        // Render grouped rows with headers (existing functionality)
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
                    <Table.Row className="border-t border-b border-gray-12">
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
                            className="px-2 py-2 text-xs font-medium text-gray-1 bg-gray-12"
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
        // Regular non-grouped rows when isRoles is false
        rows.map((row, rowIndex) => (
          <MemoizedRow
            key={row.id}
            row={row}
            isRoles={isRoles}
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
            rowIndex={rowIndex}
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