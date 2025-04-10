import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Dialog, Input, Label, TextArea } from "@/components/base";
export function TreeItemDialog({ open, onOpenChange, type, position, isEditing, formData, setFormData, onSubmit, onCancel, }) {
    // Determine which fields to show based on dialog type
    const dialogFields = type === "file"
        ? [
            { name: "name", label: "Name", type: "text", required: true },
            { name: "value", label: "Value", type: "text", required: true },
            { name: "notes", label: "Notes", type: "textarea", required: false },
        ]
        : [
            { name: "name", label: "Name", type: "text", required: true },
            { name: "notes", label: "Notes", type: "textarea", required: false },
        ];
    return (_jsx(Dialog.Root, { open: open, onOpenChange: onOpenChange, children: _jsxs(Dialog.Content, { children: [_jsx(Dialog.Title, { children: isEditing
                        ? `Edit ${type === "file" ? "Variable" : "Folder"}`
                        : `New ${type === "file" ? "Variable" : "Folder"}` }), _jsx(Dialog.Description, { children: isEditing
                        ? `Edit the ${type === "file" ? "variable" : "folder"} details below.`
                        : `Add a new ${type === "file" ? "variable" : "folder"} ${position} the selected item.` }), _jsx("div", { className: "space-y-4 py-4", children: dialogFields.map((field) => (_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: field.name, children: field.label }), field.type === "textarea" ? (_jsx(TextArea, { id: field.name, value: formData[field.name] || "", onChange: (e) => setFormData({ ...formData, [field.name]: e.target.value }), placeholder: `Enter ${field.label.toLowerCase()}` })) : (_jsx(Input, { id: field.name, value: formData[field.name] || "", onChange: (e) => setFormData({ ...formData, [field.name]: e.target.value }), placeholder: `Enter ${field.label.toLowerCase()}`, required: field.required }))] }, field.name))) }), _jsxs(Dialog.Close, { children: [_jsx(Button, { variant: "outline", onClick: onCancel, children: "Cancel" }), _jsx(Button, { onClick: onSubmit, disabled: !formData.name || (type === "file" && !formData.value), children: isEditing
                                ? "Save"
                                : `Add ${type === "file" ? "Variable" : "Folder"}` })] })] }) }));
}
//# sourceMappingURL=tree-item-dialog.js.map