"use client"

import type React from "react"

import { useState, useCallback, useRef, useEffect } from "react"

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
    console.log(
      "Collected widget positions:",
      rects.length,
      rects.map((r) => r.id),
    )
  }, [containerRef])

  const checkIntersection = useCallback((selStart: { x: number; y: number }, selEnd: { x: number; y: number }) => {
    if (!selStart || !selEnd) return []

    const selLeft = Math.min(selStart.x, selEnd.x)
    const selTop = Math.min(selStart.y, selEnd.y)
    const selRight = Math.max(selStart.x, selEnd.x)
    const selBottom = Math.max(selStart.y, selEnd.y)

    const intersecting = widgetRects.current
      .filter((widget) => {
        const { rect } = widget
        return rect.left < selRight && rect.right > selLeft && rect.top < selBottom && rect.bottom > selTop
      })
      .map((widget) => widget.id)

    return intersecting
  }, [])

  // Handle mouse down
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (!isActive || !containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      if (
        e.clientX < containerRect.left ||
        e.clientX > containerRect.right ||
        e.clientY < containerRect.top ||
        e.clientY > containerRect.bottom
      ) {
        return
      }

      const target = e.target as HTMLElement
      const isInteractiveElement = target.closest(
        'button, [role="button"], input, [role="checkbox"], .react-resizable-handle',
      )

      if (isInteractiveElement) return

      collectWidgetPositions()

      setStartPoint({ x: e.clientX, y: e.clientY })
      setEndPoint({ x: e.clientX, y: e.clientY })
      setIsSelecting(true)

      if (!isShiftPressed.current) {
        setSelectedIds([])
      }
      e.preventDefault()
    },
    [isActive, containerRef, collectWidgetPositions],
  )

  // Handle mouse move
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isSelecting || !startPoint) return

      setEndPoint({ x: e.clientX, y: e.clientY })

      const intersectingIds = checkIntersection(startPoint, { x: e.clientX, y: e.clientY })

      if (isShiftPressed.current) {
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

    setStartPoint(null)
    setEndPoint(null)

    if (onSelectionChange) {
      onSelectionChange(selectedIds)
    }
  }, [isSelecting, selectedIds, onSelectionChange])

  // Handle key down for shift key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Shift") {
      isShiftPressed.current = true
    }
  }, [])

  // Handle key up for shift key
  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === "Shift") {
      isShiftPressed.current = false
    }
  }, [])

  // Set up event listeners
  useEffect(() => {
    if (!isActive) return

    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)

    return () => {
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    }
  }, [isActive, handleMouseDown, handleMouseMove, handleMouseUp, handleKeyDown, handleKeyUp])

  return {
    startPoint,
    endPoint,
    isSelecting,
    selectedIds,
    setSelectedIds,
  }
}
