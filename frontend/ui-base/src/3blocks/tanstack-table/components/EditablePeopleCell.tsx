"use client"

import { Avatar, type AvatarProps, Button, Box, Input, Popover } from "@/src/1base"
import {
  AvatarGroup,
  type AvatarGroupProps,
} from "@/src/2elements/avatar-group"
import { cn } from "@/utils/cn"
import { Check, Search } from "lucide-react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
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
  const searchInputRef = useRef<HTMLInputElement>(null)

  // State for the people editor
  const [selectedUsers, setSelectedUsers] = useState<AvatarProps[]>(value || [])
  const [searchQuery, setSearchQuery] = useState("")

  // Reset selected users when editing starts (avoid render loops)
  useEffect(() => {
    if (isEditing) {
      setSelectedUsers(value || [])
      setSearchQuery("")
    }
  }, [isEditing]) // Remove value dependency to prevent loops

  // Focus search input when editing starts
  useEffect(() => {
    if (isEditing && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50)
    }
  }, [isEditing])

  // Filter users based on search query (memoized for performance)
  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase()
    return availableUsers.filter(
      (user) =>
        user?.name?.toLowerCase().includes(query) ||
        user?.email?.toLowerCase().includes(query)
    )
  }, [availableUsers, searchQuery])

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
  const handleSave = useCallback(() => {
    onSave(rowData, columnId, selectedUsers)
  }, [selectedUsers, onSave, rowData, columnId])

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

  // Handle popover close
  const handlePopoverClose = useCallback(() => {
    if (isEditing) {
      handleSave()
    } else {
      onCancelEdit()
    }
  }, [isEditing, handleSave, onCancelEdit])

  return (
    <Popover.Root open={isEditing} onOpenChange={(open) => !open && handlePopoverClose()}>
      <Popover.Trigger>
        <Box
          ref={(el) => {
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
          aria-label={`${columnId}: ${value?.length || 0} users assigned`}
        >
          <AvatarGroup users={isEditing ? selectedUsers : value || []} maxVisible={maxVisible} layout="stack" stackOrder="asc" size="1"/>
        </Box>
      </Popover.Trigger>

      <Popover.Content className="max-h-[480px] w-[360px] rounded-lg border border-gray-6 bg-white p-2 shadow-lg dark:border-gray-7 dark:bg-gray-2" sideOffset={8}>
        {/* Search input */}
        <Box className="border-gray-6 border-b p-4 dark:border-gray-7">
          <Box className="relative">
            <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-gray-9" />
            <Input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              className="border-gray-6 pl-10 focus:border-blue-8 focus:ring-2 focus:ring-blue-3"
              placeholder="Search users..."
              size={2}
            />
          </Box>

          {/* Selected count */}
          {selectedUsers.length > 0 && (
            <Box className="mt-3 rounded-sm bg-blue-2 px-2 py-1 font-medium text-blue-11 text-xs dark:bg-blue-3 dark:text-blue-11">
              {selectedUsers.length} user{selectedUsers.length !== 1 ? "s" : ""} selected
              {maxSelections && ` (max ${maxSelections})`}
            </Box>
          )}
        </Box>

        {/* User list */}
        <Box className="max-h-60 w-full px-2 py-2">
          {filteredUsers.length === 0 ? (
            <Box className="flex flex-col items-center justify-center gap-2 px-2 py-8">
              <Box className="mb-1 font-medium text-gray-11 text-sm">
                {searchQuery ? "No users found" : "No users available"}
              </Box>
              {searchQuery && (
                <Box className="text-gray-9 text-xs">
                  Try adjusting your search
                </Box>
              )}
            </Box>
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
                  className={cn(
                    "h-full w-full justify-start gap-3 rounded-md px-2 py-2 text-left transition-all duration-150 ",
                    isUserSelected 
                      ? "bg-blue-3 hover:bg-blue-4 dark:bg-blue-4 dark:hover:bg-blue-5"
                      : "hover:bg-gray-3 dark:hover:bg-gray-4",
                    isDisabled && "cursor-not-allowed opacity-50"
                  )}
                >
                  {/* Checkbox */}
                  <Box
                    className={cn(
                      "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-colors",
                      isUserSelected
                        ? "border-blue-9 bg-blue-9"
                        : "border-gray-7 bg-white dark:border-gray-6 dark:bg-gray-1"
                    )}
                  >
                    {isUserSelected && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </Box>

                  {/* User avatar */}
                  <Avatar size="2" {...user} className="flex-shrink-0" />

                  {/* User info */}
                  <Box className="min-w-0 flex-1">
                    <Box className="truncate font-medium text-gray-12 text-sm">
                      {user.name}
                    </Box>
                    <Box className="truncate text-gray-10 text-xs">
                      {user.email}
                    </Box>
                  </Box>
                </Button>
              )
            })
          )}
        </Box>

        {/* Action buttons */}
        <Box className="flex items-center justify-between border-gray-6 border-t bg-gray-1 px-4 py-3 dark:border-gray-7 dark:bg-gray-3">
          <Box className="text-gray-10 text-xs">
            {selectedUsers.length > 0 && (
              <>{selectedUsers.length} selected</>
            )}
          </Box>
          <Box className="flex gap-2">
            <Button variant="soft" size="2" color="gray" onClick={onCancelEdit}>
              Cancel
            </Button>
            <Button size="2" onClick={handleSave} disabled={selectedUsers.length === 0}>
              Save
            </Button>
          </Box>
        </Box>
      </Popover.Content>
    </Popover.Root>
  )
}
