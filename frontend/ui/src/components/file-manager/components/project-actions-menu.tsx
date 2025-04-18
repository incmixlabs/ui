import {
  Copy,
  Download,
  FolderUp,
  Link,
  MoreHorizontal,
  Pencil,
  Share,
  Trash2,
} from "lucide-react"

import { Button,  iconSize } from "@base"
import { DropdownMenu } from "@radixui/dropdown-menu"
import { cn } from "@utils"

interface ProjectActionsMenuProps {
  projectId: string | undefined
  className?: string
}

export function ProjectActionsMenu({
  projectId,
  className,
}: ProjectActionsMenuProps) {
  const handleShare = () => {
    // toast({
    //   title: "Sharing options",
    //   description: `Opened sharing options for ${file.name}`,
    // })
  }

  const handleSharingLink = () => {
    try {
      // Simulate copying link to clipboard
      navigator.clipboard.writeText(`https://example.com/files/${projectId}`)
      // toast({
      //   title: "Link copied",
      //   description: "Sharing link copied to clipboard",
      // })
    } catch (_error) {
      // toast({
      //   title: "Error",
      //   description: "Failed to copy link to clipboard",
      //   variant: "destructive",
      // })
    }
  }

  const handleDownload = () => {
    // toast({
    //   title: "Download started",
    //   description: `Downloading ${file.name}`,
    // })
  }

  const handleRename = () => {
    // toast({
    //   title: "Rename file",
    //   description: `Rename dialog opened for ${file.name}`,
    // })
  }

  const handleCopy = () => {
    // toast({
    //   title: "Copy file",
    //   description: `Select destination to copy ${file.name}`,
    // })
  }

  const handleMove = () => {
    // toast({
    //   title: "Move file",
    //   description: `Select destination to move ${file.name}`,
    // })
  }

  const handleDelete = () => {
    // toast({
    //   title: "Delete file",
    //   description: `Are you sure you want to delete ${file.name}?`,
    //   variant: "destructive",
    // })
  }
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
  ].map((option, index) => (
    <DropdownMenu.Item key={index} onClick={option.onClick}>
      <option.icon className={`mr-2 ${iconSize}`} />
      <span>{option.title}</span>
    </DropdownMenu.Item>
  ))
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={cn("cursor-pointer", className)}>
        <Button variant="ghost">
          <MoreHorizontal className={`${iconSize}`} />
          <span className="sr-only">More options</span>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" className="w-48">
        {moreOptions}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
