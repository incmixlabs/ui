import { Onboarding } from "@incmix/ui2/onboarding"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Onboarding> = {
  title: "Molecules/Onboarding",
  component: Onboarding,
}

export default meta
type Story = StoryObj<typeof Onboarding>

export const Default: Story = {
  render: () => {
    return <Onboarding />
  },
}
