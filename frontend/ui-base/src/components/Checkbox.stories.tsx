import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Checkbox } from "./checkbox"
import { Flex } from "./flex"
import { Text } from "./text"
import { Theme } from "./theme"

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
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
    size: {
      control: "select",
      options: ["1", "2", "3"],
      description: "Checkbox size",
    },
    variant: {
      control: "select",
      options: ["classic", "surface", "soft"],
      description: "Checkbox variant style",
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
      description: "Checkbox accent color",
    },
    highContrast: {
      control: "boolean",
      description: "High contrast mode",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    checked: {
      control: "boolean",
      description: "Checked state (controlled)",
    },
  },
  args: {
    size: "2",
    variant: "surface",
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  render: (args) => (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
      }}
    >
      <Checkbox {...args} />
      Default Checkbox
    </label>
  ),
}

// Size stories
export const Size1: Story = {
  render: (_args) => (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        cursor: "pointer",
      }}
    >
      <Checkbox size="1" />
      Size 1 (Small)
    </label>
  ),
}

export const Size2: Story = {
  render: (_args) => (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
      }}
    >
      <Checkbox size="2" />
      Size 2 (Default)
    </label>
  ),
}

export const Size3: Story = {
  render: (_args) => (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer",
      }}
    >
      <Checkbox size="3" />
      Size 3 (Large)
    </label>
  ),
}

// Variant stories
export const Classic: Story = {
  render: (_args) => (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
      }}
    >
      <Checkbox variant="classic" />
      Classic Variant
    </label>
  ),
}

export const Surface: Story = {
  render: (_args) => (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
      }}
    >
      <Checkbox variant="surface" />
      Surface Variant
    </label>
  ),
}

export const Soft: Story = {
  render: (_args) => (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
      }}
    >
      <Checkbox variant="soft" />
      Soft Variant
    </label>
  ),
}

// State stories
export const Checked: Story = {
  render: (_args) => (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
      }}
    >
      <Checkbox checked />
      Checked State
    </label>
  ),
}

export const Indeterminate: Story = {
  render: (_args) => (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
      }}
    >
      <Checkbox checked="indeterminate" />
      Indeterminate State
    </label>
  ),
}

export const Disabled: Story = {
  render: (_args) => (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        opacity: "0.6",
      }}
    >
      <Checkbox disabled />
      Disabled State
    </label>
  ),
}

export const DisabledChecked: Story = {
  render: (_args) => (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        opacity: "0.6",
      }}
    >
      <Checkbox disabled checked />
      Disabled + Checked
    </label>
  ),
}

// Color stories
export const ColorBlue: Story = {
  render: (_args) => (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
      }}
    >
      <Checkbox color="blue" checked />
      Blue Color
    </label>
  ),
}

export const ColorRed: Story = {
  render: (_args) => (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
      }}
    >
      <Checkbox color="red" checked />
      Red Color
    </label>
  ),
}

export const ColorGreen: Story = {
  render: (_args) => (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
      }}
    >
      <Checkbox color="green" checked />
      Green Color
    </label>
  ),
}

export const ColorPurple: Story = {
  render: (_args) => (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
      }}
    >
      <Checkbox color="purple" checked />
      Purple Color
    </label>
  ),
}

// High contrast
export const HighContrast: Story = {
  render: (_args) => (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
      }}
    >
      <Checkbox highContrast checked />
      High Contrast Mode
    </label>
  ),
}

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <Flex gap="4" align="center">
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
        }}
      >
        <Checkbox size="1" checked />
        Size 1
      </label>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
        }}
      >
        <Checkbox size="2" checked />
        Size 2
      </label>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
        }}
      >
        <Checkbox size="3" checked />
        Size 3
      </label>
    </Flex>
  ),
}

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <Flex gap="4" align="center">
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
        }}
      >
        <Checkbox variant="classic" checked />
        Classic
      </label>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
        }}
      >
        <Checkbox variant="surface" checked />
        Surface
      </label>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
        }}
      >
        <Checkbox variant="soft" checked />
        Soft
      </label>
    </Flex>
  ),
}

// All states showcase
export const AllStates: Story = {
  render: () => (
    <Flex direction="column" gap="2">
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
        }}
      >
        <Checkbox />
        Unchecked
      </label>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
        }}
      >
        <Checkbox checked />
        Checked
      </label>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
        }}
      >
        <Checkbox checked="indeterminate" />
        Indeterminate
      </label>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          opacity: "0.6",
        }}
      >
        <Checkbox disabled />
        Disabled
      </label>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          opacity: "0.6",
        }}
      >
        <Checkbox disabled checked />
        Disabled + Checked
      </label>
    </Flex>
  ),
}

// Color palette showcase
export const ColorPalette: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
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
        <label
          key={color}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            cursor: "pointer",
          }}
        >
          <Checkbox color={color as any} checked />
          {color}
        </label>
      ))}
    </div>
  ),
}

// Task list example
export const TaskListExample: Story = {
  render: () => (
    <div style={{ maxWidth: "300px" }}>
      <Text size="3" weight="bold" style={{ marginBottom: "12px" }}>
        Todo List
      </Text>
      <Flex direction="column" gap="2">
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
        >
          <Checkbox checked />
          Complete project setup
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
        >
          <Checkbox checked />
          Design system components
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
        >
          <Checkbox checked="indeterminate" />
          Write documentation (in progress)
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
        >
          <Checkbox />
          Unit testing
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
        >
          <Checkbox />
          Deploy to production
        </label>
      </Flex>
    </div>
  ),
}

// Form example
export const FormExample: Story = {
  render: () => (
    <div style={{ maxWidth: "400px" }}>
      <Text size="3" weight="bold" style={{ marginBottom: "16px" }}>
        Account Settings
      </Text>

      <Flex direction="column" gap="3">
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
        >
          <Checkbox color="blue" checked />
          Enable email notifications
        </label>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
        >
          <Checkbox color="green" />
          Subscribe to newsletter
        </label>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
        >
          <Checkbox color="purple" checked />
          Two-factor authentication
        </label>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
        >
          <Checkbox color="orange" />
          Beta features access
        </label>

        <div
          style={{
            marginTop: "16px",
            paddingTop: "12px",
            borderTop: "1px solid #e1e5e9",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <Checkbox style={{ marginTop: "2px" }} />
            <div>
              <div>I agree to the Terms of Service and Privacy Policy</div>
              <div
                style={{ fontSize: "13px", color: "#666", marginTop: "2px" }}
              >
                By checking this box, you acknowledge that you have read and
                agree to our terms.
              </div>
            </div>
          </label>
        </div>
      </Flex>
    </div>
  ),
}
