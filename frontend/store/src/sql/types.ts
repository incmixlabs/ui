import {
  type ExtractDocumentTypeFromTypedRxJsonSchema,
  type RxCollection,
  toTypedRxJsonSchema,
} from "rxdb"
export const taskSchemaLiteral = {
  title: "tasks schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 10,
    },
    status: {
      type: "string",
      enum: ["todo", "in_progress", "done", "backlog"],
    },
    content: {
      type: "string",
    },
    taskOrder: {
      type: "integer",
    },
    assignedTo: {
      type: "string",
    },
    createdAt: {
      type: "string",
      // format: "date-time",
    },
    updatedAt: {
      type: "string",
      // format: "date-time",
    },
    createdBy: {
      type: "string",
    },
    updatedBy: {
      type: "string",
    },
    columnId: {
      type: "string",
    },
    projectId: {
      type: "string",
    },
  },
  // Adding required fields to enforce presence of key properties.
  // Adjust the list depending on business rules.
  required: [
    "id",
    "status",
    "content",
    "taskOrder",
    "assignedTo",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
    "columnId",
    "projectId",
  ],
} as const

// Column Schema with required fields added
export const columnSchemaLiteral = {
  title: "columns schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      maxLength: 10,
      type: "string",
    },
    label: {
      type: "string",
    },
    projectId: {
      type: "string",
    },
    columnOrder: {
      type: "integer",
    },
    createdAt: {
      type: "string",
      // format: "date-time",
    },
    updatedAt: {
      type: "string",
      // format: "date-time",
    },
    createdBy: {
      type: "string",
    },
    updatedBy: {
      type: "string",
    },
    parentId: {
      type: ["string", "null"],
    },
  },
  // Adding required fields to enforce presence of key properties.
  required: [
    "id",
    "label",
    "projectId",
    "columnOrder",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
    "parentId",
  ],
} as const

// Project Schema with required fields added
export const projectSchemaLiteral = {
  title: "projects schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      maxLength: 10,
      type: "string",
    },
    name: {
      type: "string",
    },
    orgId: {
      type: "string",
    },
    createdAt: {
      type: "string",
      // format: "date-time",
    },
    updatedAt: {
      type: "string",
      // format: "date-time",
    },
    createdBy: {
      type: "string",
    },
    updatedBy: {
      type: "string",
    },
  },
  // Adding required fields to enforce presence of key properties.
  required: [
    "id",
    "name",
    "orgId",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
  ],
} as const

const tasksTyped = toTypedRxJsonSchema(taskSchemaLiteral)
const columnsTyped = toTypedRxJsonSchema(columnSchemaLiteral)
const projectTyped = toTypedRxJsonSchema(projectSchemaLiteral)

export type TaskDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof tasksTyped
>
export type ColumnDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof columnsTyped
>

export type ProjectDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof projectTyped
>

export type TaskCollections = {
  tasks: RxCollection<TaskDocType>
  columns: RxCollection<ColumnDocType>
  projects: RxCollection<ProjectDocType>
}
