import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Copy, Download, FolderUp, Link, MoreHorizontal, Pencil, Share, Trash2, } from "lucide-react";
import { Button, DropdownMenu } from "@/components/base";
import { iconSize } from "@/components/icons/icon";
import { cn } from "@/lib/utils";
export function ProjectActionsMenu({ projectId, className, }) {
    const handleShare = () => {
        // toast({
        //   title: "Sharing options",
        //   description: `Opened sharing options for ${file.name}`,
        // })
    };
    const handleSharingLink = () => {
        try {
            // Simulate copying link to clipboard
            navigator.clipboard.writeText(`https://example.com/files/${projectId}`);
            // toast({
            //   title: "Link copied",
            //   description: "Sharing link copied to clipboard",
            // })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }
        catch (_error) {
            // toast({
            //   title: "Error",
            //   description: "Failed to copy link to clipboard",
            //   variant: "destructive",
            // })
        }
    };
    const handleDownload = () => {
        // toast({
        //   title: "Download started",
        //   description: `Downloading ${file.name}`,
        // })
    };
    const handleRename = () => {
        // toast({
        //   title: "Rename file",
        //   description: `Rename dialog opened for ${file.name}`,
        // })
    };
    const handleCopy = () => {
        // toast({
        //   title: "Copy file",
        //   description: `Select destination to copy ${file.name}`,
        // })
    };
    const handleMove = () => {
        // toast({
        //   title: "Move file",
        //   description: `Select destination to move ${file.name}`,
        // })
    };
    const handleDelete = () => {
        // toast({
        //   title: "Delete file",
        //   description: `Are you sure you want to delete ${file.name}?`,
        //   variant: "destructive",
        // })
    };
    const moreOptions = [
        {
            title: "Share",
            onClick: handleShare,
            icon: Share,
        },
        {
            title: "Sharing Link",
            onClick: handleSharingLink,
            icon: Link,
        },
        {
            title: "Download",
            onClick: handleDownload,
            icon: Download,
        },
        {
            title: "Rename",
            onClick: handleRename,
            icon: Pencil,
        },
        {
            title: "Copy",
            onClick: handleCopy,
            icon: Copy,
        },
        {
            title: "Move",
            onClick: handleMove,
            icon: FolderUp,
        },
        {
            title: "Delete",
            onClick: handleDelete,
            icon: Trash2,
        },
    ].map((option, index) => (_jsxs(DropdownMenu.Item, { onClick: option.onClick, children: [_jsx(option.icon, { className: `mr-2 ${iconSize}` }), _jsx("span", { children: option.title })] }, index)));
    return (_jsxs(DropdownMenu.Root, { children: [_jsx(DropdownMenu.Trigger, { className: cn("cursor-pointer", className), children: _jsxs(Button, { variant: "ghost", children: [_jsx(MoreHorizontal, { className: `${iconSize}` }), _jsx("span", { className: "sr-only", children: "More options" })] }) }), _jsx(DropdownMenu.Content, { align: "end", className: "w-48", children: moreOptions })] }));
}
//# sourceMappingURL=project-actions-menu.js.map