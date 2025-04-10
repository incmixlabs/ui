import type { TreeViewContextType } from "./types";
export declare function useTreeViewContext(): TreeViewContextType;
type TreeViewProviderProps = TreeViewContextType & {
    children: React.ReactNode;
};
export declare function TreeViewProvider({ children, fileFields, folderFields, descriptions, }: TreeViewProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=tree-view-context.d.ts.map