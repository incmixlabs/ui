import type { Table } from "@tanstack/react-table";
import type * as React from "react";
import type { DataTableAdvancedFilterField } from "./lib/types";
interface DataTableAdvancedToolbarProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * The table instance returned from useDataTable hook with pagination, sorting, filtering, etc.
     * @type Table<TData>
     */
    table: Table<TData>;
    /**
     * An array of filter field configurations for the data table.
     * @type DataTableAdvancedFilterField<TData>[]
     * @example
     * const filterFields = [
     *   {
     *     id: 'name',
     *     label: 'Name',
     *     type: 'text',
     *     placeholder: 'Filter by name...'
     *   },
     *   {
     *     id: 'status',
     *     label: 'Status',
     *     type: 'select',
     *     options: [
     *       { label: 'Active', value: 'active', count: 10 },
     *       { label: 'Inactive', value: 'inactive', count: 5 }
     *     ]
     *   }
     * ]
     */
    filterFields: DataTableAdvancedFilterField<TData>[];
    /**
     * Debounce time (ms) for filter updates to enhance performance during rapid input.
     * @default 300
     */
    debounceMs?: number;
    /**
     * Shallow mode keeps query states client-side, avoiding server calls.
     * Setting to `false` triggers a network request with the updated querystring.
     * @default true
     */
    shallow?: boolean;
}
export declare function DataTableAdvancedToolbar<TData>({ table, filterFields, debounceMs, shallow, children, className, ...props }: DataTableAdvancedToolbarProps<TData>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=data-table-advanced-toolbar.d.ts.map