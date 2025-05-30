import { database } from "sql"
import type { TaskDataSchema } from "sql"
import { create } from "zustand"
import { generateUniqueId, getCurrentTimestamp } from "../sql/helper"

interface TaskStore {
  tasks: TaskDataSchema[]
  isInitialLoading: boolean // ✅ Only for initial load
  error: string | null
  initialized: boolean

  // Initialization
  initialize: () => Promise<void>

  // CRUD operations (using taskId for operations)
  createTask: (
    taskData: Omit<TaskDataSchema, "id" | "taskId" | "createdAt" | "updatedAt">
  ) => Promise<string>
  getTaskByTaskId: (taskId: string) => Promise<TaskDataSchema | null>
  updateTaskByTaskId: (
    taskId: string,
    updates: Partial<TaskDataSchema>
  ) => Promise<void>
  deleteTaskByTaskId: (taskId: string) => Promise<void>

  // Bulk operations for drag and drop
  moveTask: (
    taskId: string,
    newColumnId: string,
    newOrder: number
  ) => Promise<void>
  reorderTasksInColumn: (columnId: string, taskIds: string[]) => Promise<void>
  moveTaskBetweenColumns: (
    taskId: string,
    fromColumnId: string,
    toColumnId: string,
    newOrder: number
  ) => Promise<void>

  // Query operations
  getTasksByColumn: (columnId: string) => TaskDataSchema[]
  getAllTasks: () => TaskDataSchema[]

  // Local state management for drag and drop
  updateLocalTaskOrder: (
    columnId: string,
    reorderedTasks: TaskDataSchema[]
  ) => void
  updateLocalTaskMove: (
    taskId: string,
    newColumnId: string,
    allTasks: TaskDataSchema[]
  ) => void
}

const getCurrentUser = () => ({
  id: "dsaf0erlkdsfa",
  name: "Regina Cooper",
  image: "/placeholder.svg?height=32&width=32",
})

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isInitialLoading: false, // ✅ Renamed from isLoading
  error: null,
  initialized: false,

  initialize: async () => {
    if (get().initialized) return

    set({ isInitialLoading: true, error: null }) // ✅ Only set loading for initial load

    try {
      const tasksCollection = database.taskData
      const allTasks = await tasksCollection.find().exec()
      const normalizedTasks = allTasks.map((task) => task.toJSON())

      set({
        tasks: normalizedTasks,
        initialized: true,
        isInitialLoading: false,
        error: null,
      })

      console.log(`Loaded ${normalizedTasks.length} tasks`)
    } catch (error) {
      console.error("Failed to initialize tasks:", error)
      set({
        error: "Failed to initialize tasks",
        isInitialLoading: false,
        initialized: false,
      })
    }
  },

  createTask: async (taskData) => {
    // ✅ NO loading state - just update tasks immediately
    let id: string // Declare the id variable
    try {
      const tasksCollection = database.taskData
      const now = getCurrentTimestamp()
      id = generateUniqueId("task")
      const taskId = generateUniqueId("tsk")
      const currentUser = getCurrentUser()

      const newTask: TaskDataSchema = {
        ...taskData,
        id,
        taskId,
        createdAt: now,
        updatedAt: now,
        createdBy: currentUser, // ✅ Now an object
        updatedBy: currentUser, // ✅ Now an object
      }

      // ✅ Update store immediately - this triggers UI update
      set((state) => ({
        tasks: [...state.tasks, newTask],
      }))

      // ✅ Sync to database in background
      await tasksCollection.insert(newTask)
      console.log(`✅ Created task: ${taskId}`)
      return taskId
    } catch (error) {
      console.error("❌ Failed to create task:", error)
      // ✅ Revert optimistic update
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
        error: "Failed to create task",
      }))
      throw error
    }
  },

  getTaskByTaskId: async (taskId) => {
    try {
      // First check if we have it in the local state
      const localTask = get().tasks.find((t) => t.taskId === taskId)
      if (localTask) return localTask

      // If not found locally, try to fetch from database
      const tasksCollection = database.taskData
      const task = await tasksCollection
        .findOne({
          selector: { taskId },
        })
        .exec()

      return task ? task.toJSON() : null
    } catch (error) {
      console.error("❌ Failed to get task:", error)
      return null
    }
  },

  updateTaskByTaskId: async (taskId, updates) => {
    // ✅ NO loading state - just update tasks immediately
    try {
      const now = getCurrentTimestamp()
      const currentUser = getCurrentUser()
      const updatedData = { ...updates, updatedAt: now, updatedBy: currentUser }

      // ✅ Update store immediately - this triggers UI update
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t.taskId === taskId ? { ...t, ...updatedData } : t
        ),
      }))

      // ✅ Sync to database in background
      const tasksCollection = database.taskData
      const task = await tasksCollection
        .findOne({ selector: { taskId } })
        .exec()

      if (!task) throw new Error("Task not found")

      await task.update({ $set: updatedData })
      console.log(`✅ Updated task: ${taskId}`)
    } catch (error) {
      console.error("❌ Failed to update task:", error)
      set({ error: "Failed to update task" })
      throw error
    }
  },

  deleteTaskByTaskId: async (taskId) => {
    // ✅ NO loading state - just update tasks immediately
    const taskToDelete = get().tasks.find((t) => t.taskId === taskId)

    try {
      // ✅ Update store immediately - this triggers UI update
      set((state) => ({
        tasks: state.tasks.filter((t) => t.taskId !== taskId),
      }))

      // ✅ Sync to database in background
      const tasksCollection = database.taskData
      const task = await tasksCollection
        .findOne({ selector: { taskId } })
        .exec()

      if (task) {
        await task.remove()
        console.log(`✅ Deleted task: ${taskId}`)
      }
    } catch (error) {
      console.error("❌ Failed to delete task:", error)
      // ✅ Revert optimistic update
      if (taskToDelete) {
        set((state) => ({
          tasks: [...state.tasks, taskToDelete],
          error: "Failed to delete task",
        }))
      }
      throw error
    }
  },

  moveTask: async (taskId, newColumnId, newOrder) => {
    await get().updateTaskByTaskId(taskId, {
      columnId: newColumnId,
      taskOrder: newOrder,
    })
  },

  reorderTasksInColumn: async (columnId, taskIds) => {
    // ✅ NO loading state - just update tasks immediately
    try {
      const now = getCurrentTimestamp()
      const currentUser = getCurrentUser()

      // ✅ Update store immediately - this triggers UI update
      set((state) => ({
        tasks: state.tasks.map((task) => {
          if (task.columnId === columnId) {
            const newOrder = taskIds.indexOf(task.taskId)
            if (newOrder !== -1) {
              return {
                ...task,
                taskOrder: newOrder,
                updatedAt: now,
                updatedBy: currentUser,
              }
            }
          }
          return task
        }),
      }))

      // ✅ Sync to database in background
      const tasksCollection = database.taskData
      for (let i = 0; i < taskIds.length; i++) {
        const taskId = taskIds[i]
        const task = await tasksCollection
          .findOne({ selector: { taskId } })
          .exec()
        if (task) {
          await task.update({
            $set: { taskOrder: i, updatedAt: now, updatedBy: currentUser },
          })
        }
      }

      console.log(`✅ Reordered ${taskIds.length} tasks in column: ${columnId}`)
    } catch (error) {
      console.error("❌ Failed to reorder tasks:", error)
      set({ error: "Failed to reorder tasks" })
      throw error
    }
  },

  moveTaskBetweenColumns: async (
    taskId,
    fromColumnId,
    toColumnId,
    newOrder
  ) => {
    // ✅ NO loading state - just update tasks immediately
    try {
      const now = getCurrentTimestamp()
      const currentUser = getCurrentUser()

      // ✅ Update store immediately - this triggers UI update
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.taskId === taskId
            ? {
                ...task,
                columnId: toColumnId,
                taskOrder: newOrder,
                updatedAt: now,
                updatedBy: currentUser,
              }
            : task
        ),
      }))

      // ✅ Sync to database in background
      const tasksCollection = database.taskData
      const movedTask = await tasksCollection
        .findOne({ selector: { taskId } })
        .exec()

      if (!movedTask) throw new Error("Task not found")

      await movedTask.update({
        $set: {
          columnId: toColumnId,
          taskOrder: newOrder,
          updatedAt: now,
          updatedBy: currentUser,
        },
      })

      console.log(
        `✅ Moved task ${taskId} from ${fromColumnId} to ${toColumnId}`
      )
    } catch (error) {
      console.error("❌ Failed to move task between columns:", error)
      set({ error: "Failed to move task between columns" })
      throw error
    }
  },

  // Query methods (work with local state for performance)
  getTasksByColumn: (columnId) => {
    return get()
      .tasks.filter((task) => task.columnId === columnId)
      .sort((a, b) => a.taskOrder - b.taskOrder)
  },

  getAllTasks: () => {
    return get().tasks
  },

  // Local state updates for immediate UI feedback during drag and drop
  updateLocalTaskOrder: (columnId, reorderedTasks) => {
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.columnId === columnId) {
          const reorderedTask = reorderedTasks.find(
            (t) => t.taskId === task.taskId
          )
          return reorderedTask || task
        }
        return task
      }),
    }))
  },

  updateLocalTaskMove: (_taskId, _newColumnId, allTasks) => {
    set({ tasks: allTasks })
  },
}))
