"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FilePlus, FolderPlus, Pencil, Trash } from "lucide-react";
import { Button, ContextMenu as ContextMenuPrimitive, Flex, } from "@/components/base";
import { useTreeViewContext } from "./tree-view-context";
const ContextMenu = ContextMenuPrimitive.Root;
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
const ContextMenuContent = ContextMenuPrimitive.Content;
const ContextMenuSub = ContextMenuPrimitive.Sub;
const ContextMenuSubTrigger = ContextMenuPrimitive.SubTrigger;
const ContextMenuSubContent = ContextMenuPrimitive.SubContent;
export function TreeContextMenu({ children, onAddFile, onAddFolder, onDelete, onEdit, canDelete = true, isFolder = false, }) {
    const { descriptions } = useTreeViewContext();
    const handleAddFile = (e, position) => {
        e.preventDefault();
        onAddFile?.(position);
    };
    const handleAddFolder = (e, position) => {
        e.preventDefault();
        onAddFolder?.(position);
    };
    const handleDelete = (e) => {
        e.preventDefault();
        onDelete?.();
    };
    const handleEdit = (e) => {
        e.preventDefault();
        onEdit?.();
    };
    return (_jsxs(ContextMenu, { children: [_jsx(ContextMenuTrigger, { children: children }), _jsxs(ContextMenuContent, { className: "p-1 hover:bg-gray-1", variant: "soft", children: [onEdit && (_jsx(Button, { variant: "ghost", onClick: handleEdit, className: "m-0 h-6 justify-between", children: _jsxs(Flex, { align: "center", gap: "2", className: "p-1", children: [_jsx(Pencil, { className: "{`${iconSize`}" }), descriptions.edit] }) })), _jsxs(ContextMenuSub, { children: [_jsx(ContextMenuSubTrigger, { children: _jsxs(Flex, { align: "center", gap: "2", children: [_jsx(FilePlus, { className: "{`${iconSize`}" }), descriptions.createFileContextMenu] }) }), _jsxs(ContextMenuSubContent, { children: [_jsx(Button, { variant: "ghost", onClick: (e) => handleAddFile(e, "above"), className: "m-0 justify-start text-gray-12", children: descriptions.above }), _jsx(Button, { variant: "ghost", onClick: (e) => handleAddFile(e, "below"), className: "m-0 justify-start text-gray-12", children: descriptions.below }), isFolder && (_jsx(Button, { variant: "ghost", onClick: (e) => handleAddFile(e, "inside"), className: "m-0 justify-start text-gray-12", children: descriptions.inside }))] })] }), _jsxs(ContextMenuSub, { children: [_jsx(ContextMenuSubTrigger, { children: _jsxs(Flex, { align: "center", gap: "2", children: [_jsx(FolderPlus, { className: "{`${iconSize`}" }), descriptions.createFolderContextMenu] }) }), _jsxs(ContextMenuSubContent, { children: [_jsx(Button, { variant: "ghost", onClick: (e) => handleAddFolder(e, "above"), className: "m-0 justify-start text-gray-12", children: descriptions.above }), _jsx(Button, { variant: "ghost", onClick: (e) => handleAddFolder(e, "below"), className: "m-0 justify-start text-gray-12", children: descriptions.below }), isFolder && (_jsx(Button, { variant: "ghost", onClick: (e) => handleAddFolder(e, "inside"), className: "m-0 justify-start text-gray-12", children: descriptions.inside }))] })] }), canDelete && (_jsx(Button, { variant: "ghost", onClick: handleDelete, color: "red", className: "m-0 h-6 justify-between", children: _jsxs(Flex, { align: "center", gap: "2", className: "p-1", children: [_jsx(Trash, { className: "{`${iconSize`}" }), descriptions.delete] }) }))] })] }));
}
//# sourceMappingURL=context-menu.js.map