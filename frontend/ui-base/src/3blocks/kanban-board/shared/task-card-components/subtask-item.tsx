import { Checkbox } from "@/base"
import { cn } from "@/utils/cn"
// task-card-components/subtask-item.tsx
import { Reorder, useDragControls } from "framer-motion"
import { GripVertical, Trash2 } from "lucide-react"
import type { SubtaskItemProps } from "./utils/types"

export function SubtaskItem({ subtask, onUpdate, onDelete }: SubtaskItemProps) {
  const controls = useDragControls()

  return (
    <Reorder.Item
      value={subtask}
      dragControls={controls}
      dragListener={false}
      className="list-none"
    >
      <div
        className={cn(
          "group flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 transition-all hover:shadow-sm dark:border-gray-700 dark:bg-gray-6",
          subtask.completed && "opacity-70"
        )}
      >
        <div
          className="cursor-grab touch-none"
          onPointerDown={(e) => controls.start(e)}
        >
          <GripVertical className="h-4 w-4 text-gray-400" />
        </div>

        <Checkbox
          id={`subtask-${subtask.id}`}
          checked={subtask.completed}
          onCheckedChange={() => onUpdate(subtask.id, !subtask.completed)}
          className="mt-0.5"
        />

        <label
          htmlFor={`subtask-${subtask.id}`}
          className={cn(
            "flex-1 text-sm",
            subtask.completed && "text-gray-400 line-through dark:text-gray-500"
          )}
        >
          {subtask.name}
        </label>

        <button
          type="button"
          onClick={() => onDelete(subtask.id)}
          className="flex h-8 w-8 items-center justify-center rounded-md p-0 opacity-0 transition-opacity hover:bg-gray-100 group-hover:opacity-100 dark:hover:bg-gray-800"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </Reorder.Item>
  )
}
