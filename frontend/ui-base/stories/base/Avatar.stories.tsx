import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Avatar, Flex, Text, Theme } from "../../src/base"

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
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
      options: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      description: "Avatar size",
    },
    variant: {
      control: "select",
      options: ["solid", "soft"],
      description: "Avatar variant style",
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
      description: "Avatar accent color",
    },
    radius: {
      control: "select",
      options: ["none", "small", "medium", "large", "full"],
      description: "Avatar border radius",
    },
    highContrast: {
      control: "boolean",
      description: "High contrast mode",
    },
    fallback: {
      control: "text",
      description: "Fallback content when image fails to load",
    },
    src: {
      control: "text",
      description: "Image source URL",
    },
    alt: {
      control: "text",
      description: "Alternative text for the image",
    },
  },
  args: {
    size: "3",
    variant: "soft",
    fallback: "JD",
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story with fallback
export const Default: Story = {
  args: {
    fallback: "JD",
  },
}

// With image
export const WithImage: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
    alt: "John Doe",
    fallback: "JD",
  },
}

// Fallback only (broken image)
export const FallbackOnly: Story = {
  args: {
    src: "https://broken-image-url.jpg",
    alt: "Broken image",
    fallback: "AB",
  },
}

// Size stories
export const Size1: Story = {
  args: {
    size: "1",
    fallback: "XS",
  },
}

export const Size2: Story = {
  args: {
    size: "2",
    fallback: "S",
  },
}

export const Size3: Story = {
  args: {
    size: "3",
    fallback: "M",
  },
}

export const Size4: Story = {
  args: {
    size: "4",
    fallback: "L",
  },
}

export const Size5: Story = {
  args: {
    size: "5",
    fallback: "XL",
  },
}

export const Size6: Story = {
  args: {
    size: "6",
    fallback: "XXL",
  },
}

export const Size7: Story = {
  args: {
    size: "7",
    fallback: "3XL",
  },
}

export const Size8: Story = {
  args: {
    size: "8",
    fallback: "4XL",
  },
}

export const Size9: Story = {
  args: {
    size: "9",
    fallback: "5XL",
  },
}

// Variant stories
export const VariantSolid: Story = {
  args: {
    variant: "solid",
    fallback: "S",
    color: "blue",
  },
}

export const VariantSoft: Story = {
  args: {
    variant: "soft",
    fallback: "S",
    color: "blue",
  },
}

// Color stories
export const ColorBlue: Story = {
  args: {
    color: "blue",
    fallback: "B",
  },
}

export const ColorRed: Story = {
  args: {
    color: "red",
    fallback: "R",
  },
}

export const ColorGreen: Story = {
  args: {
    color: "green",
    fallback: "G",
  },
}

export const ColorPurple: Story = {
  args: {
    color: "purple",
    fallback: "P",
  },
}

// Radius stories
export const RadiusNone: Story = {
  args: {
    radius: "none",
    fallback: "SQ",
  },
}

export const RadiusSmall: Story = {
  args: {
    radius: "small",
    fallback: "SM",
  },
}

export const RadiusMedium: Story = {
  args: {
    radius: "medium",
    fallback: "MD",
  },
}

export const RadiusLarge: Story = {
  args: {
    radius: "large",
    fallback: "LG",
  },
}

export const RadiusFull: Story = {
  args: {
    radius: "full",
    fallback: "FL",
  },
}

// High contrast
export const HighContrast: Story = {
  args: {
    highContrast: true,
    fallback: "HC",
    color: "blue",
  },
}

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <Flex align="center" gap="3" wrap="wrap">
      {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((size) => (
        <Flex key={size} direction="column" align="center" gap="1">
          <Avatar size={size as any} fallback={size} />
          <Text size="1" color="gray">
            Size {size}
          </Text>
        </Flex>
      ))}
    </Flex>
  ),
}

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <Flex gap="4" align="center">
      <Flex direction="column" align="center" gap="2">
        <Avatar variant="solid" color="blue" fallback="S" />
        <Text size="2">Solid</Text>
      </Flex>
      <Flex direction="column" align="center" gap="2">
        <Avatar variant="soft" color="blue" fallback="S" />
        <Text size="2">Soft</Text>
      </Flex>
    </Flex>
  ),
}

// Color palette showcase
export const ColorPalette: Story = {
  render: () => (
    <Flex gap="2" wrap="wrap" style={{ maxWidth: "400px" }}>
      {[
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
      ].map((color) => (
        <Flex key={color} direction="column" align="center" gap="1">
          <Avatar
            color={color as any}
            fallback={color.slice(0, 2).toUpperCase()}
            size="2"
          />
          <Text size="1" color="gray">
            {color}
          </Text>
        </Flex>
      ))}
    </Flex>
  ),
}

// Different fallback types
export const FallbackTypes: Story = {
  render: () => (
    <Flex gap="4" align="center">
      <Flex direction="column" align="center" gap="2">
        <Avatar fallback="J" size="4" />
        <Text size="2">Single Letter</Text>
      </Flex>
      <Flex direction="column" align="center" gap="2">
        <Avatar fallback="JD" size="4" />
        <Text size="2">Initials</Text>
      </Flex>
      <Flex direction="column" align="center" gap="2">
        <Avatar fallback="👤" size="4" />
        <Text size="2">Icon/Emoji</Text>
      </Flex>
    </Flex>
  ),
}

// Loading states demonstration
export const LoadingStates: Story = {
  render: () => (
    <Flex direction="column" gap="4">
      <div>
        <Text size="3" weight="medium">
          Loading Image (valid URL):
        </Text>
        <Flex gap="2" align="center" style={{ marginTop: "8px" }}>
          <Avatar
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
            alt="Loading image"
            fallback="L"
            size="4"
          />
          <Text size="2" color="gray">
            Image loads successfully
          </Text>
        </Flex>
      </div>

      <div>
        <Text size="3" weight="medium">
          Failed Image (broken URL):
        </Text>
        <Flex gap="2" align="center" style={{ marginTop: "8px" }}>
          <Avatar
            src="https://broken-image-url.jpg"
            alt="Broken image"
            fallback="F"
            size="4"
            color="red"
          />
          <Text size="2" color="gray">
            Falls back to initials
          </Text>
        </Flex>
      </div>
    </Flex>
  ),
}

// Real-world usage examples
export const RealWorldExamples: Story = {
  render: () => (
    <Flex direction="column" gap="6" style={{ maxWidth: "400px" }}>
      <div>
        <Text size="4" weight="bold">
          User Profile Header
        </Text>
        <Flex
          gap="3"
          align="center"
          style={{
            marginTop: "12px",
            padding: "16px",
            backgroundColor: "var(--gray-2)",
            borderRadius: "8px",
          }}
        >
          <Avatar
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
            fallback="JD"
            size="5"
            color="blue"
          />
          <Flex direction="column" gap="1">
            <Text size="4" weight="medium">
              John Doe
            </Text>
            <Text size="2" color="gray">
              Senior Developer
            </Text>
          </Flex>
        </Flex>
      </div>

      <div>
        <Text size="4" weight="bold">
          Comment Thread
        </Text>
        <Flex direction="column" gap="3" style={{ marginTop: "12px" }}>
          {[
            {
              name: "Alice Johnson",
              initials: "AJ",
              comment: "Great work on this feature!",
              color: "green",
            },
            {
              name: "Bob Smith",
              initials: "BS",
              comment: "I have some feedback on the implementation.",
              color: "purple",
            },
            {
              name: "Carol Davis",
              initials: "CD",
              comment: "Thanks for the detailed explanation.",
              color: "orange",
            },
          ].map((user, index) => (
            <Flex
              key={index}
              gap="3"
              align="start"
              style={{
                padding: "12px",
                backgroundColor: "var(--gray-2)",
                borderRadius: "8px",
              }}
            >
              <Avatar
                fallback={user.initials}
                size="3"
                color={user.color as any}
              />
              <Flex direction="column" gap="1" style={{ flex: 1 }}>
                <Text size="2" weight="medium">
                  {user.name}
                </Text>
                <Text size="2">{user.comment}</Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </div>

      <div>
        <Text size="4" weight="bold">
          Team Members
        </Text>
        <Flex gap="2" wrap="wrap" style={{ marginTop: "12px" }}>
          {[
            { initials: "JD", color: "blue" },
            { initials: "SM", color: "green" },
            { initials: "AL", color: "purple" },
            { initials: "MK", color: "orange" },
            { initials: "TW", color: "red" },
            { initials: "+3", color: "gray" },
          ].map((member, index) => (
            <Avatar
              key={index}
              fallback={member.initials}
              size="3"
              color={member.color as any}
              variant={member.initials === "+3" ? "solid" : "soft"}
            />
          ))}
        </Flex>
      </div>
    </Flex>
  ),
}
