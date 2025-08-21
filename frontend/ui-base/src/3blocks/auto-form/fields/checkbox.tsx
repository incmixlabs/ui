import { Checkbox, FormControl, FormItem, FormLabel } from "@/base"

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
    <FormItem className="flex w-full flex-row items-center justify-start space-x-3">
      <FormControl>
        <Checkbox
          className={cn("h-5 w-5 data-[state=checked]:text-white", className)}
          checked={field.value}
          onCheckedChange={field.onChange}
          {...fieldProps}
        />
      </FormControl>
      <FormLabel className="w-auto cursor-pointer font-medium text-base">
        {label}
        {isRequired && <span className="text-destructive"> *</span>}
      </FormLabel>
      {/* <AutoFormTooltip fieldConfigItem={fieldConfigItem} /> */}
    </FormItem>
  )
}
