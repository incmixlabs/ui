/* eslint-disable @typescript-eslint/no-explicit-any */

import type * as z from "zod"
import { Form } from "@/components/shadcn"
import { Select } from "@/components/radixui/select"
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
    <Form.Item className="flex w-full flex-row items-center justify-start space-x-2">
      <AutoFormLabel label={label} isRequired={isRequired} />
      <Form.Control>
        <Select.Root
          onValueChange={field.onChange}
          defaultValue={field.value}
          {...fieldProps}
        >
          <Select.Trigger/>
          <Select.Content>
            {values.map(([value, label]) => (
              <Select.Item value={label} key={value}>
                {label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Form.Control>
      <AutoFormTooltip content={fieldConfigItem.description} />
      <Form.Message />
    </Form.Item>
  )
}
