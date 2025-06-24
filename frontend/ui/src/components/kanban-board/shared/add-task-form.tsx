// components/board/add-task-form-autoform.tsx
"use client"

import { useState, useCallback, useMemo, useEffect, useRef } from "react"
import { Button, Dialog, Text, Box } from "@incmix/ui"
import { Plus, Sparkles, Loader2 } from "lucide-react"
import AutoForm from "@components/auto-form"
import { useKanban, type TaskDataSchema, useAIFeaturesStore, useAIUserStory } from "@incmix/store"
import { nanoid } from "nanoid"
import { createTaskFormSchema } from "./add-task-schema"
import { useAIDescriptionGeneration } from "../../../hooks/use-ai-description-generation"

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
  const [formData, setFormData] = useState<{
    name?: string;
    description?: string;
    columnId?: string;
    priority?: string;
    startDate?: string;
    endDate?: string;
    assignedTo?: any[];
    labelsTags?: any[];
    subTasks?: any[];
    [key: string]: any;
  }>({ priority: 'medium' })
  const [lastProcessedTitle, setLastProcessedTitle] = useState('')
  
  // Track if we're currently focusing the description field
  const isDescriptionFocused = useRef(false)
  
  // Get AI features state
  const { useAI } = useAIFeaturesStore()
  
  // Get AI user story generation functionality
  const { generateUserStory, isGenerating, error: aiError } = useAIUserStory()

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
      refUrlsJson: JSON.stringify([]),
      name: "",
      description: "",
      startDate: "",
      endDate: "",
    }
    
  
    return defaults
  }, [taskFormSchema, columns])

  // Initialize form data with defaults when component mounts or dialog opens
  useEffect(() => {
    if (defaultFormValues && Object.keys(defaultFormValues).length > 0) {
      // Only update if we're opening the dialog (isOpen is true)
      if (isOpen) {
        setFormData(defaultFormValues);
      }
    }
  }, [defaultFormValues, isOpen])

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
      
      // Parse reference URLs from JSON string and add to task data
      refUrls: (() => {
        try {
          // Parse the JSON string to get the URLs array
          return data.refUrlsJson ? JSON.parse(data.refUrlsJson) : [];
        } catch (error) {
          console.error("Failed to parse refUrlsJson:", error);
          return [];
        }
      })(),
      
      // Transform subtasks - they're already in the correct format from the custom component
      subTasks: (data.subTasks || []).filter((subtask: any) => 
        subtask && subtask.name && subtask.name.trim()
      ),
      
      // Include the acceptance criteria (from AI generation)
      acceptanceCriteria: data.acceptanceCriteria || [],
      
      // Include the checklist (from AI generation or manually added)
      checklist: data.checklist || [],
      
      // Initialize empty arrays for other fields
      attachments: [],
      comments: [],
      commentsCount: 0,
    }
  }, [getColorForLabel])

  // Track if we've had a generation error for the current title
  const [hadGenerationError, setHadGenerationError] = useState(false);
  
  // Function to generate description using AI
  const generateDescription = useCallback(async (title: string): Promise<void> => {
    if (!title || !useAI) return;
    
    try {
      const aiResult = await generateUserStory(title)
      if (aiResult) {
        // Make sure checklist items have proper structure with id, text, checked fields
        const formattedChecklist = (aiResult.checklist || []).map((item: any) => ({
          id: item.id || generateUniqueId('cl'),
          text: item.text || item.name || item,
          checked: item.checked || false
        }))
        
        // Format acceptance criteria items
        const formattedAcceptanceCriteria = (aiResult.acceptanceCriteria || []).map((item: any) => ({
          id: item.id || generateUniqueId('ac'),
          text: item.text || item.name || item
        }))
        
        setFormData((prev) => ({
          ...prev,
          description: aiResult.description,
          acceptanceCriteria: formattedAcceptanceCriteria, // Add properly formatted acceptance criteria
          checklist: formattedChecklist, // Add the properly formatted AI-generated checklist to form data
        }))
        setLastProcessedTitle(title)
      }
    } catch (error) {
      console.error("Error generating AI description:", error)
      setHadGenerationError(true);
    }
  }, [generateUserStory, useAI, generateUniqueId])

  // Use the custom hook to handle AI description generation
  useAIDescriptionGeneration(
    formData.name,
    useAI,
    Boolean(formData.description?.trim()),
    hadGenerationError,
    lastProcessedTitle,
    generateDescription,
    () => setHadGenerationError(false)
  );

  // Handle form values change
  const handleValuesChange = useCallback((values: any) => {
    setFormData(values);
    
    // If title changes significantly and useAI is enabled, we should regenerate the description
    // on the next render cycle via useEffect
    // (the logic moved to useEffect above for simplicity)
  }, [])

  // Handle form submission
  const handleSubmit = useCallback(async (data: any) => {
    if (!data.name?.trim() || !data.columnId) {
      console.warn("Task name and column are required")
      return
    }

    setIsLoading(true)

    try {
      // IMPORTANT: Merge the current formData.checklist and acceptanceCriteria with the data being submitted
      // This ensures our manually rendered or AI-generated items are included in the submission
      const mergedData = {
        ...data,
        checklist: formData.checklist || [],
        acceptanceCriteria: formData.acceptanceCriteria || [],
      }
      
      // Transform form data to TaskDataSchema format
      const taskData = transformFormDataToTask(mergedData)
      
      // Create the task using the properly transformed data
      await createTask(data.columnId, taskData)

      // Reset form and close dialog
      setFormData(defaultFormValues)
      setIsOpen(false)
      onSuccess?.()
    } catch (error) {
      console.error("Failed to create task:", error)
      // You could add toast notification here
    } finally {
      setIsLoading(false)
    }
  }, [createTask, transformFormDataToTask, onSuccess, defaultFormValues, formData.checklist])

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
        
        if (!open) {
          // Reset form-related state when closing
          setFormData({ priority: 'medium' });
          setLastProcessedTitle('');
          setHadGenerationError(false);
        }
      }}
    >
      <Dialog.Trigger>
        <Button size="2" className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus size={16} />
          Add Task {useAI && <span className="ml-1 text-xs">(AI)</span>}
        </Button>
      </Dialog.Trigger>

      <Dialog.Content className="max-w-4xl max-h-[90vh] overflow-hidden">
        <Dialog.Header>
          <Dialog.Title>
            Create New Task {useAI && <span className="text-sm text-blue-500 ml-1">(AI Assisted)</span>}
          </Dialog.Title>
          <Dialog.Description>
            {useAI 
              ? "AI will help generate task details based on your inputs" 
              : "Add a comprehensive task with all necessary details"}
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
                  Status: {columns.find(col => col.id === (formData.columnId as string))?.name}
                </Text>
              )}
            </Box>
          )}

          {/* AI Status Message */}
          {useAI && (
            <div className="mb-4">
              {isGenerating && (
                <div className="flex items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-blue-600 dark:text-blue-300">
                  <Sparkles size={16} className="mr-2 animate-pulse" />
                  <span>AI is generating a task description...</span>
                </div>
              )}
              {aiError && (
                <div className="flex items-center p-2 bg-red-50 dark:bg-red-900/20 rounded text-red-600 dark:text-red-300">
                  <span className="mr-2">⚠️</span>
                  <span>{aiError}</span>
                </div>
              )}
              {lastProcessedTitle && !isGenerating && !aiError && formData.description && (
                <div className="flex items-center p-2 bg-green-50 dark:bg-green-900/20 rounded text-green-600 dark:text-green-300">
                  <Sparkles size={16} className="mr-2" />
                  <span>AI-generated description based on your title</span>
                </div>
              )}
            </div>
          )}
          
          <AutoForm
            formSchema={taskFormSchema.formSchema}
            fieldConfig={taskFormSchema.fieldConfig}
            onSubmit={handleSubmit}
            onValuesChange={handleValuesChange}

            values={formData}
            className="space-y-6"
          >
            {/* AI Generated Checklist Display - Below description field */}
            {useAI && formData.checklist && formData.checklist.length > 0 && (
              <div className="border rounded-md p-4 bg-white dark:bg-gray-800 mt-4 mb-5">
                <h4 className="text-sm font-medium mb-3 flex items-center">
                  <Sparkles size={16} className="mr-2 text-blue-500" />
                  AI Generated Checklist
                </h4>
                <div className="space-y-2">
                  {formData.checklist.map((item: { id: string; text: string; checked: boolean }) => (
                    <div key={item.id} className="flex items-start gap-2">
                      <input 
                        type="checkbox"
                        checked={item.checked || false}
                        onChange={() => {
                          // Toggle the checked state for this item
                          const updatedChecklist = (formData.checklist || []).map(
                            (checkItem: any) => checkItem.id === item.id 
                              ? { ...checkItem, checked: !checkItem.checked } 
                              : checkItem
                          )
                          setFormData(prev => ({ ...prev, checklist: updatedChecklist }))
                        }}
                        className="mt-1"
                      />
                      <span className={item.checked ? "line-through text-gray-500" : ""}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-4 flex justify-end">
              <Button
                type="submit"
                disabled={!formData.name?.trim() || !formData.columnId || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Task"
                )}
              </Button>
            </div>
          </AutoForm>
        </Box>

        <Dialog.Footer >
          <div className="flex justify-between items-center w-full">
            <Text size="1" className="text-gray-500">
              {formData.name ? `Creating: ${formData.name}` : "Fill in the task details"}
              {useAI && <span className="ml-1 text-blue-500">(AI will enhance your input)</span>}
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