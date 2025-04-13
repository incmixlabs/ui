import { Heading, cn } from "@incmix/ui"
import { memo, useEffect, useRef, useState } from "react"

import {
  type Edge,
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge"
import { DropIndicator } from "@atlaskit/pragmatic-drag-and-drop-react-indicator/box"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"

import type { ColumnType } from "./people"

import { Card } from "./card"

export const Column = memo(function Column({ column }: { column: ColumnType }) {
  const columnId = column.columnId
  const columnRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const cardListRef = useRef<HTMLDivElement | null>(null)
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false)
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null)

  useEffect(() => {
    if (!columnRef.current || !headerRef.current || !cardListRef.current) {
      console.error(
        "References to the column, header, or card list elements are not set."
      )
      return
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
        canDrop: (args) =>
          args.source.data.type === "column" &&
          args.source.data.columnId !== columnId,
        getIsSticky: () => true,
        getData: ({ input, element }) => {
          const data = {
            columnId,
          }
          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ["left", "right"],
          })
        },
        onDragEnter: (args) => {
          setClosestEdge(extractClosestEdge(args.self.data))
        },
        onDrag: (args) => {
          setClosestEdge(extractClosestEdge(args.self.data))
        },
        onDragLeave: () => {
          setClosestEdge(null)
        },
        onDrop: () => {
          setClosestEdge(null)
        },
      })
    )
  }, [columnId])

  return (
    <div
      ref={columnRef}
      className={cn(
        "relative flex w-[250px] flex-col transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
        "rounded-[calc(var(--grid)*2)] bg-[#F7F8F9]",
        isDraggingOver && "bg-[#CCE0FF]"
      )}
      style={{
        borderRadius: "calc(var(--grid) * 2)",
      }}
    >
      <div
        ref={headerRef}
        data-testid={`column-${columnId}--header`}
        className="flex select-none flex-row justify-between text-[#626F86]"
        style={{
          padding:
            "calc(var(--grid) * 2) calc(var(--grid) * 2) calc(var(--grid) * 1)",
        }}
      >
        <Heading>{column.title}</Heading>
      </div>
      <div className="h-full overflow-y-auto">
        <div
          ref={cardListRef}
          className="box-border flex min-h-full flex-col"
          style={{
            padding: "var(--grid)",
            gap: "var(--card-gap)",
          }}
        >
          {column.items.map((item) => (
            <Card item={item} key={item.itemId} />
          ))}
        </div>
      </div>
      {closestEdge && (
        <DropIndicator edge={closestEdge} gap={"var(--column-gap)"} />
      )}
    </div>
  )
})
