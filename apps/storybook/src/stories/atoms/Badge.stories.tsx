import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "@incmix/ui"

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badges",
  component: Badge,
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Badge>


export const BlackTheme: Story = {
  args: {
    color: "black",
  },
}
export const GrayTheme: Story = {
  args: {
    color: "gray",
  },
}
export const CrimsonTheme: Story = {
  args: {
    color: "crimson",
  },
}

