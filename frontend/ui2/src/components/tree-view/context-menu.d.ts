type TreeContextMenuProps = {
    children: React.ReactNode;
    onAddFile?: (position: "above" | "below" | "inside") => void;
    onAddFolder?: (position: "above" | "below" | "inside") => void;
    onDelete?: () => void;
    onEdit?: () => void;
    canDelete?: boolean;
    isFolder?: boolean;
};
export declare function TreeContextMenu({ children, onAddFile, onAddFolder, onDelete, onEdit, canDelete, isFolder, }: TreeContextMenuProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=context-menu.d.ts.map