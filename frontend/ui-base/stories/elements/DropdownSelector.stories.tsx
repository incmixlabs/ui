import type { Meta, StoryObj } from "@storybook/react-vite"
import "../../src/styles/index.css"
import React, { useState } from "react"
import { Theme, Box, Text, Flex } from "../../src/base"
import { LabelDropdownSelector, type LabelOption } from "../../src/elements/dropdown-selector"
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
  Minus
} from "lucide-react"

const meta: Meta<typeof LabelDropdownSelector> = {
  title: "Elements/DropdownSelector",
  component: LabelDropdownSelector,
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
      description: "Placeholder text when no option is selected",
    },
    disabled: {
      control: "boolean",
      description: "Whether the dropdown is disabled",
    },
    showColorDot: {
      control: "boolean",
      description: "Whether to show color dots for options",
    },
    valueLabel: {
      control: "text",
      description: "Custom label for the selected value",
    },
    onValueChange: {
      action: "value-changed",
      description: "Callback when selected value changes",
    },
  },
  args: {
    placeholder: "Select...",
    disabled: false,
    showColorDot: true,
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Sample status options
const statusOptions: LabelOption[] = [
  {
    id: "todo",
    name: "To Do",
    type: "status",
    color: "#94a3b8",
    order: 1,
  },
  {
    id: "in-progress",
    name: "In Progress",
    type: "status",
    color: "#3b82f6",
    order: 2,
  },
  {
    id: "in-review",
    name: "In Review",
    type: "status",
    color: "#f59e0b",
    order: 3,
  },
  {
    id: "completed",
    name: "Completed",
    type: "status",
    color: "#10b981",
    order: 4,
  },
  {
    id: "cancelled",
    name: "Cancelled",
    type: "status",
    color: "#ef4444",
    order: 5,
  },
]

// Sample priority options
const priorityOptions: LabelOption[] = [
  {
    id: "low",
    name: "Low",
    type: "priority",
    color: "#10b981",
    order: 1,
  },
  {
    id: "medium",
    name: "Medium",
    type: "priority",
    color: "#f59e0b",
    order: 2,
  },
  {
    id: "high",
    name: "High",
    type: "priority",
    color: "#f97316",
    order: 3,
  },
  {
    id: "urgent",
    name: "Urgent",
    type: "priority",
    color: "#ef4444",
    order: 4,
  },
]

// Default story - Status Selector
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string>("")

    return (
      <Flex direction="column" gap="4" align="center">
        <LabelDropdownSelector
          options={statusOptions}
          value={value}
          onValueChange={setValue}
          placeholder="Select status..."
        />
        
        {value && (
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
              Selected: {statusOptions.find(opt => opt.id === value)?.name}
            </Text>
          </Box>
        )}
      </Flex>
    )
  },
}

// Priority Selector
export const PrioritySelector: Story = {
  render: () => {
    const [value, setValue] = useState<string>("medium")

    return (
      <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Task Priority
        </Text>
        
        <LabelDropdownSelector
          options={priorityOptions}
          value={value}
          onValueChange={setValue}
          placeholder="Select priority..."
          icon={Flag}
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
          <Text size="2" color="gray">
            Current Priority:
          </Text>
          <Text size="2" weight="medium">
            {priorityOptions.find(opt => opt.id === value)?.name || "None"}
          </Text>
        </Box>
      </Flex>
    )
  },
}

// With Custom Icons
export const WithCustomIcons: Story = {
  render: () => {
    const [value, setValue] = useState<string>("")

    const customRenderIcon = (option: LabelOption) => {
      const iconMap: Record<string, React.ComponentType> = {
        todo: Circle,
        "in-progress": Timer,
        "in-review": Clock,
        completed: CheckCircle2,
        cancelled: AlertCircle,
      }
      
      const IconComponent = iconMap[option.id] || Circle
      
      return <IconComponent className="h-4 w-4" style={{ color: option.color }} />
    }

    return (
      <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Status with Custom Icons
        </Text>
        
        <LabelDropdownSelector
          options={statusOptions}
          value={value}
          onValueChange={setValue}
          placeholder="Select status..."
          renderIcon={customRenderIcon}
        />
        
        {value && (
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
              Selected: {statusOptions.find(opt => opt.id === value)?.name}
            </Text>
            <Text size="1" color="gray">
              ID: {value}
            </Text>
          </Box>
        )}
      </Flex>
    )
  },
}

// Without Color Dots
export const WithoutColorDots: Story = {
  render: () => {
    const [value, setValue] = useState<string>("in-progress")

    return (
      <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Clean Status Selector (No Color Dots)
        </Text>
        
        <LabelDropdownSelector
          options={statusOptions}
          value={value}
          onValueChange={setValue}
          placeholder="Select status..."
          showColorDot={false}
          icon={Circle}
        />
        
        <Text size="2" color="gray">
          Color dots are hidden in this example
        </Text>
      </Flex>
    )
  },
}

// Custom Value Label
export const CustomValueLabel: Story = {
  render: () => {
    const [value, setValue] = useState<string>("high")

    const selectedOption = priorityOptions.find(opt => opt.id === value)
    const customLabel = selectedOption ? `Priority: ${selectedOption.name}` : undefined

    return (
      <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Custom Value Label
        </Text>
        
        <LabelDropdownSelector
          options={priorityOptions}
          value={value}
          onValueChange={setValue}
          placeholder="Select priority..."
          valueLabel={customLabel}
          icon={Flag}
        />
        
        <Text size="2" color="gray">
          The trigger shows custom formatted text
        </Text>
      </Flex>
    )
  },
}

// Custom Styling
export const CustomStyling: Story = {
  render: () => {
    const [value, setValue] = useState<string>("")

    return (
      <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Custom Styled Dropdown
        </Text>
        
        <LabelDropdownSelector
          options={statusOptions}
          value={value}
          onValueChange={setValue}
          placeholder="Choose status..."
          className="border-2 border-blue-200 hover:border-blue-300"
          triggerClassName="bg-blue-50 hover:bg-blue-100 text-blue-900"
        />
        
        <Text size="2" color="gray">
          Custom border and background colors
        </Text>
      </Flex>
    )
  },
}

// Disabled State
export const DisabledState: Story = {
  render: () => {
    const [value, setValue] = useState<string>("completed")

    return (
      <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Disabled Dropdown
        </Text>
        
        <LabelDropdownSelector
          options={statusOptions}
          value={value}
          onValueChange={setValue}
          placeholder="Select status..."
          disabled={true}
        />
        
        <Text size="2" color="gray">
          This dropdown is disabled and cannot be changed
        </Text>
      </Flex>
    )
  },
}

// Custom Option Label Function
export const CustomOptionLabels: Story = {
  render: () => {
    const [value, setValue] = useState<string>("")

    const customGetOptionLabel = (option: LabelOption) => {
      return `${option.name} (${option.type})`
    }

    return (
      <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Custom Option Labels
        </Text>
        
        <LabelDropdownSelector
          options={[...statusOptions, ...priorityOptions]}
          value={value}
          onValueChange={setValue}
          placeholder="Select any option..."
          getOptionLabel={customGetOptionLabel}
        />
        
        <Text size="2" color="gray">
          Options show both name and type
        </Text>
        
        {value && (
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
              Selected: {[...statusOptions, ...priorityOptions].find(opt => opt.id === value)?.name}
            </Text>
          </Box>
        )}
      </Flex>
    )
  },
}

// Multiple Selectors Side by Side
export const MultipleSideBySide: Story = {
  render: () => {
    const [statusValue, setStatusValue] = useState<string>("in-progress")
    const [priorityValue, setPriorityValue] = useState<string>("high")

    return (
      <Flex direction="column" gap="6" align="center">
        <Text size="4" weight="bold">
          Task Management
        </Text>
        
        <Flex direction="row" gap="4" align="center">
          <Flex direction="column" gap="2" align="center">
            <Text size="2" weight="medium">Status</Text>
            <LabelDropdownSelector
              options={statusOptions}
              value={statusValue}
              onValueChange={setStatusValue}
              placeholder="Select status..."
              icon={Circle}
            />
          </Flex>
          
          <Flex direction="column" gap="2" align="center">
            <Text size="2" weight="medium">Priority</Text>
            <LabelDropdownSelector
              options={priorityOptions}
              value={priorityValue}
              onValueChange={setPriorityValue}
              placeholder="Select priority..."
              icon={Flag}
            />
          </Flex>
        </Flex>
        
        <Box
          style={{
            padding: "16px",
            borderRadius: "8px",
            backgroundColor: "var(--gray-2)",
            textAlign: "center",
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
        </Box>
      </Flex>
    )
  },
}

// Interactive Playground
export const InteractivePlayground: Story = {
  render: () => {
    const [value, setValue] = useState<string>("")
    const [showColorDot, setShowColorDot] = useState(true)
    const [disabled, setDisabled] = useState(false)
    const [optionType, setOptionType] = useState<"status" | "priority">("status")
    const [customPlaceholder, setCustomPlaceholder] = useState("Select an option...")

    const currentOptions = optionType === "status" ? statusOptions : priorityOptions

    return (
      <Flex direction="column" gap="6" align="center" style={{ maxWidth: "400px" }}>
        <Text size="4" weight="bold">
          Interactive Dropdown Selector
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
            <Flex direction="row" gap="2" align="center">
              <Text size="2" style={{ minWidth: "80px" }}>Type:</Text>
              <select
                value={optionType}
                onChange={(e) => {
                  setOptionType(e.target.value as "status" | "priority")
                  setValue("") // Reset selection when changing type
                }}
                style={{
                  padding: "4px 8px",
                  borderRadius: "4px",
                  border: "1px solid var(--gray-6)",
                  backgroundColor: "var(--gray-1)",
                  flex: 1,
                }}
              >
                <option value="status">Status Options</option>
                <option value="priority">Priority Options</option>
              </select>
            </Flex>
            
            <Flex direction="row" gap="2" align="center">
              <Text size="2" style={{ minWidth: "80px" }}>Placeholder:</Text>
              <input
                type="text"
                value={customPlaceholder}
                onChange={(e) => setCustomPlaceholder(e.target.value)}
                style={{
                  padding: "4px 8px",
                  borderRadius: "4px",
                  border: "1px solid var(--gray-6)",
                  backgroundColor: "var(--gray-1)",
                  flex: 1,
                }}
              />
            </Flex>
            
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                checked={showColorDot}
                onChange={(e) => setShowColorDot(e.target.checked)}
              />
              <Text size="2">Show Color Dots</Text>
            </label>
            
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
              />
              <Text size="2">Disabled</Text>
            </label>
          </Flex>
        </Box>

        {/* Dropdown */}
        <LabelDropdownSelector
          options={currentOptions}
          value={value}
          onValueChange={setValue}
          placeholder={customPlaceholder}
          showColorDot={showColorDot}
          disabled={disabled}
          icon={optionType === "status" ? Circle : Flag}
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
            Selected Value:
          </Text>
          <Text size="2" color="gray" style={{ marginTop: "4px", display: "block" }}>
            {value ? `${currentOptions.find(opt => opt.id === value)?.name} (${value})` : "None selected"}
          </Text>
        </Box>
      </Flex>
    )
  },
}