import type { Meta, StoryObj } from "@storybook/react"
import { BadgeComponent } from "@incmix/ui"

const meta: Meta<typeof BadgeComponent> = {
  title: "Atoms/Badges",
  component: BadgeComponent,
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof BadgeComponent>


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

