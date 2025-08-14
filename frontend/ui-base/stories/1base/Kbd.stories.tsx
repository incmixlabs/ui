import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Flex, Kbd, Text, Theme } from "../../src/base" // Adjust the import path as necessary

const meta: Meta<typeof Kbd> = {
  title:"1 Base/Kbd",
  component: Kbd,
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
      options: ["1", "2", "3", "4"],
      description: "Keyboard key size",
    },
  },
  args: {
    size: "2",
    children: "Ctrl",
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  render: (args) => <Kbd {...args}>Enter</Kbd>,
}

// Size stories
export const Size1: Story = {
  render: (_args) => <Kbd size="1">Esc</Kbd>,
}

export const Size2: Story = {
  render: (_args) => <Kbd size="2">Esc</Kbd>,
}

export const Size3: Story = {
  render: (_args) => <Kbd size="3">Esc</Kbd>,
}

export const Size4: Story = {
  render: (_args) => <Kbd size="4">Esc</Kbd>,
}

// Common keys
export const CommonKeys: Story = {
  render: () => (
    <Flex gap="2" wrap="wrap">
      <Kbd>Ctrl</Kbd>
      <Kbd>Alt</Kbd>
      <Kbd>Shift</Kbd>
      <Kbd>Cmd</Kbd>
      <Kbd>Tab</Kbd>
      <Kbd>Enter</Kbd>
      <Kbd>Esc</Kbd>
      <Kbd>Space</Kbd>
    </Flex>
  ),
}

// Arrow keys
export const ArrowKeys: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "4px",
        width: "120px",
      }}
    >
      <div />
      <Kbd>↑</Kbd>
      <div />
      <Kbd>←</Kbd>
      <Kbd>↓</Kbd>
      <Kbd>→</Kbd>
    </div>
  ),
}

// Function keys
export const FunctionKeys: Story = {
  render: () => (
    <Flex gap="1" wrap="wrap">
      <Kbd size="1">F1</Kbd>
      <Kbd size="1">F2</Kbd>
      <Kbd size="1">F3</Kbd>
      <Kbd size="1">F4</Kbd>
      <Kbd size="1">F5</Kbd>
      <Kbd size="1">F6</Kbd>
      <Kbd size="1">F7</Kbd>
      <Kbd size="1">F8</Kbd>
      <Kbd size="1">F9</Kbd>
      <Kbd size="1">F10</Kbd>
      <Kbd size="1">F11</Kbd>
      <Kbd size="1">F12</Kbd>
    </Flex>
  ),
}

// Number keys
export const NumberKeys: Story = {
  render: () => (
    <Flex gap="1">
      <Kbd>1</Kbd>
      <Kbd>2</Kbd>
      <Kbd>3</Kbd>
      <Kbd>4</Kbd>
      <Kbd>5</Kbd>
      <Kbd>6</Kbd>
      <Kbd>7</Kbd>
      <Kbd>8</Kbd>
      <Kbd>9</Kbd>
      <Kbd>0</Kbd>
    </Flex>
  ),
}

// Letter keys
export const LetterKeys: Story = {
  render: () => (
    <Flex gap="1" wrap="wrap" style={{ maxWidth: "300px" }}>
      {"QWERTYUIOPASDFGHJKLZXCVBNM".split("").map((letter) => (
        <Kbd key={letter} size="1">
          {letter}
        </Kbd>
      ))}
    </Flex>
  ),
}

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <Flex gap="3" align="end">
      <Kbd size="1">A</Kbd>
      <Kbd size="2">A</Kbd>
      <Kbd size="3">A</Kbd>
      <Kbd size="4">A</Kbd>
    </Flex>
  ),
}

// Keyboard shortcuts in text
export const InlineShortcuts: Story = {
  render: () => (
    <div style={{ maxWidth: "500px" }}>
      <Text size="3" style={{ lineHeight: "1.6" }}>
        Use <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd> to copy, <Kbd>Ctrl</Kbd> +{" "}
        <Kbd>V</Kbd> to paste, and <Kbd>Ctrl</Kbd> + <Kbd>Z</Kbd> to undo. Press{" "}
        <Kbd>F5</Kbd> to refresh the page or <Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd>{" "}
        + <Kbd>R</Kbd> for a hard refresh.
      </Text>
    </div>
  ),
}

// Application shortcuts example
export const ApplicationShortcutsExample: Story = {
  render: () => (
    <div style={{ maxWidth: "400px" }}>
      <Text
        size="3"
        weight="bold"
        style={{ marginBottom: "16px", display: "block" }}
      >
        Keyboard Shortcuts
      </Text>

      <Flex direction="column" gap="3">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text size="2">Save document</Text>
          <Flex gap="1" align="center">
            <Kbd size="1">Ctrl</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">S</Kbd>
          </Flex>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text size="2">Open file</Text>
          <Flex gap="1" align="center">
            <Kbd size="1">Ctrl</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">O</Kbd>
          </Flex>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text size="2">New document</Text>
          <Flex gap="1" align="center">
            <Kbd size="1">Ctrl</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">N</Kbd>
          </Flex>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text size="2">Find in document</Text>
          <Flex gap="1" align="center">
            <Kbd size="1">Ctrl</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">F</Kbd>
          </Flex>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text size="2">Replace text</Text>
          <Flex gap="1" align="center">
            <Kbd size="1">Ctrl</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">H</Kbd>
          </Flex>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text size="2">Print document</Text>
          <Flex gap="1" align="center">
            <Kbd size="1">Ctrl</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">P</Kbd>
          </Flex>
        </div>
      </Flex>
    </div>
  ),
}

// Code editor shortcuts example
export const CodeEditorShortcutsExample: Story = {
  render: () => (
    <div style={{ maxWidth: "450px" }}>
      <Text
        size="3"
        weight="bold"
        style={{ marginBottom: "16px", display: "block" }}
      >
        VS Code Shortcuts
      </Text>

      <Flex direction="column" gap="3">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text size="2">Command palette</Text>
          <Flex gap="1" align="center">
            <Kbd size="1">Ctrl</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">Shift</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">P</Kbd>
          </Flex>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text size="2">Quick file open</Text>
          <Flex gap="1" align="center">
            <Kbd size="1">Ctrl</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">P</Kbd>
          </Flex>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text size="2">Toggle sidebar</Text>
          <Flex gap="1" align="center">
            <Kbd size="1">Ctrl</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">B</Kbd>
          </Flex>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text size="2">Integrated terminal</Text>
          <Flex gap="1" align="center">
            <Kbd size="1">Ctrl</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">`</Kbd>
          </Flex>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text size="2">Format document</Text>
          <Flex gap="1" align="center">
            <Kbd size="1">Shift</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">Alt</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">F</Kbd>
          </Flex>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text size="2">Multi-cursor</Text>
          <Flex gap="1" align="center">
            <Kbd size="1">Ctrl</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">Alt</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">↓</Kbd>
          </Flex>
        </div>
      </Flex>
    </div>
  ),
}

// Gaming shortcuts example
export const GamingShortcutsExample: Story = {
  render: () => (
    <div style={{ maxWidth: "350px" }}>
      <Text
        size="3"
        weight="bold"
        style={{ marginBottom: "16px", display: "block" }}
      >
        Gaming Controls
      </Text>

      <Flex direction="column" gap="3">
        <div>
          <Text
            size="2"
            weight="medium"
            style={{ marginBottom: "8px", display: "block" }}
          >
            Movement
          </Text>
          <Flex gap="2">
            <Kbd>W</Kbd>
            <Kbd>A</Kbd>
            <Kbd>S</Kbd>
            <Kbd>D</Kbd>
          </Flex>
        </div>

        <div>
          <Text
            size="2"
            weight="medium"
            style={{ marginBottom: "8px", display: "block" }}
          >
            Actions
          </Text>
          <Flex gap="2" wrap="wrap">
            <Kbd>Space</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>Ctrl</Kbd>
            <Kbd>E</Kbd>
            <Kbd>R</Kbd>
            <Kbd>F</Kbd>
          </Flex>
        </div>

        <div>
          <Text
            size="2"
            weight="medium"
            style={{ marginBottom: "8px", display: "block" }}
          >
            Numbers
          </Text>
          <Flex gap="1">
            <Kbd size="1">1</Kbd>
            <Kbd size="1">2</Kbd>
            <Kbd size="1">3</Kbd>
            <Kbd size="1">4</Kbd>
            <Kbd size="1">5</Kbd>
          </Flex>
        </div>

        <div>
          <Text
            size="2"
            weight="medium"
            style={{ marginBottom: "8px", display: "block" }}
          >
            System
          </Text>
          <Flex gap="2" wrap="wrap">
            <Kbd size="1">Tab</Kbd>
            <Kbd size="1">Esc</Kbd>
            <Kbd size="1">Enter</Kbd>
            <Kbd size="1">M</Kbd>
          </Flex>
        </div>
      </Flex>
    </div>
  ),
}

// Mac vs PC shortcuts example
export const MacVsPCExample: Story = {
  render: () => (
    <div style={{ maxWidth: "500px" }}>
      <Text
        size="3"
        weight="bold"
        style={{ marginBottom: "16px", display: "block" }}
      >
        Platform Shortcuts
      </Text>

      <Flex direction="column" gap="4">
        <div>
          <Text
            size="2"
            weight="medium"
            style={{ marginBottom: "12px", display: "block" }}
          >
            Copy & Paste
          </Text>
          <Flex
            justify="between"
            align="center"
            style={{ marginBottom: "8px" }}
          >
            <Text size="2" color="gray">
              Windows/Linux:
            </Text>
            <Flex gap="1">
              <Kbd size="1">Ctrl</Kbd>
              <Text size="1">+</Text>
              <Kbd size="1">C</Kbd>
              <Text size="1" style={{ margin: "0 8px" }}>
                /
              </Text>
              <Kbd size="1">Ctrl</Kbd>
              <Text size="1">+</Text>
              <Kbd size="1">V</Kbd>
            </Flex>
          </Flex>
          <Flex justify="between" align="center">
            <Text size="2" color="gray">
              macOS:
            </Text>
            <Flex gap="1">
              <Kbd size="1">⌘</Kbd>
              <Text size="1">+</Text>
              <Kbd size="1">C</Kbd>
              <Text size="1" style={{ margin: "0 8px" }}>
                /
              </Text>
              <Kbd size="1">⌘</Kbd>
              <Text size="1">+</Text>
              <Kbd size="1">V</Kbd>
            </Flex>
          </Flex>
        </div>

        <div>
          <Text
            size="2"
            weight="medium"
            style={{ marginBottom: "12px", display: "block" }}
          >
            Select All
          </Text>
          <Flex
            justify="between"
            align="center"
            style={{ marginBottom: "8px" }}
          >
            <Text size="2" color="gray">
              Windows/Linux:
            </Text>
            <Flex gap="1">
              <Kbd size="1">Ctrl</Kbd>
              <Text size="1">+</Text>
              <Kbd size="1">A</Kbd>
            </Flex>
          </Flex>
          <Flex justify="between" align="center">
            <Text size="2" color="gray">
              macOS:
            </Text>
            <Flex gap="1">
              <Kbd size="1">⌘</Kbd>
              <Text size="1">+</Text>
              <Kbd size="1">A</Kbd>
            </Flex>
          </Flex>
        </div>
      </Flex>
    </div>
  ),
}

// Special characters example
export const SpecialCharactersExample: Story = {
  render: () => (
    <div style={{ maxWidth: "400px" }}>
      <Text
        size="3"
        weight="bold"
        style={{ marginBottom: "16px", display: "block" }}
      >
        Special Keys
      </Text>

      <Flex direction="column" gap="3">
        <div>
          <Text
            size="2"
            weight="medium"
            style={{ marginBottom: "8px", display: "block" }}
          >
            Modifier Keys
          </Text>
          <Flex gap="2" wrap="wrap">
            <Kbd>⌘</Kbd>
            <Kbd>⌃</Kbd>
            <Kbd>⌥</Kbd>
            <Kbd>⇧</Kbd>
            <Kbd>⇪</Kbd>
            <Kbd>⌫</Kbd>
            <Kbd>⌦</Kbd>
          </Flex>
        </div>

        <div>
          <Text
            size="2"
            weight="medium"
            style={{ marginBottom: "8px", display: "block" }}
          >
            Navigation Keys
          </Text>
          <Flex gap="2" wrap="wrap">
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd>
            <Kbd>←</Kbd>
            <Kbd>→</Kbd>
            <Kbd>⇞</Kbd>
            <Kbd>⇟</Kbd>
            <Kbd>↖</Kbd>
            <Kbd>↘</Kbd>
          </Flex>
        </div>

        <div>
          <Text
            size="2"
            weight="medium"
            style={{ marginBottom: "8px", display: "block" }}
          >
            Action Keys
          </Text>
          <Flex gap="2" wrap="wrap">
            <Kbd>⏎</Kbd>
            <Kbd>⇥</Kbd>
            <Kbd>⎋</Kbd>
            <Kbd>⌧</Kbd>
            <Kbd>⏏</Kbd>
          </Flex>
        </div>
      </Flex>
    </div>
  ),
}
