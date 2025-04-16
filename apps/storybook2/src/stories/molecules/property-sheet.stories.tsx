import { PropertySheet } from "@incmix/ui2/widgets"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof PropertySheet> = {
  title: "Molecules/property-sheet",
  component: PropertySheet,
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof PropertySheet>

export const Default: Story = {
  args: {},
}
