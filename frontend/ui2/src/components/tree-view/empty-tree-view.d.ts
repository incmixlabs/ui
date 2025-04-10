import type { TreeDataItem } from "./tree-view";
type EmptyTreeViewProps = {
    onCreateItem: (item: TreeDataItem) => void;
    emptyMessage?: string;
    newFileButtonText?: string;
    newFolderButtonText?: string;
};
export declare function EmptyTreeView({ onCreateItem, emptyMessage, newFileButtonText, newFolderButtonText, }: EmptyTreeViewProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=empty-tree-view.d.ts.map