import { z } from "zod"

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  RadioGroup,
} from "../../../1base"
import AutoFormLabel from "../common/label"
import AutoFormTooltip from "../common/tooltip"
import type { AutoFormInputComponentProps } from "../types"
import { getBaseSchema } from "../utils"

export default function AutoFormRadioGroup({
  label,
  isRequired,
  field,
  zodItem,
  fieldProps,
  fieldConfigItem,
}: AutoFormInputComponentProps) {
  const baseSchema = getBaseSchema(zodItem)
  const baseValues = (baseSchema as any)?._def?.values

  let values: string[] = []
  if (!baseValues) {
    values = []
  } else if (!Array.isArray(baseValues)) {
    values = Object.entries(baseValues).map((item) => item[0])
  } else {
    values = baseValues
  }

  return (
    <FormItem className="flex w-full flex-col space-y-2">
      <div className="mb-1">
        <AutoFormLabel 
          label={label} 
          isRequired={isRequired} 
          className="w-auto font-medium text-base"
        />
      </div>
      <FormControl>
        <RadioGroup.Root
          onValueChange={field.onChange}
          defaultValue={field.value}
          className="flex flex-col space-y-2"
          {...fieldProps}
        >
          {values?.map((value: any) => (
            <FormItem
              className="flex items-center space-x-3 space-y-0"
              key={value}
            >
              <FormControl>
                <RadioGroup.Item value={value} />
              </FormControl>
              <FormLabel className="font-normal">{value}</FormLabel>
            </FormItem>
          ))}
        </RadioGroup.Root>
      </FormControl>
      <div>
        <FormMessage className="block max-w-full whitespace-normal break-words text-red-500 text-sm" />
      </div>
      <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
    </FormItem>
  )
}
