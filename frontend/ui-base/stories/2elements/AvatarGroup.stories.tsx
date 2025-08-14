import type { Meta, StoryObj } from "@storybook/react-vite"
import "../../src/styles/index.css"
import { Theme, Text, Flex } from "../../src/base"
import { AvatarGroup } from "../../src/elements/avatar-group"
import type { AvatarProps } from "../../src/base"

// Sample user data for stories
const sampleUsers: AvatarProps[] = [
  { id: "1", name: "John Doe", src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop" },
  { id: "2", name: "Jane Smith", src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop" },
  { id: "3", name: "Alice Johnson", src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop" },
  { id: "4", name: "Bob Wilson", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop" },
  { id: "5", name: "Carol Davis", src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop" },
  { id: "6", name: "David Brown", src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop" },
  { id: "7", name: "Eva Martinez", src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop" },
  { id: "8", name: "Frank Miller", src: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop" },
]

// Fallback users without images
const fallbackUsers: AvatarProps[] = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Alice Johnson" },
  { id: "4", name: "Bob Wilson" },
  { id: "5", name: "Carol Davis" },
  { id: "6", name: "David Brown" },
  { id: "7", name: "Eva Martinez" },
]

const meta: Meta<typeof AvatarGroup> = {
  title: "2 Elements/AvatarGroup",
  component: AvatarGroup,
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
    users: {
      control: "object",
      description: "Array of user objects with avatar data",
    },
    maxVisible: {
      control: "number",
      description: "Maximum number of avatars to show before overflow",
    },
    size: {
      control: "select",
      options: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      description: "Size of the avatars",
    },
    layout: {
      control: "select",
      options: ["spread", "stack"],
      description: "Layout style for the avatar group",
    },
    direction: {
      control: "select",
      options: ["left", "right"],
      description: "Direction for avatar ordering",
    },
    stackOrder: {
      control: "select",
      options: ["ascending", "descending"],
      description: "Stack order (only applies to stack layout)",
    },
  },
  args: {
    users: sampleUsers.slice(0, 4),
    maxVisible: 5,
    size: "3",
    layout: "spread",
    direction: "left",
    stackOrder: "descending",
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    users: sampleUsers.slice(0, 4),
  },
}

// Layout variations
export const SpreadLayout: Story = {
  args: {
    layout: "spread",
    users: sampleUsers.slice(0, 5),
  },
}

export const StackLayout: Story = {
  args: {
    layout: "stack",
    users: sampleUsers.slice(0, 5),
  },
}

// Direction variations
export const DirectionLeft: Story = {
  args: {
    direction: "left",
    users: sampleUsers.slice(0, 4),
  },
}

export const DirectionRight: Story = {
  args: {
    direction: "right",
    users: sampleUsers.slice(0, 4),
  },
}

// Stack order variations
export const StackAscending: Story = {
  args: {
    layout: "stack",
    stackOrder: "ascending",
    users: sampleUsers.slice(0, 4),
  },
}

export const StackDescending: Story = {
  args: {
    layout: "stack",
    stackOrder: "descending",
    users: sampleUsers.slice(0, 4),
  },
}

// Size variations
export const Size1: Story = {
  args: {
    size: "1",
    users: sampleUsers.slice(0, 4),
  },
}

export const Size3: Story = {
  args: {
    size: "3",
    users: sampleUsers.slice(0, 4),
  },
}

export const Size5: Story = {
  args: {
    size: "5",
    users: sampleUsers.slice(0, 4),
  },
}

// Max visible variations
export const MaxVisible3: Story = {
  args: {
    maxVisible: 3,
    users: sampleUsers,
  },
}

export const MaxVisible5: Story = {
  args: {
    maxVisible: 5,
    users: sampleUsers,
  },
}

// Overflow scenarios
export const WithOverflow: Story = {
  args: {
    users: sampleUsers,
    maxVisible: 3,
  },
}

export const LargeOverflow: Story = {
  args: {
    users: sampleUsers,
    maxVisible: 2,
  },
}

// Fallback avatars (without images)
export const WithFallbacks: Story = {
  args: {
    users: fallbackUsers.slice(0, 4),
  },
}

// Mixed content (some with images, some without)
export const MixedContent: Story = {
  args: {
    users: [
      sampleUsers[0],
      fallbackUsers[1],
      sampleUsers[2],
      fallbackUsers[3],
      sampleUsers[4],
    ],
    maxVisible: 4,
  },
}

// Comparison showcase
export const LayoutComparison: Story = {
  render: () => (
    <Flex direction="column" gap="6" align="center">
      <div>
        <Text size="4" weight="bold" style={{ marginBottom: "12px", display: "block" }}>
          Spread Layout
        </Text>
        <AvatarGroup
          layout="spread"
          users={sampleUsers.slice(0, 5)}
          maxVisible={4}
          size="3"
        />
      </div>
      <div>
        <Text size="4" weight="bold" style={{ marginBottom: "12px", display: "block" }}>
          Stack Layout
        </Text>
        <AvatarGroup
          layout="stack"
          users={sampleUsers.slice(0, 5)}
          maxVisible={4}
          size="3"
        />
      </div>
    </Flex>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <Flex direction="column" gap="4" align="center">
      {(["1", "2", "3", "4", "5"] as const).map((size) => (
        <Flex key={size} direction="column" align="center" gap="2">
          <AvatarGroup
            size={size}
            users={sampleUsers.slice(0, 4)}
            maxVisible={3}
          />
          <Text size="1" color="gray">
            Size {size}
          </Text>
        </Flex>
      ))}
    </Flex>
  ),
}

// Real-world examples
export const TeamMembers: Story = {
  render: () => (
    <Flex
      direction="column"
      gap="4"
      style={{
        padding: "20px",
        backgroundColor: "var(--gray-2)",
        borderRadius: "8px",
        maxWidth: "400px",
      }}
    >
      <Text size="4" weight="bold">
        Project Team
      </Text>
      <Flex align="center" justify="between">
        <AvatarGroup
          users={sampleUsers.slice(0, 6)}
          maxVisible={4}
          size="3"
          layout="spread"
        />
        <Text size="2" color="gray">
          {sampleUsers.length} members
        </Text>
      </Flex>
    </Flex>
  ),
}

export const CollaborativeDocument: Story = {
  render: () => (
    <Flex
      align="center"
      justify="between"
      style={{
        padding: "12px 16px",
        backgroundColor: "var(--gray-2)",
        borderRadius: "8px",
        maxWidth: "300px",
      }}
    >
      <Text size="3" weight="medium">
        Currently editing
      </Text>
      <AvatarGroup
        users={sampleUsers.slice(0, 3)}
        maxVisible={3}
        size="2"
        layout="stack"
      />
    </Flex>
  ),
}
