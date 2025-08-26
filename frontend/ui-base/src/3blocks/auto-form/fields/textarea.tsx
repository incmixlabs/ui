import { FormControl, FormItem, FormMessage, TextArea } from "@/base"
import { useFormContext } from "react-hook-form"
import AutoFormLabel from "../common/label"
import type { AutoFormInputComponentProps } from "../types"

/**
 * Renders a styled textarea input field with an optional label and error message for forms.
 *
 * The component displays a label above the textarea when enabled via the fieldProps value,
 * defaulting to visible if not specified. The textarea uses a provided placeholder or defaults to a prompt based on the label.
 *
 * @param label - The text used for the textarea label.
 * @param isRequired - Determines if the field is marked as required.
 * @param fieldProps - Additional properties for the textarea. This can include a flag "showLabel" to control whether the label is rendered and a "placeholder" for input guidance.
 *
 * @returns A JSX element representing the textarea input field with its associated label and error message.
 */
export default function AutoFormTextarea({
  label,
  isRequired,
  field,
  fieldProps,
}: AutoFormInputComponentProps) {
  const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps
  const showLabel = _showLabel === undefined ? true : _showLabel

  // Access form context to check for errors
  const formContext = useFormContext()
  const fieldName = field.name
  const hasError = Boolean(formContext?.formState?.errors?.[fieldName])

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
      <FormControl>
        <TextArea
          className={`w-full resize-none rounded-md bg-white text-gray-900 dark:bg-zinc-950 dark:text-white ${
            hasError
              ? "border-2 border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900"
              : "border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:focus:ring-blue-900"
          } focus-visible:ring-0 focus-visible:ring-offset-0`}
          placeholder={
            fieldPropsWithoutShowLabel?.placeholder ||
            `Enter ${label.toLowerCase()}`
          }
          {...fieldPropsWithoutShowLabel}
        />
      </FormControl>
      <div className="mt-0.5 h-4">
        <FormMessage className="block max-w-full whitespace-normal break-words text-red-500 text-sm" />
      </div>
    </FormItem>
  )
}
