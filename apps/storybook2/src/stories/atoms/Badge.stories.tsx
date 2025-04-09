import { Badge } from "@incmix/ui2/radixui"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badges",
  component: Badge,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["1", "2", "3"],
      defaultValue: "1",
    },
    variant: {
      control: { type: "select" },
      options: ["solid", "soft", "surface", "outline"],
      defaultValue: "soft",
    },
    color: {
      control: { type: "select" },
      options: [
        "gray",
        "gold",
        "bronze",
        "brown",
        "yellow",
        "amber",
        "orange",
        "tomato",
        "red",
        "ruby",
        "crimson",
        "pink",
        "plum",
        "purple",
        "violet",
        "iris",
        "indigo",
        "blue",
        "cyan",
        "teal",
        "jade",
        "green",
        "grass",
        "lime",
        "mint",
        "sky",
      ],
      defaultValue: "gray",
    },
    highContrast: {
      control: "boolean",
      defaultValue: false,
    },
    radius: {
      control: { type: "select" },
      options: ["none", "small", "medium", "large", "full"],
      defaultValue: "medium",
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    children: "Badge",
  },
}

export const GrayBadge: Story = {
  args: {
    children: "Gray",
    color: "gray",
  },
}

export const CrimsonBadge: Story = {
  args: {
    children: "Crimson",
    color: "crimson",
  },
}

export const SolidVariant: Story = {
  args: {
    children: "Solid",
    variant: "solid",
    color: "blue",
  },
}

export const OutlineVariant: Story = {
  args: {
    children: "Outline",
    variant: "outline",
    color: "green",
  },
}

export const LargeSize: Story = {
  args: {
    children: "Large",
    size: "3",
    color: "purple",
  },
}

export const HighContrast: Story = {
  args: {
    children: "High Contrast",
    highContrast: true,
    color: "pink",
  },
}
