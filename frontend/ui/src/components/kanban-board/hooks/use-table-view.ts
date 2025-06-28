import type {
  TableTask,
  TaskDataSchema
} from "@incmix/utils/schema"
import type { UseTableViewReturn } from "./task-operations-types"

import { useListView } from "./use-list-view"
// hooks/use-table-view.ts
import { useMemo } from "react"


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
    
    // Checklist operations
    addChecklistItem: listViewData.addChecklistItem,
    updateChecklistItem: listViewData.updateChecklistItem,
    removeChecklistItem: listViewData.removeChecklistItem,
    reorderChecklistItems: listViewData.reorderChecklistItems,
    
    // Acceptance criteria operations
    addAcceptanceCriteriaItem: listViewData.addAcceptanceCriteriaItem,
    updateAcceptanceCriteriaItem: listViewData.updateAcceptanceCriteriaItem,
    removeAcceptanceCriteriaItem: listViewData.removeAcceptanceCriteriaItem,
    reorderAcceptanceCriteriaItems: listViewData.reorderAcceptanceCriteriaItems,
    
    // Subtask operations
    addSubtask: listViewData.addSubtask,
    updateSubtask: listViewData.updateSubtask,
    removeSubtask: listViewData.removeSubtask,
    reorderSubtasks: listViewData.reorderSubtasks,

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
