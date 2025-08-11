import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Text, Theme } from "../../src/base"

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
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
      options: ["span", "div", "label", "p"],
      description: "HTML element to render",
    },
    size: {
      control: "select",
      options: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      description: "Text size",
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
      description: "Text color",
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
      description: "Text content",
    },
  },
  args: {
    children: "The quick brown fox jumps over the lazy dog",
    as: "span",
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    children: "This is default text",
  },
}

// Element types
export const AsSpan: Story = {
  args: {
    as: "span",
    children: "This is a span element",
  },
}

export const AsDiv: Story = {
  args: {
    as: "div",
    children: "This is a div element",
  },
}

export const AsLabel: Story = {
  args: {
    as: "label",
    children: "This is a label element",
  },
}

export const AsParagraph: Story = {
  args: {
    as: "p",
    children:
      "This is a paragraph element with more text to demonstrate how it looks when rendered as a paragraph.",
  },
}

// Size stories
export const Size1: Story = {
  args: {
    size: "1",
    children: "Size 1 text",
  },
}

export const Size2: Story = {
  args: {
    size: "2",
    children: "Size 2 text",
  },
}

export const Size3: Story = {
  args: {
    size: "3",
    children: "Size 3 text",
  },
}

export const Size4: Story = {
  args: {
    size: "4",
    children: "Size 4 text",
  },
}

export const Size5: Story = {
  args: {
    size: "5",
    children: "Size 5 text",
  },
}

export const Size6: Story = {
  args: {
    size: "6",
    children: "Size 6 text",
  },
}

export const Size7: Story = {
  args: {
    size: "7",
    children: "Size 7 text",
  },
}

export const Size8: Story = {
  args: {
    size: "8",
    children: "Size 8 text",
  },
}

export const Size9: Story = {
  args: {
    size: "9",
    children: "Size 9 text",
  },
}

// Weight stories
export const WeightLight: Story = {
  args: {
    weight: "light",
    children: "Light weight text",
  },
}

export const WeightRegular: Story = {
  args: {
    weight: "regular",
    children: "Regular weight text",
  },
}

export const WeightMedium: Story = {
  args: {
    weight: "medium",
    children: "Medium weight text",
  },
}

export const WeightBold: Story = {
  args: {
    weight: "bold",
    children: "Bold weight text",
  },
}

// Alignment stories
export const AlignLeft: Story = {
  args: {
    align: "left",
    children: "Left aligned text",
    as: "div",
  },
}

export const AlignCenter: Story = {
  args: {
    align: "center",
    children: "Center aligned text",
    as: "div",
  },
}

export const AlignRight: Story = {
  args: {
    align: "right",
    children: "Right aligned text",
    as: "div",
  },
}

// Color stories
export const ColorBlue: Story = {
  args: {
    color: "blue",
    children: "Blue text",
  },
}

export const ColorRed: Story = {
  args: {
    color: "red",
    children: "Red text",
  },
}

export const ColorGreen: Story = {
  args: {
    color: "green",
    children: "Green text",
  },
}

export const ColorPurple: Story = {
  args: {
    color: "purple",
    children: "Purple text",
  },
}

// State stories
export const HighContrast: Story = {
  args: {
    highContrast: true,
    children: "High contrast text",
    color: "blue",
  },
}

export const Truncated: Story = {
  args: {
    truncate: true,
    children:
      "This is a very long text that should be truncated with an ellipsis when it exceeds the container width",
    style: { width: "200px" },
  },
}

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((size) => (
        <Text key={size} size={size as any}>
          Size {size} - The quick brown fox jumps over the lazy dog
        </Text>
      ))}
    </div>
  ),
}

// All weights showcase
export const AllWeights: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {["light", "regular", "medium", "bold"].map((weight) => (
        <Text key={weight} weight={weight as any} size="4">
          {weight.charAt(0).toUpperCase() + weight.slice(1)} weight text
        </Text>
      ))}
    </div>
  ),
}

// Color palette showcase
export const ColorPalette: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
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
        <Text key={color} color={color as any}>
          {color} text
        </Text>
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
        <Text weight="medium" size="2">
          Normal wrap:
        </Text>
        <Text wrap="wrap">
          This is a long sentence that will wrap normally when it reaches the
          end of the container.
        </Text>
      </div>
      <div>
        <Text weight="medium" size="2">
          No wrap:
        </Text>
        <Text wrap="nowrap">
          This is a long sentence that will not wrap and may overflow the
          container.
        </Text>
      </div>
      <div>
        <Text weight="medium" size="2">
          Pretty wrap:
        </Text>
        <Text wrap="pretty">
          This is a long sentence that will wrap in a prettier way, avoiding
          orphans and widows.
        </Text>
      </div>
      <div>
        <Text weight="medium" size="2">
          Balance wrap:
        </Text>
        <Text wrap="balance">
          This is a long sentence that will wrap with balanced line lengths for
          better visual appearance.
        </Text>
      </div>
    </div>
  ),
}

// Real-world usage example
export const RealWorldExample: Story = {
  render: () => (
    <div
      style={{
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <Text size="6" weight="bold" color="blue">
        Article Title
      </Text>
      <Text size="3" color="gray" weight="medium">
        Published on March 15, 2024
      </Text>
      <Text size="4" as="p">
        This is the first paragraph of an article. It demonstrates how text
        components can be used to create readable and well-structured content
        with proper typography.
      </Text>
      <Text size="4" as="p">
        This is another paragraph that shows how multiple text elements work
        together to create a cohesive reading experience.
      </Text>
      <Text size="2" color="gray" align="right">
        — Author Name
      </Text>
    </div>
  ),
}
