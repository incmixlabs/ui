import { LoadingPage } from "@common"

import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable"
import { DashboardLayout } from "@layouts/admin-panel/layout"
import { useCallback, useState } from "react"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { useAuth } from "../../auth"
import { EditWidgetsControl } from "./home"

import {
  ActiveTask,
  Box,
  CalendarWidget,
  Grid,
  Heading,
  PostingTask,
  ProfileSettings,
  ProjectWidgets2,
  RecentActivity,
  SortableItem,
  StatisticWidgets2,
  TaskChart,
  TotalProject,
  dashboardColorValues,
  isRectDifferent,
} from "@incmix/ui"
import { GripVertical } from "lucide-react"
interface GridSlot {
  slotId: string
  colSpan: string
  className?: string
}

interface ComponentItem {
  id: string
  component: ReactNode
  name: string
}
const TaskStats = () => {
  return (
    <Grid gap={"5"}>
      <TaskChart
        title="On Hold"
        color={dashboardColorValues.color2}
        total={820}
      />{" "}
      <TaskChart
        title="Ongoing"
        color={dashboardColorValues.color1}
        total={520}
      />
    </Grid>
  )
}
const ProfileCalender = () => {
  return (
    <>
      <ProfileSettings />
      <CalendarWidget storageKey={"calendar_events_dashboard"} />
    </>
  )
}
const COMPONENT_ITEMS: ComponentItem[] = [
  {
    id: "task-stats",
    component: <TaskStats />,
    name: "Task Statistics",
  },
  {
    id: "project-widgets",
    component: <ProjectWidgets2 />,
    name: "Project Widgets",
  },
  {
    id: "statistic-widgets",
    component: <StatisticWidgets2 />,
    name: "Statistic Widgets",
  },
  {
    id: "profile-calender",
    component: <ProfileCalender />,
    name: "Profile Calender",
  },
  {
    id: "active-task",
    component: <ActiveTask />,
    name: "Active Tasks",
  },
  {
    id: "total-project",
    component: <TotalProject />,
    name: "Total Project",
  },
  {
    id: "recent-activity",
    component: <RecentActivity />,
    name: "Recent Activity",
  },
  {
    id: "posting-task",
    component: <PostingTask />,
    name: "Post New Task",
  },
]

const INITIAL_GRID_SLOTS: GridSlot[] = [
  {
    slotId: "slot1",
    colSpan: "col-span-2 flex flex-col gap-4",
  },
  {
    slotId: "slot2",
    colSpan: "col-span-5 2xl:col-span-3",
    className: "bg-gray-2",
  },
  {
    slotId: "slot3",
    colSpan: "col-span-5 2xl:col-span-4",
    className: "bg-gray-2",
  },
  {
    slotId: "slot4",
    colSpan: "xl:col-span-3 col-span-12 2xl:col-span-3",
    className: "bg-gray-2",
  },
  {
    slotId: "slot5",
    colSpan: "xl:col-span-6 col-span-12 2xl:col-span-5",
    className: "bg-gray-2",
  },
  {
    slotId: "slot6",
    colSpan: "xl:col-span-6 col-span-12 2xl:col-span-4",
    className: "bg-gray-2",
  },
  {
    slotId: "slot7",
    colSpan: "xl:col-span-3 col-span-12 2xl:col-span-3",
    className: "bg-gray-2",
  },
  {
    slotId: "slot8",
    colSpan: "col-span-12",
    className: "bg-gray-2",
  },
]

const INITIAL_SLOT_MAPPING = {
  slot1: "task-stats",
  slot2: "project-widgets",
  slot3: "statistic-widgets",
  slot4: "profile-calender",
  slot5: "active-task",
  slot6: "total-project",
  slot7: "recent-activity",
  slot8: "posting-task",
}

const DashboardProject1: React.FC = () => {
  const { t } = useTranslation(["dashboard", "common"])
  const { authUser, isLoading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  const [slotMapping, setSlotMapping] = useState(INITIAL_SLOT_MAPPING)
  const [gridSlots, setGridSlots] = useState<GridSlot[]>(INITIAL_GRID_SLOTS)

  const [activeId, setActiveId] = useState<string | null>(null)
  const [overSlotId, setOverSlotId] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [_slotDimensions, setSlotDimensions] = useState<
    Record<string, DOMRect>
  >({})

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleMeasure = useCallback((id: string, rect: DOMRect) => {
    setSlotDimensions((prev) => {
      const prevRect = prev[id]
      if (!prevRect || isRectDifferent(prevRect, rect)) {
        return {
          ...prev,
          [id]: rect,
        }
      }
      return prev
    })
  }, [])

  const handleDragStart = (event: any) => {
    const { active } = event
    setActiveId(active.id)
    setIsDragging(true)
  }

  const handleDragOver = (event: any) => {
    if (event.over) {
      setOverSlotId(event.over.id)
    } else {
      setOverSlotId(null)
    }
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      // Get the component IDs for the source and target slots
      const sourceComponentId =
        slotMapping[active.id as keyof typeof slotMapping]
      const targetComponentId = slotMapping[over.id as keyof typeof slotMapping]

      // Create a new mapping with the components swapped
      const newMapping = { ...slotMapping }
      newMapping[active.id as keyof typeof slotMapping] = targetComponentId
      newMapping[over.id as keyof typeof slotMapping] = sourceComponentId

      // Update the component mapping
      setSlotMapping(newMapping)

      // Swap grid slots configuration
      const newGridSlots = [...gridSlots]
      const sourceIndex = newGridSlots.findIndex(
        (slot) => slot.slotId === active.id
      )
      const targetIndex = newGridSlots.findIndex(
        (slot) => slot.slotId === over.id
      )

      if (sourceIndex !== -1 && targetIndex !== -1) {
        // Create copies of the source and target grid slots
        const sourceGridSlot = { ...newGridSlots[sourceIndex] }
        const targetGridSlot = { ...newGridSlots[targetIndex] }

        // Swap the colSpan and className properties
        const tempColSpan = sourceGridSlot.colSpan
        const tempClassName = sourceGridSlot.className

        sourceGridSlot.colSpan = targetGridSlot.colSpan
        sourceGridSlot.className = targetGridSlot.className

        targetGridSlot.colSpan = tempColSpan
        targetGridSlot.className = tempClassName

        // Update the grid slots array
        newGridSlots[sourceIndex] = sourceGridSlot
        newGridSlots[targetIndex] = targetGridSlot

        setGridSlots(newGridSlots)
      }
    }

    setActiveId(null)
    setOverSlotId(null)
    setIsDragging(false)
  }

  const handleDragCancel = () => {
    setActiveId(null)
    setOverSlotId(null)
    setIsDragging(false)
  }

  const activeComponentId = activeId
    ? slotMapping[activeId as keyof typeof slotMapping]
    : null
  const activeComponent = activeComponentId
    ? COMPONENT_ITEMS.find((item) => item.id === activeComponentId)
    : null

  if (isLoading) return <LoadingPage />
  if (!authUser) return null
  return (
    <DashboardLayout
      breadcrumbItems={[]}
      navExtras={<EditWidgetsControl onEditChange={setIsEditing} />}
    >
      <Box as="div" className="container mx-auto overflow-x-hidden">
        <Heading size="6" className="pb-4">
          {t("dashboard:title")}
        </Heading>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext items={gridSlots.map((slot) => slot.slotId)}>
            <Grid columns={"12"} gap="4" className="p-4">
              {gridSlots.map((slot) => (
                <Box
                  key={slot.slotId}
                  className={`h-fit ${slot.colSpan} ${slot.className || ""}`}
                >
                  <SortableItem
                    slotId={slot.slotId}
                    componentId={
                      slotMapping[slot.slotId as keyof typeof slotMapping]
                    }
                    components={COMPONENT_ITEMS}
                    gridSlot={slot}
                    isDropTarget={
                      overSlotId === slot.slotId && activeId !== slot.slotId
                    }
                    isDraggingAny={isDragging}
                    onMeasure={handleMeasure}
                    isEditing={isEditing}
                  />
                </Box>
              ))}
            </Grid>
          </SortableContext>
          <DragOverlay
            adjustScale={false}
            dropAnimation={{
              duration: 200,
              easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
            }}
          >
            {activeId && activeComponent ? (
              <Box className="rounded-lg bg-gray-5">
                <Box className="relative h-full">
                  <Box className="absolute top-2 right-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                    <GripVertical className="h-5 w-5 text-gray-500" />
                  </Box>
                  {activeComponent.component}
                </Box>
              </Box>
            ) : null}
          </DragOverlay>
        </DndContext>
        {/* <DashboardGrid isEditing={isEditing}/> */}
      </Box>
    </DashboardLayout>
  )
}

export default DashboardProject1
