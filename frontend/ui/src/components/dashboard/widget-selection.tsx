import { useSelectionStore } from "@hooks"
import { Box, Checkbox } from "@incmix/ui/base"
import type React from "react"

interface WidgetSelectionProps {
  id: string
  children: React.ReactNode
}

export function WidgetSelection({ id, children }: WidgetSelectionProps) {
  const { selectedWidgets, toggleSelectedWidget } = useSelectionStore()
  const isSelected = selectedWidgets.includes(id)

  return (
    <Box className="relative h-full w-full">
      <Box
        className={`absolute inset-0 z-10 rounded-lg transition-colors ${
          isSelected ? "ring-2 ring-blue-500 ring-inset bg-blue-100/30" : ""
        }`}
        data-widget-id={id}
      >
        <Box className="absolute left-2 top-2">
          <Checkbox
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            checked={isSelected}
            onCheckedChange={() => toggleSelectedWidget(id)}
            className="h-5 w-5 border-2 border-blue-500 bg-white"
          />
        </Box>
      </Box>
      {children}
    </Box>
  )
}
