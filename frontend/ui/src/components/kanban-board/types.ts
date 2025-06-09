import { TaskDataSchema } from "@incmix/store"


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

export interface KanbanTask extends Omit<TaskDataSchema, 'attachments' | 'labelsTags' | 'createdBy' | 'assignedTo' | 'subTasks' | 'updatedBy' | 'completed' | 'priority'> {
  // Make completed optional
  completed?: boolean

  // Make priority optional
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  // Make attachments mutable to match the UI component expectations
  attachments?: {
    id: string
    name: string
    url: string
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
  }[]
  
  // Make subTasks mutable
  subTasks?: {
    id: string
    name: string
    completed: boolean
  }[]
  
  // Make createdBy properties compatible with the data source
  createdBy: {
    id: string
    name: string
    image?: string  // Optional to match the data source
  }

  // Make updatedBy properties compatible with the data source
  updatedBy: {
    id: string
    name: string
    image?: string  // Optional to match the data source
  }
  
  // Any additional UI-specific properties can be added here
}

// Legacy types for compatibility (keeping your existing UI types)
export interface KanbanBoard {
  id: number
  title: string
  tasks: KanbanBoardTask[]
}

export type TCustomColumn = {
  id: string
  title: string
  tasks: KanbanTask[]  // Updated to use KanbanTask
}

export type TCustomBoard = TCustomColumn[]

export interface KanbanBoardTask {
  id: number
  name: string
  description: string
  completed: boolean
  daysLeft: number
  attachment?: string
}

export type TMember = {
  name: string
  label: string
  color: string
  value: string
  avatar: string
  checked: boolean
  [key: string]: unknown
}

// UPDATED: Make these type aliases point to your RxDB types
export type TCard = KanbanTask
export type TColumn = KanbanColumn

export type TBoard = {
  columns: TColumn[]
}

// UPDATED: Symbol-based drag and drop data types using RxDB types
const cardKey = Symbol("card")
export type TCardData = {
  [cardKey]: true
  card: KanbanTask
  columnId: string
  rect: DOMRect
}

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
  columnId: string
}

export function isCardDropTargetData(
  value: Record<string | symbol, unknown>
): value is TCardDropTargetData {
  return Boolean(value[cardDropTargetKey])
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