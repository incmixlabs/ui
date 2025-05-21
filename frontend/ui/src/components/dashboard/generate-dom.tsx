"use client"
import RGL, { WidthProvider } from "@incmix/react-grid-layout"
import { Box, cn } from "@incmix/ui"
import { WidgetDropZone,ComponentSlot, CustomLayouts } from "@incmix/ui/dashboard"
import type { Layout } from "@incmix/react-grid-layout"

const ReactGridLayout = WidthProvider(RGL)

export function generateDOM(
  defaultLayouts: CustomLayouts,
  gridComponents: ComponentSlot[],
  handleNestedLayoutChange: (nestedLayout: Layout, itemKey: string) => void,
  isEditing: boolean,
  handleRemoveComponent: (slotId: string) => void,
  handleRemoveNestedComponent: (slotId: string, groupId?: string) => void,
) {
  console.log("Default Layouts in generateDOM",defaultLayouts);
  return defaultLayouts?.lg?.map((item: any) => {
    console.log("Item",item);
    const gridComponent = gridComponents.find((comp) => comp.slotId === item.i)
    // console.log("Grid Component",gridComponent);
    
    if (item.i.startsWith("grid-")) {
      // console.log("Nested Item", item)
      const nested = item.layouts || []
// console.log("Nested",nested);

      return (
        <Box
          key={item.i}
          className={cn(
            "",
            isEditing && "overflow-hidden rounded-lg border-2 border-green-8 border-dashed bg-green-4 p-0 shadow",
          )}
        >
          <ReactGridLayout
            className="nested-layout"
            layout={nested}
            cols={12}
            rowHeight={10}
            onDragStart={(_a, _b, _c, _d, e) => {
              e.stopPropagation()
            }}
            onResizeStart={(_a, _b, _c, _d, e) => {
              e.stopPropagation()
            }}
            onLayoutChange={(nestedLayout) => handleNestedLayoutChange(nestedLayout, item.i)}
            resizeHandles={["n", "s", "e", "w"]}
            preventCollision={false}
            compactType={item.compactType}
            useCSSTransforms={true}
            isDraggable={isEditing}
            isResizable={isEditing}
          >
            {nested?.map((nestedItem: { i: string }) => {
              const nestedComponent = gridComponents.find((comp) => comp.slotId === nestedItem.i)

              return (
                <Box key={nestedItem.i} className={cn("", isEditing && "rounded-lg dark:bg-gray-8 bg-gray-5 shadow")}>
                  <WidgetDropZone
                    id={nestedItem.i}
                    isEditing={isEditing}
                    groupId={item.i}
                    className={`${isEditing ? "p-1.5" : ""}`}
                    handleRemoveComponent={handleRemoveNestedComponent}
                  >
                    {nestedComponent ? nestedComponent.component : <span>{nestedItem.i}</span>}
                  </WidgetDropZone>
                </Box>
              )
            })}
          </ReactGridLayout>
        </Box>
      )
    }
    return (
      <Box key={item.i} className={cn("", isEditing && "rounded-lg dark:bg-gray-8 bg-gray-5 p-0 shadow")}>
        <WidgetDropZone
          id={item.i}
          isEditing={isEditing}
          className={`p-1.5`}
          handleRemoveComponent={handleRemoveComponent}
        >
          {gridComponent ? gridComponent.component : <span>{item.i}</span>}
        </WidgetDropZone>
      </Box>
    )
  })
}
