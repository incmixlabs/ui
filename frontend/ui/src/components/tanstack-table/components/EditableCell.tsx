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
 * First click selects the cell, second click enters edit mode
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
    e.stopPropagation();
    if (e.key === "Enter") {
      onSave(rowData, columnId, editValue);
    } else if (e.key === "Escape") {
      onCancelEdit();
    } else if (e.key === "Tab") {
      // Allow Tab to complete editing and move to next cell
      e.preventDefault();
      onSave(rowData, columnId, editValue);
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
      <div className="absolute inset-0 z-10 flex items-center justify-start px-1">
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="w-full border border-blue-300 dark:border-blue-600 rounded-sm px-2 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          onClick={(e) => e.stopPropagation()}
          style={{ 
            minWidth: 0, 
            maxWidth: '100%',
            height: '28px'
          }}
        />
      </div>
    );
  }

  return (
    <div 
      ref={cellRef}
      onClick={handleClick}
      className={`${className} cursor-pointer w-full h-full p-2 transition-colors duration-150 
        ${isSelected ? "bg-blue-100 dark:bg-blue-900/30 rounded" : ""}`}
    >
      {value}
    </div>
  );
};
