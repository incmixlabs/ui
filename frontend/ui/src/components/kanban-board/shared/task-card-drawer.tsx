// components/shared/task-card-drawer.tsx - Shared between board and list views

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
} from "lucide-react"
import { cn } from "@utils"
import { TaskDataSchema, useKanban, useListView } from "@incmix/store"
import { SmartDatetimeInput } from "@components/datetime-picker"
import { useKanbanDrawer } from "@hooks/use-kanban-drawer"
import { ModalPresets } from "./confirmation-modal"

// TaskDrawerSheet component - Displays the slide-out drawer UI
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
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Sheet */}
      <div className="ml-auto w-[1000px] bg-white dark:bg-gray-900 shadow-xl">
        {children}
      </div>
    </div>
  )
}

// Types for the shared TaskCardDrawer component
type ViewType = 'board' | 'list';

interface TaskCardDrawerProps {
  // Optional view type to handle any view-specific behavior
  viewType?: ViewType;
  // Optional project ID if not using the default from the drawer context
  projectId?: string;
  // Optional callback when a task is modified
  onTaskModified?: () => void;
}

// Main shared TaskCardDrawer component
export function TaskCardDrawer({
  viewType = 'board',
  projectId = "default-project",
  onTaskModified,
}: TaskCardDrawerProps) {
  // Get drawer state from the shared context
  const { taskId, isOpen, handleDrawerClose } = useKanbanDrawer()
  
  // Use the appropriate hook based on the view type
  // This allows the component to work with both board and list views
  const {
    columns,
    updateTask,
    deleteTask,
    createTask,
    moveTask,
  } = viewType === 'board' ? useKanban(projectId) : useListView(projectId);
  
  // Define proper types for columns and tasks
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
  const [newTagColor, setNewTagColor] = useState("#6366f1")
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
    
    // Mock user data - in real app, get from auth context
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

  // Define subtask type
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
        comments: [], // New schema: empty array
        commentsCount: 0, // New schema: separate count
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

  // Helper function for priority display
  const getPriorityInfo = (priority?: string) => {
    switch (priority) {
      case "urgent": return { color: "red" as const, icon: AlertCircle, label: "Urgent" }
      case "high": return { color: "orange" as const, icon: Flag, label: "High" }
      case "medium": return { color: "blue" as const, icon: Clock, label: "Medium" }
      case "low": return { color: "gray" as const, icon: Clock, label: "Low" }
      default: return { color: "blue" as const, icon: Clock, label: "Medium" }
    }
  }

  const priorityInfo = getPriorityInfo(currentTask.priority)
  const PriorityIcon = priorityInfo.icon
  
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
      <div className="cursor-default bg-white dark:bg-gray-900 h-screen">
        {/* Delete Task Confirmation Modal */}
        {ModalPresets.deleteTask({
          isOpen: showDeleteConfirmation,
          onOpenChange: setShowDeleteConfirmation,
          taskName: currentTask?.name,
          onConfirm: confirmDeleteTask,
          isLoading: isLoading
        })}
      
        <ScrollArea className="h-full">
          <Flex className="h-full">
            {/* Main Content */}
            <Box className="flex-1 p-6 space-y-6">
              {/* Header Actions */}
              <Flex align="center" justify="between" className="flex-wrap gap-2 mb-2">
                <Flex gap="2" className="flex-wrap">
                  <Button 
                    onClick={handleCompleteTask}
                    variant={currentTask.completed ? "soft" : "solid"}
                    color={currentTask.completed ? "gray" : "green"}
                    size="1"
                  >
                    <Check size={16} />
                    {currentTask.completed ? "Mark Incomplete" : "Mark Complete"}
                  </Button>
                  
                  {/* Status Change Dropdown */}
                  <Select.Root
                    value={currentTask.columnId}
                    onValueChange={handleStatusChange}
                  >
                    <Select.Trigger className="w-auto min-w-[140px]">
                      <Flex align="center" gap="1">
                        <div 
                          className="w-2 h-2 rounded-full" 
                          style={{ backgroundColor: currentColumn.color }}
                        />
                        <Text>{currentColumn.name}</Text>
                      </Flex>
                    </Select.Trigger>
                    <Select.Content>
                      {columns.map((col: Column) => (
                        <Select.Item key={col.id} value={col.id}>
                          <Flex align="center" gap="2">
                            <div 
                              className="w-2 h-2 rounded-full" 
                              style={{ backgroundColor: col.color }}
                            />
                            <Text>{col.name}</Text>
                          </Flex>
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                  
                  {/* Priority Dropdown */}
                  <Select.Root
                    value={currentTask.priority || "medium"}
                    onValueChange={handlePriorityChange}
                  >
                    <Select.Trigger className="w-auto min-w-[120px]">
                      <Flex align="center" gap="1">
                        <PriorityIcon size={14} />
                        <Text>{priorityInfo.label}</Text>
                      </Flex>
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="low">
                        <Flex align="center" gap="2">
                          <Clock size={14} className="text-gray-500" />
                          <Text>Low Priority</Text>
                        </Flex>
                      </Select.Item>
                      <Select.Item value="medium">
                        <Flex align="center" gap="2">
                          <Clock size={14} className="text-blue-500" />
                          <Text>Medium Priority</Text>
                        </Flex>
                      </Select.Item>
                      <Select.Item value="high">
                        <Flex align="center" gap="2">
                          <Flag size={14} className="text-orange-500" />
                          <Text>High Priority</Text>
                        </Flex>
                      </Select.Item>
                      <Select.Item value="urgent">
                        <Flex align="center" gap="2">
                          <AlertCircle size={14} className="text-red-500" />
                          <Text>Urgent</Text>
                        </Flex>
                      </Select.Item>
                    </Select.Content>
                  </Select.Root>
                  
                  {/* Due Date Badge */}
                  {isOverdue && (
                    <Badge color="red" className="flex items-center gap-1">
                      <Clock size={12} />
                      Overdue
                    </Badge>
                  )}                  
                </Flex>

                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <IconButton variant="ghost">
                      <Ellipsis size={20} />
                    </IconButton>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Item onClick={handleDuplicateTask}>
                      <Copy size={14} />
                      Duplicate Task
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item>
                      <Archive size={14} />
                      Archive Task
                    </DropdownMenu.Item>
                    <DropdownMenu.Item onClick={handleDeleteTask} className="text-red-600">
                      <Trash2 size={14} />
                      Delete Task
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Flex>

              {/* Task Title */}
              <Box>
                {isEditingTitle ? (
                  <Flex gap="2" align="center">
                    <TextField.Root
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="flex-1 text-lg font-semibold"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleTitleSave()
                        if (e.key === "Escape") setIsEditingTitle(false)
                      }}
                    />
                    <IconButton onClick={handleTitleSave} size="1">
                      <Save size={14} />
                    </IconButton>
                    <IconButton onClick={() => setIsEditingTitle(false)} size="1" variant="soft">
                      <X size={14} />
                    </IconButton>
                  </Flex>
                ) : (
                  <Flex align="center" gap="2" className="group">
                    <Heading 
                      size="7" 
                      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded -m-2 flex-1"
                      onClick={() => setIsEditingTitle(true)}
                    >
                      {currentTask.name}
                    </Heading>
                    <IconButton 
                      size="1" 
                      variant="ghost" 
                      onClick={() => setIsEditingTitle(true)}
                      className="opacity-0 group-hover:opacity-100"
                    >
                      <Edit3 size={14} />
                    </IconButton>
                  </Flex>
                )}
              </Box>
              
              {/* Task Description */}
              <Box className="space-y-3">
                <Heading size="4" className="text-gray-600 dark:text-gray-400 uppercase text-sm font-semibold">
                  Description
                </Heading>
                {isEditingDescription ? (
                  <Box className="space-y-2">
                    <TextArea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      placeholder="Add a description..."
                      rows={6}
                      autoFocus
                      className="min-h-[120px]"
                    />
                    <Flex gap="2">
                      <Button onClick={handleDescriptionSave} size="1">
                        <Save size={14} />
                        Save
                      </Button>
                      <Button onClick={() => setIsEditingDescription(false)} size="1" variant="soft">
                        <X size={14} />
                        Cancel
                      </Button>
                    </Flex>
                  </Box>
                ) : (
                  <Box 
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-3 rounded border-2 border-dashed border-gray-200 dark:border-gray-700 min-h-[80px] group relative"
                    onClick={() => setIsEditingDescription(true)}
                  >
                    {currentTask.description ? (
                      <Text className="whitespace-pre-wrap leading-relaxed">
                        {currentTask.description}
                      </Text>
                    ) : (
                      <Text className="text-gray-500 italic">
                        Click to add a description...
                      </Text>
                    )}
                    <IconButton 
                      size="1" 
                      variant="ghost" 
                      className="opacity-0 group-hover:opacity-100 absolute top-2 right-2"
                    >
                      <Edit3 size={12} />
                    </IconButton>
                  </Box>
                )}
              </Box>
              
              {/* Date Section */}
              <Box className="space-y-3">
                <Heading size="4" className="text-gray-600 dark:text-gray-400 uppercase text-sm font-semibold">
                  Dates
                </Heading>
                <Flex gap="4" className="flex-wrap">
                  {/* Start Date */}
                  <Box className="space-y-1 flex-1 min-w-[200px]">
                    <Text className="text-sm">Start Date</Text>
                    <Box className="relative">
                      <SmartDatetimeInput
                        value={startDate || undefined}
                        onValueChange={(date) => handleStartDateChange(date)}
                        showCalendar={true}
                        showTimePicker={false}
                        placeholder="Set start date"
                      />
                      <CalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </Box>
                  </Box>
                  
                  {/* End Date */}
                  <Box className="space-y-1 flex-1 min-w-[200px]">
                    <Text className="text-sm">Due Date</Text>
                    <Box className="relative">
                      <SmartDatetimeInput
                        value={endDate || undefined}
                        onValueChange={(date) => handleEndDateChange(date)}
                        showCalendar={true}
                        showTimePicker={false}
                        placeholder="Set due date"
                      />
                      <CalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </Box>
                  </Box>
                </Flex>
              </Box>

              {/* Tags/Labels Section */}
              <Box className="space-y-3">
                <Flex justify="between" align="center">
                  <Heading size="4" className="text-gray-600 dark:text-gray-400 uppercase text-sm font-semibold">
                    Tags
                  </Heading>
                  <Button 
                    size="1" 
                    variant="ghost" 
                    onClick={() => setIsAddingTag(true)}
                  >
                    <Tag size={14} />
                    Add Tag
                  </Button>
                </Flex>
                
                {/* Tags List */}
                <Flex gap="2" wrap="wrap">
                  {currentTask.labelsTags && currentTask.labelsTags.length > 0 ? (
                    currentTask.labelsTags.map((tag: Tag) => (
                      <Badge 
                        key={tag.value}
                        style={{ backgroundColor: tag.color + "20", color: tag.color }}
                        className="group flex items-center gap-1 px-3 py-1"
                      >
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tag.color }} />
                        {tag.label}
                        <X 
                          size={12} 
                          className="ml-1 cursor-pointer opacity-0 group-hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveTag(tag.value);
                          }}
                        />
                      </Badge>
                    ))
                  ) : (
                    <Text className="text-gray-500 italic">No tags added yet</Text>
                  )}
                </Flex>
                
                {/* New Tag Form */}
                {isAddingTag && (
                  <Box className="space-y-2 p-3 border border-gray-100 dark:border-gray-800 rounded">
                    <TextField.Root 
                      value={newTagName}
                      onChange={(e) => setNewTagName(e.target.value)}
                      placeholder="Tag name"
                      className="flex-1"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleAddTag()
                        if (e.key === "Escape") setIsAddingTag(false)
                      }}
                    />
                    <Flex gap="2" align="center">
                      <Text className="text-sm">Color:</Text>
                      <Box className="relative">
                        <input 
                          type="color" 
                          value={newTagColor}
                          onChange={(e) => setNewTagColor(e.target.value)}
                          className="w-6 h-6 p-0 border-0"
                        />
                      </Box>
                      <Box className="flex-1" />
                      <Button onClick={handleAddTag} disabled={!newTagName.trim()} size="1">
                        Add Tag
                      </Button>
                      <Button onClick={() => setIsAddingTag(false)} size="1" variant="soft">
                        Cancel
                      </Button>
                    </Flex>
                  </Box>
                )}
              </Box>

              {/* Assigned Users Section */}
              <Box className="space-y-3">
                <Heading size="4" className="text-gray-600 dark:text-gray-400 uppercase text-sm font-semibold">
                  Assigned To
                </Heading>
                <Box className="border border-gray-200 dark:border-gray-700 p-3 rounded-md">
                  {/* This would connect to a user picker in a real implementation */}
                  {currentTask.assignedTo && currentTask.assignedTo.length > 0 ? (
                    <Flex gap="2" wrap="wrap">
                      {currentTask.assignedTo.map((user: User) => (
                        <Box key={user.id} className="flex items-center gap-2 p-1 rounded-full bg-gray-100 dark:bg-gray-800">
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs overflow-hidden">
                            {user.image ? (
                              <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                              user.name.substring(0, 2)
                            )}
                          </div>
                          <Text className="text-sm">{user.name}</Text>
                          <X 
                            size={14} 
                            className="ml-1 cursor-pointer hover:text-red-500"
                            onClick={() => {
                              // Handle remove assigned user
                              const updatedUsers = currentTask.assignedTo.filter(u => u.id !== user.id);
                              handleUpdateTask({ assignedTo: updatedUsers });
                            }}
                          />
                        </Box>
                      ))}
                    </Flex>
                  ) : (
                    <Flex align="center" gap="2" className="text-gray-500">
                      <Users size={16} />
                      <Text>No users assigned</Text>
                    </Flex>
                  )}
                  
                  {/* In a real implementation, this would open a user picker */}
                  <Button 
                    className="mt-2" 
                    variant="outline" 
                    size="1"
                    onClick={() => {
                      // Mock assign a user for demo purposes
                      const mockUser = {
                        id: crypto.randomUUID(),
                        name: "Demo User",
                        image: "/placeholder-user.svg"
                      };
                      const updatedUsers = [...(currentTask.assignedTo || []), mockUser];
                      handleUpdateTask({ assignedTo: updatedUsers });
                    }}
                  >
                    <User size={14} />
                    Assign User
                  </Button>
                </Box>
              </Box>

              {/* Subtasks */}
              <Box className="space-y-3">
                <Flex justify="between">
                  <Heading size="4" className="text-gray-600 dark:text-gray-400 uppercase text-sm font-semibold">
                    Subtasks ({completedSubTasks}/{totalSubTasks})
                  </Heading>
                  <Button 
                    size="1" 
                    variant="ghost" 
                    onClick={() => setIsAddingSubtask(true)}
                  >
                    <Plus size={14} />
                    Add Subtask
                  </Button>
                </Flex>
                
                {/* Subtasks Progress */}
                {totalSubTasks > 0 && (
                  <Progress 
                    value={progressPercentage} 
                    className="h-1.5" 
                    getValueLabel={() => `${completedSubTasks} of ${totalSubTasks} subtasks complete`}
                  />
                )}
                
                {/* New Subtask Form */}
                {isAddingSubtask && (
                  <Flex gap="2" className="mb-2">
                    <TextField.Root 
                      value={newSubtaskName}
                      onChange={(e) => setNewSubtaskName(e.target.value)}
                      placeholder="New subtask"
                      className="flex-1"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleAddSubtask()
                        if (e.key === "Escape") setIsAddingSubtask(false)
                      }}
                    />
                    <Button onClick={handleAddSubtask} disabled={!newSubtaskName.trim()}>
                      Add
                    </Button>
                    <IconButton onClick={() => setIsAddingSubtask(false)}>
                      <X size={14} />
                    </IconButton>
                  </Flex>
                )}
                
                {/* Subtasks List */}
                {currentTask.subTasks && currentTask.subTasks.length > 0 ? (
                  <Reorder.Group 
                    as="div" 
                    className="space-y-1" 
                    values={currentTask.subTasks} 
                    onReorder={handleReorderSubtasks}
                  >
                    {currentTask.subTasks.map((subtask: Subtask) => (
                      <SubtaskItem 
                        key={subtask.id}
                        subtask={subtask}
                        onUpdate={handleUpdateSubtask}
                        onDelete={handleDeleteSubtask}
                      />
                    ))}
                  </Reorder.Group>
                ) : (
                  <Box className="text-center py-4 text-gray-500">
                    <Text>No subtasks yet. Add one to track progress.</Text>
                  </Box>
                )}
              </Box>

              {/* Comments Section */}
              <Box className="space-y-3">
                <Heading size="4" className="text-gray-600 dark:text-gray-400 uppercase text-sm font-semibold">
                  Comments ({currentTask.commentsCount || 0})
                </Heading>
                
                {/* Comments List */}
                <Box className="space-y-4 max-h-[300px] overflow-y-auto p-2">
                  {currentTask.comments && currentTask.comments.length > 0 ? (
                    currentTask.comments.map((comment: Comment) => (
                      <Box 
                        key={comment.id} 
                        className="p-3 border border-gray-200 dark:border-gray-700 rounded-md"
                      >
                        <Flex align="center" gap="2" className="mb-2">
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs overflow-hidden">
                            {comment.createdBy.image ? (
                              <img src={comment.createdBy.image} alt={comment.createdBy.name} className="w-full h-full object-cover" />
                            ) : (
                              comment.createdBy.name.substring(0, 2)
                            )}
                          </div>
                          <Text className="font-medium">{comment.createdBy.name}</Text>
                          <Text className="text-xs text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString()} at {new Date(comment.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                          </Text>
                        </Flex>
                        <Text className="whitespace-pre-wrap">{comment.content}</Text>
                      </Box>
                    ))
                  ) : (
                    <Box className="text-center py-4 text-gray-500">
                      <MessageSquareText className="mx-auto mb-2" />
                      <Text>No comments yet</Text>
                    </Box>
                  )}
                </Box>
                
                {/* New Comment Form */}
                <Flex gap="2" className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <TextField.Root 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.ctrlKey) handleAddComment()
                    }}
                  />
                  <Button 
                    onClick={handleAddComment} 
                    disabled={!newComment.trim()}
                    size="1"
                  >
                    <Send size={14} />
                    Send
                  </Button>
                </Flex>
              </Box>
            </Box>
          </Flex>
        </ScrollArea>
      </div>
    </TaskDrawerSheet>
  );
}

// Subtask Item component
interface SubtaskItemProps {
  subtask: { id: string; name: string; completed: boolean };
  onUpdate: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

const SubtaskItem = ({ subtask, onUpdate, onDelete }: SubtaskItemProps) => {
  const controls = useDragControls();
  
  return (
    <Reorder.Item
      value={subtask}
      dragControls={controls}
      dragListener={false}
      className="list-none"
    >
      <Flex 
        align="center" 
        gap="2" 
        className={cn(
          "border border-gray-200 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-800",
          subtask.completed && "opacity-70"
        )}
      >
        <div 
          className="cursor-grab touch-none" 
          onPointerDown={(e) => controls.start(e)}
        >
          <GripVertical size={16} className="text-gray-400" />
        </div>
        
        <Checkbox 
          checked={subtask.completed} 
          onCheckedChange={() => onUpdate(subtask.id, !subtask.completed)}
        />
        
        <Text 
          className={cn(
            "flex-1", 
            subtask.completed && "line-through text-gray-500"
          )}
        >
          {subtask.name}
        </Text>
        
        <IconButton 
          size="1" 
          variant="ghost" 
          onClick={() => onDelete(subtask.id)}
          className="opacity-0 group-hover:opacity-100"
        >
          <Trash2 size={14} />
        </IconButton>
      </Flex>
    </Reorder.Item>
  );
}