// File: use-kanban-data.ts
// Updated to use the selected project from project store

import { useMemo, useCallback } from "react"
import type { TaskDataSchema, KanbanColumn, KanbanTask } from "@incmix/utils/schema"

import { useProjectData } from "@incmix/store"

// Re-export the types from schema package
export type { KanbanColumn, KanbanTask }

// Define our own UseKanbanReturn interface instead of extending the schema one
// This allows us to have full control over the shape of the interface

export interface UseKanbanReturn {
  columns: KanbanColumn[]
  priorityLabels: any[] // Labels of type "priority"
  isLoading: boolean
  error: string | null
  projectStats: {
    totalTasks: number
    completedTasks: number
    totalStatusLabels: number
    overdueTasks: number
    urgentTasks: number
  }
  
  // Core operations
  createTask: (statusId: string, taskData: Partial<TaskDataSchema>) => Promise<void>
  updateTask: (id: string, updates: Partial<TaskDataSchema>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  duplicateTask: (id: string) => Promise<void>
  moveTask: (id: string, targetStatusId: string, targetIndex?: number) => Promise<void>
  bulkUpdateTasks: (taskIds: string[], updates: Partial<TaskDataSchema>) => Promise<void>
  bulkMoveTasks: (taskIds: string[], targetStatusId: string) => Promise<void>
  bulkDeleteTasks: (taskIds: string[]) => Promise<void>
  
  // Subtask operations
  convertTaskToSubtask: (taskId: string, parentTaskId: string) => Promise<void>
  convertSubtaskToTask: (taskId: string) => Promise<void>
  canTaskBeIndented: (taskId: string) => Promise<boolean>
  canTaskBeUnindented: (taskId: string) => Promise<boolean>
  findPotentialParentTask: (taskId: string) => Promise<string | null>
  
  // Status label operations
  createStatusLabel: (name: string, color?: string, description?: string) => Promise<string>
  updateStatusLabel: (id: string, updates: { name?: string; color?: string; description?: string }) => Promise<void>
  deleteStatusLabel: (id: string) => Promise<void>
  reorderStatusLabels: (labelIds: string[]) => Promise<void>
  
  // Priority label operations
  createPriorityLabel: (name: string, color?: string, description?: string) => Promise<string>
  updatePriorityLabel: (id: string, updates: { name?: string; color?: string; description?: string }) => Promise<void>
  deletePriorityLabel: (id: string) => Promise<void>
  reorderPriorityLabels: (labelIds: string[]) => Promise<void>
  
  // General label operations
  createLabel: (type: "status" | "priority", name: string, color?: string, description?: string) => Promise<string>
  updateLabel: (id: string, updates: { name?: string; color?: string; description?: string }) => Promise<void>
  deleteLabel: (id: string) => Promise<void>
  reorderLabels: (labelIds: string[]) => Promise<void>
  
  // Utility
  refetch: () => void
  clearError: () => void
}

export function useKanban(providedProjectId?: string): UseKanbanReturn {
  // Get reactive project data
  const projectData = useProjectData(providedProjectId)
  
  // Filter priority labels for use in components
  const priorityLabels = useMemo(() => {
    if (projectData.isLoading) return []
    
    return projectData.labels
      .filter(label => label.type === "priority")
      .sort((a, b) => (a.order || 0) - (b.order || 0))
  }, [projectData.labels, projectData.isLoading])

  // Transform data into kanban columns with computed properties
  // In your use-kanban-data.ts file, update the columns transformation:

  const columns = useMemo<KanbanColumn[]>(() => {
    if (projectData.isLoading) {
      return []
    }
    
    // Filter to only get status labels
    const statusLabels = projectData.labels.filter(label => label.type === "status")
    
    if (statusLabels.length === 0) {
      return []
    }

    return statusLabels.map((status) => {
      const tasks = projectData.tasks
        .filter((task) => task.statusId === status.id)
        .sort((a, b) => a.taskOrder - b.taskOrder)
        // Transform TaskDataSchema to KanbanTask
        .map((task): KanbanTask => ({
          ...task,
          // Ensure these properties are properly typed
          completed: task.completed ?? false,
          // Don't default priorityId to empty string as it's required
          priorityId: task.priorityId,
          // Ensure array properties have proper structure
          acceptanceCriteria: task.acceptanceCriteria?.map(item => ({
            ...item,
            checked: item.checked ?? false,
            order: item.order ?? 0
          })) ?? [],
          checklist: task.checklist?.map(item => ({
            ...item,
            checked: item.checked ?? false,
            order: item.order ?? 0
          })) ?? [],
          subTasks: task.subTasks?.map(item => ({
            ...item,
            completed: item.completed ?? false,
            order: item.order ?? 0
          })) ?? [],
        }))
        
      const completedTasksCount = tasks.filter((task) => task.completed).length
      const totalTasksCount = tasks.length
      const progressPercentage =
        totalTasksCount > 0
          ? Math.round((completedTasksCount / totalTasksCount) * 100)
          : 0

      // Create a properly typed KanbanColumn without type assertion
      const column: KanbanColumn = {
        ...status,
        tasks,
        completedTasksCount,
        totalTasksCount,
        progressPercentage,
      }
      
      return column
    })
  }, [projectData.labels, projectData.tasks, projectData.isLoading])

  // Calculate project statistics
  const projectStats = useMemo(() => {
    const totalTasks = projectData.tasks.length
    const completedTasks = projectData.tasks.filter(
      (task) => task.completed === true
    ).length
    const totalStatusLabels = projectData.labels.filter(label => label.type === "status").length

    // Calculate overdue tasks (tasks with end date in the past)
    const now = new Date()
    const overdueTasks = projectData.tasks.filter((task) => {
      if (!task.endDate) return false
      const endDate = new Date(task.endDate)
      return endDate < now && !task.completed
    }).length

    // Calculate urgent tasks by finding tasks assigned to urgent priority labels
    const urgentPriorityLabel = projectData.labels.find(
      (label) => label.type === "priority" && label.name.toLowerCase() === "urgent"
    )
    
    const urgentTasks = urgentPriorityLabel
      ? projectData.tasks.filter(
          (task) => task.priorityId === urgentPriorityLabel.id && !task.completed
        ).length
      : 0

    return {
      totalTasks,
      completedTasks,
      totalStatusLabels,
      overdueTasks,
      urgentTasks,
    }
  }, [projectData.tasks, projectData.labels])

  // Destructure functions for cleaner dependencies and linter friendliness
  const { createLabel, updateLabel } = projectData
  
  // Memoize stable wrapper functions to prevent unnecessary re-renders
  const createStatusLabel = useCallback(
    (name: string, color?: string, description?: string) => 
      createLabel("status", name, color, description),
    [createLabel]
  )
  
  const updateStatusLabel = useCallback(
    (id: string, updates: { name?: string; color?: string; description?: string }) => 
      updateLabel(id, updates),
    [updateLabel]
  )
  
  const createPriorityLabel = useCallback(
    (name: string, color?: string, description?: string) => 
      createLabel("priority", name, color, description),
    [createLabel]
  )
  
  const updatePriorityLabel = useCallback(
    (id: string, updates: { name?: string; color?: string; description?: string }) => 
      updateLabel(id, updates),
    [updateLabel]
  )

  // Memoize operation functions with stable dependencies to prevent unnecessary re-renders
  const operations = useMemo(
    () => ({
      // Task operations - direct references for stability
      createTask: projectData.createTask,
      updateTask: projectData.updateTask,
      deleteTask: projectData.deleteTask,
      duplicateTask: projectData.duplicateTask,
      moveTask: projectData.moveTask,

      // Subtask operations - direct references
      convertTaskToSubtask: projectData.convertTaskToSubtask,
      convertSubtaskToTask: projectData.convertSubtaskToTask,
      canTaskBeIndented: projectData.canTaskBeIndented,
      canTaskBeUnindented: projectData.canTaskBeUnindented,
      findPotentialParentTask: projectData.findPotentialParentTask,

      // Status label operations - use stable wrapper functions
      createStatusLabel,
      updateStatusLabel,
      deleteStatusLabel: projectData.deleteLabel,
      reorderStatusLabels: projectData.reorderLabels,
        
      // Priority label operations - use stable wrapper functions
      createPriorityLabel,
      updatePriorityLabel,
      deletePriorityLabel: projectData.deleteLabel,
      reorderPriorityLabels: projectData.reorderLabels,

      // Label operations - direct references
      createLabel: projectData.createLabel,
      updateLabel: projectData.updateLabel,
      deleteLabel: projectData.deleteLabel,
      reorderLabels: projectData.reorderLabels,

      // Utility - direct references
      refetch: projectData.refetch,
      clearError: projectData.clearError,
    }),
    [
      projectData.createTask,
      projectData.updateTask,
      projectData.deleteTask,
      projectData.duplicateTask,
      projectData.moveTask,
      projectData.convertTaskToSubtask,
      projectData.convertSubtaskToTask,
      projectData.canTaskBeIndented,
      projectData.canTaskBeUnindented,
      projectData.findPotentialParentTask,
      createStatusLabel,
      updateStatusLabel,
      createPriorityLabel,
      updatePriorityLabel,
      projectData.deleteLabel,
      projectData.reorderLabels,
      projectData.refetch,
      projectData.clearError,
    ]
  )

  // Bulk operations for better UX - using useCallback for better readability
  const bulkUpdateTasks = useCallback(
    async (taskIds: string[], updates: Partial<TaskDataSchema>) => {
      try {
        // Use chunking to prevent overwhelming the backend with large selections
        const batchSize = 20
        for (let i = 0; i < taskIds.length; i += batchSize) {
          const batch = taskIds.slice(i, i + batchSize)
          await Promise.all(batch.map((id) => operations.updateTask(id, updates)))
        }
      } catch (error) {
        console.error("Failed to bulk update tasks:", error)
        throw error
      }
    },
    [operations.updateTask]
  )

  const bulkMoveTasks = useCallback(
    async (taskIds: string[], targetStatusId: string) => {
      try {
        // Find the target column to get current task count for proper indexing
        const targetColumn = columns.find(col => col.id === targetStatusId)
        const baseIndex = targetColumn?.tasks.length || 0
        
        // Move tasks in sequence to maintain relative order
        // Use baseIndex + i to append tasks at the end of the target column
        for (let i = 0; i < taskIds.length; i++) {
          await operations.moveTask(taskIds[i], targetStatusId, baseIndex + i)
        }
      } catch (error) {
        console.error("Failed to bulk move tasks:", error)
        throw error
      }
    },
    [operations.moveTask, columns]
  )

  const bulkDeleteTasks = useCallback(
    async (taskIds: string[]) => {
      try {
        // Use chunking to prevent overwhelming the backend with large selections
        const batchSize = 20
        for (let i = 0; i < taskIds.length; i += batchSize) {
          const batch = taskIds.slice(i, i + batchSize)
          await Promise.all(batch.map((id) => operations.deleteTask(id)))
        }
      } catch (error) {
        console.error("Failed to bulk delete tasks:", error)
        throw error
      }
    },
    [operations.deleteTask]
  )

  // Memoize the final return object to prevent infinite re-renders
  return useMemo(() => ({
    columns,
    priorityLabels,
    isLoading: projectData.isLoading,
    error: projectData.error,
    projectStats,

    // Core operations
    createTask: operations.createTask,
    updateTask: operations.updateTask,
    deleteTask: operations.deleteTask,
    duplicateTask: operations.duplicateTask,
    moveTask: operations.moveTask,
    refetch: operations.refetch,
    clearError: operations.clearError,
    bulkUpdateTasks,
    bulkMoveTasks,
    bulkDeleteTasks,
    
    // Subtask operations
    convertTaskToSubtask: operations.convertTaskToSubtask,
    convertSubtaskToTask: operations.convertSubtaskToTask,
    canTaskBeIndented: operations.canTaskBeIndented,
    canTaskBeUnindented: operations.canTaskBeUnindented,
    findPotentialParentTask: operations.findPotentialParentTask,
    
    // Status label operations are exposed directly
    createStatusLabel: operations.createStatusLabel,
    updateStatusLabel: operations.updateStatusLabel,
    deleteStatusLabel: operations.deleteStatusLabel,
    reorderStatusLabels: operations.reorderStatusLabels,
    
    // Priority label operations are exposed directly
    createPriorityLabel: operations.createPriorityLabel,
    updatePriorityLabel: operations.updatePriorityLabel,
    deletePriorityLabel: operations.deletePriorityLabel,
    reorderPriorityLabels: operations.reorderPriorityLabels,
    
    // General label operations
    createLabel: operations.createLabel,
    updateLabel: operations.updateLabel, 
    deleteLabel: operations.deleteLabel,
    reorderLabels: operations.reorderLabels
  }), [
    columns, 
    priorityLabels, 
    projectData.isLoading, 
    projectData.error, 
    projectStats,
    operations,
    bulkUpdateTasks,
    bulkMoveTasks,
    bulkDeleteTasks
  ])
}
