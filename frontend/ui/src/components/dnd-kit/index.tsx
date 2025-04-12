import { useSortable } from "@dnd-kit/sortable"
import { Box } from "@incmix/ui"
import { GripVertical } from "lucide-react"
import { useEffect, useRef } from "react"
import type { ReactNode } from "react"

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

export const isRectDifferent = (
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

export function SortableItem({
  slotId,
  componentId,
  components,
  gridSlot,
  isDropTarget,
  isDraggingAny,
  onMeasure,
  isEditing,
}: {
  slotId: string
  componentId: string
  components: ComponentItem[]
  gridSlot: GridSlot
  isDropTarget: boolean
  isDraggingAny: boolean
  isEditing: boolean
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

  useEffect(() => {
    if (!ref.current) return

    const measureElement = () => {
      if (ref.current) {
        const newRect = ref.current.getBoundingClientRect()

        if (isRectDifferent(prevRectRef.current, newRect)) {
          prevRectRef.current = newRect
          onMeasure(slotId, newRect)
        }
      }
    }

    measureElement()

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
      {isDraggingAny && isDropTarget && (
        <Box className="pointer-events-none absolute inset-0 z-10">
          <Box className="h-full w-full rounded-lg border-2 border-blue-10 ring-2 ring-blue-10 ring-opacity-30" />
        </Box>
      )}
      <Box
        ref={setNodeRef}
        className={`relative h-full rounded-lg ${isDragging ? "opacity-20" : ""}`}
      >
        {isEditing && (
          <Box
            {...attributes}
            {...listeners}
            className="absolute top-2 right-2 z-20 flex h-8 w-8 cursor-move items-center justify-center rounded-lg bg-gray-5 opacity-70 shadow-md hover:opacity-100"
          >
            <GripVertical className="h-5 w-5 text-gray-12" />
          </Box>
        )}
        {component.component}
      </Box>
    </Box>
  )
}
