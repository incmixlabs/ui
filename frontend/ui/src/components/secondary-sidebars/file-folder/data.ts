import { projectFolders } from "@components/file-manager/data"
import { Book, FileText, type LucideIcon, Trash2 } from "lucide-react"

interface SidebarItem {
  id: string
  name: string
  children?: SidebarItem[]
}

interface FooterItem {
  icon?: LucideIcon
  title: string
  storageAvailable?: number
}

export const secondarySidebarData: SidebarItem[] = [
  {
    id: "design",
    name: "Design",
  },
  {
    id: "projects",
    name: "Projects",
    children: projectFolders.filter((folder) => folder.parentId === "projects"),
  },
  {
    id: "music",
    name: "Music",
  },
  {
    id: "pictures",
    name: "Pictures",
  },
  {
    id: "documents",
    name: "Documents",
  },
  {
    id: "downloads",
    name: "Downloads",
  },
]

export const secondaryFooterData: FooterItem[] = [
  {
    icon: Trash2,
    title: "Trash",
  },
  {
    storageAvailable: 80,
    title: "Storage",
  },
  {
    icon: FileText,
    title: "Notes",
  },
  {
    icon: Book,
    title: "Contacts",
  },
]
