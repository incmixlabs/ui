"use client";

import { forwardRef, type ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "@utils/objects";
import type { DeepPartial } from "@types";
import { useTableBodyContext } from "./TableBodyContext";
import { useTableContext } from "./TableContext";

export interface TableCellTheme {
  base: string;
  padding: {
    base: string;
    tight: string;
  }
}

export interface TableCellProps extends ComponentPropsWithRef<"td"> {
  theme?: DeepPartial<TableCellTheme>;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ children, className, theme: customTheme = {}, ...props }, ref) => {
    const { theme: bodyTheme } = useTableBodyContext();
    const tableContext = useTableContext();
    const padding = tableContext.tight ? bodyTheme.cell.padding.tight : bodyTheme.cell.padding.base;
    console.log("Padding ", padding);
    console.log("is tight", tableContext.tight);
    const theme = mergeDeep(bodyTheme.cell, customTheme);

    return (
      <td className={twMerge(theme.base, padding, theme.tight, className)} ref={ref} {...props}>
        {children}
      </td>
    );
  },
);

TableCell.displayName = "Table.Cell";
