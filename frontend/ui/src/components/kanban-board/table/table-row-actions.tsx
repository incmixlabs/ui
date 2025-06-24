// components/table/table-row-actions.tsx
import React, { useState, useCallback } from "react"
import {
  DropdownMenu,
  IconButton,
  Flex,
  Text,
} from "@incmix/ui"
import {
  MoreVertical,
  Edit3,
  Trash2,
  Copy,
  Eye,
  ArrowRight,
  CheckCircle,
  Circle,
  Calendar,
  User,
  Flag,
} from "lucide-react"

import { ModalPresets } from "../shared/confirmation-modal"
import { useKanbanDrawer } from "../hooks/use-kanban-drawer"
import { TableTask } from "@incmix/store"

interface TableRowActionsProps {
  task: TableTask
  taskStatuses: Array<{
    id: string
    name: string
    color: string
  }>
  onUpdateTask: (taskId: string, updates: any) => Promise<void>
  onDeleteTask: (taskId: string) => Promise<void>
  onMoveTaskToStatus: (taskId: string, statusId: string) => Promise<void>
  disabled?: boolean
}

export function TableRowActions({
  task,
  taskStatuses,
  onUpdateTask,
  onDeleteTask,
  onMoveTaskToStatus,
  disabled = false
}: TableRowActionsProps) {
  const { handleDrawerOpen } = useKanbanDrawer()

  // Modal states
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Handle task completion toggle
  const handleToggleComplete = useCallback(async () => {
    if (!task.taskId || isLoading) return

    setIsLoading(true)
    try {
      await onUpdateTask(task.taskId, { completed: !task.completed })
    } catch (error) {
      console.error("Failed to toggle task completion:", error)
    } finally {
      setIsLoading(false)
    }
  }, [task.taskId, task.completed, onUpdateTask, isLoading])

  // Handle task view in drawer
  const handleViewTask = useCallback(() => {
    if (!task.taskId) return
    handleDrawerOpen(task.taskId)
  }, [task.taskId, handleDrawerOpen])

  // Handle task deletion
  const handleDeleteTask = useCallback(() => {
    setShowDeleteConfirmation(true)
  }, [])

  // Confirm task deletion
  const confirmDeleteTask = useCallback(async () => {
    if (!task.taskId) return

    setIsLoading(true)
    try {
      await onDeleteTask(task.taskId)
      setShowDeleteConfirmation(false)
    } catch (error) {
      console.error("Failed to delete task:", error)
    } finally {
      setIsLoading(false)
    }
  }, [task.taskId, onDeleteTask])

  // Handle task duplication
  const handleDuplicateTask = useCallback(async () => {
    // This would create a copy of the task
    console.log("Duplicate task:", task.name)
    // Implementation would depend on your create task logic
  }, [task])

  // Handle moving task to different status
  const handleMoveToStatus = useCallback(async (statusId: string) => {
    if (!task.taskId || isLoading) return

    setIsLoading(true)
    try {
      await onMoveTaskToStatus(task.taskId, statusId)
    } catch (error) {
      console.error("Failed to move task:", error)
    } finally {
      setIsLoading(false)
    }
  }, [task.taskId, onMoveTaskToStatus, isLoading])

  // Handle quick priority change
  const handleSetPriority = useCallback(async (priority: string) => {
    if (!task.taskId || isLoading) return

    setIsLoading(true)
    try {
      await onUpdateTask(task.taskId, { priority })
    } catch (error) {
      console.error("Failed to update priority:", error)
    } finally {
      setIsLoading(false)
    }
  }, [task.taskId, onUpdateTask, isLoading])

  return (
    <>
      {/* Delete Confirmation Modal */}
      {ModalPresets.deleteTask({
        isOpen: showDeleteConfirmation,
        onOpenChange: setShowDeleteConfirmation,
        taskName: task.name,
        onConfirm: confirmDeleteTask,
        isLoading: isLoading
      })}

      <DropdownMenu.Root>
        <DropdownMenu.Trigger >
          <IconButton
            variant="ghost"
            size="1"
            disabled={disabled || isLoading}
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical size={16} />
          </IconButton>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content align="end" className="w-56">
          {/* View Task */}
          <DropdownMenu.Item onClick={handleViewTask}>
            <Eye size={14} />
            <Text>View Details</Text>
          </DropdownMenu.Item>

          {/* Edit Task */}
          <DropdownMenu.Item onClick={handleViewTask}>
            <Edit3 size={14} />
            <Text>Edit Task</Text>
          </DropdownMenu.Item>

          <DropdownMenu.Separator />

          {/* Toggle Completion */}
          <DropdownMenu.Item onClick={handleToggleComplete}>
            {task.completed ? <Circle size={14} /> : <CheckCircle size={14} />}
            <Text>{task.completed ? "Mark Incomplete" : "Mark Complete"}</Text>
          </DropdownMenu.Item>

          {/* Move To Status */}
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>
              <Flex align="center" gap="2">
                <ArrowRight size={14} />
                <Text>Move To</Text>
              </Flex>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              {taskStatuses.map((status) => {
                const isCurrentStatus = task.columnId === status.id
                return (
                  <DropdownMenu.Item
                    key={status.id}
                    onClick={() => handleMoveToStatus(status.id)}
                    className={isCurrentStatus ? "bg-accent" : ""}
                  >
                    <Flex align="center" gap="2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: status.color }}
                      />
                      <Text>{status.name}</Text>
                    </Flex>
                  </DropdownMenu.Item>
                )
              })}
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>

          {/* Set Priority */}
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>
              <Flex align="center" gap="2">
                <Flag size={14} />
                <Text>Set Priority</Text>
              </Flex>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              {["low", "medium", "high", "urgent"].map((priority) => {
                const isCurrentPriority = task.priority === priority
                return (
                  <DropdownMenu.Item
                    key={priority}
                    onClick={() => handleSetPriority(priority)}
                    className={isCurrentPriority ? "bg-accent" : ""}
                  >
                    <Text className="capitalize">{priority}</Text>
                  </DropdownMenu.Item>
                )
              })}
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator />

          {/* Duplicate Task */}
          <DropdownMenu.Item onClick={handleDuplicateTask}>
            <Copy size={14} />
            <Text>Duplicate</Text>
          </DropdownMenu.Item>

          <DropdownMenu.Separator />

          {/* Delete Task */}
          <DropdownMenu.Item
            onClick={handleDeleteTask}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 size={14} />
            <Text>Delete Task</Text>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  )
}
