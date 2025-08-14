import type { Meta, StoryObj } from "@storybook/react-vite"
import "../../src/styles/index.css"
import { Theme, Flex, Box, Text } from "../../src/1base"
import { PropertySheet } from "../../src/2elements/property-sheet"

const meta: Meta<typeof PropertySheet> = {
  title: "2 Elements/PropertySheet",
  component: PropertySheet,
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
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {}

// In a container with defined width
export const InContainer: Story = {
  render: () => (
    <Box style={{ width: "400px", height: "600px" }}>
      <PropertySheet />
    </Box>
  ),
}

// Side by side comparison
export const SideBySide: Story = {
  render: () => (
    <Flex gap="4" align="start">
      <Box style={{ width: "350px", height: "500px" }}>
        <PropertySheet />
      </Box>
      <Box style={{ width: "350px", height: "500px" }}>
        <PropertySheet />
      </Box>
    </Flex>
  ),
}

// In a wider layout
export const WideLayout: Story = {
  render: () => (
    <Box style={{ width: "600px", height: "500px" }}>
      <PropertySheet />
    </Box>
  ),
}

// In a narrow layout
export const NarrowLayout: Story = {
  render: () => (
    <Box style={{ width: "280px", height: "600px" }}>
      <PropertySheet />
    </Box>
  ),
}

// In a dashboard-like context
export const DashboardContext: Story = {
  render: () => (
    <Flex gap="4" style={{ maxWidth: "1200px" }}>
      {/* Main content area */}
      <Box style={{ flex: 1, minHeight: "500px", backgroundColor: "var(--gray-2)", borderRadius: "8px", padding: "20px" }}>
        <Text size="5" weight="bold" style={{ marginBottom: "16px", display: "block" }}>
          Main Dashboard Content
        </Text>
        <Box style={{ height: "400px", backgroundColor: "var(--gray-3)", borderRadius: "6px", padding: "16px" }}>
          <Text size="3" color="gray">
            This represents the main content area of a dashboard or application.
            The PropertySheet on the right would typically control settings for this content.
          </Text>
        </Box>
      </Box>

      {/* Property sheet sidebar */}
      <Box style={{ width: "320px", height: "500px" }}>
        <PropertySheet />
      </Box>
    </Flex>
  ),
}

// In a modal-like context
export const ModalContext: Story = {
  render: () => (
    <Box
      style={{
        position: "relative",
        padding: "20px",
        backgroundColor: "var(--gray-1)",
        borderRadius: "12px",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
        maxWidth: "500px",
      }}
    >
      <Text size="5" weight="bold" style={{ marginBottom: "16px", display: "block" }}>
        Chart Configuration
      </Text>
      <PropertySheet />

      <Flex gap="2" justify="end" style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--gray-6)" }}>
        <button style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid var(--gray-6)", background: "transparent" }}>
          Cancel
        </button>
        <button style={{ padding: "8px 16px", borderRadius: "6px", border: "none", backgroundColor: "var(--blue-9)", color: "white" }}>
          Apply Changes
        </button>
      </Flex>
    </Box>
  ),
}

// Responsive showcase
export const ResponsiveShowcase: Story = {
  render: () => (
    <Flex direction="column" gap="6">
      <div>
        <Text size="4" weight="bold" style={{ marginBottom: "12px", display: "block" }}>
          Mobile Width (280px)
        </Text>
        <Box style={{ width: "280px", height: "400px", border: "1px solid var(--gray-6)", borderRadius: "8px" }}>
          <PropertySheet />
        </Box>
      </div>

      <div>
        <Text size="4" weight="bold" style={{ marginBottom: "12px", display: "block" }}>
          Tablet Width (400px)
        </Text>
        <Box style={{ width: "400px", height: "400px", border: "1px solid var(--gray-6)", borderRadius: "8px" }}>
          <PropertySheet />
        </Box>
      </div>

      <div>
        <Text size="4" weight="bold" style={{ marginBottom: "12px", display: "block" }}>
          Desktop Width (500px)
        </Text>
        <Box style={{ width: "500px", height: "400px", border: "1px solid var(--gray-6)", borderRadius: "8px" }}>
          <PropertySheet />
        </Box>
      </div>
    </Flex>
  ),
}

// Usage examples
export const UsageExamples: Story = {
  render: () => (
    <Flex direction="column" gap="8" align="center">
      <div style={{ textAlign: "center", maxWidth: "600px" }}>
        <Text size="6" weight="bold" style={{ marginBottom: "8px", display: "block" }}>
          PropertySheet Component
        </Text>
        <Text size="3" color="gray">
          A configurable property panel for setting chart dimensions, data sources, styling options, and color themes.
        </Text>
      </div>

      <Flex gap="8" align="start" wrap="wrap" justify="center">
        <div style={{ textAlign: "center" }}>
          <Text size="4" weight="medium" style={{ marginBottom: "12px", display: "block" }}>
            Settings Panel
          </Text>
          <Box style={{ width: "320px", height: "450px", border: "1px solid var(--gray-6)", borderRadius: "8px" }}>
            <PropertySheet />
          </Box>
          <Text size="2" color="gray" style={{ marginTop: "8px", display: "block" }}>
            Use as a sidebar for chart configuration
          </Text>
        </div>

        <div style={{ textAlign: "center" }}>
          <Text size="4" weight="medium" style={{ marginBottom: "12px", display: "block" }}>
            Modal Configuration
          </Text>
          <Box
            style={{
              width: "350px",
              height: "450px",
              border: "1px solid var(--gray-6)",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              backgroundColor: "var(--gray-1)",
              padding: "16px",
            }}
          >
            <PropertySheet />
          </Box>
          <Text size="2" color="gray" style={{ marginTop: "8px", display: "block" }}>
            Use in modals for detailed configuration
          </Text>
        </div>
      </Flex>
    </Flex>
  ),
}
