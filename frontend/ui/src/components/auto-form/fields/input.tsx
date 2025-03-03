import { Input } from "@/components/form/input"
import {
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/shadcn-form/form"
import AutoFormLabel from "../common/label"
import AutoFormTooltip from "../common/tooltip"
import type { AutoFormInputComponentProps } from "../types"

export default function AutoFormInput({
  label,
  isRequired,

  fieldProps,
}: AutoFormInputComponentProps) {
  const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps
  const showLabel = _showLabel === undefined ? true : _showLabel
  const type = fieldProps.type || "text"

  return (
    <FormItem className="mb-6 flex w-full flex-col space-y-2">
      {showLabel && (
        <div className="mb-2">
          <AutoFormLabel
            label={label}
            isRequired={isRequired}
            className="w-auto font-medium text-base"
          />
        </div>
      )}
      <FormControl>
        <Input
          type={type}
          {...fieldPropsWithoutShowLabel}
          className={`h-14 w-full rounded-lg px-4 ${type === "password" ? "pr-10" : ""}`}
          placeholder={
            fieldProps.placeholder || `Enter your ${label.toLowerCase()}`
          }
        />
      </FormControl>
      <FormMessage className="mt-1 text-red-500 text-sm" />
    </FormItem>
  )
}
