import type { Column } from "@tanstack/react-table"
import { Check, PlusCircle } from "lucide-react"
import type { Option } from "./lib/types"

import { Badge } from "@radix-ui/themes"
import { Button } from "@radix-ui/themes"
import { Separator } from "@radix-ui/themes"
import { cn } from "@utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Popover
} from "@base"

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: Option[]
  size?: string
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
  size="16"
}: DataTableFacetedFilterProps<TData, TValue>) {
  const unknownValue = column?.getFilterValue()
  const selectedValues = new Set(
    Array.isArray(unknownValue) ? unknownValue : []
  )
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant="outline" size="1">
          <PlusCircle width={size} height={size}/>
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge className="rounded-sm px-1 font-normal lg:hidden">
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge className="rounded-sm px-1 font-normal">
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-[12.5rem] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList className="max-h-full">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className="max-h-[18.75rem] overflow-y-auto overflow-x-hidden">
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)

                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value)
                      } else {
                        selectedValues.add(option.value)
                      }
                      const filterValues = Array.from(selectedValues)
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      )
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex size-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className="size-4" aria-hidden="true" />
                    </div>
                    {option.icon && (
                      <option.icon
                        className="mr-2 size-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                    )}
                    <span>{option.label}</span>
                    {option.count && (
                      <span className="ml-auto flex size-4 items-center justify-center font-mono text-xs">
                        {option.count}
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </Popover.Content>
    </Popover.Root>
  )
}
