// File: use-project-task-data.ts

import type {
  UseProjectDataReturn as BaseProjectDataReturn,
  CurrentUser,
  ProjectData,
  TaskDataSchema,
  TaskStatusDocType,
} from "@incmix/utils/schema"

// Extended interface with new checklist, acceptance criteria, and subtask operations
interface UseProjectDataReturn extends BaseProjectDataReturn {
  // Checklist operations
  addChecklistItem: (taskId: string, text: string) => Promise<void>
  updateChecklistItem: (
    taskId: string,
    itemId: string,
    updates: { text?: string; checked?: boolean }
  ) => Promise<void>
  removeChecklistItem: (taskId: string, itemId: string) => Promise<void>
  reorderChecklistItems: (taskId: string, itemIds: string[]) => Promise<void>

  // Acceptance criteria operations
  addAcceptanceCriteriaItem: (taskId: string, text: string) => Promise<void>
  updateAcceptanceCriteriaItem: (
    taskId: string,
    itemId: string,
    updates: { text?: string; checked?: boolean }
  ) => Promise<void>
  removeAcceptanceCriteriaItem: (
    taskId: string,
    itemId: string
  ) => Promise<void>
  reorderAcceptanceCriteriaItems: (
    taskId: string,
    itemIds: string[]
  ) => Promise<void>

  // Subtask operations
  addSubtask: (taskId: string, name: string) => Promise<void>
  updateSubtask: (
    taskId: string,
    subtaskId: string,
    updates: { name?: string; completed?: boolean }
  ) => Promise<void>
  removeSubtask: (taskId: string, subtaskId: string) => Promise<void>
  reorderSubtasks: (taskId: string, subtaskIds: string[]) => Promise<void>
}
import { useCallback, useEffect, useRef, useState } from "react"
import type { Subscription } from "rxjs"
import { database } from "sql"
import type { TaskDocType } from "sql/types"
// Import browser-compatible helpers instead of Node.js Buffer-using ones
import {
  generateBrowserUniqueId,
  getCurrentTimestamp,
} from "../utils/browser-helpers"

// Extend Window interface to include our custom property
declare global {
  interface Window {
    __mockUserWarningShown?: boolean
  }
}

// Get the current user - accepts user context to make it injectable
const getCurrentUser = (user?: CurrentUser) => {
  if (!user) {
    // For backward compatibility in dev, return a mock user
    // Only show warning in development mode and only once per session
    if (import.meta.env.DEV && !window.__mockUserWarningShown) {
      console.warn("Warning: No user context provided. Using mock user data.")
      window.__mockUserWarningShown = true
    }
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

const DEFAULT_TASK_STATUSES = [
  {
    name: "To Do",
    color: "#6366f1",
    description: "Tasks that need to be started",
  },
  {
    name: "In Progress",
    color: "#f59e0b",
    description: "Tasks currently being worked on",
  },
  {
    name: "Done",
    color: "#10b981",
    description: "Completed tasks",
  },
]

export function useProjectData(
  projectId = "default-project",
  currentUser?: CurrentUser
): UseProjectDataReturn {
  const [data, setData] = useState<ProjectData>({
    tasks: [],
    taskStatuses: [],
    isLoading: true,
    error: null,
  })

  // Track subscriptions for cleanup
  const subscriptionsRef = useRef<{
    tasks?: Subscription
    taskStatuses?: Subscription
  }>({})

  // Initialize reactive subscriptions
  useEffect(() => {
    const setupReactiveData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true, error: null }))

        // Check and create default statuses if needed - Using count() for efficiency
        const existingStatusCount = await database.taskStatus
          .count({ selector: { projectId } })
          .exec()

        if (existingStatusCount === 0) {
          await createDefaultStatuses(projectId)
        }

        // Set up reactive subscription for task statuses
        subscriptionsRef.current.taskStatuses = database.taskStatus
          .find({
            selector: { projectId },
            sort: [{ order: "asc" }],
          })
          .$.subscribe({
            next: (statusDocs: Array<{ toJSON(): TaskStatusDocType }>) => {
              const taskStatuses = statusDocs.map(
                (doc: { toJSON(): TaskStatusDocType }) => doc.toJSON()
              )
              setData((prev) => ({
                ...prev,
                taskStatuses,
                // Set loading to false once data is received
                isLoading: false,
              }))
            },
            error: (error: Error) => {
              console.error("Task statuses subscription error:", error)
              setData((prev) => ({
                ...prev,
                error: "Failed to load task statuses",
                isLoading: false,
              }))
            },
          })

        // Set up reactive subscription for tasks
        subscriptionsRef.current.tasks = database.tasks
          .find({
            selector: { projectId },
            sort: [{ columnId: "asc" }, { order: "asc" }],
          })
          .$.subscribe({
            next: (taskDocs) => {
              // Use the RxDB document type directly and just call toJSON() on it
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
      if (subscriptionsRef.current.taskStatuses) {
        subscriptionsRef.current.taskStatuses.unsubscribe()
      }
    }
  }, [projectId])

  // Helper to create default task statuses
  const createDefaultStatuses = async (projectId: string) => {
    const now = getCurrentTimestamp()
    const user = getCurrentUser(currentUser)

    for (let i = 0; i < DEFAULT_TASK_STATUSES.length; i++) {
      const status = DEFAULT_TASK_STATUSES[i]
      await database.taskStatus.insert({
        id: generateBrowserUniqueId("ts"),
        projectId,
        name: status.name,
        color: status.color,
        description: status.description,
        order: i,
        isDefault: true,
        createdAt: now,
        updatedAt: now,
        createdBy: user,
        updatedBy: user,
      })
    }
  }

  // Task operations - simplified without manual state management
  const createTask = useCallback(
    async (columnId: string, taskData: Partial<TaskDataSchema>) => {
      try {
        const now = getCurrentTimestamp()
        const user = getCurrentUser(currentUser)

        // Get highest order in target column
        const tasksInColumn = data.tasks.filter((t) => t.columnId === columnId)
        const maxOrder = Math.max(...tasksInColumn.map((t) => t.order), -1)

        const newTask: TaskDataSchema = {
          id: generateBrowserUniqueId("task"),
          taskId: generateBrowserUniqueId("tsk"),
          projectId,
          name: taskData.name || "New Task",
          columnId,
          order: maxOrder + 1,
          startDate: taskData.startDate || new Date().toISOString(),
          endDate: taskData.endDate || "",
          description: taskData.description || "",
          completed: taskData.completed ?? false,
          priority: taskData.priority || "medium",
          refUrls: taskData.refUrls || [],
          labelsTags: taskData.labelsTags || [],
          attachments: taskData.attachments || [],
          assignedTo: taskData.assignedTo || [],
          subTasks: taskData.subTasks || [],
          comments: taskData.comments || [],
          commentsCount: 0,
          // Include checklist and acceptanceCriteria from taskData if available
          checklist: taskData.checklist || [],
          acceptanceCriteria: taskData.acceptanceCriteria || [],
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
    async (taskId: string, updates: Partial<TaskDataSchema>) => {
      try {
        const now = getCurrentTimestamp()
        const user = getCurrentUser(currentUser)

        const finalUpdates = {
          ...updates,
          updatedAt: now,
          updatedBy: user,
        }

        const task = await database.tasks
          .findOne({ selector: { taskId } })
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

  const deleteTask = useCallback(async (taskId: string) => {
    try {
      const task = await database.tasks.findOne({ selector: { taskId } }).exec()
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
    async (taskId: string, targetColumnId: string, targetIndex?: number) => {
      try {
        const now = getCurrentTimestamp()
        const user = getCurrentUser(currentUser)

        // Simplified order calculation for RxDB/local storage
        const targetTasks = data.tasks
          .filter((t) => t.columnId === targetColumnId && t.taskId !== taskId)
          .sort((a, b) => a.order - b.order)

        let newOrder: number
        if (targetIndex === undefined || targetIndex >= targetTasks.length) {
          // Add to end
          newOrder =
            targetTasks.length > 0
              ? targetTasks[targetTasks.length - 1].order + 1000
              : 1000
        } else if (targetIndex <= 0) {
          // Add to beginning
          newOrder =
            targetTasks.length > 0
              ? Math.max(targetTasks[0].order - 1000, 100)
              : 1000
        } else {
          // Insert between tasks
          const prevOrder = targetTasks[targetIndex - 1].order
          const nextOrder = targetTasks[targetIndex].order
          newOrder = (prevOrder + nextOrder) / 2
        }

        const task = await database.tasks
          .findOne({ selector: { taskId } })
          .exec()
        if (!task) throw new Error("Task not found")

        // Just update - RxDB subscription handles UI
        await task.update({
          $set: {
            columnId: targetColumnId,
            order: newOrder,
            updatedAt: now,
            updatedBy: user,
          },
        })

        // Optional: Clean up order values if they get too close to 0
        if (newOrder < 1) {
          setTimeout(() => reorderColumnTasks(targetColumnId), 100)
        }
      } catch (error) {
        console.error("Failed to move task:", error)
        throw error
      }
    },
    [data.tasks]
  )

  // Helper to clean up order values when they get too small
  const reorderColumnTasks = async (columnId: string) => {
    try {
      const now = getCurrentTimestamp()
      const user = getCurrentUser(currentUser)

      const columnTasks = data.tasks
        .filter((t) => t.columnId === columnId)
        .sort((a, b) => a.order - b.order)

      if (columnTasks.length <= 1) return

      // Update each task with clean order values
      for (let i = 0; i < columnTasks.length; i++) {
        const task = await database.tasks
          .findOne({ selector: { taskId: columnTasks[i].taskId } })
          .exec()
        if (task) {
          await task.update({
            $set: {
              order: (i + 1) * 1000, // Give plenty of space
              updatedAt: now,
              updatedBy: user,
            },
          })
        }
      }
    } catch (error) {
      console.error("Failed to reorder column tasks:", error)
    }
  }

  // Task status operations - simplified
  const createTaskStatus = useCallback(
    async (
      name: string,
      color = "#6366f1",
      description = ""
    ): Promise<string> => {
      try {
        const now = getCurrentTimestamp()
        const user = getCurrentUser(currentUser)
        const id = generateBrowserUniqueId("ts")

        const maxOrder = Math.max(
          ...data.taskStatuses.map((ts) => ts.order),
          -1
        )

        const newStatus: TaskStatusDocType = {
          id,
          projectId,
          name,
          color,
          description,
          order: maxOrder + 1,
          isDefault: false,
          createdAt: now,
          updatedAt: now,
          createdBy: user,
          updatedBy: user,
        }

        // Just insert - RxDB subscription will update UI
        await database.taskStatus.insert(newStatus)
        return id
      } catch (error) {
        console.error("Failed to create task status:", error)
        throw error
      }
    },
    [data.taskStatuses, projectId]
  )

  const updateTaskStatus = useCallback(
    async (
      statusId: string,
      updates: { name?: string; color?: string; description?: string }
    ) => {
      try {
        const now = getCurrentTimestamp()
        const user = getCurrentUser(currentUser)

        const finalUpdates = {
          ...updates,
          updatedAt: now,
          updatedBy: user,
        }

        const status = await database.taskStatus
          .findOne({ selector: { id: statusId } })
          .exec()
        if (!status) throw new Error("Status not found")

        // Just update - RxDB subscription handles UI
        await status.update({ $set: finalUpdates })
      } catch (error) {
        console.error("Failed to update task status:", error)
        throw error
      }
    },
    []
  )

  const deleteTaskStatus = useCallback(
    async (statusId: string) => {
      try {
        // Check if there are tasks in this status
        const tasksInStatus = data.tasks.filter((t) => t.columnId === statusId)
        if (tasksInStatus.length > 0) {
          throw new Error("Cannot delete status with tasks. Move tasks first.")
        }

        const status = await database.taskStatus
          .findOne({ selector: { id: statusId } })
          .exec()
        if (status) {
          // Just remove - RxDB subscription handles UI
          await status.remove()
        }
      } catch (error) {
        console.error("Failed to delete task status:", error)
        throw error
      }
    },
    [data.tasks]
  )

  const reorderTaskStatuses = useCallback(async (statusIds: string[]) => {
    try {
      const now = getCurrentTimestamp()
      const user = getCurrentUser(currentUser)

      // Update each status with new order
      for (let i = 0; i < statusIds.length; i++) {
        const status = await database.taskStatus
          .findOne({ selector: { id: statusIds[i] } })
          .exec()
        if (status) {
          await status.update({
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

  // Checklist operations
  const addChecklistItem = useCallback(async (taskId: string, text: string) => {
    try {
      // Find the task
      const task = await database.tasks.findOne({ selector: { taskId } }).exec()
      if (!task) throw new Error("Task not found")

      // Get the task data
      const taskData = task.toJSON()

      // Find the highest order
      const maxOrder = Math.max(
        ...(taskData.checklist?.map((item) => item.order) || [-1]),
        -1
      )

      // Add the new checklist item
      const updatedChecklist = [
        ...(taskData.checklist || []),
        {
          id: generateBrowserUniqueId("chk"),
          text,
          checked: false,
          order: maxOrder + 1,
        },
      ]

      // Update the task
      await updateTask(taskId, { checklist: updatedChecklist })
    } catch (error) {
      console.error("Failed to add checklist item:", error)
      throw error
    }
  }, [])

  const updateChecklistItem = useCallback(
    async (
      taskId: string,
      itemId: string,
      updates: { text?: string; checked?: boolean }
    ) => {
      try {
        // Find the task
        const task = await database.tasks
          .findOne({ selector: { taskId } })
          .exec()
        if (!task) throw new Error("Task not found")

        // Get the task data
        const taskData = task.toJSON()

        // Update the checklist item
        const updatedChecklist = taskData.checklist?.map((item) =>
          item.id === itemId ? { ...item, ...updates } : item
        )

        // Update the task
        await updateTask(taskId, { checklist: updatedChecklist })
      } catch (error) {
        console.error("Failed to update checklist item:", error)
        throw error
      }
    },
    []
  )

  const removeChecklistItem = useCallback(
    async (taskId: string, itemId: string) => {
      try {
        // Find the task
        const task = await database.tasks
          .findOne({ selector: { taskId } })
          .exec()
        if (!task) throw new Error("Task not found")

        // Get the task data
        const taskData = task.toJSON()

        // Remove the checklist item
        const updatedChecklist = taskData.checklist?.filter(
          (item) => item.id !== itemId
        )

        // Update the task
        await updateTask(taskId, { checklist: updatedChecklist })
      } catch (error) {
        console.error("Failed to remove checklist item:", error)
        throw error
      }
    },
    []
  )

  const reorderChecklistItems = useCallback(
    async (taskId: string, itemIds: string[]) => {
      try {
        // Find the task
        const task = await database.tasks
          .findOne({ selector: { taskId } })
          .exec()
        if (!task) throw new Error("Task not found")

        // Get the task data
        const taskData = task.toJSON()

        // Create a map of item IDs to their properties
        const itemMap = new Map(
          taskData.checklist?.map((item) => [item.id, item]) || []
        )

        // Create reordered checklist
        const updatedChecklist = itemIds.map((id, index) => {
          const item = itemMap.get(id)
          if (!item) throw new Error(`Checklist item with ID ${id} not found`)
          return { ...item, order: index }
        })

        // Update the task
        await updateTask(taskId, { checklist: updatedChecklist })
      } catch (error) {
        console.error("Failed to reorder checklist items:", error)
        throw error
      }
    },
    []
  )

  // Acceptance criteria operations
  const addAcceptanceCriteriaItem = useCallback(
    async (taskId: string, text: string) => {
      try {
        // Find the task
        const task = await database.tasks
          .findOne({ selector: { taskId } })
          .exec()
        if (!task) throw new Error("Task not found")

        // Get the task data
        const taskData = task.toJSON()

        // Find the highest order
        const maxOrder = Math.max(
          ...(taskData.acceptanceCriteria?.map((item) => item.order) || [-1]),
          -1
        )

        // Add the new acceptance criteria item
        const updatedAcceptanceCriteria = [
          ...(taskData.acceptanceCriteria || []),
          {
            id: generateBrowserUniqueId("ac"),
            text,
            checked: false,
            order: maxOrder + 1,
          },
        ]

        // Update the task
        await updateTask(taskId, {
          acceptanceCriteria: updatedAcceptanceCriteria,
        })
      } catch (error) {
        console.error("Failed to add acceptance criteria item:", error)
        throw error
      }
    },
    []
  )

  const updateAcceptanceCriteriaItem = useCallback(
    async (
      taskId: string,
      itemId: string,
      updates: { text?: string; checked?: boolean }
    ) => {
      try {
        // Find the task
        const task = await database.tasks
          .findOne({ selector: { taskId } })
          .exec()
        if (!task) throw new Error("Task not found")

        // Get the task data
        const taskData = task.toJSON()

        // Update the acceptance criteria item
        const updatedAcceptanceCriteria = taskData.acceptanceCriteria?.map(
          (item) => (item.id === itemId ? { ...item, ...updates } : item)
        )

        // Update the task
        await updateTask(taskId, {
          acceptanceCriteria: updatedAcceptanceCriteria,
        })
      } catch (error) {
        console.error("Failed to update acceptance criteria item:", error)
        throw error
      }
    },
    []
  )

  const removeAcceptanceCriteriaItem = useCallback(
    async (taskId: string, itemId: string) => {
      try {
        // Find the task
        const task = await database.tasks
          .findOne({ selector: { taskId } })
          .exec()
        if (!task) throw new Error("Task not found")

        // Get the task data
        const taskData = task.toJSON()

        // Remove the acceptance criteria item
        const updatedAcceptanceCriteria = taskData.acceptanceCriteria?.filter(
          (item) => item.id !== itemId
        )

        // Update the task
        await updateTask(taskId, {
          acceptanceCriteria: updatedAcceptanceCriteria,
        })
      } catch (error) {
        console.error("Failed to remove acceptance criteria item:", error)
        throw error
      }
    },
    []
  )

  const reorderAcceptanceCriteriaItems = useCallback(
    async (taskId: string, itemIds: string[]) => {
      try {
        // Find the task
        const task = await database.tasks
          .findOne({ selector: { taskId } })
          .exec()
        if (!task) throw new Error("Task not found")

        // Get the task data
        const taskData = task.toJSON()

        // Create a map of item IDs to their properties
        const itemMap = new Map(
          taskData.acceptanceCriteria?.map((item) => [item.id, item]) || []
        )

        // Create reordered acceptance criteria
        const updatedAcceptanceCriteria = itemIds.map((id, index) => {
          const item = itemMap.get(id)
          if (!item)
            throw new Error(`Acceptance criteria item with ID ${id} not found`)
          return { ...item, order: index }
        })

        // Update the task
        await updateTask(taskId, {
          acceptanceCriteria: updatedAcceptanceCriteria,
        })
      } catch (error) {
        console.error("Failed to reorder acceptance criteria items:", error)
        throw error
      }
    },
    []
  )

  // Subtask operations
  const addSubtask = useCallback(async (taskId: string, name: string) => {
    try {
      // Find the task
      const task = await database.tasks.findOne({ selector: { taskId } }).exec()
      if (!task) throw new Error("Task not found")

      // Get the task data
      const taskData = task.toJSON()

      // Find the highest order
      const maxOrder = Math.max(
        ...(taskData.subTasks?.map((item) => item.order) || [-1]),
        -1
      )

      // Add the new subtask
      const updatedSubtasks = [
        ...(taskData.subTasks || []),
        {
          id: generateBrowserUniqueId("sub"),
          name,
          completed: false,
          order: maxOrder + 1,
        },
      ]

      // Update the task
      await updateTask(taskId, { subTasks: updatedSubtasks })
    } catch (error) {
      console.error("Failed to add subtask:", error)
      throw error
    }
  }, [])

  const updateSubtask = useCallback(
    async (
      taskId: string,
      subtaskId: string,
      updates: { name?: string; completed?: boolean }
    ) => {
      try {
        // Find the task
        const task = await database.tasks
          .findOne({ selector: { taskId } })
          .exec()
        if (!task) throw new Error("Task not found")

        // Get the task data
        const taskData = task.toJSON()

        // Update the subtask
        const updatedSubtasks = taskData.subTasks?.map((subtask) =>
          subtask.id === subtaskId ? { ...subtask, ...updates } : subtask
        )

        // Update the task
        await updateTask(taskId, { subTasks: updatedSubtasks })
      } catch (error) {
        console.error("Failed to update subtask:", error)
        throw error
      }
    },
    []
  )

  const removeSubtask = useCallback(
    async (taskId: string, subtaskId: string) => {
      try {
        // Find the task
        const task = await database.tasks
          .findOne({ selector: { taskId } })
          .exec()
        if (!task) throw new Error("Task not found")

        // Get the task data
        const taskData = task.toJSON()

        // Remove the subtask
        const updatedSubtasks = taskData.subTasks?.filter(
          (subtask) => subtask.id !== subtaskId
        )

        // Update the task
        await updateTask(taskId, { subTasks: updatedSubtasks })
      } catch (error) {
        console.error("Failed to remove subtask:", error)
        throw error
      }
    },
    []
  )

  const reorderSubtasks = useCallback(
    async (taskId: string, subtaskIds: string[]) => {
      try {
        // Find the task
        const task = await database.tasks
          .findOne({ selector: { taskId } })
          .exec()
        if (!task) throw new Error("Task not found")

        // Get the task data
        const taskData = task.toJSON()

        // Create a map of subtask IDs to their properties
        const subtaskMap = new Map(
          taskData.subTasks?.map((subtask) => [subtask.id, subtask]) || []
        )

        // Create reordered subtasks
        const updatedSubtasks = subtaskIds.map((id, index) => {
          const subtask = subtaskMap.get(id)
          if (!subtask) throw new Error(`Subtask with ID ${id} not found`)
          return { ...subtask, order: index }
        })

        // Update the task
        await updateTask(taskId, { subTasks: updatedSubtasks })
      } catch (error) {
        console.error("Failed to reorder subtasks:", error)
        throw error
      }
    },
    []
  )
  
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
    createTaskStatus,
    updateTaskStatus,
    deleteTaskStatus,
    reorderTaskStatuses,
    refetch,
    clearError,
    // New checklist operations
    addChecklistItem,
    updateChecklistItem,
    removeChecklistItem,
    reorderChecklistItems,
    // New acceptance criteria operations
    addAcceptanceCriteriaItem,
    updateAcceptanceCriteriaItem,
    removeAcceptanceCriteriaItem,
    reorderAcceptanceCriteriaItems,
    // New subtask operations
    addSubtask,
    updateSubtask,
    removeSubtask,
    reorderSubtasks,
  }
}
