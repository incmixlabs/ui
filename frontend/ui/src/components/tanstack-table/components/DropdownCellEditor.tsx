"use client"

import React, { useState, useEffect, useRef } from "react"
import { DropdownOption, getContrastingTextColor, adjustColor } from "../cell-renderers"

interface DropdownCellEditorProps {
  value: string
  options: DropdownOption[]
  onSave: (newValue: string) => void
  onCancel: () => void
  strictDropdown?: boolean // Controls whether only predefined values can be selected
  // Enhanced features
  enableColorPicker?: boolean
  enableIcons?: boolean
  showCreateButton?: boolean
  createButtonText?: string
  onCreateOption?: (name: string, color?: string) => Promise<string>
  onUpdateOption?: (id: string, updates: { name?: string; color?: string }) => Promise<void>
  onDeleteOption?: (id: string) => Promise<void>
  isLoading?: boolean
  loadingText?: string
  errorMessage?: string
  displayStyle?: 'badge' | 'button' | 'minimal'
  size?: 'sm' | 'md' | 'lg'
  rowData?: any // For context in callbacks
}

// Color picker component for inline option creation
interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  size?: 'sm' | 'md';
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange, size = 'md' }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // Color palette for option creation
  const colorPalette = [
    '#93c5fd', '#fcd34d', '#86efac', '#f9a8d4', '#c4b5fd', '#a5b4fc',
    '#fdba74', '#67e8f9', '#d8b4fe', '#f87171', '#fde68a', '#6ee7b7'
  ];

  const handleColorSelect = (selectedColor: string) => {
    onChange(selectedColor);
    setShowPicker(false);
  };

  // Position popup relative to button
  useEffect(() => {
    if (showPicker && buttonRef.current && popupRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      popupRef.current.style.top = `${rect.bottom + window.scrollY + 5}px`;
      popupRef.current.style.left = `${rect.left + window.scrollX - 5}px`;
    }
  }, [showPicker]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (buttonRef.current && popupRef.current) {
        if (!buttonRef.current.contains(e.target as Node) &&
          !popupRef.current.contains(e.target as Node)) {
          setShowPicker(false);
        }
      }
    };

    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutside, { capture: true });
    }

    return () => document.removeEventListener('mousedown', handleClickOutside, { capture: true });
  }, [showPicker]);

  const sizeClass = size === 'sm' ? 'w-6 h-6' : 'w-8 h-8';

  return (
    <div className="relative inline-block">
      <div
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          setShowPicker(!showPicker);
        }}
        className={`${sizeClass} border border-gray-300 rounded cursor-pointer bg-gray-200`}
        style={{ backgroundColor: color }}
      />

      {showPicker && (
        <div
          ref={popupRef}
          onClick={(e) => e.stopPropagation()}
          className="fixed top-0 left-0 p-3 bg-white rounded-xl shadow-lg border border-gray-200 z-[9999] w-[200px]"
        >
          <div className="flex gap-2.5 justify-between mb-2.5">
            {colorPalette.slice(0, 6).map((c, i) => (
              <div
                key={`color-row1-${i}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleColorSelect(c);
                }}
                onMouseEnter={() => setHoveredColor(c)}
                onMouseLeave={() => setHoveredColor(null)}
                className={`w-6 h-6 rounded-full cursor-pointer transition-transform duration-200 ease-in-out ${c === color ? 'border-2 border-black' : 'border border-gray-300'
                  } ${hoveredColor === c ? 'scale-115' : 'scale-100'}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          <div className="flex gap-2.5 justify-between">
            {colorPalette.slice(6).map((c, i) => (
              <div
                key={`color-row2-${i}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleColorSelect(c);
                }}
                onMouseEnter={() => setHoveredColor(c)}
                onMouseLeave={() => setHoveredColor(null)}
                className={`w-6 h-6 rounded-full cursor-pointer transition-transform duration-200 ease-in-out ${c === color ? 'border-2 border-black' : 'border border-gray-300'
                  } ${hoveredColor === c ? 'scale-115' : 'scale-100'}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Enhanced Dropdown Cell Editor - displays a dropdown menu for selecting options
 * Now includes color picker, loading states, and custom option creation
 */
export const DropdownCellEditor: React.FC<DropdownCellEditorProps> = ({
  value,
  options,
  onSave,
  onCancel,
  strictDropdown = true,
  // Enhanced features
  enableColorPicker = false,
  enableIcons = false,
  showCreateButton = false,
  createButtonText = "Create & Select",
  onCreateOption,
  onUpdateOption,
  onDeleteOption,
  isLoading = false,
  loadingText = "Loading...",
  errorMessage,
  displayStyle = 'badge',
  size = 'md',
  rowData
}) => {
  const [isOpen, setIsOpen] = useState(true)
  // Initialize with empty string instead of the value (which might be an ID)
  const [customValue, setCustomValue] = useState("")
  const [customColor, setCustomColor] = useState("#93c5fd")
  const [isCreating, setIsCreating] = useState(false)
  const [isPositioned, setIsPositioned] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Get position of the cell that was clicked/activated to position dropdown properly
  useEffect(() => {
    // Function to find the editing cell with better detection for keyboard navigation
    const findEditingCell = () => {
      if (!dropdownRef.current) return;
      
      // Find the active/editing cell using multiple strategies
      // 1. Try the active element itself
      // 2. Look for cells with aria-selected="true" which indicates keyboard selection
      // 3. Look for cells with custom attributes for editing state
      // 4. Fall back to active element's closest td
      
      const activeElement = document.activeElement;
      let targetCell: Element | null = null;
      
      // Strategy 1: First check for cells with aria-selected="true" (keyboard navigation)
      const selectedCells = document.querySelectorAll('td[aria-selected="true"]');
      if (selectedCells.length === 1) {
        targetCell = selectedCells[0];
      }
      
      // Strategy 2: If no selected cell found, check for cells with editing state
      if (!targetCell) {
        const editingCells = document.querySelectorAll('td[data-state="editing"]');
        if (editingCells.length === 1) {
          targetCell = editingCells[0];
        }
      }
      
      // Strategy 3: Fall back to active element's closest td
      if (!targetCell && activeElement) {
        targetCell = activeElement.closest('td');
      }
      
      // Strategy 4: Use the active element itself if nothing else worked
      if (!targetCell && activeElement) {
        targetCell = activeElement;
      }
      
      // Position the dropdown if we found a target cell
      if (targetCell) {
        const cellRect = targetCell.getBoundingClientRect();
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
        
        // Mark as positioned and make visible
        setIsPositioned(true);
      }
    };
    
    // Try positioning multiple times with delays to handle different timing scenarios
    // This ensures we catch the correct positioning even with keyboard navigation
    findEditingCell(); // Immediate attempt
    
    // Additional attempts with increasing delays to ensure we catch the position
    const timers = [
      setTimeout(findEditingCell, 10),
      setTimeout(findEditingCell, 50),
      setTimeout(findEditingCell, 100)
    ];
    
    // Focus the input field if in custom mode
    if (!strictDropdown && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
    
    return () => {
      // Clean up timers
      timers.forEach(timer => clearTimeout(timer));
    };
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
  
  // Generate unique color for new options
  const generateUniqueColor = () => {
    const existingColors = options.map(option => option.color).filter(Boolean)
    const colorPalette = [
      '#93c5fd', '#fcd34d', '#86efac', '#f9a8d4', '#c4b5fd', '#a5b4fc',
      '#fdba74', '#67e8f9', '#d8b4fe', '#f87171', '#fde68a', '#6ee7b7'
    ]

    const unusedColor = colorPalette.find(color => !existingColors.includes(color))
    return unusedColor || '#93c5fd'
  }

  // Set unique color when component mounts
  useEffect(() => {
    if (enableColorPicker) {
      setCustomColor(generateUniqueColor())
    }
  }, [enableColorPicker, options])

  // Handle custom value submission with enhanced creation
  const handleCustomValueSubmit = async () => {
    if (!customValue.trim()) return;

    const trimmedValue = customValue.trim();
    
    // Check if value already exists
    const normalizedValue = trimmedValue.toLowerCase().replace(/\s+/g, '_');
    const alreadyExists = options.some(opt => 
      opt.value === trimmedValue || 
      opt.value === normalizedValue ||
      opt.label.toLowerCase() === trimmedValue.toLowerCase()
    );
    
    if (alreadyExists) {
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
      setIsOpen(false);
      return;
    }

    // Create new option if callback is provided
    if (onCreateOption && showCreateButton) {
      setIsCreating(true);
      try {
        const newOptionId = await onCreateOption(
          trimmedValue, 
          enableColorPicker ? customColor : undefined
        );
        onSave(newOptionId);
        setCustomValue("");
        setCustomColor(generateUniqueColor());
      } catch (error) {
        console.error("Failed to create new option:", error);
        // Still save the value even if creation fails
        onSave(trimmedValue);
      } finally {
        setIsCreating(false);
      }
    } else {
      // Fallback to simple value submission
      onSave(trimmedValue);
    }
    
    setIsOpen(false);
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
      className="fixed z-[9999] bg-white dark:bg-gray-800 rounded-lg shadow-xl ring-1 ring-black dark:ring-gray-700 ring-opacity-5 focus:outline-none transition-opacity duration-150"
      style={{ 
        minWidth: '260px',
        maxWidth: '320px',
        maxHeight: '400px',
        overflowY: 'auto',
        // Fixed positioning relative to viewport
        position: 'fixed',
        // Hide until positioned, then reveal with opacity transition
        opacity: isPositioned ? 1 : 0,
        top: '0px', 
        left: '0px',
        visibility: isPositioned ? 'visible' : 'hidden'
      }}
    >
      {/* Loading state */}
      {isLoading && (
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="w-4 h-4 border border-gray-400 border-t-transparent rounded-full animate-spin" />
            {loadingText}
          </div>
        </div>
      )}

      {/* Error message */}
      {errorMessage && (
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <div className="text-sm text-red-600 dark:text-red-400">
            {errorMessage}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          Select Option
        </div>
      </div>

      {/* Custom value input when strictDropdown is false */}
      {!strictDropdown && (
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <div className="space-y-3">
            <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {showCreateButton ? "Create New Option" : "Add Custom Value"}
            </div>
            
            <div className="flex items-center gap-2">
              {/* Color picker */}
              {enableColorPicker && (
                <ColorPicker
                  color={customColor}
                  onChange={setCustomColor}
                  size="sm"
                />
              )}
              
              {/* Input field */}
              <input
                ref={inputRef}
                type="text"
                value={customValue}
                onChange={handleCustomInputChange}
                onKeyDown={handleCustomInputKeyDown}
                className="flex-1 px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Enter option name..."
                disabled={isCreating}
              />
            </div>

            {/* Create button */}
            <button 
              onClick={handleCustomValueSubmit}
              disabled={!customValue.trim() || isCreating}
              className="w-full px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isCreating ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </div>
              ) : (
                createButtonText
              )}
            </button>
          </div>
          
          {validOptions.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400">Or select from existing options:</div>
            </div>
          )}
        </div>
      )}
      
      {/* Dropdown options list */}
      <div className="max-h-48 overflow-y-auto">
        {validOptions.length === 0 ? (
          <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
            No options available
          </div>
        ) : (
          validOptions.map((option) => {
            const isSelected = option.value === value;
            
            return (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`
                  px-4 py-2.5 text-sm cursor-pointer transition-colors
                  ${isSelected 
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-r-2 border-blue-500' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  {/* Color indicator */}
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0 ring-1 ring-gray-200 dark:ring-gray-600" 
                    style={{ 
                      backgroundColor: option.color || '#e5e7eb'
                    }}
                  />
                  
                  {/* Icon if enabled */}
                  {enableIcons && option.icon && (
                    <div className="flex-shrink-0 text-gray-500">
                      {option.icon}
                    </div>
                  )}
                  
                  {/* Label */}
                  <span className="flex-grow font-medium text-gray-900 dark:text-gray-100">
                    {option.label || option.value}
                  </span>
                  
                  {/* Selected indicator */}
                  {isSelected && (
                    <div className="flex-shrink-0 text-blue-500">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  )
}

export default DropdownCellEditor
