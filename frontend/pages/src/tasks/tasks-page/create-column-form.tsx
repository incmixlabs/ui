"use client"

import { useKanban } from "@incmix/store"
import {
  Button,
  Dialog,
  Flex,
  TextArea,
  TextField,
  toast,
} from "@incmix/ui/base"
import { Plus } from "lucide-react"
import { useState } from "react"

interface CreateColumnFormProps {
  projectId: string
  onSuccess?: (columnId: string) => void
}

const DEFAULT_COLORS = [
  "#6366f1", // Indigo
  "#8b5cf6", // Violet
  "#ec4899", // Pink
  "#f97316", // Orange
  "#eab308", // Yellow
  "#22c55e", // Green
  "#06b6d4", // Cyan
  "#3b82f6", // Blue
  "#ef4444", // Red
  "#64748b", // Slate
]

export function CreateColumnForm({
  projectId,
  onSuccess,
}: CreateColumnFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: DEFAULT_COLORS[0],
  })

  // Get the createColumn function from the hook
  const { createColumn } = useKanban(projectId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      toast.error("Column name is required")
      return
    }

    setIsLoading(true)

    try {
      const columnId = await createColumn(formData.name, formData.color)

      // Reset form
      setFormData({
        name: "",
        description: "",
        color: DEFAULT_COLORS[0],
      })

      setIsOpen(false)
      toast.success("Column created successfully!")

      if (onSuccess) {
        onSuccess(columnId)
      }
    } catch (error) {
      console.error("Failed to create column:", error)
      toast.error("Failed to create column")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger>
        <Button variant="outline" size="2">
          <Plus size={16} />
          Add Column
        </Button>
      </Dialog.Trigger>

      <Dialog.Content className="max-w-md">
        <Dialog.Header>
          <Dialog.Title>Create New Column</Dialog.Title>
          <Dialog.Description>
            Add a new status column to your project board
          </Dialog.Description>
        </Dialog.Header>

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4">
            {/* Column Name */}
            <div>
              <label
                htmlFor="column-name"
                className="mb-1 block font-medium text-sm"
              >
                Column Name *
              </label>
              <TextField.Root
                id="column-name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g., In Review, Testing, etc."
                required
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="column-description"
                className="mb-1 block font-medium text-sm"
              >
                Description
              </label>
              <TextArea
                id="column-description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Describe what this column represents (optional)"
                rows={3}
              />
            </div>

            {/* Color Selection */}
            <div>
              <label
                htmlFor="color-selection"
                className="mb-1 block font-medium text-sm"
              >
                Color
              </label>
              <Flex id="color-selection" gap="2" wrap="wrap">
                {DEFAULT_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleInputChange("color", color)}
                    className={`h-8 w-8 rounded-full border-2 ${
                      formData.color === color
                        ? "border-gray-800 dark:border-gray-200"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </Flex>

              {/* Custom color input */}
              <div className="mt-2">
                <label
                  htmlFor="custom-color"
                  className="mb-1 block text-gray-500 text-xs"
                >
                  Or choose custom color:
                </label>
                <input
                  id="custom-color"
                  type="color"
                  value={formData.color}
                  onChange={(e) => handleInputChange("color", e.target.value)}
                  className="h-8 w-16 rounded border border-gray-300"
                />
              </div>
            </div>

            {/* Preview */}
            <div>
              <label
                htmlFor="preview-section"
                className="mb-1 block font-medium text-sm"
              >
                Preview
              </label>
              <div
                id="preview-section"
                className="rounded-lg border-2 p-3"
                style={{
                  backgroundColor: `${formData.color}20`,
                  borderColor: `${formData.color}40`,
                }}
              >
                <Flex align="center" gap="2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: formData.color }}
                  />
                  <span className="font-medium">
                    {formData.name || "Column Name"}
                  </span>
                </Flex>
              </div>
            </div>
          </Flex>

          <Dialog.Footer>
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button type="submit" loading={isLoading}>
              Create Column
            </Button>
          </Dialog.Footer>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}
