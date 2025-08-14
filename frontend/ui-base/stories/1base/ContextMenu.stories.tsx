import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Box, ContextMenu, Flex, Text, Theme } from "../../src/1base" // Adjust the import path as necessary

const meta: Meta<typeof ContextMenu.Root> = {
  title:"1 Base/ContextMenu",
  component: ContextMenu.Root,
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
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Box
          style={{
            padding: "40px",
            border: "2px dashed #e1e5e9",
            borderRadius: "8px",
            textAlign: "center",
            cursor: "context-menu",
          }}
        >
          <Text size="3">Right-click me</Text>
          <Text
            size="2"
            color="gray"
            style={{ marginTop: "4px", display: "block" }}
          >
            Try right-clicking on this area
          </Text>
        </Box>
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item>Copy</ContextMenu.Item>
        <ContextMenu.Item>Paste</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>Edit</ContextMenu.Item>
        <ContextMenu.Item>Delete</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  ),
}

// File operations
export const FileOperations: Story = {
  render: (_args) => (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Box
          style={{
            padding: "20px",
            border: "1px solid #e1e5e9",
            borderRadius: "8px",
            backgroundColor: "#fafbfc",
            cursor: "context-menu",
            minWidth: "200px",
          }}
        >
          <Text size="2" weight="medium">
            📄 Document.pdf
          </Text>
          <Text
            size="1"
            color="gray"
            style={{ marginTop: "4px", display: "block" }}
          >
            2.4 MB • Modified 2 hours ago
          </Text>
        </Box>
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item>📂 Open</ContextMenu.Item>
        <ContextMenu.Item>👁️ Preview</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>📋 Copy</ContextMenu.Item>
        <ContextMenu.Item>✂️ Cut</ContextMenu.Item>
        <ContextMenu.Item>📄 Duplicate</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>✏️ Rename</ContextMenu.Item>
        <ContextMenu.Item>🗑️ Delete</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>ℹ️ Properties</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  ),
}

// Text editing
export const TextEditing: Story = {
  render: (_args) => (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Box
          style={{
            padding: "20px",
            border: "1px solid #e1e5e9",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            cursor: "text",
            minHeight: "120px",
            lineHeight: "1.6",
          }}
        >
          <Text size="2">
            This is a sample text area. Right-click anywhere in this text to see
            the context menu with text editing options. You can select text and
            use the context menu for various operations.
          </Text>
        </Box>
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item shortcut="Ctrl+C">Copy</ContextMenu.Item>
        <ContextMenu.Item shortcut="Ctrl+X">Cut</ContextMenu.Item>
        <ContextMenu.Item shortcut="Ctrl+V">Paste</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item shortcut="Ctrl+A">Select All</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>Bold</ContextMenu.Item>
        <ContextMenu.Item>Italic</ContextMenu.Item>
        <ContextMenu.Item>Underline</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>Find & Replace</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  ),
}

// With submenus
export const WithSubmenus: Story = {
  render: (_args) => (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Box
          style={{
            padding: "30px",
            border: "1px solid #e1e5e9",
            borderRadius: "8px",
            backgroundColor: "#f8f9fa",
            cursor: "context-menu",
            textAlign: "center",
          }}
        >
          <Text size="3">🎨 Design Element</Text>
          <Text
            size="2"
            color="gray"
            style={{ marginTop: "4px", display: "block" }}
          >
            Right-click for design options
          </Text>
        </Box>
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item>Edit</ContextMenu.Item>
        <ContextMenu.Item>Duplicate</ContextMenu.Item>
        <ContextMenu.Separator />

        <ContextMenu.Sub>
          <ContextMenu.SubTrigger>Arrange</ContextMenu.SubTrigger>
          <ContextMenu.SubContent>
            <ContextMenu.Item>Bring to Front</ContextMenu.Item>
            <ContextMenu.Item>Send to Back</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item>Bring Forward</ContextMenu.Item>
            <ContextMenu.Item>Send Backward</ContextMenu.Item>
          </ContextMenu.SubContent>
        </ContextMenu.Sub>

        <ContextMenu.Sub>
          <ContextMenu.SubTrigger>Transform</ContextMenu.SubTrigger>
          <ContextMenu.SubContent>
            <ContextMenu.Item>Rotate 90° CW</ContextMenu.Item>
            <ContextMenu.Item>Rotate 90° CCW</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item>Flip Horizontal</ContextMenu.Item>
            <ContextMenu.Item>Flip Vertical</ContextMenu.Item>
          </ContextMenu.SubContent>
        </ContextMenu.Sub>

        <ContextMenu.Separator />
        <ContextMenu.Item>Delete</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  ),
}

// Image context menu
export const ImageContextMenu: Story = {
  render: (_args) => (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Box
          style={{
            width: "200px",
            height: "150px",
            border: "1px solid #e1e5e9",
            borderRadius: "8px",
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "context-menu",
            position: "relative",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Text size="6">🖼️</Text>
            <Text
              size="2"
              color="gray"
              style={{ marginTop: "8px", display: "block" }}
            >
              image.jpg
            </Text>
          </div>
        </Box>
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item>👁️ View Full Size</ContextMenu.Item>
        <ContextMenu.Item>📋 Copy Image</ContextMenu.Item>
        <ContextMenu.Item>📥 Save Image As...</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>✏️ Edit Image</ContextMenu.Item>
        <ContextMenu.Item>🔄 Replace Image</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Sub>
          <ContextMenu.SubTrigger>📤 Export As</ContextMenu.SubTrigger>
          <ContextMenu.SubContent>
            <ContextMenu.Item>PNG</ContextMenu.Item>
            <ContextMenu.Item>JPEG</ContextMenu.Item>
            <ContextMenu.Item>WebP</ContextMenu.Item>
            <ContextMenu.Item>SVG</ContextMenu.Item>
          </ContextMenu.SubContent>
        </ContextMenu.Sub>
        <ContextMenu.Separator />
        <ContextMenu.Item>🗑️ Delete</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  ),
}

// Table cell context menu
export const TableCellMenu: Story = {
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
                Name
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
          </tr>
        </thead>
        <tbody>
          <tr>
            <ContextMenu.Root>
              <ContextMenu.Trigger>
                <td
                  style={{
                    padding: "12px",
                    border: "1px solid #e1e5e9",
                    cursor: "context-menu",
                  }}
                >
                  <Text size="2">John Doe</Text>
                </td>
              </ContextMenu.Trigger>
              <ContextMenu.Content>
                <ContextMenu.Item>📋 Copy Cell</ContextMenu.Item>
                <ContextMenu.Item>📄 Copy Row</ContextMenu.Item>
                <ContextMenu.Separator />
                <ContextMenu.Item>➕ Insert Row Above</ContextMenu.Item>
                <ContextMenu.Item>➕ Insert Row Below</ContextMenu.Item>
                <ContextMenu.Separator />
                <ContextMenu.Item>✏️ Edit Cell</ContextMenu.Item>
                <ContextMenu.Item>🗑️ Delete Row</ContextMenu.Item>
              </ContextMenu.Content>
            </ContextMenu.Root>
            <td style={{ padding: "12px", border: "1px solid #e1e5e9" }}>
              <Text size="2">Developer</Text>
            </td>
            <td style={{ padding: "12px", border: "1px solid #e1e5e9" }}>
              <Text size="2" color="green">
                Active
              </Text>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
}

// Browser-like context menu
export const BrowserLikeMenu: Story = {
  render: (_args) => (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Box
          style={{
            padding: "20px",
            border: "1px solid #e1e5e9",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            cursor: "context-menu",
            minHeight: "100px",
          }}
        >
          <Text
            size="3"
            weight="medium"
            style={{ marginBottom: "8px", display: "block" }}
          >
            Web Page Content
          </Text>
          <Text
            size="2"
            color="blue"
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              marginBottom: "8px",
              display: "block",
            }}
          >
            https://example.com/link
          </Text>
          <Text size="2">
            This simulates a web page with various elements. Right-click to see
            browser-like context menu options.
          </Text>
        </Box>
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item>⬅️ Back</ContextMenu.Item>
        <ContextMenu.Item>➡️ Forward</ContextMenu.Item>
        <ContextMenu.Item shortcut="Ctrl+R">🔄 Reload</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item shortcut="Ctrl+S">💾 Save As...</ContextMenu.Item>
        <ContextMenu.Item>🖨️ Print...</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>🔍 View Source</ContextMenu.Item>
        <ContextMenu.Item shortcut="F12">🛠️ Inspect Element</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  ),
}

// Multiple trigger areas
export const MultipleTriggerAreas: Story = {
  render: (_args) => (
    <Flex gap="4">
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <Box
            style={{
              padding: "20px",
              border: "1px solid #3b82f6",
              borderRadius: "8px",
              backgroundColor: "#eff6ff",
              cursor: "context-menu",
              textAlign: "center",
            }}
          >
            <Text size="2" color="blue">
              📁 Folder
            </Text>
          </Box>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item>Open</ContextMenu.Item>
          <ContextMenu.Item>New File</ContextMenu.Item>
          <ContextMenu.Item>New Folder</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item>Rename</ContextMenu.Item>
          <ContextMenu.Item>Delete</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>

      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <Box
            style={{
              padding: "20px",
              border: "1px solid #10b981",
              borderRadius: "8px",
              backgroundColor: "#ecfdf5",
              cursor: "context-menu",
              textAlign: "center",
            }}
          >
            <Text size="2" color="green">
              📄 File
            </Text>
          </Box>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item>Open</ContextMenu.Item>
          <ContextMenu.Item>Edit</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item>Copy</ContextMenu.Item>
          <ContextMenu.Item>Move</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item>Rename</ContextMenu.Item>
          <ContextMenu.Item>Delete</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>

      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <Box
            style={{
              padding: "20px",
              border: "1px solid #f59e0b",
              borderRadius: "8px",
              backgroundColor: "#fffbeb",
              cursor: "context-menu",
              textAlign: "center",
            }}
          >
            <Text size="2" color="orange">
              🖼️ Image
            </Text>
          </Box>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item>View</ContextMenu.Item>
          <ContextMenu.Item>Edit</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item>Copy Image</ContextMenu.Item>
          <ContextMenu.Item>Save As...</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger>Export</ContextMenu.SubTrigger>
            <ContextMenu.SubContent>
              <ContextMenu.Item>PNG</ContextMenu.Item>
              <ContextMenu.Item>JPEG</ContextMenu.Item>
              <ContextMenu.Item>WebP</ContextMenu.Item>
            </ContextMenu.SubContent>
          </ContextMenu.Sub>
        </ContextMenu.Content>
      </ContextMenu.Root>
    </Flex>
  ),
}

// Developer context menu
export const DeveloperMenu: Story = {
  render: (_args) => (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Box
          style={{
            padding: "20px",
            border: "1px solid #6b7280",
            borderRadius: "8px",
            backgroundColor: "#1f2937",
            color: "#f9fafb",
            cursor: "context-menu",
            fontFamily: "monospace",
          }}
        >
          <Text size="2" style={{ color: "#10b981" }}>
            const
          </Text>{" "}
          <Text size="2" style={{ color: "#3b82f6" }}>
            component
          </Text>{" "}
          <Text size="2" style={{ color: "#f9fafb" }}>
            =
          </Text>{" "}
          <Text size="2" style={{ color: "#fbbf24" }}>
            'HelloWorld'
          </Text>
          <br />
          <Text
            size="1"
            color="gray"
            style={{ marginTop: "8px", display: "block" }}
          >
            Right-click on this code block
          </Text>
        </Box>
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item shortcut="Ctrl+C">📋 Copy</ContextMenu.Item>
        <ContextMenu.Item shortcut="Ctrl+X">✂️ Cut</ContextMenu.Item>
        <ContextMenu.Item shortcut="Ctrl+V">📄 Paste</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>🔍 Find References</ContextMenu.Item>
        <ContextMenu.Item>📝 Rename Symbol</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Sub>
          <ContextMenu.SubTrigger>🛠️ Refactor</ContextMenu.SubTrigger>
          <ContextMenu.SubContent>
            <ContextMenu.Item>Extract Method</ContextMenu.Item>
            <ContextMenu.Item>Extract Variable</ContextMenu.Item>
            <ContextMenu.Item>Inline Variable</ContextMenu.Item>
          </ContextMenu.SubContent>
        </ContextMenu.Sub>
        <ContextMenu.Separator />
        <ContextMenu.Item shortcut="F12">📍 Go to Definition</ContextMenu.Item>
        <ContextMenu.Item>👁️ Peek Definition</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  ),
}
