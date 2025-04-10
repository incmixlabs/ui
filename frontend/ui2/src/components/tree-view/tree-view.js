/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { Box, Flex, Text } from "@/components/base";
import { iconSize } from "@/components/icons/icon";
import { Table } from "@/components/shadcn";
import { cn } from "@/lib/utils";
import { attachInstruction, extractInstruction, } from "@atlaskit/pragmatic-drag-and-drop-hitbox/tree-item";
import { DropIndicator } from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/tree-item";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { produce } from "immer";
import { ChevronDown, ChevronRight, File, Folder, FolderOpen, } from "lucide-react";
import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { TreeContextMenu } from "./context-menu";
import { EmptyTreeView } from "./empty-tree-view";
import { TreeItemDialog } from "./tree-item-dialog";
import { TreeViewProvider } from "./tree-view-context";
const treeVariants = cva("group before:-z-10 before:absolute before:left-0 before:h-[2rem] before:w-full before:rounded-lg before:bg-accent/70 before:opacity-0 hover:before:opacity-100");
const selectedTreeVariants = cva("text-accent-foreground before:bg-accent/70 before:opacity-100");
const triggerStyles = cva("flex w-full flex-1 items-center px-2 py-2 transition-all first:[&[data-state=open]>svg]:rotate-90");
const DEFAULT_DESCRIPTIONS = {
    above: "Above",
    below: "Below",
    inside: "Inside",
    edit: "Edit",
    delete: "Delete",
    name: "Name",
    value: "Value",
    notes: "Notes",
    createFileContextMenu: "Create File",
    createFolderContextMenu: "Create Folder",
    newFileTitle: "New File",
    newFolderTitle: "New Folder",
    editFileTitle: "Edit File",
    editFolderTitle: "Edit Folder",
};
function findItemById(items, id) {
    if (Array.isArray(items)) {
        for (const item of items) {
            const found = findItemById(item, id);
            if (found)
                return found;
        }
    }
    else {
        if (items.id === id)
            return items;
        if (items.type === "folder") {
            return findItemById(items.children, id);
        }
    }
    return null;
}
function removeItemById(items, id) {
    if (Array.isArray(items)) {
        const result = items.reduce((acc, item) => {
            if (item.id === id)
                return acc;
            const newItem = { ...item };
            if (newItem.type === "folder") {
                newItem.children = removeItemById(newItem.children, id);
            }
            acc.push(newItem);
            return acc;
        }, []);
        return result;
    }
    if (items.type === "folder") {
        const newChildren = removeItemById(items.children, id);
        return {
            ...items,
            children: newChildren,
        };
    }
    return items;
}
function findParentArrayAndIndex(items, targetId) {
    if (Array.isArray(items)) {
        const index = items.findIndex((item) => item.id === targetId);
        if (index !== -1) {
            return { parentArray: items, index };
        }
        for (const item of items) {
            if (item.type === "folder") {
                const result = findParentArrayAndIndex(item.children, targetId);
                if (result)
                    return result;
            }
        }
    }
    else if (items.type === "folder") {
        return findParentArrayAndIndex(items.children, targetId);
    }
    return null;
}
function insertItem(items, targetId, itemToInsert, instruction) {
    return produce(items, (draft) => {
        const targetItem = findItemById(draft, targetId);
        if (!targetItem)
            return;
        if (instruction.type === "make-child") {
            if (targetItem.type !== "folder") {
                throw new Error("Target item is not a folder");
            }
            if (!targetItem.children) {
                targetItem.children = [];
            }
            targetItem.children.unshift(itemToInsert);
            return;
        }
        const result = findParentArrayAndIndex(draft, targetId);
        if (result) {
            const { parentArray, index } = result;
            const insertIndex = instruction.type === "reorder-below" ? index + 1 : index;
            parentArray.splice(insertIndex, 0, itemToInsert);
        }
    });
}
const TreeView = React.forwardRef(({ data: initialData, setData, initialSelectedItemId, onSelectChange, expandAll, defaultLeafIcon, defaultNodeIcon, emptyMessage, newFileButtonText = "New File", newFolderButtonText = "New Folder", fileFields = [], folderFields = [], className, descriptions = DEFAULT_DESCRIPTIONS, ...props }, ref) => {
    const NAME_FIELD = {
        name: "name",
        type: "text",
        label: descriptions.name,
        required: true,
    };
    const [selectedItemId, setSelectedItemId] = React.useState(initialSelectedItemId);
    const [data, setInternalData] = React.useState(() => {
        if (!initialSelectedItemId && !expandAll) {
            return initialData;
        }
        return produce(initialData, (draft) => {
            function walkTreeItems(items, targetId) {
                if (Array.isArray(items)) {
                    for (let i = 0; i < items.length; i++) {
                        if (items[i]) {
                            items[i].expanded = expandAll;
                        }
                        if (items[i] && walkTreeItems(items[i], targetId) && !expandAll) {
                            if (items[i]) {
                                items[i].expanded = true;
                            }
                            return true;
                        }
                    }
                }
                else if (!expandAll && items.id === targetId) {
                    return true;
                }
                else if (items.type === "folder") {
                    items.expanded = expandAll;
                    if (walkTreeItems(items.children, targetId)) {
                        items.expanded = true;
                        return true;
                    }
                }
                return false;
            }
            walkTreeItems(draft, initialSelectedItemId || "");
        });
    });
    useEffect(() => {
        setData?.(data);
    }, [data, setData]);
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
            else if (items.type === "folder") {
                return walkTreeItems(items.children, targetId);
            }
        }
        walkTreeItems(data, initialSelectedItemId);
        return ids;
    }, [data, expandAll, initialSelectedItemId]);
    return (_jsx(TreeViewProvider, { fileFields: [NAME_FIELD, ...fileFields], folderFields: [NAME_FIELD, ...folderFields], descriptions: descriptions, children: _jsx(Box, { ref: ref, className: cn("relative select-none", className), ...props, children: _jsxs(Table.Root, { children: [_jsx(Table.Header, { children: _jsxs(Table.Row, { children: [_jsx(Table.ColumnHeaderCell, { className: "w-[20%]", children: "Name" }), _jsx(Table.ColumnHeaderCell, { className: "w-[50%]", children: "Value" }), _jsx(Table.ColumnHeaderCell, { className: "w-[12.5%]", children: "Created By" }), _jsx(Table.ColumnHeaderCell, { className: "w-[12.5%]", children: "Created On" })] }) }), _jsx(Table.Body, { children: Array.isArray(data) && data.length === 0 ? (_jsx(EmptyTreeView, { onCreateItem: (item) => setInternalData([item]), emptyMessage: emptyMessage, newFileButtonText: newFileButtonText, newFolderButtonText: newFolderButtonText })) : (_jsx(TreeItem, { data: data, rootData: data, selectedItemId: selectedItemId, handleSelectChange: handleSelectChange, expandedItemIds: expandedItemIds, defaultLeafIcon: defaultLeafIcon, defaultNodeIcon: defaultNodeIcon, setData: setInternalData })) })] }) }) }));
});
TreeView.displayName = "TreeView";
const TreeItem = React.forwardRef(({ data, rootData, selectedItemId, handleSelectChange, expandedItemIds, defaultNodeIcon, defaultLeafIcon, setData, }, _ref) => {
    const dataArray = Array.isArray(data) ? data : [data];
    console.log("dataarray", dataArray);
    return (_jsx(_Fragment, { children: dataArray.map((item, index) => (_jsx(React.Fragment, { children: _jsx(Table.Row, { children: _jsx(Table.Cell, { children: item.type === "folder" ? (_jsx(TreeNode, { rootData: rootData, item: item, selectedItemId: selectedItemId, expandedItemIds: expandedItemIds, handleSelectChange: handleSelectChange, defaultNodeIcon: defaultNodeIcon, defaultLeafIcon: defaultLeafIcon, index: index, siblings: dataArray, setData: setData })) : (_jsx(_Fragment, { children: _jsx(TreeLeaf, { rootData: rootData, item: item, iconTrue: true, handleSelectChange: handleSelectChange, selectedItemId: selectedItemId, defaultLeafIcon: defaultLeafIcon, index: index, siblings: dataArray, setData: setData }) })) }) }, `row-${item.id}`) }, `fragment-${item.id}`))) }));
});
TreeItem.displayName = "TreeItem";
const TreeNode = ({ rootData, item, handleSelectChange, expandedItemIds, selectedItemId, defaultNodeIcon, defaultLeafIcon, index, siblings, setData, }) => {
    const elementRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [instruction, setInstruction] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState("file");
    const [dialogPosition, setDialogPosition] = useState("below");
    const [isEditing, setIsEditing] = useState(false);
    const handleAddItem = (type, position, data) => {
        if (!setData)
            return;
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
        if (position === "inside") {
            setData(produce(rootData, (draft) => {
                const targetItem = findItemById(draft, item.id);
                if (targetItem && targetItem.type === "folder") {
                    targetItem.children.unshift(newItem);
                }
            }));
        }
        else {
            setData(produce(rootData, (draft) => {
                const result = findParentArrayAndIndex(draft, item.id);
                if (result) {
                    const { parentArray, index } = result;
                    const insertIndex = position === "below" ? index + 1 : index;
                    parentArray.splice(insertIndex, 0, newItem);
                }
            }));
        }
    };
    const handleDelete = () => {
        if (!setData)
            return;
        setData(removeItemById(rootData, item.id));
    };
    const handleEdit = () => {
        setDialogType(item.type);
        setIsEditing(true);
        setDialogOpen(true);
    };
    const handleSubmit = (formData) => {
        if (isEditing) {
            if (!setData)
                return;
            setData(produce(rootData, (draft) => {
                const targetItem = findItemById(draft, item.id);
                if (targetItem) {
                    targetItem.name = formData.name;
                    targetItem.data = formData;
                }
            }));
        }
        else {
            handleAddItem(dialogType, dialogPosition, formData);
        }
        setDialogOpen(false);
        setIsEditing(false);
    };
    const mode = useMemo(() => {
        if (item.type === "folder" && expandedItemIds.includes(item.id)) {
            return "expanded";
        }
        if (siblings && index === siblings.length - 1) {
            return "last-in-group";
        }
        return "standard";
    }, [item.type, item.id, expandedItemIds, index, siblings]);
    const handleDrop = useCallback(({ source, self, location }) => {
        const isInnermost = location.current.dropTargets[0]?.element === elementRef.current;
        if (!isInnermost)
            return;
        if (!setData)
            return;
        if (source.data.id === item.id)
            return;
        const instruction = extractInstruction(self.data);
        if (!instruction)
            return;
        const sourceItem = findItemById(rootData, source.data.id);
        if (!sourceItem)
            return;
        const intermediateData = removeItemById(rootData, source.data.id);
        const newData = insertItem(intermediateData, item.id, sourceItem, instruction);
        setData(newData);
        setInstruction(null);
    }, [rootData, item.id, setData]);
    useEffect(() => {
        const el = elementRef.current;
        if (!el)
            return;
        return combine(draggable({
            element: el,
            getInitialData: () => ({
                id: item.id,
                type: "tree-item",
            }),
            onDragStart: () => setIsDragging(true),
            onDrop: () => {
                setIsDragging(false);
                setInstruction(null);
            },
        }), dropTargetForElements({
            element: el,
            getData: ({ input, element }) => {
                const data = { id: item.id };
                return attachInstruction(data, {
                    input,
                    element,
                    indentPerLevel: 24,
                    currentLevel: 0,
                    mode,
                });
            },
            onDrag: ({ self, location }) => {
                const isInnermost = location.current.dropTargets[0]?.element === el;
                if (isInnermost) {
                    const instruction = extractInstruction(self.data);
                    setInstruction(instruction);
                }
                else {
                    setInstruction(null);
                }
            },
            onDragLeave: () => {
                setInstruction(null);
            },
            onDrop: handleDrop,
        }));
    }, [item.id, mode, handleDrop]);
    const value = React.useMemo(() => {
        return item.expanded ? [item.id] : [];
    }, [item.expanded, item.id]);
    const onValueChange = React.useCallback((newValue) => {
        if (!setData)
            return;
        const newData = produce(rootData, (draft) => {
            const target = findItemById(draft, item.id);
            if (target) {
                target.expanded = newValue.includes(item.id);
            }
        });
        setData(newData);
    }, [item.id, rootData, setData]);
    console.log("TreeNode", item);
    return (_jsxs(_Fragment, { children: [_jsx(Box, { className: "relative", children: _jsxs("div", { className: cn(treeVariants(), selectedItemId === item.id && selectedTreeVariants(), isDragging && "opacity-50"), onClick: () => {
                        handleSelectChange(item);
                        item.onClick?.();
                    }, onKeyDown: (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            handleSelectChange(item);
                            item.onClick?.();
                        }
                    }, children: [_jsx(TreeContextMenu, { onAddFile: (position) => {
                                setDialogType("file");
                                setDialogPosition(position);
                                setIsEditing(false);
                                setDialogOpen(true);
                            }, onAddFolder: (position) => {
                                setDialogType("folder");
                                setDialogPosition(position);
                                setIsEditing(false);
                                setDialogOpen(true);
                            }, onDelete: handleDelete, onEdit: handleEdit, canDelete: !!setData, isFolder: item.type === "folder", children: _jsxs(Flex, { align: "center", gap: "2", onClick: () => onValueChange(value.includes(item.id) ? [] : [item.id]), children: [value.includes(item.id) ? _jsx(ChevronDown, {}) : _jsx(ChevronRight, {}), _jsx(TreeIcon, { item: item, isOpen: value.includes(item.id), isSelected: selectedItemId === item.id, default: defaultNodeIcon }), _jsx(Text, { className: "truncate text-sm", children: item.name })] }) }), value.includes(item.id) && item.type === "folder" && (_jsx(TreeItem, { data: item.children, rootData: rootData, selectedItemId: selectedItemId, handleSelectChange: handleSelectChange, expandedItemIds: expandedItemIds, defaultLeafIcon: defaultLeafIcon, defaultNodeIcon: defaultNodeIcon, setData: setData })), instruction && _jsx(DropIndicator, { instruction: instruction })] }) }), _jsx(TreeItemDialog, { open: dialogOpen, onOpenChange: (open) => {
                    setDialogOpen(open);
                    if (!open)
                        setIsEditing(false);
                }, onSubmit: handleSubmit, type: dialogType, position: dialogPosition, initialData: isEditing ? item.data : undefined })] }));
};
const TreeLeaf = React.forwardRef(({ rootData, item, handleSelectChange, selectedItemId, defaultLeafIcon, index, iconTrue = false, siblings, setData, ...props }, _ref) => {
    const elementRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [instruction, setInstruction] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState("file");
    const [dialogPosition, setDialogPosition] = useState("below");
    const [isEditing, setIsEditing] = useState(false);
    const handleAddItem = (type, position, data) => {
        if (!setData)
            return;
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
        const newData = produce(rootData, (draft) => {
            const result = findParentArrayAndIndex(draft, item.id);
            if (result) {
                const { parentArray, index } = result;
                const insertIndex = position === "below" ? index + 1 : index;
                parentArray.splice(insertIndex, 0, newItem);
            }
        });
        setData(newData);
    };
    const handleDelete = () => {
        if (!setData)
            return;
        const newData = removeItemById(rootData, item.id);
        setData(newData);
    };
    const mode = React.useMemo(() => {
        if (siblings && index === siblings.length - 1) {
            return "last-in-group";
        }
        return "standard";
    }, [index, siblings]);
    const handleDrop = useCallback(({ source, self, location, }) => {
        const isInnermost = location.current.dropTargets[0]?.element === elementRef.current;
        if (!isInnermost)
            return;
        if (!setData)
            return;
        if (source.data.id === item.id)
            return;
        const instruction = extractInstruction(self.data);
        if (!instruction)
            return;
        const sourceItem = findItemById(rootData, source.data.id);
        if (!sourceItem)
            return;
        const intermediateData = removeItemById(rootData, source.data.id);
        const newData = insertItem(intermediateData, item.id, sourceItem, instruction);
        setData(newData);
        setInstruction(null);
    }, [rootData, item.id, setData]);
    const handleSubmit = (formData) => {
        if (isEditing) {
            if (!setData)
                return;
            setData(produce(rootData, (draft) => {
                const targetItem = findItemById(draft, item.id);
                if (targetItem) {
                    targetItem.name = formData.name;
                    targetItem.data = formData;
                }
            }));
        }
        else {
            handleAddItem(dialogType, dialogPosition, formData);
        }
        setDialogOpen(false);
        setIsEditing(false);
    };
    const handleEdit = () => {
        setDialogType(item.type);
        setIsEditing(true);
        setDialogOpen(true);
    };
    useEffect(() => {
        const el = elementRef.current;
        if (!el)
            return;
        return combine(draggable({
            element: el,
            getInitialData: () => ({
                id: item.id,
                type: "tree-item",
            }),
            onDragStart: () => setIsDragging(true),
            onDrop: () => {
                setIsDragging(false);
                setInstruction(null);
            },
        }), dropTargetForElements({
            element: el,
            getData: ({ input, element }) => {
                const data = { id: item.id };
                return attachInstruction(data, {
                    input,
                    element,
                    indentPerLevel: 24,
                    currentLevel: 0,
                    mode,
                });
            },
            onDrag: ({ self, location }) => {
                const isInnermost = location.current.dropTargets[0]?.element === el;
                if (isInnermost) {
                    const instruction = extractInstruction(self.data);
                    setInstruction(instruction);
                }
                else {
                    setInstruction(null);
                }
            },
            onDragLeave: () => {
                setInstruction(null);
            },
            onDrop: handleDrop,
        }));
    }, [item.id, mode, handleDrop]);
    console.log("TreeLeaf", item);
    return (_jsxs(_Fragment, { children: [_jsx(TreeContextMenu, { onAddFile: (position) => {
                    setDialogType("file");
                    setDialogPosition(position);
                    setIsEditing(false);
                    setDialogOpen(true);
                }, onAddFolder: (position) => {
                    setDialogType("folder");
                    setDialogPosition(position);
                    setIsEditing(false);
                    setDialogOpen(true);
                }, onDelete: handleDelete, onEdit: handleEdit, canDelete: !!setData, children: _jsx(Flex, { ref: elementRef, className: cn("ml-5 cursor-move items-center py-2 text-left", treeVariants(), props.className, selectedItemId === item.id && selectedTreeVariants(), isDragging && "opacity-50"), onClick: () => {
                        handleSelectChange(item);
                        item.onClick?.();
                    }, ...props, children: _jsx(Flex, { align: "center", gap: "2", children: _jsxs(Box, { className: "flex items-center gap-1 ", children: [iconTrue && (_jsx(TreeIcon, { item: item, isSelected: selectedItemId === item.id, default: defaultLeafIcon })), _jsx(Text, { className: "truncate text-sm", children: item?.name })] }) }) }) }), _jsx(TreeActions, { isSelected: selectedItemId === item.id, children: item.actions }), instruction && _jsx(DropIndicator, { instruction: instruction }), _jsx(TreeItemDialog, { open: dialogOpen, onOpenChange: (open) => {
                    setDialogOpen(open);
                    if (!open)
                        setIsEditing(false);
                }, onSubmit: handleSubmit, type: dialogType, position: dialogPosition, initialData: isEditing ? item.data : undefined })] }));
});
TreeLeaf.displayName = "TreeLeaf";
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (_jsx(AccordionPrimitive.Header, { className: "flex", children: _jsxs(AccordionPrimitive.Trigger, { ref: ref, className: cn(triggerStyles(), className), ...props, children: [_jsx(ChevronRight, { className: `mr-1 ${iconSize} shrink-0 text-accent-foreground/50 transition-transform duration-200` }), children] }) })));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (_jsx(AccordionPrimitive.Content, { ref: ref, className: cn("overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down", className), ...props, children: _jsx(Box, { className: "pt-0 pb-1", children: children }) })));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
const TreeIcon = ({ item, isOpen, default: defaultIcon, }) => {
    const Icon = item.icon ??
        (item.type === "folder"
            ? isOpen
                ? (item.openIcon ?? FolderOpen)
                : (item.selectedIcon ?? Folder)
            : (item.selectedIcon ?? defaultIcon ?? File));
    return _jsx(Icon, { className: `${iconSize} shrink-0` });
};
const TreeActions = ({ children, isSelected, }) => {
    return (_jsx(Box, { className: cn(isSelected ? "block" : "hidden", "absolute right-3 group-hover:block"), children: children }));
};
export { TreeView };
//# sourceMappingURL=tree-view.js.map