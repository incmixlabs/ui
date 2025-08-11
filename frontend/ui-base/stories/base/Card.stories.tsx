import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Avatar, Button, Card, Flex, Heading, Text, Theme } from "../../src/base"


const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
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
      options: ["1", "2", "3", "4", "5"],
      description: "Card size (affects padding)",
    },
    variant: {
      control: "select",
      options: ["surface", "classic", "ghost"],
      description: "Card variant style",
    },
    asChild: {
      control: "boolean",
      description: "Merge props with the child element",
    },
    children: {
      control: "text",
      description: "Card content",
    },
  },
  args: {
    size: "1",
    variant: "surface",
    children: "Card content goes here",
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    children: "This is a default card with some content inside.",
    style: { width: "300px" },
  },
}

// Size stories
export const Size1: Story = {
  args: {
    size: "1",
    children: "Size 1 card - minimal padding",
    style: { width: "250px" },
  },
}

export const Size2: Story = {
  args: {
    size: "2",
    children: "Size 2 card - small padding",
    style: { width: "250px" },
  },
}

export const Size3: Story = {
  args: {
    size: "3",
    children: "Size 3 card - medium padding",
    style: { width: "250px" },
  },
}

export const Size4: Story = {
  args: {
    size: "4",
    children: "Size 4 card - large padding",
    style: { width: "250px" },
  },
}

export const Size5: Story = {
  args: {
    size: "5",
    children: "Size 5 card - extra large padding",
    style: { width: "250px" },
  },
}

// Variant stories
export const VariantSurface: Story = {
  args: {
    variant: "surface",
    children: "Surface variant card",
    style: { width: "250px" },
  },
}

export const VariantClassic: Story = {
  args: {
    variant: "classic",
    children: "Classic variant card",
    style: { width: "250px" },
  },
}

export const VariantGhost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost variant card (minimal styling)",
    style: { width: "250px" },
  },
}

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <Flex gap="3" wrap="wrap">
      {["1", "2", "3", "4", "5"].map((size) => (
        <Card key={size} size={size as any} style={{ width: "120px" }}>
          <Text size="2" align="center">
            Size {size}
          </Text>
        </Card>
      ))}
    </Flex>
  ),
}

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <Flex gap="4" wrap="wrap">
      {["surface", "classic", "ghost"].map((variant) => (
        <Card key={variant} variant={variant as any} style={{ width: "150px" }}>
          <Text size="2" weight="medium" align="center">
            {variant.charAt(0).toUpperCase() + variant.slice(1)} variant
          </Text>
        </Card>
      ))}
    </Flex>
  ),
}

// Content examples
export const SimpleContent: Story = {
  render: () => (
    <Card size="3" style={{ width: "300px" }}>
      <Heading size="4" style={{ marginBottom: "8px" }}>
        Card Title
      </Heading>
      <Text size="2" color="gray">
        This is a simple card with a title and some descriptive text content.
      </Text>
    </Card>
  ),
}

export const WithActions: Story = {
  render: () => (
    <Card size="3" style={{ width: "300px" }}>
      <Flex direction="column" gap="3">
        <div>
          <Heading size="4" style={{ marginBottom: "8px" }}>
            Settings
          </Heading>
          <Text size="2" color="gray">
            Manage your account settings and preferences.
          </Text>
        </div>
        <Flex gap="2" justify="end">
          <Button variant="outline" size="1">
            Cancel
          </Button>
          <Button size="1">Save</Button>
        </Flex>
      </Flex>
    </Card>
  ),
}

export const UserProfile: Story = {
  render: () => (
    <Card size="4" style={{ width: "350px" }}>
      <Flex direction="column" gap="3">
        <Flex gap="3" align="center">
          <Avatar
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
            fallback="JD"
            size="5"
          />
          <Flex direction="column" gap="1">
            <Heading size="4">John Doe</Heading>
            <Text size="2" color="gray">
              Senior Developer
            </Text>
          </Flex>
        </Flex>
        <Text size="2">
          Passionate about creating great user experiences and building scalable
          applications.
        </Text>
        <Flex gap="2">
          <Button variant="outline" size="1" style={{ flex: 1 }}>
            Message
          </Button>
          <Button size="1" style={{ flex: 1 }}>
            Follow
          </Button>
        </Flex>
      </Flex>
    </Card>
  ),
}

export const ProductCard: Story = {
  render: () => (
    <Card size="3" style={{ width: "280px" }}>
      <Flex direction="column" gap="3">
        <div
          style={{
            height: "120px",
            backgroundColor: "var(--gray-3)",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text size="2" color="gray">
            Product Image
          </Text>
        </div>
        <div>
          <Heading size="3" style={{ marginBottom: "4px" }}>
            Wireless Headphones
          </Heading>
          <Text size="2" color="gray" style={{ marginBottom: "8px" }}>
            High-quality sound with noise cancellation
          </Text>
          <Flex justify="between" align="center">
            <Text size="4" weight="bold" color="blue">
              $199
            </Text>
            <Button size="1">Add to Cart</Button>
          </Flex>
        </div>
      </Flex>
    </Card>
  ),
}

export const StatsCard: Story = {
  render: () => (
    <Flex gap="3" wrap="wrap">
      {[
        {
          title: "Total Users",
          value: "12,345",
          change: "+12%",
          color: "green",
        },
        { title: "Revenue", value: "$45,678", change: "+8%", color: "blue" },
        { title: "Orders", value: "1,234", change: "-3%", color: "red" },
      ].map((stat, index) => (
        <Card key={index} size="3" style={{ minWidth: "160px" }}>
          <Flex direction="column" gap="2">
            <Text size="2" color="gray">
              {stat.title}
            </Text>
            <Heading size="5">{stat.value}</Heading>
            <Text size="1" color={stat.color as any}>
              {stat.change} from last month
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  ),
}

export const NotificationCard: Story = {
  render: () => (
    <Card size="3" style={{ width: "320px" }}>
      <Flex gap="3" align="start">
        <div
          style={{
            width: "8px",
            height: "8px",
            backgroundColor: "var(--blue-9)",
            borderRadius: "50%",
            marginTop: "6px",
            flexShrink: 0,
          }}
        />
        <Flex direction="column" gap="2" style={{ flex: 1 }}>
          <Flex justify="between" align="start">
            <Text size="2" weight="medium">
              New message received
            </Text>
            <Text size="1" color="gray">
              2m ago
            </Text>
          </Flex>
          <Text size="2" color="gray">
            You have a new message from Sarah. Click to view the conversation.
          </Text>
          <Flex gap="2" justify="end">
            <Button variant="ghost" size="1">
              Dismiss
            </Button>
            <Button variant="outline" size="1">
              View
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  ),
}

// Real-world dashboard layout
export const DashboardLayout: Story = {
  render: () => (
    <Flex direction="column" gap="4" style={{ width: "600px" }}>
      <Heading size="6">Dashboard</Heading>

      {/* Stats Row */}
      <Flex gap="3" wrap="wrap">
        {[
          { title: "Active Users", value: "2,543", icon: "👥" },
          { title: "Total Sales", value: "$12,345", icon: "💰" },
          { title: "Conversion Rate", value: "3.2%", icon: "📈" },
          { title: "Support Tickets", value: "23", icon: "🎫" },
        ].map((stat, index) => (
          <Card key={index} size="2" style={{ flex: 1, minWidth: "140px" }}>
            <Flex gap="2" align="center">
              <Text size="4">{stat.icon}</Text>
              <Flex direction="column" gap="1">
                <Text size="1" color="gray">
                  {stat.title}
                </Text>
                <Text size="3" weight="bold">
                  {stat.value}
                </Text>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Flex>

      {/* Main Content Row */}
      <Flex gap="4" align="start">
        <Card size="3" style={{ flex: 2 }}>
          <Flex direction="column" gap="3">
            <Heading size="4">Recent Activity</Heading>
            <Flex direction="column" gap="2">
              {[
                "User John signed up",
                "Order #1234 completed",
                "Payment received from client",
                "New support ticket created",
              ].map((activity, index) => (
                <Flex key={index} gap="2" align="center">
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      backgroundColor: "var(--green-9)",
                      borderRadius: "50%",
                    }}
                  />
                  <Text size="2">{activity}</Text>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Card>

        <Card size="3" style={{ flex: 1 }}>
          <Flex direction="column" gap="3">
            <Heading size="4">Quick Actions</Heading>
            <Flex direction="column" gap="2">
              <Button size="2" variant="outline">
                Add User
              </Button>
              <Button size="2" variant="outline">
                Create Order
              </Button>
              <Button size="2" variant="outline">
                View Reports
              </Button>
              <Button size="2">Settings</Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  ),
}
