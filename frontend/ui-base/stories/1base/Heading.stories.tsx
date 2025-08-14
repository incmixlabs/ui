import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Heading, Theme } from "../../src/1base" // Adjust the import path as necessary

const meta: Meta<typeof Heading> = {
  title:"1 Base/Heading",
  component: Heading,
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
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      description: "HTML heading element to render",
    },
    size: {
      control: "select",
      options: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      description: "Heading size",
    },
    weight: {
      control: "select",
      options: ["light", "regular", "medium", "bold"],
      description: "Font weight",
    },
    align: {
      control: "select",
      options: ["left", "center", "right"],
      description: "Text alignment",
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
      description: "Heading color",
    },
    highContrast: {
      control: "boolean",
      description: "High contrast mode",
    },
    truncate: {
      control: "boolean",
      description: "Truncate text with ellipsis",
    },
    wrap: {
      control: "select",
      options: ["wrap", "nowrap", "pretty", "balance"],
      description: "Text wrapping behavior",
    },
    trim: {
      control: "select",
      options: ["normal", "start", "end", "both"],
      description: "Leading trim for better text alignment",
    },
    children: {
      control: "text",
      description: "Heading content",
    },
  },
  args: {
    children: "The quick brown fox jumps over the lazy dog",
    as: "h1",
    size: "6",
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    children: "This is a default heading",
  },
}

// Semantic heading levels
export const H1: Story = {
  args: {
    as: "h1",
    children: "This is an H1 heading",
  },
}

export const H2: Story = {
  args: {
    as: "h2",
    children: "This is an H2 heading",
  },
}

export const H3: Story = {
  args: {
    as: "h3",
    children: "This is an H3 heading",
  },
}

export const H4: Story = {
  args: {
    as: "h4",
    children: "This is an H4 heading",
  },
}

export const H5: Story = {
  args: {
    as: "h5",
    children: "This is an H5 heading",
  },
}

export const H6: Story = {
  args: {
    as: "h6",
    children: "This is an H6 heading",
  },
}

// Size stories
export const Size1: Story = {
  args: {
    size: "1",
    children: "Size 1 heading",
  },
}

export const Size2: Story = {
  args: {
    size: "2",
    children: "Size 2 heading",
  },
}

export const Size3: Story = {
  args: {
    size: "3",
    children: "Size 3 heading",
  },
}

export const Size4: Story = {
  args: {
    size: "4",
    children: "Size 4 heading",
  },
}

export const Size5: Story = {
  args: {
    size: "5",
    children: "Size 5 heading",
  },
}

export const Size6: Story = {
  args: {
    size: "6",
    children: "Size 6 heading",
  },
}

export const Size7: Story = {
  args: {
    size: "7",
    children: "Size 7 heading",
  },
}

export const Size8: Story = {
  args: {
    size: "8",
    children: "Size 8 heading",
  },
}

export const Size9: Story = {
  args: {
    size: "9",
    children: "Size 9 heading",
  },
}

// Weight stories
export const WeightLight: Story = {
  args: {
    weight: "light",
    children: "Light weight heading",
  },
}

export const WeightRegular: Story = {
  args: {
    weight: "regular",
    children: "Regular weight heading",
  },
}

export const WeightMedium: Story = {
  args: {
    weight: "medium",
    children: "Medium weight heading",
  },
}

export const WeightBold: Story = {
  args: {
    weight: "bold",
    children: "Bold weight heading",
  },
}

// Alignment stories
export const AlignLeft: Story = {
  args: {
    align: "left",
    children: "Left aligned heading",
  },
}

export const AlignCenter: Story = {
  args: {
    align: "center",
    children: "Center aligned heading",
  },
}

export const AlignRight: Story = {
  args: {
    align: "right",
    children: "Right aligned heading",
  },
}

// Color stories
export const ColorBlue: Story = {
  args: {
    color: "blue",
    children: "Blue heading",
  },
}

export const ColorRed: Story = {
  args: {
    color: "red",
    children: "Red heading",
  },
}

export const ColorGreen: Story = {
  args: {
    color: "green",
    children: "Green heading",
  },
}

export const ColorPurple: Story = {
  args: {
    color: "purple",
    children: "Purple heading",
  },
}

// State stories
export const HighContrast: Story = {
  args: {
    highContrast: true,
    children: "High contrast heading",
    color: "blue",
  },
}

export const Truncated: Story = {
  args: {
    truncate: true,
    children:
      "This is a very long heading that should be truncated with an ellipsis when it exceeds the container width",
    style: { width: "300px" },
  },
}

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((size) => (
        <Heading key={size} size={size as any}>
          Size {size} - The quick brown fox
        </Heading>
      ))}
    </div>
  ),
}

// All weights showcase
export const AllWeights: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {["light", "regular", "medium", "bold"].map((weight) => (
        <Heading key={weight} weight={weight as any} size="6">
          {weight.charAt(0).toUpperCase() + weight.slice(1)} weight heading
        </Heading>
      ))}
    </div>
  ),
}

// Semantic hierarchy showcase
export const SemanticHierarchy: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Heading as="h1" size="8">
        Main Page Title (H1)
      </Heading>
      <Heading as="h2" size="7">
        Section Title (H2)
      </Heading>
      <Heading as="h3" size="6">
        Subsection Title (H3)
      </Heading>
      <Heading as="h4" size="5">
        Sub-subsection Title (H4)
      </Heading>
      <Heading as="h5" size="4">
        Minor Heading (H5)
      </Heading>
      <Heading as="h6" size="3">
        Smallest Heading (H6)
      </Heading>
    </div>
  ),
}

// Color palette showcase
export const ColorPalette: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "12px",
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
        <Heading key={color} color={color as any} size="4">
          {color} heading
        </Heading>
      ))}
    </div>
  ),
}

// Text wrapping example
export const TextWrapping: Story = {
  render: () => (
    <div
      style={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div>
        <Heading size="3" weight="medium" color="gray">
          Normal wrap:
        </Heading>
        <Heading wrap="wrap" size="5">
          This is a long heading that will wrap normally when it reaches the end
        </Heading>
      </div>
      <div>
        <Heading size="3" weight="medium" color="gray">
          No wrap:
        </Heading>
        <Heading wrap="nowrap" size="5">
          This is a long heading that will not wrap and may overflow
        </Heading>
      </div>
      <div>
        <Heading size="3" weight="medium" color="gray">
          Balance wrap:
        </Heading>
        <Heading wrap="balance" size="5">
          This is a long heading that will wrap with balanced line lengths
        </Heading>
      </div>
    </div>
  ),
}

// Real-world usage example
export const RealWorldExample: Story = {
  render: () => (
    <div
      style={{
        maxWidth: "600px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Heading as="h1" size="8" weight="bold" color="blue">
        Welcome to Our Platform
      </Heading>
      <Heading as="h2" size="6" weight="medium" color="gray">
        Getting Started Guide
      </Heading>
      <Heading as="h3" size="5" weight="medium">
        Step 1: Create Your Account
      </Heading>
      <Heading as="h4" size="4" weight="regular">
        Fill in your personal information
      </Heading>
      <Heading as="h3" size="5" weight="medium">
        Step 2: Set Up Your Profile
      </Heading>
      <Heading as="h4" size="4" weight="regular">
        Add a profile picture and bio
      </Heading>
      <Heading as="h2" size="6" weight="medium" color="green" align="center">
        You're all set! 🎉
      </Heading>
    </div>
  ),
}
