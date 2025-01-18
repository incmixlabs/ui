import { AvatarGroup } from "@incmix/ui"
import { directions, layouts, sizes, stackOrders } from "@incmix/ui"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof AvatarGroup> = {
  title: "Molecules/AvatarGroup",
  component: AvatarGroup,
  argTypes: {
    maxVisible: {
      control: { type: "number", min: 1, max: 10 },
    },
    size: {
      control: { type: "select", options: sizes },
    },
    layout: {
      control: { type: "radio", options: layouts },
    },
    direction: {
      control: { type: "radio", options: directions },
    },
    stackOrder: {
      control: { type: "radio", options: stackOrders },
    },
  },
}

export default meta
type Story = StoryObj<typeof AvatarGroup>

const sampleUsers = [
  { fullName: "John Doe", imageUrl: "https://example.com/john.jpg" },
  { fullName: "Jane Smith", imageUrl: "https://example.com/jane.jpg" },
  { fullName: "Bob Johnson", imageUrl: "https://example.com/bob.jpg" },
  { fullName: "Alice Brown", imageUrl: "https://example.com/alice.jpg" },
  { fullName: "Charlie Wilson", imageUrl: "https://example.com/charlie.jpg" },
  { fullName: "Eva Davis", imageUrl: "https://example.com/eva.jpg" },
]

export const Spread: Story = {
  args: {
    users: sampleUsers,
    layout: "spread",
  },
}

export const Stacked: Story = {
  args: {
    ...Spread.args,
    layout: "stack",
  },
}

export const Small: Story = {
  args: {
    ...Spread.args,
    size: "2",
  },
}

export const Large: Story = {
  args: {
    ...Spread.args,
    size: "6",
  },
}

export const LowVisibility: Story = {
  args: {
    ...Spread.args,
    maxVisible: 3,
  },
}

export const HighVisibility: Story = {
  args: {
    ...Spread.args,
    maxVisible: 6,
  },
}
