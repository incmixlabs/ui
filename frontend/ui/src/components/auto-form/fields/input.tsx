import { Input } from "@/components/form/input"
import {
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/shadcn-form/form"
import { Eye, EyeOff } from "lucide-react"
import { useEffect, useState } from "react"
import React from "react"
import { useFormContext } from "react-hook-form"
import AutoFormLabel from "../common/label"
import AutoFormTooltip from "../common/tooltip"
import type { AutoFormInputComponentProps } from "../types"

export default function AutoFormInput({
  label,
  isRequired,
  field,
  // fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  // Extract props we don't want to pass directly to Input
  const {
    showLabel: _showLabel,
    icon,
    type: fieldType,
    ...restFieldProps
  } = fieldProps

  const showLabel = _showLabel === undefined ? true : _showLabel
  const type = fieldType || "text"

  // Create a separate state for the input type itself
  const [inputType, setInputType] = useState(type)

  // Set initial input type on mount
  useEffect(() => {
    setInputType(type)
  }, [type])

  // Access form context to check for errors
  const formContext = useFormContext()
  const fieldName = field.name
  const hasError = Boolean(formContext?.formState?.errors?.[fieldName])

  // Toggle password visibility with a direct type change
  const togglePasswordVisibility = () => {
    setInputType((prevType: string) =>
      prevType === "password" ? "text" : "password"
    )
  }

  // Get the appropriate icon component
  const getInputIcon = () => {
    if (icon && React.isValidElement(React.createElement(icon))) {
      const IconComponent = icon
      return <IconComponent className="h-5 w-5 text-gray-400" />
    }
    return null
  }

  return (
    <FormItem className="mb-6 flex w-full flex-col">
      {showLabel && (
        <div className="mb-2">
          <AutoFormLabel
            label={label}
            isRequired={isRequired}
            className="w-auto font-medium text-base"
          />
        </div>
      )}
      <div className="relative">
        {icon && (
          <div className="-translate-y-1/2 absolute top-1/2 left-3">
            {getInputIcon()}
          </div>
        )}
        <FormControl>
          <Input
            {...restFieldProps}
            type={inputType}
            className={`h-14 w-full rounded-lg ${icon ? "pl-10" : "px-4"} ${
              type === "password" ? "pr-10" : ""
            } ${hasError ? "border-red-500" : ""}`}
            placeholder={
              restFieldProps.placeholder || `Enter your ${label.toLowerCase()}`
            }
          />
        </FormControl>

        {/* Password toggle button */}
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="-translate-y-1/2 absolute top-1/2 right-3"
            tabIndex={-1}
            aria-label={
              inputType === "password" ? "Show password" : "Hide password"
            }
          >
            {inputType === "password" ? (
              <Eye className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeOff className="h-5 w-5 text-gray-400" />
            )}
          </button>
        )}
      </div>

      {/* Fixed height error message container to prevent layout shift */}
      <div className="min-h-[24px] px-1 pt-1">
        <FormMessage className="block max-w-full whitespace-normal break-words text-red-500 text-sm" />
      </div>
    </FormItem>
  )
}
