import { FormControl, FormItem, FormLabel, FormMessage } from "@/base"
import { MultiSelect } from "@/src/2elements/multi-select"
import type { AutoFormInputComponentProps } from "../types"

// Define the allowed color types to match the component's requirements
type ColorType = "gray" | "indigo" | "cyan" | "orange" | "crimson" | undefined

/**
 * Renders a multiple selection form field.
 *
 * This component displays a selector that allows the user to choose multiple options. It pulls available options and styling
 * information from the configuration props and validates the default color against a set of allowed values ("gray", "indigo", "cyan", "orange", "crimson"),
 * defaulting to "gray" if necessary. The field label is conditionally rendered based on provided configuration, and a validation
 * message placeholder is included.
 *
 * @param props - Properties for configuring the multiple selection field:
 *   - field: An object representing the form field, including its current value and change handler.
 *   - fieldConfigItem: Configuration data for the field, providing input properties such as options, placeholder, CSS class, and default color.
 *   - label: The label text to display alongside the field.
 *   - isRequired: A flag indicating whether the field is mandatory.
 *
 * @returns A JSX element containing the complete multiple selection form field.
 */
export default function MultipleSelectorField({
  field,
  fieldConfigItem,
  label,
  isRequired,
}: AutoFormInputComponentProps) {
  // Extract options from fieldConfigItem or use empty array as fallback
  const options =
    fieldConfigItem.inputProps?.options ||
    fieldConfigItem.inputProps?.defaultOptions ||
    []

  // Safely cast the defaultColor to the accepted type, defaulting to "gray"
  // if the value isn't one of the allowed options
  const defaultColor = fieldConfigItem.inputProps?.defaultColor as string
  const safeColor: ColorType = [
    "gray",
    "indigo",
    "cyan",
    "orange",
    "crimson",
  ].includes(defaultColor)
    ? (defaultColor as ColorType)
    : "gray"

  return (
    <FormItem>
      {fieldConfigItem.inputProps?.showLabel !== false && (
        <FormLabel>
          {label} {isRequired && <span className="text-destructive">*</span>}
        </FormLabel>
      )}

      <FormControl>
        <MultiSelect
          value={field.value || []}
          onChange={field.onChange}
          defaultOptions={options}
          placeholder={
            fieldConfigItem.inputProps?.placeholder || "Select options"
          }
          className={fieldConfigItem.inputProps?.className}
          defaultColor={safeColor}
        />
      </FormControl>
      {/*
      {fieldConfigItem.description && (
        <FormDescription>{fieldConfigItem.description}</FormDescription>
      )} */}

      <FormMessage />
    </FormItem>
  )
}
