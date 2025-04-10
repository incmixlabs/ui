"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronDown, ChevronRight, MoreVertical } from "lucide-react";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Checkbox, Dialog, DropdownMenu, Input, Label, TextArea, } from "@/components/base";
import { TableCell, TableRow } from "@/components/table";
export const TreeItemRow = forwardRef(({ item, level, onToggleExpand, onEdit, onDelete, onCreateItem }, ref) => {
    // Local state for dialog management
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState("file");
    const [dialogPosition, setDialogPosition] = useState("below");
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        value: "",
        notes: "",
    });
    // Handle opening the dialog for editing
    const handleOpenEditDialog = () => {
        setDialogType(item.type);
        setIsEditing(true);
        setFormData({
            name: item.name,
            value: item.data?.value || "",
            notes: item.data?.notes || "",
        });
        setDialogOpen(true);
    };
    // Handle opening the dialog for creating items
    const handleOpenCreateDialog = (type, position) => {
        setDialogType(type);
        setDialogPosition(position);
        setIsEditing(false);
        setFormData({ name: "", value: "", notes: "" });
        setDialogOpen(true);
    };
    // Expose methods via ref
    useImperativeHandle(ref, () => ({
        openEditDialog: handleOpenEditDialog,
        openCreateDialog: handleOpenCreateDialog,
    }));
    // Handle form submission
    const handleSubmit = () => {
        if (isEditing) {
            onEdit({
                ...item,
                name: formData.name,
                data: {
                    ...item.data,
                    name: formData.name,
                    value: formData.value,
                    notes: formData.notes,
                },
            });
        }
        else {
            // Pass the form data to the parent component
            onCreateItem(item, dialogType, dialogPosition, formData);
        }
        // Close the dialog and reset form
        setDialogOpen(false);
        setIsEditing(false);
        setFormData({ name: "", value: "", notes: "" });
    };
    // Determine which fields to show based on dialog type
    const dialogFields = dialogType === "file"
        ? [
            { name: "name", label: "Name", type: "text", required: true },
            { name: "value", label: "Value", type: "text", required: true },
            {
                name: "notes",
                label: "Notes",
                type: "textarea",
                required: false,
            },
        ]
        : [
            { name: "name", label: "Name", type: "text", required: true },
            {
                name: "notes",
                label: "Notes",
                type: "textarea",
                required: false,
            },
        ];
    return (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "w-12 border border-gray-200", children: _jsx(Checkbox, {}) }), _jsx(TableCell, { className: "border border-gray-200", children: _jsxs("div", { className: "flex items-center", style: { paddingLeft: `${level * 24}px` }, children: [item.type === "folder" && (_jsx("button", { type: "button" //
                            , onClick: () => onToggleExpand(item.id), className: "mr-2 focus:outline-none", children: item.expanded ? (_jsx(ChevronDown, { className: "h-4 w-4" })) : (_jsx(ChevronRight, { className: "h-4 w-4" })) })), item.type === "file" && _jsx("div", { className: "w-6" }), _jsx("span", { className: item.type === "folder" ? "font-medium" : "", children: item.name })] }) }), _jsx(TableCell, { className: "max-w-xs border border-gray-200", children: item.type === "file" && item.data?.value ? (_jsx("div", { className: "truncate", title: item.data.value, children: item.data.value })) : ("") }), _jsx(TableCell, { className: "border border-gray-200" }), _jsx(TableCell, { className: "border border-gray-200" }), _jsx(TableCell, { className: "w-10 border border-gray-200", children: _jsxs(DropdownMenu.Root, { children: [_jsx(DropdownMenu.Trigger, { children: _jsx("button", { type: "button", className: "rounded-md p-1 hover:bg-gray-100 focus:outline-none", children: _jsx(MoreVertical, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenu.Content, { align: "end", children: [_jsx(DropdownMenu.Item, { onClick: handleOpenEditDialog, children: "Edit" }), _jsxs(DropdownMenu.Sub, { children: [_jsx(DropdownMenu.SubTrigger, { children: "Create Variable" }), _jsxs(DropdownMenu.SubContent, { children: [_jsx(DropdownMenu.Item, { onClick: () => handleOpenCreateDialog("file", "above"), children: "Above" }), _jsx(DropdownMenu.Item, { onClick: () => handleOpenCreateDialog("file", "below"), children: "Below" }), item.type === "folder" && (_jsx(DropdownMenu.Item, { onClick: () => handleOpenCreateDialog("file", "inside"), children: "Inside" }))] })] }), _jsxs(DropdownMenu.Sub, { children: [_jsx(DropdownMenu.SubTrigger, { children: "Create Folder" }), _jsxs(DropdownMenu.SubContent, { children: [_jsx(DropdownMenu.Item, { onClick: () => handleOpenCreateDialog("folder", "above"), children: "Above" }), _jsx(DropdownMenu.Item, { onClick: () => handleOpenCreateDialog("folder", "below"), children: "Below" }), item.type === "folder" && (_jsx(DropdownMenu.Item, { onClick: () => handleOpenCreateDialog("folder", "inside"), children: "Inside" }))] })] }), _jsx(DropdownMenu.Separator, {}), _jsx(DropdownMenu.Item, { className: "text-red-600", onClick: () => onDelete(item.id), children: "Delete" })] })] }) }), _jsx(Dialog.Root, { open: dialogOpen, onOpenChange: setDialogOpen, children: _jsxs(Dialog.Content, { children: [_jsxs(Dialog.Header, { children: [_jsx(Dialog.Title, { children: isEditing
                                        ? `Edit ${dialogType === "file" ? "Variable" : "Folder"}`
                                        : `New ${dialogType === "file" ? "Variable" : "Folder"}` }), _jsx(Dialog.Description, { children: isEditing
                                        ? `Edit the ${dialogType === "file" ? "variable" : "folder"} details below.`
                                        : `Add a new ${dialogType === "file" ? "variable" : "folder"} ${dialogPosition} the selected item.` })] }), _jsx("div", { className: "space-y-4 py-4", children: dialogFields.map((field) => (_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: field.name, children: field.label }), field.type === "textarea" ? (_jsx(TextArea, { id: field.name, value: formData[field.name] || "", onChange: (e) => setFormData({
                                            ...formData,
                                            [field.name]: e.target.value,
                                        }), placeholder: `Enter ${field.label.toLowerCase()}` })) : (_jsx(Input, { id: field.name, value: formData[field.name] || "", onChange: (e) => setFormData({
                                            ...formData,
                                            [field.name]: e.target.value,
                                        }), placeholder: `Enter ${field.label.toLowerCase()}`, required: field.required }))] }, field.name))) }), _jsxs(Dialog.Footer, { children: [_jsx(Button, { variant: "outline", onClick: () => {
                                        setDialogOpen(false);
                                        setIsEditing(false);
                                        setFormData({ name: "", value: "", notes: "" });
                                    }, children: "Cancel" }), _jsx(Button, { onClick: handleSubmit, disabled: !formData.name || (dialogType === "file" && !formData.value), children: isEditing
                                        ? "Save"
                                        : `Add ${dialogType === "file" ? "Variable" : "Folder"}` })] })] }) })] }));
});
// Add display name for better debugging
TreeItemRow.displayName = "TreeItemRow";
//# sourceMappingURL=tree-item-row.js.map