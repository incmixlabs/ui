"use client"

import type React from "react"

import { LoadingPage } from "@common"
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
} from "@dnd-kit/core"
import {
  ActiveTask,
  Box,
  DashboardSidebar,
  DroppableArea,
  IconButton,
  NewTasks,
  PostingTask,
  ProjectWidgets2,
  StatisticWidgets2,
  TotalProject,
  TotalTasks,
  createLayoutItemForAllBreakpoints,
  dashboardImg,
  sidebarComponents,
  toast,
} from "@incmix/ui"
import { Heading } from "@incmix/ui"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { useMemo, useState } from "react"
import { Responsive, WidthProvider } from "react-grid-layout"
import { useTranslation } from "react-i18next"
import { useAuth } from "../../auth"
import { EditWidgetsControl } from "./home"

import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import { useEditingStore } from "@incmix/store"
import { Trash } from "lucide-react"

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
type ResponsiveLayout = Record<Breakpoint, LayoutItem[]>

const ResponsiveGridLayout = WidthProvider(Responsive)

interface ComponentSlot {
  slotId: string
  component: React.ReactNode
  title: string
  compImage?: string
}

const DEFAULT_SIZES: Record<Breakpoint, { w: number; h: number }> = {
  lg: { w: 3, h: 6 },
  md: { w: 3, h: 6 },
  sm: { w: 3, h: 6 },
  xs: { w: 3, h: 6 },
  xxs: { w: 2, h: 6 },
}

const DashboardProject1: React.FC = () => {
  const { t } = useTranslation(["dashboard", "common"])
  const { authUser, isLoading } = useAuth()
  const { isEditing, setIsEditing } = useEditingStore()
  const [activeDragId, setActiveDragId] = useState<string | null>(null)
  const [activeDragData, setActiveDragData] = useState<any>(null)

  const [lastRemovedComponent, setLastRemovedComponent] = useState<{
    component: ComponentSlot | null
    layouts: Record<Breakpoint, LayoutItem[]>
  } | null>(null)

  const [gridComponents, setGridComponents] = useState<ComponentSlot[]>([
    {
      slotId: "a",
      component: <NewTasks />,
      compImage: dashboardImg?.newTaskImg,
      title: "New Tasks",
    },
    {
      slotId: "b",
      component: <TotalTasks />,
      title: "Total Tasks",
      compImage: dashboardImg?.totalTaskImg,
    },
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
  ])

  const [initialLayouts, _setInitialLayouts] = useState<ResponsiveLayout>({
    lg: [
      {
        w: 2,
        h: 6,
        x: 0,
        y: 0,
        i: "a",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 2,
        h: 6,
        x: 0,
        y: 6,
        i: "b",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 3,
        h: 12,
        x: 2,
        y: 0,
        i: "c",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 5,
        h: 12,
        x: 5,
        y: 0,
        i: "d",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 5,
        h: 12,
        x: 0,
        y: 12,
        i: "e",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 5,
        h: 12,
        x: 5,
        y: 12,
        i: "f",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 10,
        h: 13,
        x: 0,
        y: 24,
        i: "g",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
    ],
    md: [
      {
        w: 2,
        h: 6,
        x: 0,
        y: 6,
        i: "a",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 2,
        h: 6,
        x: 0,
        y: 0,
        i: "b",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 4,
        h: 12,
        x: 2,
        y: 0,
        i: "c",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 4,
        h: 12,
        x: 6,
        y: 0,
        i: "d",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 5,
        h: 12,
        x: 0,
        y: 12,
        i: "e",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 5,
        h: 12,
        x: 5,
        y: 12,
        i: "f",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 10,
        h: 13,
        x: 0,
        y: 24,
        i: "g",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
    ],
    sm: [
      {
        w: 2,
        h: 6,
        x: 0,
        y: 0,
        i: "a",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 2,
        h: 6,
        x: 4,
        y: 0,
        i: "b",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 6,
        h: 6,
        x: 0,
        y: 6,
        i: "c",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 6,
        h: 6,
        x: 0,
        y: 12,
        i: "d",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 6,
        h: 6,
        x: 0,
        y: 18,
        i: "e",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 6,
        h: 6,
        x: 0,
        y: 24,
        i: "f",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 6,
        h: 8,
        x: 0,
        y: 30,
        i: "g",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
    ],
    xs: [
      {
        w: 2,
        h: 6,
        x: 0,
        y: 0,
        i: "a",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 2,
        h: 6,
        x: 4,
        y: 0,
        i: "b",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 6,
        h: 6,
        x: 0,
        y: 6,
        i: "c",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 6,
        h: 6,
        x: 0,
        y: 12,
        i: "d",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 6,
        h: 6,
        x: 0,
        y: 18,
        i: "e",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 6,
        h: 6,
        x: 0,
        y: 24,
        i: "f",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 6,
        h: 8,
        x: 0,
        y: 30,
        i: "g",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
    ],
    xxs: [
      {
        w: 2,
        h: 6,
        x: 0,
        y: 0,
        i: "a",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 2,
        h: 6,
        x: 4,
        y: 0,
        i: "b",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 6,
        h: 6,
        x: 0,
        y: 6,
        i: "c",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 6,
        h: 6,
        x: 0,
        y: 12,
        i: "d",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 6,
        h: 6,
        x: 0,
        y: 18,
        i: "e",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 6,
        h: 6,
        x: 0,
        y: 24,
        i: "f",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
      {
        w: 6,
        h: 8,
        x: 0,
        y: 30,
        i: "g",
        moved: false,
        static: false,
        resizeHandles: ["s", "w", "e", "n"] as const,
      },
    ],
  })

  const [defaultLayouts, setDefaultLayouts] = useState(initialLayouts)

  const getLayoutsWithStaticFlag = useMemo(() => {
    const result = {} as ResponsiveLayout
    ;(Object.keys(defaultLayouts) as Breakpoint[]).forEach((breakpoint) => {
      if (Array.isArray(defaultLayouts[breakpoint])) {
        result[breakpoint] = defaultLayouts[breakpoint].map((item) => ({
          ...item,
          moved: false,
          static: !isEditing,
        }))
      }
    })

    return result
  }, [defaultLayouts, isEditing])

  const handleLayoutChange = (layout: any, allLayouts: any) => {
    console.log(layout, allLayouts)

    setDefaultLayouts(allLayouts)
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveDragId(active.id as string)
    setActiveDragData(active.data.current)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    setActiveDragId(null)
    setActiveDragData(null)

    if (!isEditing || !over || over.id !== "grid-layout") return

    const draggedSlotId = active.id as string
    const dragData = active.data.current

    if (!dragData) return

    const isAlreadyInGrid = gridComponents.some(
      (comp) => comp.slotId === draggedSlotId
    )
    if (isAlreadyInGrid) {
      toast.error(
        "This component is already added to the grid. Please remove it first if you want to add it again."
      )
      return
    }

    const draggedComponent = sidebarComponents.find(
      (comp) => comp.slotId === draggedSlotId
    )

    if (!draggedComponent) return

    setGridComponents([...gridComponents, draggedComponent])

    const componentLayouts = draggedComponent.layouts || DEFAULT_SIZES

    const newLayouts = createLayoutItemForAllBreakpoints(
      defaultLayouts,
      draggedSlotId,
      componentLayouts
    )

    setDefaultLayouts(newLayouts)

    toast.success("Component added", {
      description: `${draggedComponent.title} has been added to your dashboard.`,
    })
  }

  const handleRemoveComponent = (slotId: string) => {
    if (!isEditing) {
      toast.error(
        "Editing mode is disabled. Please enable editing mode to remove components."
      )
      return
    }

    const component = gridComponents.find((comp) => comp.slotId === slotId)

    if (!component) return

    const removedLayouts: ResponsiveLayout = {} as ResponsiveLayout

    Object.keys(defaultLayouts).forEach((breakpoint) => {
      const breakpointLayouts = defaultLayouts[breakpoint as Breakpoint]
      const layoutItem = breakpointLayouts.find((item) => item.i === slotId)

      if (layoutItem) {
        removedLayouts[breakpoint as Breakpoint] = [layoutItem]
      } else {
        removedLayouts[breakpoint as Breakpoint] = []
      }
    })

    const removedComponent = {
      component,
      layouts: removedLayouts,
    }

    const updatedComponents = gridComponents.filter(
      (comp) => comp.slotId !== slotId
    )
    setGridComponents(updatedComponents)

    const updatedLayouts = { ...defaultLayouts }
    Object.keys(updatedLayouts).forEach((breakpoint) => {
      updatedLayouts[breakpoint as Breakpoint] = updatedLayouts[
        breakpoint as Breakpoint
      ].filter((item) => item.i !== slotId)
    })

    setDefaultLayouts(updatedLayouts)

    setLastRemovedComponent(removedComponent)

    toast.error("Component removed", {
      description: `${component.title} has been removed from your dashboard.`,
      action: {
        label: "Undo",
        onClick: () => {
          if (removedComponent?.component) {
            setGridComponents((prev) => [...prev, removedComponent.component])

            const restoredLayouts = { ...updatedLayouts }
            Object.keys(removedComponent.layouts).forEach((breakpoint) => {
              const layoutItems =
                removedComponent.layouts[breakpoint as Breakpoint]
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

  const _handleUndoRemove = () => {
    if (!lastRemovedComponent || !lastRemovedComponent.component) return

    setGridComponents([...gridComponents, lastRemovedComponent.component])

    const updatedLayouts = { ...defaultLayouts }

    Object.keys(lastRemovedComponent.layouts).forEach((breakpoint) => {
      const layoutItems = lastRemovedComponent.layouts[breakpoint as Breakpoint]

      if (layoutItems && layoutItems.length > 0) {
        updatedLayouts[breakpoint as Breakpoint] = [
          ...updatedLayouts[breakpoint as Breakpoint],
          ...layoutItems,
        ]
      }
    })

    setDefaultLayouts(updatedLayouts)

    toast.success("Component restored", {
      description: `${lastRemovedComponent.component.title} has been restored to your dashboard.`,
    })

    setLastRemovedComponent(null)
  }

  if (isLoading) return <LoadingPage />
  if (!authUser) return null

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <DashboardLayout
        breadcrumbItems={[]}
        navExtras={<EditWidgetsControl onEditChange={setIsEditing} />}
      >
        <Box as="div" className="container mx-auto flex overflow-x-hidden">
          <Box className="w-full">
            <Heading size="6" className="pb-4">
              {t("dashboard:title")}
            </Heading>
            <DroppableArea id="grid-layout" isEditing={isEditing}>
              <ResponsiveGridLayout
                className="gridLayout"
                layouts={getLayoutsWithStaticFlag}
                rowHeight={30}
                breakpoints={{ lg: 1536, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                onLayoutChange={handleLayoutChange}
                droppingItem={{ i: "__dropping-elem__", w: 3, h: 6 }}
              >
                {gridComponents.map((item) => (
                  <div
                    key={item.slotId}
                    className={`relative h-full rounded-xl ${isEditing ? "bg-gray-5 p-2 shadow" : ""}`}
                  >
                    {isEditing && (
                      <IconButton
                        className="absolute top-3 right-3 z-[2]"
                        onMouseDown={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                        color="red"
                        onClick={() => handleRemoveComponent(item.slotId)}
                      >
                        <Trash size={16} />
                      </IconButton>
                    )}
                    <div className="widget-content relative h-full">
                      {isEditing ? (
                        <>
                          <img
                            src={
                              item.compImage ||
                              "/placeholder.svg?height=150&width=150"
                            }
                            alt={item.title}
                            className="h-full w-full rounded-lg object-contain"
                          />
                        </>
                      ) : (
                        <>{item.component}</>
                      )}
                    </div>
                  </div>
                ))}
              </ResponsiveGridLayout>
            </DroppableArea>
          </Box>
        </Box>
      </DashboardLayout>

      <DragOverlay>
        {activeDragId && activeDragData && (
          <div
            className="pointer-events-none rounded-lg border border-gray-5 opacity-100 shadow"
            style={{ width: "150px", height: "100px" }}
          >
            <img
              src={
                activeDragData.image || "/placeholder.svg?height=150&width=150"
              }
              alt={activeDragData.title || "Component"}
              className="h-full w-full rounded-lg"
            />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}

export default DashboardProject1
