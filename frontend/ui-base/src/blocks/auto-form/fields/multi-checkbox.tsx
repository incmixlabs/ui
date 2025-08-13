import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/base"
import { cn } from "@/utils/cn"
import { useEffect, useState } from "react"
import type {
  AutoFormInputComponentProps,
  MCQLayoutType,
  MCQOption,
} from "../types"
import { iconSize } from "@/base/icon"

const getLayoutClass = (layout: MCQLayoutType, gridCols = 2): string => {
  const baseClasses = "gap-3"
  switch (layout) {
    case "grid":
      return cn(
        baseClasses,
        gridCols === 2
          ? "grid grid-cols-1 sm:grid-cols-2"
          : gridCols === 3
            ? "grid grid-cols-1 sm:grid-cols-3"
            : gridCols === 4
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              : "grid grid-cols-1 sm:grid-cols-2"
      )
    case "row":
      return cn(baseClasses, "flex flex-row flex-wrap")
    case "column":
      return cn(baseClasses, "flex flex-col")
    default:
      return cn(baseClasses, "grid grid-cols-1 sm:grid-cols-2")
  }
}

const getOptionWidthClass = (layout: MCQLayoutType): string => {
  switch (layout) {
    case "grid":
      return "w-full"
    case "row":
      return "flex-grow-0 mr-6"
    case "column":
      return "w-full"
    default:
      return "w-full"
  }
}

export default function AutoFormMultiCheckbox({
  label,
  isRequired,
  field,
  fieldConfigItem,
}: AutoFormInputComponentProps) {
  const options = (fieldConfigItem.inputProps?.options || []) as MCQOption[]
  const layout = (fieldConfigItem.inputProps?.layout || "grid") as MCQLayoutType
  const gridCols = fieldConfigItem.inputProps?.gridCols || 2

  // Initialize field.value as an array if it's undefined or null
  useEffect(() => {
    if (!field.value) {
      field.onChange([])
    }
  }, [field])

  // Handler for checkbox changes
  const handleCheckboxChange = (value: string, checked: boolean) => {
    const currentValues = Array.isArray(field.value) ? [...field.value] : []

    if (checked) {
      // Add value if checked
      if (!currentValues.includes(value)) {
        field.onChange([...currentValues, value])
      }
    } else {
      // Remove value if unchecked
      field.onChange(currentValues.filter((v) => v !== value))
    }
  }

  // Check if a value is selected
  const isValueSelected = (value: string) => {
    return Array.isArray(field.value) && field.value.includes(value)
  }

  // Validate if at least one option is selected (if required)
  const hasSelection = Array.isArray(field.value) && field.value.length > 0

  // Track if the field has been touched to delay validation until interaction
  const [touched, setTouched] = useState(false)

  // Set touched when user interacts with any checkbox
  const handleTouch = () => {
    if (!touched) {
      setTouched(true)
    }
  }

  return (
    <div className="flex w-full flex-col space-y-4">
      <FormItem className="w-full">
        <fieldset className="space-y-4">
          <legend className="mb-4">
            <FormLabel className="font-medium text-gray-800 dark:text-white text-xl">
              {label}
              {isRequired && <span className="text-destructive"> *</span>}
            </FormLabel>
            {fieldConfigItem.description && (
              <p className="mt-1 text-muted-foreground text-sm dark:text-gray-400">
                {fieldConfigItem.description}
              </p>
            )}
          </legend>

          <FormControl>
            <div
              className={getLayoutClass(layout, gridCols)}
              aria-required={isRequired ? "true" : "false"}
            >
              {options.map((option) => (
                <FormItem
                  key={option.value}
                  className={cn(
                    getOptionWidthClass(layout),
                    "flex items-center space-x-2"
                  )}
                >
                  <FormControl>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`checkbox-${option.value}`}
                        className={`${iconSize} rounded border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-800`}
                        value={option.value}
                        onChange={(e) => {
                          handleCheckboxChange(option.value, e.target.checked)
                          handleTouch()
                        }}
                        checked={isValueSelected(option.value)}
                      />
                      <label
                        htmlFor={`checkbox-${option.value}`}
                        className="ml-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
                      >
                        {option.label}
                      </label>
                    </div>
                  </FormControl>
                </FormItem>
              ))}
            </div>
          </FormControl>
          {isRequired && !hasSelection && touched && (
            <p className="mt-2 font-medium text-destructive dark:text-red-400 text-sm">
              Please select at least one option
            </p>
          )}
          <FormMessage className="dark:text-red-400" />
        </fieldset>
      </FormItem>
    </div>
  )
}
