"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Responsive, WidthProvider } from "react-grid-layout"
import type { Layout } from "react-grid-layout"
import type { ILayoutItem } from "./dashboard-types"
import { IconButton } from "@incmix/ui"
import { Trash, Plus, Layers } from "lucide-react"

const ResponsiveGridLayout = WidthProvider(Responsive)

interface NestedGridContainerProps {
  id: string
  layout: ILayoutItem[]
  isEditing: boolean
  onLayoutChange?: (layout: ILayoutItem[]) => void
  onAddWidget?: (containerId: string) => void
  onRemoveContainer?: (containerId: string) => void
  renderWidget: (itemId: string) => React.ReactNode
}

export function NestedGridContainer({
  id,
  layout,
  isEditing,
  onLayoutChange,
  onAddWidget,
  onRemoveContainer,
  renderWidget,
}: NestedGridContainerProps) {
  const [currentLayout, setCurrentLayout] = useState<Layout[]>(layout as Layout[])

  const handleLayoutChange = useCallback(
    (layout: Layout[]) => {
      setCurrentLayout(layout)
      if (onLayoutChange) {
        onLayoutChange(layout as ILayoutItem[])
      }
    },
    [onLayoutChange],
  )

  // Convert layout to the format expected by react-grid-layout
  const formattedLayout = {
    lg: currentLayout,
    md: currentLayout,
    sm: currentLayout,
    xs: currentLayout,
    xxs: currentLayout,
  }

  return (
    <div className="nested-grid-container h-full w-full rounded-lg border-2 border-blue-400 bg-blue-50/10 p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers size={16} className="text-blue-500" />
          <h3 className="text-sm font-medium">Nested Container</h3>
          <span className="rounded bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-800">{id}</span>
        </div>
        {isEditing && (
          <div className="flex items-center gap-1">
            <IconButton
              color="blue"
              onClick={(e) => {
                e.stopPropagation()
                onAddWidget?.(id)
              }}
              title="Add Widget"
            >
              <Plus size={14} />
            </IconButton>
            <IconButton
              color="red"
              onClick={(e) => {
                e.stopPropagation()
                onRemoveContainer?.(id)
              }}
              title="Remove Container"
            >
              <Trash size={14} />
            </IconButton>
          </div>
        )}
      </div>
      <div className="h-[calc(100%-2rem)]">
        <ResponsiveGridLayout
          className="layout"
          layouts={formattedLayout}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          isDraggable={isEditing}
          isResizable={isEditing}
          onLayoutChange={handleLayoutChange}
          compactType={null}
          preventCollision
        >
          {currentLayout.map((item) => (
            <div key={item.i} className="h-full w-full">
              {renderWidget(item.i)}
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </div>
  )
}
