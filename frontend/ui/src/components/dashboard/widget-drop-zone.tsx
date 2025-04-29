"use client";

import type React from "react";
import { useDroppable } from "@dnd-kit/core";
import { memo } from "react";
import { useSelectionStore } from "@hooks";
import { Checkbox, IconButton,Box} from "@incmix/ui/base";
import { cn } from "@utils";
import { Link, Trash } from "lucide-react";

interface WidgetDropZoneProps {
  id: string
  isEditing: boolean
  handleRemoveComponent: (id: string,groupId?:string) => void
  isGrouped?: boolean
  groupId?: string
  children: React.ReactNode
}

export const WidgetDropZone = memo(function WidgetDropZone({
  id,
  isEditing,
  handleRemoveComponent,
  groupId,
  children,
}: WidgetDropZoneProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: `widget-${id}`,
    disabled: !isEditing,
    data: {
      widgetId: id,
      type: "widget-drop-zone",
      groupId,
    },
  })

  return (
    <Box
      ref={setNodeRef}
      className={cn(
        "relative h-full w-full transition-all duration-150",
        isOver && isEditing && "ring-2 ring-blue-500 ring-inset bg-blue-100/30",
      )}
      data-widget-id={id}
      data-group-id={groupId}
    >
      {isEditing && (
        <>
          <IconButton
            className="absolute top-3 right-3 z-20"
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            color="red"
            onClick={() => handleRemoveComponent(id,groupId)}
          >
            <Trash size={16} />
          </IconButton>
        </>
      )}

      {children}
    </Box>
  )
})