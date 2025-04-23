import { Checkbox } from "@incmix/ui/base"
import type React from "react"

interface WidgetSelectionProps {
  id: string
  isSelected: boolean
  onSelect: (id: string, selected: boolean) => void
  children: React.ReactNode
}

export function WidgetSelection({ id, isSelected, onSelect, children }: WidgetSelectionProps) {
  return (
    <div className="relative h-full w-full">
      <div
        className={`absolute inset-0 z-10 rounded-lg transition-colors ${
          isSelected ? "ring-2 ring-blue-500 ring-inset bg-blue-100/30" : ""
        }`}
        data-widget-id={id}
      >
        <div className="absolute left-2 top-2">
          <Checkbox
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            checked={isSelected}
            onCheckedChange={(checked) => onSelect(id, checked as boolean)}
            className="h-5 w-5 border-2 border-blue-500 bg-white"
          />
        </div>
      </div>
      {children}
    </div>
  )
}
