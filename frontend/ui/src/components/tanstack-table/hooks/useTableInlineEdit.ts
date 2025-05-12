"use client";

import { useState, useCallback } from "react";

/**
 * Hook to manage inline cell editing state and functionality
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
  }, []);

  // Start editing a specific cell
  const startEditing = useCallback((rowId: string, columnId: string) => {
    setEditingCell(`${rowId}_${columnId}`);
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
      setSelectedCell(null);
    },
    [onCellEdit]
  );

  return {
    isEditing,
    isSelected,
    selectCell,
    startEditing,
    cancelEditing,
    saveEdit,
  };
}
