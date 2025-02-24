"use client";

import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element";
import { unsafeOverflowAutoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/unsafe-overflow/element";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import type { CleanupFn } from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder";
import { bindAll } from "bind-event-listener";
import { useContext, useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import { BoardColumn } from "./board-column";
import { blockBoardPanningAttr } from "./data-attributes";
import type { TBoard, TColumn } from "./types";
import {
  isCardData,
  isCardDropTargetData,
  isColumnData,
  isDraggingACard,
  isDraggingAColumn,
} from "./types";
import { IconButton, Section } from "@radix-ui/themes";
import { Filter } from "lucide-react";
import { FilterIcon } from "../icons/filter";
import TaskCardDrawer from "./task-card-drawer";
import { useKanbanFilter } from "@hooks/use-kanban-filter";

export function Board({ initial }: { initial: TBoard }) {
  const [data, setData] = useState(initial);
  const scrollableRef = useRef<HTMLDivElement | null>(null);
  const { kanbanFilter, toggleKanbanFilter } = useKanbanFilter();
  useEffect(() => {
    const element = scrollableRef.current;
    invariant(element);
    return combine(
      monitorForElements({
        canMonitor: isDraggingACard,
        onDrop({ source, location }) {
          // setIsChecking(source);

          const dragging = source.data;
          if (!isCardData(dragging)) {
            return;
          }

          const innerMost = location.current.dropTargets[0];

          if (!innerMost) {
            return;
          }
          const dropTargetData = innerMost.data;
          const homeColumnIndex = data.columns.findIndex(
            (column) => column.id === dragging.columnId,
          );
          const home: TColumn | undefined = data.columns[homeColumnIndex];

          if (!home) {
            return;
          }
          const cardIndexInHome = home.cards.findIndex(
            (card) => card.id === dragging.card.id,
          );

          // dropping on a card
          if (isCardDropTargetData(dropTargetData)) {
            const destinationColumnIndex = data.columns.findIndex(
              (column) => column.id === dropTargetData.columnId,
            );
            const destination = data.columns[destinationColumnIndex];
            // reordering in home column
            if (home === destination) {
              const cardFinishIndex = home.cards.findIndex(
                (card) => card.id === dropTargetData.card.id,
              );

              // could not find cards needed
              if (cardIndexInHome === -1 || cardFinishIndex === -1) {
                return;
              }

              // no change needed
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

              const updated: TColumn = {
                ...home,
                cards: reordered,
              };
              const columns = Array.from(data.columns);
              columns[homeColumnIndex] = updated;

              setData((prevData) => {
                const updatedColumns = [...prevData.columns];
                updatedColumns[homeColumnIndex] = updated;

                return {
                  ...prevData,
                  columns: updatedColumns,
                };
              });
              return;
            }

            // moving card from one column to another

            // unable to find destination
            if (!destination) {
              return;
            }

            const indexOfTarget = destination.cards.findIndex(
              (card) => card.id === dropTargetData.card.id,
            );

            const closestEdge = extractClosestEdge(dropTargetData);
            const finalIndex =
              closestEdge === "bottom" ? indexOfTarget + 1 : indexOfTarget;

            // remove card from home list
            const homeCards = Array.from(home.cards);
            homeCards.splice(cardIndexInHome, 1);

            // insert into destination list
            const destinationCards = Array.from(destination.cards);
            destinationCards.splice(finalIndex, 0, dragging.card);

            const columns = Array.from(data.columns);
            columns[homeColumnIndex] = {
              ...home,
              cards: homeCards,
            };
            columns[destinationColumnIndex] = {
              ...destination,
              cards: destinationCards,
            };
            setData((prevData) => ({ ...prevData, columns }));
            return;
          }

          // dropping onto a column, but not onto a card
          if (isColumnData(dropTargetData)) {
            const destinationColumnIndex = data.columns.findIndex(
              (column) => column.id === dropTargetData.column.id,
            );
            const destination = data.columns[destinationColumnIndex];

            if (!destination) {
              return;
            }

            // dropping on home
            if (home === destination) {
              console.log("moving card to home column");

              // move to last position
              const reordered = reorder({
                list: home.cards,
                startIndex: cardIndexInHome,
                finishIndex: home.cards.length - 1,
              });

              const updated: TColumn = {
                ...home,
                cards: reordered,
              };
              const columns = Array.from(data.columns);
              columns[homeColumnIndex] = updated;
              setData({ ...data, columns });
              return;
            }

            console.log("moving card to another column");

            // remove card from home list

            const homeCards = Array.from(home.cards);
            homeCards.splice(cardIndexInHome, 1);

            // insert into destination list
            const destinationCards = Array.from(destination.cards);
            destinationCards.splice(destination.cards.length, 0, dragging.card);

            const columns = Array.from(data.columns);
            columns[homeColumnIndex] = {
              ...home,
              cards: homeCards,
            };
            columns[destinationColumnIndex] = {
              ...destination,
              cards: destinationCards,
            };
            setData({ ...data, columns });
            return;
          }
        },
      }),
      // monitorForElements({
      //   canMonitor: isDraggingAColumn,
      //   onDrop({ source, location }) {
      //     setIsChecking(source);
      //     const dragging = source.data;
      //     if (!isColumnData(dragging)) {
      //       return;
      //     }

      //     const innerMost = location.current.dropTargets[0];

      //     if (!innerMost) {
      //       return;
      //     }
      //     const dropTargetData = innerMost.data;

      //     if (!isColumnData(dropTargetData)) {
      //       return;
      //     }

      //     const homeIndex = data.columns.findIndex((column) => column.id === dragging.column.id);
      //     const destinationIndex = data.columns.findIndex(
      //       (column) => column.id === dropTargetData.column.id,
      //     );

      //     if (homeIndex === -1 || destinationIndex === -1) {
      //       return;
      //     }

      //     if (homeIndex === destinationIndex) {
      //       return;
      //     }

      //     const reordered = reorder({
      //       list: data.columns,
      //       startIndex: homeIndex,
      //       finishIndex: destinationIndex,
      //     });
      //     setData({ ...data, columns: reordered });
      //   },
      // }),
      autoScrollForElements({
        canScroll({ source }) {
          return isDraggingACard({ source }) || isDraggingAColumn({ source });
        },
        element,
      }),
      unsafeOverflowAutoScrollForElements({
        element,
        canScroll({ source }) {
          return isDraggingACard({ source }) || isDraggingAColumn({ source });
        },
        getOverflow() {
          return {
            forLeftEdge: {
              top: 1000,
              left: 1000,
              bottom: 1000,
            },
            forRightEdge: {
              top: 1000,
              right: 1000,
              bottom: 1000,
            },
          };
        },
      }),
    );
  }, [data, setData]);

  // Panning the board
  useEffect(() => {
    let cleanupActive: CleanupFn | null = null;
    const scrollable = scrollableRef.current;
    invariant(scrollable);

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
          // stop panning if we see any of these events
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
          // ignore interactive elements
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

  return (
    <>
      <div className="flex justify-end mb-2">
        <IconButton
          className="h-10 w-12 cursor-pointer "
          onClick={toggleKanbanFilter}
        >
          <FilterIcon className="size-8 fill-whit" />
        </IconButton>
      </div>
      <div
        className={`${kanbanFilter && "w-full flex gap-3 "} h-full overflow-hidden [scrollbar-color:theme(colors.sky.200)_theme(colors.sky.400)] [scrollbar-width:thin]`}
        ref={scrollableRef}
      >
        <div
          className={`${kanbanFilter ? "w-full space-y-5 " : "flex flex-row gap-4 p-3 2xl:gap-7"}`}
        >
          {data.columns.map((column) => (
            <BoardColumn
              key={column.id}
              column={column}
              kanbanFilter={kanbanFilter}
            />
          ))}
        </div>
        <TaskCardDrawer kanbanFilter={kanbanFilter} />
      </div>
    </>
  );
}
