"use client"

import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { Box } from "@incmix/ui"
import type React from "react"
import { forwardRef, useEffect, useState } from "react"

interface DraggableComponentProps {
  id: string
  title: string
  image?: string
  component: React.ReactNode
  disabled?: boolean
  onDragStart?: () => void
  onDragEnd?: () => void
}

export const DraggableComponent = forwardRef<
  HTMLDivElement,
  DraggableComponentProps
>(
  (
    { id, title, image, component, disabled = false, onDragStart, onDragEnd },
    _ref
  ) => {
    const [isDraggingLocal, setIsDraggingLocal] = useState(false)

    const { attributes, listeners, setNodeRef, transform, isDragging } =
      useDraggable({
        id,
        data: {
          type: "widget",
          slotId: id,
          title,
          component,
          image,
        },
        disabled,
      })

    // Update local dragging state and call parent handlers
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
        // toast({
        //   title: "Editing mode is disabled",
        //   description: "Please enable editing mode to drag and drop components.",
        //   variant: "destructive",
        // })
        return
      }
    }

    return (
      <Box className="relative">
        {/* Semi-transparent placeholder that stays in place when dragging */}
        {isDragging && (
          <div className="absolute z-50 rounded-lg border border-gray-400 border-dashed bg-gray-100 opacity-50">
            <img
              src={image || "/placeholder.svg?height=150&width=150"}
              alt={title}
              className="h-full w-full rounded-lg"
            />
          </div>
        )}

        {/* Actual draggable element */}
        <Box
          ref={setNodeRef}
          style={style}
          {...listeners}
          {...attributes}
          onMouseDown={handleMouseDown}
          className={`rounded-lg border border-gray-5 shadow ${
            disabled
              ? "cursor-not-allowed opacity-60"
              : "cursor-grab active:cursor-grabbing"
          } relative ${isDragging ? "opacity-0" : ""}`}
        >
          <img
            src={image || "/placeholder.svg?height=150&width=150"}
            alt={title}
            className="h-full w-full rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/30 opacity-0 transition-opacity hover:opacity-100">
            <span className="font-medium text-white">{title}</span>
          </div>
        </Box>
      </Box>
    )
  }
)

DraggableComponent.displayName = "DraggableComponent"
