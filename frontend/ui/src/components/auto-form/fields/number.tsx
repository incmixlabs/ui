import { Input } from "@components/form/input"
import { FormControl, FormMessage } from "@components/shadcn-form/form"
import AutoFormLabel from "../common/label"
import type { AutoFormInputComponentProps } from "../types"

export default function AutoFormNumber({
  label,
  isRequired,
  fieldProps,
}: AutoFormInputComponentProps) {
  const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps
  const showLabel = _showLabel === undefined ? true : _showLabel

  // Check if currency styling is enabled (default to true for matching the screenshot)
  const isCurrency = fieldProps.currency !== false

  return (
    <div className="flex flex-col space-y-2">
      {showLabel && (
        <div className="mb-2">
          <AutoFormLabel
            label={label}
            isRequired={isRequired}
            className="w-auto font-medium text-base"
          />
        </div>
      )}

      <div className="relative">
        {isCurrency && (
          <span className="-translate-y-1/2 absolute top-1/2 left-3 text-gray-500">
            $
          </span>
        )}

        <FormControl>
          <Input
            type="number"
            {...fieldPropsWithoutShowLabel}
            className={`h-14 w-full rounded-lg ${isCurrency ? "pl-8" : "px-4"}`}
            placeholder={fieldPropsWithoutShowLabel.placeholder || "0.00"}
          />
        </FormControl>
      </div>

      {/* Fixed height error message container to prevent layout shift */}
      <div className="min-h-[24px] px-1 pt-1">
        <FormMessage className="block max-w-full whitespace-normal break-words text-red-500 text-sm" />
      </div>
    </div>
  )
}
