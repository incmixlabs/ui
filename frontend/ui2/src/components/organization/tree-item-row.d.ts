import type { TreeDataItem } from "@/types";
interface TreeItemRowProps {
    item: TreeDataItem;
    level: number;
    onToggleExpand: (itemId: string) => void;
    onEdit: (item: TreeDataItem) => void;
    onDelete: (itemId: string) => void;
    onCreateItem: (item: TreeDataItem, type: "file" | "folder", position: "above" | "below" | "inside", formData: Record<string, string>) => void;
}
export interface TreeItemRowRef {
    openEditDialog: () => void;
    openCreateDialog: (type: "file" | "folder", position: "above" | "below" | "inside") => void;
}
export declare const TreeItemRow: import("react").ForwardRefExoticComponent<TreeItemRowProps & import("react").RefAttributes<TreeItemRowRef>>;
export {};
//# sourceMappingURL=tree-item-row.d.ts.map