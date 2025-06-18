// File: use-kanban-data.ts
// REPLACE your current file with this fixed version

import { useMemo } from "react"
import type { TaskDataSchema } from "../sql/task-schemas"
import type { KanbanColumn, KanbanTask } from "../types/kanban-view.types"

import { useProjectData } from "./use-project-task-data"

// Export the types for compatibility, but use the ones from kanban-view.types.ts
export type { KanbanColumn, KanbanTask }

export interface UseKanbanReturn {
  columns: KanbanColumn[]
  isLoading: boolean
  error: string | null

  // Task operations
  createTask: (
    columnId: string,
    taskData: Partial<TaskDataSchema>
  ) => Promise<void>
  updateTask: (
    taskId: string,
    updates: Partial<TaskDataSchema>
  ) => Promise<void>
  deleteTask: (taskId: string) => Promise<void>
  moveTask: (
    taskId: string,
    targetColumnId: string,
    targetIndex?: number
  ) => Promise<void>

  // Column operations
  createColumn: (
    name: string,
    color?: string,
    description?: string
  ) => Promise<string>
  updateColumn: (
    columnId: string,
    updates: { name?: string; color?: string; description?: string }
  ) => Promise<void>
  deleteColumn: (columnId: string) => Promise<void>
  reorderColumns: (columnIds: string[]) => Promise<void>

  // Bulk operations for future use
  bulkUpdateTasks: (
    taskIds: string[],
    updates: Partial<TaskDataSchema>
  ) => Promise<void>
  bulkMoveTasks: (taskIds: string[], targetColumnId: string) => Promise<void>
  bulkDeleteTasks: (taskIds: string[]) => Promise<void>

  // Utility - FIXED: refetch is no longer async
  refetch: () => void
  clearError: () => void

  // Statistics
  projectStats: {
    totalTasks: number
    completedTasks: number
    totalColumns: number
    overdueTasks: number
    urgentTasks: number
  }
}

export function useKanban(projectId = "default-project"): UseKanbanReturn {
  // Get reactive project data
  const projectData = useProjectData(projectId)

  // Transform data into kanban columns with computed properties
  // In your use-kanban-data.ts file, update the columns transformation:

  const columns = useMemo<KanbanColumn[]>(() => {
    if (projectData.isLoading || !projectData.taskStatuses.length) {
      return []
    }

    return projectData.taskStatuses.map((status) => {
      const tasks = projectData.tasks
        .filter((task) => task.columnId === status.id)
        .sort((a, b) => a.order - b.order)
        // Transform TaskDataSchema to KanbanTask
        .map(
          (task): KanbanTask => ({
            ...task,
            // Ensure these properties are properly typed
            completed: task.completed ?? false,
            priority: task.priority ?? "medium",
          })
        )

      const completedTasksCount = tasks.filter((task) => task.completed).length
      const totalTasksCount = tasks.length
      const progressPercentage =
        totalTasksCount > 0
          ? Math.round((completedTasksCount / totalTasksCount) * 100)
          : 0

      return {
        ...status,
        tasks,
        completedTasksCount,
        totalTasksCount,
        progressPercentage,
      } as KanbanColumn // Use type assertion to satisfy the type checker
    })
  }, [projectData.taskStatuses, projectData.tasks, projectData.isLoading])

  // Calculate project statistics
  const projectStats = useMemo(() => {
    const totalTasks = projectData.tasks.length
    const completedTasks = projectData.tasks.filter(
      (task) => task.completed
    ).length
    const totalColumns = projectData.taskStatuses.length

    // Calculate overdue tasks (tasks with end date in the past)
    const now = new Date()
    const overdueTasks = projectData.tasks.filter((task) => {
      if (!task.endDate) return false
      const endDate = new Date(task.endDate)
      return endDate < now && !task.completed
    }).length

    // Calculate urgent tasks
    const urgentTasks = projectData.tasks.filter(
      (task) => task.priority === "urgent" && !task.completed
    ).length

    return {
      totalTasks,
      completedTasks,
      totalColumns,
      overdueTasks,
      urgentTasks,
    }
  }, [projectData.tasks, projectData.taskStatuses])

  // Memoize operation functions to prevent unnecessary re-renders
  const operations = useMemo(
    () => ({
      // Task operations
      createTask: projectData.createTask,
      updateTask: projectData.updateTask,
      deleteTask: projectData.deleteTask,
      moveTask: projectData.moveTask,

      // Column operations (mapped from task status operations)
      createColumn: projectData.createTaskStatus,
      updateColumn: projectData.updateTaskStatus,
      deleteColumn: projectData.deleteTaskStatus,
      reorderColumns: projectData.reorderTaskStatuses,

      // Utility
      refetch: projectData.refetch,
      clearError: projectData.clearError,
    }),
    [projectData]
  )

  // Bulk operations for better UX
  const bulkUpdateTasks = useMemo(
    () => async (taskIds: string[], updates: Partial<TaskDataSchema>) => {
      try {
        // Update tasks in parallel for better performance
        await Promise.all(
          taskIds.map((taskId) => operations.updateTask(taskId, updates))
        )
      } catch (error) {
        console.error("Failed to bulk update tasks:", error)
        throw error
      }
    },
    [operations.updateTask]
  )

  const bulkMoveTasks = useMemo(
    () => async (taskIds: string[], targetColumnId: string) => {
      try {
        // Move tasks in sequence to maintain order
        for (let i = 0; i < taskIds.length; i++) {
          await operations.moveTask(taskIds[i], targetColumnId, i)
        }
      } catch (error) {
        console.error("Failed to bulk move tasks:", error)
        throw error
      }
    },
    [operations.moveTask]
  )

  const bulkDeleteTasks = useMemo(
    () => async (taskIds: string[]) => {
      try {
        // Delete tasks in parallel
        await Promise.all(
          taskIds.map((taskId) => operations.deleteTask(taskId))
        )
      } catch (error) {
        console.error("Failed to bulk delete tasks:", error)
        throw error
      }
    },
    [operations.deleteTask]
  )

  return {
    columns,
    isLoading: projectData.isLoading,
    error: projectData.error,
    projectStats,

    // Operations
    ...operations,
    bulkUpdateTasks,
    bulkMoveTasks,
    bulkDeleteTasks,
  }
}
