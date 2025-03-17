import type React from "react"
import { FileIcon, FolderIcon } from "lucide-react"
import { ImageIcon, VideoIcon, AudioWaveform, FileTextIcon, FileSpreadsheetIcon } from "lucide-react"

export type FileType = "folder" | "document" | "image" | "video" | "audio" | "archive" | "other"
export type ItemSize = { value: number; unit: "B" | "KB" | "MB" | "GB" | "TB" }

export interface FileItem {
  id: string
  name: string
  type: FileType
  icon: React.ElementType
  size: ItemSize
  owner: string
  location: string
  modified: string
  created: string
  path: string
  isStarred?: boolean
  parentId: string | null
}

// Helper function to create file items
const createFileItem = (
  id: string,
  name: string,
  type: FileType,
  size: ItemSize,
  parentId: string | null = null,
  modified = `Sep ${Math.floor(Math.random() * 28) + 1}, 2023`,
  created = `Sep ${Math.floor(Math.random() * 28) + 1}, 2023`,
): FileItem => {
  let icon: React.ElementType = FileIcon

  // Determine icon based on file type and extension
  if (type === "folder") {
    icon = FolderIcon
  } else if (type === "image") {
    icon = ImageIcon
  } else if (type === "video") {
    icon = VideoIcon
  } else if (type === "audio") {
    icon = AudioWaveform
  } else if (type === "document") {
    // Check file extension for specific document types
    const extension = name.split(".").pop()?.toLowerCase()
    if (extension === "pdf") {
      icon = FileTextIcon
    } else if (["doc", "docx"].includes(extension || "")) {
      icon = FileTextIcon
    } else if (["xls", "xlsx"].includes(extension || "")) {
      icon = FileSpreadsheetIcon
    } else {
      icon = FileTextIcon
    }
  }

  return {
    id,
    name,
    type,
    icon,
    size,
    owner: "ArtTemplate",
    location: parentId ? "Projects" : "My Files",
    modified,
    created,
    path: parentId ? `/projects/${name.toLowerCase().replace(/\s+/g, "-")}` : `/`,
    parentId,
  }
}

// Root folders
export const rootFolders: FileItem[] = [
  createFileItem("folder-design", "Design", "folder", { value: 3.8, unit: "GB" }, null, "Sep 15, 2023", "Aug 10, 2023"),
  createFileItem(
    "folder-projects",
    "Projects",
    "folder",
    { value: 12.5, unit: "GB" },
    null,
    "Sep 17, 2023",
    "Aug 5, 2023",
  ),
  createFileItem("folder-music", "Music", "folder", { value: 7.2, unit: "GB" }, null, "Sep 12, 2023", "Jul 20, 2023"),
  createFileItem(
    "folder-pictures",
    "Pictures",
    "folder",
    { value: 5.6, unit: "GB" },
    null,
    "Sep 10, 2023",
    "Jul 15, 2023",
  ),
  createFileItem(
    "folder-documents",
    "Documents",
    "folder",
    { value: 2.3, unit: "GB" },
    null,
    "Sep 8, 2023",
    "Jul 10, 2023",
  ),
  createFileItem(
    "folder-downloads",
    "Downloads",
    "folder",
    { value: 8.9, unit: "GB" },
    null,
    "Sep 5, 2023",
    "Jul 5, 2023",
  ),
]

// Project folders
export const projectFolders: FileItem[] = [
  createFileItem(
    "folder-projects-01",
    "Projects_01",
    "folder",
    { value: 5.8, unit: "GB" },
    "folder-projects",
    "Sep 17, 2023",
    "Aug 20, 2023",
  ),
  createFileItem(
    "folder-projects-02",
    "Projects_02",
    "folder",
    { value: 3.2, unit: "GB" },
    "folder-projects",
    "Sep 15, 2023",
    "Aug 18, 2023",
  ),
  createFileItem(
    "folder-projects-03",
    "Projects_03",
    "folder",
    { value: 1.5, unit: "GB" },
    "folder-projects",
    "Sep 12, 2023",
    "Aug 15, 2023",
  ),
  createFileItem(
    "folder-projects-04",
    "Projects_04",
    "folder",
    { value: 1.7, unit: "GB" },
    "folder-projects",
    "Sep 10, 2023",
    "Aug 12, 2023",
  ),
  createFileItem(
    "folder-documents",
    "Documents",
    "folder",
    { value: 440, unit: "MB" },
    "folder-projects",
    "Sep 8, 2023",
    "Aug 10, 2023",
  ),
  createFileItem(
    "folder-pictures",
    "Pictures",
    "folder",
    { value: 1.2, unit: "GB" },
    "folder-projects",
    "Sep 5, 2023",
    "Aug 8, 2023",
  ),
  createFileItem(
    "folder-projects-05",
    "Projects_05",
    "folder",
    { value: 2.1, unit: "GB" },
    "folder-projects",
    "Sep 3, 2023",
    "Aug 5, 2023",
  ),
  createFileItem(
    "folder-projects-06",
    "Projects_06",
    "folder",
    { value: 1.9, unit: "GB" },
    "folder-projects",
    "Sep 1, 2023",
    "Aug 3, 2023",
  ),
  createFileItem(
    "folder-projects-07",
    "Projects_07",
    "folder",
    { value: 3.5, unit: "GB" },
    "folder-projects",
    "Aug 28, 2023",
    "Aug 1, 2023",
  ),
  createFileItem(
    "folder-projects-08",
    "Projects_08",
    "folder",
    { value: 2.8, unit: "GB" },
    "folder-projects",
    "Aug 25, 2023",
    "Jul 28, 2023",
  ),
  createFileItem(
    "folder-projects-09",
    "Projects_09",
    "folder",
    { value: 1.3, unit: "GB" },
    "folder-projects",
    "Aug 22, 2023",
    "Jul 25, 2023",
  ),
  createFileItem(
    "folder-projects-10",
    "Projects_10",
    "folder",
    { value: 4.2, unit: "GB" },
    "folder-projects",
    "Aug 20, 2023",
    "Jul 22, 2023",
  ),
  createFileItem(
    "folder-projects-11",
    "Projects_11",
    "folder",
    { value: 2.5, unit: "GB" },
    "folder-projects",
    "Aug 18, 2023",
    "Jul 20, 2023",
  ),
  createFileItem(
    "folder-projects-12",
    "Projects_12",
    "folder",
    { value: 1.8, unit: "GB" },
    "folder-projects",
    "Aug 15, 2023",
    "Jul 18, 2023",
  ),
]

// Files inside Projects_01
export const projectsOneFiles: FileItem[] = [
  createFileItem(
    "file-project1-doc1",
    "Project Proposal.docx",
    "document",
    { value: 2.5, unit: "MB" },
    "folder-projects-01",
    "Sep 16, 2023",
    "Aug 21, 2023",
  ),
  createFileItem(
    "file-project1-img1",
    "Mockup.png",
    "image",
    { value: 4.8, unit: "MB" },
    "folder-projects-01",
    "Sep 15, 2023",
    "Aug 22, 2023",
  ),
  createFileItem(
    "file-project1-doc2",
    "Requirements.pdf",
    "document",
    { value: 3.2, unit: "MB" },
    "folder-projects-01",
    "Sep 14, 2023",
    "Aug 23, 2023",
  ),
  createFileItem(
    "folder-project1-assets",
    "Assets",
    "folder",
    { value: 250, unit: "MB" },
    "folder-projects-01",
    "Sep 13, 2023",
    "Aug 24, 2023",
  ),
  createFileItem(
    "folder-project1-docs",
    "Documentation",
    "folder",
    { value: 180, unit: "MB" },
    "folder-projects-01",
    "Sep 12, 2023",
    "Aug 25, 2023",
  ),
]

// Files inside Projects_02
export const projectsTwoFiles: FileItem[] = [
  createFileItem(
    "file-project2-doc1",
    "Budget.xlsx",
    "document",
    { value: 1.8, unit: "MB" },
    "folder-projects-02",
    "Sep 14, 2023",
    "Aug 19, 2023",
  ),
  createFileItem(
    "file-project2-img1",
    "Logo.svg",
    "image",
    { value: 0.5, unit: "MB" },
    "folder-projects-02",
    "Sep 13, 2023",
    "Aug 20, 2023",
  ),
  createFileItem(
    "file-project2-doc2",
    "Timeline.pdf",
    "document",
    { value: 2.1, unit: "MB" },
    "folder-projects-02",
    "Sep 12, 2023",
    "Aug 21, 2023",
  ),
  createFileItem(
    "folder-project2-src",
    "Source Code",
    "folder",
    { value: 320, unit: "MB" },
    "folder-projects-02",
    "Sep 11, 2023",
    "Aug 22, 2023",
  ),
  createFileItem(
    "folder-project2-media",
    "Media",
    "folder",
    { value: 450, unit: "MB" },
    "folder-projects-02",
    "Sep 10, 2023",
    "Aug 23, 2023",
  ),
]

// Combine all items for easy lookup
export const allItems: Record<string, FileItem> = [
  ...rootFolders,
  ...projectFolders,
  ...projectsOneFiles,
  ...projectsTwoFiles,
].reduce(
  (acc, item) => {
    acc[item.id] = item
    return acc
  },
  {} as Record<string, FileItem>,
)

// Function to get children of a folder
export const getChildrenOfFolder = (folderId: string | null): FileItem[] => {
  return Object.values(allItems).filter((item) => item.parentId === folderId)
}

// Function to get breadcrumb path
export const getBreadcrumbPath = (itemId: string): FileItem[] => {
  const path: FileItem[] = []
  let currentItem = allItems[itemId]

  while (currentItem) {
    path.unshift(currentItem)
    if (currentItem.parentId) {
      currentItem = allItems[currentItem.parentId]
    } else {
      break
    }
  }

  return path
}

// Action types for file operations
export type FileAction =
  | { type: "share"; itemId: string }
  | { type: "sharingLink"; itemId: string }
  | { type: "download"; itemId: string }
  | { type: "rename"; itemId: string; newName: string }
  | { type: "copy"; itemId: string; destinationId: string }
  | { type: "move"; itemId: string; destinationId: string }
  | { type: "delete"; itemId: string }

// Pagination settings
export const ITEMS_PER_PAGE = 6

