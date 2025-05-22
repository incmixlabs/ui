import type { CustomLayouts, Breakpoint, LayoutItemWithNested } from "@incmix/ui/dashboard"
import type { Layout } from "@incmix/react-grid-layout"

/**
 * Gets the next available group ID based on existing groups
 */
export function getNextGroupId(layouts: CustomLayouts): string {
  const existingGroups = new Set<string>()

  if (layouts.lg) {
    layouts.lg.forEach((item) => {
      if (item.i.startsWith("grid-")) {
        existingGroups.add(item.i)
      }
    })
  }

  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  for (let i = 0; i < alphabet.length; i++) {
    const groupId = `grid-${alphabet[i]}`
    if (!existingGroups.has(groupId)) {
      return groupId
    }
  }

  let counter = 1
  while (true) {
    const groupId = `grid-${counter}`
    if (!existingGroups.has(groupId)) {
      return groupId
    }
    counter++
  }
}

/**
 * Creates default nested layouts for a new group
 */
export function createDefaultNestedLayouts(groupId: string): Layout[] {
  return [
    {
      w: 6,
      h: 12,
      x: 0,
      y: 0,
      i: `${groupId}|0`,
      moved: false,
      static: false,
    },
    {
      w: 6,
      h: 12,
      x: 6,
      y: 0,
      i: `${groupId}|1`,
      moved: false,
      static: false,
    },
  ]
}

/**
 * Creates a new group layout item with default nested layouts
 */
export function createNewGroup(groupId: string, x: number, y: number, w = 8, h = 13): LayoutItemWithNested {
  return {
    i: groupId,
    x,
    y,
    w,
    h,
    moved: false,
    static: false,
    layouts: createDefaultNestedLayouts(groupId),
  }
}

/**
 * Calculates the position for a new group at the top of the layout
 */
export function calculateGroupPosition(): { x: number; y: number } {
  return { x: 0, y: 0 }
}

/**
 * Shifts all existing items down to make room for a new group at the top
 */
export function shiftItemsDown(layouts: Layout[], height: number): Layout[] {
  return layouts.map((item) => ({
    ...item,
    y: item.y + height,
  }))
}

/**
 * Adds a new group to all breakpoints in the layouts at the top
 */
export function addGroupToLayouts(layouts: CustomLayouts, groupId: string): CustomLayouts {
  const updatedLayouts = JSON.parse(JSON.stringify(layouts)) as CustomLayouts

  Object.keys(updatedLayouts).forEach((breakpoint) => {
    const breakpointKey = breakpoint as Breakpoint
    const breakpointLayouts = updatedLayouts[breakpointKey]

    const { x, y } = calculateGroupPosition()

    let w = 8
    let h = 13

    if (breakpointKey === "lg" || breakpointKey === "md") {
      w = 8
      h = 13
    } else if (breakpointKey === "sm") {
      w = 6
      h = 13
    } else {
      w = 4
      h = 13
    }

    const shiftedLayouts = shiftItemsDown(breakpointLayouts, h)

    const newGroup = createNewGroup(groupId, x, y, w, h)
    updatedLayouts[breakpointKey] = [newGroup, ...shiftedLayouts]
  })

  return updatedLayouts
}


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
        if (item.layouts && item.layouts.length > 0) {
          item.layouts.forEach((nestedItem, nestedIndex) => {
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
 * and preserves componentName in nested layouts
 */
export function ensureNestedLayoutsInAllBreakpoints(layouts: CustomLayouts): CustomLayouts {
  const itemsWithNestedLayouts = new Map<string, Layout[]>()

  const nestedComponentNames = new Map<string, string>()

  const breakpoints = Object.keys(layouts) as Breakpoint[]

  // First pass: collect all nested layouts and their componentNames
  breakpoints.forEach((breakpoint) => {
    layouts[breakpoint].forEach((item) => {
      if (item.i.startsWith("grid-") && item.layouts && item.layouts.length > 0) {
        if (!itemsWithNestedLayouts.has(item.i)) {
          itemsWithNestedLayouts.set(item.i, JSON.parse(JSON.stringify(item.layouts)))
        }

        // Store componentName for each nested layout item
        item.layouts.forEach((nestedItem) => {
          if (nestedItem.componentName) {
            nestedComponentNames.set(nestedItem.i, nestedItem.componentName)
          }
        })
      }
    })
  })

  // Now ensure all these items have nested layouts in all breakpoints
  const updatedLayouts = JSON.parse(JSON.stringify(layouts)) as CustomLayouts

  breakpoints.forEach((breakpoint) => {
    updatedLayouts[breakpoint] = updatedLayouts[breakpoint].map((item) => {
      if (item.i.startsWith("grid-") && itemsWithNestedLayouts.has(item.i)) {
        // If this item should have nested layouts but doesn't, add them
        if (!item.layouts || item.layouts.length === 0) {
          const nestedLayouts = itemsWithNestedLayouts.get(item.i) || []

          // Apply stored componentName to each nested layout item
          const updatedNestedLayouts = nestedLayouts.map((nestedItem) => {
            const componentName = nestedComponentNames.get(nestedItem.i)
            return componentName ? { ...nestedItem, componentName } : nestedItem
          })

          return {
            ...item,
            layouts: updatedNestedLayouts,
          }
        } else {
          // If it already has layouts, ensure each nested item has its componentName
          const updatedNestedLayouts = item.layouts.map((nestedItem) => {
            const componentName = nestedComponentNames.get(nestedItem.i)
            return componentName && !nestedItem.componentName ? { ...nestedItem, componentName } : nestedItem
          })

          return {
            ...item,
            layouts: updatedNestedLayouts,
          }
        }
      }
      return item
    })
  })

  return updatedLayouts
}


export function debugComponentNames(layouts: CustomLayouts | undefined, source: string): void {
  console.group(`Debug ComponentNames from ${source}`)

  if (!layouts) {
    console.error("Layouts is undefined")
    console.groupEnd()
    return
  }

  // Check each breakpoint
  Object.keys(layouts).forEach((breakpoint) => {
    const breakpointLayouts = layouts[breakpoint as keyof CustomLayouts]

    // Check each item in this breakpoint
    breakpointLayouts.forEach((item) => {
      console.log(`Item ${item.i}: componentName=${item.componentName || "undefined"}`)

      // Check nested layouts if they exist
      if (item.layouts && item.layouts.length > 0) {
        console.group(`Nested layouts for ${item.i}:`)
        item.layouts.forEach((nestedItem) => {
          console.log(`  Nested item ${nestedItem.i}: componentName=${nestedItem.componentName || "undefined"}`)
        })
        console.groupEnd()
      }
    })
  })

  console.groupEnd()
}