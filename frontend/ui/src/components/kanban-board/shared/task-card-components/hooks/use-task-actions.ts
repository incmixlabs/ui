// task-card-components/hooks/use-task-actions.ts
import { useCallback } from "react"
import { TaskDataSchema, KanbanColumn } from "@incmix/store"
import type { Subtask, Tag } from "../utils/types"

interface UseTaskActionsProps {
  currentTask: TaskDataSchema | null;
  currentColumn: KanbanColumn | null | undefined;
  updateTask: (taskId: string, updates: Partial<TaskDataSchema>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  createTask: (columnId: string, taskData: Partial<TaskDataSchema>) => Promise<void>;
  moveTask: (taskId: string, targetColumnId: string, targetIndex?: number) => Promise<void>;
  onTaskModified?: () => void;
  handleDrawerClose: () => void;
  columns: KanbanColumn[];
}

export function useTaskActions({
  currentTask,
  currentColumn,
  updateTask,
  deleteTask,
  createTask,
  moveTask,
  onTaskModified,
  handleDrawerClose,
  columns
}: UseTaskActionsProps) {

  // Generic task update handler
  const handleUpdateTask = useCallback(async (updates: Partial<TaskDataSchema>) => {
    if (!currentTask) return
    try {
      await updateTask(currentTask.taskId, updates)
      if (onTaskModified) onTaskModified()
    } catch (error) {
      console.error("Failed to update task:", error)
    }
  }, [currentTask, updateTask, onTaskModified])

  // Title management
  const handleTitleSave = useCallback(async (editTitle: string) => {
    if (editTitle.trim() && editTitle !== currentTask?.name) {
      await handleUpdateTask({ name: editTitle.trim() })
    }
  }, [currentTask?.name, handleUpdateTask])

  // Description management  
  const handleDescriptionSave = useCallback(async (editDescription: string) => {
    if (editDescription !== currentTask?.description) {
      await handleUpdateTask({ description: editDescription })
    }
  }, [currentTask?.description, handleUpdateTask])

  // Task completion
  const handleCompleteTask = useCallback(async () => {
    if (!currentTask) return
    await handleUpdateTask({ completed: !currentTask.completed })
  }, [currentTask, handleUpdateTask])

  // Priority management
  const handlePriorityChange = useCallback(async (priority: string) => {
    await handleUpdateTask({ priority: priority as any })
  }, [handleUpdateTask])
  
  // Status/column management
  const handleStatusChange = useCallback(async (columnId: string) => {
    if (!currentTask || columnId === currentTask.columnId) return
    await moveTask(currentTask.taskId, columnId)
  }, [currentTask, moveTask])
  
  // Date management
  const handleStartDateChange = useCallback(async (date: Date | null) => {
    if (!currentTask) return
    await handleUpdateTask({ 
      startDate: date ? date.toISOString() : ""
    })
  }, [currentTask, handleUpdateTask])
  
  const handleEndDateChange = useCallback(async (date: Date | null) => {
    if (!currentTask) return
    await handleUpdateTask({ 
      endDate: date ? date.toISOString() : ""
    })
  }, [currentTask, handleUpdateTask])
  
  // Comment management
  const handleAddComment = useCallback(async (newComment: string) => {
    if (!currentTask || !newComment.trim()) return
    
    const currentUser = {
      id: "current-user-id",
      name: "Current User",
      image: "/placeholder-user.svg"
    }
    
    const newCommentObj = {
      id: crypto.randomUUID(),
      content: newComment.trim(),
      createdAt: Date.now(),
      createdBy: currentUser
    }
    
    const updatedComments = [...(currentTask.comments || []), newCommentObj]
    
    await handleUpdateTask({ 
      comments: updatedComments,
      commentsCount: updatedComments.length
    })
  }, [currentTask, handleUpdateTask])
  
  // Tag management
  const handleAddTag = useCallback(async (newTagName: string, newTagColor: string) => {
    if (!currentTask || !newTagName.trim()) return
    
    const newTag = {
      value: newTagName.toLowerCase().replace(/\s+/g, '-'),
      label: newTagName.trim(),
      color: newTagColor
    }
    
    const updatedTags = [...(currentTask.labelsTags || []), newTag]
    await handleUpdateTask({ labelsTags: updatedTags })
  }, [currentTask, handleUpdateTask])
  
  const handleRemoveTag = useCallback(async (tagValue: string) => {
    if (!currentTask?.labelsTags) return
    
    const updatedTags = currentTask.labelsTags.filter(
      (tag: Tag) => tag.value !== tagValue
    )
    
    await handleUpdateTask({ labelsTags: updatedTags })
  }, [currentTask, handleUpdateTask])

  // Subtask management
  const handleAddSubtask = useCallback(async (newSubtaskName: string) => {
    if (!newSubtaskName.trim() || !currentTask) return
    
    const newSubtask = {
      id: crypto.randomUUID(),
      name: newSubtaskName.trim(),
      completed: false,
    }
    
    const updatedSubTasks = [...(currentTask.subTasks || []), newSubtask]
    await handleUpdateTask({ subTasks: updatedSubTasks })
  }, [currentTask, handleUpdateTask])

  const handleUpdateSubtask = useCallback(async (subtaskId: string, completed: boolean) => {
    if (!currentTask?.subTasks) return
    
    const updatedSubTasks = currentTask.subTasks.map((st: Subtask) => 
      st.id === subtaskId ? { ...st, completed } : st
    )
    await handleUpdateTask({ subTasks: updatedSubTasks })
  }, [currentTask?.subTasks, handleUpdateTask])

  const handleDeleteSubtask = useCallback(async (subtaskId: string) => {
    if (!currentTask?.subTasks) return
    
    const updatedSubTasks = currentTask.subTasks.filter((st: Subtask) => st.id !== subtaskId)
    await handleUpdateTask({ subTasks: updatedSubTasks })
  }, [currentTask?.subTasks, handleUpdateTask])

  const handleReorderSubtasks = useCallback(async (newOrder: Subtask[]) => {
    if (!currentTask) return
    await handleUpdateTask({ subTasks: newOrder })
  }, [currentTask, handleUpdateTask])

  // Task actions (delete, duplicate)
  const handleDeleteTask = useCallback(async () => {
    // This will be handled by the calling component through the drawer state
    return true
  }, [])
  
  const confirmDeleteTask = useCallback(async () => {
    if (!currentTask) return
    
    try {
      await deleteTask(currentTask.taskId)
      handleDrawerClose()
      if (onTaskModified) onTaskModified()
    } catch (error) {
      console.error("Failed to delete task:", error)
    }
  }, [currentTask, deleteTask, handleDrawerClose, onTaskModified])

  const handleDuplicateTask = useCallback(async () => {
    if (!currentTask || !currentColumn) return
    
    try {
      await createTask(currentColumn.id, {
        name: `${currentTask.name} (Copy)`,
        description: currentTask.description,
        priority: currentTask.priority,
        labelsTags: currentTask.labelsTags,
        assignedTo: currentTask.assignedTo,
        subTasks: currentTask.subTasks?.map((st: Subtask) => ({ 
          ...st, 
          id: crypto.randomUUID(), 
          completed: false 
        })),
        completed: false,
        comments: [],
        commentsCount: 0,
      })
      if (onTaskModified) onTaskModified()
    } catch (error) {
      console.error("Failed to duplicate task:", error)
    }
  }, [currentTask, currentColumn, createTask, onTaskModified])

  return {
    handleUpdateTask,
    handleTitleSave,
    handleDescriptionSave,
    handleCompleteTask,
    handlePriorityChange,
    handleStatusChange,
    handleStartDateChange,
    handleEndDateChange,
    handleAddComment,
    handleAddTag,
    handleRemoveTag,
    handleAddSubtask,
    handleUpdateSubtask,
    handleDeleteSubtask,
    handleReorderSubtasks,
    handleDeleteTask,
    confirmDeleteTask,
    handleDuplicateTask,
  }
}