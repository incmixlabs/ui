// components/board/create-column-form.tsx - Updated for new useKanban hook
"use client"
import {
  Box,
  Button,
  Dialog,
  Flex,
  Text,
  TextArea,
  TextField,
  toast,
} from "@/base"
import ColorPicker, { type ColorSelectType } from "@/elements/color-picker"
import { hasGoodContrast } from "@incmix/store/color"
import { AlertCircle, Palette, Plus } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useKanban } from "../hooks/use-kanban-data"

interface CreateColumnFormProps {
  projectId: string
  onSuccess?: (columnId: string) => void
  // Optional control props for Dialog
  controlled?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  // Optional custom trigger element
  customTrigger?: React.ReactNode
}

const DEFAULT_COLORS = [
  { name: "Indigo", value: "#6366f1" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Pink", value: "#ec4899" },
  { name: "Orange", value: "#f97316" },
  { name: "Yellow", value: "#eab308" },
  { name: "Green", value: "#22c55e" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Red", value: "#ef4444" },
  { name: "Gray", value: "#64748b" },
]

export function CreateColumnForm({
  projectId,
  onSuccess,
  controlled = false,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  customTrigger,
}: CreateColumnFormProps) {
  const [isOpenInternal, setIsOpenInternal] = useState(false)

  // Use either controlled or internal state
  const isOpen = controlled ? controlledOpen : isOpenInternal
  const setIsOpen = controlled
    ? (value: boolean) => {
        if (controlledOnOpenChange) controlledOnOpenChange(value)
      }
    : setIsOpenInternal
  const [isLoading, setIsLoading] = useState(false)
  const [colorError, setColorError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: DEFAULT_COLORS[0].value,
  })
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
  const colorPickerRef = useRef<HTMLDivElement | null>(null)
  const colorPickerButtonRef = useRef<HTMLDivElement | null>(null)

  // Close color picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setIsColorPickerOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [colorPickerRef])

  // Use the new useKanban hook with createStatusLabel for columns
  const { createStatusLabel } = useKanban(projectId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      return
    }

    setIsLoading(true)

    try {
      // Use createStatusLabel method from the new hook
      const columnId = await createStatusLabel(
        formData.name.trim(),
        formData.color,
        formData.description.trim()
      )

      // Reset form
      setFormData({
        name: "",
        description: "",
        color: DEFAULT_COLORS[0].value,
      })

      setIsOpen(false)

      if (onSuccess) {
        onSuccess(columnId)
      }
    } catch (error) {
      console.error("Failed to create column:", error)
      toast.error("Failed to create column. Please try again.", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleColorSelect = (color: string) => {
    // Check color contrast using simplified function
    const hasProperContrast = hasGoodContrast(color)

    // Validate contrast and set error if needed
    if (!hasProperContrast) {
      setColorError(
        `Low contrast: ${color.toUpperCase()} may be hard to see. Consider a darker color.`
      )
    } else {
      setColorError(null)
    }

    setFormData((prev) => ({ ...prev, color }))
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      {!controlled && (
        <Dialog.Trigger>
          {customTrigger || (
            <Button
              variant="ghost"
              size="2"
              className="h-12 w-fit bg-blue-9 px-4 text-white"
            >
              <Plus size={20} />
              <Text className="ml-2">Add Column</Text>
            </Button>
          )}
        </Dialog.Trigger>
      )}

      <Dialog.Content
        className="max-w-md"
        onPointerDownOutside={(e) => {
          // Prevent the dialog from closing if we're clicking inside the color picker
          // or on the color picker button
          if (
            isColorPickerOpen &&
            (colorPickerRef.current?.contains(e.target as Node) ||
              colorPickerButtonRef.current?.contains(e.target as Node))
          ) {
            e.preventDefault()
          }
        }}
        onInteractOutside={(e) => {
          // Also prevent interaction outside events if inside color picker
          if (
            isColorPickerOpen &&
            (colorPickerRef.current?.contains(e.target as Node) ||
              colorPickerButtonRef.current?.contains(e.target as Node))
          ) {
            e.preventDefault()
          }
        }}
      >
        <Dialog.Header>
          <Dialog.Title>Create New Column</Dialog.Title>
          <Dialog.Description>
            Add a new status column to organize your tasks better
          </Dialog.Description>
        </Dialog.Header>

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4">
            {/* Column Name */}
            <Box>
              <label
                htmlFor="column-name"
                className="mb-2 block font-medium text-sm"
              >
                Column Name *
              </label>
              <TextField.Root
                id="column-name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g., In Review, Testing, Deployed..."
                required
                disabled={isLoading}
              />
            </Box>

            {/* Description */}
            <Box>
              <label
                htmlFor="column-description"
                className="mb-2 block font-medium text-sm"
              >
                Description (Optional)
              </label>
              <TextArea
                id="column-description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Describe what this column represents..."
                rows={2}
                disabled={isLoading}
              />
            </Box>

            {/* Color Selection */}
            <Box>
              <label
                htmlFor="color-selection"
                className="mb-2 block font-medium text-sm"
              >
                <Palette size={16} className="mr-1 inline" />
                Column Color
              </label>

              {/* Predefined Colors */}
              <Flex gap="2" wrap="wrap" className="mb-3">
                {DEFAULT_COLORS.map((color) => {
                  // Check if the color has good contrast
                  const properContrast = hasGoodContrast(color.value)

                  return (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => handleColorSelect(color.value)}
                      disabled={isLoading}
                      className={`relative h-8 w-8 rounded-full border-2 transition-all hover:scale-110 ${
                        formData.color === color.value
                          ? "border-gray-800 ring-2 ring-gray-400 dark:border-gray-200"
                          : "border-gray-300 dark:border-gray-600"
                      } ${!properContrast ? "opacity-70" : ""}`}
                      style={{ backgroundColor: color.value }}
                      title={`${color.name} - ${properContrast ? "Good contrast" : "May have contrast issues"}`}
                    >
                      {formData.color === color.value && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-white" />
                        </div>
                      )}
                      {!properContrast && (
                        <div
                          className="-top-1 -right-1 absolute h-3 w-3 rounded-full border border-white bg-amber-400"
                          title="May have contrast issues"
                        />
                      )}
                    </button>
                  )
                })}
              </Flex>

              {/* Contrast warning */}
              {colorError && (
                <div className="mt-1 mb-2 flex items-center gap-1 text-amber-600 text-sm dark:text-amber-400">
                  <AlertCircle size={14} />
                  {colorError}
                </div>
              )}

              {/* Custom color input */}
              <Box>
                <label
                  htmlFor="custom-color"
                  className="mb-1 block text-gray-500 text-xs"
                >
                  Or choose a custom color:
                </label>
                <Flex align="center" gap="2" className="items-start">
                  <div className="relative" ref={colorPickerRef}>
                    <button
                      type="button"
                      ref={colorPickerButtonRef}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-gray-6"
                      style={{ backgroundColor: formData.color }}
                      onClick={(e) => {
                        // Prevent the click from bubbling up to the dialog's close handler
                        e.stopPropagation()
                        e.preventDefault()
                        if (!isLoading) setIsColorPickerOpen(!isColorPickerOpen)
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          if (!isLoading)
                            setIsColorPickerOpen(!isColorPickerOpen)
                        }
                      }}
                      onPointerDown={(e) => {
                        // Stop all pointer events to prevent dialog from closing
                        e.stopPropagation()
                      }}
                      aria-label="Open color picker"
                    />
                    {isColorPickerOpen && (
                      <dialog
                        ref={colorPickerRef}
                        className="absolute z-50 mt-1"
                        style={{ minWidth: "240px" }}
                        aria-label="Color picker"
                        onClick={(e) => {
                          // Prevent all click events from propagating out
                          e.stopPropagation()
                          e.preventDefault()
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") {
                            setIsColorPickerOpen(false)
                          }
                        }}
                        onMouseDown={(e) => {
                          // Prevent mouse events from bubbling up to the document
                          e.stopPropagation()
                          e.preventDefault()
                        }}
                        onPointerDown={(e) => {
                          // Prevent pointer events from bubbling up
                          e.stopPropagation()
                          e.preventDefault()
                        }}
                      >
                        <div
                          role="presentation"
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => {
                            if (e.key === "Escape") {
                              setIsColorPickerOpen(false)
                            }
                          }}
                          onPointerDown={(e) => e.stopPropagation()}
                        >
                          <ColorPicker
                            colorType="base"
                            onColorSelect={(color: ColorSelectType) => {
                              handleColorSelect(color.hex)
                              setIsColorPickerOpen(false)
                            }}
                            activeColor={formData.color}
                          />
                        </div>
                      </dialog>
                    )}
                  </div>
                  <Text size="2" className="text-gray-500">
                    {formData.color.toUpperCase()}
                  </Text>
                </Flex>
              </Box>
            </Box>

            {/* Preview */}
            <Box>
              <Text className="mb-2 block font-medium text-sm">Preview</Text>
              <Box
                className="rounded-lg border-2 p-4 transition-colors"
                style={{
                  backgroundColor: `${formData.color}15`,
                  borderColor: `${formData.color}40`,
                  borderTopColor: formData.color,
                  borderTopWidth: "3px",
                }}
              >
                <Flex align="center" gap="2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: formData.color }}
                  />
                  <Text className="font-semibold">
                    {formData.name || "Column Name"}
                  </Text>
                  <Text
                    size="1"
                    className="rounded-full bg-gray-200 px-2 py-1 text-gray-500 dark:bg-gray-700"
                  >
                    0
                  </Text>
                </Flex>
                {formData.description && (
                  <Text
                    size="1"
                    className="mt-2 text-gray-600 dark:text-gray-400"
                  >
                    {formData.description}
                  </Text>
                )}
              </Box>
            </Box>
          </Flex>

          <div className="mt-6 flex justify-end gap-3">
            <Dialog.Close>
              <Button variant="soft" color="red" disabled={isLoading}>
                Cancel
              </Button>
            </Dialog.Close>
            <Button type="submit" disabled={!formData.name.trim() || isLoading}>
              {isLoading ? "Creating..." : "Create Column"}
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}
