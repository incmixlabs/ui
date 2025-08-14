"use client"

import { cn } from "@/utils/cn"
import { useEffect, useRef, useState } from "react"
import { useEditableCellKeyboard } from "../hooks/useEditableCellKeyboard"

interface EditableBooleanCellProps {
  value: boolean
  rowData: any
  columnId: string
  onSave: (rowData: any, columnId: string, newValue: boolean) => void
  isEditing: boolean
  isSelected: boolean
  onSelect: () => void
  onStartEdit: () => void
  onCancelEdit: () => void
  className?: string
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
  const cellRef = useRef<HTMLDivElement>(null)

  // Format for display
  const formattedValue = value ? "Yes" : "No"

  // Handle document-wide click to deselect
  useEffect(() => {
    if (!isSelected) return

    const handleOutsideClick = (e: MouseEvent) => {
      if (cellRef.current && !cellRef.current.contains(e.target as Node)) {
        onCancelEdit() // This also cancels selection
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [isSelected, onCancelEdit])

  // Empty placeholder for the existing handleClick function
  // We'll use handleCellClick from our hook

  // State to track the current boolean value being edited
  const [editValue, setEditValue] = useState<string>(value ? "true" : "false")

  // Update edit value when the value prop changes
  useEffect(() => {
    setEditValue(value ? "true" : "false")
  }, [value])

  // Handle save function
  const handleSave = () => {
    const boolValue = editValue === "true"
    onSave(rowData, columnId, boolValue)
  }

  // Use our enhanced keyboard handler hook
  const {
    handleKeyDown,
    handleCellClick,
    cellRef: keyboardCellRef,
    getAriaAttributes,
  } = useEditableCellKeyboard({
    rowId: rowData.id || "row", // Use rowData.id as rowId or fallback to 'row'
    columnId,
    isEditing,
    isSelected,
    selectCell: () => onSelect(),
    startEditing: () => onStartEdit(),
    cancelEditing: () => onCancelEdit(),
    saveEdit: () => handleSave(),
    autoFocus: true,
  })

  // Get accessibility attributes
  const ariaAttributes = getAriaAttributes()

  if (isEditing) {
    return (
      <div
        className="flex h-full w-full items-center p-1"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.stopPropagation()
          }
        }}
      >
        <select
          ref={(el) => {
            // Connect keyboard hook's ref to the select element
            if (keyboardCellRef) keyboardCellRef.current = el
          }}
          value={editValue}
          onChange={(e) => {
            const newValue = e.target.value === "true"
            setEditValue(e.target.value)
            onSave(rowData, columnId, newValue)
          }}
          onKeyDown={handleKeyDown}
          className="h-8 w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
          aria-label={`Edit ${columnId} value`}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
    )
  }

  return (
    <div
      ref={(el) => {
        // Connect both refs to ensure proper functionality
        cellRef.current = el
        if (keyboardCellRef) keyboardCellRef.current = el
      }}
      onClick={handleCellClick} // Simplified - our hook now handles all the logic
      onKeyDown={handleKeyDown}
      className={cn(
        className,
        "h-full w-full cursor-pointer p-1 transition-colors duration-150",
        isSelected && "rounded bg-blue-100 dark:bg-blue-900/30"
      )}
      {...ariaAttributes}
      aria-label={`${columnId}: ${formattedValue}`}
    >
      <span
        className={cn(
          "rounded px-2 py-1 font-medium text-xs",
          value
            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
        )}
      >
        {formattedValue}
      </span>
    </div>
  )
}
