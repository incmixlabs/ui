import * as React from "react"

import { Flex, Popover, Text, iconSize } from "@/base"
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
  IconButton,
  Input,
} from "@/base"
import { cn } from "@/shadcn/lib/utils"
import { CheckIcon, Plus } from "lucide-react"
import ColorPicker, { type ColorSelectType } from "./color-picker"
import type { ExtendedColorType } from "./combo-box"

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "defaultValue"> {
  /**
   * An array of option objects to be displayed in the multi-select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: {
    /** The text to display for the option. */
    label: string
    /** The unique value associated with the option. */
    value: string
    /** Optional icon component to display alongside the option. */
    icon?: React.ComponentType<{ className?: string }>
    avatar?: string
    color?: ExtendedColorType | string
    disable?: boolean
    checked?: boolean
  }[]

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange?: (
    value: {
      label: string | undefined
      value: string
      avatar?: string
      color?: ExtendedColorType | string
      disable?: boolean
      checked?: boolean
    }[]
  ) => void

  defaultValue?: {
    /** The text to display for the option. */
    label: string | undefined
    /** The unique value associated with the option. */
    value: string
    avatar?: string
    color?: ExtendedColorType | string
    disable?: boolean
    checked?: boolean
  }[]
  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string
  popoverClass?: string
  addNewLabel?: boolean
  title?: string
  isLabelFormOpen?: boolean
  setIsLabelFormOpen?: (isLabelFormOpen: boolean) => void
  labelColor?: string
  setLabelColor?: (labelColor: ExtendedColorType) => void
  btnClassName?: string
}

export const ListComboBox = ({
  onValueChange,
  defaultValue,
  placeholder = "Select options",
  title,
  popoverClass,
  addNewLabel = false,
  labelColor,
  setLabelColor,
  isLabelFormOpen,
  setIsLabelFormOpen,
  btnClassName,
}: MultiSelectProps) => {
  const [selectedValues, setSelectedValues] = React.useState(defaultValue ?? [])
  const labelInputRef = React.useRef<HTMLInputElement>(null)
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  const [error, setError] = React.useState("")

  // Rest of your component code remains the same...
  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsPopoverOpen(true)
    } else if (event.key === "Backspace" && !event.currentTarget.value) {
      const newSelectedValues = [...selectedValues]
      newSelectedValues.pop()
      setSelectedValues(newSelectedValues)
      onValueChange?.(newSelectedValues)
    }
  }

  const toggleOption = (value: string) => {
    const newOptions = selectedValues.map((opt) =>
      opt.value === value ? { ...opt, checked: !opt.checked } : opt
    )

    setSelectedValues(newOptions)
    onValueChange?.(newOptions)
  }

  const handleClear = () => {
    setSelectedValues([])
    onValueChange?.([])
  }

  const handleColorSelect = (newColor: ColorSelectType) => {
    if (setLabelColor) {
      setLabelColor(newColor.name as ExtendedColorType)
    }
  }

  const handleAddNewLabel = (e: React.FormEvent) => {
    e.preventDefault()

    const labelName = labelInputRef.current?.value.trim()

    if (!labelName) {
      setError("Please enter a label name")
      return
    }
    const labelExists = selectedValues.some(
      (existing) => existing.label?.toLowerCase() === labelName.toLowerCase()
    )

    if (labelExists) {
      setError("A label with this name already exists")
      return
    }

    const newLabel = {
      value: labelName.toLowerCase().replace(/\s+/g, "-"),
      label: labelName,
      color: labelColor || "blue",
      checked: true,
    }
    setSelectedValues([...selectedValues, newLabel])
    onValueChange?.([...selectedValues, newLabel])
    // Reset form and close it
    if (labelInputRef.current) {
      labelInputRef.current.value = ""
    }
    setError("")
    setIsLabelFormOpen?.(false)
  }
  return (
    <Popover.Root open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <Popover.Trigger>
        <IconButton
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
              {selectedValues.map((option) => {
                const isSelected = selectedValues.find(
                  (item) => item.checked === option.checked
                )?.checked
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
                      {option.avatar && (
                        <Avatar name={option.label??''} src={option.avatar} className="h-8 w-8" />
                      )}
                      <Badge
                        color={
                          typeof option.color === "string"
                            ? (option.color as any)
                            : "blue"
                        }
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
                    <div className="p-2">
                      {" "}
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
                            onClick={handleAddNewLabel}
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
                    </div>
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

ListComboBox.displayName = "ListComboBox"
