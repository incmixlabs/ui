import { useMemo } from "react"
import { useProjectData } from "./use-project-task-data"
import type { TaskDataSchema } from "../sql/task-schemas"
import type { TaskStatusDocType } from "../sql/types"

// Simple kanban types
export interface KanbanColumn extends TaskStatusDocType {
  tasks: TaskDataSchema[]
}

export interface UseKanbanReturn {
  columns: KanbanColumn[]
  isLoading: boolean
  error: string | null
  
  // Task operations
  createTask: (columnId: string, taskData: Partial<TaskDataSchema>) => Promise<void>
  updateTask: (taskId: string, updates: Partial<TaskDataSchema>) => Promise<void>
  deleteTask: (taskId: string) => Promise<void>
  moveTask: (taskId: string, targetColumnId: string, targetIndex?: number) => Promise<void>
  
  // Column operations
  createColumn: (name: string, color?: string) => Promise<string>
  updateColumn: (columnId: string, updates: { name?: string; color?: string; description?: string }) => Promise<void>
  deleteColumn: (columnId: string) => Promise<void>
  reorderColumns: (columnIds: string[]) => Promise<void>
  
  // Utility
  refetch: () => Promise<void>
  clearError: () => void
}

export function useKanban(projectId = "default-project"): UseKanbanReturn {
  // Get all project data
  const projectData = useProjectData(projectId)

  // Transform data into kanban columns
  const columns = useMemo<KanbanColumn[]>(() => {
    if (projectData.isLoading || !projectData.taskStatuses.length) {
      return []
    }

    return projectData.taskStatuses.map(status => ({
      ...status,
      tasks: projectData.tasks
        .filter(task => task.columnId === status.id)
        .sort((a, b) => a.order - b.order)
    }))
  }, [projectData.taskStatuses, projectData.tasks, projectData.isLoading])

  return {
    columns,
    isLoading: projectData.isLoading,
    error: projectData.error,
    
    // Task operations
    createTask: projectData.createTask,
    updateTask: projectData.updateTask,
    deleteTask: projectData.deleteTask,
    moveTask: projectData.moveTask,
    
    // Column operations (map to task status operations)
    createColumn: projectData.createTaskStatus,
    updateColumn: projectData.updateTaskStatus,
    deleteColumn: projectData.deleteTaskStatus,
    reorderColumns: projectData.reorderTaskStatuses,
    
    // Utility
    refetch: projectData.refetch,
    clearError: projectData.clearError,
  }
}