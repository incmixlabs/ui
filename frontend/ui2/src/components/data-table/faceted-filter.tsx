"use client"

import { Check } from "lucide-react"
import * as React from "react"

import { Command, Popover } from "@/components/base"
import { cn } from "@/lib/utils"
const FacetedFilter = Popover

type FacetedFilterTriggerProps = React.ComponentPropsWithoutRef<typeof Popover.Trigger>

function FacetedFilterTrigger({ className, children, ...props }: FacetedFilterTriggerProps) {
  return (
    <Popover.Trigger className={cn(className)} {...props}>
      {children}
    </Popover.Trigger>
  )
}
FacetedFilterTrigger.displayName = "FacetedFilterTrigger"

type FacetedFilterContentProps = React.ComponentPropsWithoutRef<typeof Popover.Content>

function FacetedFilterContent({ className, children, ...props }: FacetedFilterContentProps) {
  return (
    <Popover.Content
      className={cn("w-[12.5rem] p-0", className)}
      align="start"
      {...props}
    >
      <Command.Root>{children}</Command.Root>
    </Popover.Content>
  )
}
FacetedFilterContent.displayName = "FacetedFilterContent"

const FacetedFilterInput = Command.Input

const FacetedFilterList = Command.List

const FacetedFilterEmpty = Command.Empty

const FacetedFilterGroup = Command.Group

interface FacetedFilterItemProps
  extends React.ComponentPropsWithoutRef<typeof Command.Item> {
  selected: boolean
}

function FacetedFilterItem({ className, children, selected, ...props }: FacetedFilterItemProps) {
  return (
    <Command.Item
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
}
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
