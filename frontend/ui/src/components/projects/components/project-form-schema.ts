// @ts-nocheck
// TBD - members to options map
// frontend/ui/src/components/projects/components/project-form-schema.ts
import { members } from "../data"

import type { FieldConfig } from "@components/auto-form/types"
import type { ZodObjectOrWrapped } from "@components/auto-form/utils"
import type { z } from "zod"

export interface ProjectFormSchema<
  SchemaType extends ZodObjectOrWrapped = any,
> {
  formSchema: {
    type: string
    properties: Record<string, any>
    required: string[]
  }
  fieldConfig: FieldConfig<z.infer<SchemaType>>
}

export const projectFormSchema: ProjectFormSchema = {
  formSchema: {
    type: "object",
    properties: {
      files: {
        type: "object",
        title: "Project Image",
      },
      title: {
        type: "string",
        minLength: 1,
        title: "Project Name",
      },
      company: {
        type: "string",
        minLength: 1,
        title: "Client Name",
      },
      description: {
        type: "string",
        minLength: 1,
        title: "Description",
      },
      startDate: {
        type: "string",
        format: "date-time",
        title: "Start Date",
      },
      endDate: {
        type: "string",
        format: "date-time",
        title: "End Date",
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
        title: "Members",
      },
      budget: {
        type: "number",
        title: "Budget",
      },
    },
    required: ["title", "company", "description"],
  },
  fieldConfig: {
    files: {
      description: "Project Image",
      fieldType: "file",
      inputProps: {
        accept: "image/*",
        className: "w-full",
        showLabel: false,
      },
    },
    title: {
      description: "Project Name",
      inputProps: {
        placeholder: "App Development",
      },
    },
    company: {
      description: "Client Name",
      inputProps: {
        placeholder: "Dropbox, Inc.",
      },
    },
    description: {
      description: "Description",
      fieldType: "textarea",
      inputProps: {
        placeholder: "Create a mobile application on iOS and Android devices.",
      },
    },
    startDate: {
      description: "Start Date",
      fieldType: "date",
      inputProps: {
        placeholder: "Mar 5, 2025, 2:45 AM",
        className: "w-full",
      },
    },
    endDate: {
      description: "End Date",
      fieldType: "date",
      inputProps: {
        placeholder: "Mar 6, 2025, 2:45 AM",
        className: "w-full",
      },
    },
    members: {
      description: "Members",
      fieldType: "multipleSelector",
      inputProps: {
        defaultOptions: members,
        placeholder: "Select members",
        defaultColor: "gray",
        className: "border-1 dark:bg-gray-1",
      },
    },
    budget: {
      description: "Budget",
      fieldType: "number",
      inputProps: {
        placeholder: "25,000.00",
        prefix: "$",
        className: "pl-8",
      },
    },

    // field groups configuration
    fieldGroups: [
      {
        fields: ["startDate", "endDate"],
        layout: "row",
        gap: 4,
        className: "mb-4",
      },
    ] as any,
  },
}
