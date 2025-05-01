import type React from "react"

import { useState } from "react"
import { toast, useLayoutStore } from "@incmix/ui"
import { type DragEndEvent, type DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import type { ComponentSlot, DragData, Breakpoint } from "@incmix/ui/dashboard"
import { DEFAULT_SIZES as DEFAULT_SIZES_CONST } from "@incmix/ui/dashboard"
import { sidebarComponents } from "@incmix/ui/dashboard"



export function useDragAndDrop(
  isEditing: boolean,
  gridComponents: ComponentSlot[],
  setGridComponents: React.Dispatch<React.SetStateAction<ComponentSlot[]>>,
) {
  // Get what we need from the layout store
  const { setDefaultLayouts, setNestedLayouts } = useLayoutStore()
  
  const [activeDragId, setActiveDragId] = useState<string | null>(null)
  const [activeDragData, setActiveDragData] = useState<DragData | null | undefined>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveDragId(active.id as string)
    setActiveDragData(active.data.current)
  }

  const addComponentToNestedGrid = (draggedSlotId: string, targetGroupId: string) => {
    const isAlreadyInGrid = gridComponents.some((comp) => comp.slotId === draggedSlotId)
    if (isAlreadyInGrid) {
      toast.error("This component is already added to the grid. Please remove it first if you want to add it again.")
      return false
    }

    const draggedComponent = sidebarComponents.find((comp) => comp.slotId === draggedSlotId)
    if (!draggedComponent) {
      return false
    }

    // Create a unique ID for the nested component
    const nestedItemId = `${targetGroupId}|${Date.now()}`

    // Add the component with the new ID
    const newComponent = {
      ...draggedComponent,
      slotId: nestedItemId,
    }

    setGridComponents((prev) => [...prev, newComponent])

    // Get the current nestedLayouts from the store
    const nestedLayouts = useLayoutStore.getState().nestedLayouts
    
    // Update the nested layout
    const currentNestedLayout = nestedLayouts[targetGroupId] || []
    const lastItem = currentNestedLayout[currentNestedLayout.length - 1]

    // Calculate position for the new item
    const newY = lastItem ? lastItem.y + lastItem.h : 0

    const newNestedItem = {
      i: nestedItemId,
      x: 0,
      y: newY,
      w: 12, // Full width in the nested grid
      h: 6, // Default height
      moved: false,
      static: false,
    }

    // Update state using the store
    setNestedLayouts({
      ...nestedLayouts,
      [targetGroupId]: [...currentNestedLayout, newNestedItem],
    })

    toast.success("Component added to nested group", {
      description: `${draggedComponent.title} has been added to the nested group.`,
    })

    return true
  }

  const addComponentToGrid = (draggedSlotId: string, targetWidgetId?: string) => {
    const isAlreadyInGrid = gridComponents.some((comp) => comp.slotId === draggedSlotId)
    if (isAlreadyInGrid) {
      toast.error("This component is already added to the grid. Please remove it first if you want to add it again.")
      return false
    }

    const draggedComponent = sidebarComponents.find((comp) => comp.slotId === draggedSlotId)
    if (!draggedComponent) {
      return false
    }

    setGridComponents((prev) => [...prev, draggedComponent])

    const defaultLayouts = useLayoutStore.getState().defaultLayouts
    
    const componentLayouts = draggedComponent.layouts || DEFAULT_SIZES_CONST

    const newLayouts = { ...defaultLayouts }
    ;(Object.keys(newLayouts) as Breakpoint[]).forEach((breakpoint) => {
      const { w, h } = componentLayouts[breakpoint]
      const currentLayout = [...newLayouts[breakpoint]]

      if (targetWidgetId) {
        const targetIndex = currentLayout.findIndex((item) => item.i === targetWidgetId)

        if (targetIndex !== -1) {
          const targetWidget = currentLayout[targetIndex]
          const newItem = {
            i: draggedSlotId,
            x: targetWidget.x,
            y: targetWidget.y,
            w,
            h,
            moved: false,
            static: false,
          }

          const shiftedItems = currentLayout.map((item, index) => {
            if (index >= targetIndex) {
              return {
                ...item,
                y: item.y + h,
              }
            }
            return item
          })

          newLayouts[breakpoint] = [...shiftedItems.slice(0, targetIndex), newItem, ...shiftedItems.slice(targetIndex)]
        } else {
          const newItem = {
            i: draggedSlotId,
            x: 0,
            y: 0,
            w,
            h,
            moved: false,
            static: false,
          }

          const shiftedItems = currentLayout.map((item) => ({
            ...item,
            y: item.y + h,
          }))

          newLayouts[breakpoint] = [newItem, ...shiftedItems]
        }
      } else {
        const newItem = {
          i: draggedSlotId,
          x: 0,
          y: 0,
          w,
          h,
          moved: false,
          static: false,
        }

        const shiftedItems = currentLayout.map((item) => ({
          ...item,
          y: item.y + h,
        }))

        newLayouts[breakpoint] = [newItem, ...shiftedItems]
      }
    })

    setDefaultLayouts(newLayouts)

    toast.success("Component added", {
      description: `${draggedComponent.title} has been added to your dashboard.`,
    })

    return true
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    setActiveDragId(null)
    setActiveDragData(null)

    if (!isEditing) {
      return
    }

    const draggedSlotId = active.id as string
    const dragData = active.data.current

    if (!dragData) {
      return
    }

    if (over) {
      if (over.id.toString().startsWith("widget-")) {
        const widgetId = over.id.toString().replace("widget-", "")

        const overData = over.data.current

        if (overData && overData.type === "widget-drop-zone") {
          if (overData?.groupId?.startsWith("grid-")) {
            addComponentToNestedGrid(draggedSlotId, overData.groupId)
            return
          }

          addComponentToGrid(draggedSlotId, widgetId)
        }
      } else if (over.id.toString().startsWith("grid-")) {
        const gridId = over.id.toString()
        addComponentToNestedGrid(draggedSlotId, gridId)
      } else if (over.id === "grid-drop-zone") {
        addComponentToGrid(draggedSlotId)
      } else {
        toast.error("Please drop the component on a valid target area.")
      }
    } else {
      toast.error("Please drop the component on a valid target area.")
    }
  }

  return {
    activeDragId,
    activeDragData,
    sensors,
    handleDragStart,
    handleDragEnd,
    addComponentToGrid,
    addComponentToNestedGrid,
  }
}