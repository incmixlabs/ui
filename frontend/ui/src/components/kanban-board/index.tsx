"use client";
import type { Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge"
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge"
import { getReorderDestinationIndex } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder"
import type {
  ColumnWithTasks,
  NestedColumns,
  Task,
} from "@incmix/utils/types/tasks"
import { Card, Flex, Spinner } from "@radix-ui/themes"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import invariant from "tiny-invariant"
import { CardContent } from "../card/card"
import { Board } from "./board"
import { BoardContext, type BoardContextValue } from "./board-context"

export type ColumnMap = { [columnId: string]: ColumnWithTasks }

const flattenColumns = (cols: NestedColumns[]): ColumnWithTasks[] => {
  return cols.flatMap((col) =>
    col.children ? [col, ...flattenColumns(col.children)] : [col]
  )
}

const columnMap = (cols: ColumnWithTasks[]): ColumnMap => {
  const columnMap: ColumnMap = {}
  cols.forEach((col) => {
    columnMap[col.id] = col
  })
  return columnMap
}

type Outcome =
  | {
      type: "card-reorder"
      columnId: string
      startIndex: number
      finishIndex: number
    }
  | {
      type: "card-move"
      finishColumnId: string
      itemIndexInStartColumn: number
      itemIndexInFinishColumn: number
    }

type Trigger = "pointer" | "keyboard"

type Operation = {
  trigger: Trigger
  outcome: Outcome
}

type BoardState = {
  columnMap: ColumnMap
  orderedColumnIds: string[]
  lastOperation: Operation | null
}

type BoardProps = {
  columns: NestedColumns[]
  tasks: Task[]
  updateTasks: (updatedTasks: Task[]) => void
  isLoading?: boolean
}

export const KanbanBoard: React.FC<BoardProps> = ({
  columns,
  tasks,
  updateTasks,
  isLoading,
}) => {
  const data = useMemo<BoardState>(() => {
    const flatColumns = flattenColumns(columns)
    const base = columnMap(flatColumns)
    return {
      columnMap: base,
      orderedColumnIds: Object.keys(base),
      lastOperation: null,
    }
  }, [columns])

  const stableData = useRef(data)

  useEffect(() => {
    stableData.current = data
  }, [data])

  const getColumns = useCallback(() => {
    const { columnMap, orderedColumnIds } = stableData.current
    return orderedColumnIds.map((columnId) => columnMap[columnId])
  }, [])

  const reorderCard = useCallback(
    ({
      columnId,
      startIndex,
      finishIndex,
    }: {
      columnId: string
      startIndex: number
      finishIndex: number
      trigger?: Trigger
    }) => {
      const sourceColumn = data.columnMap[columnId]
      const updatedItems = reorder({
        list: sourceColumn.tasks,
        startIndex,
        finishIndex,
      })

      updateTasks(updatedItems.map((item, i) => ({ ...item, taskOrder: i })))
    },
    [data, updateTasks]
  )
  const moveCard = useCallback(
    ({
      startColumnId,
      finishColumnId,
      itemIndexInStartColumn,
      itemIndexInFinishColumn,
    }: {
      startColumnId: string
      finishColumnId: string
      itemIndexInStartColumn: number
      itemIndexInFinishColumn?: number
      trigger?: "pointer" | "keyboard"
    }) => {
      // invalid cross column movement
      if (startColumnId === finishColumnId) {
        return
      }

      const sourceColumn = data.columnMap[startColumnId]

      const destinationColumn = data.columnMap[finishColumnId]

      const item = sourceColumn.tasks[itemIndexInStartColumn]
      invariant(item)
      const destinationItems = Array.from(destinationColumn.tasks)
      // Going into the first position if no index is provided
      const newIndexInDestination = itemIndexInFinishColumn ?? 0

      item.columnId = destinationColumn.id
      destinationItems.splice(newIndexInDestination, 0, item)

      const updatedMap = {
        ...data.columnMap,
        [startColumnId]: {
          ...sourceColumn,
          tasks: sourceColumn.tasks.filter((i) => i.id !== item.id),
        },
        [finishColumnId]: {
          ...destinationColumn,
          tasks: destinationItems,
        },
      }

      updateTasks(
        updatedMap[startColumnId].tasks.map((item, i) => ({
          ...item,
          taskOrder: i,
        }))
      )
      updateTasks(
        updatedMap[finishColumnId].tasks.map((item, i) => ({
          ...item,
          taskOrder: i,
        }))
      )
    },
    [updateTasks, data]
  )

  const [instanceId] = useState(() => Symbol("instance-id"))

  useEffect(() => {
    return combine(
      monitorForElements({
        canMonitor({ source }) {
          return source.data.instanceId === instanceId
        },
        onDrop(args) {
          const { location, source } = args

          // didn't drop on anything
          if (!location.current.dropTargets.length) {
            return
          }
          // need to handle drop

          // 1. remove element from original position
          // 2. move to new position

          // if (source.data.type === "column") {
          //   const startIndex: number = data.orderedColumnIds.findIndex(
          //     (columnId) => columnId === source.data.columnId
          //   )

          //   const target = location.current.dropTargets[0]
          //   const indexOfTarget: number = data.orderedColumnIds.findIndex(
          //     (id) => id === target.data.columnId
          //   )
          //   const closestEdgeOfTarget: Edge | null = extractClosestEdge(
          //     target.data
          //   )

          //   const finishIndex = getReorderDestinationIndex({
          //     startIndex,
          //     indexOfTarget,
          //     closestEdgeOfTarget,
          //     axis: "horizontal",
          //   })

          //   // reorderColumn({ startIndex, finishIndex, trigger: "pointer" });
          // }
          // Dragging a card
          if (source.data.itemId) {
            const itemId = source.data.itemId
            invariant(typeof itemId === "string")
            // TODO: these lines not needed if item has columnId on it
            const [, startColumnRecord] = location.initial.dropTargets
            const sourceId = startColumnRecord.data.columnId
            invariant(typeof sourceId === "string")
            const sourceColumn = data.columnMap[sourceId]
            const itemIndex = sourceColumn.tasks.findIndex(
              (item) => item.id === itemId
            )
            invariant(itemIndex !== undefined)
            if (location.current.dropTargets.length === 1) {
              const [destinationColumnRecord] = location.current.dropTargets
              const destinationId = destinationColumnRecord.data.columnId
              invariant(typeof destinationId === "string")
              const destinationColumn = data.columnMap[destinationId]
              invariant(destinationColumn)

              // reordering in same column
              if (sourceColumn === destinationColumn) {
                const destinationIndex = getReorderDestinationIndex({
                  startIndex: itemIndex,
                  indexOfTarget: sourceColumn.tasks.length - 1,
                  closestEdgeOfTarget: null,
                  axis: "vertical",
                })
                reorderCard({
                  columnId: sourceColumn.id,
                  startIndex: itemIndex,
                  finishIndex: destinationIndex,
                  trigger: "pointer",
                })
                return
              }

              // moving to a new column
              moveCard({
                itemIndexInStartColumn: itemIndex,
                startColumnId: sourceColumn.id,
                finishColumnId: destinationColumn.id,
                trigger: "pointer",
              })
              return
            }

            // dropping in a column (relative to a card)
            if (location.current.dropTargets.length === 2) {
              const [destinationCardRecord, destinationColumnRecord] =
                location.current.dropTargets
              const destinationColumnId = destinationColumnRecord.data.columnId

              invariant(typeof destinationColumnId === "string")
              const destinationColumn = data.columnMap[destinationColumnId]

              const indexOfTarget = destinationColumn.tasks.findIndex(
                (item) => item.id === destinationCardRecord.data.itemId
              )
              const closestEdgeOfTarget: Edge | null = extractClosestEdge(
                destinationCardRecord.data
              )

              // case 1: ordering in the same column
              if (sourceColumn === destinationColumn) {
                const destinationIndex = getReorderDestinationIndex({
                  startIndex: itemIndex,
                  indexOfTarget,
                  closestEdgeOfTarget,
                  axis: "vertical",
                })
                reorderCard({
                  columnId: sourceColumn.id,
                  startIndex: itemIndex,
                  finishIndex: destinationIndex,
                  trigger: "pointer",
                })
                return
              }

              // case 2: moving into a new column relative to a card

              const destinationIndex =
                closestEdgeOfTarget === "bottom"
                  ? indexOfTarget + 1
                  : indexOfTarget

              moveCard({
                itemIndexInStartColumn: itemIndex,
                startColumnId: sourceColumn.id,
                finishColumnId: destinationColumn.id,
                itemIndexInFinishColumn: destinationIndex,
                trigger: "pointer",
              })
            }
          }
        },
      })
    )
  }, [data, instanceId, moveCard, reorderCard])

  const contextValue: BoardContextValue = useMemo(() => {
    return {
      getColumns,
      // reorderColumn,
      reorderCard,
      moveCard,

      instanceId,
    }
  }, [getColumns, reorderCard, moveCard, instanceId])

  if (isLoading)
    return (
      <Flex
        className="h-[calc((100vh-var(--navbar-height))-3rem)]"
        align="center"
        justify="center"
      >
        <Spinner className="size-10" />
      </Flex>
    )
  if (!columns.length)
    return (
      <Card>
        <CardContent>
          <p className="text-center">No columns or tasks found</p>
        </CardContent>
      </Card>
    )

  return (
    <BoardContext.Provider value={contextValue}>
      <Board columns={columns} tasks={tasks} />
    </BoardContext.Provider>
  )
}
