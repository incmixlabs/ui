import type { JSONSchema } from "@incmix/ui/auto-form"

/**
 * Login form schema with validation
 * Note: Error messages are set in the LoginForm component to support internationalization
 */
export const loginFormSchema = {
  formSchema: {
    type: "object",
    properties: {
      email: {
        type: "string",
        format: "email",
        title: "Email",
      },
      password: {
        type: "string",
        minLength: 1,
        title: "Password",
      },
    },
    required: ["email", "password"],
  } as JSONSchema,

  fieldConfig: {
    email: {
      description: "Email",
      inputProps: {
        type: "email",
        placeholder: "your@email.com",
        className:
          "w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500",
      },
    },
    password: {
      description: "Password",
      inputProps: {
        type: "password",
        placeholder: "••••••••",
        className:
          "w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500",
      },
    },
  },
}
