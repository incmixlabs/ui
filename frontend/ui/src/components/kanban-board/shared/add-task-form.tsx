// components/board/add-task-form-autoform.tsx
"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import { Button, Dialog, Text, Box } from "@incmix/ui"
import { Plus } from "lucide-react"
import AutoForm from "@components/auto-form"
import { useKanban, type TaskDataSchema } from "@incmix/store"
import { nanoid } from "nanoid"
import { createTaskFormSchema } from "./add-task-schema"

interface AddTaskFormProps {
  projectId: string
  onSuccess?: () => void
}

/**
 * Enhanced Add Task Form using AutoForm for better UX and maintainability
 */
export function AddTaskForm({ projectId, onSuccess }: AddTaskFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Record<string, any>>({})

  // Get kanban data and operations
  const { columns, createTask, isLoading: kanbanLoading } = useKanban(projectId)

  // Create the schema with dynamic columns
  const taskFormSchema = useMemo(() => {
    if (columns.length === 0) return null
    return createTaskFormSchema(columns)
  }, [columns])

  // Set up default form values when schema is ready
  const defaultFormValues = useMemo(() => {
    if (!taskFormSchema || columns.length === 0) return {}
    
    // Get default column (prefer "To Do" or first column)
    const defaultColumnId = columns.find(col => 
      col.name.toLowerCase().includes("todo") || 
      col.name.toLowerCase().includes("to do")
    )?.id || columns[0]?.id || ""

    const defaults = {
      priority: "medium",
      columnId: defaultColumnId,
      assignedTo: [],
      labelsTags: [],
      subTasks: [],
      name: "",
      description: "",
      startDate: "",
      endDate: "",
    }
    
    console.log('Generated default form values:', defaults) // Debug log
    return defaults
  }, [taskFormSchema, columns])

  // Initialize form data with defaults when component mounts or schema changes
  // Only set if formData is completely empty to avoid conflicts
  useEffect(() => {
    if (defaultFormValues && Object.keys(defaultFormValues).length > 0 && Object.keys(formData).length === 0) {
      console.log('Setting initial default form values:', defaultFormValues) // Debug log
      setFormData(defaultFormValues)
    }
  }, [defaultFormValues]) // Remove formData dependency to avoid loops

  // Generate unique ID helper (for any future use)
  const generateUniqueId = useCallback((prefix?: string, length = 10): string => {
    const randomId = nanoid(length)
    return prefix ? `${prefix}-${randomId}` : randomId
  }, [])

  // Get color for label based on its value
  const getColorForLabel = useCallback((labelValue: string): string => {
    const colorMap: Record<string, string> = {
      bug: "#ef4444",
      feature: "#3b82f6", 
      enhancement: "#10b981",
      documentation: "#8b5cf6",
      design: "#f59e0b",
      frontend: "#06b6d4",
      backend: "#84cc16",
      testing: "#f97316",
    }
    return colorMap[labelValue] || "#6b7280" // Default gray
  }, [])
  // Transform form data to TaskDataSchema format
  const transformFormDataToTask = useCallback((data: any): Partial<TaskDataSchema> => {
    return {
      name: data.name?.trim() || "",
      description: data.description?.trim() || "",
      priority: data.priority || "medium",
      startDate: data.startDate || "",
      endDate: data.endDate || "",
      completed: false,
      
      // Transform labelsTags from multipleSelector format to TaskDataSchema format
      labelsTags: (data.labelsTags || []).map((label: any) => ({
        value: label.value,
        label: label.label,
        color: getColorForLabel(label.value), // Assign colors based on label type
      })),
      
      // Transform assignedTo from multipleSelector format to TaskDataSchema format
      // Handle the rich member data structure
      assignedTo: (data.assignedTo || []).map((member: any) => ({
        id: member.value || member.id,
        name: member.label || member.name,
        image: member.avatar || "/placeholder.svg",
      })),
      
      // Transform subtasks - they're already in the correct format from the custom component
      subTasks: (data.subTasks || []).filter((subtask: any) => 
        subtask && subtask.name && subtask.name.trim()
      ),
      
      // Initialize empty arrays for other fields
      attachments: [],
      comments: [],
      commentsCount: 0,
    }
  }, [getColorForLabel])


  // Handle form values change
  const handleValuesChange = useCallback((values: any) => {
    setFormData(values)
  }, [])

  // Handle form submission
  const handleSubmit = useCallback(async (data: any) => {
    if (!data.name?.trim() || !data.columnId) {
      console.warn("Task name and column are required")
      return
    }

    setIsLoading(true)

    try {
      // Transform form data to TaskDataSchema format
      const taskData = transformFormDataToTask(data)
      
      // Create the task using the useKanban hook
      await createTask(data.columnId, taskData)

      // Reset form and close dialog
      setFormData(defaultFormValues)
      setIsOpen(false)
      onSuccess?.()
      
      console.log("Task created successfully")
    } catch (error) {
      console.error("Failed to create task:", error)
      // You could add toast notification here
    } finally {
      setIsLoading(false)
    }
  }, [createTask, transformFormDataToTask, onSuccess, defaultFormValues])

  // Don't render if columns are still loading or no schema available
  if (kanbanLoading || !taskFormSchema) {
    return (
      <Button size="2" disabled>
        <Plus size={16} />
        Loading...
      </Button>
    )
  }

  return (
    <Dialog.Root 
      open={isOpen} 
      onOpenChange={(open) => {
        setIsOpen(open)
        // When dialog opens, reset to defaults - when it closes, clear form
        if (open && defaultFormValues) {
          console.log('Dialog opened, setting defaults:', defaultFormValues)
          setFormData(defaultFormValues)
        } else if (!open) {
          console.log('Dialog closed, clearing form')
          setFormData({})
        }
      }}
    >
      <Dialog.Trigger>
        <Button size="2" className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus size={16} />
          Add Task
        </Button>
      </Dialog.Trigger>

      <Dialog.Content className="max-w-4xl max-h-[90vh] overflow-hidden">
        <Dialog.Header>
          <Dialog.Title>Create New Task</Dialog.Title>
          <Dialog.Description>
            Add a comprehensive task with all necessary details
          </Dialog.Description>
        </Dialog.Header>

        <Box className="max-h-[70vh] overflow-y-auto py-4">
          {/* Task summary for user context */}
          {formData.name && (
            <Box className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <Text size="2" weight="medium" className="text-blue-700 dark:text-blue-300">
                📝 Task Preview: {formData.name}
              </Text>
              {formData.columnId && (
                <Text size="1" className="text-blue-600 dark:text-blue-400 mt-1">
                  Status: {columns.find(col => col.id === formData.columnId)?.name}
                </Text>
              )}
            </Box>
          )}

          <AutoForm
            formSchema={taskFormSchema.formSchema}
            fieldConfig={taskFormSchema.fieldConfig}
            onSubmit={handleSubmit}
            onValuesChange={handleValuesChange}
            values={Object.keys(formData).length > 0 ? formData : defaultFormValues}
            className="space-y-6"
          >
            <div className="mt-4 flex justify-end">
              <Button
                type="submit"
                disabled={!formData.name?.trim() || !formData.columnId || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? "Creating..." : "Create Task"}
              </Button>
            </div>
          </AutoForm>
        </Box>

        <Dialog.Footer >
          <div className="flex justify-between items-center w-full">
            <Text size="1" className="text-gray-500">
              {formData.name ? `Creating: ${formData.name}` : "Fill in the task details"}
            </Text>
            
            <div className="flex gap-2">
              <Dialog.Close>
                <Button variant="soft" color="gray" disabled={isLoading}>
                  Cancel
                </Button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}