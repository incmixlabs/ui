"use client"

import invariant from "tiny-invariant"

import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element"
import { unsafeOverflowAutoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/unsafe-overflow/element"
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge"
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import type { CleanupFn } from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types"
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder"
import { Suspense, lazy, useEffect, useRef, useState } from "react"

import { Box } from "@components/radixui/box"
import { bindAll } from "bind-event-listener"
import { BoardColumn } from "./board-column"
import { initialData } from "./data"
import { blockBoardPanningAttr } from "./data-attributes"
import { useKanbanFilter } from "./hooks/use-kanban-filter"

// Dynamically import heavy component
const TaskCardDrawer = lazy(() => import("./task-card-drawer"))
import type { TCard, TColumn, TCustomBoard } from "./types"
import {
  isCardData,
  isCardDropTargetData,
  isColumnData,
  isDraggingACard,
  isDraggingAColumn,
} from "./types"

function convertCustomDataToBoardFormat(customData: TCustomBoard) {
  const columns = customData.map((column) => {
    // Convert tasks to cards
    const cards: TCard[] = column.tasks.map((task) => ({
      ...task,
      id: task.id,
    }))

    return {
      id: `column:${column.id}`,
      title: column.title,
      cards,
    }
  })

  return {
    columns,
  }
}

export function Board() {
  const boardData = convertCustomDataToBoardFormat(initialData)

  const [data, setData] = useState(boardData)
  const scrollableRef = useRef<HTMLDivElement | null>(null)
  const { kanbanFilter } = useKanbanFilter()

  useEffect(() => {
    const element = scrollableRef.current
    invariant(element)
    return combine(
      monitorForElements({
        canMonitor: isDraggingACard,
        onDrop({ source, location }) {
          // setIsChecking(source);

          const dragging = source.data
          if (!isCardData(dragging)) {
            return
          }

          const innerMost = location.current.dropTargets[0]

          if (!innerMost) {
            return
          }
          const dropTargetData = innerMost.data
          const homeColumnIndex = data.columns.findIndex(
            (column) => column.id === dragging.columnId
          )
          const home: TColumn | undefined = data.columns[homeColumnIndex]

          if (!home) {
            return
          }
          const cardIndexInHome = home.cards.findIndex(
            (card) => card.id === dragging.card.id
          )

          // dropping on a card
          if (isCardDropTargetData(dropTargetData)) {
            const destinationColumnIndex = data.columns.findIndex(
              (column) => column.id === dropTargetData.columnId
            )
            const destination = data.columns[destinationColumnIndex]
            // reordering in home column
            if (home === destination) {
              const cardFinishIndex = home.cards.findIndex(
                (card) => card.id === dropTargetData.card.id
              )

              // could not find cards needed
              if (cardIndexInHome === -1 || cardFinishIndex === -1) {
                return
              }

              // no change needed
              if (cardIndexInHome === cardFinishIndex) {
                return
              }

              const closestEdge = extractClosestEdge(dropTargetData)

              const reordered = reorderWithEdge({
                axis: "vertical",
                list: home.cards,
                startIndex: cardIndexInHome,
                indexOfTarget: cardFinishIndex,
                closestEdgeOfTarget: closestEdge,
              })

              const updated: TColumn = {
                ...home,
                cards: reordered,
              }
              const columns = Array.from(data.columns)
              columns[homeColumnIndex] = updated

              setData((prevData) => {
                const updatedColumns = [...prevData.columns]
                updatedColumns[homeColumnIndex] = updated

                return {
                  ...prevData,
                  columns: updatedColumns,
                }
              })
              return
            }

            // moving card from one column to another

            // unable to find destination
            if (!destination) {
              return
            }

            const indexOfTarget = destination.cards.findIndex(
              (card) => card.id === dropTargetData.card.id
            )

            const closestEdge = extractClosestEdge(dropTargetData)
            const finalIndex =
              closestEdge === "bottom" ? indexOfTarget + 1 : indexOfTarget

            // remove card from home list
            const homeCards = Array.from(home.cards)
            homeCards.splice(cardIndexInHome, 1)

            // insert into destination list
            const destinationCards = Array.from(destination.cards)
            destinationCards.splice(finalIndex, 0, dragging.card)

            const columns = Array.from(data.columns)
            columns[homeColumnIndex] = {
              ...home,
              cards: homeCards,
            }
            columns[destinationColumnIndex] = {
              ...destination,
              cards: destinationCards,
            }
            setData((prevData) => ({ ...prevData, columns }))
            return
          }

          // dropping onto a column, but not onto a card
          if (isColumnData(dropTargetData)) {
            const destinationColumnIndex = data.columns.findIndex(
              (column) => column.id === dropTargetData.column.id
            )
            const destination = data.columns[destinationColumnIndex]

            if (!destination) {
              return
            }

            // dropping on home
            if (home === destination) {
              // move to last position
              const reordered = reorder({
                list: home.cards,
                startIndex: cardIndexInHome,
                finishIndex: home.cards.length - 1,
              })

              const updated: TColumn = {
                ...home,
                cards: reordered,
              }
              const columns = Array.from(data.columns)
              columns[homeColumnIndex] = updated
              setData({ ...data, columns })
              return
            }

            console.log("moving card to another column")

            // remove card from home list

            const homeCards = Array.from(home.cards)
            homeCards.splice(cardIndexInHome, 1)

            // insert into destination list
            const destinationCards = Array.from(destination.cards)
            destinationCards.splice(destination.cards.length, 0, dragging.card)

            const columns = Array.from(data.columns)
            columns[homeColumnIndex] = {
              ...home,
              cards: homeCards,
            }
            columns[destinationColumnIndex] = {
              ...destination,
              cards: destinationCards,
            }
            setData({ ...data, columns })
            return
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
          return isDraggingACard({ source }) || isDraggingAColumn({ source })
        },
        element,
      }),
      unsafeOverflowAutoScrollForElements({
        element,
        canScroll({ source }) {
          return isDraggingACard({ source }) || isDraggingAColumn({ source })
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
          }
        },
      })
    )
  }, [data, setData])

  // Panning the board
  useEffect(() => {
    let cleanupActive: CleanupFn | null = null
    const scrollable = scrollableRef.current
    invariant(scrollable)

    function begin({ startX }: { startX: number }) {
      let lastX = startX

      const cleanupEvents = bindAll(
        window,
        [
          {
            type: "pointermove",
            listener(event) {
              const currentX = event.clientX
              const diffX = lastX - currentX

              lastX = currentX
              scrollable?.scrollBy({ left: diffX })
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

        { capture: true }
      )

      cleanupActive = cleanupEvents
    }

    const cleanupStart = bindAll(scrollable, [
      {
        type: "pointerdown",
        listener(event) {
          if (!(event.target instanceof HTMLElement)) {
            return
          }
          // ignore interactive elements
          if (event.target.closest(`[${blockBoardPanningAttr}]`)) {
            return
          }

          begin({ startX: event.clientX })
        },
      },
    ])

    return function cleanupAll() {
      cleanupStart()
      cleanupActive?.()
    }
  }, [])

  return (
    <>
      <Box
        className={`${kanbanFilter && "flex w-full gap-6 "} h-full overflow-hidden`}
        ref={scrollableRef}
      >
        <Box
          className={`${kanbanFilter ? "w-full space-y-5 " : "flex flex-row gap-4 2xl:gap-7"}`}
        >
          {data.columns.map((column) => (
            <BoardColumn
              key={column.id}
              column={column}
              kanbanFilter={kanbanFilter}
            />
          ))}
        </Box>
        <Suspense fallback={<Box className="p-4">Loading drawer...</Box>}>
          <TaskCardDrawer kanbanFilter={kanbanFilter} />
        </Suspense>
      </Box>
    </>
  )
}
