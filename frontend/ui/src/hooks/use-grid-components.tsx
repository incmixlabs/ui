
import { useState, useRef, useCallback } from "react"
import { toast, useLayoutStore } from "@incmix/ui"
import type { ComponentSlot, CustomLayouts, LayoutItemWithNested } from "@incmix/ui/dashboard"
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
  component: ComponentSlot | null
  layouts: CustomLayouts | null
  isNested: boolean
  parentId?: string
  nestedLayout?: Layout
  isGroup?: boolean
  nestedComponents?: ComponentSlot[]
  slotId: string
}

export function useGridComponents(isEditing: boolean) {
  const { setDefaultLayouts, handleNestedLayoutChange, defaultLayouts, addNewGroup } = useLayoutStore()

  const [gridComponents, setGridComponents] = useState<ComponentSlot[]>([
    {
      slotId: "c",
      component: <ProjectWidgets2 />,
      title: "Project Widgets",
      componentName: "project-widget",
      compImage: dashboardImg?.ProjectImg,
    },
    {
      slotId: "grid-b|0",
      component: <StatisticWidgets2 />,
      title: "Statistic Widgets",
      componentName: "statistic-widget",
      compImage: dashboardImg?.statisticsImg,
    },
    {
      slotId: "grid-b|1",
      component: <ActiveTask />,
      title: "Active Task",
      componentName: "active-task",
      compImage: dashboardImg?.activeTaskImg,
    },
    {
      slotId: "f",
      component: <TotalProject />,
      componentName: "total-project",
      compImage: dashboardImg?.totalProjectImg,
      title: "Total Project",
    },
    {
      slotId: "g",
      component: <PostingTask />,
      title: "Posting Task",
      componentName: "posting-task",
      compImage: dashboardImg?.postingTaskImg,
    },
    {
      slotId: "h",
      component: <UserPanelOverview />,
      title: "User Panel Overview",
      componentName: "user-panel-overview",
      compImage: dashboardImg?.postingTaskImg,
    },
    {
      slotId: "grid-a|0",
      component: <NewTasks />,
      title: "Nested New Tasks 1",
      componentName: "new-tasks",
      compImage: dashboardImg?.newTaskImg,
    },
    {
      slotId: "grid-a|1",
      component: <TotalTasks />,
      title: "Nested New Tasks 2",
      componentName: "total-tasks",
      compImage: dashboardImg?.newTaskImg,
    },
  ])

  // Use a ref to store removal history instead of state
  const removalHistoryRef = useRef<RemovalHistoryItem[]>([])

  /**
   * Handles undoing the removal of a component, group, or nested component
   * @param removalId The ID of the removal to undo
   */
  const handleUndo = useCallback(
    (removalId: string) => {
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

      // Get the current layouts
      const currentLayouts = useLayoutStore.getState().defaultLayouts
      const restoredLayouts = JSON.parse(JSON.stringify(currentLayouts)) as CustomLayouts

      if (removalItem.isNested && removalItem.parentId && removalItem.nestedLayout) {
        // Restore a nested component
        console.log(`Restoring nested component ${removalItem.slotId} to parent ${removalItem.parentId}`)

        // Add the component back to the grid components if it exists
        if (removalItem.component) {
          setGridComponents((prev) => {
            // Check if the component already exists
            const exists = prev.some((comp) => comp.slotId === removalItem.slotId)
            if (exists) {
              console.log(`Component ${removalItem.slotId} already exists, not adding again`)
              return prev
            }
            return [...prev, removalItem.component]
          })
        }

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
      } else if (removalItem.isGroup && removalItem.layouts) {
        // Restore a group and all its nested components
        console.log(
          `Restoring group ${removalItem.slotId} with ${
            removalItem.nestedComponents ? removalItem.nestedComponents.length : 0
          } nested components`,
        )

        // Add all components back to the grid components
        setGridComponents((prev) => {
          const componentsToAdd: ComponentSlot[] = []

          // Add the main component if it exists
          if (removalItem.component && !prev.some((comp) => comp.slotId === removalItem.component?.slotId)) {
            componentsToAdd.push(removalItem.component)
          }

          // Add all nested components
          if (removalItem.nestedComponents) {
            removalItem.nestedComponents.forEach((nestedComp) => {
              if (!prev.some((comp) => comp.slotId === nestedComp.slotId)) {
                componentsToAdd.push(nestedComp)
              }
            })
          }

          return [...prev, ...componentsToAdd]
        })

        // Add the layout items back to each breakpoint
        Object.keys(removalItem.layouts).forEach((breakpoint) => {
          const breakpointKey = breakpoint as keyof CustomLayouts

          if (restoredLayouts[breakpointKey] && removalItem.layouts?.[breakpointKey]) {
            const layoutItems = removalItem.layouts[breakpointKey]

            if (layoutItems && layoutItems.length > 0) {
              // Add each layout item back to the breakpoint
              layoutItems.forEach((layoutItem) => {
                const exists = restoredLayouts[breakpointKey].some((item) => item.i === layoutItem.i)
                if (!exists) {
                  restoredLayouts[breakpointKey].push(layoutItem)
                }
              })
            }
          }
        })
      } else if (!removalItem.isNested && removalItem.layouts) {
        // Restore a main component
        console.log(`Restoring main component ${removalItem.slotId}`)

        // Add the component back to the grid components if it exists
        if (removalItem.component) {
          setGridComponents((prev) => {
            // Check if the component already exists
            const exists = prev.some((comp) => comp.slotId === removalItem.slotId)
            if (exists) {
              console.log(`Component ${removalItem.slotId} already exists, not adding again`)
              return prev
            }
            return [...prev, removalItem.component]
          })
        }

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

      toast.success(removalItem.isGroup ? "Group restored" : "Component restored", {
        description: removalItem.isGroup
          ? `Group "${
              removalItem.component?.title || removalItem.slotId
            }" and its nested components have been restored.`
          : `${removalItem.component?.title || removalItem.slotId} has been restored.`,
      })
    },
    [setDefaultLayouts],
  )

  /**
   * Handles removing a nested component from a parent grid item
   */
  const handleRemoveNestedComponent = useCallback(
    (slotId: string, groupId?: string) => {
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
        component: removedComponent || null,
        layouts: null,
        isNested: true,
        parentId: groupId,
        nestedLayout: removedNestedLayout,
        slotId,
      })

      // Log the current history for debugging
      console.log("After adding nested removal - History:", removalHistoryRef.current)

      // Remove the component from the grid components
      setGridComponents((prev) => prev.filter((comp) => comp.slotId !== slotId))

      // Update the layouts in the store
      setDefaultLayouts(updatedLayouts)

      // Show toast with undo option
      toast.error("Component removed", {
        description: `${removedComponent?.title || slotId} has been removed.`,
        action: {
          label: "Undo",
          onClick: () => handleUndo(removalId),
        },
        duration: 5000,
      })
    },
    [gridComponents, isEditing, setDefaultLayouts, handleUndo],
  )

  /**
   * Handles removing a component or an entire group from the layout
   */
  const handleRemoveComponent = useCallback(
    (slotId: string) => {
      if (!isEditing) {
        toast.error("Editing mode is disabled. Please enable editing mode to remove components.")
        return
      }

      console.log(`Removing component/group with ID: ${slotId}`)

      // Get the current layouts from the store
      const currentLayouts = useLayoutStore.getState().defaultLayouts

      // Create a deep copy to avoid reference issues
      const updatedLayouts = JSON.parse(JSON.stringify(currentLayouts)) as CustomLayouts

      // Find the component to remove
      const component = gridComponents.find((comp) => comp.slotId === slotId)

      // Check if this is a group (starts with "grid-")
      const isGroup = slotId.startsWith("grid-")
      console.log(`Is this a group? ${isGroup}`)

      // Create a copy of the layouts that will be removed (for undo)
      const removedLayouts: CustomLayouts = {} as CustomLayouts

      // Components to be removed (the main component and any nested components if it's a group)
      const componentsToRemove: ComponentSlot[] = component ? [component] : []
      const nestedComponents: ComponentSlot[] = []

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

          const itemToRemove = updatedLayouts[breakpointKey][itemIndex]
          removedLayouts[breakpointKey].push({ ...itemToRemove })

          // If this is a group, collect all nested components to remove
          if (isGroup && itemToRemove.layouts && itemToRemove.layouts.length > 0) {
            console.log(`Group has ${itemToRemove.layouts.length} nested layouts`)

            // Find all nested components associated with this group
            itemToRemove.layouts.forEach((nestedItem) => {
              const nestedComponent = gridComponents.find((comp) => comp.slotId === nestedItem.i)
              if (nestedComponent) {
                componentsToRemove.push(nestedComponent)
                nestedComponents.push(nestedComponent)
                console.log(`Found nested component: ${nestedComponent.slotId}`)
              }
            })
          }

          // Remove the layout item from this breakpoint
          updatedLayouts[breakpointKey].splice(itemIndex, 1)
        }
      })

      // Generate a unique ID for this removal
      const removalId = `${isGroup ? "group" : "main"}-${slotId}-${Date.now()}`

      // Add the removal to the history
      removalHistoryRef.current.push({
        id: removalId,
        timestamp: Date.now(),
        component: component || null,
        layouts: removedLayouts,
        isNested: false,
        isGroup,
        nestedComponents,
        slotId,
      })

      // Log the current history for debugging
      console.log("After adding removal - History:", removalHistoryRef.current)
      console.log(`Components to remove: ${componentsToRemove.map((c) => c.slotId).join(", ")}`)

      // Remove all components from the grid components
      setGridComponents((prev) => {
        const filtered = prev.filter((comp) => !componentsToRemove.some((c) => c.slotId === comp.slotId))
        console.log(`Removed ${prev.length - filtered.length} components`)
        return filtered
      })

      // Update the layouts in the store
      setDefaultLayouts(updatedLayouts)

      // Show toast with undo option
      toast.error(isGroup ? "Group removed" : "Component removed", {
        description: isGroup
          ? `Group "${component?.title || slotId}" and its ${nestedComponents.length} nested components have been removed.`
          : `${component?.title || slotId} has been removed from your dashboard.`,
        action: {
          label: "Undo",
          onClick: () => handleUndo(removalId),
        },
        duration: 5000,
      })
    },
    [gridComponents, isEditing, setDefaultLayouts, handleUndo],
  )

  /**
   * Adds a new group with default components at the top of the dashboard
   */
  const handleAddNewGroup = useCallback(() => {
    console.log("Adding new group with default components at the top")

    // Add the new group to layouts and get its ID
    const newGroupId = addNewGroup()
    console.log(`New group ID: ${newGroupId}`)

    // Create components for the nested layouts
    const newComponents: ComponentSlot[] = [
      {
        slotId: `${newGroupId}|0`,
        component: <NewTasks />,
        title: "New Tasks",
        componentName: "new-tasks",  
        compImage: dashboardImg?.newTaskImg,
      },
      {
        slotId: `${newGroupId}|1`,
        component: <TotalTasks />,
        title: "Total Tasks",
        componentName: "total-tasks",
        compImage: dashboardImg?.newTaskImg,
      },
    ]

    console.log("Adding new components:", newComponents)

    // Add the new components to gridComponents
    setGridComponents((prev) => {
      const updated = [...prev, ...newComponents]
      console.log("Updated gridComponents:", updated)
      return updated
    })

    toast.success("New group added", {
      description: "A new group has been added to the top of your dashboard.",
    })

    return newGroupId
  }, [addNewGroup])

  return {
    gridComponents,
    setGridComponents,
    handleRemoveComponent,
    handleRemoveNestedComponent,
    handleAddNewGroup,
  }
}
