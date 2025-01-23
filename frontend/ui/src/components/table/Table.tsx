"use client";

import { forwardRef, type ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "@incmix/utils/objects";
import type { DeepPartial } from "../types";
import { TableBody } from "./table-body";
import { TableCell } from "./table-cell";
import { TableContext } from "./table-context";
import { TableHead } from "./table-head";
import { TableHeadCell } from "./table-head-cell";
import { TableRow } from "./table-row";
import { tableTheme, type TableTheme } from "./theme";

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
          <div className={twMerge(theme.root.shadow, className)} />
          <table className={twMerge(theme.root.base, className)} {...props} ref={ref}>
            {children}
          </table>
        </TableContext.Provider>
      </div>
    );
  },
);

TableComponent.displayName = "Table";
const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-muted-foreground text-sm", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export const Table = Object.assign(TableComponent, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  Caption: TableCaption,
  Header: TableHead,
  HeadCell: TableHeadCell,
});
