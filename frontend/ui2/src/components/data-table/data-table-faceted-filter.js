import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Check, PlusCircle } from "lucide-react";
import { Command, Popover } from "@/components/base";
import { cn } from "@/lib/utils";
import { Badge } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";
import { Separator } from "@radix-ui/themes";
export function DataTableFacetedFilter({ column, title, options, }) {
    const unknownValue = column?.getFilterValue();
    const selectedValues = new Set(Array.isArray(unknownValue) ? unknownValue : []);
    return (_jsxs(Popover.Root, { children: [_jsx(Popover.Trigger, { children: _jsxs(Button, { variant: "outline", size: "1", className: "h-8 border-dashed", children: [_jsx(PlusCircle, { className: "mr-2 size-4" }), title, selectedValues?.size > 0 && (_jsxs(_Fragment, { children: [_jsx(Separator, { orientation: "vertical", className: "mx-2 h-4" }), _jsx(Badge, { className: "rounded-sm px-1 font-normal lg:hidden", children: selectedValues.size }), _jsx("div", { className: "hidden space-x-1 lg:flex", children: selectedValues.size > 2 ? (_jsxs(Badge, { className: "rounded-sm px-1 font-normal", children: [selectedValues.size, " selected"] })) : (options
                                        .filter((option) => selectedValues.has(option.value))
                                        .map((option) => (_jsx(Badge, { className: "rounded-sm px-1 font-normal", children: option.label }, option.value)))) })] }))] }) }), _jsx(Popover.Content, { className: "w-[12.5rem] p-0", align: "start", children: _jsxs(Command.Root, { children: [_jsx(Command.Input, { placeholder: title }), _jsxs(Command.List, { className: "max-h-full", children: [_jsx(Command.Empty, { children: "No results found." }), _jsx(Command.Group, { className: "max-h-[18.75rem] overflow-y-auto overflow-x-hidden", children: options.map((option) => {
                                        const isSelected = selectedValues.has(option.value);
                                        return (_jsxs(Command.Item, { onSelect: () => {
                                                if (isSelected) {
                                                    selectedValues.delete(option.value);
                                                }
                                                else {
                                                    selectedValues.add(option.value);
                                                }
                                                const filterValues = Array.from(selectedValues);
                                                column?.setFilterValue(filterValues.length ? filterValues : undefined);
                                            }, children: [_jsx("div", { className: cn("mr-2 flex size-4 items-center justify-center rounded-sm border border-primary", isSelected
                                                        ? "bg-primary text-primary-foreground"
                                                        : "opacity-50 [&_svg]:invisible"), children: _jsx(Check, { className: "size-4", "aria-hidden": "true" }) }), option.icon && (_jsx(option.icon, { className: "mr-2 size-4 text-muted-foreground", "aria-hidden": "true" })), _jsx("span", { children: option.label }), option.count && (_jsx("span", { className: "ml-auto flex size-4 items-center justify-center font-mono text-xs", children: option.count }))] }, option.value));
                                    }) }), selectedValues.size > 0 && (_jsxs(_Fragment, { children: [_jsx(Command.Separator, {}), _jsx(Command.Group, { children: _jsx(Command.Item, { onSelect: () => column?.setFilterValue(undefined), className: "justify-center text-center", children: "Clear filters" }) })] }))] })] }) })] }));
}
//# sourceMappingURL=data-table-faceted-filter.js.map