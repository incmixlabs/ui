import {
  type ExtractDocumentTypeFromTypedRxJsonSchema,
  type RxCollection,
  toTypedRxJsonSchema,
} from "rxdb"
import { taskStatusSchemaLiteral } from "@incmix/utils/schema"
import { taskSchemaLiteral } from "@incmix/utils/schema"

const tasksTyped = toTypedRxJsonSchema(taskSchemaLiteral)
const taskStatusTyped = toTypedRxJsonSchema(taskStatusSchemaLiteral)

export type TaskDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof tasksTyped
>

export type TaskStatusDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof taskStatusTyped
>
