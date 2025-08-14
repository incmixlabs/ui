import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Blockquote, Flex, Link, Text, Theme } from "../../src/base"
const meta: Meta<typeof Blockquote> = {
  title:"1 Base/Blockquote",
  component: Blockquote,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ maxWidth: "600px", padding: "20px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
  argTypes: {
    size: {
      control: "select",
      options: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      description: "Blockquote text size",
    },
    weight: {
      control: "select",
      options: ["light", "regular", "medium", "bold"],
      description: "Blockquote text weight",
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
      description: "Blockquote color",
    },
    highContrast: {
      control: "boolean",
      description: "High contrast mode",
    },
  },
  args: {
    size: "3",
    children: "The only way to do great work is to love what you do.",
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  render: (args) => (
    <Blockquote {...args}>
      The only way to do great work is to love what you do. If you haven't found
      it yet, keep looking. Don't settle.
    </Blockquote>
  ),
}

// Size stories
export const Size1: Story = {
  render: (_args) => (
    <Blockquote size="1">Small blockquote with size 1 text.</Blockquote>
  ),
}

export const Size2: Story = {
  render: (_args) => (
    <Blockquote size="2">Medium blockquote with size 2 text.</Blockquote>
  ),
}

export const Size3: Story = {
  render: (_args) => (
    <Blockquote size="3">Default blockquote with size 3 text.</Blockquote>
  ),
}

export const Size4: Story = {
  render: (_args) => (
    <Blockquote size="4">
      Large blockquote with size 4 text for emphasis.
    </Blockquote>
  ),
}

export const Size5: Story = {
  render: (_args) => (
    <Blockquote size="5">Extra large blockquote with size 5 text.</Blockquote>
  ),
}

// Weight stories
export const WeightLight: Story = {
  render: (_args) => (
    <Blockquote weight="light">
      This blockquote uses light weight text for a subtle appearance.
    </Blockquote>
  ),
}

export const WeightRegular: Story = {
  render: (_args) => (
    <Blockquote weight="regular">
      This blockquote uses regular weight text which is the default.
    </Blockquote>
  ),
}

export const WeightMedium: Story = {
  render: (_args) => (
    <Blockquote weight="medium">
      This blockquote uses medium weight text for better emphasis.
    </Blockquote>
  ),
}

export const WeightBold: Story = {
  render: (_args) => (
    <Blockquote weight="bold">
      This blockquote uses bold weight text for strong emphasis.
    </Blockquote>
  ),
}

// Color stories
export const ColorGray: Story = {
  render: (_args) => (
    <Blockquote color="gray">
      This is a gray blockquote that blends subtly with the background.
    </Blockquote>
  ),
}

export const ColorBlue: Story = {
  render: (_args) => (
    <Blockquote color="blue">
      This is a blue blockquote that stands out with color emphasis.
    </Blockquote>
  ),
}

export const ColorRed: Story = {
  render: (_args) => (
    <Blockquote color="red">
      This is a red blockquote that draws attention with warning colors.
    </Blockquote>
  ),
}

export const ColorGreen: Story = {
  render: (_args) => (
    <Blockquote color="green">
      This is a green blockquote that suggests success or positive feedback.
    </Blockquote>
  ),
}

export const ColorPurple: Story = {
  render: (_args) => (
    <Blockquote color="purple">
      This is a purple blockquote that adds a creative, distinctive touch.
    </Blockquote>
  ),
}

// High contrast
export const HighContrast: Story = {
  render: (_args) => (
    <Blockquote highContrast>
      This blockquote uses high contrast mode for better accessibility and
      readability.
    </Blockquote>
  ),
}

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <Flex direction="column" gap="4">
      <Blockquote size="1">Size 1 - Small blockquote</Blockquote>
      <Blockquote size="2">Size 2 - Medium blockquote</Blockquote>
      <Blockquote size="3">Size 3 - Default blockquote</Blockquote>
      <Blockquote size="4">Size 4 - Large blockquote</Blockquote>
      <Blockquote size="5">Size 5 - Extra large blockquote</Blockquote>
    </Flex>
  ),
}

// All weights showcase
export const AllWeights: Story = {
  render: () => (
    <Flex direction="column" gap="3">
      <Blockquote weight="light">Light weight blockquote</Blockquote>
      <Blockquote weight="regular">Regular weight blockquote</Blockquote>
      <Blockquote weight="medium">Medium weight blockquote</Blockquote>
      <Blockquote weight="bold">Bold weight blockquote</Blockquote>
    </Flex>
  ),
}

// Famous quotes example
export const FamousQuotesExample: Story = {
  render: () => (
    <Flex direction="column" gap="4">
      <div>
        <Blockquote size="4" weight="medium">
          "The future belongs to those who believe in the beauty of their
          dreams."
        </Blockquote>
        <Text
          size="2"
          color="gray"
          style={{ marginTop: "8px", fontStyle: "italic" }}
        >
          — Eleanor Roosevelt
        </Text>
      </div>

      <div>
        <Blockquote size="3" color="blue">
          "Innovation distinguishes between a leader and a follower."
        </Blockquote>
        <Text
          size="2"
          color="gray"
          style={{ marginTop: "8px", fontStyle: "italic" }}
        >
          — Steve Jobs
        </Text>
      </div>

      <div>
        <Blockquote size="3" color="green">
          "Be yourself; everyone else is already taken."
        </Blockquote>
        <Text
          size="2"
          color="gray"
          style={{ marginTop: "8px", fontStyle: "italic" }}
        >
          — Oscar Wilde
        </Text>
      </div>
    </Flex>
  ),
}

// Customer testimonials example
export const TestimonialsExample: Story = {
  render: () => (
    <div>
      <Text
        size="4"
        weight="bold"
        style={{ marginBottom: "24px", display: "block" }}
      >
        What Our Customers Say
      </Text>

      <Flex direction="column" gap="6">
        <div
          style={{
            padding: "20px",
            border: "1px solid #e1e5e9",
            borderRadius: "8px",
            backgroundColor: "#fafbfc",
          }}
        >
          <Blockquote size="3" color="gray">
            "This component library has completely transformed our development
            workflow. The quality and consistency of the components is
            outstanding."
          </Blockquote>
          <Flex align="center" gap="3" style={{ marginTop: "16px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#e1e5e9",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text size="2" weight="bold">
                JD
              </Text>
            </div>
            <div>
              <Text size="2" weight="medium">
                John Doe
              </Text>
              <Text size="1" color="gray">
                Senior Developer, TechCorp
              </Text>
            </div>
          </Flex>
        </div>

        <div
          style={{
            padding: "20px",
            border: "1px solid #e1e5e9",
            borderRadius: "8px",
            backgroundColor: "#fafbfc",
          }}
        >
          <Blockquote size="3" color="blue">
            "The documentation is excellent and the components are so
            well-designed. Our team productivity has increased significantly
            since we started using it."
          </Blockquote>
          <Flex align="center" gap="3" style={{ marginTop: "16px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#e1e5e9",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text size="2" weight="bold">
                AS
              </Text>
            </div>
            <div>
              <Text size="2" weight="medium">
                Alice Smith
              </Text>
              <Text size="1" color="gray">
                Product Manager, StartupXYZ
              </Text>
            </div>
          </Flex>
        </div>
      </Flex>
    </div>
  ),
}

// Article quotes example
export const ArticleQuotesExample: Story = {
  render: () => (
    <div>
      <Text
        size="4"
        weight="bold"
        style={{ marginBottom: "16px", display: "block" }}
      >
        The Future of Web Development
      </Text>

      <Text size="3" style={{ marginBottom: "20px", lineHeight: "1.6" }}>
        The landscape of web development continues to evolve rapidly, with new
        frameworks and tools emerging regularly. However, certain principles
        remain constant.
      </Text>

      <Blockquote size="4" weight="medium" style={{ margin: "24px 0" }}>
        "The best frameworks are those that get out of your way and let you
        focus on solving real problems for real people."
      </Blockquote>

      <Text size="3" style={{ marginBottom: "16px", lineHeight: "1.6" }}>
        This philosophy drives much of the modern web development ecosystem.
        Tools that prioritize developer experience while maintaining performance
        and accessibility are becoming the standard.
      </Text>

      <Text size="2" color="gray" style={{ fontStyle: "italic" }}>
        From "Modern Web Development Principles" by Developer Weekly
      </Text>
    </div>
  ),
}

// Code review comments example
export const CodeReviewExample: Story = {
  render: () => (
    <div>
      <Text
        size="3"
        weight="bold"
        style={{ marginBottom: "16px", display: "block" }}
      >
        Code Review Feedback
      </Text>

      <Flex direction="column" gap="4">
        <div
          style={{
            padding: "16px",
            backgroundColor: "#f0f9ff",
            border: "1px solid #bfdbfe",
            borderRadius: "6px",
          }}
        >
          <Blockquote size="2" color="blue">
            "Great implementation! The error handling is solid and the component
            API is intuitive. Just one small suggestion about the prop naming."
          </Blockquote>
          <Text size="1" color="gray" style={{ marginTop: "8px" }}>
            — Sarah Chen, Senior Engineer
          </Text>
        </div>

        <div
          style={{
            padding: "16px",
            backgroundColor: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "6px",
          }}
        >
          <Blockquote size="2" color="green">
            "Excellent work on the accessibility features. All ARIA attributes
            are properly implemented and the keyboard navigation works
            perfectly."
          </Blockquote>
          <Text size="1" color="gray" style={{ marginTop: "8px" }}>
            — Alex Rodriguez, Accessibility Specialist
          </Text>
        </div>

        <div
          style={{
            padding: "16px",
            backgroundColor: "#fffbeb",
            border: "1px solid #fed7aa",
            borderRadius: "6px",
          }}
        >
          <Blockquote size="2" color="orange">
            "The performance looks good, but consider memoizing the expensive
            calculations in the render function to optimize re-renders."
          </Blockquote>
          <Text size="1" color="gray" style={{ marginTop: "8px" }}>
            — Mike Johnson, Performance Engineer
          </Text>
        </div>
      </Flex>
    </div>
  ),
}

// Documentation quotes example
export const DocumentationExample: Story = {
  render: () => (
    <div>
      <Text
        size="4"
        weight="bold"
        style={{ marginBottom: "20px", display: "block" }}
      >
        Component Guidelines
      </Text>

      <div style={{ marginBottom: "24px" }}>
        <Text
          size="2"
          weight="medium"
          style={{ marginBottom: "12px", display: "block" }}
        >
          Accessibility Best Practices
        </Text>
        <Blockquote size="2" color="blue">
          Always ensure that interactive elements are keyboard accessible and
          provide appropriate ARIA labels for screen readers. Test your
          components with actual assistive technologies.
        </Blockquote>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <Text
          size="2"
          weight="medium"
          style={{ marginBottom: "12px", display: "block" }}
        >
          Performance Considerations
        </Text>
        <Blockquote size="2" color="green">
          Keep components lightweight and avoid unnecessary re-renders. Use
          React.memo and useMemo judiciously, and always measure performance
          impact rather than optimizing prematurely.
        </Blockquote>
      </div>

      <div>
        <Text
          size="2"
          weight="medium"
          style={{ marginBottom: "12px", display: "block" }}
        >
          Design Consistency
        </Text>
        <Blockquote size="2" color="purple">
          Follow the established design tokens and patterns. When creating new
          components, ensure they feel like a natural part of the existing
          system rather than standalone elements.
        </Blockquote>
      </div>
    </div>
  ),
}

// Pull quote example
export const PullQuoteExample: Story = {
  render: () => (
    <div>
      <Text size="3" style={{ marginBottom: "20px", lineHeight: "1.6" }}>
        Component libraries have revolutionized the way we build user
        interfaces. They provide consistency, reduce development time, and
        ensure accessibility standards are met across entire applications.
      </Text>

      <div
        style={{
          textAlign: "center",
          margin: "40px 0",
          padding: "0 20px",
        }}
      >
        <Blockquote
          size="5"
          weight="medium"
          color="indigo"
          style={{
            fontSize: "1.5rem",
            lineHeight: "1.4",
            position: "relative",
          }}
        >
          "A well-designed component library is like a shared language that
          helps teams communicate more effectively through code."
        </Blockquote>
      </div>

      <Text size="3" style={{ lineHeight: "1.6" }}>
        The investment in creating and maintaining a component library pays
        dividends in the long term. Teams can focus on solving business problems
        rather than recreating basic UI elements, leading to more innovative and
        polished products.
      </Text>
    </div>
  ),
}
