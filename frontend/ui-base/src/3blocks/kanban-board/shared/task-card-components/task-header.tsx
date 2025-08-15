// task-card-components/task-header.tsx
import { X } from "lucide-react"
import type { TaskHeaderProps } from "./utils/types"

export function TaskHeader({ currentColumn, onClose }: TaskHeaderProps) {
  return (
    <div className="flex-shrink-0 border-gray-200 border-b bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-950">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: currentColumn.color }}
          />
          <span className="font-medium text-gray-600 text-sm dark:text-gray-400">
            {currentColumn.name}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-md p-0 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
