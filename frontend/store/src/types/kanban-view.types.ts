// File: kanban-view.types.ts
// CONSOLIDATED - Single source of truth for all kanban types

import type { TaskDataSchema, TaskStatusSchema } from "@incmix/utils/schema"

// Shared user info type
export interface UserInfo {
  id: string
  name: string
  image?: string
}

// Main Kanban Column type with computed properties
export interface KanbanColumn extends TaskStatusSchema {
  // Override with specific user type
  createdBy: UserInfo
  updatedBy: UserInfo

  // Tasks array
  tasks: KanbanTask[]

  // Computed properties from useKanban hook
  completedTasksCount: number
  totalTasksCount: number
  progressPercentage: number
}

// Main Kanban Task type - now directly extends TaskDataSchema (arrays are mutable now)
export interface KanbanTask extends TaskDataSchema {
  // Additional UI-specific properties
  isSelected?: boolean
  isDragging?: boolean
  isOver?: boolean
  isEditing?: boolean
}

// Drag and drop data types
const cardKey = Symbol("card")
export type TCardData = {
  [cardKey]: true
  card: KanbanTask
  columnId: string
  rect: DOMRect
}

const cardDropTargetKey = Symbol("card-drop-target")
export type TCardDropTargetData = {
  [cardDropTargetKey]: true
  card: KanbanTask
  columnId: string
}

const columnKey = Symbol("column")
export type TColumnData = {
  [columnKey]: true
  column: KanbanColumn
}

// Type guard functions
export function isCardData(
  value: Record<string | symbol, unknown>
): value is TCardData {
  return Boolean(value[cardKey])
}

export function isCardDropTargetData(
  value: Record<string | symbol, unknown>
): value is TCardDropTargetData {
  return Boolean(value[cardDropTargetKey])
}

export function isColumnData(
  value: Record<string | symbol, unknown>
): value is TColumnData {
  return Boolean(value[columnKey])
}

export function isDraggingACard({
  source,
}: {
  source: { data: Record<string | symbol, unknown> }
}): boolean {
  return isCardData(source.data)
}

export function isDraggingAColumn({
  source,
}: {
  source: { data: Record<string | symbol, unknown> }
}): boolean {
  return isColumnData(source.data)
}

// Data getter functions
export function getCardData({
  card,
  rect,
  columnId,
}: {
  card: KanbanTask
  columnId: string
  rect: DOMRect
}): TCardData {
  return {
    [cardKey]: true,
    rect,
    card,
    columnId,
  }
}

export function getCardDropTargetData({
  card,
  columnId,
}: {
  card: KanbanTask
  columnId: string
}): TCardDropTargetData {
  return {
    [cardDropTargetKey]: true,
    card,
    columnId,
  }
}

export function getColumnData({
  column,
}: {
  column: KanbanColumn
}): TColumnData {
  return {
    [columnKey]: true,
    column,
  }
}

// Legacy compatibility aliases for existing components
/**
 * @deprecated Use KanbanTask instead. This alias exists only for backward compatibility.
 */
export type TCard = KanbanTask

/**
 * @deprecated Use KanbanColumn instead. This alias exists only for backward compatibility.
 */
export type TColumn = KanbanColumn

/**
 * @deprecated Use TCardData instead. This alias exists only for backward compatibility.
 */
export type CardData = TCardData

/**
 * @deprecated Use TColumnData instead. This alias exists only for backward compatibility.
 */
export type ColumnData = TColumnData

/**
 * @deprecated Use TCardDropTargetData instead. This alias exists only for backward compatibility.
 */
export type CardDropTargetData = TCardDropTargetData

// Component prop types
export type TaskCardProps = {
  card: KanbanTask
  columnId: string
  onUpdateTask: (
    taskId: string,
    updates: Partial<TaskDataSchema>
  ) => Promise<void>
  onDeleteTask: (taskId: string) => Promise<void>
  onTaskOpen?: (taskId: string) => void
  isSelected?: boolean
}

export type BoardColumnProps = {
  column: KanbanColumn
  onCreateTask: (
    columnId: string,
    taskData: Partial<TaskDataSchema>
  ) => Promise<void>
  onUpdateTask: (
    taskId: string,
    updates: Partial<TaskDataSchema>
  ) => Promise<void>
  onDeleteTask: (taskId: string) => Promise<void>
  onUpdateColumn: (
    columnId: string,
    updates: { name?: string; color?: string; description?: string }
  ) => Promise<void>
  onDeleteColumn: (columnId: string) => Promise<void>
  isDragging?: boolean
  onTaskOpen?: (taskId: string) => void
}

// Form data types
export type TaskFormData = Partial<
  Pick<
    TaskDataSchema,
    | "name"
    | "description"
    | "priority"
    | "startDate"
    | "endDate"
    | "labelsTags"
    | "assignedTo"
    | "subTasks"
  >
>

// Board types
/**
 * @deprecated Consider using KanbanColumn[] directly instead of this wrapper type.
 */
export type TBoard = {
  columns: KanbanColumn[]
}

/**
 * @deprecated Consider migrating to KanbanColumn which provides more functionality.
 */
export type TCustomColumn = {
  id: string
  title: string
  tasks: KanbanTask[]
}

/**
 * @deprecated Consider migrating to KanbanColumn[] which provides more functionality.
 */
export type TCustomBoard = TCustomColumn[]

// Legacy types for compatibility
/**
 * @deprecated This is a legacy interface. Use KanbanColumn[] for the modern board structure.
 */
export interface KanbanBoard {
  id: number
  title: string
  tasks: KanbanBoardTask[]
}

/**
 * @deprecated This is a legacy interface. Use KanbanTask which extends TaskDataSchema for more features.
 */
export interface KanbanBoardTask {
  id: number
  name: string
  description: string
  completed: boolean
  daysLeft: number
  attachment?: string
}

/**
 * @deprecated Consider using a more specific type aligned with your user/member model.
 */
export type TMember = {
  name: string
  label: string
  color: string
  value: string
  avatar: string
  checked: boolean
}
