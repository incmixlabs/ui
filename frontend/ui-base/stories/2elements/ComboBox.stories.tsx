import type { Meta, StoryObj } from "@storybook/react-vite"
import React, { useState } from "react"
import { Theme, Box, Text, Flex } from "../../src/1base"
import { ComboBox, type StatefulOption } from "../../src/2elements/combo-box"
import { User, Star, Tag, Users, Settings } from "lucide-react"

const meta: Meta<typeof ComboBox> = {
  title: "2 Elements/ComboBox",
  component: ComboBox,
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
    placeholder: {
      control: "text",
      description: "Placeholder text when no values are selected",
    },
    title: {
      control: "text",
      description: "Title shown at the top of the popover",
    },
    addNewLabel: {
      control: "boolean",
      description: "Enable adding new labels functionality",
    },
    onValueChange: {
      action: "value-changed",
      description: "Callback when selected values change",
    },
  },
  args: {
    placeholder: "Select options",
    addNewLabel: false,
  },
}

export default meta
type Story = StoryObj<typeof meta> | { args?: any; render: () => React.JSX.Element }

const sampleOptions = [
  {
    label: "Frontend",
    value: "frontend",
    icon: User,
    color: "blue" as const,
  },
  {
    label: "Backend",
    value: "backend",
    icon: Settings,
    color: "green" as const,
  },
  {
    label: "Design",
    value: "design",
    icon: Star,
    color: "purple" as const,
  },
  {
    label: "Marketing",
    value: "marketing",
    icon: Tag,
    color: "orange" as const,
  },
  {
    label: "Team Lead",
    value: "team-lead",
    icon: Users,
    color: "red" as const,
    disable: true,
  },
]

const avatarOptions = [
  {
    label: "John Doe",
    value: "john-doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    color: "blue" as const,
  },
  {
    label: "Jane Smith",
    value: "jane-smith",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
    color: "green" as const,
  },
  {
    label: "Mike Johnson",
    value: "mike-johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    color: "purple" as const,
  },
  {
    label: "Sarah Wilson",
    value: "sarah-wilson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    color: "orange" as const,
    disable: true,
  },
]

// Default story
export const Default: Story = {
  args: {},
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([])

    return (
      <Flex direction="column" gap="4" align="center">
        <ComboBox
          mode="simple"
          options={sampleOptions}
          onValueChange={setSelectedValues}
          placeholder="Add labels to tasks..."
          addNewLabel={true}
        />

        {selectedValues.length > 0 && (
          <Box
            style={{
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "200px",
            }}
          >
            <Text size="2" weight="medium">
              Selected: {selectedValues.join(", ")}
            </Text>
          </Box>
        )}
      </Flex>
    )
  },
}

// With title
export const WithTitle: Story = {
  args: {},
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>(["frontend"])

    return (
      <Flex direction="column" gap="4" align="center">
        <ComboBox
          mode="simple"
          options={sampleOptions}
          onValueChange={setSelectedValues}
          defaultValue={["frontend"]}
          title="Select Team Roles"
          placeholder="Choose roles..."
        />

        <Box
          style={{
            padding: "12px",
            borderRadius: "8px",
            backgroundColor: "var(--gray-2)",
            textAlign: "center",
            minWidth: "200px",
          }}
        >
          <Text size="2" weight="medium">
            Current Selection:
          </Text>
          <Text size="2" color="gray">
            {selectedValues.length > 0 ? selectedValues.join(", ") : "None"}
          </Text>
        </Box>
      </Flex>
    )
  },
}

// With avatars
export const WithAvatars: Story = {
  args: {},
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([])

    return (
      <Flex direction="column" gap="4" align="center">
        <ComboBox
          mode="simple"
          options={avatarOptions}
          onValueChange={setSelectedValues}
          title="Select Team Members"
          placeholder="Choose team members..."
        />

        {selectedValues.length > 0 && (
          <Box
            style={{
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "200px",
            }}
          >
            <Text size="2" weight="medium">
              Selected Members: {selectedValues.length}
            </Text>
            <Text size="2" color="gray">
              {selectedValues.join(", ")}
            </Text>
          </Box>
        )}
      </Flex>
    )
  },
}

// With add new label functionality (Simple mode)
export const WithAddNewLabel: Story = {
  args: {},
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([])
    const [isLabelFormOpen, setIsLabelFormOpen] = useState(false)
    const [labelColor, setLabelColor] = useState("blue")
    const formRef = React.useRef<HTMLFormElement>(null)

    const handleAddNewLabel = (label: { name: string; color: any }) => {
      const newValue = label.name.toLowerCase().replace(/\s+/g, "-")
      setSelectedValues(prev => [...prev, newValue])
      setIsLabelFormOpen(false)
    }

    return (
      <Flex direction="column" gap="4" align="center">
        <ComboBox
          mode="simple"
          options={sampleOptions}
          onValueChange={setSelectedValues}
          title="Manage Labels"
          placeholder="Select or create labels..."
          addNewLabel={true}
          formRef={formRef}
          isLabelFormOpen={isLabelFormOpen}
          setIsLabelFormOpen={setIsLabelFormOpen}
          labelColor={labelColor}
          setLabelColor={setLabelColor}
          onAddLabel={handleAddNewLabel}
        />

        {selectedValues.length > 0 && (
          <Box
            style={{
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "250px",
            }}
          >
            <Text size="2" weight="medium">
              Labels ({selectedValues.length}):
            </Text>
            <Text size="2" color="gray">
              {selectedValues.join(", ")}
            </Text>
          </Box>
        )}
      </Flex>
    )
  },
}

// Disabled options demonstration
export const WithDisabledOptions: Story = {
  args: {},
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([])

    const mixedOptions = [
      ...sampleOptions,
      {
        label: "Admin",
        value: "admin",
        icon: Settings,
        color: "crimson" as const,
        disable: true,
      },
    ]

    return (
      <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium" style={{ textAlign: "center" }}>
          Some options are disabled
        </Text>

        <ComboBox
          mode="simple"
          options={mixedOptions}
          onValueChange={setSelectedValues}
          title="Team Roles (Some Disabled)"
          placeholder="Select available roles..."
        />

        <Box
          style={{
            padding: "12px",
            borderRadius: "8px",
            backgroundColor: "var(--gray-2)",
            textAlign: "center",
            minWidth: "200px",
          }}
        >
          <Text size="2" weight="medium">
            Available Options: {mixedOptions.filter(opt => !opt.disable).length}
          </Text>
          <Text size="2" color="gray">
            Disabled Options: {mixedOptions.filter(opt => opt.disable).length}
          </Text>
          <Text size="2" color="gray">
            Selected: {selectedValues.length}
          </Text>
        </Box>
      </Flex>
    )
  },
}

// Custom popover styling
export const CustomStyling: Story = {
  args: {},
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>(["design"])

    return (
      <Flex direction="column" gap="4" align="center">
        <ComboBox
          mode="simple"
          options={sampleOptions}
          onValueChange={setSelectedValues}
          defaultValue={["design"]}
          title="Custom Styled ComboBox"
          placeholder="Select with custom styles..."
          popoverClass="shadow-lg border-2 border-blue-200"
        />

        <Text size="2" color="gray" style={{ textAlign: "center" }}>
          This ComboBox has custom popover styling
        </Text>
      </Flex>
    )
  },
}

// Stateful mode with add new label functionality
export const StatefulWithAddNewLabel: Story = {
  args: {},
  render: () => {
    const [options, setOptions] = useState<StatefulOption[]>(
      sampleOptions.map(opt => ({ ...opt, checked: false }))
    )
    const [isLabelFormOpen, setIsLabelFormOpen] = useState(false)
    const [labelColor, setLabelColor] = useState("blue")

    const handleAddLabel = ({ name, color }: { name: string; color: string }) => {
      const newOption: StatefulOption = {
        label: name,
        value: name.toLowerCase().replace(/\s+/g, "-"),
        color: color,
        checked: true,
      }
      setOptions(prev => [...prev, newOption])
    }

    return (
      <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Stateful mode with internal state management
        </Text>
        
        <ComboBox
          mode="stateful"
          options={options as any}
          onValueChange={setOptions as any}
          title="Stateful Labels"
          placeholder="Manage stateful labels..."
          addNewLabel={true}
          isLabelFormOpen={isLabelFormOpen}
          setIsLabelFormOpen={setIsLabelFormOpen}
          labelColor={labelColor}
          setLabelColor={setLabelColor}
          onAddLabel={handleAddLabel}
        />

        <Box
          style={{
            padding: "12px",
            borderRadius: "8px",
            backgroundColor: "var(--gray-2)",
            textAlign: "center",
            minWidth: "300px",
          }}
        >
          <Text size="2" weight="medium">
            Total Options: {options.length}
          </Text>
          <Text size="2" color="gray">
            Selected: {options.filter(opt => opt.checked).map(opt => opt.label).join(", ") || "None"}
          </Text>
        </Box>
      </Flex>
    )
  },
}

// Interactive playground
export const InteractivePlayground: Story = {
  args: {},
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([])
    const [showTitle, setShowTitle] = useState(true)
    const [enableAddNew, setEnableAddNew] = useState(false)
    const [isLabelFormOpen, setIsLabelFormOpen] = useState(false)
    const [labelColor, setLabelColor] = useState("blue")
    const formRef = React.useRef<HTMLFormElement>(null)

    const handleAddNewLabel = (label: { name: string; color: any }) => {
      const newValue = label.name.toLowerCase().replace(/\s+/g, "-")
      setSelectedValues(prev => [...prev, newValue])
      setIsLabelFormOpen(false)
    }

    return (
      <Flex direction="column" gap="6" align="center" style={{ maxWidth: "400px" }}>
        <Text size="4" weight="bold">
          Interactive ComboBox
        </Text>

        {/* Controls */}
        <Box
          style={{
            padding: "16px",
            backgroundColor: "var(--gray-2)",
            borderRadius: "8px",
            width: "100%",
          }}
        >
          <Text size="3" weight="medium" style={{ marginBottom: "12px", display: "block" }}>
            Configuration
          </Text>

          <Flex direction="column" gap="2">
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                checked={showTitle}
                onChange={(e) => setShowTitle(e.target.checked)}
              />
              <Text size="2">Show Title</Text>
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                checked={enableAddNew}
                onChange={(e) => setEnableAddNew(e.target.checked)}
              />
              <Text size="2">Enable Add New Labels</Text>
            </label>
          </Flex>
        </Box>

        {/* ComboBox */}
        <ComboBox
          mode="simple"
          options={sampleOptions}
          onValueChange={setSelectedValues}
          title={showTitle ? "Label Manager" : undefined}
          placeholder="Select labels..."
          addNewLabel={enableAddNew}
          formRef={formRef}
          isLabelFormOpen={isLabelFormOpen}
          setIsLabelFormOpen={setIsLabelFormOpen}
          labelColor={labelColor}
          setLabelColor={setLabelColor}
          onAddLabel={handleAddNewLabel}
        />

        {/* Results */}
        <Box
          style={{
            width: "100%",
            padding: "16px",
            backgroundColor: "var(--gray-2)",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <Text size="2" weight="medium">
            Selected Values ({selectedValues.length}):
          </Text>
          <Text size="2" color="gray" style={{ marginTop: "4px", display: "block" }}>
            {selectedValues.length > 0 ? selectedValues.join(", ") : "None selected"}
          </Text>
        </Box>
      </Flex>
    )
  },
}
