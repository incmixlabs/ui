import { projectFolders } from "@/components/file-manager/data";
import { Book, FileText, Trash2 } from "lucide-react";
export const secondarySidebarData = [
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
];
export const secondaryFooterData = [
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
];
//# sourceMappingURL=data.js.map