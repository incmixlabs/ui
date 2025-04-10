import { type Table as TanstackTable } from "@tanstack/react-table";
import * as React from "react";
interface DataTableProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * The table instance returned from useDataTable hook with pagination, sorting, filtering, etc.
     * @type TanstackTable<TData>
     */
    table: TanstackTable<TData>;
    /**
     * The floating bar to render at the bottom of the table on row selection.
     * @default null
     * @type React.ReactNode | null
     * @example floatingBar={<TasksTableFloatingBar table={table} />}
     */
    floatingBar?: React.ReactNode | null;
}
export declare function DataTable<TData>({ table, floatingBar, children, className, ...props }: DataTableProps<TData>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=data-table.d.ts.map