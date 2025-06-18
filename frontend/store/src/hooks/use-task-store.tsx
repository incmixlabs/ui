import type { Subscription } from "rxjs"
import { create } from "zustand"
import { database } from "../sql"
import { generateUniqueId, getCurrentTimestamp } from "@incmix/utils/helper"
import type { TaskDataSchema } from "../sql/task-schemas"

/**
 * Helper function to convert ReadonlyArrays to mutable arrays for RxDB
 */
const convertReadonlyArraysForDb = <T extends Partial<TaskDataSchema>>(
  data: T
): T => {
  const converted = { ...data } as T

  if (data.labelsTags && Array.isArray(data.labelsTags)) {
    ;(converted as any).labelsTags = [...data.labelsTags]
  }
  if (data.attachments && Array.isArray(data.attachments)) {
    ;(converted as any).attachments = [...data.attachments]
  }
  if (data.assignedTo && Array.isArray(data.assignedTo)) {
    ;(converted as any).assignedTo = [...data.assignedTo]
  }
  if (data.subTasks && Array.isArray(data.subTasks)) {
    ;(converted as any).subTasks = [...data.subTasks]
  }

  return converted
}

// Global move operation tracker to prevent race conditions
const moveOperationTracker = {
  activeOperations: new Map<
    string,
    {
      promise: Promise<void>
      timestamp: number
      targetColumnId: string
      targetIndex?: number
    }
  >(),

  async queueMove(
    taskId: string,
    operation: () => Promise<void>,
    targetColumnId: string,
    targetIndex?: number
  ): Promise<void> {
    // Cancel any existing operation for this task
    const existing = this.activeOperations.get(taskId)
    if (existing) {
      console.log("🔄 Cancelling previous move operation for:", taskId)
    }

    const operationData = {
      promise: operation(),
      timestamp: Date.now(),
      targetColumnId,
      targetIndex,
    }

    this.activeOperations.set(taskId, operationData)

    try {
      await operationData.promise
      console.log("✅ Move operation completed for:", taskId)
    } catch (error) {
      console.error("❌ Move operation failed for:", taskId, error)
      throw error
    } finally {
      // Only remove if this is still the active operation
      const current = this.activeOperations.get(taskId)
      if (current === operationData) {
        this.activeOperations.delete(taskId)
      }
    }
  },

  isMoving(taskId: string): boolean {
    return this.activeOperations.has(taskId)
  },

  getActiveMove(taskId: string) {
    return this.activeOperations.get(taskId)
  },
}

interface TaskStore {
  tasks: TaskDataSchema[]
  isLoading: boolean
  error: string | null
  initialized: boolean
  subscription: Subscription | null

  // Initialize store with reactive subscription
  initialize: (projectId: string) => Promise<void>
  cleanup: () => void

  // CRUD operations
  createTask: (
    projectId: string,
    taskData: Omit<
      TaskDataSchema,
      | "id"
      | "taskId"
      | "projectId"
      | "createdAt"
      | "updatedAt"
      | "createdBy"
      | "updatedBy"
      | "order"
    >
  ) => Promise<string>

  updateTask: (
    taskId: string,
    updates: Partial<
      Omit<TaskDataSchema, "id" | "projectId" | "createdAt" | "createdBy">
    >
  ) => Promise<void>

  deleteTask: (taskId: string) => Promise<void>

  // Task movement with race condition protection
  moveTask: (
    taskId: string,
    targetColumnId: string,
    targetIndex?: number
  ) => Promise<void>

  // Getters
  getTasksByProject: (projectId: string) => TaskDataSchema[]
  getTasksByColumn: (columnId: string) => TaskDataSchema[]
  getTaskById: (taskId: string) => TaskDataSchema | undefined
}

const getCurrentUser = () => ({
  id: "user-id",
  name: "Current User",
  image: "/placeholder.svg",
})

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,
  initialized: false,
  subscription: null,

  getTasksByProject: (projectId: string): TaskDataSchema[] => {
    return get().tasks.filter(
      (task: TaskDataSchema) => task.projectId === projectId
    )
  },

  getTasksByColumn: (columnId: string): TaskDataSchema[] => {
    return get()
      .tasks.filter((task: TaskDataSchema) => task.columnId === columnId)
      .sort((a, b) => a.order - b.order)
  },

  getTaskById: (taskId: string): TaskDataSchema | undefined => {
    return get().tasks.find((task: TaskDataSchema) => task.taskId === taskId)
  },

  initialize: async (projectId: string) => {
    const currentState = get()

    // Don't re-initialize if already initialized for any project
    if (currentState.initialized) {
      console.log("📋 Tasks already initialized")
      return
    }

    set({ isLoading: true, error: null })

    try {
      console.log("🔄 Initializing tasks for project:", projectId)

      const tasksCollection = database.tasks

      // Set up reactive subscription to ALL tasks for this project
      const subscription = tasksCollection
        .find({
          selector: { projectId },
          sort: [{ columnId: "asc" }, { order: "asc" }],
        })
        .$.subscribe({
          next: (taskDocs) => {
            console.log(
              "📄 Tasks subscription update:",
              taskDocs.length,
              "tasks"
            )

            const normalizedTasks = taskDocs.map((taskDoc) => {
              const task = taskDoc.toJSON()
              return {
                ...task,
                completed: task.completed ?? false,
              } as TaskDataSchema
            })

            set({
              tasks: normalizedTasks,
              isLoading: false,
              error: null,
              initialized: true,
            })
          },
          error: (error) => {
            console.error("❌ Tasks subscription error:", error)
            set({
              error: "Failed to load tasks",
              isLoading: false,
              initialized: false,
            })
          },
        })

      set({ subscription })
      console.log("✅ Tasks subscription established")
    } catch (error) {
      console.error("❌ Failed to initialize tasks:", error)
      set({
        error: "Failed to load tasks",
        isLoading: false,
        initialized: false,
      })
    }
  },

  cleanup: () => {
    const subscription = get().subscription
    if (subscription) {
      console.log("🧹 Cleaning up tasks subscription")
      subscription.unsubscribe()
      set({
        subscription: null,
        initialized: false,
        tasks: [],
        isLoading: false,
        error: null,
      })
    }
  },

  createTask: async (projectId, taskData) => {
    const id = generateUniqueId("task")
    const taskId = generateUniqueId("tsk")
    const now = getCurrentTimestamp()
    const currentUser = getCurrentUser()

    try {
      console.log("➕ Creating task:", taskData.name)

      const tasksCollection = database.tasks

      // Get the highest order in the target column from current state
      const tasksInColumn = get().tasks.filter(
        (task) => task.columnId === taskData.columnId
      )
      const maxOrder = Math.max(...tasksInColumn.map((task) => task.order), -1)

      const newTask: TaskDataSchema = {
        ...taskData,
        id,
        taskId,
        projectId,
        order: maxOrder + 1,
        createdAt: now,
        updatedAt: now,
        createdBy: currentUser,
        updatedBy: currentUser,
        completed: taskData.completed ?? false,
        priority: taskData.priority ?? "medium",
        labelsTags: taskData.labelsTags ?? [],
        attachments: taskData.attachments ?? [],
        assignedTo: taskData.assignedTo ?? [],
        subTasks: taskData.subTasks ?? [],
        comments: taskData.comments ?? 0,
      }

      // Prepare data for RxDB insertion
      const taskDataForDb = convertReadonlyArraysForDb(newTask)

      // Insert into database - reactive subscription will update the store automatically
      await tasksCollection.insert(taskDataForDb as any)

      console.log("✅ Task created successfully")
      return taskId
    } catch (error) {
      console.error("❌ Failed to create task:", error)
      set({ error: "Failed to create task" })
      throw error
    }
  },

  updateTask: async (taskId, updates) => {
    try {
      console.log("✏️ Updating task:", taskId)

      const now = getCurrentTimestamp()
      const currentUser = getCurrentUser()

      const tasksCollection = database.tasks
      const task = await tasksCollection
        .findOne({ selector: { taskId } })
        .exec()

      if (!task) throw new Error("Task not found in database")

      // Prepare data for RxDB update
      const updatesForDb = convertReadonlyArraysForDb(updates)

      const finalUpdatesForDb = {
        ...updatesForDb,
        updatedAt: now,
        updatedBy: currentUser,
      }

      // Update database - reactive subscription will update the store automatically
      await task.update({ $set: finalUpdatesForDb })

      console.log("✅ Task updated successfully")
    } catch (error) {
      console.error("❌ Failed to update task:", error)
      set({ error: "Failed to update task" })
      throw error
    }
  },

  deleteTask: async (taskId) => {
    try {
      console.log("🗑️ Deleting task:", taskId)

      const tasksCollection = database.tasks
      const task = await tasksCollection
        .findOne({ selector: { taskId } })
        .exec()

      if (task) {
        // Delete from database - reactive subscription will update the store automatically
        await task.remove()
        console.log("✅ Task deleted successfully")
      }
    } catch (error) {
      console.error("❌ Failed to delete task:", error)
      set({ error: "Failed to delete task" })
      throw error
    }
  },

  moveTask: async (taskId, targetColumnId, targetIndex) => {
    // Check if there's already an active move operation for this task
    const activeMove = moveOperationTracker.getActiveMove(taskId)
    if (activeMove) {
      // If the target is the same, skip this operation
      if (
        activeMove.targetColumnId === targetColumnId &&
        activeMove.targetIndex === targetIndex
      ) {
        console.log("⚠️ Skipping duplicate move operation for:", taskId)
        return
      }
      console.log("🔄 Superseding previous move operation for:", taskId)
    }

    return moveOperationTracker.queueMove(
      taskId,
      async () => {
        try {
          console.log(
            "🔄 Moving task:",
            taskId,
            "to column:",
            targetColumnId,
            "index:",
            targetIndex
          )

          const now = getCurrentTimestamp()
          const currentUser = getCurrentUser()

          // Get current task position
          const currentTask = get().tasks.find((t) => t.taskId === taskId)
          if (!currentTask) {
            throw new Error("Task not found in current state")
          }

          // Get tasks in the target column from current state (excluding the task being moved)
          const tasksInTargetColumn = get()
            .tasks.filter(
              (t) => t.columnId === targetColumnId && t.taskId !== taskId
            )
            .sort((a, b) => a.order - b.order)

          console.log("📊 Tasks in target column:", tasksInTargetColumn.length)

          // Calculate new order with robust bounds checking
          let newOrder: number

          // Normalize targetIndex to handle edge cases
          let normalizedIndex = targetIndex

          // Handle invalid indices
          if (normalizedIndex === undefined || normalizedIndex === null) {
            normalizedIndex = tasksInTargetColumn.length // Add to end
          } else if (normalizedIndex < 0) {
            normalizedIndex = 0 // Add to beginning if negative
          } else if (normalizedIndex > tasksInTargetColumn.length) {
            normalizedIndex = tasksInTargetColumn.length // Add to end if too large
          }

          console.log(
            "📍 Normalized index:",
            normalizedIndex,
            "of",
            tasksInTargetColumn.length
          )

          if (tasksInTargetColumn.length === 0) {
            // Empty column - start at order 0
            newOrder = 0
          } else if (normalizedIndex === 0) {
            // Add to beginning
            newOrder = Math.max(0, tasksInTargetColumn[0].order / 2)
          } else if (normalizedIndex >= tasksInTargetColumn.length) {
            // Add to end
            newOrder =
              tasksInTargetColumn[tasksInTargetColumn.length - 1].order + 1
          } else {
            // Add between two tasks
            const prevTask = tasksInTargetColumn[normalizedIndex - 1]
            const nextTask = tasksInTargetColumn[normalizedIndex]

            if (!prevTask || !nextTask) {
              // Fallback if tasks are undefined
              console.warn("⚠️ Task ordering fallback triggered")
              newOrder =
                tasksInTargetColumn.length > 0
                  ? tasksInTargetColumn[tasksInTargetColumn.length - 1].order +
                    1
                  : 0
            } else {
              newOrder = (prevTask.order + nextTask.order) / 2
            }
          }

          console.log("📍 Calculated new order:", newOrder)

          // Validate newOrder is a valid number
          if (Number.isNaN(newOrder) || !Number.isFinite(newOrder)) {
            console.error("❌ Invalid newOrder calculated:", newOrder)
            throw new Error("Invalid order calculation")
          }

          // Check if the move is actually needed
          if (
            currentTask.columnId === targetColumnId &&
            Math.abs(currentTask.order - newOrder) < 0.001
          ) {
            console.log(
              "ℹ️ Task is already in the correct position, skipping database update"
            )
            return
          }

          // Update in database - reactive subscription will update the store automatically
          const tasksCollection = database.tasks
          const dbTask = await tasksCollection
            .findOne({ selector: { taskId } })
            .exec()

          if (!dbTask) throw new Error("Task not found in database")

          await dbTask.update({
            $set: {
              columnId: targetColumnId,
              order: newOrder,
              updatedAt: now,
              updatedBy: currentUser,
            },
          })

          console.log("✅ Task moved successfully")
        } catch (error) {
          console.error("❌ Failed to move task:", error)
          set({ error: "Failed to move task" })
          throw error
        }
      },
      targetColumnId,
      targetIndex
    )
  },
}))
