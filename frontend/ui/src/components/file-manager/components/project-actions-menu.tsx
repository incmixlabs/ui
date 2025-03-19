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

import { Button, DropdownMenu } from "@radix-ui/themes"
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
    // Simulate copying link to clipboard
    navigator.clipboard.writeText(`https://example.com/files/${projectId}`)
    // toast({
    //   title: "Link copied",
    //   description: "Sharing link copied to clipboard",
    // })
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

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={cn("cursor-pointer", className)}>
        <Button variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">More options</span>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" className="w-48">
        <DropdownMenu.Item onClick={handleShare}>
          <Share className="mr-2 h-4 w-4" />
          <span>Share</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={handleSharingLink}>
          <Link className="mr-2 h-4 w-4" />
          <span>Sharing Link</span>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          <span>Download</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={handleRename}>
          <Pencil className="mr-2 h-4 w-4" />
          <span>Rename</span>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onClick={handleCopy}>
          <Copy className="mr-2 h-4 w-4" />
          <span>Copy</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={handleMove}>
          <FolderUp className="mr-2 h-4 w-4" />
          <span>Move</span>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onClick={handleDelete} color="red">
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
