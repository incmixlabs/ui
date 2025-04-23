import type React from "react"
import { useState } from "react"
import { Box, IconButton } from "@incmix/ui"
import { Trash, Ungroup } from "lucide-react"
import { WidgetDropZone } from "./widget-drop-zone"

interface WidgetGroupProps {
  id: string
  title: string
  isEditing: boolean
  children: React.ReactNode
  onUngroup: () => void
  onRemove: () => void
}

export function WidgetGroup({ id, title, isEditing, children, onUngroup, onRemove }: WidgetGroupProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <WidgetDropZone id={id} isEditing={isEditing}>
      <Box
        className={`relative h-full w-full rounded-lg border-2 ${
          isEditing ? "border-blue-300 bg-blue-50/10" : "border-transparent"
        } transition-all duration-200`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isEditing && (
          <>
            <div className="absolute left-2 top-2 z-10 rounded bg-blue-100/80 px-2 py-1 text-xs font-medium text-blue-700">
              Group: {title}
            </div>
            <div className="absolute right-2 top-2 z-10 flex space-x-1">
              <IconButton
                className="h-6 w-6"
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onClick={onUngroup}
                title="Ungroup widgets"
              >
                <Ungroup size={14} />
              </IconButton>
              <IconButton
                className="h-6 w-6"
                color="red"
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onClick={onRemove}
                title="Remove group"
              >
                <Trash size={14} />
              </IconButton>
            </div>
          </>
        )}
        <div className="grid h-full w-full grid-cols-1 gap-2 p-3 md:grid-cols-2">{children}</div>
      </Box>
    </WidgetDropZone>
  )
}
