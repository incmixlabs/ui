// File: use-list-view.ts
// Updated to use the selected project from project store

import type {
  KanbanColumn,
  KanbanTask,
  TaskDataSchema,
} from "@incmix/utils/schema"
import { useMemo } from "react"
import { useKanban } from "./use-kanban-data"

// Extend the UseListViewReturn type to include subtask operations
declare module "@incmix/utils/schema" {
  interface UseListViewReturn {
    // Subtask operations
    convertTaskToSubtask: (
      taskId: string,
      parentTaskId: string
    ) => Promise<void>
    convertSubtaskToTask: (taskId: string) => Promise<void>
    canTaskBeIndented: (taskId: string) => Promise<boolean>
    canTaskBeUnindented: (taskId: string) => Promise<boolean>
    findPotentialParentTask: (taskId: string) => Promise<string | null>
  }
}

// List-specific types that extend schema types
export interface ListColumn extends KanbanColumn {
  isExpanded?: boolean
}

// Re-export KanbanTask type for consistency
export type { KanbanTask }

export interface UseListViewReturn {
  columns: ListColumn[] // Status labels transformed to columns
  priorityLabels: any[] // Priority labels from the labels table
  isLoading: boolean
  error: string | null

  // Task operations - same as kanban
  createTask: (
    statusId: string,
    taskData: Partial<TaskDataSchema>
  ) => Promise<void>
  updateTask: (id: string, updates: Partial<TaskDataSchema>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  duplicateTask: (id: string) => Promise<void>
  moveTask: (
    id: string,
    targetStatusId: string,
    targetIndex?: number
  ) => Promise<void>

  // Subtask operations
  convertTaskToSubtask: (taskId: string, parentTaskId: string) => Promise<void>
  convertSubtaskToTask: (taskId: string) => Promise<void>
  canTaskBeIndented: (taskId: string) => Promise<boolean>
  canTaskBeUnindented: (taskId: string) => Promise<boolean>
  findPotentialParentTask: (taskId: string) => Promise<string | null>

  // Status label methods with legacy column naming for backwards compatibility
  createColumn: (
    name: string,
    color?: string,
    description?: string
  ) => Promise<string>
  updateColumn: (
    id: string,
    updates: { name?: string; color?: string; description?: string }
  ) => Promise<void>
  deleteColumn: (id: string) => Promise<void>

  // Status label methods (new schema naming)
  createStatusLabel: (
    name: string,
    color?: string,
    description?: string
  ) => Promise<string>
  updateStatusLabel: (
    id: string,
    updates: { name?: string; color?: string; description?: string }
  ) => Promise<void>
  deleteStatusLabel: (id: string) => Promise<void>
  reorderStatusLabels: (labelIds: string[]) => Promise<void>

  // Priority label methods
  createPriorityLabel: (
    name: string,
    color?: string,
    description?: string
  ) => Promise<string>
  updatePriorityLabel: (
    id: string,
    updates: { name?: string; color?: string; description?: string }
  ) => Promise<void>
  deletePriorityLabel: (id: string) => Promise<void>
  reorderPriorityLabels: (labelIds: string[]) => Promise<void>

  // General label operations
  createLabel: (
    type: "status" | "priority",
    name: string,
    color?: string,
    description?: string
  ) => Promise<string>
  updateLabel: (
    id: string,
    updates: { name?: string; color?: string; description?: string }
  ) => Promise<void>
  deleteLabel: (id: string) => Promise<void>
  reorderLabels: (labelIds: string[]) => Promise<void>

  // Bulk operations
  bulkUpdateTasks: (
    taskIds: string[],
    updates: Partial<TaskDataSchema>
  ) => Promise<void>
  bulkMoveTasks: (taskIds: string[], targetStatusId: string) => Promise<void>
  bulkDeleteTasks: (taskIds: string[]) => Promise<void>

  // Utility
  refetch: () => void
  clearError: () => void

  // Statistics - same as kanban
  projectStats: {
    totalTasks: number
    completedTasks: number
    totalStatusLabels: number
    overdueTasks: number
    urgentTasks: number
  }

  // List-specific functionality can be added here in the future
  toggleColumnExpansion?: (statusId: string) => void
  expandedColumns?: Set<string>
}

/**
 * Hook for list view that reuses kanban data structure
 * This ensures consistency between views while allowing list-specific optimizations
 */
export function useListView(providedProjectId?: string): UseListViewReturn {
  // Reuse kanban hook for data consistency
  const kanbanData = useKanban(providedProjectId)

  // Transform kanban columns to list columns if needed
  const listColumns = useMemo<ListColumn[]>(() => {
    return kanbanData.columns.map((column) => ({
      ...column,
      // Add list-specific properties if needed
      isExpanded: true, // Default to expanded in list view
    }))
  }, [kanbanData.columns])

  // All operations are the same as kanban since we're using the same data but need explicit mappings for renamed methods
  return {
    // Base properties
    columns: listColumns,
    priorityLabels: kanbanData.priorityLabels,
    isLoading: kanbanData.isLoading,
    error: kanbanData.error,
    projectStats: kanbanData.projectStats,

    // Task operations
    createTask: kanbanData.createTask,
    updateTask: kanbanData.updateTask,
    deleteTask: kanbanData.deleteTask,
    duplicateTask: kanbanData.duplicateTask,
    moveTask: kanbanData.moveTask,

    // Subtask operations
    convertTaskToSubtask: kanbanData.convertTaskToSubtask,
    convertSubtaskToTask: kanbanData.convertSubtaskToTask,
    canTaskBeIndented: kanbanData.canTaskBeIndented,
    canTaskBeUnindented: kanbanData.canTaskBeUnindented,
    findPotentialParentTask: kanbanData.findPotentialParentTask,

    // Status label methods with legacy column naming for backwards compatibility
    createColumn: kanbanData.createStatusLabel,
    updateColumn: kanbanData.updateStatusLabel,
    deleteColumn: kanbanData.deleteStatusLabel,

    // Direct status label methods with updated schema naming
    createStatusLabel: kanbanData.createStatusLabel,
    updateStatusLabel: kanbanData.updateStatusLabel,
    deleteStatusLabel: kanbanData.deleteStatusLabel,
    reorderStatusLabels: kanbanData.reorderStatusLabels,

    // Priority label methods
    createPriorityLabel: kanbanData.createPriorityLabel,
    updatePriorityLabel: kanbanData.updatePriorityLabel,
    deletePriorityLabel: kanbanData.deletePriorityLabel,
    reorderPriorityLabels: kanbanData.reorderPriorityLabels,

    // General label operations
    createLabel: kanbanData.createLabel,
    updateLabel: kanbanData.updateLabel,
    deleteLabel: kanbanData.deleteLabel,
    reorderLabels: kanbanData.reorderLabels,

    // Bulk operations
    bulkUpdateTasks: kanbanData.bulkUpdateTasks,
    bulkMoveTasks: kanbanData.bulkMoveTasks,
    bulkDeleteTasks: kanbanData.bulkDeleteTasks,

    // Utilities
    refetch: kanbanData.refetch,
    clearError: kanbanData.clearError,
  }
}
