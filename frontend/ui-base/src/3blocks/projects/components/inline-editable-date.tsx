import { Box, Button, Text } from "@/base"
import { SmartDatetimeInput } from "@/src/2elements/dates/datetime-picker"
import { cn } from "@/src/utils/cn"
import React, { useState } from "react"

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

    if (timestamp === value) {
      setIsEditing(false)
      return
    }

    setIsLoading(true)
    try {
      await onSave(timestamp)
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
      await onSave(null)
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to clear date:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isEditing && !disabled) {
    return (
      <Box className="relative w-full">
        <SmartDatetimeInput
          value={value ? new Date(value) : undefined}
          onValueChange={handleDateChange}
          showCalendar={true}
          showTimePicker={false}
          removeInput={false}
          variant="ghost"
        />
        {value && (
          <Button
            onClick={handleClearDate}
            disabled={isLoading}
            className={cn(
              "-top-1 -right-1 absolute h-5 w-5 rounded-full bg-gray-6 text-gray-11",
              "flex items-center justify-center text-xs hover:bg-gray-7 hover:text-gray-12",
              "z-10 transition-all duration-200",
              isLoading && "cursor-wait opacity-50"
            )}
          >
            ×
          </Button>
        )}
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
