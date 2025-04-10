"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Flex, Text } from "@/components/base";
import { iconSize } from "@/components/icons/icon";
import { FilePlus, FolderPlus } from "lucide-react";
import { useState } from "react";
import { TreeItemDialog } from "./tree-item-dialog";
export function EmptyTreeView({ onCreateItem, emptyMessage, newFileButtonText, newFolderButtonText, }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [itemType, setItemType] = useState("file");
    const handleCreateItem = (type, data) => {
        if (typeof data.name !== "string") {
            throw new Error("Name must be a string");
        }
        const newItem = type === "file"
            ? {
                type,
                id: crypto.randomUUID(),
                name: data.name,
                data,
            }
            : {
                type,
                id: crypto.randomUUID(),
                name: data.name,
                children: [],
                data,
            };
        onCreateItem(newItem);
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Flex, { direction: "column", align: "center", justify: "center", className: "min-h-[200px] rounded-lg border-2 border-gray-6 border-dashed p-6", children: [_jsx(Text, { color: "gray", size: "2", mb: "4", className: "max-w-[280px] text-center", children: emptyMessage ??
                            "No items. Create a new file or folder to get started." }), _jsxs(Flex, { gap: "3", children: [_jsxs(Button, { className: "cursor-pointer", variant: "soft", onClick: () => {
                                    setItemType("file");
                                    setDialogOpen(true);
                                }, children: [_jsx(FilePlus, { className: `mr-2 ${iconSize}` }), newFileButtonText ?? "New File"] }), _jsxs(Button, { className: "cursor-pointer", variant: "soft", onClick: () => {
                                    setItemType("folder");
                                    setDialogOpen(true);
                                }, children: [_jsx(FolderPlus, { className: `mr-2 ${iconSize}` }), newFolderButtonText ?? "New Folder"] })] })] }), _jsx(TreeItemDialog, { open: dialogOpen, onOpenChange: setDialogOpen, onSubmit: (data) => handleCreateItem(itemType, data), type: itemType, position: "below" })] }));
}
//# sourceMappingURL=empty-tree-view.js.map