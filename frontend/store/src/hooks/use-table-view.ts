import type {
  KanbanTask,
  TableTask,
  TaskDataSchema,
} from "@incmix/utils/schema"

import { useListView } from "@incmix/store"
// hooks/use-table-view.ts
import { useMemo } from "react"

export interface UseTableViewReturn {
  tasks: TableTask[]
  taskStatuses: Array<{
    id: string
    name: string
    color: string
    projectId: string
    order: number
    description?: string
    isDefault?: boolean
    createdAt: number
    updatedAt: number
    createdBy: { id: string; name: string; image?: string }
    updatedBy: { id: string; name: string; image?: string }
  }>
  isLoading: boolean
  error: string | null

  // Task operations
  createTask: (taskData: Partial<TaskDataSchema>) => Promise<void>
  updateTask: (
    taskId: string,
    updates: Partial<TaskDataSchema>
  ) => Promise<void>
  deleteTask: (taskId: string) => Promise<void>
  moveTaskToStatus: (taskId: string, statusId: string) => Promise<void>

  // Status operations
  createTaskStatus: (
    name: string,
    color?: string,
    description?: string
  ) => Promise<string>
  updateTaskStatus: (
    statusId: string,
    updates: { name?: string; color?: string; description?: string }
  ) => Promise<void>
  deleteTaskStatus: (statusId: string) => Promise<void>

  // Utility
  refetch: () => void
  clearError: () => void

  // Statistics
  projectStats: {
    totalTasks: number
    completedTasks: number
    totalStatuses: number
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

        return {
          ...task,
          // Add status information
          statusLabel: column.name,
          statusColor: column.color,

          // Format assigned users
          assignedToNames:
            task.assignedTo?.map((user) => user.name).join(", ") || "",

          // Subtask information
          totalSubTasks: task.subTasks?.length || 0,
          completedSubTasks:
            task.subTasks?.filter((st) => st.completed).length || 0,

          // Overdue calculation
          isOverdue: endDate ? endDate < now && !task.completed : false,
        } as TableTask
      })
    )

    // Sort by creation date (newest first) for table display
    return allTasks.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }, [listViewData.columns])

  // Enhanced create task function for table context
  const createTaskForTable = async (taskData: Partial<TaskDataSchema>) => {
    // Default to first available status if no columnId provided
    const statusId = taskData.columnId || listViewData.columns[0]?.id
    if (!statusId) {
      throw new Error("No task status available. Please create a status first.")
    }

    await listViewData.createTask(statusId, taskData)
  }

  // Move task to different status (for table status changes)
  const moveTaskToStatus = async (taskId: string, statusId: string) => {
    await listViewData.moveTask(taskId, statusId)
  }

  return {
    tasks: tableTasks,
    taskStatuses: listViewData.columns,
    isLoading: listViewData.isLoading,
    error: listViewData.error,

    // Enhanced operations
    createTask: createTaskForTable,
    updateTask: listViewData.updateTask,
    deleteTask: listViewData.deleteTask,
    moveTaskToStatus,

    // Status operations
    createTaskStatus: listViewData.createColumn,
    updateTaskStatus: listViewData.updateColumn,
    deleteTaskStatus: listViewData.deleteColumn,

    // Utility
    refetch: listViewData.refetch,
    clearError: listViewData.clearError,

    // Statistics
    projectStats: {
      ...listViewData.projectStats,
      totalStatuses: listViewData.columns.length,
    },
  }
}
