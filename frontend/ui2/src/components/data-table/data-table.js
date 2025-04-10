import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { flexRender } from "@tanstack/react-table";
import * as React from "react";
import { Table } from "@/components/shadcn/table";
import { cn } from "@/lib/utils";
import { DataTablePagination } from "./data-table-pagination";
import { getCommonPinningStyles } from "./lib/data-table";
export function DataTable({ table, floatingBar = null, children, className, ...props }) {
    return (_jsxs("div", { className: cn("w-full space-y-2.5 overflow-auto", className), ...props, children: [children, _jsx("div", { className: "overflow-hidden rounded-md border", children: _jsxs(Table.Root, { children: [_jsx(Table.Header, { children: table.getHeaderGroups().map((headerGroup) => (_jsx(React.Fragment, { children: headerGroup.headers.map((header) => {
                                    return (_jsx(Table.ColumnHeaderCell, { colSpan: header.colSpan, style: {
                                            ...getCommonPinningStyles({ column: header.column }),
                                        }, children: header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext()) }, header.id));
                                }) }, headerGroup.id))) }), _jsx(Table.Body, { children: table.getRowModel().rows?.length ? (table.getRowModel().rows.map((row) => (_jsx(Table.Row, { "data-state": row.getIsSelected() && "selected", children: row.getVisibleCells().map((cell) => (_jsx(Table.Cell, { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id))) }, row.id)))) : (_jsx(Table.Row, { children: _jsx(Table.Cell, { colSpan: table.getAllColumns().length, className: "h-24 text-center", children: "No results." }) })) })] }) }), _jsxs("div", { className: "flex flex-col gap-2.5", children: [_jsx(DataTablePagination, { table: table }), table.getFilteredSelectedRowModel().rows.length > 0 && floatingBar] })] }));
}
//# sourceMappingURL=data-table.js.map