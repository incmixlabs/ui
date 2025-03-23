"use client"

import { Button, Flex, Text, TextArea } from "@incmix/ui"
import { FilePlus, FolderPlus } from "lucide-react"
import React from "react"
import { TreeItemDialog } from "./tree-item-dialog"
import type { TreeDataItem } from "./tree-view"

type EmptyTreeViewProps = {
  onCreateItem: (item: TreeDataItem) => void
  emptyMessage?: string
  newFileButtonText?: string
  newFolderButtonText?: string
}

export function EmptyTreeView({
  onCreateItem,
  emptyMessage,
  newFileButtonText,
  newFolderButtonText,
}: EmptyTreeViewProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [itemType, setItemType] = React.useState<"file" | "folder">("file")

  const handleCreateItem = <
    T extends Record<string, string>,
    U extends Record<string, string>,
  >(
    type: "file" | "folder",
    data: T | U
  ) => {
    if (typeof data.name !== "string") {
      throw new Error("Name must be a string")
    }

    const newItem: TreeDataItem =
      type === "file"
        ? {
            type,
            id: crypto.randomUUID(),
            name: data.name,
            data,
          }
        : {
            type,
            id: crypto.randomUUID(),
            name: data.name,
            children: [],
            data,
          }

    onCreateItem(newItem)
  }

  return (
    <>
      <Flex
        direction="column"
        align="center"
        justify="center"
        className="min-h-[200px] rounded-lg border-2 border-gray-6 border-dashed p-6"
      >
        <Text
          color="gray"
          size="2"
          mb="4"
          className="max-w-[280px] text-center"
        >
          {emptyMessage ??
            "No items. Create a new file or folder to get started."}
        </Text>
        <Flex gap="3">
          <Button
            className="cursor-pointer"
            variant="soft"
            onClick={() => {
              setItemType("file")
              setDialogOpen(true)
            }}
          >
            <FilePlus className="mr-2 h-4 w-4" />
            {newFileButtonText ?? "New File"}
          </Button>
          <Button
            className="cursor-pointer"
            variant="soft"
            onClick={() => {
              setItemType("folder")
              setDialogOpen(true)
            }}
          >
            <FolderPlus className="mr-2 h-4 w-4" />
            {newFolderButtonText ?? "New Folder"}
          </Button>
        </Flex>
      </Flex>

      <TreeItemDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={(data) => handleCreateItem(itemType, data)}
        type={itemType}
        position="below"
      />
    </>
  )
}
