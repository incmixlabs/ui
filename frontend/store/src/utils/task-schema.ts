import { taskSchemaLiteral } from "@incmix/utils/schema"
import {
  type ExtractDocumentTypeFromTypedRxJsonSchema,
  toTypedRxJsonSchema,
} from "rxdb"

const tasksTyped = toTypedRxJsonSchema(taskSchemaLiteral)

export type TaskDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof tasksTyped
>
