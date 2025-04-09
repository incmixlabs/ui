"use client"

import { Check } from "lucide-react"
import * as React from "react"

import { Command, Popover } from "@/components/base"
import { cn } from "@/lib/utils"
const FacetedFilter = Popover

const FacetedFilterTrigger = React.forwardRef<
  React.ComponentRef<typeof Popover.Trigger>,
  React.ComponentPropsWithoutRef<typeof Popover.Trigger>
>(({ className, children, ...props }, ref) => (
  <Popover.Trigger ref={ref} className={cn(className)} {...props}>
    {children}
  </Popover.Trigger>
))
FacetedFilterTrigger.displayName = "FacetedFilterTrigger"

const FacetedFilterContent = React.forwardRef<
  React.ComponentRef<typeof Popover.Content>,
  React.ComponentPropsWithoutRef<typeof Popover.Content>
>(({ className, children, ...props }, ref) => (
  <Popover.Content
    ref={ref}
    className={cn("w-[12.5rem] p-0", className)}
    align="start"
    {...props}
  >
    <Command.Root>{children}</Command.Root>
  </Popover.Content>
))
FacetedFilterContent.displayName = "FacetedFilterContent"

const FacetedFilterInput = Command.Input

const FacetedFilterList = Command.List

const FacetedFilterEmpty = Command.Empty

const FacetedFilterGroup = Command.Group

interface FacetedFilterItemProps
  extends React.ComponentPropsWithoutRef<typeof Command.Item> {
  selected: boolean
}

const FacetedFilterItem = React.forwardRef<
  React.ComponentRef<typeof Command.Item>,
  FacetedFilterItemProps
>(({ className, children, selected, ...props }, ref) => {
  return (
    <Command.Item
      ref={ref}
      aria-selected={selected}
      data-selected={selected}
      className={cn(className)}
      {...props}
    >
      <span
        className={cn(
          "mr-2 flex size-4 items-center justify-center rounded-sm border border-primary",
          selected
            ? "bg-primary text-primary-foreground"
            : "opacity-50 [&_svg]:invisible"
        )}
      >
        <Check className="size-4" />
      </span>
      {children}
    </Command.Item>
  )
})
FacetedFilterItem.displayName = "FacetedFilterItem"

const FacetedFilterSeparator = Command.Separator

const FacetedFilterShortcut = Command.Shortcut

export {
  FacetedFilter,
  FacetedFilterTrigger,
  FacetedFilterContent,
  FacetedFilterInput,
  FacetedFilterList,
  FacetedFilterEmpty,
  FacetedFilterGroup,
  FacetedFilterItem,
  FacetedFilterSeparator,
  FacetedFilterShortcut,
}
