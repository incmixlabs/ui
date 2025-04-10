import { type LucideIcon } from "lucide-react";
import React, { type ComponentType } from "react";
import type { IconProps } from "./icons/types";
interface TreeDataItem {
    id: string;
    name: string;
    icon?: LucideIcon;
    children?: TreeDataItem[];
}
declare const Tree: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    data: TreeDataItem[] | TreeDataItem;
    initialSelectedItemId?: string;
    onSelectChange?: (item: TreeDataItem | undefined) => void;
    expandAll?: boolean;
    folderIconOpen?: ComponentType<IconProps>;
    folderIcon?: ComponentType<IconProps>;
    itemIcon?: ComponentType<IconProps>;
} & React.RefAttributes<HTMLDivElement>>;
export { Tree, type TreeDataItem };
//# sourceMappingURL=tree-view.d.ts.map