import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Box, Text, Theme } from "../../src/1base"

const meta: Meta<typeof Box> = {
  title:"1 Base/Box",
  component: Box,
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
      options: ["div", "span"],
      description: "HTML element to render",
    },
    display: {
      control: "select",
      options: ["none", "inline", "inline-block", "block", "contents"],
      description: "CSS display property",
    },
    asChild: {
      control: "boolean",
      description: "Merge props with the child element",
    },
    // Add common CSS properties for demonstration
    style: {
      control: "object",
      description: "Custom styles",
    },
    children: {
      control: "text",
      description: "Box content",
    },
  },
  args: {
    as: "div",
    children: "Box content",
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    children: "This is a default box",
    style: {
      padding: "16px",
      backgroundColor: "var(--gray-3)",
      borderRadius: "8px",
    },
  },
}

// Different elements
export const AsDiv: Story = {
  args: {
    as: "div",
    children: "This is a div box",
    style: {
      padding: "16px",
      backgroundColor: "var(--blue-3)",
      borderRadius: "8px",
    },
  },
}

export const AsSpan: Story = {
  args: {
    as: "span",
    children: "This is a span box",
    style: {
      padding: "8px",
      backgroundColor: "var(--green-3)",
      borderRadius: "4px",
    },
  },
}

// Display values
export const DisplayBlock: Story = {
  args: {
    display: "block",
    children: "Block display box",
    style: {
      padding: "16px",
      backgroundColor: "var(--red-3)",
      borderRadius: "8px",
      width: "200px",
    },
  },
}

export const DisplayInline: Story = {
  args: {
    display: "inline",
    children: "Inline display box",
    style: {
      padding: "8px",
      backgroundColor: "var(--purple-3)",
      borderRadius: "4px",
    },
  },
}

export const DisplayInlineBlock: Story = {
  args: {
    display: "inline-block",
    children: "Inline-block display box",
    style: {
      padding: "12px",
      backgroundColor: "var(--orange-3)",
      borderRadius: "6px",
    },
  },
}

export const DisplayNone: Story = {
  render: () => (
    <div>
      <Text>You should not see a box below this text:</Text>
      <Box
        display="none"
        style={{ padding: "16px", backgroundColor: "var(--red-9)" }}
      >
        This box is hidden
      </Box>
      <Text>The box above is hidden with display: none</Text>
    </div>
  ),
}

// Layout demonstrations
export const LayoutExamples: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "400px",
      }}
    >
      <Text size="4" weight="bold">
        Box Layout Examples
      </Text>

      <div>
        <Text size="2" weight="medium" color="gray">
          Block boxes (stack vertically):
        </Text>
        <Box
          display="block"
          style={{
            padding: "8px",
            backgroundColor: "var(--blue-3)",
            marginBottom: "4px",
          }}
        >
          Block Box 1
        </Box>
        <Box
          display="block"
          style={{ padding: "8px", backgroundColor: "var(--blue-4)" }}
        >
          Block Box 2
        </Box>
      </div>

      <div>
        <Text size="2" weight="medium" color="gray">
          Inline boxes (flow with text):
        </Text>
        <div>
          Here is some text with{" "}
          <Box
            display="inline"
            style={{ padding: "4px", backgroundColor: "var(--green-3)" }}
          >
            inline box 1
          </Box>{" "}
          and{" "}
          <Box
            display="inline"
            style={{ padding: "4px", backgroundColor: "var(--green-4)" }}
          >
            inline box 2
          </Box>{" "}
          in the middle.
        </div>
      </div>

      <div>
        <Text size="2" weight="medium" color="gray">
          Inline-block boxes (inline but with block properties):
        </Text>
        <div>
          <Box
            display="inline-block"
            style={{
              padding: "12px",
              backgroundColor: "var(--purple-3)",
              marginRight: "8px",
              width: "80px",
              textAlign: "center",
            }}
          >
            Box 1
          </Box>
          <Box
            display="inline-block"
            style={{
              padding: "12px",
              backgroundColor: "var(--purple-4)",
              width: "80px",
              textAlign: "center",
            }}
          >
            Box 2
          </Box>
        </div>
      </div>
    </div>
  ),
}

// Semantic usage
export const SemanticUsage: Story = {
  render: () => (
    <div
      style={{
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Text size="4" weight="bold">
        Semantic Box Usage
      </Text>

      <Box
        as="div"
        style={{
          padding: "16px",
          backgroundColor: "var(--blue-2)",
          borderRadius: "8px",
          border: "1px solid var(--blue-6)",
        }}
      >
        <Text size="3" weight="medium" color="blue">
          Card Container
        </Text>
        <Text size="2" style={{ marginTop: "8px" }}>
          This box acts as a card container with padding and background styling.
        </Text>
      </Box>

      <Box
        as="div"
        style={{
          padding: "12px",
          backgroundColor: "var(--yellow-2)",
          borderRadius: "4px",
          borderLeft: "4px solid var(--yellow-9)",
        }}
      >
        <Text size="2" weight="medium" color="yellow">
          Warning Notice
        </Text>
        <Text size="2" style={{ marginTop: "4px" }}>
          This box is styled as a warning message with a left border accent.
        </Text>
      </Box>

      <Box
        as="div"
        style={{
          display: "flex",
          padding: "8px",
          backgroundColor: "var(--gray-2)",
          borderRadius: "20px",
        }}
      >
        <Box
          as="span"
          style={{
            padding: "4px 12px",
            backgroundColor: "var(--green-9)",
            color: "white",
            borderRadius: "16px",
            fontSize: "12px",
          }}
        >
          Status: Active
        </Box>
      </Box>
    </div>
  ),
}

// Responsive demonstration (conceptual)
export const ResponsiveBoxes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Text size="4" weight="bold">
        Responsive Box Concepts
      </Text>
      <Text size="2" color="gray">
        These boxes demonstrate different responsive behaviors. In a real
        responsive setup, the display properties would change based on viewport
        size.
      </Text>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Box
          display="block"
          style={{
            padding: "16px",
            backgroundColor: "var(--blue-3)",
            borderRadius: "8px",
            minWidth: "150px",
            flex: "1",
          }}
        >
          <Text size="2" weight="medium">
            Mobile: Block
          </Text>
          <Text size="1">Full width on small screens</Text>
        </Box>

        <Box
          display="inline-block"
          style={{
            padding: "16px",
            backgroundColor: "var(--green-3)",
            borderRadius: "8px",
            minWidth: "150px",
            flex: "1",
          }}
        >
          <Text size="2" weight="medium">
            Tablet: Inline-block
          </Text>
          <Text size="1">Side by side on medium screens</Text>
        </Box>

        <Box
          display="block"
          style={{
            padding: "16px",
            backgroundColor: "var(--purple-3)",
            borderRadius: "8px",
            minWidth: "150px",
            flex: "1",
          }}
        >
          <Text size="2" weight="medium">
            Desktop: Flex item
          </Text>
          <Text size="1">Flexible layout on large screens</Text>
        </Box>
      </div>
    </div>
  ),
}

// AsChild demonstration
export const AsChildExample: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Text size="4" weight="bold">
        AsChild Usage
      </Text>

      <div>
        <Text size="2" weight="medium" color="gray">
          Normal Box:
        </Text>
        <Box
          style={{
            padding: "12px",
            backgroundColor: "var(--blue-3)",
            borderRadius: "8px",
          }}
        >
          <button>I'm inside a Box</button>
        </Box>
      </div>

      <div>
        <Text size="2" weight="medium" color="gray">
          AsChild Box (merges with button):
        </Text>
        <Box
          asChild
          style={{
            padding: "12px",
            backgroundColor: "var(--green-3)",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          <button>I am the Box (merged props)</button>
        </Box>
      </div>
    </div>
  ),
}
