import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"

import { Flex, SegmentedControl, Text, Theme } from "../../src/base" // Adjust the import path as necessary,

const meta: Meta<typeof SegmentedControl.Root> = {
  title: "Components/SegmentedControl",
  component: SegmentedControl.Root,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ padding: "20px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
  argTypes: {
    size: {
      control: "select",
      options: ["1", "2", "3"],
      description: "Segmented control size",
    },
    variant: {
      control: "select",
      options: ["classic", "surface"],
      description: "Segmented control variant",
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
      description: "Segmented control color",
    },
    radius: {
      control: "select",
      options: ["none", "small", "medium", "large", "full"],
      description: "Border radius",
    },
    highContrast: {
      control: "boolean",
      description: "High contrast mode",
    },
  },
  args: {
    size: "2",
    variant: "surface",
    defaultValue: "option1",
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  render: (args) => (
    <SegmentedControl.Root {...args}>
      <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Option 3</SegmentedControl.Item>
    </SegmentedControl.Root>
  ),
}

// Size variations
export const Size1: Story = {
  render: (_args) => (
    <SegmentedControl.Root size="1" defaultValue="small">
      <SegmentedControl.Item value="small">Small</SegmentedControl.Item>
      <SegmentedControl.Item value="medium">Medium</SegmentedControl.Item>
      <SegmentedControl.Item value="large">Large</SegmentedControl.Item>
    </SegmentedControl.Root>
  ),
}

export const Size2: Story = {
  render: (_args) => (
    <SegmentedControl.Root size="2" defaultValue="medium">
      <SegmentedControl.Item value="small">Small</SegmentedControl.Item>
      <SegmentedControl.Item value="medium">Medium</SegmentedControl.Item>
      <SegmentedControl.Item value="large">Large</SegmentedControl.Item>
    </SegmentedControl.Root>
  ),
}

export const Size3: Story = {
  render: (_args) => (
    <SegmentedControl.Root size="3" defaultValue="large">
      <SegmentedControl.Item value="small">Small</SegmentedControl.Item>
      <SegmentedControl.Item value="medium">Medium</SegmentedControl.Item>
      <SegmentedControl.Item value="large">Large</SegmentedControl.Item>
    </SegmentedControl.Root>
  ),
}

// Variant stories
export const Classic: Story = {
  render: (_args) => (
    <SegmentedControl.Root variant="classic" defaultValue="classic">
      <SegmentedControl.Item value="classic">Classic</SegmentedControl.Item>
      <SegmentedControl.Item value="modern">Modern</SegmentedControl.Item>
      <SegmentedControl.Item value="minimal">Minimal</SegmentedControl.Item>
    </SegmentedControl.Root>
  ),
}

export const Surface: Story = {
  render: (_args) => (
    <SegmentedControl.Root variant="surface" defaultValue="surface">
      <SegmentedControl.Item value="surface">Surface</SegmentedControl.Item>
      <SegmentedControl.Item value="elevated">Elevated</SegmentedControl.Item>
      <SegmentedControl.Item value="flat">Flat</SegmentedControl.Item>
    </SegmentedControl.Root>
  ),
}

// Color variations
export const ColorBlue: Story = {
  render: (_args) => (
    <SegmentedControl.Root color="blue" defaultValue="option1">
      <SegmentedControl.Item value="option1">Blue Option</SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Another</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Third</SegmentedControl.Item>
    </SegmentedControl.Root>
  ),
}

export const ColorGreen: Story = {
  render: (_args) => (
    <SegmentedControl.Root color="green" defaultValue="option1">
      <SegmentedControl.Item value="option1">
        Green Option
      </SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Another</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Third</SegmentedControl.Item>
    </SegmentedControl.Root>
  ),
}

export const ColorPurple: Story = {
  render: (_args) => (
    <SegmentedControl.Root color="purple" defaultValue="option1">
      <SegmentedControl.Item value="option1">
        Purple Option
      </SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Another</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Third</SegmentedControl.Item>
    </SegmentedControl.Root>
  ),
}

export const ColorRed: Story = {
  render: (_args) => (
    <SegmentedControl.Root color="red" defaultValue="option1">
      <SegmentedControl.Item value="option1">Red Option</SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Another</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Third</SegmentedControl.Item>
    </SegmentedControl.Root>
  ),
}

// Radius variations
export const RadiusNone: Story = {
  render: (_args) => (
    <SegmentedControl.Root radius="none" defaultValue="option1">
      <SegmentedControl.Item value="option1">Square</SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Corners</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Sharp</SegmentedControl.Item>
    </SegmentedControl.Root>
  ),
}

export const RadiusSmall: Story = {
  render: (_args) => (
    <SegmentedControl.Root radius="small" defaultValue="option1">
      <SegmentedControl.Item value="option1">Small</SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Radius</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Rounded</SegmentedControl.Item>
    </SegmentedControl.Root>
  ),
}

export const RadiusFull: Story = {
  render: (_args) => (
    <SegmentedControl.Root radius="full" defaultValue="option1">
      <SegmentedControl.Item value="option1">Fully</SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Rounded</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Pills</SegmentedControl.Item>
    </SegmentedControl.Root>
  ),
}

// High contrast
export const HighContrast: Story = {
  render: (_args) => (
    <SegmentedControl.Root highContrast defaultValue="option1">
      <SegmentedControl.Item value="option1">High</SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Contrast</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Mode</SegmentedControl.Item>
    </SegmentedControl.Root>
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
        <SegmentedControl.Root size="1" defaultValue="option1">
          <SegmentedControl.Item value="option1">First</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Second</SegmentedControl.Item>
          <SegmentedControl.Item value="option3">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>

      <div>
        <Text size="2" style={{ marginBottom: "8px", display: "block" }}>
          Size 2
        </Text>
        <SegmentedControl.Root size="2" defaultValue="option1">
          <SegmentedControl.Item value="option1">First</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Second</SegmentedControl.Item>
          <SegmentedControl.Item value="option3">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>

      <div>
        <Text size="2" style={{ marginBottom: "8px", display: "block" }}>
          Size 3
        </Text>
        <SegmentedControl.Root size="3" defaultValue="option1">
          <SegmentedControl.Item value="option1">First</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Second</SegmentedControl.Item>
          <SegmentedControl.Item value="option3">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>
    </Flex>
  ),
}

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <Flex direction="column" gap="4">
      <div>
        <Text
          size="2"
          weight="medium"
          style={{ marginBottom: "8px", display: "block" }}
        >
          Classic
        </Text>
        <SegmentedControl.Root variant="classic" defaultValue="option1">
          <SegmentedControl.Item value="option1">First</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Second</SegmentedControl.Item>
          <SegmentedControl.Item value="option3">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>

      <div>
        <Text
          size="2"
          weight="medium"
          style={{ marginBottom: "8px", display: "block" }}
        >
          Surface
        </Text>
        <SegmentedControl.Root variant="surface" defaultValue="option1">
          <SegmentedControl.Item value="option1">First</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Second</SegmentedControl.Item>
          <SegmentedControl.Item value="option3">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>
    </Flex>
  ),
}

// View switcher example
export const ViewSwitcher: Story = {
  render: () => {
    const [view, setView] = React.useState("grid")

    return (
      <div>
        <Text
          size="3"
          weight="bold"
          style={{ marginBottom: "12px", display: "block" }}
        >
          View Options
        </Text>

        <SegmentedControl.Root value={view} onValueChange={setView}>
          <SegmentedControl.Item value="grid">📋 Grid</SegmentedControl.Item>
          <SegmentedControl.Item value="list">📄 List</SegmentedControl.Item>
          <SegmentedControl.Item value="card">🗃️ Cards</SegmentedControl.Item>
        </SegmentedControl.Root>

        <div
          style={{
            marginTop: "16px",
            padding: "16px",
            border: "1px solid #e1e5e9",
            borderRadius: "8px",
            backgroundColor: "#fafbfc",
          }}
        >
          <Text size="2">
            Currently viewing in <strong>{view}</strong> mode
          </Text>
        </div>
      </div>
    )
  },
}

// Status filter example
export const StatusFilter: Story = {
  render: () => {
    const [status, setStatus] = React.useState("active")

    return (
      <div>
        <Text
          size="3"
          weight="bold"
          style={{ marginBottom: "12px", display: "block" }}
        >
          Task Status Filter
        </Text>

        <SegmentedControl.Root
          value={status}
          onValueChange={setStatus}
          color="blue"
        >
          <SegmentedControl.Item value="all">📊 All (24)</SegmentedControl.Item>
          <SegmentedControl.Item value="active">
            ⚡ Active (8)
          </SegmentedControl.Item>
          <SegmentedControl.Item value="completed">
            ✅ Done (12)
          </SegmentedControl.Item>
          <SegmentedControl.Item value="pending">
            ⏳ Pending (4)
          </SegmentedControl.Item>
        </SegmentedControl.Root>

        <div
          style={{
            marginTop: "16px",
            padding: "16px",
            border: "1px solid #e1e5e9",
            borderRadius: "8px",
          }}
        >
          <Text size="2">
            Showing{" "}
            <strong>
              {status === "all" ? "all tasks" : `${status} tasks`}
            </strong>
          </Text>
        </div>
      </div>
    )
  },
}

// Time period selector
export const TimePeriodSelector: Story = {
  render: () => {
    const [period, setPeriod] = React.useState("week")

    return (
      <div>
        <Text
          size="3"
          weight="bold"
          style={{ marginBottom: "12px", display: "block" }}
        >
          Analytics Period
        </Text>

        <SegmentedControl.Root
          value={period}
          onValueChange={setPeriod}
          size="1"
        >
          <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
          <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
          <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
          <SegmentedControl.Item value="year">Year</SegmentedControl.Item>
        </SegmentedControl.Root>

        <div
          style={{
            marginTop: "16px",
            padding: "20px",
            border: "1px solid #e1e5e9",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <Text
            size="4"
            weight="bold"
            style={{ display: "block", marginBottom: "8px" }}
          >
            1,234
          </Text>
          <Text size="2" color="gray">
            Total views this {period}
          </Text>
        </div>
      </div>
    )
  },
}

// Theme selector example
export const ThemeSelector: Story = {
  render: () => {
    const [theme, setTheme] = React.useState("light")

    return (
      <div>
        <Text
          size="3"
          weight="bold"
          style={{ marginBottom: "12px", display: "block" }}
        >
          Theme Selection
        </Text>

        <SegmentedControl.Root
          value={theme}
          onValueChange={setTheme}
          color="purple"
        >
          <SegmentedControl.Item value="light">☀️ Light</SegmentedControl.Item>
          <SegmentedControl.Item value="dark">🌙 Dark</SegmentedControl.Item>
          <SegmentedControl.Item value="auto">🔄 Auto</SegmentedControl.Item>
        </SegmentedControl.Root>

        <div
          style={{
            marginTop: "16px",
            padding: "16px",
            border: "1px solid #e1e5e9",
            borderRadius: "8px",
            backgroundColor:
              theme === "dark"
                ? "#1f2937"
                : theme === "light"
                  ? "#ffffff"
                  : "#f3f4f6",
            color: theme === "dark" ? "#f9fafb" : "#111827",
          }}
        >
          <Text size="2">
            Preview of <strong>{theme}</strong> theme
          </Text>
        </div>
      </div>
    )
  },
}

// Priority selector
export const PrioritySelector: Story = {
  render: () => {
    const [priority, setPriority] = React.useState("medium")

    const priorityColors = {
      low: "green",
      medium: "yellow",
      high: "orange",
      urgent: "red",
    }

    return (
      <div>
        <Text
          size="3"
          weight="bold"
          style={{ marginBottom: "12px", display: "block" }}
        >
          Set Priority
        </Text>

        <SegmentedControl.Root
          value={priority}
          onValueChange={setPriority}
          color={priorityColors[priority]}
        >
          <SegmentedControl.Item value="low">🟢 Low</SegmentedControl.Item>
          <SegmentedControl.Item value="medium">
            🟡 Medium
          </SegmentedControl.Item>
          <SegmentedControl.Item value="high">🟠 High</SegmentedControl.Item>
          <SegmentedControl.Item value="urgent">
            🔴 Urgent
          </SegmentedControl.Item>
        </SegmentedControl.Root>

        <div
          style={{
            marginTop: "16px",
            padding: "16px",
            border: "1px solid #e1e5e9",
            borderRadius: "8px",
          }}
        >
          <Text size="2">
            Task priority set to <strong>{priority}</strong>
          </Text>
        </div>
      </div>
    )
  },
}

// Tab-like navigation
export const TabNavigation: Story = {
  render: () => {
    const [activeTab, setActiveTab] = React.useState("overview")

    const tabContent = {
      overview: "Overview dashboard with key metrics and recent activity.",
      analytics: "Detailed analytics and performance charts.",
      users: "User management and access control settings.",
      settings: "Application configuration and preferences.",
    }

    return (
      <div style={{ maxWidth: "500px" }}>
        <SegmentedControl.Root
          value={activeTab}
          onValueChange={setActiveTab}
          size="2"
        >
          <SegmentedControl.Item value="overview">
            📊 Overview
          </SegmentedControl.Item>
          <SegmentedControl.Item value="analytics">
            📈 Analytics
          </SegmentedControl.Item>
          <SegmentedControl.Item value="users">👥 Users</SegmentedControl.Item>
          <SegmentedControl.Item value="settings">
            ⚙️ Settings
          </SegmentedControl.Item>
        </SegmentedControl.Root>

        <div
          style={{
            marginTop: "20px",
            padding: "24px",
            border: "1px solid #e1e5e9",
            borderRadius: "8px",
            backgroundColor: "#fafbfc",
          }}
        >
          <Text
            size="3"
            weight="bold"
            style={{ marginBottom: "12px", display: "block" }}
          >
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </Text>
          <Text size="2" style={{ lineHeight: "1.5" }}>
            {tabContent[activeTab]}
          </Text>
        </div>
      </div>
    )
  },
}

// Two items only
export const TwoItems: Story = {
  render: () => (
    <Flex direction="column" gap="4">
      <div>
        <Text size="2" style={{ marginBottom: "8px", display: "block" }}>
          Toggle View
        </Text>
        <SegmentedControl.Root defaultValue="on">
          <SegmentedControl.Item value="on">✅ On</SegmentedControl.Item>
          <SegmentedControl.Item value="off">❌ Off</SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>

      <div>
        <Text size="2" style={{ marginBottom: "8px", display: "block" }}>
          Edit Mode
        </Text>
        <SegmentedControl.Root defaultValue="view" color="blue">
          <SegmentedControl.Item value="view">👁️ View</SegmentedControl.Item>
          <SegmentedControl.Item value="edit">✏️ Edit</SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>

      <div>
        <Text size="2" style={{ marginBottom: "8px", display: "block" }}>
          Layout
        </Text>
        <SegmentedControl.Root defaultValue="horizontal" size="3">
          <SegmentedControl.Item value="horizontal">
            ↔️ Horizontal
          </SegmentedControl.Item>
          <SegmentedControl.Item value="vertical">
            ↕️ Vertical
          </SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>
    </Flex>
  ),
}

// Many items
export const ManyItems: Story = {
  render: () => (
    <div>
      <Text size="2" style={{ marginBottom: "8px", display: "block" }}>
        Chart Type
      </Text>
      <SegmentedControl.Root defaultValue="line" size="1">
        <SegmentedControl.Item value="line">📈 Line</SegmentedControl.Item>
        <SegmentedControl.Item value="bar">📊 Bar</SegmentedControl.Item>
        <SegmentedControl.Item value="pie">🥧 Pie</SegmentedControl.Item>
        <SegmentedControl.Item value="area">📉 Area</SegmentedControl.Item>
        <SegmentedControl.Item value="scatter">
          ⚪ Scatter
        </SegmentedControl.Item>
        <SegmentedControl.Item value="bubble">🔵 Bubble</SegmentedControl.Item>
      </SegmentedControl.Root>
    </div>
  ),
}
