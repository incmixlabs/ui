"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { SelectIcon } from "@radix-ui/react-select";
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Flex, Select } from "@radix-ui/themes";
export function DataTableColumnHeader({ column, title, className, }) {
    if (!column.getCanSort() && !column.getCanHide()) {
        return _jsx("div", { className: cn(className), children: title });
    }
    const ascValue = `${column.id}-asc`;
    const descValue = `${column.id}-desc`;
    const hideValue = `${column.id}-hide`;
    return (_jsx("div", { className: cn("flex items-center gap-2", className), children: _jsxs(Select.Root, { value: column.getIsSorted() === "desc"
                ? descValue
                : column.getIsSorted() === "asc"
                    ? ascValue
                    : title, onValueChange: (value) => {
                if (value === ascValue)
                    column.toggleSorting(false);
                else if (value === descValue)
                    column.toggleSorting(true);
                else if (value === hideValue)
                    column.toggleVisibility(false);
            }, children: [_jsx(Select.Trigger, { variant: "ghost", "aria-label": column.getIsSorted() === "desc"
                        ? "Sorted descending. Click to sort ascending."
                        : column.getIsSorted() === "asc"
                            ? "Sorted ascending. Click to sort descending."
                            : "Not sorted. Click to sort ascending.", className: "-ml-3 h-8 w-fit border-none text-xs hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent [&>svg:last-child]:hidden", children: _jsxs(Flex, { as: "span", align: "center", gap: "2", children: [title, _jsx(SelectIcon, { asChild: true, children: column.getCanSort() && column.getIsSorted() === "desc" ? (_jsx(ArrowDown, { className: "ml-2.5 size-4", "aria-hidden": "true" })) : column.getIsSorted() === "asc" ? (_jsx(ArrowUp, { className: "ml-2.5 size-4", "aria-hidden": "true" })) : (_jsx(ChevronsUpDown, { className: "ml-2.5 size-4", "aria-hidden": "true" })) })] }) }), _jsxs(Select.Content, { align: "start", children: [column.getCanSort() && (_jsxs(_Fragment, { children: [_jsx(Select.Item, { value: ascValue, children: _jsxs("span", { className: "flex items-center", children: [_jsx(ArrowUp, { className: "mr-2 size-3.5 text-muted-foreground/70", "aria-hidden": "true" }), "Asc"] }) }), _jsx(Select.Item, { value: descValue, children: _jsxs("span", { className: "flex items-center", children: [_jsx(ArrowDown, { className: "mr-2 size-3.5 text-muted-foreground/70", "aria-hidden": "true" }), "Desc"] }) })] })), column.getCanHide() && (_jsx(Select.Item, { value: hideValue, children: _jsxs("span", { className: "flex items-center", children: [_jsx(EyeOff, { className: "mr-2 size-3.5 text-muted-foreground/70", "aria-hidden": "true" }), "Hide"] }) }))] })] }) }));
}
//# sourceMappingURL=data-table-column-header.js.map