"use client";

import { forwardRef, type ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "@incmix/utils/objects";
import type { DeepPartial } from "../types";
import { useTableContext } from "./table-context";
import type { TableHeaderCellTheme } from "./table-head-cell";
import { TableHeadContext } from "./table-head-context";

export interface TableHeaderTheme {
  base: string;
  cell: TableHeaderCellTheme;
}

export interface TableHeaderProps extends ComponentPropsWithRef<"thead"> {
  theme?: DeepPartial<TableHeaderTheme>;
}

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ children, className, theme: customTheme = {}, ...props }, ref) => {
    const { theme: rootTheme } = useTableContext();

    const theme = mergeDeep(rootTheme.head, customTheme);

    return (
      <TableHeadContext.Provider value={{ theme }}>
        <thead className={twMerge(theme.base, className)} ref={ref} {...props}>
          <tr>{children}</tr>
        </thead>
      </TableHeadContext.Provider>
    );
  },
);

TableHeader.displayName = "Table.Header";
