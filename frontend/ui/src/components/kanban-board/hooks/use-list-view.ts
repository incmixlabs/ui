// File: use-list-view.ts

import { useMemo } from "react"
import type { TaskDataSchema, KanbanColumn, KanbanTask } from "@incmix/utils/schema"
import { useKanban } from "./use-kanban-data"

// List-specific types that extend schema types
export interface ListColumn extends KanbanColumn {
  isExpanded?: boolean
}

// Re-export KanbanTask type for consistency
export type { KanbanTask }

export interface UseListViewReturn {
  columns: ListColumn[]
  isLoading: boolean
  error: string | null

  // Task operations - same as kanban
  createTask: (
    statusId: string,
    taskData: Partial<TaskDataSchema>
  ) => Promise<void>
  updateTask: (
    id: string,
    updates: Partial<TaskDataSchema>
  ) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  moveTask: (
    id: string,
    targetStatusId: string,
    targetIndex?: number
  ) => Promise<void>

  // Status label methods with legacy column naming for backwards compatibility
  createColumn: (name: string, color?: string, description?: string) => Promise<string>
  updateColumn: (id: string, updates: { name?: string; color?: string; description?: string }) => Promise<void>
  deleteColumn: (id: string) => Promise<void>
  
  // Status label methods (new schema naming)
  createStatusLabel: (name: string, color?: string, description?: string) => Promise<string>
  updateStatusLabel: (id: string, updates: { name?: string; color?: string; description?: string }) => Promise<void>
  deleteStatusLabel: (id: string) => Promise<void>

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
export function useListView(projectId = "default-project"): UseListViewReturn {
  // Reuse kanban hook for data consistency
  const kanbanData = useKanban(projectId)

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
    isLoading: kanbanData.isLoading,
    error: kanbanData.error,
    projectStats: kanbanData.projectStats,
    
    // Task operations
    createTask: kanbanData.createTask,
    updateTask: kanbanData.updateTask,
    deleteTask: kanbanData.deleteTask,
    moveTask: kanbanData.moveTask,
    
    // Status label methods with legacy column naming for backwards compatibility
    createColumn: kanbanData.createStatusLabel,
    updateColumn: kanbanData.updateStatusLabel,
    deleteColumn: kanbanData.deleteStatusLabel,
    
    // Direct status label methods with updated schema naming
    createStatusLabel: kanbanData.createStatusLabel,
    updateStatusLabel: kanbanData.updateStatusLabel,
    deleteStatusLabel: kanbanData.deleteStatusLabel,
    
    // Bulk operations
    bulkUpdateTasks: kanbanData.bulkUpdateTasks,
    bulkMoveTasks: kanbanData.bulkMoveTasks,
    bulkDeleteTasks: kanbanData.bulkDeleteTasks,
    
    // Utilities
    refetch: kanbanData.refetch,
    clearError: kanbanData.clearError
  }
}
