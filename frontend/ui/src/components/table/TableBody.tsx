"use client";

import { forwardRef, type ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "@utils/objects";
import type { DeepPartial } from "@types";
import { TableBodyContext } from "./TableBodyContext";
import type {TableCellTheme } from "./TableCell";
import { useTableContext } from "./TableContext";

export interface TableBodyTheme {
  base: string;
  cell:TableCellTheme;
}

export interface TableBodyProps extends ComponentPropsWithRef<"tbody"> {
  theme?: DeepPartial<TableBodyTheme>;
}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, className, theme: customTheme = {}, ...props }, ref) => {
    const { theme: rootTheme } = useTableContext();

    const theme = mergeDeep(rootTheme.body, customTheme);

    return (
      <TableBodyContext.Provider value={{ theme }}>
        <tbody className={twMerge(theme.base, className)} ref={ref} {...props}>
          {children}
        </tbody>
      </TableBodyContext.Provider>
    );
  },
);

TableBody.displayName = "Table.Body";
