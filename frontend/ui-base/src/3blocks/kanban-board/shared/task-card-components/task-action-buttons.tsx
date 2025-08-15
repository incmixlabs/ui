import { Box, Button, DropdownMenu } from "@/base"
import { cn } from "@/utils/cn"
import type { KanbanColumn } from "@incmix/utils/schema"
// task-card-components/task-action-buttons.tsx
import {
  AlertCircle,
  Archive,
  Check,
  Clock,
  Copy,
  Flag,
  MoreVertical,
  Star,
  Trash2,
} from "lucide-react"
import { LabelDropdownSelector } from "../../../../2elements/dropdown-select/label-dropdown-select"
import { getPriorityConfig } from "../../../../2elements/dropdown-select/label-utils"
import { isTaskOverdue } from "./utils/task-utils"
import type { TaskActionButtonsProps } from "./utils/types"

export function TaskActionButtons({
  currentTask,
  currentColumn: _currentColumn,
  columns,
  priorityLabels = [], // Use priorityLabels from props with default empty array
  onCompleteTask,
  onStatusChange,
  onPriorityChange,
  onDeleteTask,
  onDuplicateTask,
}: TaskActionButtonsProps) {
  const priorityConfig = getPriorityConfig(
    currentTask.priorityId,
    priorityLabels
  )
  const _PriorityIcon = priorityConfig.icon
  const _isOverdue = isTaskOverdue(currentTask)

  const handleDeleteClick = () => {
    onDeleteTask()
  }

  return (
    <Box className="flex flex-nowrap items-center gap-3">
      <div className="flex flex-nowrap items-center gap-3">
        {/* Mark Complete Button */}
        <Button
          onClick={onCompleteTask}
          color={currentTask.completed ? "green" : undefined}
          className={cn(
            "inline-flex h-9 items-center gap-2 rounded-md font-medium text-sm transition-all duration-200"
          )}
        >
          <Check className="h-4 w-4" />
          {currentTask.completed ? "Completed" : "Mark Complete"}
        </Button>

        {/* Status/Column Dropdown */}
        <LabelDropdownSelector
          options={columns.map((col: KanbanColumn) => ({
            id: col.id,
            name: col.name,
            color: col.color,
            type: "status" as const,
          }))}
          value={currentTask.statusId}
          onValueChange={onStatusChange}
          showColorDot={true}
          triggerClassName="w-40"
        />

        {/* Priority Dropdown */}
        <LabelDropdownSelector
          options={priorityLabels}
          value={currentTask.priorityId || "medium"}
          onValueChange={onPriorityChange}
          icon={Flag}
          renderIcon={(option: { id: string; color?: string }) => {
            // Get the proper icon for this priority based on available labels
            const config = getPriorityConfig(option.id, priorityLabels)
            const PriorityIcon = config.icon

            return (
              <PriorityIcon
                className="h-4 w-4 flex-shrink-0"
                style={{ color: option.color }}
              />
            )
          }}
          showColorDot={false}
        />

        {/* {isOverdue && (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-800">
            <Clock className="h-3 w-3" />
            Overdue
          </span>
        )} */}

        {/* 3-dot menu positioned directly next to the priority dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-md p-0 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end">
            <DropdownMenu.Item onClick={onDuplicateTask}>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate Task
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Star className="mr-2 h-4 w-4" />
              Add to Favorites
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>
              <Archive className="mr-2 h-4 w-4" />
              Archive Task
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={handleDeleteClick}
              className="text-red-600 focus:text-red-600 dark:text-red-400"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Task
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </Box>
  )
}
