import { Input } from "@/components/form/input"
import {
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/shadcn-form/form"
import { Trash2 } from "lucide-react"
import { type ChangeEvent, useState } from "react"
import AutoFormLabel from "../common/label"
import AutoFormTooltip from "../common/tooltip"
import type { AutoFormInputComponentProps } from "../types"
export default function AutoFormFile({
  label,
  isRequired,
  fieldConfigItem,
  fieldProps,
  field,
}: AutoFormInputComponentProps) {
  const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps
  const showLabel = _showLabel === undefined ? true : _showLabel
  const [file, setFile] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFile(reader.result as string)
        setFileName(file.name)
        field.onChange(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveClick = () => {
    setFile(null)
  }

  return (
    <div className="flex flex-row items-center space-x-2">
      <FormItem className="flex w-full flex-row items-center justify-start space-x-2 ">
        {showLabel && <AutoFormLabel label={label} isRequired={isRequired} />}
        {!file && (
          <FormControl>
            <Input
              type="file"
              {...fieldPropsWithoutShowLabel}
              onChange={handleFileChange}
              value={""}
            />
          </FormControl>
        )}
        {file && (
          <div className="flex h-[40px] w-full flex-row items-center justify-between space-x-2 rounded-sm border-0 bg-zinc-300/50 p-2 text-black focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-white dark:text-black dark:focus-visible:ring-0 dark:focus-visible:ring-offset-0">
            <p>{fileName}</p>
            <button
              type="button"
              onClick={handleRemoveClick}
              aria-label="Remove image"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        )}
        <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
        <FormMessage />
      </FormItem>
    </div>
  )
}
