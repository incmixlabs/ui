import {
  FormControl,
  FormItem,
  FormMessage,
  Select
} from "@base"
import type * as z from "zod"
import AutoFormLabel from "../common/label"
import AutoFormTooltip from "../common/tooltip"
import type { AutoFormInputComponentProps } from "../types"
import { getBaseSchema } from "../utils"

export default function AutoFormEnum({
  label,
  isRequired,
  field,
  fieldConfigItem,
  zodItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  const baseValues = (getBaseSchema(zodItem) as unknown as z.ZodEnum<any>)._def
    .values

  let values: [string, string][] = []
  if (!Array.isArray(baseValues)) {
    values = Object.entries(baseValues)
  } else {
    values = baseValues.map((value) => [value, value])
  }

  function findItem(value: any) {
    return values.find((item) => item[0] === value)
  }

  return (
    <div className="flex flex-row items-center gap-2">
      <FormItem className="flex flex-row items-center justify-start gap-2 ">
        <AutoFormLabel label={label} isRequired={isRequired} />
        <FormControl >
          <Select.Root
            onValueChange={field.onChange}
            defaultValue={field.value??''}
            {...fieldProps}

          >
            <Select.Trigger className={fieldProps.className}/>

            <Select.Content>
              {values.map(([value, label]) => (
                <Select.Item value={value} aria-label={label} key={label} >
                  {label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </FormControl>
        <FormMessage />
      </FormItem>
      {/* <AutoFormTooltip fieldConfigItem={fieldConfigItem} /> */}
    </div>
  )
}
