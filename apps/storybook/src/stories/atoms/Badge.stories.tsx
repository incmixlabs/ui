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
    themeColor: "black",
  },
}
export const GrayTheme: Story = {
  args: {
    themeColor: "gray",
  },
}
export const CrimsonTheme: Story = {
  args: {
    themeColor: "crimson",
  },
}

