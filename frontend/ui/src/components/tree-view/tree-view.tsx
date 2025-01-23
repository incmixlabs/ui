"use client"

import {
  type Instruction,
  attachInstruction,
  extractInstruction,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/tree-item"
import { DropIndicator } from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/tree-item"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Box, Flex, Text } from "@radix-ui/themes"
import { cn } from "@incmix/ui/utils/cn"
import { cva } from "class-variance-authority"
import { produce } from "immer"
import { ChevronRight, File, Folder, FolderOpen } from "lucide-react"
import React, { useRef, useState, useEffect, useCallback } from "react"
import { TreeContextMenu } from "./context-menu"
import { EmptyTreeView } from "./empty-tree-view"
import { TreeItemDialog } from "./tree-item-dialog"
import { TreeViewProvider } from "./tree-view-context"
import type { TreeViewDescriptions } from "./types"
import type { FormFieldConfig, TreeDataItem } from "./types"

const treeVariants = cva(
  "group before:-z-10 before:absolute before:left-0 before:h-[2rem] before:w-full before:rounded-lg before:bg-accent/70 before:opacity-0 hover:before:opacity-100"
)

const selectedTreeVariants = cva(
  "text-accent-foreground before:bg-accent/70 before:opacity-100"
)

const triggerStyles = cva(
  "flex w-full flex-1 items-center px-2 py-2 transition-all first:[&[data-state=open]>svg]:rotate-90"
)

const DEFAULT_DESCRIPTIONS: TreeViewDescriptions = {
  above: "Above",
  below: "Below",
  inside: "Inside",
  edit: "Edit",
  delete: "Delete",
  name: "Name",
  value: "Value",
  notes: "Notes",
  createFileContextMenu: "Create File",
  createFolderContextMenu: "Create Folder",
  newFileTitle: "New File",
  newFolderTitle: "New Folder",
  editFileTitle: "Edit File",
  editFolderTitle: "Edit Folder",
}

type TreeProps = React.HTMLAttributes<HTMLDivElement> & {
  data: TreeDataItem[] | TreeDataItem
  setData?: (data: TreeDataItem[] | TreeDataItem) => void
  initialSelectedItemId?: string
  onSelectChange?: (item: TreeDataItem | undefined) => void
  expandAll?: boolean
  defaultNodeIcon?: any
  defaultLeafIcon?: any
  emptyMessage?: string
  newFileButtonText?: string
  newFolderButtonText?: string
  fileFields?: FormFieldConfig[]
  folderFields?: FormFieldConfig[]
  descriptions?: TreeViewDescriptions
}

function findItemById<T>(
  items: TreeDataItem<T>[] | TreeDataItem<T>,
  id: string
): TreeDataItem<T> | null {
  if (Array.isArray(items)) {
    for (const item of items) {
      const found = findItemById(item, id)
      if (found) return found
    }
  } else {
    if (items.id === id) return items
    if (items.type === "folder") {
      return findItemById(items.children, id)
    }
  }
  return null
}

function removeItemById<T>(
  items: TreeDataItem<T>[] | TreeDataItem<T>,
  id: string
): TreeDataItem<T>[] | TreeDataItem<T> {
  if (Array.isArray(items)) {
    const result = items.reduce<TreeDataItem<T>[]>((acc, item) => {
      if (item.id === id) return acc
      const newItem = { ...item }
      if (newItem.type === "folder") {
        newItem.children = removeItemById(
          newItem.children,
          id
        ) as TreeDataItem<T>[]
      }
      acc.push(newItem)
      return acc
    }, [])
    return result
  }
  if (items.type === "folder") {
    const newChildren = removeItemById(items.children, id) as TreeDataItem<T>[]
    return {
      ...items,
      children: newChildren,
    }
  }
  return items
}

function findParentArrayAndIndex<T>(
  items: TreeDataItem<T>[] | TreeDataItem<T>,
  targetId: string
): { parentArray: TreeDataItem<T>[]; index: number } | null {
  if (Array.isArray(items)) {
    const index = items.findIndex((item) => item.id === targetId)
    if (index !== -1) {
      return { parentArray: items, index }
    }

    for (const item of items) {
      if (item.type === "folder") {
        const result = findParentArrayAndIndex(item.children, targetId)
        if (result) return result
      }
    }
  } else if (items.type === "folder") {
    return findParentArrayAndIndex(items.children, targetId)
  }

  return null
}

function insertItem<T>(
  items: TreeDataItem<T>[] | TreeDataItem<T>,
  targetId: string,
  itemToInsert: TreeDataItem<T>,
  instruction: Instruction
): TreeDataItem<T>[] | TreeDataItem<T> {
  return produce(items, (draft: TreeDataItem<T>[] | TreeDataItem<T>) => {
    const targetItem = findItemById(draft, targetId)
    if (!targetItem) return

    if (instruction.type === "make-child") {
      if (targetItem.type !== "folder") {
        throw new Error("Target item is not a folder")
      }
      if (!targetItem.children) {
        targetItem.children = []
      }
      targetItem.children.unshift(itemToInsert)
      return
    }

    const result = findParentArrayAndIndex(draft, targetId)
    if (result) {
      const { parentArray, index } = result
      const insertIndex =
        instruction.type === "reorder-below" ? index + 1 : index
      parentArray.splice(insertIndex, 0, itemToInsert)
    }
  })
}

const TreeView = React.forwardRef<HTMLDivElement, TreeProps>(
  (
    {
      data: initialData,
      setData,
      initialSelectedItemId,
      onSelectChange,
      expandAll,
      defaultLeafIcon,
      defaultNodeIcon,
      emptyMessage,
      newFileButtonText = "New File",
      newFolderButtonText = "New Folder",
      fileFields = [],
      folderFields = [],
      className,
      descriptions = DEFAULT_DESCRIPTIONS,
      ...props
    },
    ref
  ) => {
    const NAME_FIELD: FormFieldConfig = {
      name: "name",
      type: "text",
      label: descriptions.name,
      required: true,
    }

    const [selectedItemId, setSelectedItemId] = React.useState<
      string | undefined
    >(initialSelectedItemId)

    const [data, setInternalData] = React.useState(() => {
      if (!initialSelectedItemId && !expandAll) {
        return initialData
      }

      return produce(initialData, (draft) => {
        function walkTreeItems(
          items: TreeDataItem[] | TreeDataItem,
          targetId: string
        ) {
          if (Array.isArray(items)) {
            for (let i = 0; i < items.length; i++) {
              if (items[i]) {
                items[i].expanded = expandAll
              }
              if (items[i] && walkTreeItems(items[i], targetId) && !expandAll) {
                if (items[i]) {
                  items[i].expanded = true
                }
                return true
              }
            }
          } else if (!expandAll && items.id === targetId) {
            return true
          } else if (items.type === "folder") {
            items.expanded = expandAll
            if (walkTreeItems(items.children, targetId)) {
              items.expanded = true
              return true
            }
          }
          return false
        }

        walkTreeItems(draft, initialSelectedItemId || "")
      })
    })

    React.useEffect(() => {
      setData?.(data)
    }, [data, setData])

    const handleSelectChange = React.useCallback(
      (item: TreeDataItem | undefined) => {
        setSelectedItemId(item?.id)
        if (onSelectChange) {
          onSelectChange(item)
        }
      },
      [onSelectChange]
    )

    const expandedItemIds = React.useMemo(() => {
      if (!initialSelectedItemId) {
        return [] as string[]
      }

      const ids: string[] = []

      function walkTreeItems(
        items: TreeDataItem[] | TreeDataItem,
        targetId: string
      ) {
        if (Array.isArray(items)) {
          for (let i = 0; i < items.length; i++) {
            ids.push(items[i]?.id)
            if (items[i] && walkTreeItems(items[i], targetId) && !expandAll) {
              return true
            }
            if (!expandAll) ids.pop()
          }
        } else if (!expandAll && items.id === targetId) {
          return true
        } else if (items.type === "folder") {
          return walkTreeItems(items.children, targetId)
        }
      }

      walkTreeItems(data, initialSelectedItemId)
      return ids
    }, [data, expandAll, initialSelectedItemId])

    return (
      <TreeViewProvider
        fileFields={[NAME_FIELD, ...fileFields]}
        folderFields={[NAME_FIELD, ...folderFields]}
        descriptions={descriptions}
      >
        <Box
          ref={ref}
          className={cn("relative select-none", className)}
          {...props}
        >
          {Array.isArray(data) && data.length === 0 ? (
            <EmptyTreeView
              onCreateItem={(item) => setInternalData([item])}
              emptyMessage={emptyMessage}
              newFileButtonText={newFileButtonText}
              newFolderButtonText={newFolderButtonText}
            />
          ) : (
            <TreeItem
              data={data}
              rootData={data}
              selectedItemId={selectedItemId}
              handleSelectChange={handleSelectChange}
              expandedItemIds={expandedItemIds}
              defaultLeafIcon={defaultLeafIcon}
              defaultNodeIcon={defaultNodeIcon}
              setData={setInternalData}
            />
          )}
        </Box>
      </TreeViewProvider>
    )
  }
)
TreeView.displayName = "TreeView"

type TreeItemProps = TreeProps & {
  selectedItemId?: string
  handleSelectChange: (item: TreeDataItem | undefined) => void
  expandedItemIds: string[]
  defaultNodeIcon?: any
  defaultLeafIcon?: any
  rootData: TreeDataItem[] | TreeDataItem
  setData?: (data: TreeDataItem[] | TreeDataItem) => void
}

const TreeItem = React.forwardRef<HTMLDivElement, TreeItemProps>(
  (
    {
      className,
      data,
      rootData,
      selectedItemId,
      handleSelectChange,
      expandedItemIds,
      defaultNodeIcon,
      defaultLeafIcon,
      setData,
      ...props
    },
    ref
  ) => {
    const dataArray = Array.isArray(data) ? data : [data]

    return (
      <Box ref={ref} role="tree" className={className} {...props}>
        <Box>
          {dataArray.map((item, index) => (
            <Box key={item.id}>
              {item.type === "folder" ? (
                <TreeNode
                  rootData={rootData}
                  item={item}
                  selectedItemId={selectedItemId}
                  expandedItemIds={expandedItemIds}
                  handleSelectChange={handleSelectChange}
                  defaultNodeIcon={defaultNodeIcon}
                  defaultLeafIcon={defaultLeafIcon}
                  index={index}
                  siblings={dataArray}
                  setData={setData}
                />
              ) : (
                <TreeLeaf
                  rootData={rootData}
                  item={item}
                  handleSelectChange={handleSelectChange}
                  selectedItemId={selectedItemId}
                  defaultLeafIcon={defaultLeafIcon}
                  index={index}
                  siblings={dataArray}
                  setData={setData}
                />
              )}
            </Box>
          ))}
        </Box>
      </Box>
    )
  }
)
TreeItem.displayName = "TreeItem"

const TreeNode = ({
  rootData,
  item,
  handleSelectChange,
  expandedItemIds,
  selectedItemId,
  defaultNodeIcon,
  defaultLeafIcon,
  index,
  siblings,
  setData,
}: {
  rootData: TreeDataItem[] | TreeDataItem
  item: TreeDataItem
  handleSelectChange: (item: TreeDataItem | undefined) => void
  expandedItemIds: string[]
  selectedItemId?: string
  defaultNodeIcon?: any
  defaultLeafIcon?: any
  index?: number
  siblings?: TreeDataItem[]
  setData?: (data: TreeDataItem[] | TreeDataItem) => void
}) => {
  const elementRef = useRef<HTMLButtonElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [instruction, setInstruction] = useState<Instruction | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState<"file" | "folder">("file")
  const [dialogPosition, setDialogPosition] = useState<
    "above" | "below" | "inside"
  >("below")
  const [isEditing, setIsEditing] = useState(false)

  const handleAddItem = (
    type: "file" | "folder",
    position: "above" | "below" | "inside",
    data: Record<string, string>
  ) => {
    if (!setData) return

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

    if (position === "inside") {
      setData(
        produce(rootData, (draft: TreeDataItem[] | TreeDataItem) => {
          const targetItem = findItemById(draft, item.id)
          if (targetItem && targetItem.type === "folder") {
            targetItem.children.unshift(newItem)
          }
        })
      )
    } else {
      setData(
        produce(rootData, (draft: TreeDataItem[] | TreeDataItem) => {
          const result = findParentArrayAndIndex(draft, item.id)
          if (result) {
            const { parentArray, index } = result
            const insertIndex = position === "below" ? index + 1 : index
            parentArray.splice(insertIndex, 0, newItem)
          }
        })
      )
    }
  }

  const handleDelete = () => {
    if (!setData) return
    setData(removeItemById(rootData, item.id))
  }

  const handleEdit = () => {
    setDialogType(item.type)
    setIsEditing(true)
    setDialogOpen(true)
  }

  const handleSubmit = (formData: Record<string, string>) => {
    if (isEditing) {
      if (!setData) return

      setData(
        produce(rootData, (draft: TreeDataItem[] | TreeDataItem) => {
          const targetItem = findItemById(draft, item.id)
          if (targetItem) {
            targetItem.name = formData.name
            targetItem.data = formData
          }
        })
      )
    } else {
      handleAddItem(dialogType, dialogPosition, formData)
    }
    setDialogOpen(false)
    setIsEditing(false)
  }

  const mode = React.useMemo(() => {
    if (item.type === "folder" && expandedItemIds.includes(item.id)) {
      return "expanded"
    }
    if (siblings && index === siblings.length - 1) {
      return "last-in-group"
    }
    return "standard"
  }, [item.type, item.id, expandedItemIds, index, siblings])

  const handleDrop = useCallback(
    ({ source, self, location }: { source: any; self: any; location: any }) => {
      const isInnermost =
        location.current.dropTargets[0]?.element === elementRef.current
      if (!isInnermost) return

      if (!setData) return

      if (source.data.id === item.id) return

      const instruction = extractInstruction(self.data)
      if (!instruction) return

      const sourceItem = findItemById(rootData, source.data.id)
      if (!sourceItem) return

      const intermediateData = removeItemById(rootData, source.data.id)
      const newData = insertItem(
        intermediateData,
        item.id,
        sourceItem,
        instruction
      )

      setData(newData)
      setInstruction(null)
    },
    [rootData, item.id, setData]
  )

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    return combine(
      draggable({
        element: el,
        getInitialData: () => ({
          id: item.id,
          type: "tree-item",
        }),
        onDragStart: () => setIsDragging(true),
        onDrop: () => {
          setIsDragging(false)
          setInstruction(null)
        },
      }),
      dropTargetForElements({
        element: el,
        getData: ({ input, element }) => {
          const data = { id: item.id }
          return attachInstruction(data, {
            input,
            element,
            indentPerLevel: 24,
            currentLevel: 0,
            mode,
          })
        },
        onDrag: ({ self, location }) => {
          const isInnermost = location.current.dropTargets[0]?.element === el

          if (isInnermost) {
            const instruction = extractInstruction(self.data)
            setInstruction(instruction)
          } else {
            setInstruction(null)
          }
        },
        onDragLeave: () => {
          setInstruction(null)
        },
        onDrop: handleDrop,
      })
    )
  }, [item.id, mode, handleDrop])

  const value = React.useMemo(() => {
    return item.expanded ? [item.id] : []
  }, [item.expanded, item.id])

  const onValueChange = React.useCallback(
    (newValue: string[]) => {
      if (!setData) return

      const newData = produce(
        rootData,
        (draft: TreeDataItem[] | TreeDataItem) => {
          const target = findItemById(draft, item.id)
          if (target) {
            target.expanded = newValue.includes(item.id)
          }
        }
      )

      setData(newData)
    },
    [item.id, rootData, setData]
  )

  return (
    <Box className="relative">
      <AccordionPrimitive.Root
        type="multiple"
        value={value}
        onValueChange={onValueChange}
      >
        <AccordionPrimitive.Item value={item.id}>
          <Box className="relative">
            <AccordionTrigger
              ref={elementRef}
              className={cn(
                treeVariants(),
                selectedItemId === item.id && selectedTreeVariants(),
                isDragging && "opacity-50"
              )}
              onClick={() => {
                handleSelectChange(item)
                item.onClick?.()
              }}
            >
              <TreeContextMenu
                onAddFile={(position) => {
                  setDialogType("file")
                  setDialogPosition(position)
                  setIsEditing(false)
                  setDialogOpen(true)
                }}
                onAddFolder={(position) => {
                  setDialogType("folder")
                  setDialogPosition(position)
                  setIsEditing(false)
                  setDialogOpen(true)
                }}
                onDelete={handleDelete}
                onEdit={handleEdit}
                canDelete={!!setData}
                isFolder={item.type === "folder"}
              >
                <Flex align="center" gap="2">
                  <TreeIcon
                    item={item}
                    isOpen={value.includes(item.id)}
                    isSelected={selectedItemId === item.id}
                    default={defaultNodeIcon}
                  />
                  <Text className="truncate text-sm">{item.name}</Text>
                </Flex>
              </TreeContextMenu>
              <TreeActions isSelected={selectedItemId === item.id}>
                {item.actions}
              </TreeActions>
            </AccordionTrigger>
            {instruction && <DropIndicator instruction={instruction} />}
          </Box>
          <AccordionContent className="ml-4 border-l pl-1">
            <TreeItem
              data={item.type === "folder" ? item.children : item}
              rootData={rootData}
              selectedItemId={selectedItemId}
              handleSelectChange={handleSelectChange}
              expandedItemIds={expandedItemIds}
              defaultLeafIcon={defaultLeafIcon}
              defaultNodeIcon={defaultNodeIcon}
              setData={setData}
            />
          </AccordionContent>
        </AccordionPrimitive.Item>
      </AccordionPrimitive.Root>
      <TreeItemDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open)
          if (!open) setIsEditing(false)
        }}
        onSubmit={handleSubmit}
        type={dialogType}
        position={dialogPosition}
        initialData={isEditing ? item.data : undefined}
      />
    </Box>
  )
}

const TreeLeaf = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    rootData:
      | TreeDataItem<Record<string, string>, Record<string, string>>[]
      | TreeDataItem<Record<string, string>, Record<string, string>>
    item: TreeDataItem<Record<string, string>, Record<string, string>>
    handleSelectChange: (
      item:
        | TreeDataItem<Record<string, string>, Record<string, string>>
        | undefined
    ) => void
    selectedItemId?: string
    defaultLeafIcon?: any
    index?: number
    siblings?: TreeDataItem<Record<string, string>, Record<string, string>>[]
    setData?: (
      data:
        | TreeDataItem<Record<string, string>, Record<string, string>>[]
        | TreeDataItem<Record<string, string>, Record<string, string>>
    ) => void
  }
>(
  (
    {
      rootData,
      item,
      handleSelectChange,
      selectedItemId,
      defaultLeafIcon,
      index,
      siblings,
      setData,
      ...props
    },
    _ref
  ) => {
    const elementRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [instruction, setInstruction] = useState<Instruction | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogType, setDialogType] = useState<"file" | "folder">("file")
    const [dialogPosition, setDialogPosition] = useState<
      "above" | "below" | "inside"
    >("below")
    const [isEditing, setIsEditing] = useState(false)

    const handleAddItem = (
      type: "file" | "folder",
      position: "above" | "below" | "inside",
      data: Record<string, string>
    ) => {
      if (!setData) return

      const newItem: TreeDataItem<
        Record<string, string>,
        Record<string, string>
      > = type === "file"
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

      const newData = produce(rootData, (draft) => {
        const result = findParentArrayAndIndex(draft, item.id)
        if (result) {
          const { parentArray, index } = result
          const insertIndex = position === "below" ? index + 1 : index
          parentArray.splice(insertIndex, 0, newItem)
        }
      })

      setData(newData)
    }

    const handleDelete = () => {
      if (!setData) return
      const newData = removeItemById(rootData, item.id)
      setData(newData)
    }

    const mode = React.useMemo(() => {
      if (siblings && index === siblings.length - 1) {
        return "last-in-group"
      }
      return "standard"
    }, [index, siblings])

    const handleDrop = useCallback(
      ({
        source,
        self,
        location,
      }: { source: any; self: any; location: any }) => {
        const isInnermost =
          location.current.dropTargets[0]?.element === elementRef.current

        if (!isInnermost) return

        if (!setData) return

        if (source.data.id === item.id) return

        const instruction = extractInstruction(self.data)
        if (!instruction) return

        const sourceItem = findItemById(rootData, source.data.id)
        if (!sourceItem) return

        const intermediateData = removeItemById(rootData, source.data.id)
        const newData = insertItem(
          intermediateData,
          item.id,
          sourceItem,
          instruction
        )

        setData(newData)
        setInstruction(null)
      },
      [rootData, item.id, setData]
    )

    const handleSubmit = (formData: Record<string, string>) => {
      if (isEditing) {
        if (!setData) return

        setData(
          produce(
            rootData,
            (
              draft:
                | TreeDataItem<Record<string, string>, Record<string, string>>[]
                | TreeDataItem<Record<string, string>, Record<string, string>>
            ) => {
              const targetItem = findItemById(draft, item.id)
              if (targetItem) {
                targetItem.name = formData.name
                targetItem.data = formData
              }
            }
          )
        )
      } else {
        handleAddItem(dialogType, dialogPosition, formData)
      }
      setDialogOpen(false)
      setIsEditing(false)
    }

    const handleEdit = () => {
      setDialogType(item.type)
      setIsEditing(true)
      setDialogOpen(true)
    }

    useEffect(() => {
      const el = elementRef.current
      if (!el) return

      return combine(
        draggable({
          element: el,
          getInitialData: () => ({
            id: item.id,
            type: "tree-item",
          }),
          onDragStart: () => setIsDragging(true),
          onDrop: () => {
            setIsDragging(false)
            setInstruction(null)
          },
        }),
        dropTargetForElements({
          element: el,
          getData: ({ input, element }) => {
            const data = { id: item.id }
            return attachInstruction(data, {
              input,
              element,
              indentPerLevel: 24,
              currentLevel: 0,
              mode,
            })
          },
          onDrag: ({ self, location }) => {
            const isInnermost = location.current.dropTargets[0]?.element === el

            if (isInnermost) {
              const instruction = extractInstruction(self.data)
              setInstruction(instruction)
            } else {
              setInstruction(null)
            }
          },
          onDragLeave: () => {
            setInstruction(null)
          },
          onDrop: handleDrop,
        })
      )
    }, [item.id, mode, handleDrop])

    return (
      <Box className="relative">
        <TreeContextMenu
          onAddFile={(position) => {
            setDialogType("file")
            setDialogPosition(position)
            setIsEditing(false)
            setDialogOpen(true)
          }}
          onAddFolder={(position) => {
            setDialogType("folder")
            setDialogPosition(position)
            setIsEditing(false)
            setDialogOpen(true)
          }}
          onDelete={handleDelete}
          onEdit={handleEdit}
          canDelete={!!setData}
        >
          <Flex
            ref={elementRef}
            className={cn(
              "ml-5 cursor-move items-center py-2 text-left",
              treeVariants(),
              props.className,
              selectedItemId === item.id && selectedTreeVariants(),
              isDragging && "opacity-50"
            )}
            onClick={() => {
              handleSelectChange(item)
              item.onClick?.()
            }}
            {...props}
          >
            <Flex align="center" gap="2">
              <TreeIcon
                item={item}
                isSelected={selectedItemId === item.id}
                default={defaultLeafIcon}
              />
              <Text className="truncate text-sm">{item.name}</Text>
            </Flex>
          </Flex>
        </TreeContextMenu>
        <TreeActions isSelected={selectedItemId === item.id}>
          {item.actions}
        </TreeActions>
        {instruction && <DropIndicator instruction={instruction} />}
        <TreeItemDialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open)
            if (!open) setIsEditing(false)
          }}
          onSubmit={handleSubmit}
          type={dialogType}
          position={dialogPosition}
          initialData={isEditing ? item.data : undefined}
        />
      </Box>
    )
  }
)
TreeLeaf.displayName = "TreeLeaf"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(triggerStyles(), className)}
      {...props}
    >
      <ChevronRight className="mr-1 h-4 w-4 shrink-0 text-accent-foreground/50 transition-transform duration-200" />
      {children}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <Box className="pt-0 pb-1">{children}</Box>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

const TreeIcon = ({
  item,
  isOpen,
  default: defaultIcon,
}: {
  item: TreeDataItem
  isOpen?: boolean
  isSelected?: boolean
  default?: any
}) => {
  const Icon =
    item.icon ??
    (item.type === "folder"
      ? isOpen
        ? (item.openIcon ?? FolderOpen)
        : (item.selectedIcon ?? Folder)
      : (item.selectedIcon ?? defaultIcon ?? File))

  return <Icon className="h-4 w-4 shrink-0" />
}

const TreeActions = ({
  children,
  isSelected,
}: {
  children: React.ReactNode
  isSelected: boolean
}) => {
  return (
    <Box
      className={cn(
        isSelected ? "block" : "hidden",
        "absolute right-3 group-hover:block"
      )}
    >
      {children}
    </Box>
  )
}

export { TreeView, type TreeDataItem }
