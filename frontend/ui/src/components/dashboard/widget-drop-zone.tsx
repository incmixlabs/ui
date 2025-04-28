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
  handleRemoveComponent: (id: string) => void
  isGrouped?: boolean
  groupId?: string
  children: React.ReactNode
}

export const WidgetDropZone = memo(function WidgetDropZone({
  id,
  isEditing,
  handleRemoveComponent,
  isGrouped = false,
  groupId,
  children,
}: WidgetDropZoneProps) {
  const { selectedWidgets, toggleSelectedWidget } = useSelectionStore()
  const isSelected = selectedWidgets.includes(id)
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
        isSelected && isEditing && "ring-2 ring-blue-500 ring-inset bg-blue-100/30",
        isGrouped && "group-widget",
      )}
      data-widget-id={id}
      data-group-id={groupId}
    >
      {/* {isEditing && (
        <>
          <IconButton
            className="absolute top-3 right-3 z-20"
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            color="red"
            onClick={() => handleRemoveComponent(id)}
          >
            <Trash size={16} />
          </IconButton>
          <Box className="absolute left-2 top-2 z-20 flex items-center gap-1">
            <Checkbox
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              checked={isSelected}
              onCheckedChange={() => toggleSelectedWidget(id)}
              className="h-5 w-5 border-2 border-blue-500 bg-white"
            />
            {isGrouped && (
              <div className="bg-blue-100 rounded-full p-1 ml-1">
                <Link size={12} className="text-blue-600" />
              </div>
            )}
          </Box>
        </>
      )} */}

      {children}
    </Box>
  )
})