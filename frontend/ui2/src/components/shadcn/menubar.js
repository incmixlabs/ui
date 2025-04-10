import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
function Root({ className, ...props }) {
    return (_jsx(MenubarPrimitive.Root, { "data-slot": "menubar", className: cn("flex h-9 items-center gap-1 rounded-md border bg-background p-1 shadow-xs", className), ...props }));
}
function Menu({ ...props }) {
    return _jsx(MenubarPrimitive.Menu, { "data-slot": "menubar-menu", ...props });
}
function Group({ ...props }) {
    return _jsx(MenubarPrimitive.Group, { "data-slot": "menubar-group", ...props });
}
function Portal({ ...props }) {
    return _jsx(MenubarPrimitive.Portal, { "data-slot": "menubar-portal", ...props });
}
function RadioGroup({ ...props }) {
    return (_jsx(MenubarPrimitive.RadioGroup, { "data-slot": "menubar-radio-group", ...props }));
}
function Trigger({ className, ...props }) {
    return (_jsx(MenubarPrimitive.Trigger, { "data-slot": "menubar-trigger", className: cn("flex select-none items-center rounded-sm px-2 py-1 font-medium text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground", className), ...props }));
}
function Content({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }) {
    return (_jsx(Portal, { children: _jsx(MenubarPrimitive.Content, { "data-slot": "menubar-content", align: align, alignOffset: alignOffset, sideOffset: sideOffset, className: cn("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in", className), ...props }) }));
}
function Item({ className, inset, variant = "default", ...props }) {
    return (_jsx(MenubarPrimitive.Item, { "data-slot": "menubar-item", "data-inset": inset, "data-variant": variant, className: cn("data-[variant=destructive]:*:[svg]:!text-destructive relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[disabled]:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0", className), ...props }));
}
function CheckboxItem({ className, children, checked, ...props }) {
    return (_jsxs(MenubarPrimitive.CheckboxItem, { "data-slot": "menubar-checkbox-item", className: cn("relative flex cursor-default select-none items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", className), checked: checked, ...props, children: [_jsx("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: _jsx(MenubarPrimitive.ItemIndicator, { children: _jsx(CheckIcon, { className: "size-4" }) }) }), children] }));
}
function RadioItem({ className, children, ...props }) {
    return (_jsxs(MenubarPrimitive.RadioItem, { "data-slot": "menubar-radio-item", className: cn("relative flex cursor-default select-none items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", className), ...props, children: [_jsx("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: _jsx(MenubarPrimitive.ItemIndicator, { children: _jsx(CircleIcon, { className: "size-2 fill-current" }) }) }), children] }));
}
function Label({ className, inset, ...props }) {
    return (_jsx(MenubarPrimitive.Label, { "data-slot": "menubar-label", "data-inset": inset, className: cn("px-2 py-1.5 font-medium text-sm data-[inset]:pl-8", className), ...props }));
}
function Separator({ className, ...props }) {
    return (_jsx(MenubarPrimitive.Separator, { "data-slot": "menubar-separator", className: cn("-mx-1 my-1 h-px bg-border", className), ...props }));
}
function Shortcut({ className, ...props }) {
    return (_jsx("span", { "data-slot": "menubar-shortcut", className: cn("ml-auto text-muted-foreground text-xs tracking-widest", className), ...props }));
}
function Sub({ ...props }) {
    return _jsx(MenubarPrimitive.Sub, { "data-slot": "menubar-sub", ...props });
}
function SubTrigger({ className, inset, children, ...props }) {
    return (_jsxs(MenubarPrimitive.SubTrigger, { "data-slot": "menubar-sub-trigger", "data-inset": inset, className: cn("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[inset]:pl-8 data-[state=open]:text-accent-foreground", className), ...props, children: [children, _jsx(ChevronRightIcon, { className: "ml-auto h-4 w-4" })] }));
}
function SubContent({ className, ...props }) {
    return (_jsx(MenubarPrimitive.SubContent, { "data-slot": "menubar-sub-content", className: cn("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=closed]:animate-out data-[state=open]:animate-in", className), ...props }));
}
export const Menubar = {
    Root,
    Portal,
    Menu,
    Trigger,
    Content,
    Group,
    Separator,
    Label,
    Item,
    Shortcut,
    CheckboxItem,
    RadioGroup,
    RadioItem,
    Sub,
    SubTrigger,
    SubContent,
};
//# sourceMappingURL=menubar.js.map