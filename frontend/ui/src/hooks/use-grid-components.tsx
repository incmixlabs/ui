
import type React from "react"

import { useState } from "react"
import { toast, useLayoutStore } from "@incmix/ui"
import type { ComponentSlot, Breakpoint, ResponsiveLayout, LayoutItem } from "@incmix/ui/dashboard"
import type { Layout } from "react-grid-layout"
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
  const { setDefaultLayouts, setNestedLayouts } = useLayoutStore()
  
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
    layouts: Record<Breakpoint, LayoutItem[]>
  } | null>(null)

  const handleRemoveNestedComponent = (slotId: string, groupId?: string) => {
    if (!isEditing) {
      toast.error("Editing mode is disabled. Please enable editing mode to remove components.")
      return
    }

    const nestedLayouts = useLayoutStore.getState().nestedLayouts
    
    if (groupId && nestedLayouts[groupId]) {
      const groupLayouts = nestedLayouts[groupId]
      const updatedGroupLayouts = groupLayouts.filter((item) => item.i !== slotId)

      const removedComponent = gridComponents.find((comp) => comp.slotId === slotId)
      if (!removedComponent) return

      const removedLayout = groupLayouts.find((item) => item.i === slotId)

      const layouts: Record<Breakpoint, LayoutItem[]> = {
        lg: [],
        md: [],
        sm: [],
        xs: [],
        xxs: [],
      }

      const removedData = {
        component: removedComponent,
        layouts,
        _groupId: groupId,
        _nestedLayout: removedLayout,
      }

      setNestedLayouts({
        ...nestedLayouts,
        [groupId]: updatedGroupLayouts,
      })
      
      setGridComponents((prev) => prev.filter((comp) => comp.slotId !== slotId))
      setLastRemovedComponent(removedData)

      toast.error("Component removed", {
        description: `${removedComponent.title} has been removed.`,
        action: {
          label: "Undo",
          onClick: () => {
            if (removedData?.component && removedData._nestedLayout && removedData._groupId) {
              setGridComponents((prev) => [...prev, removedData.component])
              
              // Get the current state again to ensure we have the latest
              const currentNestedLayouts = useLayoutStore.getState().nestedLayouts
              setNestedLayouts({
                ...currentNestedLayouts,
                [removedData._groupId]: [...currentNestedLayouts[removedData._groupId], removedData._nestedLayout as Layout],
              })

              toast.success("Component restored", {
                description: `${removedData.component.title} has been restored.`,
              })

              setLastRemovedComponent(null)
            }
          },
        },
        duration: 5000,
      })

      return 
    }
  }

  const handleRemoveComponent = (slotId: string) => {
    if (!isEditing) {
      toast.error("Editing mode is disabled. Please enable editing mode to remove components.")
      return
    }

    // Get the current defaultLayouts from the store
    const defaultLayouts = useLayoutStore.getState().defaultLayouts
    
    const component = gridComponents.find((comp) => comp.slotId === slotId)
    if (!component) return

    const removedLayouts: ResponsiveLayout = {} as ResponsiveLayout
    Object.keys(defaultLayouts).forEach((breakpoint) => {
      const layoutItem = defaultLayouts[breakpoint as Breakpoint].find((item) => item.i === slotId)
      removedLayouts[breakpoint as Breakpoint] = layoutItem ? [layoutItem] : []
    })

    const removedComponent = {
      component,
      layouts: removedLayouts,
    }

    const updatedComponents = gridComponents.filter((comp) => comp.slotId !== slotId)
    setGridComponents(updatedComponents)

    const updatedLayouts = { ...defaultLayouts }
    Object.keys(updatedLayouts).forEach((breakpoint) => {
      updatedLayouts[breakpoint as Breakpoint] = updatedLayouts[breakpoint as Breakpoint].filter(
        (item) => item.i !== slotId,
      )
    })

    // Update state using the store
    setDefaultLayouts(updatedLayouts)
    setLastRemovedComponent(removedComponent)

    toast.error("Component removed", {
      description: `${component.title} has been removed from your dashboard.`,
      action: {
        label: "Undo",
        onClick: () => {
          if (removedComponent?.component) {
            setGridComponents((prev) => [...prev, removedComponent.component])

            const currentDefaultLayouts = useLayoutStore.getState().defaultLayouts
            const restoredLayouts = { ...currentDefaultLayouts }
            Object.keys(removedComponent.layouts).forEach((breakpoint) => {
              const layoutItems = removedComponent.layouts[breakpoint as Breakpoint]
              if (layoutItems && layoutItems.length > 0) {
                restoredLayouts[breakpoint as Breakpoint] = [
                  ...restoredLayouts[breakpoint as Breakpoint],
                  ...layoutItems,
                ]
              }
            })

            setDefaultLayouts(restoredLayouts)

            toast.success("Component restored", {
              description: `${removedComponent.component.title} has been restored to your dashboard.`,
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