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
    <div className="flex flex-row items-center py-2 ">
      <FormItem className="flex flex-row items-center justify-start gap-4">
        <FormLabel className="ml-2 font-medium text-sm">
          {label}
          {isRequired && <span className="text-destructive"> *</span>}
        </FormLabel>
        <FormControl>
          <Checkbox
            className={cn(
              "h-5 w-5 data-[state=checked]:text-white",
              className
            )}
            checked={field.value}
            onCheckedChange={field.onChange}
            {...fieldProps}
          />
        </FormControl>
      </FormItem>
      {/* <AutoFormTooltip fieldConfigItem={fieldConfigItem} /> */}
    </div>
  )
}
