"use client"

import { Box, Flex, Text } from "@incmix/ui"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { cn } from "@utils/cn"
import { ChevronRight, type LucideIcon } from "lucide-react"
import React, { type ComponentType } from "react"
import type { IconProps } from "./icons/types"

interface TreeDataItem {
  id: string
  name: string
  icon?: LucideIcon
  children?: TreeDataItem[]
}

type TreeProps = React.HTMLAttributes<HTMLDivElement> & {
  data: TreeDataItem[] | TreeDataItem
  initialSelectedItemId?: string
  onSelectChange?: (item: TreeDataItem | undefined) => void
  expandAll?: boolean
  folderIconOpen?: ComponentType<IconProps>
  folderIcon?: ComponentType<IconProps>
  itemIcon?: ComponentType<IconProps>
}

const Tree = React.forwardRef<HTMLDivElement, TreeProps>(
  (
    {
      data,
      initialSelectedItemId,
      onSelectChange,
      expandAll,
      folderIconOpen,
      folderIcon,
      itemIcon,
      className,
      ...props
    },
    _ref
  ) => {
    const [selectedItemId, setSelectedItemId] = React.useState<
      string | undefined
    >(initialSelectedItemId)

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
          // eslint-disable-next-line @typescript-eslint/prefer-for-of
          for (let i = 0; i < items.length; i++) {
            ids.push(items[i]?.id)
            if (items[i] && walkTreeItems(items[i], targetId) && !expandAll) {
              return true
            }
            if (!expandAll) ids.pop()
          }
        } else if (!expandAll && items.id === targetId) {
          return true
        } else if (items.children) {
          return walkTreeItems(items.children, targetId)
        }
      }

      walkTreeItems(data, initialSelectedItemId)
      return ids
    }, [data, initialSelectedItemId])

    return (
      <>
        <Box className={cn("relative p-2 px-6", className)}>
          <TreeItem
            data={data}
            selectedItemId={selectedItemId}
            handleSelectChange={handleSelectChange}
            expandedItemIds={expandedItemIds}
            FolderIcon={folderIcon}
            FolderIconOpen={folderIconOpen}
            ItemIcon={itemIcon}
            {...props}
          />
        </Box>
      </>
    )
  }
)

type TreeItemProps = TreeProps & {
  selectedItemId?: string
  handleSelectChange: (item: TreeDataItem | undefined) => void
  expandedItemIds: string[]
  FolderIcon?: ComponentType<IconProps>
  ItemIcon?: ComponentType<IconProps>
  FolderIconOpen?: ComponentType<IconProps>
}

const iconClass = "h-4 w-4 shrink-0 text-accent-foreground/50"
const padding = "p-2"
const TreeItem = React.forwardRef<HTMLDivElement, TreeItemProps>(
  (
    {
      className,
      data,
      selectedItemId,
      handleSelectChange,
      expandedItemIds,
      FolderIcon,
      ItemIcon,
      FolderIconOpen,
      ...props
    },
    ref
  ) => {
    return (
      <Box ref={ref} role="tree" className={className} {...props}>
        <ul>
          {Array.isArray(data) ? (
            data.map((item) => (
              <li key={item.id}>
                {item.children ? (
                  (() => {
                    const [open, setOpen] = React.useState(
                      expandedItemIds.includes(item.id)
                    )
                    const IconComp = item.icon
                      ? item.icon
                      : open && FolderIconOpen
                        ? FolderIconOpen
                        : FolderIcon

                    return (
                      <AccordionPrimitive.Root
                        type="multiple"
                        value={open ? [item.id] : []}
                        onValueChange={(value) =>
                          setOpen(value.includes(item.id))
                        }
                      >
                        <AccordionPrimitive.Item
                          value={item.id}
                          className={cn("", open && "relative ")}
                        >
                          <AccordionPrimitive.Trigger
                            className={cn(
                              `mt-1 flex h-10 w-full flex-1 select-none items-center justify-between gap-1 rounded-md ${padding} font-medium text-sm transition-all hover:bg-sidebar-secondary-active/10 hover:text-sidebar-secondary-active hover:no-underline [&[data-state=open]>svg]:rotate-90`,
                              open &&
                                "bg-sidebar-secondary-active/10 text-sidebar-secondary-active"
                            )}
                            onClick={() => handleSelectChange(item)}
                          >
                            <Flex align={"center"} gap={"2"}>
                              {IconComp && (
                                <IconComp
                                  className={iconClass}
                                  aria-hidden="true"
                                />
                              )}

                              <Text
                                className={cn(
                                  "truncate text-sidebar-secondary-text text-sm",
                                  open && "text-sidebar-background"
                                )}
                              >
                                {item.name}
                              </Text>
                            </Flex>
                            <ChevronRight
                              className={cn(
                                " h-5 w-5 text-gray-8 transition-transform duration-200 hover:text-sidebar-background",
                                open && "text-sidebar-background"
                              )}
                            />
                          </AccordionPrimitive.Trigger>
                          <AccordionPrimitive.Content className="pl-6">
                            <TreeItem
                              data={item.children ? item.children : item}
                              selectedItemId={selectedItemId}
                              handleSelectChange={handleSelectChange}
                              expandedItemIds={expandedItemIds}
                              FolderIcon={FolderIcon}
                              ItemIcon={ItemIcon}
                              FolderIconOpen={FolderIconOpen}
                            />
                          </AccordionPrimitive.Content>
                        </AccordionPrimitive.Item>
                      </AccordionPrimitive.Root>
                    )
                  })()
                ) : (
                  <Leaf
                    item={item}
                    isSelected={selectedItemId === item.id}
                    onClick={() => handleSelectChange(item)}
                    Icon={ItemIcon}
                  />
                )}
              </li>
            ))
          ) : (
            <li>
              <Leaf
                item={data}
                isSelected={selectedItemId === data.id}
                onClick={() => handleSelectChange(data)}
                Icon={ItemIcon}
              />
            </li>
          )}
        </ul>
      </Box>
    )
  }
)

const Leaf = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    item: TreeDataItem
    isSelected?: boolean
    Icon?: ComponentType<IconProps>
  }
>(({ className, item, isSelected, Icon, ...props }, ref) => {
  const IconComp = item.icon ? item.icon : Icon
  return (
    <Flex
      ref={ref}
      align={"center"}
      gap={"2"}
      className={cn(
        `mt-1 mb-1 cursor-pointer select-none rounded-md ${padding} hover:bg-sidebar-secondary-active/10`,
        className,
        isSelected &&
          "bg-sidebar-secondary-active/10 text-sidebar-secondary-active"
      )}
      {...props}
    >
      {IconComp && <IconComp className={`${iconClass}`} aria-hidden="true" />}

      <Text
        className={cn(
          "flex-grow truncate text-sidebar-secondary-text text-sm",
          isSelected && "text-sidebar-secondary-active"
        )}
      >
        {item.name}
      </Text>
    </Flex>
  )
})

export { Tree, type TreeDataItem }
