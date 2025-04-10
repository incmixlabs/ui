"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { DataTableFilterList } from "./data-table-filter-list";
import { DataTableViewOptions } from "./data-table-view-options";
export function DataTableAdvancedToolbar({ table, filterFields = [], debounceMs = 300, shallow = true, children, className, ...props }) {
    return (_jsxs("div", { className: cn("flex w-full items-center justify-between gap-2 overflow-auto p-1", className), ...props, children: [_jsx("div", { className: "flex items-center gap-2", children: _jsx(DataTableFilterList, { table: table, filterFields: filterFields, debounceMs: debounceMs, shallow: shallow }) }), _jsxs("div", { className: "flex items-center gap-2", children: [children, _jsx(DataTableViewOptions, { table: table })] })] }));
}
//# sourceMappingURL=data-table-advanced-toolbar.js.map