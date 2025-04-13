import { LoadingPage } from "@common"

import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  type UniqueIdentifier,
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
import { useCallback, useRef, useState } from "react"
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
  Heading,
  InProgressTask,
  NewTasks,
  PostingTask,
  ProfileSettings,
  ProjectWidgets,
  RecentActivity,
  SortableItem,
  StatisticWidgets,
  TotalTasks,
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
    <>
      <Grid columns={"2"} gap="4" className="relative">
        <TotalTasks />
        <NewTasks />
        <InProgressTask />
        <DoneTasks />
      </Grid>
    </>
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
    id: "statistic-widgets",
    component: <StatisticWidgets />,
    name: "Statistics",
  },
  {
    id: "profile-calender",
    component: <ProfileCalender />,
    name: "Profile Calender",
  },
  {
    id: "project-widgets",
    component: <ProjectWidgets />,
    name: "Projects",
  },
  {
    id: "active-task",
    component: <ActiveTask />,
    name: "Active Tasks",
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
    colSpan: "xl:col-span-3 col-span-12 2xl:col-span-3",
  },
  {
    slotId: "slot2",
    colSpan: "xl:col-span-6 col-span-12 2xl:col-span-6",
    className: "bg-gray-2",
  },
  {
    slotId: "slot3",
    colSpan: "xl:col-span-3 col-span-12 2xl:col-span-3",
    className: "bg-gray-2",
  },
  {
    slotId: "slot4",
    colSpan: "xl:col-span-3 col-span-12 2xl:col-span-3",
    className: "bg-gray-2",
  },
  {
    slotId: "slot5",
    colSpan: "xl:col-span-6 col-span-12 2xl:col-span-6",
    className: "bg-gray-2",
  },
  {
    slotId: "slot6",
    colSpan: "xl:col-span-3 col-span-12 2xl:col-span-3",
    className: "bg-gray-2",
  },
  {
    slotId: "slot7",
    colSpan: "col-span-12",
    className: "bg-gray-2",
  },
]

const INITIAL_SLOT_MAPPING = {
  slot1: "task-stats",
  slot2: "statistic-widgets",
  slot3: "profile-calender",
  slot4: "project-widgets",
  slot5: "active-task",
  slot6: "recent-activity",
  slot7: "posting-task",
}

const DashboardProject1: React.FC = () => {
  const { t } = useTranslation(["dashboard", "common"])
  const { authUser, isLoading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  const [slotMapping, setSlotMapping] = useState(INITIAL_SLOT_MAPPING)
  // State for grid slots configuration
  const [gridSlots, setGridSlots] = useState<GridSlot[]>(INITIAL_GRID_SLOTS)

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [overSlotId, setOverSlotId] = useState<UniqueIdentifier | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [_slotDimensions, setSlotDimensions] = useState<
    Record<string, DOMRect>
  >({})
  const lastOverId = useRef<UniqueIdentifier | null>(null)

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
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
    lastOverId.current = null
  }

  const handleDragOver = (event: any) => {
    const { over } = event

    if (over) {
      setOverSlotId(over.id)
      lastOverId.current = over.id
    } else {
      setOverSlotId(lastOverId.current)
    }
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const sourceComponentId =
        slotMapping[active.id as keyof typeof slotMapping]
      const targetComponentId = slotMapping[over.id as keyof typeof slotMapping]

      const newMapping = { ...slotMapping }
      newMapping[active.id as keyof typeof slotMapping] = targetComponentId
      newMapping[over.id as keyof typeof slotMapping] = sourceComponentId

      setSlotMapping(newMapping)

      const newGridSlots = [...gridSlots]
      const sourceIndex = newGridSlots.findIndex(
        (slot) => slot.slotId === active.id
      )
      const targetIndex = newGridSlots.findIndex(
        (slot) => slot.slotId === over.id
      )

      if (sourceIndex !== -1 && targetIndex !== -1) {
        const sourceGridSlot = { ...newGridSlots[sourceIndex] }
        const targetGridSlot = { ...newGridSlots[targetIndex] }

        const tempColSpan = sourceGridSlot.colSpan
        const tempClassName = sourceGridSlot.className

        sourceGridSlot.colSpan = targetGridSlot.colSpan
        sourceGridSlot.className = targetGridSlot.className

        targetGridSlot.colSpan = tempColSpan
        targetGridSlot.className = tempClassName

        newGridSlots[sourceIndex] = sourceGridSlot
        newGridSlots[targetIndex] = targetGridSlot

        setGridSlots(newGridSlots)
      }
    }

    setActiveId(null)
    setOverSlotId(null)
    setIsDragging(false)
    lastOverId.current = null
  }

  const handleDragCancel = () => {
    setActiveId(null)
    setOverSlotId(null)
    setIsDragging(false)
    lastOverId.current = null
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
