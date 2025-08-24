import { Command as CommandPrimitive, useCommandState } from "cmdk"
import { CheckIcon, Plus, X } from "lucide-react"
import * as React from "react"
import { forwardRef, useEffect } from "react"

import { useDebounce } from "@/hooks/use-debounce"
import { cn } from "@/shadcn/lib/utils"
import { Flex, Popover, Text, type badgePropDefs, iconSize } from "@/src/1base"
import {
  Avatar,
  Badge,
  Button,
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  IconButton,
  Input,
} from "@/src/1base"
import ColorPicker, { type ColorSelectType } from "./color-picker"

type BadgeColorProp = typeof badgePropDefs.color.default
export type ExtendedColorType = BadgeColorProp

export interface Option {
  value: string
  label: string
  id?: string
  name?: string
  disable?: boolean
  avatar?: string
  color?: ExtendedColorType | string
  position?: string
  checked?: boolean
  fixed?: boolean
  [key: string]: string | boolean | undefined
}

interface GroupOption {
  [key: string]: Option[]
}

/**
 * Unified MultiSelect component that combines list-combo-box and multi-select functionality
 */
interface MultiSelectProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "defaultValue" | "value" | "onChange"
  > {
  // Core options
  options?: Option[]
  defaultOptions?: Option[]
  value?: Option[]
  defaultValue?: Option[]

  // Callbacks
  onChange?: (options: Option[]) => void
  onValueChange?: (value: Option[]) => void
  onSearch?: (value: string) => Promise<Option[]>
  onSearchSync?: (value: string) => Option[]
  onMaxSelected?: (maxLimit: number) => void

  // UI Configuration
  placeholder?: string
  loadingIndicator?: React.ReactNode
  emptyIndicator?: React.ReactNode
  maxSelected?: number
  hidePlaceholderWhenSelected?: boolean
  disabled?: boolean
  className?: string
  badgeClassName?: string
  popoverClass?: string
  btnClassName?: string
  selectFirstItem?: boolean
  hideClearAllButton?: boolean

  // Advanced features
  groupBy?: string
  creatable?: boolean
  delay?: number
  triggerSearchOnFocus?: boolean

  // Label creation mode (from list-combo-box)
  addNewLabel?: boolean
  title?: string
  isLabelFormOpen?: boolean
  setIsLabelFormOpen?: (isLabelFormOpen: boolean) => void
  labelColor?: string
  setLabelColor?: (labelColor: ExtendedColorType) => void

  // Rendering mode
  variant?: "dropdown" | "popover"

  // Component props
  commandProps?: React.ComponentPropsWithoutRef<typeof Command>
  inputProps?: Omit<
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>,
    "value" | "placeholder" | "disabled"
  >

  // Color theme
  defaultColor?: "gray" | "indigo" | "cyan" | "orange" | "crimson"
}

export interface MultiSelectRef {
  selectedValue: Option[]
  input: HTMLInputElement
  focus: () => void
  reset: () => void
}

function transToGroupOption(options: Option[], groupBy?: string) {
  if (options.length === 0) {
    return {}
  }
  if (!groupBy) {
    return {
      "": options,
    }
  }

  const groupOption: GroupOption = {}
  options.forEach((option) => {
    const key = (option[groupBy] as string) || ""
    if (!groupOption[key]) {
      groupOption[key] = []
    }
    groupOption[key].push(option)
  })
  return groupOption
}

function removePickedOption(groupOption: GroupOption, picked: Option[]) {
  const cloneOption = JSON.parse(JSON.stringify(groupOption)) as GroupOption

  for (const [key, value] of Object.entries(cloneOption)) {
    cloneOption[key] = value.filter(
      (val) => !picked.find((p) => p.value === val.value)
    )
  }
  return cloneOption
}

function isOptionsExist(groupOption: GroupOption, targetOption: Option[]) {
  for (const [, value] of Object.entries(groupOption)) {
    if (
      value.some((option) => targetOption.find((p) => p.value === option.value))
    ) {
      return true
    }
  }
  return false
}

const CommandEmpty = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof CommandPrimitive.Empty>
>(({ className, ...props }, forwardedRef) => {
  const render = useCommandState((state) => state.filtered.count === 0)

  if (!render) return null

  return (
    <div
      ref={forwardedRef}
      className={cn("p-2 text-center text-sm", className)}
      cmdk-empty=""
      role="presentation"
      {...props}
    />
  )
})

CommandEmpty.displayName = "CommandEmpty"

export const MultiSelect = React.forwardRef<MultiSelectRef, MultiSelectProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      onValueChange,
      placeholder = "Select options",
      defaultOptions: arrayDefaultOptions = [],
      options: arrayOptions,
      defaultColor = "crimson",
      delay,
      onSearch,
      onSearchSync,
      loadingIndicator,
      emptyIndicator,
      maxSelected = Number.MAX_SAFE_INTEGER,
      onMaxSelected,
      hidePlaceholderWhenSelected,
      disabled,
      groupBy,
      className,
      badgeClassName,
      selectFirstItem = true,
      creatable = false,
      triggerSearchOnFocus = false,
      commandProps,
      inputProps,
      hideClearAllButton = false,
      // Label creation mode props
      addNewLabel = false,
      title,
      isLabelFormOpen,
      setIsLabelFormOpen,
      labelColor,
      setLabelColor,
      variant = "dropdown",
      popoverClass,
      btnClassName,
    }: MultiSelectProps,
    ref: React.Ref<MultiSelectRef>
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const labelInputRef = React.useRef<HTMLInputElement>(null)
    const [open, setOpen] = React.useState(false)
    const [onScrollbar, setOnScrollbar] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const dropdownRef = React.useRef<HTMLDivElement>(null)
    const [error, setError] = React.useState("")

    const [selected, setSelected] = React.useState<Option[]>(
      value || defaultValue || []
    )
    const [options, setOptions] = React.useState<GroupOption>(
      transToGroupOption(arrayDefaultOptions, groupBy)
    )
    const [inputValue, setInputValue] = React.useState("")
    const debouncedSearchTerm = useDebounce(inputValue, delay || 500)

    React.useImperativeHandle(
      ref,
      () => ({
        selectedValue: [...selected],
        input: inputRef.current as HTMLInputElement,
        focus: () => inputRef?.current?.focus(),
        reset: () => setSelected([]),
      }),
      [selected]
    )

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
        inputRef.current.blur()
      }
    }

    const handleUnselect = React.useCallback(
      (option: Option) => {
        const newOptions = selected.filter((s) => s.value !== option.value)
        setSelected(newOptions)
        onChange?.(newOptions)
        onValueChange?.(newOptions)
      },
      [onChange, onValueChange, selected]
    )

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current
        if (input) {
          if (e.key === "Delete" || e.key === "Backspace") {
            if (input.value === "" && selected.length > 0) {
              const lastSelectOption = selected[selected.length - 1]
              if (!lastSelectOption.fixed) {
                handleUnselect(selected[selected.length - 1])
              }
            }
          }
          if (e.key === "Escape") {
            input.blur()
          }
        }
      },
      [handleUnselect, selected]
    )

    const toggleOption = (value: string) => {
      const newOptions = selected.map((opt) =>
        opt.value === value ? { ...opt, checked: !opt.checked } : opt
      )
      setSelected(newOptions)
      onChange?.(newOptions)
      onValueChange?.(newOptions)
    }

    const handleClear = () => {
      const fixedOptions = selected.filter((s) => s.fixed)
      setSelected(fixedOptions)
      onChange?.(fixedOptions)
      onValueChange?.(fixedOptions)
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
      const labelExists = selected.some(
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
      const newSelected = [...selected, newLabel]
      setSelected(newSelected)
      onChange?.(newSelected)
      onValueChange?.(newSelected)

      if (labelInputRef.current) {
        labelInputRef.current.value = ""
      }
      setError("")
      setIsLabelFormOpen?.(false)
    }

    useEffect(() => {
      if (open) {
        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("touchend", handleClickOutside)
      } else {
        document.removeEventListener("mousedown", handleClickOutside)
        document.removeEventListener("touchend", handleClickOutside)
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
        document.removeEventListener("touchend", handleClickOutside)
      }
    }, [open])

    useEffect(() => {
      if (value) {
        setSelected(value)
      }
    }, [value])

    useEffect(() => {
      if (!arrayOptions || onSearch) {
        return
      }
      const newOption = transToGroupOption(arrayOptions || [], groupBy)
      if (JSON.stringify(newOption) !== JSON.stringify(options)) {
        setOptions(newOption)
      }
    }, [arrayDefaultOptions, arrayOptions, groupBy, onSearch, options])

    useEffect(() => {
      const doSearchSync = () => {
        const res = onSearchSync?.(debouncedSearchTerm)
        setOptions(transToGroupOption(res || [], groupBy))
      }

      const exec = () => {
        if (!onSearchSync || !open) return

        if (triggerSearchOnFocus) {
          doSearchSync()
        }

        if (debouncedSearchTerm) {
          doSearchSync()
        }
      }

      void exec()
    }, [debouncedSearchTerm, groupBy, open, triggerSearchOnFocus])

    useEffect(() => {
      const doSearch = async () => {
        setIsLoading(true)
        const res = await onSearch?.(debouncedSearchTerm)
        setOptions(transToGroupOption(res || [], groupBy))
        setIsLoading(false)
      }

      const exec = async () => {
        if (!onSearch || !open) return

        if (triggerSearchOnFocus) {
          await doSearch()
        }

        if (debouncedSearchTerm) {
          await doSearch()
        }
      }

      void exec()
    }, [debouncedSearchTerm, groupBy, open, triggerSearchOnFocus])

    const CreatableItem = () => {
      if (!creatable) return undefined
      if (
        isOptionsExist(options, [
          {
            value: inputValue,
            label: inputValue,
          },
        ]) ||
        selected.find((s) => s.value === inputValue)
      ) {
        return undefined
      }

      const Item = (
        <CommandItem
          value={inputValue}
          className="cursor-pointer"
          onMouseDown={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          onSelect={(value: string) => {
            if (selected.length >= maxSelected) {
              onMaxSelected?.(selected.length)
              return
            }
            setInputValue("")
            const newOptions = [...selected, { value, label: value }]
            setSelected(newOptions)
            onChange?.(newOptions)
            onValueChange?.(newOptions)
          }}
        >
          {`Create "${inputValue}"`}
        </CommandItem>
      )

      if (!onSearch && inputValue.length > 0) {
        return Item
      }

      if (onSearch && debouncedSearchTerm.length > 0 && !isLoading) {
        return Item
      }

      return undefined
    }

    const EmptyItem = React.useCallback(() => {
      if (!emptyIndicator) return undefined

      if (onSearch && !creatable && Object.keys(options).length === 0) {
        return (
          <CommandItem value="-" disabled>
            {emptyIndicator}
          </CommandItem>
        )
      }

      return <CommandEmpty>{emptyIndicator}</CommandEmpty>
    }, [creatable, emptyIndicator, onSearch, options])

    const selectables = React.useMemo<GroupOption>(
      () => removePickedOption(options, selected),
      [options, selected]
    )

    const commandFilter = React.useCallback(() => {
      if (commandProps?.filter) {
        return commandProps.filter
      }

      if (creatable) {
        return (value: string, search: string) => {
          return value.toLowerCase().includes(search.toLowerCase()) ? 1 : -1
        }
      }
      return undefined
    }, [creatable, commandProps?.filter])

    const getBadgeColorStyles = () => {
      switch (defaultColor) {
        case "indigo":
          return "bg-indigo-9 text-indigo-1 hover:bg-indigo-10"
        case "cyan":
          return "bg-cyan-9 text-cyan-1 hover:bg-cyan-10"
        case "orange":
          return "bg-orange-9 text-orange-1 hover:bg-orange-10"
        case "crimson":
          return "bg-crimson-9 text-crimson-1 hover:bg-crimson-10"
        default:
          return "bg-gray-4 text-gray-12 hover:bg-gray-6"
      }
    }

    const getClearButtonStyles = () => {
      switch (defaultColor) {
        case "indigo":
          return "bg-indigo-11 text-indigo-1"
        case "cyan":
          return "bg-cyan-11 text-cyan-1"
        case "orange":
          return "bg-orange-11 text-orange-1"
        case "crimson":
          return "bg-crimson-11 text-crimson-1"
        default:
          return "bg-gray-11 text-gray-1"
      }
    }

    // Popover variant (original list-combo-box style)
    if (variant === "popover") {
      return (
        <Popover.Root open={open} onOpenChange={setOpen}>
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
            onEscapeKeyDown={() => setOpen(false)}
            width="280px"
          >
            {title && <h1 className="font-medium">{title}</h1>}
            <Command className="bg-transparent">
              <CommandInput
                placeholder={placeholder}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setOpen(true)
                  } else if (e.key === "Backspace" && !e.currentTarget.value) {
                    const newSelectedValues = [...selected]
                    newSelectedValues.pop()
                    setSelected(newSelectedValues)
                    onChange?.(newSelectedValues)
                    onValueChange?.(newSelectedValues)
                  }
                }}
                className="border-0 focus:border-0 focus:outline-none"
              />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {selected.map((option) => {
                    const isSelected = option.checked
                    const isDisabled = option.disable

                    return (
                      <CommandItem
                        key={option.value}
                        onSelect={() =>
                          !isDisabled && toggleOption(option.value)
                        }
                        className={cn(
                          "cursor-pointer justify-between rounded-md",
                          isDisabled && "cursor-not-allowed opacity-50"
                        )}
                      >
                        <Flex align={"center"} gap={"2"}>
                          {option.avatar && (
                            <Avatar
                              name={option.label ?? ""}
                              src={option.avatar}
                              className="h-8 w-8"
                            />
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
                <CommandGroup>
                  {addNewLabel ? (
                    <>
                      {isLabelFormOpen ? (
                        <div className="p-2">
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
                        {selected.length > 0 && (
                          <CommandItem
                            onSelect={handleClear}
                            className="h-10 flex-1 cursor-pointer justify-center"
                          >
                            Clear
                          </CommandItem>
                        )}
                        <CommandItem
                          onSelect={() => setOpen(false)}
                          className="h-10 max-w-full flex-1 cursor-pointer justify-center"
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

    // Dropdown variant (original multi-select style)
    return (
      <Command
        ref={dropdownRef}
        {...commandProps}
        onKeyDown={(e) => {
          handleKeyDown(e)
          commandProps?.onKeyDown?.(e)
        }}
        className={cn(
          "h-auto overflow-visible bg-transparent",
          commandProps?.className
        )}
        shouldFilter={
          commandProps?.shouldFilter !== undefined
            ? commandProps.shouldFilter
            : !onSearch
        }
        filter={commandFilter()}
      >
        <div
          className={cn(
            "min-h-10 rounded-md border border-gray-6 text-base ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 md:text-sm",
            {
              "px-3 py-2": selected.length !== 0,
              "cursor-text": !disabled && selected.length !== 0,
            },
            className
          )}
          onClick={() => {
            if (disabled) return
            inputRef?.current?.focus()
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !disabled) {
              inputRef?.current?.focus()
            }
          }}
        >
          <div className="relative flex flex-wrap gap-1">
            {selected.map((option) => {
              return (
                <Badge
                  key={option.value}
                  className={cn(
                    "group data-[disabled]:bg-muted-foreground data-[disabled]:text-muted data-[disabled]:hover:bg-muted-foreground",
                    "data-[fixed]:bg-muted-foreground data-[fixed]:text-muted data-[fixed]:hover:bg-muted-foreground",
                    badgeClassName,
                    getBadgeColorStyles()
                  )}
                  data-fixed={option.fixed}
                  data-disabled={disabled || undefined}
                >
                  {option.avatar && (
                    <img
                      src={option.avatar}
                      alt={option.label}
                      className="h-7 w-7 rounded-full p-1"
                    />
                  )}
                  {option.label}
                  <button
                    type="button"
                    className={cn(
                      "ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2",
                      (disabled || option.fixed) && "hidden"
                    )}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(option)
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onClick={() => handleUnselect(option)}
                  >
                    <X className="h-3 w-3 group-hover:text-foreground" />
                  </button>
                </Badge>
              )
            })}
            <CommandPrimitive.Input
              {...inputProps}
              ref={inputRef}
              value={inputValue}
              disabled={disabled}
              onValueChange={(value) => {
                setInputValue(value)
                inputProps?.onValueChange?.(value)
              }}
              onBlur={(event) => {
                if (!onScrollbar) {
                  setOpen(false)
                }
                inputProps?.onBlur?.(event)
              }}
              onFocus={(event) => {
                setOpen(true)
                inputProps?.onFocus?.(event)
              }}
              placeholder={
                hidePlaceholderWhenSelected && selected.length !== 0
                  ? ""
                  : placeholder
              }
              className={cn(
                "block w-full rounded-md border-gray-5 bg-transparent outline-none placeholder:text-muted-foreground",
                {
                  "w-full": hidePlaceholderWhenSelected,
                  "px-3 py-2": selected.length === 0,
                  "mt-1.5": selected.length !== 0,
                },
                inputProps?.className
              )}
            />
            <button
              type="button"
              onClick={() => {
                handleClear()
              }}
              className={cn(
                "absolute right-0 grid h-6 w-6 place-content-center rounded-md bg-gray-12 text-gray-2",
                getClearButtonStyles(),
                (hideClearAllButton ||
                  disabled ||
                  selected.length < 1 ||
                  selected.filter((s) => s.fixed).length === selected.length) &&
                  "hidden"
              )}
              aria-label="Clear all selected items"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="relative">
          {open && (
            <CommandList
              className="absolute top-1 z-10 w-full animate-in rounded-md border border-gray-6 bg-popover text-popover-foreground shadow-md outline-none"
              onMouseLeave={() => {
                setOnScrollbar(false)
              }}
              onMouseEnter={() => {
                setOnScrollbar(true)
              }}
              onMouseUp={() => {
                inputRef?.current?.focus()
              }}
            >
              {isLoading ? (
                <>{loadingIndicator}</>
              ) : (
                <>
                  {EmptyItem()}
                  {CreatableItem()}
                  {!selectFirstItem && (
                    <CommandItem value="-" className="hidden" />
                  )}
                  {Object.entries(selectables).map(([key, dropdowns]) => (
                    <CommandGroup
                      key={key}
                      heading={key}
                      className="h-full overflow-auto"
                    >
                      {dropdowns.map((option) => {
                        return (
                          <CommandItem
                            key={option.value}
                            value={option.label}
                            disabled={option.disable}
                            onMouseDown={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                            }}
                            onSelect={() => {
                              if (selected.length >= maxSelected) {
                                onMaxSelected?.(selected.length)
                                return
                              }
                              setInputValue("")
                              const newOptions = [...selected, option]
                              setSelected(newOptions)
                              onChange?.(newOptions)
                              onValueChange?.(newOptions)
                            }}
                            className={cn(
                              "m-1 cursor-pointer p-2",
                              option.disable && "cursor-default"
                            )}
                          >
                            {option.avatar && (
                              <img
                                src={option.avatar}
                                alt={option.label}
                                className="h-7 w-7 rounded-full p-1"
                              />
                            )}
                            {option.label}
                          </CommandItem>
                        )
                      })}
                    </CommandGroup>
                  ))}
                </>
              )}
            </CommandList>
          )}
        </div>
      </Command>
    )
  }
)

MultiSelect.displayName = "MultiSelect"

// Legacy alias for backward compatibility
export const ComboBox = React.forwardRef<MultiSelectRef, MultiSelectProps>(
  (props, ref) => <MultiSelect {...props} variant="popover" ref={ref} />
)

ComboBox.displayName = "ComboBox"
