"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronRight } from "lucide-react";
import React from "react";
import { iconSize } from "@/components/icons/icon";
import { Box, Flex, Text } from "@/components/radixui";
import { cn } from "@/lib/utils";
const Tree = React.forwardRef(({ data, initialSelectedItemId, onSelectChange, expandAll, folderIconOpen, folderIcon, itemIcon, className, ...props }, _ref) => {
    const [selectedItemId, setSelectedItemId] = React.useState(initialSelectedItemId);
    const handleSelectChange = React.useCallback((item) => {
        setSelectedItemId(item?.id);
        if (onSelectChange) {
            onSelectChange(item);
        }
    }, [onSelectChange]);
    const expandedItemIds = React.useMemo(() => {
        if (!initialSelectedItemId) {
            return [];
        }
        const ids = [];
        function walkTreeItems(items, targetId) {
            if (Array.isArray(items)) {
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let i = 0; i < items.length; i++) {
                    ids.push(items[i]?.id);
                    if (items[i] && walkTreeItems(items[i], targetId) && !expandAll) {
                        return true;
                    }
                    if (!expandAll)
                        ids.pop();
                }
            }
            else if (!expandAll && items.id === targetId) {
                return true;
            }
            else if (items.children) {
                return walkTreeItems(items.children, targetId);
            }
        }
        walkTreeItems(data, initialSelectedItemId);
        return ids;
    }, [data, initialSelectedItemId]);
    return (_jsx(_Fragment, { children: _jsx(Box, { className: cn("relative p-2 px-6", className), children: _jsx(TreeItem, { data: data, selectedItemId: selectedItemId, handleSelectChange: handleSelectChange, expandedItemIds: expandedItemIds, FolderIcon: folderIcon, FolderIconOpen: folderIconOpen, ItemIcon: itemIcon, ...props }) }) }));
});
const iconClass = `${iconSize} shrink-0 text-accent-foreground/50`;
const padding = "p-2";
const TreeItem = React.forwardRef(({ className, data, selectedItemId, handleSelectChange, expandedItemIds, FolderIcon, ItemIcon, FolderIconOpen, ...props }, ref) => {
    return (_jsx(Box, { ref: ref, role: "tree", className: className, ...props, children: _jsx("ul", { children: Array.isArray(data) ? (data.map((item) => (_jsx("li", { children: item.children ? ((() => {
                    const [open, setOpen] = React.useState(expandedItemIds.includes(item.id));
                    const IconComp = item.icon
                        ? item.icon
                        : open && FolderIconOpen
                            ? FolderIconOpen
                            : FolderIcon;
                    return (_jsx(AccordionPrimitive.Root, { type: "multiple", value: open ? [item.id] : [], onValueChange: (value) => setOpen(value.includes(item.id)), children: _jsxs(AccordionPrimitive.Item, { value: item.id, className: cn("", open && "relative "), children: [_jsxs(AccordionPrimitive.Trigger, { className: cn(`mt-1 flex h-10 w-full flex-1 select-none items-center justify-between gap-1 rounded-md ${padding} font-medium text-sm transition-all hover:bg-sidebar-secondary-active/10 hover:text-sidebar-secondary-active hover:no-underline [&[data-state=open]>svg]:rotate-90`, open &&
                                        "bg-sidebar-secondary-active/10 text-sidebar-secondary-active"), onClick: () => handleSelectChange(item), children: [_jsxs(Flex, { align: "center", gap: "2", children: [IconComp && (_jsx(IconComp, { className: iconClass, "aria-hidden": "true" })), _jsx(Text, { className: cn("truncate text-sidebar-secondary-text text-sm", open && "text-sidebar-background"), children: item.name })] }), _jsx(ChevronRight, { className: cn(" h-5 w-5 text-gray-8 transition-transform duration-200 hover:text-sidebar-background", open && "text-sidebar-background") })] }), _jsx(AccordionPrimitive.Content, { className: "pl-6", children: _jsx(TreeItem, { data: item.children ? item.children : item, selectedItemId: selectedItemId, handleSelectChange: handleSelectChange, expandedItemIds: expandedItemIds, FolderIcon: FolderIcon, ItemIcon: ItemIcon, FolderIconOpen: FolderIconOpen }) })] }) }));
                })()) : (_jsx(Leaf, { item: item, isSelected: selectedItemId === item.id, onClick: () => handleSelectChange(item), Icon: ItemIcon })) }, item.id)))) : (_jsx("li", { children: _jsx(Leaf, { item: data, isSelected: selectedItemId === data.id, onClick: () => handleSelectChange(data), Icon: ItemIcon }) })) }) }));
});
const Leaf = React.forwardRef(({ className, item, isSelected, Icon, ...props }, ref) => {
    const IconComp = item.icon ? item.icon : Icon;
    return (_jsxs(Flex, { ref: ref, align: "center", gap: "2", className: cn(`mt-1 mb-1 cursor-pointer select-none rounded-md ${padding} hover:bg-sidebar-secondary-active/10`, className, isSelected &&
            "bg-sidebar-secondary-active/10 text-sidebar-secondary-active"), ...props, children: [IconComp && _jsx(IconComp, { className: `${iconClass}`, "aria-hidden": "true" }), _jsx(Text, { className: cn("flex-grow truncate text-sidebar-secondary-text text-sm", isSelected && "text-sidebar-secondary-active"), children: item.name })] }));
});
export { Tree };
//# sourceMappingURL=tree-view.js.map