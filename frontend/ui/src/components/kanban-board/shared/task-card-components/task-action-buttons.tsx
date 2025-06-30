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
  import { Select, DropdownMenu, Button, Box } from "@incmix/ui"
  import { cn } from "@utils"
  import { getPriorityConfig, isTaskOverdue } from "./utils/task-utils"
  import type { TaskActionButtonsProps } from "./utils/types"
import { KanbanColumn } from "@incmix/utils/schema"
  
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
      <Box className="flex items-center gap-3 flex-nowrap">
        <div className="flex flex-nowrap items-center gap-3">
          {/* Mark Complete Button */}
          <Button
            onClick={onCompleteTask}
            color={currentTask.completed && "green"}
            className={cn(
              "inline-flex items-center gap-2 h-9 rounded-md text-sm font-medium transition-all duration-200",
            )}
          >
            <Check className="h-4 w-4" />
            {currentTask.completed ? "Completed" : "Mark Complete"}
          </Button>
    
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
          
          {/* 3-dot menu positioned directly next to the priority dropdown */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <button className="h-9 w-9 p-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors">
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
      </Box>
    )
  }