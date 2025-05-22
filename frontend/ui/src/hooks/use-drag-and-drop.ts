import type React from "react"
import { useState } from "react"
import { toast, useLayoutStore } from "@incmix/ui"
import { useSensor, useSensors, PointerSensor } from "@dnd-kit/core"
import type { DragStartEvent, DragEndEvent } from "@dnd-kit/core"
import type { ComponentSlot, DragData, Breakpoint } from "@incmix/ui/dashboard"
import { DEFAULT_SIZES as DEFAULT_SIZES_CONST } from "@incmix/ui/dashboard"
import { sidebarComponents } from "@incmix/ui/dashboard"
import type { LayoutItemWithNested } from "@incmix/ui/dashboard"
import { LayoutItem } from "@/utils"

export function useDragAndDrop(
  isEditing: boolean,
  gridComponents: ComponentSlot[],
  setGridComponents: React.Dispatch<React.SetStateAction<ComponentSlot[]>>,
) {
  // Get what we need from the layout store
  const { setDefaultLayouts, defaultLayouts } = useLayoutStore()

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

  const calculateGridPosition = (
    currentLayout: LayoutItem[],
    targetWidgetId: string | undefined,
    w: number,
    h: number,
    draggedSlotId: string,
  ) => {
    if (targetWidgetId) {
      const targetIndex = currentLayout.findIndex((item) => item.i === targetWidgetId)

      if (targetIndex !== -1) {
        // Target widget found, position the new item at the same coordinates
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

        // Shift items below the insertion point
        const shiftedItems = currentLayout.map((item, index) => {
          if (index >= targetIndex) {
            return { ...item, y: item.y + h }
          }
          return item
        })

        return [...shiftedItems.slice(0, targetIndex), newItem, ...shiftedItems.slice(targetIndex)]
      }
    }

    // Default case: add to top and shift everything down
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

    return [newItem, ...shiftedItems]
  }

  /**
   * Adds a component to a nested grid within a parent grid item
   * Updated to work with the new structure where nested layouts are included as a layouts property
   */
  const addComponentToNestedGrid = (draggedSlotId: string, targetGroupId: string) => {
    console.log(`Adding component ${draggedSlotId} to nested grid ${targetGroupId}`)

    // Check if the component is already in the grid
    const isAlreadyInGrid = gridComponents.some((comp) => comp.slotId === draggedSlotId)
    if (isAlreadyInGrid) {
      toast.error("This component is already added to the grid. Please remove it first if you want to add it again.")
      return false
    }

    // Find the component to add
    const draggedComponent = sidebarComponents.find((comp) => comp.slotId === draggedSlotId)
    if (!draggedComponent) {
      console.error(`Component with ID ${draggedSlotId} not found in sidebar components`)
      return false
    }
    // Get the component name from the drag data
    const componentName = activeDragData?.componentName || draggedComponent.componentName || "empty"

    // Create a unique ID for the nested component
    const nestedItemId = `${targetGroupId}|${Date.now()}`

    // Add the component with the new ID to gridComponents
    const newComponent = {
      ...draggedComponent,
      slotId: nestedItemId,
      componentName:componentName,
    }

    setGridComponents((prev) => [...prev, newComponent])

    // Get the current layouts from the store
    const currentLayouts = { ...defaultLayouts }

    // Create a deep copy to avoid reference issues
    const updatedLayouts = JSON.parse(JSON.stringify(currentLayouts))

    // Process each breakpoint
    Object.keys(updatedLayouts).forEach((breakpoint) => {
      const breakpointKey = breakpoint as Breakpoint

      // Find the parent grid item in this breakpoint
      const parentItemIndex = updatedLayouts[breakpointKey].findIndex((item: LayoutItem) => item.i === targetGroupId)

      if (parentItemIndex !== -1) {
        // Get the parent item
        const parentItem = updatedLayouts[breakpointKey][parentItemIndex] as LayoutItemWithNested

        // Initialize layouts array if it doesn't exist
        if (!parentItem.layouts) {
          parentItem.layouts = []
        }

        // Calculate position for the new nested item
        const lastItem = parentItem.layouts[parentItem.layouts.length - 1]
        const newY = lastItem ? lastItem.y + lastItem.h : 0

        // Create the new nested item
        const newNestedItem: LayoutItem = {
          i: nestedItemId,
          x: 0,
          y: newY,
          w: 12, 
          h: 6, 
          moved: false,
          static: false,
          componentName: componentName,
        }

        parentItem.layouts.push(newNestedItem)

        // Update the parent item in the layouts
        updatedLayouts[breakpointKey][parentItemIndex] = parentItem
      } else {
        console.warn(`Parent grid item ${targetGroupId} not found in breakpoint ${breakpoint}`)
      }
    })

    // Update the layouts in the store
    setDefaultLayouts(updatedLayouts)

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
    const componentName = activeDragData?.componentName || draggedComponent.componentName || "empty"

    // Create a component slot with the component name
    const newComponent: ComponentSlot = {
      slotId: draggedSlotId,
      component: draggedComponent.component,
      title: draggedComponent.title,
      compImage: draggedComponent.compImage,
      componentName: componentName,
    }
    setGridComponents((prev) => [...prev, newComponent])

    const componentLayouts = draggedComponent.layouts || DEFAULT_SIZES_CONST
    const newLayouts = { ...defaultLayouts }
    ;(Object.keys(newLayouts) as Breakpoint[]).forEach((breakpoint) => {
      const { w, h } = componentLayouts[breakpoint]
      const currentLayout = [...newLayouts[breakpoint]]

      // Calculate new layout with the component
      const updatedLayout = calculateGridPosition(currentLayout, targetWidgetId, w, h, draggedSlotId)

      // Add component name to the new layout item
      newLayouts[breakpoint] = updatedLayout.map((item) => {
        if (item.i === draggedSlotId) {
          return {
            ...item,
            componentName: componentName, // Add component name information
          }
        }
        return item
      })
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