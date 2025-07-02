// File: use-project-task-data.ts

import type {
  CurrentUser,
  ProjectData,
  TaskDataSchema,
  LabelSchema,
  UseProjectDataReturn,
} from "@incmix/utils/schema"
import { DEFAULT_LABELS } from "@incmix/utils/schema"
import { useCallback, useEffect, useRef, useState } from "react"
import type { Subscription } from "rxjs"
import { database } from "sql"
import type { TaskDocType, LabelDocType } from "sql/types"
// Import browser-compatible helpers instead of Node.js Buffer-using ones
import {
  generateBrowserUniqueId,
  getCurrentTimestamp,
} from "../utils/browser-helpers"

// Get the current user - accepts user context to make it injectable
const getCurrentUser = (user?: CurrentUser) => {
  if (!user) {
    // For backward compatibility in dev, return a mock user with a console warning
    console.warn("Warning: No user context provided. Using mock user data.")
    return {
      id: "mock-user-id",
      name: "Mock User",
      image: "/placeholder.svg",
    }
  }

  return {
    id: user.id,
    name: user.name,
    image: user.image || "/placeholder.svg",
  }
}

// Instead of defining default labels here, we'll use the DEFAULT_LABELS constant
// from @incmix/utils/schema which contains both status and priority labels

export function useProjectData(
  projectId = "default-project",
  currentUser?: CurrentUser
): UseProjectDataReturn {
  const [data, setData] = useState<ProjectData>({
    tasks: [],
    labels: [],
    isLoading: true,
    error: null,
  })

  // Track subscriptions for cleanup
  const subscriptionsRef = useRef<{
    tasks?: Subscription
    labels?: Subscription
  }>({})

  // Initialize reactive subscriptions
  useEffect(() => {
    const setupReactiveData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true, error: null }))

        // Check and create default labels if needed - Using find() instead of count() to avoid RxDB restriction
        const existingLabels = await database.labels
          .find({ selector: { projectId, type: "status" } })
          .exec()
        const existingLabelsCount = existingLabels.length

        if (existingLabelsCount === 0) {
          await createDefaultLabels(projectId)
        }

        // Set up reactive subscription for labels (both status and priority labels)
        subscriptionsRef.current.labels = database.labels
          .find({
            selector: { projectId },
            sort: [{ order: "asc" }], // Changed from labelOrder to order to match schema
          })
          .$.subscribe({
            next: (labelDocs: Array<{ toJSON(): LabelDocType }>) => {
              const labels = labelDocs.map(
                (doc: { toJSON(): LabelDocType }) => doc.toJSON()
              )
              setData((prev) => {
                // Handle type compatibility with LabelSchema - proper mapping instead of type assertion
                const typeSafeLabels: LabelSchema[] = labels.map(l => ({
                  ...l,
                  color: l.color || "#6E6E6E", // Ensure color is never undefined
                  description: l.description || "", // Ensure description is never undefined
                  // Ensure all required properties are present with correct types
                  id: l.id,
                  projectId: l.projectId,
                  type: l.type as "status" | "priority",
                  name: l.name,
                  order: l.order,
                  createdAt: l.createdAt,
                  updatedAt: l.updatedAt,
                  createdBy: l.createdBy,
                  updatedBy: l.updatedBy
                }))
                
                return {
                  ...prev,
                  labels: typeSafeLabels,
                  isLoading: false,
                }
              })
            },
            error: (error: Error) => {
              console.error("Labels subscription error:", error)
              setData((prev) => ({
                ...prev,
                error: "Failed to load labels",
                isLoading: false,
              }))
            },
          })

        // Set up reactive subscription for tasks
        subscriptionsRef.current.tasks = database.tasks
          .find({
            selector: { projectId },
            sort: [{ statusId: "asc" }, { taskOrder: "asc" }],
          })
          .$.subscribe({
            next: (taskDocs) => {
              const tasks = taskDocs.map((doc) => {
                const task = doc.toJSON()
                return {
                  ...task,
                  completed: task.completed ?? false,
                } as TaskDataSchema
              })
              setData((prev) => ({
                ...prev,
                tasks,
                isLoading: false,
              }))
            },
            error: (error: Error) => {
              console.error("Tasks subscription error:", error)
              setData((prev) => ({
                ...prev,
                error: "Failed to load tasks",
                isLoading: false,
              }))
            },
          })
      } catch (error) {
        console.error("Failed to setup reactive data:", error)
        setData((prev) => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to initialize data",
        }))
      }
    }

    setupReactiveData()

    // Cleanup subscriptions on unmount or projectId change
    return () => {
      if (subscriptionsRef.current.tasks) {
        subscriptionsRef.current.tasks.unsubscribe()
      }
      if (subscriptionsRef.current.labels) {
        subscriptionsRef.current.labels.unsubscribe()
      }
    }
  }, [projectId])

  /**
   * Create default labels (statuses and priorities) for a project
   */
  const createDefaultLabels = async (projectId: string) => {
    const now = getCurrentTimestamp()
    const user = getCurrentUser(currentUser)

    const newLabels: LabelSchema[] = DEFAULT_LABELS.map((label, index) => ({
      id: generateBrowserUniqueId("label"),
      projectId,
      name: label.name,
      type: label.type as "status" | "priority",
      order: index,  // Using 'order' as specified in LabelSchema instead of 'labelOrder'
      color: label.color || "#6E6E6E", // Default color if none provided
      description: label.description || "", // Default empty description
      createdAt: now,
      updatedAt: now,
      createdBy: user,
      updatedBy: user,
    }))

    // Insert all labels at once
    for (const label of newLabels) {
      await database.labels.insert(label as LabelDocType)
    }

    return newLabels
  }

  // Task operations - simplified without manual state management
  const createTask = useCallback(
    async (statusId: string, taskData: Partial<TaskDataSchema>) => {
      try {
        const now = getCurrentTimestamp()
        const user = getCurrentUser(currentUser)
        
        // Ensure we have a valid priorityId - required field validation
        if (!taskData.priorityId) {
          // Find default priority (medium or first available)
          const defaultPriority = data.labels.find(
            (l) => l.type === "priority" && l.name.toLowerCase() === "medium"
          ) || data.labels.find((l) => l.type === "priority")
          
          if (!defaultPriority) {
            throw new Error("No priority labels found. Cannot create task.")
          }
          
          taskData.priorityId = defaultPriority.id
        }

        // Get highest order in target status column
        const tasksInStatus = data.tasks.filter((t) => t.statusId === statusId)
        const maxOrder = Math.max(...tasksInStatus.map((t) => t.taskOrder || 0), -1)

        // Transform any array items to ensure they have required fields like 'order' and 'checked'
        const processedAcceptanceCriteria = (
          taskData.acceptanceCriteria || []
        ).map((item, index) => ({
          id: item.id || generateBrowserUniqueId("ac"),
          text: item.text || "",
          checked: item.checked ?? false,
          order: item.order ?? index, // Keep as 'order' to match the expected types
        }))

        const processedChecklist = (taskData.checklist || []).map(
          (item, index) => ({
            id: item.id || generateBrowserUniqueId("cl"),
            text: item.text || "",
            checked: item.checked ?? false,
            order: item.order ?? index, // Keep as 'order' to match the expected types
          })
        )

        const processedSubTasks = (taskData.subTasks || []).map(
          (item, index) => ({
            id: item.id || generateBrowserUniqueId("st"),
            name: item.name || "",
            completed: item.completed ?? false,
            order: item.order ?? index, // Keep as 'order' to match the expected types
          })
        )

        const newTask: TaskDataSchema = {
          id: generateBrowserUniqueId("task"),
          projectId,
          name: taskData.name || "New Task",
          statusId, // Changed from columnId to statusId
          taskOrder: maxOrder + 1, // Changed from order to taskOrder
          startDate: taskData.startDate ? Number(new Date(taskData.startDate)) : Number(new Date()),
          endDate: taskData.endDate ? Number(new Date(taskData.endDate)) : 0,
          description: taskData.description || "",
          completed: taskData.completed ?? false,
          priorityId: taskData.priorityId, // Changed from priority to priorityId - now validated above
          refUrls: taskData.refUrls || [],
          labelsTags: taskData.labelsTags || [],
          attachments: taskData.attachments || [],
          assignedTo: taskData.assignedTo || [],
          subTasks: processedSubTasks,
          comments: taskData.comments || [],
          // Removed commentsCount as it's no longer part of the schema
          // Use processed arrays that ensure schema compliance
          checklist: processedChecklist,
          acceptanceCriteria: processedAcceptanceCriteria,
          createdAt: now,
          updatedAt: now,
          createdBy: user,
          updatedBy: user,
        }

        // Insert with proper typing - RxDB subscription will update UI automatically
        await database.tasks.insert(newTask as TaskDocType)
      } catch (error) {
        console.error("Failed to create task:", error)
        throw error
      }
    },
    [data.tasks, projectId]
  )

  const updateTask = useCallback(
    async (id: string, updates: Partial<TaskDataSchema>) => {
      try {
        const now = getCurrentTimestamp()
        const user = getCurrentUser(currentUser)

        // Process array updates if present to ensure schema compliance
        const processedUpdates = { ...updates }

        // Handle acceptanceCriteria updates
        if (updates.acceptanceCriteria) {
          processedUpdates.acceptanceCriteria = updates.acceptanceCriteria.map(
            (item, index) => ({
              id: item.id || generateBrowserUniqueId("ac"),
              text: item.text || "",
              checked: item.checked ?? false,
              order: item.order ?? index,
            })
          )
        }

        // Handle checklist updates
        if (updates.checklist) {
          processedUpdates.checklist = updates.checklist.map((item, index) => ({
            id: item.id || generateBrowserUniqueId("cl"),
            text: item.text || "",
            checked: item.checked ?? false,
            order: item.order ?? index,
          }))
        }

        // Handle subTasks updates
        if (updates.subTasks) {
          processedUpdates.subTasks = updates.subTasks.map((item, index) => ({
            id: item.id || generateBrowserUniqueId("st"),
            name: item.name || "",
            completed: item.completed ?? false,
            order: item.order ?? index,
          }))
        }

        const finalUpdates = {
          ...processedUpdates,
          updatedAt: now,
          updatedBy: user,
        }

        const task = await database.tasks
          .findOne({ selector: { id } }) // Updated from taskId to id
          .exec()
        if (!task) throw new Error("Task not found")

        // Just update - RxDB subscription will handle UI update
        await task.update({ $set: finalUpdates })
      } catch (error) {
        console.error("Failed to update task:", error)
        throw error
      }
    },
    []
  )

  const deleteTask = useCallback(async (id: string) => {
    try {
      const task = await database.tasks.findOne({ selector: { id } }).exec() // Updated from taskId to id
      if (task) {
        // Just remove - RxDB subscription will update UI
        await task.remove()
      }
    } catch (error) {
      console.error("Failed to delete task:", error)
      throw error
    }
  }, [])

  const moveTask = useCallback(
    async (id: string, targetStatusId: string, targetIndex?: number) => {
      try {
        const now = getCurrentTimestamp()
        const user = getCurrentUser(currentUser)

        // Simplified order calculation for RxDB/local storage
        const targetTasks = data.tasks
          .filter((t) => t.statusId === targetStatusId && t.id !== id) // Updated field names
          .sort((a, b) => a.taskOrder - b.taskOrder) // Updated to taskOrder

        let newTaskOrder: number // Updated variable name
        if (targetIndex === undefined || targetIndex >= targetTasks.length) {
          // Add to end
          newTaskOrder = // Updated variable name
            targetTasks.length > 0
              ? targetTasks[targetTasks.length - 1].taskOrder + 1000 // Updated to taskOrder
              : 1000
        } else if (targetIndex <= 0) {
          // Add to beginning
          newTaskOrder = // Updated variable name
            targetTasks.length > 0
              ? Math.max(targetTasks[0].taskOrder - 1000, 100) // Updated to taskOrder
              : 1000
        } else {
          // Insert between tasks
          const prevOrder = targetTasks[targetIndex - 1].taskOrder // Updated to taskOrder
          const nextOrder = targetTasks[targetIndex].taskOrder // Updated to taskOrder
          newTaskOrder = (prevOrder + nextOrder) / 2 // Updated variable name
        }

        const task = await database.tasks
          .findOne({ selector: { id } }) // Updated from taskId to id
          .exec()
        if (!task) throw new Error("Task not found")

        // Just update - RxDB subscription handles UI
        await task.update({
          $set: {
            statusId: targetStatusId, // Updated from columnId to statusId
            taskOrder: newTaskOrder, // Updated from order to taskOrder
            updatedAt: now,
            updatedBy: user,
          },
        })

        // Optional: Clean up order values if they get too close to 0
        if (newTaskOrder < 1) {
          setTimeout(() => reorderStatusTasks(targetStatusId), 100)
        }
      } catch (error) {
        console.error("Failed to move task:", error)
        throw error
      }
    },
    [data.tasks]
  )

  // Helper to clean up order values when they get too small
  const reorderStatusTasks = async (statusId: string) => {
    try {
      const now = getCurrentTimestamp()
      const user = getCurrentUser(currentUser)

      const statusTasks = data.tasks
        .filter((t) => t.statusId === statusId) 
        .sort((a, b) => a.taskOrder - b.taskOrder) // Updated from order to taskOrder

      if (statusTasks.length <= 1) return
      
      // Update each task with clean order values
      for (let i = 0; i < statusTasks.length; i++) {
        const task = await database.tasks
          .findOne({ selector: { id: statusTasks[i].id } }) // Updated from taskId to id
          .exec()
        if (task) {
          await task.update({
            $set: {
              taskOrder: (i + 1) * 1000, // Give plenty of space, updated from order to taskOrder
              updatedAt: now,
              updatedBy: user,
            },
          })
        }
      }
    } catch (error) {
      console.error("Failed to reorder status tasks:", error)
    }
  }

  /**
   * Create a new label (either status or priority)
   */
  const createLabel = useCallback(
    async (
      type: "status" | "priority",
      name: string,
      color = "#6366f1",
      description = ""
    ): Promise<string> => {
      try {
        const now = getCurrentTimestamp()
        const user = getCurrentUser(currentUser)
        
        // Find the highest order in the current labels of this type
        const labelsOfType = data.labels.filter(l => l.type === type)
        const maxOrder = Math.max(...labelsOfType.map(l => l.order), -1)
        
        const newLabel: LabelSchema = {
          id: generateBrowserUniqueId("label"),
          projectId,
          name,
          type,
          order: maxOrder + 1,
          color,
          description,
          createdAt: now,
          updatedAt: now,
          createdBy: user,
          updatedBy: user,
        }
        
        // Insert with proper typing - RxDB subscription will update UI
        await database.labels.insert(newLabel as LabelDocType)
        return newLabel.id
      } catch (error) {
        console.error("Failed to create label:", error)
        throw error
      }
    },
    []
  )

  /**
   * Delete a label (either status or priority)
   */
  const deleteLabel = useCallback(
    async (labelId: string) => {
      try {
        // Get the label to check its type
        const label = await database.labels
          .findOne({ selector: { id: labelId } })
          .exec()
        
        if (!label) {
          throw new Error("Label not found")
        }
        
        // If it's a status label, check if there are tasks using it
        if (label.get('type') === 'status') {
          const tasksUsingLabel = data.tasks.filter((t) => t.statusId === labelId)
          if (tasksUsingLabel.length > 0) {
            throw new Error("Cannot delete status with tasks. Move tasks first.")
          }
        } else if (label.get('type') === 'priority') {
          const tasksUsingLabel = data.tasks.filter((t) => t.priorityId === labelId)
          if (tasksUsingLabel.length > 0) {
            throw new Error("Cannot delete priority with tasks. Change task priorities first.")
          }
        }

        // Just remove - RxDB subscription handles UI
        await label.remove()
      } catch (error) {
        console.error("Failed to delete label:", error)
        throw error
      }
    },
    [data.tasks]
  )

  /**
   * Update a label (either status or priority)
   */
  const updateLabel = useCallback(
    async (
      labelId: string,
      updates: { name?: string; color?: string; description?: string; order?: number }
    ) => {
      try {
        const now = getCurrentTimestamp()
        const user = getCurrentUser(currentUser)

        const finalUpdates = {
          ...updates,
          updatedAt: now,
          updatedBy: user,
        }

        const label = await database.labels
          .findOne({ selector: { id: labelId } })
          .exec()
        if (!label) throw new Error("Label not found")

        // Just update - RxDB subscription handles UI
        await label.update({ $set: finalUpdates })
      } catch (error) {
        console.error("Failed to update label:", error)
        throw error
      }
    },
    []
  )

  /**
   * Reorder labels of a specific type (status or priority)
   */
  const reorderLabels = useCallback(async (labelIds: string[]) => {
    try {
      const now = getCurrentTimestamp()
      const user = getCurrentUser(currentUser)

      // Update each label with new order
      for (let i = 0; i < labelIds.length; i++) {
        const label = await database.labels
          .findOne({ selector: { id: labelIds[i] } })
          .exec()
          
        if (label) {
          // Update the order using the database order field
          await label.update({
            $set: { order: i, updatedAt: now, updatedBy: user },
          })
        }
      }
      // RxDB subscription will handle UI update automatically
    } catch (error) {
      console.error("Failed to reorder task statuses:", error)
      throw error
    }
  }, [])

  // Utility functions - FIXED: removed async from refetch since it doesn't await anything
  const refetch = useCallback(() => {
    // With reactive subscriptions, manual refetch is rarely needed
    // The subscriptions automatically keep data fresh
    console.log(
      "Refetch called - RxDB subscriptions handle updates automatically"
    )
  }, [])

  const clearError = useCallback(() => {
    setData((prev) => ({ ...prev, error: null }))
  }, [])

  return {
    ...data,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    createLabel,       // Updated from createTaskStatus
    updateLabel,       // Updated from updateTaskStatus
    deleteLabel,       // Updated from deleteTaskStatus
    reorderLabels,     // Updated from reorderTaskStatuses
    refetch,
    clearError,
  }
}
