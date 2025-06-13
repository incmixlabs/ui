import AutoFormCheckbox from "./fields/checkbox"
import AutoFormDate from "./fields/date"
import AutoFormEnum from "./fields/enum"
import FieldGroup from "./fields/field-group"
import AutoFormFile from "./fields/file"
import AutoFormInput from "./fields/input"
import AutoFormMCQ from "./fields/mcq"
import AutoFormMultiCheckbox from "./fields/multi-checkbox"
import MultipleSelectorField from "./fields/multiple-selector"
import AutoFormNumber from "./fields/number"
import AutoFormRadioGroup from "./fields/radio-group"
import AutoFormTextarea from "./fields/textarea"
import SubTaskField from "./fields/subtask-fields"

// Note: We don't include FieldGroup in INPUT_COMPONENTS as it's handled separately
export const INPUT_COMPONENTS = {
  checkbox: AutoFormCheckbox,
  date: AutoFormDate,
  select: AutoFormEnum,
  radio: AutoFormRadioGroup,
  textarea: AutoFormTextarea,
  number: AutoFormNumber,
  file: AutoFormFile,
  fallback: AutoFormInput,
  mcq: AutoFormMCQ,
  multiCheckbox: AutoFormMultiCheckbox,
  multipleSelector: MultipleSelectorField,
  subtask: SubTaskField,
} as const

/**
 * Define handlers for specific Zod types.
 * You can expand this object to support more types.
 */
export const DEFAULT_ZOD_HANDLERS: {
  [key: string]: keyof typeof INPUT_COMPONENTS
} = {
  ZodBoolean: "checkbox",
  ZodDate: "date",
  ZodEnum: "select",
  ZodNativeEnum: "select",
  ZodNumber: "number",
  ZodMCQ: "mcq",
  ZodMultiCheckbox: "multiCheckbox",
}

// Export FieldGroup separately
export { FieldGroup }
