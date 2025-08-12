import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Flex, Link, Text, Theme } from "../../src/base" // Adjust the import path as necessary

const meta: Meta<typeof Link> = {
  title:"Base/Link",
  component: Link,
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
      options: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      description: "Link text size",
    },
    weight: {
      control: "select",
      options: ["light", "regular", "medium", "bold"],
      description: "Link text weight",
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
      description: "Link color",
    },
    highContrast: {
      control: "boolean",
      description: "High contrast mode",
    },
    underline: {
      control: "select",
      options: ["auto", "hover", "always", "never"],
      description: "Link underline behavior",
    },
  },
  args: {
    size: "2",
    children: "Example link",
    href: "#",
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  render: (args) => <Link {...args}>Default Link</Link>,
}

// Size stories
export const Size1: Story = {
  render: (_args) => (
    <Link size="1" href="#">
      Size 1 Link
    </Link>
  ),
}

export const Size2: Story = {
  render: (_args) => (
    <Link size="2" href="#">
      Size 2 Link
    </Link>
  ),
}

export const Size3: Story = {
  render: (_args) => (
    <Link size="3" href="#">
      Size 3 Link
    </Link>
  ),
}

export const Size4: Story = {
  render: (_args) => (
    <Link size="4" href="#">
      Size 4 Link
    </Link>
  ),
}

// Weight stories
export const WeightLight: Story = {
  render: (_args) => (
    <Link weight="light" href="#">
      Light Weight Link
    </Link>
  ),
}

export const WeightRegular: Story = {
  render: (_args) => (
    <Link weight="regular" href="#">
      Regular Weight Link
    </Link>
  ),
}

export const WeightMedium: Story = {
  render: (_args) => (
    <Link weight="medium" href="#">
      Medium Weight Link
    </Link>
  ),
}

export const WeightBold: Story = {
  render: (_args) => (
    <Link weight="bold" href="#">
      Bold Weight Link
    </Link>
  ),
}

// Color stories
export const ColorBlue: Story = {
  render: (_args) => (
    <Link color="blue" href="#">
      Blue Link
    </Link>
  ),
}

export const ColorRed: Story = {
  render: (_args) => (
    <Link color="red" href="#">
      Red Link
    </Link>
  ),
}

export const ColorGreen: Story = {
  render: (_args) => (
    <Link color="green" href="#">
      Green Link
    </Link>
  ),
}

export const ColorPurple: Story = {
  render: (_args) => (
    <Link color="purple" href="#">
      Purple Link
    </Link>
  ),
}

// Underline stories
export const UnderlineAuto: Story = {
  render: (_args) => (
    <Link underline="auto" href="#">
      Auto Underline (default)
    </Link>
  ),
}

export const UnderlineHover: Story = {
  render: (_args) => (
    <Link underline="hover" href="#">
      Hover Underline
    </Link>
  ),
}

export const UnderlineAlways: Story = {
  render: (_args) => (
    <Link underline="always" href="#">
      Always Underlined
    </Link>
  ),
}

export const UnderlineNever: Story = {
  render: (_args) => (
    <Link underline="never" href="#">
      Never Underlined
    </Link>
  ),
}

// High contrast
export const HighContrast: Story = {
  render: (_args) => (
    <Link highContrast href="#">
      High Contrast Link
    </Link>
  ),
}

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <Flex direction="column" gap="2">
      <Link size="1" href="#">
        Size 1
      </Link>
      <Link size="2" href="#">
        Size 2
      </Link>
      <Link size="3" href="#">
        Size 3
      </Link>
      <Link size="4" href="#">
        Size 4
      </Link>
      <Link size="5" href="#">
        Size 5
      </Link>
      <Link size="6" href="#">
        Size 6
      </Link>
    </Flex>
  ),
}

// All weights showcase
export const AllWeights: Story = {
  render: () => (
    <Flex direction="column" gap="2">
      <Link weight="light" href="#">
        Light Weight
      </Link>
      <Link weight="regular" href="#">
        Regular Weight
      </Link>
      <Link weight="medium" href="#">
        Medium Weight
      </Link>
      <Link weight="bold" href="#">
        Bold Weight
      </Link>
    </Flex>
  ),
}

// All underline styles showcase
export const AllUnderlines: Story = {
  render: () => (
    <Flex direction="column" gap="2">
      <Link underline="auto" href="#">
        Auto underline
      </Link>
      <Link underline="hover" href="#">
        Hover underline
      </Link>
      <Link underline="always" href="#">
        Always underlined
      </Link>
      <Link underline="never" href="#">
        Never underlined
      </Link>
    </Flex>
  ),
}

// Inline links in text
export const InlineLinks: Story = {
  render: () => (
    <Text size="3" style={{ maxWidth: "400px", lineHeight: "1.6" }}>
      This is a paragraph of text that contains several{" "}
      <Link href="#">inline links</Link> to demonstrate how links appear within
      text content. You can also have{" "}
      <Link href="#" color="red">
        colored links
      </Link>{" "}
      and{" "}
      <Link href="#" weight="bold">
        bold links
      </Link>{" "}
      for emphasis.
    </Text>
  ),
}

// Navigation links example
export const NavigationExample: Story = {
  render: () => (
    <div>
      <Text
        size="3"
        weight="bold"
        style={{ marginBottom: "16px", display: "block" }}
      >
        Navigation Menu
      </Text>
      <Flex gap="6">
        <Link href="#" size="2" weight="medium">
          Home
        </Link>
        <Link href="#" size="2" weight="medium">
          Products
        </Link>
        <Link href="#" size="2" weight="medium">
          About
        </Link>
        <Link href="#" size="2" weight="medium">
          Contact
        </Link>
      </Flex>
    </div>
  ),
}

// Footer links example
export const FooterLinksExample: Story = {
  render: () => (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        padding: "24px",
        borderRadius: "8px",
        maxWidth: "500px",
      }}
    >
      <Flex direction="column" gap="4">
        <div>
          <Text
            size="2"
            weight="bold"
            style={{ marginBottom: "8px", display: "block" }}
          >
            Company
          </Text>
          <Flex direction="column" gap="1">
            <Link href="#" size="1" color="gray">
              About Us
            </Link>
            <Link href="#" size="1" color="gray">
              Careers
            </Link>
            <Link href="#" size="1" color="gray">
              Press
            </Link>
            <Link href="#" size="1" color="gray">
              News
            </Link>
          </Flex>
        </div>

        <div>
          <Text
            size="2"
            weight="bold"
            style={{ marginBottom: "8px", display: "block" }}
          >
            Support
          </Text>
          <Flex direction="column" gap="1">
            <Link href="#" size="1" color="gray">
              Help Center
            </Link>
            <Link href="#" size="1" color="gray">
              Documentation
            </Link>
            <Link href="#" size="1" color="gray">
              Contact Support
            </Link>
            <Link href="#" size="1" color="gray">
              Status Page
            </Link>
          </Flex>
        </div>

        <div>
          <Text
            size="2"
            weight="bold"
            style={{ marginBottom: "8px", display: "block" }}
          >
            Legal
          </Text>
          <Flex direction="column" gap="1">
            <Link href="#" size="1" color="gray">
              Privacy Policy
            </Link>
            <Link href="#" size="1" color="gray">
              Terms of Service
            </Link>
            <Link href="#" size="1" color="gray">
              Cookie Policy
            </Link>
          </Flex>
        </div>
      </Flex>
    </div>
  ),
}

// Breadcrumb links example
export const BreadcrumbExample: Story = {
  render: () => (
    <div>
      <Text
        size="3"
        weight="bold"
        style={{ marginBottom: "12px", display: "block" }}
      >
        Breadcrumb Navigation
      </Text>
      <Flex align="center" gap="2">
        <Link href="#" size="2" color="gray">
          Home
        </Link>
        <Text size="2" color="gray">
          /
        </Text>
        <Link href="#" size="2" color="gray">
          Products
        </Link>
        <Text size="2" color="gray">
          /
        </Text>
        <Link href="#" size="2" color="gray">
          Electronics
        </Link>
        <Text size="2" color="gray">
          /
        </Text>
        <Text size="2" weight="medium">
          Laptop
        </Text>
      </Flex>
    </div>
  ),
}

// Social links example
export const SocialLinksExample: Story = {
  render: () => (
    <div>
      <Text
        size="3"
        weight="bold"
        style={{ marginBottom: "16px", display: "block" }}
      >
        Follow Us
      </Text>
      <Flex gap="4">
        <Link href="#" color="blue" weight="medium">
          Twitter
        </Link>
        <Link href="#" color="indigo" weight="medium">
          Facebook
        </Link>
        <Link href="#" color="purple" weight="medium">
          Instagram
        </Link>
        <Link href="#" color="blue" weight="medium">
          LinkedIn
        </Link>
        <Link href="#" color="red" weight="medium">
          YouTube
        </Link>
      </Flex>
    </div>
  ),
}

// Call-to-action links example
export const CTALinksExample: Story = {
  render: () => (
    <div style={{ maxWidth: "400px" }}>
      <Text
        size="4"
        weight="bold"
        style={{ marginBottom: "12px", display: "block" }}
      >
        Get Started Today
      </Text>
      <Text
        size="2"
        style={{ marginBottom: "16px", display: "block", lineHeight: "1.6" }}
      >
        Join thousands of developers who are already building amazing
        applications with our component library.
      </Text>
      <Flex gap="4">
        <Link href="#" size="3" weight="bold" color="blue">
          Start Free Trial →
        </Link>
        <Link href="#" size="2" underline="always">
          View Documentation
        </Link>
      </Flex>
    </div>
  ),
}

// External links example
export const ExternalLinksExample: Story = {
  render: () => (
    <div>
      <Text
        size="3"
        weight="bold"
        style={{ marginBottom: "16px", display: "block" }}
      >
        External Resources
      </Text>
      <Flex direction="column" gap="2">
        <Link
          href="https://react.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          React Documentation ↗
        </Link>
        <Link
          href="https://www.typescriptlang.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          TypeScript Handbook ↗
        </Link>
        <Link
          href="https://storybook.js.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Storybook Docs ↗
        </Link>
        <Link
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Repository ↗
        </Link>
      </Flex>
    </div>
  ),
}

// Article links example
export const ArticleLinksExample: Story = {
  render: () => (
    <div style={{ maxWidth: "500px" }}>
      <Text
        size="4"
        weight="bold"
        style={{ marginBottom: "16px", display: "block" }}
      >
        Recent Blog Posts
      </Text>
      <Flex direction="column" gap="4">
        <div>
          <Link
            href="#"
            size="3"
            weight="medium"
            style={{ display: "block", marginBottom: "4px" }}
          >
            Building Accessible React Components
          </Link>
          <Text size="2" color="gray">
            Learn how to create components that work for everyone...
          </Text>
        </div>

        <div>
          <Link
            href="#"
            size="3"
            weight="medium"
            style={{ display: "block", marginBottom: "4px" }}
          >
            Advanced TypeScript Patterns for UI Libraries
          </Link>
          <Text size="2" color="gray">
            Explore sophisticated type patterns for better developer
            experience...
          </Text>
        </div>

        <div>
          <Link
            href="#"
            size="3"
            weight="medium"
            style={{ display: "block", marginBottom: "4px" }}
          >
            Design System Best Practices in 2024
          </Link>
          <Text size="2" color="gray">
            Key principles for creating scalable design systems...
          </Text>
        </div>
      </Flex>
    </div>
  ),
}
