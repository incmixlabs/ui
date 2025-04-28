"use client"

import type React from "react"

import { useState } from "react"
import { Responsive, WidthProvider, type Layout as ReactGridLayoutLayout } from "react-grid-layout"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
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
import { initialLayouts } from "./data"
import { dashboardImg } from "./assets"
const ResponsiveGridLayout = WidthProvider(Responsive)

// Component types
interface ComponentSlot {
  slotId: string
  component: React.ReactNode
  title: string
  compImage?: string
}

// Layout item interface
interface LayoutItem {
  w: number
  h: number
  x: number
  y: number
  i: string
  moved?: boolean
  static?: boolean
  layout?: LayoutItem[] // For nested layouts
}

// Layouts interface
interface Layouts {
  lg: LayoutItem[]
  md: LayoutItem[]
  sm: LayoutItem[]
  xs: LayoutItem[]
  xxs: LayoutItem[]
}



export  function NestedGridLayout() {
  // Mock dashboard images

 

  // Initial layouts with nested components
  const [layouts, setLayouts] = useState<Layouts>(() => {
    const layoutsCopy = JSON.parse(JSON.stringify(initialLayouts))

    Object.keys(layoutsCopy).forEach((breakpoint) => {
      if (layoutsCopy[breakpoint].length >= 2) {
        layoutsCopy[breakpoint][0] = {
          ...layoutsCopy[breakpoint][0],
          i: `grid-${layoutsCopy[breakpoint][0].i}`,
          layout: [
            {
              w: layoutsCopy[breakpoint][0].w,
              h: layoutsCopy[breakpoint][0].h / 2,
              x: 0,
              y: 0,
              i: `0|grid-${layoutsCopy[breakpoint][0].i}`,
              moved: false,
              static: false,
            },
            {
              w: layoutsCopy[breakpoint][0].w,
              h: layoutsCopy[breakpoint][0].h / 2,
              x: 0,
              y: layoutsCopy[breakpoint][0].h / 2,
              i: `1|grid-${layoutsCopy[breakpoint][0].i}`,
              moved: false,
              static: false,
            },
          ],
        }

        // Add nested layout to second item
        layoutsCopy[breakpoint][1] = {
          ...layoutsCopy[breakpoint][1],
          i: `grid-${layoutsCopy[breakpoint][1].i}`,
          layout: [
            {
              w: layoutsCopy[breakpoint][1].w,
              h: layoutsCopy[breakpoint][1].h / 2,
              x: 0,
              y: 0,
              i: `0|grid-${layoutsCopy[breakpoint][1].i}`,
              moved: false,
              static: false,
            },
            {
              w: layoutsCopy[breakpoint][1].w,
              h: layoutsCopy[breakpoint][1].h / 2,
              x: 0,
              y: layoutsCopy[breakpoint][1].h / 2,
              i: `1|grid-${layoutsCopy[breakpoint][1].i}`,
              moved: false,
              static: false,
            },
          ],
        }
      }
    })

    return layoutsCopy
  })

  // Component slots - using the user's provided structure
  const [gridComponents, setGridComponents] = useState<ComponentSlot[]>([
    {
      slotId: "c",
      component: <ProjectWidgets2 />,
      title: "Project Widgets",
      compImage: dashboardImg?.ProjectImg,
    },
    {
      slotId: "d",
      component: <StatisticWidgets2 />,
      title: "Statistic Widgets",
      compImage: dashboardImg?.statisticsImg,
    },
    {
      slotId: "e",
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
    // Adding nested components for the first two grid items
    {
      slotId: "0|grid-a",
      component: <NewTasks />,
      title: "Nested New Tasks 1",
      compImage: dashboardImg?.newTaskImg,
    },
    {
      slotId: "1|grid-a",
      component: <TotalTasks />,
      title: "Nested New Tasks 2",
      compImage: dashboardImg?.newTaskImg,
    },
  
  ])

  // Function to render nested grid
  const renderNestedGrid = (item: LayoutItem, breakpoint: string) => {
    if (!item.layout) return null

    // Extract the original slotId from the grid item
    const originalSlotId = item.i.replace("grid-", "")

    // Find the component for the parent grid item
    const parentComponent = gridComponents.find((comp) => comp.slotId === originalSlotId)

    return (
      <div className="nested-grid-container w-full h-full">
        <div className="text-sm font-medium p-1 bg-gray-100 border-b">
          {parentComponent?.title || originalSlotId} - Nested Grid
        </div>
        <div className="nested-grid h-[calc(100%-28px)]">
          <ResponsiveGridLayout
            layouts={{ [breakpoint]: item.layout }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: item.w, md: item.w, sm: item.w, xs: item.w, xxs: item.w }}
            rowHeight={30}
            margin={[5, 5]}
            containerPadding={[0, 0]}
            isDraggable={true}
            isResizable={true}
            onDragStart={(layout, oldItem, newItem, placeholder, e) => {
              e.stopPropagation()
            }}
            className="layout"
          >
            {item.layout.map((nestedItem) => (
              <div key={nestedItem.i} className="border border-gray-200 rounded overflow-hidden">
                <div className="h-full overflow-auto">{findComponentBySlotId(nestedItem.i)}</div>
              </div>
            ))}
          </ResponsiveGridLayout>
        </div>
      </div>
    )
  }

  // Function to find component by slot ID
  const findComponentBySlotId = (slotId: string) => {
    // For nested components, we need to match the exact nested slotId
    const componentSlot = gridComponents.find((comp) => comp.slotId === slotId)

    if (componentSlot) {
      return (
        <div className="h-full">
          <div className="text-sm font-medium p-1 bg-gray-100 border-b">{componentSlot.title}</div>
          <div className="p-2 h-[calc(100%-28px)] overflow-auto">{componentSlot.component}</div>
        </div>
      )
    }

    // If we can't find an exact match, try to extract the base component ID
    // This handles cases where the nested component ID doesn't match exactly
    if (slotId.includes("|")) {
      const baseId = slotId.split("|")[1].replace("grid-", "")
      const baseComponent = gridComponents.find((comp) => comp.slotId === baseId)

      if (baseComponent) {
        return (
          <div className="h-full">
            <div className="text-sm font-medium p-1 bg-gray-100 border-b">Nested {baseComponent.title}</div>
            <div className="p-2 h-[calc(100%-28px)] overflow-auto">
              <div
                className="bg-opacity-70 p-2 rounded-lg h-full"
                style={{ backgroundColor: getColorForIndex(Number.parseInt(slotId.split("|")[0])) }}
              >
                Nested View of {baseComponent.title}
              </div>
            </div>
          </div>
        )
      }
    }

    return (
      <div className="flex items-center justify-center h-full bg-gray-50 text-gray-400">
        No component found for slot {slotId}
      </div>
    )
  }

  // Helper function to get a color based on index
  const getColorForIndex = (index: number) => {
    const colors = ["#BFDBFE", "#BBF7D0", "#FBCFE8", "#FEF3C7", "#E5E7EB"]
    return colors[index % colors.length]
  }

  // Handle layout change
  const onLayoutChange = (currentLayout: ReactGridLayoutLayout[], allLayouts: Layouts) => {
    // Create a deep copy of the new layouts
    const updatedLayouts = JSON.parse(JSON.stringify(allLayouts))

    // For each breakpoint in the layouts
    Object.keys(updatedLayouts).forEach((breakpoint) => {
      // For each item in the current breakpoint's layout
      updatedLayouts[breakpoint].forEach((item: LayoutItem, index: number) => {
        // Check if this was a nested grid item in the original layouts
        const originalItem = layouts[breakpoint]?.find((origItem) => origItem.i === item.i)

        // If it was a nested grid item, preserve its nested layout
        if (originalItem && originalItem.i.startsWith("grid-") && originalItem.layout) {
          updatedLayouts[breakpoint][index].layout = originalItem.layout
        }
      })
    })

    // Update the layouts state
    setLayouts(updatedLayouts)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard with Nested Grid Layout</h1>
      <div className="w-full h-[calc(100vh-100px)]">
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 14, md: 14, sm: 14, xs: 14, xxs: 14 }}
          rowHeight={30}
          margin={[10, 10]}
          onLayoutChange={onLayoutChange}
          isDraggable={true}
          isResizable={true}
        >
          {Object.keys(layouts).length > 0 &&
            layouts.lg.map((item) => (
              <div key={item.i} className="border border-gray-200 rounded shadow-sm overflow-hidden bg-white">
                {item.i.startsWith("grid-") ? (
                  renderNestedGrid(item, "lg")
                ) : (
                  <div className="h-full overflow-auto">{findComponentBySlotId(item.i)}</div>
                )}
              </div>
            ))}
        </ResponsiveGridLayout>
      </div>
    </div>
  )
  }

