"use client"

import { Box, Input } from "@/src/1base"
import { cn } from "@/utils/cn"
import { useEffect, useRef, useState } from "react"
import { useEditableCellKeyboard } from "../hooks/useEditableCellKeyboard"

interface EditableCellProps {
  value: string
  rowData: any
  columnId: string
  onSave: (rowData: any, columnId: string, newValue: string) => void
  isEditing: boolean
  isSelected: boolean
  onSelect: () => void
  onStartEdit: () => void
  onCancelEdit: () => void
  className?: string
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
  const [editValue, setEditValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)
  const divRef = useRef<HTMLDivElement>(null)

  // Reset edit value when the displayed value changes or editing starts
  useEffect(() => {
    setEditValue(value)
  }, [value, isEditing])

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      // Select all text for easier replacement
      inputRef.current.select()
    }
  }, [isEditing])

  // Handle value save
  const handleSave = () => {
    if (editValue !== value) {
      onSave(rowData, columnId, editValue)
    } else {
      onCancelEdit()
    }
  }

  // Get handlers and refs from the keyboard hook
  const { handleKeyDown, handleCellClick, cellRef, getAriaAttributes } =
    useEditableCellKeyboard({
      // Generate a unique rowId even if rowData.id is falsy by using columnId as part of the fallback
      // This ensures we don't have duplicate keys in the keyboard navigation map
      rowId:
        rowData.id ??
        `row-${columnId}-${rowData.__index ?? Math.random().toString(36).substring(2, 9)}`,
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

  const handleBlur = () => {
    // Save on blur if the value has changed
    handleSave()
  }

  // Simple click handler that just calls the hook's handler
  const handleClick = (e: React.MouseEvent) => {
    handleCellClick(e)
  }

  // Handle document-wide click to deselect
  useEffect(() => {
    if (!isSelected) return

    const handleOutsideClick = (e: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(e.target as Node)) {
        onCancelEdit() // This also cancels selection
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [isSelected, onCancelEdit])

  if (isEditing) {
    return (
      <Box className="absolute inset-0 z-10 flex items-center justify-start px-1">
        <Input
          ref={(el) => {
            // Connect both refs to the input element
            inputRef.current = el
            cellRef.current = el
          }}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="h-6 w-full"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Edit ${columnId}`}
          size={1}
        />
      </Box>
    )
  }

  return (
    <Box
      ref={(el) => {
        // Connect both refs to the box element
        divRef.current = el
        cellRef.current = el
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        className,
        "h-full w-full cursor-pointer px-1 py-1.5 transition-colors",
        isSelected && "bg-blue-2 outline-none dark:bg-blue-3"
      )}
      {...ariaAttributes}
      aria-label={`${columnId}: ${value || "Empty"}`}
    >
      {value}
    </Box>
  )
}
