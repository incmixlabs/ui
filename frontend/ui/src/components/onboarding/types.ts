import type { z } from "zod"
import type { ZodObjectOrWrapped } from "../auto-form/utils"
import type { FieldConfig } from "../auto-form/types"

export interface StepSchema<SchemaType extends ZodObjectOrWrapped = any> {
  formSchema: any
  label: string
  stepIcon: string
  fieldConfig?: FieldConfig<z.infer<SchemaType>>
  dependencies?: {
    [key: string]: {
      field: string
      type: "setOptions" | "disabled" | "required" | "hidden"
      condition: {
        value: any
      }
      options?: any
    }
  }
}

export interface StepperSchema {
  steps: StepSchema[]
}
