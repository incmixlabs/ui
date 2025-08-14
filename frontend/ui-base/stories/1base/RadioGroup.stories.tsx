import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Flex, RadioGroup, Text, Theme } from "../../src/1base" // Adjust the import path as necessary

const meta: Meta<typeof RadioGroup.Root> = {
  title:"1 Base/RadioGroup",
  component: RadioGroup.Root,
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
      description: "Radio group size",
    },
    variant: {
      control: "select",
      options: ["classic", "surface", "soft"],
      description: "Radio group variant style",
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
      description: "Radio group accent color",
    },
    highContrast: {
      control: "boolean",
      description: "High contrast mode",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Layout orientation",
    },
  },
  args: {
    size: "2",
    variant: "surface",
    orientation: "vertical",
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  render: (args) => (
    <RadioGroup.Root {...args} defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text
          as="label"
          size="2"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <RadioGroup.Item value="option1" />
          Option 1
        </Text>
        <Text
          as="label"
          size="2"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <RadioGroup.Item value="option2" />
          Option 2
        </Text>
        <Text
          as="label"
          size="2"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <RadioGroup.Item value="option3" />
          Option 3
        </Text>
      </Flex>
    </RadioGroup.Root>
  ),
}

// Horizontal orientation
export const Horizontal: Story = {
  render: (args) => (
    <RadioGroup.Root {...args} orientation="horizontal" defaultValue="option1">
      <Flex gap="4" align="center">
        <Text
          as="label"
          size="2"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <RadioGroup.Item value="option1" />
          Option 1
        </Text>
        <Text
          as="label"
          size="2"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <RadioGroup.Item value="option2" />
          Option 2
        </Text>
        <Text
          as="label"
          size="2"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <RadioGroup.Item value="option3" />
          Option 3
        </Text>
      </Flex>
    </RadioGroup.Root>
  ),
}

// Size variations
export const Size1: Story = {
  render: (args) => (
    <RadioGroup.Root {...args} size="1" defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text
          as="label"
          size="1"
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          <RadioGroup.Item value="option1" />
          Small Option 1
        </Text>
        <Text
          as="label"
          size="1"
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          <RadioGroup.Item value="option2" />
          Small Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
  ),
}

export const Size2: Story = {
  render: (args) => (
    <RadioGroup.Root {...args} size="2" defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text
          as="label"
          size="2"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <RadioGroup.Item value="option1" />
          Medium Option 1
        </Text>
        <Text
          as="label"
          size="2"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <RadioGroup.Item value="option2" />
          Medium Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
  ),
}

export const Size3: Story = {
  render: (args) => (
    <RadioGroup.Root {...args} size="3" defaultValue="option1">
      <Flex direction="column" gap="3">
        <Text
          as="label"
          size="3"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <RadioGroup.Item value="option1" />
          Large Option 1
        </Text>
        <Text
          as="label"
          size="3"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <RadioGroup.Item value="option2" />
          Large Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
  ),
}

// Variant stories
export const Classic: Story = {
  render: (args) => (
    <RadioGroup.Root {...args} variant="classic" defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text
          as="label"
          size="2"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <RadioGroup.Item value="option1" />
          Classic Option 1
        </Text>
        <Text
          as="label"
          size="2"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <RadioGroup.Item value="option2" />
          Classic Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
  ),
}

export const Surface: Story = {
  render: (args) => (
    <RadioGroup.Root {...args} variant="surface" defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text
          as="label"
          size="2"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <RadioGroup.Item value="option1" />
          Surface Option 1
        </Text>
        <Text
          as="label"
          size="2"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <RadioGroup.Item value="option2" />
          Surface Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
  ),
}

export const Soft: Story = {
  render: (args) => (
    <RadioGroup.Root {...args} variant="soft" defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text
          as="label"
          size="2"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <RadioGroup.Item value="option1" />
          Soft Option 1
        </Text>
        <Text
          as="label"
          size="2"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <RadioGroup.Item value="option2" />
          Soft Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
  ),
}

// Color variations
export const ColorBlue: Story = {
  render: (args) => (
    <RadioGroup.Root {...args} color="blue" defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text
          as="label"
          size="2"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <RadioGroup.Item value="option1" />
          Blue Option 1
        </Text>
        <Text
          as="label"
          size="2"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <RadioGroup.Item value="option2" />
          Blue Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
  ),
}

export const ColorGreen: Story = {
  render: (args) => (
    <RadioGroup.Root {...args} color="green" defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text
          as="label"
          size="2"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <RadioGroup.Item value="option1" />
          Green Option 1
        </Text>
        <Text
          as="label"
          size="2"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <RadioGroup.Item value="option2" />
          Green Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
  ),
}

// Disabled state
export const Disabled: Story = {
  render: (args) => (
    <RadioGroup.Root {...args} disabled defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text
          as="label"
          size="2"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            opacity: 0.6,
          }}
        >
          <RadioGroup.Item value="option1" />
          Disabled Option 1
        </Text>
        <Text
          as="label"
          size="2"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            opacity: 0.6,
          }}
        >
          <RadioGroup.Item value="option2" />
          Disabled Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
  ),
}

// High contrast
export const HighContrast: Story = {
  render: (args) => (
    <RadioGroup.Root {...args} highContrast defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text
          as="label"
          size="2"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <RadioGroup.Item value="option1" />
          High Contrast Option 1
        </Text>
        <Text
          as="label"
          size="2"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <RadioGroup.Item value="option2" />
          High Contrast Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
  ),
}

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <Flex direction="column" gap="4">
      <div>
        <Text size="2" weight="bold" style={{ marginBottom: "8px" }}>
          Classic
        </Text>
        <RadioGroup.Root variant="classic" defaultValue="classic1">
          <Flex direction="column" gap="1">
            <Text
              as="label"
              size="2"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <RadioGroup.Item value="classic1" />
              Classic Option
            </Text>
          </Flex>
        </RadioGroup.Root>
      </div>
      <div>
        <Text size="2" weight="bold" style={{ marginBottom: "8px" }}>
          Surface
        </Text>
        <RadioGroup.Root variant="surface" defaultValue="surface1">
          <Flex direction="column" gap="1">
            <Text
              as="label"
              size="2"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <RadioGroup.Item value="surface1" />
              Surface Option
            </Text>
          </Flex>
        </RadioGroup.Root>
      </div>
      <div>
        <Text size="2" weight="bold" style={{ marginBottom: "8px" }}>
          Soft
        </Text>
        <RadioGroup.Root variant="soft" defaultValue="soft1">
          <Flex direction="column" gap="1">
            <Text
              as="label"
              size="2"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <RadioGroup.Item value="soft1" />
              Soft Option
            </Text>
          </Flex>
        </RadioGroup.Root>
      </div>
    </Flex>
  ),
}

// Real-world form example
export const FormExample: Story = {
  render: () => (
    <div style={{ maxWidth: "400px" }}>
      <Text size="4" weight="bold" style={{ marginBottom: "16px" }}>
        Notification Preferences
      </Text>

      <div style={{ marginBottom: "24px" }}>
        <Text size="2" weight="medium" style={{ marginBottom: "8px" }}>
          Email Notifications
        </Text>
        <RadioGroup.Root defaultValue="daily" name="email">
          <Flex direction="column" gap="2">
            <Text
              as="label"
              size="2"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <RadioGroup.Item value="immediate" />
              Immediate - Get notified instantly
            </Text>
            <Text
              as="label"
              size="2"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <RadioGroup.Item value="daily" />
              Daily - Once per day digest
            </Text>
            <Text
              as="label"
              size="2"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <RadioGroup.Item value="weekly" />
              Weekly - Weekly summary
            </Text>
            <Text
              as="label"
              size="2"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <RadioGroup.Item value="never" />
              Never - No email notifications
            </Text>
          </Flex>
        </RadioGroup.Root>
      </div>

      <div>
        <Text size="2" weight="medium" style={{ marginBottom: "8px" }}>
          Theme Preference
        </Text>
        <RadioGroup.Root defaultValue="system" name="theme" color="purple">
          <Flex direction="column" gap="2">
            <Text
              as="label"
              size="2"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <RadioGroup.Item value="light" />
              Light mode
            </Text>
            <Text
              as="label"
              size="2"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <RadioGroup.Item value="dark" />
              Dark mode
            </Text>
            <Text
              as="label"
              size="2"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <RadioGroup.Item value="system" />
              System preference
            </Text>
          </Flex>
        </RadioGroup.Root>
      </div>
    </div>
  ),
}

// Payment method example
export const PaymentMethodExample: Story = {
  render: () => (
    <div style={{ maxWidth: "350px" }}>
      <Text size="3" weight="bold" style={{ marginBottom: "16px" }}>
        Payment Method
      </Text>
      <RadioGroup.Root defaultValue="card" variant="surface">
        <Flex direction="column" gap="2">
          <div
            style={{
              padding: "12px",
              border: "1px solid #e1e5e9",
              borderRadius: "8px",
              backgroundColor: "#fafbfc",
            }}
          >
            <Text
              as="label"
              size="2"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <RadioGroup.Item value="card" />
              <div>
                <div style={{ fontWeight: "bold" }}>Credit Card</div>
                <div
                  style={{ fontSize: "13px", color: "#666", marginTop: "2px" }}
                >
                  Visa, Mastercard, American Express
                </div>
              </div>
            </Text>
          </div>

          <div
            style={{
              padding: "12px",
              border: "1px solid #e1e5e9",
              borderRadius: "8px",
            }}
          >
            <Text
              as="label"
              size="2"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <RadioGroup.Item value="paypal" />
              <div>
                <div style={{ fontWeight: "bold" }}>PayPal</div>
                <div
                  style={{ fontSize: "13px", color: "#666", marginTop: "2px" }}
                >
                  Pay with your PayPal account
                </div>
              </div>
            </Text>
          </div>

          <div
            style={{
              padding: "12px",
              border: "1px solid #e1e5e9",
              borderRadius: "8px",
            }}
          >
            <Text
              as="label"
              size="2"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <RadioGroup.Item value="bank" />
              <div>
                <div style={{ fontWeight: "bold" }}>Bank Transfer</div>
                <div
                  style={{ fontSize: "13px", color: "#666", marginTop: "2px" }}
                >
                  Direct bank account transfer
                </div>
              </div>
            </Text>
          </div>
        </Flex>
      </RadioGroup.Root>
    </div>
  ),
}
