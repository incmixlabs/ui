import type { Meta, StoryObj } from "@storybook/react-vite"
import React, { useState } from "react"
import { Theme, Box, Text, Flex } from "../../src/1base"
import { LabelDropdownSelector, type LabelOption } from "../../src/2elements/dropdown-select"
import {
  AlertCircle,
  Clock,
  Flag,
  CheckCircle2,
  Circle,
  Timer,
  Zap,
  ArrowUp,
  ArrowDown,
  Minus,
  User,
  Mail,
  Settings,
  Star
} from "lucide-react"

const meta: Meta<typeof LabelDropdownSelector> = {
  title: "2 Elements/DropdownSelect",
  component: LabelDropdownSelector,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ padding: "20px", minWidth: "300px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
  argTypes: {
    options: {
      control: false,
      description: "Array of LabelOption objects to display",
    },
    value: {
      control: "text",
      description: "Currently selected value (option id)",
    },
    onValueChange: {
      action: "value-changed",
      description: "Callback when selected value changes",
    },
    icon: {
      control: false,
      description: "Lucide icon component to display",
    },
    renderIcon: {
      control: false,
      description: "Custom function to render icons for each option",
    },
    showColorDot: {
      control: "boolean",
      description: "Whether to show color dots for options",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the container",
    },
    triggerClassName: {
      control: "text",
      description: "Additional CSS classes for the trigger button",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no option is selected",
    },
    disabled: {
      control: "boolean",
      description: "Whether the dropdown is disabled",
    },
    getOptionLabel: {
      control: false,
      description: "Custom function to format option labels",
    },
    valueLabel: {
      control: "text",
      description: "Custom label for the selected value display",
    },
  },
  args: {
    placeholder: "Select an option...",
    disabled: false,
    showColorDot: true,
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Sample data for different use cases
const statusOptions: LabelOption[] = [
  {
    id: "backlog",
    name: "Backlog",
    type: "status",
    color: "#64748b",
    description: "Tasks that are planned but not yet started",
    order: 1,
  },
  {
    id: "todo",
    name: "To Do",
    type: "status",
    color: "#94a3b8",
    description: "Tasks ready to be worked on",
    order: 2,
  },
  {
    id: "in-progress",
    name: "In Progress",
    type: "status",
    color: "#3b82f6",
    description: "Tasks currently being worked on",
    order: 3,
  },
  {
    id: "in-review",
    name: "In Review",
    type: "status",
    color: "#f59e0b",
    description: "Tasks waiting for review",
    order: 4,
  },
  {
    id: "done",
    name: "Done",
    type: "status",
    color: "#10b981",
    description: "Completed tasks",
    order: 5,
  },
  {
    id: "cancelled",
    name: "Cancelled",
    type: "status",
    color: "#ef4444",
    description: "Cancelled or rejected tasks",
    order: 6,
  },
]

const priorityOptions: LabelOption[] = [
  {
    id: "lowest",
    name: "Lowest",
    type: "priority",
    color: "#06b6d4",
    description: "Nice to have features",
    order: 1,
  },
  {
    id: "low",
    name: "Low",
    type: "priority",
    color: "#10b981",
    description: "Low priority tasks",
    order: 2,
  },
  {
    id: "medium",
    name: "Medium",
    type: "priority",
    color: "#f59e0b",
    description: "Standard priority",
    order: 3,
  },
  {
    id: "high",
    name: "High",
    type: "priority",
    color: "#f97316",
    description: "Important tasks",
    order: 4,
  },
  {
    id: "critical",
    name: "Critical",
    type: "priority",
    color: "#ef4444",
    description: "Urgent and important",
    order: 5,
  },
]

const categoryOptions: LabelOption[] = [
  {
    id: "feature",
    name: "Feature",
    type: "status",
    color: "#8b5cf6",
    description: "New feature development",
    order: 1,
  },
  {
    id: "bug",
    name: "Bug Fix",
    type: "status",
    color: "#ef4444",
    description: "Bug fixes and issues",
    order: 2,
  },
  {
    id: "improvement",
    name: "Improvement",
    type: "status",
    color: "#06b6d4",
    description: "Enhancements to existing features",
    order: 3,
  },
  {
    id: "documentation",
    name: "Documentation",
    type: "status",
    color: "#10b981",
    description: "Documentation updates",
    order: 4,
  },
  {
    id: "refactor",
    name: "Refactoring",
    type: "status",
    color: "#f59e0b",
    description: "Code refactoring and cleanup",
    order: 5,
  },
]

// Basic usage example
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string>("")

    return (
      <Flex direction="column" gap="4" align="start">
        <Text size="3" weight="medium">
          Task Status Selector
        </Text>

        <LabelDropdownSelector
          options={statusOptions}
          value={value}
          onValueChange={setValue}
          placeholder="Select task status..."
          icon={Circle}
        />

        {value && (
          <Box
            style={{
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              border: "1px solid var(--gray-6)",
            }}
          >
            <Text size="2" weight="medium">
              Selected Status
            </Text>
            <Text size="2" color="gray" style={{ marginTop: "4px" }}>
              {statusOptions.find(opt => opt.id === value)?.name} ({value})
            </Text>
            <Text size="1" color="gray" style={{ marginTop: "2px" }}>
              {statusOptions.find(opt => opt.id === value)?.description}
            </Text>
          </Box>
        )}
      </Flex>
    )
  },
}

// Priority selector with pre-selected value
export const PrioritySelector: Story = {
  render: () => {
    const [value, setValue] = useState<string>("medium")

    return (
      <Flex direction="column" gap="4" align="start">
        <Text size="3" weight="medium">
          Priority Selector (Pre-selected)
        </Text>

        <LabelDropdownSelector
          options={priorityOptions}
          value={value}
          onValueChange={setValue}
          placeholder="Select priority..."
          icon={Flag}
        />

        <Text size="2" color="gray">
          This selector starts with "Medium" pre-selected
        </Text>
      </Flex>
    )
  },
}

// Custom icon rendering for each option
export const CustomIconRendering: Story = {
  render: () => {
    const [value, setValue] = useState<string>("")

    const renderCustomIcon = (option: LabelOption) => {
      const iconMap: Record<string, React.ComponentType> = {
        backlog: Minus,
        todo: Circle,
        "in-progress": Timer,
        "in-review": Clock,
        done: CheckCircle2,
        cancelled: AlertCircle,
      }

      const IconComponent = iconMap[option.id] || Circle

      return <IconComponent className="h-4 w-4" style={{ color: option.color }} />
    }

    return (
      <Flex direction="column" gap="4" align="start">
        <Text size="3" weight="medium">
          Custom Icon Rendering
        </Text>

        <LabelDropdownSelector
          options={statusOptions}
          value={value}
          onValueChange={setValue}
          placeholder="Select status with custom icons..."
          renderIcon={renderCustomIcon}
        />

        <Text size="2" color="gray">
          Each status has a unique icon
        </Text>
      </Flex>
    )
  },
}

// Without color dots
export const WithoutColorDots: Story = {
  render: () => {
    const [value, setValue] = useState<string>("feature")

    return (
      <Flex direction="column" gap="4" align="start">
        <Text size="3" weight="medium">
          Category Selector (No Color Dots)
        </Text>

        <LabelDropdownSelector
          options={categoryOptions}
          value={value}
          onValueChange={setValue}
          placeholder="Select category..."
          showColorDot={false}
          icon={Star}
        />

        <Text size="2" color="gray">
          Color dots are hidden, showing only the icon and text
        </Text>
      </Flex>
    )
  },
}

// Custom option labeling
export const CustomOptionLabeling: Story = {
  render: () => {
    const [value, setValue] = useState<string>("")

    const customGetOptionLabel = (option: LabelOption) => {
      return `${option.name} - ${option.type.toUpperCase()}`
    }

    const allOptions = [...statusOptions, ...priorityOptions]

    return (
      <Flex direction="column" gap="4" align="start">
        <Text size="3" weight="medium">
          Custom Option Labels
        </Text>

        <LabelDropdownSelector
          options={allOptions}
          value={value}
          onValueChange={setValue}
          placeholder="Select any option..."
          getOptionLabel={customGetOptionLabel}
          icon={Settings}
        />

        <Text size="2" color="gray">
          Options display name and type (e.g., "In Progress - STATUS")
        </Text>

        {value && (
          <Box
            style={{
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              border: "1px solid var(--gray-6)",
            }}
          >
            <Text size="2" weight="medium">
              Selected: {allOptions.find(opt => opt.id === value)?.name}
            </Text>
            <Text size="2" color="gray">
              Type: {allOptions.find(opt => opt.id === value)?.type}
            </Text>
          </Box>
        )}
      </Flex>
    )
  },
}

// Custom value label
export const CustomValueLabel: Story = {
  render: () => {
    const [value, setValue] = useState<string>("high")

    const selectedOption = priorityOptions.find(opt => opt.id === value)
    const customValueLabel = selectedOption ? `Priority: ${selectedOption.name}` : undefined

    return (
      <Flex direction="column" gap="4" align="start">
        <Text size="3" weight="medium">
          Custom Value Label Display
        </Text>

        <LabelDropdownSelector
          options={priorityOptions}
          value={value}
          onValueChange={setValue}
          placeholder="Select priority..."
          valueLabel={customValueLabel}
          icon={Flag}
        />

        <Text size="2" color="gray">
          The selected value shows as "Priority: High" instead of just "High"
        </Text>
      </Flex>
    )
  },
}

// Disabled state
export const DisabledState: Story = {
  render: () => {
    const [value, setValue] = useState<string>("done")

    return (
      <Flex direction="column" gap="4" align="start">
        <Text size="3" weight="medium">
          Disabled Dropdown
        </Text>

        <LabelDropdownSelector
          options={statusOptions}
          value={value}
          onValueChange={setValue}
          placeholder="This is disabled..."
          disabled={true}
          icon={Circle}
        />

        <Text size="2" color="gray">
          This dropdown is disabled and cannot be changed
        </Text>
      </Flex>
    )
  },
}

// Custom styling
export const CustomStyling: Story = {
  render: () => {
    const [value, setValue] = useState<string>("")

    return (
      <Flex direction="column" gap="4" align="start">
        <Text size="3" weight="medium">
          Custom Styled Dropdown
        </Text>

        <LabelDropdownSelector
          options={priorityOptions}
          value={value}
          onValueChange={setValue}
          placeholder="Styled dropdown..."
          className="border-2 border-blue-200 rounded-lg shadow-md"
          triggerClassName="bg-blue-50 hover:bg-blue-100 text-blue-900 font-medium"
          icon={Flag}
        />

        <Text size="2" color="gray">
          Custom border, background, and text styling
        </Text>
      </Flex>
    )
  },
}

// Side by side comparison
export const SideBySideComparison: Story = {
  render: () => {
    const [statusValue, setStatusValue] = useState<string>("in-progress")
    const [priorityValue, setPriorityValue] = useState<string>("high")
    const [categoryValue, setCategoryValue] = useState<string>("feature")

    return (
      <Flex direction="column" gap="6" align="start">
        <Text size="4" weight="bold">
          Task Management Dashboard
        </Text>

        <Flex direction="row" gap="4" align="start" wrap="wrap">
          <Flex direction="column" gap="2" align="start">
            <Text size="2" weight="medium" color="gray">Status</Text>
            <LabelDropdownSelector
              options={statusOptions}
              value={statusValue}
              onValueChange={setStatusValue}
              placeholder="Select status..."
              icon={Circle}
            />
          </Flex>

          <Flex direction="column" gap="2" align="start">
            <Text size="2" weight="medium" color="gray">Priority</Text>
            <LabelDropdownSelector
              options={priorityOptions}
              value={priorityValue}
              onValueChange={setPriorityValue}
              placeholder="Select priority..."
              icon={Flag}
            />
          </Flex>

          <Flex direction="column" gap="2" align="start">
            <Text size="2" weight="medium" color="gray">Category</Text>
            <LabelDropdownSelector
              options={categoryOptions}
              value={categoryValue}
              onValueChange={setCategoryValue}
              placeholder="Select category..."
              icon={Star}
            />
          </Flex>
        </Flex>

        <Box
          style={{
            padding: "16px",
            borderRadius: "8px",
            backgroundColor: "var(--gray-2)",
            border: "1px solid var(--gray-6)",
            minWidth: "300px",
          }}
        >
          <Text size="3" weight="medium" style={{ marginBottom: "8px", display: "block" }}>
            Current Selection
          </Text>
          <Text size="2" color="gray">
            Status: {statusOptions.find(opt => opt.id === statusValue)?.name || "None"}
          </Text>
          <Text size="2" color="gray">
            Priority: {priorityOptions.find(opt => opt.id === priorityValue)?.name || "None"}
          </Text>
          <Text size="2" color="gray">
            Category: {categoryOptions.find(opt => opt.id === categoryValue)?.name || "None"}
          </Text>
        </Box>
      </Flex>
    )
  },
}

// Showcase all features
export const FeatureShowcase: Story = {
  render: () => {
    const [value, setValue] = useState<string>("")
    const [showColorDot, setShowColorDot] = useState(true)
    const [disabled, setDisabled] = useState(false)
    const [customLabels, setCustomLabels] = useState(false)

    const getOptionLabel = customLabels
      ? (option: LabelOption) => `${option.name} (${option.type})`
      : undefined

    return (
      <Flex direction="column" gap="6" align="start" style={{ maxWidth: "400px" }}>
        <Text size="4" weight="bold">
          Interactive Feature Showcase
        </Text>

        {/* Configuration Panel */}
        <Box
          style={{
            padding: "16px",
            backgroundColor: "var(--gray-2)",
            borderRadius: "8px",
            border: "1px solid var(--gray-6)",
            width: "100%",
          }}
        >
          <Text size="3" weight="medium" style={{ marginBottom: "12px", display: "block" }}>
            Configuration Options
          </Text>

          <Flex direction="column" gap="3">
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                checked={showColorDot}
                onChange={(e) => setShowColorDot(e.target.checked)}
                style={{ accentColor: "var(--blue-9)" }}
              />
              <Text size="2">Show Color Dots</Text>
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
                style={{ accentColor: "var(--blue-9)" }}
              />
              <Text size="2">Disabled State</Text>
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                checked={customLabels}
                onChange={(e) => setCustomLabels(e.target.checked)}
                style={{ accentColor: "var(--blue-9)" }}
              />
              <Text size="2">Custom Labels</Text>
            </label>
          </Flex>
        </Box>

        {/* Dropdown */}
        <LabelDropdownSelector
          options={statusOptions}
          value={value}
          onValueChange={setValue}
          placeholder="Try the interactive dropdown..."
          showColorDot={showColorDot}
          disabled={disabled}
          getOptionLabel={getOptionLabel}
          icon={Settings}
        />

        {/* Results */}
        <Box
          style={{
            width: "100%",
            padding: "16px",
            backgroundColor: "var(--gray-2)",
            borderRadius: "8px",
            border: "1px solid var(--gray-6)",
          }}
        >
          <Text size="2" weight="medium">
            Selection Result
          </Text>
          <Text size="2" color="gray" style={{ marginTop: "4px", display: "block" }}>
            {value ? (
              <>
                Value: {value}<br />
                Label: {statusOptions.find(opt => opt.id === value)?.name}<br />
                Type: {statusOptions.find(opt => opt.id === value)?.type}<br />
                Color: {statusOptions.find(opt => opt.id === value)?.color}
              </>
            ) : (
              "No selection made"
            )}
          </Text>
        </Box>

        <Text size="2" color="gray">
          Interact with the controls above to see how different props affect the dropdown behavior and appearance.
        </Text>
      </Flex>
    )
  },
}
