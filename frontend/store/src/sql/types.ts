import {
  dashboardSchemaLiteral,
  dashboardTemplateSchemaLiteral,
  formProjectSchemaLiteral,
  labelSchemaLiteral,
  projectSchemaLiteral,
  taskSchemaLiteral,
} from "@incmix/utils/schema"
import {
  type ExtractDocumentTypeFromTypedRxJsonSchema,
  type RxCollection,
  toTypedRxJsonSchema,
} from "rxdb"

// Task schema conversions have been moved to ../utils/task-schema.ts

const projectTyped = toTypedRxJsonSchema(projectSchemaLiteral)
const formProjectTyped = toTypedRxJsonSchema(formProjectSchemaLiteral)
const dashboardTemplateTyped = toTypedRxJsonSchema(
  dashboardTemplateSchemaLiteral
)
const dashboardTyped = toTypedRxJsonSchema(dashboardSchemaLiteral)
const taskTyped = toTypedRxJsonSchema(taskSchemaLiteral)
const labelTyped = toTypedRxJsonSchema(labelSchemaLiteral)

// Task types have been moved to ../utils/task-schema.ts

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

export type LabelDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof labelTyped
>

export interface TaskCollections {
  tasks: RxCollection<TaskDocType>
  labels: RxCollection<LabelDocType>
  projects: RxCollection<ProjectDocType>
  formProjects: RxCollection<FormProjectDocType>
  dashboardTemplates: RxCollection<DashboardTemplateDocType>
  dashboards: RxCollection<DashboardDocType>
}
