"use client"

import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable"
import {
  Box,
  Grid,
} from "@incmix/ui/base"
import {  ActiveTask,
  DoneTasks,
  InProgressTask,
  NewTasks,
  PostingTask,
  ProjectWidgets,
  StatisticWidgets,
  TotalTasks,} from "@widgets"
import { GripVertical } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"

// Define the grid slots with fixed positions and column spans
interface GridSlot {
  slotId: string
  colSpan: string
  className?: string
}

// Define the components that can be dragged between slots
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
    id: "posting-task",
    component: <PostingTask />,
    name: "Post New Task",
  },
]

// Initial grid slots configuration
const INITIAL_GRID_SLOTS: GridSlot[] = [
  {
    slotId: "slot1",
    colSpan: "xl:col-span-5 col-span-12 2xl:col-span-4",
  },
  {
    slotId: "slot2",
    colSpan: "xl:col-span-7 col-span-12 2xl:col-span-8",
    className: "bg-gray-2",
  },
  {
    slotId: "slot3",
    colSpan: "xl:col-span-5 col-span-12 2xl:col-span-4",
    className: "bg-gray-2",
  },
  {
    slotId: "slot4",
    colSpan: "xl:col-span-7 col-span-12 2xl:col-span-8",
    className: "bg-gray-2",
  },
  {
    slotId: "slot5",
    colSpan: "col-span-12",
    className: "bg-gray-2",
  },
]

// Initial mapping of slots to components
const INITIAL_SLOT_MAPPING = {
  slot1: "task-stats",
  slot2: "statistic-widgets",
  slot3: "project-widgets",
  slot4: "active-task",
  slot5: "posting-task",
}

// Helper function to check if two DOMRects are significantly different
const isRectDifferent = (
  rect1: DOMRect | null,
  rect2: DOMRect | null,
  threshold = 1
): boolean => {
  if (!rect1 || !rect2) return true
  return (
    Math.abs(rect1.width - rect2.width) > threshold ||
    Math.abs(rect1.height - rect2.height) > threshold
  )
}

function SortableItem({
  slotId,
  componentId,
  components,
  gridSlot,
  isDropTarget,
  isDraggingAny,
  onMeasure,
}: {
  slotId: string
  componentId: string
  components: ComponentItem[]
  gridSlot: GridSlot
  isDropTarget: boolean
  isDraggingAny: boolean
  onMeasure: (id: string, rect: DOMRect) => void
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({
    id: slotId,
    data: {
      componentId,
      gridSlot,
    },
  })

  const component = components.find((c) => c.id === componentId)
  const ref = useRef<HTMLDivElement>(null)
  const prevRectRef = useRef<DOMRect | null>(null)

  // Measure the element's dimensions and report them
  useEffect(() => {
    if (!ref.current) return

    // Initial measurement
    const measureElement = () => {
      if (ref.current) {
        const newRect = ref.current.getBoundingClientRect()

        // Only update if the dimensions have changed significantly
        if (isRectDifferent(prevRectRef.current, newRect)) {
          prevRectRef.current = newRect
          onMeasure(slotId, newRect)
        }
      }
    }

    // Measure initially
    measureElement()

    // Set up resize observer to track size changes
    const resizeObserver = new ResizeObserver(() => {
      measureElement()
    })

    resizeObserver.observe(ref.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [slotId, onMeasure])

  if (!component) return null

  return (
    <Box ref={ref} className="relative h-full w-full">
      {/* Drop target indicator - absolute positioned overlay that doesn't affect layout */}
      {isDraggingAny && isDropTarget && (
        <Box className="pointer-events-none absolute inset-0 z-10">
          <Box className="h-full w-full rounded-lg border-2 border-primary ring-2 ring-primary ring-opacity-30" />
        </Box>
      )}

      <Box
        ref={setNodeRef}
        className={`relative h-full rounded-lg ${isDragging ? "opacity-30" : ""}`}
      >
        <Box
          {...attributes}
          {...listeners}
          className="absolute top-2 right-2 z-20 flex h-8 w-8 cursor-move items-center justify-center rounded-full bg-gray-100 opacity-70 hover:opacity-100"
        >
          <GripVertical className="h-5 w-5 text-gray-500" />
        </Box>
        {component.component}
      </Box>
    </Box>
  )
}

export default function DashboardGrid() {
  // State for component mapping
  const [slotMapping, setSlotMapping] = useState(INITIAL_SLOT_MAPPING)
  // State for grid slots configuration
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

  // Memoize the handleMeasure function to prevent it from changing on every render
  const handleMeasure = useCallback((id: string, rect: DOMRect) => {
    setSlotDimensions((prev) => {
      // Only update if the dimensions have changed or don't exist yet
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

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={gridSlots.map((slot) => slot.slotId)}>
        <div className="grid grid-cols-12 gap-4 p-4">
          {gridSlots.map((slot) => (
            <div
              key={slot.slotId}
              className={`${slot.colSpan} ${slot.className || ""}`}
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
              />
            </div>
          ))}
        </div>
      </SortableContext>

      {/* Use the built-in DragOverlay from dnd-kit */}
      <DragOverlay
        adjustScale={false}
        dropAnimation={{
          duration: 200,
          easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
        }}
      >
        {activeId && activeComponent ? (
          <div className="rounded-lg border bg-white shadow-md">
            <div className="relative h-full">
              <div className="absolute top-2 right-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                <GripVertical className="h-5 w-5 text-gray-500" />
              </div>
              {activeComponent.component}
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
