"use client"

import type { DeepPartial } from "@/types"
import { mergeDeep } from "@/lib/objects"
import { type ComponentPropsWithRef, forwardRef } from "react"
import { twMerge } from "tailwind-merge"
import { useTableContext } from "./TableContext"

export interface TableRowTheme {
  base: string
  hovered: string
  striped: string
}

export interface TableRowProps extends ComponentPropsWithRef<"tr"> {
  theme?: DeepPartial<TableRowTheme>
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, className, theme: customTheme = {}, ...props }, ref) => {
    const { theme: rootTheme, hoverable, striped } = useTableContext()

    const theme = mergeDeep(rootTheme.row, customTheme)

    return (
      <tr
        ref={ref}
        data-testid="table-row-element"
        className={twMerge(
          theme.base,
          striped && theme.striped,
          hoverable && theme.hovered,
          className
        )}
        {...props}
      >
        {children}
      </tr>
    )
  }
)

TableRow.displayName = "Table.Row"
