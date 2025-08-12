import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Badge, Theme } from "../../src/base"

const meta: Meta<typeof Badge> = {
  title:"Base/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "soft", "surface", "outline"],
      description: "Badge variant style",
    },
    size: {
      control: "select",
      options: ["1", "2", "3"],
      description: "Badge size",
    },
    color: {
      control: "select",
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
      description: "Badge accent color",
    },
    radius: {
      control: "select",
      options: ["none", "small", "medium", "large", "full"],
      description: "Badge border radius",
    },
    highContrast: {
      control: "boolean",
      description: "High contrast mode",
    },
    children: {
      control: "text",
      description: "Badge content",
    },
  },
  args: {
    children: "Badge",
    variant: "soft",
    size: "1",
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    children: "Default",
  },
}

// Variant stories
export const Solid: Story = {
  args: {
    variant: "solid",
    children: "Solid",
  },
}

export const Soft: Story = {
  args: {
    variant: "soft",
    children: "Soft",
  },
}

export const Surface: Story = {
  args: {
    variant: "surface",
    children: "Surface",
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
}

// Size stories
export const Size1: Story = {
  args: {
    size: "1",
    children: "Size 1",
  },
}

export const Size2: Story = {
  args: {
    size: "2",
    children: "Size 2",
  },
}

export const Size3: Story = {
  args: {
    size: "3",
    children: "Size 3",
  },
}

// Color stories
export const ColorBlue: Story = {
  args: {
    color: "blue",
    children: "Blue",
  },
}

export const ColorRed: Story = {
  args: {
    color: "red",
    children: "Red",
  },
}

export const ColorGreen: Story = {
  args: {
    color: "green",
    children: "Green",
  },
}

export const ColorPurple: Story = {
  args: {
    color: "purple",
    children: "Purple",
  },
}

// State stories
export const HighContrast: Story = {
  args: {
    highContrast: true,
    children: "High Contrast",
  },
}

// Radius stories
export const RadiusNone: Story = {
  args: {
    radius: "none",
    children: "No Radius",
  },
}

export const RadiusSmall: Story = {
  args: {
    radius: "small",
    children: "Small Radius",
  },
}

export const RadiusMedium: Story = {
  args: {
    radius: "medium",
    children: "Medium Radius",
  },
}

export const RadiusLarge: Story = {
  args: {
    radius: "large",
    children: "Large Radius",
  },
}

export const RadiusFull: Story = {
  args: {
    radius: "full",
    children: "Full Radius",
  },
}

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Badge variant="solid">Solid</Badge>
      <Badge variant="soft">Soft</Badge>
      <Badge variant="surface">Surface</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
}

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <Badge size="1">Size 1</Badge>
      <Badge size="2">Size 2</Badge>
      <Badge size="3">Size 3</Badge>
    </div>
  ),
}

// Color palette showcase
export const ColorPalette: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: "8px",
      }}
    >
      {[
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
      ].map((color) => (
        <Badge key={color} color={color as any}>
          {color}
        </Badge>
      ))}
    </div>
  ),
}

// Status indicators example
export const StatusIndicators: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <Badge variant="solid" color="green">
        Active
      </Badge>
      <Badge variant="solid" color="yellow">
        Warning
      </Badge>
      <Badge variant="solid" color="red">
        Error
      </Badge>
      <Badge variant="solid" color="blue">
        Info
      </Badge>
      <Badge variant="outline" color="gray">
        Inactive
      </Badge>
    </div>
  ),
}

// Real-world usage example
export const RealWorldExample: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span>User Role:</span>
        <Badge variant="solid" color="blue">
          Admin
        </Badge>
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span>Status:</span>
        <Badge variant="soft" color="green">
          Online
        </Badge>
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span>Priority:</span>
        <Badge variant="outline" color="red">
          High
        </Badge>
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span>Category:</span>
        <Badge variant="surface" color="purple">
          Feature
        </Badge>
      </div>
    </div>
  ),
}
