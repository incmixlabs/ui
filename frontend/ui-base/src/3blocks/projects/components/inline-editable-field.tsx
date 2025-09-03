import { Heading, Text } from "@/base"
import { cn } from "@/utils/cn"
import { useEffect, useRef, useState } from "react"

interface InlineEditableFieldProps {
  value: string
  onSave: (value: string) => Promise<void>
  placeholder?: string
  className?: string
  as?: "heading" | "text"
  size?: "1" | "2" | "3" | "4" | "5"
  multiline?: boolean
  disabled?: boolean
}

export function InlineEditableField({
  value,
  onSave,
  placeholder = "Click to edit...",
  className = "",
  as = "text",
  size = "3",
  multiline = false,
  disabled = false,
}: InlineEditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    setEditValue(value)
  }, [value])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      if (inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select()
      } else {
        // For textarea, select all text
        inputRef.current.setSelectionRange(0, inputRef.current.value.length)
      }
    }
  }, [isEditing])

  const handleSave = async () => {
    if (editValue.trim() === value || !editValue.trim()) {
      setIsEditing(false)
      setEditValue(value)
      return
    }

    setIsLoading(true)
    try {
      await onSave(editValue.trim())
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to save:", error)
      setEditValue(value) // Revert on error
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault()
      handleSave()
    } else if (e.key === "Enter" && multiline && e.metaKey) {
      e.preventDefault()
      handleSave()
    } else if (e.key === "Escape") {
      handleCancel()
    }
  }

  const baseInputStyles = cn(
    "resize-none border-none bg-transparent outline-none",
    "-mx-1 rounded px-1 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
    "transition-all duration-200",
    multiline && "w-full",
    isLoading && "cursor-wait opacity-50"
  )

  if (isEditing) {
    const InputComponent = multiline ? "textarea" : "input"

    return (
      <InputComponent
        ref={inputRef as any}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isLoading}
        className={cn(
          baseInputStyles,
          as === "heading" ? "font-medium text-gray-12" : "text-gray-11",
          multiline && "min-h-[60px]",
          className
        )}
        style={{
          fontSize: as === "heading" ? undefined : "inherit",
          lineHeight: as === "heading" ? undefined : "inherit",
          fontWeight: as === "heading" ? "500" : "inherit",
        }}
      />
    )
  }

  const displayValue = value || placeholder
  const commonProps = {
    className: cn(
      "cursor-pointer transition-all duration-200",
      "-mx-1 rounded px-1 hover:bg-gray-2 hover:text-gray-12",
      !value && "text-gray-9 italic",
      disabled && "cursor-not-allowed opacity-50",
      multiline && "block w-full",
      className
    ),
    onClick: () => !disabled && setIsEditing(true),
    title: disabled ? "Editing disabled" : "Click to edit",
  }

  if (as === "heading") {
    return (
      <Heading {...commonProps} size={size} as="h3">
        {displayValue}
      </Heading>
    )
  }

  return (
    <Text {...commonProps} as="p">
      {displayValue}
    </Text>
  )
}
