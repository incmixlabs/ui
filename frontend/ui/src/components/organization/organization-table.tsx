import { useEffect, useRef, useState } from "react"

import { Button, Checkbox } from "@components/base"
import { nanoid } from "nanoid"
import { Table } from "@components/shadcn/table"
import {
  findItemById,
  removeItemById,
  useEnvVarsStore,
} from "@utils/env-vars-store"
import type { TreeDataItem } from "@/types"
import { produce } from "immer"
import { TreeItemRow, type TreeItemRowRef } from "./tree-item-row"

interface FlattenedItem extends TreeDataItem {
  level: number
  parentId: string | null
}

export function OrganizationTable() {
  const { treeData, setTreeData } = useEnvVarsStore()
  const rowRefs = useRef<Record<string, TreeItemRowRef>>({})
  const [flattenedItems, setFlattenedItems] = useState<FlattenedItem[]>([])

  const topLevelRowRef = useRef<TreeItemRowRef>(null)

  const flattenTree = (
    items: TreeDataItem[],
    level = 0,
    parentId: string | null = null
  ): FlattenedItem[] => {
    return items.reduce<FlattenedItem[]>((acc, item) => {
      const flatItem: FlattenedItem = {
        ...item,
        level,
        parentId,
      }
      acc.push(flatItem)

      // Add children if this is an expanded folder
      if (
        item.type === "folder" &&
        item.expanded &&
        item.children &&
        item.children.length > 0
      ) {
        acc.push(...flattenTree(item.children, level + 1, item.id))
      }

      return acc
    }, [])
  }

  useEffect(() => {
    setFlattenedItems(flattenTree(treeData))
  }, [treeData])

  // Function to toggle the expanded state of a folder
  const toggleExpand = (itemId: string) => {
    setTreeData(
      produce(treeData, (draft) => {
        const item = findItemById(draft, itemId)
        if (item && item.type === "folder") {
          item.expanded = !item.expanded
        }
      })
    )
  }

  const handleAddItem = (
    item: TreeDataItem,
    type: "file" | "folder",
    position: "above" | "below" | "inside",
    formData: Record<string, string>
  ) => {
    // Create a new item with the form data
    const newItem: TreeDataItem =
      type === "file"
        ? {
            type,
            id: nanoid(),
            name: formData.name,
            data: {
              name: formData.name,
              value: formData.value || "",
              notes: formData.notes || "",
            },
          }
        : {
            type,
            id: nanoid(),
            name: formData.name,
            children: [],
            expanded: true,
            data: {
              name: formData.name,
              notes: formData.notes || "",
            },
          }

    if (item.id === "virtual-root") {
      setTreeData([...treeData, newItem])
    } else {
      setTreeData(
        produce(treeData, (draft) => {
          if (position === "inside") {
            const targetItem = findItemById(draft, item.id)
            if (targetItem && targetItem.type === "folder") {
              if (!targetItem.children) targetItem.children = []
              targetItem.children.push(newItem)
              targetItem.expanded = true
            }
          } else {
            const result = findParentArrayAndIndex(draft, item.id)
            if (result) {
              const { parentArray, index } = result
              const insertIndex = position === "below" ? index + 1 : index
              parentArray.splice(insertIndex, 0, newItem)
            }
          }
        })
      )
    }
  }

  // Helper function to find parent array and index
  const findParentArrayAndIndex = (
    items: TreeDataItem[] | TreeDataItem,
    id: string,
    parent: TreeDataItem[] | null = null
  ): { parentArray: TreeDataItem[]; index: number } | null => {
    const itemsArray = Array.isArray(items) ? items : [items]

    for (let i = 0; i < itemsArray.length; i++) {
      if (itemsArray[i].id === id) {
        return { parentArray: parent || itemsArray, index: i }
      }

      // Check if children exists and has items before recursing
      const children = itemsArray[i].children
      if (children && children.length > 0) {
        const found = findParentArrayAndIndex(children, id, children)
        if (found) return found
      }
    }

    return null
  }

  // Function to handle deleting an item
  const handleDelete = (itemId: string) => {
    setTreeData(removeItemById(treeData, itemId))
  }

  // Function to handle editing an item
  const handleEdit = (updatedItem: TreeDataItem) => {
    setTreeData(
      produce(treeData, (draft) => {
        const targetItem = findItemById(draft, updatedItem.id)
        if (targetItem) {
          targetItem.name = updatedItem.name
          if (!targetItem.data) targetItem.data = {}
          targetItem.data.name = updatedItem.name

          if (targetItem.type === "file") {
            targetItem.data.value = updatedItem.data?.value || ""
          }

          targetItem.data.notes = updatedItem.data?.notes || ""
        }
      })
    )
  }

  // Function to add a new top-level item
  const addTopLevelItem = (type: "file" | "folder") => {
    // Use the virtual row's dialog
    if (topLevelRowRef.current) {
      topLevelRowRef.current.openCreateDialog(type, "below")
    }
  }

  // Create a virtual root item for top-level operations
  const virtualRootItem: TreeDataItem = {
    id: "virtual-root",
    name: "Root",
    type: "folder",
    expanded: true,
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-bold text-2xl">Environment Variables</h1>
        <div className="space-x-2">
          <Button onClick={() => addTopLevelItem("folder")}>New Folder</Button>
          <Button onClick={() => addTopLevelItem("file")}>New Variable</Button>
        </div>
      </div>

      {/* Hidden virtual row for top-level operations */}
      <div className="hidden">
        <TreeItemRow
          ref={topLevelRowRef}
          item={virtualRootItem}
          level={0}
          onToggleExpand={() => {}}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreateItem={handleAddItem}
        />
      </div>

      <Table.Root className="border-collapse border border-gray-200">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell className="w-12 border border-gray-200">
              <Checkbox />
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="border border-gray-200">
              Description
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="w-64 border border-gray-200">
              Value
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="border border-gray-200">
              Created on
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="border border-gray-200">
              Created by
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="w-10 border border-gray-200">
              Actions
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {flattenedItems.length > 0 ? (
            flattenedItems.map((item) => (
              <TreeItemRow
                key={item.id}
                ref={(el) => {
                  if (el) rowRefs.current[item.id] = el
                }}
                item={item}
                level={item.level}
                onToggleExpand={toggleExpand}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onCreateItem={handleAddItem}
              />
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={6} className="py-4 text-center">
                No environment variables. Create a new variable or folder to get
                started.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
