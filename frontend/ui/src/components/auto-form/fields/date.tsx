import { SmartDatetimeInput } from "@components/datetime-picker"
import {
  FormControl,
  FormItem,
  FormMessage,
} from "@components/shadcn-form/form"
import AutoFormLabel from "../common/label"
import type { AutoFormInputComponentProps } from "../types"

/**
 * Renders a date input field with validation and ISO formatting for form integration.
 *
 * This component displays a labeled date input using a smart datetime picker. It converts the provided
 * field value to a Date object if necessary, filters out invalid dates, and only uses a valid date for display.
 * When a new date is selected, the component converts it to an ISO string before invoking the change handler,
 * ensuring compatibility with JSON schema validation.
 *
 * @param label - The text label displayed above the date input.
 * @param isRequired - Whether the date field is mandatory.
 * @param field - An object containing the current date value and a change handler.
 * @param fieldProps - Optional properties to customize the input, such as placeholder text, time picker options, and styling.
 *
 * @returns A React element that includes the label, date input, and associated form message.
 */
export default function AutoFormDate({
  label,
  isRequired,
  field,

  fieldProps,
}: AutoFormInputComponentProps) {
  // Parse the value to a Date object if it's not already one
  const dateValue = field.value
    ? field.value instanceof Date
      ? field.value
      : new Date(field.value)
    : undefined

  // Only use valid dates
  const validDate =
    dateValue && !Number.isNaN(dateValue.getTime()) ? dateValue : undefined

  // Handle date changes from the SmartDatetimeInput
  const handleDateChange = (date: Date) => {
    // Convert to ISO string format for JSON schema compatibility
    // This is important because the Zod schema expects string for date-time fields
    field.onChange(date.toISOString())
  }

  return (
    <FormItem className="flex w-full flex-col space-y-2">
      <div className="mb-2">
        <AutoFormLabel
          label={label}
          isRequired={isRequired}
          className="w-auto font-medium text-base"
        />
      </div>
      <FormControl>
        <SmartDatetimeInput
          value={validDate}
          onValueChange={handleDateChange}
          showCalendar={true}
          showTimePicker={fieldProps?.showTimePicker !== false}
          placeholder={
            fieldProps?.placeholder || `Select ${label.toLowerCase()}`
          }
          className={fieldProps?.className || "w-full bg-gray-2 dark:bg-gray-1"}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}
