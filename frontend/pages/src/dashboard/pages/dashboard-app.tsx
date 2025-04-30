import {
  Box,
  CardContainer,
  type ComponentSlot,
  type TBreakpoint,
  TResponsiveLayout,
  cn,
  dashboardImg,
  initialLayouts,
} from "@incmix/ui"
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
import { useCallback, useEffect, useMemo, useState } from "react"
import RGL, {
  WidthProvider,
  type Layout,
  Layouts,
  Responsive,
} from "react-grid-layout"
const ResponsiveGridLayout = WidthProvider(Responsive)

const ReactGridLayout = WidthProvider(RGL)

export default function DashboardApp({ isEditing }: { isEditing: boolean }) {
  const [defaultLayouts, setDefaultLayouts] =
    useState<Record<TBreakpoint, Layout[]>>(initialLayouts)

  const [nestedLayouts, setNestedLayouts] = useState<Record<string, Layout[]>>({
    "grid-a": [
      { w: 12, h: 6, x: 0, y: 0, i: "grid-a|0", moved: false, static: true },
      { w: 12, h: 5, x: 0, y: 6, i: "grid-a|1", moved: false, static: true },
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
  const [gridComponents, _setGridComponents] = useState<ComponentSlot[]>([
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

  const onNestedLayoutChange = (nestedLayout: Layout[], itemKey: string) => {
    setNestedLayouts((prevLayouts) => ({
      ...prevLayouts,
      [itemKey]: nestedLayout,
    }))
    console.log("Nested layout changed for", itemKey, nestedLayout)
  }

  const generateDOM = () => {
    return defaultLayouts?.lg?.map((item) => {
      const gridComponent = gridComponents.find(
        (comp) => comp.slotId === item.i
      )
      if (item.i.startsWith("grid-")) {
        const nested = nestedLayouts[item.i] || []
        console.log("Nested for", item.i, nested)

        return (
          <Box
            key={item.i}
            className={cn("", isEditing && "rounded-lg bg-gray-8 p-0 shadow")}
          >
            <ReactGridLayout
              className="nested-layout"
              layout={nested}
              cols={12}
              rowHeight={30}
              onDragStart={(_a, _b, _c, _d, e) => {
                e.stopPropagation()
              }}
              onResizeStart={(_a, _b, _c, _d, e) => {
                e.stopPropagation()
              }}
              onLayoutChange={(nestedLayout) =>
                onNestedLayoutChange(nestedLayout, item.i)
              }
              resizeHandles={["n", "s", "e", "w"]}
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
                      isEditing && "rounded-lg bg-gray-2 p-0 shadow"
                    )}
                  >
                    {nestedComponent ? (
                      nestedComponent.component
                    ) : (
                      <span>{nestedItem.i}</span>
                    )}
                  </Box>
                )
              })}
              {/* hello */}
            </ReactGridLayout>
          </Box>
        )
      }
      return (
        <Box
          key={item.i}
          className={cn("", isEditing && "rounded-lg bg-gray-5 p-0 shadow")}
        >
          {gridComponent ? gridComponent.component : <span>{item.i}</span>}
        </Box>
      )
    })
  }

  return (
    <>
      <ResponsiveGridLayout
        onDragStart={(_a, _b, _c, _d, e) => e.stopPropagation()}
        layouts={defaultLayouts}
        onLayoutChange={handleLayoutChange}
        className="layout"
        rowHeight={30}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
        resizeHandles={["n", "s", "e", "w"]}
      >
        {generateDOM()}
      </ResponsiveGridLayout>
    </>
  )
}
