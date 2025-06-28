// task-card-components/subtask-item.tsx
import { GripVertical, Trash2 } from "lucide-react"
import { cn } from "@utils"
import type { SubtaskItemProps } from "./utils/types"

export function SubtaskItem({ subtask, onUpdate, onDelete }: SubtaskItemProps) {
  return (
      <div 
        className={cn(
          "group flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 transition-all hover:shadow-sm",
          subtask.completed && "opacity-70"
        )}
        data-subtask-item
        data-item-id={subtask.id}
      >
        <div 
          className="cursor-grab touch-none"
          data-drag-handle
        >
          <GripVertical className="h-4 w-4 text-gray-400" />
        </div>
        
        <input
          type="checkbox"
          checked={subtask.completed}
          onChange={() => onUpdate(subtask.id, !subtask.completed)}
          className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-800"
        />
        
        <span className={cn(
          "flex-1 text-sm",
          subtask.completed && "line-through text-gray-500"
        )}>
          {subtask.name}
        </span>
        
        <button
          onClick={() => onDelete(subtask.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    
  );
}