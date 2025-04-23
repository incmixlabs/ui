export interface LayoutItem {
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
export type ResponsiveLayout = Record<Breakpoint, LayoutItem[]>

export interface ComponentSlot {
  slotId: string
  component: React.ReactNode
  title: string
  compImage?: string
  groupId?: string
}

export interface WidgetGroup {
  id: string
  name: string
  widgetIds: string[]
}
