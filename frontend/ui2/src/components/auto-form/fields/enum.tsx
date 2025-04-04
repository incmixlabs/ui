/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "@/components/shadcn"

import type * as z from "zod"
import AutoFormLabel from "../common/label"
import AutoFormTooltip from "../common/tooltip"
import type { AutoFormInputComponentProps } from "../types"
import { getBaseSchema } from "../utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select"

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
    <Form.Item className="flex w-full flex-row items-center justify-start space-x-2">
      <AutoFormLabel label={label} isRequired={isRequired} />
      <Form.Control>
        <Select
          onValueChange={field.onChange}
          defaultValue={field.value}
          {...fieldProps}
        >
          <SelectTrigger className={fieldProps.className}>
            <SelectValue placeholder={fieldConfigItem.inputProps?.placeholder}>
              {field.value ? findItem(field.value)?.[1] : "Select an option"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {values.map(([value, label]) => (
              <SelectItem value={label} key={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Form.Control>
      <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
      <Form.Message />
    </Form.Item>
  )
}
