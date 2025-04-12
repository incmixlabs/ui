/** @jsx jsx */
import { memo, useEffect, useRef, useState } from "react";
import {Avatar,Button,cn,Heading} from '@incmix/ui';

import { css } from "@emotion/react";

import {
  attachClosestEdge,
  Edge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { DropIndicator } from "@atlaskit/pragmatic-drag-and-drop-react-indicator/box";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { token } from "@atlaskit/tokens";

import { ColumnType } from "./people";
import { cardGap, columnGap } from "./constants";

import { Card } from "./card";

// Custom motion values
const easeInOut = "cubic-bezier(0.4, 0, 0.2, 1)";
const mediumDurationMs = 300;

const columnStyles = css({
  display: "flex",
  width: 250,
  flexDirection: "column",
  background: token("elevation.surface.sunken", "#F7F8F9"),
  borderRadius: "calc(var(--grid) * 2)",
  transition: `background ${mediumDurationMs}ms ${easeInOut}`,
  position: "relative",
});

const scrollContainerStyles = css({
  height: "100%",
  overflowY: "auto",
});

const cardListStyles = css({
  display: "flex",
  boxSizing: "border-box",
  minHeight: "100%",
  padding: "var(--grid)",
  gap: cardGap,
  flexDirection: "column",
});

const columnHeaderStyles = css({
  display: "flex",
  padding: "calc(var(--grid) * 2) calc(var(--grid) * 2) calc(var(--grid) * 1)",
  justifyContent: "space-between",
  flexDirection: "row",
  color: token("color.text.subtlest", "#626F86"),
  userSelect: "none",
});

const isDraggingOverColumnStyles = css({
  background: token("color.background.selected.hovered", "#CCE0FF"),
});

export const Column = memo(function Column({ column }: { column: ColumnType }) {
  const columnId = column.columnId;
  const columnRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardListRef = useRef<HTMLDivElement | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);

  useEffect(() => {
    if (!columnRef.current || !headerRef.current || !cardListRef.current) {
      console.error(
        "References to the column, header, or card list elements are not set."
      );
      return;
    }

    return combine(
      draggable({
        element: columnRef.current,
        dragHandle: headerRef.current,
        getInitialData: () => ({ columnId, type: "column" }),
      }),
      dropTargetForElements({
        element: cardListRef.current,
        getData: () => ({ columnId }),
        canDrop: (args) => args.source.data.type === "card",
        getIsSticky: () => true,
        onDragEnter: () => setIsDraggingOver(true),
        onDragLeave: () => setIsDraggingOver(false),
        onDragStart: () => setIsDraggingOver(true),
        onDrop: () => setIsDraggingOver(false),
      }),
      dropTargetForElements({
        element: columnRef.current,
        canDrop: (args) => args.source.data.type === "column",
        getIsSticky: () => true,
        getData: ({ input, element }) => {
          const data = {
            columnId,
          };
          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ["left", "right"],
          });
        },
        onDragEnter: (args) => {
          setClosestEdge(extractClosestEdge(args.self.data));
        },
        onDrag: (args) => {
          setClosestEdge(extractClosestEdge(args.self.data));
        },
        onDragLeave: () => {
          setClosestEdge(null);
        },
        onDrop: () => {
          setClosestEdge(null);
        },
      })
    );
  }, [columnId]);

  return (
    <div
    ref={columnRef}
    className={cn(
      "flex w-[250px] flex-col relative transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
      "bg-[#F7F8F9] rounded-[calc(var(--grid)*2)]",
      isDraggingOver && "bg-[#CCE0FF]"
    )}
    style={{
      borderRadius: "calc(var(--grid) * 2)",
    }}
  >
    <div
      ref={headerRef}
      data-testid={`column-${columnId}--header`}
      className="flex justify-between flex-row select-none text-[#626F86]"
      style={{
        padding: "calc(var(--grid) * 2) calc(var(--grid) * 2) calc(var(--grid) * 1)",
      }}
    >
      <Heading  >
        {column.title}
      </Heading>
    </div>
    <div className="h-full overflow-y-auto">
      <div
        ref={cardListRef}
        className="flex flex-col box-border min-h-full"
        style={{
          padding: "var(--grid)",
          gap: `var(--card-gap)`,
        }}
      >
        {column.items.map((item) => (
          <Card item={item} key={item.itemId} />
        ))}
      </div>
    </div>
    {closestEdge && (
      <DropIndicator edge={closestEdge} gap={`var(--column-gap)`} />
    )}
  </div>
  );
});
