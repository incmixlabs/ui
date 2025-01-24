"use client"

import type { DeepPartial } from "@types"
import { mergeDeep } from "@utils/objects"
import { type ComponentPropsWithRef, forwardRef } from "react"
import { twMerge } from "tailwind-merge"
import { useTableContext } from "./TableContext"
import { useTableHeadContext } from "./TableHeadContext"

export interface TableHeadCellTheme {
  base: string
  padding: {
    base: string
    tight: string
  }
}

export interface TableHeadCellProps extends ComponentPropsWithRef<"th"> {
  theme?: DeepPartial<TableHeadCellTheme>
}

export const TableHeadCell = forwardRef<
  HTMLTableCellElement,
  TableHeadCellProps
>(({ children, className, theme: customTheme = {}, ...props }, ref) => {
  const { theme: headTheme } = useTableHeadContext()
  const tableContext = useTableContext()
  const theme = mergeDeep(headTheme.cell, customTheme)
  const padding = tableContext.tight ? theme.padding.tight : theme.padding.base
  console.log("Padding ", padding)
  console.log("is tight", tableContext.tight)
  return (
    <th
      className={twMerge(theme.base, padding, theme.tight, className)}
      ref={ref}
      {...props}
    >
      {children}
    </th>
  )
})

TableHeadCell.displayName = "Table.HeadCell"
