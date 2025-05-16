"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "../../../utils";
import { X } from "lucide-react";

interface EditableTagCellProps {
  value: string[];
  rowData: any;
  columnId: string;
  onSave: (rowData: any, columnId: string, newValue: string[]) => void;
  isEditing: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  className?: string;
}

/**
 * Editable tag cell component that supports inline tag editing
 * First click selects the cell, second click opens the tag editor
 */
export const EditableTagCell: React.FC<EditableTagCellProps> = ({
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
  const [tags, setTags] = useState<string[]>(value || []);
  const [inputValue, setInputValue] = useState("");

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

  // Reset tags state when value changes
  useEffect(() => {
    setTags(value || []);
  }, [value]);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim() && !tags.includes(inputValue.trim())) {
        const newTags = [...tags, inputValue.trim()];
        setTags(newTags);
        onSave(rowData, columnId, newTags);
        setInputValue('');
      } else if (!inputValue.trim()) {
        // If input is empty and Enter is pressed, complete editing
        onSave(rowData, columnId, tags);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onCancelEdit();
    } else if (e.key === 'Tab') {
      // Allow Tab to complete editing and move to next cell
      e.preventDefault();
      onSave(rowData, columnId, tags);
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    onSave(rowData, columnId, newTags);
  };

  if (isEditing) {
    return (
      <div className="w-full h-full flex flex-col p-1"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap gap-1 mb-1">
          {tags.map(tag => (
            <div key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded text-xs">
              <span>{tag}</span>
              <button onClick={() => removeTag(tag)} className="text-blue-600 hover:text-blue-800">
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type and press Enter"
          className="w-full h-8 px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-sm"
          autoFocus
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
      <div className="flex flex-wrap gap-1">
        {tags.map(tag => (
          <span key={tag} className="px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded text-xs">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
