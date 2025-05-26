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

// Define the schema for a layout item
const layoutItemSchema = {
  type: "object",
  properties: {
    w: { type: "number" },
    h: { type: "number" },
    x: { type: "number" },
    y: { type: "number" },
    i: { type: "string" },
    componentName: { type: "string" },
    moved: { type: "boolean", default: false },
    static: { type: "boolean", default: false },
    layouts: {
      type: "array",
      items: {
        type: "object",
        properties: {
          w: { type: "number" },
          h: { type: "number" },
          x: { type: "number" },
          y: { type: "number" },
          i: { type: "string" },
          componentName: { type: "string" },
          moved: { type: "boolean", default: false },
          static: { type: "boolean", default: false },
        },
        required: ["w", "h", "x", "y", "i"],
      },
    },
    compactType: {
      type: ["string", "null"],
      enum: ["horizontal", "vertical", null],
    },
  },
  required: ["w", "h", "x", "y", "i"],
  additionalProperties: true,
} as const

export const dashboardTemplateSchemaLiteral = {
  title: "dashboard template schema",
  version: 0,
  description: "Schema for dashboard templates",
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
    },
    isActive: {
      type: "boolean",
      default: false,
    },
    name: {
      type: "string",
    },
    projectId: {
      type: "string",
    },
    tags: {
      type: "array",
      items: {
        type: "string",
      },
    },
    mainLayouts: {
      type: "object",
      properties: {
        lg: {
          type: "array",
          items: layoutItemSchema,
        },
        md: {
          type: "array",
          items: layoutItemSchema,
        },
        sm: {
          type: "array",
          items: layoutItemSchema,
        },
        xs: {
          type: "array",
          items: layoutItemSchema,
        },
        xxs: {
          type: "array",
          items: layoutItemSchema,
        },
      },
      required: ["lg", "md", "sm", "xs", "xxs"],
    },
    createdAt: {
      type: "number",
    },
    updatedAt: {
      type: "number",
    },
  },
  required: [
    "id",
    "name",
    "projectId",
    "mainLayouts",
    "createdAt",
    "updatedAt",
  ],
} as const

export const dashboardSchemaLiteral = {
  title: "dashboard schema",
  version: 0,
  description: "Schema for dashboards",
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
    },
    name: {
      type: "string",
    },
    createdAt: {
      type: "string",
    },
    updatedAt: {
      type: "string",
    },
    createdBy: {
      type: "string",
    },
    updatedBy: {
      type: "string",
    },
  },
  required: ["id", "name"],
  additionalProperties: false,
} as const

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
    },
    updatedAt: {
      type: "string",
    },
    createdBy: {
      type: "string",
    },
    updatedBy: {
      type: "string",
    },
  },
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

export const formProjectSchemaLiteral = {
  title: "form projects schema",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      maxLength: 30,
      type: "string",
    },
    title: {
      type: "string",
    },
    company: {
      type: "string",
    },
    logo: {
      type: "string",
    },
    description: {
      type: "string",
    },
    progress: {
      type: "integer",
    },
    timeLeft: {
      type: "string",
    },
    timeType: {
      type: "string",
      enum: ["day", "days", "week", "month", "year"],
    },
    members: {
      type: "array",
      items: {
        type: "object",
        properties: {
          label: { type: "string" },
          value: { type: "string" },
        },
      },
    },
    status: {
      type: "string",
      enum: ["all", "started", "on-hold", "completed"],
    },
    startDate: {
      type: "integer", // Using integer for timestamp
    },
    endDate: {
      type: "integer", // Using integer for timestamp
    },
    budget: {
      type: "integer",
    },
    fileInfo: {
      type: "object",
      properties: {
        name: { type: "string" },
        type: { type: "string" },
        size: { type: "integer" },
        attachmentId: { type: "string" },
      },
    },
    createdAt: {
      type: "integer", // Using integer for timestamp
    },
    updatedAt: {
      type: "integer", // Using integer for timestamp
    },
  },
  required: [
    "id",
    "title",
    "company",
    "description",
    "status",
    "startDate",
    "endDate",
  ],
  attachments: {
    encrypted: false,
  },
} as const

const tasksTyped = toTypedRxJsonSchema(taskSchemaLiteral)
const columnsTyped = toTypedRxJsonSchema(columnSchemaLiteral)
const projectTyped = toTypedRxJsonSchema(projectSchemaLiteral)
const formProjectTyped = toTypedRxJsonSchema(formProjectSchemaLiteral)
const dashboardTemplateTyped = toTypedRxJsonSchema(
  dashboardTemplateSchemaLiteral
)
const dashboardTyped = toTypedRxJsonSchema(dashboardSchemaLiteral)

export type TaskDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof tasksTyped
>
export type ColumnDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof columnsTyped
>

export type ProjectDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof projectTyped
>

export type FormProjectDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof formProjectTyped
>

export type DashboardTemplateDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof dashboardTemplateTyped
>

export type DashboardDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof dashboardTyped
>

export type TaskCollections = {
  tasks: RxCollection<TaskDocType>
  columns: RxCollection<ColumnDocType>
  projects: RxCollection<ProjectDocType>
  formProjects: RxCollection<FormProjectDocType>
  dashboardTemplates: RxCollection<DashboardTemplateDocType>
  dashboards: RxCollection<DashboardDocType>
}
