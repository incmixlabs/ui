import type { TaskDataSchema } from "@incmix/utils/schema"
// task-card-components/hooks/use-task-drawer-state.ts
import { useEffect, useState } from "react"

export function useTaskDrawerState(currentTask: TaskDataSchema | null) {
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
  const [isMemberPickerOpen, setIsMemberPickerOpen] = useState(false)

  // Update local state when task changes
  useEffect(() => {
    if (currentTask) {
      setEditTitle(currentTask.name)
      setEditDescription(currentTask.description || "")
      setStartDate(
        currentTask.startDate ? new Date(currentTask.startDate) : null
      )
      setEndDate(currentTask.endDate ? new Date(currentTask.endDate) : null)
    }
  }, [currentTask])

  return {
    // Editing states
    isEditingTitle,
    setIsEditingTitle,
    isEditingDescription,
    setIsEditingDescription,
    editTitle,
    setEditTitle,
    editDescription,
    setEditDescription,

    // Loading and confirmation states
    isLoading,
    setIsLoading,
    showDeleteConfirmation,
    setShowDeleteConfirmation,

    // Subtask states
    isAddingSubtask,
    setIsAddingSubtask,
    newSubtaskName,
    setNewSubtaskName,

    // Comment states
    newComment,
    setNewComment,

    // Tag states
    isAddingTag,
    setIsAddingTag,
    newTagName,
    setNewTagName,
    newTagColor,
    setNewTagColor,

    // Date states
    startDate,
    setStartDate,
    endDate,
    setEndDate,

    // Member picker state
    isMemberPickerOpen,
    setIsMemberPickerOpen,
  }
}
