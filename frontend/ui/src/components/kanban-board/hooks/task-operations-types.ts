import type { TaskDataSchema, UseKanbanReturn as BaseKanbanReturn, UseTableViewReturn as BaseTableViewReturn } from "@incmix/utils/schema";

/**
 * Extended interface with new checklist, acceptance criteria, and subtask operations
 */
export interface TaskOperations {
  // Checklist operations
  addChecklistItem: (taskId: string, text: string) => Promise<void>;
  updateChecklistItem: (taskId: string, itemId: string, updates: { text?: string; checked?: boolean }) => Promise<void>;
  removeChecklistItem: (taskId: string, itemId: string) => Promise<void>;
  reorderChecklistItems: (taskId: string, itemIds: string[]) => Promise<void>;
  
  // Acceptance criteria operations
  addAcceptanceCriteriaItem: (taskId: string, text: string) => Promise<void>;
  updateAcceptanceCriteriaItem: (taskId: string, itemId: string, updates: { text?: string; checked?: boolean }) => Promise<void>;
  removeAcceptanceCriteriaItem: (taskId: string, itemId: string) => Promise<void>;
  reorderAcceptanceCriteriaItems: (taskId: string, itemIds: string[]) => Promise<void>;
  
  // Subtask operations
  addSubtask: (taskId: string, name: string) => Promise<void>;
  updateSubtask: (taskId: string, subtaskId: string, updates: { name?: string; completed?: boolean }) => Promise<void>;
  removeSubtask: (taskId: string, subtaskId: string) => Promise<void>;
  reorderSubtasks: (taskId: string, subtaskIds: string[]) => Promise<void>;
}

/**
 * Extended Kanban hook return type with additional operations
 */
export interface UseKanbanReturn extends BaseKanbanReturn, TaskOperations {}

/**
 * Extended Table View hook return type with additional operations
 */
export interface UseTableViewReturn extends BaseTableViewReturn, TaskOperations {}
