"use client";

import { useState, useCallback, useEffect, RefObject } from "react";

interface CellPosition {
  rowIndex: number;
  colIndex: number;
}

/**
 * Hook to manage inline cell editing state and functionality
 * with keyboard navigation support similar to Excel
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

  // Track the position of the selected cell for keyboard navigation
  const [selectedPosition, setSelectedPosition] = useState<CellPosition | null>(null);

  // Matrix of visible row and column IDs for navigation
  const [cellMatrix, setCellMatrix] = useState<{
    rowIds: string[],
    colIds: string[]
  }>({ rowIds: [], colIds: [] });

  // Update the cell matrix based on table data and visible columns
  const updateCellMatrix = useCallback((rowIds: string[], colIds: string[]) => {
    setCellMatrix({ rowIds, colIds });
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

  // Select a specific cell
  const selectCell = useCallback((rowId: string, columnId: string) => {
    setSelectedCell(`${rowId}_${columnId}`);

    // Find the position indices for keyboard navigation
    const rowIndex = cellMatrix.rowIds.indexOf(rowId);
    const colIndex = cellMatrix.colIds.indexOf(columnId);

    if (rowIndex !== -1 && colIndex !== -1) {
      setSelectedPosition({ rowIndex, colIndex });
    }
  }, [cellMatrix]);

  // Navigate to a specific cell by position indices
  const navigateToCell = useCallback((rowIndex: number, colIndex: number) => {
    // Safety check: if either dimension is empty, navigation is not possible
    if (cellMatrix.rowIds.length === 0 || cellMatrix.colIds.length === 0) {
      return false;
    }
    
    // Ensure indexes are within bounds
    if (
      rowIndex >= 0 && 
      rowIndex < cellMatrix.rowIds.length && 
      colIndex >= 0 && 
      colIndex < cellMatrix.colIds.length
    ) {
      const rowId = cellMatrix.rowIds[rowIndex];
      const colId = cellMatrix.colIds[colIndex];
      
      selectCell(rowId, colId);
      return true;
    }
    return false;
  }, [cellMatrix, selectCell]);

  // Navigation methods
  const navigateLeft = useCallback(() => {
    if (selectedPosition) {
      return navigateToCell(selectedPosition.rowIndex, selectedPosition.colIndex - 1);
    }
    return false;
  }, [selectedPosition, navigateToCell]);

  const navigateRight = useCallback(() => {
    if (selectedPosition) {
      return navigateToCell(selectedPosition.rowIndex, selectedPosition.colIndex + 1);
    }
    return false;
  }, [selectedPosition, navigateToCell]);

  const navigateUp = useCallback(() => {
    if (selectedPosition) {
      return navigateToCell(selectedPosition.rowIndex - 1, selectedPosition.colIndex);
    }
    return false;
  }, [selectedPosition, navigateToCell]);

  const navigateDown = useCallback(() => {
    if (selectedPosition) {
      return navigateToCell(selectedPosition.rowIndex + 1, selectedPosition.colIndex);
    }
    return false;
  }, [selectedPosition, navigateToCell]);

  // Start editing a specific cell
  const startEditing = useCallback((rowId: string, columnId: string) => {
    setEditingCell(`${rowId}_${columnId}`);
  }, []);

  // Cancel editing and selection without saving
  const cancelEditing = useCallback(() => {
    setEditingCell(null);
    setSelectedCell(null);
    setSelectedPosition(null);
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
    },
    [onCellEdit]
  );

  // Attach keyboard event handlers to the table
  useEffect(() => {
    const tableElement = tableRef?.current;
    if (!tableElement || disableBuiltInHandlers) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only process if we have a selected cell and not in an input/editing mode
      if (!selectedPosition || editingCell) return;

      // Get the currently selected row and column ID
      const rowId = cellMatrix.rowIds[selectedPosition.rowIndex];
      const colId = cellMatrix.colIds[selectedPosition.colIndex];

      // Safety check: if there are no rows or columns, don't attempt navigation
      if (cellMatrix.rowIds.length === 0 || cellMatrix.colIds.length === 0) {
        return;
      }
      
      switch (e.key) {
        case 'ArrowLeft':
          if (navigateLeft()) e.preventDefault();
          break;
        case 'ArrowRight':
          if (navigateRight()) e.preventDefault();
          break;
        case 'ArrowUp':
          if (navigateUp()) e.preventDefault();
          break;
        case 'ArrowDown':
          if (navigateDown()) e.preventDefault();
          break;
        case 'Tab':
          e.preventDefault();
          if (e.shiftKey) {
            if (!navigateLeft()) {
              // If can't go left, wrap to previous row's last column
              if (selectedPosition.rowIndex > 0) {
                navigateToCell(selectedPosition.rowIndex - 1, cellMatrix.colIds.length - 1);
              }
            }
          } else {
            if (!navigateRight()) {
              // If can't go right, wrap to next row's first column
              if (selectedPosition.rowIndex < cellMatrix.rowIds.length - 1) {
                navigateToCell(selectedPosition.rowIndex + 1, 0);
              }
            }
          }
          break;
        case 'Enter':
          // Start editing the selected cell
          startEditing(rowId, colId);
          e.preventDefault();
          break;
        case 'Escape':
          // Cancel selection
          cancelEditing();
          e.preventDefault();
          break;
      }
    };

    tableElement.addEventListener('keydown', handleKeyDown);
    return () => {
      tableElement?.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    tableRef, selectedPosition, editingCell, cellMatrix,
    navigateLeft, navigateRight, navigateUp, navigateDown,
    navigateToCell, startEditing, cancelEditing
  ]);

  return {
    isEditing,
    isSelected,
    selectCell,
    startEditing,
    cancelEditing,
    saveEdit,
    navigateLeft,
    navigateRight,
    navigateUp,
    navigateDown,
    updateCellMatrix,
  };
}
