import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Box, Button, Flex, Spinner, Text, Theme } from "../../src/1base" // Adjust the import path as necessary

const meta: Meta<typeof Spinner> = {
  title:"1 Base/Spinner",
  component: Spinner,
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
      description: "Spinner size",
    },
    loading: {
      control: "boolean",
      description: "Whether the spinner is loading/visible",
    },
  },
  args: {
    size: "2",
    loading: true,
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {},
}

// Size stories
export const Size1: Story = {
  args: {
    size: "1",
  },
}

export const Size2: Story = {
  args: {
    size: "2",
  },
}

export const Size3: Story = {
  args: {
    size: "3",
  },
}

// Loading state control
export const LoadingTrue: Story = {
  args: {
    loading: true,
  },
}

export const LoadingFalse: Story = {
  args: {
    loading: false,
  },
}

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <Flex align="center" gap="4">
      {["1", "2", "3"].map((size) => (
        <Flex key={size} direction="column" align="center" gap="2">
          <Spinner size={size as any} />
          <Text size="1" color="gray">
            Size {size}
          </Text>
        </Flex>
      ))}
    </Flex>
  ),
}

// Usage in buttons
export const InButtons: Story = {
  render: () => (
    <Flex gap="3" align="center">
      <Button loading size="1">
        Small Button
      </Button>
      <Button loading size="2">
        Medium Button
      </Button>
      <Button loading size="3">
        Large Button
      </Button>
      <Button loading size="4">
        Extra Large Button
      </Button>
    </Flex>
  ),
}

// Different contexts
export const InDifferentContexts: Story = {
  render: () => (
    <Flex direction="column" gap="6" style={{ width: "400px" }}>
      <div>
        <Text size="3" weight="medium" style={{ marginBottom: "12px" }}>
          Loading States
        </Text>

        <Flex direction="column" gap="4">
          {/* Inline loading */}
          <Flex gap="2" align="center">
            <Spinner size="1" />
            <Text size="2">Loading content...</Text>
          </Flex>

          {/* Card loading */}
          <Box
            style={{
              padding: "16px",
              backgroundColor: "var(--gray-2)",
              borderRadius: "8px",
            }}
          >
            <Flex direction="column" gap="3" align="center">
              <Spinner size="2" />
              <Text size="2" color="gray">
                Loading dashboard data
              </Text>
            </Flex>
          </Box>

          {/* Button states */}
          <Flex gap="2">
            <Button loading variant="solid">
              Saving...
            </Button>
            <Button loading variant="outline">
              Processing...
            </Button>
            <Button loading variant="ghost">
              Loading...
            </Button>
          </Flex>
        </Flex>
      </div>
    </Flex>
  ),
}

// Conditional loading example
export const ConditionalLoading: Story = {
  render: () => {
    const [isLoading, setIsLoading] = React.useState(false)

    const handleLoad = () => {
      setIsLoading(true)
      setTimeout(() => setIsLoading(false), 3000)
    }

    return (
      <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Interactive Loading Demo
        </Text>

        <Box
          style={{
            padding: "32px",
            backgroundColor: "var(--gray-2)",
            borderRadius: "8px",
            minHeight: "120px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "200px",
          }}
        >
          {isLoading ? (
            <Flex direction="column" gap="2" align="center">
              <Spinner size="2" />
              <Text size="2" color="gray">
                Loading data...
              </Text>
            </Flex>
          ) : (
            <Text size="3">Content loaded!</Text>
          )}
        </Box>

        <Button onClick={handleLoad} disabled={isLoading}>
          {isLoading ? "Loading..." : "Start Loading"}
        </Button>
      </Flex>
    )
  },
}

// Loading overlay example
export const LoadingOverlay: Story = {
  render: () => (
    <Box style={{ position: "relative", width: "300px", height: "200px" }}>
      {/* Content */}
      <Box
        style={{
          padding: "20px",
          backgroundColor: "var(--gray-2)",
          borderRadius: "8px",
          height: "100%",
        }}
      >
        <Text size="3" weight="medium" style={{ marginBottom: "12px" }}>
          Card Content
        </Text>
        <Text size="2" color="gray">
          This is some content that would be shown when not loading.
        </Text>
      </Box>

      {/* Loading overlay */}
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Flex direction="column" gap="2" align="center">
          <Spinner size="2" />
          <Text size="2" color="gray">
            Loading...
          </Text>
        </Flex>
      </Box>
    </Box>
  ),
}

// Real-world usage patterns
export const RealWorldPatterns: Story = {
  render: () => (
    <Flex direction="column" gap="6" style={{ width: "400px" }}>
      <div>
        <Text size="4" weight="bold">
          Common Loading Patterns
        </Text>
      </div>

      {/* Form submission */}
      <Box
        style={{
          padding: "16px",
          backgroundColor: "var(--blue-2)",
          borderRadius: "8px",
        }}
      >
        <Text size="3" weight="medium" style={{ marginBottom: "12px" }}>
          Form Submission
        </Text>
        <Flex gap="2" align="center">
          <Button loading size="2">
            Save Changes
          </Button>
          <Text size="2" color="gray">
            Processing your request...
          </Text>
        </Flex>
      </Box>

      {/* Data fetching */}
      <Box
        style={{
          padding: "16px",
          backgroundColor: "var(--green-2)",
          borderRadius: "8px",
        }}
      >
        <Text size="3" weight="medium" style={{ marginBottom: "12px" }}>
          Data Fetching
        </Text>
        <Flex direction="column" gap="3">
          <Flex gap="2" align="center">
            <Spinner size="1" />
            <Text size="2">Fetching user data...</Text>
          </Flex>
          <Box
            style={{
              height: "40px",
              backgroundColor: "var(--gray-3)",
              borderRadius: "4px",
              opacity: 0.5,
            }}
          />
          <Box
            style={{
              height: "40px",
              backgroundColor: "var(--gray-3)",
              borderRadius: "4px",
              opacity: 0.5,
            }}
          />
        </Flex>
      </Box>

      {/* File upload */}
      <Box
        style={{
          padding: "16px",
          backgroundColor: "var(--orange-2)",
          borderRadius: "8px",
        }}
      >
        <Text size="3" weight="medium" style={{ marginBottom: "12px" }}>
          File Upload
        </Text>
        <Flex direction="column" gap="2">
          <Flex gap="2" align="center">
            <Spinner size="1" />
            <Text size="2">Uploading document.pdf...</Text>
          </Flex>
          <Box
            style={{
              height: "4px",
              backgroundColor: "var(--gray-4)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <Box
              style={{
                height: "100%",
                width: "60%",
                backgroundColor: "var(--orange-9)",
                borderRadius: "2px",
              }}
            />
          </Box>
          <Text size="1" color="gray">
            60% complete
          </Text>
        </Flex>
      </Box>
    </Flex>
  ),
}
