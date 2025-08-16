"use client"

import { Box } from "@/src/1base"
import { DatePicker } from "@/src/2elements/dates/date-picker"
import { cn } from "@/utils/cn"
import { useCallback, useEffect, useRef, useState } from "react"
import { useEditableCellKeyboard } from "../hooks/useEditableCellKeyboard"

interface EditableDateCellProps {
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
  dateFormat?: string
}

/**
 * Editable date cell component that supports inline date editing
 * with keyboard navigation support
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
  const cellRef = useRef<HTMLDivElement>(null)

  // Parse the date value - ensure it's a valid date
  const dateValue =
    value && !Number.isNaN(new Date(value).getTime())
      ? new Date(value)
      : undefined

  // State to track the current date value being edited
  const [editDateValue, setEditDateValue] = useState<Date | undefined>(
    dateValue
  )

  // When editing starts, set the current edit value ONCE
  useEffect(() => {
    if (isEditing) {
      setEditDateValue(dateValue)
    }
  }, [isEditing]) // Remove dateValue dependency to break loop

  // Format date for display
  const formattedDate = dateValue
    ? dateValue.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        ...(dateFormat?.includes("HH:mm")
          ? {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }
          : {}),
      })
    : ""

  // Handle saving the date
  const handleSave = useCallback(() => {
    if (editDateValue) {
      const isoDate = editDateValue.toISOString()
      onSave(rowData, columnId, isoDate)
    } else {
      onCancelEdit()
    }
  }, [editDateValue, onSave, rowData, columnId, onCancelEdit])

  // Use our enhanced keyboard handler hook
  const {
    handleKeyDown,
    handleCellClick,
    cellRef: keyboardCellRef,
    getAriaAttributes,
  } = useEditableCellKeyboard({
    rowId: rowData.id || "row", // Use rowData.id or fallback
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

  if (isEditing) {
    return (
      <Box
        ref={cellRef}
        className="flex h-full w-full items-center p-1"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.stopPropagation()
          }
        }}
      >
        <DatePicker
          date={editDateValue}
          setDate={(newDate?: Date) => {
            if (newDate) {
              // Only update local state, don't save immediately
              setEditDateValue(newDate)
            }
          }}
          className="h-8 w-full"
        />
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
      aria-label={`${columnId} date: ${formattedDate || "Not set"}`}
    >
      {formattedDate || value || "—"}
    </Box>
  )
}
