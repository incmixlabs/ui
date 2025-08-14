import { Box, Button, Flex, Text } from "@/src/1base"
import { useEffect, useRef, useState } from "react"
import {
  type DropdownOption,
  adjustColor,
  getContrastingTextColor,
} from "../cell-renderers"

interface DropdownCellEditorProps {
  value: string
  options: DropdownOption[]
  onSave: (newValue: string) => void
  onCancel: () => void
  strictDropdown?: boolean // Controls whether only predefined values can be selected
  // Enhanced features
  enableColorPicker?: boolean
  enableIcons?: boolean
  showCreateButton?: boolean
  createButtonText?: string
  onCreateOption?: (name: string, color?: string) => Promise<string>
  onUpdateOption?: (
    id: string,
    updates: { name?: string; color?: string }
  ) => Promise<void>
  onDeleteOption?: (id: string) => Promise<void>
  isLoading?: boolean
  loadingText?: string
  errorMessage?: string
  displayStyle?: "badge" | "button" | "minimal" | "plain"
  size?: "sm" | "md" | "lg"
  rowData?: any
}

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  size?: "sm" | "md"
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onChange,
  size = "md",
}) => {
  const [showPicker, setShowPicker] = useState(false)
  const [hoveredColor, setHoveredColor] = useState<string | null>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDialogElement>(null)

  // Color palette for option creation
  // const colorPalette = [
  //   '#93c5fd', '#fcd34d', '#86efac', '#f9a8d4', '#c4b5fd', '#a5b4fc',
  //   '#fdba74', '#67e8f9', '#d8b4fe', '#f87171', '#fde68a', '#6ee7b7'
  // ];

  const colorPalette = [
    "var(--blue-5)",
    "var(--green-5)",
    "var(--red-5)",
    "var(--yellow-5)",
    "var(--plum-5)",
    "var(--teal-5)",
    "var(--pink-5)",
    "var(--indigo-5)",
    "var(--amber-5)",
    "var(--orange-5)",
    "var(--purple-5)",
    "var(--teal-5)",
  ]

  const handleColorSelect = (selectedColor: string) => {
    onChange(selectedColor)
    setShowPicker(false)
  }

  // Position popup relative to button
  useEffect(() => {
    if (showPicker && buttonRef.current && popupRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      popupRef.current.style.top = `${rect.bottom + window.scrollY + 5}px`
      popupRef.current.style.left = `${rect.left + window.scrollX - 5}px`
    }
  }, [showPicker])

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (buttonRef.current && popupRef.current) {
        if (
          !buttonRef.current.contains(e.target as Node) &&
          !popupRef.current.contains(e.target as Node)
        ) {
          setShowPicker(false)
        }
      }
    }

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside, {
        capture: true,
      })
    }

    return () =>
      document.removeEventListener("mousedown", handleClickOutside, {
        capture: true,
      })
  }, [showPicker])

  const sizeClass = size === "sm" ? "w-6 h-6" : "w-8 h-8"

  return (
    <Box className="relative inline-block">
      <div
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation()
          setShowPicker(!showPicker)
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            e.stopPropagation()
            setShowPicker(!showPicker)
          }
        }}
        className={`${sizeClass} cursor-pointer rounded border border-gray-300 bg-gray-200`}
        style={{ backgroundColor: color }}
        tabIndex={0}
        role="button"
        aria-label="Color picker"
        aria-expanded={showPicker}
      />

      {showPicker && (
        <dialog
          ref={popupRef}
          open
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.stopPropagation()
            }
          }}
          className="fixed top-0 left-0 z-[9999] w-[200px] rounded-xl border border-gray-200 bg-white p-3 shadow-lg"
          aria-label="Color picker panel"
        >
          <div className="mb-2.5 flex justify-between gap-2.5">
            {colorPalette.slice(0, 6).map((c, i) => (
              <div
                key={`color-row1-${i}`}
                onClick={(e) => {
                  e.stopPropagation()
                  handleColorSelect(c)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    e.stopPropagation()
                    handleColorSelect(c)
                  }
                }}
                onMouseEnter={() => setHoveredColor(c)}
                onMouseLeave={() => setHoveredColor(null)}
                className={`h-6 w-6 cursor-pointer rounded-full transition-transform duration-200 ease-in-out ${
                  c === color
                    ? "border-2 border-black"
                    : "border border-gray-300"
                } ${hoveredColor === c ? "scale-115" : "scale-100"}`}
                style={{ backgroundColor: c }}
                tabIndex={0}
                role="button"
                aria-label={`Select color ${c}`}
              />
            ))}
          </div>

          <div className="flex justify-between gap-2.5">
            {colorPalette.slice(6).map((c, i) => (
              <div
                key={`color-row2-${i}`}
                onClick={(e) => {
                  e.stopPropagation()
                  handleColorSelect(c)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    e.stopPropagation()
                    handleColorSelect(c)
                  }
                }}
                onMouseEnter={() => setHoveredColor(c)}
                onMouseLeave={() => setHoveredColor(null)}
                className={`h-6 w-6 cursor-pointer rounded-full transition-transform duration-200 ease-in-out ${
                  c === color
                    ? "border-2 border-black"
                    : "border border-gray-300"
                } ${hoveredColor === c ? "scale-115" : "scale-100"}`}
                style={{ backgroundColor: c }}
                tabIndex={0}
                role="button"
                aria-label={`Select color ${c}`}
              />
            ))}
          </div>
        </dialog>
      )}
    </Box>
  )
}

export const DropdownCellEditor: React.FC<DropdownCellEditorProps> = ({
  value,
  options,
  onSave,
  onCancel,
  strictDropdown = true,
  // Enhanced features
  enableColorPicker = false,
  enableIcons = false,
  showCreateButton = false,
  createButtonText = "Create & Select",
  onCreateOption,
  isLoading = false,
  loadingText = "Loading...",
  errorMessage,
}) => {
  const [isOpen, setIsOpen] = useState(true)
  // Initialize with empty string instead of the value (which might be an ID)
  const [customValue, setCustomValue] = useState("")
  const [customColor, setCustomColor] = useState("#93c5fd")
  const [isCreating, setIsCreating] = useState(false)
  const [isPositioned, setIsPositioned] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Get position of the cell that was clicked/activated to position dropdown properly
  useEffect(() => {
    // Function to find the editing cell with better detection for keyboard navigation
    const findEditingCell = () => {
      if (!dropdownRef.current) return

      // Find the active/editing cell using multiple strategies
      // 1. Try the active element itself
      // 2. Look for cells with aria-selected="true" which indicates keyboard selection
      // 3. Look for cells with custom attributes for editing state
      // 4. Fall back to active element's closest td

      const activeElement = document.activeElement
      let targetCell: Element | null = null

      // Strategy 1: First check for cells with aria-selected="true" (keyboard navigation)
      const selectedCells = document.querySelectorAll(
        'td[aria-selected="true"]'
      )
      if (selectedCells.length === 1) {
        targetCell = selectedCells[0]
      }

      // Strategy 2: If no selected cell found, check for cells with editing state
      if (!targetCell) {
        const editingCells = document.querySelectorAll(
          'td[data-state="editing"]'
        )
        if (editingCells.length === 1) {
          targetCell = editingCells[0]
        }
      }

      // Strategy 3: Fall back to active element's closest td
      if (!targetCell && activeElement) {
        targetCell = activeElement.closest("td")
      }

      // Strategy 4: Use the active element itself if nothing else worked
      if (!targetCell && activeElement) {
        targetCell = activeElement
      }

      // Position the dropdown if we found a target cell
      if (targetCell) {
        const cellRect = targetCell.getBoundingClientRect()
        const dropdown = dropdownRef.current

        // Position dropdown near the cell
        dropdown.style.top = `${cellRect.bottom + window.scrollY + 5}px`
        dropdown.style.left = `${cellRect.left + window.scrollX}px`

        // Make sure dropdown is within viewport bounds
        const dropdownRect = dropdown.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const viewportWidth = window.innerWidth

        // Adjust if extends beyond bottom
        if (dropdownRect.bottom > viewportHeight) {
          dropdown.style.top = `${cellRect.top + window.scrollY - dropdownRect.height - 5}px`
        }

        // Adjust if extends beyond right edge
        if (dropdownRect.right > viewportWidth) {
          dropdown.style.left = `${viewportWidth - dropdownRect.width - 10}px`
        }

        // Mark as positioned and make visible
        setIsPositioned(true)
      }
    }

    // Try positioning multiple times with delays to handle different timing scenarios
    // This ensures we catch the correct positioning even with keyboard navigation
    findEditingCell() // Immediate attempt

    // Additional attempts with increasing delays to ensure we catch the position
    const timers = [
      setTimeout(findEditingCell, 10),
      setTimeout(findEditingCell, 50),
      setTimeout(findEditingCell, 100),
    ]

    // Focus the input field if in custom mode
    if (!strictDropdown && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }

    return () => {
      // Clean up timers
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [])

  // Verify options are valid
  const validOptions = Array.isArray(options) ? options : []

  // Find the selected option
  const _selectedOption = validOptions.find(
    (option) => option.value === value
  ) || {
    value,
    label: value,
    color: "#e5e7eb", // Default gray color
  }

  // Handle option selection
  const handleSelect = (optionValue: string) => {
    onSave(optionValue)
    setIsOpen(false)
  }

  // Handle custom value input change
  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomValue(e.target.value)
  }

  // Generate unique color for new options
  const generateUniqueColor = () => {
    const existingColors = options.map((option) => option.color).filter(Boolean)
    const colorPalette = [
      "var(--blue-5)",
      "var(--green-5)",
      "var(--red-5)",
      "var(--yellow-5)",
      "var(--plum-5)",
      "var(--teal-5)",
      "var(--pink-5)",
      "var(--indigo-5)",
      "var(--amber-5)",
      "var(--orange-5)",
      "var(--purple-5)",
      "var(--teal-5)",
    ]

    const unusedColor = colorPalette.find(
      (color) => !existingColors.includes(color)
    )
    return unusedColor || "var(--blue-5)"
  }

  // Set unique color when component mounts
  useEffect(() => {
    if (enableColorPicker) {
      setCustomColor(generateUniqueColor())
    }
  }, [enableColorPicker, options])

  // Handle custom value submission with enhanced creation
  const handleCustomValueSubmit = async () => {
    if (!customValue.trim()) return

    const trimmedValue = customValue.trim()

    // Check if value already exists
    const normalizedValue = trimmedValue.toLowerCase().replace(/\s+/g, "_")
    const alreadyExists = options.some(
      (opt) =>
        opt.value === trimmedValue ||
        opt.value === normalizedValue ||
        opt.label.toLowerCase() === trimmedValue.toLowerCase()
    )

    if (alreadyExists) {
      const existingOption = options.find(
        (opt) =>
          opt.value === trimmedValue ||
          opt.value === normalizedValue ||
          opt.label.toLowerCase() === trimmedValue.toLowerCase()
      )
      if (existingOption) {
        onSave(existingOption.value)
      } else {
        onSave(trimmedValue)
      }
      setIsOpen(false)
      return
    }

    // Create new option if callback is provided
    if (onCreateOption && showCreateButton) {
      setIsCreating(true)
      try {
        const newOptionId = await onCreateOption(
          trimmedValue,
          enableColorPicker ? customColor : undefined
        )
        onSave(newOptionId)
        setCustomValue("")
        setCustomColor(generateUniqueColor())
      } catch (error) {
        console.error("Failed to create new option:", error)
        // Still save the value even if creation fails
        onSave(trimmedValue)
      } finally {
        setIsCreating(false)
      }
    } else {
      // Fallback to simple value submission
      onSave(trimmedValue)
    }

    setIsOpen(false)
  }

  // Handle enter key in custom input
  const handleCustomInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleCustomValueSubmit()
    } else if (e.key === "Escape") {
      e.preventDefault()
      onCancel()
      setIsOpen(false)
    }
  }

  // Handle click outside to cancel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onCancel()
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onCancel])

  // Handle escape key to cancel
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel()
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [onCancel])

  if (!isOpen) return null

  return (
    <Box
      ref={dropdownRef}
      className="fixed z-[9999] rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5 transition-opacity duration-150 focus:outline-none dark:bg-gray-800 dark:ring-gray-700"
      style={{
        minWidth: "260px",
        maxWidth: "320px",
        maxHeight: "400px",
        overflowY: "auto",
        // Fixed positioning relative to viewport
        position: "fixed",
        // Hide until positioned, then reveal with opacity transition
        opacity: isPositioned ? 1 : 0,
        top: "0px",
        left: "0px",
        visibility: isPositioned ? "visible" : "hidden",
      }}
    >
      {/* Loading state */}
      {isLoading && (
        <Box className="border-gray-100 border-b px-4 py-3 dark:border-gray-700">
          <Flex className="flex items-center gap-2 text-gray-600 text-sm dark:text-gray-400">
            <Box className="h-4 w-4 animate-spin rounded-full border border-gray-400 border-t-transparent" />
            {loadingText}
          </Flex>
        </Box>
      )}

      {/* Error message */}
      {errorMessage && (
        <Box className="border-gray-100 border-b px-4 py-3 dark:border-gray-700">
          <Text className="text-red-600 text-sm dark:text-red-400">
            {errorMessage}
          </Text>
        </Box>
      )}

      {/* Header */}
      <Box className="border-gray-100 border-b px-4 py-2 dark:border-gray-700">
        <Text className="font-medium text-gray-500 text-xs uppercase tracking-wide dark:text-gray-400">
          Select Option
        </Text>
      </Box>

      {/* Custom value input when strictDropdown is false */}
      {!strictDropdown && (
        <Box className="border-gray-100 border-b px-4 py-3 dark:border-gray-700">
          <Flex className="space-y-3">
            <Text className="font-medium text-gray-700 text-xs dark:text-gray-300">
              {showCreateButton ? "Create New Option" : "Add Custom Value"}
            </Text>

            <Flex gap="2">
              {/* Color picker */}
              {enableColorPicker && (
                <ColorPicker
                  color={customColor}
                  onChange={setCustomColor}
                  size="sm"
                />
              )}

              {/* Input field */}
              <input
                ref={inputRef}
                type="text"
                value={customValue}
                onChange={handleCustomInputChange}
                onKeyDown={handleCustomInputKeyDown}
                className="flex-1 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-gray-900 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                placeholder="Enter option name..."
                disabled={isCreating}
              />
            </Flex>

            {/* Create button */}
            <Button
              size="2"
              variant="ghost"
              onClick={handleCustomValueSubmit}
              disabled={!customValue.trim() || isCreating}
            >
              {isCreating ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-3 w-3 animate-spin rounded-full border border-white border-t-transparent" />
                  Creating...
                </div>
              ) : (
                createButtonText
              )}
            </Button>
          </Flex>

          {validOptions.length > 0 && (
            <Box className="mt-3 border-gray-100 border-t pt-3 dark:border-gray-700">
              <Text className="text-gray-500 text-xs dark:text-gray-400">
                Or select from existing options:
              </Text>
            </Box>
          )}
        </Box>
      )}

      {/* Dropdown options list */}
      <Box className="max-h-48 overflow-y-auto">
        {validOptions.length === 0 ? (
          <Box className="px-4 py-3 text-center text-gray-500 text-sm dark:text-gray-400">
            No options available
          </Box>
        ) : (
          validOptions.map((option) => {
            const isSelected = option.value === value

            return (
              <Box
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`cursor-pointer px-4 py-2.5 text-sm transition-colors ${
                  isSelected
                    ? "border-blue-500 border-r-2 bg-blue-50 dark:bg-blue-900/30"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }
                `}
              >
                <Flex align={"center"} gap="2">
                  {/* Color indicator */}
                  <Box
                    className="h-3 w-3 flex-shrink-0 rounded-full ring-1 ring-gray-200 dark:ring-gray-600"
                    style={{
                      backgroundColor: option.color || "#e5e7eb",
                    }}
                  />

                  {/* Icon if enabled */}
                  {enableIcons && option.icon && (
                    <Box className="flex-shrink-0 text-gray-500">
                      {option.icon}
                    </Box>
                  )}

                  {/* Label */}
                  <Text className="flex-grow font-medium text-gray-900 dark:text-gray-100">
                    {option.label || option.value}
                  </Text>

                  {/* Selected indicator */}
                  {isSelected && (
                    <Box className="flex-shrink-0 text-blue-500">
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Box>
                  )}
                </Flex>
              </Box>
            )
          })
        )}
      </Box>
    </Box>
  )
}

export default DropdownCellEditor
