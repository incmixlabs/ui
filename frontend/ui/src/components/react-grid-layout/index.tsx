import {
  ActiveTask,
  NewTasks,
  PostingTask,
  ProjectWidgets2,
  StatisticWidgets2,
  TotalProject,
  TotalTasks,
} from "@widgets"
import React, { useMemo, useState } from "react"

import { Responsive, WidthProvider } from "react-grid-layout"

import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

const ResponsiveGridLayout = WidthProvider(Responsive)

export function GridLayoutExample({ isEditing }: { isEditing: boolean }) {
  const [layout, setLayout] = useState([
    { w: 2, h: 6, x: 0, y: 6, i: "a", static: false },
    { w: 2, h: 6, x: 0, y: 0, i: "b", static: false },
    { w: 3, h: 12, x: 2, y: 0, i: "c", static: false },
    { w: 5, h: 12, x: 5, y: 0, i: "d", static: false },
    { w: 5, h: 12, x: 0, y: 12, i: "e", static: false },
    { w: 5, h: 12, x: 5, y: 12, i: "f", static: false },
    { w: 10, h: 13, x: 0, y: 24, i: "g", static: false },
  ])
  const handleDrag = (layout: any, _oldItem: any, newItem: any) => {
    const gridSize = 4
    newItem.x = Math.round(newItem.x / gridSize) * gridSize
    newItem.y = Math.round(newItem.y / gridSize) * gridSize
    setLayout(layout)
  }
  const INITIAL_GRID_SLOTS = [
    {
      slotId: "a",
      component: <NewTasks />,
    },
    {
      slotId: "b",
      component: <TotalTasks />,
    },
    {
      slotId: "c",
      component: <ProjectWidgets2 />,
    },
    {
      slotId: "d",
      component: <StatisticWidgets2 />,
    },
    {
      slotId: "e",
      component: <ActiveTask />,
    },
    {
      slotId: "f",
      component: <TotalProject />,
    },
    {
      slotId: "g",
      component: <PostingTask />,
    },
  ]

  const initialLayouts = [
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
      resizeStep: 5,
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
      resizeStep: 5,
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
  ]

  const [defaultLayouts, setDefaultLayouts] = useState(initialLayouts)

  const layoutsWithStaticFlag = useMemo(() => {
    return defaultLayouts.map((item) => ({
      ...item,
      moved: false,
      static: !isEditing,
    }))
  }, [defaultLayouts, isEditing])

  const handleLayoutChange = (newLayout: any) => {
    // console.log(newLayout);

    setDefaultLayouts(newLayout)
  }

  const handleResize = (layout: any, oldItem: any, newItem: any) => {
    console.log(layout, oldItem, newItem)

    // const item = INITIAL_GRID_SLOTS.find((s) => s.slotId === newItem.i)
    // const step = item?.resizeStep || 1

    // const snappedW = Math.max(1, Math.round(newItem.w / step) * step)

    // const updatedLayout = defaultLayouts.map((l) =>
    //   l.i === newItem.i ? { ...l, w: snappedW } : l
    // )
    // setDefaultLayouts(updatedLayout)
  }
  return (
    <>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layoutsWithStaticFlag }}
        rowHeight={30}
        breakpoints={{ lg: 1536, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        onLayoutChange={handleLayoutChange}
        onResize={handleResize}
      >
        {defaultLayouts.map((item) => {
          const slot = INITIAL_GRID_SLOTS.find((s) => s.slotId === item.i)
          return (
            <div
              key={item.i}
              className={`rounded-xl ${isEditing ? "bg-gray-4 p-2 shadow" : ""}`}
            >
              {slot?.component ?? <div>Missing Component</div>}
            </div>
          )
        })}
      </ResponsiveGridLayout>

      {/* onDrag example */}
      <ResponsiveGridLayout
        layouts={{ lg: layout }}
        onDrag={handleDrag}
        cols={{ lg: 12 }}
        rowHeight={20}
        // onResize={handleDrag}
      >
        {layout.map((item) => (
          <div key={item.i} style={{ border: "1px solid black" }}>
            {item.i}
          </div>
        ))}
      </ResponsiveGridLayout>
    </>
  )
}
