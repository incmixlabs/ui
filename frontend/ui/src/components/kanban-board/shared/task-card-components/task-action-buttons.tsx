// task-card-components/task-action-buttons.tsx
import {
    Check,
    MoreVertical,
    Copy,
    Star,
    Archive,
    Trash2,
    Clock,
    AlertCircle,
    Flag,
  } from "lucide-react"
  import { Select, DropdownMenu } from "@incmix/ui"
  import { cn } from "@utils"
  import { getPriorityConfig, isTaskOverdue } from "./utils/task-utils"
  import type { TaskActionButtonsProps } from "./utils/types"
  import type { KanbanColumn } from "@incmix/store"
  
  export function TaskActionButtons({
    currentTask,
    currentColumn,
    columns,
    onCompleteTask,
    onStatusChange,
    onPriorityChange,
    onDeleteTask,
    onDuplicateTask,
  }: TaskActionButtonsProps) {
    const priorityConfig = getPriorityConfig(currentTask.priority)
    const PriorityIcon = priorityConfig.icon
    const isOverdue = isTaskOverdue(currentTask)
  
    const handleDeleteClick = () => {
      onDeleteTask()
    }
  
    return (
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={onCompleteTask}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
            currentTask.completed 
              ? "bg-green-50 border border-green-200 text-green-700 hover:bg-green-100 dark:bg-green-950/20 dark:border-green-800 dark:text-green-400"
              : "bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          )}
        >
          <Check className="h-4 w-4" />
          {currentTask.completed ? "Completed" : "Mark Complete"}
        </button>
  
        {/* Status/Column Dropdown */}
        <Select.Root
          value={currentTask.columnId}
          onValueChange={onStatusChange}
        >
          <Select.Trigger className="flex h-9 px-4 py-2 w-40 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: currentColumn?.color }} />
              <span className="text-sm font-medium">{currentColumn?.name}</span>
            </div>
          </Select.Trigger>
          <Select.Content>
            {columns.map((col: KanbanColumn) => (
              <Select.Item key={col.id} value={col.id}>
                <div className="flex items-center gap-2 ">
                  <div className="w-2 h-3 rounded-full" style={{ backgroundColor: col.color }} />
                  <span>{col.name}</span>
                </div>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
  
        {/* Priority Dropdown */}
        <Select.Root
          value={currentTask.priority || "medium"}
          onValueChange={onPriorityChange}
        >
          <Select.Trigger className="flex h-9 px-4 py-2 min-w-[140px] rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-2">
              <PriorityIcon className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm font-medium">{priorityConfig.label}</span>
            </div>
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="low">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>Low Priority</span>
              </div>
            </Select.Item>
            <Select.Item value="medium">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span>Medium Priority</span>
              </div>
            </Select.Item>
            <Select.Item value="high">
              <div className="flex items-center gap-2">
                <Flag className="h-4 w-4 text-orange-500" />
                <span>High Priority</span>
              </div>
            </Select.Item>
            <Select.Item value="urgent">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span>Urgent</span>
              </div>
            </Select.Item>
          </Select.Content>
        </Select.Root>
  
        {isOverdue && (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-800">
            <Clock className="h-3 w-3" />
            Overdue
          </span>
        )}
  
        <div className="ml-auto">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <button className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors">
                <MoreVertical className="h-4 w-4" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
              <DropdownMenu.Item onClick={onDuplicateTask}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate Task
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <Star className="h-4 w-4 mr-2" />
                Add to Favorites
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item>
                <Archive className="h-4 w-4 mr-2" />
                Archive Task
              </DropdownMenu.Item>
              <DropdownMenu.Item 
                onClick={handleDeleteClick} 
                className="text-red-600 focus:text-red-600 dark:text-red-400"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Task
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </div>
    )
  }