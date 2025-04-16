import { useDroppable } from "@dnd-kit/core"
import type { ReactNode } from "react"

interface DroppableAreaProps {
  id: string
  children: ReactNode
  isEditing?: boolean
  isOver?: boolean
}

export function DroppableArea({
  id,
  children,
  isEditing = true,
  isOver: isOverProp,
}: DroppableAreaProps) {
  const { isOver: isOverInternal, setNodeRef } = useDroppable({
    id,
  })

  // Use provided isOver prop if available, otherwise use internal state
  const isOver = isOverProp !== undefined ? isOverProp : isOverInternal

  return (
    <div
      ref={setNodeRef}
      className={`h-full w-full transition-colors duration-200 ${
        isOver
          ? isEditing
            ? "rounded-lg bg-blue-100/30 ring-2 ring-blue-300 ring-inset"
            : "rounded-lg bg-red-100/30 ring-2 ring-red-300 ring-inset"
          : ""
      }`}
      data-editing={isEditing ? "true" : "false"}
      data-over={isOver ? "true" : "false"}
    >
      {children}
    </div>
  )
}
