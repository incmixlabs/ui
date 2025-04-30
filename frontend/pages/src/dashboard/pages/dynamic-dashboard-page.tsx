import type React from "react"

import { LoadingPage } from "@common"
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  ActiveBtn,
  Box,
  Flex,
  Heading,
  IconButton,
  Tabs,
  TabsList,
  TabsTrigger,
  type btnItem,
  cn,
  toast,
} from "@incmix/ui"
import {
  type TBreakpoint,
  WidgetDropZone,
  dashboardImg,
  initialLayouts,
  sidebarComponents,
} from "@incmix/ui/dashboard"
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

import { DashboardLayout } from "@layouts/admin-panel/layout"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import RGL, { type Layout, Responsive, WidthProvider } from "react-grid-layout"
import { useAuth } from "../../auth"
import { EditWidgetsControl } from "./home"

import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import { useDashboardStore, useEditingStore } from "@incmix/store"
import { useParams } from "@tanstack/react-router"
import { Laptop, Monitor, Tablet } from "lucide-react"
import { Layouts } from "react-grid-layout"

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

export interface CustomLayout extends Layout {
  compactType?: "horizontal" | "vertical"
  nestedLayouts?: Layout[]
}
export interface CustomLayouts {
  [breakpoint: string]: CustomLayout[]
}
export type Breakpoint = "lg" | "md" | "sm" | "xs" | "xxs"
type ResponsiveLayout = Record<Breakpoint, LayoutItem[]>
const ReactGridLayout = WidthProvider(RGL)

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

const DynamicDashboardPage: React.FC = () => {
  const { projectId } = useParams({ from: "/dashboard/project/$projectId" })
  const project = useDashboardStore((state) => state.getProjectById(projectId))
  const [activeDevice, setActiveDevice] = useState("desktop")

  // Device tabs using lucide icons
  const deviceTabs: btnItem[] = [
    {
      id: "desktop",
      label: "Desktop",
      icon: <Monitor className="h-4 w-4" />,
    },
    {
      id: "laptop",
      label: "Laptop",
      icon: <Laptop className="h-4 w-4" />,
    },
    {
      id: "tablet",
      label: "Tablet",
      icon: <Tablet className="h-4 w-4" />,
    },
  ]

  const { authUser, isLoading } = useAuth()
  const { isEditing, setIsEditing } = useEditingStore()

  const [activeDragId, setActiveDragId] = useState<string | null>(null)
  interface DragData {
    title?: string
    image?: string
    [key: string]: any
  }
  const [activeDragData, setActiveDragData] = useState<
    DragData | null | undefined
  >(null)

  const [actualWidth, setActualWidth] = useState<number | null>(null)

  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!boxRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setActualWidth(Math.round(entry.contentRect.width))
      }
    })

    resizeObserver.observe(boxRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const [_lastRemovedComponent, setLastRemovedComponent] = useState<{
    component: ComponentSlot | null
    layouts: Record<Breakpoint, LayoutItem[]>
  } | null>(null)

  const [defaultLayouts, setDefaultLayouts] =
    useState<CustomLayouts>(initialLayouts)

  const [nestedLayouts, setNestedLayouts] = useState<Record<string, Layout>>({
    "grid-a": [
      {
        w: 12,
        h: 12,
        x: 0,
        y: 0,
        i: "grid-a|0",
        moved: false,
        static: false,
      },
      {
        w: 12,
        h: 11,
        x: 0,
        y: 12,
        i: "grid-a|1",
        moved: false,
        static: false,
      },
    ],
    "grid-b": [
      {
        w: 6,
        h: 24,
        x: 0,
        y: 0,
        i: "grid-b|0",
        moved: false,
        static: false,
      },
      {
        w: 6,
        h: 24,
        x: 6,
        y: 0,
        i: "grid-b|1",
        moved: false,
        static: false,
      },
    ],
  })

  useEffect(() => {
    setDefaultLayouts((prev) => {
      const updated: Record<TBreakpoint, Layout[]> = {
        lg: [],
        md: [],
        sm: [],
        xs: [],
        xxs: [],
      }
      Object.entries(prev).forEach(([breakpoint, layout]) => {
        updated[breakpoint as TBreakpoint] = layout.map((item) => ({
          ...item,
          static: !isEditing,
        }))
      })
      return updated
    })
    setNestedLayouts((prev) => {
      const updated: Record<string, Layout[]> = {}
      for (const key in prev) {
        updated[key] = prev[key].map((item) => ({
          ...item,
          static: !isEditing,
        }))
      }
      return updated
    })
  }, [isEditing])

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

  const handleNestedLayoutChange = (nestedLayout: Layout, itemKey: string) => {
    setNestedLayouts((prevLayouts) => ({
      ...prevLayouts,
      [itemKey]: nestedLayout,
    }))
    console.log("Nested layout changed for", itemKey, nestedLayout)
  }

  const handleLayoutChange = useCallback(
    (_layout: any, allLayouts: any) => {
      const hasChanged =
        JSON.stringify(allLayouts) !== JSON.stringify(defaultLayouts)
      if (hasChanged) {
        console.log(allLayouts)

        setDefaultLayouts(allLayouts)
      }
    },
    [defaultLayouts]
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveDragId(active.id as string)
    setActiveDragData(active.data.current)
  }

  const addComponentToNestedGrid = (
    draggedSlotId: string,
    targetGroupId: string
  ) => {
    const isAlreadyInGrid = gridComponents.some(
      (comp) => comp.slotId === draggedSlotId
    )
    if (isAlreadyInGrid) {
      toast.error(
        "This component is already added to the grid. Please remove it first if you want to add it again."
      )
      return false
    }

    const draggedComponent = sidebarComponents.find(
      (comp) => comp.slotId === draggedSlotId
    )
    if (!draggedComponent) {
      return false
    }

    // Create a unique ID for the nested component
    const nestedItemId = `${targetGroupId}|${Date.now()}`

    // Add the component with the new ID
    const newComponent = {
      ...draggedComponent,
      slotId: nestedItemId,
    }

    setGridComponents((prev) => [...prev, newComponent])

    // Update the nested layout
    setNestedLayouts((prev) => {
      const currentNestedLayout = prev[targetGroupId] || []
      const lastItem = currentNestedLayout[currentNestedLayout.length - 1]

      // Calculate position for the new item
      const newY = lastItem ? lastItem.y + lastItem.h : 0

      const newNestedItem = {
        i: nestedItemId,
        x: 0,
        y: newY,
        w: 12, // Full width in the nested grid
        h: 6, // Default height
        moved: false,
        static: false,
      }

      return {
        ...prev,
        [targetGroupId]: [...currentNestedLayout, newNestedItem],
      }
    })

    toast.success("Component added to nested group", {
      description: `${draggedComponent.title} has been added to the nested group.`,
    })

    return true
  }

  const addComponentToGrid = (
    draggedSlotId: string,
    targetWidgetId?: string
  ) => {
    const isAlreadyInGrid = gridComponents.some(
      (comp) => comp.slotId === draggedSlotId
    )
    if (isAlreadyInGrid) {
      toast.error(
        "This component is already added to the grid. Please remove it first if you want to add it again."
      )
      return false
    }

    const draggedComponent = sidebarComponents.find(
      (comp) => comp.slotId === draggedSlotId
    )
    if (!draggedComponent) {
      return false
    }

    setGridComponents((prev) => [...prev, draggedComponent])

    const componentLayouts = draggedComponent.layouts || DEFAULT_SIZES

    const newLayouts = { ...defaultLayouts }
    ;(Object.keys(newLayouts) as Breakpoint[]).forEach((breakpoint) => {
      const { w, h } = componentLayouts[breakpoint]
      const currentLayout = [...newLayouts[breakpoint]]

      if (targetWidgetId) {
        const targetIndex = currentLayout.findIndex(
          (item) => item.i === targetWidgetId
        )

        if (targetIndex !== -1) {
          const targetWidget = currentLayout[targetIndex]
          const newItem = {
            i: draggedSlotId,
            x: targetWidget.x,
            y: targetWidget.y,
            w,
            h,
            moved: false,
            static: false,
          }

          const shiftedItems = currentLayout.map((item, index) => {
            if (index >= targetIndex) {
              return {
                ...item,
                y: item.y + h,
              }
            }
            return item
          })

          newLayouts[breakpoint] = [
            ...shiftedItems.slice(0, targetIndex),
            newItem,
            ...shiftedItems.slice(targetIndex),
          ]
        } else {
          const newItem = {
            i: draggedSlotId,
            x: 0,
            y: 0,
            w,
            h,
            moved: false,
            static: false,
          }

          const shiftedItems = currentLayout.map((item) => ({
            ...item,
            y: item.y + h,
          }))

          newLayouts[breakpoint] = [newItem, ...shiftedItems]
        }
      } else {
        const newItem = {
          i: draggedSlotId,
          x: 0,
          y: 0,
          w,
          h,
          moved: false,
          static: false,
        }

        const shiftedItems = currentLayout.map((item) => ({
          ...item,
          y: item.y + h,
        }))

        newLayouts[breakpoint] = [newItem, ...shiftedItems]
      }
    })

    // Update layouts
    setDefaultLayouts(newLayouts)

    toast.success("Component added", {
      description: `${draggedComponent.title} has been added to your dashboard.`,
    })

    return true
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    setActiveDragId(null)
    setActiveDragData(null)

    if (!isEditing) {
      return
    }

    const draggedSlotId = active.id as string
    const dragData = active.data.current

    if (!dragData) {
      return
    }

    if (over) {
      if (over.id.toString().startsWith("widget-")) {
        const widgetId = over.id.toString().replace("widget-", "")

        const overData = over.data.current

        if (overData && overData.type === "widget-drop-zone") {
          if (overData?.groupId?.startsWith("grid-")) {
            addComponentToNestedGrid(draggedSlotId, overData.groupId)
            return
          }

          addComponentToGrid(draggedSlotId, widgetId)
        }
      } else if (over.id.toString().startsWith("grid-")) {
        const gridId = over.id.toString()
        addComponentToNestedGrid(draggedSlotId, gridId)
      } else if (over.id === "grid-drop-zone") {
        addComponentToGrid(draggedSlotId)
      } else {
        toast.error("Please drop the component on a valid target area.")
      }
    } else {
      toast.error("Please drop the component on a valid target area.")
    }
  }

  const handleRemoveNestedComponent = (slotId: string, groupId?: string) => {
    if (groupId && nestedLayouts[groupId]) {
      const groupLayouts = nestedLayouts[groupId]
      const updatedGroupLayouts = groupLayouts.filter(
        (item) => item.i !== slotId
      )

      // Find the removed component
      const removedComponent = gridComponents.find(
        (comp) => comp.slotId === slotId
      )
      if (!removedComponent) return

      // Save removed state for undo
      const removedData = {
        component: removedComponent,
        layout: groupLayouts.find((item) => item.i === slotId),
        groupId,
      }

      // Update state
      setNestedLayouts((prev) => ({
        ...prev,
        [groupId]: updatedGroupLayouts,
      }))
      setGridComponents((prev) => prev.filter((comp) => comp.slotId !== slotId))
      setLastRemovedComponent(removedData as RemovedNestedComponentData)

      toast.error("Component removed", {
        description: `${removedComponent.title} has been removed.`,
        action: {
          label: "Undo",
          onClick: () => {
            if (
              removedData?.component &&
              removedData.layout &&
              removedData.groupId
            ) {
              setGridComponents((prev) => [...prev, removedData.component])
              setNestedLayouts((prev: Record<string, Layout[]>) => ({
                ...prev,
                [removedData.groupId]: [
                  ...prev[removedData.groupId],
                  ...(removedData.layout ? [removedData.layout] : []),
                ],
              }))

              toast.success("Component restored", {
                description: `${removedData.component.title} has been restored.`,
              })

              setLastRemovedComponent(null)
            }
          },
        },
        duration: 5000,
      })

      return // Exit early, skip defaultLayouts logic
    }
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
      const layoutItem = defaultLayouts[breakpoint as Breakpoint].find(
        (item) => item.i === slotId
      )
      removedLayouts[breakpoint as Breakpoint] = layoutItem ? [layoutItem] : []
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

  const generateDOM = () => {
    return defaultLayouts?.lg?.map((item) => {
      const gridComponent = gridComponents.find(
        (comp) => comp.slotId === item.i
      )
      if (item.i.startsWith("grid-")) {
        const nested = nestedLayouts[item.i] || []
        return (
          <Box
            key={item.i}
            className={cn(
              "",
              isEditing &&
                "overflow-hidden rounded-lg border-2 border-green-8 border-dashed bg-green-4 p-0 shadow"
            )}
          >
            <ReactGridLayout
              className="nested-layout"
              layout={nested}
              cols={12}
              rowHeight={10}
              onDragStart={(_a, _b, _c, _d, e) => {
                e.stopPropagation()
              }}
              onResizeStart={(_a, _b, _c, _d, e) => {
                e.stopPropagation()
              }}
              onLayoutChange={(nestedLayout) =>
                handleNestedLayoutChange(nestedLayout, item.i)
              }
              resizeHandles={["n", "s", "e", "w"]}
              preventCollision={false}
              compactType={item.compactType}
              useCSSTransforms={true}
            >
              {nested?.map((nestedItem) => {
                const nestedComponent = gridComponents.find(
                  (comp) => comp.slotId === nestedItem.i
                )

                return (
                  <Box
                    key={nestedItem.i}
                    className={cn(
                      "",
                      isEditing && "rounded-lg bg-gray-2 shadow"
                    )}
                  >
                    <WidgetDropZone
                      id={nestedItem.i}
                      isEditing={isEditing}
                      groupId={item.i}
                      handleRemoveComponent={handleRemoveNestedComponent}
                    >
                      {nestedComponent ? (
                        nestedComponent.component
                      ) : (
                        <span>{nestedItem.i}</span>
                      )}
                    </WidgetDropZone>
                  </Box>
                )
              })}
            </ReactGridLayout>
          </Box>
        )
      }
      return (
        <Box
          key={item.i}
          className={cn("", isEditing && "rounded-lg bg-gray-5 p-0 shadow")}
        >
          <WidgetDropZone
            id={item.i}
            isEditing={isEditing}
            handleRemoveComponent={handleRemoveComponent}
          >
            {gridComponent ? gridComponent.component : <span>{item.i}</span>}
          </WidgetDropZone>
        </Box>
      )
    })
  }

  const getViewportWidth = () => {
    switch (activeDevice) {
      case "desktop":
        return "100%"
      case "laptop":
        return "1005px"
      case "tablet":
        return "776px"
      default:
        return "100%"
    }
  }

  if (isLoading) return <LoadingPage />
  if (!authUser) return null

  if (!project) return <div>Project not found</div>

  console.log(defaultLayouts)

  const isEmpty = gridComponents.length === 0

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <DashboardLayout
        breadcrumbItems={[]}
        navExtras={<EditWidgetsControl onEditChange={setIsEditing} />}
      >
        <Box as="div" className=" container mx-auto flex overflow-x-hidden">
          <Box className="h-full w-full overflow-hidden ">
            <Flex justify={"between"} align={"center"} className="pb-4">
              <Heading
                size="6"
                className={`${isEditing ? "" : "px-4"} capitalize`}
              >
                {project.name}
              </Heading>
              {isEditing && (
                <ActiveBtn
                  items={deviceTabs}
                  defaultActiveId={activeDevice}
                  onChange={setActiveDevice}
                  activeClassName="text-white"
                />
              )}
            </Flex>

            <Box
              ref={boxRef}
              className={`relative mx-auto h-full rounded-lg transition-all duration-200 ${
                isEditing && !isEmpty
                  ? "border-2 border-indigo-8 border-dashed bg-indigo-2 "
                  : ""
              }`}
              style={{
                width: getViewportWidth(),
                maxWidth: "100%",
                overflow: "hidden",
              }}
            >
              <span className="absolute top-2 right-2 z-50 rounded-md border border-gray-200 bg-gray-100 px-2 py-1">
                Current width:{" "}
                {actualWidth ? `${actualWidth}px` : "Measuring..."}
              </span>
              <ResponsiveGridLayout
                onDragStart={(_a, _b, _c, _d, e) => e.stopPropagation()}
                layouts={defaultLayouts}
                onLayoutChange={handleLayoutChange}
                className="gridLayout"
                rowHeight={10}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
                resizeHandles={["n", "s", "e", "w"]}
                preventCollision={false}
                compactType="vertical"
                useCSSTransforms={true}
              >
                {generateDOM()}
              </ResponsiveGridLayout>
            </Box>
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

export default DynamicDashboardPage
