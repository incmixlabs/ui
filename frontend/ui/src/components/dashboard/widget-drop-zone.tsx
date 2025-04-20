import { useDroppable } from "@dnd-kit/core"
import { Box } from "@incmix/ui"
import type React from "react"
import { memo } from "react"

interface WidgetDropZoneProps {
  id: string
  isEditing: boolean
  children: React.ReactNode
}

export const WidgetDropZone = memo(function WidgetDropZone({
  id,
  isEditing,
  children,
}: WidgetDropZoneProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: `widget-${id}`,
    disabled: !isEditing,
    data: {
      widgetId: id,
    },
  })

  return (
    <Box
      ref={setNodeRef}
      className={`h-full w-full transition-all duration-150 ${
        isOver && isEditing
          ? "rounded-lg bg-indigo-8 p-2 ring-2 ring-indigo-10"
          : ""
      }`}
      data-widget-id={id}
    >
      {children}
    </Box>
  )
})
