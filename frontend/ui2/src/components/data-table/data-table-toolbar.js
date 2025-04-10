"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { X } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@radix-ui/themes";
import { TextField } from "@radix-ui/themes";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
export function DataTableToolbar({ table, filterFields = [], children, className, ...props }) {
    const isFiltered = table.getState().columnFilters.length > 0;
    // Memoize computation of searchableColumns and filterableColumns
    const { searchableColumns, filterableColumns } = React.useMemo(() => {
        return {
            searchableColumns: filterFields.filter((field) => !field.options),
            filterableColumns: filterFields.filter((field) => field.options),
        };
    }, [filterFields]);
    return (_jsxs("div", { className: cn("flex w-full items-center justify-between gap-2 overflow-auto p-1", className), ...props, children: [_jsxs("div", { className: "flex flex-1 items-center gap-2", children: [searchableColumns.length > 0 &&
                        searchableColumns.map((column) => table.getColumn(column.id ? String(column.id) : "") && (_jsx(TextField.Root, { placeholder: column.placeholder, value: table
                                .getColumn(String(column.id))
                                ?.getFilterValue() ?? "", onChange: (event) => table
                                .getColumn(String(column.id))
                                ?.setFilterValue(event.target.value), className: "h-8 w-40 lg:w-64" }, String(column.id)))), filterableColumns.length > 0 &&
                        filterableColumns.map((column) => table.getColumn(column.id ? String(column.id) : "") && (_jsx(DataTableFacetedFilter, { column: table.getColumn(column.id ? String(column.id) : ""), title: column.label, options: column.options ?? [] }, String(column.id)))), isFiltered && (_jsxs(Button, { "aria-label": "Reset filters", variant: "ghost", className: "h-8 px-2 lg:px-3", onClick: () => table.resetColumnFilters(), children: ["Reset", _jsx(X, { className: "ml-2 size-4", "aria-hidden": "true" })] }))] }), _jsxs("div", { className: "flex items-center gap-2", children: [children, _jsx(DataTableViewOptions, { table: table })] })] }));
}
//# sourceMappingURL=data-table-toolbar.js.map