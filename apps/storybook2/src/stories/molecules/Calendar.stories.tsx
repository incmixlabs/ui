import { Box } from "@incmix/ui2"
import { Calendar, type CalendarEvent } from "@incmix/ui2/widgets"
import { createId as cuid } from "@paralleldrive/cuid2"
import type { Meta, StoryObj } from "@storybook/react"
import { DateTime } from "luxon"
import { useState } from "react"

const meta: Meta<typeof Calendar> = {
  title: "Molecules/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box className="max-w-3xl p-4">
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Calendar>

const sampleEvents = [
  {
    id: cuid(),
    eventName: "Team Meeting",
    calendar: "Work",
    color: "blue",
    date: DateTime.now().plus({ days: 1 }),
  },
  {
    id: cuid(),
    eventName: "Project Deadline",
    calendar: "Work",
    color: "orange",
    date: DateTime.now().plus({ days: 3 }),
  },
  {
    id: cuid(),
    eventName: "Lunch with Client",
    calendar: "Work",
    color: "green",
    date: DateTime.now().plus({ days: 3 }),
  },
  {
    id: cuid(),
    eventName: "Conference Call",
    calendar: "Work",
    color: "yellow",
    date: DateTime.now().plus({ days: 5 }),
  },
] as const

export const Empty: Story = {
  args: {
    events: [],
  },
}

export const WithEvents: Story = {
  args: {
    events: [...sampleEvents],
  },
}

export const SingleDayMultipleEvents: Story = {
  args: {
    events: [
      ...sampleEvents,
      {
        id: cuid(),
        eventName: "Morning Standup",
        calendar: "Work",
        color: "blue",
        date: DateTime.now().plus({ days: 1 }),
      },
      {
        id: cuid(),
        eventName: "Lunch Break",
        calendar: "Personal",
        color: "green",
        date: DateTime.now().plus({ days: 1 }),
      },
      {
        id: cuid(),
        eventName: "Evening Review",
        calendar: "Work",
        color: "orange",
        date: DateTime.now().plus({ days: 1 }),
      },
      {
        id: cuid(),
        eventName: "Evening Meeting",
        calendar: "Personal",
        color: "green",
        date: DateTime.now().plus({ days: 1 }),
      },
      {
        id: cuid(),
        eventName: "Morning Coffee",
        calendar: "Personal",
        color: "green",
        date: DateTime.now().plus({ days: 5 }),
      },
      {
        id: cuid(),
        eventName: "Team Sync",
        calendar: "Work",
        color: "blue",
        date: DateTime.now().plus({ days: 5 }),
      },
      {
        id: cuid(),
        eventName: "Client Meeting",
        calendar: "Work",
        color: "orange",
        date: DateTime.now().plus({ days: 5 }),
      },
      {
        id: cuid(),
        eventName: "Project Review",
        calendar: "Work",
        color: "yellow",
        date: DateTime.now().plus({ days: 5 }),
      },
      {
        id: cuid(),
        eventName: "Lunch with Team",
        calendar: "Personal",
        color: "green",
        date: DateTime.now().plus({ days: 5 }),
      },
      {
        id: cuid(),
        eventName: "Code Review",
        calendar: "Work",
        color: "blue",
        date: DateTime.now().plus({ days: 5 }),
      },
      {
        id: cuid(),
        eventName: "End of Day Wrap-up",
        calendar: "Work",
        color: "orange",
        date: DateTime.now().plus({ days: 5 }),
      },
    ],
  },
}

export const MultipleMonths: Story = {
  args: {
    events: [
      ...sampleEvents,
      {
        id: cuid(),
        eventName: "Future Conference",
        calendar: "Work",
        color: "blue",
        date: DateTime.now().plus({ months: 1 }).plus({ days: 5 }),
      },
      {
        id: cuid(),
        eventName: "Quarterly Review",
        calendar: "Work",
        color: "orange",
        date: DateTime.now().plus({ months: 1 }).plus({ days: 10 }),
      },
    ],
  },
}

const InteractiveCalendarStory = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([...sampleEvents])

  const handleAddEvent = (date: DateTime) => {
    const newEvent: CalendarEvent = {
      id: cuid(),
      eventName: `New Event ${events.length + 1}`,
      calendar: "Work",
      color: ["blue", "orange", "green", "yellow"][
        events.length % 4
      ] as CalendarEvent["color"],
      date: date,
    }
    setEvents([...events, newEvent])
  }

  const handleRemoveEvent = (eventToRemove: CalendarEvent) => {
    setEvents(
      events.filter(
        (event) =>
          !(
            event.eventName === eventToRemove.eventName &&
            event.calendar === eventToRemove.calendar &&
            event.date.equals(eventToRemove.date)
          )
      )
    )
  }

  const handleEditEvent = (event: CalendarEvent, newName: string) => {
    setEvents(
      events.map((e) =>
        e.eventName === event.eventName &&
        e.calendar === event.calendar &&
        e.date.equals(event.date)
          ? { ...e, eventName: newName }
          : e
      )
    )
  }

  return (
    <Calendar
      events={events}
      onAddEvent={handleAddEvent}
      onRemoveEvent={handleRemoveEvent}
      onEditEvent={handleEditEvent}
    />
  )
}

export const Interactive: Story = {
  render: () => <InteractiveCalendarStory />,
}

const EmptyInteractiveCalendarStory = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([])

  const handleAddEvent = (date: DateTime) => {
    const newEvent: CalendarEvent = {
      id: cuid(),
      eventName: `Event ${events.length + 1}`,
      calendar: "Personal",
      color: ["blue", "orange", "green", "yellow"][
        events.length % 4
      ] as CalendarEvent["color"],
      date: date,
    }
    setEvents([...events, newEvent])
  }

  const handleRemoveEvent = (eventToRemove: CalendarEvent) => {
    setEvents(
      events.filter(
        (event) =>
          !(
            event.eventName === eventToRemove.eventName &&
            event.calendar === eventToRemove.calendar &&
            event.date.equals(eventToRemove.date)
          )
      )
    )
  }

  const handleEditEvent = (event: CalendarEvent, newName: string) => {
    setEvents(
      events.map((e) =>
        e.eventName === event.eventName &&
        e.calendar === event.calendar &&
        e.date.equals(event.date)
          ? { ...e, eventName: newName }
          : e
      )
    )
  }

  return (
    <Calendar
      events={events}
      onAddEvent={handleAddEvent}
      onRemoveEvent={handleRemoveEvent}
      onEditEvent={handleEditEvent}
    />
  )
}

export const EmptyInteractive: Story = {
  render: () => <EmptyInteractiveCalendarStory />,
}
