import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { Box, sidebarComponents } from "@incmix/ui"
import type React from "react"
import { forwardRef, useEffect, useState } from "react"

interface DraggableComponentProps {
  id: string
  title: string
  image?: string
  component: React.ReactNode
  componentName?: string
  disabled?: boolean
  darkImage?: string
  lightImage?: string
  onDragStart?: () => void
  onDragEnd?: () => void
}

export const DraggableComponent = forwardRef<
  HTMLDivElement,
  DraggableComponentProps
>(
  (
    { id, title, image, darkImage, lightImage, component, componentName, disabled = false, onDragStart, onDragEnd },
    _ref
  ) => {
    const [isDraggingLocal, setIsDraggingLocal] = useState(false)
    const componentData = sidebarComponents.find((comp) => comp.slotId === id)
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
          darkImage,
          lightImage,
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
          <Box className="absolute z-50  rounded-lg border border-gray-400 border-dashed bg-gray-1 opacity-50 h-full">
            <img
              src={lightImage || "/placeholder.svg?height=150&width=150"}
              alt={title}
              className="h-full w-full rounded-lg dark:hidden block"
            />
            <img
              src={darkImage || "/placeholder.svg?height=150&width=150"}
              alt={title}
              className="h-full w-full rounded-lg dark:block hidden"
            />
          </Box>
        )}

        <Box
          ref={setNodeRef}
          style={style}
          {...listeners}
          {...attributes}
          onMouseDown={handleMouseDown}
          className={`rounded-lg border border-gray-5 h-full dark:bg-gray-2 bg-white  ${
            disabled
              ? "cursor-not-allowed opacity-60"
              : "cursor-grab active:cursor-grabbing"
          } relative ${isDragging ? "opacity-0" : ""}`}
        >
          <img
            src={lightImage || "/placeholder.svg?height=150&width=150"}
            alt={title}
            className="h-full w-full rounded-lg dark:hidden block"
          />
          <img
            src={darkImage || "/placeholder.svg?height=150&width=150"}
            alt={title}
            className="h-full w-full rounded-lg dark:block hidden"
          />
          <Box className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/30 opacity-0 transition-opacity hover:opacity-100">
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