// components/list/task-card.tsx - Updated styling to match Figma design
import React, { useCallback, useState, memo } from "react"
import {
  CalendarDays,
  Link,
  ExternalLink,
  Figma,
  GripVertical,
  MessageSquare,
  Paperclip,
  ListChecks,
  CheckSquare,
  ClipboardCheck
} from "lucide-react"
import {
  type TaskDataSchema,
} from "@incmix/utils/schema"
import {
  type KanbanTask,
} from "../types"
import { useKanbanDrawer } from "../hooks/use-kanban-drawer"
import { ModalPresets } from "../shared/confirmation-modal"
import { OverlappingAvatarGroup, type AssignedUser } from "../shared/overlapping-avatar-group"
import { cn } from "@utils"
import {
  Box,
  Checkbox,
  Flex,
  Text,
  Badge,
  Avatar,
} from "@incmix/ui"
import { TaskActionsMenu } from "./task-actions-menu"
import { ListColumn } from "../hooks/use-list-view"

// Card style constants based on Figma design for both light and dark themes
const cardStyles = {
  base: "rounded-[20px] transition-all duration-150",
  light: "bg-white border border-gray-6", 
  dark: "dark:bg-gray-1 dark:border dark:border-gray-6",
  hover: "hover:bg-gray-3 dark:hover:bg-gray-2",
  selected: "bg-gray-3 dark:bg-gray-2"
}

// Checkbox style constants for both light and dark themes
const checkboxStyles = {
  base: "rounded-md border-[1px] h-[18px] w-[18px] flex-shrink-0",
  unchecked: "border-gray-8 dark:border-gray-8",
  checked: "bg-blue-9 border-blue-9"
}

// Group hover styles for elements that should only appear on hover
const hoverVisibleClasses = "opacity-0 group-hover:opacity-100 transition-opacity duration-150"

interface ListTaskCardProps {
  card: KanbanTask
  statusId: string
  columns: ListColumn[]
  priorityLabels?: { id: string; name: string; color: string; type: string }[]
  onUpdateTask: (id: string, updates: Partial<TaskDataSchema>) => Promise<void>
  onDeleteTask: (id: string) => Promise<void>
  onTaskSelect?: (id: string, selected: boolean) => void
  isSelected?: boolean
}

export const ListTaskCard = memo(function ListTaskCard({
  card,
  statusId,
  columns,
  priorityLabels,
  onUpdateTask,
  onDeleteTask,
  onTaskSelect,
  isSelected,
}: ListTaskCardProps) {
  const { handleDrawerOpen } = useKanbanDrawer()
  
  // Handle task selection instead of completion toggle
  const handleTaskSelect = useCallback((checked: boolean | string) => {
    // Ensure id exists
    if (!card.id) {
      console.error("Task ID is missing")
      return
    }

    // Call the selection handler from props
    if (onTaskSelect) {
      onTaskSelect(card.id, typeof checked === 'boolean' ? checked : checked === 'indeterminate' ? false : true)
    }
  }, [card.id, onTaskSelect])

  const handleUpdateTask = useCallback(async (id: string, updates: Partial<TaskDataSchema>) => {
    if (!onUpdateTask) return
    
    try {
      await onUpdateTask(id, updates)
    } catch (error) {
      console.error("Failed to update task:", error)
    }
  }, [onUpdateTask])

  // Modal state for task deletion
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  // Opens the delete confirmation modal
  const handleDeleteTask = useCallback(async () => {
    if (!card.id) {
      console.error("Task ID is missing")
      return
    }
    setShowDeleteConfirmation(true)
  }, [card.id])

  // Confirm task deletion handler
  const confirmDeleteTask = useCallback(async () => {
    try {
      // Ensure id exists
      if (!card.id) {
        console.error("Task ID is missing")
        return
      }
      
      await onDeleteTask(card.id)
    } catch (error) {
      console.error("Failed to delete task:", error)
    }
  }, [card.id, onDeleteTask])

  const handleDuplicateTask = useCallback(async () => {
    // Implementation for task duplication could be added here
    console.log("Duplicate task functionality not implemented yet")
  }, [])

  const handleOpenDrawer = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()

    if (!card.id) {
      console.error("Task ID is missing")
      return
    }

    handleDrawerOpen(card.id)
  }, [card.id, handleDrawerOpen])

  const formatDate = useCallback((date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined
    })
  }, [])

  const getDateStatus = useCallback((date: Date) => {
    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return { status: "overdue", className: "text-red-9 bg-red-3" }
    if (diffDays === 0) return { status: "today", className: "text-orange-9 bg-orange-3" }
    if (diffDays <= 3) return { status: "soon", className: "text-yellow-9 bg-yellow-3" }
    return { status: "future", className: "text-blue-9 bg-blue-3" }
  }, [])
  
  // Helper function to get colors for tags by index
  const getColorByIndex = useCallback((index: number) => {
    const colors = ["#FF5757", "#FF8C00", "#60A5FA", "#34D399", "#A78BFA", "#F472B6"]
    return colors[index % colors.length]
  }, [])

  const getPriorityColor = useCallback((priority: string) => {
    switch (priority) {
      case "urgent":
        return "red"
      case "high":
        return "orange"
      case "medium":
        return "blue"
      case "low":
        return "green"
      default:
        return "gray"
    }
  }, [])

  // Don't render if id is missing
  if (!card.id) {
    console.error("Task card missing id:", card)
    return null
  }

  return (
    <>
      {/* Delete Task Confirmation Modal */}
      {ModalPresets.deleteTask({
        isOpen: showDeleteConfirmation,
        onOpenChange: setShowDeleteConfirmation,
        taskName: card.name,
        onConfirm: confirmDeleteTask
      })}

      <Box className="flex flex-shrink-0 flex-col px-2 py-1.5">
        <Box
          className={`group relative px-6 ${cardStyles.base} ${cardStyles.light} ${cardStyles.dark} ${cardStyles.hover} ${isSelected ? cardStyles.selected : ""}`}
          style={{ height: "56px" }}
        >
          {/* All content in a single horizontal row */}
          <Flex justify="between" align="center" className="h-full w-full">
            {/* Left side: Checkbox and title */}
            <Flex align="center" gap="2" className="flex-shrink-0">
              {/* Checkbox - exactly as in Figma */}
              <Checkbox
                className={checkboxStyles.base}
                checked={isSelected}
                onCheckedChange={handleTaskSelect}
                aria-label="Select task"
              />
              
              {/* Task title with truncation */}
              <Text
                as="p"
                className="text-gray-12 dark:text-gray-12 font-medium truncate cursor-pointer"
                onClick={handleOpenDrawer}
                style={{ fontSize: "15px", lineHeight: "20px", letterSpacing: "-0.1px" }}
              >
                {card.name || "Untitled Task"}
              </Text>
            </Flex>

            {/* Center: Metadata indicators (visible on hover) */}
            <Flex 
              align="center" 
              gap="5" 
              className={`mx-auto flex-shrink-0 ${hoverVisibleClasses}`}
            >
              {/* Subtasks counter */}
              {card.subTasks && card.subTasks.length > 0 && (
                <Flex align="center" gap="2">
                  <ListChecks size={16} className="text-gray-11" strokeWidth={3} />
                  <Text className="text-gray-11" style={{ fontSize: "14px", lineHeight: "18px", fontWeight: 500 }}>
                    {card.subTasks.filter(task => task.completed === true).length}/{card.subTasks.length}
                  </Text>
                </Flex>
              )}
              
              {/* Comments counter */}
              {card.comments && card.comments.length > 0 && (
                <Flex align="center" gap="2">
                  <MessageSquare size={16} className="text-gray-11" strokeWidth={3} />
                  <Text className="text-gray-11" style={{ fontSize: "14px", lineHeight: "18px", fontWeight: 500 }}>
                    {card.comments.length}
                  </Text>
                </Flex>
              )}
              
              {/* Attachments counter */}
              {card.attachments && card.attachments.length > 0 && (
                <Flex align="center" gap="2">
                  <Paperclip size={16} className="text-gray-11" strokeWidth={3} />
                  <Text className="text-gray-11" style={{ fontSize: "14px", lineHeight: "18px", fontWeight: 500 }}>
                    {card.attachments.length}
                  </Text>
                </Flex>
              )}
              
              {/* Acceptance criteria counter */}
              {card.acceptanceCriteria && card.acceptanceCriteria.length > 0 && (
                <Flex align="center" gap="2">
                  <ClipboardCheck size={16} className="text-gray-11" strokeWidth={3} />
                  <Text className="text-gray-11" style={{ fontSize: "14px", lineHeight: "18px", fontWeight: 500 }}>
                    {card.acceptanceCriteria.filter(item => item.checked === true).length}/{card.acceptanceCriteria.length}
                  </Text>
                </Flex>
              )}
              
              {/* Checklist counter */}
              {card.checklist && card.checklist.length > 0 && (
                <Flex align="center" gap="2">
                  <CheckSquare size={16} className="text-gray-11" strokeWidth={3} />
                  <Text className="text-gray-11" style={{ fontSize: "14px", lineHeight: "18px", fontWeight: 500 }}>
                    {card.checklist.filter(item => item.checked === true).length}/{card.checklist.length}
                  </Text>
                </Flex>
              )}
            </Flex>

            {/* Right side: Date, dots and avatars */}
            <Flex align="center" gap="3" className="flex-shrink-0">
              {/* Date display with icon - exactly as in Figma */}
              <Flex align="center" gap="2" className="flex-shrink-0">
                <CalendarDays size={14} className="text-gray-11" strokeWidth={1.75} />
                {card.endDate && (
                  <Text className="text-gray-11" style={{ fontSize: "13px", lineHeight: "16px", fontWeight: 500, paddingRight: "4px" }}>
                    {new Date(card.endDate).toLocaleDateString('en-US', { month: 'short' })} {new Date(card.endDate).getDate()}
                  </Text>
                )}
              </Flex>
              
              {/* Assigned users from card data */}
              {card.assignedTo && card.assignedTo.length > 0 && (
                <OverlappingAvatarGroup 
                  users={card.assignedTo as AssignedUser[]} 
                  maxDisplayed={3} 
                  size="md" 
                  className="ml-1" 
                />
              )}
              
              {/* Task Actions Menu (3-dot menu) */}
              <TaskActionsMenu
                task={card}
                columns={columns.map(col => ({
                  id: col.id,
                  name: col.name,
                  projectId: col.projectId || '',
                  statusId: col.id,
                  priorityId: '',
                  taskOrder: 0,
                  completed: false,
                  refUrls: [],
                  labelsTags: [],
                  attachments: [],
                  assignedTo: [],
                  subTasks: [],
                  comments: [],
                  createdAt: Date.now(),
                  updatedAt: Date.now(),
                  createdBy: { id: '', name: '' },
                  updatedBy: { id: '', name: '' }
                })) as TaskDataSchema[]}
                priorityLabels={priorityLabels}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={async () => await handleDeleteTask()}
                onDuplicateTask={async () => Promise.resolve(console.log("Duplicate task functionality not implemented"))}
                mode="existing-task"
                size="1"
                variant="ghost"
              />
            </Flex>
          </Flex>
        </Box>
      </Box>
    </>
  );
});
