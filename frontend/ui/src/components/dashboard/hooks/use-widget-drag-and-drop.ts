import type React from "react";
import { useState } from "react";
import { toast, useLayoutStore } from "@incmix/ui";
import { useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import type { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import type { ComponentSlot, DragData, Breakpoint } from "@incmix/ui/dashboard";
import { DEFAULT_SIZES as DEFAULT_SIZES_CONST } from "@incmix/ui/dashboard";
import { getWidgets} from "../sidebar/widgets-data"
import type { LayoutItemWithNested } from "@incmix/ui/dashboard";
import { LayoutItem } from "@incmix/ui/dashboard";

export function useWidgetDragAndDrop(
  isEditing: boolean,
  gridComponents: ComponentSlot[],
  setGridComponents: React.Dispatch<React.SetStateAction<ComponentSlot[]>>,
) {
    // Get what we need from the layout store
  const widgets = getWidgets();
  // Get what we need from the layout store
  const { setDefaultLayouts, defaultLayouts } = useLayoutStore();

  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [activeDragData, setActiveDragData] = useState<
    DragData | null | undefined
  >(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveDragId(active.id as string);
    setActiveDragData(active.data.current);
  };

  const calculateGridPosition = (
    currentLayout: LayoutItem[],
    targetWidgetId: string | undefined,
    w: number,
    h: number,
    draggedSlotId: string,
  ) => {
    if (targetWidgetId) {
      const targetIndex = currentLayout.findIndex(
        (item) => item.i === targetWidgetId,
      );

      if (targetIndex !== -1) {
        // Target widget found, position the new item at the same coordinates
        const targetWidget = currentLayout[targetIndex];
        const newItem = {
          i: draggedSlotId,
          x: targetWidget.x,
          y: targetWidget.y,
          w,
          h,
          moved: false,
          static: false,
        };

        // Shift items below the insertion point
        const shiftedItems = currentLayout.map((item, index) => {
          if (index >= targetIndex) {
            return { ...item, y: item.y + h };
          }
          return item;
        });

        return [
          ...shiftedItems.slice(0, targetIndex),
          newItem,
          ...shiftedItems.slice(targetIndex),
        ];
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
    };

    const shiftedItems = currentLayout.map((item) => ({
      ...item,
      y: item.y + h,
    }));

    return [newItem, ...shiftedItems];
  };

  /**
   * Adds a component to a nested grid within a parent grid item
   * Updated to work with the new structure where nested layouts are included as a layouts property
   */
  const addComponentToNestedGrid = (
    draggedSlotId: string,
    targetGroupId: string,
  ) => {
    console.log(
      `Adding component ${draggedSlotId} to nested grid ${targetGroupId}`,
    );

    // Find the component to add
    const draggedComponent = Object.values(widgets).find((comp) => comp.slotId === draggedSlotId)
    console.log("before checking draggedComponent", draggedComponent);

    if (!draggedComponent) {
      console.error(
        `Component with ID ${draggedSlotId} not found in sidebar components`,
      );
      return false;
    }
    console.log("checking draggedComponent", draggedComponent);

    const componentName =
      activeDragData?.componentName ||
      draggedComponent.componentName ||
      "empty";
    console.log("checking componentName", componentName);
    // Create a unique ID for the nested component
    const nestedItemId = `${targetGroupId}|${Date.now()}`;

    const newComponent = {
      ...draggedComponent,
      slotId: nestedItemId,
      componentName: componentName,
    };

    setGridComponents((prev) => [...prev, newComponent]);

    const currentLayouts = { ...defaultLayouts };

    const updatedLayouts = JSON.parse(JSON.stringify(currentLayouts));

    // Process each breakpoint
    Object.keys(updatedLayouts).forEach((breakpoint) => {
      const breakpointKey = breakpoint as Breakpoint;

      // Find the parent grid item in this breakpoint
      const parentItemIndex = updatedLayouts[breakpointKey].findIndex(
        (item: LayoutItem) => item.i === targetGroupId,
      );

      if (parentItemIndex !== -1) {
        // Get the parent item
        const parentItem = updatedLayouts[breakpointKey][
          parentItemIndex
        ] as LayoutItemWithNested;
        console.log("parentItem", parentItem);

        // Initialize layouts array if it doesn't exist
        if (!parentItem.layouts) {
          parentItem.layouts = [];
        }

        let adjustedWidgetWidth: number;

        if (parentItem.w <= 3) {
          adjustedWidgetWidth = 12;
        } else if (parentItem.w <= 6) {
          adjustedWidgetWidth =
            draggedComponent.layouts?.[breakpointKey]?.w * 2;
        } else if (parentItem.w <= 8) {
          adjustedWidgetWidth = Math.round(
            draggedComponent.layouts?.[breakpointKey]?.w * 1.4,
          );
        } else {
          adjustedWidgetWidth = draggedComponent.layouts?.[breakpointKey]?.w;
        }

        // Calculate position for the new nested item
        const lastItem = parentItem.layouts[parentItem.layouts.length - 1];
        const newY = lastItem ? lastItem.y + lastItem.h : 0;
        console.log("adjustedWidgetWidth", adjustedWidgetWidth);

        const heightOfDroppedComponent =
          draggedComponent.layouts?.[breakpointKey]?.h || 6;
        parentItem.h += heightOfDroppedComponent;
        // Create the new nested item
        const newNestedItem: LayoutItem = {
          i: nestedItemId,
          x: 0,
          y: newY,
          w: adjustedWidgetWidth || 12,
          h: draggedComponent.layouts?.[breakpointKey]?.h || 6,
          moved: false,
          static: false,
          componentName: componentName,
        };
        parentItem.layouts.push(newNestedItem);
        // Update the parent item in the layouts
        updatedLayouts[breakpointKey][parentItemIndex] = parentItem;
      } else {
        console.warn(
          `Parent grid item ${targetGroupId} not found in breakpoint ${breakpoint}`,
        );
      }
    });

    // Update the layouts in the store
    setDefaultLayouts(updatedLayouts);

    toast.success("Component added to nested group", {
      description: `${draggedComponent.title} has been added to the nested group.`,
    });

    return true;
  };

  const addComponentToGrid = (
    draggedSlotId: string,
    targetWidgetId?: string,
  ) => {
    // const isAlreadyInGrid = gridComponents.some((comp) => comp.slotId === draggedSlotId)
    // if (isAlreadyInGrid) {
    //   toast.error("This component is already added to the grid. Please remove it first if you want to add it again.")
    //   return false
    // }

    const draggedComponent = sidebarComponents.find(
      (comp) => comp.slotId === draggedSlotId,
    );
    if (!draggedComponent) return false;

    const newItemId = `${draggedSlotId}|${crypto.randomUUID()}`;

    const componentName =
      activeDragData?.componentName ||
      draggedComponent.componentName ||
      "empty";

    const newComponent: ComponentSlot = {
      slotId: newItemId, // use unique ID
      component: draggedComponent.component,
      title: draggedComponent.title,
      componentName,
    };

    setGridComponents((prev) => [...prev, newComponent]);

    const componentLayouts = draggedComponent.layouts || DEFAULT_SIZES_CONST;
    const newLayouts = { ...defaultLayouts };

    (Object.keys(newLayouts) as Breakpoint[]).forEach((breakpoint) => {
      const { w, h } = componentLayouts[breakpoint];
      const currentLayout = [...newLayouts[breakpoint]];

      // Pass the new unique ID
      const updatedLayout = calculateGridPosition(
        currentLayout,
        targetWidgetId,
        w,
        h,
        newItemId,
      );

      // Add componentName to the layout
      newLayouts[breakpoint] = updatedLayout.map((item) =>
        item.i === newItemId ? { ...item, componentName } : item,
      );
    });

    setDefaultLayouts(newLayouts);

    toast.success("Component added", {
      description: `${draggedComponent.title} has been added to your dashboard.`,
    });

    return true;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragId(null);
    setActiveDragData(null);

    if (!isEditing) {
      return;
    }

    const draggedSlotId = active.id as string;
    const dragData = active.data.current;

    console.log("checking dragData", dragData);
    console.log("checking draggedSlotId", draggedSlotId);

    if (!dragData) {
      return;
    }

    if (over) {
      if (over.id.toString().startsWith("widget-")) {
        const widgetId = over.id.toString().replace("widget-", "");

        const overData = over.data.current;

        console.log("checking overData", overData);
        console.log("checking widgetId", widgetId);

        if (overData && overData.type === "widget-drop-zone") {
          if (overData?.groupId?.startsWith("grid-")) {
            console.log("start with grid", overData);

            addComponentToNestedGrid(draggedSlotId, overData.groupId);
            return;
          }

          addComponentToGrid(draggedSlotId, widgetId);
        }
      } else if (over.id.toString().startsWith("grid-")) {
        const gridId = over.id.toString();
        addComponentToNestedGrid(draggedSlotId, gridId);
      } else if (over.id === "grid-drop-zone") {
        addComponentToGrid(draggedSlotId);
      } else {
        toast.error("Please drop the component on a valid target area.");
      }
    } else {
      toast.error("Please drop the component on a valid target area.");
    }
  };

  return {
    activeDragId,
    activeDragData,
    sensors,
    handleDragStart,
    handleDragEnd,
    addComponentToGrid,
    addComponentToNestedGrid,
  };
}
