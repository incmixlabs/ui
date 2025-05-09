import type { JSONSchema } from "@incmix/ui/auto-form"

/**
 * Translation form schema with validation
 */
export const translationFormSchema = {
  formSchema: {
    type: "object",
    properties: {
      locale: {
        type: "string",
        minLength: 1,
        title: "Locale",
        errorMessage: {
          minLength: "Locale is required",
        },
      },
      namespace: {
        type: "string",
        minLength: 1,
        title: "Namespace",
        errorMessage: {
          minLength: "Namespace is required",
        },
      },
      key: {
        type: "string",
        minLength: 1,
        title: "Key",
        errorMessage: {
          minLength: "Key is required",
        },
      },
      value: {
        type: "string",
        minLength: 1,
        title: "Value",
        errorMessage: {
          minLength: "Value is required",
        },
      },
      type: {
        type: "string",
        enum: ["frag", "label"],
        default: "label",
        title: "Type",
      },
    },
    required: ["locale", "namespace", "key", "value", "type"],
  } as JSONSchema,
  
  fieldConfig: {
    locale: {
      description: "The language code for this translation",
      fieldType: "select",
    },
    namespace: {
      description: "Translation namespace (e.g., common, settings)",
      inputProps: {
        type: "text",
        placeholder: "Enter namespace",
        className:
          "w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500",
      },
    },
    key: {
      description: "Translation key",
      inputProps: {
        type: "text",
        placeholder: "Enter key",
        className:
          "w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500",
      },
    },
    value: {
      description: "Translation value",
      inputProps: {
        type: "text",
        placeholder: "Enter translation value",
        className:
          "w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500",
      },
    },
    type: {
      description: "Translation type",
      fieldType: "select",
      options: [
        { label: "Frag", value: "frag" },
        { label: "Label", value: "label" },
      ],
    },
  },
}
