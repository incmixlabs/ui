import { Input } from "@components/form/input"
import {
  FormControl,
  FormItem,
  FormMessage,
} from "@components/shadcn-form/form"
import { Plus, Trash2 } from "lucide-react"
import { type ChangeEvent, useState } from "react"
import AutoFormLabel from "../common/label"
import type { AutoFormInputComponentProps } from "../types"

/**
 * Renders a file upload component with preview and removal capabilities.
 *
 * This component enables file selection within a form. When a file is chosen, it creates an object URL for preview and reads the file as a base64-encoded string to pass the file data back via a change handler. If the file is an image, it displays a preview; otherwise, it shows the file name. The component also provides the ability to remove the selected file, which clears the internal state and revokes the preview URL.
 *
 * @param label - The text label displayed above the file input.
 * @param isRequired - Indicates whether the file input is required.
 * @param fieldProps - Additional configuration for the file input. The optional `showLabel` property controls label visibility.
 * @param field - Field-specific configuration and callback for updating form state with the file data.
 */
export default function AutoFormFile({
  label,
  isRequired,
  fieldProps,
  field,
}: AutoFormInputComponentProps) {
  const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps
  const showLabel = _showLabel === undefined ? true : _showLabel
  const [file, setFile] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      // Create object URL for preview
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)

      // Read as base64 for form value (keeping original functionality)
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
    setFileName(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
    field.onChange("")
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      {showLabel && (
        <div className="mb-2 w-full text-center">
          <AutoFormLabel
            label={label}
            isRequired={isRequired}
            className="w-auto font-medium text-base"
          />
        </div>
      )}

      <div className="relative h-28 w-36 rounded-lg">
        {!file ? (
          <div className="relative h-full w-full">
            <FormControl>
              <Input
                type="file"
                {...fieldPropsWithoutShowLabel}
                onChange={handleFileChange}
                value={""}
                className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
              />
            </FormControl>

            {/* Empty state with dashed outline and plus icon */}
            <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center rounded-lg outline-dashed outline-2 outline-gray-4">
              <Plus size={32} className="text-gray-8" />
            </div>
          </div>
        ) : (
          <div className="relative h-full w-full">
            {/* File preview */}
            <div className="absolute inset-0 h-full w-full overflow-hidden rounded-md bg-gray-4">
              {previewUrl && fileName?.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                <img
                  src={previewUrl}
                  alt={fileName}
                  className="h-full w-full rounded-md object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-3 p-2">
                  <p className="truncate text-center text-sm">{fileName}</p>
                </div>
              )}

              {/* Remove button */}
              <button
                type="button"
                onClick={handleRemoveClick}
                aria-label="Remove file"
                className="absolute top-1 right-1 rounded-full bg-white/80 p-1 shadow-sm hover:bg-white"
              >
                <Trash2 className="size-4 text-red-500" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="w-full text-center">
        <FormMessage />
      </div>
    </div>
  )
}
