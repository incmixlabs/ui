"use client"

import { forwardRef } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "../../../utils"
import { Button, Calendar, Popover, type ButtonProps } from "@base"

export const TableDatePicker = forwardRef<
  HTMLDivElement,
  {
    date?: Date
    variant?: ButtonProps["variant"]
    className?: string
    width?: string
    setDate: (date?: Date) => void
  }
>(function TableDatePickerCmp({ date, variant="outline", width="14", setDate, className }, ref) {
  return (
    <Popover.Root>
      <Popover.Trigger className="w-full">
        <Button
          variant={variant}
          className={cn(
            "w-full h-8 justify-start text-left font-normal", 
            "px-2 py-1 text-sm",
            className
          )}
        >
          <CalendarIcon width={width} height={width} className="mr-2 shrink-0" />
          <span className="truncate">
            {date ? format(date, "PPP") : "Select date"}
          </span>
        </Button>
      </Popover.Trigger>
      <Popover.Content width="auto" ref={ref} className="z-50 p-0">
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
