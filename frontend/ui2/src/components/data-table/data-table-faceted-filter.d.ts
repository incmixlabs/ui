import type { Column } from "@tanstack/react-table";
import type { Option } from "./lib/types";
interface DataTableFacetedFilterProps<TData, TValue> {
    column?: Column<TData, TValue>;
    title?: string;
    options: Option[];
}
export declare function DataTableFacetedFilter<TData, TValue>({ column, title, options, }: DataTableFacetedFilterProps<TData, TValue>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=data-table-faceted-filter.d.ts.map