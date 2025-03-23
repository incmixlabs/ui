import {
  FormControl,
  FormItem,
  FormMessage,
} from "@components/shadcn-form/form"
import { Textarea } from "@components/textarea"
import AutoFormLabel from "../common/label"
import type { AutoFormInputComponentProps } from "../types"

export default function AutoFormTextarea({
  label,
  isRequired,
  fieldProps,
}: AutoFormInputComponentProps) {
  const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps
  const showLabel = _showLabel === undefined ? true : _showLabel

  return (
    <FormItem className="flex w-full flex-col space-y-2">
      {showLabel && (
        <div className="mb-1">
          <AutoFormLabel
            label={label}
            isRequired={isRequired}
            className="w-auto font-medium text-base"
          />
        </div>
      )}
      <FormControl>
        <Textarea
          className=" w-full resize-none rounded-md border-0 bg-zinc-950 text-white focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder={
            fieldPropsWithoutShowLabel?.placeholder ||
            `Enter ${label.toLowerCase()}`
          }
          {...fieldPropsWithoutShowLabel}
        />
      </FormControl>
      <div>
        <FormMessage className="block max-w-full whitespace-normal break-words text-red-500 text-sm" />
      </div>
    </FormItem>
  )
}
