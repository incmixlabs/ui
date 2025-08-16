"use client"

import { Badge, Box, Select } from "@/src/1base"
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
      <Box
        className="flex h-full w-full items-center p-1"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.stopPropagation()
          }
        }}
      >
        <Select.Root
          value={editValue}
          onValueChange={(value) => {
            const newValue = value === "true"
            setEditValue(value)
            onSave(rowData, columnId, newValue)
          }}
        >
          <Select.Trigger
            className="h-8 w-full"
            onKeyDown={handleKeyDown}
            aria-label={`Edit ${columnId} value`}
          />
          <Select.Content>
            <Select.Item value="true">Yes</Select.Item>
            <Select.Item value="false">No</Select.Item>
          </Select.Content>
        </Select.Root>
      </Box>
    )
  }

  return (
    <Box
      ref={(el) => {
        // Connect both refs to ensure proper functionality
        cellRef.current = el
        if (keyboardCellRef) keyboardCellRef.current = el
      }}
      onClick={handleCellClick}
      onKeyDown={handleKeyDown}
      className={cn(
        className,
        "h-full w-full cursor-pointer p-1 transition-colors",
        isSelected && "rounded bg-blue-2 dark:bg-blue-3"
      )}
      {...ariaAttributes}
      aria-label={`${columnId}: ${formattedValue}`}
    >
      <Badge
        color={value ? "green" : "red"}
        variant="soft"
        size="1"
        className="font-medium text-xs"
      >
        {formattedValue}
      </Badge>
    </Box>
  )
}
