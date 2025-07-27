import type React from "react"

import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { Box } from "@base"
// If useSettingsStore is a default export:
import {useAppearanceStore} from "@incmix/store/use-settings-store"
// Or, if the export is named differently, use the correct name:
// import { correctExportName } from "@incmix/store/use-settings-store"
import { forwardRef, useEffect, useMemo, useState } from "react"
import { getWidgets } from "./widgets-data"


interface DraggableComponentProps {
  id: string
  title: string
  image?: string
  component: React.ReactNode
  componentName?: string
  disabled?: boolean
  onDragStart?: () => void
  onDragEnd?: () => void
}

export const DraggableComponent = forwardRef<
  HTMLDivElement,
  DraggableComponentProps
>(
  (
    { id, title, image,  component, componentName, disabled = false, onDragStart, onDragEnd },
    _ref
  ) => {
    const [isDraggingLocal, setIsDraggingLocal] = useState(false)
    const widgets = Object.values(getWidgets());
    const componentData = widgets.find((comp) => comp.slotId === id)
    const layouts = componentData?.layouts
    // If componentName is not provided, try to get it from componentData
    const effectiveComponentName = componentName || componentData?.componentName

    const { attributes, listeners, setNodeRef, transform, isDragging } =
      useDraggable({
        id,
        data: {
          type: "widget",
          slotId: id,
          title,
          component,
          image,
          layouts,
          componentName: effectiveComponentName,
        },
        disabled,
      })

    useEffect(() => {
      if (isDragging && !isDraggingLocal) {
        setIsDraggingLocal(true)
        onDragStart?.()
      } else if (!isDragging && isDraggingLocal) {
        setIsDraggingLocal(false)
        onDragEnd?.()
      }
    }, [isDragging, isDraggingLocal, onDragStart, onDragEnd])

    const style = transform
      ? {
          transform: CSS.Translate.toString(transform),
          zIndex: 1000,
        }
      : undefined

    const handleMouseDown = (e: React.MouseEvent) => {
      if (disabled) {
        e.preventDefault()
        e.stopPropagation()
        return
      }
    }

    return (
      <>
        {isDragging && (
          <Box className="absolute z-50  rounded-app border border-gray-400 border-dashed bg-gray-1 opacity-50 h-full">
            <img
              src={image || "/placeholder.svg?height=150&width=150"}
              alt={title}
              className="h-full w-full rounded-lg block"
            />
          </Box>
        )}

        <Box
          ref={setNodeRef}
          style={style}
          {...listeners}
          {...attributes}
          onMouseDown={handleMouseDown}
          className={`rounded-app border border-gray-5 h-full dark:bg-gray-2 bg-white  ${
            disabled
              ? "cursor-not-allowed opacity-60"
              : "cursor-grab active:cursor-grabbing"
          } relative ${isDragging ? "opacity-0" : ""}`}
        >
          <img
            src={image || "/placeholder.svg?height=150&width=150"}
            alt={title}
            className="h-full w-full rounded-lg  block"
          />
          <Box className="absolute inset-0 flex items-center justify-center rounded-app bg-black/30 opacity-0 transition-opacity hover:opacity-100">
            <span className="text-center text-xs font-medium text-white">
              {title}
            </span>
          </Box>
        </Box>
      </>
    )
  }
)

DraggableComponent.displayName = "DraggableComponent"
