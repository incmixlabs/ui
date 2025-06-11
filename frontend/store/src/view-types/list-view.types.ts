// components/list/types.ts
import type { 
    KanbanColumn as BaseKanbanColumn, 
    KanbanTask,
    UseKanbanReturn
} from "@incmix/store"

// Export UseKanbanReturn just in case it's needed
export type { UseKanbanReturn }

// List-specific extensions
export interface ListColumn extends BaseKanbanColumn {
  isExpanded?: boolean
}

export interface ListTask extends KanbanTask {
  // Add any list-specific task properties if needed
}
  
  // List view configuration
  export interface ListViewConfig {
    showCompletedTasks?: boolean
    groupByColumn?: boolean
    showSubtasks?: boolean
    defaultExpanded?: boolean
  }
  
  // Search and filter types
  export interface ListFilter {
    search?: string
    status?: string[]
    priority?: string[]
    assignee?: string[]
    labels?: string[]
    dateRange?: {
      start?: Date
      end?: Date
    }
  }
  
  // List view state
  export interface ListViewState {
    selectedTasks: string[]
    expandedColumns: Set<string>
    filter: ListFilter
    sortBy?: "name" | "priority" | "dueDate" | "created"
    sortOrder?: "asc" | "desc"
  }
  
  // Bulk operation types
  export type BulkOperation = 
    | "complete"
    | "incomplete" 
    | "delete"
    | "move"
    | "setPriority"
    | "addLabel"
    | "removeLabel"
    | "assignTo"
    | "unassign"
  
  export interface BulkOperationPayload {
    operation: BulkOperation
    taskIds: string[]
    targetColumnId?: string
    priority?: string
    labelId?: string
    assigneeId?: string
  }
  
  // List view metrics
  export interface ListViewMetrics {
    totalTasks: number
    completedTasks: number
    overdueTasks: number
    tasksPerColumn: Record<string, number>
    completionRate: number
  }
  
  // Utility type guards
  export const isListColumn = (item: any): item is ListColumn => {
    return item && typeof item.id === "string" && Array.isArray(item.tasks)
  }
  
  export const isListTask = (item: any): item is ListTask => {
    return item && typeof item.taskId === "string" && typeof item.name === "string"
  }
  
  // Data attributes for drag and drop
  export const blockBoardPanningAttr = "data-block-board-panning"