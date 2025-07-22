
import { useState, useRef, useCallback } from "react"
import { toast, useLayoutStore } from "@incmix/ui"
import type { ComponentSlot, CustomLayouts, LayoutItemWithNested } from "@incmix/ui/dashboard"
import type { Layout } from "@incmix/react-grid-layout"
import {
  ActiveTask,
  ActivityTimeline,
  BarStatisticWidgets,
  BatteryWidget,
  CalendarWidget,
  ClockWidget,
  DoneTasks,
  InProgressTask,
  LiveVisitors,
  MonthlyBudget,
  NewsWidget,
  NewTasks,
  NewTasksChart,
  PostingTask,
  ProjectListWidgets,
  ProjectTimelineWidgets,
  ProjectWidgets,
  RecentActivity,
  StatisticWidgets,
  SubscribersByCountries,
  TotalProject,
  TotalTasks,
  TotalTasksChart,
  UserProfile,
  WeatherWidget,
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
      slotId: "grid-a|0",
      component: <NewTasks />,
      title: "Nested New Tasks 1",
      componentName: "new-tasks",
    },
    {
      slotId: "grid-a|1",
      component: <TotalTasks />,
      title: "Nested New Tasks 2",
      componentName: "total-tasks",
    },
    {
      slotId: "grid-b|0",
      component: <StatisticWidgets />,
      title: "Statistic Widgets",
      componentName: "statistic-widget",
    },
    {
      slotId: "grid-b|1",
      component: <ActiveTask />,
      title: "Active Task",
      componentName: "active-task",
    },
    {
      slotId: "d",
      component: <ProjectTimelineWidgets />,
      title: "Project Timeline",
      componentName: "project-timeline",
    },
    {
      slotId: "c",
      component: <ProjectWidgets />,
      title: "Project Widgets",
      componentName: "project-widget",
    },
    {
      slotId: "f",
      component: <TotalProject />,
      componentName: "total-project",
      title: "Total Project",
    },
    {
      slotId: "g",
      component: <PostingTask />,
      title: "Posting Task",
      componentName: "posting-task",
    },
    {
      slotId: "usp",
      component: <UserProfile />,
      title: "User Profile",
      componentName: "user-profile",
    },
    {
      slotId: "o",
      component: <ProjectTimelineWidgets />,
      title: "Project Timeline",
      componentName: "project-timeline",
    },
    {
      slotId: "p",
      component: <NewTasksChart />,
      title: "New Tasks Chart",
      componentName: "new-tasks-chart",
    },
    {
      slotId: "q",
      component: <TotalTasksChart />,
      title: "Total Tasks Chart",
      componentName: "total-tasks-chart",
    },
    {
      slotId: "tp",
      component: <InProgressTask />,
      title: "Tasks In Progress",
      componentName: "tasks-in-progress",
    },
    {
      slotId: "s",
      component: <DoneTasks />,
      title: "Tasks Done",
      componentName: "tasks-done",
    },
    {
      slotId: "r",
      component: <ProjectListWidgets />,
      title: "Project List",
      componentName: "project-list",
    },
    {
      slotId: "cld",
      component: <CalendarWidget storageKey="calendar" />,
      title: "Calendar",
      componentName: "calendar",
    },
    {
      slotId: "st2",
      component: <BarStatisticWidgets />,
      title: "Statistics 2",
      componentName: "statistics2",
    },
    {
      slotId: "rc",
      component: <RecentActivity />,
      title: "Recent Activity",
      componentName: "recent-activity",
    },
    {
      slotId: "csbr",
      component: <SubscribersByCountries />,
      title: "Countries Subscriber",
      componentName: "countries-subscriber",
    },
    {
      slotId: "lv",
      component: <LiveVisitors />,
      title: "Live Visitor",
      componentName: "live-visitor",
    },
    {
      slotId: "mb",
      component: <MonthlyBudget />,
      title: "Monthly Budget",
      componentName: "monthly-budget",
    },
    {
      slotId: "act",
      component: <ActivityTimeline />,
      title: "Activity Timeline",
      componentName: "activity-timeline",
    },
    {
      slotId: "clk",
      component: <ClockWidget />,
      title: "Clock",
      componentName: "clock",
    },
    {
      slotId: "bat",
      component: <BatteryWidget />,
      title: "Battery",
      componentName: "battery",
    },
    {
      slotId: "wthr",
      component: <WeatherWidget />,
      title: "Weather",
      componentName: "weather",
    },
    {
      slotId: "nws",
      component: <NewsWidget />,
      title: "News",
      componentName: "news",
    },
  ]);
  

  // Use a ref to store removal history instead of state
  const removalHistoryRef = useRef<RemovalHistoryItem[]>([])

  /**
   * Handles undoing the removal of a component, group, or nested component
   * @param removalId The ID of the removal to undo
   */
  const handleUndo = useCallback(
    (removalId: string) => {
      const removalIndex = removalHistoryRef.current.findIndex((item) => item.id === removalId)
      if (removalIndex === -1) {
        console.error(`Removal with ID ${removalId} not found in history`)
        return
      }

      const removalItem = removalHistoryRef.current[removalIndex]

      const currentLayouts = useLayoutStore.getState().defaultLayouts
      const restoredLayouts = JSON.parse(JSON.stringify(currentLayouts)) as CustomLayouts

      if (removalItem.isNested && removalItem.parentId && removalItem.nestedLayout) {

        if (removalItem.component) {
          setGridComponents((prev) => {
            const exists = prev.some((comp) => comp.slotId === removalItem.slotId)
            if (exists) {
              return prev
            }
            return [...prev, removalItem.component]
          })
        }

        Object.keys(restoredLayouts).forEach((breakpoint) => {
          const breakpointKey = breakpoint as keyof CustomLayouts

          const parentItemIndex = restoredLayouts[breakpointKey].findIndex((item) => item.i === removalItem.parentId)

          if (parentItemIndex !== -1) {
            const parentItem = restoredLayouts[breakpointKey][parentItemIndex] as LayoutItemWithNested

            if (parentItem.layouts) {
              const nestedExists = parentItem.layouts.some((item) => item.i === removalItem.nestedLayout?.i)
              if (!nestedExists) {
                const updatedNestedLayouts = [...parentItem.layouts, removalItem.nestedLayout as Layout]

                restoredLayouts[breakpointKey][parentItemIndex] = {
                  ...parentItem,
                  layouts: updatedNestedLayouts,
                }
              }
            } else {
              restoredLayouts[breakpointKey][parentItemIndex] = {
                ...parentItem,
                layouts: [removalItem.nestedLayout as Layout],
              }
            }
          }
        })
      } else if (removalItem.isGroup && removalItem.layouts) {
        console.log(
          `Restoring group ${removalItem.slotId} with ${
            removalItem.nestedComponents ? removalItem.nestedComponents.length : 0
          } nested components`,
        )

        setGridComponents((prev) => {
          const componentsToAdd: ComponentSlot[] = []

          if (removalItem.component && !prev.some((comp) => comp.slotId === removalItem.component?.slotId)) {
            componentsToAdd.push(removalItem.component)
          }

          if (removalItem.nestedComponents) {
            removalItem.nestedComponents.forEach((nestedComp) => {
              if (!prev.some((comp) => comp.slotId === nestedComp.slotId)) {
                componentsToAdd.push(nestedComp)
              }
            })
          }

          return [...prev, ...componentsToAdd]
        })

        Object.keys(removalItem.layouts).forEach((breakpoint) => {
          const breakpointKey = breakpoint as keyof CustomLayouts

          if (restoredLayouts[breakpointKey] && removalItem.layouts?.[breakpointKey]) {
            const layoutItems = removalItem.layouts[breakpointKey]

            if (layoutItems && layoutItems.length > 0) {
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
        console.log(`Restoring main component ${removalItem.slotId}`)

        if (removalItem.component) {
          setGridComponents((prev) => {
            const exists = prev.some((comp) => comp.slotId === removalItem.slotId)
            if (exists) {
              console.log(`Component ${removalItem.slotId} already exists, not adding again`)
              return prev
            }
            return [...prev, removalItem.component]
          })
        }

        Object.keys(removalItem.layouts).forEach((breakpoint) => {
          const breakpointKey = breakpoint as keyof CustomLayouts

          if (restoredLayouts[breakpointKey] && removalItem.layouts?.[breakpointKey]) {
            const layoutItems = removalItem.layouts[breakpointKey]

            if (layoutItems && layoutItems.length > 0) {
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

      setDefaultLayouts(restoredLayouts)

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

      const currentLayouts = useLayoutStore.getState().defaultLayouts

      const updatedLayouts = JSON.parse(JSON.stringify(currentLayouts)) as CustomLayouts

      const removedComponent = gridComponents.find((comp) => comp.slotId === slotId)

      let removedNestedLayout: Layout | undefined

      Object.keys(updatedLayouts).forEach((breakpoint) => {
        const breakpointKey = breakpoint as keyof CustomLayouts

        const parentItemIndex = updatedLayouts[breakpointKey].findIndex((item) => item.i === groupId)

        if (parentItemIndex !== -1) {
          const parentItem = updatedLayouts[breakpointKey][parentItemIndex] as LayoutItemWithNested

          if (parentItem.layouts && parentItem.layouts.length > 0) {
            const nestedItemIndex = parentItem.layouts.findIndex((item) => item.i === slotId)

            if (nestedItemIndex !== -1) {
              if (!removedNestedLayout) {
                removedNestedLayout = { ...parentItem.layouts[nestedItemIndex] }
              }

              const updatedNestedLayouts = [...parentItem.layouts]
              updatedNestedLayouts.splice(nestedItemIndex, 1)

              updatedLayouts[breakpointKey][parentItemIndex] = {
                ...parentItem,
                layouts: updatedNestedLayouts,
              }
            }
          }
        }
      })

      if (!removedNestedLayout) {
        console.error(`Nested layout with ID ${slotId} not found in parent ${groupId}`)
        return
      }

      const removalId = `nested-${slotId}-${Date.now()}`

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


      setGridComponents((prev) => prev.filter((comp) => comp.slotId !== slotId))

      setDefaultLayouts(updatedLayouts)

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

      const currentLayouts = useLayoutStore.getState().defaultLayouts

      const updatedLayouts = JSON.parse(JSON.stringify(currentLayouts)) as CustomLayouts

      const component = gridComponents.find((comp) => comp.slotId === slotId)

      const isGroup = slotId.startsWith("grid-")

      const removedLayouts: CustomLayouts = {} as CustomLayouts

      const componentsToRemove: ComponentSlot[] = component ? [component] : []
      const nestedComponents: ComponentSlot[] = []

      Object.keys(updatedLayouts).forEach((breakpoint) => {
        const breakpointKey = breakpoint as keyof CustomLayouts

        const itemIndex = updatedLayouts[breakpointKey].findIndex((item) => item.i === slotId)

        if (itemIndex !== -1) {
          if (!removedLayouts[breakpointKey]) {
            removedLayouts[breakpointKey] = []
          }

          const itemToRemove = updatedLayouts[breakpointKey][itemIndex]
          removedLayouts[breakpointKey].push({ ...itemToRemove })

          if (isGroup && itemToRemove.layouts && itemToRemove.layouts.length > 0) {
            console.log(`Group has ${itemToRemove.layouts.length} nested layouts`)

            itemToRemove.layouts.forEach((nestedItem) => {
              const nestedComponent = gridComponents.find((comp) => comp.slotId === nestedItem.i)
              if (nestedComponent) {
                componentsToRemove.push(nestedComponent)
                nestedComponents.push(nestedComponent)
                console.log(`Found nested component: ${nestedComponent.slotId}`)
              }
            })
          }

          updatedLayouts[breakpointKey].splice(itemIndex, 1)
        }
      })

      const removalId = `${isGroup ? "group" : "main"}-${slotId}-${Date.now()}`

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


      setGridComponents((prev) => {
        const filtered = prev.filter((comp) => !componentsToRemove.some((c) => c.slotId === comp.slotId))
        console.log(`Removed ${prev.length - filtered.length} components`)
        return filtered
      })

      setDefaultLayouts(updatedLayouts)

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

    // Add the new group to layouts and get its ID
    const newGroupId = addNewGroup()

    const newComponents: ComponentSlot[] = [
      {
        slotId: `${newGroupId}|0`,
        component: <NewTasks />,
        title: "New Tasks",
        componentName: "new-tasks",  
        compImage: dashboardImg?.darkNewTaskImg,
      },
      {
        slotId: `${newGroupId}|1`,
        component: <TotalTasks />,
        title: "Total Tasks",
        componentName: "total-tasks",
        compImage: dashboardImg?.darkTotalTasksImg,
      },
    ]

    console.log("Adding new components:", newComponents)

    // Add the new components to gridComponents
    setGridComponents((prev) => {
      const updated = [...prev, ...newComponents]
      console.log("Updated gridComponents:", updated)
      return updated
    })
    // setDefaultLayouts(updatedLayouts)

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
