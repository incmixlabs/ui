import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import type { CleanupFn } from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder";
import { bindAll } from "bind-event-listener";
import { Suspense, lazy, useEffect, useRef, useMemo, useState } from "react";
import { ListColumn } from "./list-column";
import { blockBoardPanningAttr } from "../data-attributes";
import { Box, Flex, IconButton, Input } from "@incmix/ui";
import { useTaskStore } from "@incmix/store";

const ListTaskCardDrawer = lazy(() => import("./task-card-drawer"));

import type { TColumn } from "../types";
import {
  isCardData,
  isCardDropTargetData,
  isColumnData,
  isDraggingACard,
  isDraggingAColumn,
} from "../types";
import { Plus, Search } from "lucide-react";
import { AddTaskForm } from "./add-task-form";

function convertTasksToColumns(tasks: any[], columns: any[]) {
  return columns.map((column) => {
    const columnTasks = tasks
      .filter((task) => task.columnId === column.id)
      .sort((a, b) => a.taskOrder - b.taskOrder)
      .map((task) => ({
        ...task,
        id: task.taskId,
      }));

    return {
      id: `column:${column.id}`,
      title: column.title,
      cards: columnTasks,
    };
  });
}

export function ListBoard() {
  const {
    tasks,
    initialize,
    initialized,
    isInitialLoading,
    moveTaskBetweenColumns,
    reorderTasksInColumn,
  } = useTaskStore();

  const mockColumns = [
    { id: "col-todo", title: "To Do" },
    { id: "col-progress", title: "In Progress" },
    { id: "col-done", title: "Done" },
  ];
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  const columns = useMemo(() => {
    if (!initialized) return [];
    return convertTasksToColumns(tasks, mockColumns);
  }, [tasks, initialized]);

  const scrollableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialize, initialized]);

  useEffect(() => {
    const element = scrollableRef.current;
    if (!element) {
      return;
    }

    if (!columns || columns.length === 0) {
      return;
    }

    return combine(
      monitorForElements({
        canMonitor: isDraggingACard,
        onDrop({ source, location }) {
          const dragging = source.data;
          if (!isCardData(dragging)) {
            return;
          }

          const innerMost = location.current.dropTargets[0];
          if (!innerMost) {
            return;
          }

          const dropTargetData = innerMost.data;
          const homeColumnIndex = columns.findIndex(
            (column) => column.id === dragging.columnId,
          );
          const home: TColumn | undefined = columns[homeColumnIndex];

          if (!home) {
            return;
          }

          const cardIndexInHome = home.cards.findIndex(
            (card) => card.id === dragging.card.id,
          );

          // dropping on a card
          if (isCardDropTargetData(dropTargetData)) {
            const destinationColumnIndex = columns.findIndex(
              (column) => column.id === dropTargetData.columnId,
            );
            const destination = columns[destinationColumnIndex];

            // reordering in home column
            if (home === destination) {
              const cardFinishIndex = home.cards.findIndex(
                (card) => card.id === dropTargetData.card.id,
              );

              if (cardIndexInHome === -1 || cardFinishIndex === -1) {
                return;
              }

              if (cardIndexInHome === cardFinishIndex) {
                return;
              }

              const closestEdge = extractClosestEdge(dropTargetData);
              const reordered = reorderWithEdge({
                axis: "vertical",
                list: home.cards,
                startIndex: cardIndexInHome,
                indexOfTarget: cardFinishIndex,
                closestEdgeOfTarget: closestEdge,
              });

              // ✅ No need to update local state - just update the store
              // The useMemo will automatically recompute columns when tasks change
              const taskIds = reordered.map((card) => card.id);
              const columnId = home.id.replace("column:", "");
              reorderTasksInColumn(columnId, taskIds).catch(console.error);

              return;
            }

            // moving card from one column to another
            if (!destination) {
              return;
            }

            const indexOfTarget = destination.cards.findIndex(
              (card) => card.id === dropTargetData.card.id,
            );
            const closestEdge = extractClosestEdge(dropTargetData);
            const finalIndex =
              closestEdge === "bottom" ? indexOfTarget + 1 : indexOfTarget;

            // ✅ No need to update local state - just update the store
            const fromColumnId = home.id.replace("column:", "");
            const toColumnId = destination.id.replace("column:", "");
            moveTaskBetweenColumns(
              dragging.card.id,
              fromColumnId,
              toColumnId,
              finalIndex,
            );

            return;
          }

          // dropping onto a column, but not onto a card
          if (isColumnData(dropTargetData)) {
            const destinationColumnIndex = columns.findIndex(
              (column) => column.id === dropTargetData.column.id,
            );
            const destination = columns[destinationColumnIndex];

            if (!destination) {
              return;
            }

            // dropping on home
            if (home === destination) {
              const reordered = reorder({
                list: home.cards,
                startIndex: cardIndexInHome,
                finishIndex: home.cards.length - 1,
              });

              // ✅ No need to update local state - just update the store
              const taskIds = reordered.map((card) => card.id);
              const columnId = home.id.replace("column:", "");
              reorderTasksInColumn(columnId, taskIds);
              return;
            }

            // moving card to another column
            // ✅ No need to update local state - just update the store
            const fromColumnId = home.id.replace("column:", "");
            const toColumnId = destination.id.replace("column:", "");
            moveTaskBetweenColumns(
              dragging.card.id,
              fromColumnId,
              toColumnId,
              destination.cards.length - 1,
            );

            return;
          }
        },
      }),
      // Only add auto scroll if element is actually scrollable
      autoScrollForElements({
        canScroll({ source }) {
          return isDraggingACard({ source }) || isDraggingAColumn({ source });
        },
        element,
      }),
    );
  }, [columns, reorderTasksInColumn, moveTaskBetweenColumns]);

  useEffect(() => {
    let cleanupActive: CleanupFn | null = null;
    const scrollable = scrollableRef.current;

    if (!scrollable) {
      return;
    }

    function begin({ startX }: { startX: number }) {
      let lastX = startX;

      const cleanupEvents = bindAll(
        window,
        [
          {
            type: "pointermove",
            listener(event) {
              const currentX = event.clientX;
              const diffX = lastX - currentX;

              lastX = currentX;
              scrollable?.scrollBy({ left: diffX });
            },
          },
          ...(
            [
              "pointercancel",
              "pointerup",
              "pointerdown",
              "keydown",
              "resize",
              "click",
              "visibilitychange",
            ] as const
          ).map((eventName) => ({
            type: eventName,
            listener: () => cleanupEvents(),
          })),
        ],
        { capture: true },
      );

      cleanupActive = cleanupEvents;
    }

    const cleanupStart = bindAll(scrollable, [
      {
        type: "pointerdown",
        listener(event) {
          if (!(event.target instanceof HTMLElement)) {
            return;
          }
          if (event.target.closest(`[${blockBoardPanningAttr}]`)) {
            return;
          }

          begin({ startX: event.clientX });
        },
      },
    ]);

    return function cleanupAll() {
      cleanupStart();
      cleanupActive?.();
    };
  }, []);

  if (!initialized && isInitialLoading) {
    return (
      <Box className="flex items-center justify-center h-64">
        <div>Loading tasks...</div>
      </Box>
    );
  }

  return (
    <>
      <Flex gap="2" className="py-2 pb-4">
        <IconButton
          color="blue"
          onClick={() => setShowAddTaskForm(true)}
          className="w-fit gap-3 h-12 rounded-lg p-2 px-4 font-medium text-blue-500 text-xl hover:text-white"
        >
          <Plus size={20} /> Add Task
        </IconButton>
        <Box className="flex-1 shrink-0 cursor-pointer rounded-xl relative">
          <Search size={24} className="absolute top-2.5 left-2.5" />
          <Input
            placeholder="Search"
            className="w-full rounded-xl pl-10 border-2 border-gray-5 h-12 grid place-content-center "
          />
        </Box>
      </Flex>
      <Box className="flex w-full gap-6 h-full relative " ref={scrollableRef}>
        <Box className="w-full space-y-5">
          {columns.map((column) => (
            <ListColumn key={column.id} column={column} />
          ))}
        </Box>
        <Suspense fallback={<Box className="p-4">Loading drawer...</Box>}>
          <ListTaskCardDrawer />
        </Suspense>
      </Box>
      {/* Add Task Form Modal */}
      <AddTaskForm
        isOpen={showAddTaskForm}
        onClose={() => setShowAddTaskForm(false)}
        columnId={"col-todo"}
        taskOrder={0}
      />
    </>
  );
}
