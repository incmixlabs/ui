"use client";

import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button, DropdownMenuWrapper } from "@base";
import { DropdownOption } from "../types";

interface EditableDropdownCellProps {
  value: string;
  onChange: (newValue: string) => void;
  dropdownOptions: DropdownOption[];
  disabled?: boolean;
}

const EditableDropdownCell: React.FC<EditableDropdownCellProps> = ({
  value,
  onChange,
  dropdownOptions,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find the selected option from the dropdown options
  const selectedOption = dropdownOptions.find(option => option.value === value) || { 
    value: value || '', 
    label: value || '',
    color: undefined,
    isUserAdded: false
  };
  
  // Get an appropriate text color based on background brightness
  const getTextColor = (bgColor: string) => {
    // Default to white text if no background color
    if (!bgColor) return '#ffffff';
    
    // Simple brightness calculation (RGB to brightness)
    const hex = bgColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    // Return black for bright backgrounds, white for dark backgrounds
    return brightness > 155 ? '#000000' : '#ffffff';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  // Handle option selection
  const handleSelectOption = (option: DropdownOption) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <Button
        variant="ghost"
        className={`w-full h-9 px-3 py-2 flex items-center justify-between text-sm rounded-md ${
          disabled ? "opacity-60 cursor-not-allowed" : ""
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <div className="flex items-center truncate">
          <span 
            className="px-2 py-1 rounded-md text-xs font-medium flex-shrink-0 truncate" 
            style={{ 
              backgroundColor: selectedOption.color || '#9ca3af',
              color: getTextColor(selectedOption.color || '#9ca3af')
            }} 
          >
            {selectedOption.label}
          </span>
        </div>
        <ChevronDown className="h-4 w-4 flex-shrink-0 opacity-50" />
      </Button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700 py-1 max-h-60 overflow-auto">
          {dropdownOptions.map((option) => (
            <button
              key={option.value}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
              onClick={() => handleSelectOption(option)}
            >
              <span 
                className="px-2 py-1 rounded-md text-xs font-medium flex-shrink-0 truncate" 
                style={{ 
                  backgroundColor: option.color || '#9ca3af',
                  color: getTextColor(option.color || '#9ca3af')
                }} 
              >
                {option.label}
              </span>
              {option.value === selectedOption.value && (
                <Check className="h-4 w-4 text-green-500 ml-2" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditableDropdownCell;
