// File: task-schemas.ts
// FIXED - Removed ReadonlyArray for UI compatibility

export type TaskDataSchema = {
  id: string
  taskId: string
  projectId: string
  name: string
  columnId: string
  order: number
  startDate?: string
  endDate?: string
  description?: string
  completed: boolean
  priority: "low" | "medium" | "high" | "urgent"

  // Arrays - MUTABLE for UI editing
  refUrls: {
    id: string
    url: string
    title?: string
    type: "figma" | "task" | "external"
    taskId?: string
  }[]

  labelsTags: {
    value: string
    label: string
    color: string
  }[]

  attachments: {
    id: string
    name: string
    url: string
    size: string
    type?: string
  }[]

  assignedTo: {
    id: string
    name: string
    image?: string
  }[]

  subTasks: {
    id: string
    name: string
    completed: boolean
  }[]
  
  checklist?: {
    id: string
    text: string
    checked: boolean
  }[]

  // Comments with proper structure
  comments: {
    id: string
    content: string
    createdAt: number
    createdBy: {
      id: string
      name: string
      image?: string
    }
  }[]

  commentsCount: number

  // Audit fields
  createdAt: number
  updatedAt: number
  createdBy: {
    id: string
    name: string
    image?: string
  }
  updatedBy: {
    id: string
    name: string
    image?: string
  }
}

export type TaskStatusSchema = {
  id: string
  projectId: string
  name: string
  color: string
  order: number
  description?: string
  isDefault?: boolean
  createdAt: number
  updatedAt: number
  createdBy: {
    id: string
    name: string
    image?: string
  }
  updatedBy: {
    id: string
    name: string
    image?: string
  }
}

// Helper types for form data
export type CreateTaskData = Pick<TaskDataSchema, "name"> &
  Partial<
    Omit<
      TaskDataSchema,
      | "id"
      | "taskId"
      | "projectId"
      | "createdAt"
      | "updatedAt"
      | "createdBy"
      | "updatedBy"
    >
  >

export type UpdateTaskData = Partial<
  Omit<
    TaskDataSchema,
    "id" | "taskId" | "projectId" | "createdAt" | "createdBy"
  >
>

export type CreateTaskStatusData = Pick<TaskStatusSchema, "name"> &
  Partial<Pick<TaskStatusSchema, "color" | "description">>

export type UpdateTaskStatusData = Partial<
  Pick<TaskStatusSchema, "name" | "color" | "description">
>

// UI-specific types
export type TaskPriority = TaskDataSchema["priority"]
export type TaskLabel = TaskDataSchema["labelsTags"][0]
export type TaskAttachment = TaskDataSchema["attachments"][0]
export type TaskAssignee = TaskDataSchema["assignedTo"][0]
export type TaskSubTask = TaskDataSchema["subTasks"][0]
export type TaskComment = TaskDataSchema["comments"][0]
