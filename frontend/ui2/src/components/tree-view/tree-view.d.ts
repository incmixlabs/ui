import React from "react";
import type { TreeViewDescriptions } from "./types";
import type { FormFieldConfig, TreeDataItem } from "./types";
declare const TreeView: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    data: TreeDataItem[] | TreeDataItem;
    setData?: (data: TreeDataItem[] | TreeDataItem) => void;
    initialSelectedItemId?: string;
    onSelectChange?: (item: TreeDataItem | undefined) => void;
    expandAll?: boolean;
    defaultNodeIcon?: any;
    defaultLeafIcon?: any;
    emptyMessage?: string;
    newFileButtonText?: string;
    newFolderButtonText?: string;
    fileFields?: FormFieldConfig[];
    folderFields?: FormFieldConfig[];
    descriptions?: TreeViewDescriptions;
} & React.RefAttributes<HTMLDivElement>>;
export { TreeView, type TreeDataItem };
//# sourceMappingURL=tree-view.d.ts.map