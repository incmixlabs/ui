"use client";

import React, { useState, useRef, useEffect } from "react";

interface EditableCellProps {
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
}

/**
 * Editable cell component that switches between display, selected, and edit modes
 * Supports keyboard navigation and editing similar to Excel
 */
export const EditableCell: React.FC<EditableCellProps> = ({
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
}) => {
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const cellRef = useRef<HTMLDivElement>(null);

  // Reset edit value when the displayed value changes or editing starts
  useEffect(() => {
    setEditValue(value);
  }, [value, isEditing]);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // Select all text for easier replacement
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Always stop propagation in edit mode to prevent table navigation
    e.stopPropagation();

    if (e.key === "Enter") {
      // Save changes on Enter
      onSave(rowData, columnId, editValue);
    } else if (e.key === "Escape") {
      // Cancel edit on Escape
      onCancelEdit();
    } else if (e.key === "Tab") {
      // Save changes and let the table's keyboard handler manage navigation
      onSave(rowData, columnId, editValue);
      // Don't stopPropagation() here to allow the table handler to handle tab navigation
    }
  };

  const handleBlur = () => {
    // Save on blur if the value has changed
    if (editValue !== value) {
      onSave(rowData, columnId, editValue);
    } else {
      onCancelEdit();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isSelected) {
      // If already selected, enter edit mode
      onStartEdit();
    } else {
      // First click selects the cell
      onSelect();
    }
  };

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
      <div className="relative w-full h-full flex items-stretch">
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="absolute inset-0 w-full h-full px-2 py-1.5 border border-gray-300 dark:border-gray-700 rounded box-border flex-grow"
          onClick={(e) => e.stopPropagation()}
          style={{ minWidth: 0, lineHeight: '1.5rem' }}
        />
      </div>
    );
  }

  return (
    <div
      ref={cellRef}
      onClick={handleClick}
      className={`${className} cursor-pointer w-full h-full p-1 transition-colors duration-150
        ${isSelected ? "bg-blue-100 dark:bg-blue-900/30 rounded" : ""}`}
      // Add tabIndex to make div focusable, but only when selected
      tabIndex={isSelected ? 0 : -1}
      // This handles Tab navigation when not in edit mode but cell is selected
      onKeyDown={(e) => {
        if (isSelected && !isEditing) {
          if (e.key === "Enter") {
            e.preventDefault();
            onStartEdit();
          }
          // Let other keys (arrows, tab) propagate to the table handler
        }
      }}
    >
      {value}
    </div>
  );
};
