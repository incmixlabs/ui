"use client"

import type { Table } from "@tanstack/react-table"
import { Check, ChevronsUpDown, Settings2 } from "lucide-react"
import * as React from "react"

import { Button, Command, Popover } from "@/components/base"
import { toSentenceCase } from "@/lib/strings"
import { cn } from "@/lib/utils"

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button
          ref={triggerRef}
          aria-label="Toggle columns"
          variant="outline"
          size="1"
          className="ml-auto hidden h-8 gap-2 focus:outline-none focus:ring-1 focus:ring-ring focus-visible:ring-0 lg:flex"
        >
          <Settings2 className="size-4" />
          View
          <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50" />
        </Button>
      </Popover.Trigger>
      <Popover.Content
        align="end"
        className="w-44 p-0"
        onCloseAutoFocus={() => triggerRef.current?.focus()}
      >
        <Command.Root>
          <Command.Input placeholder="Search columns..." />
          <Command.List>
            <Command.Empty>No columns found.</Command.Empty>
            <Command.Group>
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <Command.Item
                      key={column.id}
                      onSelect={() =>
                        column.toggleVisibility(!column.getIsVisible())
                      }
                    >
                      <span className="truncate">
                        {toSentenceCase(column.id)}
                      </span>
                      <Check
                        className={cn(
                          "ml-auto size-4 shrink-0",
                          column.getIsVisible() ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </Command.Item>
                  )
                })}
            </Command.Group>
          </Command.List>
        </Command.Root>
      </Popover.Content>
    </Popover.Root>
  )
}
