import type { TaskDataSchema } from "@incmix/utils/schema"

// Import your existing RxDB-based types
export interface KanbanColumn {
  id: string
  projectId: string
  name: string
  color: string
  order: number
  description?: string
  isDefault?: boolean
  createdAt: number
  updatedAt: number
  createdBy: {
    id: string
    name: string
    image?: string
  }
  updatedBy: {
    id: string
    name: string
    image?: string
  }
  tasks: KanbanTask[]
  // Computed properties from useKanban hook
  completedTasksCount: number
  totalTasksCount: number
  progressPercentage: number
}
export interface ListColumn extends KanbanColumn {
  isExpanded?: boolean
}
// Making most properties optional for mock data compatibility
export interface KanbanTask
  extends Partial<
    Omit<
      TaskDataSchema,
      | "attachments"
      | "labelsTags"
      | "createdBy"
      | "assignedTo"
      | "subTasks"
      | "updatedBy"
      | "completed"
      | "priorityId"
    >
  > {
  // Make completed optional
  completed?: boolean

  // Make priorityId optional
  priorityId?: string
  // Make attachments mutable to match the UI component expectations
  attachments?: {
    id: string
    name: string
    url: string
    size: string
    type?: string
  }[]

  // For backward compatibility with existing code using 'attachment' instead of 'attachments'
  attachment?: {
    name: string
    url?: string
    size: string
    type?: string
  }[]

  // Make labelsTags mutable
  labelsTags?: {
    value: string
    label: string
    color: string
  }[]

  // Make assignedTo mutable with optional avatar
  assignedTo?: {
    id: string
    name: string
    avatar?: string
    label?: string
    color?: string
    value?: string
    checked?: boolean
  }[]

  // Make subTasks mutable
  subTasks?: {
    id?: string
    name: string
    completed: boolean
    progress?: number
  }[]

  // Make createdBy properties compatible with the data source
  createdBy?: {
    id: string
    name: string
    image?: string // Optional to match the data source
  }

  // Make updatedBy properties compatible with the data source
  updatedBy?: {
    id: string
    name: string
    image?: string // Optional to match the data source
  }

  statusId?: string
  columnId?: string
  // Any additional UI-specific properties can be added here
}

/**
 * @deprecated This is a legacy interface. Consider migrating to KanbanColumn[] for the modern board structure.
 */
export interface KanbanBoard {
  id: number
  title: string
  tasks: KanbanBoardTask[]
}

/**
 * @deprecated Consider migrating to KanbanColumn which provides more functionality.
 */
export type TCustomColumn = {
  id: string
  name: string
  tasks: KanbanTask[] // Updated to use KanbanTask
}

/**
 * @deprecated Consider migrating to KanbanColumn[] which provides more functionality.
 */
export type TCustomBoard = TCustomColumn[]

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

// UPDATED: Make these type aliases point to your RxDB types
/**
 * @deprecated Use KanbanTask instead. This alias exists only for backward compatibility.
 */
export type TCard = KanbanTask

/**
 * @deprecated Use KanbanColumn instead. This alias exists only for backward compatibility.
 */
export type TColumn = KanbanColumn

/**
 * @deprecated Consider using KanbanColumn[] directly instead of this wrapper type.
 */
export type TBoard = {
  columns: TColumn[]
}

// UPDATED: Symbol-based drag and drop data types using RxDB types
const cardKey = Symbol("card")
export type TCardData = {
  [cardKey]: true
  card: KanbanTask
  statusId: string // Updated from columnId to statusId
  rect: DOMRect
}

export function getCardData({
  card,
  rect,
  statusId, // Updated parameter name
}: {
  card: KanbanTask
  statusId: string // Updated parameter name
  rect: DOMRect
}): TCardData {
  return {
    [cardKey]: true,
    rect,
    card,
    statusId, // Updated property name
  }
}
export function isCardData(
  value: Record<string | symbol, unknown>
): value is TCardData {
  return Boolean(value[cardKey])
}

export function isDraggingACard({
  source,
}: {
  source: { data: Record<string | symbol, unknown> }
}): boolean {
  return isCardData(source.data)
}

const cardDropTargetKey = Symbol("card-drop-target")
export type TCardDropTargetData = {
  [cardDropTargetKey]: true
  card: KanbanTask
  statusId: string // Updated from columnId to statusId
}

export function isCardDropTargetData(
  value: Record<string | symbol, unknown>
): value is TCardDropTargetData {
  return Boolean(value[cardDropTargetKey])
}

export function getCardDropTargetData({
  card,
  statusId, // Updated parameter name
}: {
  card: KanbanTask
  statusId: string // Updated parameter name
}): TCardDropTargetData {
  return {
    [cardDropTargetKey]: true,
    card,
    statusId, // Updated property name
  }
}

const columnKey = Symbol("column")
export type TColumnData = {
  [columnKey]: true
  column: KanbanColumn
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

export function isColumnData(
  value: Record<string | symbol, unknown>
): value is TColumnData {
  return Boolean(value[columnKey])
}

export function isDraggingAColumn({
  source,
}: {
  source: { data: Record<string | symbol, unknown> }
}): boolean {
  return isColumnData(source.data)
}
export interface TableTask extends KanbanTask {
  // Additional computed properties for table display
  statusLabel?: string
  statusColor?: string
  priorityLabel?: string // Added to support priorityId lookup
  priorityColor?: string // Added to support priorityId display
  assignedToNames?: string
  totalSubTasks?: number
  completedSubTasks?: number
  isOverdue?: boolean
}
