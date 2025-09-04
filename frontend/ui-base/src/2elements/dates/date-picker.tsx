"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { forwardRef } from "react"

import { Button, type ButtonProps, Calendar, Popover } from "@/src/1base"

export const DatePicker = forwardRef<
  HTMLDivElement,
  {
    date?: Date
    variant?: ButtonProps["variant"]
    className?: string
    width?: string
    setDate: (date?: Date) => void
  }
>(function DatePickerCmp(
  { date, variant = "soft", width = "16", setDate },
  ref
) {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant={variant}>
          <CalendarIcon width={width} height={width} />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </Popover.Trigger>
      <Popover.Content ref={ref}>
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </Popover.Content>
    </Popover.Root>
  )
})
