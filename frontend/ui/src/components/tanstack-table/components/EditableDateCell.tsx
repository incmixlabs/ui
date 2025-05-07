"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "../../../utils";
import { format, parse } from "date-fns";

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
 * First click selects the cell, second click opens the date picker
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

  // Parse the date value - ensure it's a valid date
  const dateValue = value && !isNaN(new Date(value).getTime()) ? new Date(value) : undefined;

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

  const handleDateChange = (date?: Date) => {
    if (date) {
      onSave(rowData, columnId, date.toISOString());
    }
  };

  if (isEditing) {
    return (
      <div className="w-full h-full flex items-center p-1"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="date"
          value={dateValue ? dateValue.toISOString().split('T')[0] : ''}
          onChange={(e) => {
            if (e.target.value) {
              const newDate = new Date(e.target.value + 'T00:00:00');
              handleDateChange(newDate);
            }
          }}
          className="w-full h-8 px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-sm"
        />
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
      {formattedDate || value || "—"}
    </div>
  );
};
