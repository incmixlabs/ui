"use client"

import type { DeepPartial } from "@/types"
import { mergeDeep } from "@/lib/objects"
import { type ComponentPropsWithRef, forwardRef } from "react"
import { twMerge } from "tailwind-merge"
import { useTableContext } from "./TableContext"
import type { TableHeadCellTheme } from "./TableHeadCell"
import { TableHeadContext } from "./TableHeadContext"

export interface TableHeadTheme {
  base: string
  cell: TableHeadCellTheme
}

export interface TableHeadProps extends ComponentPropsWithRef<"thead"> {
  theme?: DeepPartial<TableHeadTheme>
}

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ children, className, theme: customTheme = {}, ...props }, ref) => {
    const { theme: rootTheme } = useTableContext()

    const theme = mergeDeep(rootTheme.head, customTheme)

    return (
      <TableHeadContext.Provider value={{ theme }}>
        <thead className={twMerge(theme.base, className)} ref={ref} {...props}>
          <tr>{children}</tr>
        </thead>
      </TableHeadContext.Provider>
    )
  }
)

TableHead.displayName = "Table.Head"
