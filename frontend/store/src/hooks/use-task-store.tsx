import { create } from "zustand"
import type { TaskDataSchema } from "../sql/task-schemas"
import { database } from "../sql"
import { generateUniqueId, getCurrentTimestamp } from "../sql/helper"

interface TaskStore {
  tasks: TaskDataSchema[]
  isLoading: boolean
  error: string | null
  initialized: boolean

  // Initialize store
  initialize: (projectId: string) => Promise<void>

  // CRUD operations
  createTask: (
    projectId: string,
    taskData: Omit<TaskDataSchema, "id" | "taskId" | "projectId" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy" | "order">
  ) => Promise<string>
  
  updateTask: (
    taskId: string,
    updates: Partial<Omit<TaskDataSchema, "id" | "projectId" | "createdAt" | "createdBy">>
  ) => Promise<void>
  
  deleteTask: (taskId: string) => Promise<void>
  
  // Task movement
  moveTask: (
    taskId: string,
    targetColumnId: string,
    targetIndex?: number
  ) => Promise<void>
  
  reorderTasksInColumn: (
    columnId: string,
    taskIds: string[]
  ) => Promise<void>
  
  // Getters
  getTasksByProject: (projectId: string) => TaskDataSchema[];
  getTasksByColumn: (columnId: string) => TaskDataSchema[];
  getTaskById: (taskId: string) => TaskDataSchema | undefined;
  
  // Bulk operations
  moveTasksBetweenColumns: (
    taskIds: string[],
    fromColumnId: string,
    toColumnId: string
  ) => Promise<void>
  
  // Local state updates for optimistic UI
  updateLocalTaskOrder: (columnId: string, reorderedTasks: TaskDataSchema[]) => void
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

  getTasksByProject: (projectId: string): TaskDataSchema[] => {
    return get().tasks.filter((task: TaskDataSchema) => task.projectId === projectId);
  },
  getTasksByColumn: (columnId: string): TaskDataSchema[] => {
    return get().tasks.filter((task: TaskDataSchema) => task.columnId === columnId).sort((a, b) => a.order - b.order);
  },
  getTaskById: (taskId: string): TaskDataSchema | undefined => {
    return get().tasks.find((task: TaskDataSchema) => task.taskId === taskId);
  },

  initialize: async (projectId: string) => {
    set({ isLoading: true, error: null })

    try {
      const tasksCollection = database.tasks
      const projectTasks = await tasksCollection
        .find({
          selector: { projectId },
          sort: [{ columnId: "asc" }, { order: "asc" }],
        })
        .exec()

      const normalizedTasks = projectTasks.map((taskDoc) => {
        const task = taskDoc.toJSON();
        return {
          ...task,
          completed: task.completed ?? false, // Ensure completed is always boolean
          // Ensure other non-optional fields in TaskDataSchema that might be undefined from toJSON() have defaults
          // Example: priority: task.priority ?? "medium", (already handled in createTask, but good to be mindful)
          // labelsTags, attachments, assignedTo, subTasks are ReadonlyArray and should be handled if they can be undefined from toJSON()
          // and are non-optional in TaskDataSchema. Currently, they are non-optional in TaskDataSchema
          // and defaulted to [] in createTask, so toJSON() should provide at least [].
        } as TaskDataSchema; // Assert type after ensuring compatibility
      })

      set({
        tasks: normalizedTasks,
        initialized: true,
        isLoading: false,
        error: null,
      })
    } catch (error) {
      console.error("Failed to initialize tasks:", error)
      set({
        error: "Failed to load tasks",
        isLoading: false,
        initialized: false,
      })
    }
  },

  createTask: async (projectId, taskData) => {
    const id = generateUniqueId("task")
    const taskId = generateUniqueId("tsk")
    const now = getCurrentTimestamp()
    const currentUser = getCurrentUser()

    try {
      const tasksCollection = database.tasks
      
      // Get the highest order in the target column
      const tasksInColumn = get().tasks.filter(
        task => task.columnId === taskData.columnId
      )
      const maxOrder = Math.max(...tasksInColumn.map(task => task.order), -1)

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
        // Set defaults for optional fields
        completed: taskData.completed ?? false,
        priority: taskData.priority ?? "medium",
        labelsTags: taskData.labelsTags ?? [],
        attachments: taskData.attachments ?? [],
        assignedTo: taskData.assignedTo ?? [],
        subTasks: taskData.subTasks ?? [],
        comments: taskData.comments ?? 0,
      }

      // Optimistic update
      set((state) => ({
        tasks: [...state.tasks, newTask],
      }))

      // Prepare data for RxDB insertion by converting ReadonlyArrays to mutable Arrays
      const taskDataForDb = {
        ...newTask,
        labelsTags: Array.isArray(newTask.labelsTags) ? [...newTask.labelsTags] : [],
        attachments: Array.isArray(newTask.attachments) ? [...newTask.attachments] : [],
        assignedTo: Array.isArray(newTask.assignedTo) ? [...newTask.assignedTo] : [],
        subTasks: Array.isArray(newTask.subTasks) ? [...newTask.subTasks] : [],
      };
      await tasksCollection.insert(taskDataForDb)
      
      return taskId
    } catch (error) {
      console.error("Failed to create task:", error)
      
      // Revert optimistic update
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
        error: "Failed to create task",
      }))
      
      throw error
    }
  },

  updateTask: async (taskId, updates) => {
    const originalTask = get().tasks.find(t => t.taskId === taskId)
    if (!originalTask) throw new Error("Task not found")

    try {
      const now = getCurrentTimestamp()
      const currentUser = getCurrentUser()
      const updatedDataForState = { 
        ...updates, 
        updatedAt: now, 
        updatedBy: currentUser 
      }

      // Optimistic update
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.taskId === taskId ? { ...task, ...updatedDataForState } : task
        ),
      }))

      const tasksCollection = database.tasks
      const task = await tasksCollection
        .findOne({ selector: { taskId } })
        .exec()

      if (!task) throw new Error("Task not found in database")

      // Prepare data for RxDB update by converting ReadonlyArrays if they exist in updates
      const updatesForDb: Partial<TaskDataSchema> = { ...updates };
      if (updates.labelsTags && Array.isArray(updates.labelsTags)) {
        updatesForDb.labelsTags = [...updates.labelsTags];
      }
      if (updates.attachments && Array.isArray(updates.attachments)) {
        updatesForDb.attachments = [...updates.attachments];
      }
      if (updates.assignedTo && Array.isArray(updates.assignedTo)) {
        updatesForDb.assignedTo = [...updates.assignedTo];
      }
      if (updates.subTasks && Array.isArray(updates.subTasks)) {
        updatesForDb.subTasks = [...updates.subTasks];
      }
      
      const finalUpdatesForDb = {
        ...updatesForDb,
        updatedAt: now,
        updatedBy: currentUser,
      }

      await task.update({ $set: finalUpdatesForDb })
    } catch (error) {
      console.error("Failed to update task:", error)
      
      // Revert optimistic update
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.taskId === taskId ? originalTask : task
        ),
        error: "Failed to update task",
      }))
      
      throw error
    }
  },

  deleteTask: async (taskId) => {
    const taskToDelete = get().tasks.find(t => t.taskId === taskId)
    if (!taskToDelete) throw new Error("Task not found")

    try {
      // Optimistic update
      set((state) => ({
        tasks: state.tasks.filter((t) => t.taskId !== taskId),
      }))

      const tasksCollection = database.tasks
      const task = await tasksCollection
        .findOne({ selector: { taskId } })
        .exec()

      if (task) {
        await task.remove()
      }
    } catch (error) {
      console.error("Failed to delete task:", error)
      
      // Revert optimistic update
      set((state) => ({
        tasks: [...state.tasks, taskToDelete],
        error: "Failed to delete task",
      }))
      
      throw error
    }
  },

  moveTask: async (taskId, targetColumnId, targetIndex) => {
    const task = get().tasks.find(t => t.taskId === taskId)
    if (!task) throw new Error("Task not found")

    const originalTasks = [...get().tasks]

    try {
      const now = getCurrentTimestamp()
      const currentUser = getCurrentUser()
      
      // Get tasks in the target column
      const tasksInTargetColumn = get()
        .tasks.filter(t => t.columnId === targetColumnId && t.taskId !== taskId)
        .sort((a, b) => a.order - b.order)

      // Calculate new order
      let newOrder: number
      if (targetIndex === undefined || targetIndex >= tasksInTargetColumn.length) {
        // Add to end
        newOrder = tasksInTargetColumn.length > 0 
          ? tasksInTargetColumn[tasksInTargetColumn.length - 1].order + 1 
          : 0
      } else if (targetIndex === 0) {
        // Add to beginning
        newOrder = tasksInTargetColumn.length > 0 
          ? tasksInTargetColumn[0].order / 2 
          : 0
      } else {
        // Add between two tasks
        const prevOrder = tasksInTargetColumn[targetIndex - 1].order
        const nextOrder = tasksInTargetColumn[targetIndex].order
        newOrder = (prevOrder + nextOrder) / 2
      }

      // Optimistic update
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t.taskId === taskId
            ? {
                ...t,
                columnId: targetColumnId,
                order: newOrder,
                updatedAt: now,
                updatedBy: currentUser,
              }
            : t
        ),
      }))

      // Update in database
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
    } catch (error) {
      console.error("Failed to move task:", error)
      
      // Revert optimistic update
      set({
        tasks: originalTasks,
        error: "Failed to move task",
      })
      
      throw error
    }
  },

  reorderTasksInColumn: async (columnId, taskIds) => {
    const originalTasks = [...get().tasks]

    try {
      const now = getCurrentTimestamp()
      const currentUser = getCurrentUser()

      // Optimistic update
      set((state) => ({
        tasks: state.tasks.map((task) => {
          if (task.columnId === columnId) {
            const newOrder = taskIds.indexOf(task.taskId)
            if (newOrder !== -1) {
              return {
                ...task,
                order: newOrder,
                updatedAt: now,
                updatedBy: currentUser,
              }
            }
          }
          return task
        }),
      }))

      // Update in database
      const tasksCollection = database.tasks
      for (let i = 0; i < taskIds.length; i++) {
        const taskId = taskIds[i]
        const task = await tasksCollection
          .findOne({ selector: { taskId } })
          .exec()
          
        if (task) {
          await task.update({
            $set: { 
              order: i, 
              updatedAt: now, 
              updatedBy: currentUser 
            },
          })
        }
      }
    } catch (error) {
      console.error("Failed to reorder tasks:", error)
      
      // Revert optimistic update
      set({
        tasks: originalTasks,
        error: "Failed to reorder tasks",
      })
      
      throw error
    }
  },

  moveTasksBetweenColumns: async (taskIds,  toColumnId) => {
    const originalTasks = [...get().tasks]

    try {
      const now = getCurrentTimestamp()
      const currentUser = getCurrentUser()

      // Get existing tasks in target column
      const tasksInTargetColumn = get()
        .tasks.filter(t => t.columnId === toColumnId)
        .sort((a, b) => a.order - b.order)
      
      const startOrder = tasksInTargetColumn.length > 0
        ? tasksInTargetColumn[tasksInTargetColumn.length - 1].order + 1
        : 0

      // Optimistic update
      set((state) => ({
        tasks: state.tasks.map((task) => {
          const taskIndex = taskIds.indexOf(task.taskId)
          if (taskIndex !== -1) {
            return {
              ...task,
              columnId: toColumnId,
              order: startOrder + taskIndex,
              updatedAt: now,
              updatedBy: currentUser,
            }
          }
          return task
        }),
      }))

      // Update in database
      const tasksCollection = database.tasks
      for (let i = 0; i < taskIds.length; i++) {
        const taskId = taskIds[i]
        const task = await tasksCollection
          .findOne({ selector: { taskId } })
          .exec()
          
        if (task) {
          await task.update({
            $set: {
              columnId: toColumnId,
              order: startOrder + i,
              updatedAt: now,
              updatedBy: currentUser,
            },
          })
        }
      }
    } catch (error) {
      console.error("Failed to move tasks between columns:", error)
      
      // Revert optimistic update
      set({
        tasks: originalTasks,
        error: "Failed to move tasks",
      })
      
      throw error
    }
  },



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
}))