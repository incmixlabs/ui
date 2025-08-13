"use client"

import { cn } from "@/utils/cn"
import { useEffect, useRef, useState } from "react"
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

  // State to track the current date value being edited
  const [editDateValue, setEditDateValue] = useState<string>("")

  // Parse the date value - ensure it's a valid date
  const dateValue =
    value && !Number.isNaN(new Date(value).getTime())
      ? new Date(value)
      : undefined

  // When editing starts, set the current edit value
  useEffect(() => {
    if (isEditing) {
      if (dateValue) {
        const formattedValue = dateValue.toISOString().split("T")[0]
        setEditDateValue(formattedValue)
      } else if (value) {
        // If dateValue is undefined but value exists, try to use value directly
        setEditDateValue(value)
      } else {
        // No date value, start with empty
        setEditDateValue("")
      }
    }
  }, [isEditing, dateValue, value])

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

  // Handle saving the date value
  const handleDateSave = (newDateStr: string) => {
    if (newDateStr) {
      // Preserve the selected calendar day across time-zones
      const isoDate = `${newDateStr}T00:00:00.000Z`
      if (!Number.isNaN(Date.parse(isoDate))) {
        onSave(rowData, columnId, isoDate)
      }
    }
  }

  // Handle saving the date
  const handleSave = () => {
    if (editDateValue) {
      handleDateSave(editDateValue)
    } else {
      onCancelEdit()
    }
  }

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
        if (isEditing) {
          // Save when clicking outside during editing
          handleSave()
        } else {
          // Cancel selection when clicking outside
          onCancelEdit()
        }
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [isSelected, isEditing, onCancelEdit, handleSave])

  if (isEditing) {
    return (
      <div
        ref={cellRef} /* Needed for proper outside-click detection */
        className="flex h-full w-full items-center p-1"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.stopPropagation()
          }
        }}
      >
        <input
          ref={(el) => {
            // Connect keyboard hook's ref to the input element
            if (keyboardCellRef) keyboardCellRef.current = el
          }}
          type="date"
          value={editDateValue}
          onChange={(e) => {
            const newValue = e.target.value
            setEditDateValue(newValue)

            // Save immediately when date changes
            if (newValue && newValue !== value) {
              handleDateSave(newValue)
            }
          }}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className="h-8 w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
          aria-label={`Edit ${columnId} date value`}
        />
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
      onClick={handleCellClick}
      onKeyDown={handleKeyDown}
      className={cn(
        className,
        "h-full w-full cursor-pointer p-1 transition-colors duration-150",
        isSelected && "rounded bg-blue-100 dark:bg-blue-900/30"
      )}
      {...ariaAttributes}
      aria-label={`${columnId} date: ${formattedDate || "Not set"}`}
    >
      {formattedDate || value || "—"}
    </div>
  )
}
