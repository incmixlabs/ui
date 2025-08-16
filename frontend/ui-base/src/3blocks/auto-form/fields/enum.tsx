// components/auto-form/fields/enum.tsx - Enhanced with color support
import { FormControl, FormItem, FormMessage, Select } from "@/base"
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
    <div className="flex flex-row items-center gap-2">
      <FormItem className="flex flex-row items-center justify-start gap-2 ">
        <AutoFormLabel label={label} isRequired={isRequired} />
        <FormControl>
          <Select.Root
            onValueChange={field.onChange}
            value={field.value || ""} // Ensure controlled value
            {...fieldProps}
          >
            <Select.Trigger className={`${fieldProps.className} min-w-[140px]`}>
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
        <FormMessage />
      </FormItem>
      {/* <AutoFormTooltip fieldConfigItem={fieldConfigItem} /> */}
    </div>
  )
}
