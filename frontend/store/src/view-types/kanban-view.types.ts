import type { TaskStatusDocType, TaskDocType } from "../sql";

// Kanban specific types that extend the database types
export interface KanbanColumn extends TaskStatusDocType {
  tasks: KanbanTask[]
}

export interface KanbanTask extends TaskDocType {
  // Additional UI-specific properties can be added here if needed
}

// Drag and drop data types
export type CardData = {
  type: "card"
  card: KanbanTask
  columnId: string
  rect: DOMRect
}

export type ColumnData = {
  type: "column"
  column: KanbanColumn
}

export type CardDropTargetData = {
  type: "card-drop-target"
  card: KanbanTask
  columnId: string
}

export type ColumnDropTargetData = {
  type: "column-drop-target"
  column: KanbanColumn
}

// Type guards
export function isCardData(data: unknown): data is CardData {
  return (
    typeof data === "object" &&
    data !== null &&
    "type" in data &&
    data.type === "card"
  )
}

export function isColumnData(data: unknown): data is ColumnData {
  return (
    typeof data === "object" &&
    data !== null &&
    "type" in data &&
    data.type === "column"
  )
}

export function isCardDropTargetData(data: unknown): data is CardDropTargetData {
  return (
    typeof data === "object" &&
    data !== null &&
    "type" in data &&
    data.type === "card-drop-target"
  )
}

export function isColumnDropTargetData(data: unknown): data is ColumnDropTargetData {
  return (
    typeof data === "object" &&
    data !== null &&
    "type" in data &&
    data.type === "column-drop-target"
  )
}

export function isDraggingACard({ source }: { source: { data: unknown } }): boolean {
  return isCardData(source.data)
}

export function isDraggingAColumn({ source }: { source: { data: unknown } }): boolean {
  return isColumnData(source.data)
}

// Data getters for drag and drop
export function getCardData({
  card,
  columnId,
  rect,
}: {
  card: KanbanTask
  columnId: string
  rect: DOMRect
}): CardData {
  return {
    type: "card",
    card,
    columnId,
    rect,
  }
}

export function getColumnData({ column }: { column: KanbanColumn }): ColumnData {
  return {
    type: "column",
    column,
  }
}

export function getCardDropTargetData({
  card,
  columnId,
}: {
  card: KanbanTask
  columnId: string
}): CardDropTargetData {
  return {
    type: "card-drop-target",
    card,
    columnId,
  }
}

export function getColumnDropTargetData({
  column,
}: {
  column: KanbanColumn
}): ColumnDropTargetData {
  return {
    type: "column-drop-target",
    column,
  }
}