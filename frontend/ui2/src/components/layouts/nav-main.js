"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "@/primitives/collapsible";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, } from "./sidebar";
export function NavMain({ items, }) {
    return (_jsxs(SidebarGroup, { children: [_jsx(SidebarGroupLabel, { children: "Platform" }), _jsx(SidebarMenu, { children: items.map((item) => (_jsx(Collapsible, { asChild: true, defaultOpen: item.isActive, className: "group/collapsible", children: _jsxs(SidebarMenuItem, { children: [_jsx(CollapsibleTrigger, { asChild: true, children: _jsxs(SidebarMenuButton, { tooltip: item.title, children: [item.icon && _jsx(item.icon, {}), _jsx("span", { children: item.title }), _jsx(ChevronRight, { className: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })] }) }), _jsx(CollapsibleContent, { children: _jsx(SidebarMenuSub, { children: item.items?.map((subItem) => (_jsx(SidebarMenuSubItem, { children: _jsx(SidebarMenuSubButton, { asChild: true, children: _jsx("a", { href: subItem.url, children: _jsx("span", { children: subItem.title }) }) }) }, subItem.title))) }) })] }) }, item.title))) })] }));
}
//# sourceMappingURL=nav-main.js.map