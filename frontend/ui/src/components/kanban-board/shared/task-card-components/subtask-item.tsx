// task-card-components/subtask-item.tsx
import { Reorder, useDragControls } from "framer-motion"
import { GripVertical, Trash2 } from "lucide-react"
import { cn } from "@utils"
import { Checkbox } from "@incmix/ui"
import type { SubtaskItemProps } from "./utils/types"

export function SubtaskItem({ subtask, onUpdate, onDelete }: SubtaskItemProps) {
  const controls = useDragControls();
  
  return (
    <Reorder.Item
      value={subtask}
      dragControls={controls}
      dragListener={false}
      className="list-none"
    >
      <div className={cn(
        "group flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-6 transition-all hover:shadow-sm",
        subtask.completed && "opacity-70"
      )}>
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
            subtask.completed && "line-through text-gray-400 dark:text-gray-500"
          )}
        >
          {subtask.name}
        </label>
        
        <button
          onClick={() => onDelete(subtask.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </Reorder.Item>
  );
}