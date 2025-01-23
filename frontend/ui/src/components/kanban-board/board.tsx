import type { NestedColumns, Task } from "@incmix/utils/types/tasks"
import { cn } from "@incmix/ui/utils/cn"
import type React from "react"
import { BoardColumn } from "./board-column"

type BoardProps = {
  columns: NestedColumns[]
  tasks: Task[]
}

export const Board: React.FC<BoardProps> = ({ columns, tasks }) => {
  const renderNestedColumns = (cols: NestedColumns[]) => {
    return cols.map((col) => {
      const tasksInColumn = tasks.filter((task) => task.columnId === col.id)

      if (col.children && col.children.length > 0) {
        // If the column has children, only render it if it has tasks directly assigned
        return (
          <div key={col.id} className="flex flex-col gap-4">
            <BoardColumn tasks={tasksInColumn} column={col} />
            <div
              className={cn(
                "flex flex-col gap-2",
                tasksInColumn.length > 0 ? "ml-4" : ""
              )}
            >
              {renderNestedColumns(col.children)}
            </div>
          </div>
        )
      }
      // If it's a leaf node, always render it
      return <BoardColumn tasks={tasksInColumn} key={col.id} column={col} />
    })
  }

  return (
    <div className="mt-10 flex flex-row items-start justify-start gap-4">
      {renderNestedColumns(columns)}
    </div>
  )
}
