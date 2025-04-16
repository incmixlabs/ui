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

// Find the next available position in the layout
export const findAvailablePosition = (
  _layout: LayoutItem[],
  _defaultWidth: number,
  _defaultHeight: number
): { x: number; y: number } => {
  // Place the new item at the top (y=0, x=0)
  // This will make new items appear at the start of the layout
  return { x: 0, y: 0 }
}

// Create a new layout item for all breakpoints
export const createLayoutItemForAllBreakpoints = (
  layouts: Record<Breakpoint, LayoutItem[]>,
  slotId: string,
  defaultSizes: Record<Breakpoint, { w: number; h: number }>
): Record<Breakpoint, LayoutItem[]> => {
  const newLayouts = { ...layouts }
  ;(Object.keys(layouts) as Breakpoint[]).forEach((breakpoint) => {
    const { w, h } = defaultSizes[breakpoint]
    const position = findAvailablePosition(layouts[breakpoint], w, h)

    // Shift existing items down to make room for the new item at the top
    const shiftedItems = layouts[breakpoint].map((item) => ({
      ...item,
      y: item.y + h, // Shift down by the height of the new item
    }))

    newLayouts[breakpoint] = [
      // Add the new item at the top
      {
        i: slotId,
        x: position.x,
        y: position.y,
        w,
        h,
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      // Add the shifted existing items
      ...shiftedItems,
    ]
  })

  return newLayouts
}
