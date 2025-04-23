import type React from "react"
export interface ComponentSlot {
  slotId: string
  component: React.ReactNode
  title: string
  compImage?: string
  isGrouped?: boolean
  groupId?: string
}

export interface IWidgetGroup {
  groupId: string
  title: string
  memberIds: string[]
}

export interface ILayoutItem {
  i: string
  x: number
  y: number
  w: number
  h: number
  moved?: boolean
  static?: boolean
  resizeHandles?: ReadonlyArray<"s" | "w" | "e" | "n">
  [key: string]: any
}

export type Breakpoint = "lg" | "md" | "sm" | "xs" | "xxs"
export type ResponsiveLayout = Record<Breakpoint, ILayoutItem[]>
