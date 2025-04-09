import { Input } from "@components/form/input"
import { FormControl, FormMessage } from "@components/shadcn-form/form"
import { Plus, Trash2 } from "lucide-react"
import { type ChangeEvent, useEffect, useRef, useState } from "react"
import AutoFormLabel from "../common/label"
import type { AutoFormInputComponentProps } from "../types"

/**
 * Renders a file upload component with preview and removal capabilities.
 *
 * This component ensures that the raw File object is passed directly to the form field
 * and not serialized, which is essential for RxDB attachment handling.
 */
export default function AutoFormFile({
  label,
  isRequired,
  fieldProps,
  field, // This comes from react-hook-form via AutoForm
}: AutoFormInputComponentProps) {
  const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps
  const showLabel = _showLabel === undefined ? true : _showLabel
  const [localFile, setLocalFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Effect to handle removal/reset from outside the component
  useEffect(() => {
    if (field.value === null || field.value === undefined) {
      cleanupResources()
    } else if (field.value instanceof File && field.value !== localFile) {
      updateWithFile(field.value)
    }
  }, [field.value])

  // Cleanup function to prevent memory leaks
  const cleanupResources = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setLocalFile(null)
    setFileName(null)
    setPreviewUrl(null)

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Update component state with a file
  const updateWithFile = (file: File) => {
    // Clean up previous preview URL if it exists
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    // Create new preview URL
    const objectUrl = URL.createObjectURL(file)

    setLocalFile(file)
    setFileName(file.name)
    setPreviewUrl(objectUrl)
  }

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    if (selectedFile) {
      updateWithFile(selectedFile)

      // IMPORTANT: Pass the actual File object directly to the form
      // This is the key to ensuring we're working with a real File object
      field.onChange(selectedFile)
    } else {
      handleRemoveClick()
    }
  }

  const handleRemoveClick = () => {
    cleanupResources()
    field.onChange(null) // Clear the form value
  }

  // Determine if the file is an image for preview purposes
  const isImage = localFile?.type.startsWith("image/")
  const canPreview = isImage && previewUrl

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
        {!localFile ? (
          <div className="relative h-full w-full">
            <FormControl>
              <Input
                type="file"
                ref={fileInputRef}
                {...fieldPropsWithoutShowLabel}
                onChange={handleFileChange}
                value={undefined} // Must be undefined for file inputs
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
              {canPreview ? (
                <img
                  src={previewUrl}
                  alt={fileName ?? "File preview"}
                  className="h-full w-full rounded-md object-cover"
                  onError={() => {
                    console.error("Failed to load image preview")
                    setPreviewUrl(null)
                  }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-3 p-2">
                  <p className="truncate text-center text-sm">
                    {fileName ?? "File selected"}
                  </p>
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
