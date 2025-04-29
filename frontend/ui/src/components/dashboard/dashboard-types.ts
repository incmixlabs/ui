import type React from "react"
export interface ComponentSlot {
  slotId: string
  component: React.ReactNode
  title: string
  compImage?: string
}

export interface IWidgetGroup {
  groupId: string
  title: string
  memberIds: string[]
  arrangement: "vertical" | "horizontal"
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
  // Support for nesting
  isContainer?: boolean
  children?: ILayoutItem[]
  [key: string]: any
}

export type TBreakpoint = "lg" | "md" | "sm" | "xs" | "xxs"
export type TResponsiveLayout = Record<TBreakpoint, ILayoutItem[]>
