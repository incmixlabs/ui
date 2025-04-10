import type React from "react";
import { FolderClose } from "../secondary-sidebars/file-folder/icons/folder-close";
import { FolderOpen } from "../secondary-sidebars/file-folder/icons/folder-open";
export type FileType = "folder" | "document" | "image" | "audio";
export type ItemSize = {
    value: number;
    unit: "B" | "KB" | "MB" | "GB" | "TB";
};
export interface FileItem {
    id: string;
    name: string;
    type: FileType;
    size: ItemSize;
    openIcon?: React.ElementType;
    closeIcon?: React.ElementType;
    owner: string;
    location: string;
    modified: string;
    created: string;
    parentId?: string;
    icon?: any;
}
export declare const FileManagerData: {
    id: string;
    name: string;
}[];
export declare const projectFolders: ({
    id: string;
    parentId: string;
    name: string;
    type: "folder";
    size: {
        value: number;
        unit: "GB";
    };
    openIcon: typeof FolderOpen;
    closeIcon: typeof FolderClose;
    owner: string;
    location: string;
    modified: string;
    created: string;
} | {
    id: string;
    name: string;
    type: "folder";
    size: {
        value: number;
        unit: "GB";
    };
    openIcon: typeof FolderOpen;
    closeIcon: typeof FolderClose;
    owner: string;
    location: string;
    modified: string;
    created: string;
    parentId?: undefined;
})[];
export declare const ITEMS_PER_PAGE = 6;
//# sourceMappingURL=data.d.ts.map