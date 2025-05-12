import { LoadingPage } from "@common"
import { DndContext, DragOverlay } from "@dnd-kit/core"
import { useDashboardStore, useEditingStore } from "@incmix/store"
import {
  ActiveBtn,
  Box,
  Button,
  Dialog,
  Flex,
  Heading,
  ReactiveButton,
  SaveTemplateDialog,
  generateDOM,
  useDevicePreview,
  useDragAndDrop,
  useGridComponents,
  useLayoutStore,
} from "@incmix/ui"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { useParams } from "@tanstack/react-router"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Responsive, WidthProvider } from "react-grid-layout"
import { useAuth } from "../../auth"
import { EditWidgetsControl } from "./home"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

import { Save } from "lucide-react"

const ResponsiveGridLayout = WidthProvider(Responsive)

const DynamicDashboardPage: React.FC = () => {
  const { projectId } = useParams({ from: "/dashboard/project/$projectId" })
  const project = useDashboardStore((state) => state.getProjectById(projectId))
  const { authUser, isLoading } = useAuth()
  const { isEditing, setIsEditing } = useEditingStore()

  const {
    defaultLayouts,
    nestedLayouts,
    handleLayoutChange,
    handleNestedLayoutChange,
    updateStaticProperty,
  } = useLayoutStore()

  const [openSaveDialog, setOpenSaveDialog] = useState(false)
  useEffect(() => {
    updateStaticProperty(isEditing)
  }, [isEditing, updateStaticProperty])

  // Device preview hooks
  const { activeDevice, setActiveDevice, deviceTabs, getViewportWidth } =
    useDevicePreview()

  // Width measurement
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

  const {
    gridComponents,
    setGridComponents,
    handleRemoveComponent,
    handleRemoveNestedComponent,
  } = useGridComponents(isEditing)

  const {
    activeDragId,
    activeDragData,
    sensors,
    handleDragStart,
    handleDragEnd,
  } = useDragAndDrop(isEditing, gridComponents, setGridComponents)
  if (isLoading) return <LoadingPage />
  if (!authUser) return null
  if (!project) return <div>Project not found</div>

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
        <Box as="div" className="container mx-auto flex overflow-x-hidden">
          <Box className="h-full w-full overflow-hidden">
            <Flex justify={"between"} align={"center"} className="pb-4">
              <Heading
                size="6"
                className={`${isEditing ? "" : "px-4"} capitalize`}
              >
                {project.name}
              </Heading>
              {isEditing && (
                <Flex align={"center"} gap="2">
                  <ActiveBtn
                    items={deviceTabs}
                    defaultActiveId={activeDevice}
                    onChange={setActiveDevice}
                  />
                  <SaveTemplateDialog
                    projectId={projectId}
                    layouts={defaultLayouts}
                    nestedLayouts={nestedLayouts}
                    open={openSaveDialog}
                    onOpenChange={setOpenSaveDialog}
                  />
                </Flex>
              )}
            </Flex>
            <Box
              ref={boxRef}
              className={`relative mx-auto h-full rounded-lg transition-width duration-200 ${
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
              {isEditing && (
                <span className="absolute top-0.5 right-0.5 z-10 rounded-md border border-gray-5 bg-gray-3 px-2 py-1">
                  width: {actualWidth ? `${actualWidth}px` : "Measuring..."}
                </span>
              )}
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
                {generateDOM(
                  defaultLayouts,
                  gridComponents,
                  nestedLayouts,
                  handleNestedLayoutChange,
                  isEditing,
                  handleRemoveComponent,
                  handleRemoveNestedComponent
                )}
              </ResponsiveGridLayout>
            </Box>
          </Box>
        </Box>
      </DashboardLayout>

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
