"use client"

import { cn } from "@incmix/ui"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ScrollArea } from "@radix-ui/themes"
import { ChevronRight, type LucideIcon } from "lucide-react"
import React from "react"

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
  folderIcon?: LucideIcon
  itemIcon?: LucideIcon
}

const Tree = React.forwardRef<HTMLDivElement, TreeProps>(
  (
    {
      data,
      initialSelectedItemId,
      onSelectChange,
      expandAll,
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
  FolderIcon?: LucideIcon
  ItemIcon?: LucideIcon
}

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
                    return (
                      <AccordionPrimitive.Root
                        type="multiple"
                        value={open ? [item.id] : []}
                        onValueChange={(value) =>
                          setOpen(value.includes(item.id))
                        }
                      >
                        <AccordionPrimitive.Item value={item.id}>
                          <AccordionTrigger
                            className={cn(
                              "mb-1 select-none gap-4 rounded-md py-5 pr-5 pl-7 hover:bg-[hsl(var(--sidebar-background)/0.1)]",
                              open &&
                                "bg-[hsl(var(--sidebar-background)/0.1)] text-[hsl(var(--sidebar-background))]"
                            )}
                            onClick={() => handleSelectChange(item)}
                          >
                            {item.icon ? (
                              <item.icon
                                className="h-6 w-6 shrink-0 text-accent-foreground/50"
                                aria-hidden="true"
                              />
                            ) : (
                              FolderIcon &&
                              (open ? (
                                <img
                                  src="images/sidebar/open-folder.svg"
                                  className="h-6 w-6 shrink-0 text-accent-foreground/50"
                                  aria-hidden="true"
                                  alt="open folder"
                                />
                              ) : (
                                <img
                                  src="images/sidebar/folder.svg"
                                  className="h-6 w-6 shrink-0 text-accent-foreground/50"
                                  aria-hidden="true"
                                  alt="folder"
                                />
                              ))
                            )}
                            <span
                              className={cn(
                                "truncate text-[hsl(var(--sidebar-secondary-text))] text-sm",
                                open && "text-[hsl(var(--sidebar-background))]"
                              )}
                            >
                              {item.name}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="pl-6">
                            <TreeItem
                              data={item.children ? item.children : item}
                              selectedItemId={selectedItemId}
                              handleSelectChange={handleSelectChange}
                              expandedItemIds={expandedItemIds}
                              FolderIcon={FolderIcon}
                              ItemIcon={ItemIcon}
                            />
                          </AccordionContent>
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
    Icon?: LucideIcon
  }
>(({ className, item, isSelected, Icon, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "mb-1 flex cursor-pointer select-none items-center gap-4 rounded-md py-5 pr-5 pl-7 hover:bg-[hsl(var(--sidebar-background)/0.1)]",
        className,
        isSelected &&
          "bg-[hsl(var(--sidebar-background)/0.1)] text-[hsl(var(--sidebar-background))] "
      )}
      {...props}
    >
      {item.icon && (
        <item.icon
          className="h-6 w-6 shrink-0 text-accent-foreground/50"
          aria-hidden="true"
        />
      )}
      {!item.icon && Icon && (
        <img
          src="images/sidebar/folder.svg"
          className="h-6 w-6 shrink-0 text-accent-foreground/50"
          aria-hidden="true"
          alt="folder"
        />
      )}

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

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex w-full flex-1 items-center py-2 transition-all last:[&[data-state=open]>svg]:rotate-90",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-accent-foreground/50 transition-transform duration-200" />
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
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down ",
      className
    )}
    {...props}
  >
    <div className="pt-0 pb-1">{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Tree, type TreeDataItem }
