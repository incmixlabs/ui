import { CardContainer } from "@components"
import { nanoid as cuid } from "nanoid"
import { DateTime } from "luxon"
import { useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Calendar, type CalendarEvent } from "./calendar"

const STORAGE_KEY_PREFIX = "calendar_events"
const COLORS = ["blue", "orange", "green", "yellow"] as const

interface CalendarWidgetProps {
  storageKey: string
}

const getStoredEvents = (key: string): CalendarEvent[] => {
  const storedEvents = localStorage.getItem(key)
  if (!storedEvents) return []

  return JSON.parse(storedEvents).map((event: any) => ({
    ...event,
    date: DateTime.fromISO(event.date),
  }))
}

export function CalendarWidget({ storageKey }: CalendarWidgetProps) {
  const { t } = useTranslation(["calendar"])
  const key = `${STORAGE_KEY_PREFIX}_${storageKey}`
  const [events, setEvents] = useState<CalendarEvent[]>(() =>
    getStoredEvents(key)
  )

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(events))
  }, [events, key])

  const handleAddEvent = useCallback(
    (date: DateTime) => {
      const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)]
      const newEvent: CalendarEvent = {
        id: cuid(),
        eventName: t("newEvent"),
        calendar: "Default",
        color: randomColor,
        date: date,
      }
      setEvents((prev) => [...prev, newEvent])
    },
    [t]
  )

  const handleRemoveEvent = useCallback((eventToRemove: CalendarEvent) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventToRemove.id))
  }, [])

  const handleEditEvent = useCallback(
    (event: CalendarEvent, newName: string) => {
      setEvents((prev) =>
        prev.map((e) => (e.id === event.id ? { ...e, eventName: newName } : e))
      )
    },
    []
  )

  return (
    <CardContainer className="p-2">
      <Calendar
        events={events}
        onAddEvent={handleAddEvent}
        onRemoveEvent={handleRemoveEvent}
        onEditEvent={handleEditEvent}
      />
    </CardContainer>
  )
}
