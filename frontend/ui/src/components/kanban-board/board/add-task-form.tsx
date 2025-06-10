// components/board/add-task-form.tsx - Updated for new schema
"use client"

import { useState, useCallback } from "react"
import {
  Button,
  Dialog,
  Flex,
  TextField,
  TextArea,
  Select,
  Text,
  Box,
  Badge,
  IconButton,
  Checkbox,
} from "@incmix/ui"
import {
  Plus,
  Calendar,
  Flag,
  User,
  Tag,
  List,
  X,
  CalendarDays,
  Trash2,
} from "lucide-react"
import { useKanban, TaskDataSchema, KanbanColumn } from "@incmix/store"
import { nanoid } from "nanoid"


interface GlobalAddTaskFormProps {
  projectId: string
  columns: KanbanColumn[]
  onSuccess?: () => void
}

interface TaskFormData {
  name: string
  description: string
  columnId: string
  priority: "low" | "medium" | "high" | "urgent"
  startDate: string
  endDate: string
  labelsTags: { value: string; label: string; color: string }[]
  subTasks: { id: string; name: string; completed: boolean }[]
}

const PRIORITY_OPTIONS = [
  { value: "low", label: "Low Priority", color: "gray", icon: "○" },
  { value: "medium", label: "Medium Priority", color: "blue", icon: "◐" },
  { value: "high", label: "High Priority", color: "orange", icon: "◑" },
  { value: "urgent", label: "Urgent", color: "red", icon: "●" },
] as const

const PREDEFINED_LABELS = [
  { value: "bug", label: "Bug", color: "#ef4444" },
  { value: "feature", label: "Feature", color: "#3b82f6" },
  { value: "enhancement", label: "Enhancement", color: "#10b981" },
  { value: "documentation", label: "Documentation", color: "#8b5cf6" },
  { value: "design", label: "Design", color: "#f59e0b" },
  { value: "frontend", label: "Frontend", color: "#06b6d4" },
  { value: "backend", label: "Backend", color: "#84cc16" },
  { value: "testing", label: "Testing", color: "#f97316" },
]

export function GlobalAddTaskForm({
  projectId,
  columns,
  onSuccess,
}: GlobalAddTaskFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState<"basic" | "details" | "advanced">("basic")

  const [formData, setFormData] = useState<TaskFormData>({
    name: "",
    description: "",
    columnId: columns.length > 0
      ? (columns.find(col =>
           col.name.toLowerCase().includes("todo") ||
           col.name.toLowerCase().includes("to do")
         )?.id || columns[0].id)
      : "",
    priority: "medium",
    startDate: "",
    endDate: "",
    labelsTags: [],
    subTasks: [],
  })

  // New subtask input
  const [newSubtaskName, setNewSubtaskName] = useState("")

  // Use the new useKanban hook
  const { createTask } = useKanban(projectId)
  
  // Local helper function to generate unique IDs with prefixes (matches the behavior in the store)
  const generateUniqueId = (prefix?: string, length = 10): string => {
    const randomId = nanoid(length)
    return prefix ? `${prefix}-${randomId}` : randomId
  }

  const handleInputChange = useCallback((field: keyof TaskFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      return
    }

    if (!formData.columnId) {
      return
    }

    setIsLoading(true)

    try {
      // Create task with new schema structure
      const taskData: Partial<TaskDataSchema> = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        startDate: formData.startDate,
        endDate: formData.endDate,
        completed: false,
        labelsTags: formData.labelsTags,
        attachments: [],
        assignedTo: [],
        subTasks: formData.subTasks,
        comments: [], // New schema: empty array
        commentsCount: 0, // New schema: separate count field
      }

      await createTask(formData.columnId, taskData)

      // Reset form
      setFormData({
        name: "",
        description: "",
        columnId: columns[0]?.id || "",
        priority: "medium",
        startDate: "",
        endDate: "",
        labelsTags: [],
        subTasks: [],
      })

      setCurrentStep("basic")
      setIsOpen(false)
      onSuccess?.()
    } catch (error) {
      console.error("Failed to create task:", error)
    } finally {
      setIsLoading(false)
    }
  }, [formData, createTask, columns, onSuccess])

  // Label management
  const handleAddLabel = useCallback((label: typeof PREDEFINED_LABELS[0]) => {
    if (!formData.labelsTags.find(l => l.value === label.value)) {
      handleInputChange("labelsTags", [...formData.labelsTags, label])
    }
  }, [formData.labelsTags, handleInputChange])

  const handleRemoveLabel = useCallback((labelValue: string) => {
    handleInputChange("labelsTags", formData.labelsTags.filter(l => l.value !== labelValue))
  }, [formData.labelsTags, handleInputChange])

  // Subtask management
  const handleAddSubtask = useCallback(() => {
    if (!newSubtaskName.trim()) return
    
    const newSubtask = {
      id: generateUniqueId("subtask"),
      name: newSubtaskName.trim(),
      completed: false,
    }
    
    handleInputChange("subTasks", [...formData.subTasks, newSubtask])
    setNewSubtaskName("")
  }, [newSubtaskName, formData.subTasks, handleInputChange])

  const handleRemoveSubtask = useCallback((subtaskId: string) => {
    handleInputChange("subTasks", formData.subTasks.filter(st => st.id !== subtaskId))
  }, [formData.subTasks, handleInputChange])

  const handleToggleSubtask = useCallback((subtaskId: string) => {
    handleInputChange("subTasks", formData.subTasks.map(st => 
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    ))
  }, [formData.subTasks, handleInputChange])

  const canProceedToNext = () => {
    switch (currentStep) {
      case "basic":
        return formData.name.trim() && formData.columnId
      case "details":
        return true // Details are optional
      case "advanced":
        return true
      default:
        return false
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case "basic":
        return (
          <Flex direction="column" gap="4">
            {/* Task Name */}
            <Box>
              <label htmlFor="task-name" className="mb-2 block font-medium text-sm">
                Task Name *
              </label>
              <TextField.Root
                id="task-name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter a descriptive task name..."
                required
                disabled={isLoading}
              />
            </Box>

            {/* Description */}
            <Box>
              <label htmlFor="task-description" className="mb-2 block font-medium text-sm">
                Description
              </label>
              <TextArea
                id="task-description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe what needs to be done..."
                rows={4}
                disabled={isLoading}
              />
            </Box>

            {/* Column Selection */}
            <Box>
              <label htmlFor="column-select" className="mb-2 block font-medium text-sm">
                Status Column *
              </label>
              <Select.Root
                value={formData.columnId}
                onValueChange={(value) => handleInputChange("columnId", value)}
                required
                disabled={isLoading}
              >
                <Select.Trigger id="column-select">
                  {formData.columnId && (
                    <Flex align="center" gap="2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: columns.find(col => col.id === formData.columnId)?.color }}
                      />
                      {columns.find(col => col.id === formData.columnId)?.name}
                    </Flex>
                  )}
                </Select.Trigger>
                <Select.Content>
                  {columns.map((column) => (
                    <Select.Item key={column.id} value={column.id}>
                      <Flex align="center" gap="2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: column.color }}
                        />
                        <Text>{column.name}</Text>
                        <Text size="1" className="text-gray-500">
                          ({column.totalTasksCount} tasks)
                        </Text>
                      </Flex>
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </Box>

            {/* Priority */}
            <Box>
              <label htmlFor="priority-select" className="mb-2 block font-medium text-sm">
                Priority
              </label>
              <Select.Root
                value={formData.priority}
                onValueChange={(value) => handleInputChange("priority", value)}
                disabled={isLoading}
              >
                <Select.Trigger id="priority-select">
                  <Flex align="center" gap="2">
                    <Flag 
                      size={14} 
                      className={
                        formData.priority === "urgent" ? "text-red-500" :
                        formData.priority === "high" ? "text-orange-500" :
                        formData.priority === "medium" ? "text-blue-500" :
                        "text-gray-500"
                      }
                    />
                    {PRIORITY_OPTIONS.find(p => p.value === formData.priority)?.label}
                  </Flex>
                </Select.Trigger>
                <Select.Content>
                  {PRIORITY_OPTIONS.map((priority) => (
                    <Select.Item key={priority.value} value={priority.value}>
                      <Flex align="center" gap="2">
                        <span>{priority.icon}</span>
                        <Badge color={priority.color} variant="soft">
                          {priority.label}
                        </Badge>
                      </Flex>
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </Box>
          </Flex>
        )

      case "details":
        return (
          <Flex direction="column" gap="4">
            {/* Due Dates */}
            <Box>
              <Text className="mb-3 block font-medium text-sm">
                <CalendarDays size={16} className="inline mr-2" />
                Timeline
              </Text>
              <Flex gap="3">
                <Box className="flex-1">
                  <label htmlFor="start-date" className="mb-1 block text-xs text-gray-600">
                    Start Date
                  </label>
                  <TextField.Root
                    id="start-date"
                    type="date"
                    value={formData.startDate ? formData.startDate.split('T')[0] : ""}
                    onChange={(e) => {
                      const date = e.target.value ? new Date(e.target.value).toISOString() : ""
                      handleInputChange("startDate", date)
                    }}
                    disabled={isLoading}
                  />
                </Box>
                <Box className="flex-1">
                  <label htmlFor="end-date" className="mb-1 block text-xs text-gray-600">
                    Due Date
                  </label>
                  <TextField.Root
                    id="end-date"
                    type="date"
                    value={formData.endDate ? formData.endDate.split('T')[0] : ""}
                    onChange={(e) => {
                      const date = e.target.value ? new Date(e.target.value).toISOString() : ""
                      handleInputChange("endDate", date)
                    }}
                    disabled={isLoading}
                  />
                </Box>
              </Flex>
            </Box>

            {/* Labels */}
            <Box>
              <Text className="mb-3 block font-medium text-sm">
                <Tag size={16} className="inline mr-2" />
                Labels
              </Text>
              
              {/* Selected Labels */}
              {formData.labelsTags.length > 0 && (
                <Flex gap="1" wrap="wrap" className="mb-3">
                  {formData.labelsTags.map((label) => (
                    <Badge
                      key={label.value}
                      style={{ backgroundColor: label.color + "20", color: label.color }}
                      className="flex items-center gap-1"
                    >
                      {label.label}
                      <IconButton
                        size="1"
                        variant="ghost"
                        onClick={() => handleRemoveLabel(label.value)}
                        className="h-3 w-3 p-0 ml-1"
                      >
                        <X size={10} />
                      </IconButton>
                    </Badge>
                  ))}
                </Flex>
              )}

              {/* Available Labels */}
              <Box>
                <Text size="1" className="mb-2 text-gray-600">Available Labels:</Text>
                <Flex gap="1" wrap="wrap">
                  {PREDEFINED_LABELS
                    .filter(label => !formData.labelsTags.find(l => l.value === label.value))
                    .map((label) => (
                      <Button
                        key={label.value}
                        variant="ghost"
                        size="1"
                        onClick={() => handleAddLabel(label)}
                        className="h-auto p-1"
                        disabled={isLoading}
                      >
                        <Badge
                          style={{ backgroundColor: label.color + "20", color: label.color }}
                          size="1"
                        >
                          {label.label}
                        </Badge>
                      </Button>
                    ))}
                </Flex>
              </Box>
            </Box>
          </Flex>
        )

      case "advanced":
        return (
          <Flex direction="column" gap="4">
            {/* Subtasks */}
            <Box>
              <Text className="mb-3 block font-medium text-sm">
                <List size={16} className="inline mr-2" />
                Subtasks ({formData.subTasks.filter(st => st.completed).length}/{formData.subTasks.length} completed)
              </Text>

              {/* Existing Subtasks */}
              {formData.subTasks.length > 0 && (
                <Box className="space-y-2 mb-3">
                  {formData.subTasks.map((subtask) => (
                    <Flex key={subtask.id} align="center" gap="2" className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <Checkbox
                        checked={subtask.completed}
                        onCheckedChange={() => handleToggleSubtask(subtask.id)}
                      />
                      <Text className={`flex-1 ${subtask.completed ? "line-through text-gray-500" : ""}`}>
                        {subtask.name}
                      </Text>
                      <IconButton
                        size="1"
                        variant="ghost"
                        onClick={() => handleRemoveSubtask(subtask.id)}
                        className="text-red-500"
                      >
                        <Trash2 size={12} />
                      </IconButton>
                    </Flex>
                  ))}
                </Box>
              )}

              {/* Add New Subtask */}
              <Flex gap="2">
                <TextField.Root
                  value={newSubtaskName}
                  onChange={(e) => setNewSubtaskName(e.target.value)}
                  placeholder="Add a subtask..."
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddSubtask()
                    }
                  }}
                  disabled={isLoading}
                />
                <Button
                  onClick={handleAddSubtask}
                  disabled={!newSubtaskName.trim() || isLoading}
                  size="2"
                >
                  <Plus size={14} />
                </Button>
              </Flex>
            </Box>

            {/* Task Summary */}
            <Box className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Text className="mb-2 font-medium text-sm">Task Summary</Text>
              <Box className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <Text>• Title: {formData.name || "Untitled Task"}</Text>
                <Text>• Status: {columns.find(col => col.id === formData.columnId)?.name || "Unknown"}</Text>
                <Text>• Priority: {PRIORITY_OPTIONS.find(p => p.value === formData.priority)?.label}</Text>
                <Text>• Labels: {formData.labelsTags.length} selected</Text>
                <Text>• Subtasks: {formData.subTasks.length} items</Text>
                {formData.startDate && <Text>• Start: {new Date(formData.startDate).toLocaleDateString()}</Text>}
                {formData.endDate && <Text>• Due: {new Date(formData.endDate).toLocaleDateString()}</Text>}
              </Box>
            </Box>
          </Flex>
        )

      default:
        return null
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger>
        <Button size="2" className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus size={16} />
          Add Task
        </Button>
      </Dialog.Trigger>

      <Dialog.Content className="max-w-2xl max-h-[90vh] overflow-hidden">
        <Dialog.Header>
          <Dialog.Title>Create New Task</Dialog.Title>
          <Dialog.Description>
            Add a comprehensive task with all details
          </Dialog.Description>
        </Dialog.Header>

        {/* Step Navigation */}
        <Flex gap="1" className="mb-4">
          {(["basic", "details", "advanced"] as const).map((step, index) => (
            <Button
              key={step}
              variant={currentStep === step ? "solid" : "ghost"}
              size="1"
              onClick={() => setCurrentStep(step)}
              disabled={isLoading}
              className="flex-1 capitalize"
            >
              {index + 1}. {step}
            </Button>
          ))}
        </Flex>

        <form onSubmit={handleSubmit}>
          <Box className="max-h-[60vh] overflow-y-auto mb-4">
            {renderStepContent()}
          </Box>

          <Dialog.Footer>
            <Flex justify="between" className="w-full">
              <Flex gap="2">
                {currentStep !== "basic" && (
                  <Button
                    type="button"
                    variant="soft"
                    onClick={() => {
                      const steps = ["basic", "details", "advanced"] as const
                      const currentIndex = steps.indexOf(currentStep)
                      if (currentIndex > 0) {
                        setCurrentStep(steps[currentIndex - 1])
                      }
                    }}
                    disabled={isLoading}
                  >
                    Previous
                  </Button>
                )}
              </Flex>
              
              <Flex gap="2">
                <Dialog.Close>
                  <Button variant="soft" color="gray" disabled={isLoading}>
                    Cancel
                  </Button>
                </Dialog.Close>
                
                {currentStep !== "advanced" ? (
                  <Button
                    type="button"
                    onClick={() => {
                      const steps = ["basic", "details", "advanced"] as const
                      const currentIndex = steps.indexOf(currentStep)
                      if (currentIndex < steps.length - 1) {
                        setCurrentStep(steps[currentIndex + 1])
                      }
                    }}
                    disabled={!canProceedToNext() || isLoading}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!formData.name.trim() || !formData.columnId || isLoading}
                  >
                    {isLoading ? "Creating..." : "Create Task"}
                  </Button>
                )}
              </Flex>
            </Flex>
          </Dialog.Footer>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}