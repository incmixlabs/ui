"use client"

import { Avatar, type AvatarProps, Button } from "@/src/1base"
import {
  AvatarGroup,
  type AvatarGroupProps,
} from "@/src/2elements/avatar-group"
import { cn } from "@/utils/cn"
import { Check, Search } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useEditableCellKeyboard } from "../hooks/useEditableCellKeyboard"

interface EditablePeopleCellProps {
  value: AvatarProps[]
  rowData: any
  columnId: string
  onSave: (rowData: any, columnId: string, newValue: AvatarProps[]) => void
  isEditing: boolean
  isSelected: boolean
  onSelect: () => void
  onStartEdit: () => void
  onCancelEdit: () => void
  className?: string
  availableUsers?: AvatarProps[]
  maxVisible?: number
  maxSelections?: number
}

/**
 * Editable people cell component that supports inline user assignment editing
 * with keyboard navigation support
 */
export const EditablePeopleCell: React.FC<EditablePeopleCellProps> = ({
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
  availableUsers = [],
  maxVisible = 3,
  maxSelections = 10,
}) => {
  const cellRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // State for the people editor
  const [selectedUsers, setSelectedUsers] = useState<AvatarProps[]>(value || [])
  const [searchQuery, setSearchQuery] = useState("")

  // Reset selected users when value changes or editing starts
  useEffect(() => {
    console.log("EditablePeopleCell state change:", {
      isEditing,
      isSelected,
      value,
    })
    setSelectedUsers(value || [])
    setSearchQuery("")
  }, [value, isEditing, isSelected])

  // Focus search input when editing starts and position dropdown
  useEffect(() => {
    if (isEditing && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50)
    }

    // Position dropdown when editing
    if (isEditing && dropdownRef.current && cellRef.current) {
      const cellRect = cellRef.current.getBoundingClientRect()
      const dropdown = dropdownRef.current

      // Position dropdown below the cell
      dropdown.style.top = `${cellRect.bottom + window.scrollY + 5}px`
      dropdown.style.left = `${cellRect.left + window.scrollX}px`

      // Make sure dropdown is within viewport bounds
      setTimeout(() => {
        const dropdownRect = dropdown.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const viewportWidth = window.innerWidth

        // Adjust if extends beyond bottom
        if (dropdownRect.bottom > viewportHeight) {
          dropdown.style.top = `${cellRect.top + window.scrollY - dropdownRect.height - 5}px`
        }

        // Adjust if extends beyond right edge
        if (dropdownRect.right > viewportWidth) {
          dropdown.style.left = `${viewportWidth - dropdownRect.width - 10}px`
        }
      }, 10)
    }
  }, [isEditing])

  // Filter users based on search query
  const filteredUsers = availableUsers.filter(
    (user) =>
      user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Handle user selection/deselection
  const handleUserToggle = (user: AvatarProps) => {
    const isSelected = selectedUsers.some((u) => u.id === user.id)

    if (isSelected) {
      // Remove user from selection
      setSelectedUsers((prev) => prev.filter((u) => u.id !== user.id))
    } else {
      // Add user to selection (check max limit)
      if (!maxSelections || selectedUsers.length < maxSelections) {
        setSelectedUsers((prev) => [...prev, user])
      }
    }
  }

  // Handle saving the selected users
  const handleSave = () => {
    console.log("EditablePeopleCell handleSave called:", {
      rowData: rowData.id,
      columnId,
      selectedUsers,
      originalValue: value,
    })
    // Force update the selected users state before saving
    console.log("Calling onSave with:", selectedUsers)
    onSave(rowData, columnId, selectedUsers)
  }

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Handle search input key down
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSave()
    } else if (e.key === "Escape") {
      e.preventDefault()
      onCancelEdit()
    }
  }

  // Removed handleBlur to prevent premature dropdown closing

  // Use our enhanced keyboard handler hook
  const {
    handleKeyDown,
    handleCellClick,
    cellRef: keyboardCellRef,
    getAriaAttributes,
  } = useEditableCellKeyboard({
    rowId: rowData.id || "row",
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

  // Handle document-wide click to deselect or save
  useEffect(() => {
    if (!isSelected && !isEditing) return

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node

      // Check if click is outside both the cell and the dropdown
      const isOutsideCell = cellRef.current && !cellRef.current.contains(target)
      const isOutsideDropdown =
        dropdownRef.current && !dropdownRef.current.contains(target)

      if (isOutsideCell && isOutsideDropdown) {
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
  }, [isSelected, isEditing, selectedUsers])

  if (isEditing) {
    return (
      <>
        {/* Cell container */}
        <div
          ref={cellRef}
          className="flex h-full w-full items-center p-1"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            // Optionally handle keyboard events here if needed
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              e.stopPropagation()
            }
          }}
        >
          <div className="flex items-center gap-2">
            <AvatarGroup users={selectedUsers} maxVisible={maxVisible} />
          </div>
        </div>

        {/* Dropdown overlay - positioned outside the table */}
        <div
          ref={dropdownRef}
          className="fixed z-[9999] rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700"
          style={{
            minWidth: "280px",
            maxWidth: "350px",
            maxHeight: "400px",
            position: "fixed",
            top: "0px",
            left: "0px",
          }}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          {/* Search input */}
          <div className="border-gray-100 border-b p-3 dark:border-gray-700">
            <div className="relative">
              <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                className="w-full rounded-md border border-gray-300 bg-white py-2 pr-4 pl-10 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                placeholder="Search users..."
              />
            </div>

            {/* Selected count */}
            {selectedUsers.length > 0 && (
              <div className="mt-2 text-gray-500 text-xs dark:text-gray-400">
                {selectedUsers.length} user
                {selectedUsers.length !== 1 ? "s" : ""} selected
                {maxSelections && ` (max ${maxSelections})`}
              </div>
            )}
          </div>

          {/* User list */}
          <div className="max-h-64 overflow-y-auto">
            {filteredUsers.length === 0 ? (
              <div className="px-4 py-3 text-gray-500 text-sm dark:text-gray-400">
                {searchQuery
                  ? "No users found matching your search"
                  : "No users available"}
              </div>
            ) : (
              filteredUsers.map((user) => {
                const isUserSelected = selectedUsers.some(
                  (u) => u.id === user.id
                )
                const isDisabled =
                  !isUserSelected &&
                  maxSelections &&
                  selectedUsers.length >= maxSelections

                return (
                  <Button
                    key={user.id}
                    variant="ghost"
                    size="2"
                    onClick={() => !isDisabled && handleUserToggle(user)}
                    onKeyDown={(e) => {
                      if (!isDisabled && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault()
                        handleUserToggle(user)
                      }
                    }}
                    disabled={!!isDisabled}
                    className={`flex items-center gap-3 text-left ${
                      isUserSelected ? "bg-blue-50 dark:bg-blue-900/30" : ""
                    }`}
                  >
                    {/* Checkbox */}
                    <div
                      className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border-2 ${
                        isUserSelected
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300 dark:border-gray-600"
                      }
                    `}
                    >
                      {isUserSelected && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>

                    {/* User avatar */}
                    <Avatar size={"3"} {...user} />

                    {/* User info */}
                    <div className="min-w-0 flex-grow">
                      <div className="truncate font-medium text-gray-900 dark:text-gray-100">
                        {user.name}
                      </div>
                      <div className="truncate text-gray-500 text-xs dark:text-gray-400">
                        {user.email}
                      </div>
                    </div>
                  </Button>
                )
              })
            )}
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-2 border-gray-100 border-t p-3 dark:border-gray-700">
            <Button variant="ghost" size="1" onClick={onCancelEdit}>
              Cancel
            </Button>
            <Button
              size="1"
              onClick={() => {
                console.log("Save button clicked")
                handleSave()
              }}
            >
              Save ({selectedUsers.length})
            </Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <div
      ref={(el) => {
        // Connect both refs to ensure proper functionality
        cellRef.current = el
        if (keyboardCellRef) keyboardCellRef.current = el
      }}
      onClick={(e) => {
        console.log("EditablePeopleCell clicked")
        handleCellClick(e)
      }}
      onKeyDown={handleKeyDown}
      className={cn(
        className,
        "h-full w-full cursor-pointer p-1 transition-colors duration-150",
        isSelected && "rounded bg-blue-100 dark:bg-blue-900/30"
      )}
      {...ariaAttributes}
      aria-label={`${columnId}: ${value?.length || 0} users assigned`}
    >
      <AvatarGroup users={value || []} maxVisible={maxVisible} />
    </div>
  )
}
