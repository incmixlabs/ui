"use client"

import React, { useState, useEffect, useRef } from "react"
import { DropdownOption, getContrastingTextColor, adjustColor } from "../cell-renderers"

interface DropdownCellEditorProps {
  value: string
  options: DropdownOption[]
  onSave: (newValue: string) => void
  onCancel: () => void
}

/**
 * Dropdown Cell Editor - displays a dropdown menu for selecting options
 * Optimized for cell editing within a data table
 */
export const DropdownCellEditor: React.FC<DropdownCellEditorProps> = ({
  value,
  options,
  onSave,
  onCancel
}) => {
  const [isOpen, setIsOpen] = useState(true)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
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
  }, [])
  
  // Find the selected option
  const selectedOption = options.find(option => option.value === value) || {
    value,
    label: value,
    color: '#e5e7eb' // Default gray color
  }

  // Handle option selection
  const handleSelect = (optionValue: string) => {
    onSave(optionValue)
    setIsOpen(false)
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
        minWidth: '180px',
        maxWidth: '300px',
        maxHeight: '300px',
        overflowY: 'auto',
        filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.25))',
        // Fixed positioning relative to viewport
        position: 'fixed',
        // Start at the same position as the cell, but will be adjusted in useEffect
        top: typeof window !== 'undefined' ? window.innerHeight / 2 - 150 : 0,
        left: typeof window !== 'undefined' ? window.innerWidth / 2 - 150 : 0,
        // Add animation for smoother appearance
        animation: 'dropdownFadeIn 0.15s ease-out',
      }}
    >
      <div className="py-1">
        {options.map((option) => {
          const textColor = option.color 
            ? getContrastingTextColor(option.color)
            : '#000000'
          
          const isSelected = option.value === value
          
          return (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`
                px-4 py-2 text-sm cursor-pointer flex items-center space-x-2
                ${isSelected ? 'bg-gray-100' : 'hover:bg-gray-50'}
              `}
            >
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ 
                  backgroundColor: option.color || '#e5e7eb',
                  border: `1px solid ${option.color ? adjustColor(option.color, -20) : '#d1d5db'}`
                }}
              />
              <span
                className="rounded-full px-2 py-0.5 text-xs font-medium capitalize"
                style={{
                  backgroundColor: option.color || '#e5e7eb',
                  color: textColor,
                  border: `1px solid ${option.color ? adjustColor(option.color, -20) : '#d1d5db'}`
                }}
              >
                {option.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DropdownCellEditor
