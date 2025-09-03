import React, { useState } from "react"
import { Text, Box } from "@incmix/ui"
import { SmartDatetimeInput } from "@components/datetime-picker"
import { cn } from "@utils"

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
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(timestamp))
}

export function InlineEditableDate({
  value,
  onSave,
  placeholder = "Click to set date...",
  className = "",
  disabled = false,
  format = defaultFormatDate
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
          <button
            onClick={handleClearDate}
            disabled={isLoading}
            className={cn(
              "absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gray-6 text-gray-11",
              "hover:bg-gray-7 hover:text-gray-12 text-xs flex items-center justify-center",
              "transition-all duration-200 z-10",
              isLoading && "opacity-50 cursor-wait"
            )}
          >
            ×
          </button>
        )}
      </Box>
    )
  }

  const displayValue = value ? format(value) : placeholder

  return (
    <Text
      className={cn(
        "cursor-pointer transition-all duration-200",
        "hover:bg-gray-2 hover:text-gray-12 rounded px-1 -mx-1",
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
