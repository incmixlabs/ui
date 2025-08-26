import { FormControl, FormItem, FormMessage, Input } from "@/base"
import { useFormContext } from "react-hook-form"
import AutoFormLabel from "../common/label"
import type { AutoFormInputComponentProps } from "../types"

/**
 * Renders a number input field with optional label and currency formatting.
 *
 * This component conditionally displays a label (enabled by default unless overridden by `fieldProps.showLabel`)
 * and a number input that adapts its styling when currency formatting is enabled (i.e., when `fieldProps.currency`
 * is not explicitly set to false). If currency formatting is active, a dollar sign ('$') is rendered within the input
 * and the input's padding is adjusted. The component also reserves a fixed space for error messages to prevent layout shifts.
 *
 * @param label The text label for the input field.
 * @param isRequired Indicates whether the input is required.
 * @param field The field object.
 * @param fieldProps Additional configuration for the input field, such as toggling label display, enabling currency styling,
 *                   and specifying a custom placeholder (defaulting to "0.00").
 */
export default function AutoFormNumber({
  label,
  isRequired,
  field,
  fieldProps = {},
}: AutoFormInputComponentProps) {
  const {
    showLabel: _showLabel,
    currency,
    ...fieldPropsWithoutShowLabel
  } = fieldProps
  const showLabel = _showLabel === undefined ? true : _showLabel
  const isCurrency = currency !== false // Default to true unless explicitly false

  // Access form context to check for errors (supports nested names)
  const { getFieldState, formState } = useFormContext()
  const { error } = getFieldState(field.name, formState)
  const hasError = Boolean(error)
  const fieldName = field.name

  return (
    <FormItem className="flex w-full flex-col space-y-2">
      {showLabel && (
        <div className="mb-1">
          <AutoFormLabel
            label={label}
            isRequired={isRequired}
            className="w-auto font-medium text-base"
          />
        </div>
      )}

      <div className="relative">
        {isCurrency && (
          <span className="-translate-y-1/2 absolute top-1/2 left-3 text-gray-500">
            $
          </span>
        )}

        <FormControl>
          <Input
            {...field}
            {...fieldPropsWithoutShowLabel}
            type="number"
            step="any"
            inputMode="decimal"
            id={field.name}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${fieldName}-error` : undefined}
            onChange={(e) =>
              field.onChange(
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
            className={`h-10 w-full rounded-md bg-white text-gray-900 dark:bg-zinc-950 dark:text-white ${isCurrency ? "pl-8" : "px-4"} ${
              hasError
                ? "border-2 border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900"
                : "border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:focus:ring-blue-900"
            } focus-visible:ring-0 focus-visible:ring-offset-0`}
            placeholder={fieldPropsWithoutShowLabel.placeholder || "0.00"}
          />
        </FormControl>
      </div>

      <div className="mt-0.5 min-h-[1.25rem]">
        <FormMessage
          id={`${fieldName}-error`}
          className="block max-w-full whitespace-normal break-words text-red-500 text-sm"
        />
      </div>
    </FormItem>
  )
}
