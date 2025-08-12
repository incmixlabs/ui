import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Box, Flex, Separator, Text, Theme } from "../../src/base"

const meta: Meta<typeof Separator> = {
  title:"Base/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ width: "300px", padding: "20px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
  argTypes: {
    size: {
      control: "select",
      options: ["1", "2", "3", "4"],
      description: "Separator thickness",
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
      description: "Separator color",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Separator orientation",
    },
  },
  args: {
    size: "1",
    orientation: "horizontal",
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  render: (args) => (
    <div>
      <Text size="2">Content above</Text>
      <Separator {...args} style={{ margin: "16px 0" }} />
      <Text size="2">Content below</Text>
    </div>
  ),
}

// Horizontal orientation
export const Horizontal: Story = {
  render: (_args) => (
    <Flex direction="column" gap="3">
      <Text size="2">First section</Text>
      <Separator orientation="horizontal" />
      <Text size="2">Second section</Text>
      <Separator orientation="horizontal" />
      <Text size="2">Third section</Text>
    </Flex>
  ),
}

// Vertical orientation
export const Vertical: Story = {
  render: (_args) => (
    <Flex align="center" gap="3" style={{ height: "100px" }}>
      <Text size="2">Left</Text>
      <Separator orientation="vertical" />
      <Text size="2">Middle</Text>
      <Separator orientation="vertical" />
      <Text size="2">Right</Text>
    </Flex>
  ),
}

// Size variations
export const Size1: Story = {
  render: (_args) => (
    <div>
      <Text size="2">Size 1 (Thin)</Text>
      <Separator size="1" style={{ margin: "16px 0" }} />
      <Text size="2">Content below</Text>
    </div>
  ),
}

export const Size2: Story = {
  render: (_args) => (
    <div>
      <Text size="2">Size 2 (Default)</Text>
      <Separator size="2" style={{ margin: "16px 0" }} />
      <Text size="2">Content below</Text>
    </div>
  ),
}

export const Size3: Story = {
  render: (_args) => (
    <div>
      <Text size="2">Size 3 (Medium)</Text>
      <Separator size="3" style={{ margin: "16px 0" }} />
      <Text size="2">Content below</Text>
    </div>
  ),
}

export const Size4: Story = {
  render: (_args) => (
    <div>
      <Text size="2">Size 4 (Thick)</Text>
      <Separator size="4" style={{ margin: "16px 0" }} />
      <Text size="2">Content below</Text>
    </div>
  ),
}

// Color variations
export const ColorGray: Story = {
  render: (_args) => (
    <div>
      <Text size="2">Gray separator</Text>
      <Separator color="gray" style={{ margin: "16px 0" }} />
      <Text size="2">Content below</Text>
    </div>
  ),
}

export const ColorBlue: Story = {
  render: (_args) => (
    <div>
      <Text size="2">Blue separator</Text>
      <Separator color="blue" style={{ margin: "16px 0" }} />
      <Text size="2">Content below</Text>
    </div>
  ),
}

export const ColorRed: Story = {
  render: (_args) => (
    <div>
      <Text size="2">Red separator</Text>
      <Separator color="red" style={{ margin: "16px 0" }} />
      <Text size="2">Content below</Text>
    </div>
  ),
}

export const ColorGreen: Story = {
  render: (_args) => (
    <div>
      <Text size="2">Green separator</Text>
      <Separator color="green" style={{ margin: "16px 0" }} />
      <Text size="2">Content below</Text>
    </div>
  ),
}

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <Flex direction="column" gap="4">
      <div>
        <Text size="2" style={{ marginBottom: "8px", display: "block" }}>
          Size 1
        </Text>
        <Separator size="1" />
      </div>
      <div>
        <Text size="2" style={{ marginBottom: "8px", display: "block" }}>
          Size 2
        </Text>
        <Separator size="2" />
      </div>
      <div>
        <Text size="2" style={{ marginBottom: "8px", display: "block" }}>
          Size 3
        </Text>
        <Separator size="3" />
      </div>
      <div>
        <Text size="2" style={{ marginBottom: "8px", display: "block" }}>
          Size 4
        </Text>
        <Separator size="4" />
      </div>
    </Flex>
  ),
}

// Navigation menu example
export const NavigationExample: Story = {
  render: () => (
    <div style={{ maxWidth: "250px" }}>
      <Flex direction="column" gap="2">
        <Text size="2" weight="medium" style={{ padding: "8px 0" }}>
          Dashboard
        </Text>
        <Separator />
        <Text size="2" weight="medium" style={{ padding: "8px 0" }}>
          Projects
        </Text>
        <Separator />
        <Text size="2" weight="medium" style={{ padding: "8px 0" }}>
          Team
        </Text>
        <Separator />
        <Text size="2" weight="medium" style={{ padding: "8px 0" }}>
          Settings
        </Text>
      </Flex>
    </div>
  ),
}

// Toolbar example
export const ToolbarExample: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "8px 12px",
        border: "1px solid #e1e5e9",
        borderRadius: "6px",
      }}
    >
      <Text size="2" style={{ cursor: "pointer" }}>
        Bold
      </Text>
      <Separator orientation="vertical" style={{ height: "20px" }} />
      <Text size="2" style={{ cursor: "pointer" }}>
        Italic
      </Text>
      <Separator orientation="vertical" style={{ height: "20px" }} />
      <Text size="2" style={{ cursor: "pointer" }}>
        Underline
      </Text>
      <Separator orientation="vertical" style={{ height: "20px" }} />
      <Text size="2" style={{ cursor: "pointer" }}>
        Link
      </Text>
    </div>
  ),
}

// Card sections example
export const CardSectionsExample: Story = {
  render: () => (
    <div
      style={{
        maxWidth: "300px",
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "16px" }}>
        <Text size="3" weight="bold">
          User Profile
        </Text>
        <Text size="2" color="gray" style={{ marginTop: "4px" }}>
          John Doe
        </Text>
      </div>

      <Separator />

      <div style={{ padding: "16px" }}>
        <Text size="2" weight="medium" style={{ marginBottom: "8px" }}>
          Contact Info
        </Text>
        <Text size="2">john.doe@example.com</Text>
        <Text size="2">+1 (555) 123-4567</Text>
      </div>

      <Separator />

      <div style={{ padding: "16px" }}>
        <Text size="2" weight="medium" style={{ marginBottom: "8px" }}>
          Location
        </Text>
        <Text size="2">San Francisco, CA</Text>
      </div>
    </div>
  ),
}

// Form sections example
export const FormSectionsExample: Story = {
  render: () => (
    <div style={{ maxWidth: "350px" }}>
      <div>
        <Text
          size="3"
          weight="bold"
          style={{ marginBottom: "16px", display: "block" }}
        >
          Account Settings
        </Text>

        <div style={{ marginBottom: "20px" }}>
          <Text
            size="2"
            weight="medium"
            style={{ marginBottom: "8px", display: "block" }}
          >
            Personal Information
          </Text>
          <Text size="2" color="gray">
            Update your personal details
          </Text>
        </div>

        <Separator style={{ margin: "20px 0" }} />

        <div style={{ marginBottom: "20px" }}>
          <Text
            size="2"
            weight="medium"
            style={{ marginBottom: "8px", display: "block" }}
          >
            Security Settings
          </Text>
          <Text size="2" color="gray">
            Manage your password and 2FA
          </Text>
        </div>

        <Separator style={{ margin: "20px 0" }} />

        <div>
          <Text
            size="2"
            weight="medium"
            style={{ marginBottom: "8px", display: "block" }}
          >
            Notifications
          </Text>
          <Text size="2" color="gray">
            Choose what updates you receive
          </Text>
        </div>
      </div>
    </div>
  ),
}

// Breadcrumb example
export const BreadcrumbExample: Story = {
  render: () => (
    <Flex align="center" gap="2">
      <Text size="2" style={{ cursor: "pointer" }}>
        Home
      </Text>
      <Separator orientation="vertical" style={{ height: "16px" }} />
      <Text size="2" style={{ cursor: "pointer" }}>
        Products
      </Text>
      <Separator orientation="vertical" style={{ height: "16px" }} />
      <Text size="2" style={{ cursor: "pointer" }}>
        Electronics
      </Text>
      <Separator orientation="vertical" style={{ height: "16px" }} />
      <Text size="2" weight="medium">
        Laptops
      </Text>
    </Flex>
  ),
}

// Stats dashboard example
export const StatsDashboardExample: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "0",
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Text size="4" weight="bold" style={{ display: "block" }}>
          1,234
        </Text>
        <Text size="2" color="gray">
          Users
        </Text>
      </div>

      <div style={{ position: "relative" }}>
        <Separator orientation="vertical" style={{ height: "100%" }} />
        <div style={{ padding: "20px", textAlign: "center" }}>
          <Text size="4" weight="bold" style={{ display: "block" }}>
            567
          </Text>
          <Text size="2" color="gray">
            Orders
          </Text>
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <Separator orientation="vertical" style={{ height: "100%" }} />
        <div style={{ padding: "20px", textAlign: "center" }}>
          <Text size="4" weight="bold" style={{ display: "block" }}>
            89%
          </Text>
          <Text size="2" color="gray">
            Success
          </Text>
        </div>
      </div>
    </div>
  ),
}
