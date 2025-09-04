import { Input, Text } from "@/base"
import { cn } from "@/utils/cn"
import { useEffect, useRef, useState } from "react"

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
  format = (val) => val.toString(),
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
    const numericValue = Number.parseFloat(editValue.replace(/[^0-9.-]/g, ""))

    if (Number.isNaN(numericValue) || numericValue === value) {
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
      setIsEditing(false)
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
      <Input
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
        // Sort CSS classes alphabetically to fix lint warning
        className={cn(
          // Remove all borders, outlines, and other visual elements
          "[appearance:textfield]",
          "appearance-none",
          "bg-transparent",
          "border-0",
          "border-none",
          "border-transparent",
          "flex-1",
          "focus-visible:border-0",
          "focus-visible:border-none",
          "focus-visible:outline-0",
          "focus-visible:outline-none",
          "focus-visible:ring-0",
          "focus-visible:shadow-none",
          "focus:border-0",
          "focus:border-none",
          "focus:outline-0",
          "focus:outline-none",
          "focus:ring-0",
          "focus:ring-offset-0",
          "focus:shadow-none",
          "hover:border-0",
          "hover:border-none",
          "hover:outline-none",
          "m-0",
          "outline-0",
          "outline-none",
          "p-0",
          "ring-0",
          "ring-offset-0",
          "shadow-none",
          "w-20",
          "[&::-webkit-inner-spin-button]:appearance-none",
          "[&::-webkit-outer-spin-button]:appearance-none",
          "data-[focus]:border-0 data-[focus]:border-transparent data-[focus]:outline-none data-[focus]:ring-0",
          // Loading state
          isLoading && "cursor-wait opacity-50",
          className
        )}
        // Add aggressive inline styles with !important to fully override any browser styling
        style={{
          fontSize: "inherit",
          lineHeight: "inherit",
          minHeight: "auto",
          height: "auto",
          border: "none !important",
          outline: "none !important",
          boxShadow: "none !important",
          WebkitAppearance: "none",
          MozAppearance: "none",
          appearance: "none",
          borderRadius: 0,
          background: "transparent",
        }}
      />
    )
  }

  return (
    <Text
      className={cn(
        "cursor-pointer transition-all duration-200",
        "hover:bg-gray-2 hover:text-gray-12",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      onClick={() => !disabled && setIsEditing(true)}
      title={disabled ? "Editing disabled" : "Click to edit"}
      as="p"
    >
      {prefix}
      {format(value)}
    </Text>
  )
}
