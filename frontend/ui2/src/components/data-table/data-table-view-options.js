"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, ChevronsUpDown, Settings2 } from "lucide-react";
import * as React from "react";
import { Button, Command, Popover } from "@/components/base";
import { toSentenceCase } from "@/lib/strings";
import { cn } from "@/lib/utils";
export function DataTableViewOptions({ table, }) {
    const triggerRef = React.useRef(null);
    return (_jsxs(Popover.Root, { children: [_jsx(Popover.Trigger, { children: _jsxs(Button, { ref: triggerRef, "aria-label": "Toggle columns", variant: "outline", size: "1", className: "ml-auto hidden h-8 gap-2 focus:outline-none focus:ring-1 focus:ring-ring focus-visible:ring-0 lg:flex", children: [_jsx(Settings2, { className: "size-4" }), "View", _jsx(ChevronsUpDown, { className: "ml-auto size-4 shrink-0 opacity-50" })] }) }), _jsx(Popover.Content, { align: "end", className: "w-44 p-0", onCloseAutoFocus: () => triggerRef.current?.focus(), children: _jsxs(Command.Root, { children: [_jsx(Command.Input, { placeholder: "Search columns..." }), _jsxs(Command.List, { children: [_jsx(Command.Empty, { children: "No columns found." }), _jsx(Command.Group, { children: table
                                        .getAllColumns()
                                        .filter((column) => typeof column.accessorFn !== "undefined" &&
                                        column.getCanHide())
                                        .map((column) => {
                                        return (_jsxs(Command.Item, { onSelect: () => column.toggleVisibility(!column.getIsVisible()), children: [_jsx("span", { className: "truncate", children: toSentenceCase(column.id) }), _jsx(Check, { className: cn("ml-auto size-4 shrink-0", column.getIsVisible() ? "opacity-100" : "opacity-0") })] }, column.id));
                                    }) })] })] }) })] }));
}
//# sourceMappingURL=data-table-view-options.js.map