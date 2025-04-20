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

// This function is kept for compatibility but is no longer used in the new implementation
export const createLayoutItemForAllBreakpoints = (
  layouts: Record<Breakpoint, LayoutItem[]>,
  slotId: string,
  componentLayouts: Record<Breakpoint, { w: number; h: number }>
): Record<Breakpoint, LayoutItem[]> => {
  const newLayouts = { ...layouts }
  ;(Object.keys(layouts) as Breakpoint[]).forEach((breakpoint) => {
    const { w, h } = componentLayouts[breakpoint]

    // Add the new item at the top
    const newItem = {
      i: slotId,
      x: 0,
      y: 0,
      w,
      h,
      moved: false,
      static: false,
      resizeHandles: ["s", "w", "e", "n"] as const,
    }

    // Shift existing items down
    const shiftedItems = layouts[breakpoint].map((item) => ({
      ...item,
      y: item.y + h,
    }))

    newLayouts[breakpoint] = [newItem, ...shiftedItems]
  })

  return newLayouts
}
