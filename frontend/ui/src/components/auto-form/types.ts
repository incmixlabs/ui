// auto-form/types.ts
import type { ControllerRenderProps, FieldValues } from "react-hook-form"
import type * as z from "zod"
import type { INPUT_COMPONENTS } from "./config"
import type { LucideIcon } from "lucide-react"

// Add these new type definitions
export type MCQOption = {
  label: string
  value: string
}

export type MCQLayoutType = "grid" | "row" | "column"
export type MCQSizeType = "sm" | "md" | "lg"

// Modify the FieldConfigItem type to include icon props
export type FieldConfigItem = {
  description?: React.ReactNode
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> & {
    showLabel?: boolean
    options?: MCQOption[] // Changed from Array<{label, value}> to MCQOption[]
    // Add these new MCQ-specific properties
    layout?: MCQLayoutType
    gridCols?: number
    optionSize?: MCQSizeType
    required?: boolean
    minRequired?: number
    // Add icon properties
    icon?: LucideIcon // Add support for direct Lucide icon components
    iconName?: string // Add support for icon name strings
  }
  fieldType?:
    | keyof typeof INPUT_COMPONENTS
    | React.FC<AutoFormInputComponentProps>

  renderParent?: (props: {
    children: React.ReactNode
  }) => React.ReactElement | null
}

// These types remain unchanged
export type FieldConfig<SchemaType extends z.infer<z.ZodObject<any, any>>> = {
  [Key in keyof SchemaType]?: SchemaType[Key] extends object
    ? FieldConfig<z.infer<SchemaType[Key]>>
    : FieldConfigItem
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
