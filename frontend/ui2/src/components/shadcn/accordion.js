import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
export const AccordionWrapper = ({ type = "single", items, }) => {
    return (_jsx(Root, { type: type, children: items.map((item, index) => (_jsxs(Item, { value: item.value ?? index.toString(), children: [_jsx(Trigger, { children: item.label }), _jsx(Content, { children: item.content })] }, index))) }));
};
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
function Root({ ...props }) {
    return _jsx(AccordionPrimitive.Root, { "data-slot": "accordion", ...props });
}
function Item({ className, ...props }) {
    return (_jsx(AccordionPrimitive.Item, { "data-slot": "accordion-item", className: cn("border-b last:border-b-0", className), ...props }));
}
function Trigger({ className, children, ...props }) {
    return (_jsx(AccordionPrimitive.Header, { className: "flex", children: _jsxs(AccordionPrimitive.Trigger, { "data-slot": "accordion-trigger", className: cn("flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left font-medium text-sm outline-none transition-all hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180", className), ...props, children: [children, _jsx(ChevronDownIcon, { className: "pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" })] }) }));
}
function Content({ className, children, ...props }) {
    return (_jsx(AccordionPrimitive.Content, { "data-slot": "accordion-content", className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down", ...props, children: _jsx("div", { className: cn("pt-0 pb-4", className), children: children }) }));
}
export const Accordion = {
    Root,
    Trigger,
    Item,
    Content,
};
//# sourceMappingURL=accordion.js.map