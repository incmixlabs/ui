import RGL, { WidthProvider } from "@incmix/react-grid-layout";
import { Box, cn, IconButton, Tooltip } from "@incmix/ui";
import {
  WidgetDropZone,
  ComponentSlot,
  CustomLayouts,
  LayoutItemWithNested,
} from "@incmix/ui/dashboard";
import type { Layout } from "@incmix/react-grid-layout";
import { Trash } from "lucide-react";

const ReactGridLayout = WidthProvider(RGL);

export function generateDOM(
  defaultLayouts: CustomLayouts,
  gridComponents: ComponentSlot[],
  handleNestedLayoutChange: (nestedLayout: Layout[], itemKey: string) => void,
  isEditing: boolean,
  handleRemoveComponent: (slotId: string) => void,
  handleRemoveNestedComponent: (slotId: string, groupId?: string) => void,
) {
  const activeBreakpoint = "lg";
  const layoutItems = defaultLayouts?.[activeBreakpoint] ?? [];

  return layoutItems.map((item: LayoutItemWithNested) => {
    const gridComponent = gridComponents.find((comp) => comp.slotId === item.i);
    // console.log(gridComponents);
    // console.log(item.i, gridComponent);

    if (item.i.startsWith("grid-")) {
      const nested = item.layouts || [];
console.log("nested layouts", nested);

      return (
        <Box
          key={item.i}
          className={cn(
            "",
            isEditing &&
              "overflow-hidden rounded-lg border-2 relative border-green-8 border-dashed bg-green-4 p-0 shadow",
          )}
        >
          {isEditing && (
            <Tooltip content={"Delete Group"}>
              <IconButton
                className={cn("absolute top-1 left-1 z-20")}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                color="red"
                variant="surface"
                onClick={() => handleRemoveComponent(item.i)}
              >
                <Trash size={16} />
              </IconButton>
            </Tooltip>
          )}

          <ReactGridLayout
            className="nested-layout relative"
            layout={nested}
            cols={12}
            rowHeight={10}
            onDragStart={(_a, _b, _c, _d, e) => {
              e.stopPropagation();
            }}
            onResizeStart={(_a, _b, _c, _d, e) => {
              e.stopPropagation();
            }}
            onLayoutChange={(nestedLayout) =>
              handleNestedLayoutChange(nestedLayout, item.i)
            }
            resizeHandles={["n", "s", "e", "w"]}
            preventCollision={false}
            compactType={item.compactType}
            useCSSTransforms={true}
            isDraggable={isEditing}
            isResizable={isEditing}
          >
            {nested?.map((nestedItem: { i: string,componentName:string}) => {
              const nestedComponent = gridComponents.find(
                (comp) => comp.componentName === nestedItem.componentName,
              );

              return (
                <Box
                  key={nestedItem.i}
                  className={cn(
                    "",
                    isEditing && "rounded-lg dark:bg-gray-8 bg-gray-5 shadow",
                  )}
                >
                  <WidgetDropZone
                    id={nestedItem.i}
                    isEditing={isEditing}
                    groupId={item.i}
                    className={`${isEditing ? "p-1.5" : ""}`}
                    handleRemoveComponent={handleRemoveNestedComponent}
                  >
                    {nestedComponent ? (
                      nestedComponent.component
                    ) : (
                      <span>{nestedItem.i}</span>
                    )}
                  </WidgetDropZone>
                </Box>
              );
            })}
          </ReactGridLayout>
        </Box>
      );
    }
    return (
      <Box
        key={item.i}
        className={cn(
          "",
          isEditing && "rounded-lg dark:bg-gray-8 bg-gray-5 p-0 shadow",
        )}
      >
        <WidgetDropZone
          id={item.i}
          isEditing={isEditing}
          className={`p-1.5`}
          handleRemoveComponent={handleRemoveComponent}
        >
          {gridComponent ? gridComponent.component : <span>{item.i}</span>}
        </WidgetDropZone>
      </Box>
    );
  });
}
