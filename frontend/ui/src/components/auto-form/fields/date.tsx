import { DatePicker } from "@/components/date-picker"
import {
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/shadcn-form/form"
import AutoFormLabel from "../common/label"
import AutoFormTooltip from "../common/tooltip"
import type { AutoFormInputComponentProps } from "../types"

export default function AutoFormDate({
  label,
  isRequired,
  field,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  return (
    <div className="flex flex-row items-center space-x-2 ">
      <FormItem className="flex w-full flex-col">
        <div className=" flex flex-row items-center justify-between space-x-2">
          <AutoFormLabel label={label} isRequired={isRequired} />
          <FormControl>
            <DatePicker
              date={field.value}
              setDate={field.onChange}
              {...fieldProps}
            />
          </FormControl>
          <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
        </div>
        <FormMessage className="ml-[140px]" />
      </FormItem>
    </div>
  )
}
