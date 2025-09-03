import React, { useState, useRef, useEffect } from "react"
import { Heading, Text } from "@incmix/ui"
import { cn } from "@utils"

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
    console.log(`InlineEditableField useEffect: value changed to "${value}", currently editing: ${isEditing}`)
    if (!isEditing) {
      setEditValue(value)
      console.log(`Updated editValue to "${value}"`)
    } else {
      console.log(`Not updating editValue because currently editing`)
    }
  }, [value, isEditing])

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
    console.log(`InlineEditableField handleSave: editValue="${editValue}", originalValue="${value}"`)
    
    if (editValue.trim() === value || !editValue.trim()) {
      console.log("No change detected, exiting edit mode")
      setIsEditing(false)
      setEditValue(value)
      return
    }

    console.log("Starting save operation...")
    setIsLoading(true)
    try {
      console.log("Calling onSave with:", editValue.trim())
      await onSave(editValue.trim())
      console.log("onSave completed successfully")
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to save:", error)
      console.log("Reverting to original value due to error")
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
          // Ultra-minimal styling for seamless editing
          "m-0 w-full flex-1 resize-none border-none bg-transparent p-0",
          "focus:outline-none focus:ring-0",
          // Typography matching
          as === "heading" ? "font-medium text-gray-12" : "text-gray-11",
          multiline && "min-h-[60px]",
          isLoading && "cursor-wait opacity-50",
          className
        )}
        style={{
          fontSize: as === "heading" ? undefined : "inherit",
          lineHeight: as === "heading" ? undefined : "inherit",
          fontWeight: as === "heading" ? "500" : "inherit",
          minHeight: multiline ? "60px" : "auto",
          height: "auto",
        }}
      />
    )
  }

  const displayValue = value || placeholder
  const commonProps = {
    className: cn(
      "cursor-pointer transition-all duration-200",
      "hover:bg-gray-2 hover:text-gray-12",
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
