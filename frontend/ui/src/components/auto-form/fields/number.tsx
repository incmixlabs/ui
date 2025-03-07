import { Input } from "@/components/form/input"
import {
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/shadcn-form/form"
import AutoFormLabel from "../common/label"
import AutoFormTooltip from "../common/tooltip"
import type { AutoFormInputComponentProps } from "../types"

export default function AutoFormNumber({
  label,
  isRequired,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps
  const showLabel = _showLabel === undefined ? true : _showLabel

  return (
    <div className="flex flex-row items-center space-x-2 ">
      <FormItem className="flex w-full flex-row items-center justify-between space-x-2">
        {showLabel && <AutoFormLabel label={label} isRequired={isRequired} />}
        <FormControl>
          <Input type="number" {...fieldPropsWithoutShowLabel} />
        </FormControl>
        <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
        <FormMessage />
      </FormItem>
    </div>
  )
}
