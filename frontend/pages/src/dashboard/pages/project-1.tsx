import { LoadingPage } from "@common"

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
  dashboardImg,
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

const ResponsiveGridLayout = WidthProvider(Responsive)
interface ComponentSlot {
  slotId: string
  component: React.ReactNode
  title: string
  compImage?: string
}

const DashboardProject1: React.FC = () => {
  const { t } = useTranslation(["dashboard", "common"])
  const { authUser, isLoading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  // Available components for the sidebar

  const [gridComponents, _setGridComponents] = useState<ComponentSlot[]>([
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

  if (isLoading) return <LoadingPage />
  if (!authUser) return null
  return (
    <DashboardLayout
      breadcrumbItems={[]}
      navExtras={<EditWidgetsControl onEditChange={setIsEditing} />}
    >
      <Box as="div" className="container mx-auto flex overflow-x-hidden">
        <Box className="w-full">
          <Heading size="6" className="pb-4">
            {t("dashboard:title")}
          </Heading>
          <ResponsiveGridLayout
            className="layout"
            layouts={getLayoutsWithStaticFlag}
            rowHeight={30}
            breakpoints={{ lg: 1536, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            onLayoutChange={handleLayoutChange}
          >
            {gridComponents.map((item) => (
              <div
                key={item.slotId}
                className={`relative h-full rounded-xl ${isEditing ? "bg-gray-100 p-2 shadow" : ""}`}
              >
                <div className="widget-content relative h-full">
                  {isEditing ? (
                    <>
                      <img
                        src={item.compImage}
                        alt={item.title}
                        className="h-full w-full rounded-lg"
                      />
                    </>
                  ) : (
                    <>{item.component}</>
                  )}
                </div>
              </div>
            ))}
          </ResponsiveGridLayout>
        </Box>
      </Box>
    </DashboardLayout>
  )
}

export default DashboardProject1
