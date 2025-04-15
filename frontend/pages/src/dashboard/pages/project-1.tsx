import { LoadingPage } from "@common"

import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  type UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { useCallback, useMemo, useRef, useState } from "react"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { useAuth } from "../../auth"
import { EditWidgetsControl } from "./home"

import {
  ActiveTask,
  Box,
  CalendarWidget,
  DoneTasks,
  Grid,
  GridLayoutExample,
  Heading,
  InProgressTask,
  NewTasks,
  PostingTask,
  ProfileSettings,
  ProjectWidgets,
  ProjectWidgets2,
  RecentActivity,
  SortableItem,
  StatisticWidgets,
  StatisticWidgets2,
  TotalProject,
  TotalTasks,
  isRectDifferent,
} from "@incmix/ui"
import { GripVertical } from "lucide-react"
import { Responsive, WidthProvider } from "react-grid-layout"

import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
interface LayoutItem {
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

type Breakpoint = "lg" | "md" | "sm" | "xs" | "xxs"
type ResponsiveLayout = Record<Breakpoint, LayoutItem[]>

const _ResponsiveGridLayout = WidthProvider(Responsive)
interface ComponentSlot {
  slotId: string
  component: React.ReactNode
  title: string
}

const DashboardProject1: React.FC = () => {
  const { t } = useTranslation(["dashboard", "common"])
  const { authUser, isLoading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  // Available components for the sidebar
  const [availableComponents, _setAvailableComponents] = useState<
    ComponentSlot[]
  >([
    {
      slotId: "newTasks",
      component: <NewTasks />,
      title: "New Tasks",
    },
    {
      slotId: "totalTasks",
      component: <TotalTasks />,
      title: "Total Tasks",
    },
    {
      slotId: "projectWidgets",
      component: <ProjectWidgets2 />,
      title: "Project Widgets",
    },
    {
      slotId: "statisticWidgets",
      component: <StatisticWidgets2 />,
      title: "Statistic Widgets",
    },
    {
      slotId: "activeTask",
      component: <ActiveTask />,
      title: "Active Task",
    },
    {
      slotId: "totalProject",
      component: <TotalProject />,
      title: "Total Project",
    },
    {
      slotId: "postingTask",
      component: <PostingTask />,
      title: "Posting Task",
    },
  ])
  // Components currently in the grid
  const [gridComponents, setGridComponents] = useState<ComponentSlot[]>([
    {
      slotId: "a",
      component: <NewTasks />,
      title: "New Tasks",
    },
    {
      slotId: "b",
      component: <TotalTasks />,
      title: "Total Tasks",
    },
    {
      slotId: "c",
      component: <ProjectWidgets2 />,
      title: "Project Widgets",
    },
    {
      slotId: "d",
      component: <StatisticWidgets2 />,
      title: "Statistic Widgets",
    },
    {
      slotId: "e",
      component: <ActiveTask />,
      title: "Active Task",
    },
    {
      slotId: "f",
      component: <TotalProject />,
      title: "Total Project",
    },
    {
      slotId: "g",
      component: <PostingTask />,
      title: "Posting Task",
    },
  ])

  const [initialLayouts, _setInitialLayouts] = useState({
    lg: [
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

  const _getLayoutsWithStaticFlag = useMemo(() => {
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

  const _handleLayoutChange = (layout: any, allLayouts: any) => {
    console.log(layout, allLayouts)

    setDefaultLayouts(allLayouts)
  }
  // Handle component drop from sidebar
  const handleDrop = (componentId: string) => {
    // Find the component in available components
    const componentToAdd = availableComponents.find(
      (comp) => comp.slotId === componentId
    )

    if (!componentToAdd) return

    // Generate a unique ID for the new component
    const newId = `widget-${Date.now()}`

    // Create a new grid component
    const newGridComponent: ComponentSlot = {
      slotId: newId,
      component: componentToAdd.component,
      title: componentToAdd.title,
    }

    // Add to grid components
    setGridComponents([...gridComponents, newGridComponent])

    // Generate default layout item for each breakpoint
    const newLayouts = { ...defaultLayouts }

    // Add to each breakpoint
    ;(Object.keys(newLayouts) as Breakpoint[]).forEach((breakpoint) => {
      if (!Array.isArray(newLayouts[breakpoint])) {
        newLayouts[breakpoint] = []
      }

      // Default position and size based on breakpoint
      let newItem: LayoutItem

      switch (breakpoint) {
        case "lg":
          newItem = {
            i: newId,
            x: 0,
            y: 0,
            w: 4,
            h: 6,
            resizeHandles: ["s", "w", "e", "n"] as const,
          }
          break
        case "md":
          newItem = {
            i: newId,
            x: 0,
            y: 0,
            w: 5,
            h: 6,
            resizeHandles: ["s", "w", "e", "n"] as const,
          }
          break
        default:
          newItem = {
            i: newId,
            x: 0,
            y: 0,
            w: 6,
            h: 6,
            resizeHandles: ["s", "w", "e", "n"] as const,
          }
          break
      }

      newLayouts[breakpoint] = [...newLayouts[breakpoint], newItem]
    })

    setDefaultLayouts(newLayouts)
  }
  const _handleResize = (layout: any, oldItem: any, newItem: any) => {
    console.log(layout, oldItem, newItem)
  }
  const _handleRemoveComponent = (componentId: string) => {
    console.log(componentId)

    setGridComponents(
      gridComponents.filter((comp) => comp.slotId !== componentId)
    )

    const newLayouts = { ...defaultLayouts }

    ;(Object.keys(newLayouts) as Breakpoint[]).forEach((breakpoint) => {
      if (Array.isArray(newLayouts[breakpoint])) {
        newLayouts[breakpoint] = newLayouts[breakpoint].filter(
          (item) => item.i !== componentId
        )
      }
    })

    setDefaultLayouts(newLayouts)
  }

  const _DraggableComponent = ({ component }: { component: ComponentSlot }) => {
    const handleDragStart = () => {}

    const handleDragEnd = () => {
      handleDrop(component.slotId)
    }

    return (
      <div
        className="mb-2 cursor-grab rounded border border-gray-300 bg-gray-100 p-2"
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex items-center">
          <span className="mr-2">☰</span>
          <span>{component.title}</span>
        </div>
      </div>
    )
  }
  if (isLoading) return <LoadingPage />
  if (!authUser) return null
  return (
    <DashboardLayout
      breadcrumbItems={[]}
      navExtras={<EditWidgetsControl onEditChange={setIsEditing} />}
    >
      <Box as="div" className="container mx-auto flex overflow-x-hidden">
        {/* <aside className="h-screen w-60 bg-gray-4 rounded-lg">
          {isEditing && (
            <div className="w-64 p-4 bg-gray-50 border-r border-gray-200 mr-4">
              <h2 className="font-bold mb-4">Available Widgets</h2>
              {availableComponents.map((component) => (
                <DraggableComponent
                  key={component.slotId}
                  component={component}
                />
              ))}
            </div>
          )}
        </aside> */}
        <Box className="w-full">
          <Heading size="6" className="pb-4">
            {t("dashboard:title")}
          </Heading>
          {/* <ResponsiveGridLayout
            className="layout"
            layouts={getLayoutsWithStaticFlag}
            rowHeight={30}
            breakpoints={{ lg: 1536, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            onLayoutChange={handleLayoutChange}
            onResize={handleResize}
          >
            {gridComponents.map((item) => (
              <div
                key={item.slotId}
                className={`rounded-xl relative ${isEditing ? "bg-gray-100 p-2 shadow" : ""}`}
              >
                <div className="widget-content relative">
                  {item.component}
                </div>
              </div>
            ))}
          </ResponsiveGridLayout> */}
          <GridLayoutExample isEditing={isEditing} />
        </Box>
      </Box>
    </DashboardLayout>
  )
}

export default DashboardProject1
