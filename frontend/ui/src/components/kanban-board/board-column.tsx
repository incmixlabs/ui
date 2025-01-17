import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { Badge, Card } from "@radix-ui/themes"
import type { Column, Task } from "@jsprtmnn/utils/types"
import type React from "react"
import { useCallback, useEffect, useMemo, useRef } from "react"
import invariant from "tiny-invariant"
import { CardContent, CardHeader } from "../card/card"
import { useBoardContext } from "./board-context"
import { ColumnContext, type ColumnContextProps } from "./column-context"
import { TaskCard } from "./task-card"

type BoardColumnProps = {
  column: Column
  tasks: Task[]
}

export const BoardColumn: React.FC<BoardColumnProps> = ({ column, tasks }) => {
  const columnRef = useRef<HTMLDivElement | null>(null)
  const columnInnerRef = useRef<HTMLDivElement | null>(null)

  const { instanceId } = useBoardContext()

  useEffect(() => {
    invariant(columnRef.current)
    invariant(columnInnerRef.current)

    return combine(
      dropTargetForElements({
        element: columnInnerRef.current,
        getData: () => ({ columnId: column.id }),
        canDrop: ({ source }) => {
          return source.data.instanceId === instanceId
        },
        getIsSticky: () => true,
      })

      // autoScrollForElements({
      //   element: scrollableRef.current,
      //   canScroll: ({ source }) =>
      //     source.data.instanceId === instanceId && source.data.type === "card",
      // })
    )
  }, [column.id, instanceId])

  const stableItems = useRef(tasks)
  useEffect(() => {
    stableItems.current = tasks
  }, [tasks])

  const getTaskIndex = useCallback((taskId: string) => {
    return stableItems.current?.findIndex((item) => item.id === taskId) ?? -1
  }, [])

  const getNumTasks = useCallback(() => {
    return stableItems.current?.length ?? 0
  }, [])

  const contextValue: ColumnContextProps = useMemo(() => {
    return { columnId: column.id, getTaskIndex, getNumTasks }
  }, [column.id, getTaskIndex, getNumTasks])

  return (
    <ColumnContext.Provider value={contextValue}>
      <Card
        ref={columnRef}
        className="flex h-full min-w-72 max-w-xs flex-shrink-0 snap-center flex-col overflow-y-auto bg-primary-foreground p-0"
      >
        <CardHeader className="flex flex-row items-center justify-between bg-gray-100 p-4 font-semibold dark:bg-zinc-800">
          <h1>{column.label}</h1>
          <Badge variant="outline">{tasks.length}</Badge>
        </CardHeader>

        <CardContent
          ref={columnInnerRef}
          className="flex flex-grow flex-col gap-2 p-2"
        >
          {tasks.length === 0 ? (
            <div className="flex flex-grow items-center justify-center">
              <p className="text-gray-400">No tasks here.</p>
            </div>
          ) : (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </CardContent>
      </Card>
    </ColumnContext.Provider>
  )
}
