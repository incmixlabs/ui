"use client";

import type React from "react";
import { useDroppable } from "@dnd-kit/core";
import { memo } from "react";
import { useSelectionStore } from "@hooks";
import { Checkbox, IconButton,Box} from "@incmix/ui/base";
import { cn } from "@utils";
import { Trash } from "lucide-react";

interface WidgetDropZoneProps {
  id: string;
  isEditing: boolean;
  handleRemoveComponent: (id: string) => void;
  children: React.ReactNode;
}

export const WidgetDropZone = memo(function WidgetDropZone({
  id,
  isEditing,
  handleRemoveComponent,
  children,
}: WidgetDropZoneProps) {
  const { selectedWidgets, toggleSelectedWidget } = useSelectionStore();
  const isSelected = selectedWidgets.includes(id);
  const { isOver, setNodeRef } = useDroppable({
    id: `widget-${id}`,
    disabled: !isEditing,
    data: {
      widgetId: id,
      type: "widget-drop-zone",
    },
  });

  return (
    <Box
      ref={setNodeRef}
      className={cn(
        "relative h-full w-full transition-all duration-150 ",
        isEditing && "p-2 ",
        isEditing && isOver ? "bg-indigo-9 p-2 rounded-xl":"bg-gray-5 shadow rounded-xl" ,
      )}
      data-widget-id={id}
    >
      {isEditing && (
        <div
          className={`absolute inset-0  rounded-lg transition-colors ${
            isSelected && "ring-2 ring-indigo-9 z-[1] ring-inset bg-blue-100/30"
          }`}
          data-widget-id={id}
        ></div>
      )}
      {isEditing && (
        <>
            <Checkbox
             onMouseDown={(e) => e.stopPropagation()}
             onTouchStart={(e) => e.stopPropagation()}
              checked={isSelected}
              onCheckedChange={() => toggleSelectedWidget(id)}
              className="absolute left-3 top-3 z-[2] h-5 w-5 border-2 border-indigo-9 bg-white"
            />
        </>
      )}
      {isEditing && (
        <>
          <IconButton
            className="absolute top-3 right-3 z-[2]"
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            color="red"
            disabled={isSelected}
            onClick={() => handleRemoveComponent(id)}
          >
            <Trash size={16} />
          </IconButton>
        </>
      )}

      {children}
    </Box>
  );
});
