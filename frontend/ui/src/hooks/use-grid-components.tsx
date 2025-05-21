"use client"

import { useState } from "react"
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

  const [lastRemovedComponent, setLastRemovedComponent] = useState<{
    component: ComponentSlot | null
    layouts: CustomLayouts | null
    isNested?: boolean
    parentId?: string
    nestedLayout?: Layout
  } | null>(null)

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

    // Store the removed component and its layout for potential undo
    setLastRemovedComponent({
      component: removedComponent,
      layouts: null,
      isNested: true,
      parentId: groupId,
      nestedLayout: removedNestedLayout,
    })

    // Remove the component from the grid components
    setGridComponents((prev) => prev.filter((comp) => comp.slotId !== slotId))

    // Update the layouts in the store
    setDefaultLayouts(updatedLayouts)

    // Show toast with undo option
    toast.error("Component removed", {
      description: `${removedComponent.title} has been removed.`,
      action: {
        label: "Undo",
        onClick: () => {
          if (
            lastRemovedComponent?.component &&
            lastRemovedComponent.isNested &&
            lastRemovedComponent.parentId &&
            lastRemovedComponent.nestedLayout
          ) {
            // Add the component back to the grid components
            setGridComponents((prev) => [...prev, lastRemovedComponent.component as ComponentSlot])

            // Get the current layouts
            const currentLayouts = useLayoutStore.getState().defaultLayouts
            const restoredLayouts = JSON.parse(JSON.stringify(currentLayouts)) as CustomLayouts

            // Add the nested layout back to the parent in each breakpoint
            Object.keys(restoredLayouts).forEach((breakpoint) => {
              const breakpointKey = breakpoint as keyof CustomLayouts

              // Find the parent grid item in this breakpoint
              const parentItemIndex = restoredLayouts[breakpointKey].findIndex(
                (item) => item.i === lastRemovedComponent?.parentId,
              )

              if (parentItemIndex !== -1) {
                const parentItem = restoredLayouts[breakpointKey][parentItemIndex] as LayoutItemWithNested

                // If the parent has nested layouts
                if (parentItem.layouts) {
                  // Add the nested layout back to the parent
                  const updatedNestedLayouts = [...parentItem.layouts, lastRemovedComponent.nestedLayout as Layout]

                  // Update the parent's nested layouts
                  restoredLayouts[breakpointKey][parentItemIndex] = {
                    ...parentItem,
                    layouts: updatedNestedLayouts,
                  }
                } else {
                  // If the parent doesn't have nested layouts, create a new array
                  restoredLayouts[breakpointKey][parentItemIndex] = {
                    ...parentItem,
                    layouts: [lastRemovedComponent.nestedLayout as Layout],
                  }
                }
              }
            })

            // Update the layouts in the store
            setDefaultLayouts(restoredLayouts)

            toast.success("Component restored", {
              description: `${lastRemovedComponent.component.title} has been restored.`,
            })

            setLastRemovedComponent(null)
          }
        },
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

    // Store the removed component and its layouts for potential undo
    setLastRemovedComponent({
      component,
      layouts: removedLayouts,
      isNested: false,
    })

    // Remove the component from the grid components
    setGridComponents((prev) => prev.filter((comp) => comp.slotId !== slotId))

    // Update the layouts in the store
    setDefaultLayouts(updatedLayouts)

    // Show toast with undo option
    toast.error("Component removed", {
      description: `${component.title} has been removed from your dashboard.`,
      action: {
        label: "Undo",
        onClick: () => {
          if (lastRemovedComponent?.component && lastRemovedComponent.layouts) {
            // Add the component back to the grid components
            setGridComponents((prev) => [...prev, lastRemovedComponent.component as ComponentSlot])

            // Get the current layouts
            const currentLayouts = useLayoutStore.getState().defaultLayouts
            const restoredLayouts = JSON.parse(JSON.stringify(currentLayouts)) as CustomLayouts

            // Add the layout items back to each breakpoint
            Object.keys(lastRemovedComponent.layouts).forEach((breakpoint) => {
              const breakpointKey = breakpoint as keyof CustomLayouts

              if (restoredLayouts[breakpointKey] && lastRemovedComponent.layouts?.[breakpointKey]) {
                const layoutItems = lastRemovedComponent.layouts[breakpointKey]

                if (layoutItems && layoutItems.length > 0) {
                  restoredLayouts[breakpointKey] = [...restoredLayouts[breakpointKey], ...layoutItems]
                }
              }
            })

            // Update the layouts in the store
            setDefaultLayouts(restoredLayouts)

            toast.success("Component restored", {
              description: `${lastRemovedComponent.component.title} has been restored to your dashboard.`,
            })

            setLastRemovedComponent(null)
          }
        },
      },
      duration: 5000,
    })
  }

  return {
    gridComponents,
    setGridComponents,
    lastRemovedComponent,
    setLastRemovedComponent,
    handleRemoveComponent,
    handleRemoveNestedComponent,
  }
}
