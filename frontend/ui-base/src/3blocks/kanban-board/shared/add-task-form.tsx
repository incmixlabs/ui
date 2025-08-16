// components/board/add-task-form-autoform.tsx

import AutoForm from "@/auto-form"
import { Box, Button, Dialog, Text } from "@/base"
import { Icon } from "@/base"
import { useAIFeaturesStore, useAIUserStory } from "@incmix/store"
import type { TaskDataSchema } from "@incmix/utils/schema"
import { nanoid } from "nanoid"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useStreamingDisplay, useStreamingResponse } from "../../../hooks"
import { useKanban } from "../hooks/use-kanban-data"
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
  const [formData, setFormData] = useState<{
    name?: string
    description?: string
    statusId?: string
    priorityId?: string
    startDate?: number
    endDate?: number
    assignedTo?: any[]
    labelsTags?: any[]
    subTasks?: any[]
    [key: string]: any
  }>({})
  const [lastProcessedTitle, setLastProcessedTitle] = useState("")

  // Track if we're currently focusing the description field
  const _isDescriptionFocused = useRef(false)

  // Get AI features state
  const { useAI } = useAIFeaturesStore()

  // Get kanban data and operations
  const {
    columns,
    priorityLabels,
    createTask,
    isLoading: kanbanLoading,
  } = useKanban(projectId)

  // Create the schema with dynamic columns
  const taskFormSchema = useMemo(() => {
    if (columns.length === 0) return null
    return createTaskFormSchema(columns, priorityLabels)
  }, [columns, priorityLabels])

  // Set up default form values when schema is ready
  const defaultFormValues = useMemo(() => {
    if (!taskFormSchema || columns.length === 0) return {}

    // Get first available column for default status
    const defaultStatusId = columns[0]?.id || ""

    // Get first available priority for default
    const defaultPriorityId = priorityLabels[0]?.id || ""

    const defaults = {
      priorityId: defaultPriorityId,
      statusId: defaultStatusId,
      assignedTo: [],
      labelsTags: [],
      subTasks: [],
      refUrlsJson: JSON.stringify([]),
      name: "",
      description: "",
      startDate: null,
      endDate: null,
    }

    return defaults
  }, [taskFormSchema, columns, priorityLabels])

  // Initialize form data with defaults when component mounts or dialog opens
  useEffect(() => {
    if (defaultFormValues && Object.keys(defaultFormValues).length > 0) {
      // Only update if we're opening the dialog (isOpen is true)
      if (isOpen) {
        // Force a clean reset of form data when dialog opens
        setFormData({ ...defaultFormValues })
      }
    }
  }, [defaultFormValues, isOpen])

  // Generate unique ID helper (for any future use)
  const generateUniqueId = useCallback(
    (prefix?: string, length = 10): string => {
      const randomId = nanoid(length)
      return prefix ? `${prefix}-${randomId}` : randomId
    },
    []
  )

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
  const transformFormDataToTask = useCallback(
    (data: any): Partial<TaskDataSchema> => {
      return {
        name: data.name?.trim() || "",
        description: data.description?.trim() || "",
        priorityId: data.priorityId || priorityLabels[0]?.id || "",
        startDate: data.startDate || null,
        endDate: data.endDate || null,
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
            return data.refUrlsJson ? JSON.parse(data.refUrlsJson) : []
          } catch (error) {
            console.error("Failed to parse refUrlsJson:", error)
            return []
          }
        })(),

        // Transform subtasks - they're already in the correct format from the custom component
        subTasks: (data.subTasks || []).filter((subtask: any) =>
          subtask?.name?.trim()
        ),

        // Include the acceptance criteria (from AI generation)
        acceptanceCriteria: data.acceptanceCriteria || [],

        // Include the checklist (from AI generation or manually added)
        checklist: data.checklist || [],

        // Initialize empty arrays for other fields
        attachments: [],
        comments: [],
      }
    },
    [getColorForLabel, priorityLabels]
  )

  // Track if we've had a generation error for the current title
  const [_hadGenerationError, setHadGenerationError] = useState(false)

  // Fetch data from AI endpoint as event stream and format it for rendering
  const [streamingState, streamingActions] = useStreamingResponse<{
    userStory: {
      description: string
      acceptanceCriteria: string[]
      checklist: string[]
    }
  }>({
    endpoint: "/generate-user-story",
    method: "POST",
    body: { prompt: formData.name, userTier: "free", templateId: 1 },
  })

  // Function to take stream data and set it to form data
  const setFormDataFromStream = (data?: {
    description: string
    acceptanceCriteria: string[]
    checklist: string[]
  }) => {
    try {
      // const aiResult = await generateUserStory(title)
      if (data) {
        // Make sure checklist items have proper structure with id, text, checked fields
        const formattedChecklist = (data.checklist || []).map(
          (item: string) => ({
            id: generateUniqueId("cl"),
            text: item,
            checked: false,
          })
        )

        // Format acceptance criteria items
        const formattedAcceptanceCriteria = (data.acceptanceCriteria || []).map(
          (item: string) => ({
            id: generateUniqueId("ac"),
            text: item,
          })
        )
        console.log(data)
        setFormData((prev) => ({
          ...prev,
          description: data.description,
          acceptanceCriteria: formattedAcceptanceCriteria, // Add properly formatted acceptance criteria
          checklist: formattedChecklist, // Add the properly formatted AI-generated checklist to form data
        }))
        setLastProcessedTitle(formData.name || "")
      }
    } catch (error) {
      console.error("Error generating AI description:", error)
      setHadGenerationError(true)
    }
  }

  // Use callback to pass data to form
  useStreamingDisplay({
    streamingData: streamingState.data,
    isStreaming: streamingState.isStreaming,
    connectionStatus: streamingState.connectionStatus,
    onDataUpdate: (data) => {
      setFormDataFromStream(data.userStory)
    },
  })

  // Use the custom hook to handle AI description generation
  // useAIDescriptionGeneration(
  //   formData.name,
  //   useAI,
  //   Boolean(formData.description?.trim()),
  //   hadGenerationError,
  //   lastProcessedTitle,
  //   generateDescription,
  //   () => setHadGenerationError(false)
  // );

  // Handle form values change
  const handleValuesChange = useCallback((values: any) => {
    setFormData(values)

    // If title changes significantly and useAI is enabled, we should regenerate the description
    // on the next render cycle via useEffect
    // (the logic moved to useEffect above for simplicity)
  }, [])

  // Handle form submission
  const handleSubmit = useCallback(
    async (data: any) => {
      if (!data.name?.trim() || !data.statusId) {
        console.warn("Task name and status are required")
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
        await createTask(data.statusId, taskData)

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
    },
    [
      createTask,
      transformFormDataToTask,
      onSuccess,
      defaultFormValues,
      formData.checklist,
      formData.acceptanceCriteria,
    ]
  )

  // Don't render if columns are still loading or no schema available
  if (kanbanLoading || !taskFormSchema) {
    return (
      <Button size="2" disabled>
        <Icon name="Plus" />
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
          setFormData({})
          setLastProcessedTitle("")
          setHadGenerationError(false)
        }
      }}
    >
      <Dialog.Trigger>
        <Button size="2" className="bg-blue-600 text-white hover:bg-blue-700">
          <Icon name="Plus" />
          Add Task {useAI && <span className="ml-1 text-xs">(AI)</span>}
        </Button>
      </Dialog.Trigger>

      <Dialog.Content className="max-h-[90vh] max-w-4xl overflow-hidden">
        <Dialog.Header>
          <Dialog.Title>
            Create New Task{" "}
            {useAI && (
              <span className="ml-1 text-blue-500 text-sm">(AI Assisted)</span>
            )}
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
            <Box className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-900/20">
              <Text
                size="2"
                weight="medium"
                className="text-blue-700 dark:text-blue-300"
              >
                📝 Task Preview: {formData.name}
              </Text>
              {formData.statusId && (
                <Text
                  size="1"
                  className="mt-1 text-blue-600 dark:text-blue-400"
                >
                  Status:{" "}
                  {
                    columns.find(
                      (col) => col.id === (formData.statusId as string)
                    )?.name
                  }
                </Text>
              )}
            </Box>
          )}

          {/* AI Status Message */}

          {useAI && (
            <div className="mb-4 flex flex-col gap-2">
              <div className="flex gap-2">
                <Button
                  onClick={() => streamingActions.startStreaming()}
                  disabled={
                    streamingState.isStreaming || !formData.name?.trim().length
                  }
                >
                  {streamingState.isStreaming ? (
                    <>
                      <Icon name="Loader" className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>Generate User Story</>
                  )}
                </Button>
                {streamingState.isStreaming && (
                  <Button onClick={() => streamingActions.stopStreaming()}>
                    Stop Streaming
                  </Button>
                )}
                <span className="font-medium text-sm capitalize">
                  {streamingState.connectionStatus}
                </span>
              </div>

              {streamingState.isStreaming &&
                streamingState.connectionStatus === "connected" && (
                  <div className="flex items-center rounded bg-blue-50 p-2 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300">
                    <Icon name="Sparkles" className="mr-2 animate-pulse" />
                    <span>AI is generating a task description...</span>
                  </div>
                )}

              {streamingState.error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700">
                  <strong>Error:</strong> {streamingState.error}
                </div>
              )}
              {lastProcessedTitle &&
                !streamingState.isStreaming &&
                !streamingState.error &&
                formData.description && (
                  <div className="flex items-center rounded bg-green-50 p-2 text-green-600 dark:bg-green-900/20 dark:text-green-300">
                    <Icon name="Sparkles" className="mr-2" />
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
            {formData.checklist && formData.checklist.length > 0 && (
              <div className="mt-4 mb-5 rounded-md border bg-white p-4 dark:bg-gray-800">
                <h4 className="mb-3 flex items-center font-medium text-sm">
                  <Icon name="Sparkles" className="mr-2 text-blue-500" />
                  AI Generated Checklist
                </h4>
                <div className="space-y-2">
                  {formData.checklist.map(
                    (item: { id: string; text: string; checked: boolean }) => (
                      <div key={item.id} className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={item.checked || false}
                          onChange={() => {
                            // Toggle the checked state for this item
                            const updatedChecklist = (
                              formData.checklist || []
                            ).map((checkItem: any) =>
                              checkItem.id === item.id
                                ? { ...checkItem, checked: !checkItem.checked }
                                : checkItem
                            )
                            setFormData((prev) => ({
                              ...prev,
                              checklist: updatedChecklist,
                            }))
                          }}
                          className="mt-1"
                        />
                        <span
                          className={
                            item.checked ? "text-gray-500 line-through" : ""
                          }
                        >
                          {item.text}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
            {formData.acceptanceCriteria &&
              formData.acceptanceCriteria.length > 0 && (
                <div className="mt-4 mb-5 rounded-md border bg-white p-4 dark:bg-gray-800">
                  <h4 className="mb-3 flex items-center font-medium text-sm">
                    <Icon name="Sparkles" className="mr-2 text-blue-500" />
                    AI Generated Acceptance Criteria
                  </h4>
                  <div className="space-y-2">
                    {formData.acceptanceCriteria.map(
                      (item: {
                        id: string
                        text: string
                        checked: boolean
                      }) => (
                        <div key={item.id} className="flex items-start gap-2">
                          <input
                            type="checkbox"
                            checked={item.checked || false}
                            onChange={() => {
                              // Toggle the checked state for this item
                              const updatedAcceptanceCriteria = (
                                formData.acceptanceCriteria || []
                              ).map((checkItem: any) =>
                                checkItem.id === item.id
                                  ? {
                                      ...checkItem,
                                      checked: !checkItem.checked,
                                    }
                                  : checkItem
                              )
                              setFormData((prev) => ({
                                ...prev,
                                acceptanceCriteria: updatedAcceptanceCriteria,
                              }))
                            }}
                            className="mt-1"
                          />
                          <span
                            className={
                              item.checked ? "text-gray-500 line-through" : ""
                            }
                          >
                            {item.text}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

            <div className="mt-4 flex justify-end">
              <Button
                type="submit"
                disabled={
                  !formData.name?.trim() || !formData.statusId || isLoading
                }
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                {isLoading ? (
                  <>
                    <Icon name="Loader" className="mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Task"
                )}
              </Button>
            </div>
          </AutoForm>
        </Box>

        <Dialog.Footer>
          <div className="flex w-full items-center justify-between">
            <Text size="1" className="text-gray-500">
              {formData.name
                ? `Creating: ${formData.name}`
                : "Fill in the task details"}
              {useAI && (
                <span className="ml-1 text-blue-500">
                  (AI will enhance your input)
                </span>
              )}
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
