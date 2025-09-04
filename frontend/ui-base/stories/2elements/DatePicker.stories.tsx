import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Theme, Box, Text, Flex, Card, Button } from "../../src/1base"
import { DatePicker } from "../../src/2elements/dates/date-picker"

const meta: Meta<typeof DatePicker> = {
  title: "2 Elements/Dates/DatePicker",
  component: DatePicker,
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
    date: {
      control: false,
      description: "Currently selected date",
    },
    setDate: {
      action: "date-changed",
      description: "Callback when date changes",
    },
    variant: {
      control: "select",
      options: ["classic", "solid", "soft", "surface", "outline", "ghost"],
      description: "Button variant style",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    width: {
      control: "text",
      description: "Icon width (also sets height)",
    },
  },
  args: {
    variant: "soft",
    width: "16",
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default date picker
export const Default: Story = {
  render: (args) => {
    const [date, setDate] = React.useState<Date>()

    return (
      <Flex direction="column" gap="4" align="start" width="full">
        <Text size="3" weight="medium">
          Basic Date Picker
        </Text>

        <DatePicker
          {...args}
          date={date}
          setDate={setDate}
        />

        {date && (
          <Box
            style={{
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              border: "1px solid var(--gray-6)",
            }}
          >
            <Text size="2" weight="medium">
              Selected Date
            </Text>
            <Text size="2" color="gray" style={{ marginTop: "4px" }}>
              {date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
            <Text size="1" color="gray" style={{ marginTop: "2px" }}>
              ISO: {date.toISOString().split('T')[0]}
            </Text>
          </Box>
        )}
      </Flex>
    )
  },
}

// Pre-selected date
export const PreSelected: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date>(new Date())

    return (
      <Flex direction="column" gap="4" align="start">
        <Text size="3" weight="medium">
          Pre-selected Date (Today)
        </Text>

        <DatePicker
          date={date}
          setDate={setDate}
          variant="solid"
        />

        <Text size="2" color="gray">
          This picker starts with today's date selected
        </Text>
      </Flex>
    )
  },
}

// Different button variants
export const ButtonVariants: Story = {
  render: () => {
    const [dates, setDates] = React.useState<Record<string, Date>>({})

    const variants = ["soft", "solid", "outline", "ghost", "surface"] as const

    const handleDateChange = (variant: string) => (date?: Date) => {
      setDates(prev => ({
        ...prev,
        [variant]: date || new Date()
      }))
    }

    return (
      <Flex direction="column" gap="6" align="start">
        <Text size="4" weight="bold">
          Button Variants
        </Text>

        <Flex direction="column" gap="4" align="start">
          {variants.map((variant) => (
            <Flex key={variant} direction="row" gap="4" align="center">
              <Box style={{ minWidth: "80px" }}>
                <Text size="2" weight="medium" style={{ textTransform: "capitalize" }}>
                  {variant}
                </Text>
              </Box>

              <DatePicker
                date={dates[variant]}
                setDate={handleDateChange(variant)}
                variant={variant}
              />

              <Text size="2" color="gray">
                {dates[variant]
                  ? dates[variant].toLocaleDateString()
                  : "No date selected"
                }
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    )
  },
}

// Different icon sizes
export const IconSizes: Story = {
  render: () => {
    const [dates, setDates] = React.useState<Record<string, Date>>({})
    const sizes = ["12", "16", "20", "24"] as const

    const handleDateChange = (size: string) => (date?: Date) => {
      setDates(prev => ({
        ...prev,
        [size]: date || new Date()
      }))
    }

    return (
      <Flex direction="column" gap="6" align="start">
        <Text size="4" weight="bold">
          Icon Sizes
        </Text>

        <Flex direction="column" gap="4" align="start">
          {sizes.map((size) => (
            <Flex key={size} direction="row" gap="4" align="center">
              <Box style={{ minWidth: "60px" }}>
                <Text size="2" weight="medium">
                  {size}px
                </Text>
              </Box>

              <DatePicker
                date={dates[size]}
                setDate={handleDateChange(size)}
                width={size}
                variant="outline"
              />

              <Text size="2" color="gray">
                Icon size: {size}px
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    )
  },
}

// Date picker in a form context
export const InFormContext: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      startDate: undefined as Date | undefined,
      endDate: undefined as Date | undefined,
      eventDate: new Date(),
    })

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      console.log('Form submitted with dates:', formData)
    }

    return (
      <Card.Root style={{ width: "400px" }}>
        <Card.Header>
          <Card.Title>Event Planning Form</Card.Title>
          <Card.Description>
            Select dates for your event
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="4">
              <Flex direction="column" gap="2">
                <Text size="2" weight="medium">Event Date *</Text>
                <DatePicker
                  date={formData.eventDate}
                  setDate={(date) => setFormData(prev => ({ ...prev, eventDate: date || new Date() }))}
                  variant="outline"
                />
              </Flex>

              <Flex direction="column" gap="2">
                <Text size="2" weight="medium">Registration Start Date</Text>
                <DatePicker
                  date={formData.startDate}
                  setDate={(date) => setFormData(prev => ({ ...prev, startDate: date }))}
                  variant="soft"
                />
              </Flex>

              <Flex direction="column" gap="2">
                <Text size="2" weight="medium">Registration End Date</Text>
                <DatePicker
                  date={formData.endDate}
                  setDate={(date) => setFormData(prev => ({ ...prev, endDate: date }))}
                  variant="soft"
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
              <Text size="2" weight="medium" style={{ display: "block", marginBottom: "4px" }}>
                Selected Dates:
              </Text>
              <Text size="1" color="gray">
                Event: {formData.eventDate.toLocaleDateString()}
              </Text>
              <Text size="1" color="gray">
                Registration Start: {formData.startDate?.toLocaleDateString() || "Not set"}
              </Text>
              <Text size="1" color="gray">
                Registration End: {formData.endDate?.toLocaleDateString() || "Not set"}
              </Text>
            </Box>

            <Flex gap="2" justify="end">
              <Button
                variant="outline"
                onClick={() => setFormData({
                  startDate: undefined,
                  endDate: undefined,
                  eventDate: new Date(),
                })}
              >
                Reset
              </Button>
              <Button onClick={handleSubmit}>
                Save Event
              </Button>
            </Flex>
          </Flex>
        </Card.Footer>
      </Card.Root>
    )
  },
}

// Date picker with custom styling
export const CustomStyling: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date>()

    return (
      <Flex direction="column" gap="4" align="start">
        <Text size="3" weight="medium">
          Custom Styled Date Picker
        </Text>

        <DatePicker
          date={date}
          setDate={setDate}
          variant="solid"
          className="border-2 border-blue-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          width="20"
        />

        <Text size="2" color="gray">
          Custom border, shadow, and larger icon
        </Text>
      </Flex>
    )
  },
}

// Multiple date pickers side by side
export const SideBySide: Story = {
  render: () => {
    const [dates, setDates] = React.useState({
      departure: undefined as Date | undefined,
      return: undefined as Date | undefined,
    })

    return (
      <Card.Root style={{ width: "450px" }}>
        <Card.Header>
          <Card.Title>Flight Booking</Card.Title>
          <Card.Description>
            Select your departure and return dates
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <Flex direction="row" gap="6" align="start">
            <Flex direction="column" gap="2" style={{ flex: 1 }}>
              <Text size="2" weight="medium">Departure</Text>
              <DatePicker
                date={dates.departure}
                setDate={(date) => setDates(prev => ({ ...prev, departure: date }))}
                variant="outline"
              />
            </Flex>

            <Flex direction="column" gap="2" style={{ flex: 1 }}>
              <Text size="2" weight="medium">Return</Text>
              <DatePicker
                date={dates.return}
                setDate={(date) => setDates(prev => ({ ...prev, return: date }))}
                variant="outline"
              />
            </Flex>
          </Flex>
        </Card.Content>
        <Card.Footer>
          <Flex direction="column" gap="3" style={{ width: "100%" }}>
            <Flex justify="between" align="center">
              <Text size="2" color="gray">Trip Duration:</Text>
              <Text size="2" weight="medium">
                {dates.departure && dates.return
                  ? `${Math.ceil((dates.return.getTime() - dates.departure.getTime()) / (1000 * 60 * 60 * 24))} days`
                  : "Select both dates"
                }
              </Text>
            </Flex>

            <Button disabled={!dates.departure || !dates.return}>
              Search Flights
            </Button>
          </Flex>
        </Card.Footer>
      </Card.Root>
    )
  },
}

// Controlled date picker with external controls
export const ControlledWithActions: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date>()

    const setToday = () => setDate(new Date())
    const setTomorrow = () => {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      setDate(tomorrow)
    }
    const setNextWeek = () => {
      const nextWeek = new Date()
      nextWeek.setDate(nextWeek.getDate() + 7)
      setDate(nextWeek)
    }
    const clearDate = () => setDate(undefined)

    return (
      <Flex direction="column" gap="6" align="start">
        <Text size="4" weight="bold">
          Controlled Date Picker
        </Text>

        <DatePicker
          date={date}
          setDate={setDate}
          variant="soft"
        />

        <Flex gap="2" wrap="wrap">
          <Button size="1" variant="outline" onClick={setToday}>
            Today
          </Button>
          <Button size="1" variant="outline" onClick={setTomorrow}>
            Tomorrow
          </Button>
          <Button size="1" variant="outline" onClick={setNextWeek}>
            Next Week
          </Button>
          <Button size="1" variant="outline" color="red" onClick={clearDate}>
            Clear
          </Button>
        </Flex>

        <Box
          style={{
            padding: "16px",
            backgroundColor: "var(--gray-2)",
            borderRadius: "8px",
            border: "1px solid var(--gray-6)",
            width: "100%",
          }}
        >
          <Text size="2" weight="medium">
            Current Selection
          </Text>
          <Text size="2" color="gray" style={{ marginTop: "4px" }}>
            {date ? (
              <>
                Date: {date.toLocaleDateString()}<br />
                Day of week: {date.toLocaleDateString('en-US', { weekday: 'long' })}<br />
                ISO: {date.toISOString().split('T')[0]}
              </>
            ) : (
              "No date selected"
            )}
          </Text>
        </Box>
      </Flex>
    )
  },
}

// Interactive playground
export const InteractivePlayground: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date>()
    const [variant, setVariant] = React.useState<"soft" | "solid" | "outline" | "ghost" | "surface">("soft")
    const [iconSize, setIconSize] = React.useState("16")

    return (
      <Flex direction="column" gap="6" align="start" style={{ maxWidth: "400px" }}>
        <Text size="4" weight="bold">
          Interactive Date Picker
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
            Configuration
          </Text>

          <Flex direction="column" gap="3">
            <Flex direction="row" gap="2" align="center">
              <Text size="2" style={{ minWidth: "60px" }}>Variant:</Text>
              <select
                value={variant}
                onChange={(e) => setVariant(e.target.value as any)}
                style={{
                  padding: "4px 8px",
                  borderRadius: "4px",
                  border: "1px solid var(--gray-6)",
                  backgroundColor: "var(--gray-1)",
                  flex: 1,
                }}
              >
                <option value="soft">Soft</option>
                <option value="solid">Solid</option>
                <option value="outline">Outline</option>
                <option value="ghost">Ghost</option>
                <option value="surface">Surface</option>
              </select>
            </Flex>

            <Flex direction="row" gap="2" align="center">
              <Text size="2" style={{ minWidth: "60px" }}>Icon Size:</Text>
              <select
                value={iconSize}
                onChange={(e) => setIconSize(e.target.value)}
                style={{
                  padding: "4px 8px",
                  borderRadius: "4px",
                  border: "1px solid var(--gray-6)",
                  backgroundColor: "var(--gray-1)",
                  flex: 1,
                }}
              >
                <option value="12">12px</option>
                <option value="16">16px</option>
                <option value="20">20px</option>
                <option value="24">24px</option>
              </select>
            </Flex>
          </Flex>
        </Box>

        {/* Date Picker */}
        <DatePicker
          date={date}
          setDate={setDate}
          variant={variant}
          width={iconSize}
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
            {date ? (
              <>
                Selected: {date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}<br />
                Variant: {variant}<br />
                Icon Size: {iconSize}px
              </>
            ) : (
              "No date selected"
            )}
          </Text>
        </Box>

        <Text size="2" color="gray">
          Try different configurations to see how they affect the date picker appearance and behavior.
        </Text>
      </Flex>
    )
  },
}
