import {
  Badge,
  Box,
  DropdownMenu,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
  toast,
} from "@/base"
import type { UniqueIdentifier } from "@dnd-kit/core"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { cva } from "class-variance-authority"
import type { KanbanTask } from "../types"

import { cn } from "@/utils/cn"
import type { TaskDataSchema } from "@incmix/utils/schema"
import { nanoid } from "nanoid"
import { useCallback, useState } from "react"
import { useKanbanDrawer } from "../hooks/use-kanban-drawer"
import { getPriorityConfig } from "../priority-config"
import type { PriorityLabel } from "../priority-config"
import { ModalPresets } from "../shared/confirmation-modal"
import { RefUrlSummary } from "../shared/ref-url-summary"

interface TaskCardProps {
  task: KanbanTask
  isOverlay?: boolean
  priorityLabels?: PriorityLabel[] // Array of priority labels
  onUpdateTask?: (
    taskId: string,
    updates: Partial<TaskDataSchema>
  ) => Promise<void>
  onDeleteTask?: (taskId: string) => Promise<void>
  onTaskOpen?: (taskId: string) => void
}

export type TaskType = "Task"

export interface TaskDragData {
  type: TaskType
  task: KanbanTask
}

const variants = cva("", {
  variants: {
    dragging: {
      over: "rounded-lg opacity-30 ring-2",
      overlay: "rounded-lg bg-orange-500 text-white",
    },
  },
})
export function TaskCard({
  task,
  isOverlay,
  priorityLabels,
  onUpdateTask,
  onDeleteTask,
  onTaskOpen,
}: TaskCardProps) {
  // console.log("task", task);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task?.id || (`task-${nanoid()}` as UniqueIdentifier),
    data: {
      type: "Task",
      task,
    } satisfies TaskDragData,
    attributes: {
      roleDescription: "Task",
    },
  })

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  }

  const { handleDrawerOpen } = useKanbanDrawer()

  const handleTaskClick = useCallback(
    (e: React.MouseEvent) => {
      // Don't open task if clicking on dropdown or other interactive elements
      if (
        e.target instanceof Element &&
        (e.target.closest("[data-no-drawer]") ||
          e.target.closest('[role="menuitem"]'))
      ) {
        return
      }

      // Ensure task.id exists before using it
      if (!task.id) return

      // Simple direct approach - just open the drawer
      handleDrawerOpen(task.id)

      // If onTaskOpen exists, call it after handleDrawerOpen
      if (onTaskOpen && task.id) {
        onTaskOpen(task.id)
      }
    },
    [task.id, handleDrawerOpen, onTaskOpen]
  )

  const handleToggleCompleted = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      if (!onUpdateTask || !task.id) return

      // setIsUpdating(true)
      onUpdateTask(task.id, { completed: !task.completed })
        .then(() => {
          // setIsUpdating(false)
        })
        .catch((err) => {
          // setIsUpdating(false)
          console.error("Error updating task completion status:", err)
          toast.error(
            "Could not update task completion status. Please try again.",
            {
              duration: 5000,
            }
          )
        })
    },
    [task.completed, task.id, onUpdateTask]
  )

  // Handle task actions
  const handleEdit = useCallback(() => {
    if (onTaskOpen && task.id) {
      onTaskOpen(task.id)
    } else if (task.id) {
      handleDrawerOpen(task.id)
    }
  }, [task.id, handleDrawerOpen, onTaskOpen])

  // Modal state for task deletion
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = useCallback(() => {
    setShowDeleteConfirmation(true)
  }, [task.id])

  // Confirm task deletion handler
  const confirmDelete = useCallback(() => {
    if (!onDeleteTask || !task.id) return

    setIsDeleting(true)
    onDeleteTask(task.id)
      .then(() => {
        setIsDeleting(false)
        setShowDeleteConfirmation(false)
      })
      .catch((err) => {
        setIsDeleting(false)
        console.error("Error deleting task:", err)
        toast.error("Could not delete task. Please try again.", {
          duration: 5000,
        })
      })
  }, [task.id, onDeleteTask])

  // Using the shared priority configuration from priority-config.ts - will be updated with dynamic labels
  // Note: The TaskCard should receive priorityLabels from its parent to avoid hardcoded values

  const formatDate = useCallback((date?: Date) => {
    if (!date) return { text: "", className: "" }

    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return {
        text: `${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? "s" : ""} overdue`,
        className: "text-red-600 bg-red-50 border-red-200",
      }
    }
    if (diffDays === 0) {
      return {
        text: "Due today",
        className: "text-orange-600 bg-orange-50 border-orange-200",
      }
    }
    if (diffDays === 1) {
      return {
        text: "Due tomorrow",
        className: "text-yellow-600 bg-yellow-50 border-yellow-200",
      }
    }
    if (diffDays <= 7) {
      return {
        text: `Due in ${diffDays} days`,
        className: "text-blue-600 bg-blue-50 border-blue-200",
      }
    }

    return {
      text: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      className: "text-gray-600 bg-gray-50 border-gray-200",
    }
  }, [])

  const completedSubTasks =
    task.subTasks?.filter((st) => st.completed).length || 0
  const totalSubTasks = task.subTasks?.length || 0
  const progressPercentage =
    totalSubTasks > 0 ? (completedSubTasks / totalSubTasks) * 100 : 0

  // Use new getPriorityConfig function which works with priorityLabels
  const priorityInfo = getPriorityConfig(task.priorityId, priorityLabels)
  const _PriorityIcon = priorityInfo.icon
  const dueDateInfo = formatDate(
    typeof task.startDate === "number" ? new Date(task.startDate) : undefined
  )

  return (
    <>
      {ModalPresets.deleteTask({
        isOpen: showDeleteConfirmation,
        onOpenChange: setShowDeleteConfirmation,
        onConfirm: confirmDelete,
        taskName: task.name,
        isLoading: isDeleting,
      })}

      <Box
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={cn(
          "group relative cursor-pointer space-y-3 p-0",
          task.completed && "opacity-75",
          variants({
            dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
          })
        )}
      >
        <Box
          onClick={handleTaskClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " " || e.code === "Space") {
              e.preventDefault()
              handleTaskClick(e as unknown as React.MouseEvent)
            }
          }}
          className={cn("flex flex-shrink-0 flex-col gap-1")}
        >
          <Box
            className={cn(
              "group relative cursor-grab space-y-3 rounded-lg border border-gray-5 bg-gray-1 p-3 active:cursor-grabbing",
              task.completed && "opacity-75"
            )}
          >
            {/* Task Header with Priority and Actions */}
            <Flex justify="between" align="start" className="-mt-1 gap-2">
              <Flex align="center" gap="2" className="min-w-0 flex-1">
                {/* Priority indicator */}
                {task.priorityId && priorityInfo && (
                  <Badge
                    size="1"
                    color="gray"
                    variant="soft"
                    className={`px-2 py-0.5 ${priorityInfo.color}`}
                  >
                    {priorityInfo.label}
                  </Badge>
                )}

                {/* Completion status */}
                {task.completed && (
                  <Badge
                    color="green"
                    size="1"
                    variant="solid"
                    className="flex-shrink-0"
                  >
                    Done
                  </Badge>
                )}
              </Flex>
              <Flex align="center" gap="2">
                {/* Due Date */}
                {dueDateInfo.text && (
                  <Flex align="center" gap="1">
                    <Icon name="CalendarDays" />
                    <Text
                      size="2"
                      className={cn(
                        "rounded-md px-0.5 py-0.5"
                        // dueDateInfo.className,
                      )}
                    >
                      {dueDateInfo.text}
                    </Text>
                  </Flex>
                )}
                {/* Actions Menu */}
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <IconButton
                      size="1"
                      variant="ghost"
                      onClick={(e) => e.stopPropagation()}
                      className=""
                    >
                      <Icon name="EllipsisVertical" />
                    </IconButton>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Item onClick={handleEdit}>
                      <Icon name="SquarePen" />
                      Edit Task
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      onClick={(e) =>
                        handleToggleCompleted(
                          e as unknown as React.MouseEvent<HTMLButtonElement>
                        )
                      }
                    >
                      <Icon name="SquareCheck" />
                      {task.completed ? "Mark Incomplete" : "Mark Complete"}
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item onClick={handleDelete} color="red">
                      <Icon name="Trash2" />
                      Delete Task
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Flex>
            </Flex>
            {task.assignedTo && (
              <Flex align={"center"} gap={"1"}>
                {task.assignedTo.map((assignee) => {
                  const colors = [
                    "bg-green-400",
                    "bg-yellow-400",
                    "bg-orange-400",
                    "bg-cyan-400",
                    "bg-red-400",
                  ]
                  // Create a deterministic color based on the assignee's name
                  const nameSum = assignee.name
                    .split("")
                    .reduce((sum, char) => sum + char.charCodeAt(0), 0)
                  const colorIndex = nameSum % colors.length
                  const stableColor = colors[colorIndex]
                  return (
                    <Text
                      key={assignee.name}
                      className={`flex h-1 w-6 items-center gap-1 rounded-full ${stableColor}`}
                    />
                  )
                })}
              </Flex>
            )}
            {/* Task Title */}
            <Heading
              as="h4"
              size="3"
              className={cn(
                "line-clamp-2 font-medium leading-tight transition-colors",
                task.completed && "text-gray-11 line-through"
              )}
            >
              {task.name}
            </Heading>

            {/* Task Description */}
            {task.description && (
              <Text className="line-clamp-2 text-gray-600 text-sm leading-relaxed dark:text-gray-400">
                {task.description}
              </Text>
            )}

            {/* Labels */}
            {task.labelsTags && task.labelsTags.length > 0 && (
              <Flex gap="1" wrap="wrap">
                {task.labelsTags.slice(0, 3).map((label, index) => (
                  <Badge
                    key={`${label.value}-${index}`}
                    size="1"
                    variant="soft"
                    style={{
                      backgroundColor: `${label.color}20`,
                      color: label.color,
                    }}
                    className="border text-xs"
                  >
                    {label.label}
                  </Badge>
                ))}
                {task.labelsTags.length > 3 && (
                  <Badge
                    size="1"
                    variant="soft"
                    color="gray"
                    className="text-xs"
                  >
                    +{task.labelsTags.length - 3} more
                  </Badge>
                )}
              </Flex>
            )}

            {/* Subtasks Progress */}
            {totalSubTasks > 0 && (
              <Box className="space-y-2">
                <Flex align="center" justify="between">
                  <Flex align="center" gap="1">
                    <Icon name="SquareCheck" className="text-gray-11" />
                    <Text size="1" className="font-medium text-gray-11">
                      {completedSubTasks}/{totalSubTasks} subtasks
                    </Text>
                  </Flex>
                  <Text size="1" className="font-medium text-gray-11">
                    {Math.round(progressPercentage)}%
                  </Text>
                </Flex>
                <Box className="h-1.5 w-full rounded-full bg-gray-6">
                  <Box
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      progressPercentage === 100
                        ? "bg-green-500"
                        : "bg-blue-500"
                    )}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </Box>
              </Box>
            )}

            {/* Footer with meta information */}

            <Flex
              align={"center"}
              justify={"between"}
              className="w-full gap-2 py-1"
            >
              <Flex align={"center"} gap="4">
                {/* Reference URLs */}
                <RefUrlSummary
                  refUrls={task.refUrls}
                  className="text-gray-12"
                />

                {task.attachments && (
                  <IconButton className="flex items-center gap-1 bg-transparent text-gray-700 dark:text-gray-200">
                    <Icon name="Paperclip" />
                    <Text>{task.attachments.length}</Text>
                  </IconButton>
                )}
                <IconButton className="flex items-center gap-1 bg-transparent text-gray-700 dark:text-gray-200">
                  <Icon name="MessageSquareText" />
                  <Text>0</Text>
                </IconButton>
              </Flex>
              <Flex align={"center"} className="gap-2">
                {task.assignedTo && task.assignedTo.length > 0 && (
                  <Flex align="center" className="-space-x-2">
                    {task.assignedTo.slice(0, 3).map((member, index) => (
                      <Box
                        key={member.id}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-7 bg-gray-5 text-gray-11"
                        style={{ zIndex: 3 - index }}
                        title={member.name}
                        aria-label={`Assignee: ${member.name}`}
                      >
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </Box>
                    ))}
                    {task.assignedTo.length > 3 && (
                      <Box className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-7 bg-gray-3 font-medium text-gray-11 text-xs">
                        +{task.assignedTo.length - 3}
                      </Box>
                    )}
                  </Flex>
                )}
              </Flex>
            </Flex>
            {/* Assigned users */}
          </Box>
        </Box>
      </Box>
    </>
  )
}
