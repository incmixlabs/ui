import { cn } from "@/shadcn/lib/utils"
import {
  Box,
  Flex,
  Popover,
  Text,
  type badgePropDefs,
  iconSize,
} from "@/src/1base"
import * as React from "react"

import {
  Avatar,
  Badge,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  IconButton,
  Input,
} from "@/src/1base"
import { CheckIcon, Plus } from "lucide-react"
import ColorPicker, { type ColorSelectType } from "./color-picker"

type BadgeColorProp = typeof badgePropDefs.color.default
export type ExtendedColorType = BadgeColorProp

// Base option type
interface BaseOption {
  /** The text to display for the option. */
  label: string
  /** The unique value associated with the option. */
  value: string
  /** Optional icon component to display alongside the option. */
  icon?: React.ComponentType<{ className?: string }>
  avatar?: string
  color?: ExtendedColorType | string
  disable?: boolean
}

// Simple mode option (extends base)
interface SimpleOption extends BaseOption {}

// Stateful mode option (extends base with checked state)
export interface StatefulOption extends BaseOption {
  checked?: boolean
}

// Remove unused types to fix lint warnings

// Union type approach for better TypeScript support
interface BaseComboBoxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "defaultValue"> {
  /**
   * Placeholder text for the search input
   */
  placeholder?: string

  /**
   * Additional CSS class for the popover
   */
  popoverClass?: string

  /**
   * Enable adding new labels functionality
   */
  addNewLabel?: boolean

  /**
   * Title displayed at the top of the popover
   */
  title?: string

  /**
   * Whether the label form is currently open
   */
  isLabelFormOpen?: boolean

  /**
   * Callback to control label form open state
   */
  setIsLabelFormOpen?: (isOpen: boolean) => void

  /**
   * Current label color selection
   */
  labelColor?: string

  /**
   * Callback to update label color
   */
  setLabelColor?: (color: ExtendedColorType) => void

  /**
   * Additional CSS class for the trigger button
   */
  btnClassName?: string

  /**
   * Callback for internal form handling when new label is added
   */
  onAddLabel?: (label: { name: string; color: ExtendedColorType }) => void
}

// Simple mode props
interface SimpleComboBoxProps extends BaseComboBoxProps {
  mode?: "simple"
  options: SimpleOption[]
  onValueChange: (value: string[]) => void
  defaultValue?: string[]

  // External form handling
  formRef?: React.RefObject<HTMLFormElement | null>
  handleAddNewLabel?: (e: React.FormEvent) => void
}

// Stateful mode props
interface StatefulComboBoxProps extends BaseComboBoxProps {
  mode: "stateful"
  options: StatefulOption[]
  onValueChange: (value: StatefulOption[]) => void
  defaultValue?: StatefulOption[]
}

// Union of both prop types
type ComboBoxProps = SimpleComboBoxProps | StatefulComboBoxProps

export const ComboBox = React.forwardRef<HTMLButtonElement, ComboBoxProps>(
  (props, _ref) => {
    const {
      mode = "simple",
      options,
      onValueChange,
      defaultValue = [],
      placeholder = "Select options",
      title,
      popoverClass,
      addNewLabel = false,
      labelColor,
      setLabelColor,
      isLabelFormOpen,
      setIsLabelFormOpen,
      btnClassName,
      onAddLabel,
      ...buttonProps
    } = props

    // Get form-related props from union type
    const formRef = "formRef" in props ? props.formRef : undefined
    const handleAddNewLabel =
      "handleAddNewLabel" in props ? props.handleAddNewLabel : undefined

    // State management
    const [selectedValues, setSelectedValues] = React.useState<
      string[] | StatefulOption[]
    >(defaultValue)
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
    const [error, setError] = React.useState("")
    const labelInputRef = React.useRef<HTMLInputElement>(null)

    // Keyboard handling
    const handleInputKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          setIsPopoverOpen(true)
        } else if (event.key === "Backspace" && !event.currentTarget.value) {
          if (mode === "simple") {
            const newValues = [...(selectedValues as string[])]
            newValues.pop()
            setSelectedValues(newValues)
            ;(onValueChange as (value: string[]) => void)(newValues)
          } else {
            const newValues = [...(selectedValues as StatefulOption[])]
            newValues.pop()
            setSelectedValues(newValues)
            ;(onValueChange as (value: StatefulOption[]) => void)(newValues)
          }
        }
      },
      [mode, selectedValues, onValueChange]
    )

    // Selection logic
    const toggleOption = React.useCallback(
      (optionValue: string) => {
        if (mode === "simple") {
          const currentValues = selectedValues as string[]
          const newValues = currentValues.includes(optionValue)
            ? currentValues.filter((value) => value !== optionValue)
            : [...currentValues, optionValue]
          setSelectedValues(newValues)
          ;(onValueChange as (value: string[]) => void)(newValues)
        } else {
          const currentValues = selectedValues as StatefulOption[]
          const newValues = currentValues.map((opt) =>
            opt.value === optionValue ? { ...opt, checked: !opt.checked } : opt
          )
          setSelectedValues(newValues)
          ;(onValueChange as (value: StatefulOption[]) => void)(newValues)
        }
      },
      [mode, selectedValues, onValueChange]
    )

    // Clear functionality
    const handleClear = React.useCallback(() => {
      const emptyValue: string[] | StatefulOption[] = []
      setSelectedValues(emptyValue)
      if (mode === "simple") {
        ;(onValueChange as (value: string[]) => void)(emptyValue as string[])
      } else {
        ;(onValueChange as (value: StatefulOption[]) => void)(
          emptyValue as StatefulOption[]
        )
      }
    }, [mode, onValueChange])

    // Color selection
    const handleColorSelect = React.useCallback(
      (newColor: ColorSelectType) => {
        if (setLabelColor) {
          setLabelColor(newColor.name as ExtendedColorType)
        }
      },
      [setLabelColor]
    )

    // Selection state checker - fixes the bug from ListComboBox
    const isOptionSelected = React.useCallback(
      (option: SimpleOption | StatefulOption): boolean => {
        if (mode === "simple") {
          return (selectedValues as string[]).includes(option.value)
        }

        const statefulOption = option as StatefulOption
        const found = (selectedValues as StatefulOption[]).find(
          (item) => item.value === statefulOption.value
        )
        return found?.checked ?? false
      },
      [mode, selectedValues]
    )

    // Internal form handling for add new label
    const handleInternalAddLabel = React.useCallback(
      (e: React.FormEvent) => {
        e.preventDefault()

        const labelName = labelInputRef.current?.value.trim()

        if (!labelName) {
          setError("Please enter a label name")
          return
        }

        // Check for duplicates
        const isDuplicate =
          mode === "simple"
            ? (options as SimpleOption[]).some(
                (existing: SimpleOption) =>
                  existing.label.toLowerCase() === labelName.toLowerCase()
              )
            : (options as StatefulOption[]).some(
                (existing: StatefulOption) =>
                  existing.label?.toLowerCase() === labelName.toLowerCase()
              )

        if (isDuplicate) {
          setError("A label with this name already exists")
          return
        }

        // Call the callback if provided
        if (onAddLabel) {
          onAddLabel({
            name: labelName,
            color: (labelColor as ExtendedColorType) || "blue",
          })
        }

        // For stateful mode, add to internal state
        if (mode === "stateful") {
          const newLabel: StatefulOption = {
            value: labelName.toLowerCase().replace(/\s+/g, "-"),
            label: labelName,
            color: labelColor || "blue",
            checked: true,
          }
          const newValues = [...(selectedValues as StatefulOption[]), newLabel]
          setSelectedValues(newValues)
          ;(onValueChange as (value: StatefulOption[]) => void)(newValues)
        }

        // Reset form
        if (labelInputRef.current) {
          labelInputRef.current.value = ""
        }
        setError("")
        setIsLabelFormOpen?.(false)
      },
      [
        mode,
        options,
        selectedValues,
        onAddLabel,
        labelColor,
        onValueChange,
        setIsLabelFormOpen,
      ]
    )

    return (
      <Popover.Root open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <Popover.Trigger>
          <IconButton
            {...buttonProps}
            color="gray"
            aria-label="Open options menu"
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full",
              btnClassName
            )}
          >
            <Plus aria-hidden="true" />
            <Text className="sr-only">Add new item</Text>
          </IconButton>
        </Popover.Trigger>
        <Popover.Content
          className={cn("z-[88] space-y-2", popoverClass)}
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
          width="280px"
        >
          {title && <h1 className="font-medium">{title}</h1>}
          <Command className="bg-transparent">
            <CommandInput
              placeholder={placeholder}
              onKeyDown={handleInputKeyDown}
              className="border-0 focus:border-0 focus:outline-none"
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = isOptionSelected(option)
                  const isDisabled = option.disable

                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => !isDisabled && toggleOption(option.value)}
                      className={cn(
                        "cursor-pointer justify-between rounded-md",
                        isDisabled && "cursor-not-allowed opacity-50 " // Disable styling
                      )}
                    >
                      <Flex align={"center"} gap={"2"}>
                        {option.icon && (
                          <option.icon
                            className={cn(
                              `mr-2 ${iconSize}`,
                              isDisabled ? "text-muted-foreground" : ""
                            )}
                          />
                        )}
                        {option.avatar && (
                          <Avatar
                            name={option.label}
                            src={option.avatar}
                            className="h-8 w-8"
                          />
                        )}
                        <Badge
                          color={option.color as ExtendedColorType}
                          variant="solid"
                          className="px-3 py-1.5"
                        >
                          {option.label}
                        </Badge>
                      </Flex>
                      <Flex
                        justify={"center"}
                        align={"center"}
                        className={cn(
                          "ml-2 h-5 w-5 rounded-sm border border-secondary",
                          isSelected
                            ? "bg-secondary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        {!isDisabled && (
                          <CheckIcon className={`${iconSize} text-white`} />
                        )}
                      </Flex>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
              {/* <CommandSeparator /> */}
              <CommandGroup>
                {addNewLabel ? (
                  <>
                    {isLabelFormOpen ? (
                      <Box className="p-2">
                        <Input
                          name="labelName"
                          type="text"
                          ref={labelInputRef}
                          placeholder="Enter label name"
                          className="mb-2 w-full rounded-md border border-gray-5 bg-gray-1 px-3 py-2"
                        />
                        {error && (
                          <p className="mb-2 text-red-600 text-sm">{error}</p>
                        )}

                        <Flex justify={"between"}>
                          <Popover.Root>
                            <Popover.Trigger>
                              <Button
                                variant="solid"
                                className="color-swatch h-7 w-8 cursor-pointer rounded-sm border border-gray-12"
                                color={
                                  (labelColor as ExtendedColorType) || "blue"
                                }
                              />
                            </Popover.Trigger>
                            <Popover.Content
                              alignOffset={-75}
                              width="190px"
                              className="z-[888] overflow-hidden bg-white p-3"
                            >
                              <ColorPicker
                                colorType="base"
                                onColorSelect={handleColorSelect}
                              />
                            </Popover.Content>
                          </Popover.Root>
                          <Flex gap="2">
                            <Button
                              type="button"
                              color="blue"
                              variant="solid"
                              onClick={
                                formRef && handleAddNewLabel
                                  ? handleAddNewLabel
                                  : handleInternalAddLabel
                              }
                              className="h-8 rounded-md px-3"
                            >
                              Save
                            </Button>

                            <Button
                              type="button"
                              color="red"
                              variant="solid"
                              onClick={() => setIsLabelFormOpen?.(false)}
                            >
                              ✕
                            </Button>
                          </Flex>
                        </Flex>
                      </Box>
                    ) : (
                      <Button
                        onClick={() => setIsLabelFormOpen?.(true)}
                        className="h-10 w-full rounded-md bg-blue-500 px-4 text-white"
                      >
                        Add new label
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <Flex
                      justify={"between"}
                      align={"center"}
                      className="font-medium"
                    >
                      {selectedValues.length > 0 && (
                        <CommandItem
                          onSelect={handleClear}
                          className="h-10 flex-1 cursor-pointer justify-center "
                        >
                          Clear
                        </CommandItem>
                      )}
                      <CommandItem
                        onSelect={() => setIsPopoverOpen(false)}
                        className="h-10 max-w-full flex-1 cursor-pointer justify-center "
                      >
                        Close
                      </CommandItem>
                    </Flex>
                  </>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </Popover.Content>
      </Popover.Root>
    )
  }
)

ComboBox.displayName = "Combobox"
