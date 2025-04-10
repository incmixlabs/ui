import type { Table } from "@tanstack/react-table";
import * as React from "react";
import type { DataTableFilterField } from "./lib/types";
interface DataTableToolbarProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
    table: Table<TData>;
    /**
     * An array of filter field configurations for the data table.
     * When options are provided, a faceted filter is rendered.
     * Otherwise, a search filter is rendered.
     *
     * @example
     * const filterFields = [
     *   {
     *     id: 'name',
     *     label: 'Name',
     *     placeholder: 'Filter by name...'
     *   },
     *   {
     *     id: 'status',
     *     label: 'Status',
     *     options: [
     *       { label: 'Active', value: 'active', icon: ActiveIcon, count: 10 },
     *       { label: 'Inactive', value: 'inactive', icon: InactiveIcon, count: 5 }
     *     ]
     *   }
     * ]
     */
    filterFields?: DataTableFilterField<TData>[];
}
export declare function DataTableToolbar<TData>({ table, filterFields, children, className, ...props }: DataTableToolbarProps<TData>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=data-table-toolbar.d.ts.map