import type { ZodObjectOrWrapped } from "@incmix/ui/auto-form"
import type { FieldConfig } from "@incmix/ui/auto-form"
import type { z } from "zod"

export interface OrganizationFormSchema<
  SchemaType extends ZodObjectOrWrapped = any,
> {
  formSchema: {
    type: string
    properties: Record<string, any>
    required: string[]
  }
  fieldConfig: FieldConfig<z.infer<SchemaType>>
}

export const organizationFormSchema: OrganizationFormSchema = {
  formSchema: {
    type: "object",
    properties: {
      organizationName: {
        type: "string",
        minLength: 1,
        title: "Organization Name",
      },
      organizationHandle: {
        type: "string",
        minLength: 1,
        title: "Organization Handle",
      },
    },
    required: ["organizationName", "organizationHandle"],
  },
  fieldConfig: {
    organizationName: {
      description: "Organization Name",
      inputProps: {
        placeholder: "Organization Name",
      },
    },
    organizationHandle: {
      description: "Organization Handle",
      inputProps: {
        placeholder: "Organization Handle",
      },
    },
  },
}
