// import type { AvatarProps } from "@incmix-ui/avatar"
export interface KanbanBoard {
  id: number
  title: string
  tasks: KanbanBoardTask[]
}
export type TCustomColumn = {
  id: number
  title: string
  tasks: TCard[]
}

export type TCustomBoard = TCustomColumn[]
export interface KanbanBoardTask {
  id: number
  name: string
  description: string
  completed: boolean
  daysLeft: number
  attachment?: string
  // members: AvatarProps[]
}

export type TMember = {
  id: number
  name: string
  src: string
}

export type TCard = {
  id: number
  name: string
  description?: string
  completed: boolean
  daysLeft: number
  members: TMember[]
  date?: string
  attachment?: string
  filesData?: { name: string; url: string; size: string }[]
  subTasks?: {
    progress: number
    name: string
    completed: boolean
  }[]
}

export type TColumn = {
  id: string
  title: string
  cards: TCard[]
}

export type TBoard = {
  columns: TColumn[]
}

const cardKey = Symbol("card")
export type TCardData = {
  [cardKey]: true
  card: TCard
  columnId: string
  rect: DOMRect
}

export function getCardData({
  card,
  rect,
  columnId,
}: Omit<TCardData, typeof cardKey> & { columnId: string }): TCardData {
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
  card: TCard
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
}: Omit<TCardDropTargetData, typeof cardDropTargetKey> & {
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
  column: TColumn
}

export function getColumnData({
  column,
}: Omit<TColumnData, typeof columnKey>): TColumnData {
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
