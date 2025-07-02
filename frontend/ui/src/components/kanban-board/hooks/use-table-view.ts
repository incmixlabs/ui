// File: use-table-view.ts

import { useMemo } from "react"
import { nanoid } from "nanoid"
import type { TaskDataSchema, TableTask } from "@incmix/utils/schema"
import type { ListColumn } from "./use-list-view"
import { useListView } from "./use-list-view"

// Define locally to ensure compatibility with our implementation
export interface UseTableViewReturn {
  tasks: TableTask[]
  labels: ListColumn[]
  isLoading: boolean
  error: string | null

  // Task operations
  createTask: (taskData: Partial<TaskDataSchema>) => Promise<void>
  updateTask: (id: string, updates: Partial<TaskDataSchema>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  moveTaskToStatus: (id: string, statusId: string) => Promise<void>

  // Label operations
  createLabel: (type: "status" | "priority", name: string, color?: string, description?: string) => Promise<string>
  updateLabel: (id: string, updates: { name?: string; color?: string; description?: string }) => Promise<void>
  deleteLabel: (id: string) => Promise<void>

  // Bulk operations
  bulkUpdateTasks: (taskIds: string[], updates: Partial<TaskDataSchema>) => Promise<void>
  bulkMoveTasks: (taskIds: string[], targetStatusId: string) => Promise<void>
  bulkDeleteTasks: (taskIds: string[]) => Promise<void>

  // Utility
  refetch: () => void
  clearError: () => void

  // Statistics
  projectStats: {
    totalTasks: number
    completedTasks: number
    totalLabels: number // Total labels (both status and priority)
    overdueTasks: number
    urgentTasks: number
  }
}


/**
 * Hook for table view that enhances list view data with table-specific properties
 */
export function useTableView(
  projectId = "default-project"
): UseTableViewReturn {
  // Reuse list view hook for data consistency
  const listViewData = useListView(projectId)

  // Transform tasks for table display with computed properties
  const tableTasks = useMemo<TableTask[]>(() => {
    // Flatten all tasks from all columns
    const allTasks = listViewData.columns.flatMap((column) =>
      column.tasks.map((task) => {
        const now = new Date()
        const endDate = task.endDate ? new Date(task.endDate) : null
        
        // Ensure subtasks have proper structure with required fields
        const enhancedSubTasks = (task.subTasks || []).map((item, index) => {
          // Create a new object with all required properties
          return {
            id: item.id || `st-${nanoid(10)}`,
            name: item.name || '',
            completed: item.completed ?? false,
            order: index // Default to index position for order
          };
        })

        return {
          ...task,
          // Add status information
          statusLabel: column.name,
          statusColor: column.color,
          
          // Add priority information if available
          // Need to look up priority labels from the full labels list, not just status columns
          // We'd need to access the raw labels from projectData, which we don't have direct access to
          // For now, we'll use undefined and let consuming components handle this
          priorityLabel: undefined,
          priorityColor: undefined,

          // Format assigned users
          assignedToNames:
            task.assignedTo?.map((user) => user.name).join(", ") || "",

          // Subtask information with enhanced data
          totalSubTasks: enhancedSubTasks.length,
          completedSubTasks: enhancedSubTasks.filter((st) => st.completed).length,
          
          // Use enhancedSubTasks to ensure schema compliance
          subTasks: enhancedSubTasks,

          // Overdue calculation
          isOverdue: endDate ? endDate < now && !task.completed : false,
        } as TableTask
      })
    )

    // Sort by creation date (newest first) for table display
    return allTasks.sort(
      (a, b) => {
        // Handle potentially undefined createdAt values
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
        return dateB - dateA // Sort newest first
      }
    )
  }, [listViewData.columns])

  // Enhanced create task function for table context
  const createTaskForTable = async (taskData: Partial<TaskDataSchema>) => {
    // Default to first available status if no statusId provided
    const statusId = taskData.statusId || listViewData.columns[0]?.id
    if (!statusId) {
      throw new Error("No task status available. Please create a status first.")
    }

    await listViewData.createTask(statusId, taskData)
  }

  // Move task to different status (for table status changes)
  const moveTaskToStatus = async (id: string, statusId: string) => {
    await listViewData.moveTask(id, statusId)
  }

  return {
    tasks: tableTasks,
    labels: listViewData.columns, // Updated from taskStatuses to labels
    isLoading: listViewData.isLoading,
    error: listViewData.error,

    // Enhanced operations
    createTask: createTaskForTable,
    updateTask: listViewData.updateTask,
    deleteTask: listViewData.deleteTask,
    moveTaskToStatus,

    // Label operations with updated naming
    createLabel: listViewData.createStatusLabel, // This will need to be updated to handle both types
    updateLabel: listViewData.updateStatusLabel,
    deleteLabel: listViewData.deleteStatusLabel,
    
    // Bulk operations
    bulkUpdateTasks: listViewData.bulkUpdateTasks,
    bulkMoveTasks: listViewData.bulkMoveTasks,
    bulkDeleteTasks: listViewData.bulkDeleteTasks,

    // Utility
    refetch: listViewData.refetch,
    clearError: listViewData.clearError,

    // Statistics
    projectStats: {
      totalTasks: listViewData.projectStats.totalTasks,
      completedTasks: listViewData.projectStats.completedTasks,
      totalLabels: listViewData.projectStats.totalStatusLabels, // Map totalStatusLabels to totalLabels
      overdueTasks: listViewData.projectStats.overdueTasks,
      urgentTasks: listViewData.projectStats.urgentTasks,
    },
  }
}
