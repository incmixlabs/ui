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

export const createLayoutItemForAllBreakpoints = (
  layouts: Record<Breakpoint, LayoutItem[]>,
  slotId: string,
  componentLayouts: Record<Breakpoint, { w: number; h: number }>
): Record<Breakpoint, LayoutItem[]> => {
  const newLayouts = { ...layouts }
  ;(Object.keys(layouts) as Breakpoint[]).forEach((breakpoint) => {
    const { w, h } = componentLayouts[breakpoint]
    const position = findAvailablePosition(layouts[breakpoint], w, h)

    const shiftedItems = layouts[breakpoint].map((item) => ({
      ...item,
      y: item.y + h,
    }))

    newLayouts[breakpoint] = [
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
      ...shiftedItems,
    ]
  })

  return newLayouts
}
