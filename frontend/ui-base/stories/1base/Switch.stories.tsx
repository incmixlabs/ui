import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Flex, Switch, Text, Theme } from "../../src/base"

const meta: Meta<typeof Switch> = {
  title:"1 Base/Switch",
  component: Switch,
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
      description: "Switch size",
    },
    variant: {
      control: "select",
      options: ["classic", "surface", "soft"],
      description: "Switch variant style",
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
      description: "Switch accent color",
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
      <Switch {...args} />
      Default Switch
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
      <Switch size="1" />
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
      <Switch size="2" />
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
      <Switch size="3" />
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
      <Switch variant="classic" />
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
      <Switch variant="surface" />
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
      <Switch variant="soft" />
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
      <Switch checked />
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
      <Switch disabled />
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
      <Switch disabled checked />
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
      <Switch color="blue" checked />
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
      <Switch color="red" checked />
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
      <Switch color="green" checked />
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
      <Switch color="purple" checked />
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
      <Switch highContrast checked />
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
        <Switch size="1" checked />
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
        <Switch size="2" checked />
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
        <Switch size="3" checked />
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
        <Switch variant="classic" checked />
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
        <Switch variant="surface" checked />
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
        <Switch variant="soft" checked />
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
        <Switch />
        Off
      </label>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
        }}
      >
        <Switch checked />
        On
      </label>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          opacity: "0.6",
        }}
      >
        <Switch disabled />
        Disabled Off
      </label>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          opacity: "0.6",
        }}
      >
        <Switch disabled checked />
        Disabled On
      </label>
    </Flex>
  ),
}

// Settings panel example
export const SettingsExample: Story = {
  render: () => (
    <div style={{ maxWidth: "350px" }}>
      <Text size="3" weight="bold" style={{ marginBottom: "16px" }}>
        Notification Settings
      </Text>

      <Flex direction="column" gap="3">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Text size="2" weight="medium">
              Email Notifications
            </Text>
            <Text size="1" color="gray">
              Receive updates via email
            </Text>
          </div>
          <Switch color="blue" checked />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Text size="2" weight="medium">
              Push Notifications
            </Text>
            <Text size="1" color="gray">
              Get notified on your device
            </Text>
          </div>
          <Switch color="green" />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Text size="2" weight="medium">
              Dark Mode
            </Text>
            <Text size="1" color="gray">
              Switch to dark theme
            </Text>
          </div>
          <Switch color="purple" checked />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Text size="2" weight="medium">
              Auto-save
            </Text>
            <Text size="1" color="gray">
              Automatically save your work
            </Text>
          </div>
          <Switch color="orange" checked />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: "0.6",
          }}
        >
          <div>
            <Text size="2" weight="medium">
              Beta Features
            </Text>
            <Text size="1" color="gray">
              Access experimental features (unavailable)
            </Text>
          </div>
          <Switch disabled />
        </div>
      </Flex>
    </div>
  ),
}

// Privacy settings example
export const PrivacyExample: Story = {
  render: () => (
    <div style={{ maxWidth: "400px" }}>
      <Text size="3" weight="bold" style={{ marginBottom: "16px" }}>
        Privacy & Security
      </Text>

      <Flex direction="column" gap="4">
        <div>
          <Text size="2" weight="medium" style={{ marginBottom: "8px" }}>
            Account Visibility
          </Text>
          <Flex direction="column" gap="2">
            <label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <Text size="2">Public profile</Text>
              <Switch size="1" color="blue" />
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <Text size="2">Show activity status</Text>
              <Switch size="1" color="green" checked />
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <Text size="2">Allow search by email</Text>
              <Switch size="1" color="orange" />
            </label>
          </Flex>
        </div>

        <div>
          <Text size="2" weight="medium" style={{ marginBottom: "8px" }}>
            Security Features
          </Text>
          <Flex direction="column" gap="2">
            <label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <Text size="2">Two-factor authentication</Text>
              <Switch color="red" checked />
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <Text size="2">Login notifications</Text>
              <Switch color="purple" checked />
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <Text size="2">Session timeout</Text>
              <Switch color="cyan" />
            </label>
          </Flex>
        </div>
      </Flex>
    </div>
  ),
}
