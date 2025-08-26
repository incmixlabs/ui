import { Checkbox, FormControl, FormItem, FormLabel, FormMessage } from "@/base"

import { cn } from "@/utils/cn"
import { useFormContext } from "react-hook-form"
import type { AutoFormInputComponentProps } from "../types"

export default function AutoFormCheckbox({
  label,
  isRequired,
  field,
  fieldProps = {},
  className,
}: AutoFormInputComponentProps) {
  // Access form context to check for errors (supports nested names)
  const { getFieldState, formState } = useFormContext()
  const { error } = getFieldState(field.name, formState)
  const hasError = Boolean(error)
  const fieldName = field.name
  return (
    <FormItem className="flex w-full flex-col space-y-2">
      <div className="flex w-full flex-row items-center justify-start space-x-3">
        <FormControl>
          <Checkbox
            id={field.name}
            {...fieldProps}
            className={cn(
              "h-5 w-5 data-[state=checked]:text-white",
              fieldProps?.className,
              className
            )}
            checked={!!field.value}
            onCheckedChange={field.onChange}
            onBlur={field.onBlur}
            aria-required={isRequired || undefined}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${fieldName}-error` : undefined}
          />
        </FormControl>
        <FormLabel
          htmlFor={field.name}
          className="w-auto cursor-pointer font-medium text-base"
        >
          {label}
          {isRequired && <span className="text-destructive"> *</span>}
        </FormLabel>
        {/* <AutoFormTooltip fieldConfigItem={fieldConfigItem} /> */}
      </div>
      <div className="mt-0.5 min-h-[1rem]">
        <FormMessage
          id={`${fieldName}-error`}
          className="block max-w-full whitespace-normal break-words text-destructive text-sm"
        />
      </div>
    </FormItem>
  )
}
