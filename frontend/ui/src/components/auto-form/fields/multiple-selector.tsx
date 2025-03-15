import MultipleSelector from "@components/multiple-selector/multiple-selector"
import type { AutoFormInputComponentProps } from "../types"
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/shadcn-form/form"

// Define the allowed color types to match the component's requirements
type ColorType = "gray" | "indigo" | "cyan" | "orange" | "crimson" | undefined;

export default function MultipleSelectorField({
  field,
  fieldConfigItem,
  label,
  isRequired,
  zodItem,
}: AutoFormInputComponentProps) {
  // Extract options from fieldConfigItem or use empty array as fallback
  const options = fieldConfigItem.inputProps?.options ||
  fieldConfigItem.inputProps?.defaultOptions ||
  [];

  // Safely cast the defaultColor to the accepted type, defaulting to "gray"
  // if the value isn't one of the allowed options
  const defaultColor = fieldConfigItem.inputProps?.defaultColor as string;
  const safeColor: ColorType =
    ["gray", "indigo", "cyan", "orange", "crimson"].includes(defaultColor)
      ? defaultColor as ColorType
      : "gray";

  return (
    <FormItem>
      {fieldConfigItem.inputProps?.showLabel !== false && (
        <FormLabel>
          {label} {isRequired && <span className="text-destructive">*</span>}
        </FormLabel>
      )}

      <FormControl>
        <MultipleSelector
          value={field.value || []}
          onChange={field.onChange}
          defaultOptions={options}
          placeholder={fieldConfigItem.inputProps?.placeholder || "Select options"}
          className={fieldConfigItem.inputProps?.className}
          defaultColor={safeColor}
        />
      </FormControl>

      {fieldConfigItem.description && (
        <FormDescription>{fieldConfigItem.description}</FormDescription>
      )}

      <FormMessage />
    </FormItem>
  )
}
