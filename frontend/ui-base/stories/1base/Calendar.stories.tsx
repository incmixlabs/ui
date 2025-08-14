import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Calendar, Button, Card, Flex, Text, Theme } from "../../src/base"

const meta: Meta<typeof Calendar> = {
  title: "1 Base/Calendar",
  component: Calendar,
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
    mode: {
      control: "select",
      options: ["single", "multiple", "range"],
      description: "Selection mode",
    },
    showOutsideDays: {
      control: "boolean",
      description: "Show days outside the current month",
    },
    captionLayout: {
      control: "select",
      options: ["label", "dropdown", "dropdown-months", "dropdown-years"],
      description: "Caption layout style",
    },
    buttonVariant: {
      control: "select",
      options: ["ghost", "outline", "secondary"],
      description: "Button variant for navigation and day buttons",
    },
    disabled: {
      control: "boolean",
      description: "Whether the calendar is disabled",
    },
  },
  args: {
    mode: "single",
    showOutsideDays: true,
    captionLayout: "label",
    buttonVariant: "ghost",
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default single date selection
export const Default: Story = {
  render: (args) => {
    const [selected, setSelected] = React.useState<Date>()

    return (
      <Calendar
        {...args}
        selected={selected}
        onSelect={setSelected}
      />
    )
  },
}

// Multiple date selection
export const Multiple: Story = {
  args: {
    mode: "multiple",
  },
  render: (args) => {
    const [selected, setSelected] = React.useState<Date[]>([])

    return (
      <Calendar
        {...args}
        selected={selected}
        onSelect={setSelected}
      />
    )
  },
}

// Date range selection
export const Range: Story = {
  args: {
    mode: "range",
  },
  render: (args) => {
    const [selected, setSelected] = React.useState<{from?: Date, to?: Date}>()

    return (
      <Calendar
        {...args}
        selected={selected}
        onSelect={setSelected}
      />
    )
  },
}

// With dropdown navigation
export const WithDropdowns: Story = {
  args: {
    captionLayout: "dropdown",
  },
  render: (args) => {
    const [selected, setSelected] = React.useState<Date>()

    return (
      <Calendar
        {...args}
        selected={selected}
        onSelect={setSelected}
        fromYear={2020}
        toYear={2030}
      />
    )
  },
}

// Dropdown months only
export const DropdownMonths: Story = {
  args: {
    captionLayout: "dropdown-months",
  },
  render: (args) => {
    const [selected, setSelected] = React.useState<Date>()

    return (
      <Calendar
        {...args}
        selected={selected}
        onSelect={setSelected}
      />
    )
  },
}

// Dropdown years only
export const DropdownYears: Story = {
  args: {
    captionLayout: "dropdown-years",
  },
  render: (args) => {
    const [selected, setSelected] = React.useState<Date>()

    return (
      <Calendar
        {...args}
        selected={selected}
        onSelect={setSelected}
        fromYear={2020}
        toYear={2030}
      />
    )
  },
}

// Hide outside days
export const HideOutsideDays: Story = {
  args: {
    showOutsideDays: false,
  },
  render: (args) => {
    const [selected, setSelected] = React.useState<Date>()

    return (
      <Calendar
        {...args}
        selected={selected}
        onSelect={setSelected}
      />
    )
  },
}

// Disabled state
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => {
    const [selected, setSelected] = React.useState<Date>()

    return (
      <Calendar
        {...args}
        selected={selected}
        onSelect={setSelected}
      />
    )
  },
}

// With date restrictions
export const WithRestrictions: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Date>()
    const today = new Date()
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

    return (
      <div style={{ textAlign: "center" }}>
        <Text size="2" color="gray" style={{ marginBottom: "12px", display: "block" }}>
          Only dates from today to next week are selectable
        </Text>
        <Calendar
          selected={selected}
          onSelect={setSelected}
          disabled={[
            { before: today },
            { after: nextWeek }
          ]}
        />
      </div>
    )
  },
}

// Weekend disabled
export const WeekendDisabled: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Date>()

    return (
      <div style={{ textAlign: "center" }}>
        <Text size="2" color="gray" style={{ marginBottom: "12px", display: "block" }}>
          Weekends are disabled
        </Text>
        <Calendar
          selected={selected}
          onSelect={setSelected}
          disabled={[
            { dayOfWeek: [0, 6] } // Sunday and Saturday
          ]}
        />
      </div>
    )
  },
}

// Multiple months
export const MultipleMonths: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<{from?: Date, to?: Date}>()

    return (
      <Calendar
        mode="range"
        numberOfMonths={2}
        selected={selected}
        onSelect={setSelected}
      />
    )
  },
}

// With week numbers
export const WithWeekNumbers: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Date>()

    return (
      <Calendar
        selected={selected}
        onSelect={setSelected}
        showWeekNumber
        weekStartsOn={1} // Monday
      />
    )
  },
}

// Custom styling variants
export const ButtonVariants: Story = {
  render: () => (
    <Flex direction="column" gap="4" align="center">
      <div style={{ textAlign: "center" }}>
        <Text size="3" weight="medium" style={{ marginBottom: "8px", display: "block" }}>
          Ghost (default)
        </Text>
        <Calendar
          buttonVariant="ghost"
          selected={new Date()}
          onSelect={() => {}}
        />
      </div>

      <div style={{ textAlign: "center" }}>
        <Text size="3" weight="medium" style={{ marginBottom: "8px", display: "block" }}>
          Outline
        </Text>
        <Calendar
          buttonVariant="outline"
          selected={new Date()}
          onSelect={() => {}}
        />
      </div>
    </Flex>
  ),
}

// Date picker in a card
export const DatePickerCard: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Date>()

    return (
      <Card.Root style={{ width: "350px" }}>
        <Card.Header>
          <Card.Title>Select Date</Card.Title>
          <Card.Description>
            Choose a date for your appointment
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <Calendar
            selected={selected}
            onSelect={setSelected}
          />
        </Card.Content>
        <Card.Footer>
          <Flex justify="between" align="center" style={{ width: "100%" }}>
            <Text size="2" color="gray">
              {selected ? selected.toLocaleDateString() : "No date selected"}
            </Text>
            <Flex gap="2">
              <Button
                variant="outline"
                size="1"
                onClick={() => setSelected(undefined)}
              >
                Clear
              </Button>
              <Button size="1" disabled={!selected}>
                Confirm
              </Button>
            </Flex>
          </Flex>
        </Card.Footer>
      </Card.Root>
    )
  },
}

// Range picker example
export const RangePicker: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<{from?: Date, to?: Date}>()

    return (
      <Card.Root style={{ width: "400px" }}>
        <Card.Header>
          <Card.Title>Date Range Selection</Card.Title>
          <Card.Description>
            Select a start and end date for your booking
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <Calendar
            mode="range"
            selected={selected}
            onSelect={setSelected}
            numberOfMonths={1}
          />
        </Card.Content>
        <Card.Footer>
          <Flex direction="column" gap="2" style={{ width: "100%" }}>
            <Flex justify="between">
              <Text size="2" color="gray">Start:</Text>
              <Text size="2">
                {selected?.from ? selected.from.toLocaleDateString() : "Not selected"}
              </Text>
            </Flex>
            <Flex justify="between">
              <Text size="2" color="gray">End:</Text>
              <Text size="2">
                {selected?.to ? selected.to.toLocaleDateString() : "Not selected"}
              </Text>
            </Flex>
            <Flex gap="2" justify="end" style={{ marginTop: "8px" }}>
              <Button
                variant="outline"
                size="1"
                onClick={() => setSelected(undefined)}
              >
                Clear
              </Button>
              <Button size="1" disabled={!selected?.from || !selected?.to}>
                Book Dates
              </Button>
            </Flex>
          </Flex>
        </Card.Footer>
      </Card.Root>
    )
  },
}

// Event calendar example
export const EventCalendar: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Date>()

    // Mock events
    const events = [
      new Date(2024, 0, 15), // January 15
      new Date(2024, 0, 22), // January 22
      new Date(2024, 0, 28), // January 28
    ]

    return (
      <Card.Root style={{ width: "380px" }}>
        <Card.Header>
          <Card.Title>Event Calendar</Card.Title>
          <Card.Description>
            Dates with events are highlighted
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <Calendar
            selected={selected}
            onSelect={setSelected}
            modifiers={{
              event: events
            }}
            modifiersStyles={{
              event: {
                backgroundColor: "var(--blue-3)",
                borderRadius: "4px",
                fontWeight: "bold"
              }
            }}
          />
        </Card.Content>
        <Card.Footer>
          <Flex justify="between" align="center" style={{ width: "100%" }}>
            <Text size="2" color="gray">
              {selected ? `Selected: ${selected.toLocaleDateString()}` : "No date selected"}
            </Text>
            <div style={{
              width: "12px",
              height: "12px",
              backgroundColor: "var(--blue-3)",
              borderRadius: "2px"
            }} />
            <Text size="1" color="gray">Has events</Text>
          </Flex>
        </Card.Footer>
      </Card.Root>
    )
  },
}

// Controlled vs Uncontrolled
export const ControlledExample: Story = {
  render: () => {
    const [controlledDate, setControlledDate] = React.useState<Date>(new Date())

    return (
      <Flex direction="column" gap="4" align="center">
        <Card.Root style={{ width: "350px" }}>
          <Card.Header>
            <Card.Title>Controlled Calendar</Card.Title>
            <Card.Description>
              Date is controlled by external state
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <Calendar
              selected={controlledDate}
              onSelect={setControlledDate}
            />
          </Card.Content>
          <Card.Footer>
            <Flex gap="2" justify="between" align="center" style={{ width: "100%" }}>
              <Text size="2" color="gray">
                Selected: {controlledDate.toLocaleDateString()}
              </Text>
              <Flex gap="2">
                <Button
                  variant="outline"
                  size="1"
                  onClick={() => setControlledDate(new Date())}
                >
                  Today
                </Button>
                <Button
                  variant="outline"
                  size="1"
                  onClick={() => {
                    const tomorrow = new Date()
                    tomorrow.setDate(tomorrow.getDate() + 1)
                    setControlledDate(tomorrow)
                  }}
                >
                  Tomorrow
                </Button>
              </Flex>
            </Flex>
          </Card.Footer>
        </Card.Root>
      </Flex>
    )
  },
}
