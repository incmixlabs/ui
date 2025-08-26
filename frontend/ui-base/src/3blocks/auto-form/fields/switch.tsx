import { FormControl, FormItem, FormMessage, Switch } from "@/base"
import AutoFormLabel from "../common/label"
import AutoFormTooltip from "../common/tooltip"
import type { AutoFormInputComponentProps } from "../types"

export default function AutoFormSwitch({
  label,
  isRequired,
  field,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  return (
    <div className="flex w-full flex-col space-y-2">
      <FormItem className="flex w-full flex-row items-center justify-between space-x-2">
        <AutoFormLabel
          label={label}
          isRequired={isRequired}
          className="w-auto font-medium text-base"
        />
        <div className="flex items-center space-x-2">
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              {...fieldProps}
            />
          </FormControl>
          <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
        </div>
      </FormItem>
      <div className="mt-0.5 h-4">
        <FormMessage className="block max-w-full whitespace-normal break-words text-red-500 text-sm" />
      </div>
    </div>
  )
}
