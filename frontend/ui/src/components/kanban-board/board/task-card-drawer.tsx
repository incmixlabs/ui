// components/board/task-card-drawer.tsx - Updated for new schema

import {
  Badge,
  Box,
  Button,
  Checkbox,
  DropdownMenu,
  Flex,
  Heading,
  IconButton,
  ScrollArea,
  Text,
  TextField,
  TextArea,
  Select,
} from "@incmix/ui"
import { cn } from "@utils"
import {
  Check,
  Ellipsis,
  GripVertical,
  Plus,
  Trash2,
  Calendar,
  User,
  Tag,
  CheckSquare,
  Save,
  X,
  Edit3,
  Flag,
  Clock,
  AlertCircle,
  Copy,
  Archive,
  MessageSquareText,
} from "lucide-react"
import {
  type DragControls,
  Reorder,
  motion,
  useDragControls,
  useMotionValue,
} from "motion/react"
import type React from "react"
import { useEffect, useRef, useState, useCallback, memo } from "react"
import { useKanban, TaskDataSchema } from "@incmix/store"
import { useKanbanDrawer } from "./hooks/use-kanban-drawer"

// Simple sheet component instead of MotionSheet
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

export function TaskCardDrawer() {
  const { taskId, isOpen, handleDrawerClose } = useKanbanDrawer()
  
  // Use the new useKanban hook
  const {
    columns,
    updateTask,
    deleteTask,
    createTask,
  } = useKanban("default-project")
  
  // Find the current task
  const currentTask = taskId 
    ? columns.flatMap(col => col.tasks).find(task => task.taskId === taskId)
    : null

  // Find the current column
  const currentColumn = currentTask 
    ? columns.find(col => col.tasks.some(task => task.taskId === currentTask.taskId))
    : null

  // Local state for editing
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [isAddingSubtask, setIsAddingSubtask] = useState(false)
  const [newSubtaskName, setNewSubtaskName] = useState("")

  // Update local state when task changes
  useEffect(() => {
    if (currentTask) {
      setEditTitle(currentTask.name)
      setEditDescription(currentTask.description || "")
    }
  }, [currentTask])

  // Task update handlers
  const handleUpdateTask = useCallback(async (updates: Partial<TaskDataSchema>) => {
    if (!currentTask) return
    try {
      await updateTask(currentTask.taskId, updates)
    } catch (error) {
      console.error("Failed to update task:", error)
    }
  }, [currentTask, updateTask])

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

  const handleUpdateSubtask = useCallback(async (subtaskId: string, completed: boolean) => {
    if (!currentTask?.subTasks) return
    
    const updatedSubTasks = currentTask.subTasks.map(st => 
      st.id === subtaskId ? { ...st, completed } : st
    )
    await handleUpdateTask({ subTasks: updatedSubTasks })
  }, [currentTask?.subTasks, handleUpdateTask])

  const handleDeleteSubtask = useCallback(async (subtaskId: string) => {
    if (!currentTask?.subTasks) return
    
    const updatedSubTasks = currentTask.subTasks.filter(st => st.id !== subtaskId)
    await handleUpdateTask({ subTasks: updatedSubTasks })
  }, [currentTask?.subTasks, handleUpdateTask])

  const handleReorderSubtasks = useCallback(async (newOrder: { id: string; name: string; completed: boolean; }[]) => {
    if (!currentTask) return
    await handleUpdateTask({ subTasks: newOrder })
  }, [currentTask, handleUpdateTask])

  // Task actions
  const handleDeleteTask = useCallback(async () => {
    if (!currentTask) return
    
    if (confirm(`Are you sure you want to delete "${currentTask.name}"?`)) {
      try {
        await deleteTask(currentTask.taskId)
        handleDrawerClose()
      } catch (error) {
        console.error("Failed to delete task:", error)
      }
    }
  }, [currentTask, deleteTask, handleDrawerClose])

  const handleDuplicateTask = useCallback(async () => {
    if (!currentTask || !currentColumn) return
    
    try {
      await createTask(currentColumn.id, {
        name: `${currentTask.name} (Copy)`,
        description: currentTask.description,
        priority: currentTask.priority,
        labelsTags: currentTask.labelsTags,
        assignedTo: currentTask.assignedTo,
        subTasks: currentTask.subTasks?.map(st => ({ ...st, id: crypto.randomUUID(), completed: false })),
        completed: false,
        comments: [], // New schema: empty array
        commentsCount: 0, // New schema: separate count
      })
    } catch (error) {
      console.error("Failed to duplicate task:", error)
    }
  }, [currentTask, currentColumn, createTask])

  if (!currentTask || !currentColumn) {
    return null
  }

  const completedSubTasks = currentTask.subTasks?.filter(st => st.completed).length || 0
  const totalSubTasks = currentTask.subTasks?.length || 0
  const progressPercentage = totalSubTasks > 0 ? (completedSubTasks / totalSubTasks) * 100 : 0

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

  return (
    <TaskDrawerSheet
      open={isOpen}
      onOpenChange={(open) => !open && handleDrawerClose()}
    >
      <div className="cursor-default bg-white dark:bg-gray-900 h-screen">
        <ScrollArea className="h-full">
          <Flex className="h-full">
            {/* Main Content */}
            <Box className="flex-1 p-6 space-y-6">
              {/* Header Actions */}
              <Flex align="center" justify="between">
                <Flex gap="2">
                  <Button 
                    onClick={handleCompleteTask}
                    variant={currentTask.completed ? "soft" : "solid"}
                    color={currentTask.completed ? "gray" : "green"}
                  >
                    <Check size={16} />
                    {currentTask.completed ? "Mark Incomplete" : "Mark Complete"}
                  </Button>
                  
                  <Select.Root
                    value={currentTask.priority || "medium"}
                    onValueChange={handlePriorityChange}
                  >
                    <Select.Trigger className="w-auto min-w-[120px]">
                      <Flex align="center" gap="1">
                        <PriorityIcon size={14} />
                        {priorityInfo.label}
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

                  {/* Column Status */}
                  <Badge 
                    style={{ backgroundColor: currentColumn.color + "20", color: currentColumn.color }}
                    className="flex items-center gap-1"
                  >
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: currentColumn.color }}
                    />
                    {currentColumn.name}
                  </Badge>
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

              {/* Subtasks */}
              <Box className="space-y-4">
                <Flex align="center" justify="between">
                  <Heading size="4" className="text-gray-600 dark:text-gray-400 uppercase text-sm font-semibold flex items-center gap-2">
                    <CheckSquare size={16} />
                    Subtasks ({completedSubTasks}/{totalSubTasks})
                  </Heading>
                  {totalSubTasks > 0 && (
                    <Badge variant="soft" color={progressPercentage === 100 ? "green" : "blue"}>
                      {Math.round(progressPercentage)}% Complete
                    </Badge>
                  )}
                </Flex>

                {totalSubTasks > 0 && (
                  <Box className="relative h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <Box
                      className={cn(
                        "h-full transition-all duration-300",
                        progressPercentage === 100 ? "bg-green-500" : "bg-blue-500"
                      )}
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </Box>
                )}

                {currentTask.subTasks && currentTask.subTasks.length > 0 && (
                  <Reorder.Group
                    axis="y"
                    values={[...currentTask.subTasks]}
                    onReorder={handleReorderSubtasks}
                    className="space-y-2"
                  >
                    {currentTask.subTasks.map((subtask) => (
                      <SubtaskItem
                        key={subtask.id}
                        subtask={subtask}
                        onToggle={(completed) => handleUpdateSubtask(subtask.id, completed)}
                        onDelete={() => handleDeleteSubtask(subtask.id)}
                      />
                    ))}
                  </Reorder.Group>
                )}

                {isAddingSubtask ? (
                  <Box className="space-y-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                    <TextField.Root
                      value={newSubtaskName}
                      onChange={(e) => setNewSubtaskName(e.target.value)}
                      placeholder="Enter subtask name..."
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleAddSubtask()
                        if (e.key === "Escape") setIsAddingSubtask(false)
                      }}
                    />
                    <Flex gap="2">
                      <Button onClick={handleAddSubtask} size="1" disabled={!newSubtaskName.trim()}>
                        <Plus size={14} />
                        Add Subtask
                      </Button>
                      <Button onClick={() => setIsAddingSubtask(false)} size="1" variant="soft">
                        Cancel
                      </Button>
                    </Flex>
                  </Box>
                ) : (
                  <Button 
                    variant="ghost" 
                    onClick={() => setIsAddingSubtask(true)}
                    className="w-full justify-start border-2 border-dashed border-gray-300 dark:border-gray-600 py-6"
                  >
                    <Plus size={16} />
                    Add Subtask
                  </Button>
                )}
              </Box>
            </Box>
            
            {/* Right Sidebar */}
            <Box className="w-80 border-l border-gray-200 dark:border-gray-700 p-6 space-y-6 bg-gray-50 dark:bg-gray-800">
              <Flex align="center" justify="between">
                <Heading size="4">Task Details</Heading>
                <IconButton onClick={handleDrawerClose} variant="ghost">
                  <X size={16} />
                </IconButton>
              </Flex>

              {/* Created By */}
              <Box className="space-y-2">
                <Text size="2" className="font-semibold text-gray-600 dark:text-gray-400 uppercase">
                  Created By
                </Text>
                <Flex align="center" gap="2">
                  <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-300">
                    {currentTask.createdBy.name.charAt(0).toUpperCase()}
                  </div>
                  <Text>{currentTask.createdBy.name}</Text>
                </Flex>
              </Box>
              
              {/* Labels */}
              <Box className="space-y-3">
                <Flex justify="between" align="center">
                  <Text size="2" className="font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Labels
                  </Text>
                  <IconButton size="1" variant="ghost">
                    <Plus size={14} />
                  </IconButton>
                </Flex>
                <Flex gap="1" wrap="wrap">
                  {currentTask.labelsTags?.map((label) => (
                    <Badge
                      key={label.value}
                      style={{ backgroundColor: label.color + "20", color: label.color }}
                      className="border"
                    >
                      {label.label}
                    </Badge>
                  ))}
                  {(!currentTask.labelsTags || currentTask.labelsTags.length === 0) && (
                    <Text size="2" className="text-gray-500 italic">
                      No labels
                    </Text>
                  )}
                </Flex>
              </Box>

              {/* Comments Section - Updated for new schema */}
              <Box className="space-y-4">
                <Flex justify="between" align="center">
                  <Text size="2" className="font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Comments ({currentTask.commentsCount || 0})
                  </Text>
                  <IconButton size="1" variant="ghost">
                    <MessageSquareText size={14} />
                  </IconButton>
                </Flex>
                
                {/* Comments List */}
                <Box className="space-y-3">
                  {currentTask.comments && currentTask.comments.length > 0 ? (
                    currentTask.comments.map((comment) => (
                      <Box 
                        key={comment.id} 
                        className="p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                      >
                        <Flex className="space-y-1">
                          <Flex align="center" gap="2" className="mb-2">
                            <div className="w-7 h-7 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-300">
                              {comment.createdBy.name.charAt(0).toUpperCase()}
                            </div>
                            <Box>
                              <Text size="2" className="font-medium">{comment.createdBy.name}</Text>
                              <Text size="1" className="text-gray-500">
                                {new Date(comment.createdAt).toLocaleString()}
                              </Text>
                            </Box>
                          </Flex>
                          <Text className="pl-9">{comment.content}</Text>
                        </Flex>
                      </Box>
                    ))
                  ) : (
                    <Text className="text-gray-500 italic text-center p-3">
                      No comments yet
                    </Text>
                  )}
                </Box>
                
                {/* Add Comment Form */}
                <Box className="pt-2">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const content = formData.get('comment') as string;
                      
                      if (content && content.trim()) {
                        // Add new comment
                        const newComment = {
                          id: crypto.randomUUID(),
                          content: content.trim(),
                          createdBy: currentTask.createdBy, // Use current user in production
                          createdAt: Date.now(),
                        };
                        
                        const updatedComments = [...(currentTask.comments || []), newComment];
                        const newCount = (currentTask.commentsCount || 0) + 1;
                        
                        handleUpdateTask({ 
                          comments: updatedComments,
                          commentsCount: newCount
                        });
                        
                        // Reset form
                        e.currentTarget.reset();
                      }
                    }}
                  >
                    <Box className="relative">
                      <TextField.Root 
                        name="comment"
                        placeholder="Add a comment..."
                        className="pr-24"
                      />
                      <Button 
                        type="submit" 
                        size="1"
                        className="absolute right-1 top-1"
                      >
                        Comment
                      </Button>
                    </Box>
                  </form>
                </Box>
              </Box>

              {/* Task Metadata */}
              <Box className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <Box>
                  <Text size="2" className="font-semibold text-gray-600 dark:text-gray-400">
                    Task ID
                  </Text>
                  <Text size="1" className="text-gray-500 font-mono">
                    {currentTask.taskId}
                  </Text>
                </Box>
                <Box>
                  <Text size="2" className="font-semibold text-gray-600 dark:text-gray-400">
                    Created
                  </Text>
                  <Text size="1" className="text-gray-500">
                    {new Date(currentTask.createdAt).toLocaleString()}
                  </Text>
                </Box>
                <Box>
                  <Text size="2" className="font-semibold text-gray-600 dark:text-gray-400">
                    Last Updated
                  </Text>
                  <Text size="1" className="text-gray-500">
                    {new Date(currentTask.updatedAt).toLocaleString()}
                  </Text>
                </Box>
                <Box>
                  <Text size="2" className="font-semibold text-gray-600 dark:text-gray-400">
                    Status Column
                  </Text>
                  <Badge 
                    style={{ backgroundColor: currentColumn.color + "20", color: currentColumn.color }}
                    size="1"
                  >
                    {currentColumn.name}
                  </Badge>
                </Box>
              </Box>
            </Box>
          </Flex>
        </ScrollArea>
      </div>
    </TaskDrawerSheet>
  )
}

// Subtask component with drag and drop
const SubtaskItem = memo(function SubtaskItem({
  subtask,
  onToggle,
  onDelete,
}: {
  subtask: { id: string; name: string; completed: boolean }
  onToggle: (completed: boolean) => void
  onDelete: () => void
}) {
  const dragControls = useDragControls()
  const y = useMotionValue(0)

  return (
    <Reorder.Item
      value={subtask}
      style={{ y }}
      dragListener={false}
      dragControls={dragControls}
      className="group flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
    >
      <Flex align="center" gap="3" className="flex-1">
        <Checkbox
          checked={subtask.completed}
          onCheckedChange={(checked) => onToggle(!!checked)}
        />
        <Text className={cn(
          "flex-1",
          subtask.completed && "line-through text-gray-500"
        )}>
          {subtask.name}
        </Text>
      </Flex>
      
      <Flex align="center" gap="2" className="opacity-0 group-hover:opacity-100 transition-opacity">
        <motion.div
          whileTap={{ scale: 0.95 }}
          onPointerDown={(e) => {
            e.preventDefault()
            dragControls.start(e)
          }}
          className="cursor-grab active:cursor-grabbing"
        >
          <GripVertical size={16} className="text-gray-400" />
        </motion.div>
        
        <IconButton onClick={onDelete} size="1" variant="ghost" className="text-red-500 hover:bg-red-50">
          <Trash2 size={14} />
        </IconButton>
      </Flex>
    </Reorder.Item>
  )
})