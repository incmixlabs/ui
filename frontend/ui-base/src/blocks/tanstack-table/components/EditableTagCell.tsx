"use client"

import { Button } from "@/base"
import { cn } from "@/utils/cn"
import { X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useEditableCellKeyboard } from "../hooks/useEditableCellKeyboard"

interface EditableTagCellProps {
  value: string[]
  rowData: any
  columnId: string
  onSave: (rowData: any, columnId: string, newValue: string[]) => void
  isEditing: boolean
  isSelected: boolean
  onSelect: () => void
  onStartEdit: () => void
  onCancelEdit: () => void
  className?: string
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
  const cellRef = useRef<HTMLDivElement>(null)
  const [tags, setTags] = useState<string[]>(value || [])
  const [inputValue, setInputValue] = useState("")

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

  // Reset tags state when value changes
  useEffect(() => {
    setTags(value || [])
  }, [value])

  // Handle saving the tags
  const handleSave = () => {
    // Save the current tags when exiting
    onSave(rowData, columnId, tags)
  }

  // Use our enhanced keyboard handler hook for the overall cell
  const {
    handleKeyDown: cellKeyHandler,
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

  // Special input field handler for adding new tags
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (inputValue.trim() && !tags.includes(inputValue.trim())) {
        // Add the new tag
        const newTags = [...tags, inputValue.trim()]
        setTags(newTags)
        // Clear the input field but don't exit edit mode
        setInputValue("")
      } else if (!inputValue.trim()) {
        // If input is empty and Enter is pressed, exit edit mode
        cellKeyHandler(e)
      }
    } else if (e.key === "Escape" || e.key === "Tab") {
      // Let the shared handler deal with these keys
      cellKeyHandler(e)
    }
  }

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove)
    setTags(newTags)
    onSave(rowData, columnId, newTags)
  }

  if (isEditing) {
    return (
      <div
        ref={cellRef} /* Keep outside-click detection working */
        className="flex h-full w-full flex-col p-1"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.stopPropagation()
          }
        }}
      >
        <div className="mb-1 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-1 rounded bg-blue-100 px-2 py-0.5 text-blue-800 text-xs dark:bg-blue-900/30 dark:text-blue-400"
            >
              <span>{tag}</span>
              <Button
                variant="ghost"
                size="1"
                onClick={() => removeTag(tag)}
                srLabel={`Remove ${tag} tag`}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
        <input
          ref={(el) => {
            // Connect keyboard hook's ref to the input element
            if (keyboardCellRef) keyboardCellRef.current = el
          }}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Type and press Enter"
          className="h-8 w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-800"
          aria-label="Add new tag"
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
      onKeyDown={cellKeyHandler}
      className={cn(
        className,
        "h-full w-full cursor-pointer p-1 transition-colors duration-150",
        isSelected && "rounded bg-blue-100 dark:bg-blue-900/30"
      )}
      {...ariaAttributes}
      aria-label={`${columnId}: ${tags.length} tags`}
    >
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-blue-100 px-2 py-0.5 text-blue-800 text-xs dark:bg-blue-900/30 dark:text-blue-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
