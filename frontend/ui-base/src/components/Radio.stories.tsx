import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Flex } from "./flex"
import { Radio } from "./radio"
import { Theme } from "./theme"

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
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
      description: "Radio button size",
    },
    variant: {
      control: "select",
      options: ["classic", "surface", "soft"],
      description: "Radio button variant style",
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
      description: "Radio button accent color",
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
      <Radio {...args} value="default" />
      Default Radio
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
        gap: "8px",
        cursor: "pointer",
      }}
    >
      <Radio size="1" value="size1" />
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
      <Radio size="2" value="size2" />
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
        gap: "8px",
        cursor: "pointer",
      }}
    >
      <Radio size="3" value="size3" />
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
      <Radio variant="classic" value="classic" />
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
      <Radio variant="surface" value="surface" />
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
      <Radio variant="soft" value="soft" />
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
      <Radio checked value="checked" />
      Checked State
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
      <Radio disabled value="disabled" />
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
      <Radio disabled checked value="disabled-checked" />
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
      <Radio color="blue" checked value="color-blue" />
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
      <Radio color="red" checked value="color-red" />
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
      <Radio color="green" checked value="color-green" />
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
      <Radio color="purple" checked value="color-purple" />
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
      <Radio highContrast checked value="high-contrast" />
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
        <Radio size="1" checked value="size1-showcase" />
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
        <Radio size="2" checked value="size2-showcase" />
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
        <Radio size="3" checked value="size3-showcase" />
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
        <Radio variant="classic" checked value="classic-showcase" />
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
        <Radio variant="surface" checked value="surface-showcase" />
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
        <Radio variant="soft" checked value="soft-showcase" />
        Soft
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
          <Radio color={color as any} checked value={`color-${color}`} />
          {color}
        </label>
      ))}
    </div>
  ),
}

// Interactive example with labels
export const WithLabels: Story = {
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
        <Radio name="option" value="option1" />
        Option 1
      </label>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
        }}
      >
        <Radio name="option" value="option2" />
        Option 2
      </label>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
        }}
      >
        <Radio name="option" value="option3" />
        Option 3
      </label>
    </Flex>
  ),
}

// Real-world form example
export const FormExample: Story = {
  render: () => (
    <div style={{ maxWidth: "300px" }}>
      <h3
        style={{ marginBottom: "12px", fontSize: "16px", fontWeight: "bold" }}
      >
        Choose your plan
      </h3>
      <Flex direction="column" gap="3">
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "8px",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #e1e5e9",
          }}
        >
          <Radio name="plan" value="basic" style={{ marginTop: "2px" }} />
          <div>
            <div style={{ fontWeight: "bold" }}>Basic Plan</div>
            <div style={{ fontSize: "14px", color: "#666" }}>
              $9/month - Essential features
            </div>
          </div>
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "8px",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #e1e5e9",
          }}
        >
          <Radio name="plan" value="pro" style={{ marginTop: "2px" }} />
          <div>
            <div style={{ fontWeight: "bold" }}>Pro Plan</div>
            <div style={{ fontSize: "14px", color: "#666" }}>
              $19/month - Advanced features
            </div>
          </div>
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "8px",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #e1e5e9",
          }}
        >
          <Radio name="plan" value="enterprise" style={{ marginTop: "2px" }} />
          <div>
            <div style={{ fontWeight: "bold" }}>Enterprise</div>
            <div style={{ fontSize: "14px", color: "#666" }}>
              Contact us - Custom solution
            </div>
          </div>
        </label>
      </Flex>
    </div>
  ),
}
