import type { Table } from "@tanstack/react-table";
import type { DataTableAdvancedFilterField } from "./lib/types";
interface DataTableFilterListProps<TData> {
    table: Table<TData>;
    filterFields: DataTableAdvancedFilterField<TData>[];
    debounceMs: number;
    shallow?: boolean;
}
export declare function DataTableFilterList<TData>({ table, filterFields, debounceMs, shallow, }: DataTableFilterListProps<TData>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=data-table-filter-list.d.ts.map