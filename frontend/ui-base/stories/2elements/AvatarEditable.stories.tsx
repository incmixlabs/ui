import type { Meta, StoryObj } from "@storybook/react-vite"
import "../../src/styles/index.css"
import { useState } from "react"
import { Theme, Text, Flex, Box } from "../../src/base"
import { AvatarEditable } from "../../src/elements/avatar-editable"

const meta: Meta<typeof AvatarEditable> = {
  title: "2 Elements/AvatarEditable",
  component: AvatarEditable,
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
    src: {
      control: "text",
      description: "Image source URL",
    },
    name: {
      control: "text",
      description: "User name for fallback initials",
    },
    deletable: {
      control: "boolean",
      description: "Whether the delete button should be shown",
    },
    isDeletingImage: {
      control: "boolean",
      description: "Whether the delete action is in progress",
    },
    onImageChange: {
      action: "image-change",
      description: "Callback when image is changed",
    },
    onImageDelete: {
      action: "image-delete",
      description: "Callback when image is deleted",
    },
  },
  args: {
    size: "3",
    name: "John Doe",
    deletable: true,
    isDeletingImage: false,
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story with image
export const Default: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?&w=128&h=128&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
    name: "John Doe",
  },
}

// Without image (shows fallback)
export const WithoutImage: Story = {
  args: {
    name: "Jane Smith",
    deletable: false, // No delete button when no image
  },
}

// Not deletable
export const NotDeletable: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?&w=128&h=128&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
    name: "Alice Johnson",
    deletable: false,
  },
}

// Deleting state
export const DeletingImage: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?&w=128&h=128&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
    name: "Carol Davis",
    isDeletingImage: true,
  },
}

// Different sizes
export const Size1: Story = {
  args: {
    size: "1",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
    name: "Bob Wilson",
  },
}

export const Size5: Story = {
  args: {
    size: "5",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?&w=192&h=192&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
    name: "David Brown",
  },
}

export const Size9: Story = {
  args: {
    size: "9",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=256&h=256&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
    name: "Eva Martinez",
  },
}

// Interactive example with state management
export const Interactive: Story = {
  render: () => {
    const [currentSrc, setCurrentSrc] = useState<string | undefined>(
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?&w=128&h=128&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
    )
    const [isDeleting, setIsDeleting] = useState(false)

    const handleImageChange = async (file: File) => {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Create object URL for preview
      const objectUrl = URL.createObjectURL(file)
      setCurrentSrc(objectUrl)
    }

    const handleImageDelete = async () => {
      setIsDeleting(true)
      // Simulate delete delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      setCurrentSrc(undefined)
      setIsDeleting(false)
    }

    return (
      <Flex direction="column" align="center" gap="4">
        <AvatarEditable
          size="5"
          src={currentSrc}
          name="Interactive User"
          onImageChange={handleImageChange}
          onImageDelete={handleImageDelete}
          isDeletingImage={isDeleting}
        />
        <Text size="2" color="gray">
          {currentSrc ? "Hover to edit, click delete to remove" : "Click to upload image"}
        </Text>
      </Flex>
    )
  },
}

// Size showcase
export const AllSizes: Story = {
  render: () => (
    <Flex align="center" gap="4" wrap="wrap">
      {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((size) => (
        <Flex key={size} direction="column" align="center" gap="2">
          <AvatarEditable
            size={size as any}
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?&w=128&h=128&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
            name={`Size ${size}`}
            onImageChange={async () => {}}
            onImageDelete={async () => {}}
          />
          <Text size="1" color="gray">
            Size {size}
          </Text>
        </Flex>
      ))}
    </Flex>
  ),
}

// States comparison
export const StatesComparison: Story = {
  render: () => (
    <Flex direction="column" gap="6" align="center">
      <div>
        <Text size="4" weight="bold" style={{ marginBottom: "12px", display: "block" }}>
          With Image (Deletable)
        </Text>
        <AvatarEditable
          size="4"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?&w=128&h=128&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
          name="John Doe"
          deletable={true}
          onImageChange={async () => {}}
          onImageDelete={async () => {}}
        />
      </div>

      <div>
        <Text size="4" weight="bold" style={{ marginBottom: "12px", display: "block" }}>
          With Image (Not Deletable)
        </Text>
        <AvatarEditable
          size="4"
          src="https://images.unsplash.com/photo-1494790108755-2616b612b786?&w=128&h=128&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
          name="Jane Smith"
          deletable={false}
          onImageChange={async () => {}}
        />
      </div>

      <div>
        <Text size="4" weight="bold" style={{ marginBottom: "12px", display: "block" }}>
          Without Image
        </Text>
        <AvatarEditable
          size="4"
          name="Alice Johnson"
          onImageChange={async () => {}}
        />
      </div>

      <div>
        <Text size="4" weight="bold" style={{ marginBottom: "12px", display: "block" }}>
          Deleting State
        </Text>
        <AvatarEditable
          size="4"
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?&w=128&h=128&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
          name="Carol Davis"
          isDeletingImage={true}
          onImageChange={async () => {}}
          onImageDelete={async () => {}}
        />
      </div>
    </Flex>
  ),
}

// Real-world example
export const ProfileSettings: Story = {
  render: () => (
    <Box
      style={{
        padding: "24px",
        backgroundColor: "var(--gray-2)",
        borderRadius: "12px",
        maxWidth: "400px",
      }}
    >
      <Text size="5" weight="bold" style={{ marginBottom: "16px", display: "block" }}>
        Profile Settings
      </Text>

      <Flex align="center" gap="4">
        <AvatarEditable
          size="6"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?&w=160&h=160&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
          name="John Doe"
          onImageChange={async () => {}}
          onImageDelete={async () => {}}
        />

        <Flex direction="column" gap="2" style={{ flex: 1 }}>
          <Text size="4" weight="medium">
            John Doe
          </Text>
          <Text size="2" color="gray">
            Senior Software Engineer
          </Text>
          <Text size="2" color="gray">
            Hover over avatar to change profile picture
          </Text>
        </Flex>
      </Flex>
    </Box>
  ),
}
