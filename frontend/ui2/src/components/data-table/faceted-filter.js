"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check } from "lucide-react";
import * as React from "react";
import { Command, Popover } from "@/components/base";
import { cn } from "@/lib/utils";
const FacetedFilter = Popover;
const FacetedFilterTrigger = React.forwardRef(({ className, children, ...props }, ref) => (_jsx(Popover.Trigger, { ref: ref, className: cn(className), ...props, children: children })));
FacetedFilterTrigger.displayName = "FacetedFilterTrigger";
const FacetedFilterContent = React.forwardRef(({ className, children, ...props }, ref) => (_jsx(Popover.Content, { ref: ref, className: cn("w-[12.5rem] p-0", className), align: "start", ...props, children: _jsx(Command.Root, { children: children }) })));
FacetedFilterContent.displayName = "FacetedFilterContent";
const FacetedFilterInput = Command.Input;
const FacetedFilterList = Command.List;
const FacetedFilterEmpty = Command.Empty;
const FacetedFilterGroup = Command.Group;
const FacetedFilterItem = React.forwardRef(({ className, children, selected, ...props }, ref) => {
    return (_jsxs(Command.Item, { ref: ref, "aria-selected": selected, "data-selected": selected, className: cn(className), ...props, children: [_jsx("span", { className: cn("mr-2 flex size-4 items-center justify-center rounded-sm border border-primary", selected
                    ? "bg-primary text-primary-foreground"
                    : "opacity-50 [&_svg]:invisible"), children: _jsx(Check, { className: "size-4" }) }), children] }));
});
FacetedFilterItem.displayName = "FacetedFilterItem";
const FacetedFilterSeparator = Command.Separator;
const FacetedFilterShortcut = Command.Shortcut;
export { FacetedFilter, FacetedFilterTrigger, FacetedFilterContent, FacetedFilterInput, FacetedFilterList, FacetedFilterEmpty, FacetedFilterGroup, FacetedFilterItem, FacetedFilterSeparator, FacetedFilterShortcut, };
//# sourceMappingURL=faceted-filter.js.map