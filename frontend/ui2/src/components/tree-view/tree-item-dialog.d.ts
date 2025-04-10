import type { FieldApi } from "@tanstack/react-form";
type FormData = Record<string, string>;
type TreeItemDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: FormData, type: "file" | "folder", position: "above" | "below" | "inside") => void;
    type: "file" | "folder";
    position: "above" | "below" | "inside";
    initialData?: Record<string, string>;
};
export declare function FieldInfo({ field }: {
    field: FieldApi<any, any, any, any>;
}): import("react/jsx-runtime").JSX.Element;
export declare function TreeItemDialog({ open, onOpenChange, onSubmit, type, position, initialData, }: TreeItemDialogProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=tree-item-dialog.d.ts.map