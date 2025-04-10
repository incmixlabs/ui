/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Dialog, Flex, Text, VisuallyHidden } from "@/components/base";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useEffect } from "react";
import { z } from "zod";
import { FormField } from "../form/form-field";
import { useTreeViewContext } from "./tree-view-context";
export function FieldInfo({ field }) {
    return (_jsx(_Fragment, { children: field.state.meta.isTouched && field.state.meta.errors ? (_jsx(Text, { color: "red", size: "1", children: field.state.meta.errors })) : null }));
}
export function TreeItemDialog({ open, onOpenChange, onSubmit, type, position, initialData, }) {
    const { descriptions, fileFields, folderFields } = useTreeViewContext();
    const fields = type === "file" ? fileFields : folderFields;
    const form = useForm({
        defaultValues: initialData ||
            Object.fromEntries(fields.map((field) => [field.name, ""])),
        onSubmit: ({ value }) => {
            onSubmit(value, type, position);
            onOpenChange(false);
        },
    });
    useEffect(() => {
        if (open && initialData) {
            form.reset(initialData);
        }
        else if (!open) {
            form.reset();
        }
    }, [open, initialData, form]);
    const isEditing = !!initialData;
    return (_jsx(Dialog.Root, { open: open, onOpenChange: onOpenChange, children: _jsxs(Dialog.Content, { children: [_jsx(VisuallyHidden, { asChild: true, children: _jsx(Dialog.Description, { children: isEditing
                            ? type === "file"
                                ? descriptions.editFileTitle
                                : descriptions.editFolderTitle
                            : type === "file"
                                ? descriptions.newFileTitle
                                : descriptions.newFolderTitle }) }), _jsx(Dialog.Header, { children: _jsx(Dialog.Title, { children: isEditing
                            ? type === "file"
                                ? descriptions.editFileTitle
                                : descriptions.editFolderTitle
                            : type === "file"
                                ? descriptions.newFileTitle
                                : descriptions.newFolderTitle }) }), _jsxs("form", { onSubmit: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }, children: [_jsx(Flex, { direction: "column", gap: "3", children: fields.map((field) => (_jsx(form.Field, { name: field.name, validatorAdapter: zodValidator(), validators: {
                                    onChange: field.required
                                        ? z.string().min(1, "This field is required")
                                        : undefined,
                                }, children: (fieldApi) => (_jsx(FormField, { name: field.name, label: field.label, type: field.type === "textarea" ? "textarea" : "text", field: fieldApi })) }, field.name))) }), _jsxs(Dialog.Footer, { children: [_jsx(Button, { type: "button", variant: "soft", onClick: () => onOpenChange(false), children: "Cancel" }), _jsx(form.Subscribe, { selector: (state) => [state.canSubmit, state.isSubmitting], children: ([canSubmit, isSubmitting]) => (_jsx(Button, { type: "submit", disabled: !canSubmit, children: isSubmitting ? "..." : isEditing ? "Save" : `Add ${type}` })) })] })] })] }) }));
}
//# sourceMappingURL=tree-item-dialog.js.map