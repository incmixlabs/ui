"use client"

import { Button, ContextMenu as ContextMenuPrimitive, Flex } from "@incmix/ui"
import { FilePlus, FolderPlus, Pencil, Trash } from "lucide-react"
import type * as React from "react"
import { useTreeViewContext } from "./tree-view-context"

const ContextMenu = ContextMenuPrimitive.Root
const ContextMenuTrigger = ContextMenuPrimitive.Trigger
const ContextMenuContent = ContextMenuPrimitive.Content
const ContextMenuSub = ContextMenuPrimitive.Sub
const ContextMenuSubTrigger = ContextMenuPrimitive.SubTrigger
const ContextMenuSubContent = ContextMenuPrimitive.SubContent

type TreeContextMenuProps = {
  children: React.ReactNode
  onAddFile?: (position: "above" | "below" | "inside") => void
  onAddFolder?: (position: "above" | "below" | "inside") => void
  onDelete?: () => void
  onEdit?: () => void
  canDelete?: boolean
  isFolder?: boolean
}

export function TreeContextMenu({
  children,
  onAddFile,
  onAddFolder,
  onDelete,
  onEdit,
  canDelete = true,
  isFolder = false,
}: TreeContextMenuProps) {
  const { descriptions } = useTreeViewContext()

  const handleAddFile = (
    e: React.MouseEvent,
    position: "above" | "below" | "inside"
  ) => {
    e.preventDefault()
    onAddFile?.(position)
  }

  const handleAddFolder = (
    e: React.MouseEvent,
    position: "above" | "below" | "inside"
  ) => {
    e.preventDefault()
    onAddFolder?.(position)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    onDelete?.()
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault()
    onEdit?.()
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="p-1 hover:bg-gray-1" variant="soft">
        {onEdit && (
          <Button
            variant="ghost"
            onClick={handleEdit}
            className="m-0 h-6 justify-between"
          >
            <Flex align="center" gap="2" className="p-1">
              <Pencil className="h-4 w-4" />
              {descriptions.edit}
            </Flex>
          </Button>
        )}

        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Flex align="center" gap="2">
              <FilePlus className="h-4 w-4" />
              {descriptions.createFileContextMenu}
            </Flex>
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <Button
              variant="ghost"
              onClick={(e) => handleAddFile(e, "above")}
              className="m-0 justify-start text-gray-12"
            >
              {descriptions.above}
            </Button>
            <Button
              variant="ghost"
              onClick={(e) => handleAddFile(e, "below")}
              className="m-0 justify-start text-gray-12"
            >
              {descriptions.below}
            </Button>
            {isFolder && (
              <Button
                variant="ghost"
                onClick={(e) => handleAddFile(e, "inside")}
                className="m-0 justify-start text-gray-12"
              >
                {descriptions.inside}
              </Button>
            )}
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Flex align="center" gap="2">
              <FolderPlus className="h-4 w-4" />
              {descriptions.createFolderContextMenu}
            </Flex>
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <Button
              variant="ghost"
              onClick={(e) => handleAddFolder(e, "above")}
              className="m-0 justify-start text-gray-12"
            >
              {descriptions.above}
            </Button>
            <Button
              variant="ghost"
              onClick={(e) => handleAddFolder(e, "below")}
              className="m-0 justify-start text-gray-12"
            >
              {descriptions.below}
            </Button>
            {isFolder && (
              <Button
                variant="ghost"
                onClick={(e) => handleAddFolder(e, "inside")}
                className="m-0 justify-start text-gray-12"
              >
                {descriptions.inside}
              </Button>
            )}
          </ContextMenuSubContent>
        </ContextMenuSub>

        {canDelete && (
          <Button
            variant="ghost"
            onClick={handleDelete}
            color="red"
            className="m-0 h-6 justify-between"
          >
            <Flex align="center" gap="2" className="p-1">
              <Trash className="h-4 w-4" />
              {descriptions.delete}
            </Flex>
          </Button>
        )}
      </ContextMenuContent>
    </ContextMenu>
  )
}
