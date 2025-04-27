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
  Box,
  Button,
  Heading,
  IconButton,
  toast,
  useMarqueeSelection,
  useSelectionStore,
} from "@incmix/ui"
import {
  GroupingToolbar,
  type IWidgetGroup,
  SelectionRectangle,
  WidgetDropZone,
  WidgetGroup,
  WidgetSelection,
  dashboardImg,
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
import { Responsive, WidthProvider } from "react-grid-layout"
import { useTranslation } from "react-i18next"
import { useAuth } from "../../auth"
import { EditWidgetsControl } from "./home"

import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import { useDashboardStore, useEditingStore } from "@incmix/store"
import { useParams } from "@tanstack/react-router"
import { Trash, Users } from "lucide-react"
import { initialLayouts } from "./data"

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
  isGrouped?: boolean
}

const DEFAULT_SIZES: Record<Breakpoint, { w: number; h: number }> = {
  lg: { w: 3, h: 6 },
  md: { w: 3, h: 6 },
  sm: { w: 3, h: 6 },
  xs: { w: 3, h: 6 },
  xxs: { w: 2, h: 6 },
}

const _GROUP_SIZES: Record<Breakpoint, { w: number; h: number }> = {
  lg: { w: 6, h: 12 },
  md: { w: 6, h: 12 },
  sm: { w: 6, h: 12 },
  xs: { w: 4, h: 12 },
  xxs: { w: 2, h: 12 },
}

const DynamicDashboardPage: React.FC = () => {
  const { authUser, isLoading } = useAuth()
  const { projectId } = useParams({ from: "/dashboard/project/$projectId" })
  const project = useDashboardStore((state) => state.getProjectById(projectId))

  const { isEditing, setIsEditing } = useEditingStore()
  const [activeDragId, setActiveDragId] = useState<string | null>(null)
  const [activeDragData, setActiveDragData] = useState<any>(null)
  const { selectedWidgets, setSelectedWidgets, clearSelection } =
    useSelectionStore()
  const [isHoveringWidget, setIsHoveringWidget] = useState(false)
  const [widgetGroups, setWidgetGroups] = useState<IWidgetGroup[]>([])
  const gridContainerRef = useRef<HTMLDivElement>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  // Set up marquee selection
  const { startPoint, endPoint, selectedIds, isSelecting, isShiftPressed } =
    useMarqueeSelection({
      containerRef: gridContainerRef,
      isActive: isEditing,
      onSelectionChange: (ids) => {
        // console.log("Selection changed:", ids)
        setSelectedWidgets(ids)
      },
    })

  useEffect(() => {
    if (!isEditing) return

    const handleMouseMove = (e: MouseEvent) => {
      const element = document.elementFromPoint(e.clientX, e.clientY)
      if (!element) return

      const isOverWidget = !!element.closest("[data-widget-id]")
      setIsHoveringWidget(isOverWidget)
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isEditing])

  const [_lastRemovedComponent, setLastRemovedComponent] = useState<{
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
    {
      slotId: "h",
      component: <UserPanelOverview />,
      title: "User Panel Overview",
      compImage: dashboardImg?.postingTaskImg,
    },
  ])

  const [defaultLayouts, setDefaultLayouts] = useState(initialLayouts)

  // Memoize layouts with static flag to prevent unnecessary recalculations
  const getLayoutsWithStaticFlag = useMemo(() => {
    const result = {} as ResponsiveLayout
    ;(Object.keys(defaultLayouts) as Breakpoint[]).forEach((breakpoint) => {
      if (Array.isArray(defaultLayouts[breakpoint])) {
        result[breakpoint] = defaultLayouts[breakpoint].map((item) => ({
          ...item,
          moved: false,
          static: !isEditing || isShiftPressed || isSelecting,
        }))
      }
    })

    return result
  }, [defaultLayouts, isEditing, isShiftPressed, isSelecting])

  // Memoize layout change handler to prevent unnecessary re-renders
  const handleLayoutChange = useCallback(
    (_layout: any, allLayouts: any) => {
      // Only update layouts if actually changed to prevent unnecessary re-renders
      const hasChanged =
        JSON.stringify(allLayouts) !== JSON.stringify(defaultLayouts)
      if (hasChanged) {
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

  // Function to add a component to the grid
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

    // Process each breakpoint
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
            resizeHandles: ["s", "w", "e", "n"] as const,
          }

          // Shift all widgets at or after the target position down
          const shiftedItems = currentLayout.map((item, index) => {
            if (index >= targetIndex) {
              return {
                ...item,
                y: item.y + h, // Shift down by the height of the new item
              }
            }
            return item
          })

          // Insert the new item at the target position
          newLayouts[breakpoint] = [
            ...shiftedItems.slice(0, targetIndex),
            newItem,
            ...shiftedItems.slice(targetIndex),
          ]
        } else {
          // If target not found, add to the beginning
          const newItem = {
            i: draggedSlotId,
            x: 0,
            y: 0,
            w,
            h,
            moved: false,
            static: false,
            resizeHandles: ["s", "w", "e", "n"] as const,
          }

          // Shift all existing items down
          const shiftedItems = currentLayout.map((item) => ({
            ...item,
            y: item.y + h,
          }))

          newLayouts[breakpoint] = [newItem, ...shiftedItems]
        }
      } else {
        // Add to the top if no target widget
        const newItem = {
          i: draggedSlotId,
          x: 0,
          y: 0,
          w,
          h,
          moved: false,
          static: false,
          resizeHandles: ["s", "w", "e", "n"] as const,
        }

        // Shift all existing items down
        const shiftedItems = currentLayout.map((item) => ({
          ...item,
          y: item.y + h,
        }))

        // Add new item at the top
        newLayouts[breakpoint] = [newItem, ...shiftedItems]
      }
    })

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
        addComponentToGrid(draggedSlotId, widgetId)
      } else if (over.id === "grid-drop-zone") {
        addComponentToGrid(draggedSlotId)
      } else {
        toast.error("Please drop the component on a valid target area.")
      }
    } else {
      toast.error("Please drop the component on a valid target area.")
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

    const group = widgetGroups.find((g) => g.memberIds.includes(slotId))
    if (group) {
      toast.error(
        "This widget is part of a group. Please ungroup it first or remove the entire group."
      )
      return
    }

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

  const groupSelectedWidgets = (arrangement: "vertical" | "horizontal") => {
    if (selectedWidgets.length < 2) {
      toast.error("Please select at least two widgets to group.")
      return
    }

    // Create a new group ID
    const groupId = `group-${Date.now()}`

    // Create a group title based on the first few widgets
    const selectedComponents = gridComponents.filter((comp) =>
      selectedWidgets.includes(comp.slotId)
    )
    const groupTitle =
      selectedComponents.length > 2
        ? `${selectedComponents[0].title}, ${selectedComponents[1].title}, +${selectedComponents.length - 2}`
        : selectedComponents.map((comp) => comp.title).join(", ")

    // Create the new group
    const newGroup: IWidgetGroup = {
      groupId,
      title: groupTitle,
      memberIds: [...selectedWidgets],
      arrangement,
    }

    // Update widget groups
    setWidgetGroups((prev) => [...prev, newGroup])

    // Mark components as grouped
    setGridComponents((prev) =>
      prev.map((comp) => {
        if (selectedWidgets.includes(comp.slotId)) {
          return {
            ...comp,
            isGrouped: true,
            groupId,
          }
        }
        return comp
      })
    )

    // Calculate the dimensions for the group based on the selected widgets
    const newLayouts = { ...defaultLayouts }

    // Process each breakpoint
    Object.keys(newLayouts).forEach((breakpoint) => {
      const breakpointLayout = newLayouts[breakpoint as Breakpoint]
      const selectedLayouts = breakpointLayout.filter((item) =>
        selectedWidgets.includes(item.i)
      )

      if (selectedLayouts.length > 0) {
        // Calculate the bounding box for the selected widgets
        let minX = Number.POSITIVE_INFINITY
        let minY = Number.POSITIVE_INFINITY
        let maxX = Number.NEGATIVE_INFINITY
        let maxY = Number.NEGATIVE_INFINITY
        let totalWidth = 0
        let totalHeight = 0

        selectedLayouts.forEach((item) => {
          minX = Math.min(minX, item.x)
          minY = Math.min(minY, item.y)
          maxX = Math.max(maxX, item.x + item.w)
          maxY = Math.max(maxY, item.y + item.h)

          if (arrangement === "horizontal") {
            totalWidth += item.w
            totalHeight = Math.max(totalHeight, item.h)
          } else {
            totalWidth = Math.max(totalWidth, item.w)
            totalHeight += item.h
          }
        })

        // Create a new layout item for the group
        const groupLayoutItem: LayoutItem = {
          i: groupId,
          x: minX,
          y: minY,
          w: arrangement === "horizontal" ? totalWidth : maxX - minX,
          h: arrangement === "vertical" ? totalHeight : maxY - minY,
          moved: false,
          static: false,
          resizeHandles: ["s", "w", "e", "n"] as const,
        }

        // Remove the selected widgets from the layout
        const filteredLayout = breakpointLayout.filter(
          (item) => !selectedWidgets.includes(item.i)
        )

        // Add the group layout item
        newLayouts[breakpoint as Breakpoint] = [
          groupLayoutItem,
          ...filteredLayout,
        ]
      }
    })

    // Update layouts
    setDefaultLayouts(newLayouts)

    // Clear selection after grouping
    clearSelection()

    toast.success("Widgets grouped", {
      description: `${selectedWidgets.length} widgets have been grouped together in a ${arrangement} arrangement.`,
    })
  }

  const ungroupWidgets = (groupId: string) => {
    const group = widgetGroups.find((g) => g.groupId === groupId)

    if (!group) return

    setGridComponents((prev) =>
      prev.map((comp) => {
        if (comp?.groupId === groupId) {
          const { groupId: _, isGrouped: __, ...rest } = comp
          return rest
        }
        return comp
      })
    )

    const newLayouts = { ...defaultLayouts }

    Object.keys(newLayouts).forEach((breakpoint) => {
      const breakpointLayout = newLayouts[breakpoint as Breakpoint]

      const groupLayout = breakpointLayout.find((item) => item.i === groupId)

      if (groupLayout) {
        const { x, y } = groupLayout

        // Create layout items for each group member
        const memberLayouts = group.memberIds.map((memberId, index) => {
          const component = gridComponents.find(
            (comp) => comp.slotId === memberId
          )
          const componentLayouts = component?.layouts || DEFAULT_SIZES
          const { w, h } = componentLayouts[breakpoint as Breakpoint]

          return {
            i: memberId,
            x,
            y: y + index * h,
            w,
            h,
            moved: false,
            static: false,
            resizeHandles: ["s", "w", "e", "n"] as const,
          }
        })

        const filteredLayout = breakpointLayout.filter(
          (item) => item.i !== groupId
        )

        newLayouts[breakpoint as Breakpoint] = [
          ...memberLayouts,
          ...filteredLayout,
        ]
      }
    })

    setDefaultLayouts(newLayouts)

    // Remove the group
    setWidgetGroups((prev) => prev.filter((g) => g.groupId !== groupId))

    toast.success("Group ungrouped", {
      description: "The widget group has been ungrouped.",
    })
  }

  const removeWidgetGroup = (groupId: string) => {
    const group = widgetGroups.find((g) => g.groupId === groupId)

    if (!group) return

    setGridComponents((prev) =>
      prev.filter((comp) => comp?.groupId !== groupId)
    )

    const newLayouts = { ...defaultLayouts }

    Object.keys(newLayouts).forEach((breakpoint) => {
      newLayouts[breakpoint as Breakpoint] = newLayouts[
        breakpoint as Breakpoint
      ].filter((item) => item.i !== groupId)
    })

    setDefaultLayouts(newLayouts)

    setWidgetGroups((prev) => prev.filter((g) => g.groupId !== groupId))

    toast.error("Group removed", {
      description: "The widget group and all its widgets have been removed.",
    })
  }

  // Combine all items for rendering (both individual widgets and groups)
  const allItems = [
    ...gridComponents
      .filter((comp) => !comp.isGrouped)
      .map((item) => ({
        id: item.slotId,
        type: "widget",
        data: item,
      })),
    ...widgetGroups.map((group) => ({
      id: group.groupId,
      type: "group",
      data: group,
    })),
  ]

  if (isLoading) return <LoadingPage />
  if (!authUser) return null

  const isEmpty = gridComponents.length === 0

  console.log(gridComponents)

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <DashboardLayout
        breadcrumbItems={[]}
        navExtras={
          <Box className="flex items-center gap-2">
            <EditWidgetsControl onEditChange={setIsEditing} />
          </Box>
        }
      >
        <Box as="div" className="container mx-auto flex overflow-x-hidden">
          <Box className="w-full">
            <Heading size="6" className="pb-4">
              {project?.name}
            </Heading>
            <Box
              ref={gridContainerRef}
              className={`rounded-lg transition-colors duration-200 ${
                isEditing && !isEmpty
                  ? "border-2 border-blue-400 border-dashed bg-blue-50/10"
                  : ""
              } ${!isHoveringWidget && isEditing ? "cursor-crosshair" : ""}`}
            >
              {isEmpty && isEditing ? (
                <Box className="flex h-[200px] items-center justify-center text-gray-500">
                  <p>Drag and drop components here to build your dashboard</p>
                </Box>
              ) : (
                <ResponsiveGridLayout
                  className="gridLayout"
                  layouts={getLayoutsWithStaticFlag}
                  rowHeight={30}
                  breakpoints={{ lg: 1536, md: 996, sm: 768, xs: 480, xxs: 0 }}
                  cols={{ lg: 14, md: 14, sm: 14, xs: 14, xxs: 14 }}
                  onLayoutChange={handleLayoutChange}
                  preventCollision={false}
                  compactType="vertical"
                  useCSSTransforms={true}
                >
                  {allItems.map((item) => (
                    <div
                      key={item.id}
                      className="relative h-full rounded-xl"
                      data-widget-id={item.id}
                    >
                      {item.type === "widget" ? (
                        isEditing ? (
                          <WidgetSelection id={item.id}>
                            <div
                              className={`h-full w-full ${isEditing ? "bg-gray-5 p-2 shadow" : ""}`}
                            >
                              {isEditing && (
                                <IconButton
                                  className="absolute top-3 right-3 z-[2]"
                                  onMouseDown={(e) => e.stopPropagation()}
                                  onTouchStart={(e) => e.stopPropagation()}
                                  color="red"
                                  onClick={() => handleRemoveComponent(item.id)}
                                >
                                  <Trash size={16} />
                                </IconButton>
                              )}
                              <div className="widget-content relative h-full">
                                {item.data.component}
                              </div>
                            </div>
                          </WidgetSelection>
                        ) : (
                          <WidgetDropZone
                            id={item.id}
                            isEditing={isEditing}
                            handleRemoveComponent={handleRemoveComponent}
                          >
                            <div
                              className={`h-full w-full ${isEditing ? "bg-gray-5 p-2 shadow" : ""}`}
                            >
                              {isEditing && (
                                <IconButton
                                  className="absolute top-3 right-3 z-[2]"
                                  onMouseDown={(e) => e.stopPropagation()}
                                  onTouchStart={(e) => e.stopPropagation()}
                                  color="red"
                                  onClick={() => handleRemoveComponent(item.id)}
                                >
                                  <Trash size={16} />
                                </IconButton>
                              )}
                              <div className="widget-content relative h-full">
                                {item.data.component}
                              </div>
                            </div>
                          </WidgetDropZone>
                        )
                      ) : (
                        <WidgetGroup
                          id={item.id}
                          title={item.data.title}
                          isEditing={isEditing}
                          onUngroup={() => ungroupWidgets(item.id)}
                          onRemove={() => removeWidgetGroup(item.id)}
                          arrangement={item.data.arrangement}
                        >
                          {/* Render group members */}
                          {item.data.memberIds.map((memberId) => {
                            const component = gridComponents.find(
                              (comp) => comp.slotId === memberId
                            )
                            if (!component) return null

                            return (
                              <div
                                key={memberId}
                                className="relative h-full rounded-lg bg-white p-2 shadow-sm"
                              >
                                <div className="widget-content relative h-full">
                                  {component.component}
                                </div>
                              </div>
                            )
                          })}
                        </WidgetGroup>
                      )}
                    </div>
                  ))}
                </ResponsiveGridLayout>
              )}
            </Box>
          </Box>
        </Box>
      </DashboardLayout>

      <SelectionRectangle startPoint={startPoint} endPoint={endPoint} />

      {/* Grouping toolbar */}
      {isEditing && selectedWidgets.length > 0 && (
        <GroupingToolbar
          onGroupVertical={() => groupSelectedWidgets("vertical")}
          onGroupHorizontal={() => groupSelectedWidgets("horizontal")}
        />
      )}
      <DragOverlay>
        {activeDragId && activeDragData && (
          <Box
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
          </Box>
        )}
      </DragOverlay>
    </DndContext>
  )
}

export default DynamicDashboardPage
