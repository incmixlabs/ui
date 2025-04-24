"use client"

import type React from "react"

import { useState, useCallback, useRef, useEffect } from "react"
import { useSelectionStore } from "./use-widgets-selection"

interface UseMarqueeSelectionProps {
  containerRef: React.RefObject<HTMLElement>
  onSelectionChange?: (selectedIds: string[]) => void
  isActive: boolean
}

interface WidgetRect {
  id: string
  rect: DOMRect
}

export function useMarqueeSelection({ containerRef, onSelectionChange, isActive }: UseMarqueeSelectionProps) {
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null)
  const [endPoint, setEndPoint] = useState<{ x: number; y: number } | null>(null)
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const widgetRects = useRef<WidgetRect[]>([])
  const isShiftPressed = useRef(false)
  const { selectedWidgets, addSelectedWidget, setSelectedWidgets, clearSelection } = useSelectionStore()
  const isDraggingWidget = useRef(false)

  // Collect all widget positions
  const collectWidgetPositions = useCallback(() => {
    if (!containerRef.current) return

    const widgets = containerRef.current.querySelectorAll("[data-widget-id]")
    const rects: WidgetRect[] = []

    widgets.forEach((widget) => {
      const id = widget.getAttribute("data-widget-id")
      if (id) {
        rects.push({
          id,
          rect: widget.getBoundingClientRect(),
        })
      }
    })

    widgetRects.current = rects
  }, [containerRef])

  // Check if a widget intersects with the selection rectangle
  const checkIntersection = useCallback((selStart: { x: number; y: number }, selEnd: { x: number; y: number }) => {
    if (!selStart || !selEnd) return []

    const selLeft = Math.min(selStart.x, selEnd.x)
    const selTop = Math.min(selStart.y, selEnd.y)
    const selRight = Math.max(selStart.x, selEnd.x)
    const selBottom = Math.max(selStart.y, selEnd.y)

    const intersecting = widgetRects.current
      .filter((widget) => {
        const { rect } = widget
        // Check if the widget rectangle intersects with the selection rectangle
        return rect.left < selRight && rect.right > selLeft && rect.top < selBottom && rect.bottom > selTop
      })
      .map((widget) => widget.id)

    return intersecting
  }, [])

  // Check if point is over a widget or widget-related element
  const isPointOverWidgetOrControl = useCallback(
    (x: number, y: number): boolean => {
      if (!containerRef.current) return false

      // Get the element at the point
      const element = document.elementFromPoint(x, y)
      if (!element) return false

      // Check if the element or any of its parents has a data-widget-id attribute
      const widgetElement = element.closest("[data-widget-id]")

      // Check if the element is a control element (button, resize handle, etc.)
      const isControlElement = element.closest(
        'button, [role="button"], input, [role="checkbox"], .react-resizable-handle, .react-draggable-handle',
      )

      // Check if the element is part of the react-grid-item
      const isGridItem = element.closest(".react-grid-item")

      return !!widgetElement || !!isControlElement || !!isGridItem
    },
    [containerRef],
  )

  // Check if point is within the container but not over a widget
  const isPointInEmptyArea = useCallback(
    (x: number, y: number): boolean => {
      if (!containerRef.current) return false

      // Check if point is within container
      const containerRect = containerRef.current.getBoundingClientRect()
      const isInContainer =
        x >= containerRect.left && x <= containerRect.right && y >= containerRect.top && y <= containerRect.bottom

      // If in container, check if it's over a widget or control
      if (isInContainer) {
        return !isPointOverWidgetOrControl(x, y)
      }

      return false
    },
    [containerRef, isPointOverWidgetOrControl],
  )

  // Monitor for widget dragging
  useEffect(() => {
    const handleDragStart = () => {
      isDraggingWidget.current = true
    }

    const handleDragEnd = () => {
      // Use a small timeout to ensure this happens after mouseup
      setTimeout(() => {
        isDraggingWidget.current = false
      }, 50)
    }

    // Listen for drag events on grid items
    const gridItems = document.querySelectorAll(".react-grid-item")
    gridItems.forEach((item) => {
      item.addEventListener("mousedown", handleDragStart)
    })

    document.addEventListener("mouseup", handleDragEnd)

    return () => {
      gridItems.forEach((item) => {
        item.removeEventListener("mousedown", handleDragStart)
      })
      document.removeEventListener("mouseup", handleDragEnd)
    }
  }, [])

  // Handle mouse down
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (!isActive || !containerRef.current) return

      // Don't start selection on interactive elements
      const target = e.target as HTMLElement
      const isInteractiveElement = target.closest(
        'button, [role="button"], input, [role="checkbox"], .react-resizable-handle',
      )
      if (isInteractiveElement) return

      // Check if we're clicking in an empty area of the container
      const isEmptyArea = isPointInEmptyArea(e.clientX, e.clientY)

      // Only start marquee selection if:
      // 1. In empty area, OR
      // 2. Shift is pressed and over a widget (for shift+click selection)
      // 3. NOT currently dragging a widget
      if ((!isEmptyArea && !isShiftPressed.current) || isDraggingWidget.current) return

      // Collect widget positions before starting selection
      collectWidgetPositions()

      setStartPoint({ x: e.clientX, y: e.clientY })
      setEndPoint({ x: e.clientX, y: e.clientY })
      setIsSelecting(true)

      // If shift is not pressed, clear previous selection
      if (!isShiftPressed.current) {
        setSelectedIds([])
        clearSelection()
      }

      // Prevent default to avoid text selection
      e.preventDefault()
    },
    [isActive, containerRef, collectWidgetPositions, isPointInEmptyArea, clearSelection],
  )

  // Handle mouse move
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isSelecting || !startPoint) return

      setEndPoint({ x: e.clientX, y: e.clientY })

      // Update selected widgets based on intersection
      const intersectingIds = checkIntersection(startPoint, { x: e.clientX, y: e.clientY })

      if (isShiftPressed.current) {
        // Add to existing selection
        setSelectedIds((prev) => {
          const newSelection = [...prev]

          intersectingIds.forEach((id) => {
            if (!newSelection.includes(id)) {
              newSelection.push(id)
            }
          })

          return newSelection
        })
      } else {
        setSelectedIds(intersectingIds)
      }
    },
    [isSelecting, startPoint, checkIntersection],
  )

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    if (!isSelecting) return

    setIsSelecting(false)

    // Keep the selection active but clear the rectangle
    setStartPoint(null)
    setEndPoint(null)

    // Notify parent component of selection change
    if (onSelectionChange) {
      onSelectionChange(selectedIds)
    }
  }, [isSelecting, selectedIds, onSelectionChange])

  // Handle key down for shift key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Shift") {
      isShiftPressed.current = true

      // Add a class to the body to indicate shift is pressed
      document.body.classList.add("shift-pressed")
    }
  }, [])

  // Handle key up for shift key
  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === "Shift") {
      isShiftPressed.current = false

      // Remove the class from the body
      document.body.classList.remove("shift-pressed")
    }
  }, [])

  // Handle shift+click on widgets
  const handleWidgetClick = useCallback(
    (e: MouseEvent) => {
      if (!isActive || !isShiftPressed.current) return

      const target = e.target as HTMLElement
      const widgetElement = target.closest("[data-widget-id]")

      if (widgetElement) {
        const widgetId = widgetElement.getAttribute("data-widget-id")
        if (widgetId) {
          // Add to selection
          addSelectedWidget(widgetId)
          e.stopPropagation()
          e.preventDefault()
        }
      }
    },
    [isActive, addSelectedWidget],
  )

  // Set up event listeners
  useEffect(() => {
    if (!isActive) return

    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)
    document.addEventListener("click", handleWidgetClick, true) // Use capture phase

    return () => {
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
      document.removeEventListener("click", handleWidgetClick, true)
    }
  }, [isActive, handleMouseDown, handleMouseMove, handleMouseUp, handleKeyDown, handleKeyUp, handleWidgetClick])

  return {
    startPoint,
    endPoint,
    isSelecting,
    selectedIds,
    setSelectedIds,
    isShiftPressed: isShiftPressed.current,
  }
}
