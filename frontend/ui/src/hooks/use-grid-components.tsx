"use client"

import { useState, useRef } from "react"
import { toast, useLayoutStore } from "@incmix/ui"
import type { ComponentSlot, CustomLayouts, LayoutItemWithNested } from "@incmix/ui/dashboard"
// Import Layout from @incmix/react-grid-layout
import type { Layout } from "@incmix/react-grid-layout"
import {
  ActiveTask,
  NewTasks,
  PostingTask,
  ProjectWidgets2,
  StatisticWidgets2,
  TotalProject,
  TotalTasks,
  UserPanelOverview,
} from "@incmix/ui/widgets"

import { dashboardImg } from "@incmix/ui/dashboard"

// Define a type for the removal history
interface RemovalHistoryItem {
  id: string
  timestamp: number
  component: ComponentSlot
  layouts: CustomLayouts | null
  isNested: boolean
  parentId?: string
  nestedLayout?: Layout
}

export function useGridComponents(isEditing: boolean) {
  const { setDefaultLayouts, handleNestedLayoutChange, defaultLayouts } = useLayoutStore()

  const [gridComponents, setGridComponents] = useState<ComponentSlot[]>([
    {
      slotId: "c",
      component: <ProjectWidgets2 />,
      title: "Project Widgets",
      compImage: dashboardImg?.ProjectImg,
    },
    {
      slotId: "grid-b|0",
      component: <StatisticWidgets2 />,
      title: "Statistic Widgets",
      compImage: dashboardImg?.statisticsImg,
    },
    {
      slotId: "grid-b|1",
      component: <ActiveTask />,
      compImage: dashboardImg?.activeTaskImg,
      title: "Active Task",
    },
    {
      slotId: "f",
      component: <TotalProject />,
      compImage: dashboardImg?.totalProjectImg,
      title: "Total Project",
    },
    {
      slotId: "g",
      component: <PostingTask />,
      title: "Posting Task",
      compImage: dashboardImg?.postingTaskImg,
    },
    {
      slotId: "h",
      component: <UserPanelOverview />,
      title: "User Panel Overview",
      compImage: dashboardImg?.postingTaskImg,
    },
    {
      slotId: "grid-a|0",
      component: <NewTasks />,
      title: "Nested New Tasks 1",
      compImage: dashboardImg?.newTaskImg,
    },
    {
      slotId: "grid-a|1",
      component: <TotalTasks />,
      title: "Nested New Tasks 2",
      compImage: dashboardImg?.newTaskImg,
    },
  ])

  // Use a ref to store removal history instead of state
  // This avoids closure issues with the toast's action callback
  const removalHistoryRef = useRef<RemovalHistoryItem[]>([])

  /**
   * Handles undoing the removal of a component
   * @param removalId The ID of the removal to undo
   */
  const handleUndo = (removalId: string) => {
    console.log(`Attempting to undo removal with ID: ${removalId}`)
    console.log("Current removal history:", removalHistoryRef.current)

    // Find the removal in the history
    const removalIndex = removalHistoryRef.current.findIndex((item) => item.id === removalId)
    if (removalIndex === -1) {
      console.error(`Removal with ID ${removalId} not found in history`)
      return
    }

    // Get the removal item
    const removalItem = removalHistoryRef.current[removalIndex]
    console.log("Found removal item:", removalItem)

    // Add the component back to the grid components
    setGridComponents((prev) => {
      // Check if the component already exists
      const exists = prev.some((comp) => comp.slotId === removalItem.component.slotId)
      if (exists) {
        console.log(`Component ${removalItem.component.slotId} already exists, not adding again`)
        return prev
      }
      return [...prev, removalItem.component]
    })

    // Get the current layouts
    const currentLayouts = useLayoutStore.getState().defaultLayouts
    const restoredLayouts = JSON.parse(JSON.stringify(currentLayouts)) as CustomLayouts

    if (removalItem.isNested && removalItem.parentId && removalItem.nestedLayout) {
      // Restore a nested component
      console.log(`Restoring nested component ${removalItem.component.slotId} to parent ${removalItem.parentId}`)

      // Add the nested layout back to the parent in each breakpoint
      Object.keys(restoredLayouts).forEach((breakpoint) => {
        const breakpointKey = breakpoint as keyof CustomLayouts

        // Find the parent grid item in this breakpoint
        const parentItemIndex = restoredLayouts[breakpointKey].findIndex((item) => item.i === removalItem.parentId)

        if (parentItemIndex !== -1) {
          const parentItem = restoredLayouts[breakpointKey][parentItemIndex] as LayoutItemWithNested

          // If the parent has nested layouts
          if (parentItem.layouts) {
            // Check if the nested layout already exists
            const nestedExists = parentItem.layouts.some((item) => item.i === removalItem.nestedLayout?.i)
            if (!nestedExists) {
              // Add the nested layout back to the parent
              const updatedNestedLayouts = [...parentItem.layouts, removalItem.nestedLayout as Layout]

              // Update the parent's nested layouts
              restoredLayouts[breakpointKey][parentItemIndex] = {
                ...parentItem,
                layouts: updatedNestedLayouts,
              }
            }
          } else {
            // If the parent doesn't have nested layouts, create a new array
            restoredLayouts[breakpointKey][parentItemIndex] = {
              ...parentItem,
              layouts: [removalItem.nestedLayout as Layout],
            }
          }
        }
      })
    } else if (!removalItem.isNested && removalItem.layouts) {
      // Restore a main component
      console.log(`Restoring main component ${removalItem.component.slotId}`)

      // Add the layout items back to each breakpoint
      Object.keys(removalItem.layouts).forEach((breakpoint) => {
        const breakpointKey = breakpoint as keyof CustomLayouts

        if (restoredLayouts[breakpointKey] && removalItem.layouts?.[breakpointKey]) {
          const layoutItems = removalItem.layouts[breakpointKey]

          if (layoutItems && layoutItems.length > 0) {
            // Check if any of the layout items already exist
            layoutItems.forEach((layoutItem) => {
              const exists = restoredLayouts[breakpointKey].some((item) => item.i === layoutItem.i)
              if (!exists) {
                restoredLayouts[breakpointKey].push(layoutItem)
              }
            })
          }
        }
      })
    }

    // Update the layouts in the store
    setDefaultLayouts(restoredLayouts)

    // Remove the item from the history
    removalHistoryRef.current.splice(removalIndex, 1)

    toast.success("Component restored", {
      description: `${removalItem.component.title} has been restored.`,
    })
  }

  /**
   * Handles removing a nested component from a parent grid item
   */
  const handleRemoveNestedComponent = (slotId: string, groupId?: string) => {
    if (!isEditing) {
      toast.error("Editing mode is disabled. Please enable editing mode to remove components.")
      return
    }

    if (!groupId) {
      console.error("Group ID is required for removing nested components")
      return
    }

    // Get the current layouts from the store
    const currentLayouts = useLayoutStore.getState().defaultLayouts

    // Create a deep copy to avoid reference issues
    const updatedLayouts = JSON.parse(JSON.stringify(currentLayouts)) as CustomLayouts

    // Find the component to remove
    const removedComponent = gridComponents.find((comp) => comp.slotId === slotId)
    if (!removedComponent) {
      console.error(`Component with ID ${slotId} not found`)
      return
    }

    // Find the parent grid item and the nested layout to remove in each breakpoint
    let removedNestedLayout: Layout | undefined

    // Process each breakpoint
    Object.keys(updatedLayouts).forEach((breakpoint) => {
      const breakpointKey = breakpoint as keyof CustomLayouts

      // Find the parent grid item in this breakpoint
      const parentItemIndex = updatedLayouts[breakpointKey].findIndex((item) => item.i === groupId)

      if (parentItemIndex !== -1) {
        const parentItem = updatedLayouts[breakpointKey][parentItemIndex] as LayoutItemWithNested

        // If the parent has nested layouts
        if (parentItem.layouts && parentItem.layouts.length > 0) {
          // Find the nested layout to remove
          const nestedItemIndex = parentItem.layouts.findIndex((item) => item.i === slotId)

          if (nestedItemIndex !== -1) {
            // Store the removed layout for potential undo (only once)
            if (!removedNestedLayout) {
              removedNestedLayout = { ...parentItem.layouts[nestedItemIndex] }
            }

            // Remove the nested layout from the parent
            const updatedNestedLayouts = [...parentItem.layouts]
            updatedNestedLayouts.splice(nestedItemIndex, 1)

            // Update the parent's nested layouts
            updatedLayouts[breakpointKey][parentItemIndex] = {
              ...parentItem,
              layouts: updatedNestedLayouts,
            }
          }
        }
      }
    })

    // If we didn't find the nested layout to remove, show an error
    if (!removedNestedLayout) {
      console.error(`Nested layout with ID ${slotId} not found in parent ${groupId}`)
      return
    }

    // Generate a unique ID for this removal
    const removalId = `nested-${slotId}-${Date.now()}`

    // Add the removal to the history
    removalHistoryRef.current.push({
      id: removalId,
      timestamp: Date.now(),
      component: removedComponent,
      layouts: null,
      isNested: true,
      parentId: groupId,
      nestedLayout: removedNestedLayout,
    })

    // Log the current history for debugging
    console.log("After adding nested removal - History:", removalHistoryRef.current)

    // Remove the component from the grid components
    setGridComponents((prev) => prev.filter((comp) => comp.slotId !== slotId))

    // Update the layouts in the store
    setDefaultLayouts(updatedLayouts)

    // Show toast with undo option
    toast.error("Component removed", {
      description: `${removedComponent.title} has been removed.`,
      action: {
        label: "Undo",
        onClick: () => handleUndo(removalId),
      },
      duration: 5000,
    })
  }

  /**
   * Handles removing a main component from the layout
   */
  const handleRemoveComponent = (slotId: string) => {
    if (!isEditing) {
      toast.error("Editing mode is disabled. Please enable editing mode to remove components.")
      return
    }

    // Get the current layouts from the store
    const currentLayouts = useLayoutStore.getState().defaultLayouts

    // Create a deep copy to avoid reference issues
    const updatedLayouts = JSON.parse(JSON.stringify(currentLayouts)) as CustomLayouts

    // Find the component to remove
    const component = gridComponents.find((comp) => comp.slotId === slotId)
    if (!component) {
      console.error(`Component with ID ${slotId} not found`)
      return
    }

    // Create a copy of the layouts that will be removed (for undo)
    const removedLayouts: CustomLayouts = {} as CustomLayouts

    // Process each breakpoint
    Object.keys(updatedLayouts).forEach((breakpoint) => {
      const breakpointKey = breakpoint as keyof CustomLayouts

      // Find the layout item to remove in this breakpoint
      const itemIndex = updatedLayouts[breakpointKey].findIndex((item) => item.i === slotId)

      if (itemIndex !== -1) {
        // Store the removed layout for potential undo
        if (!removedLayouts[breakpointKey]) {
          removedLayouts[breakpointKey] = []
        }
        removedLayouts[breakpointKey].push({ ...updatedLayouts[breakpointKey][itemIndex] })

        // Remove the layout item from this breakpoint
        updatedLayouts[breakpointKey].splice(itemIndex, 1)
      }
    })

    // Generate a unique ID for this removal
    const removalId = `main-${slotId}-${Date.now()}`

    // Add the removal to the history
    removalHistoryRef.current.push({
      id: removalId,
      timestamp: Date.now(),
      component,
      layouts: removedLayouts,
      isNested: false,
    })

    // Log the current history for debugging
    console.log("After adding main removal - History:", removalHistoryRef.current)

    // Remove the component from the grid components
    setGridComponents((prev) => prev.filter((comp) => comp.slotId !== slotId))

    // Update the layouts in the store
    setDefaultLayouts(updatedLayouts)

    // Show toast with undo option
    toast.error("Component removed", {
      description: `${component.title} has been removed from your dashboard.`,
      action: {
        label: "Undo",
        onClick: () => handleUndo(removalId),
      },
      duration: 5000,
    })
  }

  return {
    gridComponents,
    setGridComponents,
    handleRemoveComponent,
    handleRemoveNestedComponent,
  }
}
