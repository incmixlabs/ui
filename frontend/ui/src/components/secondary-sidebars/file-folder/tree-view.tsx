"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon, ScrollArea } from "@radix-ui/themes"
import { cn } from "@utils/cn"
import type { LucideIcon } from "lucide-react"
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
      <div className={cn("overflow-hidden", className)}>
        <ScrollArea>
          <div className="relative p-2">
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
          </div>
        </ScrollArea>
      </div>
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
const padding = "py-1 pr-3 pl-1"
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
      <div ref={ref} role="tree" className={className} {...props}>
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
                        <AccordionPrimitive.Item value={item.id}>
                          <AccordionPrimitive.Trigger
                            className={cn(
                              `mb-1 flex w-full flex-1 select-none items-center justify-between gap-4 rounded-md ${padding} font-medium text-sm transition-all hover:bg-[hsl(var(--sidebar-background)/0.1)] hover:no-underline [&[data-state=open]>svg]:rotate-180`,
                              open &&
                                "bg-[hsl(var(--sidebar-background)/0.1)] text-[hsl(var(--sidebar-background))]"
                            )}
                            onClick={() => handleSelectChange(item)}
                          >
                            <span className="flex items-center gap-4">
                              {IconComp && (
                                <IconComp
                                  className={iconClass}
                                  aria-hidden="true"
                                />
                              )}

                              <span
                                className={cn(
                                  "truncate text-[hsl(var(--sidebar-secondary-text))] text-sm",
                                  open &&
                                    "text-[hsl(var(--sidebar-background))]"
                                )}
                              >
                                {item.name}
                              </span>
                            </span>
                            <ChevronDownIcon
                              className={`${iconClass} transition-transform duration-200`}
                            />
                          </AccordionPrimitive.Trigger>
                          <AccordionPrimitive.Content className="pl-4">
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
      </div>
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
    <div
      ref={ref}
      className={cn(
        `mb-1 flex cursor-pointer select-none items-center gap-4 rounded-md ${padding} hover:bg-[hsl(var(--sidebar-background)/0.1)]`,
        className,
        isSelected &&
          "bg-[hsl(var(--sidebar-background)/0.1)] text-[hsl(var(--sidebar-background))] "
      )}
      {...props}
    >
      {IconComp && <IconComp className={`${iconClass}`} aria-hidden="true" />}

      <span
        className={cn(
          "flex-grow truncate text-[hsl(var(--sidebar-secondary-text))] text-sm",
          isSelected && "text-[hsl(var(--sidebar-background))]"
        )}
      >
        {item.name}
      </span>
    </div>
  )
})

export { Tree, type TreeDataItem }
