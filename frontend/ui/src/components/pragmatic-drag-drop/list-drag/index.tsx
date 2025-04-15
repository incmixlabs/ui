import { useEffect, useRef, useState } from "react"

import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"

import {
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge"
// import { reorder } from "@atlaskit/pragmatic-drag-and-drop/util/reorder";
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge"
import * as liveRegion from "@atlaskit/pragmatic-drag-and-drop-live-region"
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { Box } from "@incmix/ui"
import invariant from "tiny-invariant"

import { tasks as data } from "./data"
import { ListItem } from "./list-item"

export function TaskList() {
  const [tasks, setTasks] = useState(() => data)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = ref.current

    if (!element) {
      throw new Error("Ref not set")
    }

    return combine(
      liveRegion.cleanup,
      autoScrollForElements({ element }),
      monitorForElements({
        onDrop: ({ source, location }) => {
          const dropTarget = location.current.dropTargets[0]
          if (!dropTarget) return
          const sourceId = source.data.id
          if (typeof sourceId !== "string") return
          const targetId = dropTarget.data.id
          if (typeof targetId !== "string") return

          setTasks((tasks) => {
            const startIndex = tasks.findIndex((task) => task.id === sourceId)
            const indexOfTarget = tasks.findIndex(
              (task) => task.id === targetId
            )

            // handle
            const closestEdge = extractClosestEdge(dropTarget.data)
            return reorderWithEdge({
              list: tasks,
              startIndex,
              indexOfTarget,
              closestEdgeOfTarget: closestEdge,
              axis: "vertical",
            })
          })
        },
      })
    )
  }, [])

  return (
    <Box className=" rounded-xl border border-gray-300 bg-gray-50 py-6 dark:border-gray-600 dark:bg-neutral-900">
      <Box
        ref={ref}
        className=" grid grid-cols-3 gap-5 overflow-y-scroll px-4 py-6 "
      >
        {tasks.map((task, i) => (
          <ListItem
            key={task.title}
            index={i}
            component={task.component}
            // onMoveUp={onMoveUp}
            // onMoveDown={onMoveDown}
            {...task}
          />
        ))}
      </Box>
    </Box>
  )
}
