import type { Meta, StoryObj } from "@storybook/react-vite"
import React, { useState } from "react"
import { Theme, Box, Text, Flex, Checkbox } from "../../src/1base"
import { ComboBox } from "../../src/2elements/combo-box"
import type { ExtendedColorType } from "../../src/2elements/combo-box"

const meta: Meta<typeof ComboBox> = {
  title: "2 Elements/ListComboBox",
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
    btnClassName: {
      control: "text",
      description: "Custom CSS classes for the trigger button",
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

const sampleLabels = [
  {
    label: "High Priority",
    value: "high-priority",
    color: "red" as ExtendedColorType,
    checked: false,
  },
  {
    label: "Medium Priority",
    value: "medium-priority",
    color: "orange" as ExtendedColorType,
    checked: false,
  },
  {
    label: "Low Priority",
    value: "low-priority",
    color: "green" as ExtendedColorType,
    checked: false,
  },
  {
    label: "Bug Fix",
    value: "bug-fix",
    color: "crimson" as ExtendedColorType,
    checked: false,
  },
  {
    label: "Feature",
    value: "feature",
    color: "blue" as ExtendedColorType,
    checked: false,
  },
  {
    label: "Documentation",
    value: "documentation",
    color: "gray" as ExtendedColorType,
    checked: false,
  },
]

const teamLabels = [
  {
    label: "John Doe",
    value: "john-doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    color: "blue" as ExtendedColorType,
    checked: false,
  },
  {
    label: "Jane Smith",
    value: "jane-smith",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
    color: "green" as ExtendedColorType,
    checked: false,
  },
  {
    label: "Mike Johnson",
    value: "mike-johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    color: "purple" as ExtendedColorType,
    checked: false,
  },
  {
    label: "Sarah Wilson",
    value: "sarah-wilson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    color: "orange" as ExtendedColorType,
    checked: false,
    disable: true,
  },
]

// Default story
export const Default: Story = {
  args: {},
  render: () => {
    const [selectedLabels, setSelectedLabels] = useState(sampleLabels)

    return (
      <Flex direction="column" gap="4" align="center">
        <ComboBox
          mode="stateful"
          options={selectedLabels}
          defaultValue={selectedLabels}
          onValueChange={setSelectedLabels as any}
          placeholder="Manage labels"
        />

        {selectedLabels.filter(label => label.checked).length > 0 && (
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
              Checked Labels ({selectedLabels.filter(l => l.checked).length}):
            </Text>
            <Text size="2" color="gray">
              {selectedLabels.filter(l => l.checked).map(l => l.label).join(", ") || "None"}
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
    const [selectedLabels, setSelectedLabels] = useState([
      ...sampleLabels.map(label =>
        label.value === "high-priority" ? { ...label, checked: true } : label
      )
    ])

    return (
      <Flex direction="column" gap="4" align="center">
        <ComboBox
          mode="stateful"
          options={selectedLabels}
          defaultValue={selectedLabels}
          onValueChange={setSelectedLabels as any}
          title="Project Labels"
          placeholder="Select project labels"
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
            Active Labels:
          </Text>
          <Text size="2" color="gray">
            {selectedLabels.filter(l => l.checked).map(l => l.label).join(", ") || "None selected"}
          </Text>
        </Box>
      </Flex>
    )
  },
}

// With avatars (team members)
export const WithAvatars: Story = {
  args: {},
  render: () => {
    const [selectedMembers, setSelectedMembers] = useState(teamLabels)

    return (
      <Flex direction="column" gap="4" align="center">
        <ComboBox
          mode="stateful"
          options={selectedMembers}
          defaultValue={selectedMembers}
          onValueChange={setSelectedMembers as any}
          title="Team Members"
          placeholder="Select team members"
        />

        {selectedMembers.filter(member => member.checked).length > 0 && (
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
              Selected Members ({selectedMembers.filter(m => m.checked).length}):
            </Text>
            <Text size="2" color="gray">
              {selectedMembers.filter(m => m.checked).map(m => m.label).join(", ") || "None"}
            </Text>
          </Box>
        )}
      </Flex>
    )
  },
}

// With add new label functionality
export const WithAddNewLabel: Story = {
  args: {},
  render: () => {
    const [selectedLabels, setSelectedLabels] = useState([...sampleLabels])
    const [isLabelFormOpen, setIsLabelFormOpen] = useState(false)
    const [labelColor, setLabelColor] = useState<ExtendedColorType>("blue")

    return (
      <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          You can add new labels
        </Text>

        <ComboBox
          mode="stateful"
          options={selectedLabels}
          defaultValue={selectedLabels}
          onValueChange={setSelectedLabels as any}
          title="Custom Labels"
          placeholder="Manage custom labels"
          addNewLabel={true}
          isLabelFormOpen={isLabelFormOpen}
          setIsLabelFormOpen={setIsLabelFormOpen}
          labelColor={labelColor}
          setLabelColor={setLabelColor}
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
            Total Labels: {selectedLabels.length}
          </Text>
          <Text size="2" color="gray">
            Active: {selectedLabels.filter(l => l.checked).length}
          </Text>
          <Text size="2" color="gray">
            Inactive: {selectedLabels.filter(l => !l.checked).length}
          </Text>
        </Box>
      </Flex>
    )
  },
}

// With disabled options
export const WithDisabledOptions: Story = {
  args: {},
  render: () => {
    const [selectedItems, setSelectedItems] = useState(teamLabels)

    return (
      <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Some members are disabled
        </Text>

        <ComboBox
          mode="stateful"
          options={selectedItems}
          defaultValue={selectedItems}
          onValueChange={setSelectedItems as any}
          title="Team Assignment"
          placeholder="Assign team members"
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
            Available Members: {selectedItems.filter(m => !m.disable).length}
          </Text>
          <Text size="2" color="gray">
            Disabled Members: {selectedItems.filter(m => m.disable).length}
          </Text>
          <Text size="2" color="gray">
            Selected: {selectedItems.filter(m => m.checked && !m.disable).length}
          </Text>
        </Box>
      </Flex>
    )
  },
}

// Custom button styling
export const CustomButtonStyling: Story = {
  args: {},
  render: () => {
    const [selectedLabels, setSelectedLabels] = useState(sampleLabels)

    return (
      <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Custom styled trigger button
        </Text>

        <ComboBox
          mode="stateful"
          options={selectedLabels}
          defaultValue={selectedLabels}
          onValueChange={setSelectedLabels as any}
          title="Styled Labels"
          placeholder="Open with styled button"
          btnClassName="bg-blue-500 hover:bg-blue-600 text-white border-blue-500"
        />

        <Text size="2" color="gray" style={{ textAlign: "center" }}>
          The trigger button has custom blue styling
        </Text>
      </Flex>
    )
  },
}

// Priority management example
export const PriorityManagement: Story = {
  args: {},
  render: () => {
    const priorityLabels = [
      {
        label: "Critical",
        value: "critical",
        color: "crimson" as ExtendedColorType,
        checked: false,
      },
      {
        label: "High",
        value: "high",
        color: "red" as ExtendedColorType,
        checked: true,
      },
      {
        label: "Medium",
        value: "medium",
        color: "orange" as ExtendedColorType,
        checked: false,
      },
      {
        label: "Low",
        value: "low",
        color: "green" as ExtendedColorType,
        checked: false,
      },
      {
        label: "Nice to Have",
        value: "nice-to-have",
        color: "gray" as ExtendedColorType,
        checked: false,
      },
    ]

    const [priorities, setPriorities] = useState(priorityLabels)

    return (
      <Flex direction="column" gap="4" align="center">
        <Text size="4" weight="bold">
          Task Priority Management
        </Text>

        <ComboBox
          mode="stateful"
          options={priorities}
          defaultValue={priorities}
          onValueChange={setPriorities as any}
          title="Set Priority Level"
          placeholder="Select task priority"
        />

        <Box
          style={{
            padding: "16px",
            borderRadius: "8px",
            backgroundColor: "var(--gray-1)",
            border: "1px solid var(--gray-6)",
            minWidth: "320px",
          }}
        >
          <Text size="3" weight="medium" style={{ marginBottom: "12px", display: "block" }}>
            Priority Status
          </Text>

          {priorities.map((priority) => (
            <Flex
              key={priority.value}
              justify="between"
              align="center"
              style={{
                padding: "8px 0",
                borderBottom: "1px solid var(--gray-4)",
              }}
            >
              <Flex align="center" gap="2">
                <Box
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: priority.checked ? `var(--${priority.color}-9)` : "var(--gray-6)",
                  }}
                />
                <Text size="2">{priority.label}</Text>
              </Flex>
              <Text size="1" color={priority.checked ? "green" : "gray"}>
                {priority.checked ? "Active" : "Inactive"}
              </Text>
            </Flex>
          ))}
        </Box>
      </Flex>
    )
  },
}

// Label management with statistics
export const LabelManagementWithStats: Story = {
  args: {},
  render: () => {
    const [labels, setLabels] = useState([...sampleLabels])
    const [isLabelFormOpen, setIsLabelFormOpen] = useState(false)
    const [labelColor, setLabelColor] = useState<ExtendedColorType>("blue")

    const activeLabels = labels.filter(l => l.checked)
    const inactiveLabels = labels.filter(l => !l.checked)

    return (
      <Flex direction="column" gap="6" align="center" style={{ maxWidth: "500px" }}>
        <Text size="4" weight="bold">
          Project Label Management
        </Text>

        {/* Statistics */}
        <Flex gap="4" wrap="wrap" justify="center">
          <Box
            style={{
              padding: "12px 16px",
              backgroundColor: "var(--blue-2)",
              borderRadius: "8px",
              textAlign: "center",
              minWidth: "100px",
            }}
          >
            <Text size="3" weight="bold" color="blue">
              {labels.length}
            </Text>
            <Text size="1" color="blue">
              Total Labels
            </Text>
          </Box>

          <Box
            style={{
              padding: "12px 16px",
              backgroundColor: "var(--green-2)",
              borderRadius: "8px",
              textAlign: "center",
              minWidth: "100px",
            }}
          >
            <Text size="3" weight="bold" color="green">
              {activeLabels.length}
            </Text>
            <Text size="1" color="green">
              Active
            </Text>
          </Box>

          <Box
            style={{
              padding: "12px 16px",
              backgroundColor: "var(--gray-3)",
              borderRadius: "8px",
              textAlign: "center",
              minWidth: "100px",
            }}
          >
            <Text size="3" weight="bold" color="gray">
              {inactiveLabels.length}
            </Text>
            <Text size="1" color="gray">
              Inactive
            </Text>
          </Box>
        </Flex>

        {/* Label Manager */}
        <ComboBox
          mode="stateful"
          options={labels}
          defaultValue={labels}
          onValueChange={setLabels as any}
          title="Project Labels"
          placeholder="Manage project labels"
          addNewLabel={true}
          isLabelFormOpen={isLabelFormOpen}
          setIsLabelFormOpen={setIsLabelFormOpen}
          labelColor={labelColor}
          setLabelColor={setLabelColor}
        />

        {/* Active Labels Display */}
        {activeLabels.length > 0 && (
          <Box
            style={{
              width: "100%",
              padding: "16px",
              backgroundColor: "var(--gray-2)",
              borderRadius: "8px",
            }}
          >
            <Text size="3" weight="medium" style={{ marginBottom: "12px", display: "block" }}>
              Currently Active Labels:
            </Text>

            <Flex wrap="wrap" gap="2">
              {activeLabels.map((label) => (
                <Box
                  key={label.value}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: `var(--${label.color}-9)`,
                    color: "white",
                    borderRadius: "16px",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  {label.label}
                </Box>
              ))}
            </Flex>
          </Box>
        )}
      </Flex>
    )
  },
}

// Interactive playground
export const InteractivePlayground: Story = {
  args: {},
  render: () => {
    const [labels, setLabels] = useState([...sampleLabels])
    const [showTitle, setShowTitle] = useState(true)
    const [enableAddNew, setEnableAddNew] = useState(false)
    const [useCustomButton, setUseCustomButton] = useState(false)
    const [isLabelFormOpen, setIsLabelFormOpen] = useState(false)
    const [labelColor, setLabelColor] = useState<ExtendedColorType>("blue")

    return (
      <Flex direction="column" gap="6" align="center" style={{ maxWidth: "500px" }}>
        <Text size="4" weight="bold">
          Interactive ListComboBox
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

          <Flex direction="column" gap="3">
            <Flex align="center" gap="2">
            <Checkbox
                checked={showTitle}
                onCheckedChange={setShowTitle}
              />
              <Text size="2">Show Title</Text>
            </Flex>
              <Flex align="center" gap="2">
            <Checkbox
                checked={enableAddNew}
                onCheckedChange={setEnableAddNew}
              />
              <Text size="2">Enable Add New Labels</Text>
            </Flex>
            <Checkbox
              checked={useCustomButton}
              onCheckedChange={setUseCustomButton}
            >
              <Text size="2">Use Custom Button Style</Text>
            </Checkbox>
          </Flex>
        </Box>

        {/* ListComboBox */}
        <ComboBox
          mode="stateful"
          options={labels}
          defaultValue={labels}
          onValueChange={setLabels as any}
          title={showTitle ? "Interactive Labels" : undefined}
          placeholder="Configure and test the component..."
          addNewLabel={enableAddNew}
          isLabelFormOpen={isLabelFormOpen}
          setIsLabelFormOpen={setIsLabelFormOpen}
          labelColor={labelColor}
          setLabelColor={setLabelColor}
          btnClassName={useCustomButton ? "bg-purple-500 hover:bg-purple-600 text-white" : undefined}
        />

        {/* Results */}
        <Box
          style={{
            width: "100%",
            padding: "16px",
            backgroundColor: "var(--gray-2)",
            borderRadius: "8px",
          }}
        >
          <Text size="2" weight="medium">
            Label Summary:
          </Text>
          <Text size="2" color="gray" style={{ marginTop: "4px", display: "block" }}>
            Total: {labels.length} | Active: {labels.filter(l => l.checked).length} | Inactive: {labels.filter(l => !l.checked).length}
          </Text>

          {labels.filter(l => l.checked).length > 0 && (
            <>
              <Text size="2" weight="medium" style={{ marginTop: "8px", display: "block" }}>
                Active Labels:
              </Text>
              <Text size="2" color="gray">
                {labels.filter(l => l.checked).map(l => l.label).join(", ")}
              </Text>
            </>
          )}
        </Box>
      </Flex>
    )
  },
}
