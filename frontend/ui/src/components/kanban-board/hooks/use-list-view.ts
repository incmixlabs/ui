import {
  type KanbanColumn,
  useKanban,
} from "./use-kanban-data"
import type { TaskDataSchema } from "@incmix/utils/schema"
import type { TaskOperations } from "./task-operations-types"
// components/list/hooks/use-list-view.ts
import { useMemo } from "react"

// List-specific types that extend kanban types
export interface ListColumn extends KanbanColumn {
  isExpanded?: boolean
}

export interface UseListViewReturn extends TaskOperations {
  columns: ListColumn[]
  isLoading: boolean
  error: string | null

  // Task operations - same as kanban
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

  // Column operations - same as kanban
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

  // Bulk operations
  bulkUpdateTasks: (
    taskIds: string[],
    updates: Partial<TaskDataSchema>
  ) => Promise<void>
  bulkMoveTasks: (taskIds: string[], targetColumnId: string) => Promise<void>
  bulkDeleteTasks: (taskIds: string[]) => Promise<void>

  // Utility
  refetch: () => void
  clearError: () => void

  // Statistics - same as kanban
  projectStats: {
    totalTasks: number
    completedTasks: number
    totalColumns: number
    overdueTasks: number
    urgentTasks: number
  }

  // List-specific functionality can be added here in the future
  toggleColumnExpansion?: (columnId: string) => void
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

  // All operations are the same as kanban since we're using the same data
  return {
    ...kanbanData,
    columns: listColumns,
    // Add list-specific operations if needed in the future
  } as UseListViewReturn
}

// Re-export types for convenience
