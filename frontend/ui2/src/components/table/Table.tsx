"use client"

import type { DeepPartial } from "@/types"
import { mergeDeep } from "@/lib/objects"
import { type ComponentPropsWithRef, forwardRef } from "react"
import { twMerge } from "tailwind-merge"
import { TableBody, type TableBodyTheme } from "./TableBody"
import { TableCell } from "./TableCell"
import { TableContext } from "./TableContext"
import { TableHead, type TableHeadTheme } from "./TableHead"
import { TableHeadCell } from "./TableHeadCell"
import { TableRow, type TableRowTheme } from "./TableRow"
import { tableTheme } from "./theme"

export interface TableTheme {
  root: TableRootTheme
  head: TableHeadTheme
  row: TableRowTheme
  body: TableBodyTheme
}

export interface TableRootTheme {
  base: string
  shadow: string
  wrapper: string
}

export interface TableProps extends ComponentPropsWithRef<"table"> {
  striped?: boolean
  hoverable?: boolean
  compact?: boolean
  theme?: DeepPartial<TableTheme>
}

const TableComponent = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      children,
      className,
      striped = true,
      compact,
      hoverable = true,
      theme: customTheme = {},
      ...props
    },
    ref
  ) => {
    const theme = mergeDeep(tableTheme, customTheme)
    return (
      <div data-testid="table-element" className={twMerge(theme.root.wrapper)}>
        <TableContext.Provider value={{ theme, striped, hoverable, compact }}>
          <div className={twMerge(theme.root.shadow, className)} />
          <table
            className={twMerge(theme.root.base, className)}
            {...props}
            ref={ref}
          >
            {children}
          </table>
        </TableContext.Provider>
      </div>
    )
  }
)

TableComponent.displayName = "Table"

export const Table = Object.assign(TableComponent, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  HeadCell: TableHeadCell,
})
