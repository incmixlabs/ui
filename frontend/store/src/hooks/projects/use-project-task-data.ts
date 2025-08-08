// File: use-project-task-data.ts
// Updated to use the selected project from project store

import type {
  CurrentUser,
  LabelSchema,
  ProjectData,
  TaskDataSchema,
  UseProjectDataReturn,
} from "@incmix/utils/schema"
import { useProjectStore } from "../../services/projects"

// Extend the UseProjectDataReturn type to include subtask operations
declare module "@incmix/utils/schema" {
  interface UseProjectDataReturn {
    // Task operations
    duplicateTask: (taskId: string) => Promise<void>
    // Subtask operations
    convertTaskToSubtask: (
      taskId: string,
      parentTaskId: string
    ) => Promise<void>
    convertSubtaskToTask: (taskId: string) => Promise<void>
    canTaskBeIndented: (taskId: string) => Promise<boolean>
    canTaskBeUnindented: (taskId: string) => Promise<boolean>
    findPotentialParentTask: (taskId: string) => Promise<string | null>
  }
}

import { useCallback, useEffect, useRef, useState } from "react"
import type { Subscription } from "rxjs"
import { database } from "sql"
import type { LabelDocType, TaskDocType } from "sql/types"
// Import browser-compatible helpers instead of Node.js Buffer-using ones
import {
  generateBrowserUniqueId,
  getCurrentTimestamp,
} from "../../utils/browser-helpers"
import { DEFAULT_LABELS } from "../../utils/default-labels"

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
  providedProjectId?: string,
  currentUser?: CurrentUser
): UseProjectDataReturn {
  // Get the selected project from the store
  const { selectedProject } = useProjectStore()

  // Use the provided projectId if available, otherwise use selectedProject.id
  // If neither is available, don't use a default - this will show appropriate empty state
  const projectId = providedProjectId || selectedProject?.id || ""
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
    // If no projectId is provided, show empty state
    if (!projectId) {
      setData({
        tasks: [],
        labels: [],
        isLoading: false,
        error: null,
      })
      return
    }

    const setupReactiveData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true, error: null }))

        // We no longer auto-create default labels here
        // Labels are now only created when a project is explicitly created
        // This prevents unwanted label creation when browsing tasks

        // Set up reactive subscription for labels (both status and priority labels)
        subscriptionsRef.current.labels = database.labels
          .find({
            selector: { projectId },
            sort: [{ order: "asc" }], // Changed from labelOrder to order to match schema
          })
          .$.subscribe({
            next: (labelDocs: Array<{ toJSON(): LabelDocType }>) => {
              const labels = labelDocs.map((doc: { toJSON(): LabelDocType }) =>
                doc.toJSON()
              )
              setData((prev) => {
                // Handle type compatibility with LabelSchema - proper mapping instead of type assertion
                const typeSafeLabels: LabelSchema[] = labels.map((l) => ({
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
                  updatedBy: l.updatedBy,
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

  // Task operations - simplified without manual state management
  const createTask = useCallback(
    async (statusId: string, taskData: Partial<TaskDataSchema>) => {
      try {
        const now = getCurrentTimestamp()
        const user = getCurrentUser(currentUser)

        // Ensure we have a valid priorityId - required field validation
        if (!taskData.priorityId) {
          // Find default priority (medium or first available)
          const defaultPriority =
            data.labels.find(
              (l) => l.type === "priority" && l.name.toLowerCase() === "medium"
            ) || data.labels.find((l) => l.type === "priority")

          if (!defaultPriority) {
            throw new Error("No priority labels found. Cannot create task.")
          }

          taskData.priorityId = defaultPriority.id
        }

        // Get highest order in target status column
        const tasksInStatus = data.tasks.filter((t) => t.statusId === statusId)
        const maxOrder = Math.max(
          ...tasksInStatus.map((t) => t.taskOrder || 0),
          -1
        )

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
          startDate: taskData.startDate
            ? Number(new Date(taskData.startDate))
            : Number(new Date()),
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

        // Get the task and all its subtasks (if any)
        const taskToMove = data.tasks.find((t) => t.id === id)
        if (!taskToMove) throw new Error("Task not found")

        // Find all subtasks of this task (direct and nested)
        const getSubtaskIds = (parentId: string): string[] => {
          const directSubtasks = data.tasks.filter(
            (t) => t.parentTaskId === parentId
          )
          return [
            ...directSubtasks.map((t) => t.id),
            ...directSubtasks.flatMap((t) => getSubtaskIds(t.id)),
          ]
        }
        const subtaskIds = getSubtaskIds(id)

        // Simplified order calculation for RxDB/local storage
        const targetTasks = data.tasks
          .filter(
            (t) =>
              t.statusId === targetStatusId &&
              t.id !== id &&
              !subtaskIds.includes(t.id)
          )
          .sort((a, b) => a.taskOrder - b.taskOrder)

        let newTaskOrder: number
        if (targetIndex === undefined || targetIndex >= targetTasks.length) {
          // Add to end
          newTaskOrder =
            targetTasks.length > 0
              ? targetTasks[targetTasks.length - 1].taskOrder + 1000
              : 1000
        } else if (targetIndex <= 0) {
          // Add to beginning
          newTaskOrder =
            targetTasks.length > 0
              ? Math.max(targetTasks[0].taskOrder - 1000, 100)
              : 1000
        } else {
          // Insert between tasks
          const prevOrder = targetTasks[targetIndex - 1].taskOrder
          const nextOrder = targetTasks[targetIndex].taskOrder
          // Ensure taskOrder is always an integer to satisfy schema validation
          newTaskOrder = Math.floor((prevOrder + nextOrder) / 2)

          // If the calculated value is the same as prevOrder, increment it by 1
          // This handles cases where prevOrder and nextOrder are consecutive integers
          if (newTaskOrder === prevOrder) {
            newTaskOrder = prevOrder + 1
          }
        }

        // Update the main task
        const task = await database.tasks.findOne({ selector: { id } }).exec()
        if (!task) throw new Error("Task not found")

        await task.update({
          $set: {
            statusId: targetStatusId,
            taskOrder: newTaskOrder,
            updatedAt: now,
            updatedBy: user,
          },
        })

        // Also move all subtasks to the new status with the parent
        if (subtaskIds.length > 0) {
          // Calculate order offset based on the difference between old and new parent order
          const orderOffset = newTaskOrder - taskToMove.taskOrder

          // Update each subtask
          for (const subtaskId of subtaskIds) {
            const subtask = await database.tasks
              .findOne({ selector: { id: subtaskId } })
              .exec()

            if (subtask) {
              const subtaskData = subtask.toJSON()
              await subtask.update({
                $set: {
                  statusId: targetStatusId,
                  // Maintain relative position by applying the same offset
                  taskOrder: subtaskData.taskOrder + orderOffset,
                  updatedAt: now,
                  updatedBy: user,
                },
              })
            }
          }
        }

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
        const labelsOfType = data.labels.filter((l) => l.type === type)
        const maxOrder = Math.max(...labelsOfType.map((l) => l.order), -1)

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
        if (label.get("type") === "status") {
          const tasksUsingLabel = data.tasks.filter(
            (t) => t.statusId === labelId
          )
          if (tasksUsingLabel.length > 0) {
            throw new Error(
              "Cannot delete status with tasks. Move tasks first."
            )
          }
        } else if (label.get("type") === "priority") {
          const tasksUsingLabel = data.tasks.filter(
            (t) => t.priorityId === labelId
          )
          if (tasksUsingLabel.length > 0) {
            throw new Error(
              "Cannot delete priority with tasks. Change task priorities first."
            )
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
      updates: {
        name?: string
        color?: string
        description?: string
        order?: number
      }
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
  }, [])

  const clearError = useCallback(() => {
    setData((prev) => ({ ...prev, error: null }))
  }, [])

  // Add new functions for parent-child task relationships
  const convertTaskToSubtask = useCallback(
    async (taskId: string, parentTaskId: string) => {
      try {
        // Validate both tasks exist
        const task = await database.tasks
          .findOne({ selector: { id: taskId } })
          .exec()
        const parentTask = await database.tasks
          .findOne({ selector: { id: parentTaskId } })
          .exec()

        if (!task) {
          throw new Error("Task not found")
        }

        if (!parentTask) {
          throw new Error("Parent task not found")
        }

        // Prevent creating cyclic dependencies - recursive check to detect all cycles
        const checkForCycle = (
          currentId: string,
          targetId: string
        ): boolean => {
          if (currentId === targetId) return true

          const current = data.tasks.find((t) => t.id === currentId)
          if (!current || !current.parentTaskId) return false

          return checkForCycle(current.parentTaskId, targetId)
        }

        const potentialParentTask = parentTask.toJSON()

        // Check if making this relationship would create a cycle
        if (checkForCycle(parentTaskId, taskId)) {
          throw new Error("Cannot create cyclic task relationships")
        }

        // Also prevent making a subtask a parent
        if (potentialParentTask.isSubtask) {
          throw new Error("Cannot make a subtask a parent task")
        }

        const now = getCurrentTimestamp()
        const user = getCurrentUser(currentUser)

        // Update the task to become a subtask
        await task.update({
          $set: {
            parentTaskId,
            isSubtask: true,
            updatedAt: now,
            updatedBy: user,
          },
        })
      } catch (error) {
        console.error("Failed to convert task to subtask:", error)
        throw error
      }
    },
    []
  )

  const convertSubtaskToTask = useCallback(async (taskId: string) => {
    try {
      const task = await database.tasks
        .findOne({ selector: { id: taskId } })
        .exec()

      if (!task) {
        throw new Error("Task not found")
      }

      const now = getCurrentTimestamp()
      const user = getCurrentUser(currentUser)

      // Update the task to become a regular task (not a subtask)
      await task.update({
        $set: {
          parentTaskId: "",
          isSubtask: false,
          updatedAt: now,
          updatedBy: user,
        },
      })
    } catch (error) {
      console.error("Failed to convert subtask to task:", error)
      throw error
    }
  }, [])

  // Find the potential parent for a task if it were to be indented
  // This needs to be defined before canTaskBeIndented since it's used by it
  const findPotentialParentTask = useCallback(async (taskId: string) => {
    try {
      // Directly query the database to get the current task - this ensures we always have the latest data
      const taskDoc = await database.tasks
        .findOne({ selector: { id: taskId } })
        .exec()
      if (!taskDoc) {
        return null
      }

      const task = taskDoc.toJSON()

      // Query database for all tasks in the same column, sorted by order
      const tasksInColumnDocs = await database.tasks
        .find({
          selector: { statusId: task.statusId },
          sort: [{ taskOrder: "asc" }],
        })
        .exec()

      const allTasksInColumn = tasksInColumnDocs.map((doc) => doc.toJSON())

      // Get the position of the current task
      const currentPosition = allTasksInColumn.findIndex((t) => t.id === taskId)
      if (currentPosition <= 0) {
        return null
      }

      // For regular tasks: find the closest previous non-subtask task
      if (!task.isSubtask) {
        // Look for non-subtask tasks before this one
        for (let i = currentPosition - 1; i >= 0; i--) {
          if (!allTasksInColumn[i].isSubtask) {
            return allTasksInColumn[i].id
          }
        }
      } else {
        // For subtasks: find the parent task at the appropriate level
        // This is more complex and would need to account for hierarchy levels
        // For now, just find the previous task that isn't a child of this task
        const previousTask = allTasksInColumn[currentPosition - 1]
        if (
          !task.isSubtask ||
          previousTask.parentTaskId !== task.parentTaskId
        ) {
          return previousTask.id
        }
      }

      return null
    } catch (error) {
      console.error(`Error in findPotentialParentTask for ${taskId}:`, error)
      return null
    }
  }, [])

  // Check if a task can be indented (converted to subtask)
  const canTaskBeIndented = useCallback(
    async (taskId: string) => {
      try {
        // Directly query the database to get the current task
        const taskDoc = await database.tasks
          .findOne({ selector: { id: taskId } })
          .exec()
        if (!taskDoc) {
          return false
        }

        const task = taskDoc.toJSON()

        // If it's already a subtask, check the nesting level
        if (task.isSubtask) {
          // Check nesting level by tracing up the hierarchy
          let currentTaskId = task.id
          let nestingLevel = 1 // Current task is already at level 1

          // Traverse up to find the nesting level
          while (true) {
            const currentDoc = await database.tasks
              .findOne({
                selector: { id: currentTaskId },
              })
              .exec()

            if (!currentDoc) break

            const currentTask = currentDoc.toJSON()
            if (!currentTask.parentTaskId) break

            currentTaskId = currentTask.parentTaskId
            nestingLevel++

            // Max nesting level check (3 levels max)
            if (nestingLevel >= 3) {
              return false
            }
          }
        }

        // Check if there's a valid potential parent task
        const potentialParentId = await findPotentialParentTask(taskId)
        const canIndent = potentialParentId !== null

        return canIndent
      } catch (error) {
        console.error(`Error in canTaskBeIndented for ${taskId}:`, error)
        return false
      }
    },
    [findPotentialParentTask]
  )

  // Check if a task can be unindented (converted from subtask to regular task)
  const canTaskBeUnindented = useCallback(async (taskId: string) => {
    try {
      // Directly query the database to get the current task
      const taskDoc = await database.tasks
        .findOne({ selector: { id: taskId } })
        .exec()
      if (!taskDoc) {
        return false
      }

      const task = taskDoc.toJSON()

      // Can only unindent if it's currently a subtask
      const canUnindent = task.isSubtask === true

      return canUnindent
    } catch (error) {
      console.error(`Error in canTaskBeUnindented for ${taskId}:`, error)
      return false
    }
  }, [])

  // Removed duplicate declaration of findPotentialParentTask since it's now defined above

  // Duplicate task function - creates an exact copy with new ID, placed directly below original
  const duplicateTask = useCallback(
    async (taskId: string) => {
      const now = getCurrentTimestamp()
      const user = getCurrentUser(currentUser)

      // Validate inputs
      if (!taskId) {
        throw new Error("Task ID is required")
      }

      if (!projectId) {
        throw new Error("Project ID is required")
      }

      // Find the original task
      const originalTask = data.tasks.find((t) => t.id === taskId)
      if (!originalTask) {
        throw new Error(`Task not found with ID: ${taskId}`)
      }

      // Validate original task has required fields
      if (!originalTask.statusId) {
        throw new Error("Original task missing statusId")
      }

      if (!originalTask.priorityId) {
        // Find a default priority
        const defaultPriority = data.labels.find((l) => l.type === "priority")
        if (!defaultPriority) {
          throw new Error(
            "No priority labels available and original task missing priorityId"
          )
        }
        originalTask.priorityId = defaultPriority.id
      }

      // Get all tasks in the same status to calculate new order
      const tasksInStatus = data.tasks
        .filter((t) => t.statusId === originalTask.statusId)
        .sort((a, b) => (a.taskOrder ?? 0) - (b.taskOrder ?? 0))

      // Find the index of the original task
      const originalIndex = tasksInStatus.findIndex((t) => t.id === taskId)
      if (originalIndex === -1) {
        throw new Error("Original task not found in status")
      }

      // Calculate the order for the new task (directly below original)
      let newTaskOrder: number
      if (originalIndex === tasksInStatus.length - 1) {
        // Original is the last task, add to end
        newTaskOrder = (originalTask.taskOrder || 1000) + 1000
      } else {
        // Insert between original and next task
        const nextTask = tasksInStatus[originalIndex + 1]
        const gap =
          (nextTask.taskOrder || 1000) - (originalTask.taskOrder || 1000)
        if (gap > 1) {
          // There's space, insert in the middle
          newTaskOrder = Math.floor(
            ((originalTask.taskOrder || 1000) + (nextTask.taskOrder || 1000)) /
              2
          )
        } else {
          // No space, need to reorder tasks
          newTaskOrder = (originalTask.taskOrder || 1000) + 500

          // Update all tasks after the original to make space
          for (let i = originalIndex + 1; i < tasksInStatus.length; i++) {
            const taskToUpdate = await database.tasks
              .findOne({ selector: { id: tasksInStatus[i].id } })
              .exec()
            if (taskToUpdate) {
              await taskToUpdate.update({
                $set: {
                  taskOrder: (tasksInStatus[i].taskOrder || 1000) + 1000,
                  updatedAt: now,
                  updatedBy: user,
                },
              })
            }
          }
        }
      }

      // Create the duplicate task with new ID but all other properties preserved
      const duplicateTaskData: TaskDataSchema = {
        id: generateBrowserUniqueId("task"),
        projectId, // Ensure projectId is set
        name: `${originalTask.name || "Untitled Task"} (Duplicate)`,
        statusId: originalTask.statusId,
        taskOrder: newTaskOrder,
        startDate: originalTask.startDate || Number(new Date()),
        endDate: originalTask.endDate || 0,
        description: originalTask.description || "",
        completed: false, // Reset completion status
        priorityId: originalTask.priorityId,
        refUrls: originalTask.refUrls || [],
        labelsTags: originalTask.labelsTags || [],
        attachments: originalTask.attachments || [],
        assignedTo: originalTask.assignedTo || [],
        // Preserve subtask relationships but reset completion status
        isSubtask: originalTask.isSubtask || false,
        parentTaskId: originalTask.parentTaskId || "",
        // Process arrays to ensure new IDs for nested items but preserve structure
        subTasks: (originalTask.subTasks || []).map((st, index) => ({
          id: generateBrowserUniqueId("st"),
          name: st.name || "",
          completed: false, // Reset completion status
          order: index,
        })),
        checklist: (originalTask.checklist || []).map((cl, index) => ({
          id: generateBrowserUniqueId("cl"),
          text: cl.text || "",
          checked: false, // Reset completion status for new task
          order: index,
        })),
        acceptanceCriteria: (originalTask.acceptanceCriteria || []).map(
          (ac, index) => ({
            id: generateBrowserUniqueId("ac"),
            text: ac.text || "",
            checked: false, // Reset completion status for new task
            order: index,
          })
        ),
        comments: [], // Start with empty comments for the duplicate
        createdAt: now,
        updatedAt: now,
        createdBy: user,
        updatedBy: user,
      }

      // Insert the duplicate task
      await database.tasks.insert(duplicateTaskData as TaskDocType)

      // If the original task is a main task with subtasks, we need to duplicate those too
      // and update their parentTaskId to point to the new task
      if (!originalTask.isSubtask) {
        const subtasks = data.tasks
          .filter((t) => t.isSubtask && t.parentTaskId === originalTask.id)
          .sort((a, b) => (a.taskOrder ?? 0) - (b.taskOrder ?? 0))

        for (const subtask of subtasks) {
          const duplicatedSubtask: TaskDataSchema = {
            id: generateBrowserUniqueId("task"),
            projectId,
            name: subtask.name || "Untitled Subtask",
            statusId: subtask.statusId,
            taskOrder: (subtask.taskOrder || 1000) + 10000, // Offset to avoid conflicts
            startDate: subtask.startDate || Number(new Date()),
            endDate: subtask.endDate || 0,
            description: subtask.description || "",
            completed: false, // Reset completion status
            priorityId: subtask.priorityId,
            refUrls: subtask.refUrls || [],
            labelsTags: subtask.labelsTags || [],
            attachments: subtask.attachments || [],
            assignedTo: subtask.assignedTo || [],
            isSubtask: true,
            parentTaskId: duplicateTaskData.id, // Point to the new parent
            // Process arrays for subtasks too
            subTasks: (subtask.subTasks || []).map((st, index) => ({
              id: generateBrowserUniqueId("st"),
              name: st.name || "",
              completed: false,
              order: index,
            })),
            checklist: (subtask.checklist || []).map((cl, index) => ({
              id: generateBrowserUniqueId("cl"),
              text: cl.text || "",
              checked: false,
              order: index,
            })),
            acceptanceCriteria: (subtask.acceptanceCriteria || []).map(
              (ac, index) => ({
                id: generateBrowserUniqueId("ac"),
                text: ac.text || "",
                checked: false,
                order: index,
              })
            ),
            comments: [],
            createdAt: now,
            updatedAt: now,
            createdBy: user,
            updatedBy: user,
          }
          await database.tasks.insert(duplicatedSubtask as TaskDocType)
        }
      }
    },
    [data.tasks, data.labels, projectId, currentUser]
  )

  return {
    ...data,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    duplicateTask,
    createLabel, // Updated from createTaskStatus
    updateLabel, // Updated from updateTaskStatus
    deleteLabel, // Updated from deleteTaskStatus
    reorderLabels, // Updated from reorderTaskStatuses
    convertTaskToSubtask,
    convertSubtaskToTask,
    canTaskBeIndented,
    canTaskBeUnindented,
    findPotentialParentTask,
    refetch,
    clearError,
  }
}
