import type { Layout } from "@incmix/react-grid-layout"

export type Breakpoint = "lg" | "md" | "sm" | "xs" | "xxs"

export interface ExtendedLayout extends Layout {
  componentName?: string
}
export interface LayoutItem {
  i: string
  x: number
  y: number
  w: number
  h: number
  moved?: boolean
  static?: boolean
  resizeHandles?: ReadonlyArray<"s" | "w" | "e" | "n">
  layouts?: ExtendedLayout[]
  [key: string]: any
}
export type ReactGridLayoutType = Layout[]

export type CustomLayout = LayoutItem[]

export interface LayoutItemWithNested extends Layout {
  layouts?: ExtendedLayout[] 
  compactType?: "horizontal" | "vertical" | null
  [key: string]: any
}

export type CustomLayouts = {
  [key in Breakpoint]: LayoutItemWithNested[]
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
  componentName?:string
  layouts?: Record<Breakpoint, { w: number; h: number }>
}

export interface DragData {
  title?: string
  image?: string
  componentName?:string
  darkImage?:string
  lightImage?:string
  [key: string]: any
}
export const DEFAULT_SIZES: Record<Breakpoint, { w: number; h: number }> = {
  lg: { w: 3, h: 6 },
  md: { w: 3, h: 6 },
  sm: { w: 3, h: 6 },
  xs: { w: 3, h: 6 },
  xxs: { w: 2, h: 6 },
}
