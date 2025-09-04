import React, { useState } from "react"
import { Text, Box, Popover, Button, Calendar, X } from "@incmix/ui"
import { cn } from "@utils"
import { CalendarIcon } from "lucide-react"

interface InlineEditableDateProps {
  value: number | null | undefined
  onSave: (value: number | null) => Promise<void>
  placeholder?: string
  className?: string
  disabled?: boolean
  format?: (timestamp: number | null | undefined) => string
}

const defaultFormatDate = (timestamp: number | null | undefined) => {
  if (!timestamp) return "Not set"
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(timestamp))
}

export function InlineEditableDate({
  value,
  onSave,
  placeholder = "Click to set date...",
  className = "",
  disabled = false,
  format = defaultFormatDate,
}: InlineEditableDateProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDateChange = async (date: Date) => {
    const timestamp = date.getTime()
    console.log(`InlineEditableDate handleDateChange: selected=${new Date(timestamp)}, originalValue=${value ? new Date(value) : null}`)

    if (timestamp === value) {
      console.log("No change detected, exiting edit mode")
      setIsEditing(false)
      return
    }

    console.log("Starting save operation...")
    setIsLoading(true)
    try {
      console.log("Calling onSave with timestamp:", timestamp)
      await onSave(timestamp)
      console.log("onSave completed successfully")
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to save date:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearDate = async () => {
    setIsLoading(true)
    try {
      console.log("Clearing date")
      await onSave(null)
      console.log("Date cleared successfully")
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to clear date:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isEditing && !disabled) {
    return (
      <Box className="relative">
        <Popover.Root
          open={isEditing}
          onOpenChange={(open) => !open && setIsEditing(false)}
        >
          <Popover.Trigger>
            <Button
              variant="outline"
              size="2"
              className={cn(
                "justify-start border-gray-5 bg-white text-left font-normal hover:bg-gray-2",
                !value && "text-gray-9"
              )}
              disabled={isLoading}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? format(value) : "Select date..."}
            </Button>
          </Popover.Trigger>
          <Popover.Content
            className="w-auto border-gray-5 bg-white p-0 shadow-md"
            align="start"
          >
            <Box className="p-3">
              <Calendar
                mode="single"
                selected={value ? new Date(value) : undefined}
                onSelect={(date) => {
                  if (date) {
                    handleDateChange(date)
                  }
                }}
                className="rounded-md border-0"
                initialFocus
              />
              {value && (
                <Box className="mt-2 border-gray-4 border-t pt-2">
                  <Button
                    variant="ghost"
                    size="2"
                    onClick={handleClearDate}
                    disabled={isLoading}
                    className="w-full justify-center text-gray-11 hover:bg-red-2 hover:text-red-9"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Clear date
                  </Button>
                </Box>
              )}
            </Box>
          </Popover.Content>
        </Popover.Root>
      </Box>
    )
  }

  const displayValue = value ? format(value) : placeholder

  return (
    <Text
      className={cn(
        "cursor-pointer transition-all duration-200",
        "-mx-1 rounded px-1 hover:bg-gray-2 hover:text-gray-12",
        !value && "text-gray-9 italic",
        disabled && "cursor-not-allowed opacity-50",
        isLoading && "opacity-50",
        className
      )}
      onClick={() => !disabled && !isLoading && setIsEditing(true)}
      title={disabled ? "Editing disabled" : "Click to edit date"}
      as="p"
    >
      {displayValue}
    </Text>
  )
}
