import { Box, Button, Flex, Text, TextArea, TextField } from "@/base"
import { useStreamingDisplay, useStreamingResponse } from "@/hooks/stream"
import { useAIFeaturesStore } from "@incmix/store"
import type { TaskDataSchema } from "@incmix/utils/schema"
import { Check, Loader2, Plus, Sparkles, X } from "lucide-react"
import { nanoid } from "nanoid"
import { useCallback, useState } from "react"
import { TaskActionsMenu } from "./task-actions-menu"

interface TaskFormData {
  priorityId: string
  startDate: string
  endDate: string
  assignedTo: Array<{
    id: string
    name: string
    image?: string
  }>
  columnId: string
  description?: string
  checklist?: Array<{ id: string; text: string; checked: boolean }>
  acceptanceCriteria?: Array<{ id: string; text: string }>
}

interface SimpleTaskInputProps {
  onCreateTask: (taskName: string, taskData: TaskFormData) => Promise<void>
  onCancel: () => void
  columns?: TaskDataSchema[]
  placeholder?: string
  disabled?: boolean
  priorityLabels?: Array<{
    id: string
    name: string
    color: string
    type: string
  }>
}

export function SimpleTaskInput({
  onCreateTask,
  onCancel,
  columns = [],
  placeholder = "Enter task title...",
  disabled = false,
  priorityLabels = [],
}: SimpleTaskInputProps) {
  // Get AI features state
  const { useAI } = useAIFeaturesStore()

  // Form state
  const [taskName, setTaskName] = useState("")
  const [description, setDescription] = useState("")
  const [checklist, setChecklist] = useState<
    Array<{ id: string; text: string; checked: boolean }>
  >([])
  const [acceptanceCriteria, setAcceptanceCriteria] = useState<
    Array<{ id: string; text: string }>
  >([])
  const [taskData, setTaskData] = useState<Omit<TaskFormData, 'description' | 'checklist' | 'acceptanceCriteria'>>({
    priorityId: "", // Will be populated in handleSubmit using priorityLabels
    startDate: "",
    endDate: "",
    assignedTo: [],
    columnId: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Generate unique ID helper
  const generateUniqueId = useCallback(
    (prefix?: string, length = 10): string => {
      const randomId = nanoid(length)
      return prefix ? `${prefix}-${randomId}` : randomId
    },
    []
  )

  const handleTaskDataChange = useCallback((newData: Partial<TaskFormData>) => {
    setTaskData((prev) => ({ ...prev, ...newData }))
  }, [])

  // Fetch data from AI endpoint as event stream
  const [streamingState, streamingActions] = useStreamingResponse<{
    userStory: {
      description: string
      acceptanceCriteria: string[]
      checklist: string[]
    }
  }>({
    endpoint: "/generate-user-story",
    method: "POST",
    body: { prompt: taskName, userTier: "free", templateId: 1 },
  })

  // Function to process streaming data and update form
  const setFormDataFromStream = useCallback(
    (data?: {
      description: string
      acceptanceCriteria: string[]
      checklist: string[]
    }) => {
      if (data) {
        // Set description
        setDescription(data.description || "")

        // Format checklist items
        const formattedChecklist = (data.checklist || []).map(
          (item, _index) => ({
            id: generateUniqueId("cl"),
            text: item,
            checked: false,
          })
        )
        setChecklist(formattedChecklist)

        // Format acceptance criteria items
        const formattedAcceptanceCriteria = (data.acceptanceCriteria || []).map(
          (item, _index) => ({
            id: generateUniqueId("ac"),
            text: item,
          })
        )
        setAcceptanceCriteria(formattedAcceptanceCriteria)
      }
    },
    [generateUniqueId]
  )

  // Connect streaming data to form updates
  useStreamingDisplay({
    streamingData: streamingState.data,
    isStreaming: streamingState.isStreaming,
    connectionStatus: streamingState.connectionStatus,
    onDataUpdate: (data) => {
      setFormDataFromStream(data.userStory)
    },
  })

  const handleSubmit = useCallback(async () => {
    if (!taskName.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      // Use the same approach as board view - set default priority to first available
      const defaultPriority =
        priorityLabels && priorityLabels.length > 0 ? priorityLabels[0].id : ""

      // Include the description, checklist, acceptanceCriteria, and default priority
      const fullTaskData = {
        ...taskData,
        description: description.trim(),
        checklist: checklist,
        acceptanceCriteria: acceptanceCriteria,
        priorityId: defaultPriority, // Use first priority label by default
      }

      await onCreateTask(taskName.trim(), fullTaskData)

      // Reset form
      setTaskName("")
      setDescription("")
      setChecklist([])
      setAcceptanceCriteria([])
      setTaskData({
        priorityId: "",
        startDate: "",
        endDate: "",
        assignedTo: [],
        columnId: "",
      })
    } catch (error) {
      console.error("Failed to create task:", error)
    } finally {
      setIsSubmitting(false)
    }
  }, [
    taskName,
    description,
    taskData,
    onCreateTask,
    isSubmitting,
    priorityLabels,
  ])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault()
        handleSubmit()
      } else if (e.key === "Escape") {
        e.preventDefault()
        onCancel()
      }
    },
    [handleSubmit, onCancel]
  )

  return (
    <Box className="space-y-3 rounded-lg border bg-white p-3 shadow-sm dark:bg-gray-800">
      {/* Task Input with Actions Menu */}
      <Flex gap="2" align="center">
        <TextField.Root
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || isSubmitting}
          className="flex-1"
          autoFocus
        />

        {/* Task Actions Menu for setting properties */}
        <TaskActionsMenu
          mode="new-task"
          newTaskData={taskData}
          columns={columns}
          priorityLabels={priorityLabels}
          onNewTaskDataChange={handleTaskDataChange}
          disabled={disabled || isSubmitting}
          size="2"
          variant="soft"
        />
      </Flex>

      {/* Description field */}
      {useAI && taskName.trim() && (
        <Button
          onClick={() => streamingActions.startStreaming()}
          disabled={
            streamingState.isStreaming ||
            !taskName.trim() ||
            isSubmitting ||
            disabled
          }
          size="1"
          className="my-2"
        >
          {streamingState.isStreaming ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Description
            </>
          )}
        </Button>
      )}

      <TextArea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={
          useAI
            ? "Generate description with AI or enter manually..."
            : "Enter task description..."
        }
        rows={3}
        disabled={disabled || isSubmitting || streamingState.isStreaming}
      />

      {/* AI Status Indicator */}
      {useAI && (
        <Box className="text-xs">
          {streamingState.isStreaming && (
            <Flex align="center" gap="1" className="text-blue-11">
              <Loader2 size={12} className="animate-spin" />
              <Text>Generating description...</Text>
            </Flex>
          )}
          {streamingState.error && (
            <Text className="text-red-11">
              Failed to generate description: {streamingState.error}
            </Text>
          )}
          {!streamingState.isStreaming &&
            !streamingState.error &&
            description &&
            streamingState.connectionStatus === "completed" && (
              <Flex align="center" gap="1" className="text-green-11">
                <Check size={12} />
                <Text>AI description generated</Text>
              </Flex>
            )}
        </Box>
      )}

      {/* Action Buttons */}
      <Flex gap="2" className="mt-2">
        <Button
          onClick={handleSubmit}
          disabled={
            !taskName.trim() || isSubmitting || streamingState.isStreaming
          }
          className="flex-1"
          size="2"
        >
          <Plus size={16} />
          {isSubmitting ? "Adding..." : "Add Task"}
        </Button>
        <Button
          onClick={() => {
            // Cancel streaming if in progress
            if (streamingState.isStreaming) {
              streamingActions.stopStreaming()
            }
            onCancel()
          }}
          variant="soft"
          disabled={isSubmitting}
          size="2"
        >
          <X size={16} />
          Cancel
        </Button>
      </Flex>
    </Box>
  )
}
