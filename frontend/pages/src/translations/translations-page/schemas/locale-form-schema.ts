import type { JSONSchema } from "@incmix/ui/auto-form"

/**
 * Locale form schema with validation
 */
export const localeFormSchema = {
  formSchema: {
    type: "object",
    properties: {
      code: {
        type: "string",
        minLength: 1,
        title: "Code",
        errorMessage: {
          minLength: "Code is required",
        },
      },
      isDefault: {
        type: "boolean",
        title: "Is Default",
        default: false,
      },
    },
    required: ["code"],
  } as JSONSchema,

  fieldConfig: {
    code: {
      description: "Locale code (e.g., en, fr, es)",
      inputProps: {
        type: "text",
        placeholder: "Enter locale code",
        className:
          "w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500",
      },
    },
    isDefault: {
      description: "Set as default locale",
      fieldType: "switch",
    },
  },
}
