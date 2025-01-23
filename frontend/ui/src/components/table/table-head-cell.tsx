"use client";

import { forwardRef, type ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "@incmix/utils/objects";
import type { DeepPartial } from "../types";
import { useTableHeadContext } from "./table-head-context";

export interface TableHeaderCellTheme {
  base: string;
}

export interface TableHeaderCellProps extends ComponentPropsWithRef<"th"> {
  theme?: DeepPartial<TableHeaderCellTheme>;
}

export const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
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

TableHeaderCell.displayName = "Table.HeaderCell";
