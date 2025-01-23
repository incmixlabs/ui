import type { Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge"
import {
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { dropTargetForExternal } from "@atlaskit/pragmatic-drag-and-drop/external/adapter"
import type { Task } from "@incmix/utils/types"
import { Card } from "@radix-ui/themes"
import { cva } from "@utils/cva"
import { useEffect, useRef, useState } from "react"
import type React from "react"
import invariant from "tiny-invariant"
import { CardContent } from "../card/card"
import { useBoardContext } from "./board-context"
import { DropIndicator } from "./drop-indicator"

type TaskProps = {
  task: Task
}

const variants = cva("", {
  variants: {
    dragging: {
      over: "opacity-30 ring-2",
      overlay: "ring-2 ring-primary",
    },
  },
})

type State =
  | { type: "idle" }
  | { type: "preview"; container: HTMLElement; rect: DOMRect }
  | { type: "dragging" }

const idleState: State = { type: "idle" }
const draggingState: State = { type: "dragging" }

export const TaskCard: React.FC<TaskProps> = ({ task }) => {
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null)
  const [state, setState] = useState<State>(idleState)
  const { instanceId } = useBoardContext()

  const cardRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = cardRef.current
    invariant(element)

    return combine(
      draggable({
        element,
        getInitialData: () => ({ itemId: task.id, instanceId }),
        onDragStart: () => setState(draggingState),
        onDrop: () => setState(idleState),
      }),
      dropTargetForExternal({
        element: element,
      }),
      dropTargetForElements({
        element: element,
        canDrop: ({ source }) => {
          return source.data.instanceId === instanceId
        },
        getIsSticky: () => true,
        getData: ({ input, element }) => {
          const data = { itemId: task.id }

          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ["top", "bottom"],
          })
        },
        onDragEnter: (args) => {
          if (args.source.data.itemId !== task.id) {
            setClosestEdge(extractClosestEdge(args.self.data))
          }
        },
        onDrag: (args) => {
          if (args.source.data.itemId !== task.id) {
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
  }, [instanceId, task])

  return (
    <div className="relative flex flex-col gap-1">
      <Card
        ref={cardRef}
        className={variants({
          dragging: state.type === "dragging" ? "over" : undefined,
        })}
      >
        <CardContent className="flex items-center whitespace-pre-wrap p-4 text-left align-middle">
          {task.content}
        </CardContent>
      </Card>
      {closestEdge && <DropIndicator edge={closestEdge} gap="2px" />}
    </div>
  )
}
