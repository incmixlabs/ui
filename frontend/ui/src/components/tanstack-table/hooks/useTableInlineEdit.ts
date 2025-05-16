"use client";

import { useState, useCallback, useRef, useEffect } from "react";

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
}: {
  onCellEdit?: (rowData: TData, columnId: string, newValue: any) => void;
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

  // Initialize or update the map of editable cells
  const initializeEditableCells = useCallback((
    rows: { id: string, index: number }[],
    columns: { id: string, index: number }[],
    editableColumnIds: string[]
  ) => {
    const newMap: EditableCellMap = new Map();
    const rowMap = new Map<string, number>();
    const columnMap = new Map<string, number>();
    
    // Clear and rebuild the maps
    sortedIdsRef.current = {
      rows: rows.map(r => r.id),
      columns: columns.filter(c => editableColumnIds.includes(c.id)).map(c => c.id)
    };
    
    // Build index maps for quick lookup
    rows.forEach(row => {
      rowMap.set(row.id, row.index);
    });
    
    columns.forEach(col => {
      if (editableColumnIds.includes(col.id)) {
        columnMap.set(col.id, col.index);
      }
    });
    
    // Store in refs
    cellPositionsRef.current = { rowMap, columnMap };
    
    // Create cell position entries for each editable cell
    rows.forEach(row => {
      editableColumnIds.forEach(colId => {
        const cellKey = `${row.id}_${colId}`;
        const columnIndex = columnMap.get(colId) || 0;
        
        newMap.set(cellKey, {
          rowId: row.id,
          columnId: colId,
          rowIndex: row.index,
          columnIndex
        });
      });
    });
    
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

  // Navigate between cells
  const navigateToCell = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    const currentPos = getSelectedPosition();
    if (!currentPos) {
      return selectFirstCell();
    }
    
    const { rowIndex, columnIndex } = currentPos;
    const rows = sortedIdsRef.current.rows;
    const columns = sortedIdsRef.current.columns;
    
    let nextRowIndex = rowIndex;
    let nextColumnIndex = columnIndex;
    
    // Get current column index to properly maintain column position when moving vertically
    const currentColumnIndex = columns.findIndex(id => id === currentPos.columnId);
    
    switch (direction) {
      case 'up':
        nextRowIndex = Math.max(0, rowIndex - 1);
        // Maintain the same column when moving up
        nextColumnIndex = currentColumnIndex;
        break;
      case 'down':
        nextRowIndex = Math.min(rows.length - 1, rowIndex + 1);
        // Maintain the same column when moving down
        nextColumnIndex = currentColumnIndex; 
        break;
      case 'left':
        // Find the previous editable column
        nextColumnIndex = currentColumnIndex - 1;
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
        nextColumnIndex = currentColumnIndex + 1;
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
    
    // Get new row and column IDs
    const nextRowId = rows[nextRowIndex];
    const nextColumnId = columns[nextColumnIndex >= 0 && nextColumnIndex < columns.length ? nextColumnIndex : 0];
    
    if (nextRowId && nextColumnId) {
      selectCell(nextRowId, nextColumnId);
      return true;
    }
    
    return false;
  }, [getSelectedPosition, selectCell, selectFirstCell]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't handle events when editing
    if (editingCell) return;
    
    // Only handle events when a cell is selected or when Tab is pressed
    if (!selectedCell && e.key !== 'Tab') return;
    
    switch (e.key) {
      case 'Tab':
        if (!selectedCell) {
          e.preventDefault();
          selectFirstCell();
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
          const [rowId, columnId] = selectedCell.split('_');
          startEditing(rowId, columnId);
        }
        break;
      case 'Escape':
        e.preventDefault();
        cancelEditing();
        break;
    }
  }, [editingCell, selectedCell, cancelEditing, navigateToCell, selectFirstCell, startEditing]);

  // Setup event listeners for keyboard navigation
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

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
