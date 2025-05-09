import type { JSONSchema } from "@incmix/ui/auto-form"

/**
 * General info form schema with validation
 * Note: Error messages are set in the component to support internationalization
 */
export const generalInfoFormSchema = {
  formSchema: {
    type: "object",
    properties: {
      name: {
        type: "string",
        minLength: 1,
        title: "Name",
      },
    },
    required: ["name"],
  } as JSONSchema,

  fieldConfig: {
    name: {
      description: "Name",
      inputProps: {
        placeholder: "Your name",
        className:
          "w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500",
      },
    },
  },
}

/**
 * Password change form schema with validation
 * Note: Error messages are set in the component to support internationalization
 */
export const passwordChangeFormSchema = {
  formSchema: {
    type: "object",
    properties: {
      currentPassword: {
        type: "string",
        minLength: 1,
        title: "Current Password",
      },
      newPassword: {
        type: "string",
        minLength: 8,
        title: "New Password",
      },
      confirmPassword: {
        type: "string",
        minLength: 1,
        title: "Confirm New Password",
      },
    },
    required: ["currentPassword", "newPassword", "confirmPassword"],
  } as JSONSchema,

  fieldConfig: {
    currentPassword: {
      description: "Current Password",
      inputProps: {
        type: "password",
        placeholder: "••••••••",
        className:
          "w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500",
      },
    },
    newPassword: {
      description: "New Password",
      inputProps: {
        type: "password",
        placeholder: "••••••••",
        className:
          "w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500",
      },
    },
    confirmPassword: {
      description: "Confirm New Password",
      inputProps: {
        type: "password",
        placeholder: "••••••••",
        className:
          "w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500",
      },
    },
  },
}
