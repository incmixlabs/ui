"use client"

import { useState, useCallback, useEffect } from "react"
import {
  Box,
  Flex,
  Button,
  Text,
  Select,
  DropdownMenu,
  Badge,
  IconButton,
  Checkbox,
} from "@base"
import {
  CheckSquare,
  Move,
  Trash2,
  Tag,
  User,
  Calendar,
  AlertCircle,
  X,
  MoreHorizontal,
  ChevronDown,
} from "lucide-react"
import { KanbanColumn, KanbanTask, TaskDataSchema } from "@incmix/store"

interface BulkOperationsProps {
  columns: KanbanColumn[]
  selectedTasks: string[]
  onSelectedTasksChange: (taskIds: string[]) => void
  onBulkMove: (taskIds: string[], targetColumnId: string) => Promise<void>
  onBulkDelete: (taskIds: string[]) => Promise<void>
  onBulkUpdate: (taskIds: string[], updates: Partial<TaskDataSchema>) => Promise<void>
  className?: string
}

export function BulkOperations({
  columns,
  selectedTasks,
  onSelectedTasksChange,
  onBulkMove,
  onBulkDelete,
  onBulkUpdate,
  className,
}: BulkOperationsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [moveToValue, setMoveToValue] = useState("")
  const [priorityValue, setPriorityValue] = useState("")

  const allTasks = columns.flatMap(col => col.tasks)
  const selectedTaskObjects = allTasks.filter(task => selectedTasks.includes(task.taskId))
  const isAllSelected = allTasks.length > 0 && selectedTasks.length === allTasks.length
  const isPartiallySelected = selectedTasks.length > 0 && selectedTasks.length < allTasks.length

  // Handle select all/none
  const handleSelectAll = useCallback(() => {
    if (isAllSelected) {
      onSelectedTasksChange([])
    } else {
      onSelectedTasksChange(allTasks.map(task => task.taskId))
    }
  }, [isAllSelected, allTasks, onSelectedTasksChange])

  // Handle bulk operations with better error handling
  const handleBulkOperation = useCallback(async (operation: string, value?: any) => {
    if (selectedTasks.length === 0) return

    setIsLoading(true)
    try {
      switch (operation) {
        case "move":
          if (value) {
            await onBulkMove(selectedTasks, value)
            setMoveToValue("") // Reset selection
          }
          break
        case "delete":
          await onBulkDelete(selectedTasks)
          break
        case "complete":
          await onBulkUpdate(selectedTasks, { completed: true })
          break
        case "incomplete":
          await onBulkUpdate(selectedTasks, { completed: false })
          break
        case "priority":
          if (value) {
            await onBulkUpdate(selectedTasks, { priority: value })
            setPriorityValue("") // Reset selection
          }
          break
        default:
          break
      }
      
      // Clear selection after successful operation (except for priority/move which are immediate)
      if (operation !== "priority" && operation !== "move") {
        onSelectedTasksChange([])
      }
    } catch (error) {
      console.error("Bulk operation failed:", error)
      // Could add toast notification here
    } finally {
      setIsLoading(false)
    }
  }, [selectedTasks, onBulkMove, onBulkDelete, onBulkUpdate, onSelectedTasksChange])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "a":
            e.preventDefault()
            handleSelectAll()
            break
          case "Backspace":
          case "Delete":
            if (selectedTasks.length > 0) {
              e.preventDefault()
              handleBulkOperation("delete")
            }
            break
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleSelectAll, selectedTasks.length, handleBulkOperation])

  if (selectedTasks.length === 0) {
    return null
  }

  return (
    <Box className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 ${className}`}>
      <Flex
        align="center"
        gap="3"
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg px-4 py-3 max-w-5xl"
      >
        {/* Selection Info */}
        <Flex align="center" gap="2">
          <Checkbox
            checked={isPartiallySelected ? 'indeterminate' : isAllSelected}
            onCheckedChange={handleSelectAll}
          />
          <Text className="font-medium whitespace-nowrap">
            {selectedTasks.length} task{selectedTasks.length > 1 ? "s" : ""} selected
          </Text>
        </Flex>

        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />

        {/* Quick Actions */}
        <Flex align="center" gap="2" wrap="wrap">
          {/* Move to Column - Improved with proper labels */}
          <Select.Root
            value={moveToValue}
            onValueChange={(value) => {
              setMoveToValue(value)
              handleBulkOperation("move", value)
            }}
            disabled={isLoading}
          >
            <Select.Trigger className="w-auto min-w-[140px]">
              <Move size={16} className="mr-1" />
              <Text className="mr-1">Move to</Text>
              <ChevronDown size={14} />
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                <Select.Label>Choose Column</Select.Label>
                {columns.map((column) => (
                  <Select.Item key={column.id} value={column.id}>
                    <Flex align="center" gap="2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: column.color }}
                      />
                      <Text>{column.name}</Text>
                      <Text size="1" className="text-gray-500">
                        ({column.tasks.length} tasks)
                      </Text>
                    </Flex>
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>

          {/* Mark Complete/Incomplete */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="outline" size="2" disabled={isLoading}>
                <CheckSquare size={16} className="mr-1" />
                Status
                <ChevronDown size={14} className="ml-1" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>Change Status</DropdownMenu.Label>
              <DropdownMenu.Separator />
              <DropdownMenu.Item onClick={() => handleBulkOperation("complete")}>
                <CheckSquare size={14} className="mr-2" />
                Mark as Complete
              </DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => handleBulkOperation("incomplete")}>
                <CheckSquare size={14} className="mr-2" />
                Mark as Incomplete
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>

          {/* Set Priority - Improved with proper labels */}
          <Select.Root
            value={priorityValue}
            onValueChange={(value) => {
              setPriorityValue(value)
              handleBulkOperation("priority", value)
            }}
            disabled={isLoading}
          >
            <Select.Trigger className="w-auto min-w-[120px]">
              <AlertCircle size={16} className="mr-1" />
              <Text className="mr-1">Priority</Text>
              <ChevronDown size={14} />
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                <Select.Label>Set Priority</Select.Label>
                <Select.Item value="low">
                  <Flex align="center" gap="2">
                    <Badge color="gray" variant="soft" size="1">Low</Badge>
                    <Text size="2">Low Priority</Text>
                  </Flex>
                </Select.Item>
                <Select.Item value="medium">
                  <Flex align="center" gap="2">
                    <Badge color="blue" variant="soft" size="1">Medium</Badge>
                    <Text size="2">Medium Priority</Text>
                  </Flex>
                </Select.Item>
                <Select.Item value="high">
                  <Flex align="center" gap="2">
                    <Badge color="orange" variant="soft" size="1">High</Badge>
                    <Text size="2">High Priority</Text>
                  </Flex>
                </Select.Item>
                <Select.Item value="urgent">
                  <Flex align="center" gap="2">
                    <Badge color="red" variant="soft" size="1">Urgent</Badge>
                    <Text size="2">Urgent Priority</Text>
                  </Flex>
                </Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>

          {/* More Actions */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <IconButton variant="outline" size="2" disabled={isLoading}>
                <MoreHorizontal size={16} />
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>More Actions</DropdownMenu.Label>
              <DropdownMenu.Separator />
              <DropdownMenu.Item>
                <Tag size={14} className="mr-2" />
                Add Label
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <User size={14} className="mr-2" />
                Assign To
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <Calendar size={14} className="mr-2" />
                Set Due Date
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item>
                <Text>Export Selected</Text>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <Text>Duplicate Tasks</Text>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>

          {/* Delete */}
          <Button
            variant="outline"
            size="2"
            onClick={() => handleBulkOperation("delete")}
            disabled={isLoading}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300"
          >
            <Trash2 size={16} />
          </Button>
        </Flex>

        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />

        {/* Clear Selection */}
        <IconButton
          variant="ghost"
          size="2"
          onClick={() => onSelectedTasksChange([])}
          disabled={isLoading}
          title="Clear selection"
        >
          <X size={16} />
        </IconButton>
      </Flex>

      {/* Selected Tasks Preview - Only show for small selections */}
      {selectedTasks.length <= 3 && (
        <Box className="mt-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 max-w-lg">
          <Text size="1" className="text-gray-600 dark:text-gray-400 mb-2">
            Selected Tasks:
          </Text>
          <Box className="space-y-1">
            {selectedTaskObjects.slice(0, 3).map((task) => (
              <Flex key={task.taskId} align="center" gap="2">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ 
                    backgroundColor: columns.find(col => col.id === task.columnId)?.color || "#6b7280" 
                  }}
                />
                <Text size="1" className="truncate max-w-[200px]">
                  {task.name}
                </Text>
                {task.completed && (
                  <Badge size="1" color="green" variant="soft">
                    Done
                  </Badge>
                )}
                {task.priority && task.priority !== "medium" && (
                  <Badge 
                    size="1" 
                    color={
                      task.priority === "urgent" ? "red" :
                      task.priority === "high" ? "orange" :
                      task.priority === "low" ? "gray" : "blue"
                    }
                    variant="soft"
                  >
                    {task.priority}
                  </Badge>
                )}
              </Flex>
            ))}
            {selectedTasks.length > 3 && (
              <Text size="1" className="text-gray-500">
                ...and {selectedTasks.length - 3} more
              </Text>
            )}
          </Box>
        </Box>
      )}
    </Box>
  )
}

// Hook for managing bulk operations - Enhanced
export function useBulkOperations() {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])

  const toggleTaskSelection = useCallback((taskId: string, isMultiSelect: boolean = false) => {
    setSelectedTasks(prev => {
      if (isMultiSelect) {
        // Multi-select mode: toggle the task
        return prev.includes(taskId)
          ? prev.filter(id => id !== taskId)
          : [...prev, taskId]
      } else {
        // Single select mode: replace selection
        return prev.includes(taskId) ? [] : [taskId]
      }
    })
  }, [])

  const isTaskSelected = useCallback((taskId: string) => {
    return selectedTasks.includes(taskId)
  }, [selectedTasks])

  const clearSelection = useCallback(() => {
    setSelectedTasks([])
  }, [])

  const selectAll = useCallback((taskIds: string[]) => {
    setSelectedTasks(taskIds)
  }, [])

  const selectRange = useCallback((startTaskId: string, endTaskId: string, allTasks: KanbanTask[]) => {
    const startIndex = allTasks.findIndex(task => task.taskId === startTaskId)
    const endIndex = allTasks.findIndex(task => task.taskId === endTaskId)
    
    if (startIndex === -1 || endIndex === -1) return

    const minIndex = Math.min(startIndex, endIndex)
    const maxIndex = Math.max(startIndex, endIndex)
    
    const rangeTaskIds = allTasks
      .slice(minIndex, maxIndex + 1)
      .map(task => task.taskId)
    
    setSelectedTasks(prev => {
      const newSelection = new Set(prev)
      rangeTaskIds.forEach(id => newSelection.add(id))
      return Array.from(newSelection)
    })
  }, [])

  return {
    selectedTasks,
    setSelectedTasks,
    toggleTaskSelection,
    isTaskSelected,
    clearSelection,
    selectAll,
    selectRange,
  }
}