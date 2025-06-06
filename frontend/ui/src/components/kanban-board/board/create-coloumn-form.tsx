// components/board/create-column-form.tsx
"use client"

import { useKanban } from "@incmix/store"
import {
  Button,
  Dialog,
  Flex,
  TextArea,
  TextField,
  Text,
  Box,
} from "@incmix/ui"
import { Plus, Palette } from "lucide-react"
import { useState } from "react"

interface CreateColumnFormProps {
  projectId: string
  onSuccess?: (columnId: string) => void
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
}: CreateColumnFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: DEFAULT_COLORS[0].value,
  })

  const { createColumn } = useKanban(projectId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      return
    }

    setIsLoading(true)

    try {
      const columnId = await createColumn(
        formData.name.trim(),
        formData.color,
        //formData.description.trim()
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
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleColorSelect = (color: string) => {
    setFormData((prev) => ({ ...prev, color }))
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger>
        <Button variant="ghost" size="2" className="w-full h-12 border-2 border-dashed border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500">
          <Plus size={20} />
          <Text className="ml-2">Add Column</Text>
        </Button>
      </Dialog.Trigger>

      <Dialog.Content className="max-w-md">
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
              <label className="mb-2 block font-medium text-sm">
                <Palette size={16} className="inline mr-1" />
                Column Color
              </label>
              
              {/* Predefined Colors */}
              <Flex gap="2" wrap="wrap" className="mb-3">
                {DEFAULT_COLORS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => handleColorSelect(color.value)}
                    disabled={isLoading}
                    className={`relative h-8 w-8 rounded-full border-2 transition-all hover:scale-110 ${
                      formData.color === color.value
                        ? "border-gray-800 dark:border-gray-200 ring-2 ring-gray-400"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {formData.color === color.value && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      </div>
                    )}
                  </button>
                ))}
              </Flex>

              {/* Custom color input */}
              <Box>
                <label
                  htmlFor="custom-color"
                  className="mb-1 block text-gray-500 text-xs"
                >
                  Or choose a custom color:
                </label>
                <Flex align="center" gap="2">
                  <input
                    id="custom-color"
                    type="color"
                    value={formData.color}
                    onChange={(e) => handleColorSelect(e.target.value)}
                    disabled={isLoading}
                    className="h-8 w-16 rounded border border-gray-300 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <Text size="2" className="text-gray-500">
                    {formData.color.toUpperCase()}
                  </Text>
                </Flex>
              </Box>
            </Box>

            {/* Preview */}
            <Box>
              <label className="mb-2 block font-medium text-sm">
                Preview
              </label>
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
                  <Text size="1" className="text-gray-500 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                    0
                  </Text>
                </Flex>
                {formData.description && (
                  <Text size="1" className="mt-2 text-gray-600 dark:text-gray-400">
                    {formData.description}
                  </Text>
                )}
              </Box>
            </Box>
          </Flex>

          <Dialog.Footer>
            <Dialog.Close>
              <Button variant="soft" color="gray" disabled={isLoading}>
                Cancel
              </Button>
            </Dialog.Close>
            <Button 
              type="submit" 
              disabled={!formData.name.trim() || isLoading}
            >
              {isLoading ? "Creating..." : "Create Column"}
            </Button>
          </Dialog.Footer>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}