"use client"

import { forwardRef } from "react"
import { DateTime} from "luxon"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button, Calendar, Popover, type ButtonProps } from "@base"

export const DatePicker =  forwardRef<
  HTMLDivElement,
  {
    date?: Date
    variant?: ButtonProps["variant"]
    className?: string
    width?: string
    setDate: (date?: Date) => void
  }
>(function DatePickerCmp({ date, variant="soft", width="16", setDate }, ref) {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button
          variant={variant}
        >
          <CalendarIcon width={width} />
          {date ? DateTime.fromJSDate(date).toFormat("PPP") : <span>Pick a date</span>}
        </Button>
      </Popover.Trigger>
      <Popover.Content width="auto" ref={ref}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          autoFocus
        />
      </Popover.Content>
    </Popover.Root>
  )
})
