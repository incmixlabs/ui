"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Flex, Progress, ScrollArea, Text } from "@/components/base";
import { iconSize } from "@/icons/icon";
import { FolderClosed } from "lucide-react";
import { useState } from "react";
import { secondaryFooterData, secondarySidebarData } from "./data";
import { FolderClose } from "./icons/folder-close";
import { FolderOpen } from "./icons/folder-open";
import { Tree } from "./tree-view";
const footerData = secondaryFooterData;
export function FileFolder() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_selectedItem, setSelectedItem] = useState("Admin Page");
    return (_jsxs(_Fragment, { children: [_jsxs(Flex, { gap: "2", align: "center", className: "shrink-0 border-b-[1px] border-b-gray-6 px-8 py-2 ", children: [_jsx(FolderClosed, { className: "stroke-sidebar-secondary-active", size: 20 }), _jsx(Text, { className: "font-medium text-[16px] text-sidebar-secondary-active", children: "File Manager" })] }), _jsxs(ScrollArea, { className: "flex-1", children: [_jsx(Text, { className: "inline-block px-8 pt-2 font-medium text-[16px] text-gray-9", children: "FOLDERS" }), _jsx(Tree, { data: secondarySidebarData, initialSelectedItemId: "f12", onSelectChange: (item) => setSelectedItem(item?.name ?? ""), folderIcon: FolderClose, folderIconOpen: FolderOpen, itemIcon: FolderClose })] }), _jsx(Box, { className: "mt-auto shrink-0 border-gray-6 border-t bg-gray-1", children: footerData.map((item) => {
                    if (item.storageAvailable) {
                        return (_jsxs(Box, { className: " cursor-pointer px-8 py-2 hover:bg-sidebar-secondary-active/10", children: [_jsxs(Flex, { justify: "between", align: "center", className: "gap-2 ", children: [_jsx(Text, { className: " font-medium text-[16px] text-gray-12", children: item.title }), _jsxs(Text, { className: " family-[Poppins] font-medium text-[16px] text-sidebar-secondary-muted ", children: [item.storageAvailable, "%"] })] }), _jsx(Progress, { value: item.storageAvailable, color: "grass", className: "mt-4" })] }, item.title));
                    }
                    return (_jsxs(Box, { className: "flex cursor-pointer items-center gap-2 px-8 py-2 text-gray-12 hover:bg-sidebar-secondary-active/10", children: [item.icon && (_jsx(item.icon, { className: `${iconSize} shrink-0 text-sidebar-secondary-muted`, "aria-hidden": "true" })), _jsx(Text, { className: " font-medium text-[16px]", children: item.title })] }, item.title));
                }) })] }));
}
//# sourceMappingURL=index.js.map