import { Flex, Popover, Text } from "@incmix/ui"
import type { BadgeProps } from "@radix-ui/themes"
import { CheckIcon, Plus } from "lucide-react"
import * as React from "react"
import { cn } from "utils"
import { Avatar } from "../avatar"
import { Badge } from "../badge"
import { Button, IconButton } from "../button"
import ColorPicker, { type ColorSelectType } from "../color-picker"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../command"
import { Input } from "../form"

export type ExtendedColorType = BadgeProps["color"] | "blue"

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
  }[]

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange: (value: string[]) => void

  /** The default selected values when the component mounts. */
  defaultValue?: string[]
  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string
  popoverClass?: string
  addNewLabel?: boolean
  title?: string
  formRef?: React.RefObject<HTMLFormElement>
  isLabelFormOpen?: boolean
  setIsLabelFormOpen?: (isLabelFormOpen: boolean) => void
  labelColor?: string
  setLabelColor?: (labelColor: ExtendedColorType) => void
  handleAddNewLabel?: (e: React.FormEvent) => void
}

export const ComboBox = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  ({
    options,
    onValueChange,
    defaultValue = [],
    placeholder = "Select options",
    title,
    popoverClass,
    addNewLabel = false,
    formRef,
    labelColor,
    setLabelColor,
    isLabelFormOpen,
    setIsLabelFormOpen,
    handleAddNewLabel,
  }) => {
    const [selectedValues, setSelectedValues] =
      React.useState<string[]>(defaultValue)
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true)
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues]
        newSelectedValues.pop()
        setSelectedValues(newSelectedValues)
        onValueChange(newSelectedValues)
      }
    }

    const toggleOption = (option: string) => {
      const newSelectedValues = selectedValues.includes(option)
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option]
      setSelectedValues(newSelectedValues)
      onValueChange(newSelectedValues)
    }

    const handleClear = () => {
      setSelectedValues([])
      onValueChange([])
    }

    const handleColorSelect = (newColor: ColorSelectType) => {
      if (setLabelColor) {
        setLabelColor(newColor.name as ExtendedColorType)
      }
    }

    return (
      <Popover.Root open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <Popover.Trigger>
          <IconButton
            color="gray"
            aria-label="Open options menu"
            className="flex h-8 w-8 items-center justify-center rounded-full "
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
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValues.includes(option.value)
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
                              "mr-2 h-4 w-4",
                              isDisabled ? "text-muted-foreground" : ""
                            )}
                          />
                        )}
                        {option.avatar && (
                          <Avatar src={option.avatar} className="h-8 w-8" />
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
                        {!isDisabled && <CheckIcon className="h-4 w-4" />}
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
                      <form
                        ref={formRef}
                        onSubmit={handleAddNewLabel}
                        className="p-2"
                      >
                        <Input
                          name="labelName"
                          type="text"
                          placeholder="Enter label name"
                          className="mb-3 w-full rounded-md border border-gray-5 bg-gray-1 px-3 py-2"
                          required
                        />

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
                              type="submit"
                              color="blue"
                              variant="solid"
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
                      </form>
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
