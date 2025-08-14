import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Box, Button, Flex, Text, Theme } from "../../src/1base" // Adjust the import path as necessary

const meta: Meta<typeof Flex> = {
  title:"1 Base/Flex",
  component: Flex,
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
    as: {
      control: "select",
      options: ["div", "span"],
      description: "HTML element to render",
    },
    display: {
      control: "select",
      options: ["none", "inline-flex", "flex"],
      description: "CSS display property",
    },
    direction: {
      control: "select",
      options: ["row", "column", "row-reverse", "column-reverse"],
      description: "Flex direction",
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "baseline", "stretch"],
      description: "Align items (cross-axis)",
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between"],
      description: "Justify content (main-axis)",
    },
    wrap: {
      control: "select",
      options: ["nowrap", "wrap", "wrap-reverse"],
      description: "Flex wrap behavior",
    },
    gap: {
      control: "select",
      options: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      description: "Gap between items",
    },
    asChild: {
      control: "boolean",
      description: "Merge props with the child element",
    },
  },
  args: {
    as: "div",
    display: "flex",
    gap: "2",
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Helper component for flex items
const FlexItem = ({ children, ...props }: any) => (
  <Box
    style={{
      padding: "12px",
      backgroundColor: "var(--blue-3)",
      borderRadius: "6px",
      minWidth: "60px",
      textAlign: "center",
      ...props.style,
    }}
    {...props}
  >
    <Text size="2">{children}</Text>
  </Box>
)

// Default story
export const Default: Story = {
  render: (args) => (
    <Flex {...args}>
      <FlexItem>Item 1</FlexItem>
      <FlexItem>Item 2</FlexItem>
      <FlexItem>Item 3</FlexItem>
    </Flex>
  ),
}

// Direction stories
export const DirectionRow: Story = {
  render: () => (
    <Flex direction="row" gap="3">
      <FlexItem>First</FlexItem>
      <FlexItem>Second</FlexItem>
      <FlexItem>Third</FlexItem>
    </Flex>
  ),
}

export const DirectionColumn: Story = {
  render: () => (
    <Flex direction="column" gap="3">
      <FlexItem>First</FlexItem>
      <FlexItem>Second</FlexItem>
      <FlexItem>Third</FlexItem>
    </Flex>
  ),
}

export const DirectionRowReverse: Story = {
  render: () => (
    <Flex direction="row-reverse" gap="3">
      <FlexItem>First</FlexItem>
      <FlexItem>Second</FlexItem>
      <FlexItem>Third</FlexItem>
    </Flex>
  ),
}

export const DirectionColumnReverse: Story = {
  render: () => (
    <Flex direction="column-reverse" gap="3">
      <FlexItem>First</FlexItem>
      <FlexItem>Second</FlexItem>
      <FlexItem>Third</FlexItem>
    </Flex>
  ),
}

// Alignment stories
export const AlignStart: Story = {
  render: () => (
    <Flex
      align="start"
      gap="2"
      style={{
        height: "100px",
        backgroundColor: "var(--gray-2)",
        padding: "8px",
        borderRadius: "8px",
      }}
    >
      <FlexItem style={{ height: "40px" }}>Small</FlexItem>
      <FlexItem style={{ height: "60px" }}>Medium</FlexItem>
      <FlexItem style={{ height: "30px" }}>Tiny</FlexItem>
    </Flex>
  ),
}

export const AlignCenter: Story = {
  render: () => (
    <Flex
      align="center"
      gap="2"
      style={{
        height: "100px",
        backgroundColor: "var(--gray-2)",
        padding: "8px",
        borderRadius: "8px",
      }}
    >
      <FlexItem style={{ height: "40px" }}>Small</FlexItem>
      <FlexItem style={{ height: "60px" }}>Medium</FlexItem>
      <FlexItem style={{ height: "30px" }}>Tiny</FlexItem>
    </Flex>
  ),
}

export const AlignEnd: Story = {
  render: () => (
    <Flex
      align="end"
      gap="2"
      style={{
        height: "100px",
        backgroundColor: "var(--gray-2)",
        padding: "8px",
        borderRadius: "8px",
      }}
    >
      <FlexItem style={{ height: "40px" }}>Small</FlexItem>
      <FlexItem style={{ height: "60px" }}>Medium</FlexItem>
      <FlexItem style={{ height: "30px" }}>Tiny</FlexItem>
    </Flex>
  ),
}

export const AlignStretch: Story = {
  render: () => (
    <Flex
      align="stretch"
      gap="2"
      style={{
        height: "100px",
        backgroundColor: "var(--gray-2)",
        padding: "8px",
        borderRadius: "8px",
      }}
    >
      <FlexItem>Stretched</FlexItem>
      <FlexItem>Items</FlexItem>
      <FlexItem>All Same Height</FlexItem>
    </Flex>
  ),
}

export const AlignBaseline: Story = {
  render: () => (
    <Flex
      align="baseline"
      gap="2"
      style={{
        height: "100px",
        backgroundColor: "var(--gray-2)",
        padding: "8px",
        borderRadius: "8px",
      }}
    >
      <FlexItem style={{ fontSize: "12px", padding: "8px" }}>
        Small text
      </FlexItem>
      <FlexItem style={{ fontSize: "20px", padding: "16px" }}>
        Large text
      </FlexItem>
      <FlexItem style={{ fontSize: "14px", padding: "10px" }}>
        Medium text
      </FlexItem>
    </Flex>
  ),
}

// Justify content stories
export const JustifyStart: Story = {
  render: () => (
    <Flex
      justify="start"
      gap="2"
      style={{
        width: "300px",
        backgroundColor: "var(--gray-2)",
        padding: "8px",
        borderRadius: "8px",
      }}
    >
      <FlexItem>One</FlexItem>
      <FlexItem>Two</FlexItem>
    </Flex>
  ),
}

export const JustifyCenter: Story = {
  render: () => (
    <Flex
      justify="center"
      gap="2"
      style={{
        width: "300px",
        backgroundColor: "var(--gray-2)",
        padding: "8px",
        borderRadius: "8px",
      }}
    >
      <FlexItem>One</FlexItem>
      <FlexItem>Two</FlexItem>
    </Flex>
  ),
}

export const JustifyEnd: Story = {
  render: () => (
    <Flex
      justify="end"
      gap="2"
      style={{
        width: "300px",
        backgroundColor: "var(--gray-2)",
        padding: "8px",
        borderRadius: "8px",
      }}
    >
      <FlexItem>One</FlexItem>
      <FlexItem>Two</FlexItem>
    </Flex>
  ),
}

export const JustifyBetween: Story = {
  render: () => (
    <Flex
      justify="between"
      gap="2"
      style={{
        width: "300px",
        backgroundColor: "var(--gray-2)",
        padding: "8px",
        borderRadius: "8px",
      }}
    >
      <FlexItem>One</FlexItem>
      <FlexItem>Two</FlexItem>
      <FlexItem>Three</FlexItem>
    </Flex>
  ),
}

// Wrap stories
export const WrapNowrap: Story = {
  render: () => (
    <Flex
      wrap="nowrap"
      gap="2"
      style={{
        width: "200px",
        backgroundColor: "var(--gray-2)",
        padding: "8px",
        borderRadius: "8px",
      }}
    >
      <FlexItem style={{ minWidth: "80px" }}>Item 1</FlexItem>
      <FlexItem style={{ minWidth: "80px" }}>Item 2</FlexItem>
      <FlexItem style={{ minWidth: "80px" }}>Item 3</FlexItem>
      <FlexItem style={{ minWidth: "80px" }}>Item 4</FlexItem>
    </Flex>
  ),
}

export const WrapWrap: Story = {
  render: () => (
    <Flex
      wrap="wrap"
      gap="2"
      style={{
        width: "200px",
        backgroundColor: "var(--gray-2)",
        padding: "8px",
        borderRadius: "8px",
      }}
    >
      <FlexItem style={{ minWidth: "80px" }}>Item 1</FlexItem>
      <FlexItem style={{ minWidth: "80px" }}>Item 2</FlexItem>
      <FlexItem style={{ minWidth: "80px" }}>Item 3</FlexItem>
      <FlexItem style={{ minWidth: "80px" }}>Item 4</FlexItem>
    </Flex>
  ),
}

export const WrapReverse: Story = {
  render: () => (
    <Flex
      wrap="wrap-reverse"
      gap="2"
      style={{
        width: "200px",
        backgroundColor: "var(--gray-2)",
        padding: "8px",
        borderRadius: "8px",
      }}
    >
      <FlexItem style={{ minWidth: "80px" }}>Item 1</FlexItem>
      <FlexItem style={{ minWidth: "80px" }}>Item 2</FlexItem>
      <FlexItem style={{ minWidth: "80px" }}>Item 3</FlexItem>
      <FlexItem style={{ minWidth: "80px" }}>Item 4</FlexItem>
    </Flex>
  ),
}

// Gap stories
export const GapSizes: Story = {
  render: () => (
    <Flex direction="column" gap="4">
      <div>
        <Text size="2" weight="medium" color="gray">
          Gap 1:
        </Text>
        <Flex gap="1" style={{ marginTop: "4px" }}>
          <FlexItem>A</FlexItem>
          <FlexItem>B</FlexItem>
          <FlexItem>C</FlexItem>
        </Flex>
      </div>

      <div>
        <Text size="2" weight="medium" color="gray">
          Gap 3:
        </Text>
        <Flex gap="3" style={{ marginTop: "4px" }}>
          <FlexItem>A</FlexItem>
          <FlexItem>B</FlexItem>
          <FlexItem>C</FlexItem>
        </Flex>
      </div>

      <div>
        <Text size="2" weight="medium" color="gray">
          Gap 6:
        </Text>
        <Flex gap="6" style={{ marginTop: "4px" }}>
          <FlexItem>A</FlexItem>
          <FlexItem>B</FlexItem>
          <FlexItem>C</FlexItem>
        </Flex>
      </div>
    </Flex>
  ),
}

// Complex layout examples
export const LayoutExamples: Story = {
  render: () => (
    <Flex direction="column" gap="6" style={{ width: "400px" }}>
      <div>
        <Text size="3" weight="bold">
          Header Layout
        </Text>
        <Flex
          justify="between"
          align="center"
          gap="3"
          style={{
            padding: "12px",
            backgroundColor: "var(--blue-2)",
            borderRadius: "8px",
            marginTop: "8px",
          }}
        >
          <Text size="4" weight="medium">
            Logo
          </Text>
          <Flex gap="2">
            <Button size="1" variant="ghost">
              Home
            </Button>
            <Button size="1" variant="ghost">
              About
            </Button>
            <Button size="1" variant="ghost">
              Contact
            </Button>
          </Flex>
          <Button size="1">Sign In</Button>
        </Flex>
      </div>

      <div>
        <Text size="3" weight="bold">
          Card Layout
        </Text>
        <Flex
          direction="column"
          gap="3"
          style={{
            padding: "16px",
            backgroundColor: "var(--gray-2)",
            borderRadius: "8px",
            marginTop: "8px",
          }}
        >
          <Text size="4" weight="medium">
            Card Title
          </Text>
          <Text size="2">Card description content goes here.</Text>
          <Flex justify="end" gap="2">
            <Button size="1" variant="outline">
              Cancel
            </Button>
            <Button size="1">Save</Button>
          </Flex>
        </Flex>
      </div>

      <div>
        <Text size="3" weight="bold">
          Form Row
        </Text>
        <Flex
          align="center"
          gap="3"
          style={{
            padding: "12px",
            backgroundColor: "var(--green-2)",
            borderRadius: "8px",
            marginTop: "8px",
          }}
        >
          <Box style={{ minWidth: "80px" }}>
            <Text size="2" weight="medium">
              Label:
            </Text>
          </Box>
          <Box
            style={{
              flex: 1,
              padding: "8px",
              backgroundColor: "white",
              borderRadius: "4px",
            }}
          >
            <Text size="2" color="gray">
              Input field
            </Text>
          </Box>
          <Button size="1">Submit</Button>
        </Flex>
      </div>
    </Flex>
  ),
}

// Real-world usage
export const RealWorldUsage: Story = {
  render: () => (
    <Flex direction="column" gap="4" style={{ maxWidth: "500px" }}>
      <Text size="5" weight="bold">
        Dashboard Layout
      </Text>

      {/* Navigation */}
      <Flex
        justify="between"
        align="center"
        style={{
          padding: "12px 16px",
          backgroundColor: "var(--blue-9)",
          borderRadius: "8px",
        }}
      >
        <Text size="3" weight="medium" style={{ color: "white" }}>
          Dashboard
        </Text>
        <Flex gap="2">
          <Button size="1" variant="ghost" style={{ color: "white" }}>
            Profile
          </Button>
          <Button size="1" variant="ghost" style={{ color: "white" }}>
            Settings
          </Button>
        </Flex>
      </Flex>

      {/* Stats Cards */}
      <Flex gap="3" wrap="wrap">
        {["Users", "Orders", "Revenue"].map((stat, index) => (
          <Flex
            key={stat}
            direction="column"
            gap="1"
            style={{
              padding: "16px",
              backgroundColor: "var(--gray-2)",
              borderRadius: "8px",
              flex: "1",
              minWidth: "120px",
            }}
          >
            <Text size="1" weight="medium" color="gray">
              {stat}
            </Text>
            <Text size="4" weight="bold">
              {1000 + index * 500}
            </Text>
          </Flex>
        ))}
      </Flex>

      {/* Content Area */}
      <Flex gap="4" wrap="wrap" align="start">
        <Flex
          direction="column"
          gap="2"
          style={{ flex: "2", minWidth: "200px" }}
        >
          <Text size="3" weight="medium">
            Recent Activity
          </Text>
          <Flex direction="column" gap="2">
            {["New user registered", "Order completed", "Payment received"].map(
              (activity, index) => (
                <Flex
                  key={index}
                  align="center"
                  gap="2"
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "var(--gray-2)",
                    borderRadius: "6px",
                  }}
                >
                  <Box
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor:
                        index === 0 ? "var(--green-9)" : "var(--blue-9)",
                      borderRadius: "50%",
                    }}
                  />
                  <Text size="2">{activity}</Text>
                </Flex>
              )
            )}
          </Flex>
        </Flex>

        <Flex
          direction="column"
          gap="2"
          style={{ flex: "1", minWidth: "150px" }}
        >
          <Text size="3" weight="medium">
            Quick Actions
          </Text>
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
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  ),
}
