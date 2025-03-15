import { SmartDatetimeInput } from "@components/datetime-picker"
import {
  FormControl,
  FormItem,
  FormMessage,
} from "@components/shadcn-form/form"
import AutoFormLabel from "../common/label"
import AutoFormTooltip from "../common/tooltip"
import type { AutoFormInputComponentProps } from "../types"

export default function AutoFormDate({
  label,
  isRequired,
  field,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  // Parse the value to a Date object if it's not already one
  const dateValue = field.value ?
    (field.value instanceof Date ? field.value : new Date(field.value))
    : undefined;

  // Only use valid dates
  const validDate = dateValue && !Number.isNaN(dateValue.getTime()) ? dateValue : undefined;

  // Handle date changes from the SmartDatetimeInput
  const handleDateChange = (date: Date) => {
    // Convert to ISO string format for JSON schema compatibility
    // This is important because the Zod schema expects string for date-time fields
    field.onChange(date.toISOString());
  };

  return (
    <div className="flex flex-row items-center space-x-2">
      <FormItem className="flex w-full flex-col">
        <div className="flex flex-row items-center justify-between space-x-2">
          <AutoFormLabel label={label} isRequired={isRequired} />
          <FormControl>
            <SmartDatetimeInput
              value={validDate}
              onValueChange={handleDateChange}
              showCalendar={true}
              showTimePicker={fieldProps?.showTimePicker !== false}
              placeholder={fieldProps?.placeholder || `Select ${label.toLowerCase()}`}
              className={fieldProps?.className || "w-full bg-gray-2 dark:bg-gray-1"}
            />
          </FormControl>
          <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
        </div>
        <FormMessage className="ml-[140px]" />
      </FormItem>
    </div>
  )
}