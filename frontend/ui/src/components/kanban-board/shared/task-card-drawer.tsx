// components/shared/task-card-drawer.tsx - Improved styling version

import { useParams } from "next/navigation"
import { ReactNode, useCallback, useEffect, useRef, useState, memo } from "react"
import {
  type DragControls,
  Reorder,
  motion,
  useDragControls,
  useMotionValue,
} from "framer-motion"
import {
  Box,
  Button,
  Dialog,
  Flex,
  IconButton,
  Sheet,
  Text,
  TextField,
  TextArea,
  DropdownMenu,
  Select,
  Checkbox,
  Badge,
  Heading,
  Progress,
  ScrollArea,
  Separator,
  Tooltip,
} from "@incmix/ui"
import {
  AlertCircle,
  Archive,
  Calendar,
  CalendarDays,
  Check,
  CheckSquare,
  Clock,
  Copy,
  Edit3,
  Ellipsis,
  Flag,
  GripVertical,
  MessageSquareText,
  MoreVertical,
  Plus,
  RefreshCcw,
  Save,
  Send,
  Tag,
  Trash2,
  User,
  Users,
  X,
  Star,
} from "lucide-react"
import { cn } from "@utils"
import { TaskDataSchema, useKanban, useListView } from "@incmix/store"
import { SmartDatetimeInput } from "@components/datetime-picker"
import { useKanbanDrawer } from "@hooks/use-kanban-drawer"
import { ModalPresets } from "./confirmation-modal"

// Improved TaskDrawerSheet component with better animations
function TaskDrawerSheet({ 
  open, 
  onOpenChange, 
  children 
}: { 
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode 
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Improved backdrop with blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Improved sheet with slide animation */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="ml-auto w-full max-w-2xl bg-white dark:bg-gray-950 shadow-2xl border-l border-gray-200 dark:border-gray-800"
      >
        {children}
      </motion.div>
    </div>
  )
}

// Types for the shared TaskCardDrawer component
type ViewType = 'board' | 'list';

interface TaskCardDrawerProps {
  viewType?: ViewType;
  projectId?: string;
  onTaskModified?: () => void;
}

// Main improved TaskCardDrawer component
export function TaskCardDrawer({
  viewType = 'board',
  projectId = "default-project",
  onTaskModified,
}: TaskCardDrawerProps) {
  // Get drawer state from the shared context
  const { taskId, isOpen, handleDrawerClose } = useKanbanDrawer()
  
  // Use the appropriate hook based on the view type
  const {
    columns,
    updateTask,
    deleteTask,
    createTask,
    moveTask,
  } = viewType === 'board' ? useKanban(projectId) : useListView(projectId);
  
  // Define proper types
  type Column = { id: string; name: string; color: string; description?: string; tasks: TaskDataSchema[] }
  type Comment = { id: string; content: string; createdAt: number; createdBy: { id: string; name: string; image?: string } }
  type User = { id: string; name: string; image?: string }
  type Tag = { value: string; label: string; color: string }

  // Find the current task and its column
  const currentTask = taskId 
    ? columns.flatMap((col: Column) => col.tasks).find((task: TaskDataSchema) => task.taskId === taskId)
    : null

  const currentColumn = currentTask 
    ? columns.find((col: Column) => col.tasks.some((task: TaskDataSchema) => task.taskId === currentTask.taskId))
    : null
    
  // Local state for editing task properties
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [isAddingSubtask, setIsAddingSubtask] = useState(false)
  const [newSubtaskName, setNewSubtaskName] = useState("")
  const [newComment, setNewComment] = useState("")
  const [isAddingTag, setIsAddingTag] = useState(false)
  const [newTagName, setNewTagName] = useState("")
  const [newTagColor, setNewTagColor] = useState("#3b82f6")
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  // Update local state when task changes
  useEffect(() => {
    if (currentTask) {
      setEditTitle(currentTask.name)
      setEditDescription(currentTask.description || "")
      setStartDate(currentTask.startDate ? new Date(currentTask.startDate) : null)
      setEndDate(currentTask.endDate ? new Date(currentTask.endDate) : null)
    }
  }, [currentTask])

  // Task update handlers
  const handleUpdateTask = useCallback(async (updates: Partial<TaskDataSchema>) => {
    if (!currentTask) return
    try {
      await updateTask(currentTask.taskId, updates)
      if (onTaskModified) onTaskModified()
    } catch (error) {
      console.error("Failed to update task:", error)
    }
  }, [currentTask, updateTask, onTaskModified])

  const handleTitleSave = useCallback(async () => {
    if (editTitle.trim() && editTitle !== currentTask?.name) {
      await handleUpdateTask({ name: editTitle.trim() })
    }
    setIsEditingTitle(false)
  }, [editTitle, currentTask?.name, handleUpdateTask])

  const handleDescriptionSave = useCallback(async () => {
    if (editDescription !== currentTask?.description) {
      await handleUpdateTask({ description: editDescription })
    }
    setIsEditingDescription(false)
  }, [editDescription, currentTask?.description, handleUpdateTask])

  const handleCompleteTask = useCallback(async () => {
    if (!currentTask) return
    await handleUpdateTask({ completed: !currentTask.completed })
  }, [currentTask, handleUpdateTask])

  const handlePriorityChange = useCallback(async (priority: string) => {
    await handleUpdateTask({ priority: priority as any })
  }, [handleUpdateTask])
  
  // Status change handler
  const handleStatusChange = useCallback(async (columnId: string) => {
    if (!currentTask || columnId === currentTask.columnId) return
    await moveTask(currentTask.taskId, columnId)
  }, [currentTask, moveTask])
  
  // Date handlers
  const handleStartDateChange = useCallback(async (date: Date | null) => {
    if (!currentTask) return
    setStartDate(date)
    await handleUpdateTask({ 
      startDate: date ? date.toISOString() : ""
    })
  }, [currentTask, handleUpdateTask])
  
  const handleEndDateChange = useCallback(async (date: Date | null) => {
    if (!currentTask) return
    setEndDate(date)
    await handleUpdateTask({ 
      endDate: date ? date.toISOString() : ""
    })
  }, [currentTask, handleUpdateTask])
  
  // Comment handlers
  const handleAddComment = useCallback(async () => {
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
    
    setNewComment("")
  }, [currentTask, newComment, handleUpdateTask])
  
  // Tag handlers
  const handleAddTag = useCallback(async () => {
    if (!currentTask || !newTagName.trim()) return
    
    const newTag = {
      value: newTagName.toLowerCase().replace(/\s+/g, '-'),
      label: newTagName.trim(),
      color: newTagColor
    }
    
    const updatedTags = [...(currentTask.labelsTags || []), newTag]
    await handleUpdateTask({ labelsTags: updatedTags })
    
    setNewTagName("")
    setIsAddingTag(false)
  }, [currentTask, newTagName, newTagColor, handleUpdateTask])
  
  const handleRemoveTag = useCallback(async (tagValue: string) => {
    if (!currentTask?.labelsTags) return
    
    const updatedTags = currentTask.labelsTags.filter(
      (tag: Tag) => tag.value !== tagValue
    )
    
    await handleUpdateTask({ labelsTags: updatedTags })
  }, [currentTask, handleUpdateTask])

  // Subtask management
  const handleAddSubtask = useCallback(async () => {
    if (!newSubtaskName.trim() || !currentTask) return
    
    const newSubtask = {
      id: crypto.randomUUID(),
      name: newSubtaskName.trim(),
      completed: false,
    }
    
    const updatedSubTasks = [...(currentTask.subTasks || []), newSubtask]
    await handleUpdateTask({ subTasks: updatedSubTasks })
    setNewSubtaskName("")
    setIsAddingSubtask(false)
  }, [newSubtaskName, currentTask, handleUpdateTask])

  type Subtask = { id: string; name: string; completed: boolean };

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

  const handleReorderSubtasks = useCallback(async (newOrder: { id: string; name: string; completed: boolean; }[]) => {
    if (!currentTask) return
    await handleUpdateTask({ subTasks: newOrder })
  }, [currentTask, handleUpdateTask])

  // Task actions
  const handleDeleteTask = useCallback(async () => {
    if (!currentTask) return
    setShowDeleteConfirmation(true)
  }, [currentTask])
  
  const confirmDeleteTask = useCallback(async () => {
    if (!currentTask) return
    setIsLoading(true)
    
    try {
      await deleteTask(currentTask.taskId)
      handleDrawerClose()
      if (onTaskModified) onTaskModified()
    } catch (error) {
      console.error("Failed to delete task:", error)
    } finally {
      setIsLoading(false)
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
        subTasks: currentTask.subTasks?.map((st: Subtask) => ({ ...st, id: crypto.randomUUID(), completed: false })),
        completed: false,
        comments: [],
        commentsCount: 0,
      })
      if (onTaskModified) onTaskModified()
    } catch (error) {
      console.error("Failed to duplicate task:", error)
    }
  }, [currentTask, currentColumn, createTask, onTaskModified])

  if (!currentTask || !currentColumn) {
    return null
  }

  // Calculate subtask progress
  const completedSubTasks = currentTask.subTasks?.filter((st: Subtask) => st.completed).length || 0
  const totalSubTasks = currentTask.subTasks?.length || 0
  const progressPercentage = totalSubTasks > 0 ? (completedSubTasks / totalSubTasks) * 100 : 0

  // Improved priority configuration
  const getPriorityConfig = (priority?: string) => {
    switch (priority) {
      case "urgent":
        return {
          color: "red" as const,
          icon: AlertCircle,
          label: "Urgent",
          bgColor: "bg-red-50 dark:bg-red-950/20",
          textColor: "text-red-700 dark:text-red-400",
        }
      case "high":
        return {
          color: "orange" as const,
          icon: Flag,
          label: "High",
          bgColor: "bg-orange-50 dark:bg-orange-950/20",
          textColor: "text-orange-700 dark:text-orange-400",
        }
      case "medium":
        return {
          color: "blue" as const,
          icon: Clock,
          label: "Medium",
          bgColor: "bg-blue-50 dark:bg-blue-950/20",
          textColor: "text-blue-700 dark:text-blue-400",
        }
      case "low":
        return {
          color: "gray" as const,
          icon: Clock,
          label: "Low",
          bgColor: "bg-gray-50 dark:bg-gray-950/20",
          textColor: "text-gray-700 dark:text-gray-400",
        }
      default:
        return {
          color: "blue" as const,
          icon: Clock,
          label: "Medium",
          bgColor: "bg-blue-50 dark:bg-blue-950/20",
          textColor: "text-blue-700 dark:text-blue-400",
        }
    }
  }

  const priorityConfig = getPriorityConfig(currentTask.priority)
  const PriorityIcon = priorityConfig.icon
  
  // Format dates for display
  const formatDate = (date: string | null | undefined) => {
    if (!date) return "Not set"
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    })
  }

  // Check if task is overdue
  const isOverdue = currentTask.endDate && new Date(currentTask.endDate) < new Date() && !currentTask.completed

  return (
    <TaskDrawerSheet
      open={isOpen}
      onOpenChange={(open) => !open && handleDrawerClose()}
    >
      <div className="h-full flex flex-col bg-white dark:bg-gray-950">
        {/* Delete Task Confirmation Modal */}
        {ModalPresets.deleteTask({
          isOpen: showDeleteConfirmation,
          onOpenChange: setShowDeleteConfirmation,
          taskName: currentTask?.name,
          onConfirm: confirmDeleteTask,
          isLoading: isLoading
        })}

        {/* Improved Header */}
        <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentColumn.color }} />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{currentColumn.name}</span>
            </div>

            <button
              onClick={() => handleDrawerClose()}
              className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      
        {/* Content */}
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-8">
            {/* Improved Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleCompleteTask}
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

              {/* Improved Status/Column Dropdown */}
              <Select.Root
                value={currentTask.columnId}
                onValueChange={handleStatusChange}
              >
                <Select.Trigger className="flex h-9 px-4 py-2 w-40 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: currentColumn?.color }} />
                    <span className="text-sm font-medium">{currentColumn?.name}</span>
                  </div>
                </Select.Trigger>
                <Select.Content>
                  {columns.map((col: Column) => (
                    <Select.Item key={col.id} value={col.id}>
                      <div className="flex items-center gap-2 ">
                        <div className="w-2 h-3 rounded-full" style={{ backgroundColor: col.color }} />
                        <span>{col.name}</span>
                      </div>
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>

              {/* Improved Priority Dropdown */}
              <Select.Root
                value={currentTask.priority || "medium"}
                onValueChange={handlePriorityChange}
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
                    <DropdownMenu.Item onClick={handleDuplicateTask}>
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
                      onClick={handleDeleteTask} 
                      className="text-red-600 focus:text-red-600 dark:text-red-400"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Task
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </div>
            </div>

            {/* Improved Task Title */}
            <div className="space-y-2">
              {isEditingTitle ? (
                <div className="flex items-center gap-2">
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="text-2xl font-bold border-0 px-0 bg-transparent focus:outline-none focus:ring-0 flex-1 text-gray-900 dark:text-white"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleTitleSave()
                      if (e.key === "Escape") setIsEditingTitle(false)
                    }}
                  />
                  <button 
                    onClick={handleTitleSave} 
                    className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
                  >
                    <Save className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => setIsEditingTitle(false)} 
                    className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="group flex items-start gap-2">
                  <h1
                    className="text-2xl font-bold cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 p-2 rounded-md -m-2 flex-1 transition-colors"
                    onClick={() => setIsEditingTitle(true)}
                  >
                    {currentTask.name}
                  </h1>
                  <button
                    onClick={() => setIsEditingTitle(true)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Improved Task Description */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                Description
              </h3>

              {isEditingDescription ? (
                <div className="space-y-3">
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Add a description..."
                    rows={4}
                    autoFocus
                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="flex gap-2">
                    <button 
                      onClick={handleDescriptionSave}
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      Save
                    </button>
                    <button 
                      onClick={() => setIsEditingDescription(false)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 p-4 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 min-h-[100px] relative transition-colors"
                  onClick={() => setIsEditingDescription(true)}
                >
                  {currentTask.description ? (
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {currentTask.description}
                    </p>
                  ) : (
                    <p className="text-gray-500 italic">Click to add a description...</p>
                  )}
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 h-8 w-8 p-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center">
                    <Edit3 className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Improved Dates Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide">Dates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
                  <div className="relative">
                    <SmartDatetimeInput
                      value={startDate || undefined}
                      onValueChange={handleStartDateChange}
                      showCalendar={true}
                      showTimePicker={false}
                      placeholder="Set start date"
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Due Date</label>
                  <div className="relative">
                    <SmartDatetimeInput
                      value={endDate || undefined}
                      onValueChange={handleEndDateChange}
                      showCalendar={true}
                      showTimePicker={false}
                      placeholder="Set due date"
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Improved Tags Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide">Tags</h3>
                <button 
                  onClick={() => setIsAddingTag(true)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Tag className="h-4 w-4" />
                  Add Tag
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {currentTask.labelsTags && currentTask.labelsTags.length > 0 ? (
                  currentTask.labelsTags.map((tag: Tag) => (
                    <span
                      key={tag.value}
                      className="group inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                      style={{
                        backgroundColor: tag.color + "20",
                        color: tag.color,
                        borderColor: tag.color + "40",
                        border: "1px solid"
                      }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tag.color }} />
                      {tag.label}
                      <X
                        className="h-3 w-3 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemoveTag(tag.value)
                        }}
                      />
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 italic text-sm">No tags added yet</p>
                )}
              </div>

              {isAddingTag && (
                <div className="space-y-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
                  <input
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    placeholder="Tag name"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddTag()
                      if (e.key === "Escape") setIsAddingTag(false)
                    }}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="flex items-center gap-3">
                    <label className="text-sm font-medium">Color:</label>
                    <input
                      type="color"
                      value={newTagColor}
                      onChange={(e) => setNewTagColor(e.target.value)}
                      className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                    />
                    <div className="flex-1" />
                    <button 
                      onClick={handleAddTag} 
                      disabled={!newTagName.trim()}
                      className="px-3 py-1.5 text-sm font-medium rounded-md bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-colors"
                    >
                      Add Tag
                    </button>
                    <button 
                      onClick={() => setIsAddingTag(false)}
                      className="px-3 py-1.5 text-sm font-medium rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Improved Assigned Users Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                Assigned To
              </h3>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
                {currentTask.assignedTo && currentTask.assignedTo.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {currentTask.assignedTo.map((user: User) => (
                      <div
                        key={user.id}
                        className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-full border border-gray-200 dark:border-gray-700"
                      >
                        <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs overflow-hidden">
                          {user.image ? (
                            <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                          ) : (
                            user.name.substring(0, 2).toUpperCase()
                          )}
                        </div>
                        <span className="text-sm font-medium">{user.name}</span>
                        <X
                          className="h-4 w-4 cursor-pointer hover:text-red-500 transition-colors"
                          onClick={() => {
                            const updatedUsers = currentTask.assignedTo.filter(u => u.id !== user.id)
                            handleUpdateTask({ assignedTo: updatedUsers })
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-gray-500 mb-3">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">No users assigned</span>
                  </div>
                )}

                <button
                  onClick={() => {
                    const mockUser = {
                      id: crypto.randomUUID(),
                      name: "Demo User",
                      image: "/placeholder-user.svg"
                    }
                    const updatedUsers = [...(currentTask.assignedTo || []), mockUser]
                    handleUpdateTask({ assignedTo: updatedUsers })
                  }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <User className="h-4 w-4" />
                  Assign User
                </button>
              </div>
            </div>

            {/* Improved Subtasks Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                  Subtasks ({completedSubTasks}/{totalSubTasks})
                </h3>
                <button 
                  onClick={() => setIsAddingSubtask(true)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add Subtask
                </button>
              </div>

              {totalSubTasks > 0 && (
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    {completedSubTasks} of {totalSubTasks} subtasks complete
                  </p>
                </div>
              )}

              {isAddingSubtask && (
                <div className="flex gap-2">
                  <input
                    value={newSubtaskName}
                    onChange={(e) => setNewSubtaskName(e.target.value)}
                    placeholder="New subtask"
                    className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddSubtask()
                      if (e.key === "Escape") setIsAddingSubtask(false)
                    }}
                  />
                  <button 
                    onClick={handleAddSubtask} 
                    disabled={!newSubtaskName.trim()}
                    className="px-3 py-2 text-sm font-medium rounded-md bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-colors"
                  >
                    Add
                  </button>
                  <button 
                    onClick={() => setIsAddingSubtask(false)}
                    className="p-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              <div className="space-y-2">
                {currentTask.subTasks && currentTask.subTasks.length > 0 ? (
                  <Reorder.Group 
                    as="div" 
                    className="space-y-2" 
                    values={currentTask.subTasks} 
                    onReorder={handleReorderSubtasks}
                  >
                    {currentTask.subTasks.map((subtask: Subtask) => (
                      <ImprovedSubtaskItem 
                        key={subtask.id}
                        subtask={subtask}
                        onUpdate={handleUpdateSubtask}
                        onDelete={handleDeleteSubtask}
                      />
                    ))}
                  </Reorder.Group>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <CheckSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No subtasks yet. Add one to track progress.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Improved Comments Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                Comments ({currentTask.commentsCount || 0})
              </h3>

              <div className="space-y-4 max-h-80 overflow-y-auto">
                {currentTask.comments && currentTask.comments.length > 0 ? (
                  currentTask.comments.map((comment: Comment) => (
                    <div
                      key={comment.id}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs overflow-hidden">
                          {comment.createdBy.image ? (
                            <img
                              src={comment.createdBy.image}
                              alt={comment.createdBy.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            comment.createdBy.name.substring(0, 2).toUpperCase()
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{comment.createdBy.name}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString()} at{" "}
                            {new Date(comment.createdAt).toLocaleTimeString(undefined, {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{comment.content}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <MessageSquareText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No comments yet</p>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                <input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.ctrlKey) handleAddComment()
                  }}
                />
                <button 
                  onClick={handleAddComment} 
                  disabled={!newComment.trim()}
                  className="p-2 rounded-md bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </TaskDrawerSheet>
  );
}

// Improved Subtask Item component
interface SubtaskItemProps {
  subtask: { id: string; name: string; completed: boolean };
  onUpdate: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

const ImprovedSubtaskItem = ({ subtask, onUpdate, onDelete }: SubtaskItemProps) => {
  const controls = useDragControls();
  
  return (
    <Reorder.Item
      value={subtask}
      dragControls={controls}
      dragListener={false}
      className="list-none"
    >
      <div className={cn(
        "group flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 transition-all hover:shadow-sm",
        subtask.completed && "opacity-70"
      )}>
        <div 
          className="cursor-grab touch-none" 
          onPointerDown={(e) => controls.start(e)}
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
    </Reorder.Item>
  );
};