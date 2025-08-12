import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Flex, IconButton, Text, Theme } from "../../src/base" // Adjust the import path as necessary

const meta: Meta<typeof IconButton> = {
  title:"Base/IconButton",
  component: IconButton,
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
      options: ["1", "2", "3", "4"],
      description: "IconButton size",
    },
    variant: {
      control: "select",
      options: ["classic", "solid", "soft", "surface", "outline", "ghost"],
      description: "IconButton variant style",
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
      description: "IconButton accent color",
    },
    radius: {
      control: "select",
      options: ["none", "small", "medium", "large", "full"],
      description: "IconButton border radius",
    },
    highContrast: {
      control: "boolean",
      description: "High contrast mode",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    loading: {
      control: "boolean",
      description: "Loading state",
    },
  },
  args: {
    size: "2",
    variant: "soft",
    children: "✓",
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  render: (args) => <IconButton {...args}>✓</IconButton>,
}

// Size stories
export const Size1: Story = {
  render: (_args) => <IconButton size="1">✓</IconButton>,
}

export const Size2: Story = {
  render: (_args) => <IconButton size="2">✓</IconButton>,
}

export const Size3: Story = {
  render: (_args) => <IconButton size="3">✓</IconButton>,
}

export const Size4: Story = {
  render: (_args) => <IconButton size="4">✓</IconButton>,
}

// Variant stories
export const Classic: Story = {
  render: (_args) => <IconButton variant="classic">⚙️</IconButton>,
}

export const Solid: Story = {
  render: (_args) => <IconButton variant="solid">⚙️</IconButton>,
}

export const Soft: Story = {
  render: (_args) => <IconButton variant="soft">⚙️</IconButton>,
}

export const Surface: Story = {
  render: (_args) => <IconButton variant="surface">⚙️</IconButton>,
}

export const Outline: Story = {
  render: (_args) => <IconButton variant="outline">⚙️</IconButton>,
}

export const Ghost: Story = {
  render: (_args) => <IconButton variant="ghost">⚙️</IconButton>,
}

// State stories
export const Disabled: Story = {
  render: (_args) => <IconButton disabled>✓</IconButton>,
}

export const Loading: Story = {
  render: (_args) => <IconButton loading>✓</IconButton>,
}

// Color stories
export const ColorBlue: Story = {
  render: (_args) => <IconButton color="blue">💙</IconButton>,
}

export const ColorRed: Story = {
  render: (_args) => <IconButton color="red">❤️</IconButton>,
}

export const ColorGreen: Story = {
  render: (_args) => <IconButton color="green">💚</IconButton>,
}

export const ColorPurple: Story = {
  render: (_args) => <IconButton color="purple">💜</IconButton>,
}

// Radius stories
export const RadiusNone: Story = {
  render: (_args) => <IconButton radius="none">⬜</IconButton>,
}

export const RadiusSmall: Story = {
  render: (_args) => <IconButton radius="small">🔳</IconButton>,
}

export const RadiusMedium: Story = {
  render: (_args) => <IconButton radius="medium">🔲</IconButton>,
}

export const RadiusLarge: Story = {
  render: (_args) => <IconButton radius="large">🔘</IconButton>,
}

export const RadiusFull: Story = {
  render: (_args) => <IconButton radius="full">🔴</IconButton>,
}

// High contrast
export const HighContrast: Story = {
  render: (_args) => <IconButton highContrast>⚡</IconButton>,
}

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <Flex gap="3" align="center">
      <IconButton size="1">✓</IconButton>
      <IconButton size="2">✓</IconButton>
      <IconButton size="3">✓</IconButton>
      <IconButton size="4">✓</IconButton>
    </Flex>
  ),
}

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <Flex gap="2" wrap="wrap">
      <IconButton variant="classic">⚙️</IconButton>
      <IconButton variant="solid">⚙️</IconButton>
      <IconButton variant="soft">⚙️</IconButton>
      <IconButton variant="surface">⚙️</IconButton>
      <IconButton variant="outline">⚙️</IconButton>
      <IconButton variant="ghost">⚙️</IconButton>
    </Flex>
  ),
}

// All radius showcase
export const AllRadius: Story = {
  render: () => (
    <Flex gap="3" align="center">
      <IconButton radius="none">⬜</IconButton>
      <IconButton radius="small">🔳</IconButton>
      <IconButton radius="medium">🔲</IconButton>
      <IconButton radius="large">🔘</IconButton>
      <IconButton radius="full">🔴</IconButton>
    </Flex>
  ),
}

// Common icons showcase
export const CommonIcons: Story = {
  render: () => (
    <Flex gap="2" wrap="wrap">
      <IconButton>✓</IconButton>
      <IconButton>✕</IconButton>
      <IconButton>❤️</IconButton>
      <IconButton>⭐</IconButton>
      <IconButton>📁</IconButton>
      <IconButton>🔍</IconButton>
      <IconButton>⚙️</IconButton>
      <IconButton>📝</IconButton>
      <IconButton>🔒</IconButton>
      <IconButton>📊</IconButton>
      <IconButton>🏠</IconButton>
      <IconButton>👤</IconButton>
    </Flex>
  ),
}

// Toolbar example
export const ToolbarExample: Story = {
  render: () => (
    <div>
      <Text
        size="3"
        weight="bold"
        style={{ marginBottom: "12px", display: "block" }}
      >
        Text Editor Toolbar
      </Text>
      <Flex
        gap="1"
        style={{
          padding: "8px",
          backgroundColor: "#f8f9fa",
          borderRadius: "6px",
          border: "1px solid #e1e5e9",
        }}
      >
        <IconButton size="1" variant="ghost">
          B
        </IconButton>
        <IconButton size="1" variant="ghost">
          I
        </IconButton>
        <IconButton size="1" variant="ghost">
          U
        </IconButton>
        <div
          style={{
            width: "1px",
            height: "24px",
            backgroundColor: "#e1e5e9",
            margin: "0 4px",
          }}
        />
        <IconButton size="1" variant="ghost">
          ⚪
        </IconButton>
        <IconButton size="1" variant="ghost">
          📋
        </IconButton>
        <IconButton size="1" variant="ghost">
          🔗
        </IconButton>
        <div
          style={{
            width: "1px",
            height: "24px",
            backgroundColor: "#e1e5e9",
            margin: "0 4px",
          }}
        />
        <IconButton size="1" variant="ghost">
          ↶
        </IconButton>
        <IconButton size="1" variant="ghost">
          ↷
        </IconButton>
      </Flex>
    </div>
  ),
}

// Media player controls example
export const MediaPlayerExample: Story = {
  render: () => (
    <div>
      <Text
        size="3"
        weight="bold"
        style={{ marginBottom: "12px", display: "block" }}
      >
        Media Player Controls
      </Text>
      <Flex
        gap="2"
        align="center"
        style={{
          padding: "16px",
          backgroundColor: "#111",
          borderRadius: "8px",
          color: "white",
        }}
      >
        <IconButton size="1" variant="ghost">
          ⏮️
        </IconButton>
        <IconButton size="1" variant="ghost">
          ⏪
        </IconButton>
        <IconButton size="3" variant="solid" color="blue">
          ▶️
        </IconButton>
        <IconButton size="1" variant="ghost">
          ⏩
        </IconButton>
        <IconButton size="1" variant="ghost">
          ⏭️
        </IconButton>
        <div
          style={{
            width: "1px",
            height: "32px",
            backgroundColor: "#333",
            margin: "0 8px",
          }}
        />
        <IconButton size="1" variant="ghost">
          🔊
        </IconButton>
        <IconButton size="1" variant="ghost">
          ⚙️
        </IconButton>
      </Flex>
    </div>
  ),
}

// Action buttons example
export const ActionButtonsExample: Story = {
  render: () => (
    <div style={{ maxWidth: "300px" }}>
      <Text
        size="3"
        weight="bold"
        style={{ marginBottom: "16px", display: "block" }}
      >
        Quick Actions
      </Text>

      <Flex direction="column" gap="3">
        <Flex justify="between" align="center">
          <Text size="2">Enable notifications</Text>
          <Flex gap="1">
            <IconButton size="1" color="green" variant="soft">
              ✓
            </IconButton>
            <IconButton size="1" color="red" variant="soft">
              ✕
            </IconButton>
          </Flex>
        </Flex>

        <Flex justify="between" align="center">
          <Text size="2">Save to favorites</Text>
          <IconButton size="1" color="yellow" variant="soft">
            ⭐
          </IconButton>
        </Flex>

        <Flex justify="between" align="center">
          <Text size="2">Share document</Text>
          <IconButton size="1" color="blue" variant="soft">
            📤
          </IconButton>
        </Flex>

        <Flex justify="between" align="center">
          <Text size="2">Delete item</Text>
          <IconButton size="1" color="red" variant="soft">
            🗑️
          </IconButton>
        </Flex>
      </Flex>
    </div>
  ),
}

// Social actions example
export const SocialActionsExample: Story = {
  render: () => (
    <div style={{ maxWidth: "350px" }}>
      <div
        style={{
          padding: "16px",
          border: "1px solid #e1e5e9",
          borderRadius: "8px",
          marginBottom: "12px",
        }}
      >
        <Text size="2" style={{ marginBottom: "12px", display: "block" }}>
          Just shared a new design system component! What do you think? #design
          #ui #react
        </Text>
        <Flex justify="between" align="center">
          <Flex gap="1">
            <IconButton size="1" variant="ghost" color="red">
              ❤️
            </IconButton>
            <Text size="1" color="gray">
              24
            </Text>
          </Flex>
          <Flex gap="1">
            <IconButton size="1" variant="ghost" color="blue">
              💬
            </IconButton>
            <Text size="1" color="gray">
              8
            </Text>
          </Flex>
          <Flex gap="1">
            <IconButton size="1" variant="ghost" color="green">
              🔄
            </IconButton>
            <Text size="1" color="gray">
              12
            </Text>
          </Flex>
          <IconButton size="1" variant="ghost">
            📤
          </IconButton>
        </Flex>
      </div>
    </div>
  ),
}

// Settings panel example
export const SettingsPanelExample: Story = {
  render: () => (
    <div style={{ maxWidth: "280px" }}>
      <Text
        size="3"
        weight="bold"
        style={{ marginBottom: "16px", display: "block" }}
      >
        Account Settings
      </Text>

      <Flex direction="column" gap="2">
        <Flex justify="between" align="center" style={{ padding: "8px 0" }}>
          <Text size="2">Edit profile</Text>
          <IconButton size="1" variant="ghost">
            ✏️
          </IconButton>
        </Flex>

        <Flex justify="between" align="center" style={{ padding: "8px 0" }}>
          <Text size="2">Privacy settings</Text>
          <IconButton size="1" variant="ghost">
            🔒
          </IconButton>
        </Flex>

        <Flex justify="between" align="center" style={{ padding: "8px 0" }}>
          <Text size="2">Notification preferences</Text>
          <IconButton size="1" variant="ghost">
            🔔
          </IconButton>
        </Flex>

        <Flex justify="between" align="center" style={{ padding: "8px 0" }}>
          <Text size="2">Billing information</Text>
          <IconButton size="1" variant="ghost">
            💳
          </IconButton>
        </Flex>

        <div
          style={{ height: "1px", backgroundColor: "#e1e5e9", margin: "8px 0" }}
        />

        <Flex justify="between" align="center" style={{ padding: "8px 0" }}>
          <Text size="2" color="red">
            Delete account
          </Text>
          <IconButton size="1" variant="ghost" color="red">
            🗑️
          </IconButton>
        </Flex>
      </Flex>
    </div>
  ),
}
