import { Box, Button, Dialog, Flex, Input, Switch, Text } from "@/src/1base"
import { useCallback, useState } from "react"
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

  // Monochromatic mode state
  const [isMonochromatic, setIsMonochromatic] = useState(false)
  const [selectedBaseColor, setSelectedBaseColor] = useState("blue")

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

    // Reset the new option form with next available color
    const nextColor = getNextMonochromaticColor()
    setNewOption({
      label: "",
      value: "",
      color: nextColor,
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
      setErrors({ delete: "Cannot delete this option because it is currently in use in the table." })
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

  // Generate shades for a given base color
  const generateColorShades = useCallback((baseColor: string) => {
    const shades = []
    for (let i = 1; i <= 12; i++) {
      shades.push(`var(--${baseColor}-${i})`)
    }
    return shades
  }, [])

  // Handle monochromatic mode toggle
  const handleMonochromaticToggle = useCallback(
    (enabled: boolean) => {
      setIsMonochromatic(enabled)

      let updatedOptions = options
      if (enabled && options.length > 0) {
        // Reassign existing options to different shades of the selected base color
        const shades = generateColorShades(selectedBaseColor)
        updatedOptions = options.map((option, index) => ({
          ...option,
          color: shades[index % shades.length],
        }))
        onChange(updatedOptions)
      }

      // Update newOption color to match monochromatic mode
      const nextColor = enabled
        ? (() => {
            const shades = generateColorShades(selectedBaseColor)
            const usedShades = updatedOptions.map((opt) => opt.color)
            // Find first unused shade or cycle through
            for (const shade of shades) {
              if (!usedShades.includes(shade)) {
                return shade
              }
            }
            return shades[updatedOptions.length % shades.length]
          })()
        : "var(--blue-5)"

      setNewOption((prev) => ({ ...prev, color: nextColor }))
    },
    [options, selectedBaseColor, generateColorShades, onChange]
  )

  // Handle base color selection in monochromatic mode
  const handleBaseColorChange = useCallback(
    (newBaseColor: string) => {
      setSelectedBaseColor(newBaseColor)

      let updatedOptions = options
      if (isMonochromatic && options.length > 0) {
        // Reassign all existing options to shades of the new base color
        const shades = generateColorShades(newBaseColor)
        updatedOptions = options.map((option, index) => ({
          ...option,
          color: shades[index % shades.length],
        }))
        onChange(updatedOptions)
      }

      // Update newOption color to use new base color shade
      if (isMonochromatic) {
        const shades = generateColorShades(newBaseColor)
        const usedShades = updatedOptions.map((opt) => opt.color)
        let nextColor = shades[0] // default to first shade

        // Find first unused shade or cycle through
        for (const shade of shades) {
          if (!usedShades.includes(shade)) {
            nextColor = shade
            break
          }
        }
        if (!nextColor || usedShades.includes(nextColor)) {
          nextColor = shades[updatedOptions.length % shades.length]
        }

        setNewOption((prev) => ({ ...prev, color: nextColor }))
      }
    },
    [isMonochromatic, options, generateColorShades, onChange]
  )

  // Get the next available shade for new options in monochromatic mode
  const getNextMonochromaticColor = useCallback(() => {
    if (!isMonochromatic) return "var(--blue-5)"

    const shades = generateColorShades(selectedBaseColor)
    const usedShades = options.map((opt) => opt.color)

    // Find the first unused shade, or cycle through if all are used
    for (const shade of shades) {
      if (!usedShades.includes(shade)) {
        return shade
      }
    }

    // If all shades are used, return the next one in sequence
    return shades[options.length % shades.length]
  }, [isMonochromatic, selectedBaseColor, options, generateColorShades])

  return (
    <>
      <Box className="mt-4">
        {/* Section title */}
        <Text size="2" weight="bold" className="mb-3">
          Drop down data:
        </Text>

        {/* Monochromatic mode toggle */}
        <Box className="mb-4 rounded-lg border border-gray-6 bg-gray-2 p-3">
          <Flex align="center" justify="between" className="mb-2">
            <Box>
              <Text size="2" weight="medium">
                Monochromatic Mode
              </Text>
              <Text size="1" color="gray" className="mt-1">
                Use different shades of a single color family
              </Text>
            </Box>
            <Switch
              checked={isMonochromatic}
              onCheckedChange={handleMonochromaticToggle}
              aria-label="Enable monochromatic mode"
            />
          </Flex>

          {isMonochromatic && (
            <Box className="mt-3">
              <Text size="2" weight="medium" className="mb-2">
                Base Color:
              </Text>
              <ColorPicker
                color={`var(--${selectedBaseColor}-5)`}
                onChange={(color) => {
                  // Extract base color name from CSS variable
                  const colorMatch = color.match(/--([a-z]+)-/)
                  if (colorMatch) {
                    handleBaseColorChange(colorMatch[1])
                  } else {
                    // Fallback: if no CSS variable matched, preserve current selection
                    handleBaseColorChange(selectedBaseColor)
                  }
                }}
                colorType="base"
                size="md"
              />
            </Box>
          )}
        </Box>

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
                <Flex
                  key={index}
                  align="center"
                  gap="2"
                  className="w-full"
                >
                  <Box className="flex min-w-10 items-center justify-center">
                    <ColorPicker
                      color={option.color || "var(--blue-5)"}
                      onChange={(color) =>
                        handleUpdateOption(index, "color", color)
                      }
                      colorType={
                        isMonochromatic ? "monochromatic-shades-only" : "all"
                      }
                      baseColor={selectedBaseColor}
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
                color={newOption.color || getNextMonochromaticColor()}
                onChange={(color) => setNewOption({ ...newOption, color })}
                colorType={
                  isMonochromatic ? "monochromatic-shades-only" : "all"
                }
                baseColor={selectedBaseColor}
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
              Are you sure you want to delete the option "{deleteIndex !== null ? options[deleteIndex]?.label : ''}"? This action cannot be undone.
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
