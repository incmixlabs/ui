// File: use-project-task-data.ts

import { useCallback, useEffect, useRef, useState } from "react"
import type { Subscription } from "rxjs"
import type { TaskDocType, TaskStatusDocType } from "utils/task-schema"
import { database } from "sql"
import { generateUniqueId, getCurrentTimestamp } from "@incmix/utils/helper"
import type { TaskDataSchema } from "../sql/task-schemas"

interface ProjectData {
  tasks: TaskDataSchema[]
  taskStatuses: TaskStatusDocType[]
  isLoading: boolean
  error: string | null
}

interface UseProjectDataReturn extends ProjectData {
  // Task operations
  createTask: (
    columnId: string,
    taskData: Partial<TaskDataSchema>
  ) => Promise<void>
  updateTask: (
    taskId: string,
    updates: Partial<TaskDataSchema>
  ) => Promise<void>
  deleteTask: (taskId: string) => Promise<void>
  moveTask: (
    taskId: string,
    targetColumnId: string,
    targetIndex?: number
  ) => Promise<void>

  // Task status operations
  createTaskStatus: (
    name: string,
    color?: string,
    description?: string
  ) => Promise<string>
  updateTaskStatus: (
    statusId: string,
    updates: { name?: string; color?: string; description?: string }
  ) => Promise<void>
  deleteTaskStatus: (statusId: string) => Promise<void>
  reorderTaskStatuses: (statusIds: string[]) => Promise<void>

  // Utility
  refetch: () => void
  clearError: () => void
}

// Define a type for user information
export interface CurrentUser {
  id: string
  name: string
  image?: string
}

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
            next: (taskDocs: Array<{ toJSON(): TaskDocType }>) => {
              const tasks = taskDocs.map((doc: { toJSON(): TaskDocType }) => {
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
        id: generateUniqueId("ts"),
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
          id: generateUniqueId("task"),
          taskId: generateUniqueId("tsk"),
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
          // Include checklist from taskData if available
          checklist: taskData.checklist || [],
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
        const id = generateUniqueId("ts")

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
  }
}
