import type React from "react"
import type { Layout } from "react-grid-layout"
export interface LayoutPreset {
  id: string
  name: string
  image: string
  description: string
  mainLayouts: CustomLayouts
  nestedLayouts: Record<string, Layout[]>
}

export interface LayoutPresetsProps {
  presets: LayoutPreset[]
  onSelectPreset: (preset: LayoutPreset) => void
  activePresetId?: string
  isEditing: boolean
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
  [key: string]: any
}

export interface CustomLayout extends Layout {
  compactType?: "horizontal" | "vertical"
  nestedLayouts?: Layout[]
}

export interface CustomLayouts {
  [breakpoint: string]: CustomLayout[]
}

export type Breakpoint = "lg" | "md" | "sm" | "xs" | "xxs"
export type ResponsiveLayout = Record<Breakpoint, LayoutItem[]>

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
