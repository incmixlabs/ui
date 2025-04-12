/* eslint-disable @typescript-eslint/no-explicit-any */
import type { LucideIcon } from "lucide-react"
import type { z } from "zod"
import type { FieldConfig } from "../auto-form/types"
import type { ZodObjectOrWrapped } from "../auto-form/utils"

export interface StepSchema<SchemaType extends ZodObjectOrWrapped> {
  formSchema: any // Replace with more specific type if possible
  label: string
  stepIcon: string | LucideIcon // Allow both string and LucideIcon
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

// Define the overall schema structure
export interface StepperSchema {
  steps: StepSchema<any>[]
}
