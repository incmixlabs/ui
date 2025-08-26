// components/auto-form/fields/enum.tsx - Enhanced with color support
import { FormControl, FormItem, FormMessage, Select } from "@/base"
import { cn } from "@/utils/cn"
import { useFormContext } from "react-hook-form"
import AutoFormLabel from "../common/label"
import type { AutoFormInputComponentProps } from "../types"
import { getBaseSchema } from "../utils"

interface OptionWithColor {
  label: string
  value: string
  color?: string
}

export default function AutoFormEnum({
  label,
  isRequired,
  field,
  fieldConfigItem,
  zodItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  // Access form context to check for errors
  const formContext = useFormContext()
  const fieldName = field.name
  const hasError = Boolean(formContext?.formState?.errors?.[fieldName])

  // Default to empty array for values
  let values: OptionWithColor[] = []

  // First check for options directly on the field config (like in translationFormSchema)
  if (fieldConfigItem?.options) {
    values = fieldConfigItem.options.map((opt: any) => ({
      label: String(opt.label),
      value: String(opt.value),
      color: opt.color, // Include color if available
    }))
  }
  // Then try to get options from fieldConfigItem.inputProps
  else if (fieldConfigItem?.inputProps?.options) {
    values = fieldConfigItem.inputProps.options.map((opt: any) => ({
      label: String(opt.label),
      value: String(opt.value),
      color: opt.color, // Include color if available
    }))
  }
  // Finally try to get values from Zod schema
  else {
    let baseValues: any
    try {
      const baseSchema = getBaseSchema(zodItem)
      baseValues = (baseSchema as any)?._def?.values

      if (baseValues) {
        if (!Array.isArray(baseValues)) {
          values = Object.entries(baseValues).map(([value, label]) => ({
            label: String(label),
            value: String(value),
          }))
        } else {
          values = baseValues.map((value) => ({
            label: String(value),
            value: String(value),
          }))
        }
      }
    } catch (e) {
      // Handle case where zodItem doesn't have the expected structure
      console.warn("Error getting enum values from schema:", e)
    }
  }

  function findItem(value: any) {
    return values.find((item) => item.value === value)
  }

  // Component to render option with color indicator
  const OptionDisplay = ({
    option,
    isSelected = false,
  }: { option: OptionWithColor; isSelected?: boolean }) => (
    <div className="flex items-center gap-2">
      {option.color && (
        <div
          className="h-3 w-3 rounded-full border border-gray-300"
          style={{ backgroundColor: option.color }}
        />
      )}
      <span className={isSelected ? "font-medium" : ""}>{option.label}</span>
    </div>
  )

  // Get current selected option
  const selectedOption = field.value ? findItem(field.value) : null

  return (
    <FormItem className="flex w-full flex-col space-y-2">
      <div className="mb-1">
        <AutoFormLabel
          label={label}
          isRequired={isRequired}
          className="w-auto font-medium text-base"
        />
      </div>
      <FormControl>
        <Select.Root
          onValueChange={field.onChange}
          value={field.value || ""} // Ensure controlled value
          {...fieldProps}
        >
          <Select.Trigger
            className={cn(
              "min-w-[140px]",
              hasError
                ? "border-2 border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900"
                : "border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:focus:ring-blue-900",
              fieldProps?.className
            )}
            aria-labelledby={`${field.name}-label`}
          >
            {selectedOption ? (
              <OptionDisplay option={selectedOption} isSelected />
            ) : (
              <span className="text-gray-500">
                {fieldProps.placeholder || `Select ${label.toLowerCase()}...`}
              </span>
            )}
          </Select.Trigger>

          <Select.Content>
            {values.map((option) => (
              <Select.Item
                value={option.value}
                key={option.value}
                className="cursor-pointer"
              >
                <OptionDisplay option={option} />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </FormControl>
      <div className="mt-0.5 h-4">
        <FormMessage className="block max-w-full whitespace-normal break-words text-red-500 text-sm" />
      </div>
    </FormItem>
  )
}
