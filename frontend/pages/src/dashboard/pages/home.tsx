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
  CloneDashboardHomeModal,
  CloneDashboardModal,
  CreateProjectModal,
  DeleteDashboard,
  EditDashboard,
  Flex,
  Heading,
  PageHeader,
  SaveTemplateDialog,
  SidebarTrigger,
  Switch,
  Text,
  cn,
  generateDOM,
  useDevicePreview,
  useDragAndDrop,
  useGridComponents,
  useLayoutStore,
  useModalStore,
} from "@incmix/ui"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { useLocation, useParams } from "@tanstack/react-router"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useAuth } from "../../auth"
import "@incmix/react-grid-layout/css/styles.css"
import { useQueryState } from "nuqs"
import { useTranslation } from "react-i18next"

const ResponsiveGridLayout = WidthProvider(Responsive)
export const EditWidgetsControl: React.FC<{
  onEditChange: (checked: boolean) => void
}> = ({ onEditChange }) => {
  const { t } = useTranslation(["dashboard", "common"])

  return (
    <Flex align="center" gap="2" className="ml-4">
      <Text size="2" color="gray">
        {t("dashboard:editMode")}
      </Text>
      <Switch onCheckedChange={onEditChange} />
    </Flex>
  )
}

const DashboardHomePage: React.FC = () => {
  const { pathname } = useLocation()
  const { t } = useTranslation("navbar")
  const pathSegments = pathname.split("/").filter(Boolean)
  const projectId =
    pathname === "/dashboard/home" ? "home" : pathSegments[1] || "home"

  const isCreateDashModalOpen = useModalStore(
    (state) => state.isDashboardCreateOpen
  )
  const openCreateDashboardModal = useModalStore(
    (state) => state.openDashboardCreate
  )
  const closeCreateDashboardModal = useModalStore(
    (state) => state.closeDashboardCreate
  )

  const [isTemplate, setIsTemplate] = useQueryState("template")
  const [project, setProject] = useState<Dashboard | undefined>()

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
    let cancelled = false
    const fetchTemplate = async () => {
      if (isTemplate) {
        try {
          const template = await getTemplateById(isTemplate)
          if (cancelled) return
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
          const activeTemplate = await getActiveTemplate(projectId)
          if (cancelled) return
          if (activeTemplate) {
            applyTemplates(activeTemplate.mainLayouts, activeTemplate.id)
          }
        } catch (error) {
          console.error("Failed to load active template:", error)
        }
      }
    }

    fetchTemplate()
    return () => {
      cancelled = true
    }
  }, [isTemplate, projectId])

  useEffect(() => {
    let cancelled = false
    const getProjectName = async () => {
      try {
        const getProject = await getDashboardById(projectId)
        if (cancelled) return
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
    return () => {
      cancelled = true
    }
  }, [projectId, getDashboardById])

  const { activeDevice, setActiveDevice, deviceTabs, getViewportWidth } =
    useDevicePreview()

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
    handleAddNewGroup,
  } = useGridComponents(isEditing)

  const {
    activeDragId,
    activeDragData,
    sensors,
    handleDragStart,
    handleDragEnd,
  } = useDragAndDrop(isEditing, gridComponents, setGridComponents)

  // Show loading while auth is loading, store is loading, or dashboard is loading
  if (isLoading || isDashLoading) {
    return <LoadingPage />
  }

  if (!authUser) return null
  if (!projectId) return <div>Home not found</div>

  const isEmpty = gridComponents.length === 0

  console.log("active drag data", activeDragData)

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
              {!isEditing && <PageHeader />}
              <Flex align={"center"} gap="2">
                {pathname.includes("/file-manager") ||
                  (pathname.includes("/dashboard") && isEditing && (
                    <SidebarTrigger
                      isSecondary
                      mobileSidebarTrigger
                      className="-ml-1"
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
                    <CloneDashboardHomeModal dashboardId={"home"} />
                  </Flex>
                )}
                {isEditing && (
                  <Flex align={"center"} gap="2">
                    <AddGroupButton
                      isEditing={isEditing}
                      onAddGroup={handleAddNewGroup}
                    />
                    <ActiveBtn
                      items={deviceTabs}
                      defaultActiveId={activeDevice}
                      onChange={setActiveDevice}
                    />
                    <SaveTemplateDialog
                      projectId={"home"}
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
            className={cn(
              "pointer-events-none rounded-lg border border-gray-5 bg-gray-1 opacity-100 shadow"
            )}
          >
            <img
              src={
                activeDragData.darkImage ||
                "/placeholder.svg?height=150&width=150"
              }
              alt={activeDragData.title || "Component"}
              className="hidden h-full w-full rounded-lg dark:block"
            />
            <img
              src={
                activeDragData.lightImage ||
                "/placeholder.svg?height=150&width=150"
              }
              alt={activeDragData.title || "Component"}
              className="block h-full w-full rounded-lg dark:hidden"
            />
          </Box>
        )}
      </DragOverlay>
    </DndContext>
  )
}
export default DashboardHomePage
