"use client";
import * as React from "react";
import { CheckIcon, XCircle, ChevronDown, XIcon, Plus } from "lucide-react";

import { cn } from "utils";

import { Button, IconButton } from "../button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../command";
import { Popover } from "@radix-ui/themes";
import { Avatar } from "../avatar";

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
    label: string;
    /** The unique value associated with the option. */
    value: string;
    /** Optional icon component to display alongside the option. */
    icon?: React.ComponentType<{ className?: string }>;
    avatarSrc?: string;
    labelStyle?: string;
    disable?: boolean;
  }[];

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange: (value: string[]) => void;

  /** The default selected values when the component mounts. */
  defaultValue?: string[];

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string;

  popoverClass?: string;

  addNewLabel?: boolean;
  title?: string;
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
  }) => {
    const [selectedValues, setSelectedValues] =
      React.useState<string[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
    };

    const toggleOption = (option: string) => {
      const newSelectedValues = selectedValues.includes(option)
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option];
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const handleClear = () => {
      setSelectedValues([]);
      onValueChange([]);
    };

    // const filteredOptions = options.filter((option) => !option.disable);
    // const toggleAll = () => {
    //   if (selectedValues.length === filteredOptions.length) {
    //     handleClear();
    //   } else {
    //     const allValues = filteredOptions.map((option) => option.value);
    //     setSelectedValues(allValues);
    //     onValueChange(allValues);
    //   }
    // };

    return (
      <Popover.Root open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <Popover.Trigger>
          <IconButton
            color="gray"
            aria-label="Open options menu"
            className="flex w-8 h-8 items-center justify-center rounded-full "
          >
            <Plus aria-hidden="true" />
            <span className="sr-only">Add new item</span>
          </IconButton>
        </Popover.Trigger>
        <Popover.Content
          className={cn("z-[88] space-y-2", popoverClass)}
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
          width="280px"
        >
          {title && <h1 className="font-medium">{title}</h1>}
          <Command>
            <CommandInput
              placeholder={placeholder}
              onKeyDown={handleInputKeyDown}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {/* <CommandItem
                  key="all"
                  onSelect={toggleAll}
                  className="cursor-pointer"
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      selectedValues.length === filteredOptions.length
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50 [&_svg]:invisible",
                    )}
                  >
                    <CheckIcon className="h-4 w-4" />
                  </div>
                  <span>(Select All)</span>
                </CommandItem> */}
                {options.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  const isDisabled = option.disable;

                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => !isDisabled && toggleOption(option.value)}
                      className={cn(
                        "cursor-pointer justify-between rounded-md",
                        isDisabled && "cursor-not-allowed opacity-50 ", // Disable styling
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {option.icon && (
                          <option.icon
                            className={cn(
                              "mr-2 h-4 w-4",
                              isDisabled ? "text-muted-foreground" : "",
                            )}
                          />
                        )}
                        {option.avatarSrc && (
                          <Avatar src={option.avatarSrc} className="h-8 w-8" />
                        )}
                        <span className={cn("", option.labelStyle)}>
                          {option.label}
                        </span>
                      </div>

                      <div
                        className={cn(
                          "ml-2 flex h-5 w-5 items-center justify-center rounded-sm border border-secondary",
                          isSelected
                            ? "bg-secondary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible",
                        )}
                      >
                        {!isDisabled && <CheckIcon className="h-4 w-4" />}
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {/* <CommandSeparator /> */}
              <CommandGroup>
                {addNewLabel ? (
                  <>
                    <Button className="h-10 w-full rounded-md bg-blue-500 px-4   text-white ">
                      Add new label
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between font-medium">
                      {selectedValues.length > 0 && (
                        <CommandItem
                          onSelect={handleClear}
                          className="flex-1 justify-center cursor-pointer h-10 "
                        >
                          Clear
                        </CommandItem>
                      )}
                      <CommandItem
                        onSelect={() => setIsPopoverOpen(false)}
                        className="h-10 max-w-full flex-1 cursor-pointer justify-center   "
                      >
                        Close
                      </CommandItem>
                    </div>
                  </>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </Popover.Content>
      </Popover.Root>
    );
  },
);

ComboBox.displayName = "Combobox";
