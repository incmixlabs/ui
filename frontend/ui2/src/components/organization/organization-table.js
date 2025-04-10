import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Checkbox } from "@/components/base";
import { nanoid } from "nanoid";
import { Table } from "@/components/shadcn/table";
import { findItemById, removeItemById, useEnvVarsStore, } from "@/lib/utils/env-vars-store";
import { produce } from "immer";
import { useEffect, useRef, useState } from "react";
import { TreeItemRow } from "./tree-item-row";
export function OrganizationTable() {
    const { treeData, setTreeData } = useEnvVarsStore();
    const rowRefs = useRef({});
    const [flattenedItems, setFlattenedItems] = useState([]);
    const topLevelRowRef = useRef(null);
    const flattenTree = (items, level = 0, parentId = null) => {
        return items.reduce((acc, item) => {
            const flatItem = {
                ...item,
                level,
                parentId,
            };
            acc.push(flatItem);
            // Add children if this is an expanded folder
            if (item.type === "folder" &&
                item.expanded &&
                item.children &&
                item.children.length > 0) {
                acc.push(...flattenTree(item.children, level + 1, item.id));
            }
            return acc;
        }, []);
    };
    useEffect(() => {
        setFlattenedItems(flattenTree(treeData));
    }, [treeData]);
    // Function to toggle the expanded state of a folder
    const toggleExpand = (itemId) => {
        setTreeData(produce(treeData, (draft) => {
            const item = findItemById(draft, itemId);
            if (item && item.type === "folder") {
                item.expanded = !item.expanded;
            }
        }));
    };
    const handleAddItem = (item, type, position, formData) => {
        // Create a new item with the form data
        const newItem = type === "file"
            ? {
                type,
                id: nanoid(),
                name: formData.name,
                data: {
                    name: formData.name,
                    value: formData.value || "",
                    notes: formData.notes || "",
                },
            }
            : {
                type,
                id: nanoid(),
                name: formData.name,
                children: [],
                expanded: true,
                data: {
                    name: formData.name,
                    notes: formData.notes || "",
                },
            };
        if (item.id === "virtual-root") {
            setTreeData([...treeData, newItem]);
        }
        else {
            setTreeData(produce(treeData, (draft) => {
                if (position === "inside") {
                    const targetItem = findItemById(draft, item.id);
                    if (targetItem && targetItem.type === "folder") {
                        if (!targetItem.children)
                            targetItem.children = [];
                        targetItem.children.push(newItem);
                        targetItem.expanded = true;
                    }
                }
                else {
                    const result = findParentArrayAndIndex(draft, item.id);
                    if (result) {
                        const { parentArray, index } = result;
                        const insertIndex = position === "below" ? index + 1 : index;
                        parentArray.splice(insertIndex, 0, newItem);
                    }
                }
            }));
        }
    };
    // Helper function to find parent array and index
    const findParentArrayAndIndex = (items, id, parent = null) => {
        const itemsArray = Array.isArray(items) ? items : [items];
        for (let i = 0; i < itemsArray.length; i++) {
            if (itemsArray[i].id === id) {
                return { parentArray: parent || itemsArray, index: i };
            }
            // Check if children exists and has items before recursing
            const children = itemsArray[i].children;
            if (children && children.length > 0) {
                const found = findParentArrayAndIndex(children, id, children);
                if (found)
                    return found;
            }
        }
        return null;
    };
    // Function to handle deleting an item
    const handleDelete = (itemId) => {
        setTreeData(removeItemById(treeData, itemId));
    };
    // Function to handle editing an item
    const handleEdit = (updatedItem) => {
        setTreeData(produce(treeData, (draft) => {
            const targetItem = findItemById(draft, updatedItem.id);
            if (targetItem) {
                targetItem.name = updatedItem.name;
                if (!targetItem.data)
                    targetItem.data = {};
                targetItem.data.name = updatedItem.name;
                if (targetItem.type === "file") {
                    targetItem.data.value = updatedItem.data?.value || "";
                }
                targetItem.data.notes = updatedItem.data?.notes || "";
            }
        }));
    };
    // Function to add a new top-level item
    const addTopLevelItem = (type) => {
        // Use the virtual row's dialog
        if (topLevelRowRef.current) {
            topLevelRowRef.current.openCreateDialog(type, "below");
        }
    };
    // Create a virtual root item for top-level operations
    const virtualRootItem = {
        id: "virtual-root",
        name: "Root",
        type: "folder",
        expanded: true,
    };
    return (_jsxs("div", { className: "container mx-auto py-10", children: [_jsxs("div", { className: "mb-6 flex items-center justify-between", children: [_jsx("h1", { className: "font-bold text-2xl", children: "Environment Variables" }), _jsxs("div", { className: "space-x-2", children: [_jsx(Button, { onClick: () => addTopLevelItem("folder"), children: "New Folder" }), _jsx(Button, { onClick: () => addTopLevelItem("file"), children: "New Variable" })] })] }), _jsx("div", { className: "hidden", children: _jsx(TreeItemRow, { ref: topLevelRowRef, item: virtualRootItem, level: 0, onToggleExpand: () => { }, onEdit: handleEdit, onDelete: handleDelete, onCreateItem: handleAddItem }) }), _jsxs(Table.Root, { className: "border-collapse border border-gray-200", children: [_jsx(Table.Header, { children: _jsxs(Table.Row, { children: [_jsx(Table.ColumnHeaderCell, { className: "w-12 border border-gray-200", children: _jsx(Checkbox, {}) }), _jsx(Table.ColumnHeaderCell, { className: "border border-gray-200", children: "Description" }), _jsx(Table.ColumnHeaderCell, { className: "w-64 border border-gray-200", children: "Value" }), _jsx(Table.ColumnHeaderCell, { className: "border border-gray-200", children: "Created on" }), _jsx(Table.ColumnHeaderCell, { className: "border border-gray-200", children: "Created by" }), _jsx(Table.ColumnHeaderCell, { className: "w-10 border border-gray-200", children: "Actions" })] }) }), _jsx(Table.Body, { children: flattenedItems.length > 0 ? (flattenedItems.map((item) => (_jsx(TreeItemRow, { ref: (el) => {
                                if (el)
                                    rowRefs.current[item.id] = el;
                            }, item: item, level: item.level, onToggleExpand: toggleExpand, onEdit: handleEdit, onDelete: handleDelete, onCreateItem: handleAddItem }, item.id)))) : (_jsx(Table.Row, { children: _jsx(Table.Cell, { colSpan: 6, className: "py-4 text-center", children: "No environment variables. Create a new variable or folder to get started." }) })) })] })] }));
}
//# sourceMappingURL=organization-table.js.map