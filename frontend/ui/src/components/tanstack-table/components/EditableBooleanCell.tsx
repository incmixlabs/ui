"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "../../../utils";

interface EditableBooleanCellProps {
  value: boolean;
  rowData: any;
  columnId: string;
  onSave: (rowData: any, columnId: string, newValue: boolean) => void;
  isEditing: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  className?: string;
}

/**
 * Editable boolean cell component that supports inline boolean editing
 * First click selects the cell, second click opens the toggle dropdown
 */
export const EditableBooleanCell: React.FC<EditableBooleanCellProps> = ({
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
  const cellRef = useRef<HTMLDivElement>(null);
  
  // Format for display
  const formattedValue = value ? "Yes" : "No";

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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value === "true";
    onSave(rowData, columnId, newValue);
  };

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === "Escape") {
      onCancelEdit();
    } else if (e.key === "Tab") {
      // Allow Tab to complete editing and move to next cell
      e.preventDefault();
      const newValue = (e.target as HTMLSelectElement).value === "true";
      onSave(rowData, columnId, newValue);
    } else if (e.key === "Enter") {
      const newValue = (e.target as HTMLSelectElement).value === "true";
      onSave(rowData, columnId, newValue);
    }
  };

  if (isEditing) {
    return (
      <div className="w-full h-full flex items-center p-1"
        onClick={(e) => e.stopPropagation()}
      >
        <select
          value={value.toString()}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full h-8 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          autoFocus
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
    );
  }

  return (
    <div 
      ref={cellRef}
      onClick={handleClick}
      className={cn(
        className,
        "cursor-pointer w-full h-full p-1 transition-colors duration-150",
        isSelected && "bg-blue-100 dark:bg-blue-900/30 rounded"
      )}
    >
      <span className={cn(
        "px-2 py-1 rounded text-xs font-medium",
        value ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : 
          "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      )}>
        {formattedValue}
      </span>
    </div>
  );
};
