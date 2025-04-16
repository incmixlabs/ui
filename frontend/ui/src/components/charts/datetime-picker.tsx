/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ScrollArea } from "@components/radixui"
import { Popover } from "@components/radixui"
import { Button } from "@components/radixui"
import { Calendar } from "@components/shadcn"
import type { CalendarProps } from "@components/shadcn"
import { cn } from "@utils/cn"
import { parseDate } from "chrono-node"
import { CalendarIcon } from "lucide-react"
import React from "react"
import type { ActiveModifiers } from "react-day-picker"

/* -------------------------------------------------------------------------- */
/*                               Inspired By:                                 */
/*                               @steventey                                   */
/* ------------------https://dub.co/blog/smart-datetime-picker--------------- */
/* -------------------------------------------------------------------------- */

/**
 * Utility function that parses dates.
 * Parses a given date string using the `chrono-node` library.
 *
 * @param str - A string representation of a date and time.
 * @returns A `Date` object representing the parsed date and time, or `null` if the string could not be parsed.
 */
export const parseDateTime = (str: Date | string) => {
  if (str instanceof Date) return str
  return parseDate(str)
}

/**
 * Converts a given timestamp or the current date and time to a string representation in the local time zone.
 * format: `HH:mm`, adjusted for the local time zone.
 *
 * @param timestamp {Date | string}
 * @returns A string representation of the timestamp
 */
export const getDateTimeLocal = (timestamp?: Date): string => {
  const d = timestamp ? new Date(timestamp) : new Date()
  if (d.toString() === "Invalid Date") return ""
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .split(":")
    .slice(0, 2)
    .join(":")
}

/**
 * Formats a given date and time object or string into a human-readable string representation.
 * "MMM D, YYYY h:mm A" (e.g. "Jan 1, 2023 12:00 PM").
 *
 * @param datetime - {Date | string}
 * @returns A string representation of the date and time
 */
const formatTimeOnly = (datetime: Date | string) => {
  return new Date(datetime).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })
}

const formatDateOnly = (datetime: Date | string) => {
  return new Date(datetime).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

const formatDateTime = (
  datetime: Date | string,
  showCalendar: boolean,
  showTimePicker: boolean
) => {
  if (!showCalendar && showTimePicker) {
    return formatTimeOnly(datetime)
  }
  if (showCalendar && !showTimePicker) {
    return formatDateOnly(datetime)
  }
  return new Date(datetime).toLocaleTimeString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })
}

const inputBase =
  "bg-transparent focus:outline-none focus:ring-0 focus-within:outline-none focus-within:ring-0 sm:text-sm disabled:cursor-not-allowed disabled:opacity-50"

const DEFAULT_SIZE = 96

interface SmartDatetimeInputProps {
  value?: Date
  onValueChange: (date: Date) => void
  showCalendar?: boolean
  removeInput?: boolean
  showTimePicker?: boolean
}

interface SmartDatetimeInputContextProps extends SmartDatetimeInputProps {
  Time: string
  onTimeChange: (time: string) => void
}

const SmartDatetimeInputContext =
  React.createContext<SmartDatetimeInputContextProps | null>(null)

const useSmartDateInput = () => {
  const context = React.useContext(SmartDatetimeInputContext)
  if (!context) {
    throw new Error(
      "useSmartDateInput must be used within SmartDateInputProvider"
    )
  }
  return context
}

export const SmartDatetimeInput = React.forwardRef<
  HTMLInputElement,
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "ref" | "value" | "defaultValue" | "onBlur"
  > &
    SmartDatetimeInputProps
>(function SmartDatetimeInput(
  {
    className,
    value,
    onValueChange,
    placeholder,
    disabled,
    removeInput,
    showCalendar = true,
    showTimePicker = true,
  },
  ref
) {
  const [Time, setTime] = React.useState<string>("")

  const onTimeChange = React.useCallback((time: string) => {
    setTime(time)
  }, [])

  // If neither calendar nor timepicker is specified, show both
  const shouldShowBoth = showCalendar === showTimePicker

  return (
    <SmartDatetimeInputContext.Provider
      value={{
        value,
        onValueChange,
        Time,
        onTimeChange,
        removeInput,
        showCalendar: shouldShowBoth ? true : showCalendar,
        showTimePicker: shouldShowBoth ? true : showTimePicker,
      }}
    >
      <div className="w-full rounded-md bg-gray-3">
        <div
          className={cn(
            "flex w-full items-center gap-0 rounded-md border border-gray-5 bg-gray-5 p-1 transition-all",
            className
          )}
        >
          <DateTimeLocalInput />
          {!removeInput && (
            <NaturalLanguageInput
              placeholder={placeholder}
              disabled={disabled}
              ref={ref}
            />
          )}
        </div>
      </div>
    </SmartDatetimeInputContext.Provider>
  )
})
SmartDatetimeInput.displayName = "DatetimeInput"

// Make it a standalone component

const TimePicker = () => {
  const { value, onValueChange, Time, onTimeChange } = useSmartDateInput()
  const [activeIndex, setActiveIndex] = React.useState(-1)
  const timestamp = 15

  const formateSelectedTime = React.useCallback(
    (time: string, hour: number, partStamp: number) => {
      onTimeChange(time)

      const newVal = value ? new Date(value) : new Date()

      // If no value exists, use current date but only set the time
      newVal.setHours(
        hour,
        partStamp === 0 ? Number.parseInt("00") : timestamp * partStamp
      )

      onValueChange(newVal)
    },
    [value, onValueChange, onTimeChange]
  )

  const handleKeydown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      e.stopPropagation()

      if (!document) return

      const moveNext = () => {
        const nextIndex =
          activeIndex + 1 > DEFAULT_SIZE - 1 ? 0 : activeIndex + 1

        const currentElm = document.getElementById(`time-${nextIndex}`)

        currentElm?.focus()

        setActiveIndex(nextIndex)
      }

      const movePrev = () => {
        const prevIndex =
          activeIndex - 1 < 0 ? DEFAULT_SIZE - 1 : activeIndex - 1

        const currentElm = document.getElementById(`time-${prevIndex}`)

        currentElm?.focus()

        setActiveIndex(prevIndex)
      }

      const setElement = () => {
        const currentElm = document.getElementById(`time-${activeIndex}`)

        if (!currentElm) return

        currentElm.focus()

        const timeValue = currentElm.textContent ?? ""

        // this should work now haha that hour is what does the trick

        const PM_AM = timeValue.split(" ")[1]
        const PM_AM_hour = Number.parseInt(
          timeValue.split(" ")[0].split(":")[0]
        )
        const hour =
          PM_AM === "AM"
            ? PM_AM_hour === 12
              ? 0
              : PM_AM_hour
            : PM_AM_hour === 12
              ? 12
              : PM_AM_hour + 12

        const part = Math.floor(
          Number.parseInt(timeValue.split(" ")[0].split(":")[1]) / 15
        )

        formateSelectedTime(timeValue, hour, part)
      }

      const reset = () => {
        const currentElm = document.getElementById(`time-${activeIndex}`)
        currentElm?.blur()
        setActiveIndex(-1)
      }

      switch (e.key) {
        case "ArrowUp":
          movePrev()
          break

        case "ArrowDown":
          moveNext()
          break

        case "Escape":
          reset()
          break

        case "Enter":
          setElement()
          break
      }
    },
    [activeIndex, formateSelectedTime]
  )

  const handleClick = React.useCallback(
    (hour: number, part: number, PM_AM: string, currentIndex: number) => {
      formateSelectedTime(
        `${hour}:${part === 0 ? "00" : timestamp * part} ${PM_AM}`,
        hour,
        part
      )
      setActiveIndex(currentIndex)
    },
    [formateSelectedTime]
  )

  const currentTime = React.useMemo(() => {
    const timeVal = Time.split(" ")[0]
    return {
      hours: Number.parseInt(timeVal.split(":")[0]),
      minutes: Number.parseInt(timeVal.split(":")[1]),
    }
  }, [Time])

  React.useEffect(() => {
    const getCurrentElementTime = () => {
      const timeVal = Time.split(" ")[0]
      const hours = Number.parseInt(timeVal.split(":")[0])
      const minutes = Number.parseInt(timeVal.split(":")[1])
      const PM_AM = Time.split(" ")[1]

      const formatIndex =
        PM_AM === "AM" ? hours : hours === 12 ? hours : hours + 12
      const formattedHours = formatIndex

      for (let j = 0; j <= 3; j++) {
        const diff = Math.abs(j * timestamp - minutes)
        const selected =
          PM_AM === (formattedHours >= 12 ? "PM" : "AM") &&
          (minutes <= 53 ? diff < Math.ceil(timestamp / 2) : diff < timestamp)

        if (selected) {
          const trueIndex =
            activeIndex === -1 ? formattedHours * 4 + j : activeIndex

          setActiveIndex(trueIndex)

          const currentElm = document.getElementById(`time-${trueIndex}`)
          currentElm?.scrollIntoView({
            block: "center",
            behavior: "smooth",
          })
        }
      }
    }

    getCurrentElementTime()
  }, [Time, activeIndex])

  const height = React.useMemo(() => {
    if (!document) return
    const calendarElm = document.getElementById("calendar")
    if (!calendarElm) return
    return calendarElm.style.height
  }, [])

  return (
    <div className="relative space-y-2 py-3 pr-3 ">
      <h3 className="text-center font-medium text-sm">Time</h3>
      <ScrollArea
        onKeyDown={handleKeydown}
        className="h-[90%] w-full overflow-x-hidden py-0.5 focus-visible:border-0 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        style={{
          height,
        }}
      >
        <ul
          className={cn(
            "flex h-full max-h-56 w-24 flex-col items-center gap-1 px-1 py-0.5"
          )}
        >
          {Array.from({ length: 24 }).map((_, i) => {
            const PM_AM = i >= 12 ? "PM" : "AM"
            const formatIndex = i > 12 ? i % 12 : i === 0 || i === 12 ? 12 : i
            return Array.from({ length: 4 }).map((_, part) => {
              const diff = Math.abs(part * timestamp - currentTime.minutes)

              const trueIndex = i * 4 + part

              // ? refactor : add the select of the default time on the current device (H:MM)
              const isSelected =
                (currentTime.hours === i ||
                  currentTime.hours === formatIndex) &&
                Time.split(" ")[1] === PM_AM &&
                (currentTime.minutes <= 53
                  ? diff < Math.ceil(timestamp / 2)
                  : diff < timestamp)

              const isSuggested = !value && isSelected

              const currentValue = `${formatIndex}:${
                part === 0 ? "00" : timestamp * part
              } ${PM_AM}`

              return (
                <li
                  tabIndex={isSelected ? 0 : -1}
                  id={`time-${trueIndex}`}
                  key={`time-${trueIndex}`}
                  aria-label="currentTime"
                  className={cn(
                    "grid h-8 w-full flex-shrink-0 cursor-pointer place-content-center rounded-md bg-gray-3 px-3 text-sm outline-0 ring-0 hover:bg-secondary hover:text-white focus-visible:border-0 focus-visible:outline-0"
                  )}
                  onClick={() => handleClick(i, part, PM_AM, trueIndex)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      handleClick(i, part, PM_AM, trueIndex)
                    }
                  }}
                  onFocus={() => isSuggested && setActiveIndex(trueIndex)}
                >
                  {currentValue}
                </li>
              )
            })
          })}
        </ul>
      </ScrollArea>
    </div>
  )
}
const getDefaultPlaceholder = (
  showCalendar: boolean,
  showTimePicker: boolean
) => {
  if (!showCalendar && showTimePicker) {
    return 'e.g. "5pm" or "in 2 hours"'
  }
  if (showCalendar && !showTimePicker) {
    return 'e.g. "tomorrow" or "next monday"'
  }
  return 'e.g. "tomorrow at 5pm" or "in 2 hours"'
}
const NaturalLanguageInput = React.forwardRef<
  HTMLInputElement,
  {
    placeholder?: string
    disabled?: boolean
  }
>(function NaturalLanguageInput({ placeholder, ...props }, ref) {
  const { value, onValueChange, onTimeChange, showCalendar, showTimePicker } =
    useSmartDateInput()

  const _placeholder =
    // @ts-ignore
    placeholder ?? getDefaultPlaceholder(showCalendar, showTimePicker)

  const [inputValue, setInputValue] = React.useState<string>("")

  React.useEffect(() => {
    if (!value) {
      setInputValue("")
      return
    }
    // @ts-ignore

    const formattedValue = formatDateTime(value, showCalendar, showTimePicker)
    setInputValue(formattedValue)

    // Only update time if time picker is shown
    if (showTimePicker) {
      const hour = value.getHours()
      const timeVal = `${hour >= 12 ? hour % 12 || 12 : hour || 12}:${String(
        value.getMinutes()
      ).padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`
      onTimeChange(timeVal)
    }
  }, [value, showCalendar, showTimePicker, onTimeChange])

  const handleParse = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsedDateTime = parseDateTime(e.currentTarget.value)
      if (parsedDateTime) {
        // If only showing time picker, preserve the current date
        if (!showCalendar && showTimePicker && value) {
          parsedDateTime.setFullYear(
            value.getFullYear(),
            value.getMonth(),
            value.getDate()
          )
        }
        // If only showing calendar, preserve the current time
        if (showCalendar && !showTimePicker && value) {
          parsedDateTime.setHours(0, 0, 0, 0)
        }
        // console.log(parsedDateTime);

        onValueChange(parsedDateTime)
        setInputValue(
          // @ts-ignore
          formatDateTime(parsedDateTime, showCalendar, showTimePicker)
        )

        if (showTimePicker) {
          const PM_AM = parsedDateTime.getHours() >= 12 ? "PM" : "AM"
          const PM_AM_hour = parsedDateTime.getHours()
          const hour =
            PM_AM_hour > 12
              ? PM_AM_hour % 12
              : PM_AM_hour === 0 || PM_AM_hour === 12
                ? 12
                : PM_AM_hour
          onTimeChange(
            `${hour}:${String(parsedDateTime.getMinutes()).padStart(
              2,
              "0"
            )} ${PM_AM}`
          )
        }
      }
    },
    [value, showCalendar, showTimePicker, onValueChange]
  )

  const handleKeydown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleParse(e as any)
      }
    },
    [handleParse]
  )

  return (
    <input
      ref={ref}
      type="text"
      placeholder={_placeholder}
      value={inputValue}
      onChange={(e) => setInputValue(e.currentTarget.value)}
      onKeyDown={handleKeydown}
      onBlur={handleParse}
      className={cn(
        "mr-0.5 h-8 flex-1 rounded border-none bg-background px-2 ",
        inputBase
      )}
      {...props}
    />
  )
})

NaturalLanguageInput.displayName = "NaturalLanguageInput"

type DateTimeLocalInputProps = {} & CalendarProps

const DateTimeLocalInput = ({
  className,
  ...props
}: DateTimeLocalInputProps) => {
  const { value, onValueChange, showCalendar, showTimePicker } =
    useSmartDateInput()

  const formateSelectedDate = React.useCallback(
    (
      _date: Date | undefined,
      selectedDate: Date,
      _m: ActiveModifiers,
      _e: React.MouseEvent
    ) => {
      const parsedDateTime = new Date(selectedDate)

      if (!showTimePicker) {
        // If only calendar is shown, set time to start of day
        parsedDateTime.setHours(0, 0, 0, 0)
      } else if (value) {
        // If time picker is shown, preserve existing time
        parsedDateTime.setHours(
          value.getHours(),
          value.getMinutes(),
          value.getSeconds(),
          value.getMilliseconds()
        )
      }

      onValueChange(parsedDateTime)
    },
    [value, showTimePicker, onValueChange]
  )

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button
          className={cn(
            "flex items-center justify-center bg-gray-5 px-1 font-normal dark:bg-gray-12",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          <span className="sr-only">calendar</span>
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-auto border-none p-0 " sideOffset={8}>
        <div className="flex gap-1">
          {showCalendar && (
            <Calendar
              {...props}
              id={"calendar"}
              className={cn("peer flex justify-end", inputBase, className)}
              mode="single"
              selected={value}
              onSelect={formateSelectedDate}
              initialFocus
            />
          )}
          {showTimePicker && <TimePicker />}
        </div>
      </Popover.Content>
    </Popover.Root>
  )
}

DateTimeLocalInput.displayName = "DateTimeLocalInput"
