"use client"

import type { DeepPartial } from "@/types"
import { mergeDeep } from "@/lib/objects"
import { type ComponentPropsWithRef, forwardRef } from "react"
import { twMerge } from "tailwind-merge"
import { useTableBodyContext } from "./TableBodyContext"
import { useTableContext } from "./TableContext"

export interface TableCellTheme {
  base: string
  padding: {
    base: string
    compact: string
  }
}

export interface TableCellProps extends ComponentPropsWithRef<"td"> {
  theme?: DeepPartial<TableCellTheme>
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ children, className, theme: customTheme = {}, ...props }, ref) => {
    const { theme: bodyTheme } = useTableBodyContext()
    const tableContext = useTableContext()
    const padding = tableContext.compact
      ? bodyTheme.cell.padding.compact
      : bodyTheme.cell.padding.base
    console.log("Padding ", padding)
    console.log("is compact", tableContext.compact)
    const theme = mergeDeep(bodyTheme.cell, customTheme)

    return (
      <td
        className={twMerge(theme.base, padding, theme.compact, className)}
        ref={ref}
        {...props}
      >
        {children}
      </td>
    )
  }
)

TableCell.displayName = "Table.Cell"
