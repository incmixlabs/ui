import { Box, Button, Dialog, Flex, Input, Text } from "@/src/1base"
import { useState } from "react"
import type { DropdownOption } from "../cell-renderers"
import ColorPicker from "./ColorPicker"

interface DropdownOptionsEditorProps {
  options: DropdownOption[]
  onChange: (options: DropdownOption[]) => void
  valuesInUse?: string[] // Values currently used in the table
}

const DropdownOptionsEditor: React.FC<DropdownOptionsEditorProps> = ({
  options,
  onChange,
  valuesInUse = [],
}) => {
  const [newOption, setNewOption] = useState<DropdownOption>({
    label: "",
    value: "",
    color: "var(--blue-5)",
  })

  // State for validation errors and confirmation dialog
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // Add a new option to the list
  const handleAddOption = () => {
    // Validate the new option
    if (!newOption.label.trim()) {
      setErrors({ label: "Label is required" })
      return
    }

    // Check if the value already exists
    const valueExists = options.some((opt) => opt.value === newOption.value)
    if (valueExists) {
      setErrors({ label: "This option already exists" })
      return
    }

    // Add the new option
    const updatedOptions = [...options, newOption]
    onChange(updatedOptions)

    // Reset the new option form
    setNewOption({
      label: "",
      value: "",
      color: "var(--blue-5)",
    })

    // Clear any errors
    setErrors({})
  }

  // Update an existing option
  const handleUpdateOption = (
    index: number,
    field: keyof DropdownOption,
    value: string
  ) => {
    // Create a deep copy to ensure we don't mutate the original array
    const updatedOptions = options.map((opt) => ({ ...opt }))

    if (field === "label") {
      // When label changes, also update the value (internal ID) to match
      const newValue = value.toLowerCase().replace(/\s+/g, "_")

      // Don't allow editing the value if it's in use in the table
      const isValueInUse = valuesInUse.includes(updatedOptions[index].value)

      if (!isValueInUse) {
        // Only update the value if it's not in use
        updatedOptions[index] = {
          ...updatedOptions[index],
          label: value,
          value: newValue,
        }
      } else {
        // If the value is in use, just update the label
        updatedOptions[index] = {
          ...updatedOptions[index],
          label: value,
        }
      }
    } else {
      // For other fields (color), just update that field
      updatedOptions[index] = {
        ...updatedOptions[index],
        [field]: value,
      }
    }

    // Log the update for debugging
    console.log(
      `Updated option at index ${index}, field: ${field}, value: ${value}`
    )
    console.log("New options:", updatedOptions)

    // Notify parent of the change with the completely new array
    onChange(updatedOptions)
  }

  // Open delete confirmation dialog
  const handleDeleteClick = (index: number) => {
    const optionValue = options[index].value
    const isValueInUse = valuesInUse.includes(optionValue)

    if (isValueInUse) {
      setErrors({
        delete:
          "Cannot delete this option because it is currently in use in the table.",
      })
      setTimeout(() => setErrors({}), 3000)
      return
    }

    setDeleteIndex(index)
    setShowDeleteDialog(true)
  }

  // Confirm and delete option
  const confirmDelete = () => {
    if (deleteIndex !== null) {
      const updatedOptions = options.filter((_, i) => i !== deleteIndex)
      onChange(updatedOptions)
    }
    setShowDeleteDialog(false)
    setDeleteIndex(null)
  }

  // Cancel delete
  const cancelDelete = () => {
    setShowDeleteDialog(false)
    setDeleteIndex(null)
  }

  return (
    <>
      <Box className="mt-4">
        {/* Section title */}
        <Text size="2" weight="bold" className="mb-3">
          Drop down data:
        </Text>

        {/* Global error messages */}
        {errors.delete && (
          <Box className="mb-3 rounded-md border border-red-6 bg-red-2 p-3">
            <Text size="2" color="red" role="alert" aria-live="polite">
              {errors.delete}
            </Text>
          </Box>
        )}

        {/* Options list */}
        <Box className="space-y-3">
          {options.length === 0 ? (
            <Text size="2" color="gray">
              No options defined yet. Add some below.
            </Text>
          ) : (
            options.map((option, index) => {
              const isValueInUse = valuesInUse.includes(option.value)

              return (
                <Flex key={index} align="center" gap="2" className="w-full">
                  <Box className="flex min-w-10 items-center justify-center">
                    <ColorPicker
                      color={option.color || "var(--blue-5)"}
                      onChange={(color) =>
                        handleUpdateOption(index, "color", color)
                      }
                    />
                  </Box>

                  <Input
                    value={option.label}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleUpdateOption(index, "label", e.target.value)
                    }
                    placeholder="Option Label"
                    className="flex-1"
                    aria-label={`Edit option ${index + 1} label`}
                    disabled={isValueInUse}
                  />

                  {/* Delete button */}
                  <Button
                    color="gray"
                    variant="soft"
                    disabled={isValueInUse}
                    onClick={() => handleDeleteClick(index)}
                    className="min-w-12"
                    aria-label={`Delete option ${option.label}`}
                  >
                    Del
                  </Button>
                </Flex>
              )
            })
          )}
        </Box>

        {/* Add new option section */}
        <Box className="mt-6">
          <Text size="2" weight="bold" className="mb-3">
            Add new Value:
          </Text>

          <Flex align="center" gap="2" className="w-full">
            <Box className="flex min-w-10 items-center justify-center">
              <ColorPicker
                color={newOption.color || "var(--blue-5)"}
                onChange={(color) => setNewOption({ ...newOption, color })}
              />
            </Box>

            {/* Label input for new option */}
            <Input
              value={newOption.label}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const newLabel = e.target.value
                const newValue = newLabel.toLowerCase().replace(/\s+/g, "_")
                setNewOption({
                  ...newOption,
                  label: newLabel,
                  value: newValue,
                })
                if (errors.label) setErrors({})
              }}
              className="flex-1"
              placeholder="Option Label"
              aria-label="New option label"
              aria-invalid={!!errors.label}
              aria-describedby={errors.label ? "label-error" : undefined}
            />

            {/* Add button */}
            <Button onClick={handleAddOption} className="min-w-12">
              Add
            </Button>
          </Flex>

          {/* Error message */}
          {errors.label && (
            <Box className="mt-2 rounded-md border border-red-6 bg-red-2 p-2">
              <Text size="1" color="red" id="label-error" role="alert">
                {errors.label}
              </Text>
            </Box>
          )}
        </Box>
      </Box>

      {/* Delete confirmation dialog */}
      <Dialog.Root open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <Dialog.Content className="max-w-md">
          <Dialog.Header>
            <Dialog.Title>Delete Option</Dialog.Title>
            <Dialog.Description>
              Are you sure you want to delete the option "
              {deleteIndex !== null ? options[deleteIndex]?.label : ""}"? This
              action cannot be undone.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer>
            <Button variant="soft" color="gray" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button color="red" onClick={confirmDelete}>
              Delete
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}

export default DropdownOptionsEditor
