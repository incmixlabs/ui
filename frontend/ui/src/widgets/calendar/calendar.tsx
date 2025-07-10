import { Box, Flex, Heading, Text, TextField } from "@incmix/ui"
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Minus as MinusIcon,
  Plus as PlusIcon,
} from "lucide-react"
import { cn } from "@utils/cn"
import { AnimatePresence, motion } from "motion/react"
import { DateTime, Info } from "luxon"
import { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
export interface CalendarEvent {
  id: string
  eventName: string
  calendar: string
  color: "blue" | "orange" | "green" | "yellow"
  date: DateTime
}

interface CalendarProps {
  className?: string
  events?: CalendarEvent[]
  onAddEvent?: (date: DateTime) => void
  onRemoveEvent?: (event: CalendarEvent) => void
  onEditEvent?: (event: CalendarEvent, newName: string) => void
}

function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1)
}

interface CalendarHeaderProps {
  currentDate: DateTime
  onPrevMonth: () => void
  onNextMonth: () => void
}

const CalendarHeader = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
}: CalendarHeaderProps) => (
  <Flex
    justify="between"
    align="center"
    className="select-none rounded-t-md bg-gray-3 px-4 py-3"
  >
    <ChevronLeftIcon
      className="h-5 w-5 cursor-pointer text-gray-11 hover:text-gray-12"
      onClick={onPrevMonth}
    />
    <Heading size="3">
      {capitalizeFirstLetter(currentDate.toFormat("MMMM yyyy"))}
    </Heading>
    <ChevronRightIcon
      className="h-5 w-5 cursor-pointer text-gray-11 hover:text-gray-12"
      onClick={onNextMonth}
    />
  </Flex>
)

interface CalendarDayProps {
  day: DateTime
  events: CalendarEvent[]
  isCurrentMonth: boolean
  isSelected: boolean
  isToday: boolean
  onSelectDay: (day: DateTime) => void
}

const CalendarDay = ({
  day,
  events,
  isCurrentMonth,
  isSelected,
  isToday,
  onSelectDay,
}: CalendarDayProps) => {
  const dayEvents = events.filter((event) => event.date?.hasSame(day, "day"))
  const hasMoreEvents = dayEvents.length > 6

  // Show 5 events + ellipsis if there are more than 6 events
  // Otherwise show all events up to 6
  const eventsToShow = hasMoreEvents ? dayEvents.slice(0, 5) : dayEvents
  const totalDots = 6
  const placeholderDots = Math.max(
    0,
    totalDots - (hasMoreEvents ? 6 : dayEvents.length)
  )

  return (
    <Flex
      direction="column"
      align="center"
      className={cn(
        "flex-1 px-2 py-1",
        "w-12 cursor-pointer rounded-md transition-colors hover:bg-gray-3",
        "relative",
        {
          "rounded-b-none bg-gray-3": isSelected,
          "bg-gray-3": isSelected && dayEvents.length === 0,
          "text-gray-8": !isCurrentMonth,
          "font-medium": isToday,
        }
      )}
      onClick={() => onSelectDay(day)}
    >
      <Text
        size="5"
        className={cn("select-none font-semibold", {
          "text-gray-10": !isCurrentMonth,
          "text-gray-12": isCurrentMonth,
        })}
      >
        {day.toFormat("dd")}
      </Text>
      <Flex
        align="center"
        justify="center"
        gap="1"
        wrap="wrap"
        className="my-1"
      >
        {eventsToShow.map((event) => (
          <Box
            key={event.id}
            className={cn("h-1.5 w-1.5 rounded-full", {
              "bg-blue-9": event.color === "blue",
              "bg-orange-9": event.color === "orange",
              "bg-green-9": event.color === "green",
              "bg-yellow-9": event.color === "yellow",
            })}
          />
        ))}
        {hasMoreEvents && (
          <Flex
            align="center"
            justify="center"
            className="h-1.5 w-1.5 rounded-full"
            title={`${dayEvents.length - 5} more events`}
          >
            <PlusIcon className="absolute h-2.5 w-2.5 text-bold" />
          </Flex>
        )}
        {Array.from({ length: placeholderDots }).map((_, index) => (
          <Box
            key={`placeholder-${day.toFormat("yyyy-MM-dd")}-${index}`}
            className="invisible h-1.5 w-1.5 rounded-full"
          />
        ))}
      </Flex>
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute top-full right-0 left-0"
          >
            <Box className="h-2 bg-gray-3" />
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  )
}

interface CalendarDaysProps {
  currentDate: DateTime
  events: CalendarEvent[]
  selectedDay: DateTime | null
  today: DateTime
  onSelectDay: (day: DateTime) => void
  direction: number
  onAddEvent?: (date: DateTime) => void
  onRemoveEvent?: (event: CalendarEvent) => void
  onEditEvent?: (event: CalendarEvent, newName: string) => void
}

const CalendarDays = ({
  currentDate,
  events,
  selectedDay,
  today,
  onSelectDay,
  direction,
  onAddEvent,
  onRemoveEvent,
  onEditEvent,
}: CalendarDaysProps) => {
  const monthStart = currentDate.startOf("month")
  const monthEnd = currentDate.endOf("month")
  const startDate = monthStart.startOf("week")
  const endDate = monthEnd.endOf("week")

  const rows = []
  let days = []
  let day = startDate
  let selectedWeekIndex: number | null = null

  const dayNames = Info.weekdays("short", {
    locale: currentDate.toLocal().locale || undefined,
  }).map((dayName: string) => (
    <Box key={dayName} className="flex-1 text-center">
      <Text size="1" className="text-gray-11 uppercase">
        {dayName.substring(0, 3)}
      </Text>
    </Box>
  ))

  rows.push(
    <Flex key="day-names" className="mt-2 mb-6" gap="1">
      {dayNames}
    </Flex>
  )

  let weekIndex = 0
  while (day <= endDate) {
    const weekStart = day

    for (let i = 0; i < 7; i++) {
      const cloneDay = day
      const isCurrentMonth = day.hasSame(currentDate, "month")

      if (selectedDay?.hasSame(cloneDay, "day")) {
        selectedWeekIndex = weekIndex
      }

      days.push(
        <CalendarDay
          key={day.toFormat("yyyy-MM-dd")}
          day={cloneDay}
          events={events}
          isCurrentMonth={isCurrentMonth}
          isSelected={selectedDay ? day.hasSame(selectedDay, "day") : false}
          isToday={day.hasSame(today, "day")}
          onSelectDay={onSelectDay}
        />
      )
      day = day.plus({ days: 1 })
    }

    rows.push(
      <Box key={`week-${weekStart.toFormat("yyyy-MM-dd")}`} className={"mb-2"}>
        <Flex className="" gap="1">
          {days}
        </Flex>
        <AnimatePresence mode="wait">
          {selectedDay && selectedWeekIndex === weekIndex && (
            <motion.div
              key={selectedDay.toFormat("yyyy-MM-dd")}
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: { duration: 0.2, ease: "easeInOut" },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: { duration: 0.2, ease: "easeInOut" },
              }}
              className="overflow-hidden"
            >
              <SelectedDayEvents
                selectedDay={selectedDay}
                events={events}
                onAddEvent={onAddEvent}
                onRemoveEvent={onRemoveEvent}
                onEditEvent={onEditEvent}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    )
    days = []
    weekIndex++
  }

  return (
    <AnimatePresence initial={false} mode="wait" custom={direction}>
      <motion.div
        key={currentDate.toFormat("yyyy-MM")}
        custom={direction}
        variants={{
          enter: (direction: number) => ({
            x: direction * 30,
            opacity: 0,
          }),
          center: {
            x: 0,
            opacity: 1,
          },
          exit: (direction: number) => ({
            x: direction * -30,
            opacity: 0,
          }),
        }}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.3 }}
      >
        {rows}
      </motion.div>
    </AnimatePresence>
  )
}

interface SelectedDayEventsProps {
  selectedDay: DateTime
  events: CalendarEvent[]
  onAddEvent?: (date: DateTime) => void
  onRemoveEvent?: (event: CalendarEvent) => void
  onEditEvent?: (event: CalendarEvent, newName: string) => void
}

const SelectedDayEvents = ({
  selectedDay,
  events,
  onAddEvent,
  onRemoveEvent,
  onEditEvent,
}: SelectedDayEventsProps) => {
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null)
  const [editText, setEditText] = useState("")
  const { t } = useTranslation(["calendar"])

  const handleStartEdit = (event: CalendarEvent) => {
    setEditingEvent(event)
    setEditText(event.eventName)
  }

  const handleSaveEdit = () => {
    if (editingEvent && editText.trim() !== "") {
      onEditEvent?.(editingEvent, editText.trim())
      setEditingEvent(null)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveEdit()
    } else if (e.key === "Escape") {
      setEditingEvent(null)
    }
  }

  const dayEvents = events.filter((event) =>
    event.date?.hasSame(selectedDay, "day")
  )

  return (
    <Box className="relative mt-2 mb-2 rounded-md rounded-t-none bg-gray-3 p-3">
      <Heading size="2" className="mb-2 select-none">
        {t("eventsFor")} {selectedDay.toLocaleString(DateTime.DATE_FULL)}
      </Heading>
      <Box className="max-h-28 overflow-y-auto">
        <Flex direction="column" gap="2">
          {dayEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Flex align="center" gap="2" className="group">
                <Box
                  className={cn("relative h-3 w-3 flex-shrink-0 rounded-full", {
                    "bg-blue-9": event.color === "blue",
                    "bg-orange-9": event.color === "orange",
                    "bg-green-9": event.color === "green",
                    "bg-yellow-9": event.color === "yellow",
                    "cursor-pointer": onRemoveEvent,
                  })}
                  onClick={() => onRemoveEvent?.(event)}
                >
                  {onRemoveEvent && (
                    <Box className="absolute inset-0 hidden items-center justify-center font-bold text-white text-xs group-hover:flex">
                      <MinusIcon className="h-3 w-3" />
                    </Box>
                  )}
                </Box>
                {editingEvent === event ? (
                  <TextField.Root
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={handleSaveEdit}
                    onKeyDown={handleKeyDown}
                    className="flex-1 rounded border border-gray-7 bg-gray-2 text-sm focus:border-blue-8 focus:outline-none"
                    autoFocus
                  />
                ) : (
                  <Text
                    className="flex-1 cursor-pointer hover:text-gray-12"
                    onClick={() => onEditEvent && handleStartEdit(event)}
                  >
                    {event.eventName}
                  </Text>
                )}
              </Flex>
            </motion.div>
          ))}
          {onAddEvent && (
            <Flex
              align="center"
              gap="2"
              className="cursor-pointer text-gray-11 hover:text-gray-12"
              onClick={() => onAddEvent(selectedDay)}
            >
              <Box className="relative size-3">
                <PlusIcon className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-4" />
              </Box>
              <Text>{t("addEvent")}</Text>
            </Flex>
          )}
        </Flex>
      </Box>
    </Box>
  )
}

export function Calendar({
  className,
  events = [],
  onAddEvent,
  onRemoveEvent,
  onEditEvent,
}: CalendarProps) {
  const today = DateTime.now()
  const [currentDate, setCurrentDate] = useState(today.startOf("month"))
  const [selectedDay, setSelectedDay] = useState<DateTime | null>(null)
  const [direction, setDirection] = useState(0)

  const nextMonth = useCallback(() => {
    setDirection(1)
    setCurrentDate((prev) => prev.plus({ months: 1 }))
  }, [])

  const prevMonth = useCallback(() => {
    setDirection(-1)
    setCurrentDate((prev) => prev.minus({ months: 1 }))
  }, [])

  const handleDaySelect = useCallback((day: DateTime) => {
    setSelectedDay((prev) => (prev?.hasSame(day, "day") ? null : day))
  }, [])

  return (
    <Box className={cn("rounded-md bg-gray-2 shadow-none", className)}>
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
      />
      <Box className="overflow-hidden p-2">
        <CalendarDays
          currentDate={currentDate}
          events={events}
          selectedDay={selectedDay}
          today={today}
          onSelectDay={handleDaySelect}
          direction={direction}
          onAddEvent={onAddEvent}
          onRemoveEvent={onRemoveEvent}
          onEditEvent={onEditEvent}
        />
      </Box>
    </Box>
  )
}
