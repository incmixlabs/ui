import { useEffect, useRef, useState } from "react";

import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";

import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
// import { reorder } from "@atlaskit/pragmatic-drag-and-drop/util/reorder";
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge";
import {
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import * as liveRegion from "@atlaskit/pragmatic-drag-and-drop-live-region";
import { Box } from "@incmix/ui";
import invariant from "tiny-invariant";

import { tasks as data } from "./data";
import { ListItem } from "./list-item";
;

export function TaskList() {
  const [tasks, setTasks] = useState(() => data);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      throw new Error("Ref not set");
    }

    return combine(
      liveRegion.cleanup,
      autoScrollForElements({ element }),
      monitorForElements({
        onDrop: ({ source, location }) => {
          const dropTarget = location.current.dropTargets[0];
          if (!dropTarget) return;
          const sourceId = source.data.id;
          if (typeof sourceId !== "string") return;
          const targetId = dropTarget.data.id;
          if (typeof targetId !== "string") return;

          setTasks((tasks) => {
            const startIndex = tasks.findIndex((task) => task.id === sourceId);
            const indexOfTarget = tasks.findIndex(
              (task) => task.id === targetId,
            );

            // handle
            const closestEdge = extractClosestEdge(dropTarget.data);
            return reorderWithEdge({
              list: tasks,
              startIndex,
              indexOfTarget,
              closestEdgeOfTarget: closestEdge,
              axis: "vertical",
            });
          });
        },
      }),
    );
  }, []);



  return (
    <Box
      className=" border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-neutral-900 py-6"
    >
      <Box
        ref={ref}
        className=" gap-5 grid grid-cols-3 overflow-y-scroll px-4 py-6 "
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
  );
}
