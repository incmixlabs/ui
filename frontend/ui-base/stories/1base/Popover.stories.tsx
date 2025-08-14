import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import {
  Button,
  Flex,
  IconButton,
  Popover,
  Separator,
  Text,
  Theme,
} from "../../src/1base" // Adjust the import path as necessary

const meta: Meta<typeof Popover.Root> = {
  title:"1 Base/Popover",
  component: Popover.Root,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ padding: "40px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  render: (_args) => (
    <Popover.Root>
      <Popover.Trigger>
        <Button>Open Popover</Button>
      </Popover.Trigger>

      <Popover.Content style={{ width: "300px" }}>
        <Text
          size="3"
          weight="medium"
          style={{ marginBottom: "8px", display: "block" }}
        >
          Popover Title
        </Text>
        <Text size="2" style={{ lineHeight: "1.5" }}>
          This is a simple popover with some content. You can put any elements
          inside the popover content area.
        </Text>
      </Popover.Content>
    </Popover.Root>
  ),
}

// User profile popover
export const UserProfile: Story = {
  render: (_args) => (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant="ghost" style={{ padding: "4px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: "#3b82f6",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            JD
          </div>
        </Button>
      </Popover.Trigger>

      <Popover.Content style={{ width: "280px" }}>
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              backgroundColor: "#3b82f6",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "24px",
              fontWeight: "bold",
              margin: "0 auto 12px",
            }}
          >
            JD
          </div>
          <Text size="3" weight="bold" style={{ display: "block" }}>
            John Doe
          </Text>
          <Text size="2" color="gray" style={{ display: "block" }}>
            Senior Developer
          </Text>
          <Text size="2" color="gray" style={{ display: "block" }}>
            john.doe@company.com
          </Text>
        </div>

        <Separator style={{ margin: "12px 0" }} />

        <Flex direction="column" gap="2">
          <Text
            size="2"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>Projects:</span>
            <span style={{ fontWeight: "medium" }}>12</span>
          </Text>
          <Text
            size="2"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>Tasks completed:</span>
            <span style={{ fontWeight: "medium" }}>89</span>
          </Text>
          <Text
            size="2"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>Team:</span>
            <span style={{ fontWeight: "medium" }}>Frontend</span>
          </Text>
        </Flex>

        <Separator style={{ margin: "12px 0" }} />

        <Flex gap="2">
          <Button size="1" variant="soft" style={{ flex: 1 }}>
            💬 Message
          </Button>
          <Button size="1" variant="outline" style={{ flex: 1 }}>
            👁️ View Profile
          </Button>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  ),
}

// Help tooltip
export const HelpTooltip: Story = {
  render: (_args) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Text size="2">API Key</Text>
      <Popover.Root>
        <Popover.Trigger>
          <IconButton size="1" variant="ghost" style={{ color: "#6b7280" }}>
            ❓
          </IconButton>
        </Popover.Trigger>

        <Popover.Content style={{ width: "250px" }}>
          <Text
            size="2"
            weight="medium"
            style={{ marginBottom: "8px", display: "block" }}
          >
            What is an API Key?
          </Text>
          <Text size="2" style={{ lineHeight: "1.5", marginBottom: "12px" }}>
            An API key is a unique identifier that authenticates your requests
            to our service. Keep it secure and don't share it publicly.
          </Text>
          <Text size="1" color="blue" style={{ cursor: "pointer" }}>
            Learn more about API security →
          </Text>
        </Popover.Content>
      </Popover.Root>
    </div>
  ),
}

// Settings popover
export const SettingsPopover: Story = {
  render: (_args) => (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton variant="ghost">⚙️</IconButton>
      </Popover.Trigger>

      <Popover.Content style={{ width: "240px" }}>
        <Text
          size="2"
          weight="medium"
          style={{ marginBottom: "12px", display: "block" }}
        >
          Quick Settings
        </Text>

        <Flex direction="column" gap="3">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text size="2">Dark Mode</Text>
            <Button size="1" variant="soft">
              Toggle
            </Button>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text size="2">Notifications</Text>
            <Button size="1" variant="soft">
              On
            </Button>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text size="2">Auto-save</Text>
            <Button size="1" variant="outline">
              Off
            </Button>
          </div>
        </Flex>

        <Separator style={{ margin: "12px 0" }} />

        <Button size="2" variant="outline" style={{ width: "100%" }}>
          Advanced Settings
        </Button>
      </Popover.Content>
    </Popover.Root>
  ),
}

// Color picker popover
export const ColorPicker: Story = {
  render: (_args) => {
    const [selectedColor, setSelectedColor] = React.useState("#3b82f6")

    const colors = [
      "#ef4444",
      "#f97316",
      "#f59e0b",
      "#eab308",
      "#22c55e",
      "#10b981",
      "#06b6d4",
      "#3b82f6",
      "#6366f1",
      "#8b5cf6",
      "#a855f7",
      "#d946ef",
      "#ec4899",
      "#f43f5e",
      "#6b7280",
      "#374151",
    ]

    return (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Text size="2">Color:</Text>
        <Popover.Root>
          <Popover.Trigger>
            <button
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "6px",
                border: "2px solid #e1e5e9",
                backgroundColor: selectedColor,
                cursor: "pointer",
              }}
            />
          </Popover.Trigger>

          <Popover.Content style={{ width: "200px" }}>
            <Text
              size="2"
              weight="medium"
              style={{ marginBottom: "12px", display: "block" }}
            >
              Choose Color
            </Text>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "4px",
                    border:
                      selectedColor === color
                        ? "2px solid #000"
                        : "1px solid #e1e5e9",
                    backgroundColor: color,
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>

            <div style={{ marginBottom: "8px" }}>
              <Text
                size="1"
                color="gray"
                style={{ display: "block", marginBottom: "4px" }}
              >
                Custom Color
              </Text>
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                style={{
                  width: "100%",
                  height: "32px",
                  border: "none",
                  borderRadius: "4px",
                }}
              />
            </div>

            <Text size="1" color="gray">
              Selected: {selectedColor}
            </Text>
          </Popover.Content>
        </Popover.Root>
      </div>
    )
  },
}

// Share popover
export const SharePopover: Story = {
  render: (_args) => (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant="outline">📤 Share</Button>
      </Popover.Trigger>

      <Popover.Content style={{ width: "320px" }}>
        <Text
          size="2"
          weight="medium"
          style={{ marginBottom: "12px", display: "block" }}
        >
          Share this project
        </Text>

        <div
          style={{
            padding: "8px",
            backgroundColor: "#f8f9fa",
            borderRadius: "6px",
            marginBottom: "12px",
            display: "flex",
            gap: "8px",
          }}
        >
          <input
            type="text"
            value="https://app.example.com/projects/abc123"
            readOnly
            style={{
              flex: 1,
              padding: "4px 8px",
              border: "none",
              backgroundColor: "transparent",
              fontSize: "14px",
            }}
          />
          <Button size="1" variant="soft">
            📋 Copy
          </Button>
        </div>

        <Text
          size="2"
          weight="medium"
          style={{ marginBottom: "8px", display: "block" }}
        >
          Share via
        </Text>

        <Flex gap="2" style={{ marginBottom: "12px" }}>
          <Button size="1" variant="soft" style={{ flex: 1 }}>
            📧 Email
          </Button>
          <Button size="1" variant="soft" style={{ flex: 1 }}>
            💬 Slack
          </Button>
          <Button size="1" variant="soft" style={{ flex: 1 }}>
            🐦 Twitter
          </Button>
        </Flex>

        <Separator style={{ margin: "12px 0" }} />

        <div>
          <Text
            size="2"
            weight="medium"
            style={{ marginBottom: "8px", display: "block" }}
          >
            Access Level
          </Text>
          <select
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #e1e5e9",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            <option>Can view</option>
            <option>Can edit</option>
            <option>Can admin</option>
          </select>
        </div>
      </Popover.Content>
    </Popover.Root>
  ),
}

// Calendar popover
export const CalendarPopover: Story = {
  render: (_args) => {
    const [selectedDate, setSelectedDate] = React.useState(new Date())

    return (
      <Popover.Root>
        <Popover.Trigger>
          <Button variant="outline">
            📅 {selectedDate.toLocaleDateString()}
          </Button>
        </Popover.Trigger>

        <Popover.Content style={{ width: "280px" }}>
          <Text
            size="2"
            weight="medium"
            style={{ marginBottom: "12px", display: "block" }}
          >
            Select Date
          </Text>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "4px",
              marginBottom: "12px",
            }}
          >
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div
                key={day}
                style={{
                  padding: "8px 4px",
                  textAlign: "center",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#6b7280",
                }}
              >
                {day}
              </div>
            ))}

            {Array.from({ length: 35 }, (_, i) => {
              const date = new Date(2024, 2, i - 5) // March 2024 example
              const isSelected =
                date.toDateString() === selectedDate.toDateString()
              const isToday = date.toDateString() === new Date().toDateString()
              const isCurrentMonth = date.getMonth() === 2

              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(date)}
                  style={{
                    padding: "8px 4px",
                    border: "none",
                    borderRadius: "4px",
                    backgroundColor: isSelected ? "#3b82f6" : "transparent",
                    color: isSelected
                      ? "white"
                      : isCurrentMonth
                        ? "#374151"
                        : "#d1d5db",
                    fontSize: "14px",
                    cursor: "pointer",
                    fontWeight: isToday ? "bold" : "normal",
                  }}
                >
                  {date.getDate()}
                </button>
              )
            })}
          </div>

          <Flex justify="between">
            <Button size="1" variant="ghost">
              ← Previous
            </Button>
            <Text size="2" weight="medium">
              March 2024
            </Text>
            <Button size="1" variant="ghost">
              Next →
            </Button>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    )
  },
}

// Filter popover
export const FilterPopover: Story = {
  render: (_args) => {
    const [filters, setFilters] = React.useState({
      status: "all",
      priority: "all",
      assignee: "all",
    })

    return (
      <Popover.Root>
        <Popover.Trigger>
          <Button variant="outline">
            🔍 Filters
            {Object.values(filters).some((v) => v !== "all") && (
              <span
                style={{
                  marginLeft: "4px",
                  backgroundColor: "#3b82f6",
                  color: "white",
                  borderRadius: "50%",
                  width: "16px",
                  height: "16px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                }}
              >
                •
              </span>
            )}
          </Button>
        </Popover.Trigger>

        <Popover.Content style={{ width: "240px" }}>
          <Text
            size="2"
            weight="medium"
            style={{ marginBottom: "12px", display: "block" }}
          >
            Filter Tasks
          </Text>

          <Flex direction="column" gap="3">
            <div>
              <Text size="2" style={{ marginBottom: "4px", display: "block" }}>
                Status
              </Text>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "6px",
                  border: "1px solid #e1e5e9",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                <option value="all">All</option>
                <option value="todo">To Do</option>
                <option value="progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <Text size="2" style={{ marginBottom: "4px", display: "block" }}>
                Priority
              </Text>
              <select
                value={filters.priority}
                onChange={(e) =>
                  setFilters({ ...filters, priority: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "6px",
                  border: "1px solid #e1e5e9",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                <option value="all">All</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <Text size="2" style={{ marginBottom: "4px", display: "block" }}>
                Assignee
              </Text>
              <select
                value={filters.assignee}
                onChange={(e) =>
                  setFilters({ ...filters, assignee: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "6px",
                  border: "1px solid #e1e5e9",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                <option value="all">All</option>
                <option value="me">Assigned to me</option>
                <option value="unassigned">Unassigned</option>
              </select>
            </div>
          </Flex>

          <Separator style={{ margin: "12px 0" }} />

          <Flex gap="2">
            <Button
              size="1"
              variant="ghost"
              onClick={() =>
                setFilters({ status: "all", priority: "all", assignee: "all" })
              }
              style={{ flex: 1 }}
            >
              Reset
            </Button>
            <Button size="1" variant="solid" style={{ flex: 1 }}>
              Apply
            </Button>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    )
  },
}

// Quick actions popover
export const QuickActions: Story = {
  render: (_args) => (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton variant="solid" style={{ borderRadius: "50%" }}>
          ➕
        </IconButton>
      </Popover.Trigger>

      <Popover.Content style={{ width: "200px" }}>
        <Text
          size="2"
          weight="medium"
          style={{ marginBottom: "12px", display: "block" }}
        >
          Quick Actions
        </Text>

        <Flex direction="column" gap="2">
          <Button variant="ghost" style={{ justifyContent: "flex-start" }}>
            📝 New Document
          </Button>
          <Button variant="ghost" style={{ justifyContent: "flex-start" }}>
            📁 New Folder
          </Button>
          <Button variant="ghost" style={{ justifyContent: "flex-start" }}>
            📊 New Project
          </Button>
          <Button variant="ghost" style={{ justifyContent: "flex-start" }}>
            👥 Invite People
          </Button>
        </Flex>

        <Separator style={{ margin: "12px 0" }} />

        <Button
          variant="ghost"
          style={{ justifyContent: "flex-start", width: "100%" }}
        >
          📤 Import Files
        </Button>
      </Popover.Content>
    </Popover.Root>
  ),
}

// Emoji picker popover
export const EmojiPicker: Story = {
  render: (_args) => {
    const [selectedEmoji, setSelectedEmoji] = React.useState("😀")

    const emojis = [
      "😀",
      "😃",
      "😄",
      "😁",
      "😊",
      "😇",
      "🙂",
      "🙃",
      "😉",
      "😌",
      "😍",
      "🥰",
      "😘",
      "😗",
      "😙",
      "😚",
      "😋",
      "😛",
      "😝",
      "😜",
      "🤪",
      "🤨",
      "🧐",
      "🤓",
      "😎",
      "🤩",
      "🥳",
      "😏",
      "😒",
      "😞",
      "😔",
      "😟",
    ]

    return (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Text size="2">Reaction:</Text>
        <Popover.Root>
          <Popover.Trigger>
            <Button variant="outline" size="2">
              {selectedEmoji}
            </Button>
          </Popover.Trigger>

          <Popover.Content style={{ width: "280px" }}>
            <Text
              size="2"
              weight="medium"
              style={{ marginBottom: "12px", display: "block" }}
            >
              Choose Emoji
            </Text>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(8, 1fr)",
                gap: "4px",
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setSelectedEmoji(emoji)}
                  style={{
                    width: "32px",
                    height: "32px",
                    border:
                      selectedEmoji === emoji
                        ? "2px solid #3b82f6"
                        : "1px solid #e1e5e9",
                    borderRadius: "4px",
                    backgroundColor:
                      selectedEmoji === emoji ? "#eff6ff" : "transparent",
                    fontSize: "18px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </Popover.Content>
        </Popover.Root>
      </div>
    )
  },
}
