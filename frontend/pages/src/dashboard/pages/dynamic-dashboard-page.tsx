import { LoadingPage } from "@common"
import { DndContext, DragOverlay } from "@dnd-kit/core"
import { Responsive, WidthProvider } from "@incmix/react-grid-layout"
import {
  type Dashboard,
  useDashboardStore,
  useEditingStore,
  useTemplateStore,
} from "@incmix/store"
import {
  ActiveBtn,
  AddGroupButton,
  Box,
  CloneDashboardModal,
  CreateProjectModal,
  Flex,
  Heading,
  SaveTemplateDialog,
  SidebarTrigger,
  useMediaQuery,
  useModalStore,
} from "@incmix/ui"

import {
  DeleteDashboard,
  EditDashboard,
  generateDOM,
  initialLayouts,
  useDevicePreview,
  useGridComponents,
  useLayoutStore,
  useWidgetDragAndDrop,
} from "@incmix/ui/dashboard"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { useParams } from "@tanstack/react-router"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useAuth } from "../../auth"
import { EditWidgetsControl } from "./home"
import "@incmix/react-grid-layout/css/styles.css"
import { useLocation } from "@tanstack/react-router"
import { useQueryState } from "nuqs"
import { useTranslation } from "react-i18next"
const ResponsiveGridLayout = WidthProvider(Responsive)

const DynamicDashboardPage: React.FC = () => {
  const { projectId } = useParams({ from: "/dashboard/$projectId" })
  const { t } = useTranslation("navbar")
  const { pathname } = useLocation()
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const [isTemplate, setIsTemplate] = useQueryState("template")
  const [project, setProject] = useState<Dashboard | undefined>()

  const isCreateDashModalOpen = useModalStore(
    (state) => state.isDashboardCreateOpen
  )
  const openCreateDashboardModal = useModalStore(
    (state) => state.openDashboardCreate
  )
  const closeCreateDashboardModal = useModalStore(
    (state) => state.closeDashboardCreate
  )

  const isDashLoading = useDashboardStore((state) => state.isDashLoading)

  const getDashboardById = useDashboardStore((state) => state.getDashboardById)

  const { authUser, isLoading } = useAuth()
  const { isEditing, setIsEditing } = useEditingStore()
  const { getTemplateById, getActiveTemplate } = useTemplateStore()

  const {
    defaultLayouts,
    handleLayoutChange,
    handleNestedLayoutChange,
    applyTemplates,
  } = useLayoutStore()

  const [openSaveDialog, setOpenSaveDialog] = useState(false)

  useEffect(() => {
    const fetchTemplate = async () => {
      if (isTemplate) {
        try {
          const template = await getTemplateById(isTemplate)
          if (!template) {
            setIsTemplate(null)
            return
          }
          applyTemplates(template.mainLayouts, template.id)
        } catch (error) {
          console.error("Failed to load template:", error)
        }
      } else {
        try {
          // console.log(projectId, "projectId")

          const activeTemplate = await getActiveTemplate(projectId)
          // console.log("activeTemplate",activeTemplate);

          if (activeTemplate) {
            applyTemplates(activeTemplate.mainLayouts, activeTemplate.id)
          }
        } catch (error) {
          console.error("Failed to load active template:", error)
        }
      }
    }

    fetchTemplate()
  }, [isTemplate, projectId])

  useEffect(() => {
    const getProjectName = async () => {
      try {
        const getProject = await getDashboardById(projectId)
        if (getProject) {
          setProject(getProject)
        }
      } catch (error) {
        console.error("Failed to get dashboard:", error)
      }
    }

    if (projectId) {
      getProjectName()
    }
  }, [projectId, getDashboardById])

  const { activeDevice, setActiveDevice, deviceTabs, getViewportWidth } =
    useDevicePreview()

  const {
    gridComponents,
    setGridComponents,
    handleRemoveComponent,
    handleRemoveNestedComponent,
    handleAddNewGroup,
  } = useGridComponents(isEditing)

  const {
    activeDragId,
    activeDragData,
    sensors,
    handleDragStart,
    handleDragEnd,
  } = useWidgetDragAndDrop(isEditing, gridComponents, setGridComponents)

  // Show loading while auth is loading, store is loading, or dashboard is loading
  if (isLoading || isDashLoading) {
    return <LoadingPage />
  }

  if (!authUser) return null
  if (!project) return <div>Project not found</div>

  const isEmpty = gridComponents.length === 0

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <DashboardLayout>
        <Box as="div" className="container mx-auto flex overflow-x-hidden">
          <Box className="h-full w-full overflow-hidden pt-5">
            <Flex justify={"between"} align={"center"} className="pb-4">
              <Flex align={"center"} gap="2">
                {pathname.includes("/file-manager") ||
                  (pathname.includes("/dashboard") && isEditing && (
                    <SidebarTrigger
                      isSecondary
                      mobileSidebarTrigger
                      className=""
                      aria-label={t("toggleSecondarySidebar")}
                    />
                  ))}
                <Heading
                  size="6"
                  className={`${isEditing ? "" : "px-4"} capitalize`}
                >
                  {project?.dashboardName}
                </Heading>
              </Flex>
              <Flex align={"center"}>
                {!isEditing && (
                  <Flex gap="2">
                    <CreateProjectModal
                      isCreateDashModalOpen={isCreateDashModalOpen}
                      openCreateDashboardModal={openCreateDashboardModal}
                      closeCreateDashboardModal={closeCreateDashboardModal}
                    />
                    <CloneDashboardModal dashboardId={projectId} />
                    <EditDashboard dashboardId={projectId} />
                    <DeleteDashboard dashboardId={projectId} />
                  </Flex>
                )}

                {isEditing && (
                  <Flex align={"center"} gap="2">
                    <AddGroupButton
                      isDesktop={isDesktop}
                      isEditing={isEditing}
                      onAddGroup={handleAddNewGroup}
                    />
                    <ActiveBtn
                      isDesktop={isDesktop}
                      items={deviceTabs}
                      defaultActiveId={activeDevice}
                      onChange={setActiveDevice}
                    />
                    <SaveTemplateDialog
                      isDesktop={isDesktop}
                      projectId={projectId}
                      layouts={defaultLayouts}
                      open={openSaveDialog}
                      onOpenChange={setOpenSaveDialog}
                    />
                  </Flex>
                )}
                <EditWidgetsControl onEditChange={setIsEditing} />
              </Flex>
            </Flex>
            <Box
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
              <ResponsiveGridLayout
                onDragStart={(
                  _a: any,
                  _b: any,
                  _c: any,
                  _d: any,
                  e: { stopPropagation: () => any }
                ) => e.stopPropagation()}
                layouts={defaultLayouts}
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
                {generateDOM(
                  defaultLayouts,
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
