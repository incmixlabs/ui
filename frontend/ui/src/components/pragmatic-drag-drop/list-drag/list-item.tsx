import { useEffect, useRef, useState } from "react";
import { ComponentType } from "react";

import {
  Box,
  Flex,
  Avatar,
  DropdownMenu,
  Button,
  TotalTasks,
  cn,
} from "@incmix/ui";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";

import {
  type Edge,
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { DropIndicator } from "@atlaskit/pragmatic-drag-and-drop-react-indicator/box";

import { Epic } from "./data";

type ListItemProps = {
  id: string;
  index: number;
  assignee: string;
  epic: Epic;
  title: string;
  component: ComponentType;
  className:string;
};

export function ListItem({
  assignee,
  epic,
  id,
  index,
  title,
  component: Component,
  className
}: ListItemProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      throw new Error("ref not set");
    }

    return combine(
      draggable({
        element,
        getInitialData: () => ({ id, index }),
        onDragStart: () => {
          setIsDragging(true);
        },
        onDrop: () => {
          setIsDragging(false);
        },
      }),
      dropTargetForElements({
        element,
        getData: ({ input }) => {
          return attachClosestEdge(
            { id, index },
            {
              input,
              element,
              allowedEdges: ["top", "bottom"],
            },
          );
        },
        getIsSticky: () => true,
        canDrop: (args) => {
          return args.source.data.id !== id;
        },
        onDrag: ({ self, source, location }) => {
          if (element === source.element) {
            setClosestEdge(null);
            return;
          }

          const currentDropTarget = location.current.dropTargets[0];
          if (!currentDropTarget) return;

          const selfIndex = self.data.index;
          const sourceIndex = source.data.index;
          if (typeof sourceIndex !== "number") return;

          const isItemBeforeSource = selfIndex === sourceIndex - 1;
          const isItemAfterSource = selfIndex === sourceIndex + 1;
          const closestEdge = extractClosestEdge(currentDropTarget.data);

          const isDropIndicatorHidden =
            (isItemBeforeSource && closestEdge === "bottom") ||
            (isItemAfterSource && closestEdge === "top") ;

          if (isDropIndicatorHidden) {
            setClosestEdge(null);
            return;
          }

          if (currentDropTarget.data.id === id) {
            setClosestEdge(closestEdge);
          }
        },
        onDragLeave: () => {
          setClosestEdge(null);
        },
        onDrop() {
          setClosestEdge(null);
        },
      }),
    );
  }, [id, index]);

  return (
    <Box ref={ref} className={cn("relative cursor-grab",className)}>
      <Box
        className={`p-4 rounded-lg border transition-colors duration-200 ${
          isDragging ? "opacity-40" : "opacity-100"
        } `}
      >
        {Component && <Component />}
      </Box>
      {closestEdge && <DropIndicator edge={closestEdge} />}
    </Box>
  );
}

function FullSizeDropIndicator({ edge }: { edge: Edge }) {
  const styles: Record<Edge, string> = {
    top: "absolute inset-x-0 top-0 h-full w-full bg-blue-500 rounded-t-lg -translate-y-1/2",
    bottom:
      "absolute inset-x-0 top-0 h-full w-full bg-blue-500 rounded-t-lg -translate-y-1/2",
    left: "absolute inset-y-0 top-0 h-full w-full bg-blue-500 rounded-t-lg -translate-x-1/2",
    right:
      "absolute inset-y-0 top-0 h-full w-full bg-blue-500 rounded-t-lg -translate-x-1/2",
  };
  return <div className={styles[edge]} />;
}
