import AutoFormCheckbox from "./fields/checkbox"
import AutoFormDate from "./fields/date"
import AutoFormEnum from "./fields/enum"
import AutoFormFile from "./fields/file"
import AutoFormInput from "./fields/input"
import AutoFormMCQ from "./fields/mcq"
import AutoFormMultiCheckbox from "./fields/multi-checkbox"
import AutoFormNumber from "./fields/number"
import AutoFormRadioGroup from "./fields/radio-group"
import AutoFormSwitch from "./fields/switch"
import AutoFormTextarea from "./fields/textarea"
import MultipleSelectorField from "./fields/multiple-selector"

export const INPUT_COMPONENTS = {
  checkbox: AutoFormCheckbox,
  date: AutoFormDate,
  select: AutoFormEnum,
  radio: AutoFormRadioGroup,
  switch: AutoFormSwitch,
  textarea: AutoFormTextarea,
  number: AutoFormNumber,
  file: AutoFormFile,
  fallback: AutoFormInput,
  mcq: AutoFormMCQ,
  multiCheckbox: AutoFormMultiCheckbox,
  multipleSelector: MultipleSelectorField,
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
