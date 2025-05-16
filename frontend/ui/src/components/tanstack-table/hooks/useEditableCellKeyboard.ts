"use client";

import { useCallback, useRef, useEffect, KeyboardEvent, MouseEvent } from "react";

interface EditableCellKeyboardProps {
  rowId: string;
  columnId: string;
  isEditing?: boolean;
  isSelected?: boolean;
  selectCell?: (rowId: string, columnId: string) => void;
  startEditing?: () => void;
  cancelEditing?: () => void;
  saveEdit?: () => void;
  autoFocus?: boolean; // Optional prop to auto-focus the cell when selected
}

/**
 * Custom hook to handle keyboard events for editable cells
 * Provides consistent handling across different editable cell types
 * with improved accessibility and focus management
 */
export function useEditableCellKeyboard({
  rowId,
  columnId,
  isEditing = false,
  isSelected = false,
  selectCell,
  startEditing,
  cancelEditing,
  saveEdit,
  autoFocus = true, // Default to auto-focus when selected
}: EditableCellKeyboardProps) {
  // Reference to the input/cell element
  const cellRef = useRef<HTMLInputElement | HTMLSelectElement | HTMLDivElement | null>(null);

  // Focus management - auto-focus when selected if autoFocus is true
  useEffect(() => {
    if (isSelected && autoFocus && cellRef.current && !isEditing) {
      // Short timeout to ensure DOM is ready
      const timeoutId = setTimeout(() => {
        if (cellRef.current) {
          cellRef.current.focus();
        }
      }, 10);

      return () => clearTimeout(timeoutId);
    }
  }, [isSelected, autoFocus, isEditing]);

  // Auto-focus when editing starts
  useEffect(() => {
    if (isEditing && cellRef.current) {
      cellRef.current.focus();

      // For input elements, try to position cursor at the end
      if (cellRef.current instanceof HTMLInputElement) {
        const length = cellRef.current.value.length;
        cellRef.current.setSelectionRange(length, length);
      }
    }
  }, [isEditing]);

  // Handle key down events with improved keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isEditing) {
        // When in edit mode
        switch (e.key) {
          case "Escape":
            if (cancelEditing) {
              cancelEditing();
              e.preventDefault();
            }
            break;
          case "Enter":
            if (saveEdit) {
              saveEdit();
              e.preventDefault();
            }
            break;
          // Let Tab work normally for keyboard navigation
        }
      } else if (isSelected) {
        // When selected but not in edit mode
        switch (e.key) {
          case "Enter":
          case " ": // Space
            if (startEditing) {
              startEditing();
              e.preventDefault();
            }
            break;
        }
      }
    },
    [isEditing, isSelected, startEditing, cancelEditing, saveEdit]
  );

  // Handle cell click - used for selection
  const handleCellClick = useCallback(
    (e: MouseEvent) => {
      if (selectCell) {
        selectCell(rowId, columnId);
        
        // Double-click to start editing
        if (e.detail === 2 && startEditing && !isEditing) {
          startEditing();
        }
      }
      e.stopPropagation(); // Prevent row click event from firing
    },
    [selectCell, rowId, columnId, startEditing, isEditing]
  );

  // Generate ARIA attributes for accessibility
  const getAriaAttributes = useCallback(() => {
    return {
      role: "gridcell",
      tabIndex: isSelected ? 0 : -1,
      "aria-selected": isSelected,
      "aria-readonly": !isEditing,
    };
  }, [isSelected, isEditing]);

  return {
    handleKeyDown,
    handleCellClick,
    cellRef,
    getAriaAttributes,
  };
}
