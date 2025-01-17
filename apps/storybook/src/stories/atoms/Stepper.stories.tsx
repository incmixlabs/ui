import { Stepper } from "@incmix-fe/ui/stepper"
import type { StepperProps } from "@incmix-fe/ui/stepper"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Stepper> = {
  title: "Atoms/Stepper",
  component: Stepper,
}

export default meta
type Story = StoryObj<typeof Stepper>

// @see https://storybook.js.org/docs/react/writing-stories/introduction

const shippingSchema = {
  id: "shipping",
  label: "Shipping",
  fields: [
    {
      id: "address",
      label: "Address",
      type: "string",
      len: 10,
      message: "Address is required",
    },
    {
      id: "city",
      label: "City",
      type: "string",
      len: 3,
      message: "City is required",
    },
    {
      id: "postalCode",
      label: "Postal Code",
      type: "string",
      len: 5,
      message: "Postal code is required",
    },
  ],
}
const paymentSchema = {
  id: "payment",
  label: "Payment",
  fields: [
    {
      id: "cardNumber",
      label: "Card Number",
      type: "string",
      len: 16,
      message: "Card number is required",
    },
    {
      id: "expirationDate",
      label: "Expiration Date",
      type: "string",
      len: 5,
      message: "Expiration date is required",
    },
    {
      id: "cvv",
      label: "CVV",
      type: "string",
      len: 3,
      message: "CVV is required",
    },
  ],
}
const completeSchema = { id: "complete", label: "Complete", fields: [] }

// @see https://storybook.js.org/docs/react/writing-stories/args

export const StepperStory: Story = {
  args: {
    formId: "Checkout",
    formSteps: [shippingSchema, paymentSchema, completeSchema],
  },
}
