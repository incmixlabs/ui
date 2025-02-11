import type { StepSchema } from "./types"

export const formSchema: { steps: StepSchema[] } = {
  steps: [
    {
      label: "Company Details",
      stepIcon: "Building",
      formSchema: {
        type: "object",
        properties: {
          companyName: {
            type: "string",
          },
        },
      },
      fieldConfig: {
        companyName: {
          description: "Company Name",
          inputProps: {
            required: true,
            placeholder: "Enter your company name",
          },
        },
      },
    },
    {
      label: "Account Details",
      stepIcon: "User",
      formSchema: {
        type: "object",
        properties: {
          fullName: {
            type: "string",
          },
          accountName: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
      fieldConfig: {
        fullName: {
          description: "Full Name",
          inputProps: {
            required: true,
            placeholder: "Enter your full name",
          },
        },
        accountName: {
          description: "Account Name",
          inputProps: {
            required: true,
            placeholder: "Choose an account name",
          },
        },
        password: {
          description: "Password",
          inputProps: {
            required: true,
            type: "password",
            placeholder: "••••••••",
          },
        },
      },
    },
  ],
}
