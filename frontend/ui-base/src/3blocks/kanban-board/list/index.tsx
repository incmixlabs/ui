// components/list/list-board.tsx - Updated to use new task input system

import { Box, Button, Flex, Text, Tooltip, toast } from "@/base"
import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element"
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge"
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { bindAll } from "bind-event-listener"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { KanbanTask } from "../types"
import { ConfirmationDialog } from "./confirmation-dialog"
import { ListColumn } from "./list-column"

import { Loader2, Plus, RefreshCw, Sparkles } from "lucide-react"
import { CreateColumnForm } from "../shared/create-column-form"
import { TaskViewHeader } from "../shared/task-view-header"

import { useAIFeaturesStore, useBulkAIGeneration } from "@incmix/store"
import { blockBoardPanningAttr } from "../data-attributes"
import { useListView } from "../hooks/use-list-view"
import { TaskCopyBufferProvider } from "../hooks/use-task-copy-buffer"
import { TaskCardDrawer } from "../shared/task-card-drawer"
import {
  isCardData,
  isCardDropTargetData,
  isColumnData,
  isDraggingACard,
} from "../types"
import { exportAllTasksToCSV } from "../utils/csv-export"

// Helper function for efficient shallow column comparison
function shallowColumnsEqual(a: any[], b: any[]) {
  if (a === b) return true
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (a[i].id !== b[i].id || a[i].tasks.length !== b[i].tasks.length)
      return false
  }
  return true
}

interface ListBoardProps {
  projectId?: string
  
  // Optional override props for Storybook/testing
  mockData?: {
    columns: any[]
    priorityLabels: any[]
    projectStats: {
      totalTasks: number
      completedTasks: number
      totalStatusLabels: number
      overdueTasks: number
      urgentTasks: number
    }
  }
  mockOperations?: {
    onCreateTask?: (statusId: string, taskData: Partial<KanbanTask>) => Promise<void>
    onUpdateTask?: (id: string, updates: Partial<KanbanTask>) => Promise<void>
    onDeleteTask?: (id: string) => Promise<void>
    onDuplicateTask?: (id: string) => Promise<void>
    onMoveTask?: (id: string, targetStatusId: string, targetIndex?: number) => Promise<void>
    onUpdateStatusLabel?: (id: string, updates: any) => Promise<void>
    onDeleteStatusLabel?: (id: string) => Promise<void>
    onRefetch?: () => void
  }
}

export function ListBoard({ 
  projectId = "default-project",
  mockData,
  mockOperations 
}: ListBoardProps) {
  // Get AI features state
  const { useAI } = useAIFeaturesStore()
  const scrollableRef = useRef<HTMLDivElement | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [optimisticColumns, setOptimisticColumns] = useState<typeof columns>([])

  // Task selection state
  const [selectedTasks, setSelectedTasks] = useState<
    Record<string, { id: string; name: string }>
  >({})

  // Confirmation dialog state
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  // Dialog open state for add column form
  const [isAddColumnDialogOpen, setIsAddColumnDialogOpen] = useState(false)

  // Column refresh handler
  const handleColumnAdded = useCallback((_columnId: string) => {
    // Close the dialog when column is added successfully
    setIsAddColumnDialogOpen(false)

    // No need to do anything specific here as the list will update automatically
    // through the useListView hook
  }, [])

  // State for mock data operations
  const [mockColumns, setMockColumns] = useState<any[]>([])
  const [mockError, setMockError] = useState<string | null>(null)

  // Use the list view hook only when not using mock data
  const hookData = useListView(mockData ? undefined : projectId)

  // Determine data source - mock data takes precedence
  const columns = mockData ? mockColumns : hookData.columns
  const priorityLabels = mockData ? mockData.priorityLabels : hookData.priorityLabels
  const isLoading = mockData ? false : hookData.isLoading
  const error = mockData ? mockError : hookData.error
  const projectStats = mockData ? mockData.projectStats : hookData.projectStats

  // Initialize mock columns when mock data is provided
  useEffect(() => {
    if (mockData && mockData.columns.length > 0) {
      setMockColumns(mockData.columns)
    }
  }, [mockData])

  // Mock operations - in-memory CRUD operations
  const createTask = mockData ? async (statusId: string, taskData: Partial<KanbanTask>) => {
    try {
      if (mockOperations?.onCreateTask) {
        await mockOperations.onCreateTask(statusId, taskData)
      }
      
      const newTask: KanbanTask = {
        id: `temp-${Date.now()}-${Math.random()}`,
        name: taskData.name || "New Task",
        statusId,
        priorityId: taskData.priorityId || priorityLabels[0]?.id || "",
        parentTaskId: taskData.parentTaskId || null,
        isSubtask: taskData.isSubtask || false,
        taskOrder: taskData.taskOrder || Date.now(),
        description: taskData.description || "",
        acceptanceCriteria: taskData.acceptanceCriteria || [],
        checklist: taskData.checklist || [],
        completed: taskData.completed || false,
        refUrls: taskData.refUrls || [],
        labelsTags: taskData.labelsTags || [],
        attachments: taskData.attachments || [],
        assignedTo: taskData.assignedTo || [],
        subTasks: taskData.subTasks || [],
        comments: taskData.comments || [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        createdBy: taskData.createdBy || { id: "mock-user", name: "Mock User" },
        updatedBy: taskData.updatedBy || { id: "mock-user", name: "Mock User" },
        ...taskData
      }

      setMockColumns(prev => prev.map(col => 
        col.id === statusId 
          ? { ...col, tasks: [...col.tasks, newTask], totalTasksCount: col.totalTasksCount + 1 }
          : col
      ))
    } catch (error) {
      console.error("Mock create task error:", error)
      setMockError(error instanceof Error ? error.message : "Failed to create task")
    }
  } : hookData.createTask

  const updateTask = mockData ? async (id: string, updates: Partial<KanbanTask>) => {
    try {
      if (mockOperations?.onUpdateTask) {
        await mockOperations.onUpdateTask(id, updates)
      }

      setMockColumns(prev => prev.map(col => ({
        ...col,
        tasks: col.tasks.map((task: KanbanTask) => 
          task.id === id 
            ? { ...task, ...updates, updatedAt: Date.now() }
            : task
        )
      })))
    } catch (error) {
      console.error("Mock update task error:", error)
      setMockError(error instanceof Error ? error.message : "Failed to update task")
    }
  } : hookData.updateTask

  const deleteTask = mockData ? async (id: string) => {
    try {
      if (mockOperations?.onDeleteTask) {
        await mockOperations.onDeleteTask(id)
      }

      setMockColumns(prev => prev.map(col => ({
        ...col,
        tasks: col.tasks.filter((task: KanbanTask) => task.id !== id),
        totalTasksCount: col.totalTasksCount - 1
      })))
    } catch (error) {
      console.error("Mock delete task error:", error)
      setMockError(error instanceof Error ? error.message : "Failed to delete task")
    }
  } : hookData.deleteTask

  const duplicateTask = mockData ? async (id: string) => {
    try {
      if (mockOperations?.onDuplicateTask) {
        await mockOperations.onDuplicateTask(id)
      }

      // Find the original task
      let originalTask: KanbanTask | undefined
      let originalColumn: any | undefined

      for (const column of mockColumns) {
        const task = column.tasks.find((t: KanbanTask) => t.id === id)
        if (task) {
          originalTask = task
          originalColumn = column
          break
        }
      }

      if (!originalTask || !originalColumn) return

      const duplicatedTask: KanbanTask = {
        ...originalTask,
        id: `temp-${Date.now()}-${Math.random()}`,
        name: `${originalTask.name} (Copy)`,
        taskOrder: (originalTask.taskOrder || 1000) + 1,
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }

      setMockColumns(prev => prev.map(col => 
        col.id === originalColumn?.id 
          ? { ...col, tasks: [...col.tasks, duplicatedTask], totalTasksCount: col.totalTasksCount + 1 }
          : col
      ))
    } catch (error) {
      console.error("Mock duplicate task error:", error)
      setMockError(error instanceof Error ? error.message : "Failed to duplicate task")
    }
  } : hookData.duplicateTask

  const moveTask = mockData ? async (id: string, targetStatusId: string, targetIndex?: number) => {
    try {
      if (mockOperations?.onMoveTask) {
        await mockOperations.onMoveTask(id, targetStatusId, targetIndex)
      }

      // Find and remove the task from its current column
      let taskToMove: KanbanTask | undefined
      setMockColumns(prev => {
        const newColumns = prev.map(col => ({
          ...col,
          tasks: col.tasks.filter((task: KanbanTask) => {
            if (task.id === id) {
              taskToMove = { ...task, statusId: targetStatusId, updatedAt: Date.now() }
              return false
            }
            return true
          }),
          totalTasksCount: col.tasks.some((t: KanbanTask) => t.id === id) ? col.totalTasksCount - 1 : col.totalTasksCount
        }))

        // Add the task to the target column
        return newColumns.map(col => {
          if (col.id === targetStatusId && taskToMove) {
            const newTasks = [...col.tasks]
            const insertIndex = targetIndex !== undefined ? Math.min(targetIndex, newTasks.length) : newTasks.length
            newTasks.splice(insertIndex, 0, taskToMove)
            return { ...col, tasks: newTasks, totalTasksCount: col.totalTasksCount + 1 }
          }
          return col
        })
      })
    } catch (error) {
      console.error("Mock move task error:", error)
      setMockError(error instanceof Error ? error.message : "Failed to move task")
    }
  } : hookData.moveTask

  const updateStatusLabel = mockData ? async (id: string, updates: any) => {
    try {
      if (mockOperations?.onUpdateStatusLabel) {
        await mockOperations.onUpdateStatusLabel(id, updates)
      }

      setMockColumns(prev => prev.map(col => 
        col.id === id ? { ...col, ...updates, updatedAt: Date.now() } : col
      ))
    } catch (error) {
      console.error("Mock update status label error:", error)
      setMockError(error instanceof Error ? error.message : "Failed to update status label")
    }
  } : hookData.updateStatusLabel

  const deleteStatusLabel = mockData ? async (id: string) => {
    try {
      if (mockOperations?.onDeleteStatusLabel) {
        await mockOperations.onDeleteStatusLabel(id)
      }

      setMockColumns(prev => prev.filter(col => col.id !== id))
    } catch (error) {
      console.error("Mock delete status label error:", error)
      setMockError(error instanceof Error ? error.message : "Failed to delete status label")
    }
  } : hookData.deleteStatusLabel

  const refetch = mockData ? (mockOperations?.onRefetch || (() => {})) : hookData.refetch

  // Get bulk AI generation hook
  const {
    generateForTasks,
    isGenerating,
    clearError: clearGenerationError,
  } = useBulkAIGeneration(updateTask)

  // CSV export handler for all tasks
  const handleExportAllCSV = useCallback(() => {
    try {
      exportAllTasksToCSV(columns, priorityLabels, {
        includeSubtasks: true,
        includeMetadata: true,
        includeTimestamps: true,
      })
    } catch (error) {
      console.error("Failed to export CSV:", error)
    }
  }, [columns, priorityLabels])

  // State to track optimistic duplicates
  const [optimisticDuplicateIds, setOptimisticDuplicateIds] = useState<
    Set<string>
  >(new Set())

  // Optimistic duplicate task handler
  const handleOptimisticDuplicate = useCallback(
    async (taskId: string) => {
      try {
        // Find the original task from the current columns
        let originalTask: KanbanTask | undefined
        let originalColumn: (typeof columns)[0] | undefined

        for (const column of columns) {
          const task = column.tasks.find((t: KanbanTask) => t.id === taskId)
          if (task) {
            originalTask = task
            originalColumn = column
            break
          }
        }

        if (!originalTask || !originalColumn) {
          console.error("Task not found for optimistic duplicate:", taskId)
          await duplicateTask(taskId) // Fallback to normal duplicate
          return
        }

        // Generate a temporary ID for the optimistic duplicate
        const tempId = `temp-${Date.now()}-${Math.random()}`

        // Create optimistic duplicate task
        const optimisticDuplicate: KanbanTask = {
          ...originalTask,
          id: tempId,
          name: `${originalTask.name || "Untitled Task"} (Duplicate)`,
          taskOrder: (originalTask.taskOrder || 1000) + 500,
          completed: false,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          // Reset nested arrays with new IDs
          subTasks: (originalTask.subTasks || []).map((st, index) => ({
            ...st,
            id: `temp-st-${Date.now()}-${index}`,
            completed: false,
          })),
          checklist: (originalTask.checklist || []).map((cl, index) => ({
            ...cl,
            id: `temp-cl-${Date.now()}-${index}`,
            checked: false,
          })),
          acceptanceCriteria: (originalTask.acceptanceCriteria || []).map(
            (ac, index) => ({
              ...ac,
              id: `temp-ac-${Date.now()}-${index}`,
              checked: false,
            })
          ),
          comments: [],
        }

        // Find the index to insert the duplicate right after the original
        const originalIndex = originalColumn.tasks.findIndex(
          (t: KanbanTask) => t.id === taskId
        )
        const newTasks = [...originalColumn.tasks]
        newTasks.splice(originalIndex + 1, 0, optimisticDuplicate)

        // Update optimistic columns immediately
        const newColumns = columns.map((col) =>
          col.id === originalColumn?.id
            ? {
                ...col,
                tasks: newTasks,
                totalTasksCount: col.totalTasksCount + 1,
              }
            : col
        )
        setOptimisticColumns(newColumns)

        // Track this optimistic duplicate
        setOptimisticDuplicateIds((prev) => new Set([...prev, tempId]))

        // Perform the actual duplicate operation in the background
        try {
          await duplicateTask(taskId)
          // Don't clear optimistic state immediately - let the effect handle it
        } catch (error) {
          // Revert optimistic update on error
          console.error(
            "Failed to duplicate task, reverting optimistic update:",
            error
          )
          setOptimisticColumns([])
          setOptimisticDuplicateIds(new Set())
          throw error
        }
      } catch (error) {
        console.error("Optimistic duplicate failed:", error)
        // Fallback to normal duplicate
        await duplicateTask(taskId)
      }
    },
    [columns, duplicateTask]
  )

  // Effect to clear optimistic state when real duplicate tasks appear
  // Fixed to prevent infinite render loops
  const clearOptimisticStateRef = useRef<(() => void) | undefined>(undefined)
  clearOptimisticStateRef.current = () => {
    setOptimisticColumns([])
    setOptimisticDuplicateIds(new Set())
  }

  useEffect(() => {
    if (optimisticDuplicateIds.size === 0 || optimisticColumns.length === 0)
      return

    // Use more efficient approach to check for matching real tasks
    const hasMatchingRealTask = optimisticColumns.some((col) =>
      col.tasks.some(
        (task: KanbanTask) =>
          task.id?.startsWith("temp-") &&
          task.name?.includes("(Duplicate)") &&
          columns.some((realCol) =>
            realCol.tasks.some(
              (realTask: KanbanTask) =>
                realTask.name === task.name && !realTask.id?.startsWith("temp-")
            )
          )
      )
    )

    if (hasMatchingRealTask) {
      // Use setTimeout to prevent immediate state update during render
      setTimeout(() => {
        clearOptimisticStateRef.current?.()
      }, 0)
    }
  }, [columns, optimisticColumns, optimisticDuplicateIds])

  // Use memoized active columns to prevent unnecessary re-renders
  const activeColumns = useMemo(() => {
    return optimisticColumns.length > 0 ? optimisticColumns : columns
  }, [optimisticColumns, columns])

  // Memoize filtered columns to prevent unnecessary re-filtering
  const filteredColumns = useMemo(() => {
    if (!searchQuery.trim()) return activeColumns

    const lowerSearchQuery = searchQuery.toLowerCase()
    return activeColumns.map((column) => ({
      ...column,
      tasks: column.tasks.filter(
        (task: KanbanTask) =>
          task.name?.toLowerCase().includes(lowerSearchQuery) ||
          task.description?.toLowerCase().includes(lowerSearchQuery)
      ),
    }))
  }, [activeColumns, searchQuery])

  // Handle task selection
  const handleTaskSelect = useCallback(
    (id: string, selected: boolean, taskName: string) => {
      setSelectedTasks((prev) => {
        if (selected) {
          return { ...prev, [id]: { id, name: taskName } }
        }
        const newSelected = { ...prev }
        delete newSelected[id]
        return newSelected
      })
    },
    []
  )

  // Handle bulk selection for a column
  const handleColumnSelectAll = useCallback(
    (statusId: string, selected: boolean) => {
      const column = columns.find((col) => col.id === statusId)
      if (!column) return

      setSelectedTasks((prev) => {
        const newSelected = { ...prev }

        column.tasks.forEach((task: KanbanTask) => {
          if (!task.id) return // Skip tasks without a id

          if (selected) {
            newSelected[task.id] = { id: task.id, name: task.name || "" }
          } else {
            delete newSelected[task.id]
          }
        })

        return newSelected
      })
    },
    [columns]
  )

  // Log selected tasks
  const _handleLogSelectedTasks = useCallback(() => {
    console.log("Selected Tasks:", Object.values(selectedTasks))
  }, [selectedTasks])

  // Prompt for AI content generation
  const promptGenerateAIContent = useCallback(() => {
    if (Object.keys(selectedTasks).length === 0 || !useAI) return
    setShowConfirmDialog(true)
  }, [selectedTasks, useAI])

  // Generate AI content for selected tasks (actual implementation)
  const handleGenerateAIContent = useCallback(async () => {
    if (Object.keys(selectedTasks).length === 0 || !useAI) return

    try {
      clearGenerationError()
      const selectedTasksArray = Object.values(selectedTasks)

      // Close the confirmation dialog
      setShowConfirmDialog(false)

      // Display the number of tasks to be processed
      const taskCount = selectedTasksArray.length
      toast.info(
        `Starting AI content generation for ${taskCount} task${taskCount !== 1 ? "s" : ""}`,
        { duration: 3000 }
      )

      // Call the bulk generation function
      const result = await generateForTasks(selectedTasksArray)

      if (result.success) {
        toast.success(result.message, {
          description: `Generated content for ${result.message.split(" ")[2]} tasks`,
          duration: 5000,
        })
      } else {
        toast.error("Failed to generate content", {
          description: result.message,
          duration: 5000,
        })
        console.error("Failed to generate content:", result.message)
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Unknown error"
      toast.error("Error generating AI content", {
        description: errorMsg,
        duration: 5000,
      })
      console.error("Error generating AI content:", error)
    }
  }, [selectedTasks, useAI, generateForTasks, clearGenerationError])

  // Count selected tasks
  const selectedTasksCount = useMemo(
    () => Object.keys(selectedTasks).length,
    [selectedTasks]
  )

  // Drag and drop setup
  useEffect(() => {
    const element = scrollableRef.current
    if (!element || isLoading || columns.length === 0) {
      return
    }

    return combine(
      monitorForElements({
        canMonitor: isDraggingACard,
        onDragStart() {
          setIsDragging(true)
          setOptimisticColumns([...columns])
        },
        onDrop({ source, location }) {
          const dragging = source.data
          if (!isCardData(dragging)) {
            setIsDragging(false)
            return
          }

          const destination = location.current.dropTargets[0]
          if (!destination) {
            setIsDragging(false)
            return
          }

          const dropTargetData = destination.data
          const sourceColumn = optimisticColumns.find(
            (col) => col.id === dragging.statusId
          )
          if (!sourceColumn) {
            setIsDragging(false)
            return
          }

          const taskIndex = sourceColumn.tasks.findIndex(
            (task: KanbanTask) => task.id === dragging.card.id
          )
          if (taskIndex === -1) {
            setIsDragging(false)
            return
          }

          let targetColumnId: string
          let targetIndex: number
          let newOptimisticColumns = [...optimisticColumns]

          if (isCardDropTargetData(dropTargetData)) {
            const destColumn = optimisticColumns.find(
              (col) => col.id === dropTargetData.statusId
            )
            if (!destColumn) {
              setIsDragging(false)
              return
            }

            targetColumnId = destColumn.id

            if (sourceColumn.id === destColumn.id) {
              // Moving within the same column
              const targetTaskIndex = destColumn.tasks.findIndex(
                (task: KanbanTask) => task.id === dropTargetData.card.id
              )
              if (targetTaskIndex === -1 || targetTaskIndex === taskIndex) {
                setIsDragging(false)
                return
              }

              const closestEdge = extractClosestEdge(dropTargetData)
              if (!closestEdge) {
                setIsDragging(false)
                return
              }

              // Check if the dragged task has subtasks that need to move with it
              const draggingTask = sourceColumn.tasks[taskIndex]
              const subtaskIds = draggingTask.isSubtask
                ? []
                : sourceColumn.tasks
                    .filter(
                      (task: KanbanTask) =>
                        task.isSubtask && task.parentTaskId === draggingTask.id
                    )
                    .map((task: KanbanTask) => task.id)

              // Prevent dropping a parent task onto its own subtask
              const targetTask = sourceColumn.tasks[targetTaskIndex]
              if (targetTask && subtaskIds.includes(targetTask.id)) {
                setIsDragging(false)
                return
              }

              // If we're moving a task with subtasks, we need special handling
              if (subtaskIds.length > 0) {
                // Create a copy of the tasks array to work with
                let tasksCopy = [...sourceColumn.tasks]

                // Remove the parent task and all its subtasks from their original positions
                const parentTask = { ...tasksCopy[taskIndex] }
                const subtasks = tasksCopy.filter((task) =>
                  subtaskIds.includes(task.id || "")
                )

                // Remove the parent and subtasks from the array
                tasksCopy = tasksCopy.filter(
                  (task) =>
                    task.id !== parentTask.id &&
                    !subtaskIds.includes(task.id || "")
                )

                // Calculate where to insert the tasks
                let insertIndex: number
                if (targetTaskIndex < taskIndex) {
                  // Moving upward
                  insertIndex =
                    closestEdge === "bottom"
                      ? targetTaskIndex + 1
                      : targetTaskIndex
                } else {
                  // Moving downward (need to account for the removed items)
                  const removedItemsBeforeTarget = [
                    parentTask.id,
                    ...subtaskIds,
                  ].filter((id) => {
                    const idx = sourceColumn.tasks.findIndex((t: KanbanTask) => t.id === id)
                    return idx !== -1 && idx < targetTaskIndex
                  }).length

                  insertIndex =
                    closestEdge === "bottom"
                      ? targetTaskIndex + 1 - removedItemsBeforeTarget
                      : targetTaskIndex - removedItemsBeforeTarget
                }

                // Insert the parent task and all its subtasks at the new position
                tasksCopy.splice(insertIndex, 0, parentTask, ...subtasks)

                // Update the column with the reordered tasks
                newOptimisticColumns = newOptimisticColumns.map((col) =>
                  col.id === sourceColumn.id
                    ? { ...col, tasks: tasksCopy }
                    : col
                )
              } else {
                // Standard reordering for tasks without subtasks
                const reordered = reorderWithEdge({
                  axis: "vertical",
                  list: sourceColumn.tasks,
                  startIndex: taskIndex,
                  indexOfTarget: targetTaskIndex,
                  closestEdgeOfTarget: closestEdge,
                })

                newOptimisticColumns = newOptimisticColumns.map((col) =>
                  col.id === sourceColumn.id
                    ? { ...col, tasks: reordered }
                    : col
                )
              }

              setOptimisticColumns(newOptimisticColumns)

              // Find the new index of the dragged task
              const updatedColumn = newOptimisticColumns.find(
                (col) => col.id === sourceColumn.id
              )
              const newIndex =
                updatedColumn?.tasks.findIndex(
                  (t: KanbanTask) => t.id === dragging.card.id
                ) || 0

              if (dragging.card.id) {
                moveTask(dragging.card.id, destColumn.id, newIndex).finally(
                  () => {
                    setIsDragging(false)
                  }
                )
              } else {
                console.error("Cannot move task: id is undefined")
                setIsDragging(false)
              }
              return
            }
            // Moving between columns
            const targetTaskIndex = destColumn.tasks.findIndex(
              (task: KanbanTask) => task.id === dropTargetData.card.id
            )
            const closestEdge = extractClosestEdge(dropTargetData)
            targetIndex =
              closestEdge === "bottom" ? targetTaskIndex + 1 : targetTaskIndex
          } else if (isColumnData(dropTargetData)) {
            // Dropping directly on a column
            targetColumnId = dropTargetData.column.id
            targetIndex = 0
          } else {
            setIsDragging(false)
            return
          }

          // Optimistically update the columns
          newOptimisticColumns = newOptimisticColumns.map((col) => {
            if (col.id === sourceColumn.id) {
              return {
                ...col,
                tasks: col.tasks.filter(
                  (_t: KanbanTask, i: number) => i !== taskIndex
                ),
              }
            }
            if (col.id === targetColumnId) {
              const newTasks = [...col.tasks]
              newTasks.splice(targetIndex, 0, sourceColumn.tasks[taskIndex])
              return { ...col, tasks: newTasks }
            }
            return col
          })

          setOptimisticColumns(newOptimisticColumns)

          if (dragging.card.id) {
            moveTask(dragging.card.id, targetColumnId, targetIndex).finally(
              () => {
                setIsDragging(false)
              }
            )
          } else {
            console.error("Cannot move task: id is undefined")
            setIsDragging(false)
          }
        },
      }),
      autoScrollForElements({
        element,
        canScroll: ({ source }) => isCardData(source.data),
      })
    )
  }, [columns, isLoading, moveTask, optimisticColumns])

  // Use optimistic columns for drag and drop operations
  // Fixed to prevent cascading state updates
  const prevColumnsRef = useRef(columns)
  const prevIsDraggingRef = useRef(isDragging)

  useEffect(() => {
    // Only update if columns actually changed and we're not dragging
    if (
      !isDragging &&
      (prevColumnsRef.current !== columns ||
        prevIsDraggingRef.current !== isDragging)
    ) {
      // Use efficient shallow comparison to avoid unnecessary updates
      if (
        optimisticColumns.length === 0 ||
        !shallowColumnsEqual(optimisticColumns, columns)
      ) {
        setOptimisticColumns([]) // Reset to empty to use regular columns
      }
    }

    prevColumnsRef.current = columns
    prevIsDraggingRef.current = isDragging
  }, [columns, isDragging, optimisticColumns])

  // Removed unused displayColumns variable as it duplicates activeColumns functionality

  // Handle board panning
  useEffect(() => {
    let cleanupActive: any = null
    const scrollable = scrollableRef.current

    if (!scrollable) {
      return
    }

    function begin({ startX }: { startX: number }) {
      let lastX = startX

      const cleanupEvents = bindAll(
        window,
        [
          {
            type: "pointermove",
            listener(event) {
              const currentX = event.clientX
              const diffX = lastX - currentX
              lastX = currentX
              scrollable?.scrollBy({ left: diffX })
            },
          },
          ...(
            [
              "pointercancel",
              "pointerup",
              "pointerdown",
              "keydown",
              "resize",
              "click",
              "visibilitychange",
            ] as const
          ).map((eventName) => ({
            type: eventName,
            listener: () => cleanupEvents(),
          })),
        ],
        { capture: true }
      )

      cleanupActive = cleanupEvents
    }

    const cleanupStart = bindAll(scrollable, [
      {
        type: "pointerdown",
        listener(event) {
          if (!(event.target instanceof HTMLElement)) {
            return
          }
          if (event.target.closest(`[${blockBoardPanningAttr}]`)) {
            return
          }
          begin({ startX: event.clientX })
        },
      },
    ])

    return function cleanupAll() {
      cleanupStart()
      cleanupActive?.()
    }
  }, [])

  if (isLoading) {
    return (
      <Box className="flex h-64 items-center justify-center">
        <div>Loading tasks...</div>
      </Box>
    )
  }

  if (error) {
    return (
      <Box className="flex h-64 items-center justify-center">
        <Flex direction="column" align="center" gap="4">
          <div className="text-red-9">Error: {error}</div>
          <Button onClick={refetch} variant="outline">
            <RefreshCw size={16} />
            Retry
          </Button>
        </Flex>
      </Box>
    )
  }

  return (
    <TaskCopyBufferProvider>
      {/* FIX: Making ListBoard structure consistent with Board component to fix double scrollbars */}
      <Box className="flex h-full w-full flex-col overflow-hidden">
        {/* HEADER: Using reusable task view header */}
        <TaskViewHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search tasks..."
          stats={{
            totalStatusLabels: projectStats.totalStatusLabels,
            totalTasks: projectStats.totalTasks,
            completedTasks: projectStats.completedTasks,
            overdueTasks: projectStats.overdueTasks,
            urgentTasks: projectStats.urgentTasks,
          }}
          onRefresh={refetch}
          selectedTasksCount={selectedTasksCount}
          selectedTasksActions={
            useAI && (
              <Tooltip
                content={
                  !isGenerating
                    ? "Generate AI content for selected tasks"
                    : "Generating content..."
                }
              >
                <Button
                  variant="soft"
                  color="purple"
                  size="2"
                  className="shadow-sm transition-all duration-150 hover:shadow-md"
                  onClick={promptGenerateAIContent}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <Loader2 size={16} className="mr-1 animate-spin" />
                  ) : (
                    <Sparkles size={16} className="mr-1" />
                  )}
                  {isGenerating ? "Generating..." : "Generate AI"}
                </Button>
              </Tooltip>
            )
          }
          onClearSelection={() => setSelectedTasks({})}
          showExportCSV={true}
          onExportCSV={handleExportAllCSV}
          rightActions=<Button
            variant="soft"
            size="2"
            className="flex items-center gap-1 shadow-sm transition-all duration-150 hover:shadow-md"
            onClick={() => setIsAddColumnDialogOpen(true)}
          >
            <Plus size={14} />
            Add Column
          </Button>
          isLoading={isLoading}
        />

        {/* CONTENT AREA: Flexible content area with proper overflow handling */}
        <Box className="h-full flex-1">
          {/* The main content container shouldn't have its own scroll */}
          <Box className="h-full w-full p-4" ref={scrollableRef}>
            <Box className="w-full space-y-2">
              {/* Column creation is now handled by the CreateColumnForm in the dropdown menu */}

              {filteredColumns.map((column) => {
                // Transform selectedTasks to match the expected type: {[key: string]: boolean}
                const selectedTasksAsBooleans = Object.keys(
                  selectedTasks
                ).reduce(
                  (acc, id) => {
                    acc[id] = true
                    return acc
                  },
                  {} as { [key: string]: boolean }
                )

                return (
                  <ListColumn
                    key={column.id}
                    column={column}
                    columns={activeColumns}
                    priorityLabels={priorityLabels}
                    onCreateTask={createTask}
                    onUpdateTask={updateTask}
                    onDeleteTask={deleteTask}
                    onDuplicateTask={handleOptimisticDuplicate}
                    onUpdateColumn={(id: string, updates: any) =>
                      updateStatusLabel(id, updates)
                    }
                    onDeleteColumn={deleteStatusLabel}
                    isDragging={isDragging}
                    selectedTaskIds={selectedTasksAsBooleans}
                    onTaskSelect={handleTaskSelect}
                    onSelectAll={handleColumnSelectAll}
                  />
                )
              })}

              {filteredColumns.length === 0 && searchQuery && (
                <Box className="py-12 text-center">
                  <div className="text-gray-9">
                    No tasks found matching "{searchQuery}"
                  </div>
                </Box>
              )}

              {filteredColumns.length === 0 && !searchQuery && (
                <Flex
                  direction="column"
                  align="center"
                  className="space-y-4 py-12"
                >
                  <Text className="text-gray-9">
                    No status columns found. Create your first column to get
                    started.
                  </Text>
                  <Button
                    variant="soft"
                    onClick={() => setIsAddColumnDialogOpen(true)}
                  >
                    <Plus size={14} />
                    Add Status Column
                  </Button>
                </Flex>
              )}
            </Box>

            <TaskCardDrawer viewType="list" projectId={projectId} />
          </Box>
        </Box>

        {/* AI Generation Confirmation Dialog */}
        <ConfirmationDialog
          isOpen={showConfirmDialog}
          onClose={() => setShowConfirmDialog(false)}
          onConfirm={handleGenerateAIContent}
          title="Generate AI Content"
          description={`This will generate AI content for ${Object.keys(selectedTasks).length} selected task${Object.keys(selectedTasks).length !== 1 ? "s" : ""}. Any existing description, checklists, and acceptance criteria will be replaced with AI-generated content. Are you sure?`}
          confirmText="Generate"
          cancelText="Cancel"
          isLoading={isGenerating}
        />

        {/* Controlled CreateColumnForm dialog */}
        <CreateColumnForm
          projectId={projectId}
          onSuccess={handleColumnAdded}
          controlled={true}
          open={isAddColumnDialogOpen}
          onOpenChange={setIsAddColumnDialogOpen}
        />
      </Box>
    </TaskCopyBufferProvider>
  )
}
