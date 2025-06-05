import { create } from "zustand"

import { type TaskStatusDocType, database } from "sql"
import { generateUniqueId, getCurrentTimestamp } from "../sql/helper"

interface TaskStatusStore {
  taskStatuses: TaskStatusDocType[]
  isLoading: boolean
  error: string | null
  initialized: boolean

  // Initialize store
  initialize: (projectId: string) => Promise<void>

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
    > // Expects name, color (optional due to schema default), description (optional)
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
  id: "user-id", // Replace with actual user ID logic
  name: "Current User", // Replace with actual user name logic
  image: "/placeholder.svg", // Replace with actual user image logic
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

  initialize: async (projectId: string) => {
    if (
      get().initialized &&
      get().taskStatuses.some((ts) => ts.projectId === projectId)
    )
      return

    set({ isLoading: true, error: null })

    try {
      const taskStatusCollection = database.taskStatus
      const projectTaskStatuses = await taskStatusCollection
        .find({
          selector: { projectId },
          sort: [{ order: "asc" }],
        })
        .exec()

      const normalizedTaskStatuses = projectTaskStatuses.map((ts) =>
        ts.toJSON()
      )

      if (normalizedTaskStatuses.length === 0 && projectId) {
        await get().createDefaultTaskStatuses(projectId)
        return
      }

      set((state) => ({
        taskStatuses: [
          ...state.taskStatuses.filter((ts) => ts.projectId !== projectId),
          ...normalizedTaskStatuses,
        ].sort((a, b) => a.order - b.order),
        initialized: true,
        isLoading: false,
        error: null,
      }))
    } catch (error) {
      console.error("Failed to initialize task statuses:", error)
      set({
        error: "Failed to load task statuses",
        isLoading: false,
        initialized: false,
      })
    }
  },

  createTaskStatus: async (projectId, taskStatusData) => {
    const id = generateUniqueId("ts")
    const now = getCurrentTimestamp()
    const currentUser = getCurrentUser()

    try {
      const taskStatusCollection = database.taskStatus
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
        // Color will use schema default if not provided, or provided color
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

      set((state) => ({
        taskStatuses: [...state.taskStatuses, newTaskStatus].sort(
          (a, b) => a.order - b.order
        ),
      }))

      await taskStatusCollection.insert(newTaskStatus)
      return id
    } catch (error) {
      console.error("Failed to create task status:", error)
      set((state) => ({
        taskStatuses: state.taskStatuses.filter((ts) => ts.id !== id),
        error: "Failed to create task status",
      }))
      throw error
    }
  },

  updateTaskStatus: async (taskStatusId, updates) => {
    const originalTaskStatus = get().taskStatuses.find(
      (ts) => ts.id === taskStatusId
    )
    if (!originalTaskStatus) throw new Error("Task status not found")

    try {
      const now = getCurrentTimestamp()
      const currentUser = getCurrentUser()
      const updatedData = {
        ...updates,
        updatedAt: now,
        updatedBy: currentUser,
      }

      set((state) => ({
        taskStatuses: state.taskStatuses
          .map((ts) =>
            ts.id === taskStatusId ? { ...ts, ...updatedData } : ts
          )
          .sort((a, b) => a.order - b.order),
      }))

      const taskStatusCollection = database.taskStatus
      const taskStatusDoc = await taskStatusCollection
        .findOne({ selector: { id: taskStatusId } })
        .exec()

      if (!taskStatusDoc) throw new Error("Task status not found in database")

      await taskStatusDoc.update({ $set: updatedData })
    } catch (error) {
      console.error("Failed to update task status:", error)
      set((state) => ({
        taskStatuses: state.taskStatuses
          .map((ts) => (ts.id === taskStatusId ? originalTaskStatus : ts))
          .sort((a, b) => a.order - b.order),
        error: "Failed to update task status",
      }))
      throw error
    }
  },

  deleteTaskStatus: async (taskStatusId) => {
    const taskStatusToDelete = get().taskStatuses.find(
      (ts) => ts.id === taskStatusId
    )
    if (!taskStatusToDelete) throw new Error("Task status not found")

    try {
      const tasksCollection = database.tasks
      const tasksInStatus = await tasksCollection
        .find({ selector: { columnId: taskStatusId } }) // taskSchema uses 'columnId' for status id
        .exec()

      if (tasksInStatus.length > 0) {
        throw new Error(
          "Cannot delete status with tasks. Please move or delete tasks first."
        )
      }

      set((state) => ({
        taskStatuses: state.taskStatuses.filter((ts) => ts.id !== taskStatusId),
      }))

      const taskStatusCollection = database.taskStatus
      const taskStatusDoc = await taskStatusCollection
        .findOne({ selector: { id: taskStatusId } })
        .exec()

      if (taskStatusDoc) {
        await taskStatusDoc.remove()
      }
    } catch (error) {
      console.error("Failed to delete task status:", error)
      if (taskStatusToDelete) {
        set((state) => ({
          taskStatuses: [...state.taskStatuses, taskStatusToDelete].sort(
            (a, b) => a.order - b.order
          ),
          error:
            error instanceof Error
              ? error.message
              : "Failed to delete task status",
        }))
      }
      throw error
    }
  },

  reorderTaskStatuses: async (taskStatusIds) => {
    const originalTaskStatuses = [...get().taskStatuses]

    try {
      const now = getCurrentTimestamp()
      const currentUser = getCurrentUser()

      set((state) => ({
        taskStatuses: state.taskStatuses
          .map((ts) => {
            const newOrder = taskStatusIds.indexOf(ts.id)
            if (newOrder !== -1 && ts.order !== newOrder) {
              return {
                ...ts,
                order: newOrder,
                updatedAt: now,
                updatedBy: currentUser,
              }
            }
            return ts
          })
          .sort((a, b) => a.order - b.order),
      }))

      const taskStatusCollection = database.taskStatus
      // Create an array of updates with new order values
      const updates = taskStatusIds.map((id, order) => ({
        id,
        order,
        updatedAt: now,
        updatedBy: currentUser,
      }))

      // Batch-insert or update all statuses at once
      await taskStatusCollection.bulkUpsert(updates)
    } catch (error) {
      console.error("Failed to reorder task statuses:", error)
      set({
        taskStatuses: originalTaskStatuses,
        error: "Failed to reorder task statuses",
      })
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

      await Promise.all(
        newTaskStatuses.map((ts) => taskStatusCollection.insert(ts))
      )

      // Update state by replacing statuses for the current project only
      set((state) => ({
        taskStatuses: [
          ...state.taskStatuses.filter((ts) => ts.projectId !== projectId),
          ...newTaskStatuses,
        ].sort((a, b) => a.order - b.order),
        initialized: true,
        isLoading: false,
        error: null,
      }))
    } catch (error) {
      console.error("Failed to create default task statuses:", error)
      set({
        error: "Failed to create default task statuses",
        isLoading: false,
      })
      throw error
    }
  },
}))
