import React, { useState, useRef, useEffect } from "react"
import { Text } from "@incmix/ui"
import { cn } from "@utils"

interface InlineEditableNumberProps {
  value: number
  onSave: (value: number) => Promise<void>
  placeholder?: string
  className?: string
  disabled?: boolean
  prefix?: string
  format?: (value: number) => string
}

export function InlineEditableNumber({
  value,
  onSave,
  placeholder = "Enter amount...",
  className = "",
  disabled = false,
  prefix = "",
  format = (val) => val.toString()
}: InlineEditableNumberProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value.toString())
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setEditValue(value.toString())
  }, [value])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleSave = async () => {
    const numericValue = parseFloat(editValue.replace(/[^0-9.-]/g, ''))
    
    if (isNaN(numericValue) || numericValue === value) {
      setIsEditing(false)
      setEditValue(value.toString())
      return
    }

    if (numericValue < 0) {
      setEditValue(value.toString())
      setIsEditing(false)
      return
    }

    setIsLoading(true)
    try {
      await onSave(numericValue)
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to save number:", error)
      setEditValue(value.toString())
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setEditValue(value.toString())
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSave()
    } else if (e.key === "Escape") {
      handleCancel()
    }
  }

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isLoading}
        className={cn(
          "bg-transparent border-none outline-none w-20",
          "focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-1 -mx-1",
          "transition-all duration-200",
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          isLoading && "opacity-50 cursor-wait",
          className
        )}
      />
    )
  }

  return (
    <Text
      className={cn(
        "cursor-pointer transition-all duration-200",
        "hover:bg-gray-2 hover:text-gray-12 rounded px-1 -mx-1",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      onClick={() => !disabled && setIsEditing(true)}
      title={disabled ? "Editing disabled" : "Click to edit"}
      as="p"
    >
      {prefix}{format(value)}
    </Text>
  )
}
