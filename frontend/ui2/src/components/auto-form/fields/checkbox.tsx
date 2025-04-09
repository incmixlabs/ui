import { Checkbox } from "@/components/radixui/checkbox"
import { Form } from "@/components/shadcn"
import { cn } from "@/lib/utils"
import AutoFormTooltip from "../common/tooltip"
import type { AutoFormInputComponentProps } from "../types"

export default function AutoFormCheckbox({
  label,
  isRequired,
  field,
  fieldConfigItem,
  fieldProps,
  className,
}: AutoFormInputComponentProps) {
  return (
    <div className="flex flex-row items-center space-x-2">
      <Form.Item className="flex w-full flex-row items-center justify-start">
        <Form.Label className="mt-3 w-[117px]">
          {label}
          {isRequired && <span className="text-destructive"> *</span>}
        </Form.Label>
        <Form.Control>
          <Checkbox
            className={cn(
              "data-[state=checked]:bg-zinc-500 data-[state=checked]:text-white",
              className
            )}
            checked={field.value}
            onCheckedChange={field.onChange}
            {...fieldProps}
          />
        </Form.Control>
      </Form.Item>
      <AutoFormTooltip content={fieldConfigItem.description} />
    </div>
  )
}
