import type { FieldConfig, ZodObjectOrWrapped } from "@incmix/ui/auto-form"
import type { z } from "zod"

export interface RoleFormSchema<SchemaType extends ZodObjectOrWrapped = any> {
  formSchema: {
    type: string
    properties: Record<string, any>
    required: string[]
  }
  fieldConfig: FieldConfig<z.infer<SchemaType>>
}

export const roleFormSchema: RoleFormSchema = {
  formSchema: {
    type: "object",
    properties: {
      name: {
        type: "string",
        minLength: 1,
        title: "Role Name",
        errorMessage: {
          minLength: "Role Name is required",
        },
      },
    },
    required: ["name"],
  },
  fieldConfig: {
    name: {
      description: "Role Name",
      inputProps: {
        placeholder: "Enter role name",
        required: true,
      },
    },
  },
}
