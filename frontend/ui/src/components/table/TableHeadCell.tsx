"use client";

import { forwardRef, type ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "@utils/objects";
import type { DeepPartial } from "@types";
import { useTableHeadContext } from "./TableHeadContext";

export interface TableHeadCellTheme {
  base: string;
}

export interface TableHeadCellProps extends ComponentPropsWithRef<"th"> {
  theme?: DeepPartial<TableHeadCellTheme>;
}

export const TableHeadCell = forwardRef<HTMLTableCellElement, TableHeadCellProps>(
  ({ children, className, theme: customTheme = {}, ...props }, ref) => {
    const { theme: headTheme } = useTableHeadContext();

    const theme = mergeDeep(headTheme.cell, customTheme);

    return (
      <th className={twMerge(theme.base, className)} ref={ref} {...props}>
        {children}
      </th>
    );
  },
);

TableHeadCell.displayName = "Table.HeadCell";
