import type { JSONSchema } from "@incmix/ui/auto-form"

/**
 * Project creation form schema with validation
 */
export const createProjectFormSchema = {
  formSchema: {
    type: "object",
    properties: {
      name: {
        type: "string",
        minLength: 1,
        title: "Project Name",
        errorMessage: {
          minLength: "Name is Required",
        },
      },
    },
    required: ["name"],
  } as JSONSchema,

  fieldConfig: {
    name: {
      description: "Project Name",
      inputProps: {
        placeholder: "Enter project name",
        className:
          "w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500",
      },
    },
  },
}
