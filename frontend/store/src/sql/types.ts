import {
  columnSchemaLiteral,
  dashboardSchemaLiteral,
  dashboardTemplateSchemaLiteral,
  formProjectSchemaLiteral,
  projectSchemaLiteral,
  taskSchemaLiteral,
} from "@incmix/utils/schema"
import type { TaskStatusDocType } from "@incmix/utils/schema"
import {
  type ExtractDocumentTypeFromTypedRxJsonSchema,
  type RxCollection,
  toTypedRxJsonSchema,
} from "rxdb"

// Task schema conversions have been moved to ../utils/task-schema.ts
const columnsTyped = toTypedRxJsonSchema(columnSchemaLiteral)
const projectTyped = toTypedRxJsonSchema(projectSchemaLiteral)
const formProjectTyped = toTypedRxJsonSchema(formProjectSchemaLiteral)
const dashboardTemplateTyped = toTypedRxJsonSchema(
  dashboardTemplateSchemaLiteral
)
const dashboardTyped = toTypedRxJsonSchema(dashboardSchemaLiteral)
const taskTyped = toTypedRxJsonSchema(taskSchemaLiteral)

// Task types have been moved to ../utils/task-schema.ts

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

export type TaskDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof taskTyped
>

export interface TaskCollections {
  tasks: RxCollection<TaskDocType>
  taskStatus: RxCollection<TaskStatusDocType>
  columns: RxCollection<ColumnDocType>
  projects: RxCollection<ProjectDocType>
  formProjects: RxCollection<FormProjectDocType>
  dashboardTemplates: RxCollection<DashboardTemplateDocType>
  dashboards: RxCollection<DashboardDocType>
}
