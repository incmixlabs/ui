import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Badge, Card, Icon, Heading } from "@incmix/ui";
import { cva } from "class-variance-authority";
import { KanbanColumn, KanbanTask } from "../types";

import { isShallowEqual } from "@incmix/utils/objects";
import { isSafari } from "@utils/browser";
import { IconButton, DropdownMenu, Box, Flex, Text } from "@base";
import { toast } from "@incmix/ui";

import { cn } from "@utils";
import { useKanbanDrawer } from "../hooks/use-kanban-drawer";
import { ModalPresets } from "../shared/confirmation-modal";
import { TaskDataSchema } from "@incmix/utils/schema";
import { RefUrlSummary } from "../shared/ref-url-summary";
import {
  getPriorityInfo,
  getPriorityConfig,
  PriorityLabel,
} from "../priority-config";
import { useAppearanceStore } from "@incmix/store";
import { useCallback, useState } from "react";

interface TaskCardProps {
  task: KanbanTask;
  isOverlay?: boolean;
  priorityLabels?: PriorityLabel[]; // Array of priority labels
  onUpdateTask?: (
    taskId: string,
    updates: Partial<TaskDataSchema>,
  ) => Promise<void>;
  onDeleteTask?: (taskId: string) => Promise<void>;
  onTaskOpen?: (taskId: string) => void;
}

export type TaskType = "Task";

export interface TaskDragData {
  type: TaskType;
  task: KanbanTask;
}

const variants = cva("", {
  variants: {
    dragging: {
      over: "ring-2 opacity-30 rounded-lg",
      overlay: "bg-orange-500 text-white rounded-lg",
    },
  },
});
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
    id: task?.id || (`task-${Math.random()}` as UniqueIdentifier),
    data: {
      type: "Task",
      task,
    } satisfies TaskDragData,
    attributes: {
      roleDescription: "Task",
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const { appearance, toggleAppearance } = useAppearanceStore();
  const { handleDrawerOpen } = useKanbanDrawer();

  const handleTaskClick = useCallback(
    (e: React.MouseEvent) => {
      // Don't open task if clicking on dropdown or other interactive elements
      if (
        e.target instanceof Element &&
        (e.target.closest("[data-no-drawer]") ||
          e.target.closest('[role="menuitem"]'))
      ) {
        return;
      }

      // Ensure task.id exists before using it
      if (!task.id) return;

      // Simple direct approach - just open the drawer
      console.log("Opening task drawer for:", task.id);
      handleDrawerOpen(task.id);

      // If onTaskOpen exists, call it after handleDrawerOpen
      if (onTaskOpen && task.id) {
        onTaskOpen(task.id);
      }
    },
    [task.id, handleDrawerOpen, onTaskOpen],
  );

  const handleToggleCompleted = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!onUpdateTask || !task.id) return;

      // setIsUpdating(true)
      onUpdateTask(task.id, { completed: !task.completed })
        .then(() => {
          // setIsUpdating(false)
        })
        .catch((err) => {
          // setIsUpdating(false)
          console.error("Error updating task completion status:", err);
          toast.error(
            "Could not update task completion status. Please try again.",
            {
              duration: 5000,
            },
          );
        });
    },
    [task.completed, task.id, onUpdateTask],
  );

  // Handle task actions
  const handleEdit = useCallback(() => {
    if (onTaskOpen && task.id) {
      onTaskOpen(task.id);
    } else if (task.id) {
      handleDrawerOpen(task.id);
    }
  }, [task.id, handleDrawerOpen, onTaskOpen]);

  // Modal state for task deletion
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useCallback(() => {
    setShowDeleteConfirmation(true);
  }, [task.id]);

  // Confirm task deletion handler
  const confirmDelete = useCallback(() => {
    if (!onDeleteTask || !task.id) return;

    setIsDeleting(true);
    onDeleteTask(task.id)
      .then(() => {
        setIsDeleting(false);
        setShowDeleteConfirmation(false);
      })
      .catch((err) => {
        setIsDeleting(false);
        console.error("Error deleting task:", err);
        toast.error("Could not delete task. Please try again.", {
          duration: 5000,
        });
      });
  }, [task.id, onDeleteTask]);

  // Using the shared priority configuration from priority-config.ts - will be updated with dynamic labels
  // Note: The TaskCard should receive priorityLabels from its parent to avoid hardcoded values

  const formatDate = useCallback((date?: Date) => {
    if (!date) return { text: "", className: "" };

    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        text: `${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? "s" : ""} overdue`,
        className: "text-red-600 bg-red-50 border-red-200",
      };
    } else if (diffDays === 0) {
      return {
        text: "Due today",
        className: "text-orange-600 bg-orange-50 border-orange-200",
      };
    } else if (diffDays === 1) {
      return {
        text: "Due tomorrow",
        className: "text-yellow-600 bg-yellow-50 border-yellow-200",
      };
    } else if (diffDays <= 7) {
      return {
        text: `Due in ${diffDays} days`,
        className: "text-blue-600 bg-blue-50 border-blue-200",
      };
    }

    return {
      text: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      className: "text-gray-600 bg-gray-50 border-gray-200",
    };
  }, []);

  const completedSubTasks =
    task.subTasks?.filter((st) => st.completed).length || 0;
  const totalSubTasks = task.subTasks?.length || 0;
  const progressPercentage =
    totalSubTasks > 0 ? (completedSubTasks / totalSubTasks) * 100 : 0;

  // Use new getPriorityConfig function which works with priorityLabels
  const priorityInfo = getPriorityConfig(task.priorityId, priorityLabels);
  const PriorityIcon = priorityInfo.icon;
  const dueDateInfo = formatDate(
    typeof task.startDate === "number" ? new Date(task.startDate) : undefined,
  );

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
          "relative cursor-pointer p-0 space-y-3 group",
          task.completed && "opacity-75",
          variants({
            dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
          })
        )}
      >
        <Box
          onClick={handleTaskClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Space") {
              e.preventDefault();
              handleTaskClick(e as unknown as React.MouseEvent);
            }
          }}
          className={cn("flex flex-shrink-0 flex-col gap-1")}
        >
          <Box
            className={cn(
              "relative p-3 space-y-3 bg-gray-1 rounded-lg active:cursor-grabbing cursor-grab border border-gray-5 group",
              task.completed && "opacity-75",
            )}
          >
            {/* Task Header with Priority and Actions */}
            <Flex justify="between" align="start" className="gap-2 -mt-1">
              <Flex align="center" gap="2" className="flex-1 min-w-0">
                {/* Priority indicator */}
                {task.priorityId && (
                  <Badge
                    size="1"
                    color="gray"
                    variant="soft"
                    className={`px-2 py-0.5 ${getPriorityInfo(task.priorityId).color}`}
                  >
                    {getPriorityInfo(task.priorityId).label}
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
                        "px-0.5 py-0.5 rounded-md",
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
                          e as unknown as React.MouseEvent<HTMLButtonElement>,
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
                  ];
                  // Create a deterministic color based on the assignee's name
                  const nameSum = assignee.name
                    .split("")
                    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
                  const colorIndex = nameSum % colors.length;
                  const stableColor = colors[colorIndex];
                  return (
                    <Text
                      key={assignee.name}
                      className={`flex h-1 w-6 items-center gap-1 rounded-full ${stableColor}`}
                    />
                  );
                })}
              </Flex>
            )}
            {/* Task Title */}
            <Heading
              as="h4"
              size="3"
              className={cn(
                "font-medium line-clamp-2 transition-colors leading-tight",
                task.completed && "line-through text-gray-11",
              )}
            >
              {task.name}
            </Heading>

            {/* Task Description */}
            {task.description && (
              <Text className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">
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
                      backgroundColor: label.color + "20",
                      color: label.color,
                    }}
                    className="text-xs border"
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
                    <Text size="1" className="text-gray-11 font-medium">
                      {completedSubTasks}/{totalSubTasks} subtasks
                    </Text>
                  </Flex>
                  <Text size="1" className="text-gray-11 font-medium">
                    {Math.round(progressPercentage)}%
                  </Text>
                </Flex>
                <div className="w-full bg-gray-6 rounded-full h-1.5">
                  <div
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      progressPercentage === 100
                        ? "bg-green-500"
                        : "bg-blue-500",
                    )}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </Box>
            )}

            {/* Footer with meta information */}

            <Flex
              align={"center"}
              justify={"between"}
              className="gap-2 py-1 w-full"
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
                  <Text>5</Text>
                </IconButton>
              </Flex>
              <Flex align={"center"} className="gap-2">
                {task.assignedTo && task.assignedTo.length > 0 && (
                  <Flex align="center" className="-space-x-2">
                    {task.assignedTo.slice(0, 3).map((member, index) => (
                      <div
                        key={member.id}
                        className="h-8 w-8 rounded-full bg-gray-5 flex items-center justify-center border border-gray-7 text-gray-11"
                        style={{ zIndex: 3 - index }}
                        title={member.name}
                      >
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </div>
                    ))}
                    {task.assignedTo.length > 3 && (
                      <div className="h-8 w-8 rounded-full bg-gray-3 flex items-center justify-center border border-gray-7 text-xs font-medium text-gray-11">
                        +{task.assignedTo.length - 3}
                      </div>
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
  );
}
