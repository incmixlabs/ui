"use client"

import React, { useState, useEffect, useRef } from "react"
import { DropdownOption, getContrastingTextColor, adjustColor } from "../cell-renderers"

interface DropdownCellEditorProps {
  value: string
  options: DropdownOption[]
  onSave: (newValue: string) => void
  onCancel: () => void
  strictDropdown?: boolean // Controls whether only predefined values can be selected
}

/**
 * Dropdown Cell Editor - displays a dropdown menu for selecting options
 * Optimized for cell editing within a data table
 */
export const DropdownCellEditor: React.FC<DropdownCellEditorProps> = ({
  value,
  options,
  onSave,
  onCancel,
  strictDropdown = true // Default to strict mode if not specified
}) => {
  // Debug log to check if strictDropdown is passed correctly
  console.log('DropdownCellEditor strictDropdown:', strictDropdown);
  const [isOpen, setIsOpen] = useState(true)
  const [customValue, setCustomValue] = useState(value)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Get position of the cell that was clicked to position dropdown properly
  useEffect(() => {
    // Function to find the cell element that was clicked
    const findEditingCell = () => {
      // Look for cell with data-editing="true" or similar attribute
      // In this case, we'll position near the active cell that has focus
      const activeElement = document.activeElement;
      
      if (activeElement && dropdownRef.current) {
        // Find closest table cell
        const cell = activeElement.closest('td') || activeElement;
        
        // Get position
        if (cell) {
          const cellRect = cell.getBoundingClientRect();
          const dropdown = dropdownRef.current;
          
          // Position dropdown near the cell
          dropdown.style.top = `${cellRect.bottom + window.scrollY + 5}px`;
          dropdown.style.left = `${cellRect.left + window.scrollX}px`;
          
          // Make sure dropdown is within viewport bounds
          const dropdownRect = dropdown.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const viewportWidth = window.innerWidth;
          
          // Adjust if extends beyond bottom
          if (dropdownRect.bottom > viewportHeight) {
            dropdown.style.top = `${cellRect.top + window.scrollY - dropdownRect.height - 5}px`;
          }
          
          // Adjust if extends beyond right edge
          if (dropdownRect.right > viewportWidth) {
            dropdown.style.left = `${viewportWidth - dropdownRect.width - 10}px`;
          }
        }
      }
    };
    
    // Run positioning logic after a brief delay to ensure the DOM is ready
    setTimeout(findEditingCell, 10);
    
    // Focus the input field if in custom mode
    if (!strictDropdown && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [])
  
  // Verify options are valid
  const validOptions = Array.isArray(options) ? options : [];
  
  // Find the selected option
  const selectedOption = validOptions.find(option => option.value === value) || {
    value,
    label: value,
    color: '#e5e7eb' // Default gray color
  }

  // Handle option selection
  const handleSelect = (optionValue: string) => {
    onSave(optionValue)
    setIsOpen(false)
  }
  
  // Handle custom value input change
  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomValue(e.target.value)
  }
  
  // Handle custom value submission
  const handleCustomValueSubmit = () => {
    if (customValue.trim()) {
      // Make sure we're passing the raw custom value to be processed upstream
      const trimmedValue = customValue.trim();
      console.log('Submitting custom value:', trimmedValue);
      
      // Check if the trimmed value already exists in options to prevent duplicates
      // at the component level (additional check happens in handleCellEdit)
      const normalizedValue = trimmedValue.toLowerCase().replace(/\s+/g, '_');
      const alreadyExists = options.some(opt => 
        opt.value === trimmedValue || 
        opt.value === normalizedValue ||
        opt.label.toLowerCase() === trimmedValue.toLowerCase()
      );
      
      if (alreadyExists) {
        // If it already exists, find the exact value to use
        const existingOption = options.find(opt => 
          opt.value === trimmedValue || 
          opt.value === normalizedValue ||
          opt.label.toLowerCase() === trimmedValue.toLowerCase()
        );
        if (existingOption) {
          onSave(existingOption.value);
        } else {
          onSave(trimmedValue);
        }
      } else {
        // If it's a new value, pass it to be processed
        onSave(trimmedValue);
      }
      
      setIsOpen(false);
    }
  }
  
  // Handle enter key in custom input
  const handleCustomInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleCustomValueSubmit()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onCancel()
      setIsOpen(false)
    }
  }

  // Handle click outside to cancel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onCancel()
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onCancel])

  // Handle escape key to cancel
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel()
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onCancel])

  if (!isOpen) return null

  return (
    <div 
      ref={dropdownRef}
      className="fixed z-[9999] bg-white rounded-md shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
      style={{ 
        minWidth: '220px',
        maxWidth: '300px',
        maxHeight: '300px',
        overflowY: 'auto',
        padding: '4px 0',
        // Fixed positioning relative to viewport
        position: 'fixed',
        // Will be positioned by useEffect
        top: '0px', 
        left: '0px',
      }}
    >
      {/* Custom value input when strictDropdown is false */}
      {!strictDropdown && (
        <div className="px-4 py-2 border-b border-gray-100">
          <div className="flex">
            <input
              ref={inputRef}
              type="text"
              value={customValue}
              onChange={handleCustomInputChange}
              onKeyDown={handleCustomInputKeyDown}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter custom value..."
            />
            <button 
              onClick={handleCustomValueSubmit}
              className="px-2 py-1 text-sm text-white bg-blue-500 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              Add
            </button>
          </div>
          {validOptions.length > 0 && (
            <div className="mt-2 text-xs text-gray-500">Or select from options below:</div>
          )}
        </div>
      )}
      
      {/* Dropdown options list */}
      {validOptions.length === 0 ? (
        <div className="px-4 py-2 text-sm text-gray-500">No options available</div>
      ) : (
        validOptions.map((option) => {
          const isSelected = option.value === value;
          
          return (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`
                px-4 py-2 text-sm cursor-pointer
                ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}
              `}
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0" 
                  style={{ 
                    backgroundColor: option.color || '#e5e7eb',
                    border: `1px solid ${option.color ? adjustColor(option.color, -20) : '#d1d5db'}`
                  }}
                />
                <span className="flex-grow">{option.label || option.value}</span>
              </div>
            </div>
          );
        })
      )}
    </div>
  )
}

export default DropdownCellEditor
