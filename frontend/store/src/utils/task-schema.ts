import {
  type ExtractDocumentTypeFromTypedRxJsonSchema,
  type RxCollection,
  toTypedRxJsonSchema,
} from "rxdb"

export const taskStatusSchemaLiteral = {
  title: "task status schema", // Renamed for clarity, was "columns schema"
  version: 0, // Consider incrementing version if this is a migration
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      maxLength: 100,
      type: "string",
    },
    projectId: {
      type: "string",
      maxLength: 100,
    },
    name: {
      type: "string",
      maxLength: 200,
    },
    color: {
      type: "string",
      maxLength: 50,
      default: "#6366f1",
    },
    order: {
      type: "number",
      default: 0,
      multipleOf: 1,
      minimum: 0,
      maximum: 100000,
    },
    description: {
      type: "string",
      maxLength: 500,
    },
    isDefault: {
      type: "boolean",
      default: false,
    },
    createdAt: {
      type: "number",
    },
    updatedAt: {
      type: "number",
    },
    createdBy: {
      type: "object",
      properties: {
        id: { type: "string", maxLength: 100 },
        name: { type: "string", maxLength: 200 },
        image: { type: "string", maxLength: 500 },
      },
      required: ["id", "name"],
    },
    updatedBy: {
      type: "object",
      properties: {
        id: { type: "string", maxLength: 100 },
        name: { type: "string", maxLength: 200 },
        image: { type: "string", maxLength: 500 },
      },
      required: ["id", "name"],
    },
  },
  required: [
    "id",
    "projectId",
    "name",
    "color",
    "order",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
  ],
  indexes: ["projectId", "order"],
} as const

export const taskSchemaLiteral = {
  title: "tasks schema",
  version: 1, // Increment version due to schema changes
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      maxLength: 100,
      type: "string",
    },
    projectId: {
      type: "string",
      maxLength: 100,
    },
    taskId: {
      type: "string",
      maxLength: 100,
    },
    name: {
      type: "string",
      maxLength: 500,
    },
    columnId: {
      type: "string",
      maxLength: 100,
    },
    order: {
      type: "number",
      default: 0,
      minimum: 0,
      maximum: 1000000,
    },
    startDate: {
      type: "string",
      maxLength: 50,
    },
    endDate: {
      type: "string",
      maxLength: 50,
    },
    description: {
      type: "string",
      maxLength: 2000,
    },
    completed: {
      type: "boolean",
      default: false,
    },
    priority: {
      type: "string",
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    labelsTags: {
      type: "array",
      items: {
        type: "object",
        properties: {
          value: {
            type: "string",
            maxLength: 200,
          },
          label: {
            type: "string",
            maxLength: 200,
          },
          color: {
            type: "string",
            maxLength: 100,
          },
        },
        required: ["value", "label", "color"],
      },
      default: [],
    },
    attachments: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
            maxLength: 100,
          },
          name: {
            type: "string",
            maxLength: 255,
          },
          url: {
            type: "string",
            maxLength: 1000,
          },
          size: {
            type: "string",
            maxLength: 50,
          },
          type: {
            type: "string",
            maxLength: 100,
          },
        },
        required: ["id", "name", "url", "size"],
      },
      default: [],
    },
    assignedTo: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
            maxLength: 100,
          },
          name: {
            type: "string",
            maxLength: 200,
          },
          image: {
            // Changed from 'avatar' to 'image' for consistency
            type: "string",
            maxLength: 500,
          },
        },
        required: ["id", "name"],
      },
      default: [],
    },
    subTasks: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
            maxLength: 100,
          },
          name: {
            type: "string",
            maxLength: 300,
          },
          completed: {
            type: "boolean",
            default: false,
          },
        },
        required: ["id", "name", "completed"],
      },
      default: [],
    },
    comments: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string", maxLength: 100 },
          content: { type: "string", maxLength: 2000 },
          createdAt: { type: "number" },
          createdBy: {
            type: "object",
            properties: {
              id: { type: "string", maxLength: 100 },
              name: { type: "string", maxLength: 200 },
              image: { type: "string", maxLength: 500 },
            },
            required: ["id", "name"],
          },
        },
        required: ["id", "content", "createdAt", "createdBy"],
      },
      default: [],
    },
    commentsCount: {
      type: "number",
      default: 0,
    },
    createdAt: {
      type: "number",
    },
    updatedAt: {
      type: "number",
    },
    createdBy: {
      type: "object",
      properties: {
        id: {
          type: "string",
          maxLength: 100,
        },
        name: {
          type: "string",
          maxLength: 200,
        },
        image: {
          type: "string",
          maxLength: 500,
        },
      },
      required: ["id", "name"],
    },
    updatedBy: {
      type: "object",
      properties: {
        id: {
          type: "string",
          maxLength: 100,
        },
        name: {
          type: "string",
          maxLength: 200,
        },
        image: {
          type: "string",
          maxLength: 500,
        },
      },
      required: ["id", "name"],
    },
  },
  required: [
    "id",
    "projectId",
    "taskId",
    "name",
    "columnId",
    "order",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy",
  ],
} as const

const tasksTyped = toTypedRxJsonSchema(taskSchemaLiteral)
const taskStatusTyped = toTypedRxJsonSchema(taskStatusSchemaLiteral)

export type TaskDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof tasksTyped
>

export type TaskStatusDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof taskStatusTyped
>

export type TaskCollections = {
  tasks: RxCollection<TaskDocType>
  taskStatus: RxCollection<TaskStatusDocType>
}