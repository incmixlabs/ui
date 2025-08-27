import React from "react"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/base"
import { cn } from "@/utils/cn"
import { useFormContext } from "react-hook-form"
import type {
  AutoFormInputComponentProps,
  MCQLayoutType,
  MCQOption,
  MCQSizeType,
} from "../types"

const sizeStyles: Record<MCQSizeType, string> = {
  sm: "min-h-[36px] text-sm px-3",
  md: "min-h-[42px] text-base px-4",
  lg: "min-h-[50px] text-lg px-5",
}

const getLayoutClass = (layout: MCQLayoutType, gridCols = 2): string => {
  // Add w-full to base classes
  const baseClasses = "gap-2 w-full"
  switch (layout) {
    case "grid":
      return cn(
        baseClasses,
        gridCols === 2
          ? // Force grid items to take equal width with fr units
            "grid grid-cols-1 sm:grid-cols-2"
          : gridCols === 3
            ? "grid grid-cols-1 sm:grid-cols-3"
            : gridCols === 4
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              : "grid grid-cols-1 sm:grid-cols-2"
      )
    case "row":
      return cn(baseClasses, "flex flex-row flex-wrap justify-between")
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
      // For row layout, ensure items take up appropriate space
      return "flex-grow-0 w-[48%]" // Use percentage width instead of min-width
    case "column":
      return "w-full"
    default:
      return "w-full"
  }
}

export default function AutoFormMCQ({
  label,
  isRequired,
  field,
  fieldConfigItem,
}: AutoFormInputComponentProps) {
  const options = (fieldConfigItem.inputProps?.options || []) as MCQOption[]
  const layout = (fieldConfigItem.inputProps?.layout || "grid") as MCQLayoutType
  const gridCols = fieldConfigItem.inputProps?.gridCols || 2
  const optionSize = (fieldConfigItem.inputProps?.optionSize ||
    "md") as MCQSizeType

  // Access form context to check for errors (supports nested names)
  const { getFieldState, formState } = useFormContext()
  const { error } = getFieldState(field.name, formState)
  const hasError = Boolean(error)

  return (
    <div className="flex w-full flex-col space-y-4">
      <FormItem className="w-full">
        <div className="mb-4">
          <FormLabel className="font-medium text-gray-800 text-xl dark:text-white">
            {label}
            {isRequired && <span className="text-destructive"> *</span>}
          </FormLabel>
          {fieldConfigItem.description && (
            <p className="mt-1 text-muted-foreground text-sm dark:text-gray-400">
              {fieldConfigItem.description}
            </p>
          )}
        </div>

        <FormControl>
          <div
            className={getLayoutClass(layout, gridCols)}
            role="radiogroup"
            aria-required={isRequired ? "true" : "false"}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${field.name}-error` : undefined}
          >
            {options.map((option) => (
              <FormItem
                key={option.value}
                className={getOptionWidthClass(layout)}
              >
                <FormControl>
                  <label>
                    <input
                      type="radio"
                      className="peer sr-only"
                      name={field.name}
                      value={option.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      checked={field.value === option.value}
                      required={isRequired}
                      aria-invalid={hasError}
                    />
                    <div
                      className={cn(
                        "flex items-center justify-center rounded-lg bg-white text-gray-900",
                        "dark:bg-gray-800/50 dark:text-gray-300",
                        "cursor-pointer transition-all duration-200",
                        "hover:border-blue-100 hover:bg-blue-50 dark:hover:border-blue-900 dark:hover:bg-blue-900/30",
                        "peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white",
                        "focus-within:ring-2 focus-within:ring-blue-500",
                        "font-medium text-gray-600 dark:text-gray-300",
                        sizeStyles[optionSize],
                        layout === "row" ? "w-full" : "min-w-[120px]",
                        hasError
                          ? "border-2 border-red-500"
                          : "border-2 border-gray-300 dark:border-gray-700"
                      )}
                    >
                      {option.label}
                    </div>
                  </label>
                </FormControl>
              </FormItem>
            ))}
          </div>
        </FormControl>
        <div className="mt-0.5 min-h-[1.25rem]">
          <FormMessage
            id={`${field.name}-error`}
            className="block max-w-full whitespace-normal break-words text-red-500 text-sm"
          />
        </div>
      </FormItem>
    </div>
  )
}
