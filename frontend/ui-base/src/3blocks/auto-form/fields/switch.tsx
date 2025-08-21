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
      <FormMessage />
    </FormItem>
  )
}
