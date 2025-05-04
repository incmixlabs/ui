import type { JSONSchema } from "@incmix/ui/auto-form"

/**
 * Signup form schema with validation
 * Note: Error messages are set in the SignupForm component to support internationalization
 */
export const signupFormSchema = {
  formSchema: {
    type: "object",
    properties: {
      name: {
        type: "string",
        minLength: 1,
        title: "Name",
      },
      email: {
        type: "string",
        format: "email",
        title: "Email",
      },
      password: {
        type: "string",
        minLength: 6,
        title: "Password",
      },
    },
    required: ["name", "email", "password"],
  } as JSONSchema,

  fieldConfig: {
    name: {
      description: "Name",
      inputProps: {
        type: "text",
        placeholder: "Your name",
        className:
          "w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500",
      },
    },
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
