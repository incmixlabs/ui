"use client";

import { useState, useCallback, useRef, useEffect, RefObject } from "react";

type CellPosition = {
  rowId: string;
  columnId: string;
  rowIndex: number;
  columnIndex: number;
};

type EditableCellMap = Map<string, CellPosition>;

/**
 * Hook to manage inline cell editing state and functionality with keyboard navigation
 */
export function useTableInlineEdit<TData>({
  onCellEdit,
  tableRef,
  disableBuiltInHandlers = false,
}: {
  onCellEdit?: (rowData: TData, columnId: string, newValue: any) => void;
  tableRef?: RefObject<HTMLElement | null> | null;
  disableBuiltInHandlers?: boolean;
}) {
  // Track which cell is being edited [rowId_columnId]
  const [editingCell, setEditingCell] = useState<string | null>(null);

  // Track which cell is selected [rowId_columnId]
  const [selectedCell, setSelectedCell] = useState<string | null>(null);

  // Store a reference to all available editable cells
  const editableCellsRef = useRef<EditableCellMap>(new Map());

  // Index map for quick lookup of cell positions
  const cellPositionsRef = useRef<{
    rowMap: Map<string, number>,
    columnMap: Map<string, number>
  }>({
    rowMap: new Map(),
    columnMap: new Map()
  });

  // Cache for sorted row and column IDs
  const sortedIdsRef = useRef<{
    rows: string[],
    columns: string[]
  }>({
    rows: [],
    columns: []
  });

  /**
   * Initialize or update the map of editable cells
   * Optimized to reuse existing maps when possible to reduce GC pressure
   */
  const initializeEditableCells = useCallback((
    rows: { id: string, index: number }[],
    columns: { id: string, index: number }[],
    editableColumnIds: string[]
  ) => {
    // Only create new maps if they don't exist or if size differences are substantial
    const rowMapNeedsReset = !cellPositionsRef.current.rowMap.size ||
      Math.abs(cellPositionsRef.current.rowMap.size - rows.length) > rows.length * 0.1;

    const columnMapNeedsReset = !cellPositionsRef.current.columnMap.size ||
      Math.abs(cellPositionsRef.current.columnMap.size - editableColumnIds.length) > editableColumnIds.length * 0.1;

    // Reuse existing maps when possible
    const rowMap = rowMapNeedsReset ? new Map<string, number>() : cellPositionsRef.current.rowMap;
    const columnMap = columnMapNeedsReset ? new Map<string, number>() : cellPositionsRef.current.columnMap;
    const newMap = editableCellsRef.current.size === 0 ? new Map() : editableCellsRef.current;

    // Clear the maps if we're reusing them
    if (!rowMapNeedsReset) rowMap.clear();
    if (!columnMapNeedsReset) columnMap.clear();
    newMap.clear();

    // Prepare sorted IDs for navigation
    const editableColumns = columns.filter(c => editableColumnIds.includes(c.id));
    sortedIdsRef.current = {
      rows: rows.map(r => r.id),
      columns: editableColumns.map(c => c.id)
    };

    // Build index maps for quick lookup
    rows.forEach(row => {
      rowMap.set(row.id, row.index);
    });

    editableColumns.forEach(col => {
      columnMap.set(col.id, col.index);
    });

    // Store in refs
    cellPositionsRef.current = { rowMap, columnMap };

    // Create cell position entries for each editable cell more efficiently
    // Use a single loop with a for-of to avoid nested forEach which creates extra closures
    for (const row of rows) {
      for (const colId of editableColumnIds) {
        const cellKey = `${row.id}_${colId}`;
        const columnIndex = columnMap.get(colId) || 0;

        newMap.set(cellKey, {
          rowId: row.id,
          columnId: colId,
          rowIndex: row.index,
          columnIndex
        });
      }
    }

    editableCellsRef.current = newMap;
  }, []);

  // Check if a specific cell is currently being edited
  const isEditing = useCallback(
    (rowId: string, columnId: string) => {
      return editingCell === `${rowId}_${columnId}`;
    },
    [editingCell]
  );

  // Check if a specific cell is currently selected
  const isSelected = useCallback(
    (rowId: string, columnId: string) => {
      return selectedCell === `${rowId}_${columnId}`;
    },
    [selectedCell]
  );

  // Get current selected cell position
  const getSelectedPosition = useCallback((): CellPosition | null => {
    if (!selectedCell) return null;
    return editableCellsRef.current.get(selectedCell) || null;
  }, [selectedCell]);

  // Select a specific cell
  const selectCell = useCallback((rowId: string, columnId: string) => {
    setSelectedCell(`${rowId}_${columnId}`);
    setEditingCell(null); // Ensure we're not in edit mode
  }, []);

  // Start editing a specific cell
  const startEditing = useCallback((rowId: string, columnId: string) => {
    setEditingCell(`${rowId}_${columnId}`);
    setSelectedCell(`${rowId}_${columnId}`); // Also select the cell
  }, []);

  // Cancel editing and selection without saving
  const cancelEditing = useCallback(() => {
    setEditingCell(null);
    setSelectedCell(null);
    // No need to set selectedPosition as it's derived from selectedCell
  }, []);

  // Save the edit and call the provided callback
  const saveEdit = useCallback(
    (rowData: TData, columnId: string, newValue: any) => {
      if (onCellEdit) {
        onCellEdit(rowData, columnId, newValue);
      } else {
        console.log("Cell edited:", { rowData, columnId, newValue });
      }
      setEditingCell(null);
      // Keep cell selected after saving
      const currentRowId = selectedCell?.split('_')[0];
      if (currentRowId) {
        setSelectedCell(`${currentRowId}_${columnId}`);
      }
    },
    [onCellEdit, selectedCell]
  );

  // Select the first editable cell in the table
  const selectFirstCell = useCallback(() => {
    const rows = sortedIdsRef.current.rows;
    const columns = sortedIdsRef.current.columns;

    if (rows.length > 0 && columns.length > 0) {
      const firstRowId = rows[0];
      const firstColumnId = columns[0];
      selectCell(firstRowId, firstColumnId);
      return true;
    }
    return false;
  }, [selectCell]);

  /**
   * Navigate between cells with improved error handling and validation
   * @param direction Direction to navigate: up, down, left, right
   * @returns true if navigation succeeded, false otherwise
   */
  const navigateToCell = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    try {
      // Get current position or select first cell if none is selected
      const currentPos = getSelectedPosition();
      if (!currentPos) {
        return selectFirstCell();
      }

      // Verify we have actual row and column data to work with
      const rows = sortedIdsRef.current.rows;
      const columns = sortedIdsRef.current.columns;

      if (!rows.length || !columns.length) {
        console.warn('No rows or columns available for navigation');
        return false;
      }

      const { rowIndex, columnIndex } = currentPos;

      let nextRowIndex = rowIndex;
      let nextColumnIndex = columnIndex;

      // Safely get current column index with fallback
      const currentColumnIndex = columns.findIndex(id => id === currentPos.columnId);
      // Use a valid index even if column not found
      const safeCurrentColumnIndex = currentColumnIndex >= 0 ? currentColumnIndex : 0;

      switch (direction) {
        case 'up':
          nextRowIndex = Math.max(0, rowIndex - 1);
          // Maintain the same column when moving up
          nextColumnIndex = safeCurrentColumnIndex;
          break;
        case 'down':
          nextRowIndex = Math.min(rows.length - 1, rowIndex + 1);
          // Maintain the same column when moving down
          nextColumnIndex = safeCurrentColumnIndex;
          break;
        case 'left':
          // Find the previous editable column
          nextColumnIndex = safeCurrentColumnIndex - 1;
          if (nextColumnIndex < 0) {
            // If we're at the leftmost column, go to the end of the previous row
            if (rowIndex > 0) {
              nextRowIndex = rowIndex - 1;
              nextColumnIndex = columns.length - 1;
            } else {
              nextColumnIndex = 0; // Stay in the current cell
            }
          }
          break;
        case 'right':
          // Find the next editable column
          nextColumnIndex = safeCurrentColumnIndex + 1;
          if (nextColumnIndex >= columns.length) {
            // If we're at the rightmost column, go to the start of the next row
            if (rowIndex < rows.length - 1) {
              nextRowIndex = rowIndex + 1;
              nextColumnIndex = 0;
            } else {
              nextColumnIndex = columns.length - 1; // Stay in the current cell
            }
          }
          break;
      }

      // Ensure indexes are within bounds
      nextRowIndex = Math.max(0, Math.min(rows.length - 1, nextRowIndex));
      nextColumnIndex = Math.max(0, Math.min(columns.length - 1, nextColumnIndex));

      // Get new row and column IDs with null checks
      const nextRowId = rows[nextRowIndex];
      const nextColumnId = columns[nextColumnIndex];

      if (nextRowId && nextColumnId) {
        selectCell(nextRowId, nextColumnId);
        return true;
      } else {
        console.warn('Invalid cell target for navigation', { nextRowIndex, nextColumnIndex });
        return false;
      }
    } catch (error) {
      console.error('Error during cell navigation:', error);
      return false;
    }
  }, [getSelectedPosition, selectCell, selectFirstCell]);

  /**
   * Handle keyboard navigation with improved null checks and error handling
   */
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't handle events when editing
    if (editingCell) return;

    // Only handle events when a cell is selected or when Tab is pressed
    if (!selectedCell && e.key !== 'Tab') return;

    try {
      switch (e.key) {
        case 'Tab':
          e.preventDefault(); // Always prevent default Tab behavior
          if (!selectedCell) {
            // If no cell is selected, select the first one
            selectFirstCell();
          } else {
            // If a cell is already selected, move to the next cell based on tab direction
            // Shift+Tab moves backwards, regular Tab moves forwards
            if (e.shiftKey) {
              navigateToCell('left');
            } else {
              navigateToCell('right');
            }
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          navigateToCell('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          navigateToCell('down');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          navigateToCell('left');
          break;
        case 'ArrowRight':
          e.preventDefault();
          navigateToCell('right');
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedCell && !editingCell) {
            const parts = selectedCell.split('_');
            if (parts.length === 2) {
              const [rowId, columnId] = parts;
              if (rowId && columnId) {
                startEditing(rowId, columnId);
              }
            }
          }
          break;
        case 'Escape':
          e.preventDefault();
          cancelEditing();
          break;
      }
    } catch (error) {
      // Handle potential errors during keyboard navigation
      console.error('Error in keyboard navigation:', error);
      // Ensure we don't leave the user in an inconsistent state
      cancelEditing();
    }
  }, [editingCell, selectedCell, cancelEditing, navigateToCell, selectFirstCell, startEditing]);

  // Setup event listeners for keyboard navigation
  useEffect(() => {
    // Only add global keydown listener if built-in handlers are enabled
    if (disableBuiltInHandlers) return;
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, disableBuiltInHandlers]);

  return {
    isEditing,
    isSelected,
    selectCell,
    startEditing,
    cancelEditing,
    saveEdit,
    initializeEditableCells,
    navigateToCell,
    selectFirstCell,
  };
}
