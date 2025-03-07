import { Input } from "@/components/form/input"
import {
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/shadcn-form/form"
import { useFormContext } from "react-hook-form"
import AutoFormLabel from "../common/label"
import AutoFormTooltip from "../common/tooltip"
import type { AutoFormInputComponentProps } from "../types"
import { useState } from "react"
import { User, Eye, EyeOff } from "lucide-react"
import React from "react"

export default function AutoFormInput({
  label,
  isRequired,
  field,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  const {
    showLabel: _showLabel,
    icon,
    ...fieldPropsWithoutShowLabelAndIcon
  } = fieldProps
  const showLabel = _showLabel === undefined ? true : _showLabel
  const type = fieldProps.type || "text"

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false)

  // Access form context to check for errors
  const formContext = useFormContext()
  const fieldName = field.name
  const hasError = Boolean(formContext?.formState?.errors?.[fieldName])

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // Get the appropriate icon component
  const getInputIcon = () => {
    // If a direct component reference was provided, use it
    if (icon && React.isValidElement(React.createElement(icon))) {
      const IconComponent = icon
      return <IconComponent className="h-5 w-5 text-gray-400" />
    }
  }

  // Determine the actual input type (for password fields)
  const actualType =
    type === "password" ? (showPassword ? "text" : "password") : type

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
        <div className="-translate-y-1/2 absolute top-1/2 left-3">
          {getInputIcon()}
        </div>
        <FormControl>
          <Input
            type={actualType}
            {...fieldPropsWithoutShowLabelAndIcon}
            className={`h-14 w-full rounded-lg pr-4 pl-10 ${
              type === "password" ? "pr-10" : ""
            } ${hasError ? "border-red-500" : ""}`}
            placeholder={
              fieldProps.placeholder || `Enter your ${label.toLowerCase()}`
            }
          />
        </FormControl>

        {/* Password toggle button */}
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="-translate-y-1/2 absolute top-1/2 right-3"
            tabIndex={-1} // Prevent tab focus on this button
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        )}
      </div>

      {/* Fixed height error message container to prevent layout shift */}
      <div className="min-h-[20px] pt-1">
        <FormMessage className="text-red-500 text-sm" />
      </div>
    </FormItem>
  )
}
