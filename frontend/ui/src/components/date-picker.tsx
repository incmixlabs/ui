"use client"

import { forwardRef } from "react"
import { format} from "date-fns"
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
          <CalendarIcon width={width} height={width}/>
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </Popover.Trigger>
      <Popover.Content width="auto" ref={ref}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </Popover.Content>
    </Popover.Root>
  )
})
