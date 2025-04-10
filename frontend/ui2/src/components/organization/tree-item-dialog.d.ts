interface TreeItemDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    type: "file" | "folder";
    position: "above" | "below" | "inside";
    isEditing: boolean;
    formData: Record<string, string>;
    setFormData: (data: Record<string, string>) => void;
    onSubmit: () => void;
    onCancel: () => void;
}
export declare function TreeItemDialog({ open, onOpenChange, type, position, isEditing, formData, setFormData, onSubmit, onCancel, }: TreeItemDialogProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=tree-item-dialog.d.ts.map