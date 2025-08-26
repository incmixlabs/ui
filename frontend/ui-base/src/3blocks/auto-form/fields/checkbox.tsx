import { Checkbox, FormControl, FormItem, FormLabel, FormMessage } from "@/base"

import { cn } from "@/utils/cn"
import type { AutoFormInputComponentProps } from "../types"

export default function AutoFormCheckbox({
  label,
  isRequired,
  field,
  fieldProps,
  className,
}: AutoFormInputComponentProps) {
  return (
    <div className="flex w-full flex-col space-y-2">
      <FormItem className="flex w-full flex-row items-center justify-start space-x-3">
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
            aria-required={isRequired || undefined}
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
      </FormItem>
      <div className="mt-0.5 h-4">
        <FormMessage className="block max-w-full whitespace-normal break-words text-red-500 text-sm" />
      </div>
    </div>
  )
}
