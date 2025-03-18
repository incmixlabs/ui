import { FileTextIcon, ImageIcon } from "lucide-react"
import type React from "react"
import { FolderClose } from "../secondary-sidebars/file-folder/icons/folder-close"
import { FolderOpen } from "../secondary-sidebars/file-folder/icons/folder-open"

export type FileType = "folder" | "document" | "image" | "audio"
export type ItemSize = { value: number; unit: "B" | "KB" | "MB" | "GB" | "TB" }

export interface FileItem {
  id: string
  name: string
  type: FileType
  size: ItemSize
  openIcon?: React.ElementType
  closeIcon?: React.ElementType
  owner: string
  location: string
  modified: string
  created: string
  parentId?: string
  icon?: any
}

// Simplified flat data structure
export const FileManagerData: FileItem[] = [
  // Root folders
  {
    id: "design",
    name: "Design",
    type: "folder",
    size: { value: 3.8, unit: "GB" },
    openIcon: FolderOpen,
    closeIcon: FolderClose,
    owner: "ArtTemplate",
    location: "My Files",
    modified: "Sep 15, 2023",
    created: "Aug 10, 2023",
  },
  {
    id: "projects",
    name: "Projects",
    type: "folder",
    size: { value: 12.5, unit: "GB" },
    openIcon: FolderOpen,
    closeIcon: FolderClose,
    owner: "ArtTemplate",
    location: "My Files",
    modified: "Sep 17, 2023",
    created: "Aug 5, 2023",
  },
  {
    id: "music",
    name: "Music",
    type: "folder",
    size: { value: 7.2, unit: "GB" },
    openIcon: FolderOpen,
    closeIcon: FolderClose,
    owner: "ArtTemplate",
    location: "My Files",
    modified: "Sep 12, 2023",
    created: "Jul 20, 2023",
  },
  {
    id: "pictures",
    name: "Pictures",
    type: "folder",
    size: { value: 5.6, unit: "GB" },
    openIcon: FolderOpen,
    closeIcon: FolderClose,
    owner: "ArtTemplate",
    location: "My Files",
    modified: "Sep 10, 2023",
    created: "Jul 15, 2023",
  },
  {
    id: "documents",
    name: "Documents",
    type: "folder",
    size: { value: 2.3, unit: "GB" },
    openIcon: FolderOpen,
    closeIcon: FolderClose,
    owner: "ArtTemplate",
    location: "My Files",
    modified: "Sep 8, 2023",
    created: "Jul 10, 2023",
  },
  {
    id: "downloads",
    name: "Downloads",
    type: "folder",
    size: { value: 8.9, unit: "GB" },
    openIcon: FolderOpen,
    closeIcon: FolderClose,
    owner: "ArtTemplate",
    location: "My Files",
    modified: "Sep 5, 2023",
    created: "Jul 5, 2023",
  },
]
export const projectFolders = [
  {
    id: "project1",
    name: "Projects_01",
    type: "folder" as const,
    size: { value: 5.8, unit: "GB" as const },
    openIcon: FolderOpen,
    closeIcon: FolderClose,
    owner: "ArtTemplate",
    location: "Projects",
    modified: "Sep 17, 2023",
    created: "Aug 20, 2023",
  },
  {
    id: "project2",
    name: "Projects_02",
    type: "folder" as const,
    size: { value: 3.2, unit: "GB" as const },
    openIcon: FolderOpen,
    closeIcon: FolderClose,
    owner: "ArtTemplate",
    location: "Projects",
    modified: "Sep 15, 2023",
    created: "Aug 18, 2023",
  },
  {
    id: "project3",
    name: "Projects_03",
    type: "folder" as const,
    size: { value: 1.5, unit: "GB" as const },
    openIcon: FolderOpen,
    closeIcon: FolderClose,
    owner: "ArtTemplate",
    location: "Projects",
    modified: "Sep 12, 2023",
    created: "Aug 15, 2023",
  },
  {
    id: "project4",
    name: "Projects_04",
    type: "folder" as const,
    size: { value: 1.7, unit: "GB" as const },
    openIcon: FolderOpen,
    closeIcon: FolderClose,
    owner: "ArtTemplate",
    location: "Projects",
    modified: "Sep 10, 2023",
    created: "Aug 12, 2023",
  },
]

// Pagination settings
export const ITEMS_PER_PAGE = 6
