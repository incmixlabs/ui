import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import {
  Button,
  DropdownMenu,
  Flex,
  IconButton,
  Text,
  Theme,
} from "../../src/base"

const meta: Meta<typeof DropdownMenu.Root> = {
  title:"1 Base/DropdownMenu",
  component: DropdownMenu.Root,
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
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="outline">Options ▼</Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item>Edit</DropdownMenu.Item>
        <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Archive</DropdownMenu.Item>
        <DropdownMenu.Item color="red">Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
}

// User menu
export const UserMenu: Story = {
  render: (_args) => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="ghost" style={{ padding: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
            <Text size="2">John Doe</Text>
          </div>
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content style={{ minWidth: "200px" }}>
        <DropdownMenu.Label>
          <div style={{ padding: "4px 0" }}>
            <Text size="2" weight="medium">
              John Doe
            </Text>
            <Text size="1" color="gray" style={{ display: "block" }}>
              john@example.com
            </Text>
          </div>
        </DropdownMenu.Label>
        <DropdownMenu.Separator />

        <DropdownMenu.Item>👤 Profile</DropdownMenu.Item>
        <DropdownMenu.Item>⚙️ Settings</DropdownMenu.Item>
        <DropdownMenu.Item>💳 Billing</DropdownMenu.Item>
        <DropdownMenu.Separator />

        <DropdownMenu.Item>👥 Team</DropdownMenu.Item>
        <DropdownMenu.Item>📊 Analytics</DropdownMenu.Item>
        <DropdownMenu.Separator />

        <DropdownMenu.Item>❓ Help & Support</DropdownMenu.Item>
        <DropdownMenu.Item>📋 Changelog</DropdownMenu.Item>
        <DropdownMenu.Separator />

        <DropdownMenu.Item color="red">🚪 Sign out</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
}

// File actions menu
export const FileActionsMenu: Story = {
  render: (_args) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px",
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
      }}
    >
      <div style={{ fontSize: "24px" }}>📄</div>
      <div style={{ flex: 1 }}>
        <Text size="2" weight="medium">
          project-proposal.pdf
        </Text>
        <Text size="1" color="gray" style={{ display: "block" }}>
          2.4 MB • Modified 2 hours ago
        </Text>
      </div>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton variant="ghost" size="1">
            ⋯
          </IconButton>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item>📂 Open</DropdownMenu.Item>
          <DropdownMenu.Item>📥 Download</DropdownMenu.Item>
          <DropdownMenu.Item>👁️ Preview</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>📋 Copy Link</DropdownMenu.Item>
          <DropdownMenu.Item>🔗 Share</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>✏️ Rename</DropdownMenu.Item>
          <DropdownMenu.Item>📁 Move</DropdownMenu.Item>
          <DropdownMenu.Item>📄 Duplicate</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item color="red">🗑️ Delete</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  ),
}

// With submenus
export const WithSubmenus: Story = {
  render: (_args) => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="outline">Create New ▼</Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item>📄 Document</DropdownMenu.Item>
        <DropdownMenu.Item>📊 Spreadsheet</DropdownMenu.Item>
        <DropdownMenu.Item>🎨 Presentation</DropdownMenu.Item>
        <DropdownMenu.Separator />

        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>📁 Folder</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>📂 Regular Folder</DropdownMenu.Item>
            <DropdownMenu.Item>🔒 Private Folder</DropdownMenu.Item>
            <DropdownMenu.Item>👥 Shared Folder</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>🎯 Project</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>💻 Web Project</DropdownMenu.Item>
            <DropdownMenu.Item>📱 Mobile Project</DropdownMenu.Item>
            <DropdownMenu.Item>🖥️ Desktop Project</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>📋 From Template</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        <DropdownMenu.Separator />
        <DropdownMenu.Item>📤 Import</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
}

// Navigation menu
export const NavigationMenu: Story = {
  render: (_args) => (
    <Flex gap="6" align="center">
      <Text size="3" weight="bold">
        MyApp
      </Text>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="ghost">Products ▼</Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item>💻 Desktop App</DropdownMenu.Item>
          <DropdownMenu.Item>📱 Mobile App</DropdownMenu.Item>
          <DropdownMenu.Item>🌐 Web Platform</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>🔧 Developer Tools</DropdownMenu.Item>
          <DropdownMenu.Item>📊 Analytics</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>🎯 Enterprise Solutions</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="ghost">Resources ▼</Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item>📚 Documentation</DropdownMenu.Item>
          <DropdownMenu.Item>🎓 Tutorials</DropdownMenu.Item>
          <DropdownMenu.Item>💡 Examples</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>📝 Blog</DropdownMenu.Item>
          <DropdownMenu.Item>🎙️ Podcast</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>👥 Community</DropdownMenu.Item>
          <DropdownMenu.Item>💬 Discord</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  ),
}

// Settings menu with checkable items
export const SettingsMenu: Story = {
  render: (_args) => {
    const [theme, setTheme] = React.useState("light")
    const [notifications, setNotifications] = React.useState(true)
    const [autoSave, setAutoSave] = React.useState(false)

    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton variant="ghost">⚙️</IconButton>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Label>Display Settings</DropdownMenu.Label>

          <DropdownMenu.RadioGroup value={theme} onValueChange={setTheme}>
            <DropdownMenu.RadioItem value="light">
              ☀️ Light Mode
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="dark">
              🌙 Dark Mode
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="auto">
              🔄 Auto
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>

          <DropdownMenu.Separator />
          <DropdownMenu.Label>Preferences</DropdownMenu.Label>

          <DropdownMenu.CheckboxItem
            checked={notifications}
            onCheckedChange={setNotifications}
          >
            🔔 Enable Notifications
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.CheckboxItem
            checked={autoSave}
            onCheckedChange={setAutoSave}
          >
            💾 Auto-save
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.Separator />
          <DropdownMenu.Item>⚙️ Advanced Settings</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )
  },
}

// Table row actions
export const TableRowActions: Story = {
  render: (_args) => (
    <div
      style={{
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f8f9fa" }}>
            <th
              style={{
                padding: "12px",
                border: "1px solid #e1e5e9",
                textAlign: "left",
              }}
            >
              <Text size="2" weight="medium">
                User
              </Text>
            </th>
            <th
              style={{
                padding: "12px",
                border: "1px solid #e1e5e9",
                textAlign: "left",
              }}
            >
              <Text size="2" weight="medium">
                Role
              </Text>
            </th>
            <th
              style={{
                padding: "12px",
                border: "1px solid #e1e5e9",
                textAlign: "left",
              }}
            >
              <Text size="2" weight="medium">
                Status
              </Text>
            </th>
            <th
              style={{
                padding: "12px",
                border: "1px solid #e1e5e9",
                width: "60px",
              }}
            />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "12px", border: "1px solid #e1e5e9" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: "#e1e5e9",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text size="1" weight="bold">
                    JD
                  </Text>
                </div>
                <div>
                  <Text size="2" weight="medium">
                    John Doe
                  </Text>
                  <Text size="1" color="gray" style={{ display: "block" }}>
                    john@example.com
                  </Text>
                </div>
              </div>
            </td>
            <td style={{ padding: "12px", border: "1px solid #e1e5e9" }}>
              <Text size="2">Admin</Text>
            </td>
            <td style={{ padding: "12px", border: "1px solid #e1e5e9" }}>
              <Text size="2" color="green">
                Active
              </Text>
            </td>
            <td
              style={{
                padding: "12px",
                border: "1px solid #e1e5e9",
                textAlign: "center",
              }}
            >
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <IconButton variant="ghost" size="1">
                    ⋯
                  </IconButton>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content>
                  <DropdownMenu.Item>👁️ View Profile</DropdownMenu.Item>
                  <DropdownMenu.Item>✏️ Edit User</DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item>🔄 Reset Password</DropdownMenu.Item>
                  <DropdownMenu.Item>📧 Send Email</DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger>
                      👤 Change Role
                    </DropdownMenu.SubTrigger>
                    <DropdownMenu.SubContent>
                      <DropdownMenu.Item>Admin</DropdownMenu.Item>
                      <DropdownMenu.Item>Editor</DropdownMenu.Item>
                      <DropdownMenu.Item>Viewer</DropdownMenu.Item>
                    </DropdownMenu.SubContent>
                  </DropdownMenu.Sub>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item color="red">
                    🚫 Deactivate
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
}

// Notification dropdown
export const NotificationDropdown: Story = {
  render: (_args) => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="ghost" style={{ position: "relative" }}>
          🔔
          <div
            style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              width: "8px",
              height: "8px",
              backgroundColor: "#ef4444",
              borderRadius: "50%",
            }}
          />
        </IconButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content style={{ minWidth: "320px" }}>
        <DropdownMenu.Label>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text size="2" weight="medium">
              Notifications
            </Text>
            <Text size="1" color="blue" style={{ cursor: "pointer" }}>
              Mark all read
            </Text>
          </div>
        </DropdownMenu.Label>
        <DropdownMenu.Separator />

        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          <DropdownMenu.Item style={{ padding: "12px" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              <div style={{ fontSize: "16px" }}>💬</div>
              <div style={{ flex: 1 }}>
                <Text size="2" weight="medium" style={{ display: "block" }}>
                  New comment on your post
                </Text>
                <Text size="1" color="gray">
                  Sarah commented: "Great work on this feature!"
                </Text>
                <Text size="1" color="gray" style={{ marginTop: "4px" }}>
                  2 minutes ago
                </Text>
              </div>
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Item style={{ padding: "12px" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              <div style={{ fontSize: "16px" }}>✅</div>
              <div style={{ flex: 1 }}>
                <Text size="2" weight="medium" style={{ display: "block" }}>
                  Task completed
                </Text>
                <Text size="1" color="gray">
                  "Update user dashboard" has been marked as complete
                </Text>
                <Text size="1" color="gray" style={{ marginTop: "4px" }}>
                  1 hour ago
                </Text>
              </div>
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Item style={{ padding: "12px" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              <div style={{ fontSize: "16px" }}>🎉</div>
              <div style={{ flex: 1 }}>
                <Text size="2" weight="medium" style={{ display: "block" }}>
                  Welcome to the team!
                </Text>
                <Text size="1" color="gray">
                  You've been added to the "Frontend Development" team
                </Text>
                <Text size="1" color="gray" style={{ marginTop: "4px" }}>
                  3 hours ago
                </Text>
              </div>
            </div>
          </DropdownMenu.Item>
        </div>

        <DropdownMenu.Separator />
        <DropdownMenu.Item style={{ textAlign: "center" }}>
          <Text size="2" color="blue">
            View all notifications
          </Text>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
}

// Language selector
export const LanguageSelector: Story = {
  render: (_args) => {
    const [language, setLanguage] = React.useState("en")

    const languages = {
      en: { flag: "🇺🇸", name: "English" },
      es: { flag: "🇪🇸", name: "Español" },
      fr: { flag: "🇫🇷", name: "Français" },
      de: { flag: "🇩🇪", name: "Deutsch" },
      zh: { flag: "🇨🇳", name: "中文" },
      ja: { flag: "🇯🇵", name: "日本語" },
    }

    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="outline" size="2">
            {languages[language].flag} {languages[language].name}
          </Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content style={{ minWidth: "160px" }}>
          <DropdownMenu.Label>Choose Language</DropdownMenu.Label>
          <DropdownMenu.Separator />

          <DropdownMenu.RadioGroup value={language} onValueChange={setLanguage}>
            {Object.entries(languages).map(([code, lang]) => (
              <DropdownMenu.RadioItem key={code} value={code}>
                {lang.flag} {lang.name}
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )
  },
}

// Sort and filter menu
export const SortAndFilterMenu: Story = {
  render: (_args) => {
    const [sortBy, setSortBy] = React.useState("date")
    const [showCompleted, setShowCompleted] = React.useState(true)
    const [showPending, setShowPending] = React.useState(true)

    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="outline">🔧 Sort & Filter</Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content style={{ minWidth: "200px" }}>
          <DropdownMenu.Label>Sort by</DropdownMenu.Label>

          <DropdownMenu.RadioGroup value={sortBy} onValueChange={setSortBy}>
            <DropdownMenu.RadioItem value="date">
              📅 Date Created
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="name">
              📝 Name
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="size">
              📏 Size
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="modified">
              🔄 Last Modified
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>

          <DropdownMenu.Separator />
          <DropdownMenu.Label>Show items</DropdownMenu.Label>

          <DropdownMenu.CheckboxItem
            checked={showCompleted}
            onCheckedChange={setShowCompleted}
          >
            ✅ Completed
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.CheckboxItem
            checked={showPending}
            onCheckedChange={setShowPending}
          >
            ⏳ Pending
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.Separator />
          <DropdownMenu.Item>🔄 Reset Filters</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )
  },
}
