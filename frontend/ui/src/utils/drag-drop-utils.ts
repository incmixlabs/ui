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

export const findAvailablePosition = (
  _layout: LayoutItem[],
  _defaultWidth: number,
  _defaultHeight: number
): { x: number; y: number } => {
  return { x: 0, y: 0 }
}


