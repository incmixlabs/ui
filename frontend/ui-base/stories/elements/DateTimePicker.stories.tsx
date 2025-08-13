import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Theme, Box, Text, Flex, Card, Button } from "../../src/base"
import { SmartDatetimeInput } from "../../src/elements/dates/datetime-picker"

const meta: Meta<typeof SmartDatetimeInput> = {
  title: "Elements/DateTimePicker",
  component: SmartDatetimeInput,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ padding: "20px", minWidth: "400px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
  argTypes: {
    value: {
      control: false,
      description: "Currently selected date and time",
    },
    onValueChange: {
      action: "datetime-changed",
      description: "Callback when date/time changes",
    },
    showCalendar: {
      control: "boolean",
      description: "Show calendar component",
    },
    showTimePicker: {
      control: "boolean", 
      description: "Show time picker component",
    },
    removeInput: {
      control: "boolean",
      description: "Hide the natural language input field",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for natural language input",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    className: {
      control: "text", 
      description: "Additional CSS classes",
    },
  },
  args: {
    showCalendar: true,
    showTimePicker: true,
    removeInput: false,
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default datetime picker with both calendar and time
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState<Date>()

    return (
      <Flex direction="column" gap="4" align="start">
        <Text size="3" weight="medium">
          Smart DateTime Picker
        </Text>
        
        <SmartDatetimeInput
          {...args}
          value={value}
          onValueChange={setValue}
          placeholder='Try "tomorrow at 3pm" or "next Monday 9:30am"'
        />
        
        {value && (
          <Box
            style={{
              padding: "16px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              border: "1px solid var(--gray-6)",
              width: "100%",
            }}
          >
            <Text size="2" weight="medium">
              Selected Date & Time
            </Text>
            <Text size="2" color="gray" style={{ marginTop: "4px" }}>
              {value.toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
              })}
            </Text>
            <Text size="1" color="gray" style={{ marginTop: "2px" }}>
              ISO: {value.toISOString()}
            </Text>
          </Box>
        )}
      </Flex>
    )
  },
}

// Date only picker (no time)
export const DateOnly: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date>()

    return (
      <Flex direction="column" gap="4" align="start">
        <Text size="3" weight="medium">
          Date Only Picker
        </Text>
        
        <SmartDatetimeInput
          value={value}
          onValueChange={setValue}
          showCalendar={true}
          showTimePicker={false}
          placeholder='Try "next Friday" or "December 25"'
        />
        
        <Text size="2" color="gray">
          Only the calendar is shown, no time selection
        </Text>
        
        {value && (
          <Box
            style={{
              padding: "12px",
              backgroundColor: "var(--gray-2)",
              borderRadius: "6px",
              border: "1px solid var(--gray-6)",
            }}
          >
            <Text size="2">
              Selected: {value.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
          </Box>
        )}
      </Flex>
    )
  },
}

// Time only picker (no calendar)
export const TimeOnly: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date>()

    return (
      <Flex direction="column" gap="4" align="start">
        <Text size="3" weight="medium">
          Time Only Picker
        </Text>
        
        <SmartDatetimeInput
          value={value}
          onValueChange={setValue}
          showCalendar={false}
          showTimePicker={true}
          placeholder='Try "3:30pm" or "in 2 hours"'
        />
        
        <Text size="2" color="gray">
          Only the time picker is shown, no date selection
        </Text>
        
        {value && (
          <Box
            style={{
              padding: "12px",
              backgroundColor: "var(--gray-2)",
              borderRadius: "6px",
              border: "1px solid var(--gray-6)",
            }}
          >
            <Text size="2">
              Selected: {value.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              })}
            </Text>
          </Box>
        )}
      </Flex>
    )
  },
}

// Without natural language input
export const WithoutInput: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date>()

    return (
      <Flex direction="column" gap="4" align="start">
        <Text size="3" weight="medium">
          DateTime Picker (UI Only)
        </Text>
        
        <SmartDatetimeInput
          value={value}
          onValueChange={setValue}
          removeInput={true}
        />
        
        <Text size="2" color="gray">
          Natural language input is hidden - use only the visual controls
        </Text>
        
        {value && (
          <Box
            style={{
              padding: "12px",
              backgroundColor: "var(--gray-2)",
              borderRadius: "6px",
              border: "1px solid var(--gray-6)",
            }}
          >
            <Text size="2">
              Selected: {value.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              })}
            </Text>
          </Box>
        )}
      </Flex>
    )
  },
}

// Pre-selected datetime
export const PreSelected: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date>(() => {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(14, 30, 0, 0) // 2:30 PM
      return tomorrow
    })

    return (
      <Flex direction="column" gap="4" align="start">
        <Text size="3" weight="medium">
          Pre-selected DateTime (Tomorrow 2:30 PM)
        </Text>
        
        <SmartDatetimeInput
          value={value}
          onValueChange={setValue}
          placeholder="Modify the pre-selected time..."
        />
        
        <Text size="2" color="gray">
          This picker starts with tomorrow at 2:30 PM selected
        </Text>
      </Flex>
    )
  },
}

// Disabled state
export const Disabled: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date>(new Date())

    return (
      <Flex direction="column" gap="4" align="start">
        <Text size="3" weight="medium">
          Disabled DateTime Picker
        </Text>
        
        <SmartDatetimeInput
          value={value}
          onValueChange={setValue}
          disabled={true}
          placeholder="This input is disabled..."
        />
        
        <Text size="2" color="gray">
          The input field is disabled but calendar/time picker still work
        </Text>
      </Flex>
    )
  },
}

// Meeting scheduler example
export const MeetingScheduler: Story = {
  render: () => {
    const [meetingData, setMeetingData] = React.useState({
      start: undefined as Date | undefined,
      end: undefined as Date | undefined,
      title: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      console.log('Meeting scheduled:', meetingData)
    }

    return (
      <Card.Root style={{ width: "500px" }}>
        <Card.Header>
          <Card.Title>Schedule Meeting</Card.Title>
          <Card.Description>
            Set up a new meeting with date and time
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="4">
              <Flex direction="column" gap="2">
                <Text size="2" weight="medium">Meeting Title</Text>
                <input
                  type="text"
                  value={meetingData.title}
                  onChange={(e) => setMeetingData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter meeting title..."
                  style={{
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid var(--gray-6)",
                    backgroundColor: "var(--gray-1)",
                  }}
                />
              </Flex>
              
              <Flex direction="column" gap="2">
                <Text size="2" weight="medium">Start Time</Text>
                <SmartDatetimeInput
                  value={meetingData.start}
                  onValueChange={(date) => setMeetingData(prev => ({ ...prev, start: date }))}
                  placeholder='e.g. "tomorrow at 10am"'
                />
              </Flex>
              
              <Flex direction="column" gap="2">
                <Text size="2" weight="medium">End Time</Text>
                <SmartDatetimeInput
                  value={meetingData.end}
                  onValueChange={(date) => setMeetingData(prev => ({ ...prev, end: date }))}
                  placeholder='e.g. "tomorrow at 11am"'
                />
              </Flex>
            </Flex>
          </form>
        </Card.Content>
        <Card.Footer>
          <Flex direction="column" gap="3" style={{ width: "100%" }}>
            <Box
              style={{
                padding: "12px",
                backgroundColor: "var(--gray-2)",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            >
              <Text size="2" weight="medium" style={{ display: "block", marginBottom: "6px" }}>
                Meeting Summary:
              </Text>
              <Text size="1" color="gray">
                Title: {meetingData.title || "Untitled Meeting"}
              </Text>
              <Text size="1" color="gray">
                Start: {meetingData.start?.toLocaleString() || "Not set"}
              </Text>
              <Text size="1" color="gray">
                End: {meetingData.end?.toLocaleString() || "Not set"}
              </Text>
              <Text size="1" color="gray">
                Duration: {
                  meetingData.start && meetingData.end 
                    ? `${Math.round((meetingData.end.getTime() - meetingData.start.getTime()) / (1000 * 60))} minutes`
                    : "Unknown"
                }
              </Text>
            </Box>
            
            <Flex gap="2" justify="end">
              <Button 
                variant="outline" 
                onClick={() => setMeetingData({
                  start: undefined,
                  end: undefined,
                  title: "",
                })}
              >
                Reset
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!meetingData.title || !meetingData.start || !meetingData.end}
              >
                Schedule Meeting
              </Button>
            </Flex>
          </Flex>
        </Card.Footer>
      </Card.Root>
    )
  },
}

// Custom styling
export const CustomStyling: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date>()

    return (
      <Flex direction="column" gap="4" align="start">
        <Text size="3" weight="medium">
          Custom Styled DateTime Picker
        </Text>
        
        <SmartDatetimeInput
          value={value}
          onValueChange={setValue}
          placeholder="Custom styled picker..."
          className="border-2 border-purple-200 shadow-lg rounded-xl"
        />
        
        <Text size="2" color="gray">
          Custom border, shadow, and border radius
        </Text>
      </Flex>
    )
  },
}

// Natural language parsing examples
export const NaturalLanguageExamples: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date>()
    const [inputHistory, setInputHistory] = React.useState<Array<{input: string, result: Date}>>([])

    const examples = [
      "tomorrow at 9am",
      "next Monday 3:30pm",
      "in 2 hours",
      "December 25 at noon",
      "next Friday 5pm",
      "tomorrow night",
    ]

    const tryExample = (example: string) => {
      // This simulates what would happen when typing the example
      const simulatedDate = new Date()
      simulatedDate.setDate(simulatedDate.getDate() + 1)
      simulatedDate.setHours(9, 0, 0, 0)
      
      setValue(simulatedDate)
      setInputHistory(prev => [...prev.slice(-4), { input: example, result: simulatedDate }])
    }

    return (
      <Flex direction="column" gap="6" align="start" style={{ width: "100%" }}>
        <Text size="4" weight="bold">
          Natural Language Parsing Examples
        </Text>
        
        <SmartDatetimeInput
          value={value}
          onValueChange={(date) => {
            setValue(date)
            if (date) {
              setInputHistory(prev => [...prev.slice(-4), { input: "manual", result: date }])
            }
          }}
          placeholder="Try natural language input..."
        />
        
        <Flex direction="column" gap="3" style={{ width: "100%" }}>
          <Text size="2" weight="medium">Try these examples:</Text>
          <Flex gap="2" wrap="wrap">
            {examples.map((example) => (
              <Button
                key={example}
                size="1"
                variant="outline"
                onClick={() => tryExample(example)}
                style={{ fontSize: "12px" }}
              >
                "{example}"
              </Button>
            ))}
          </Flex>
        </Flex>
        
        {inputHistory.length > 0 && (
          <Box
            style={{
              width: "100%",
              padding: "16px",
              backgroundColor: "var(--gray-2)",
              borderRadius: "8px",
              border: "1px solid var(--gray-6)",
            }}
          >
            <Text size="2" weight="medium" style={{ marginBottom: "8px", display: "block" }}>
              Recent Inputs:
            </Text>
            {inputHistory.slice(-3).map((item, index) => (
              <Text key={index} size="1" color="gray" style={{ display: "block", marginBottom: "2px" }}>
                "{item.input}" → {item.result.toLocaleString()}
              </Text>
            ))}
          </Box>
        )}
      </Flex>
    )
  },
}

// Different modes comparison
export const ModeComparison: Story = {
  render: () => {
    const [values, setValues] = React.useState({
      both: undefined as Date | undefined,
      dateOnly: undefined as Date | undefined,
      timeOnly: undefined as Date | undefined,
    })

    return (
      <Flex direction="column" gap="6" align="start" style={{ width: "100%" }}>
        <Text size="4" weight="bold">
          Mode Comparison
        </Text>
        
        <Flex direction="column" gap="6" style={{ width: "100%" }}>
          <Flex direction="column" gap="3">
            <Text size="2" weight="medium">Both Date & Time (Default)</Text>
            <SmartDatetimeInput
              value={values.both}
              onValueChange={(date) => setValues(prev => ({ ...prev, both: date }))}
              showCalendar={true}
              showTimePicker={true}
              placeholder='e.g. "tomorrow at 3pm"'
            />
            <Text size="1" color="gray">
              Selected: {values.both?.toLocaleString() || "Nothing selected"}
            </Text>
          </Flex>
          
          <Flex direction="column" gap="3">
            <Text size="2" weight="medium">Date Only</Text>
            <SmartDatetimeInput
              value={values.dateOnly}
              onValueChange={(date) => setValues(prev => ({ ...prev, dateOnly: date }))}
              showCalendar={true}
              showTimePicker={false}
              placeholder='e.g. "next Monday"'
            />
            <Text size="1" color="gray">
              Selected: {values.dateOnly?.toLocaleDateString() || "Nothing selected"}
            </Text>
          </Flex>
          
          <Flex direction="column" gap="3">
            <Text size="2" weight="medium">Time Only</Text>
            <SmartDatetimeInput
              value={values.timeOnly}
              onValueChange={(date) => setValues(prev => ({ ...prev, timeOnly: date }))}
              showCalendar={false}
              showTimePicker={true}
              placeholder='e.g. "3:30pm"'
            />
            <Text size="1" color="gray">
              Selected: {values.timeOnly?.toLocaleTimeString() || "Nothing selected"}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    )
  },
}

// Interactive playground
export const InteractivePlayground: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date>()
    const [showCalendar, setShowCalendar] = React.useState(true)
    const [showTimePicker, setShowTimePicker] = React.useState(true)
    const [removeInput, setRemoveInput] = React.useState(false)
    const [disabled, setDisabled] = React.useState(false)

    return (
      <Flex direction="column" gap="6" align="start" style={{ maxWidth: "500px", width: "100%" }}>
        <Text size="4" weight="bold">
          Interactive DateTime Picker
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
                checked={showCalendar}
                onChange={(e) => setShowCalendar(e.target.checked)}
                style={{ accentColor: "var(--blue-9)" }}
              />
              <Text size="2">Show Calendar</Text>
            </label>
            
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                checked={showTimePicker}
                onChange={(e) => setShowTimePicker(e.target.checked)}
                style={{ accentColor: "var(--blue-9)" }}
              />
              <Text size="2">Show Time Picker</Text>
            </label>
            
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                checked={removeInput}
                onChange={(e) => setRemoveInput(e.target.checked)}
                style={{ accentColor: "var(--blue-9)" }}
              />
              <Text size="2">Hide Natural Language Input</Text>
            </label>
            
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
                style={{ accentColor: "var(--blue-9)" }}
              />
              <Text size="2">Disable Input Field</Text>
            </label>
          </Flex>
        </Box>

        {/* DateTime Picker */}
        <SmartDatetimeInput
          value={value}
          onValueChange={setValue}
          showCalendar={showCalendar}
          showTimePicker={showTimePicker}
          removeInput={removeInput}
          disabled={disabled}
          placeholder="Try the interactive picker..."
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
            Configuration & Result
          </Text>
          <Text size="2" color="gray" style={{ marginTop: "4px", display: "block" }}>
            {value ? (
              <>
                Selected: {value.toLocaleString()}<br />
                Show Calendar: {showCalendar ? "Yes" : "No"}<br />
                Show Time Picker: {showTimePicker ? "Yes" : "No"}<br />
                Hide Input: {removeInput ? "Yes" : "No"}<br />
                Input Disabled: {disabled ? "Yes" : "No"}
              </>
            ) : (
              "No date/time selected"
            )}
          </Text>
        </Box>
        
        <Text size="2" color="gray">
          Experiment with different configurations to see how they affect the picker's behavior and appearance.
        </Text>
      </Flex>
    )
  },
}