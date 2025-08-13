import type { LucideIcon } from "lucide-react"
import type { ControllerRenderProps, FieldValues } from "react-hook-form"
import type * as z from "zod"
import type { INPUT_COMPONENTS } from "./config"
import type { FieldGroupLayout } from "./fields/field-group"

// Enhanced MCQOption with color support
export type MCQOption = {
  label: string
  value: string
  color?: string // Added optional color property
}

export type MCQLayoutType = "grid" | "row" | "column"
export type MCQSizeType = "sm" | "md" | "lg"

// Enhanced MultipleSelectorOption with color support
export type MultipleSelectorOption = {
  label: string
  value: string
  color?: string // Added optional color property
  // Support for rich member data
  id?: string
  name?: string
  avatar?: string
  position?: string
}

// Field group configuration
export type FieldGroupConfig = {
  fields: string[] // Names of fields to group
  layout: FieldGroupLayout
  columns?: number // For grid layout
  gap?: number
  className?: string
}

export type FieldConfigItem = {
  description?: React.ReactNode
  // Support options at top level (like in translationFormSchema)
  options?: MCQOption[]
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> & {
    showLabel?: boolean
    options?: MCQOption[]
    layout?: MCQLayoutType
    gridCols?: number
    optionSize?: MCQSizeType
    required?: boolean
    minRequired?: number
    icon?: LucideIcon
    iconName?: string
    defaultOptions?: MultipleSelectorOption[]
    defaultColor?: string
    multipleSelectorOptions?: MultipleSelectorOption[]
    columnSpan?: number // How many columns this field should span
    rowSpan?: number // How many rows this field should span
    fullWidth?: boolean // Whether this field should take full width
  }
  fieldType?:
    | keyof typeof INPUT_COMPONENTS
    | React.FC<AutoFormInputComponentProps>

  renderParent?: (props: {
    children: React.ReactNode
  }) => React.ReactElement | null
}

// Add fieldGroups to the root FieldConfig
export type FieldConfig<SchemaType extends z.infer<z.ZodObject<any, any>>> = {
  [Key in keyof SchemaType]?: SchemaType[Key] extends object
    ? FieldConfig<z.infer<SchemaType[Key]>>
    : FieldConfigItem
} & {
  fieldGroups?: FieldGroupConfig[]
}

export type AutoFormInputComponentProps = {
  zodInputProps: React.InputHTMLAttributes<HTMLInputElement>
  field: ControllerRenderProps<FieldValues, any>
  fieldConfigItem: FieldConfigItem
  label: string
  isRequired: boolean
  fieldProps: any
  zodItem: z.ZodAny
  className?: string
}
