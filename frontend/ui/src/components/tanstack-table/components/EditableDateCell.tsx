"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "../../../utils";
import { useEditableCellKeyboard } from "../hooks/useEditableCellKeyboard";

interface EditableDateCellProps {
  value: string;
  rowData: any;
  columnId: string;
  onSave: (rowData: any, columnId: string, newValue: string) => void;
  isEditing: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  className?: string;
  dateFormat?: string;
}

/**
 * Editable date cell component that supports inline date editing
 * with keyboard navigation support
 */
export const EditableDateCell: React.FC<EditableDateCellProps> = ({
  value,
  rowData,
  columnId,
  onSave,
  isEditing,
  isSelected,
  onSelect,
  onStartEdit,
  onCancelEdit,
  className = "",
  dateFormat,
}) => {
  const cellRef = useRef<HTMLDivElement>(null);
  
  // State to track the current date value being edited
  const [editDateValue, setEditDateValue] = useState<string>('');
  
  // Parse the date value - ensure it's a valid date
  const dateValue = value && !isNaN(new Date(value).getTime()) ? new Date(value) : undefined;
  
  // When editing starts, set the current edit value
  useEffect(() => {
    if (isEditing && dateValue) {
      setEditDateValue(dateValue.toISOString().split('T')[0]);
    }
  }, [isEditing, dateValue]);

  // Format date for display
  const formattedDate = dateValue ?
    dateValue.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      ...(dateFormat?.includes("HH:mm") ? {
        hour: "numeric",
        minute: "numeric",
        hour12: true
      } : {})
    }) : "";
    
  // Handle saving the date value
  const handleDateSave = (newDateStr: string) => {
    if (newDateStr) {
      const newDate = new Date(`${newDateStr}T00:00:00`);
      if (!isNaN(newDate.getTime())) {
        onSave(rowData, columnId, newDate.toISOString());
      }
    }
  };
  
  // Handle saving the date
  const handleSave = () => {
    if (editDateValue) {
      handleDateSave(editDateValue);
    } else {
      onCancelEdit();
    }
  };

  // Use our enhanced keyboard handler hook
  const { handleKeyDown, handleCellClick, cellRef: keyboardCellRef, getAriaAttributes } = useEditableCellKeyboard({
    rowId: rowData.id || 'row', // Use rowData.id or fallback
    columnId,
    isEditing,
    isSelected,
    selectCell: () => onSelect(),
    startEditing: () => onStartEdit(),
    cancelEditing: () => onCancelEdit(),
    saveEdit: () => handleSave(),
    autoFocus: true,
  });
  
  // Get accessibility attributes
  const ariaAttributes = getAriaAttributes();

  // Handle document-wide click to deselect
  useEffect(() => {
    if (!isSelected) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (cellRef.current && !cellRef.current.contains(e.target as Node)) {
        onCancelEdit(); // This also cancels selection
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isSelected, onCancelEdit]);

  if (isEditing) {
    return (
      <div 
        className="w-full h-full flex items-center p-1"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={(el) => {
            // Connect keyboard hook's ref to the input element
            if (keyboardCellRef) keyboardCellRef.current = el;
          }}
          type="date"
          value={editDateValue}
          onChange={(e) => setEditDateValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-8 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          autoFocus
          aria-label={`Edit ${columnId} date value`}
        />
      </div>
    );
  }

  return (
    <div
      ref={(el) => {
        // Connect both refs to ensure proper functionality
        cellRef.current = el;
        if (keyboardCellRef) keyboardCellRef.current = el;
      }}
      onClick={handleCellClick}
      onKeyDown={handleKeyDown}
      className={cn(
        className,
        "cursor-pointer w-full h-full p-1 transition-colors duration-150",
        isSelected && "bg-blue-100 dark:bg-blue-900/30 rounded"
      )}
      {...ariaAttributes}
      aria-label={`${columnId} date: ${formattedDate || 'Not set'}`}
    >
      {formattedDate || value || "—"}
    </div>
  );
};
