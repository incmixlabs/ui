import { generateUniqueId, getCurrentTimestamp } from "@incmix/utils/helper"
import type { TaskStatusDocType } from "@incmix/utils/schema"
import type { Subscription } from "rxjs"
import { database } from "sql"
import { create } from "zustand"

interface TaskStatusStore {
  taskStatuses: TaskStatusDocType[]
  isLoading: boolean
  error: string | null
  initialized: boolean
  subscription: Subscription | null

  // Initialize store with reactive subscription
  initialize: (projectId: string) => Promise<void>
  cleanup: () => void

  // CRUD operations
  createTaskStatus: (
    projectId: string,
    taskStatusData: Omit<
      TaskStatusDocType,
      | "id"
      | "projectId"
      | "order"
      | "isDefault"
      | "createdAt"
      | "updatedAt"
      | "createdBy"
      | "updatedBy"
    >
  ) => Promise<string>

  updateTaskStatus: (
    taskStatusId: string,
    updates: Partial<Pick<TaskStatusDocType, "name" | "color" | "description">>
  ) => Promise<void>

  deleteTaskStatus: (taskStatusId: string) => Promise<void>
  reorderTaskStatuses: (taskStatusIds: string[]) => Promise<void>

  // Getters
  getTaskStatusesByProject: (projectId: string) => TaskStatusDocType[]
  getTaskStatusById: (taskStatusId: string) => TaskStatusDocType | undefined

  // Default task statuses management
  createDefaultTaskStatuses: (projectId: string) => Promise<void>
}

const getCurrentUser = () => ({
  id: "user-id",
  name: "Current User",
  image: "/placeholder.svg",
})

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
  { name: "Done", color: "#10b981", description: "Completed tasks" },
]

export const useTaskStatusStore = create<TaskStatusStore>((set, get) => ({
  taskStatuses: [],
  isLoading: false,
  error: null,
  initialized: false,
  subscription: null,

  initialize: async (projectId: string) => {
    const currentState = get()

    // Don't re-initialize if already initialized
    if (currentState.initialized) {
      console.log("📋 Task statuses already initialized")
      return
    }

    set({ isLoading: true, error: null })

    try {
      console.log("🔄 Initializing task statuses for project:", projectId)

      const taskStatusCollection = database.taskStatus

      // First check if we need to create default statuses
      const existingStatuses = await taskStatusCollection
        .find({
          selector: { projectId },
        })
        .exec()

      if (existingStatuses.length === 0) {
        console.log("📝 No statuses found, creating defaults...")
        await get().createDefaultTaskStatuses(projectId)
        return // createDefaultTaskStatuses will set up the subscription
      }

      // Set up reactive subscription to ALL task statuses for this project
      const subscription = taskStatusCollection
        .find({
          selector: { projectId },
          sort: [{ order: "asc" }],
        })
        .$.subscribe({
          next: (statusDocs) => {
            console.log(
              "📋 Task statuses subscription update:",
              statusDocs.length,
              "statuses"
            )

            const normalizedTaskStatuses = statusDocs.map((ts) => ts.toJSON())

            set({
              taskStatuses: normalizedTaskStatuses.sort(
                (a, b) => a.order - b.order
              ),
              isLoading: false,
              error: null,
              initialized: true,
            })
          },
          error: (error) => {
            console.error("❌ Task statuses subscription error:", error)
            set({
              error: "Failed to load task statuses",
              isLoading: false,
              initialized: false,
            })
          },
        })

      set({ subscription })
      console.log("✅ Task statuses subscription established")
    } catch (error) {
      console.error("❌ Failed to initialize task statuses:", error)
      set({
        error: "Failed to load task statuses",
        isLoading: false,
        initialized: false,
      })
    }
  },

  cleanup: () => {
    const subscription = get().subscription
    if (subscription) {
      console.log("🧹 Cleaning up task statuses subscription")
      subscription.unsubscribe()
      set({
        subscription: null,
        initialized: false,
        taskStatuses: [],
        isLoading: false,
        error: null,
      })
    }
  },

  createTaskStatus: async (projectId, taskStatusData) => {
    const id = generateUniqueId("ts")
    const now = getCurrentTimestamp()
    const currentUser = getCurrentUser()

    try {
      console.log("➕ Creating task status:", taskStatusData.name)

      const taskStatusCollection = database.taskStatus

      // Get existing statuses to calculate order
      const existingTaskStatuses = get().taskStatuses.filter(
        (ts) => ts.projectId === projectId
      )
      const maxOrder = Math.max(
        ...existingTaskStatuses.map((ts) => ts.order),
        -1
      )

      const newTaskStatus: TaskStatusDocType = {
        id,
        projectId,
        name: taskStatusData.name,
        color:
          taskStatusData.color ||
          DEFAULT_TASK_STATUSES.find((d) => d.name === taskStatusData.name)
            ?.color ||
          "#6366f1",
        description: taskStatusData.description,
        order: maxOrder + 1,
        isDefault: false,
        createdAt: now,
        updatedAt: now,
        createdBy: currentUser,
        updatedBy: currentUser,
      }

      // Insert into database - reactive subscription will update the store automatically
      await taskStatusCollection.insert(newTaskStatus)

      console.log("✅ Task status created successfully")
      return id
    } catch (error) {
      console.error("❌ Failed to create task status:", error)
      set({ error: "Failed to create task status" })
      throw error
    }
  },

  updateTaskStatus: async (taskStatusId, updates) => {
    try {
      console.log("✏️ Updating task status:", taskStatusId)

      const now = getCurrentTimestamp()
      const currentUser = getCurrentUser()
      const updatedData = {
        ...updates,
        updatedAt: now,
        updatedBy: currentUser,
      }

      const taskStatusCollection = database.taskStatus
      const taskStatusDoc = await taskStatusCollection
        .findOne({ selector: { id: taskStatusId } })
        .exec()

      if (!taskStatusDoc) throw new Error("Task status not found in database")

      // Update database - reactive subscription will update the store automatically
      await taskStatusDoc.update({ $set: updatedData })

      console.log("✅ Task status updated successfully")
    } catch (error) {
      console.error("❌ Failed to update task status:", error)
      set({ error: "Failed to update task status" })
      throw error
    }
  },

  deleteTaskStatus: async (taskStatusId) => {
    try {
      console.log("🗑️ Deleting task status:", taskStatusId)

      // Check if there are tasks in this status
      const tasksCollection = database.tasks
      const tasksInStatus = await tasksCollection
        .find({ selector: { columnId: taskStatusId } })
        .exec()

      if (tasksInStatus.length > 0) {
        throw new Error(
          "Cannot delete status with tasks. Please move or delete tasks first."
        )
      }

      const taskStatusCollection = database.taskStatus
      const taskStatusDoc = await taskStatusCollection
        .findOne({ selector: { id: taskStatusId } })
        .exec()

      if (taskStatusDoc) {
        // Delete from database - reactive subscription will update the store automatically
        await taskStatusDoc.remove()
        console.log("✅ Task status deleted successfully")
      }
    } catch (error) {
      console.error("❌ Failed to delete task status:", error)
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete task status"
      set({ error: errorMessage })
      throw error
    }
  },

  reorderTaskStatuses: async (taskStatusIds) => {
    try {
      console.log("🔄 Reordering task statuses:", taskStatusIds)

      const now = getCurrentTimestamp()
      const currentUser = getCurrentUser()

      const taskStatusCollection = database.taskStatus

      // Update each status with new order
      const updatePromises = taskStatusIds.map(async (id, order) => {
        const taskStatus = await taskStatusCollection
          .findOne({ selector: { id } })
          .exec()

        if (taskStatus) {
          return taskStatus.update({
            $set: {
              order,
              updatedAt: now,
              updatedBy: currentUser,
            },
          })
        }
      })

      // Execute all updates
      await Promise.all(updatePromises)

      console.log("✅ Task statuses reordered successfully")
    } catch (error) {
      console.error("❌ Failed to reorder task statuses:", error)
      set({ error: "Failed to reorder task statuses" })
      throw error
    }
  },

  getTaskStatusesByProject: (projectId) => {
    return get()
      .taskStatuses.filter((ts) => ts.projectId === projectId)
      .sort((a, b) => a.order - b.order)
  },

  getTaskStatusById: (taskStatusId) => {
    return get().taskStatuses.find((ts) => ts.id === taskStatusId)
  },

  createDefaultTaskStatuses: async (projectId) => {
    set({ isLoading: true, error: null })

    try {
      console.log("📝 Creating default task statuses for project:", projectId)

      const taskStatusCollection = database.taskStatus
      const now = getCurrentTimestamp()
      const currentUser = getCurrentUser()

      const newTaskStatuses: TaskStatusDocType[] = DEFAULT_TASK_STATUSES.map(
        (status, index) => ({
          id: generateUniqueId("ts"),
          projectId,
          name: status.name,
          color: status.color,
          description: status.description,
          order: index,
          isDefault: true,
          createdAt: now,
          updatedAt: now,
          createdBy: currentUser,
          updatedBy: currentUser,
        })
      )

      // Insert all default statuses
      await Promise.all(
        newTaskStatuses.map((ts) => taskStatusCollection.insert(ts))
      )

      // Now set up the reactive subscription
      const subscription = taskStatusCollection
        .find({
          selector: { projectId },
          sort: [{ order: "asc" }],
        })
        .$.subscribe({
          next: (statusDocs) => {
            console.log(
              "📋 Default statuses subscription update:",
              statusDocs.length,
              "statuses"
            )

            const normalizedTaskStatuses = statusDocs.map((ts) => ts.toJSON())

            set({
              taskStatuses: normalizedTaskStatuses.sort(
                (a, b) => a.order - b.order
              ),
              isLoading: false,
              error: null,
              initialized: true,
            })
          },
          error: (error) => {
            console.error("❌ Default statuses subscription error:", error)
            set({
              error: "Failed to load task statuses",
              isLoading: false,
              initialized: false,
            })
          },
        })

      set({ subscription })
      console.log(
        "✅ Default task statuses created and subscription established"
      )
    } catch (error) {
      console.error("❌ Failed to create default task statuses:", error)
      set({
        error: "Failed to create default task statuses",
        isLoading: false,
      })
      throw error
    }
  },
}))
