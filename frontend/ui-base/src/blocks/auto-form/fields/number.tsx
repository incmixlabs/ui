import {  FormControl, FormMessage, Input } from "@/base"
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
 * @param fieldProps Additional configuration for the input field, such as toggling label display, enabling currency styling,
 *                   and specifying a custom placeholder (defaulting to "0.00").
 */
export default function AutoFormNumber({
  label,
  isRequired,
  fieldProps,
}: AutoFormInputComponentProps) {
  const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps
  const showLabel = _showLabel === undefined ? true : _showLabel

  // Check if currency styling is enabled (default to true for matching the screenshot)
  const isCurrency = fieldProps.currency !== false

  return (
    <div className="flex flex-col space-y-2">
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
        {isCurrency && (
          <span className="-translate-y-1/2 absolute top-1/2 left-3 text-gray-500">
            $
          </span>
        )}

        <FormControl>
          <Input
            type="number"
            {...fieldPropsWithoutShowLabel}
            className={`h-14 w-full rounded-lg ${isCurrency ? "pl-8" : "px-4"}`}
            placeholder={fieldPropsWithoutShowLabel.placeholder || "0.00"}
          />
        </FormControl>
      </div>

      {/* Fixed height error message container to prevent layout shift */}
      <div className="min-h-[24px] px-1 pt-1">
        <FormMessage className="block max-w-full whitespace-normal break-words text-red-500 text-sm" />
      </div>
    </div>
  )
}
