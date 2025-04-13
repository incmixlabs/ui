import { memo, useEffect, useRef, useState } from "react"

import invariant from "tiny-invariant"

import {
  type Edge,
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
// import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-indicator';
// import {
//   draggable,
//   dropTargetForElements,
// } from '@atlaskit/pragmatic-drag-and-drop/adapter/element';
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { Avatar, Button, Heading } from "@incmix/ui"
// import { scrollJustEnoughIntoView } from '@atlaskit/pragmatic-drag-and-drop/scroll-just-enough-into-view';
// eslint-disable-next-line no-restricted-imports

import { DropIndicator } from "@atlaskit/pragmatic-drag-and-drop-react-indicator/box"
import { ArrowBigDownDash } from "lucide-react"
import type { Item } from "./people"
type DraggableState = "idle" | "generate-preview" | "dragging"

export const Card = memo(function Card({ item }: { item: Item }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const { avatarUrl, itemId, name, role } = item
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null)
  const [state, setState] = useState<DraggableState>("idle")

  useEffect(() => {
    invariant(ref.current)
    console.log("recreating draggable")
    return combine(
      draggable({
        element: ref.current,
        getInitialData: () => ({ type: "card", itemId: itemId }),
        onGenerateDragPreview: () => {
          //   scrollJustEnoughIntoView({ element: source.element });
          setState("generate-preview")
        },

        onDragStart: () => setState("dragging"),
        onDrop: () => setState("idle"),
      }),
      //   dropTargetForFiles({
      //     element: ref.current,
      //   }),
      dropTargetForElements({
        element: ref.current,
        canDrop: (args) => args.source.data.type === "card",
        getIsSticky: () => true,
        getData: ({ input, element }) => {
          const data = { type: "card", itemId: itemId }

          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ["top", "bottom"],
          })
        },
        onDragEnter: (args) => {
          if (args.source.data.itemId !== itemId) {
            setClosestEdge(extractClosestEdge(args.self.data))
          }
        },
        onDrag: (args) => {
          if (args.source.data.itemId !== itemId) {
            setClosestEdge(extractClosestEdge(args.self.data))
          }
        },
        onDragLeave: () => {
          setClosestEdge(null)
        },
        onDrop: () => {
          setClosestEdge(null)
        },
      })
    )
  }, [itemId])

  return (
    <div
      ref={ref}
      data-testid={`item-${itemId}`}
      className={`relative w-full rounded-md bg-white p-4 shadow-md transition-opacity ${
        state === "dragging" ? "opacity-60" : ""
      }`}
    >
      <div className="flex w-full items-center gap-4">
        <div className="pointer-events-none">
          <img
            src={avatarUrl}
            alt={name}
            className="h-12 w-12 rounded-full object-cover"
          />
        </div>
        <div className="flex flex-grow flex-col gap-1">
          <span className="font-semibold text-lg">{name}</span>
          <small className="m-0 text-gray-600 text-sm">{role}</small>
        </div>
        <Button type="button">
          <ArrowBigDownDash />
        </Button>
      </div>
      {closestEdge && (
        <DropIndicator edge={closestEdge} gap={"var(--column-gap)"} />
      )}
    </div>
  )
})
