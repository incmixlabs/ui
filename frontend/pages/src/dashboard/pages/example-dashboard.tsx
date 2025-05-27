import { LoadingPage } from "@common"
import { DndContext, DragOverlay } from "@dnd-kit/core"
import { Responsive, WidthProvider } from "@incmix/react-grid-layout"
import {
  type Dashboard,
  useEditingStore,
  useRealDashboardStore,
  useTemplateStore,
} from "@incmix/store"
import {
  ActiveBtn,
  AddGroupButton,
  Box,
  CloneDashboardModal,
  CreateProjectModal,
  DeleteDashboard,
  EditDashboard,
  ExampleGenerateDOM,
  Flex,
  Heading,
  SaveTemplateDialog,
  generateDOM,
  initialLayouts,
  useDevicePreview,
  useDragAndDrop,
  useGridComponents,
  useLayoutStore,
} from "@incmix/ui"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { useParams } from "@tanstack/react-router"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useAuth } from "../../auth"
import { EditWidgetsControl } from "./home"
import "@incmix/react-grid-layout/css/styles.css"
import { useQueryState } from "nuqs"

const ResponsiveGridLayout = WidthProvider(Responsive)

const ExampleDashboardPage: React.FC = () => {
  const { authUser, isLoading } = useAuth()
  const isEditing = true

  const { defaultLayouts, handleLayoutChange, handleNestedLayoutChange } =
    useLayoutStore()

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

  const { gridComponents, handleRemoveComponent, handleRemoveNestedComponent } =
    useGridComponents(isEditing)

  //   const onDragStop = (layout: Layout[], oldItem: Layout, newItem: Layout) => {
  //     const swapTarget = layout
  //         .filter(item => item.i != oldItem.i)
  //         .find((item) => item.y === newItem.y && item.x == newItem.x);

  //     if (!swapTarget) {
  //         const index = layout.findIndex(item => item.i == oldItem.i);
  //         layout[index].x = oldItem.x;
  //         layout[index].y = oldItem.y;
  //     } else {
  //         const index = layout.findIndex(item => item.i == swapTarget.i);
  //         layout[index].x = oldItem.x;
  //         layout[index].y = oldItem.y;
  //     }
  // };

  // Show loading while auth is loading, store is loading, or dashboard is loading
  if (isLoading) {
    return <LoadingPage />
  }

  if (!authUser) return null

  const isEmpty = gridComponents.length === 0
  console.log("defaultLayouts from dynamic-dashboard-page", defaultLayouts)

  return (
    <div>
      <Box as="div" className="container mx-auto flex overflow-x-hidden">
        <Box className="h-full w-full overflow-hidden">
          <Box
            ref={boxRef}
            className={`relative mx-auto h-full rounded-lg transition-width duration-200 ${
              isEditing && !isEmpty
                ? "border-2 border-indigo-8 border-dashed bg-indigo-2 "
                : ""
            }`}
          >
            {isEditing && (
              <span className="absolute top-0.5 right-0.5 z-10 rounded-md border border-gray-5 bg-gray-3 px-2 py-1">
                width: {actualWidth ? `${actualWidth}px` : "Measuring..."}
              </span>
            )}
            <ResponsiveGridLayout
              onDragStart={(
                _a: any,
                _b: any,
                _c: any,
                _d: any,
                e: { stopPropagation: () => any }
              ) => e.stopPropagation()}
              layouts={initialLayouts}
              onLayoutChange={handleLayoutChange}
              className="gridLayout"
              rowHeight={10}
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
              resizeHandles={["n", "s", "e", "w"]}
              preventCollision={false}
              compactType="vertical"
              isDraggable={isEditing}
              isResizable={isEditing}
            >
              {ExampleGenerateDOM(
                initialLayouts,
                gridComponents,
                handleNestedLayoutChange,
                isEditing,
                handleRemoveComponent,
                handleRemoveNestedComponent
              )}
            </ResponsiveGridLayout>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default ExampleDashboardPage
