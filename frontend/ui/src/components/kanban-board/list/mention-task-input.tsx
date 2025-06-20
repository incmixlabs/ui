// components/shared/simple-task-input.tsx
import React, { useState, useCallback, useEffect } from "react"
import { Box, Flex, Button, TextField, TextArea, Text } from "@incmix/ui"
import { Plus, X, Loader2, Check } from "lucide-react"
import { TaskActionsMenu } from "./task-actions-menu"
import { useAIUserStory, useAIFeaturesStore, type TaskStatusDocType } from "@incmix/store"

interface SimpleTaskInputProps {
  onCreateTask: (taskName: string, taskData: any) => Promise<void>
  onCancel: () => void
  columns?: TaskStatusDocType[]
  placeholder?: string
  disabled?: boolean
}

export function SimpleTaskInput({
  onCreateTask,
  onCancel,
  columns = [],
  placeholder = "Enter task title...",
  disabled = false
}: SimpleTaskInputProps) {
  // Get AI features state
  const { useAI } = useAIFeaturesStore()
  
  // Form state
  const [taskName, setTaskName] = useState("")
  const [description, setDescription] = useState("")
  const [taskData, setTaskData] = useState({
    priority: "medium",
    startDate: "",
    endDate: "",
    assignedTo: [],
    columnId: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hadGenerationError, setHadGenerationError] = useState(false)
  
  // AI description generation hook
  const { 
    generateUserStory, 
    isGenerating, 
    error: generationError, 
    clearError: resetError 
  } = useAIUserStory()

  const handleTaskDataChange = useCallback((newData: any) => {
    setTaskData(prev => ({ ...prev, ...newData }))
  }, [])
  
  // Generate description when task name changes (if AI enabled)
  useEffect(() => {
    // Only generate if AI is enabled, task name has content, and description is empty
    if (useAI && taskName.trim() && !description && !hadGenerationError) {
      // Add a delay to avoid generating on every keystroke
      const timer = setTimeout(async () => {
        try {
          const generatedDescription = await generateUserStory(taskName)
          if (generatedDescription) {
            setDescription(generatedDescription)
          }
        } catch (error) {
          console.error("AI description generation failed:", error)
          setHadGenerationError(true)
        }
      }, 1000) // 1 second delay

      return () => clearTimeout(timer)
    }
  }, [taskName, useAI, description, generateUserStory, hadGenerationError])

  // Reset error state when task name changes
  useEffect(() => {
    if (hadGenerationError) {
      setHadGenerationError(false)
      resetError()
    }
  }, [taskName, resetError, hadGenerationError])

  const handleSubmit = useCallback(async () => {
    if (!taskName.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      // Include the description in the task data
      const fullTaskData = {
        ...taskData,
        description: description.trim()
      }
      
      await onCreateTask(taskName.trim(), fullTaskData)
      
      // Reset form
      setTaskName("")
      setDescription("")
      setTaskData({
        priority: "medium",
        startDate: "",
        endDate: "",
        assignedTo: [],
        columnId: ""
      })
    } catch (error) {
      console.error("Failed to create task:", error)
    } finally {
      setIsSubmitting(false)
    }
  }, [taskName, description, taskData, onCreateTask, isSubmitting])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSubmit()
    } else if (e.key === "Escape") {
      e.preventDefault()
      onCancel()
    }
  }, [handleSubmit, onCancel])

  return (
    <Box className="space-y-3 p-3 bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
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
          onNewTaskDataChange={handleTaskDataChange}
          disabled={disabled || isSubmitting}
          size="2"
          variant="soft"
        />
      </Flex>
      
      {/* Description field */}
      <TextArea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={useAI ? "AI will generate description based on title..." : "Enter task description..."}
        rows={3}
        disabled={disabled || isSubmitting || isGenerating}
      />
      
      {/* AI Status Indicator */}
      {useAI && taskName.trim() && (
        <Box className="text-xs">
          {isGenerating && (
            <Flex align="center" gap="1" className="text-blue-500">
              <Loader2 size={12} className="animate-spin" />
              <Text>Generating description...</Text>
            </Flex>
          )}
          {generationError && (
            <Text className="text-red-500">Failed to generate description</Text>
          )}
          {!isGenerating && !generationError && description && (
            <Flex align="center" gap="1" className="text-green-600">
              <Check size={12} />
              <Text>AI description generated</Text>
            </Flex>
          )}
        </Box>
      )}

      {/* Action Buttons */}
      <Flex gap="2">
        <Button 
          onClick={handleSubmit}
          disabled={!taskName.trim() || isSubmitting}
          className="flex-1"
          size="2"
        >
          <Plus size={16} />
          {isSubmitting ? "Adding..." : "Add Task"}
        </Button>
        <Button 
          onClick={onCancel}
          variant="soft" 
          disabled={isSubmitting}
          size="2"
        >
          <X size={16} />
          Cancel
        </Button>
      </Flex>

      {/* Preview of selected options */}
      {(taskData.priority !== "medium" || 
        taskData.assignedTo.length > 0 || 
        taskData.startDate || 
        taskData.endDate) && (
        <Box className="pt-2 border-t border-gray-200">
          <Flex gap="2" wrap="wrap" className="text-xs">
            {taskData.priority !== "medium" && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                Priority: {taskData.priority}
              </span>
            )}
            {taskData.assignedTo.length > 0 && (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                Assigned: {taskData.assignedTo.length} member{taskData.assignedTo.length > 1 ? 's' : ''}
              </span>
            )}
            {taskData.startDate && (
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">
                Start: {new Date(taskData.startDate).toLocaleDateString()}
              </span>
            )}
            {taskData.endDate && (
              <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">
                Due: {new Date(taskData.endDate).toLocaleDateString()}
              </span>
            )}
          </Flex>
        </Box>
      )}
    </Box>
  )
}