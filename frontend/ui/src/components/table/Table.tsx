"use client";

import { forwardRef, type ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "@utils/objects";
import { tableTheme } from "./theme";
import type { DeepPartial } from "@types";
import { TableBody, type TableBodyTheme } from "./TableBody";
import { TableCell } from "./TableCell";
import { TableContext } from "./TableContext";
import { TableHead, type TableHeadTheme } from "./TableHead";
import { TableHeadCell } from "./TableHeadCell";
import { TableRow, type TableRowTheme } from "./TableRow";

export interface TableTheme {
  root:TableRootTheme;
  head:TableHeadTheme;
  row:TableRowTheme;
  body:TableBodyTheme;
}

export interface TableRootTheme {
  base: string;
  shadow: string;
  wrapper: string;
}

export interface TableProps extends ComponentPropsWithRef<"table"> {
  striped?: boolean;
  hoverable?: boolean;
  theme?: DeepPartial<TableTheme>;
}

const TableComponent = forwardRef<HTMLTableElement, TableProps>(
  ({ children, className, striped = true, hoverable = true, theme: customTheme = {}, ...props }, ref) => {
    const theme = mergeDeep(tableTheme, customTheme);

    return (
      <div data-testid="table-element" className={twMerge(theme.root.wrapper)}>
        <TableContext.Provider value={{ theme, striped, hoverable }}>
          <div className={twMerge(theme.root.shadow, className)}></div>
          <table className={twMerge(theme.root.base, className)} {...props} ref={ref}>
            {children}
          </table>
        </TableContext.Provider>
      </div>
    );
  },
);

TableComponent.displayName = "Table";

export const Table = Object.assign(TableComponent, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  HeadCell: TableHeadCell,
});
