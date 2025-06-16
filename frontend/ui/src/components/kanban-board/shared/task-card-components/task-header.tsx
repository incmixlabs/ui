// task-card-components/task-header.tsx
import { X } from "lucide-react"
import type { TaskHeaderProps } from "./utils/types"

export function TaskHeader({ currentColumn, onClose }: TaskHeaderProps) {
  return (
    <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentColumn.color }} />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{currentColumn.name}</span>
        </div>

        <button
          onClick={onClose}
          className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}