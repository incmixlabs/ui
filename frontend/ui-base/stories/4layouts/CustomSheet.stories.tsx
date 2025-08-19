import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Theme, Box, Text, Button, Flex } from "../../src/1base"
import { MotionSheet } from "../../src/4layouts/custom-sheet"

const meta: Meta<typeof MotionSheet> = {
  title: "4 Layouts/CustomSheet",
  component: MotionSheet,
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
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "Side from which the sheet slides in",
    },
    open: {
      control: "boolean",
      description: "Whether the sheet is open",
    },
    title: {
      control: "text",
      description: "Title of the sheet",
    },
    description: {
      control: "text",
      description: "Description text",
    },
    showCloseButton: {
      control: "boolean",
      description: "Whether to show close button",
    },
    closeOnOutsideClick: {
      control: "boolean",
      description: "Close when clicking outside",
    },
    closeOnEsc: {
      control: "boolean",
      description: "Close when pressing Escape",
    },
    isFilter: {
      control: "boolean",
      description: "Whether this is a filter sheet",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story with controlled state
export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Sheet</Button>
        <MotionSheet
          {...args}
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <Box className="p-4">
            <Text>This is the content of the sheet.</Text>
            <Text className="mt-2 text-sm text-gray-600">
              You can put any content here. The sheet supports animations and various configurations.
            </Text>
          </Box>
        </MotionSheet>
      </>
    )
  },
  args: {
    title: "Default Sheet",
    description: "A customizable animated sheet component",
    side: "right",
    showCloseButton: true,
    closeOnOutsideClick: true,
    closeOnEsc: true,
  },
}

// Right side sheet
export const RightSide: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Right Sheet</Button>
        <MotionSheet
          open={isOpen}
          onOpenChange={setIsOpen}
          side="right"
          title="Right Side Sheet"
          description="Slides in from the right"
        >
          <Flex direction="column" gap="3" className="p-4">
            <Text>Content slides in from the right side.</Text>
            <Button variant="soft">Action Button</Button>
          </Flex>
        </MotionSheet>
      </>
    )
  },
}

// Left side sheet
export const LeftSide: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Left Sheet</Button>
        <MotionSheet
          open={isOpen}
          onOpenChange={setIsOpen}
          side="left"
          title="Left Side Sheet"
          description="Slides in from the left"
        >
          <Flex direction="column" gap="3" className="p-4">
            <Text>Content slides in from the left side.</Text>
            <Button variant="soft">Action Button</Button>
          </Flex>
        </MotionSheet>
      </>
    )
  },
}

// Top sheet
export const TopSide: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Top Sheet</Button>
        <MotionSheet
          open={isOpen}
          onOpenChange={setIsOpen}
          side="top"
          title="Top Sheet"
          description="Slides down from the top"
        >
          <Flex direction="column" gap="3" className="p-4">
            <Text>Content slides in from the top.</Text>
            <Button variant="soft">Action Button</Button>
          </Flex>
        </MotionSheet>
      </>
    )
  },
}

// Bottom sheet
export const BottomSide: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Bottom Sheet</Button>
        <MotionSheet
          open={isOpen}
          onOpenChange={setIsOpen}
          side="bottom"
          title="Bottom Sheet"
          description="Slides up from the bottom"
        >
          <Flex direction="column" gap="3" className="p-4">
            <Text>Content slides in from the bottom.</Text>
            <Button variant="soft">Action Button</Button>
          </Flex>
        </MotionSheet>
      </>
    )
  },
}

// Filter sheet variant
export const FilterSheet: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Filter Sheet</Button>
        <MotionSheet
          open={isOpen}
          onOpenChange={setIsOpen}
          side="right"
          title="Filter Options"
          description="Configure your filters"
          isFilter={true}
          isFilterClassName="w-[30rem] 2xl:w-[40rem]"
        >
          <Flex direction="column" gap="4" className="p-4">
            <Text size="2" weight="medium">Filter by Category</Text>
            <Flex direction="column" gap="2">
              <Button variant="soft" size="2">Documents</Button>
              <Button variant="soft" size="2">Images</Button>
              <Button variant="soft" size="2">Videos</Button>
            </Flex>

            <Text size="2" weight="medium" className="mt-4">Filter by Date</Text>
            <Flex direction="column" gap="2">
              <Button variant="soft" size="2">Last 7 days</Button>
              <Button variant="soft" size="2">Last 30 days</Button>
              <Button variant="soft" size="2">Last year</Button>
            </Flex>
          </Flex>
        </MotionSheet>
      </>
    )
  },
}

// No close button
export const NoCloseButton: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Sheet (No Close Button)</Button>
        <MotionSheet
          open={isOpen}
          onOpenChange={setIsOpen}
          side="right"
          title="No Close Button"
          description="Must click outside or press Escape to close"
          showCloseButton={false}
        >
          <Flex direction="column" gap="3" className="p-4">
            <Text>This sheet has no close button.</Text>
            <Text size="2" color="gray">Click outside or press Escape to close.</Text>
            <Button onClick={() => setIsOpen(false)} variant="soft">
              Manual Close
            </Button>
          </Flex>
        </MotionSheet>
      </>
    )
  },
}

// With custom styling
export const CustomStyling: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Custom Styled Sheet</Button>
        <MotionSheet
          open={isOpen}
          onOpenChange={setIsOpen}
          side="right"
          title="Custom Styled"
          description="With custom colors and shadow"
          className="bg-gradient-to-br from-blue-50 to-indigo-100 border-l-4 border-blue-500"
          shadow="0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          overlayColor="rgba(59, 130, 246, 0.3)"
        >
          <Flex direction="column" gap="3" className="p-4">
            <Text>This sheet has custom styling applied.</Text>
            <Text size="2" color="blue">Custom background gradient and blue overlay.</Text>
            <Button variant="solid" color="blue">Styled Button</Button>
          </Flex>
        </MotionSheet>
      </>
    )
  },
}
