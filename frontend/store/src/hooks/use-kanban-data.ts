import { useEffect, useMemo } from "react"
import type { TaskDocType, TaskStatusDocType } from "../sql" // For explicit typing
import type { KanbanColumn, KanbanTask } from "../view-types/kanban-view.types" // Corrected path
import { useTaskStatusStore } from "./use-task-status-store" // Added import
import { useTaskStore } from "./use-task-store"

interface UseKanbanDataProps {
  projectId: string
}

interface UseKanbanDataReturn {
  columns: KanbanColumn[]
  isLoading: boolean
  error: string | null

  // Task operations
  createTask: (columnId: string, taskData: Partial<KanbanTask>) => Promise<void>
  updateTask: (taskId: string, updates: Partial<KanbanTask>) => Promise<void>
  deleteTask: (taskId: string) => Promise<void>
  moveTask: (
    taskId: string,
    targetColumnId: string,
    targetIndex?: number
  ) => Promise<void>

  // Column (Task Status) operations
  createColumn: (name: string, color?: string) => Promise<string> // Return type changed to string (ID)
  updateColumn: (
    columnId: string,
    updates: { name?: string; color?: string; description?: string }
  ) => Promise<void>
  deleteColumn: (columnId: string) => Promise<void>
  reorderColumns: (columnIds: string[]) => Promise<void>
}

export function useKanbanData({
  projectId,
}: UseKanbanDataProps): UseKanbanDataReturn {
  const {
    tasks,
    isLoading: tasksLoading,
    error: tasksError,
    initialize: initializeTasks,
    createTask: createTaskInStore, // Renamed to avoid conflict
    updateTask: updateTaskInStore, // Renamed
    deleteTask: deleteTaskInStore, // Renamed
    moveTask: moveTaskInStore, // Renamed
    getTasksByColumn,
  } = useTaskStore()

  const {
    taskStatuses, // This is the array of task statuses (columns)
    isLoading: taskStatusesLoading,
    error: taskStatusesError,
    initialize: initializeTaskStatuses,
    createTaskStatus, // Method to create a new task status
    updateTaskStatus, // Method to update a task status
    deleteTaskStatus, // Method to delete a task status
    reorderTaskStatuses, // Method to reorder task statuses
    getTaskStatusesByProject, // Getter for task statuses by project
  } = useTaskStatusStore()

  // Initialize stores when component mounts or projectId changes
  useEffect(() => {
    if (projectId) {
      initializeTaskStatuses(projectId)
      initializeTasks(projectId)
    }
  }, [projectId, initializeTaskStatuses, initializeTasks])

  // Transform data into kanban format
  const kanbanColumns = useMemo<KanbanColumn[]>(() => {
    if (!projectId) return [] // Guard against undefined projectId
    const projectTaskStatuses = getTaskStatusesByProject(projectId)

    return projectTaskStatuses.map((status: TaskStatusDocType) => ({
      // Explicitly type 'status'
      ...status, // Spread the TaskStatusDocType properties
      tasks: getTasksByColumn(status.id) as KanbanTask[], // Cast to KanbanTask[]
    }))
  }, [
    projectId,
    taskStatuses,
    tasks,
    getTaskStatusesByProject,
    getTasksByColumn,
  ])

  // Task operations
  const createTask = async (
    columnId: string,
    taskData: Partial<KanbanTask>
  ) => {
    await createTaskInStore(projectId, {
      name: taskData.name || "New Task",
      columnId, // This is the taskStatusId (columnId in the task schema)
      description: taskData.description || "",
      startDate: taskData.startDate || new Date().toISOString(),
      endDate: taskData.endDate || "",
      priority: taskData.priority || "medium",
      labelsTags: taskData.labelsTags || [],
      attachments: taskData.attachments || [],
      assignedTo: (taskData.assignedTo || []).map((user) => ({
        ...user,
        id: user.id, // ensure id is present
        name: user.name, // ensure name is present
        avatar: user.avatar || "/placeholder-avatar.png", // Provide a default avatar if undefined
      })),
      subTasks: taskData.subTasks || [],
      completed: taskData.completed === undefined ? false : taskData.completed,
      comments: taskData.comments === undefined ? 0 : taskData.comments,
    })
  }

  // Constants for field filtering
  const AUDIT_FIELDS = [
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt",
  ] as const
  const IMMUTABLE_FIELDS = ["id", "projectId"] as const
  const EXCLUDED_FIELDS = [...AUDIT_FIELDS, ...IMMUTABLE_FIELDS] as const
  const DEFAULT_AVATAR = "/placeholder-avatar.png"

  // Utility to omit fields from an object
  function omitFields<
    T extends Record<string, any>,
    K extends readonly string[],
  >(obj: T, fields: K): Pick<T, Exclude<keyof T, K[number]>> {
    const result = { ...obj } as any
    fields.forEach((field) => delete result[field])
    return result
  }

  const updateTask = async (taskId: string, updates: Partial<KanbanTask>) => {
    // Filter out audit and immutable fields
    const relevantUpdates = omitFields(updates, EXCLUDED_FIELDS) as any

    // Transform assignedTo if present
    if (relevantUpdates.assignedTo) {
      relevantUpdates.assignedTo = relevantUpdates.assignedTo.map(
        (user: { id: string; name: string; avatar?: string }) => ({
          ...user,
          id: user.id,
          name: user.name,
          avatar: user.avatar || DEFAULT_AVATAR,
        })
      )
    }

    // Pass the filtered and transformed updates to the store
    await updateTaskInStore(taskId, relevantUpdates)
  }

  const deleteTask = async (taskId: string) => {
    await deleteTaskInStore(taskId)
  }

  const moveTask = async (
    taskId: string,
    targetColumnId: string,
    targetIndex?: number
  ) => {
    await moveTaskInStore(taskId, targetColumnId, targetIndex)
  }

  // Column (Task Status) operations
  const createColumn = async (
    name: string,
    color?: string
  ): Promise<string> => {
    return await createTaskStatus(projectId, {
      name,
      color: color || "#6366f1",
      description: "",
    })
  }

  const updateColumn = async (
    columnId: string, // This is taskStatusId
    updates: { name?: string; color?: string; description?: string }
  ) => {
    await updateTaskStatus(columnId, updates)
  }

  const deleteColumn = async (columnId: string) => {
    // This is taskStatusId
    await deleteTaskStatus(columnId)
  }

  const reorderColumns = async (columnIds: string[]) => {
    // These are taskStatusIds
    await reorderTaskStatuses(columnIds)
  }

  return {
    columns: kanbanColumns,
    isLoading: tasksLoading || taskStatusesLoading,
    error: tasksError || taskStatusesError,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    createColumn,
    updateColumn,
    deleteColumn,
    reorderColumns,
  }
}
