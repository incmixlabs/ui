import type { Layout } from "react-grid-layout"

export type Breakpoint = "lg" | "md" | "sm" | "xs" | "xxs"

export interface LayoutItem {
  i: string
  x: number
  y: number
  w: number
  h: number
  moved?: boolean
  static?: boolean
  resizeHandles?: ReadonlyArray<"s" | "w" | "e" | "n">
  layouts?: Layout[]
  [key: string]: any
}
// Use the Layout type directly from react-grid-layout for the base ReactGridLayout
export type ReactGridLayoutType = Layout[]

// Make sure Layout is compatible with LayoutItem[]
export type CustomLayout = LayoutItem[]
// Define CustomLayouts as a record with all required breakpoints
export type CustomLayouts = {
  [key in Breakpoint]: LayoutItemWithNested[]
}
// Define a layout item that can include nested layouts
export interface LayoutItemWithNested extends Layout {
  layouts?: Layout[] // Use Layout from @incmix/react-grid-layout
  compactType?: "horizontal" | "vertical" | null
  [key: string]: any
}


export interface LayoutPreset {
  id: string
  name: string
  image: string
  description: string
  mainLayouts: CustomLayouts
}

export interface ComponentSlot {
  slotId: string
  component: React.ReactNode
  title: string
  compImage?: string
  layouts?: Record<Breakpoint, { w: number; h: number }>
}

export interface DragData {
  title?: string
  image?: string
  [key: string]: any
}

export const DEFAULT_SIZES: Record<Breakpoint, { w: number; h: number }> = {
  lg: { w: 3, h: 6 },
  md: { w: 3, h: 6 },
  sm: { w: 3, h: 6 },
  xs: { w: 3, h: 6 },
  xxs: { w: 2, h: 6 },
}
