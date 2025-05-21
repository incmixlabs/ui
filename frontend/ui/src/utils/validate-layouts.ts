import type { CustomLayouts, LayoutItemWithNested, Breakpoint } from "@incmix/ui/dashboard"
import type { Layout } from "@incmix/react-grid-layout"

/**
 * Validates that the layouts object has the expected structure
 */
export function validateLayouts(layouts: CustomLayouts | undefined): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (!layouts) {
    errors.push("Layouts is undefined")
    return { isValid: false, errors }
  }

  // Check if layouts has the expected breakpoints
  const breakpoints = Object.keys(layouts) as Breakpoint[]
  if (breakpoints.length === 0) {
    errors.push("No breakpoints found in layouts")
    return { isValid: false, errors }
  }

  // Check if each breakpoint has layouts
  breakpoints.forEach((breakpoint) => {
    const breakpointLayouts = layouts[breakpoint]

    if (!breakpointLayouts || breakpointLayouts.length === 0) {
      errors.push(`No layouts found for breakpoint ${breakpoint}`)
    } else {
      // Check each layout item for required properties
      breakpointLayouts.forEach((item, index) => {
        if (!item.i) {
          errors.push(`Layout item at index ${index} for breakpoint ${breakpoint} is missing 'i' property`)
        }
        if (typeof item.x !== "number") {
          errors.push(`Layout item ${item.i || index} for breakpoint ${breakpoint} is missing 'x' property`)
        }
        if (typeof item.y !== "number") {
          errors.push(`Layout item ${item.i || index} for breakpoint ${breakpoint} is missing 'y' property`)
        }
        if (typeof item.w !== "number") {
          errors.push(`Layout item ${item.i || index} for breakpoint ${breakpoint} is missing 'w' property`)
        }
        if (typeof item.h !== "number") {
          errors.push(`Layout item ${item.i || index} for breakpoint ${breakpoint} is missing 'h' property`)
        }

        // Check nested layouts if they exist
        const layoutItem = item as LayoutItemWithNested
        if (layoutItem.layouts && layoutItem.layouts.length > 0) {
          layoutItem.layouts.forEach((nestedItem, nestedIndex) => {
            if (!nestedItem.i) {
              errors.push(
                `Nested layout item at index ${nestedIndex} for parent ${item.i} and breakpoint ${breakpoint} is missing 'i' property`,
              )
            }
            if (typeof nestedItem.x !== "number") {
              errors.push(
                `Nested layout item ${nestedItem.i || nestedIndex} for parent ${
                  item.i
                } and breakpoint ${breakpoint} is missing 'x' property`,
              )
            }
            if (typeof nestedItem.y !== "number") {
              errors.push(
                `Nested layout item ${nestedItem.i || nestedIndex} for parent ${
                  item.i
                } and breakpoint ${breakpoint} is missing 'y' property`,
              )
            }
            if (typeof nestedItem.w !== "number") {
              errors.push(
                `Nested layout item ${nestedItem.i || nestedIndex} for parent ${
                  item.i
                } and breakpoint ${breakpoint} is missing 'w' property`,
              )
            }
            if (typeof nestedItem.h !== "number") {
              errors.push(
                `Nested layout item ${nestedItem.i || nestedIndex} for parent ${
                  item.i
                } and breakpoint ${breakpoint} is missing 'h' property`,
              )
            }
          })
        }
      })
    }
  })

  return { isValid: errors.length === 0, errors }
}

/**
 * Ensures that all grid items with nested layouts have those layouts in all breakpoints
 */
export function ensureNestedLayoutsInAllBreakpoints(layouts: CustomLayouts): CustomLayouts {
  // First, identify all grid items that have nested layouts in any breakpoint
  const itemsWithNestedLayouts = new Map<string, Layout[]>()

  // Cast Object.keys to Breakpoint[] to ensure type safety
  const breakpoints = Object.keys(layouts) as Breakpoint[]

  breakpoints.forEach((breakpoint) => {
    layouts[breakpoint].forEach((item) => {
      const layoutItem = item as LayoutItemWithNested
      if (layoutItem.i.startsWith("grid-") && layoutItem.layouts && layoutItem.layouts.length > 0) {
        // Store a deep copy of the layouts to avoid reference issues
        itemsWithNestedLayouts.set(layoutItem.i, [...layoutItem.layouts])
      }
    })
  })

  // Now ensure all these items have nested layouts in all breakpoints
  const updatedLayouts = { ...layouts }

  breakpoints.forEach((breakpoint) => {
    updatedLayouts[breakpoint] = updatedLayouts[breakpoint].map((item) => {
      const layoutItem = item as LayoutItemWithNested
      if (layoutItem.i.startsWith("grid-") && itemsWithNestedLayouts.has(layoutItem.i)) {
        // If this item should have nested layouts but doesn't, add them
        if (!layoutItem.layouts || layoutItem.layouts.length === 0) {
          return {
            ...layoutItem,
            layouts: itemsWithNestedLayouts.get(layoutItem.i) || [],
          }
        }
      }
      return layoutItem
    })
  })

  return updatedLayouts
}
