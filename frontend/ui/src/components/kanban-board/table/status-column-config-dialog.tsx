// components/table/status-column-config-dialog.tsx
import React, { useState, useEffect, useCallback, useRef } from "react"
import {
  Dialog,
  Flex,
  Box,
  Text,
  Button,
  TextField,
} from "@base"
import { Select, Switch } from "@radix-ui/themes"
import { Plus, Trash2, ChevronDown } from "lucide-react"

import ColorPicker, { ColorSelectType } from "@components/color-picker";
import { ListColumn, TableTask } from "../types"

interface StatusOption {
  id: string
  name: string
  color: string
  tasksCount: number // Number of tasks using this status
}

interface StatusColumnConfigDialogProps {
  isOpen: boolean
  onClose: () => void
  statusLabels: ListColumn[] // Current status columns
  tasks: TableTask[] // All tasks to check usage
  onCreateStatus: (name: string, color?: string, description?: string) => Promise<string>
  onUpdateStatus: (id: string, updates: { name?: string; color?: string; description?: string }) => Promise<void>
  onDeleteStatus: (id: string) => Promise<void>
  onRefresh?: () => void // Optional refresh callback
  allowCustomValues?: boolean // Whether to allow custom values in dropdown
  onAllowCustomValuesChange?: (allow: boolean) => void // Callback when custom values setting changes
}

export const StatusColumnConfigDialog: React.FC<StatusColumnConfigDialogProps> = ({
  isOpen,
  onClose,
  statusLabels,
  tasks,
  onCreateStatus,
  onUpdateStatus,
  onDeleteStatus,
  onRefresh,
  allowCustomValues = false,
  onAllowCustomValuesChange,
}) => {
  // Transform status labels to options with usage count
  const [statusOptions, setStatusOptions] = useState<StatusOption[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // New status form
  const [newStatusName, setNewStatusName] = useState("")
  const [newStatusColor, setNewStatusColor] = useState("#93c5fd")
  
  // Track which color picker is currently open
  const [activeColorPicker, setActiveColorPicker] = useState<string | null>(null)

  // Initialize status options when dialog opens
  useEffect(() => {
    if (isOpen && statusLabels.length > 0) {
      const options = statusLabels.map(label => {
        const tasksCount = tasks.filter(task => task.statusId === label.id).length
        return {
          id: label.id,
          name: label.name,
          color: label.color || "#93c5fd",
          tasksCount
        }
      })
      setStatusOptions(options)
    }
  }, [isOpen, statusLabels, tasks])

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setNewStatusName("")
      setNewStatusColor("#93c5fd")
      setError(null)
      setSuccessMessage(null)
    }
  }, [isOpen])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return

      if (event.key === 'Escape' && !isLoading) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isLoading, onClose])

  // Handle status name update
  const handleUpdateStatusName = useCallback(async (statusId: string, newName: string) => {
    if (!newName.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      await onUpdateStatus(statusId, { name: newName.trim() })

      // Update local state
      setStatusOptions(prev =>
        prev.map(option =>
          option.id === statusId
            ? { ...option, name: newName.trim() }
            : option
        )
      )

      // Refresh the table data
      onRefresh?.();

      // Show success message
      setSuccessMessage(`Status "${newName.trim()}" updated successfully`)
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (err) {
      setError(`Failed to update status name: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }, [onUpdateStatus, onRefresh])

  // Handle status color update
  const handleUpdateStatusColor = useCallback(async (statusId: string, newColor: string) => {
    setIsLoading(true)
    setError(null)

    try {
      await onUpdateStatus(statusId, { color: newColor })

      // Update local state
      setStatusOptions(prev =>
        prev.map(option =>
          option.id === statusId
            ? { ...option, color: newColor }
            : option
        )
      )

      // Refresh the table data
      onRefresh?.();
    } catch (err) {
      setError(`Failed to update status color: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }, [onUpdateStatus, onRefresh])

  // Handle status deletion
  const handleDeleteStatus = useCallback(async (statusId: string) => {
    const status = statusOptions.find(s => s.id === statusId)
    if (!status) return

    if (status.tasksCount > 0) {
      setError(`Cannot delete "${status.name}" because it has ${status.tasksCount} task(s). Move or delete these tasks first.`)
      return
    }

    if (statusOptions.length <= 1) {
      setError("Cannot delete the last status. At least one status is required.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await onDeleteStatus(statusId)

      // Update local state
      setStatusOptions(prev => prev.filter(option => option.id !== statusId))

      // Refresh the table data
      onRefresh?.();
    } catch (err) {
      setError(`Failed to delete status: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }, [statusOptions, onDeleteStatus, onRefresh])

  // Handle new status creation
  const handleCreateStatus = useCallback(async () => {
    if (!newStatusName.trim()) {
      setError("Status name is required")
      return
    }

    // Check for duplicate names
    const nameExists = statusOptions.some(option =>
      option.name.toLowerCase() === newStatusName.trim().toLowerCase()
    )
    if (nameExists) {
      setError("A status with this name already exists")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const newStatusId = await onCreateStatus(newStatusName.trim(), newStatusColor)

      // Add to local state
      const newOption: StatusOption = {
        id: newStatusId,
        name: newStatusName.trim(),
        color: newStatusColor,
        tasksCount: 0
      }
      setStatusOptions(prev => [...prev, newOption])

      // Reset form
      setNewStatusName("")
      setNewStatusColor("#93c5fd")

      // Refresh the table data
      onRefresh?.();
    } catch (err) {
      setError(`Failed to create status: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }, [newStatusName, newStatusColor, statusOptions, onCreateStatus, onRefresh])

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content maxWidth="500px">
        <Dialog.Title>Configure Column</Dialog.Title>

        <div className="py-4 space-y-6">
          {/* Loading indicator */}
          {isLoading && (
            <Box className="p-3 bg-blue-50 border border-blue-200 rounded-md dark:bg-blue-950 dark:border-blue-800">
              <Text size="2" className="text-blue-700 dark:text-blue-300">Updating status options...</Text>
            </Box>
          )}

          {/* Error display */}
          {error && (
            <Box className="p-3 bg-red-50 border border-red-200 rounded-md dark:bg-red-950 dark:border-red-800">
              <Text size="2" className="text-red-700 dark:text-red-300">{error}</Text>
            </Box>
          )}

          {/* Success message display */}
          {successMessage && (
            <Box className="p-3 bg-green-50 border border-green-200 rounded-md dark:bg-green-950 dark:border-green-800">
              <Text size="2" className="text-green-700 dark:text-green-300">{successMessage}</Text>
            </Box>
          )}

          {/* Column Name - Disabled */}
          <div className="space-y-2">
            <Text as="label" size="2" weight="medium">
              Column Name
            </Text>
            <TextField.Root
              value="Status"
              disabled={true}
            />
          </div>

          {/* Column Type - Disabled */}
          <div className="space-y-2">
            <Text as="label" size="2" weight="medium">
              Column Type
            </Text>
            <div className="relative">
              <div className="flex items-center justify-between w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-500 dark:text-gray-400 cursor-not-allowed">
                <span>Dropdown</span>
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          {/* Dropdown Options Header with Allow Custom Values Toggle */}
          <div className="space-y-4">
            <Flex justify="between" align="center">
              <Text size="2" weight="medium">
                Dropdown Options
              </Text>
              <Flex align="center" gap="2">
                <Text size="2">
                  Allow custom values
                </Text>
                <Switch
                  checked={allowCustomValues}
                  onCheckedChange={(checked) => {
                    onAllowCustomValuesChange?.(checked)
                  }}
                  disabled={isLoading}
                />
              </Flex>
            </Flex>

            {/* Drop down data label */}
            <Text size="2" weight="medium">
              Drop down data:
            </Text>

            {/* Existing Status Options */}
            <div className="space-y-2">
              {statusOptions.map((option) => (
                <div key={option.id} className="flex items-center gap-3">
                  {/* Color picker */}
                  <div className="w-8 h-8 flex-shrink-0 relative">
                    <Button
                      variant="solid"
                      className="color-swatch h-7 w-8 cursor-pointer rounded-sm border border-gray-12"
                      style={{backgroundColor: option.color}}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveColorPicker(activeColorPicker === option.id ? null : option.id);
                      }}
                    />
                    {activeColorPicker === option.id && (
                      <div className="absolute top-9 left-0 z-50" style={{ minWidth: '260px' }}>
                        <ColorPicker 
                          colorType="base"
                          onColorSelect={(colorSelect: ColorSelectType) => {
                            if (colorSelect.hex) {
                              handleUpdateStatusColor(option.id, colorSelect.hex);
                              setActiveColorPicker(null); // Close after selection
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Status name input */}
                  <TextField.Root
                    value={option.name}
                    onChange={(e) => {
                      // Update local state immediately for responsive UI
                      setStatusOptions(prev =>
                        prev.map(opt =>
                          opt.id === option.id
                            ? { ...opt, name: e.target.value }
                            : opt
                        )
                      )
                    }}
                    onBlur={(e) => {
                      // Save on blur if changed
                      const originalStatus = statusLabels.find(s => s.id === option.id)
                      if (originalStatus && e.target.value !== originalStatus.name) {
                        handleUpdateStatusName(option.id, e.target.value)
                      }
                    }}
                    onKeyDown={(e) => {
                      // Save on Enter
                      if (e.key === 'Enter') {
                        e.currentTarget.blur()
                      }
                    }}
                    className="flex-1"
                    disabled={isLoading}
                  />

                  {/* Delete button */}
                  <Button
                    variant="soft"
                    size="2"
                    onClick={() => handleDeleteStatus(option.id)}
                    disabled={isLoading || option.tasksCount > 0 || statusOptions.length <= 1}
                    className="text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 min-w-[50px]"
                    title={
                      option.tasksCount > 0
                        ? `Cannot delete: ${option.tasksCount} task(s) using this status`
                        : statusOptions.length <= 1
                          ? "Cannot delete: At least one status is required"
                          : "Delete this status"
                    }
                  >
                    Del
                  </Button>
                </div>
              ))}
            </div>

            {/* Add New Value Section */}
            <div className="space-y-3">
              <Text size="2" weight="medium">
                Add new Value:
              </Text>

              <div className="flex items-center gap-3">
                {/* Color picker for new status */}
                <div className="w-8 h-8 flex-shrink-0 relative">
                  <Button
                    variant="solid"
                    className="color-swatch h-7 w-8 cursor-pointer rounded-sm border border-gray-12"
                    style={{backgroundColor: newStatusColor}}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveColorPicker(activeColorPicker === "new" ? null : "new");
                    }}
                  />
                  {activeColorPicker === "new" && (
                    <div className="absolute top-9 left-0 z-50" style={{ minWidth: '260px' }}>
                      <ColorPicker 
                        colorType="base"
                        onColorSelect={(colorSelect: ColorSelectType) => {
                          if (colorSelect.hex) {
                            setNewStatusColor(colorSelect.hex);
                            setActiveColorPicker(null); // Close after selection
                          }
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* New status name input */}
                <TextField.Root
                  value={newStatusName}
                  onChange={(e) => setNewStatusName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCreateStatus()
                    }
                  }}
                  placeholder="Option Label"
                  className="flex-1"
                  disabled={isLoading}
                />

                {/* Add button */}
                <Button
                  onClick={handleCreateStatus}
                  disabled={isLoading || !newStatusName.trim()}
                  size="2"
                  className="bg-blue-500 hover:bg-blue-600 text-white min-w-[50px]"
                >
                  add
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 justify-end">
            <Button
              variant="soft"
              onClick={onClose}
              disabled={isLoading}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // The allowCustomValues setting is already handled by the parent component
                // through the onAllowCustomValuesChange callback, so we just close
                onClose()
              }}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}